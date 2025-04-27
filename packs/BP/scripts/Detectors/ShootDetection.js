import { world, system, Player, ItemStack, EffectTypes } from '@minecraft/server';
import { Global } from '../Global.js';
import { MapUtil, LoopUtil, ItemUtil, FirearmUtil } from "../Utilities.js";
import { AnimationLink } from '../AnimationLink.js';

//import { shoot } from "../Shoot.js";
//import { FiringModes, GunWithAbility } from '../Definitions/FirearmDefinition.js';
//import { SwitchFiringModeAttributes } from '../Definitions/LeftClickAbilityDefinition.js';


//Adds new players to the shootingID dictionary
world.afterEvents.playerSpawn.subscribe((eventData) => {
    const player = eventData.player;
    if(eventData.initialSpawn) {
        Global.playerShootingLoopIds.set(player.id, []);
        //MapUtil.printMap(Global.playerShootingLoopIds);
    }
});

//Deletes dictionary values for players who leave
world.beforeEvents.playerLeave.subscribe((eventData) => {
    const player = eventData.player;
    system.run(() => {
        Global.playerShootingLoopIds.delete(player.id);
        //MapUtil.printMap(Global.playerShootingLoopIds);
    });
});


/**
 * @param {Player} player 
 * @param {ItemStack} itemStack 
 */
function shootDetection(player, itemStack) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const firearmObject =  FirearmUtil.getFirearmObjectFromItemStack(itemStack);
    if(firearmObject === undefined) { return; }
    if(!FirearmUtil.isOffhandMagazineTypeValid(player))              { console.log("no ammo in offhand"); return; }
    if(!FirearmUtil.isOffhandMagazineCorrect(player))         { console.log("wrong ammo type"); return; }
    if((FirearmUtil.getAmmoCountFromOffhand(player)??0) <= 0) { console.log("out of ammo"); return; }
    
    //Shooting is now done in the BHV animation shoot for better fire rate control
    //this part is here to set the `is_shooting` dynamic property to true
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_shooting, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_shooting);
}

//---------------------- Ran in Main.js ----------------------
export { shootDetection };
//---------------------- Ran in Main.js ----------------------


world.afterEvents.entityDie.subscribe(eventData => {
    const entity = eventData.deadEntity;
    if(!(entity instanceof Player)) { return; }

    const itemStack = ItemUtil.getSelectedItemStack(entity);
    stopShooting(entity, itemStack);
});

world.afterEvents.itemStopUse.subscribe((eventData) => {
    const player    = eventData.source;
	const itemStack = eventData.itemStack;

    stopShooting(player, itemStack);
});

/**
 * 
 * @param {Player} player 
 * @param {ItemStack|undefined} itemStack 
 */
function stopShooting(player, itemStack) {
    //LoopUtil.stopAsyncLoop(player, Global.playerShootingLoopIds);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_shooting, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_shooting);
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    if(itemStack === undefined) { return; }
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot !== null) { FirearmUtil.tryCopyWorldAmmoToMainhandFirearm(firearmContainerSlot); }
}