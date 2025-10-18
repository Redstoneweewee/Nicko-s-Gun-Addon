import { EntityComponentTypes, EntityInventoryComponent, GameMode, ItemLockMode, ItemStack, Player, PlayerCursorInventoryComponent, system } from '@minecraft/server';
import { Explosive, Firearm, Gun } from './2Definitions/FirearmDefinition.js';
import { LoopUtil, ItemUtil, FirearmUtil, FirearmNameUtil, IdUtil, SoundsUtil, AnimationUtil, FirearmIdUtil, StringUtil, CraftingUtil } from './Utilities.js';
import { Global } from './Global.js';
import { AnimationLink } from './AnimationLink.js';
import { Vector3 } from './Math/Vector3.js';
import { ScaledAnimation, SoundTimeoutIdObject } from './2Definitions/AnimationDefinition.js';
import { AnimationTypes } from './1Enums/AnimationEnums.js';
import { MagazineTypeIds, MagazineTypes } from './1Enums/MagazineEnums.js';
import { ReloadTypes } from './1Enums/ReloadEnums.js';
import { TypeUtil } from './UtilitiesInit.js';
const Vector = new Vector3();

// const ReloadTypes = {
//     /**
//      * In all cases, delete old magazine and have new magazine in offhand
//      * Once reload is finished, old magazine is given back to inv
//      * If swap off gun, new magazine is moved back into inv, old magazine stays in the gun & reload is canceled
//      * If new magazine is moved off offhand before finish, restore old magazine in offhand & reload is canceled
//      */
//     durabilityBased: {
//         //swapping the old empty magazine with the highest ammoCount magazine in the inventory
//         normal: "Normal",
//         //swapping the old magazine with the highest ammoCount magazine in the inventory, but must be higher
//         tactical: "Tactical",
//         /**
//          * the old magazine could either be moved to the player's cursorInv, anywhere in the inventory, or in the 2x2 crafting area
//          * If curesorInv,      just remove old mag                  & give back once reload is finished
//          * If in inv,          clear inv for 1 of old mag itemstack & give back once reload is finished
//          * If in 2x2 crafting, set a loop to clear the old mag
//          *                     if player exits inv, item goes into inv & is cleared, therefore give back once reload is finished
//          *                     if not exit inv, item stays in 2x2 crafting, so no need to give back item cuz it was never cleared
//          */
//         manualSwap: "ManualSwap" 
//     },
//     /**
//      * If swap off gun, (item amount - ammoCount) number of items are moved into inv, other go with the gun
//      * If item amount is changed during reload, common sense
//      */
//     stackBased: {
//         //increasing offhand item amount as much as possible. If gun ammoCount is less than offhand item amount, keep reloading
//         normal: "Normal",
//         //same as normal
//         tactical: "Tactical",
//         /**
//          * If offhand item amount goes down, set ammoCount to new amount
//          * If offhand item amount goes up, do the same thing as above
//          */
//         manualSwap: "ManualSwap" 
//     }
// }


/**
 * Ran in a loop to figure out if the player is manually reloading
 * Done
 * @param {Player} player 
 */
