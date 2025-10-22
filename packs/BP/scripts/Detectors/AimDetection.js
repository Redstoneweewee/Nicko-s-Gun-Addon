import { HudElement, HudVisibility, ItemComponentTypes, Player, system } from '@minecraft/server';
import { Vector3 } from '../Math/Vector3.js';
import { Global } from '../Global.js';
import { AnimationLink } from "../AnimationLink.js";
import { FirearmUtil, IdUtil, ItemUtil } from '../Utilities.js';
import { Firearm, GunWithAbility } from '../2Definitions/FirearmDefinition.js';
import { SwitchScopeZoomAttribute } from '../2Definitions/LeftClickAbilityDefinition.js';
const Vector = new Vector3();

/**
 * 
 * @param {Player} player 
 */
function aimDetection(player) {
    if(!FirearmUtil.isHoldingFirearm(player) && player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming) === false) { return; }
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmItemStack === undefined || firearmObject === undefined) {
        tryRemoveScopeZoom(player);
        return;
    }
    const cooldownComponent = firearmItemStack.getComponent(ItemComponentTypes.Cooldown);
    const maxCooldown = cooldownComponent === undefined ? 0 : cooldownComponent.cooldownTicks;


    if(FirearmUtil.isSwitchingFirearm(player) && player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming)) {
        renewScopeZoom(player, firearmObject);
    }
    else if(
        FirearmUtil.isHoldingFirearm(player) && 
        player.isSneaking && 
        !player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading) && 
        Number(player.getDynamicProperty(Global.PlayerDynamicProperties.script.aimRestrictionNumber)) === 0 &&
        (
            !firearmObject.scopeAttribute.stopAimOnCooldown || 
            player.getItemCooldown(firearmItemStack.typeId) === 0 || 
            player.getItemCooldown(firearmItemStack.typeId) >= (maxCooldown - firearmObject.scopeAttribute.stopAimDelay) ||
            FirearmUtil.getWorldAmmoUsingId(Number(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.id))) === 0
        )
    ) {
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
 * @param {Firearm|undefined} firearmObject 
 * @returns 
 */
function tryAddScopeZoom(player, firearmObject) {
    if(firearmObject === undefined) {
        tryRemoveScopeZoom(player);
        return;
    }
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming) === true) { return; }
    renewScopeZoom(player, firearmObject);
}
/**
 * 
 * @param {Player} player 
 * @param {Firearm|undefined} firearmObject 
 * @returns 
 */
function renewScopeZoom(player, firearmObject) {
    if(firearmObject === undefined) {
        tryRemoveScopeZoom(player);
        return;
    }
    player.removeEffect("speed");
    player.removeEffect("slowness");
    player.onScreenDisplay.setHudVisibility(HudVisibility.Hide, [HudElement.Crosshair]);
    if(firearmObject instanceof GunWithAbility && firearmObject.leftClickAbilityAttribute instanceof SwitchScopeZoomAttribute) {
        const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
        if(firearmContainerSlot !== null && (firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === 1 || firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === undefined)) {
            if(firearmObject.leftClickAbilityAttribute instanceof SwitchScopeZoomAttribute) {
                player.addEffect("speed", 20000000, {amplifier: firearmObject.scopeAttribute.speed, showParticles: false});
                player.addEffect("slowness", 20000000, {amplifier: firearmObject.scopeAttribute.slowness, showParticles: false});
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, true);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming);
            }
        }
        else if(firearmContainerSlot !== null && firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === 2) {
            if(firearmObject.leftClickAbilityAttribute instanceof SwitchScopeZoomAttribute) {
                player.addEffect("speed", 20000000, {amplifier: firearmObject.leftClickAbilityAttribute.alternateScopeAttribute.speed, showParticles: false});
                player.addEffect("slowness", 20000000, {amplifier: firearmObject.leftClickAbilityAttribute.alternateScopeAttribute.slowness, showParticles: false});
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, true);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming);
            }
        }
        else {
            console.error(`left click ability scope zoom does not support a third zoom level at this moment. currentScopeZoom: ${firearmContainerSlot?.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom)}`);
        }
    }
    else {
        player.addEffect("speed", 20000000, {amplifier: firearmObject.scopeAttribute.speed, showParticles: false});
        player.addEffect("slowness", 20000000, {amplifier: firearmObject.scopeAttribute.slowness, showParticles: false});
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming);
    }
}

/**
 * 
 * @param {Player} player 
 * @returns 
 */
function tryRemoveScopeZoom(player) {
    if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming) === false) { return; }
    player.removeEffect("speed");
    player.removeEffect("slowness");
    player.onScreenDisplay.setHudVisibility(HudVisibility.Reset, [HudElement.Crosshair]);
    player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, false);
    AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming);
}

export { aimDetection };