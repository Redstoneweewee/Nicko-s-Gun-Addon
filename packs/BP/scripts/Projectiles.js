
import { world, system, EntityInitializationCause, Entity, MolangVariableMap, Player, LocationOutOfWorldBoundariesError, LocationInUnloadedChunkError, Block, ProjectileHitBlockAfterEvent, ProjectileHitEntityAfterEvent, Direction, EntityComponentTypes, EntitySpawnAfterEvent } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from "./Global.js";
import { MagazineTypeIds } from './1Enums/MagazineEnums.js';
import { ExplosiveMagazineAmmo } from './2Definitions/MagazineDefinition.js';
import { MathUtils } from './Math/MathUtils.js';
import { excludedFamilies, excludedGameModes, excludedTypes } from './1Enums/HitExclusionArrays.js';
import { ColorUtil, DamageUtil } from './Utilities.js';
import { blockColorsMap, defaultColor, tagColorsMap } from './3Lists/BlockColorsList.js';
import { BlockColor } from './2Definitions/BlockColorsDefinition.js';
import { MagazineObjects } from './3Lists/MagazinesList.js';
const Vector = new Vector3();

/**@type {Map<Entity, Number>}  */
const intervalIDMap = new Map();

/**@type {Map<Entity, number>} */
const bounceRestitutionMap = new Map();

/**@type {Map<Entity, boolean>} */
const grenadePrimedMap = new Map();

//For Rockets
world.afterEvents.entitySpawn.subscribe(eventData => {
    if(eventData.cause !== EntityInitializationCause.Loaded && eventData.cause != EntityInitializationCause.Spawned) return;
    if(eventData.entity.typeId === "yes:rocket") { trackRocket(eventData); }
    else if(eventData.entity.typeId === "yes:explosive_grenade") { trackGrenade(eventData); }

});

world.afterEvents.projectileHitBlock.subscribe(eventData => {
    if(eventData.projectile.typeId === "yes:rocket") { explodeExplosive(eventData.projectile, eventData.location, "block"); }
    else if(eventData.projectile.typeId === "yes:explosive_grenade") { tryBounceExplosive(eventData, false); }
});

world.afterEvents.projectileHitEntity.subscribe(eventData => {
    if(eventData.projectile.typeId === "yes:rocket") { explodeExplosive(eventData.projectile, eventData.location, "entity"); }
    else if(eventData.projectile.typeId === "yes:explosive_grenade") { tryBounceExplosive(eventData, false); }
});


/**
 * @param {EntitySpawnAfterEvent} eventData
 */
function trackRocket(eventData) {
    const entity = eventData.entity;

    const dimension = entity.dimension;
    let totalTime = 0;
    const intervalId = system.runInterval(() => {

        
        try {
        let direction = new Vector3(-entity.getViewDirection().x, -entity.getViewDirection().y, entity.getViewDirection().z).multiplyScalar(-1);

        const location1 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(6.3));
        const location2 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(8.3));
        const location3 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(10.3));
        const vars = new MolangVariableMap();
        vars.setVector3("direction", direction);
            dimension.spawnParticle("yes:rpg7_smoke_trail", location1, vars);
            dimension.spawnParticle("yes:rpg7_smoke_trail", location2, vars);
            dimension.spawnParticle("yes:rpg7_smoke_trail", location3, vars);
        } catch {}
        totalTime++;
        try {
            if(totalTime >= 200) {
                explodeExplosive(entity, entity.location, "block");
            }
        }
        catch {
            if(totalTime >= 200) {
                explodeExplosive(entity, new Vector3(), "block");
            }
        }
    }, 1);

    intervalIDMap.set(entity, intervalId);
}


/**
 * @param {EntitySpawnAfterEvent} eventData
 */
