import { ItemLockMode, ItemStack, Player, system } from '@minecraft/server';
import { Explosive, Firearm, Gun } from './Definitions/FirearmDefinition';
import { LoopUtil, ItemUtil, FirearmUtil, FirearmNameUtil, IdUtil, SoundsUtil, AnimationUtil } from './Utilities.js';
import { Global } from './Global.js';
import { AnimationLink } from './AnimationLink.js';
import { Magazine } from './Definitions/MagazineDefinition.js';
import { Vector3 } from './Math/Vector3.js';
import { AnimationTypes, ReloadAnimationAttributes } from './Definitions/AnimationDefinition.js';
const Vector = new Vector3();

/**
 * 
 * @param {Player} player 
 * @param {string} newMagazineTag
 * @param {Number} oldAmmoCount
 * @param {Number} newAmmoCount
 * @param {ItemStack} newMagazineItemStack
 */
function startReloadCooldown(player, newMagazineTag, oldAmmoCount, newAmmoCount, newMagazineItemStack) {
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmObject === null) { return; }
    let reloadTimeInTicks = 0;
    let magazineReloadTime = 0;
    let isSwapping = false;
    let shouldCock = false;
    let soundTimeoutIds = [];
    let reloadTimeMultiplier = 1;
    
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStack(newMagazineItemStack);
    if(magazineObject === null) { return; }
    if(magazineObject.scaleReloadTimeWithAmmo) {
        reloadTimeMultiplier = (newAmmoCount-oldAmmoCount)/magazineObject.maxAmmo;
        if(reloadTimeMultiplier < 0) {
            finishedReloading(null, player, firearmObject, newMagazineTag, newAmmoCount, soundTimeoutIds);
            return;
        }
    }

    if(firearmObject instanceof Gun) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine) == true) {
            for(let attributes of firearmObject.animationsAttributes) {
                if((attributes.animation.type === AnimationTypes.reloadBoth || attributes.animation.type === AnimationTypes.reloadSwap) && attributes instanceof ReloadAnimationAttributes) {
                    let normalMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                    if(normalMultiplier === undefined || normalMultiplier === null || Number.isNaN(normalMultiplier) ) { normalMultiplier = 1.0; }
                    let ids = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadSwap, normalMultiplier);
                    if(ids !== undefined) { soundTimeoutIds = soundTimeoutIds.concat(ids); }
                    ids = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadBoth, normalMultiplier);
                    if(ids !== undefined) { soundTimeoutIds = soundTimeoutIds.concat(ids); }
                    magazineReloadTime += attributes.scaleDurationToValue*reloadTimeMultiplier;
                    reloadTimeInTicks  += attributes.scaleDurationToValue*reloadTimeMultiplier;
                    break;
                }
            }
            isSwapping = true;
        }
        else {
            for(let attributes of firearmObject.animationsAttributes) {
                if((attributes.animation.type === AnimationTypes.reloadBoth || attributes.animation.type === AnimationTypes.reloadNoSwap) && attributes instanceof ReloadAnimationAttributes) {
                    let noSwapMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                    if(noSwapMultiplier === undefined || noSwapMultiplier === null || Number.isNaN(noSwapMultiplier) ) { noSwapMultiplier = 1.0; }
                    let ids = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadNoSwap, noSwapMultiplier);
                    if(ids !== undefined) { soundTimeoutIds = soundTimeoutIds.concat(ids); }
                    ids = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadBoth, noSwapMultiplier);
                    if(ids !== undefined) { soundTimeoutIds = soundTimeoutIds.concat(ids); }
                    magazineReloadTime += attributes.scaleDurationToValue*reloadTimeMultiplier;
                    reloadTimeInTicks  += attributes.scaleDurationToValue*reloadTimeMultiplier;
                    break;
                }
            }
            isSwapping = false;
        }
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload) == true) {
            for(let attributes of firearmObject.animationsAttributes) {
                if(attributes.animation.type === AnimationTypes.reloadCock && attributes instanceof ReloadAnimationAttributes) {
                    let cockMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_cock_animation_multiplier));
                    if(cockMultiplier === undefined || cockMultiplier === null || Number.isNaN(cockMultiplier) ) { cockMultiplier = 1.0; }
                    let ids = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadCock, cockMultiplier, reloadTimeInTicks);
                    if(ids !== undefined) { soundTimeoutIds = soundTimeoutIds.concat(ids); }

                    reloadTimeInTicks += attributes.scaleDurationToValue;
                    break;
                }
            }
            shouldCock = true;
        }
    }
    else if(firearmObject instanceof Explosive) {
        for(let attributes of firearmObject.animationsAttributes) {
            if(attributes.animation.type === AnimationTypes.reloadSwap && attributes instanceof ReloadAnimationAttributes) {
                let normalMultiplier = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier));
                if(normalMultiplier === undefined || normalMultiplier === null || Number.isNaN(normalMultiplier) ) { normalMultiplier = 1.0; }
                let ids = AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.reloadSwap, normalMultiplier);
                if(ids !== undefined) { soundTimeoutIds = soundTimeoutIds.concat(ids); }

                magazineReloadTime += attributes.scaleDurationToValue;
                reloadTimeInTicks  += attributes.scaleDurationToValue;
                break;
            }
        }
    }
    else {
        console.error(`Could not find firearmObject of type ${typeof(firearmObject)} in startReloadCooldown()`);
    }
    console.log(`reloadTimeInTicks: ${reloadTimeInTicks}`);
    player.startItemCooldown(firearmObject.tag, reloadTimeInTicks);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_reloading);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);

    const startingTick = system.currentTick;
    const newMainLoopId = IdUtil.getRandomId();
    LoopUtil.startMainLoop(newMainLoopId, function() { 
        return reloading(newMainLoopId, player, 
                        firearmObject, reloadTimeInTicks, magazineReloadTime,
                        newMagazineTag, newAmmoCount, 
                        startingTick, soundTimeoutIds); 
    });
}

