import { Direction, Entity, EntityComponentTypes, EntityHealthComponent, MolangVariableMap, Player, system, world } from '@minecraft/server';
import * as FirearmDef from './2Definitions/FirearmDefinition.js';
import { AnimationUtil, DamageUtil, FirearmUtil, ItemUtil, NumberUtil } from './Utilities.js';
import { Global } from './Global.js';
//import { automaticMagazineSwap } from './Detectors/AutoMagSwapDetection.js';
import * as Reload from './Reload.js';
import { renewAmmoCount } from './AmmoText.js';
import { glassBlocks } from './1Enums/GlassBlockArrays.js';
import { AnimationTypes } from './1Enums/AnimationEnums.js';
import { Vector3 } from './Math/Vector3.js';
import { Mat3, RandVec } from './Math/MADLAD/index.js';
import { AnimationLink } from './AnimationLink.js';
import { excludedFamilies, excludedGameModes, excludedTypes } from './1Enums/HitExclusionArrays.js';
import { ReloadTypes } from './1Enums/ReloadEnums.js';
import { SettingsTypes } from './1Enums/SettingsEnums.js';
import { SettingsUtil } from './UtilitiesInit.js';
import { MathUtils } from './Math/MathUtils.js';
import { ExplosiveMagazineAmmo } from './2Definitions/MagazineDefinition.js';
//import { Mat3, RandVec } from '@madlad3718/mcveclib';


const humanoidHeadSize = 0.5;
const playerHeadSize = 0.5;
const playerHeightUntilHead = 1.31;

const HitMarkerVariants = {
    none: "none",
    normal: "normal",
    headshot: "headshot"
}

/**
 * 
 * @param {Player} player 
 * @param {FirearmDef.Firearm} firearm
 */
function shoot(player, firearm) {
    const ammoCount = FirearmUtil.getAmmoCountFromOffhand(player);
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) {
        renewAmmoCount(player);
        return;
    }
    if(ammoCount === undefined || ammoCount <= 0) { 
        renewAmmoCount(player);
        if(firearmItemStack !== undefined) { //Need this here for when the player right-clicks when the magazine is empty & they weren't shooting just before
            Reload.tryAutomaticReload(player, ReloadTypes.Normal);
        }
        return;
    }

    if(ammoCount === 1 && firearm.manualAmmoEject === true) {
        const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
        if(firearmContainerSlot !== null) {
            firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.hasLastCasingInChamber, true);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber);
        }
    }
    //console.log(`ammoCount: ${ammoCount}, isReloading: ${player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)}`);

    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_shooting, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_shooting);

    FirearmUtil.tryIncreaseRecoil(player, firearm);
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.lastShootTick, system.currentTick);
    if(firearm instanceof FirearmDef.Gun)            { shootGun(player, firearm); }
    else if(firearm instanceof FirearmDef.Explosive) { shootExplosive(player, firearm); }
    else {
        console.error(`Could not find firearmObject of type ${typeof(firearm)} in Shoot()`);
    }
    renewAmmoCount(player);
}   

/**
 * 
 * @param {Player} player 
 * @param {FirearmDef.Gun} gun
 */
function shootGun(player, gun) {
    //console.log("shooting a gun weapon.");
    let anyHits = false;
    let anyHeadshots = false;
    let totalDamage = 0;
    for(let i=0; i<gun.bulletsPerShot; i++) {
        const obj = doShootRayCasts(player, gun);
        if(obj.anyHits) { anyHits = true; }
        if(obj.anyHeadshots) { anyHeadshots = true; }
        totalDamage += obj.damage;
    }
    console.log(`totalDamage: ${totalDamage}`);
    playHitSounds(player, anyHits, anyHeadshots);

    const newAmmoCount = FirearmUtil.tryConsumeFirearmAmmo(player, gun, 1);
    FirearmUtil.tryAddScreenshakeRecoil(player, gun);
    
    let playedSound = AnimationUtil.playAnimationWithSound(player, gun, AnimationTypes.Shoot) === undefined ? false : true;
    if(!playedSound) {
        if(newAmmoCount !== undefined && newAmmoCount > 0) {
            AnimationUtil.playAnimationWithSound(player, gun, AnimationTypes.ShootWithAmmo);
        }
        else if(newAmmoCount === 0) {
            AnimationUtil.playAnimationWithSound(player, gun, AnimationTypes.ShootOutOfAmmo);
        }
    }
    //player.setDynamicProperty(Global.PlayerDynamicProperties.script.isFirstShot, false);
}