function tryManualReload(player) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) { return; }
    const firearmItemStack = firearmContainerSlot.getItem();
    if(firearmItemStack === undefined) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { return; }
    //cannot manually reload if just shot (prevent mobile accidental reloads) not tested yet
    if(Number(player.getDynamicProperty(Global.PlayerDynamicProperties.script.lastShootTick)) >= system.currentTick) { 
        return; 
    }
    const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
    const currentMagazineTypeId = TypeUtil.getValueFromList(MagazineTypeIds, String(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId)));
    FirearmUtil.tryCopyFirearmAmmoToWorld(player);
    const oldAmmoCount = FirearmUtil.getWorldAmmoUsingId(firearmId)??0; //Must use world ammo because dynamic prop doesn't change until you stop shooting
    const isOldMagazineEmpty = Boolean(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty));
    const newMagazineItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    const oldMagazineTypeId = String(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId));
    const newMagazineTypeId = newMagazineItemStack ? FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack)?.itemTypeId??undefined : undefined;
    if(FirearmUtil.isOffhandMagazineEmptyButCorrect(player) && newMagazineTypeId && (!isOldMagazineEmpty || oldMagazineTypeId !== newMagazineTypeId)) {
        //Only used when OldMagazine == any && newMagazine == empty
        //console.log(`${FirearmUtil.isOffhandMagazineEmptyButCorrect(player)}, ${isOldMagazineEmpty}, ${oldMagazineTypeId}, ${newMagazineTypeId}`);
        FirearmUtil.setFirearmMagazineToEmpty(player, newMagazineTypeId, firearmContainerSlot, firearmId);
        return;
    }
    else if(!FirearmUtil.isOffhandMagazineCorrect(player)) {
        if((oldAmmoCount !== 0 || currentMagazineTypeId !== MagazineTypeIds.None) && !FirearmUtil.isOffhandMagazineEmptyButCorrect(player)) {
            //Only used when OldMagazine == any && newMagazine == none
            FirearmUtil.setFirearmMagazineToNone(player, firearmContainerSlot, firearmId, false);
        }
        return;
    }
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { return; }
    if(newMagazineItemStack === undefined) { return; }


    const newMagazineAmmoCount = FirearmUtil.getAmmoCountFromOffhand(player);
    if(newMagazineAmmoCount === undefined || currentMagazineTypeId === undefined || newMagazineTypeId === undefined) { return; }
    if(newMagazineAmmoCount === oldAmmoCount && currentMagazineTypeId === newMagazineTypeId) { return; }

    const newMagazineObject = FirearmUtil.getMagazineObjectFromItemStack(newMagazineItemStack);
    if(newMagazineObject === undefined) { return; }

    if(newMagazineObject.magazineType === MagazineTypes.StackBased && newMagazineAmmoCount < oldAmmoCount) {
        FirearmUtil.setFirearmMagazineToAmmoCount(player, newMagazineTypeId, firearmContainerSlot, firearmId, newMagazineAmmoCount);
        return;
    }

    const oldMagazineName = isOldMagazineEmpty ? oldMagazineTypeId+"_empty" : oldMagazineTypeId;
    /** @type {ItemStack|undefined} */
    const oldMagazineItemStack = oldMagazineName === MagazineTypeIds.None ? undefined : new ItemStack(oldMagazineName);
    if(oldMagazineItemStack != undefined) {
        const oldMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack);
        if(oldMagazineObject === undefined) { return; }
        if(oldMagazineObject.magazineType === MagazineTypes.DurabilityBased) {
            ItemUtil.trySetDurability(oldMagazineItemStack, oldAmmoCount);
        }
        else if(oldMagazineObject.magazineType === MagazineTypes.StackBased) {
            oldMagazineItemStack.amount = oldAmmoCount;
        }
        else {
            console.error(`undefined magazineType in tryManualReload(): ${oldMagazineObject.magazineType} on magazine ${isOldMagazineEmpty ? oldMagazineTypeId+"_empty" : oldMagazineTypeId}`);
            return;
        }
    }
    //the only time it goes through to manual reload
    //console.log("maual reload");
    handleBeforeReload(1, player, 0, ReloadTypes.ManualSwap, oldMagazineItemStack, newMagazineItemStack, firearmObject);
}

/**
 * Call this function when a possible reload sequence is called (right click on empty, left click on tactical)
 * Replaces automaticMagazineSwap function
 * Not done
 * @param {Player} player 
 * @param {typeof ReloadTypes[keyof typeof ReloadTypes]} reloadType
 */
