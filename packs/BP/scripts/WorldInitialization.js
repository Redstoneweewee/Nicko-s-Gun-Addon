import { system, world } from "@minecraft/server";
import { Global } from './Global.js';
import { MapUtil, FirearmIdUtil } from './Utilities.js';
import { AnimationLink } from "./AnimationLink.js";


world.afterEvents.playerSpawn.subscribe(eventData => {
    const player = eventData.player;
    const initialSpawn = eventData.initialSpawn;
    if(!initialSpawn) { return; }
    let persistentPropertyValues = new Map();
    for(const property in Global.PersistentPlayerDynamicProperties) {
        persistentPropertyValues.set(property, player.getDynamicProperty(property));
    }
    player.clearDynamicProperties();
    for(const [key, value] of persistentPropertyValues) {
        player.setDynamicProperty(key, value);
        console.log(`Kept property value for ${key}: ${value}`);
    }
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, false);
});

world.getAllPlayers().forEach(player => {
    let persistentPropertyValues = new Map();
    for(const property in Global.PersistentPlayerDynamicProperties) {
        persistentPropertyValues.set(property, player.getDynamicProperty(property));
    }
    player.clearDynamicProperties();
    for(const [key, value] of persistentPropertyValues) {
        player.setDynamicProperty(key, value);
        console.log(`Kept property value for ${key}: ${value}`);
    }
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, false);

    player.dimension.getEntities({type: "yes:left_click_ability_entity"}).forEach(entity => {
        entity.remove();
    });
});
//const allDynamicPropertyKeys = world.getDynamicPropertyIds();
//allDynamicPropertyKeys.forEach(key => {
//    if(FirearmIdUtil.isFirearmId(key)) {
//        const id = FirearmIdUtil.firearmIdStringToNumber(key);
//        if(id === null) { return; }
//        const ammoCount = Number(world.getDynamicProperty(key));
//        if(ammoCount === null) { return; }
//        FirearmIdUtil.addIdAndAmmoToGlobalList(id, ammoCount);
//    }
//});


/**
 * clears firearm id + ammoCount dynamic properties because it assumes that those are
 * already saved on the firearm.
 * May result in inaccurate representation of ammoCount if the player throws a firearm 
 * on the floor before they stop shooting and reloading the game without picking it back up.
 */
const worldProperties = world.getDynamicPropertyIds();
worldProperties.forEach(property => {
    if(property.includes("firearmId:")) {
        world.setDynamicProperty(property, undefined);
    }
});

console.log("world Init");
FirearmIdUtil.printFirearmIds();