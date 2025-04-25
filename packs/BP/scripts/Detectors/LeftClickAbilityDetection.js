import { ContainerSlot, Entity, EntityComponentTypes, EntityHealthComponent, Player, system, world } from '@minecraft/server';
import { Vector3 } from '../Math/Vector3.js';
import { Global } from '../Global.js';
import { AnimationLink } from "../AnimationLink.js";
import { AnimationUtil, FirearmNameUtil, FirearmUtil, IdUtil, ItemUtil, LoopUtil } from '../Utilities.js';
import { Firearm, FiringModes, Gun, GunWithAbility } from '../2Definitions/FirearmDefinition.js';
import { LeftClickAbilityTypes, SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from '../2Definitions/LeftClickAbilityDefinition.js';
import { AnimationTypes } from '../1Enums/AnimationEnums.js';
//import { automaticMagazineSwap } from './AutoMagSwapDetection.js';
import * as Reload from '../Reload.js';
import { ReloadTypes } from '../2Definitions/ReloadDefinition.js';
const Vector = new Vector3();

function onLeftClick(player) {
    const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
    if(firearmContainerSlot === null) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
    if(firearmObject === null) { return; }
    const firearmItemStack = firearmContainerSlot.getItem();
    if(firearmItemStack === undefined) { return; }

    if(firearmObject instanceof GunWithAbility) {
        const maxAmmo   = FirearmUtil.getMagazineObjectFromItemStackBoth(ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem()??undefined)?.maxAmmo;
        const ammoCount = FirearmUtil.getAmmoCountFromOffhand(player);
        const isFullMagazine = (maxAmmo && ammoCount) ? (maxAmmo === ammoCount) ? true : false : false;
        //const speed = new Vector3(player.getVelocity().x, player.getVelocity().y, player.getVelocity().z).length();
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming) || isFullMagazine/** || speed <= 0.2*/) {
            console.log(`ability `);
            leftClickAbility(player, firearmContainerSlot, firearmObject);
        }
        else {
            console.log("tactical reload");
            Reload.tryAutomaticReload(player, ReloadTypes.tactical);
            //automaticMagazineSwap(player, firearmItemStack, true);
        }
    }
    else {
        console.log("tactical reload");
        Reload.tryAutomaticReload(player, ReloadTypes.tactical);
        //automaticMagazineSwap(player, firearmItemStack, true);
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

    if(firearmObject.leftClickAbilityAttribute instanceof SwitchFiringModeAttribute) {
        if(firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === undefined ||
           firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === firearmObject.firingMode) {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode, firearmObject.leftClickAbilityAttribute.alternateFiringMode);
            FirearmUtil.setPlayerFiringModeAndfiringRate(player, firearmObject, firearmContainerSlot);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchFiringModeToAlternate);
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched firing mode to [§a${firearmObject.leftClickAbilityAttribute.alternateFiringMode}§f]`);
            console.log("set dynamic prop to alternate");
        }
        else {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode, firearmObject.firingMode);
            FirearmUtil.setPlayerFiringModeAndfiringRate(player, firearmObject, firearmContainerSlot);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchFiringModeToDefault);
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched firing mode to [§a${firearmObject.firingMode}§f]`);
            console.log("set dynamic prop to default");
        }
    }
    else if(firearmObject.leftClickAbilityAttribute instanceof SwitchScopeZoomAttribute) {
        if(firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === undefined ||
           firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom) === 1) {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom, 2);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchScopeZoomToAlternate);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, false);
            //AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming); don't need animation link to stop stuttering
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched scope zoom to level [§a${firearmObject.leftClickAbilityAttribute.alternateScopeAttribute.slowness}§f]`);
            console.log("set dynamic prop to scope 2");
        }
        else {
            firearmContainerSlot.setDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom, 1);
            AnimationUtil.playAnimationWithSound(player, firearmObject, AnimationTypes.switchScopeZoomToDefault);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming, false);
            //AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.is_aiming); don't need animation link to stop stuttering
            FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
            player.sendMessage(`Switched scope zoom to level [§a${firearmObject.scopeAttribute.slowness}§f]`);
            console.log("set dynamic prop to scope 1");
        }
    }
    else {
        console.error(`left click ability ${typeof(firearmObject.leftClickAbilityAttribute)} is not defined in LeftClickAbilityDetection`);
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