/**
 * @param {Player} player 
 * @param {FirearmDef.Explosive} explosive
 */
function shootExplosive(player, explosive) {
    console.log("shooting an explosive weapon.");
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStack(ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem());
    if(magazineObject === undefined || !(magazineObject instanceof ExplosiveMagazineAmmo)) return;
    const shootDirection = calculateShootDirection(player, explosive, {x:magazineObject.projectileAttribute.shootDirectionOffset.x, y:magazineObject.projectileAttribute.shootDirectionOffset.y});


    const spawnLocation = new Vector3(player.getHeadLocation().x, player.getHeadLocation().y, player.getHeadLocation().z);
    const forward = new Vector3(player.getViewDirection().x, player.getViewDirection().y, player.getViewDirection().z);
    const right = new Vector3(-player.getViewDirection().z, 0, player.getViewDirection().x);
    const down = new Vector3(forward.x, forward.y, forward.z).cross(right);

    spawnLocation.add(forward.multiplyScalar(magazineObject.projectileAttribute.spawnOffset.z)).add(down.multiplyScalar(-magazineObject.projectileAttribute.spawnOffset.y)).add(right.multiplyScalar(magazineObject.projectileAttribute.spawnOffset.x));

    let shootRotX;
    let shootRotY;

    if(Math.abs(shootDirection.y) <= 1) {
        shootRotX = -Math.asin(shootDirection.y)/Math.PI*180;  //y
        const shootDirectionXZ = new Vector3(shootDirection.x, 0, shootDirection.z).normalize();
        shootRotY = -Math.asin(shootDirectionXZ.x/(shootDirectionXZ.length()))/Math.PI*180;  //x and z
        if(shootDirectionXZ.z < 0 && shootDirectionXZ.x < 0) {
            shootRotY = 180-shootRotY;
        }
        else if(shootDirectionXZ.z < 0 && shootDirectionXZ.x > 0) {
            shootRotY = -180-shootRotY;
        }
    }
    else { //unrealistic situation
        shootRotX = 0;
        shootRotY = 0;
    }



    //console.log(`norm: ${player.getRotation().x}, ${player.getRotation().y}, new: ${shootRotX}, ${shootRotY}`);
    const projectile = player.dimension.spawnEntity(magazineObject.projectileAttribute.typeId, spawnLocation);
    projectile.setRotation({x: -shootRotX, y: -shootRotY});
    projectile.applyImpulse(shootDirection.multiplyScalar(magazineObject.projectileAttribute.speed));
    projectile.setDynamicProperty(Global.ProjectileDynamicProperties.magazineObjectTypeId, magazineObject.itemTypeId);

    /**
     * down = +X
     * up = -X
     * +z = 0 deg Y
     * +x = -90 deg Y
     */

    

    const newAmmoCount = FirearmUtil.tryConsumeFirearmAmmo(player, explosive, 1);
    FirearmUtil.tryAddScreenshakeRecoil(player, explosive);

    const knockbackDirection = new Vector3(player.getViewDirection().x, player.getViewDirection().y, player.getViewDirection().z).multiplyScalar(magazineObject.projectileAttribute.shooterKnockback.x).add(new Vector3(0, magazineObject.projectileAttribute.shooterKnockback.y, 0));
    player.applyImpulse(knockbackDirection);
    //player.applyKnockback(player.getViewDirection().x, player.getViewDirection().z, magazineObject.projectileAttribute.shooterKnockback.x, magazineObject.projectileAttribute.shooterKnockback.y)
    
    let playedSound = AnimationUtil.playAnimationWithSound(player, explosive, AnimationTypes.Shoot) === undefined ? false : true;
    if(!playedSound) {
        if(newAmmoCount !== undefined && newAmmoCount > 0) {
            AnimationUtil.playAnimationWithSound(player, explosive, AnimationTypes.ShootWithAmmo);
        }
        else if(newAmmoCount === 0) {
            AnimationUtil.playAnimationWithSound(player, explosive, AnimationTypes.ShootOutOfAmmo);
        }
    }
}


