import { EntityComponentTypes, EntityInventoryComponent, ItemLockMode, ItemStack, Player, system, world } from '@minecraft/server';
import { FirearmIdUtil, FirearmNameUtil, FirearmUtil, ItemUtil } from "../Utilities.js";
import * as FirearmInit from '../FirearmInitialization.js';
import { Global } from '../Global.js';
import { Vector3 } from '../Math/Vector3.js';
import { MagazineTags } from '../Lists/MagazinesList.js';
import { renewAmmoCount } from '../AmmoText.js';
import { AnimationLink } from '../AnimationLink.js';



/**
 * 
 * @param {Player} player 
 */
function holdingFirearmDetectionPart1(player) {
    if(FirearmUtil.isSwitchingFirearm(player)) {
        tryResetOffhandItem(player); 
    }
    if(!FirearmUtil.isHoldingFirearm(player)) {
        tryResetOffhandItem(player); 
        return;
    }

    //console.log("is saving");
    FirearmUtil.tryRenewReloadAnimationMultiplier(player);
    FirearmUtil.tryCopyFirearmAmmoToWorld(player);
    FirearmInit.tryInitializeFirearm(player);
    tryReplaceOffhandItem(player);
}

/**
 * 
 * @param {Player} player 
 */
function holdingFirearmDetectionPart2(player) {
    if(FirearmUtil.isSwitchingFirearm(player)) {
        tryResetCurrentFirearmId(player);
        tryResetCurrentFirearmItemStack(player);
    }
    if(!FirearmUtil.isHoldingFirearm(player)) {
        tryResetCurrentFirearmId(player);
        tryResetCurrentFirearmItemStack(player);
        return;
    }
    //console.log("is saving");
    tryRenewAmmoCount(player);
    trySaveCurrentFirearmId(player);
    trySaveCurrentFirearmItemStack(player);
}

//---------------------- Ran in Main.js ----------------------
export { holdingFirearmDetectionPart1, holdingFirearmDetectionPart2 };
//---------------------- Ran in Main.js ----------------------


/**
 * 
 * @param {Player} player 
 */
function tryRenewAmmoCount(player) {
    if(!player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmIdSaved)) { return; }
    renewAmmoCount(player);
}

/**
 * 
 * @param {Player} player 
 */
function tryResetCurrentFirearmId(player) {
    if(!player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmIdSaved)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmIdSaved, false);
    
    //wait one tick to save for other functions to test for item switch
    system.runTimeout(() => {
        Global.playerCurrentFirearmId.delete(player.id);
    });
}


/**
 * 
 * @param {Player} player 
 */
function trySaveCurrentFirearmId(player) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmIdSaved)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmIdSaved, true);
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    if(firearmItemStack === null) { return; }
    const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
    //wait one tick to save for other functions to test for item switch
    system.runTimeout(() => {
        Global.playerCurrentFirearmId.set(player.id, firearmId);
    });
}



/**
 * 
 * @param {Player} player 
 */
function tryResetCurrentFirearmItemStack(player) {
    if(!player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved)) { return; }
    Global.playerCurrentFirearmItemStack.delete(player.id);
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved, false);
}


/**
 * 
 * @param {Player} player 
 */
function trySaveCurrentFirearmItemStack(player) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved, true);
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    if(firearmItemStack === null) { return; }
    Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === null) { return; }
    FirearmUtil.setPlayerFiringModeAndFireRate(player, firearmObject);
    //FirearmUtil.printFirearmDynamicProperties(firearmItemStack);
}



/**
 * 
 * @param {Player} player 
 */
function tryResetOffhandItem(player) {
    if(!player.getDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine, false);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    const offhandSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
    
    const firearmItemStack = Global.playerCurrentFirearmItemStack.get(player.id);
    if(firearmItemStack === null || firearmItemStack === undefined) { return; }
    const magazineTag = firearmItemStack.getDynamicProperty(Global.ItemDynamicProperties.magazineTag);

    //if no magazine then don't delete offhand item
    if(magazineTag === MagazineTags.none) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine, false);
        return;
    }
    offhandSlot?.setItem();
}

/**
 * 
 * @param {Player} player 
 */
function tryReplaceOffhandItem(player) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine, true);
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    if(firearmItemStack === null) { return; }
    const offhandContainerSlot = ItemUtil.getPlayerOffhandContainerSlot(player);

    const magazineTag = String(firearmItemStack.getDynamicProperty(Global.ItemDynamicProperties.magazineTag));

    //If no magazine then don't do anything
    if(magazineTag === MagazineTags.none) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine, true);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
        return;
    }

    ItemUtil.moveOldOffhandItemOff(player, false);
    
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
    
    let magazineItemStack;
    const isMagazineEmpty = Boolean(firearmItemStack.getDynamicProperty(Global.ItemDynamicProperties.isMagazineEmpty));
    if(isMagazineEmpty) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
        try { magazineItemStack = new ItemStack(magazineTag+"_empty", 1); }
        catch { console.error(`Magazine ${magazineTag} does not have an empty counterpart.`); return; }
    }
    else { 
        magazineItemStack = new ItemStack(magazineTag, 1);
    }
    if(magazineItemStack === null) { return; }
    const ammoCount = FirearmUtil.getWorldAmmoUsingId(FirearmIdUtil.getFirearmId(firearmItemStack));
    if(ammoCount === null) { return; }
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
    if(magazineObject && magazineObject.maxAmmo !== ammoCount) {
        FirearmNameUtil.renewMagazineName(magazineItemStack, ammoCount);
        ItemUtil.trySetDurability(magazineItemStack, ammoCount);
    }
    offhandContainerSlot?.setItem(magazineItemStack);
}