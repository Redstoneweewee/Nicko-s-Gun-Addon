import { EntityComponentTypes, EntityInventoryComponent, GameMode, ItemLockMode, ItemStack, Player, PlayerCursorInventoryComponent, system } from '@minecraft/server';
import { Explosive, Firearm, Gun } from './2Definitions/FirearmDefinition.js';
import { LoopUtil, ItemUtil, FirearmUtil, FirearmNameUtil, IdUtil, SoundsUtil, AnimationUtil, FirearmIdUtil, StringUtil, CraftingUtil } from './Utilities.js';
import { Global } from './Global.js';
import { AnimationLink } from './AnimationLink.js';
import { Magazine, MagazineTypes } from './2Definitions/MagazineDefinition.js';
import { Vector3 } from './Math/Vector3.js';
import { ReloadAnimationAttribute, SoundTimeoutIdObject } from './2Definitions/AnimationDefinition.js';
import { AnimationTypes } from './1Enums/AnimationEnums.js';
import { MagazineTags } from './3Lists/MagazinesList.js';
import { ReloadType, ReloadTypes } from './2Definitions/ReloadDefinition.js';
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
    //cannot manually reload if just shot (prevent mobile accidental reloads) not tested yet
    if(Number(player.getDynamicProperty(Global.PlayerDynamicProperties.script.lastShootTick)) >= system.currentTick) { 
        return; 
    }
    const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
    const currentMagazineTag = String(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.magazineTag));
    FirearmUtil.tryCopyFirearmAmmoToWorld(player);
    const oldAmmoCount = FirearmUtil.getWorldAmmoUsingId(firearmId)??0; //Must use world ammo because dynamic prop doesn't change until you stop shooting
    const isOldMagazineEmpty = Boolean(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty));
    const newMagazineItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    const oldMagazineTag = String(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.magazineTag));
    const newMagazineTag = newMagazineItemStack ? FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack)?.tag??null : null;
    if(FirearmUtil.isOffhandMagazineEmptyButCorrect(player) && (!isOldMagazineEmpty || oldMagazineTag !== newMagazineTag) && newMagazineTag) {
        //Only used when OldMagazine == any && newMagazine == empty
        FirearmUtil.setFirearmMagazineToEmpty(player, newMagazineTag, firearmContainerSlot, firearmId);
        return;
    }
    else if(!FirearmUtil.isOffhandMagazineCorrect(player)) {
        if((oldAmmoCount !== 0 || currentMagazineTag !== MagazineTags.none) && !FirearmUtil.isOffhandMagazineEmptyButCorrect(player)) {
            //Only used when OldMagazine == any && newMagazine == none
            FirearmUtil.setFirearmMagazineToNone(player, firearmContainerSlot, firearmId, false);
        }
        return;
    }
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { return; }
    if(newMagazineItemStack === undefined) { return; }


    const newMagazineAmmoCount = FirearmUtil.getAmmoCountFromOffhand(player);
    if(newMagazineTag === null) { return; }
    if(newMagazineAmmoCount !== oldAmmoCount || currentMagazineTag !== newMagazineTag) {
        if(newMagazineAmmoCount === null || newMagazineAmmoCount === undefined) { return; }

        const newMagazineObject = FirearmUtil.getMagazineObjectFromItemStack(newMagazineItemStack);
        if(newMagazineObject === undefined) { return; }

        const oldMagazineName = isOldMagazineEmpty ? oldMagazineTag+"_empty" : oldMagazineTag;
        /** @type {ItemStack|undefined} */
        const oldMagazineItemStack = oldMagazineName === MagazineTags.none ? undefined : new ItemStack(oldMagazineName);
        if(oldMagazineItemStack != undefined) {
            const oldMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack);
            if(oldMagazineObject === undefined) { return; }
            if(oldMagazineObject.magazineType === MagazineTypes.durabilityBased) {
                ItemUtil.trySetDurability(oldMagazineItemStack, oldAmmoCount);
            }
            else if(oldMagazineObject.magazineType === MagazineTypes.stackBased) {
                oldMagazineItemStack.amount = oldAmmoCount;
            }
            else {
                console.error(`undefined magazineType in tryManualReload(): ${oldMagazineObject.magazineType} on magazine ${isOldMagazineEmpty ? oldMagazineTag+"_empty" : oldMagazineTag}`);
                return;
            }
        }
        //the only time it goes through to manual reload
        handleBeforeReload(player, new ReloadType(newMagazineObject.magazineType, ReloadTypes.manualSwap), oldMagazineItemStack, newMagazineItemStack);
    }
}

