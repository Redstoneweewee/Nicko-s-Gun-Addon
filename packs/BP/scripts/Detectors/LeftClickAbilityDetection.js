import { ContainerSlot, Entity, EntityComponentTypes, EntityHealthComponent, Player, system, world } from '@minecraft/server';
import { Vector3 } from '../Math/Vector3.js';
import { Global } from '../Global.js';
import { AnimationLink } from "../AnimationLink.js";
import { AnimationUtil, FirearmNameUtil, FirearmUtil, IdUtil, ItemUtil, LoopUtil } from '../Utilities.js';
import { Firearm, FiringModes, Gun, GunWithAbility } from '../Definitions/FirearmDefinition.js';
import { LeftClickAbilityTypes, SwitchFiringModeAttributes, SwitchScopeZoomAttributes } from '../Definitions/LeftClickAbilityDefinition.js';
import { AnimationTypes } from '../Definitions/AnimationDefinition.js';
import { automaticReloadDetection } from './AutoReloadDetection.js';
const Vector = new Vector3();

function onLeftClick(player) {
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
    if(firearmObject === null) { return; }
    const firearmItemStack = firearmContainerSlot.getItem();
    if(firearmItemStack === undefined) { return; }

    if(firearmObject instanceof GunWithAbility) {
        const maxAmmo   = FirearmUtil.getMagazineObjectFromItemStackBoth(ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem()??null)?.maxAmmo;
        const ammoCount = FirearmUtil.getAmmoCountFromOffhand(player);
        const isFullMagazine = (maxAmmo && ammoCount) ? (maxAmmo === ammoCount) ? true : false : false;
        //const speed = new Vector3(player.getVelocity().x, player.getVelocity().y, player.getVelocity().z).length();
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming) || isFullMagazine/** || speed <= 0.2*/) {
            console.log(`ability `);
            leftClickAbility(player, firearmContainerSlot, firearmObject);
        }
        else {
            console.log("tactical reload");
            automaticReloadDetection(player, firearmItemStack, true);
        }
    }
    else {
        console.log("tactical reload");
        automaticReloadDetection(player, firearmItemStack, true);
    }
}

/**
 * 
 * @param {Player} player 
 * @param {ContainerSlot} firearmContainerSlot
 * @param {GunWithAbility} firearmObject 
 * @returns 
 */
function leftClickAbility(player, firearmContainerSlot, firearmObject) {

    if(firearmObject.leftClickAbilityAttributes instanceof SwitchFiringModeAttributes) {
        if(firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === undefined ||
           firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === firearmObject.leftClickAbilityAttributes.defaultFiringMode) {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode, firearmObject.leftClickAbilityAttributes.alternateFiringMode);
            FirearmUtil.setPlayerFiringModeAndFireRate(player, firearmObject, firearmContainerSlot);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchFiringModeToAlternate);
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched firing mode to [§a${firearmObject.leftClickAbilityAttributes.alternateFiringMode}§f]`);
            console.log("set dynamic prop to alternate");
        }
        else {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode, firearmObject.leftClickAbilityAttributes.defaultFiringMode);
            FirearmUtil.setPlayerFiringModeAndFireRate(player, firearmObject, firearmContainerSlot);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchFiringModeToDefault);
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched firing mode to [§a${firearmObject.leftClickAbilityAttributes.defaultFiringMode}§f]`);
            console.log("set dynamic prop to default");
        }
    }
    else if(firearmObject.leftClickAbilityAttributes instanceof SwitchScopeZoomAttributes) {
        if(firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === undefined ||
           firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === 1) {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom, 2);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchScopeZoomToAlternate);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, false);
            //AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming); don't need animation link to stop stuttering
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched scope zoom to level [§a${firearmObject.leftClickAbilityAttributes.alternateScopeAttributes.slowness}§f]`);
            console.log("set dynamic prop to scope 2");
        }
        else {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom, 1);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchScopeZoomToDefault);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, false);
            //AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming); don't need animation link to stop stuttering
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched scope zoom to level [§a${firearmObject.leftClickAbilityAttributes.defaultScopeAttributes.slowness}§f]`);
            console.log("set dynamic prop to scope 1");
        }
    }
    else {
        console.error(`left click ability ${typeof(firearmObject.leftClickAbilityAttributes)} is not defined in LeftClickAbilityDetection`);
    }
}


export { onLeftClick };

/**
 * 
 * @param {Player} player 
 * @param {Entity} entity 
 */
/*
function tpLeftClickAbilityEntity(player, entity) {
    if(!entity.isValid()) { return; }
    const velocity = new Vector3(player.getVelocity().x, player.getVelocity().y, player.getVelocity().z);
    const speed = velocity.length();
    const viewDirection = new Vector3(player.getViewDirection().x, player.getViewDirection().y, player.getViewDirection().z);
    let tpVector = viewDirection;
    if(speed > 0.3) { tpVector.multiplyScalar(2.4); }
    else { tpVector.multiplyScalar(speed*6); }

    const tpLocation = tpVector.add(player.getHeadLocation());
    entity.teleport(tpLocation, {dimension: player.dimension});
}
*/