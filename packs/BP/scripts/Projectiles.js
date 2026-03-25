
import { world, system, EntityInitializationCause, Entity, MolangVariableMap, Player, LocationOutOfWorldBoundariesError, LocationInUnloadedChunkError, Block, ProjectileHitBlockAfterEvent, ProjectileHitEntityAfterEvent, Direction, EntityComponentTypes, EntitySpawnAfterEvent, BlockVolume, BlockVolumeBase, Dimension } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from "./Global.js";
import { MagazineTypeIds } from './1Enums/MagazineEnums.js';
import { ExplosiveEffectAttribute, ExplosiveMagazineAmmo } from './2Definitions/MagazineDefinition.js';
import { clamp, MathUtils } from './Math/MathUtils.js';
import { excludedFamilies, excludedGameModes, excludedTypes } from './1Enums/HitExclusionArrays.js';
import { ColorUtil, DamageUtil, EntityUtil, NumberUtil, PlayerUtil, RangeUtil, VolumeUtil } from './Utilities.js';
import { blockColorsMap, defaultColor, tagColorsMap } from './3Lists/BlockColorsList.js';
import { BlockColor } from './2Definitions/BlockColorsDefinition.js';
import { MagazineObjects } from './3Lists/MagazinesList.js';
import { ExplosivesList } from './3Lists/ExplosivesList.js';
import { SmokeParticleTypes } from './1Enums/ParticleEnums.js';
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
    if(ExplosivesList.Rockets.includes(eventData.entity.typeId)) { trackRocket(eventData); }
    else if(ExplosivesList.Grenades.includes(eventData.entity.typeId)) { trackGrenade(eventData); }

});

world.afterEvents.projectileHitBlock.subscribe(eventData => {
    if(ExplosivesList.Rockets.includes(eventData.projectile.typeId)) { explodeExplosive(eventData.projectile, eventData.location, "block"); }
    else if(ExplosivesList.Grenades.includes(eventData.projectile.typeId)) { tryBounceExplosive(eventData, false); }
});

