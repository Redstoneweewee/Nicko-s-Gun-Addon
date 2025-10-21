
import { world, system, EntityInitializationCause, Entity, MolangVariableMap, Player, LocationOutOfWorldBoundariesError, LocationInUnloadedChunkError } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from "./Global.js";
import { MagazineTypeIds } from './1Enums/MagazineEnums.js';
import { ExplosiveMagazineAmmo } from './2Definitions/MagazineDefinition.js';
import { MathUtils } from './Math/MathUtils.js';
import { excludedFamilies, excludedGameModes, excludedTypes } from './1Enums/HitExclusionArrays.js';
import { ColorUtil, DamageUtil } from './Utilities.js';
import { blockColorsMap, defaultColor, tagColorsMap } from './3Lists/BlockColorsList.js';
import { BlockColor } from './2Definitions/BlockColorsDefinition.js';
const Vector = new Vector3();

/**@type {Map<Entity, Number>}  */
const entitiesMap = new Map();

//For Rockets
world.afterEvents.entitySpawn.subscribe(eventData => {
    const entity = eventData.entity;
    if(eventData.cause !== EntityInitializationCause.Loaded && eventData.cause != EntityInitializationCause.Spawned) return;
    if(entity.typeId !== "yes:rocket") return;

    const dimension = entity.dimension;
    let totalTime = 0;
    const intervalId = system.runInterval(() => {

        
        let direction = new Vector3(-entity.getViewDirection().x, -entity.getViewDirection().y, entity.getViewDirection().z).multiplyScalar(-1);

        const location1 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(6.3));
        const location2 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(8.3));
        const location3 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(10.3));
        const vars = new MolangVariableMap();
        vars.setVector3("direction", direction);
        try {
            dimension.spawnParticle("yes:rpg7_smoke_trail", location1, vars);
            dimension.spawnParticle("yes:rpg7_smoke_trail", location2, vars);
            dimension.spawnParticle("yes:rpg7_smoke_trail", location3, vars);
        } catch {}
        totalTime++;
        if(totalTime >= 400) {
            rocketExplode(entity, entity.location, "block");
        }
    }, 1);

    entitiesMap.set(entity, intervalId);
});

world.afterEvents.projectileHitBlock.subscribe(eventData => {
    if(eventData.projectile.typeId !== "yes:rocket") return;
    console.log(`hit block`);
    rocketExplode(eventData.projectile, eventData.location, "block");
});

world.afterEvents.projectileHitEntity.subscribe(eventData => {
    if(eventData.projectile.typeId !== "yes:rocket") return;
    console.log(`hit entity`);
    rocketExplode(eventData.projectile, eventData.location, "entity");
});

/**
 * @param {Entity} rocket 
 * @param {import('@minecraft/server').Vector3} location 
 * @param {"block"|"entity"} hitType
 */
function rocketExplode(rocket, location, hitType) {
    try {
        const intervalId = entitiesMap.get(rocket);
        if(intervalId == undefined) return; 
        system.clearRun(intervalId);
        entitiesMap.delete(rocket);
        
        const dimension = rocket.dimension;
        //const tpLocation = new Vector3(location.x, location.y, location.z).add(new Vector3(direction.x, direction.y, direction.z));
        //rocket.dimension.getPlayers()[0].teleport(tpLocation);
        //console.log(`tp to ${tpLocation.x}, ${tpLocation.y}, ${tpLocation.z}`);
        
        /**@ts-ignore */
        const magazineObject = Global.magazines.get(String(rocket.getDynamicProperty(Global.ProjectileDynamicProperties.magazineObjectTypeId)));



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
        const numberOfTargets = DamageUtil.dealExplosionDamageAndKnockback(rocket, location, damageAttribute.range, damageAttribute.minDamage, damageAttribute.maxDamage, damageAttribute.minKnockback, damageAttribute.maxKnockback);


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


        const direction = {x:-rocket.getViewDirection().x, y:-rocket.getViewDirection().y, z:rocket.getViewDirection().z };

        const blockInFront = dimension.getBlockFromRay(location, direction);
        dimension.spawnParticle("yes:explosion_flash", location);
        dimension.spawnParticle("yes:explosion_flash_middle", location);
        dimension.spawnParticle("yes:explosion_sparks", location);
        dimension.spawnParticle("yes:explosion_mushroom", location);
        dimension.spawnParticle("yes:explosion_smoke", location);
        dimension.spawnParticle("yes:explosion_smoke_flash", location);

        if(hitType === "block" && blockInFront !== undefined) {
            const blockColor = ColorUtil.getBlockColor(blockInFront.block);

            const color = new MolangVariableMap();
            color.setColorRGB("color", blockColor);
            console.log(`blockInFront: ${blockInFront.block.typeId}, color: ${blockColor.red}, ${blockColor.green}, ${blockColor.blue}`);
            dimension.spawnParticle("yes:explosion_debris", location, color);
        }
        else if(hitType === "entity") {
            const vars = new MolangVariableMap();
            vars.setFloat("amount", Math.min(numberOfTargets*100, 500));
            console.log(`particle count: ${Math.min(numberOfTargets*100, 500)}`);
            dimension.spawnParticle("yes:explosion_blood", location, vars);
        }
        rocket.remove();
    }
    catch(error) {
        if(error instanceof LocationInUnloadedChunkError || error instanceof LocationOutOfWorldBoundariesError) {
            const intervalId = entitiesMap.get(rocket);
            if(intervalId == undefined) return; 
            system.clearRun(intervalId);
            entitiesMap.delete(rocket);
            rocket.remove();
            console.log(`removed unloaded rocket`);
        }
        else {
            console.trace();
        }
    }
}