function tryAutomaticReload(player, reloadType) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const firearmItemStack = ItemUtil.getSelectedContainerSlot(player)?.getItem();
    if(firearmItemStack === undefined) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { return; }
    const firearmId = Number(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.id));
    if(Number.isNaN(firearmId)) { return; }
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { return; }
    
    const ammoCount = FirearmUtil.getWorldAmmoUsingId(firearmId);
    const oldMagazineItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    const oldMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack);
    if(ammoCount === undefined) { return; }
    if(reloadType === ReloadTypes.Normal && ammoCount > 0) { return; } //right-click reload would stop here if not empty
    if(firearmObject.magazineAttribute.defaultMagazine.magazineType === MagazineTypes.DurabilityBased && 
       reloadType === ReloadTypes.Tactical && ammoCount === oldMagazineObject?.maxAmmo) { return; } //left-click reload would stop here if full mag
    if(firearmObject.magazineAttribute.defaultMagazine.magazineType === MagazineTypes.StackBased && 
        reloadType === ReloadTypes.Tactical && ammoCount === firearmObject.magazineAttribute.maxMagazineItemStackAmount) { return; } //left-click reload would stop here if full mag

    //console.log("automatic reload");

    const magazineType = firearmObject.magazineAttribute.defaultMagazine.magazineType;

    if(magazineType === MagazineTypes.DurabilityBased) {
        let newMagazineItemStack = FirearmUtil.tryGetBestDurabilityMagazineItemStackForReload(player, ammoCount);
    
        //If the player is in creative, use the full counterpart of the empty one as a replacement
        if(player.getGameMode() === GameMode.creative) {
            if(oldMagazineItemStack !== undefined) {
                newMagazineItemStack = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack)?.itemStack;
            }
            if(newMagazineItemStack !== undefined) {
                handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
            }
            return;
        }
        else {
            
            //If newMagazineItemStack === undefined, then could not find usable magazine
            if(newMagazineItemStack === undefined) { 
                console.log("could not find any usable magazines."); 
                return; 
            }
            handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
        }
    }

    else if(magazineType === MagazineTypes.StackBased) {
        if(oldMagazineItemStack !== undefined && oldMagazineObject !== undefined) {
            if(player.getGameMode() === GameMode.creative) {
                const newMagazineItemStack = new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount);
                newMagazineItemStack.amount = firearmObject.magazineAttribute.maxMagazineItemStackAmount;
                handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
            }
            else {
                let additionalAmmoCount = FirearmUtil.tryGetBestStackMagazineForReload(player, oldMagazineItemStack)?.amount;
                if(additionalAmmoCount === undefined || additionalAmmoCount === 0) { return; }
                //if(oldMagazineItemStack.amount + additionalAmmoCount <= firearmObject.maxMagazineItemStackAmount) {
                const addAmount = (oldMagazineItemStack.amount + additionalAmmoCount > firearmObject.magazineAttribute.maxMagazineItemStackAmount) ? (firearmObject.magazineAttribute.maxMagazineItemStackAmount - oldMagazineItemStack.amount) : (additionalAmmoCount);
                const newMagazineItemStack = new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount + addAmount);
                const removeItemStack = new ItemStack(oldMagazineItemStack.typeId, addAmount);
                ItemUtil.removeItemStackFromInventory(player, removeItemStack);
                handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
            }
        }
        else {
            //need to change this to test for all usable magazines for the firearm and use the first one
            let bestMagazineTypeIdAndAmount = FirearmUtil.tryGetBestStackMagazineForReload(player, oldMagazineItemStack);
            if(player.getGameMode() === GameMode.creative) {
                /**@type {ItemStack} */
                let newMagazineItemStack;
                if(bestMagazineTypeIdAndAmount === undefined) {
                    newMagazineItemStack = new ItemStack(firearmObject.magazineAttribute.defaultMagazine.itemTypeId, firearmObject.magazineAttribute.maxMagazineItemStackAmount);
                    handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
                }
                else {
                    newMagazineItemStack = new ItemStack(bestMagazineTypeIdAndAmount.magazineTypeId, firearmObject.magazineAttribute.maxMagazineItemStackAmount);
                    handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
                }
            }
            else {
                if(bestMagazineTypeIdAndAmount === undefined) { return; }
                //... not tested
                const addAmount = bestMagazineTypeIdAndAmount.amount > firearmObject.magazineAttribute.maxMagazineItemStackAmount ? firearmObject.magazineAttribute.maxMagazineItemStackAmount : bestMagazineTypeIdAndAmount.amount;
                const newMagazineItemStack = new ItemStack(bestMagazineTypeIdAndAmount.magazineTypeId, addAmount);
                const removeItemStack = new ItemStack(bestMagazineTypeIdAndAmount.magazineTypeId, addAmount);
                ItemUtil.removeItemStackFromInventory(player, removeItemStack);
                handleBeforeReload(1, player, 0, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject);
            }
        }
    }
}