/**
 * Call this function when a possible reload sequence is called (right click on empty, left click on tactical)
 * Replaces automaticMagazineSwap function
 * Not done
 * @param {Player} player 
 * @param {keyof import('./2Definitions/ReloadDefinition.js').ReloadTypesDef} reloadType
 */
function tryAutomaticReload(player, reloadType) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const firearmItemStack = ItemUtil.getSelectedContainerSlot(player)?.getItem();
    if(firearmItemStack === undefined) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === undefined) { return; }
    const firearmId = Number(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.id));
    if(firearmId === null || firearmId === undefined) { return; }
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { return; }
    
    const ammoCount = FirearmUtil.getWorldAmmoUsingId(firearmId);
    const oldMagazineItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    const oldMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack);
    if(ammoCount === null || ammoCount === undefined) { return; }
    if(reloadType === ReloadTypes.normal && ammoCount > 0) { return; } //right-click reload would stop here if not empty
    if(firearmObject.magazineAttribute.defaultMagazine.magazineType === MagazineTypes.durabilityBased && 
       reloadType === ReloadTypes.tactical && ammoCount === oldMagazineObject?.maxAmmo) { return; } //left-click reload would stop here if full mag
    if(firearmObject.magazineAttribute.defaultMagazine.magazineType === MagazineTypes.stackBased && 
        reloadType === ReloadTypes.tactical && ammoCount === firearmObject.magazineAttribute.maxMagazineItemStackAmount) { return; } //left-click reload would stop here if full mag

    console.log("automatic reload");

    const magazineType = firearmObject.magazineAttribute.defaultMagazine.magazineType;

    if(magazineType === MagazineTypes.durabilityBased) {
        let newMagazineItemStack = FirearmUtil.tryGetBestDurabilityMagazineItemStackForReload(player, ammoCount);
    
        //If the player is in creative, use the full counterpart of the empty one as a replacement
        if(player.getGameMode() === GameMode.creative) {
            if(oldMagazineItemStack !== undefined) {
                newMagazineItemStack = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack)?.itemStack;
            }
            if(newMagazineItemStack !== undefined) {
                handleBeforeReload(player, new ReloadType(magazineType, reloadType), oldMagazineItemStack, newMagazineItemStack);
            }
            return;
        }
        else {
            
            //If newMagazineItemStack === undefined, then could not find usable magazine
            if(newMagazineItemStack === undefined) { 
                console.log("could not find any usable magazines."); 
                return; 
            }
            handleBeforeReload(player, new ReloadType(magazineType, reloadType), oldMagazineItemStack, newMagazineItemStack);
        }
    }

    else if(magazineType === MagazineTypes.stackBased) {
        if(oldMagazineItemStack !== undefined && oldMagazineObject !== null) {
            if(player.getGameMode() === GameMode.creative) {
                const newMagazineItemStack = new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount);
                newMagazineItemStack.amount = firearmObject.magazineAttribute.maxMagazineItemStackAmount;
                handleBeforeReload(player, new ReloadType(magazineType, reloadType), oldMagazineItemStack, newMagazineItemStack);
            }
            else {
                let additionalAmmoCount = FirearmUtil.tryGetBestStackMagazineForReload(player, oldMagazineItemStack)?.amount;
                console.log(`additionalAmmoCount: ${additionalAmmoCount}`);
                if(additionalAmmoCount === undefined || additionalAmmoCount === 0) { return; }
                //if(oldMagazineItemStack.amount + additionalAmmoCount <= firearmObject.maxMagazineItemStackAmount) {
                const addAmount = (oldMagazineItemStack.amount + additionalAmmoCount > firearmObject.magazineAttribute.maxMagazineItemStackAmount) ? (firearmObject.magazineAttribute.maxMagazineItemStackAmount - oldMagazineItemStack.amount) : (additionalAmmoCount);
                const newMagazineItemStack = new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount);
                newMagazineItemStack.amount = oldMagazineItemStack.amount + addAmount;
                const removeItemStack = new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount);
                removeItemStack.amount = addAmount;
                ItemUtil.removeItemStackFromInventory(player, removeItemStack);
                handleBeforeReload(player, new ReloadType(magazineType, reloadType), oldMagazineItemStack, newMagazineItemStack);
            }
        }
        else {
            //need to change this to test for all usable magazines for the firearm and use the first one

            let additionalAmmoCount = CraftingUtil.getItemCountInInventory(player, firearmObject.magazineAttribute.defaultMagazine.tag);
        }
    }
}