/**
 * 
 * @param {Number} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {Number} reloadTimeInTicks
 * @param {Number} magazineReloadTime
 * @param {string} newMagazineTag
 * @param {Number} newAmmoCount
 * @param {Number} startingTick 
 * @param {Number[]} soundTimeoutIds 
 */
function reloading(mainLoopId, player, firearm, reloadTimeInTicks, magazineReloadTime, newMagazineTag, newAmmoCount, startingTick, soundTimeoutIds) {
    if(cancelReloadCheck(mainLoopId, player, firearm, newAmmoCount, soundTimeoutIds)) { return; }
    
    const currentReloadTime = system.currentTick - startingTick;
    const remainingReloadTime = reloadTimeInTicks - currentReloadTime;
    player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §a[${Math.round(remainingReloadTime/2)/10}]§e§l>`);

    if((magazineReloadTime - currentReloadTime) <= 0) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);
    }
    if(remainingReloadTime <= 0) {
        finishedReloading(mainLoopId, player, firearm, newMagazineTag, newAmmoCount, soundTimeoutIds);
    }
}

/**
 * 
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {string} newMagazineTag
 * @param {Number} newAmmoCount
 * @param {Number[]} soundTimeoutIds 
 * @returns 
 */
function finishedReloading(mainLoopId, player, firearm, newMagazineTag, newAmmoCount, soundTimeoutIds) {
    player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §aFinished§e§l>`);
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) {
        stopReloading(mainLoopId, player, firearm, soundTimeoutIds);
        return;
    }
    const firearmId = Number(firearmContainerSlot.getDynamicProperty(Global.ItemDynamicProperties.id));
    console.log(`set ammoCount to ${newAmmoCount} and magazineType to ${newMagazineTag}`);

    FirearmUtil.setWorldAmmoUsingId(firearmId, newAmmoCount);
    FirearmUtil.tryCopyWorldAmmoToMainhandFirearm(firearmContainerSlot);
    firearmContainerSlot.setDynamicProperty(Global.ItemDynamicProperties.magazineTag, newMagazineTag);
    const firearmItemStack = firearmContainerSlot.getItem();
    if(firearmItemStack !== undefined) {
        Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
    }
    //FirearmUtil.printFirearmDynamicProperties(firearmContainerSlot.getItem());
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
    if(firearmObject === null) { cancelReloadCheck(mainLoopId, player, firearm, newAmmoCount, soundTimeoutIds); return; }
    FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);

    stopReloading(mainLoopId, player, firearm, soundTimeoutIds);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_start_cock, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_start_cock);
}

/**
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 */
function stopReloading(mainLoopId, player, firearm, soundTimeoutIds) {
    player.startItemCooldown(firearm.tag, 0);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_reloading);
        soundTimeoutIds.forEach(id => {
            system.clearRun(id);
        });
    if(mainLoopId !== null) { LoopUtil.stopMainLoop(mainLoopId); }
}

/**
 * 
 * @param {Number|null} mainLoopId 
 * @param {Player} player 
 * @param {Firearm} firearm
 * @param {Number} newAmmoCount
 * @param {Number[]} soundTimeoutIds 
 * @returns {boolean}
 */
function cancelReloadCheck(mainLoopId, player, firearm, newAmmoCount, soundTimeoutIds) {
    const currentOffhandAmmoCount = FirearmUtil.getAmmoCountFromOffhand(player);
    if(!FirearmUtil.isHoldingFirearm(player) || 
        FirearmUtil.isSwitchingFirearm(player) || 
       !FirearmUtil.isOffhandAmmoTypeCorrect(player) ||
        currentOffhandAmmoCount === null ||
        currentOffhandAmmoCount != newAmmoCount) {
            
        player.onScreenDisplay.setActionBar(`Reloading: §l§e<§r§7Reload: §cCancelled§e§l>`);
        stopReloading(mainLoopId, player, firearm, soundTimeoutIds);
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

export { startReloadCooldown };