/**
 * 
 * @param {number} iteration 
 * @param {Player} player 
 * @param {Number} totalReloadTimeInTicks
 * @param {typeof ReloadTypes[keyof typeof ReloadTypes]} reloadType 
 * @param {ItemStack|undefined} oldMagazineItemStack 
 * @param {ItemStack} newMagazineItemStack 
 * @param {Firearm} firearmObject 
 */
function handleBeforeReload(iteration, player, totalReloadTimeInTicks, reloadType, oldMagazineItemStack, newMagazineItemStack, firearmObject) {
    const oldIsEmpty = oldMagazineItemStack === undefined ? true : FirearmUtil.isMagazineItemStackEmpty(oldMagazineItemStack);
    const newIsEmpty = FirearmUtil.isMagazineItemStackEmpty(newMagazineItemStack);
    const newMagazineTypeId = FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack)?.itemTypeId;
    if(newMagazineTypeId === undefined) { return; }
    let oldAmmoCount = 0;
    let newAmmoCount = 0;
    //Count bullets
    //----------------------------
    const newMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack);
    if(newMagazineObject === undefined) { return; }
    const magazineType = newMagazineObject.magazineType;
    if(oldMagazineItemStack === undefined || oldIsEmpty) {
        oldAmmoCount = 0;
    }
    else if(magazineType === MagazineTypes.DurabilityBased) {
        oldAmmoCount = ItemUtil.tryGetDurability(oldMagazineItemStack)??0;
    }
    else if(magazineType === MagazineTypes.StackBased) {
        oldAmmoCount = oldMagazineItemStack.amount;
    }

    
    if(newMagazineItemStack === undefined || newIsEmpty) {
        newAmmoCount = 0;
    }
    else if(magazineType === MagazineTypes.DurabilityBased) {
        newAmmoCount = ItemUtil.tryGetDurability(newMagazineItemStack)??0;
    }
    else if(magazineType === MagazineTypes.StackBased) {
        if(oldMagazineItemStack === undefined || oldMagazineItemStack.amount === 0) {
            newAmmoCount = Math.min(firearmObject.magazineAttribute.maxEmptyAmmoPerReloadCount, newMagazineItemStack.amount);
        }
        else {
            let newNum = Math.min(oldMagazineItemStack.amount+firearmObject.magazineAttribute.maxAmmoPerReloadCount, newMagazineItemStack.amount);
            newAmmoCount = newNum <= firearmObject.magazineAttribute.maxMagazineItemStackAmount ? newNum : firearmObject.magazineAttribute.maxMagazineItemStackAmount;
        }
        //console.log(`new mag count: ${newMagazineItemStack.amount}`);
        //console.log(`old: ${oldAmmoCount}, new ammo count: ${newAmmoCount}`);
    }
    //----------------------------

    //Do before reload things
    if(magazineType === MagazineTypes.DurabilityBased) {
        //remove old magazine if normal or tactical swap
        if(reloadType === ReloadTypes.Normal || reloadType === ReloadTypes.Tactical) {
            if(player.getGameMode() !== GameMode.creative) { ItemUtil.removeItemStackFromInventory(player, newMagazineItemStack); }
            //console.log(`cleared  ${newMagazineItemStack.typeId} ${newAmmoCount}`);
            ItemUtil.getPlayerOffhandContainerSlot(player)?.setItem(newMagazineItemStack);
        }
        //run loop to make sure magazine is always removed on manual reload
        if(reloadType === ReloadTypes.ManualSwap) {
            if(oldMagazineItemStack !== undefined) {
                const cursorInv = player.getComponent(EntityComponentTypes.CursorInventory);
                if(cursorInv instanceof PlayerCursorInventoryComponent) {
                    cursorInv.clear();
                }
                else {
                    if(player.getGameMode() !== GameMode.creative) { ItemUtil.removeItemStackFromInventory(player, newMagazineItemStack); }
                }
            }
        }
        handleReloadAnimation(iteration, player, totalReloadTimeInTicks, newMagazineTypeId, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, newMagazineItemStack);

    }
    else if(magazineType === MagazineTypes.StackBased) {
        //     /**
        //      * If swap off gun, (item amount - ammoCount) number of items are moved into inv, other go with the gun
        //      * If item amount is changed during reload, common sense
        //      */
        //     stackBased: {
        //         //increasing offhand item amount as much as possible. If gun ammoCount is less than offhand item amount, keep reloading
        //         normal: "Normal",
        //         //same as normal
        //         tactical: "Tactical",
        //         /**
        //          * If offhand item amount goes down, set ammoCount to new amount
        //          * If offhand item amount goes up, do the same thing as above
        //          */
        //         manualSwap: "ManualSwap" 
        //     }


            //here it should reload 1 bullet at a time

        //removeItemStackFromInventory() is placed in automatic reload because this function is recursively called
        ItemUtil.getPlayerOffhandContainerSlot(player)?.setItem(newMagazineItemStack);
        const actualNewMagazineItemStack = oldMagazineItemStack === undefined ? new ItemStack(newMagazineItemStack.typeId) : new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount);
        actualNewMagazineItemStack.amount = newAmmoCount;
        handleReloadAnimation(iteration, player, totalReloadTimeInTicks, newMagazineTypeId, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, actualNewMagazineItemStack, newMagazineItemStack);
    }
}





