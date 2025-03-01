import { HudElement, HudVisibility, Player, system } from '@minecraft/server';
import { Vector3 } from '../Math/Vector3.js';
import { Global } from '../Global.js';
import { AnimationLink } from "../AnimationLink.js";
import { FirearmUtil, ItemUtil } from '../Utilities.js';
import { Firearm, GunWithAbility } from '../Definitions/FirearmDefinition.js';
import { LeftClickAbilityTypes, SwitchScopeZoomAttributes } from '../Definitions/LeftClickAbilityDefinition.js';
const Vector = new Vector3();

/**
 * 
 * @param {Player} player 
 */
function aimDetection(player) {
    if(!FirearmUtil.isHoldingFirearm(player) && player.getDynamicProperty(Global.PlayerDynamicProperties.script.isAiming) === false) { return; }
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);

    if(FirearmUtil.isSwitchingFirearm(player) && player.getDynamicProperty(Global.PlayerDynamicProperties.script.isAiming)) {
        renewScopeZoom(player, firearmObject);
    }
    else if(FirearmUtil.isHoldingFirearm(player) && player.isSneaking && !player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) {
        tryAddScopeZoom(player, firearmObject);
        //Does not apply night vision for javelin yet
    }
    else {
        tryRemoveScopeZoom(player);
    }
}

/**
 * 
 * @param {Player} player 
 * @param {Firearm?} firearmObject 
 * @returns 
 */
function tryAddScopeZoom(player, firearmObject) {
    if(firearmObject == null) {
        tryRemoveScopeZoom(player);
        return;
    }
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.isAiming) === true) { return; }
    renewScopeZoom(player, firearmObject);
}
/**
 * 
 * @param {Player} player 
 * @param {Firearm?} firearmObject 
 * @returns 
 */
function renewScopeZoom(player, firearmObject) {
    if(firearmObject == null) {
        tryRemoveScopeZoom(player);
        return;
    }
    player.removeEffect("speed");
    player.removeEffect("slowness");
    player.onScreenDisplay.setHudVisibility(HudVisibility.Hide, [HudElement.Crosshair]);
    if(firearmObject instanceof GunWithAbility && firearmObject.leftClickAbilityAttributes instanceof SwitchScopeZoomAttributes) {
        const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
        if(firearmContainerSlot !== null && (firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === 1 || firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === undefined)) {
            if(firearmObject.leftClickAbilityAttributes instanceof SwitchScopeZoomAttributes) {
                player.addEffect("speed", 20000000, {amplifier: firearmObject.leftClickAbilityAttributes.defaultScopeAttributes.speed, showParticles: false});
                player.addEffect("slowness", 20000000, {amplifier: firearmObject.leftClickAbilityAttributes.defaultScopeAttributes.slowness, showParticles: false});
                player.setDynamicProperty(Global.PlayerDynamicProperties.script.isAiming, true);
            }
        }
        else if(firearmContainerSlot !== null && firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === 2) {
            if(firearmObject.leftClickAbilityAttributes instanceof SwitchScopeZoomAttributes) {
                player.addEffect("speed", 20000000, {amplifier: firearmObject.leftClickAbilityAttributes.alternateScopeAttributes.speed, showParticles: false});
                player.addEffect("slowness", 20000000, {amplifier: firearmObject.leftClickAbilityAttributes.alternateScopeAttributes.slowness, showParticles: false});
                player.setDynamicProperty(Global.PlayerDynamicProperties.script.isAiming, true);
            }
        }
        else {
            console.error(`left click ability scope zoom does not support a third zoom level at this moment. currentScopeZoom: ${firearmContainerSlot?.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom)}`);
        }
    }
    else {
        player.addEffect("speed", 20000000, {amplifier: firearmObject.scopeAttributes.speed, showParticles: false});
        player.addEffect("slowness", 20000000, {amplifier: firearmObject.scopeAttributes.slowness, showParticles: false});
        player.setDynamicProperty(Global.PlayerDynamicProperties.script.isAiming, true);
    }
}

/**
 * 
 * @param {Player} player 
 * @returns 
 */
function tryRemoveScopeZoom(player) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.isAiming) === false) { return; }
    player.removeEffect("speed");
    player.removeEffect("slowness");
    player.onScreenDisplay.setHudVisibility(HudVisibility.Reset, [HudElement.Crosshair]);
    player.setDynamicProperty(Global.PlayerDynamicProperties.script.isAiming, false);
}

export { aimDetection };