world.afterEvents.projectileHitEntity.subscribe(eventData => {
    if(ExplosivesList.Rockets.includes(eventData.projectile.typeId)) { explodeExplosive(eventData.projectile, eventData.location, "entity", eventData.getEntityHit().entity); }
    else if(ExplosivesList.Grenades.includes(eventData.projectile.typeId)) { tryBounceExplosive(eventData, false); }
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
 * @param {Entity} [hitEntity]
 */
function explodeExplosive(explosive, location, hitType, hitEntity) {
    if(!EntityUtil.isActuallyValid(explosive)) {
        cleanUpExplosion(explosive, "removed unloaded explosive");
        return;
    }
    const dimension = explosive.dimension;
    //const tpLocation = new Vector3(location.x, location.y, location.z).add(new Vector3(direction.x, direction.y, direction.z));
    //explosive.dimension.getPlayers()[0].teleport(tpLocation);
    //console.log(`tp to ${tpLocation.x}, ${tpLocation.y}, ${tpLocation.z}`);
    
    /**@ts-ignore */
    const magazineObject = Global.magazines.get(String(explosive.getDynamicProperty(Global.ProjectileDynamicProperties.magazineObjectTypeId)));



    if(magazineObject === undefined || !(magazineObject instanceof ExplosiveMagazineAmmo)) return;

    const attribute = magazineObject.projectileAttribute;
    const particleAttribute = magazineObject.particleAttribute;

    if(attribute.explosionPower !== 0) {
        const explosiveEntity = dimension.spawnEntity("yes:explosive_entity", location);
        explosiveEntity.triggerEvent(world.gameRules.mobGriefing ? `explode_${attribute.explosionPower}_no_damage` : `explode_${attribute.explosionPower}_no_damage_no_break`);
    }


    attribute.explosiveCamerashakes.forEach(explosiveCamerashake => {
        const players = dimension.getPlayers({location: location, maxDistance: explosiveCamerashake.range});
        players.forEach(player => {
            player.runCommand(`camerashake add @s ${explosiveCamerashake.intensity} ${Math.floor(explosiveCamerashake.duration/20)} rotational`);
        });
    });


    let numberOfTargets = 0;
    const damageAttribute = attribute.explosiveDamage;
    if(damageAttribute) {
        numberOfTargets = DamageUtil.dealExplosionDamageAndKnockback(dimension, location, damageAttribute.range, damageAttribute.damage.min, damageAttribute.damage.max, damageAttribute.knockback.min, damageAttribute.knockback.max);
        if(hitEntity && damageAttribute.directDamage > 0) {
            DamageUtil.dealDamageNoMultiplier(hitEntity, damageAttribute.directDamage);
        }
    }
    const effectAttribute = attribute.explosiveEffect;
    if(effectAttribute) {
        if(effectAttribute.setFire) {
            const fireAttribute = effectAttribute.setFire;
            const vars = new MolangVariableMap();
            vars.setFloat("size_mult", particleAttribute.explosionSize);
            vars.setFloat("duration", 2);
            dimension.spawnParticle("yes:explosion_fire_sparks", location, vars);

            const blockVolume = VolumeUtil.createBoxVolume(new Vector3(location.x, location.y, location.z), effectAttribute.range*2, fireAttribute.height, effectAttribute.range*2);
            system.runJob(fillFireBlocks(dimension, blockVolume, effectAttribute, location));
        }
        else if(effectAttribute.applyPoison) {
            const poisonAttribute = effectAttribute.applyPoison;
            const startTick = system.currentTick;
            const vars = new MolangVariableMap();
            vars.setFloat("range", effectAttribute.range);
            vars.setFloat("duration", poisonAttribute.duration);
            dimension.spawnParticle("yes:range_based_poison_smoke", location, vars);

            const intervalId = system.runInterval(() => {
                if(system.currentTick - startTick >= poisonAttribute.duration) {
                    system.clearRun(intervalId);
                    return;
                }
                const targets = RangeUtil.getValidEntitiesNearbyLocation( new Vector3(location.x, location.y, location.z), dimension, effectAttribute.range);
                for(const target of targets) {
                    if(target instanceof Player) {
                        target.addEffect("poison", Math.min(poisonAttribute.ticksPerDamage+2, 24), {amplifier: 0, showParticles: false});
                    }
                    for(const potionEffect of poisonAttribute.potionEffects) {
                        target.addEffect(potionEffect.potionType, potionEffect.duration, {amplifier: potionEffect.amplifier, showParticles: false});
                    }
                    DamageUtil.dealDamageNoMultiplier(target, 1);
                }
            }, poisonAttribute.ticksPerDamage);

        }
    }

    const stunAttribute = attribute.explosiveStun;
    if(stunAttribute) {
        const entities = EntityUtil.getValidEntitiesNearbyEntity(explosive, stunAttribute.range);
        for(const entity of entities) {
            const distance = new Vector3(entity.location.x, entity.location.y, entity.location.z).sub(new Vector3(location.x, location.y, location.z)).length();

            if(entity instanceof Player) {
                const screenDuration = stunAttribute.screenDuration.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range);
                //const screenDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.screenDuration.min, stunAttribute.screenDuration.max);
                entity.addEffect("blindness", Math.floor(screenDuration), {showParticles: false});

                const aimRestrictionDuration = stunAttribute.aimRestrictionDuration.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range);
                //const aimRestrictionDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minAimRestrictionDuration, stunAttribute.maxAimRestrictionDuration);
                entity.setDynamicProperty(Global.PlayerDynamicProperties.script.aimRestrictionNumber, Math.floor(aimRestrictionDuration));
                
                const debrisDuration = stunAttribute.screenDebrisDuration.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range);
                //const debrisDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minScreenDebrisDuration, stunAttribute.maxScreenDebrisDuration);
                const stayPortion = Math.min(Math.pow(((stunAttribute.range - distance)/stunAttribute.range)/0.8, 3)/2, 0.5);
                const outPortion = 1 - stayPortion;
                //console.log(`debrisDuration: ${debrisDuration}, stay: ${stayPortion}, out: ${outPortion}`);
                entity.onScreenDisplay.setTitle("", {fadeInDuration: 0, stayDuration: debrisDuration*stayPortion, fadeOutDuration: debrisDuration*outPortion});


                const flashDuration = stunAttribute.screenFlashDuration.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range);
                //const debrisDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minScreenDebrisDuration, stunAttribute.maxScreenDebrisDuration);
                
                console.log(`flashDuration: ${flashDuration}`);
                if(flashDuration !== 0) entity.camera.fade({fadeColor: {red: 1, green: 1, blue: 1}, fadeTime: {fadeInTime: 0.1, holdTime: flashDuration/20, fadeOutTime: 0.5} })
            }


            const aimRestrictionDuration = stunAttribute.aimRestrictionDuration.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range);
            //const aimRestrictionDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minAimRestrictionDuration, stunAttribute.maxAimRestrictionDuration);
            entity.addEffect("weakness", Math.floor(aimRestrictionDuration), {amplifier: 255, showParticles: false});
                

            const movementRestrictionDuration = Math.floor(stunAttribute.movementRestrictionDuration.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range));
            const movementRestrictionMultiplier = stunAttribute.movementRestrictionMultiplier.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range);
            const movementComponent = entity.getComponent(EntityComponentTypes.Movement);
            if(!movementComponent) continue;
            movementComponent.setCurrentValue(movementComponent.defaultValue*(1-movementRestrictionMultiplier));
            let t = 0;
            const intervalId = system.runInterval(() => {
                if(!EntityUtil.isActuallyValid(entity)) {
                    system.clearRun(intervalId);
                    return;
                }
                else if(t >= movementRestrictionDuration) {
                    movementComponent.setCurrentValue(movementComponent.defaultValue);
                    system.clearRun(intervalId);
                    return;
                }

                movementComponent.setCurrentValue(movementComponent.defaultValue*(1-movementRestrictionMultiplier*(1-t/movementRestrictionDuration)));
                console.log(`set movement restriction on ${entity.typeId} with multiplier ${movementComponent.defaultValue*(1-movementRestrictionMultiplier*(1-t/movementRestrictionDuration))}`);
                t+=2;
            }, 2);
            world.sendMessage(`set movement restriction on ${entity.typeId} for ${movementRestrictionDuration/20} seconds with multiplier ${1-movementRestrictionMultiplier}`);
        }
    }


    const direction = {x:-explosive.getViewDirection().x, y:-explosive.getViewDirection().y, z:explosive.getViewDirection().z };

    const blockInFront = dimension.getBlockFromRay(location, direction);
    const sizeMult = particleAttribute.explosionSize;
    const vars1 = new MolangVariableMap();
    vars1.setFloat("size_mult", sizeMult);
    console.log(`size_mult: ${sizeMult}`);

    if(particleAttribute.showExplosionFlash)                              dimension.spawnParticle("yes:explosion_flash",        location, vars1);
    if(particleAttribute.showExplosionFlash)                              dimension.spawnParticle("yes:explosion_flash_middle", location, vars1);
    if(particleAttribute.showExplosionSparks)                             dimension.spawnParticle("yes:explosion_sparks",       location, vars1);
    if(particleAttribute.showExplosionMushroom)                           dimension.spawnParticle("yes:explosion_mushroom",     location, vars1);
    if(particleAttribute.explosionSmokeType === SmokeParticleTypes.Black) dimension.spawnParticle("yes:explosion_smoke_black",  location, vars1);
    if(particleAttribute.explosionSmokeType === SmokeParticleTypes.White) dimension.spawnParticle("yes:explosion_smoke_white",  location, vars1);
    if(particleAttribute.explosionSmokeType === SmokeParticleTypes.Green) dimension.spawnParticle("yes:explosion_smoke_green",  location, vars1);
    if(particleAttribute.showExplosionSmokeFlash)                         dimension.spawnParticle("yes:explosion_smoke_flash",  location, vars1);

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