/**
 * 
 * @param {number} iteration 
 * @param {Player} player 
 * @param {Number} totalReloadTimeInTicks
 * @param {string} newMagazineTypeId
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {typeof ReloadTypes[keyof typeof ReloadTypes]} reloadType
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {ItemStack} [finalMagazineItemStack] - used only for stack-based reloading to iterate through until we get to the desire amount of ammo
 */
function handleReloadAnimation(iteration, player, totalReloadTimeInTicks, newMagazineTypeId, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, newMagazineItemStack, finalMagazineItemStack) {
    //console.log(`player: ${player.name}, newTypeId: ${newMagazineTypeId}, oldAmmo: ${oldAmmoCount}, newAmmo: ${newAmmoCount}, oldItem: ${oldMagazineItemStack?.typeId}, newItem: ${newMagazineItemStack.typeId}`);
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { return; }
    let reloadTimeInTicks = 0;
    let magazineReloadTime = 0;
    //let isSwapping = false;
    //let shouldCock = false;
    /**@type {SoundTimeoutIdObject[]} */
    let soundTimeoutIdObjects = [];
    //let reloadTimeMultiplier = 1;
    
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStack(newMagazineItemStack);
    if(magazineObject === undefined) { return; }
    //if(magazineObject.scaleReloadTimeWithAmmo) {
    //    reloadTimeMultiplier = (newAmmoCount-oldAmmoCount)/magazineObject.maxAmmo;
    //    if(reloadTimeMultiplier < 0) {
    //        finishedReloading(null, player, firearmObject, oldMagazineItemStack, newMagazineItemStack, newMagazineTypeId, oldAmmoCount, newAmmoCount, soundTimeoutIdObjects, reloadType);
    //        return;
    //    }
    //}
    //console.log(`iteration: ${iteration}`);
    if(firearmObject instanceof Gun) {

        //--------------------- open cock --------------------- 
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.should_open_cock_on_reload) === true && 
        (magazineObject.magazineType === MagazineTypes.DurabilityBased || 
         magazineObject.magazineType === MagazineTypes.StackBased && iteration === 1)) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);

            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.ReloadOpenCock]);
            if(attribute instanceof ScaledAnimation) {
                let openCockMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_open_cock_animation_multiplier));
                if(Number.isNaN(openCockMultiplier)) { openCockMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadOpenCock, openCockMultiplier);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                if(iteration === 1) { totalReloadTimeInTicks += attribute.scaleDurationToValue; }
                magazineReloadTime += attribute.scaleDurationToValue;
                reloadTimeInTicks += attribute.scaleDurationToValue;
            }

        }

        //--------------------- reload swap / single ammo reloads non-empty --------------------- 
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine) === true) {
            //isSwapping = true;
            
            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.ReloadBoth, AnimationTypes.ReloadSwap]);
            if(attribute instanceof ScaledAnimation) {
                let normalMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                if(Number.isNaN(normalMultiplier) ) { normalMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadSwap, normalMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }
                idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadBoth, normalMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                if(iteration === 1) {
                    if(magazineObject.magazineType === MagazineTypes.StackBased && 
                        finalMagazineItemStack !== undefined &&
                        newMagazineItemStack.amount < finalMagazineItemStack.amount) {
                            totalReloadTimeInTicks += (attribute.scaleDurationToValue*(finalMagazineItemStack.amount-oldAmmoCount));
                        }
                    else {
                        totalReloadTimeInTicks += attribute.scaleDurationToValue;
                    }
                }
                magazineReloadTime += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
                reloadTimeInTicks  += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
            }
            
        }

        //--------------------- reload no swap / single ammo reloads empty --------------------- 
        else {
            //isSwapping = false;
            
            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.ReloadBoth, AnimationTypes.ReloadNoSwap]);
            if(attribute instanceof ScaledAnimation) {
                let noSwapMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                if(Number.isNaN(noSwapMultiplier) ) { noSwapMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadNoSwap, noSwapMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }
                idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadBoth, noSwapMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }
                

                if(iteration === 1) {
                    if(magazineObject.magazineType === MagazineTypes.StackBased && 
                        finalMagazineItemStack !== undefined &&
                        newMagazineItemStack.amount < finalMagazineItemStack.amount) {
                            totalReloadTimeInTicks += (attribute.scaleDurationToValue*(finalMagazineItemStack.amount-oldAmmoCount));
                        }
                    else {
                        totalReloadTimeInTicks += attribute.scaleDurationToValue;
                    }
                }
                magazineReloadTime += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
                reloadTimeInTicks  += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
            }
        }

        //--------------------- end cock --------------------- 
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload) === true && 
           (magazineObject.magazineType === MagazineTypes.DurabilityBased || 
            magazineObject.magazineType === MagazineTypes.StackBased && newAmmoCount === finalMagazineItemStack?.amount)) {
            //shouldCock = true;
            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.ReloadCock]);
            if(attribute instanceof ScaledAnimation) {
                let cockMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_cock_animation_multiplier));
                if(Number.isNaN(cockMultiplier) ) { cockMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadCock, cockMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                reloadTimeInTicks += attribute.scaleDurationToValue;
            }
        }

        //adding end cock time to totalReloadTimeInTicks
        if(iteration === 1 && player.getDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload) === true) {
            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.ReloadCock]);
            if(attribute instanceof ScaledAnimation) {
                totalReloadTimeInTicks += attribute.scaleDurationToValue;
            }
        }
    }


    else if(firearmObject instanceof Explosive) {
        //untested, probably needs changing once explosives are added
        const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.ReloadSwap]);
        if(attribute instanceof ScaledAnimation) {
            let normalMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
            if(Number.isNaN(normalMultiplier) ) { normalMultiplier = 1.0; }
            let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.ReloadSwap, normalMultiplier);
            if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

            if(iteration === 1) { totalReloadTimeInTicks += attribute.scaleDurationToValue; }
            magazineReloadTime += attribute.scaleDurationToValue;
            reloadTimeInTicks  += attribute.scaleDurationToValue;
        }
    }
    else {
        console.error(`Could not find firearmObject of type ${typeof(firearmObject)} in handleReloadAnimation()`);
    }


    if(iteration === 1) { player.startItemCooldown(firearmObject.itemTypeId, totalReloadTimeInTicks); }
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_reloading);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);

    //


    const startingTick = system.currentTick;
    const newMainLoopId = IdUtil.getRandomId();
    LoopUtil.startMainLoop(newMainLoopId, function() { 
        return reloading(iteration, newMainLoopId, player, 
                        firearmObject, totalReloadTimeInTicks, reloadTimeInTicks, magazineReloadTime,
                        oldMagazineItemStack, newMagazineItemStack, newMagazineTypeId, oldAmmoCount, newAmmoCount, 
                        startingTick, soundTimeoutIdObjects, reloadType, finalMagazineItemStack); 
    });
}

