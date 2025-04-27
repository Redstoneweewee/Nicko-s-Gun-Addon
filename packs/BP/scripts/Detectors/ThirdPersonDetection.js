/**
 * Unused as of now --- too lazy to finish this
 */

import { EasingType, EntityInventoryComponent, Player, system, world } from '@minecraft/server';
import { Global } from '../Global';
import { FirearmUtil, ItemUtil } from "../Utilities.js";
import { Vector3 } from '../Math/Vector3.js';

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        const itemStack = ItemUtil.getSelectedItemStack(player);


        if(itemStack === undefined) { tryRemoveThirdPersonCamera(player, false); return; }
        if(!FirearmUtil.isHoldingFirearm(player)) { tryRemoveThirdPersonCamera(player, false); return; }
        trySetThirdPersonCamera(player, false);
    });
}, 2);



//If a player is joining with Third person camera already, then add it immediately
world.afterEvents.playerSpawn.subscribe((eventData) => {
    const player = eventData.player;
    if(eventData.initialSpawn && player.getDynamicProperty(Global.PlayerDynamicProperties.isInThirdPersonCamera) === true) {
        trySetThirdPersonCamera(player, true);
    }
});

//If a player is leaving with Third person camera already, then clear it immediately
world.beforeEvents.playerLeave.subscribe((eventData) => {
    const player = eventData.player;
    system.run(() => {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.isInThirdPersonCamera) === true) {
            tryRemoveThirdPersonCamera(player, true);
        }
    });
});


/**
 * @param {Player} player 
 * @param {boolean} immediate
 */
function trySetThirdPersonCamera(player, immediate) {
    if(immediate) {
        player.runCommandAsync(`execute anchored eyes run camera @s set minecraft:free pos ^-0.3^^-3.75 rot ~~`);
    }
    else {
        //player.runCommandAsync(`execute anchored eyes run camera @s set minecraft:free ease 0.1 linear pos ^-0.3^^-3.75 rot ~~`);
        const headLocation = new Vector3(player.getHeadLocation().x, player.getHeadLocation().y, player.getHeadLocation().z);
        const newViewDirection = new Vector3(player.getViewDirection().x, player.getViewDirection().y, player.getViewDirection().z).multiplyScalar(-3.75);
        const newLocation = new Vector3().addVectors(headLocation, newViewDirection);
        //console.log(`x:${newLocation.x}, y:${newLocation.y}, z:${newLocation.z}`)
        player.camera.setCamera("minecraft:free", {easeOptions: {easeTime: 0.1, easeType: EasingType.Linear}, rotation: player.getRotation(), location: newLocation});
    }



    player.setDynamicProperty(Global.PlayerDynamicProperties.isInThirdPersonCamera, true);
}



/**
 * @param {Player} player 
 *  @param {boolean} immediate
 */
function tryRemoveThirdPersonCamera(player, immediate) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.isInThirdPersonCamera) === false) { return; }
    if(immediate) {
        player.camera.clear();
    }
    else {
        player.camera.clear();
    }
    player.setDynamicProperty(Global.PlayerDynamicProperties.isInThirdPersonCamera, false);
}