/**
 * 
 * @param {Player} player 
 * @param {FirearmDef.Gun} gun 
 * @returns {{anyHits: boolean, anyHeadshots: boolean, damage: number}}
 */
function doShootRayCasts(player, gun) {

    const shootDirection = calculateShootDirection(player, gun);
    //console.log(`view: ${player.getViewDirection().x}, ${player.getViewDirection().y}, ${player.getViewDirection().z}`);

    let glassHit = 0;
    let hitPosition = new Vector3(0, 0, 0);
    let hitBlock = false;
    let blockDirection = null;
    const headLocation = player.getHeadLocation();

    const blockRayCast = player.dimension.getBlockFromRay(headLocation, shootDirection, { maxDistance: gun.range, includeLiquidBlocks: false, includePassableBlocks: false });

    if(blockRayCast !== undefined && SettingsUtil.getSettingsValue(SettingsTypes.GunBreakBlocks) === 1) {
        const glassBlock = blockRayCast.block;
        try {
            if(glassBlocks.includes(glassBlock.typeId)) {
                player.dimension.runCommand(`setblock ${glassBlock.location.x} ${glassBlock.location.y} ${glassBlock.location.z} air destroy`);
                glassHit++;
            }
        }
        catch { }
        
    }

    const lastBlockRayCast = player.dimension.getBlockFromRay(headLocation, shootDirection, { maxDistance: gun.range, includeLiquidBlocks: false, includePassableBlocks: false  });

    if(lastBlockRayCast !== undefined) {
        hitBlock = true;
        blockDirection = lastBlockRayCast.face;
        hitPosition = new Vector3(lastBlockRayCast.block.location.x, lastBlockRayCast.block.location.y, lastBlockRayCast.block.location.z).add(lastBlockRayCast.faceLocation).sub(new Vector3(shootDirection.x, shootDirection.y, shootDirection.z).multiplyScalar(0.0001));
        hitPosition.sub(new Vector3(shootDirection.x, shootDirection.y, shootDirection.z).multiplyScalar(0.02));
        hitPosition.y += 0.1;
    }

    const entityRayCast = player.dimension.getEntitiesFromRay(headLocation, shootDirection, { 
        includeLiquidBlocks: false,
        includePassableBlocks: false,
        maxDistance: gun.range, 
        excludeFamilies: excludedFamilies, 
        excludeTypes: excludedTypes
    });


    let numHit = 0;
    let anyHits = false;
    let anyHeadshots = false;
    let damage = 0;
    entityRayCast.forEach(rayCastHit => {
        if(numHit >= gun.pierce) { return; }
        const target = rayCastHit.entity;
        if(target === player) { return; }
        if(target instanceof Player && (excludedGameModes.includes(target.getGameMode()) || world.gameRules.pvp === false)) { return; }
        const healthComponent = target.getComponent(EntityComponentTypes.Health);
        if(healthComponent instanceof EntityHealthComponent) { 
            if(healthComponent.currentValue <= 0) { return; }
        }

        hitBlock = false;
        hitPosition = new Vector3(headLocation.x, headLocation.y, headLocation.z).add(new Vector3(shootDirection.x, shootDirection.y, shootDirection.z).multiplyScalar(rayCastHit.distance));
        const isHeadshotVar = isHeadshot(new Vector3(hitPosition.x, hitPosition.y, hitPosition.z), target, new Vector3(target.getHeadLocation().x, target.getHeadLocation().y, target.getHeadLocation().z));

        damage = calculateDamage(rayCastHit.distance, gun)/gun.bulletsPerShot;

        if(isHeadshotVar) { 
            damage *= gun.headshotMultiplier;
            anyHeadshots = true; 
        }
        DamageUtil.dealDamageNoMultiplier(target, damage); 
        DamageUtil.dealKnockbackUsingGun(player, target, gun, true);
        drawHitEntityParticle(player, shootDirection, hitPosition, isHeadshotVar);
        numHit++;
        anyHits = true;
    });
 

    drawBulletTrace(player, shootDirection);

    if(hitBlock) { 
        const lastBlockRayCast = player.dimension.getBlockFromRay(headLocation, shootDirection, { maxDistance: gun.range, includeLiquidBlocks: false, includePassableBlocks: false  });
        let isGlassBlock = false;
        try {
            if(lastBlockRayCast !== undefined) { isGlassBlock = glassBlocks.includes(lastBlockRayCast.block.typeId); }
        }
        catch {}
        if(!isGlassBlock) {
            drawSparkParticle(player, shootDirection, hitPosition);
            drawShootHoleParticle(player, blockDirection, hitPosition);
        }
    }

    return {anyHits, anyHeadshots, damage};
}
/**
 * 
 * @param {number} distance 
 * @param {FirearmDef.Gun} gunObject 
 * @returns {number}
 */