/**
 * 
 * @param {Number} iteration 
 * @param {Number} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {Number} totalReloadTimeInTicks
 * @param {Number} reloadTimeInTicks
 * @param {Number} magazineReloadTime
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {string} newMagazineTypeId
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {Number} startingTick 
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects
 * @param {typeof ReloadTypes[keyof typeof ReloadTypes]} reloadType
 * @param {ItemStack} [finalMagazineItemStack]
 */
function reloading(iteration, mainLoopId, player, firearm, totalReloadTimeInTicks, reloadTimeInTicks, magazineReloadTime, oldMagazineItemStack, newMagazineItemStack, newMagazineTypeId, oldAmmoCount, newAmmoCount, startingTick, soundTimeoutIdObjects, reloadType, finalMagazineItemStack) {
    if(tryCancelReload(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, oldAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack)) { return; }
    const currentReloadTime = system.currentTick - startingTick;
    const remainingReloadTime = reloadTimeInTicks - currentReloadTime;
    const totalRemainingReloadTime = totalReloadTimeInTicks - currentReloadTime;
    player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §a[${Math.round(totalRemainingReloadTime/2)/10}]§e§l>`);

    if(remainingReloadTime <= 0) {
        finishedReloading(iteration, mainLoopId, player, firearm, totalRemainingReloadTime, oldMagazineItemStack, newMagazineItemStack, newMagazineTypeId, oldAmmoCount, newAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack);
    }
    else if((magazineReloadTime - currentReloadTime) <= 0) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);
    }
    if(Math.floor(magazineReloadTime - currentReloadTime) == 0) {
        SoundsUtil.stopSounds(soundTimeoutIdObjects, [AnimationTypes.ReloadBoth, AnimationTypes.ReloadSwap, AnimationTypes.ReloadNoSwap]);
    }
}

/**
 * 
 * @param {number} iteration 
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {Number} totalReloadTimeInTicks
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {string} newMagazineTypeId
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects 
 * @param {typeof ReloadTypes[keyof typeof ReloadTypes]} reloadType 
 * @param {ItemStack} [finalMagazineItemStack]
 */
function finishedReloading(iteration, mainLoopId, player, firearm, totalReloadTimeInTicks, oldMagazineItemStack, newMagazineItemStack, newMagazineTypeId, oldAmmoCount, newAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack) {
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) {
        stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects);
        return;
    }
    const firearmId = Number(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.id));
    console.log(`set ammoCount to ${newAmmoCount} and magazineType to ${newMagazineTypeId}`);

    FirearmUtil.setWorldAmmoUsingId(firearmId, newAmmoCount);
    FirearmUtil.tryCopyWorldAmmoToMainhandFirearm(firearmContainerSlot);
    firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId, newMagazineTypeId);
    firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty, false);
    
    const newMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack);
    if(newMagazineObject === undefined) { return; }
    const magazineType = newMagazineObject.magazineType;

    if(oldMagazineItemStack !== undefined) { FirearmNameUtil.renewMagazineName(oldMagazineItemStack, oldAmmoCount); }
    if(magazineType === MagazineTypes.DurabilityBased && (player.getGameMode() !== GameMode.creative || reloadType === ReloadTypes.ManualSwap)) {
        ItemUtil.addItemStackIntoInventory(player, oldMagazineItemStack);
    }

    const firearmItemStack = firearmContainerSlot.getItem();
    if(firearmItemStack !== undefined) {
        Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
    }
    //FirearmUtil.printFirearmDynamicProperties(firearmContainerSlot.getItem());
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { tryCancelReload(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, oldAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack); return; }
    FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);

    stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects);
    if(newMagazineObject.magazineType === MagazineTypes.DurabilityBased || 
       (newMagazineObject.magazineType === MagazineTypes.StackBased && newAmmoCount === finalMagazineItemStack?.amount)) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
    }
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);
    
    if(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.hasLastCasingInChamber)) {
        firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.hasLastCasingInChamber, false);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber);
    }

    //loop reloading for stack-based ammo types
    if(magazineType === MagazineTypes.StackBased && finalMagazineItemStack !== undefined && newMagazineItemStack.amount < finalMagazineItemStack.amount) {
        handleBeforeReload(++iteration, player, totalReloadTimeInTicks, reloadType, newMagazineItemStack, finalMagazineItemStack, firearmObject);
    }
    //finished for real
    else {
        player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §aFinished§e§l>`);
    }
}

