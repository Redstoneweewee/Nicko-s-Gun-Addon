import { ContainerSlot, Player, world } from "@minecraft/server";
import { Global } from "./Global.js";
import { Firearm } from './2Definitions/FirearmDefinition.js';
import { FirearmUtil, ItemUtil, FirearmIdUtil, IdUtil } from './Utilities.js';
import { MagazineTypes } from "./1Enums/MagazineEnums.js";



/**
 * @param {Player} player
 */
function tryInitializeFirearm(player) {
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    if(firearmItemStack === undefined) { return; }
    const id = FirearmIdUtil.getFirearmId(firearmItemStack);
    if(findFirearmIdInWorldDynamicProperties(id)) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    this.initializeFirearm(player, firearmObject, ItemUtil.getSelectedContainerSlot(player));
}


/**
 * If called, will always initialize item. Use tryInitializeFirearm() if it shouldn't initialize if it has an id.
 * @param {Player} player
 * @param {Firearm?} firearm
 * @param {ContainerSlot?} firearmContainerSlot 
 */
function initializeFirearm(player, firearm, firearmContainerSlot) {
    if(firearm === null) { return; }
    if(firearmContainerSlot === null) { return; }


    firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId, firearm.magazineAttribute.defaultMagazine.itemTypeId);
    firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty, false);
    console.log(`set magazineTypeId to ${firearm.magazineAttribute.defaultMagazine.itemTypeId}`);
    const ammoCount = firearm.magazineAttribute.defaultMagazine.magazineType === MagazineTypes.DurabilityBased ? firearm.magazineAttribute.defaultMagazine.maxAmmo : firearm.magazineAttribute.maxMagazineItemStackAmount;
    
    const newId = IdUtil.getRandomId();
    FirearmIdUtil.initializeFirearmIdAndAmmo(newId, firearmContainerSlot, ammoCount);
    console.log(`item has new id: ${firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.id)}`);

    checkInitialization(firearmContainerSlot);
}

/**
 * 
 * @param {Number?} firearmId 
 * @returns {boolean}
 */

function findFirearmIdInWorldDynamicProperties(firearmId) {
    if(Number.isNaN(firearmId) || firearmId === undefined || firearmId === null) { return false; }
    const worldProperties = world.getDynamicPropertyIds();
    
    for(let i=0; i<worldProperties.length; i++) {
        if(firearmId === FirearmIdUtil.firearmIdStringToNumber(worldProperties[i])) {
            return true;
        }
    }
    return false;
}


/**
 * 
 * @param {ContainerSlot} firearmContainerSlot 
 */
function checkInitialization(firearmContainerSlot) {
    for(const property in Global.FirearmDynamicProperties) {
        if (Object.prototype.hasOwnProperty.call(Global.FirearmDynamicProperties, property)) {
            if(firearmContainerSlot.getDynamicProperty(property) === undefined) {
                console.error(`Item dynamic property ${property} on ${firearmContainerSlot.typeId} is not defined on initialization.`);
            }
        }
    }
}

export { tryInitializeFirearm, initializeFirearm };