function trackGrenade(eventData) {
    const grenade = eventData.entity;
    const initialLocation = grenade.location;

    grenadePrimedMap.set(grenade, false);
    let totalTime = 0;

    const intervalId = system.runInterval(() => {
        const distanceTraveled = new Vector3(grenade.location.x-initialLocation.x, grenade.location.y-initialLocation.y, grenade.location.z-initialLocation.z).length();
        totalTime++;
        if(totalTime*distanceTraveled >= 400 || totalTime >= 100) {
            grenadePrimedMap.set(grenade, true);
        }
        if(grenadePrimedMap.get(grenade) && new Vector3(grenade.getVelocity().x, grenade.getVelocity().y, grenade.getVelocity().z).length() <= 0.01) {
            explodeExplosive(grenade, grenade.location, "block");
        }
    });
    intervalIDMap.set(grenade, intervalId);
}
/**
 * @param {Entity} explosive 
 * @param {import('@minecraft/server').Vector3} location 
 * @param {"block"|"entity"} hitType
 */
function explodeExplosive(explosive, location, hitType) {
    try {
        
        const dimension = explosive.dimension;
        //const tpLocation = new Vector3(location.x, location.y, location.z).add(new Vector3(direction.x, direction.y, direction.z));
        //explosive.dimension.getPlayers()[0].teleport(tpLocation);
        //console.log(`tp to ${tpLocation.x}, ${tpLocation.y}, ${tpLocation.z}`);
        
        /**@ts-ignore */
        const magazineObject = Global.magazines.get(String(explosive.getDynamicProperty(Global.ProjectileDynamicProperties.magazineObjectTypeId)));



        if(magazineObject === undefined || !(magazineObject instanceof ExplosiveMagazineAmmo)) return;

        const attribute = magazineObject.projectileAttribute;

        const explosiveEntity = dimension.spawnEntity("yes:explosive_entity", location);
        explosiveEntity.triggerEvent(world.gameRules.mobGriefing ? `explode_${attribute.explosionPower}_no_damage` : `explode_${attribute.explosionPower}_no_damage_no_break`);



        attribute.explosiveCamerashakes.forEach(explosiveCamerashake => {
            const players = dimension.getPlayers({location: location, maxDistance: explosiveCamerashake.range});
            players.forEach(player => {
                player.runCommand(`camerashake add @s ${explosiveCamerashake.intensity} ${Math.floor(explosiveCamerashake.duration/20)} rotational`);
            });
        });


        const damageAttribute = attribute.explosiveDamage;
        const numberOfTargets = DamageUtil.dealExplosionDamageAndKnockback(explosive, location, damageAttribute.range, damageAttribute.minDamage, damageAttribute.maxDamage, damageAttribute.minKnockback, damageAttribute.maxKnockback);


        const players = dimension.getPlayers({location: location, maxDistance: attribute.explosiveStun.range});
        const stunAttribute = attribute.explosiveStun;
        players.forEach(player => {
            const distance = new Vector3(player.location.x, player.location.y, player.location.z).sub(new Vector3(location.x, location.y, location.z)).length();

            /** @type {Number} */
            const screenDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minScreenDuration, stunAttribute.maxScreenDuration);
            player.addEffect("blindness", Math.floor(screenDuration), {showParticles: false});

            /** @type {Number} */
            const aimRestrictionDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minAimRestrictionDuration, stunAttribute.maxAimRestrictionDuration);
            player.setDynamicProperty(Global.PlayerDynamicProperties.script.aimRestrictionNumber, Math.floor(aimRestrictionDuration));
            
            /** @type {Number} */
            const debrisDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minScreenDebrisDuration, stunAttribute.maxScreenDebrisDuration);
            const stayPortion = Math.min(Math.pow(((stunAttribute.range - distance)/stunAttribute.range)/0.8, 3)/2, 0.5);
            const outPortion = 1 - stayPortion;
            //console.log(`debrisDuration: ${debrisDuration}, stay: ${stayPortion}, out: ${outPortion}`);
            player.onScreenDisplay.setTitle("", {fadeInDuration: 0, stayDuration: debrisDuration*stayPortion, fadeOutDuration: debrisDuration*outPortion});            
        });


        const direction = {x:-explosive.getViewDirection().x, y:-explosive.getViewDirection().y, z:explosive.getViewDirection().z };

        const blockInFront = dimension.getBlockFromRay(location, direction);
        const sizeMult = attribute.explosionPower/3;
        const vars1 = new MolangVariableMap();
        vars1.setFloat("size_mult", sizeMult);
        console.log(`size_mult: ${sizeMult}`);

        dimension.spawnParticle("yes:explosion_flash", location, vars1);
        dimension.spawnParticle("yes:explosion_flash_middle", location, vars1);
        dimension.spawnParticle("yes:explosion_sparks", location, vars1);
        dimension.spawnParticle("yes:explosion_mushroom", location, vars1);
        dimension.spawnParticle("yes:explosion_smoke", location, vars1);
        dimension.spawnParticle("yes:explosion_smoke_flash", location, vars1);

        if(hitType === "block" && blockInFront !== undefined) {
            const blockColor = ColorUtil.getBlockColor(blockInFront.block);
            /**@type {import('@minecraft/server').RGB} */
            const blockColorNew = {
                red: MathUtils.lerp(blockColor.red,defaultColor.red,Math.min(sizeMult/100, 1)),
                green: MathUtils.lerp(blockColor.green,defaultColor.green,Math.min(sizeMult/100, 1)),
                blue: MathUtils.lerp(blockColor.blue,defaultColor.blue,Math.min(sizeMult/100, 1)),
            };

            const vars2 = new MolangVariableMap();
            vars2.setColorRGB("color", blockColorNew);
            vars2.setFloat("size_mult", sizeMult);
            //console.log(`blockInFront: ${blockInFront.block.typeId}, color: ${blockColor.red}, ${blockColor.green}, ${blockColor.blue}`);
            dimension.spawnParticle("yes:explosion_debris", location, vars2);
        }
        else if(hitType === "entity") {
            const vars = new MolangVariableMap();
            vars.setFloat("amount", Math.min(numberOfTargets*100, 500));
            //console.log(`particle count: ${Math.min(numberOfTargets*100, 500)}`);
            dimension.spawnParticle("yes:explosion_blood", location, vars);
        }
        cleanUpExplosion(explosive);
    }
    catch(error) {
        cleanUpExplosion(explosive, "removed unloaded explosive");
    }
}