/**
 * 
 * @param {Player} player 
 * @param {ReloadType} reloadType 
 * @param {ItemStack|undefined} oldMagazineItemStack 
 * @param {ItemStack} newMagazineItemStack 
 */
function handleBeforeReload(player, reloadType, oldMagazineItemStack, newMagazineItemStack) {
    const oldIsEmpty = oldMagazineItemStack === undefined ? true : FirearmUtil.isMagazineItemStackEmpty(oldMagazineItemStack);
    const newIsEmpty = FirearmUtil.isMagazineItemStackEmpty(newMagazineItemStack);
    const newMagazineTag = FirearmUtil.getMagazineObjectFromItemStackBoth(newMagazineItemStack)?.tag;
    if(newMagazineTag === undefined) { return; }
    let oldAmmoCount = 0;
    let newAmmoCount = 0;
    //Count bullets
    //----------------------------
    if(oldMagazineItemStack === undefined || oldIsEmpty) {
        oldAmmoCount = 0;
    }
    else if(reloadType.magazineType === MagazineTypes.durabilityBased) {
        oldAmmoCount = ItemUtil.tryGetDurability(oldMagazineItemStack)??0;
    }
    else if(reloadType.magazineType === MagazineTypes.stackBased) {
        oldAmmoCount = oldMagazineItemStack.amount;
    }

    
    if(newMagazineItemStack === undefined || newIsEmpty) {
        newAmmoCount = 0;
    }
    else if(reloadType.magazineType === MagazineTypes.durabilityBased) {
        newAmmoCount = ItemUtil.tryGetDurability(newMagazineItemStack)??0;
    }
    else if(reloadType.magazineType === MagazineTypes.stackBased) {
        newAmmoCount = oldMagazineItemStack === undefined ? 1 : oldMagazineItemStack.amount+1; //only +1 cuz every reload is +1 for stack based
    }
    //----------------------------

    //Do before reload things
    if(reloadType.magazineType === MagazineTypes.durabilityBased) {
        //remove old magazine if normal or tactical swap
        if(reloadType.reloadType === ReloadTypes.normal || reloadType.reloadType === ReloadTypes.tactical) {
            if(player.getGameMode() !== GameMode.creative) { ItemUtil.removeItemStackFromInventory(player, newMagazineItemStack); }
            console.log(`cleared  ${newMagazineItemStack.typeId} ${newAmmoCount}`);
            ItemUtil.getPlayerOffhandContainerSlot(player)?.setItem(newMagazineItemStack);
        }
        //run loop to make sure magazine is always removed on manual reload
        if(reloadType.reloadType === ReloadTypes.manualSwap) {
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
        startReloadCooldown(player, newMagazineTag, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, newMagazineItemStack);

    }
    //too lazy to do this rn
    else if(reloadType.magazineType === MagazineTypes.stackBased) {
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
        if(oldMagazineItemStack === undefined) {
            const actualNewMagazineItemStack = new ItemStack(newMagazineItemStack.typeId);
            actualNewMagazineItemStack.amount = 1;
            startReloadCooldown(player, newMagazineTag, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, actualNewMagazineItemStack, newMagazineItemStack);
        }
        else {
            const actualNewMagazineItemStack = new ItemStack(oldMagazineItemStack.typeId, oldMagazineItemStack.amount);
            actualNewMagazineItemStack.amount += 1;
            startReloadCooldown(player, newMagazineTag, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, actualNewMagazineItemStack, newMagazineItemStack);
        }
    }
}





/**
 * 
 * @param {Player} player 
 * @param {string} newMagazineTag
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {ReloadType} reloadType
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {ItemStack} [finalMagazineItemStack] - used only for stack-based reloading to iterate through until we get to the desire amount of ammo
 */
function startReloadCooldown(player, newMagazineTag, oldAmmoCount, newAmmoCount, reloadType, oldMagazineItemStack, newMagazineItemStack, finalMagazineItemStack) {
    console.log(`player: ${player.name}, newTag: ${newMagazineTag}, oldAmmo: ${oldAmmoCount}, newAmmo: ${newAmmoCount}, oldItem: ${oldMagazineItemStack?.typeId}, newItem: ${newMagazineItemStack.typeId}`);
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
    //        finishedReloading(null, player, firearmObject, oldMagazineItemStack, newMagazineItemStack, newMagazineTag, oldAmmoCount, newAmmoCount, soundTimeoutIdObjects, reloadType);
    //        return;
    //    }
    //}

    if(firearmObject instanceof Gun) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.should_open_cock_on_reload) === true) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);

            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.reloadOpenCock]);
            if(attribute instanceof ReloadAnimationAttribute) {
                let openCockMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_open_cock_animation_multiplier));
                if(Number.isNaN(openCockMultiplier)) { openCockMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadOpenCock, openCockMultiplier);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                magazineReloadTime += attribute.scaleDurationToValue;
                reloadTimeInTicks += attribute.scaleDurationToValue;
            }

        }
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine) === true) {
            //isSwapping = true;
            
            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.reloadBoth, AnimationTypes.reloadSwap]);
            if(attribute instanceof ReloadAnimationAttribute) {
                let normalMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                if(Number.isNaN(normalMultiplier) ) { normalMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadSwap, normalMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }
                idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadBoth, normalMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                magazineReloadTime += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
                reloadTimeInTicks  += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
            }
            
        }
        else {
            //isSwapping = false;
            
            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.reloadBoth, AnimationTypes.reloadNoSwap]);
            if(attribute instanceof ReloadAnimationAttribute) {
                let noSwapMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                if(Number.isNaN(noSwapMultiplier) ) { noSwapMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadNoSwap, noSwapMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }
                idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadBoth, noSwapMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                magazineReloadTime += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
                reloadTimeInTicks  += attribute.scaleDurationToValue;//*reloadTimeMultiplier;
            }
        }



        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload) === true) {
            //shouldCock = true;

            const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.reloadCock]);
            if(attribute instanceof ReloadAnimationAttribute) {
                let cockMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_cock_animation_multiplier));
                if(Number.isNaN(cockMultiplier) ) { cockMultiplier = 1.0; }
                let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadCock, cockMultiplier, reloadTimeInTicks);
                if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

                reloadTimeInTicks += attribute.scaleDurationToValue;
            }
        }
    }


    else if(firearmObject instanceof Explosive) {
        //untested, probably needs changing once explosives are added
        const attribute = FirearmUtil.tryGetAnimationAttribute(firearmObject, [AnimationTypes.reloadSwap]);
        if(attribute instanceof ReloadAnimationAttribute) {
            let normalMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
            if(Number.isNaN(normalMultiplier) ) { normalMultiplier = 1.0; }
            let idObjs = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadSwap, normalMultiplier);
            if(idObjs !== undefined) { soundTimeoutIdObjects = [...soundTimeoutIdObjects, ...idObjs]; }

            magazineReloadTime += attribute.scaleDurationToValue;
            reloadTimeInTicks  += attribute.scaleDurationToValue;
        }
    }
    else {
        console.error(`Could not find firearmObject of type ${typeof(firearmObject)} in startReloadCooldown()`);
    }


    player.startItemCooldown(firearmObject.tag, reloadTimeInTicks);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_reloading);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);

    //


    const startingTick = system.currentTick;
    const newMainLoopId = IdUtil.getRandomId();
    LoopUtil.startMainLoop(newMainLoopId, function() { 
        return reloading(newMainLoopId, player, 
                        firearmObject, reloadTimeInTicks, magazineReloadTime,
                        oldMagazineItemStack, newMagazineItemStack, newMagazineTag, oldAmmoCount, newAmmoCount, 
                        startingTick, soundTimeoutIdObjects, reloadType, finalMagazineItemStack); 
    });
}