function calculateDamage(distance, gunObject) {
    
    if(distance >= gunObject.damageDropoff.maxDropOffRange) {
        return gunObject.damageDropoff.minDamage;
    }
    else if(distance >= gunObject.damageDropoff.minDropOffRange) {
        return Number(MathUtils.mapLinear(distance, gunObject.damageDropoff.minDropOffRange, gunObject.damageDropoff.maxDropOffRange, gunObject.damageDropoff.maxDamage, gunObject.damageDropoff.minDamage));
    }
    return gunObject.damageDropoff.maxDamage;
}


/**
 * 
 * @param {Player} player 
 * @param {FirearmDef.Firearm} firearm
 * @param {import('@minecraft/server').Vector2} initialOffset
 * @returns {Vector3}
 */
function calculateShootDirection(player, firearm, initialOffset = {x:0, y:0}) {    
    const view = player.getViewDirection();


    let recoil = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.recoil));
    if(Number.isNaN(recoil)) { recoil = 0; }
    
    let recoilMultiplier = 1.0;
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming)) {
        recoilMultiplier = firearm.scopeAttribute.recoilMultiplier;
    }

    let degrees = firearm.minSpreadDegrees + (firearm.maxSpreadDegrees-firearm.minSpreadDegrees)*(recoil/100);
    if(degrees > firearm.maxSpreadDegrees) { degrees = firearm.maxSpreadDegrees; }
    degrees = degrees*recoilMultiplier;
    //console.log(`degrees: ${degrees}`);
    

    const theta = NumberUtil.getRandomFloat(-degrees, degrees)/180*Math.PI;
    const randDir2 = RandVec.circle();
    const offset = new Vector3(randDir2.x, 0, randDir2.y);
    const mag = Math.tan(theta);
    offset.multiplyScalar(mag);
    offset.add(new Vector3(-initialOffset.x, 0, -initialOffset.y));
    const basis = Mat3.buildTNB(view);

    //const basisStr = `[${basis.m11}, ${basis.m12}, ${basis.m13}]\n[${basis.m21}, ${basis.m22}, ${basis.m23}]\n[${basis.m31}, ${basis.m32}, ${basis.m33}]`
    //console.log(`basis: \n${basisStr}`);
    const offsetVector = Mat3.mul(basis, offset);
    //console.log(`offsetVector: ${offsetVector.x}, ${offsetVector.y}, ${offsetVector.z}`);
    //console.log(`view: ${view.x}, ${view.y}, ${view.z}`);
    return new Vector3(view.x, view.y, view.z).add(offsetVector);
}

/**
 * 
 * @param {Player} player 
 * @param {Vector3} shootDirection 
 */
function drawBulletTrace(player, shootDirection) {
    const normalViewDir = new Vector3(player.getViewDirection().x*0.1, player.getViewDirection().y*0.1+0.1, player.getViewDirection().z*0.1);
    const spawnPosition = new Vector3(player.getHeadLocation().x, player.getHeadLocation().y, player.getHeadLocation().z).add(normalViewDir);
    const vars = new MolangVariableMap();
    vars.setVector3("direction", shootDirection);
    player.dimension.spawnParticle("yes:bullet_trace", spawnPosition, vars);
}

/**
 * 
 * @param {Player}  player 
 * @param {Vector3} direction 
 * @param {Vector3} position 
 */
function drawSparkParticle(player, direction, position) {
    const vars = new MolangVariableMap();
    vars.setVector3("direction", direction.multiplyScalar(-1));
    try {
        player.dimension.spawnParticle("yes:bullet_collision", position, vars);
    }
    catch {}
}
/**
 * 
 * @param {Player}  player 
 * @param {Direction?} blockDirection 
 * @param {Vector3} position 
 */