/**
 * 
 * @param {Entity} explosive 
 * @param {string} [message] 
 */
function cleanUpExplosion(explosive, message) {
    if(message) console.log(message);
    const intervalId = intervalIDMap.get(explosive);
    intervalIDMap.delete(explosive);
    bounceRestitutionMap.delete(explosive);
    grenadePrimedMap.delete(explosive);

    try { explosive.remove(); } catch {}
    if(intervalId === undefined) return; 
    system.clearRun(intervalId);
}

/**
 * @param {ProjectileHitBlockAfterEvent|ProjectileHitEntityAfterEvent} eventData 
 * @param {boolean} bounceOffEntities 
 */
function tryBounceExplosive(eventData, bounceOffEntities) {
    const explosive = eventData.projectile;

    if(grenadePrimedMap.get(explosive) === true || (!bounceOffEntities && eventData instanceof ProjectileHitEntityAfterEvent)) {
        explodeExplosive(explosive, explosive.location, eventData instanceof ProjectileHitBlockAfterEvent ? "block" : "entity");
        return;
    }
    const blockRestitutionCoefficient = 0.6;
    const entityRestitutionCoefficient = 0.1; 
    const hitLocation = eventData.location;
    
    /**@ts-ignore */
    const magazineObject = Global.magazines.get(String(explosive.getDynamicProperty(Global.ProjectileDynamicProperties.magazineObjectTypeId)));

    const initialSpeed = magazineObject instanceof ExplosiveMagazineAmmo ? magazineObject.projectileAttribute.speed : 0;
    let localRestitutionCoefficient = bounceRestitutionMap.get(explosive);
    if(localRestitutionCoefficient !== undefined && localRestitutionCoefficient <= 0.01) return;
    /**@type {Vector3} */
    let hitNormal;
    if(eventData instanceof ProjectileHitBlockAfterEvent) {
        switch(eventData.getBlockHit().face) {
            case Direction.Up:
                hitNormal = new Vector3(0, 1, 0);
                break;
            case Direction.Down:
                hitNormal = new Vector3(0, -1, 0);
                break;
            case Direction.East:
                hitNormal = new Vector3(1, 0, 0);
                break;
            case Direction.West:
                hitNormal = new Vector3(-1, 0, 0);
                break;
            case Direction.North:
                hitNormal = new Vector3(0, 0, 1);
                break;
            case Direction.South:
                hitNormal = new Vector3(0, 0, -1);
                break;
        }
    }
    else {
        hitNormal = new Vector3(-eventData.hitVector.x, -eventData.hitVector.y, -eventData.hitVector.z).normalize();
    }

    if(localRestitutionCoefficient !== undefined) {
        if(eventData instanceof ProjectileHitBlockAfterEvent) localRestitutionCoefficient *= blockRestitutionCoefficient;
        else localRestitutionCoefficient *= entityRestitutionCoefficient;
        bounceRestitutionMap.set(explosive, localRestitutionCoefficient);
    }
    else {
        if(eventData instanceof ProjectileHitBlockAfterEvent) {
            bounceRestitutionMap.set(explosive, blockRestitutionCoefficient);
            localRestitutionCoefficient = blockRestitutionCoefficient;
        }
        else {
            bounceRestitutionMap.set(explosive, entityRestitutionCoefficient);
            localRestitutionCoefficient = entityRestitutionCoefficient;
        }
    }
    //console.log(`hitNormal: ${hitNormal.x}, ${hitNormal.y}, ${hitNormal.z}`);

    const oldDirection = new Vector3(eventData.hitVector.x, eventData.hitVector.y, eventData.hitVector.z); 
    const newDirection = new Vector3(oldDirection.x, oldDirection.y, oldDirection.z);
    newDirection.sub(new Vector3(hitNormal.x, hitNormal.y, hitNormal.z).multiplyScalar(2*new Vector3(oldDirection.x, oldDirection.y, oldDirection.z).dot(hitNormal)));
    newDirection.normalize();
    const newVelocity = new Vector3(newDirection.x, newDirection.y, newDirection.z).multiplyScalar(localRestitutionCoefficient*initialSpeed);

    explosive.clearVelocity();
    //explosive.applyImpulse(newVelocity);
    if(hitNormal.x === -1) {
        explosive.teleport(new Vector3(hitLocation.x-0.1, hitLocation.y, hitLocation.z));
    }
    else if(hitNormal.z === 1) {
        explosive.teleport(new Vector3(hitLocation.x, hitLocation.y, hitLocation.z-0.1));
    }
    else if(hitNormal.y === -1) {
        explosive.teleport(new Vector3(hitLocation.x, hitLocation.y-0.1, hitLocation.z));
    }
    else if(eventData instanceof ProjectileHitEntityAfterEvent) {
        const tp = new Vector3(hitNormal.x, hitNormal.y, hitNormal.z).multiplyScalar(0.1);
        explosive.teleport(new Vector3(hitLocation.x+tp.x, hitLocation.y+tp.y, hitLocation.z+tp.z));
    }

    explosive.getComponent(EntityComponentTypes.Projectile)?.shoot(newVelocity, {uncertainty: 0.1});
    // if(localRestitutionCoefficient === blockRestitutionCoefficient || localRestitutionCoefficient === entityRestitutionCoefficient) { 
    //     console.log(`localRestitutionCoefficient: ${localRestitutionCoefficient}`);
    //     console.log(`hitNormal: ${hitNormal.x}, ${hitNormal.y}, ${hitNormal.z}`);
    //     console.log(`new velo: ${newVelocity.x} ${newVelocity.y} ${newVelocity.z}`);
    // }
    //console.log(`new speed: ${new Vector3(newVelocity.x, newVelocity.y, newVelocity.z).length()}`);
}
