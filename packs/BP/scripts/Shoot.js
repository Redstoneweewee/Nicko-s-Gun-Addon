import { Direction, Entity, EntityComponentTypes, EntityHealthComponent, GameMode, MolangVariableMap, Player, system, world } from '@minecraft/server';
import * as FirearmDef from './Definitions/FirearmDefinition.js';
import { AnimationUtil, DamageUtil, FirearmIdUtil, FirearmUtil, ItemUtil, LoopUtil, NumberUtil, SoundsUtil } from './Utilities.js';
import { Global } from './Global.js';
import { automaticReloadDetection } from './Detectors/AutoReloadDetection.js';
import { renewAmmoCount } from './AmmoText.js';
import { glassBlocksList } from './Lists/glassBlocksList.js';
import { AnimationTypes } from './Definitions/AnimationDefinition.js';
import { Vector3 } from './Math/Vector3.js';
import { Mat3, RandVec } from './Math/MADLAD/index.js';
import { AnimationLink } from './AnimationLink.js';
//import { Mat3, RandVec } from '@madlad3718/mcveclib';


const humanoidHeadSize = 0.5;
const playerHeadSize = 1.31;
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
    if(ammoCount === null || ammoCount <= 0 || player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { 
        LoopUtil.stopAsyncLoop(player, Global.playerShootingLoopIds);
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        if(firearmItemStack !== null) {
            automaticReloadDetection(player, firearmItemStack, false);
        }
        renewAmmoCount(player);
        console.log("out of ammo");
        return;
    }
    //console.log(`ammoCount: ${ammoCount}, isReloading: ${player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)}`);


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
    for(let i=0; i<gun.bulletsPerShot; i++) {
        const obj = doShootRayCasts(player, gun);
        if(obj[0]) { anyHits = true; }
        if(obj[1]) { anyHeadshots = true; }
    }
    playHitSounds(player, anyHits, anyHeadshots);

    const newAmmoCount = FirearmUtil.tryConsumeFirearmAmmo(player, gun, 1);
    FirearmUtil.tryAddScreenshakeRecoil(player, gun);
    
    let playedSound = AnimationUtil.playAnimationWithSound(player, gun, AnimationTypes.shoot) === undefined ? false : true;
    if(!playedSound) {
        if(newAmmoCount !== null && newAmmoCount > 0) {
            AnimationUtil.playAnimationWithSound(player, gun, AnimationTypes.shootWithAmmo);
        }
        else if(newAmmoCount === 0) {
            AnimationUtil.playAnimationWithSound(player, gun, AnimationTypes.shootOutOfAmmo);
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
}


/**
 * 
 * @param {Player} player 
 * @param {FirearmDef.Gun} gun 
 * @returns {Array<boolean, boolean>}
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

    if(blockRayCast !== undefined) {
        const glassBlock = blockRayCast.block;
        try {
            if(glassBlocksList.includes(glassBlock.typeId)) {
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
        maxDistance: gun.range, 
        excludeFamilies: DamageUtil.getHitExcludedFamilies(), 
        excludeTypes: DamageUtil.getHitExcludedTypes()
    });

    let numHit = 0;
    let anyHits = false;
    let anyHeadshots = false;
    entityRayCast.forEach(rayCastHit => {
        if(numHit >= gun.pierce) { return; }
        const target = rayCastHit.entity;
        if(target === player) { return; }
        if(target instanceof Player && (DamageUtil.getHitExcludeGameModes().includes(target.getGameMode()) || world.gameRules.pvp === false)) { return; }
        const healthComponent = target.getComponent(EntityComponentTypes.Health);
        if(healthComponent instanceof EntityHealthComponent) { 
            if(healthComponent.currentValue <= 0) { return; }
        }

        hitBlock = false;
        hitPosition = new Vector3(headLocation.x, headLocation.y, headLocation.z).add(new Vector3(shootDirection.x, shootDirection.y, shootDirection.z).multiplyScalar(rayCastHit.distance));
        const isHeadshotVar = isHeadshot(new Vector3(hitPosition.x, hitPosition.y, hitPosition.z), target, new Vector3(target.getHeadLocation().x, target.getHeadLocation().y, target.getHeadLocation().z));
        if(isHeadshotVar) { 
            DamageUtil.dealDamageWithMultiplier(target, gun.headshotBulletDamage); 
            anyHeadshots = true;
        }
        else { DamageUtil.dealDamageWithMultiplier(target, gun.normalBulletDamage); }
        DamageUtil.dealKnockbackUsingGun(player, target, gun, true);
        drawHitEntityParticle(player, shootDirection, hitPosition, target, isHeadshotVar);
        numHit++;
        anyHits = true;
    });
 

    drawBulletTrace(player, shootDirection);

    if(hitBlock) { 
        const lastBlockRayCast = player.dimension.getBlockFromRay(headLocation, shootDirection, { maxDistance: gun.range, includeLiquidBlocks: false, includePassableBlocks: false  });
        let isGlassBlock = false;
        try {
            if(lastBlockRayCast !== undefined) { isGlassBlock = glassBlocksList.includes(lastBlockRayCast.block.typeId); }
        }
        catch {}
        if(!isGlassBlock) {
            drawSparkParticle(player, shootDirection, hitPosition);
            drawShootHoleParticle(player, blockDirection, hitPosition);
        }
    }

    return [anyHits, anyHeadshots];
}

/**
 * 
 * @param {Player} player 
 * @param {FirearmDef.Firearm} firearm
 * @returns {Vector3}
 */
function calculateShootDirection(player, firearm) {    
    const view = player.getViewDirection();


    let recoil = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.recoil));
    if(recoil === undefined || recoil === null || Number.isNaN(recoil)) { recoil = 0; }
    
    let recoilMultiplier = 1.0;
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming)) {
        recoilMultiplier = firearm.scopeAttributes.recoilMultiplier;
    }

    let degrees = firearm.minSpreadDegrees + (firearm.maxSpreadDegrees-firearm.minSpreadDegrees)*(recoil/100);
    if(degrees > firearm.maxSpreadDegrees) { degrees = firearm.maxSpreadDegrees}
    degrees = degrees*recoilMultiplier;
    //console.log(`degrees: ${degrees}`);
    

    const theta = NumberUtil.getRandomFloat(-degrees, degrees)/180*Math.PI;
    const randDir2 = RandVec.circle();
    const offset = new Vector3(randDir2.x, 0, randDir2.y);
    const mag = Math.tan(theta);
    offset.multiplyScalar(mag);
    const basis = Mat3.buildTNB(view);

    //const basisStr = `[${basis.m11}, ${basis.m12}, ${basis.m13}]\n[${basis.m21}, ${basis.m22}, ${basis.m23}]\n[${basis.m31}, ${basis.m32}, ${basis.m33}]`
    //console.log(`basis: \n${basisStr}`);
    const offsetVector = Mat3.mul(basis, offset);
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
 * @param {Direction | null} blockDirection 
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
 * @param {Entity} target 
 * @param {boolean} isHeadshotVar 
 */
function drawHitEntityParticle(player, direction, position, target, isHeadshotVar) {
    const vars = new MolangVariableMap();
    vars.setVector3("direction", direction.multiplyScalar(-1));
    try {
        player.dimension.spawnParticle("yes:bullet_hit_entity", position, vars);
        if(isHeadshotVar) { 
            const vars2 = new MolangVariableMap();
            vars2.setVector3("direction", new Vector3(0, 1, 0));
            player.dimension.spawnParticle("yes:bullet_hit_entity", target.getHeadLocation(), vars2); 
        }
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
    console.log(`distanceFromHead: ${distanceFromHead}`);
    console.log(`distanceFromBottom: ${distanceFromBottom}`);
    if(target instanceof Player) {
        if(distanceFromHead <= playerHeadSize && distanceFromBottom >= playerHeightUntilHead) {
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