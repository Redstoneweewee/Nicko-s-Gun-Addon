import { EntityComponentTypes, EntityInventoryComponent, ItemLockMode, ItemStack, Player, system, world } from '@minecraft/server';
import { FirearmIdUtil, FirearmNameUtil, FirearmUtil, ItemUtil } from "../Utilities.js";
import * as FirearmInit from '../FirearmInitialization.js';
import { Global } from '../Global.js';
import { Vector3 } from '../Math/Vector3.js';
import { renewAmmoCount } from '../AmmoText.js';
import { AnimationLink } from '../AnimationLink.js';
import { AnimationTypes } from '../1Enums/AnimationEnums.js';
import { MagazineTypeIds, MagazineTypes } from '../1Enums/MagazineEnums.js';



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
    FirearmUtil.tryRenewReloadAnimationMultipliers(player);
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
    if(firearmItemStack === undefined) { return; }
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
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved, false);
    Global.playerCurrentFirearmItemStack.delete(player.id);
}


/**
 * 
 * @param {Player} player 
 */
function trySaveCurrentFirearmItemStack(player) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentFirearmItemStackSaved, true);
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    if(firearmItemStack === undefined) { return; }
    Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { return; }
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) { return; }
    FirearmUtil.setPlayerFiringModeAndfiringRate(player, firearmObject, firearmContainerSlot);
    //FirearmUtil.printFirearmDynamicProperties(firearmItemStack);
}



/**
 * 
 * @param {Player} player 
 */
function tryResetOffhandItem(player) {
    if(!player.getDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine)) { return; }
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine, false);
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentMultipliersSaved, false);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_open_cock_on_reload, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_open_cock_on_reload);
    const offhandSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
    
    const firearmItemStack = Global.playerCurrentFirearmItemStack.get(player.id);
    if(firearmItemStack === undefined) { return; }
    const magazineTypeId = firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId);
    //console.log(FirearmUtil.getWorldAmmoUsingId(FirearmIdUtil.getFirearmId(firearmItemStack)));
    //if no magazine then don't delete offhand item
    if(magazineTypeId === MagazineTypeIds.None) { return; }
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
    if(firearmItemStack === undefined) { return; }
    const offhandContainerSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
    if(offhandContainerSlot === null) { return; }
    
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber, firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.hasLastCasingInChamber));
    console.log(`firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.hasLastCasingInChamber): ${firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.hasLastCasingInChamber)}`);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber);

    const magazineTypeId = String(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId));

    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { return; }
    for(const attribute of firearmObject.animationAttributes) {
        if(attribute.staticAnimation.type === AnimationTypes.ReloadOpenCock) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_open_cock_on_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_open_cock_on_reload);
            break;
        }
    }

    //If no magazine then don't do anything
    if(magazineTypeId === MagazineTypeIds.None) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.script.loadedOffhandMagazine, true);

        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
        return;
    }

    ItemUtil.moveOldOffhandItemOff(player);
    
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    
    let magazineItemStack;
    const isMagazineEmpty = Boolean(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty));
    if(!isMagazineEmpty) {
        try { magazineItemStack = new ItemStack(magazineTypeId, firearmObject?.magazineAttribute.maxMagazineItemStackAmount); }
        catch { magazineItemStack = new ItemStack(firearmObject?.magazineAttribute.defaultMagazine.itemTypeId, firearmObject?.magazineAttribute.maxMagazineItemStackAmount); }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
    }
    else { 
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
        try { magazineItemStack = new ItemStack(magazineTypeId+"_empty", 1); }
        catch { console.error(`Magazine ${magazineTypeId} does not have an empty counterpart.`); return; }
    }
    const ammoCount = FirearmUtil.getWorldAmmoUsingId(FirearmIdUtil.getFirearmId(firearmItemStack));
    if(ammoCount === undefined) { return; }
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
    if(magazineObject && magazineObject.maxAmmo !== ammoCount) {
        FirearmNameUtil.renewMagazineName(magazineItemStack, ammoCount);
        if(magazineObject.magazineType === MagazineTypes.DurabilityBased) {
            ItemUtil.trySetDurability(magazineItemStack, ammoCount);
        }
        else if(magazineObject.magazineType === MagazineTypes.StackBased && ammoCount === 0) { return; }
        else if(magazineObject.magazineType === MagazineTypes.StackBased) {
            magazineItemStack.amount = ammoCount;
        }
    }

    offhandContainerSlot.setItem(magazineItemStack);
}