/**
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects 
 */
function stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects) {
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_reloading);
    SoundsUtil.stopSounds(soundTimeoutIdObjects);
    if(mainLoopId !== null) { LoopUtil.stopMainLoop(mainLoopId); }
}



/**
 * 
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {Number} oldAmmoCount
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects 
 * @param {typeof ReloadTypes[keyof typeof ReloadTypes]} reloadType 
 * @param {ItemStack} [finalMagazineItemStack]
 * @returns {boolean}
 */
function tryCancelReload(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, oldAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack) {
    const currentOffhandAmmoCount = FirearmUtil.getAmmoCountFromOffhand(player);
    const newMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack);
    const magazineType = newMagazineObject?.magazineType;

    if(!FirearmUtil.isHoldingFirearm(player) || 
        FirearmUtil.isSwitchingFirearm(player) || 
       !FirearmUtil.isOffhandMagazineCorrect(player) ||
        currentOffhandAmmoCount === undefined ||
        magazineType === undefined ||
        (magazineType === MagazineTypes.DurabilityBased && currentOffhandAmmoCount === oldAmmoCount) ||
        (magazineType === MagazineTypes.StackBased && currentOffhandAmmoCount < oldAmmoCount)) {
        console.log(`cancelled: ${currentOffhandAmmoCount}, ${oldAmmoCount}`);
        player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §cCancelled§e§l>`);
        player.startItemCooldown(firearm.itemTypeId, 0);
        stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects);
        
        //if(newMagazineItemStack !== undefined) { FirearmNameUtil.renewMagazineName(newMagazineItemStack, newAmmoCount); }
        //should be different for stack based vvv
        if(player.getGameMode() !== GameMode.creative) {
            if(magazineType === MagazineTypes.DurabilityBased) {
                ItemUtil.addItemStackIntoInventory(player, newMagazineItemStack);
            }
            else if(magazineType === MagazineTypes.StackBased && finalMagazineItemStack) {
                const giveBackItemStack = new ItemStack(newMagazineItemStack.typeId, finalMagazineItemStack.amount - (oldMagazineItemStack ? oldMagazineItemStack.amount : 0));
                ItemUtil.addItemStackIntoInventory(player, giveBackItemStack);
            }
        }

        if(!FirearmUtil.isSwitchingFirearm(player)) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, false);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
        }
        
        return true;
    }
    return false;
}

export { tryManualReload, tryAutomaticReload };