/**
 * 
 * @param {Number} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {Number} reloadTimeInTicks
 * @param {Number} magazineReloadTime
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {string} newMagazineTag
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {Number} startingTick 
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects
 * @param {ReloadType} reloadType
 * @param {ItemStack} [finalMagazineItemStack]
 */
function reloading(mainLoopId, player, firearm, reloadTimeInTicks, magazineReloadTime, oldMagazineItemStack, newMagazineItemStack, newMagazineTag, oldAmmoCount, newAmmoCount, startingTick, soundTimeoutIdObjects, reloadType, finalMagazineItemStack) {
    if(tryCancelReload(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, oldAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack)) { return; }
    
    const currentReloadTime = system.currentTick - startingTick;
    const remainingReloadTime = reloadTimeInTicks - currentReloadTime;
    player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §a[${Math.round(remainingReloadTime/2)/10}]§e§l>`);
    
    if(remainingReloadTime <= 0) {
        finishedReloading(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, newMagazineTag, oldAmmoCount, newAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack);
    }
    else if((magazineReloadTime - currentReloadTime) <= 0) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);
    }
    if(Math.floor(magazineReloadTime - currentReloadTime) == 0) {
        SoundsUtil.stopSounds(soundTimeoutIdObjects, [AnimationTypes.reloadBoth, AnimationTypes.reloadSwap, AnimationTypes.reloadNoSwap]);
    }
}

/**
 * 
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {ItemStack|undefined} oldMagazineItemStack
 * @param {ItemStack} newMagazineItemStack
 * @param {string} newMagazineTag
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects 
 * @param {ReloadType} reloadType 
 * @param {ItemStack} [finalMagazineItemStack]
 */
function finishedReloading(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, newMagazineTag, oldAmmoCount, newAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack) {
    player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §aFinished§e§l>`);
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) {
        stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects);
        return;
    }
    const firearmId = Number(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.id));
    console.log(`set ammoCount to ${newAmmoCount} and magazineType to ${newMagazineTag}`);

    FirearmUtil.setWorldAmmoUsingId(firearmId, newAmmoCount);
    FirearmUtil.tryCopyWorldAmmoToMainhandFirearm(firearmContainerSlot);
    firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.magazineTag, newMagazineTag);
    firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty, false);
    
    if(oldMagazineItemStack !== undefined) { FirearmNameUtil.renewMagazineName(oldMagazineItemStack, oldAmmoCount); }
    if(reloadType.magazineType === MagazineTypes.durabilityBased && (player.getGameMode() !== GameMode.creative || reloadType.reloadType === ReloadTypes.manualSwap)) {
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
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);

    if(reloadType.magazineType === MagazineTypes.stackBased && finalMagazineItemStack !== undefined && newMagazineItemStack.amount < finalMagazineItemStack.amount) {
        handleBeforeReload(player, reloadType, newMagazineItemStack, finalMagazineItemStack);
    }
}