/**
 * 
 * @param {Dimension} dimension 
 * @param {BlockVolumeBase} blockVolume
 * @param {ExplosiveEffectAttribute} effectAttribute
 * @param {import('@minecraft/server').Vector3} location
 */
function* fillFireBlocks(dimension, blockVolume, effectAttribute, location) {
    const filledBlocks = dimension.fillBlocks(blockVolume, "minecraft:fire", {blockFilter: {includeTypes: ["minecraft:air"]}, ignoreChunkBoundErrors: true});

    for(const blockLocation of filledBlocks.getBlockLocationIterator()) {
        const rayCastDirUnnorm = new Vector3(blockLocation.x - location.x, blockLocation.y - location.y, blockLocation.z - location.z);
        const rayCastDirUnnormLength = rayCastDirUnnorm.length();

        if(rayCastDirUnnormLength > effectAttribute.range) {
            try { dimension.getBlock(blockLocation)?.setType("minecraft:air"); } catch {}
            yield;
        }
        const rayResult = dimension.getBlockFromRay(location, rayCastDirUnnorm, {
            maxDistance: rayCastDirUnnormLength,
        });
        if(rayResult) {
            try { dimension.getBlock(blockLocation)?.setType("minecraft:air"); } catch {}
            yield;
        }

        if(Math.random() > (effectAttribute.setFire?.chance ?? 1)) {
            try { dimension.getBlock(blockLocation)?.setType("minecraft:air"); } catch {}
            yield;
        }
        yield;
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
    if(!EntityUtil.isActuallyValid(explosive)) {
        return;
    }

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
