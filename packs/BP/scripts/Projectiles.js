
import { world, system, EntityInitializationCause, Entity, MolangVariableMap } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from "./Global.js";
import { MagazineTypeIds } from './1Enums/MagazineEnums.js';
import { ExplosiveMagazineAmmo } from './2Definitions/MagazineDefinition.js';
import { MathUtils } from './Math/MathUtils.js';
const Vector = new Vector3();

/**@type {Map<Entity, Number>}  */
const entitiesMap = new Map();

//For Rockets
world.afterEvents.entitySpawn.subscribe(eventData => {
    const entity = eventData.entity;
    if(eventData.cause !== EntityInitializationCause.Loaded && eventData.cause != EntityInitializationCause.Spawned) return;
    if(entity.typeId !== "yes:rocket") return;

    const intervalId = system.runInterval(() => {

        
        let direction = new Vector3(-entity.getViewDirection().x, -entity.getViewDirection().y, entity.getViewDirection().z).multiplyScalar(-1);

        const location1 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(6.3));
        const location2 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(8.3));
        const location3 = new Vector3(entity.location.x, entity.location.y, entity.location.z).add(new Vector3(direction.x, direction.y, direction.z).multiplyScalar(10.3));
        const vars = new MolangVariableMap();
        vars.setVector3("direction", direction);
        entity.dimension.spawnParticle("yes:rpg_smoke_trail", location1, vars);
        entity.dimension.spawnParticle("yes:rpg_smoke_trail", location2, vars);
        entity.dimension.spawnParticle("yes:rpg_smoke_trail", location3, vars);

    }, 1);

    entitiesMap.set(entity, intervalId);
});

world.beforeEvents.entityRemove.subscribe(eventData => {
    const intervalId = entitiesMap.get(eventData.removedEntity);
    if(intervalId == undefined) return; 
    system.clearRun(intervalId);
    entitiesMap.delete(eventData.removedEntity);
    
    const rocket = eventData.removedEntity;
    const dimension = rocket.dimension;
    const location = rocket.location;
    /**@ts-ignore */
    const magazineObject = Global.magazines.get(String(rocket.getDynamicProperty(Global.ProjectileDynamicProperties.magazineObjectTypeId)));
    system.run(() => {
        dimension.spawnParticle("yes:explosion_flash", location);
        if(magazineObject === undefined || !(magazineObject instanceof ExplosiveMagazineAmmo)) return;

        const attribute = magazineObject.projectileAttribute;

        attribute.explosiveCamerashakes.forEach(explosiveCamerashake => {
            const players = dimension.getPlayers({location: location, maxDistance: explosiveCamerashake.range});
            players.forEach(player => {
                player.runCommand(`camerashake add @s ${explosiveCamerashake.intensity} ${Math.floor(explosiveCamerashake.duration/20)} rotational`);
            });
        });

        const players = dimension.getPlayers({location: location, maxDistance: attribute.explosiveStun.range});
        const stunAttribute = attribute.explosiveStun;
        players.forEach(player => {
            const distance = new Vector3(player.location.x, player.location.y, player.location.z).sub(new Vector3(location.x, location.y, location.z)).length();
            /** @type {Number} */
            const screenDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minScreenDuration, stunAttribute.maxScreenDuration);
            player.addEffect("blindness", Math.floor(screenDuration), {showParticles: false});

            const aimRestrictionDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minAimRestrictionDuration, stunAttribute.maxAimRestrictionDuration);
            player.setDynamicProperty(Global.PlayerDynamicProperties.script.aimRestrictionNumber, Math.floor(aimRestrictionDuration));
            
            const debrisDuration = MathUtils.mapLinear((stunAttribute.range - distance), 0, stunAttribute.range, stunAttribute.minScreenDebrisDuration, stunAttribute.maxScreenDebrisDuration);
            const stayPortion = Math.min(Math.pow(((stunAttribute.range - distance)/stunAttribute.range)/0.8, 3)/2, 0.5);
            const outPortion = 1 - stayPortion;
            console.log(`debrisDuration: ${debrisDuration}, stay: ${stayPortion}, out: ${outPortion}`);
            player.onScreenDisplay.setTitle("", {fadeInDuration: 0, stayDuration: debrisDuration*stayPortion, fadeOutDuration: debrisDuration*outPortion});            
        });
    });
});