function drawShootHoleParticle(player, blockDirection, position) {
    if(blockDirection === null) { return; }
    let faceDirection;
    switch(blockDirection) {
        case Direction.North:
            faceDirection = new Vector3(0, 0, -1);
            break;
        case Direction.South:
            faceDirection = new Vector3(0, 0, 1);
            break;

        case Direction.Down:
            faceDirection = new Vector3(0, 1, 0);
            position.y -= 0.1;
            break;
        case Direction.Up:
            faceDirection = new Vector3(0, -1, 0);
            break;
        
    
        case Direction.East:
            faceDirection = new Vector3(1, 0, 0);
            break;
        case Direction.West:
            faceDirection = new Vector3(-1, 0, 0);
            break;
        default:
            faceDirection = new Vector3(0, 0, 0);
            break;
    }
    const vars = new MolangVariableMap();
    vars.setVector3("direction", faceDirection);
    try {
        player.dimension.spawnParticle("yes:bullet_hole", position, vars);
    }
    catch {}
}

/**
 * 
 * @param {Player}  player 
 * @param {Vector3} direction 
 * @param {Vector3} position 
 * @param {boolean} isHeadshotVar 
 */
function drawHitEntityParticle(player, direction, position, isHeadshotVar) {
    const vars = new MolangVariableMap();
    let particleAmount = 35;
    if(isHeadshotVar) { particleAmount = 100; }
    vars.setVector3("direction", direction);
    vars.setFloat("amount", particleAmount);
    try {
        player.dimension.spawnParticle("yes:bullet_hit_entity", position, vars);
    }
    catch {}
}



/**
 * 
 * @param {Vector3} hitPosition 
 * @param {Entity} target
 * @param {Vector3} targetHeadPosition 
 * @returns {boolean}
 */
function isHeadshot(hitPosition, target, targetHeadPosition) {
    const distanceFromHead = new Vector3(hitPosition.x, hitPosition.y, hitPosition.z).sub(targetHeadPosition).length();
    const distanceFromBottom = hitPosition.y - target.location.y;
    //console.log(`distanceFromHead: ${distanceFromHead}`);
    //console.log(`distanceFromBottom: ${distanceFromBottom}`);
    if(target instanceof Player) {
        //console.log(`distanceFromHead: ${distanceFromHead}, playerHeadSize: ${playerHeadSize}`);
        if(distanceFromHead <= playerHeadSize) {
            return true;
        }
    }
    else {
        if(distanceFromHead <= humanoidHeadSize) {
            return true;
        }
    }
    return false;
}



/**
 * 
 * @param {Player} player 
 * @param {boolean} anyHits 
 * @param {boolean} anyHeadshots 
 */
function playHitSounds(player, anyHits, anyHeadshots) {
    if(!anyHits) { return; }
    if(anyHeadshots) {
        player.playSound("firearm.headshot_hit_ping", {pitch: NumberUtil.getRandomFloat(0.9, 1.1)});
        player.playSound("firearm.headshot_hit", {pitch: NumberUtil.getRandomFloat(0.9, 1.1)});
    }
    else { player.playSound("firearm.normal_hit", {pitch: NumberUtil.getRandomFloat(0.9, 1.1)}); }
    const oldId = Global.playerHitMarkerIds.get(player.id);
    if(oldId) { 
        system.clearRun(oldId);
        system.runTimeout(() => {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.hit_marker_variant, anyHeadshots ? HitMarkerVariants.headshot : HitMarkerVariants.normal);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.hit_marker_variant);
            Global.playerHitMarkerIds.delete(player.id);
        }, 1);
    }
    else {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.hit_marker_variant, anyHeadshots ? HitMarkerVariants.headshot : HitMarkerVariants.normal);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.hit_marker_variant);
    }
    const timeoutId = system.runTimeout(() => {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.hit_marker_variant, HitMarkerVariants.none);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.hit_marker_variant);
        Global.playerHitMarkerIds.delete(player.id);
    }, anyHeadshots ? 2 : 1);
    Global.playerHitMarkerIds.set(player.id, timeoutId);
}



//Only Shoot() need to be used outside of this file.
export { shoot, HitMarkerVariants };