/**
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {SoundTimeoutIdObject[]} soundTimeoutIdObjects 
 */
function stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects) {
    player.startItemCooldown(firearm.tag, 0);
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
 * @param {ReloadType} reloadType 
 * @param {ItemStack} [finalMagazineItemStack]
 * @returns {boolean}
 */
function tryCancelReload(mainLoopId, player, firearm, oldMagazineItemStack, newMagazineItemStack, oldAmmoCount, soundTimeoutIdObjects, reloadType, finalMagazineItemStack) {
    const currentOffhandAmmoCount = FirearmUtil.getAmmoCountFromOffhand(player);
    if(!FirearmUtil.isHoldingFirearm(player) || 
        FirearmUtil.isSwitchingFirearm(player) || 
       !FirearmUtil.isOffhandMagazineCorrect(player) ||
        currentOffhandAmmoCount === null ||
        (reloadType.magazineType === MagazineTypes.durabilityBased && currentOffhandAmmoCount === oldAmmoCount) ||
        (reloadType.magazineType === MagazineTypes.stackBased && currentOffhandAmmoCount < oldAmmoCount)) {
        console.log(`cancelled: ${currentOffhandAmmoCount}, ${oldAmmoCount}`);
        player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §cCancelled§e§l>`);
        stopReloading(mainLoopId, player, firearm, soundTimeoutIdObjects);
        
        //if(newMagazineItemStack !== undefined) { FirearmNameUtil.renewMagazineName(newMagazineItemStack, newAmmoCount); }
        //should be different for stack based vvv
        if(player.getGameMode() !== GameMode.creative) {
            if(reloadType.magazineType === MagazineTypes.durabilityBased) {
                ItemUtil.addItemStackIntoInventory(player, newMagazineItemStack);
            }
            else if(reloadType.magazineType === MagazineTypes.stackBased && finalMagazineItemStack) {
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