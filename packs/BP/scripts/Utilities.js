import { Entity, EntityDamageCause, EntityHealthComponent, EntityInventoryComponent, GameMode, ContainerSlot, Player, system, ItemStack, ItemDurabilityComponent, EntityEquippableComponent, EquipmentSlot, EntityComponentTypes, ItemComponentTypes, world, EntityTypeFamilyComponent, Block, Dimension, BlockVolume, EntityProjectileComponent, MolangVariableMap } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from './Global.js';
import { Firearm, Gun, Explosive, GunWithAbility } from './2Definitions/FirearmDefinition.js';
import { FirearmTypeIds, FiringModes } from './1Enums/FirearmEnums.js';
import { Magazine } from './2Definitions/MagazineDefinition.js';
import { DurabilityMagazineClasses, MagazineClasses, MagazineClassTextNames, MagazineTypeIds, MagazineTypes, StackMagazineClasses } from './1Enums/MagazineEnums.js';
//import { startReloadCooldown } from './Reload.js';
import { AnimationLink } from './AnimationLink.js';
import { SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from './2Definitions/LeftClickAbilityDefinition.js';
import { NormalAnimation, ScaledAnimation, SoundTimeoutIdObject } from './2Definitions/AnimationDefinition.js';
import { AnimationTypes } from './1Enums/AnimationEnums.js';
import { Crafting } from './2Definitions/CraftingDefinition.js';
import { MaxHeap } from './Imports/MaxHeap.js';
import { AmmoMap } from './3Lists/AmmoList.js';
import { AmmoTypes } from './1Enums/AmmoEnums.js';
import { FirearmAmmoClasses } from './1Enums/AmmoEnums.js';
import { TypeUtil } from './UtilitiesInit.js';
import { excludedFamilies, excludedGameModes, excludedTypes } from './1Enums/HitExclusionArrays.js';
import { clamp, MathUtils } from './Math/MathUtils.js';
import * as BlockColors from './3Lists/BlockColorsList.js';
//import { settingsList, SettingsTypes } from './Lists/SettingsList.js';
const Vector = new Vector3();

class NumberUtil {
    /**
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    static getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }
}

export { NumberUtil };

class VectorUtil {
    /**
     * 
     * @param {Vector3|import('@minecraft/server').Vector3} vec1 
     * @param {Vector3|import('@minecraft/server').Vector3} vec2 
     * @returns {number}
     */
    static distance(vec1, vec2) {
        /**@type {Vector3} */
        let vec1New;
        let vec2New;
        if(!(vec1 instanceof Vector3)) { vec1New = VectorUtil.objectToVector3(vec1); }
        else { vec1New = vec1; }
        if(!(vec2 instanceof Vector3)) { vec2New = VectorUtil.objectToVector3(vec2); }
        else { vec2New = vec2; }
        return new Vector3(vec2New.x, vec2New.y, vec2New.z).sub(new Vector3(vec1New.x, vec1New.y, vec1New.z)).length();
    }

    /**
     * 
     * @param {import('@minecraft/server').Vector3} obj 
     * @returns {Vector3}
     */
    static objectToVector3(obj) {
        return new Vector3(obj.x, obj.y, obj.z);
    }
}
export { VectorUtil };

class StringUtil {

    /**
     * @param {string|undefined} text
     * @param {string} color - a section sign color, like §a, §c
     * @returns {string}
     */
    static forceTextColor(text, color) {
        if(text === undefined) { return ""; }
        let newText = "";
        let split = text.split('§');
        for(let i=0; i<split.length; i++) {
            if(i != 0) {
                split[i] = split[i].substring(1);
            }
            newText += split[i];
        }
        newText = color + newText;
        return newText;
    }


    /**
     * @param {string|undefined} text
     * @param {string|undefined} color - a section sign color, like §a, §c
     * @param {boolean} removeNewLines
     * @returns {string}
     */
    static reformat(text, color, removeNewLines = false) {
        if(text === undefined) { return ""; }
        let output = "";
        if(color !== undefined) {
            output = StringUtil.forceTextColor(text, color);
        }
        if(removeNewLines) {
            output = output.split('\n').join(' ');
        }
        return output;
    }
}

export { StringUtil };
class IdUtil {

    /**
     * @returns {Number}
     */
    static getRandomId() {
        return NumberUtil.getRandomInteger(Math.pow(2,-32), Math.pow(2,32));
    }

}

export { IdUtil };

class MapUtil {
    // /**
    //  * @param {Map} map
    //  */
    // static printMap(map) {
    //     const output = this.getMapAsString(map)
    //     console.log(output);
    // }
    // /**
    //  * @param {Map} map
    //  * @returns {string}
    //  */
    // static getMapAsString(map) {
    //     let output = "";
    //     for(const entry of map) {
    //         output += `key: ${entry[0]}, value: ${entry[1]}\n`;
    //     }
    //     return output;
    // }
}

export { MapUtil };




class LoopUtil {

    // /**
    //  * @param {Player} player
    //  * @param {Map} map - A Global map. Must be a `Global.playerShootingLoopIds`
    //  * @param {function} func
    //  * @param {number} deltaTime
    //  */
    // static startAsyncLoop(player, map, func, deltaTime) {
    //     //if(Global.playerShootingLoopIds.get(player.id) != -1) {
    //     //    console.warn(`player ${player.name} is already shooting with loop ID ${Global.playerShootingLoopIds.get(player.id)}!`);
    //     //    return;
    //     //}
    //     func(); 
    //     const loopId = system.runInterval(() => {
    //         func();
    //     }, deltaTime);
    //     this.#addId(player, map, loopId);
    // }

    // /**
    //  * @param {Player} player
    //  * @param {Map} map - A Global map.
    //  */
    // static stopAsyncLoop(player, map) {
    //     const loopIds = map.get(player.id);
    //     //console.log(loopIds);
    //     if(loopIds === undefined) { return; }
    //     loopIds.forEach(e => {
    //         system.clearRun(e);
    //     });
    //     map.set(player.id, []);
    // }


    // /**
    //  * @param {Player} player
    //  * @param {Map} map - A Global map. Must be a `Global.playerShootingLoopIds`
    //  * @param {number} id
    //  */
    // static #addId(player, map, id) {
    //     const newIds = map.get(player.id)? Array.prototype.concat(id, map.get(player.id)) : [id];
    //     map.set(player.id, newIds);
    // }


    /**
     * @param {Number} mainLoopId
     * @param {function} func
     */
    static startMainLoop(mainLoopId, func) {
        Global.mainLoops.set(mainLoopId, func);
    }

    
    /**
     * @param {Number} mainLoopId
     */
    static stopMainLoop(mainLoopId) {
        Global.mainLoops.delete(mainLoopId);
    }
}

export { LoopUtil };




class ItemUtil {
    /**
     * @param {Player} player 
     * @returns {ItemStack|undefined}
     */
    static getSelectedItemStack(player) {
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(inv === undefined) { return; }
        if(!(inv instanceof EntityInventoryComponent)) { return; }
        const container = inv.container;
        if(container === undefined) { return; }
        return container.getSlot(player.selectedSlotIndex).getItem();
    }
    
    /**
     * Only use ContainerSlot when needing to .getItem() or .setItem(). Do not alter directly.
     * @param {Player} player 
     * @returns {ContainerSlot?}
     */
    static getSelectedContainerSlot(player) {
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(inv === undefined) { return null; }
        if(!(inv instanceof EntityInventoryComponent)) { return null; }
        const container = inv.container;
        if(container === undefined) { return null; }
        return container.getSlot(player.selectedSlotIndex)??null;
    }

    /**
     * 
     * @param {ItemStack} itemStack 
     * @returns {number|undefined}
     */
    static tryGetDurability(itemStack) {
        const durabilityComponent = itemStack.getComponent(ItemComponentTypes.Durability);
        if(!(durabilityComponent instanceof ItemDurabilityComponent)) { return; }
        return durabilityComponent.maxDurability - durabilityComponent.damage;
    }

    /**
     * 
     * @param {ItemStack} itemStack 
     * @param {number} durability 
     * @returns {ItemStack|undefined}
     */
    static trySetDurability(itemStack, durability) {
        const durabilityComponent = itemStack.getComponent(ItemComponentTypes.Durability);
        if(!(durabilityComponent instanceof ItemDurabilityComponent)) { return; }
        if(durabilityComponent.maxDurability - durability < 0) { return; }
        durabilityComponent.damage = durabilityComponent.maxDurability - durability;
        return itemStack;
    }
    
    /**
     * @param {Player} player 
     * @param {number} damage
     * @returns {number|undefined} - Returns the durability (ammo count) of the magazine
     */
    static tryDealDurabilityDamageToOffhandMagazine(player, damage) {
        if(!FirearmUtil.isOffhandMagazineTypeValid(player)) { return; }
        const magazineItemStack = this.getPlayerOffhandContainerSlot(player)?.getItem();
        if(magazineItemStack === undefined) { return; }
        const durabilityComponent = magazineItemStack.getComponent(ItemComponentTypes.Durability);
        if(!(durabilityComponent instanceof ItemDurabilityComponent)) { return; }
        const durability = durabilityComponent.maxDurability - durabilityComponent.damage;

        let output = durability - damage;
        if(durability >= damage) {
            durabilityComponent.damage = durabilityComponent.damage + damage;
        }
        const magazineContainerSlot = this.getPlayerOffhandContainerSlot(player);
        if(magazineContainerSlot === null) { return; }
        if(durabilityComponent.damage === durabilityComponent.maxDurability) {
            try {
                //console.log(`set magazine to ${itemStack.typeId}_empty`);
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
                const emptyMagazineItemStack = new ItemStack(magazineItemStack.typeId+"_empty", 1);
                magazineContainerSlot.setItem(emptyMagazineItemStack);
                const magazineTypeId = TypeUtil.getValueFromList(MagazineTypeIds, magazineItemStack.typeId);
                const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
                const firearmItemStack = firearmContainerSlot?.getItem();
                if(magazineTypeId === undefined || firearmContainerSlot === null || firearmItemStack === undefined) { return; }
                const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
                FirearmUtil.setFirearmMagazineToEmpty(player, magazineTypeId, firearmContainerSlot, firearmId);
            }
            catch {
                console.error(`Magazine ${magazineItemStack.typeId} does not have an empty counterpart.`);
            }
            output = 0;
        }
        else {
            if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo) === undefined ||
               player.getDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo) === false) {
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
            }
            FirearmNameUtil.renewMagazineName(magazineItemStack, (durabilityComponent.maxDurability-durabilityComponent.damage));
            magazineContainerSlot.setItem(magazineItemStack);
        }
        return output;
    }



    /**
     * @param {Player} player 
     * @param {Firearm} firearm
     * @param {number} damage
     * @returns {number|undefined} - Returns the new ammo count of the magazine
     */
    static tryRemoveStackAmountForOffhandMagazine(player, firearm, damage) {
        if(!FirearmUtil.isOffhandMagazineTypeValid(player)) { return; }
        const magazineContainerSlot = this.getPlayerOffhandContainerSlot(player);
        if(magazineContainerSlot === null) { return; }
        const magazineItemStack = magazineContainerSlot.getItem();
        if(magazineItemStack === undefined) { return; }
        if(magazineItemStack.amount === 1) {
            magazineContainerSlot.setItem();
            const magazineTypeId = TypeUtil.getValueFromList(MagazineTypeIds, magazineItemStack.typeId);
            const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
            const firearmItemStack = firearmContainerSlot?.getItem();
            if(magazineTypeId === undefined || firearmContainerSlot === null || firearmItemStack === undefined) { return; }
            const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
            FirearmUtil.setFirearmMagazineToEmpty(player, magazineTypeId, firearmContainerSlot, firearmId);
            return 0;
        }
        else {
            magazineItemStack.amount -= 1;
            magazineContainerSlot.setItem(magazineItemStack);
            return magazineItemStack.amount;
        }
    }

    /**
     * Only use ContainerSlot when needing to .getItem() or .setItem(). Do not alter directly.
     * @param {Player} player 
     * @returns {ContainerSlot?}
     */
    static getPlayerOffhandContainerSlot(player) {
        const equippable = player.getComponent(EntityComponentTypes.Equippable);
        if(equippable === undefined) { return null; }
        if(!(equippable instanceof EntityEquippableComponent)) { return null; }
        const offhand = equippable.getEquipmentSlot(EquipmentSlot.Offhand);
        return offhand??null;
    }

    /**
     * 
     * @param {Player} player 
     * @param {number} keepAmount
     */
    static moveOldOffhandItemOff(player, keepAmount = 0) {
        const offhandSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
        const oldItem = offhandSlot?.getItem();
        if(oldItem === undefined) { return; }
            console.log(`keepAmount: ${keepAmount}`);

        if(keepAmount == 0) {
            ItemUtil.addItemStackIntoInventory(player, oldItem);
        }
        else {
            oldItem.amount = oldItem.amount-keepAmount;
            ItemUtil.addItemStackIntoInventory(player, oldItem);
            oldItem.amount = keepAmount;
            offhandSlot?.setItem(oldItem);
        }
    }

    /**
     * 
     * @param {Player} player 
     * @param {ItemStack|undefined} itemStack 
     */
    static addItemStackIntoInventory(player, itemStack) {
        if(itemStack === undefined) { return; }
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(!(inv instanceof EntityInventoryComponent)) { return; }
        const container = inv.container;
        if(container === undefined) { return; }
        let fillSlot = -1;
        
        //find stackable in inv before hotbar
        for(let i=9; i<container.size; i++) {
            const slotItemStack = container.getSlot(i).getItem();
            if(slotItemStack === undefined) { 
                if(fillSlot === -1) { fillSlot = i; }
                continue; 
            }
            if(slotItemStack.isStackableWith(itemStack)) {
                if(slotItemStack.amount + itemStack.amount <= slotItemStack.maxAmount) {
                    slotItemStack.amount += itemStack.amount;
                    container.getSlot(i).setItem(slotItemStack);
                    return;
                }
                else {
                    const addAmount = slotItemStack.maxAmount - slotItemStack.amount;
                    slotItemStack.amount += addAmount;
                    itemStack.amount -= addAmount;
                    container.getSlot(i).setItem(slotItemStack);
                }
            }
        }
        
        //find stackable in hotbar
        for(let i=0; i<9; i++) {
            const slotItemStack = container.getSlot(i).getItem();
            if(slotItemStack === undefined) { 
                if(fillSlot === -1) { fillSlot = i; }
                continue; 
            }
            if(slotItemStack.isStackableWith(itemStack)) {
                if(slotItemStack.amount + itemStack.amount <= slotItemStack.maxAmount) {
                    slotItemStack.amount += itemStack.amount;
                    container.getSlot(i).setItem(slotItemStack);
                    return;
                }
                else {
                    const addAmount = slotItemStack.maxAmount - slotItemStack.amount;
                    slotItemStack.amount += addAmount;
                    itemStack.amount -= addAmount;
                    container.getSlot(i).setItem(slotItemStack);
                }
            }
        }

        //if items left, set to fillSlot
        if(fillSlot !== -1) {
            container.getSlot(fillSlot).setItem(itemStack);
        }
        //if no fillSlot (no space), just use add
        else {
            const offset = 2.5;
            const spawnLocation = new Vector3(player.getHeadLocation().x+player.getViewDirection().x*offset,
                                            player.getHeadLocation().y+player.getViewDirection().y*offset,
                                            player.getHeadLocation().z+player.getViewDirection().z*offset, );
            const itemEntity = player.dimension.spawnItem(itemStack, spawnLocation);
            itemEntity.applyImpulse(new Vector3(player.getViewDirection().x*0.3,player.getViewDirection().y*0.3,player.getViewDirection().z*0.3));
        }
    }

    /**
     * @param {Player} player 
     * @param {ItemStack|undefined} itemStack 
     */
    static removeItemStackFromInventory(player, itemStack) {
        if(itemStack === undefined) { return; }
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(!(inv instanceof EntityInventoryComponent)) { return; }
        const container = inv.container;
        if(container === undefined) { return; }
        
        //find stackable in inv before hotbar
        for(let i=9; i<container.size; i++) {
            const slotItemStack = container.getSlot(i).getItem();
            if(slotItemStack === undefined) { continue; }
            if(slotItemStack.typeId === itemStack.typeId && ItemUtil.tryGetDurability(slotItemStack) === ItemUtil.tryGetDurability(itemStack)) {
                if(slotItemStack.amount > itemStack.amount) {
                    slotItemStack.amount -= itemStack.amount;
                    container.getSlot(i).setItem(slotItemStack);
                    return;
                }
                else if(slotItemStack.amount === itemStack.amount) {
                    container.getSlot(i).setItem();
                    return;
                }
                else {
                    const removeAmount = slotItemStack.amount;
                    container.getSlot(i).setItem();
                    itemStack.amount -= removeAmount;
                }
            }
        }
        for(let i=0; i<9; i++) {
            const slotItemStack = container.getSlot(i).getItem();
            if(slotItemStack === undefined) { continue; }
            if(slotItemStack.typeId === itemStack.typeId && ItemUtil.tryGetDurability(slotItemStack) === ItemUtil.tryGetDurability(itemStack)) {
                if(slotItemStack.amount > itemStack.amount) {
                    slotItemStack.amount -= itemStack.amount;
                    container.getSlot(i).setItem(slotItemStack);
                    return;
                }
                else if(slotItemStack.amount === itemStack.amount) {
                    container.getSlot(i).setItem();
                    return;
                }
                else {
                    const removeAmount = slotItemStack.amount;
                    container.getSlot(i).setItem();
                    itemStack.amount -= removeAmount;
                }
            }
        }
    }
}

export { ItemUtil };



class FirearmUtil {

    /**
     * @param {Player} player 
     * @param {Firearm} firearm
     * @param {number} ammoCount 
     * @returns {number|undefined} - Returns the new ammo count of the firearm
     */
    static tryConsumeFirearmAmmo(player, firearm, ammoCount) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        if(firearmItemStack === undefined) { return; }
        
        const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
        this.#consumeAmmoUsingId(firearmId, ammoCount);
        if(firearm.magazineAttribute.defaultMagazine.magazineType === MagazineTypes.DurabilityBased) {
            return ItemUtil.tryDealDurabilityDamageToOffhandMagazine(player, ammoCount);
        }
        else {
            return ItemUtil.tryRemoveStackAmountForOffhandMagazine(player, firearm, ammoCount);
        }
        
    }
    /**
     * 
     * @param {number} id 
     * @param {number} ammoCount 
     */
    static #consumeAmmoUsingId(id, ammoCount) {
        const firearmIdString = FirearmIdUtil.firearmIdToString(id);
        const oldAmmoCount = Number(world.getDynamicProperty(firearmIdString));
        if(Number.isNaN(oldAmmoCount)) {
            console.error(`Firearm with id ${id} has an undefined amount of ammo in #consumeAmmoUsingId()`);
            return;
        } 
        world.setDynamicProperty(firearmIdString, (oldAmmoCount-ammoCount));
    }

    /**
     * 
     * @param {Player} player 
     */
    static tryCopyFirearmAmmoToWorld(player) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        if(firearmItemStack === undefined) { return; }
        const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
        if(Number.isNaN(firearmId)) { return; }
        const firearmIdString = FirearmIdUtil.firearmIdToString(firearmId);
        if(world.getDynamicProperty(firearmIdString) === undefined) {
            const firearmAmmoCount = FirearmUtil.getItemAmmoUsingItemStack(firearmItemStack);
            if(firearmAmmoCount === undefined) { return; }
            world.setDynamicProperty(firearmIdString,  firearmAmmoCount);
            //FirearmIdUtil.printFirearmIds();
        }
    }

    /**
     * 
     * @param {ContainerSlot} containerSlot 
     */
    static tryCopyWorldAmmoToMainhandFirearm(containerSlot) {
        const firearmItemStack = containerSlot.getItem();
        if(firearmItemStack === undefined) { return; }
        const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
        const firearmIdString = FirearmIdUtil.firearmIdToString(firearmId);

        const ammoCount = Number(world.getDynamicProperty(firearmIdString));
        if(Number.isNaN(ammoCount)) { return; }
        containerSlot.setDynamicProperty(Global.FirearmDynamicProperties.ammoCount, ammoCount);
        //this.printFirearmDynamicProperties(containerSlot.getItem());
    }
    /**
     * 
     * @param {number} id 
     * @param {number} ammoCount 
     */
    static setWorldAmmoUsingId(id, ammoCount) {
        world.setDynamicProperty(FirearmIdUtil.firearmIdToString(id), ammoCount);
    }
    /**
     * 
     * @param {ItemStack} itemStack
     * @returns {number|undefined}
     */
    static getItemAmmoUsingItemStack(itemStack) {
        const ammoCount = Number(itemStack.getDynamicProperty(Global.FirearmDynamicProperties.ammoCount));
        if(Number.isNaN(ammoCount)) { 
            console.error(`itemDynamicProperty ammoCount of ${itemStack.typeId} is undefined`);
            return;
        }
        return ammoCount;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Number|undefined}
     */
    static getWorldAmmoUsingId(id) {
        /*
        for(let i=Global.worldFirearmIds.length-1; i>=0; i--) {
            for(const entry of Global.worldFirearmIds[i]) {
                if(entry[0] === id) {
                    return entry[1];
                }
            }
        }
        return null;
        */
        const firearmIdString = FirearmIdUtil.firearmIdToString(id);
        const ammoCount = Number(world.getDynamicProperty(firearmIdString));
        if(Number.isNaN(ammoCount)) {
            console.error(`Firearm with id ${id} has an undefined amount of ammo`);
            return;
        } 
        return ammoCount;
    }

    /**
     * 
     * @param {Player} player 
     * @returns {number|undefined}
     */
    static getAmmoCountFromOffhand(player) {
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(offhandItemStack === undefined) { return; }
        const magazineObject = this.getMagazineObjectFromItemStack(offhandItemStack);
        if(magazineObject === undefined) { return; }
        if(magazineObject.magazineType === MagazineTypes.DurabilityBased) {
            return ItemUtil.tryGetDurability(offhandItemStack);
        }
        else if(magazineObject.magazineType === MagazineTypes.StackBased) {
            return offhandItemStack.amount;
        }
        return;
    }

    /**
     * 
     * @param {Player} player 
     * @returns {boolean}
     */
    static isOffhandMagazineCorrect(player) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(firearmItemStack === undefined || offhandItemStack === undefined) { return false; }
        const firearmObject = this.getFirearmObjectFromItemStack(firearmItemStack);
        const magazineObject = this.getMagazineObjectFromItemStackBoth(offhandItemStack);
        if(firearmObject === undefined || magazineObject === undefined) { return false; }
        if(firearmObject.magazineAttribute.magazineClass === magazineObject.magazineClass) { return true; }
        return false;
    }
    
    /**
     * 
     * @param {Player} player 
     * @returns {boolean}
     */
    static isOffhandMagazineEmptyButCorrect(player) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(firearmItemStack === undefined) { return false; }
        if(offhandItemStack === undefined) { return false; }
        if(!offhandItemStack.typeId.includes("_empty")) { return false; }
        const firearmObject = this.getFirearmObjectFromItemStack(firearmItemStack);
        const magazineObject = this.getMagazineObjectFromItemStackEmpty(offhandItemStack);
        if(firearmObject === undefined) { return false; }
        if(magazineObject === undefined) { return false; }
        if(firearmObject.magazineAttribute.magazineClass === magazineObject.magazineClass) { return true; }
        return false;
    }

    /**
     * 
     * @param {Firearm} firearmObject 
     * @param {ItemStack} magazineItemStack 
     * @returns {boolean}
     */
    static isUsableMagazine(firearmObject, magazineItemStack) {
        const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
        if(magazineObject === undefined) { return false; }
        if(firearmObject.magazineAttribute.magazineClass !== magazineObject.magazineClass) { return false; }
        //check for magazine ammo type
        const magazineAmmoClass = FirearmUtil.getMagazineAmmoClassFromDynamicProperty(magazineItemStack);
        if(magazineAmmoClass === undefined) { return false; }
        if(!firearmObject.magazineAttribute.usableAmmoClasses.includes(magazineAmmoClass)) { return false; }
        return true;
    }

    /**
     * 
     * @param {Player} player 
     * @returns {boolean}
     */
    static isOffhandMagazineTypeValid(player) {
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(offhandItemStack === undefined) { return false; }
        const magazineTypeId = TypeUtil.getValueFromList(MagazineTypeIds, offhandItemStack.typeId);
        if(magazineTypeId === undefined) { return false; }
        if(Global.magazines.has(magazineTypeId)) { return true; }
        return false;
    }

    /**
     * @param {ItemStack} magazineItemStack 
     * @returns {typeof FirearmAmmoClasses[keyof typeof FirearmAmmoClasses]}
     */
    static getMagazineAmmoClassFromDynamicProperty(magazineItemStack) {
        const ammoClassString = String(magazineItemStack.getDynamicProperty(Global.MagazineDynamicProperties.ammoClass));
        const ammoClass = TypeUtil.getValueFromList(FirearmAmmoClasses, ammoClassString);
        //for now, just make all undefined "Normal"
        //Later, must make sure all magazines initialize to dynaProp of "Normal"
        //NOTE: Doesn't work with shotgun shells yet cuz they would become "Normal"
        //if(magazineClass === undefined) { return; }
        if(ammoClass === undefined) { return FirearmAmmoClasses.Normal; }
        return ammoClass;
    }


    /**
     * @param {Player} player 
     * @returns {boolean}
     */
    static isHoldingFirearm(player) {
        const itemStack = ItemUtil.getSelectedItemStack(player);
        if(itemStack === undefined) { return false; }
        const firearmTypeId = TypeUtil.getValueFromList(FirearmTypeIds, itemStack.typeId);
        if(firearmTypeId === undefined) { return false; }
        if(Global.firearms.has(firearmTypeId)) { return true; }
        return false;
    }

    /**
     * @param {Player} player 
     * @returns {boolean}
     */
    static isHoldingFirearmWithAbility(player) {
        if(!this.isHoldingFirearm(player)) { return false; }
        const itemStack = ItemUtil.getSelectedItemStack(player);
        const firearmObject = this.getFirearmObjectFromItemStack(itemStack);
        if(firearmObject === undefined) { return false; }
        if(firearmObject instanceof GunWithAbility) { return true; }
        return false;
    }

    

    /**
     * @param {Player} player 
     * @returns {boolean}
     */
    static isSwitchingFirearm(player) {
        if(!this.isHoldingFirearm(player)) { return false; }
        const oldFirearmId = Global.playerCurrentFirearmId.get(player.id);
        if(oldFirearmId === undefined) { return false; }
        const itemStack = ItemUtil.getSelectedItemStack(player);
        if(itemStack === undefined) { return false; }
        const newFirearmId = Number(itemStack.getDynamicProperty(Global.FirearmDynamicProperties.id));
        /**
         * if newFirearmId is NaN and not equal to oldFirearmId, then it is still a switch
         * because it means the new firearm has just been initialized
         */
        if(oldFirearmId !== newFirearmId) { return true; }
        return false;
    }

    /**
     * 
     * @param {Player} player
     * @param {typeof MagazineTypeIds[keyof typeof MagazineTypeIds]} newMagazineTypeId
     * @param {ContainerSlot} firearmContainerSlot
     * @param {Number} firearmId
     * @param {Number} ammoCount
     */
    static setFirearmMagazineToAmmoCount(player, newMagazineTypeId, firearmContainerSlot, firearmId, ammoCount) {
        if(ammoCount === 0) {
            FirearmUtil.setFirearmMagazineToEmpty(player, newMagazineTypeId, firearmContainerSlot, firearmId);
            return;
        }
        FirearmUtil.setWorldAmmoUsingId(firearmId, ammoCount);
        firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId, newMagazineTypeId);
        const firearmItemStack = firearmContainerSlot.getItem();
        if(firearmItemStack !== undefined) {
            Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
        if(firearmObject === undefined) { return; }
        FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
    }
    /**
     * 
     * @param {Player} player
     * @param {typeof MagazineTypeIds[keyof typeof MagazineTypeIds]} newMagazineTypeId
     * @param {ContainerSlot} firearmContainerSlot
     * @param {Number} firearmId
     */
    static setFirearmMagazineToEmpty(player, newMagazineTypeId, firearmContainerSlot, firearmId) {
        FirearmUtil.setWorldAmmoUsingId(firearmId, 0);
        firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty, true);
        firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId, newMagazineTypeId);
        const firearmItemStack = firearmContainerSlot.getItem();
        if(firearmItemStack !== undefined) {
            Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.has_first_ammo_animation)) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_first_ammo_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_first_ammo_reload);
        }
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
        if(firearmObject === undefined) { return; }
        FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
        if(firearmObject.hasMagazineWhenEmpty) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
        }
        else {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, false);
        }
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
    }
    /**
     * 
     * @param {Player} player 
     * @param {ContainerSlot} firearmContainerSlot
     * @param {Number} firearmId
     * @param {boolean} isSwappingOrReloading
     */
    static setFirearmMagazineToNone(player, firearmContainerSlot, firearmId, isSwappingOrReloading) {
        FirearmUtil.setWorldAmmoUsingId(firearmId, 0);
        firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty, false);
        firearmContainerSlot.setDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId, MagazineTypeIds.None);
        const firearmItemStack = firearmContainerSlot.getItem();
        if(firearmItemStack !== undefined) {
            Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
        }
        if(!isSwappingOrReloading) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, false);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
            if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.has_first_ammo_animation)) {
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_first_ammo_reload, true);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_first_ammo_reload);
            }
        }

        //this.printFirearmDynamicProperties(firearmContainerSlot.getItem());
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
        if(firearmObject === undefined) { return; }
        FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
    }

    
    /**
     * 
     * @param {ItemStack|undefined} itemStack 
     * @returns {Magazine|undefined}
     */
    static getMagazineObjectFromItemStack(itemStack) {
        if(itemStack === undefined) { return; }
        return TypeUtil.getValueFromMap(Global.magazines, MagazineTypeIds, itemStack.typeId);
    }

    
    /**
     * 
     * @param {ItemStack|undefined} itemStack 
     * @returns {Magazine|undefined}
     */
    static getMagazineObjectFromItemStackEmpty(itemStack) {
        if(itemStack === undefined) { return; }
        const normalName = itemStack.typeId.split("_empty")[0];
        //console.log(`getMagazineObjectFromItemStackEmpty: ${normalName}`);
        //TypeUtil.logStack();
        return TypeUtil.getValueFromMap(Global.magazines, MagazineTypeIds, normalName);
    }

    /**
     * @param {ItemStack} itemStack 
     * @returns {boolean}
     */
    static isMagazineItemStackEmpty(itemStack) {
        if(itemStack.typeId.includes("_empty")) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {ItemStack|undefined} itemStack 
     * @returns {Magazine|undefined}
     */
    static getMagazineObjectFromItemStackBoth(itemStack) {
        let magazineObject = FirearmUtil.getMagazineObjectFromItemStack(itemStack);
        if(magazineObject) { return magazineObject; }
        return FirearmUtil.getMagazineObjectFromItemStackEmpty(itemStack);
    }

    /**
     * 
     * @param {ItemStack|undefined} itemStack 
     * @returns {Firearm|undefined}
     */
    static getFirearmObjectFromItemStack(itemStack) {
        if(itemStack === undefined) { return; }
        return TypeUtil.getValueFromMap(Global.firearms, FirearmTypeIds, itemStack.typeId);
    }



    /**
     * 
     * @param {ItemStack} itemStack 
     * @param {Magazine} magazineObject
     * @returns {boolean}
     */
    static isFillableAmmoType(itemStack, magazineObject) {
        let ammoTypeIdEnforced = TypeUtil.getValueFromList(AmmoTypes, itemStack.typeId);
        if(ammoTypeIdEnforced === undefined) { return false; }

        const ammoObject = AmmoMap.get(ammoTypeIdEnforced);
        if(ammoObject === undefined) { console.error(`unrecognized ammo type in isFillableAmmoType(): ${ammoTypeIdEnforced}`); return false; }
        if(magazineObject.fillableByAmmoClasses.includes(ammoObject.type)) {
            return true;
        }
        return false;
    }

    /**
     * @param {Player} player 
     * @param {Firearm} firearm 
     */
    static tryIncreaseRecoil(player, firearm) {
        const addRecoil = firearm.recoilAttribute.amountPerShot;
        let oldRecoil = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.recoil));
        if(oldRecoil === undefined || Number.isNaN(oldRecoil)) {
            oldRecoil = 0;
        }
        let newRecoil = oldRecoil + addRecoil;
        if(newRecoil < 0) {
            newRecoil = 0;
        }
        else if(newRecoil > 130) {
            newRecoil = 130;
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.recoil, newRecoil);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.recoil);
    }

    /**
     * @param {Player} player 
     */
    static tryDecreaseRecoil(player) {
        let oldRecoil = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.recoil));
        if(oldRecoil === 0) { return; }
        if(oldRecoil === undefined || Number.isNaN(oldRecoil)) {
            oldRecoil = 0;
        }
        let decreaseAmount = 0.0002*Math.pow(oldRecoil, 2)+0.5;
        let newRecoil = oldRecoil - decreaseAmount;
        if(newRecoil < 0) {
            newRecoil = 0;
        }
        else if(newRecoil > 130) {
            newRecoil = 130;
        }
        //console.log(`decreaseAmount: ${decreaseAmount}, newRecoil: ${newRecoil}`);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.recoil, newRecoil);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.recoil);
    }

    /**
     * @param {Player} player 
     */
    static tryDecreaseAimRestriction(player) {
        let oldRest = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.script.aimRestrictionNumber));
        if(oldRest === 0) { return; }
        if(oldRest === undefined || Number.isNaN(oldRest)) {
            oldRest = 0;
        }
        oldRest--;
        player.setDynamicProperty(Global.PlayerDynamicProperties.script.aimRestrictionNumber, oldRest);
    }

    /**
     * @param {Player} player 
     * @param {Firearm} firearm
     */
    static tryAddScreenshakeRecoil(player, firearm) {
        const recoil = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.recoil));
        if(Number.isNaN(recoil)) { return; }

        let recoilMultiplier = 1.0;
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming)) {
            recoilMultiplier = firearm.scopeAttribute.recoilMultiplier;
        }

        const mainMaxS     = firearm.recoilAttribute.mainCamerashakeAttribute.camerashake.max;
        const mainMinS     = firearm.recoilAttribute.mainCamerashakeAttribute.camerashake.min;
        const mainMaxT     = firearm.recoilAttribute.mainCamerashakeAttribute.camerashakeRandomTime.max;
        const mainMinT     = firearm.recoilAttribute.mainCamerashakeAttribute.camerashakeRandomTime.min;

        const residualMaxS = firearm.recoilAttribute.residualCamerashakeAttribute.camerashake.max;
        const residualMinS = firearm.recoilAttribute.residualCamerashakeAttribute.camerashake.min;
        const residualMaxT = firearm.recoilAttribute.residualCamerashakeAttribute.camerashakeRandomTime.max;
        const residualMinT = firearm.recoilAttribute.residualCamerashakeAttribute.camerashakeRandomTime.min;

        //let mainCamerashakeAmount = mainMinS + (mainMaxS-mainMinS)*(recoil/100);
        //if(mainCamerashakeAmount > mainMaxS) { mainCamerashakeAmount = mainMaxS; }
        let mainCamerashakeAmount = Math.min(mainMaxS, MathUtils.mapLinear(recoil, 0, 100, mainMinS, mainMaxS));
        mainCamerashakeAmount = mainCamerashakeAmount*recoilMultiplier;

        
        //let residualCamerashakeAmount = residualMinS + (residualMaxS-residualMinS)*(recoil/100);
        //if(residualCamerashakeAmount > residualMaxS) { residualCamerashakeAmount = residualMaxS; }
        
        let residualCamerashakeAmount = Math.min(residualMaxS, MathUtils.mapLinear(recoil, 0, 100, residualMinS, residualMaxS));
        residualCamerashakeAmount = residualCamerashakeAmount*recoilMultiplier;

        const mainCamerashakeTime     = NumberUtil.getRandomFloat(mainMinT, mainMaxT);
        const residualCamerashakeTime = NumberUtil.getRandomFloat(residualMinT, residualMaxT);
        player.runCommand(`camerashake add @s ${mainCamerashakeAmount} ${mainCamerashakeTime} rotational`);
        player.runCommand(`camerashake add @s ${residualCamerashakeAmount} ${residualCamerashakeTime} rotational`);
    }

    /**
     * 
     * @param {ItemStack | null | undefined} itemStack 
     */
    static printFirearmDynamicProperties(itemStack) {
        if(itemStack === null || itemStack === undefined) { console.error("itemStack is null, cannot print dynamic properties."); return; }
        let output = `Dynamic Properties for ${itemStack.typeId}:\n`;
        const propertyIds = itemStack.getDynamicPropertyIds();
        propertyIds.forEach(propertyId => {
            output += `key: [${propertyId}], value: [${String(itemStack.getDynamicProperty(propertyId))}]\n`;
        });
        console.log(output);
    }
    

    /**
     * 
     * @param {Player} player 
     */
    static tryRenewReloadAnimationMultipliers(player) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.script.currentMultipliersSaved) === true) { return; }
        player.setDynamicProperty(Global.PlayerDynamicProperties.script.currentMultipliersSaved, true);
        if(!this.isHoldingFirearm(player)) {
            //this.#trySetReloadNormalAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadNoSwapAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadOpenCockAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadCockAnimationMultiplierValue(player, 1.0);
            //console.log("resetted");
            return;
        }

        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        const firearmObject = this.getFirearmObjectFromItemStack(firearmItemStack);
        if(firearmObject === undefined) {
            //this.#trySetReloadNormalAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadNoSwapAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadOpenCockAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadCockAnimationMultiplierValue(player, 1.0);
            //console.log("resetted");
            return;
        }
        let normalMultiplier = 1;
        let noSwapMultiplier = 1;
        let firstAmmoMultiplier = 1;
        let openCockMultiplier = 1;
        let cockMultiplier = 1;
        firearmObject.animationAttributes.forEach(attributes => {
            if(!(attributes instanceof ScaledAnimation)) { return; }
            if(attributes.staticAnimation.type === AnimationTypes.ReloadSwap || attributes.staticAnimation.type === AnimationTypes.ReloadBoth) {
                normalMultiplier = attributes.staticAnimation.duration/attributes.scaleDurationToValue;
            }
            else if(attributes.staticAnimation.type === AnimationTypes.ReloadNoSwap) {
                noSwapMultiplier = attributes.staticAnimation.duration/attributes.scaleDurationToValue;
            }
            else if(attributes.staticAnimation.type === AnimationTypes.ReloadFirstAmmo) {
                firstAmmoMultiplier = attributes.staticAnimation.duration/attributes.scaleDurationToValue;
            }
            else if(attributes.staticAnimation.type === AnimationTypes.ReloadOpenCock) {
                openCockMultiplier = attributes.staticAnimation.duration/attributes.scaleDurationToValue;
            }
            else if(attributes.staticAnimation.type === AnimationTypes.ReloadCock) {
                cockMultiplier = attributes.staticAnimation.duration/attributes.scaleDurationToValue;
            }
        });
        //if(firearmObject instanceof Gun) {
        this.#trySetReloadNormalAnimationMultiplierValue(player, normalMultiplier);
        this.#trySetReloadNoSwapAnimationMultiplierValue(player, noSwapMultiplier);
        this.#trySetReloadFirstAmmoAnimationMultiplierValue(player, firstAmmoMultiplier);
        this.#trySetReloadOpenCockAnimationMultiplierValue(player, openCockMultiplier);
        this.#trySetReloadCockAnimationMultiplierValue(player, cockMultiplier);
        // }
        // else if(firearmObject instanceof Explosive) {
        //     this.#trySetReloadNormalAnimationMultiplierValue(player, normalMultiplier);
        //     this.#trySetReloadNoSwapAnimationMultiplierValue(player, 1.0);
        //     this.#trySetReloadOpenCockAnimationMultiplierValue(player, 1.0);
        //     this.#trySetReloadCockAnimationMultiplierValue(player, 1.0);
        // }
        // else {
        //     console.error(`Could not find firearmObject of type ${typeof(firearmObject)} in renewReloadAnimationMultiplier()`);
        // }
    }

    /**
     * @param {Player} player 
     * @param {Number} value 
     */
    static #trySetReloadNormalAnimationMultiplierValue(player, value) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier) !== value) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier, value);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.reload_normal_animation_multiplier);
        }
    }
    /**
     * @param {Player} player 
     * @param {Number} value 
     */
    static #trySetReloadNoSwapAnimationMultiplierValue(player, value) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_no_swap_animation_multiplier) !== value) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.reload_no_swap_animation_multiplier, value);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.reload_no_swap_animation_multiplier);
        }
    }
    /**
     * @param {Player} player 
     * @param {Number} value 
     */
    static #trySetReloadFirstAmmoAnimationMultiplierValue(player, value) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_first_ammo_animation_multiplier) !== value) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.reload_first_ammo_animation_multiplier, value);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.reload_first_ammo_animation_multiplier);
        }
    }
    /**
     * @param {Player} player 
     * @param {Number} value 
     */
    static #trySetReloadOpenCockAnimationMultiplierValue(player, value) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_open_cock_animation_multiplier) !== value) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.reload_open_cock_animation_multiplier, value);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.reload_open_cock_animation_multiplier);
        }
    }
    /**
     * @param {Player} player 
     * @param {Number} value 
     */
    static #trySetReloadCockAnimationMultiplierValue(player, value) {
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.reload_cock_animation_multiplier) !== value) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.reload_cock_animation_multiplier, value);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.reload_cock_animation_multiplier);
        }
    }


    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {ContainerSlot} firearmContainerSlot
     */
    static setPlayerFiringModeAndfiringRate(player, firearm, firearmContainerSlot) {
        if(firearm instanceof GunWithAbility && firearm.leftClickAbilityAttribute instanceof SwitchFiringModeAttribute) {
            if(firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === undefined ||
            firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === firearm.firingMode) {
                this.#setFiringModeAndfiringRateDynamicProperties(player, firearm.firingMode, firearm.firingRate);
            }
            else {
                this.#setFiringModeAndfiringRateDynamicProperties(player, firearm.leftClickAbilityAttribute.alternateFiringMode, firearm.leftClickAbilityAttribute.alternateFiringRate);
            }
        }
        else {
            this.#setFiringModeAndfiringRateDynamicProperties(player, firearm.firingMode, firearm.firingRate);
        }
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_firing_mode);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_fire_rate);
    }

    /**
     * 
     * @param {Player} player 
     * @param {String} firingMode 
     * @param {Number} firingRate 
     */
    static #setFiringModeAndfiringRateDynamicProperties(player, firingMode, firingRate) {
        if(firingRate < 0) { 
            firingRate = 0;
            console.error("Fire rate cannot be negative.");
        }
        else if(firingRate > 1200) { 
            firingRate = 1200; 
            console.error("The fastest fire rate is 1200 RPM.");
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_firing_mode, firingMode);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_fire_rate, firingRate);
    }

    /**
     * @param {Firearm} firearmObject
     * @param {(typeof AnimationTypes[keyof typeof AnimationTypes])[]} animationType
     * @returns {NormalAnimation|undefined}
     */
    static tryGetAnimationAttribute(firearmObject, animationType) {
        for(const attribute of firearmObject.animationAttributes) {
            if(animationType.includes(attribute.staticAnimation.type)) {
                return attribute;
            }
        }
        return undefined;
    }

    //returns magazineItemStack
    /**
     * 
     * @param {Player} player 
     * @param {number} beforeAmmoCount 
     * @returns {ItemStack|undefined}
     */
    static tryGetBestDurabilityMagazineItemStackForReload(player, beforeAmmoCount) {
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(!(inv instanceof EntityInventoryComponent)) { return; }
        const container = inv.container;
        if(container === undefined) { return; }
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(ItemUtil.getSelectedContainerSlot(player)?.getItem());
        if(firearmObject === undefined) { return; }

        let mostAmmoIndex = -1;
        let mostAmmoCount = beforeAmmoCount;
        for(let i=0; i<inv.inventorySize; i++) {
            const itemStack = container.getItem(i);
            if(itemStack === undefined) { continue; }
            const magazine = FirearmUtil.getMagazineObjectFromItemStack(itemStack);
            //if magazine === null then it's not a magazine
            if(magazine === undefined) { continue; }
            if(firearmObject.magazineAttribute.magazineClass !== magazine.magazineClass) { continue; }

            const magazineAmmoCount = ItemUtil.tryGetDurability(itemStack);
            if(magazineAmmoCount === undefined) { continue; }
            if(magazineAmmoCount > mostAmmoCount) {
                mostAmmoIndex = i;
                mostAmmoCount = magazineAmmoCount;
            }
        } 
        if(mostAmmoIndex === -1) { return; }
        return container.getItem(mostAmmoIndex);
    }

    /**
     * Warning: does not account for magazine dynamic properties
     * @param {Player} player 
     * @param {ItemStack|undefined} oldMagazineItemStack
     * @returns {{
     * magazineTypeId: typeof MagazineTypeIds[keyof typeof MagazineTypeIds],
     * amount: number }|undefined
     * }
     */
    static tryGetBestStackMagazineForReload(player, oldMagazineItemStack) {
        if(oldMagazineItemStack !== undefined) {
            const oldMagazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(oldMagazineItemStack);
            if(oldMagazineObject === undefined) { return; }
            const magazineTypeId = oldMagazineObject.getMagazineTypeIdEnum();
            if(magazineTypeId === undefined) { return; }
            return {
                magazineTypeId: magazineTypeId,
                amount: CraftingUtil.getItemCountInInventory(player, oldMagazineObject.itemTypeId)
            }
        }

        //else, find stack-based ammo with most amount in inv
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(!(inv instanceof EntityInventoryComponent)) { return; }
        const container = inv.container;
        if(container === undefined) { return; }
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(ItemUtil.getSelectedContainerSlot(player)?.getItem());
        if(firearmObject === undefined) { return; }

        /** @type {Map<typeof MagazineTypeIds[keyof typeof MagazineTypeIds], number>} */
        let bestMagazineTypeIdAndAmount = new Map();

        for(let i=0; i<inv.inventorySize; i++) {
            const itemStack = container.getItem(i);
            if(itemStack === undefined) { continue; }
            const magazineObject = FirearmUtil.getMagazineObjectFromItemStack(itemStack);
            if(magazineObject === undefined) { continue; }
            if(firearmObject.magazineAttribute.magazineClass !== magazineObject.magazineClass) { continue; }
            //if(!FirearmUtil.isUsableMagazine(firearmObject, itemStack)) { continue; }  //should use this after Dynamic props are added to magazines
            const magazineTypeId = magazineObject.itemTypeId;
            const oldAmount = bestMagazineTypeIdAndAmount.get(magazineTypeId);
            const newAmount = oldAmount === undefined ? itemStack.amount : oldAmount + itemStack.amount;
            bestMagazineTypeIdAndAmount.set(magazineTypeId, newAmount);
        }
        if(bestMagazineTypeIdAndAmount.size === 0) { return; }
        /**
         * @type {{
         * magazineTypeId: typeof MagazineTypeIds[keyof typeof MagazineTypeIds],
         * amount: number }|undefined
         * }
         */
        let bestMagazine = undefined;
        for(const [magazineTypeId, amount] of bestMagazineTypeIdAndAmount.entries()) {
            if(bestMagazine === undefined || bestMagazine.amount < amount) {
                bestMagazine = {
                    magazineTypeId: magazineTypeId,
                    amount: amount
                }
            }
        }
        return bestMagazine;
    }
    
}

export { FirearmUtil };



class DamageUtil {

    /**
     * @param {Entity} target 
     * @param {number} duration in ticks
     */
    static restrictMovement(target, duration) {
        const movementComponent = target.getComponent(EntityComponentTypes.Movement);
        if(movementComponent === undefined) return;
        movementComponent.setCurrentValue(0);
    }
    /**
     * @param {Entity} target 
     * @param {number} damage 
     */
    static dealDamageNoMultiplier(target, damage) {
        const healthComponent = target.getComponent(EntityComponentTypes.Health);
        if(!(healthComponent instanceof EntityHealthComponent)) { return; }

        healthComponent.setCurrentValue(healthComponent.currentValue-damage);
        target.applyDamage(0.001, {cause: EntityDamageCause.override});
    }

    /**
     * @param {Entity} target 
     * @param {number} damage 
     */
    static dealDamageWithMultiplier(target, damage) {
        const healthComponent = target.getComponent(EntityComponentTypes.Health);
        if(!(healthComponent instanceof EntityHealthComponent)) { return; }

        if(target instanceof Player) {
            if(target.getGameMode() !== GameMode.Survival && target.getGameMode() !== GameMode.Adventure) { return; }
            healthComponent.setCurrentValue(healthComponent.currentValue-damage);
        }
        else {
            healthComponent.setCurrentValue(Math.max(healthComponent.currentValue-damage*1.5, 0)/**mobs get dealt 1.5x dmg from all sources*/);
        }
        target.applyDamage(0.001, {cause: EntityDamageCause.override});
    }

    /**
     * @param {Entity} source 
     * @param {Entity} target 
     * @param {Gun} gun 
     * @param {Boolean} doNotMakeFly 
     */
    static dealKnockbackUsingGun(source, target, gun, doNotMakeFly) {
        const knockbackVectorUnscaled = Vector.subVectors(target.location, source.location);
        knockbackVectorUnscaled.y = 0;
        const knockbackVectorXZ = knockbackVectorUnscaled.divideScalar(knockbackVectorUnscaled.length());
        if(doNotMakeFly && !target.isOnGround) {
            target.applyKnockback({x: knockbackVectorXZ.x*gun.knockbackAmount.x, z: knockbackVectorXZ.z*gun.knockbackAmount.x}, 0);
        }
        else {
            target.applyKnockback({x: knockbackVectorXZ.x*gun.knockbackAmount.x, z: knockbackVectorXZ.z*gun.knockbackAmount.x}, gun.knockbackAmount.y);
        }
        //console.log(`applied knockback: ${knockbackVectorXZ.x*gun.knockbackAmount.x}, ${gun.knockbackAmount.y}, ${knockbackVectorXZ.z*gun.knockbackAmount.x}`);
    }


    /**
     * Checks if a block is in between the dimension location and the target entity (both feet and head).
     * @param {Dimension} dimension 
     * @param {import('@minecraft/server').Vector3} location 
     * @param {Entity} target 
     * @param {Number} range 
     * @returns {boolean} - True if blocks are blocking both paths and are closer than the target
     */
    static isBlockObstructingTarget(dimension, location, target, range) {
        const distanceFromFeet = new Vector3(target.location.x, target.location.y, target.location.z).sub(location).length();
        const distanceFromHead = new Vector3(target.getHeadLocation().x, target.getHeadLocation().y, target.getHeadLocation().z).sub(location).length();

        const blockInTheWayOfFeet = dimension.getBlockFromRay(location, new Vector3(target.location.x, target.location.y, target.location.z).sub(location), {maxDistance: range});
        const blockInTheWayOfHead = dimension.getBlockFromRay(location, new Vector3(target.getHeadLocation().x, target.getHeadLocation().y, target.getHeadLocation().z).sub(location), {maxDistance: range});
        
        if(!blockInTheWayOfFeet || !blockInTheWayOfHead) {
            return false;
        }

        const hitLocationFeet = new Vector3(blockInTheWayOfFeet.block.location.x+blockInTheWayOfFeet.faceLocation.x, blockInTheWayOfFeet.block.location.y+blockInTheWayOfFeet.faceLocation.y, blockInTheWayOfFeet.block.location.z+blockInTheWayOfFeet.faceLocation.z);
        const hitLocationHead = new Vector3(blockInTheWayOfHead.block.location.x+blockInTheWayOfHead.faceLocation.x, blockInTheWayOfHead.block.location.y+blockInTheWayOfHead.faceLocation.y, blockInTheWayOfHead.block.location.z+blockInTheWayOfHead.faceLocation.z);
                console.log(`block: ${blockInTheWayOfFeet.block.typeId}, block dist: ${new Vector3(hitLocationFeet.x, hitLocationFeet.y, hitLocationFeet.z).sub(new Vector3(location.x, location.y, location.z)).length()} vs. ${distanceFromFeet}`);

        return hitLocationFeet.sub(location).length() < distanceFromFeet && 
               hitLocationHead.sub(location).length() < distanceFromHead;
    }

    /**
     * 
     * @param {Dimension} dimension 
     * @param {import('@minecraft/server').Vector3} location 
     * @param {Number} range 
     * @param {Number} minDamage 
     * @param {Number} maxDamage 
     * @param {import('@minecraft/server').Vector2} minKnockback 
     * @param {import('@minecraft/server').Vector2} maxKnockback 
     * @returns {number}
     */
    static dealExplosionDamageAndKnockback(dimension, location, range, minDamage, maxDamage, minKnockback, maxKnockback) {
        let numberOfTargets = 0;

        const targets = dimension.getEntities({
            location: location, 
            maxDistance: range, 
            excludeFamilies: excludedFamilies,
            excludeTypes: excludedTypes
        });
        targets.forEach(target => {
            const distanceFromFeet = new Vector3(target.location.x, target.location.y, target.location.z).sub(new Vector3(location.x, location.y, location.z)).length();
            const distanceFromHead = new Vector3(target.getHeadLocation().x, target.getHeadLocation().y, target.getHeadLocation().z).sub(new Vector3(location.x, location.y, location.z)).length();

            const isPlayer = (target instanceof Player);
            console.log(isPlayer);
            if(isPlayer && (excludedGameModes.includes(target.getGameMode()) || !world.gameRules.pvp)) return;
            /** @type {Number} */
            let damage = Math.floor(MathUtils.mapLinear(Math.max((range - distanceFromFeet), range - distanceFromHead), 0, range, minDamage, maxDamage)) * (isPlayer ? 1 : 1.5);
            
            /*
            const blockInTheWayOfFeet = dimension.getBlockFromRay(location, new Vector3(target.location.x, target.location.y, target.location.z).sub(new Vector3(location.x, location.y, location.z)), {maxDistance: range});
            const blockInTheWayOfHead = dimension.getBlockFromRay(location, new Vector3(target.getHeadLocation().x, target.getHeadLocation().y, target.getHeadLocation().z).sub(new Vector3(location.x, location.y, location.z)), {maxDistance: range});
            if(blockInTheWayOfFeet && blockInTheWayOfHead) {
                const hitLocationFeet = new Vector3(blockInTheWayOfFeet.block.location.x+blockInTheWayOfFeet.faceLocation.x, blockInTheWayOfFeet.block.location.y+blockInTheWayOfFeet.faceLocation.y, blockInTheWayOfFeet.block.location.z+blockInTheWayOfFeet.faceLocation.z);
                const hitLocationHead = new Vector3(blockInTheWayOfHead.block.location.x+blockInTheWayOfHead.faceLocation.x, blockInTheWayOfHead.block.location.y+blockInTheWayOfHead.faceLocation.y, blockInTheWayOfHead.block.location.z+blockInTheWayOfHead.faceLocation.z);
                console.log(`block: ${blockInTheWayOfFeet.block.typeId}, block dist: ${new Vector3(hitLocationFeet.x, hitLocationFeet.y, hitLocationFeet.z).sub(new Vector3(location.x, location.y, location.z)).length()} vs. ${distanceFromFeet}`);

                if(new Vector3(hitLocationFeet.x, hitLocationFeet.y, hitLocationFeet.z).sub(new Vector3(location.x, location.y, location.z)).length() < distanceFromFeet
                    &&
                    new Vector3(hitLocationHead.x, hitLocationHead.y, hitLocationHead.z).sub(new Vector3(location.x, location.y, location.z)).length() < distanceFromHead) {
                    damage *= 0.1;
                    damage = Math.ceil(damage);
                }
            }
            */


            if(this.isBlockObstructingTarget(dimension, location, target, range)) {
                damage *= 0.1;
                damage = Math.ceil(damage);
            }

            DamageUtil.dealDamageNoMultiplier(target, damage);
            console.log(`damage: ${damage}`);

            const knockbackX = MathUtils.mapLinear((range - distanceFromFeet), 0, range, minKnockback.x, maxKnockback.x);
            const knockbackY = MathUtils.mapLinear((range - distanceFromFeet), 0, range, minKnockback.y, maxKnockback.y);

            const knockbackDirection = new Vector3(target.location.x, 0, target.location.z).sub(new Vector3(location.x, 0, location.z)).normalize();
            target.applyImpulse(new Vector3(knockbackDirection.x, knockbackDirection.y, knockbackDirection.z).multiplyScalar(knockbackX).add(new Vector3(0, 1, 0).multiplyScalar(knockbackY)));
            numberOfTargets++;
        });
        return numberOfTargets;
    }
}

export { DamageUtil };


export class EntityUtil {
    /**
     * 
     * @param {Entity} sourceEntity 
     * @param {number} maxRange 
     * @param {number} minRange 
     * @returns {Entity[]}
     */
    static getValidEntitiesNearbyEntity(sourceEntity, maxRange, minRange = 0) {
        const sourcePos = sourceEntity.location;
        const nearbyEntities = sourceEntity.dimension.getEntities({
        location: sourcePos,
        maxDistance: maxRange,
        minDistance: minRange,
        excludeFamilies: excludedFamilies, 
        excludeTypes: excludedTypes
        });
        let output = [];
        for(const entity of nearbyEntities) {
        if(entity instanceof Player && excludedGameModes.includes(entity.getGameMode())) continue;
        if(entity === sourceEntity) continue;
        output.push(entity);
        }
        return output;
    }
    /**
     * 
     * @param {Entity | undefined | null} entity 
     * @returns {boolean}
     */
    static isActuallyValid(entity) {
        if(entity === undefined || entity === null) return false;
        try {
            if(!EntityUtil.#hasHealthComponent(entity) && !EntityUtil.#hasProjectileComponent(entity)) return false;
        }
        catch {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {boolean}
     */
    static isAlive(entity) {
        const healthComp = entity.getComponent(EntityComponentTypes.Health);
        if (healthComp === undefined || !(healthComp instanceof EntityHealthComponent)) return false;
        if (healthComp.currentValue <= 0) return false;
        return true;
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {boolean}
     */
    static #hasHealthComponent(entity) {
        const healthComp = entity.getComponent(EntityComponentTypes.Health);
        if (healthComp === undefined || !(healthComp instanceof EntityHealthComponent)) return false;
        return true;
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {boolean}
     */
    static #hasProjectileComponent(entity) {
        const projComp = entity.getComponent(EntityComponentTypes.Projectile);
        if (projComp === undefined || !(projComp instanceof EntityProjectileComponent)) return false;
        return true;
    }
}

export class RangeUtil {
    
    /**
     * 
     * @param {Vector3} location 
     * @param {Dimension} dimension 
     * @param {number} maxRange 
     * @param {number} minRange 
     * @returns {Entity[]}
     */
    static getValidEntitiesNearbyLocation(location, dimension, maxRange, minRange = 0) {
        const sourcePos = location;
        const nearbyEntities = dimension.getEntities({
        location: sourcePos,
        maxDistance: maxRange,
        minDistance: minRange,
        excludeFamilies: excludedFamilies, 
        excludeTypes: excludedTypes
        });
        let output = [];
        for(const entity of nearbyEntities) {
        if(entity instanceof Player && excludedGameModes.includes(entity.getGameMode())) continue;
        output.push(entity);
        }
        return output;
    }
}

export class PlayerUtil {
    /**
     * Dosn't really work :(
     * @param {Player} player 
     * @param {import('@minecraft/server').RGB} color 
     * @param {{
     * totalDuration: number,
     * fadeInPercentage: number,
     * fadeOutPercentage: number
     * }} durations percentages are 0-1, not 0-100
     */
    static addParticleFog(player, color, durations) {
        const vars = new MolangVariableMap();
        vars.setColorRGB("color", color);
        vars.setFloat("fade_in_duration", durations.totalDuration * durations.fadeInPercentage);
        vars.setFloat("stay_duration", durations.totalDuration * (1 - durations.fadeInPercentage - durations.fadeOutPercentage));
        vars.setFloat("fade_out_duration", durations.totalDuration * durations.fadeOutPercentage);
        player.spawnParticle("yes:custom_fog", player.getHeadLocation(), vars);
    }
}

class FirearmIdUtil {

    /**
     * 
     * @param {ItemStack} itemStack 
     * @returns {Number}
     */
    static getFirearmId(itemStack) {
        return Number(itemStack.getDynamicProperty(Global.FirearmDynamicProperties.id));
    }

    
    /**
     * 
     * @param {Number} id 
     * @param {ContainerSlot} firearmContainerSlot 
     * @param {Number} ammoCount 
     */
    static initializeFirearmIdAndAmmo(id, firearmContainerSlot, ammoCount) {
        this.#addIdAndAmmoToFirearmContainerSlot(firearmContainerSlot, id, ammoCount);
        this.#addIdAndAmmoToWorld(id, ammoCount);
        //this.addIdAndAmmoToGlobalList(id, ammoCount);
    }

    /**
     * 
     * @param {number} firearmId 
     * @returns {string}
     */
    static firearmIdToString(firearmId) {
        if(Number.isNaN(firearmId)) {
            console.error(`Firearm has an undefined id in firearmIdToString(). Returned empty string.`);
            return "";
        }
        return "firearmId:"+firearmId.toString();
    }

    /**
     * 
     * @param {string} firearmIdString 
     * @returns {number|undefined}
     */
    static firearmIdStringToNumber(firearmIdString) {
        if(!firearmIdString.startsWith("firearmId:")) { return undefined; }
        const firearmId = Number(firearmIdString.split(":")[1]);
        if(Number.isNaN(firearmId)) { return undefined; }
        return firearmId;
    }

    /**
     * 
     * @param {string} stringId 
     * @returns {boolean}
     */
    static isFirearmId(stringId) {
        if(!stringId.startsWith("firearmId:")) { return false; }
        const firearmId = Number(stringId.split(":")[1]);
        if(Number.isNaN(firearmId)) { return false; }
        return true;
    }

    /**
     * 
     * @param {string} firearmIdString 
     * @returns {boolean}
     */
    static isFirearmIdString(firearmIdString) {
        if(firearmIdString.startsWith("firearmId:")) { return true; }
        return false;
    }
    /**
     * 
     * @param {Number} id 
     * @param {Number} ammoCount 
     */
    /*
    static addIdAndAmmoToGlobalList(id, ammoCount) {
        const newMap = new Map();
        newMap.set(id, ammoCount);
        Global.worldFirearmIds.push(newMap);
    }
    */



    /**
     * 
     * @param {Number} id 
     * @param {Number} ammoCount 
     */
    static #addIdAndAmmoToWorld(id, ammoCount) {
        const idString = this.firearmIdToString(id);
        world.setDynamicProperty(idString, ammoCount);
    }


    /**
     * 
     * @param {ContainerSlot} containerSlot 
     * @param {Number} id 
     * @param {Number} ammoCount
     */
    static #addIdAndAmmoToFirearmContainerSlot(containerSlot, id, ammoCount) {
        containerSlot.setDynamicProperty(Global.FirearmDynamicProperties.id, id);
        containerSlot.setDynamicProperty(Global.FirearmDynamicProperties.ammoCount, ammoCount);
    }


    static printFirearmIds() {
        let output = "worldFirearmIds:\n";
        /*
        Global.worldFirearmIds.forEach(e => {
            output += MapUtil.getMapAsString(e);
        });
        */
        const worldProperties = world.getDynamicPropertyIds();
        worldProperties.forEach(property => {
            if(property.includes("firearmId:")) {
                output += `key: ${property}, value: ${world.getDynamicProperty(property)}\n`;
            }
        });
        console.log(output);
    }
}

export { FirearmIdUtil };


class FirearmNameUtil {

    /**
     * 
     * @param {ContainerSlot} firearmContainerSlot 
     * @param {Firearm} firearm
     */
    static renewFirearmName(firearmContainerSlot, firearm) {
        const magazineTypeId = TypeUtil.getValueFromList(MagazineTypeIds, String(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId)));
        const isMagazineEmpty = Boolean(firearmContainerSlot.getDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty));
        if(magazineTypeId === undefined) { return; }
        const magazineName = this.#convertMagazineTypeIdToName(magazineTypeId, isMagazineEmpty);
        //firearmContainerSlot.setLore([`§r§f${firearm.normalName}\n§r§7Magazine: ${magazineName}`]);
        firearmContainerSlot.nameTag = `§r§f${firearm.normalName}`;
        firearmContainerSlot.nameTag += `\n§r§7Magazine: ${magazineName}`;
        console.log(`renew name mag: ${magazineName}`);
        if(firearm instanceof GunWithAbility) {
            if(firearm.leftClickAbilityAttribute instanceof SwitchFiringModeAttribute) {
                let firingMode = firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode);
                if(firingMode === undefined) {
                    firingMode = firearm.firingMode;
                }
                else if(firingMode === FiringModes.Semi) {
                    firearmContainerSlot.nameTag += `\n§r§7Firing Mode: <§aSemi Auto§7>`;
                }
                else if(firingMode === FiringModes.Auto) {
                    firearmContainerSlot.nameTag += `\n§r§7Firing Mode: <§aFull Auto§7>`;
                }
                else if(firingMode === FiringModes.Burst) {
                    firearmContainerSlot.nameTag += `\n§r§7Firing Mode: <§aBurst§7>`;
                }
                else {
                    console.error(`undefined firing mode ${firingMode} in renewFirearmName()`);
                }
            }
            else if(firearm.leftClickAbilityAttribute instanceof SwitchScopeZoomAttribute) {
                const scopeZoom = firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom);
                if(scopeZoom === undefined) {
                    const zoomLevel = firearm.scopeAttribute.slowness;
                    firearmContainerSlot.nameTag += `\n§r§7Scope Zoom: <§aLevel ${zoomLevel}§7>`
                }
                else if(scopeZoom === 1) {
                    const zoomLevel = firearm.scopeAttribute.slowness;
                    firearmContainerSlot.nameTag += `\n§r§7Scope Zoom: <§aLevel ${zoomLevel}§7>`
                }
                else if(scopeZoom === 2) {
                    const zoomLevel = firearm.leftClickAbilityAttribute.alternateScopeAttribute.slowness;
                    firearmContainerSlot.nameTag += `\n§r§7Scope Zoom: <§aLevel ${zoomLevel}§7>`
                }
                else {
                    console.error(`undefined scope zoom level ${scopeZoom} in renewFirearmName()`);
                }
            }
            else {
                console.error(`undefined left click ability type ${typeof(firearm.leftClickAbilityAttribute)} in renewFirearmName()`);
            }
        }
        
    }

    /**
     * 
     * @param {typeof MagazineTypeIds[keyof typeof MagazineTypeIds]} magazineTypeId
     * @param {boolean} isMagazineEmpty 
     * @returns {string}
     */
    static #convertMagazineTypeIdToName(magazineTypeId, isMagazineEmpty) {
        if(magazineTypeId === MagazineTypeIds.None) { return "§7<§cNone§r§7>"; }
        const magazineClass = this.#convertMagazineTypeIdToMagazineClass(magazineTypeId);
        if(magazineClass === undefined) { return "§7<§cNone§r§7>"; }
        let name = "";
        let numbers = magazineTypeId.match(/\d+/g);
        let ammoCount = undefined;
        if(numbers) {
            ammoCount = Number(numbers[numbers.length-1]);
        }
        if(ammoCount !== undefined) {
            name += ammoCount.toString()+" ";
        }
        for(const [key, magClass] of TypeUtil.getIterable(MagazineClasses)) {
            if(magazineClass === magClass) {
                const className = MagazineClassTextNames[key];
                if(ammoCount === 1 && className.endsWith("s")) {
                    name += className.substring(0, className.length-1);
                }
                else {
                    name += className;
                }
            }
        }
        if(isMagazineEmpty) {
            name = "§7<§eEmpty "+name+"§7>";
        }
        else {
            name = "§7<§a"+name+"§7>";
        }
        return name;
        /*
        const parts = magazineTypeId.split(":")[1].split("_");
        let magazineName = "";
        if(!isMagazineEmpty) {
          parts.forEach(substring => {
              substring = substring[0].toUpperCase() + (substring.slice(1)??"");
              magazineName += `§a${substring}§r `;
          });
          return magazineName.slice(0, magazineName.length-1);
        }
        else {
            magazineName += "§eEmpty ";
            parts.forEach(substring => {
                substring = substring[0].toUpperCase() + (substring.slice(1)??"");
                magazineName += `§e${substring}§r `;
            });
            return magazineName.slice(0, magazineName.length-1);
        }
            */
    }

    /**
     * 
     * @param {typeof MagazineTypeIds[keyof typeof MagazineTypeIds]} magazineTypeId
     * @returns {typeof MagazineClasses[keyof typeof MagazineClasses]|undefined}
     */
    static #convertMagazineTypeIdToMagazineClass(magazineTypeId) {
        for(const [, magClass] of TypeUtil.getIterable(MagazineClasses)) {
            if(magazineTypeId.includes(magClass)) {
                return magClass;
            }
        }
        console.error(`Could not convert magazineTypeId [${magazineTypeId}] to any AmmoType.`);
        return;
    }

    /**
     * 
     * @param {ItemStack} magazineItemStack 
     * @param {Number} ammoCount 
     */
    static renewMagazineName(magazineItemStack, ammoCount) {
        if(magazineItemStack === undefined) { return; }
        const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
        if(magazineObject === undefined) { return; }
        const name = magazineObject.name.split("\n")[0];
        if(name === undefined) { return; }
        const numbers = name.match(/\d+/g);
        if(numbers === null) { return; }
        const maxAmmoCount = numbers[numbers.length-1];

        let colorModifiedAmmoCount = String(ammoCount);
        if(ammoCount <= magazineObject.maxAmmo/5) { colorModifiedAmmoCount = "§c"+colorModifiedAmmoCount+"§a"}
        else if(ammoCount <= magazineObject.maxAmmo/3) { colorModifiedAmmoCount = "§6"+colorModifiedAmmoCount+"§a"}
        else if(ammoCount <= magazineObject.maxAmmo/2) { colorModifiedAmmoCount = "§e"+colorModifiedAmmoCount+"§a"}
        const ammoCountIndex = name.substring(0, name.lastIndexOf(maxAmmoCount)).lastIndexOf(maxAmmoCount);
        const endWithOrWithoutS = ammoCount === 1 ? name.substring(ammoCountIndex+maxAmmoCount.length, name.lastIndexOf("s"))+name.substring(name.lastIndexOf("s")+1) : name.substring(ammoCountIndex+maxAmmoCount.length);
        magazineItemStack.nameTag = "§r§f"+name.substring(0, ammoCountIndex)+colorModifiedAmmoCount+endWithOrWithoutS;
        magazineItemStack.nameTag += "\n§7[Interact to load ammo in]";
    }
}

export { FirearmNameUtil };


class SoundsUtil {
    
    /**
     * 
     * @param {Player} fromPlayer 
     * @param {string} soundId 
     * @param {import('@minecraft/server').Vector3} location 
     * @param {Number} maxDistance
     * @param {Number} maxVolume 
     * @param {Number} minPitch 
     * @param {Number} maxPitch 
     */
    static playSound(fromPlayer, soundId, location, maxDistance, maxVolume, minPitch, maxPitch) {
        const players = fromPlayer.dimension.getPlayers({location: location, maxDistance: maxDistance});
        players.forEach(player => {
            const distanceVector = Vector.subVectors(location, player.getHeadLocation());
            const distance = distanceVector.length();
            const volume = maxVolume*((maxDistance-distance)/maxDistance);
            const playerDirection = new Vector3(player.getViewDirection().x, player.getViewDirection().y, player.getViewDirection().z);
            let playLocation;
            if(fromPlayer.id === player.id) {
                //the sound will always play like this for the player that the sound originated from
                playLocation = Vector.addVectors(player.getHeadLocation(), playerDirection.multiplyScalar(15));
            }
            else {
                //technically it can go up to 16 but not including 16

                //otherwise, the sound will be played directionally
                if(distance <= 15) {
                    playLocation = fromPlayer.getHeadLocation();
                }
                else {
                    //scale the vector down to length = 15 & location = player's position + vector
                    playLocation = distanceVector.divideScalar(distance).multiplyScalar(15).add(player.getHeadLocation());
                }
            }
            player.playSound(soundId, {location: playLocation, volume: volume, pitch: NumberUtil.getRandomFloat(minPitch, maxPitch)});
        });
    }

    /**
     * 
     * @param {SoundTimeoutIdObject[]} SoundTimeoutIdObjects 
     * @param {typeof AnimationTypes[keyof typeof AnimationTypes][]} [animationTypes] 
     */
    static stopSounds(SoundTimeoutIdObjects, animationTypes) {
        SoundTimeoutIdObjects.forEach(obj => {
            if(animationTypes === undefined) {
                system.clearRun(obj.timeoutId);
            }
            else {
                animationTypes.forEach(type => {
                    if(type === obj.animationType) {
                        system.clearRun(obj.timeoutId);
                    }
                });
            }
        });
    }

    /**
     * 
     * @param {Player} player 
     */
    static playErrorSound(player) {
        player.playSound("note.bass");
    }
}

export { SoundsUtil };


class AnimationUtil {
    
    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {typeof AnimationTypes[keyof typeof AnimationTypes]} animationType
     */
    static playAnimation(player, firearm, animationType) {
        let playedAnimation = false;
        firearm.animationAttributes.forEach(attributes => {
            if(attributes.staticAnimation.type === animationType) {
                if(attributes.staticAnimation.animationId === undefined) { return; }
                player.playAnimation(attributes.staticAnimation.animationId);
                playedAnimation = true;
            }
        })
        if(!playedAnimation) {
            console.warn(`animation ${animationType} was not found on firearm ${firearm.itemTypeId}`);
        }
    }

    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {typeof AnimationTypes[keyof typeof AnimationTypes][]} animationTypes
     * @param {Number} timeMultiplier
     * @param {Number} startDelay
     * @returns {SoundTimeoutIdObject[] | undefined} - returns an array of sound timeoutIds
     */
    static playAnimationWithSound(player, firearm, animationTypes, timeMultiplier = 1, startDelay = 0) {
        /**@type {SoundTimeoutIdObject[]} */
        let timeoutObjects = [];
        for(let attributes of firearm.animationAttributes) {
            if(!animationTypes.includes(attributes.staticAnimation.type)) { continue; }

            if(startDelay <= 0 && attributes.staticAnimation.animationId != undefined) { player.playAnimation(attributes.staticAnimation.animationId); }
            else {
                const delayId = system.runTimeout(() => {
                    if(attributes.staticAnimation.animationId != undefined) {
                        player.playAnimation(attributes.staticAnimation.animationId);
                    }
                }, startDelay);
                timeoutObjects.push(new SoundTimeoutIdObject({
                    timeoutId: delayId,
                    animationType: attributes.staticAnimation.type
                }));
            }

            attributes.staticAnimation.animationSounds.forEach(sound => {
                const timeoutTime = Math.floor(sound.timeout/timeMultiplier);
                const timeoutId = system.runTimeout(() => {
                    SoundsUtil.playSound(player, sound.soundId, player.getHeadLocation(), sound.soundRange, 1, 0.9, 1.1);
                }, timeoutTime+startDelay);
                timeoutObjects.push(new SoundTimeoutIdObject({
                    timeoutId: timeoutId,
                    animationType: attributes.staticAnimation.type
                }));
            });
            return timeoutObjects;
        }
        return undefined;
    }

    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {typeof AnimationTypes[keyof typeof AnimationTypes]} animationType
     */
    static stopAllAnimationSounds(player, firearm, animationType) {
        for(let attributes of firearm.animationAttributes) {
            if(attributes.staticAnimation.type !== animationType) { continue; }
            attributes.staticAnimation.animationSounds.forEach(sound => {
                player.runCommand(`stopsound @s ${sound.soundId}`);
            });
            return;
        }
    }
}
export { AnimationUtil };



class CraftingUtil {

    /**
     * 
     * @param {Player} player 
     * @param {string} itemTypeId 
     * @returns {number}
     */
    static getItemCountInInventory(player, itemTypeId) {
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(inv === undefined) { return 0; }
        if(!(inv instanceof EntityInventoryComponent)) { return 0; }
        const container = inv.container;
        if(container === undefined) { return 0; }
        let output = 0;
        for(let i=0; i<container.size; i++) {
            if(container.getSlot(i).getItem() && container.getSlot(i).typeId === itemTypeId) {
                output += container.getSlot(i).amount;
            }
        }
        return output;
    }

    /**
     * Returns false if unsuccessful.
     * @param {Player} player 
     * @param {Crafting|undefined} craftingObject 
     * @returns {boolean}
     */
    static craftItem(player, craftingObject) {
        if(craftingObject === undefined) { return false; }
        for(const craftingItem of craftingObject.craftingItems) {
            if(CraftingUtil.getItemCountInInventory(player, craftingItem.itemTypeId) >= craftingItem.amount) {
                player.runCommand(`clear @s ${craftingItem.itemTypeId} 0 ${craftingItem.amount}`);
            }
            else {
                return false;
            }
        }

        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(inv === undefined) { return false; }
        if(!(inv instanceof EntityInventoryComponent)) { return false; }
        const container = inv.container;
        if(container === undefined) { return false; }
        container.addItem(new ItemStack(craftingObject.itemTypeId, craftingObject.amount));
        return true;
    }
}

export { CraftingUtil };


class ColorUtil {
    /**
     * 
     * @param {Block} block 
     * @returns {import('@minecraft/server').RGB}
     */
    static getBlockColor(block) {
        let blockColor = (BlockColors.blockColorsMap.get(block.typeId));

        if(blockColor === undefined) {
            //console.log(`block parts: [${block.typeId.split(":")[1].split("_")}]`);
            for(const part of block.typeId.split(":")[1].split("_")) {
                if(BlockColors.partialNameColorsMap.get(part) !== undefined) {
                    blockColor = BlockColors.partialNameColorsMap.get(part);
                    break;
                }
            }
        }
        if(blockColor === undefined) {
            for(const tag of block.getTags()) {
                if(BlockColors.tagColorsMap.get(tag) !== undefined) {
                    blockColor = BlockColors.tagColorsMap.get(tag);
                    break;
                }
            }
        }
        if(blockColor === undefined) {
            blockColor = BlockColors.defaultColor;
        }
        //console.log(`color: #${ColorUtil.rgbToHex(blockColor)}`);
        return blockColor;
    }

    /**
     * 
     * @param {number} c 
     * @returns {string}
     */
    static #componentToHex(c) {
        c = Math.floor(c*255);
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    /**
     * 
     * @param {import('@minecraft/server').RGB|undefined} rgb
     * @returns {string}
     */
    static rgbToHex(rgb) {
        if(!rgb) {
            return "#000000"
        }
        return "#" + ColorUtil.#componentToHex(rgb.red) + ColorUtil.#componentToHex(rgb.green) + ColorUtil.#componentToHex(rgb.blue);
    }

    /**
     * 
     * @param {string} hex - A 6-digit hex color with hashtag (e.g., "#FF5733")
     * @returns {import('@minecraft/server').RGB}
     */
    static hexToRgb(hex) {
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;
        return { red: r, green: g, blue: b };
    }

    
}
export { ColorUtil };


class RayCastUtil {
    /**
     * 
     * @param {import('@minecraft/server').BlockRaycastHit|undefined} blockRayCast 
     * @returns {Vector3|undefined}
     */
    static getLocationFromRayCast(blockRayCast) {
        if(!blockRayCast) return undefined;
        return new Vector3(
            blockRayCast.block.location.x+blockRayCast.faceLocation.x,
            blockRayCast.block.location.y+blockRayCast.faceLocation.y,
            blockRayCast.block.location.z+blockRayCast.faceLocation.z
        );
    }

    /**
     * Excludes self and all excluded families and types from `HitExclusionArrays.js `
     * @param {Entity} source 
     * @param {import('@minecraft/server').Vector3} location 
     * @param {import('@minecraft/server').Vector3} direction 
     * @param {number} [range] 
     * @returns {import('@minecraft/server').EntityRaycastHit[]}
     */
    static getValidEntitiesFromRayCast(source, location, direction, range) {
        const entityRaycastHit = source.dimension.getEntitiesFromRay(location, direction, { 
            includeLiquidBlocks: false,
            includePassableBlocks: false,
            maxDistance: range, 
            excludeFamilies: excludedFamilies, 
            excludeTypes: excludedTypes
        });
        /**@type {import('@minecraft/server').EntityRaycastHit[]} */
        let output = [];
        entityRaycastHit.forEach(hit => {
            if(hit.entity !== source) {
                output.push(hit);
            }
        })
        return output;
    }


}
export { RayCastUtil };


export class VolumeUtil {
    /**
     * 
     * @param {Vector3} center 
     * @param {number} width x
     * @param {number} height y
     * @param {number} depth z
     * @returns {BlockVolume}
     */
    static createBoxVolume(center, width, height, depth) {
        const minX = Math.floor(center.x - width/2);
        const maxX = Math.ceil(center.x + width/2);
        const minY = Math.floor(center.y - height/2);
        const maxY = Math.ceil(center.y + height/2);
        const minZ = Math.floor(center.z - depth/2);
        const maxZ = Math.ceil(center.z + depth/2);
        return new BlockVolume(
            new Vector3(minX, minY, minZ),
            new Vector3(maxX - 1, maxY - 1, maxZ - 1)
        );
    }

    /**
     * 
     * @param {Vector3} center 
     * @param {number} radius 
     * @param {number} height 
     * @returns {BlockVolume[]}
     */
    static createCylindricalVolume(center, radius, height) {
        const volumes = [];
        const minX = Math.floor(center.x - radius);
        const maxX = Math.ceil(center.x + radius);
        const minZ = Math.floor(center.z - radius);
        const maxZ = Math.ceil(center.z + radius);
        const minY = Math.floor(center.y);
        const maxY = Math.ceil(center.y + height);
        
        for (let x = minX; x < maxX; x++) {
            for (let z = minZ; z < maxZ; z++) {
                // Check if this column is within the cylindrical radius
                const distanceFromCenter = Math.sqrt(
                    Math.pow(x + 0.5 - center.x, 2) + 
                    Math.pow(z + 0.5 - center.z, 2)
                );
                
                if (distanceFromCenter <= radius) {
                    volumes.push(new BlockVolume(
                        new Vector3(x, minY, z),
                        new Vector3(x, maxY - 1, z)
                    ));
                }
            }
        }
        
        return volumes;
    }
}

export class CustomVectorUtil {
    /**
     * 
     * @param {Vector3} forward 
     * @returns {{forward: Vector3, right: Vector3, up: Vector3}}
     */
    static createBasisFromForward(forward){
        const upWorld = new Vector3(0, 1, 0)
        const right = new Vector3(upWorld.x, upWorld.y, upWorld.z).cross(forward).normalize();
        const up = new Vector3(forward.x, forward.y, forward.z).cross(right).normalize();
        return { forward, right, up };
    }

    /**
     * 
     * @param {Vector3} v 
     * @param {Vector3} axis 
     * @param {number} angle 
     * @returns {Vector3}
     */
    static rotateAroundAxis(v, axis, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const dot = v.x * axis.x + v.y * axis.y + v.z * axis.z;
        const crossProd = new Vector3(axis.x, axis.y, axis.z).cross(v);

        return new Vector3(
        v.x * cos + crossProd.x * sin + axis.x * dot * (1 - cos),
        v.y * cos + crossProd.y * sin + axis.y * dot * (1 - cos),
        v.z * cos + crossProd.z * sin + axis.z * dot * (1 - cos),
        );
    }

    /**
     * 
     * @param {Vector3} point 
     * @param {{ forward: Vector3; right: Vector3; up: Vector3 }} basis 
     * @param {Vector3} translation 
     * @returns {Vector3}
     */
    static translateRelativeToBasis(point, basis, translation) {
        return new Vector3( 
            point.x +
            basis.right.x * translation.x +
            basis.up.x * translation.y +
            basis.forward.x * translation.z,

            point.y +
            basis.right.y * translation.x +
            basis.up.y * translation.y +
            basis.forward.y * translation.z,

            point.z +
            basis.right.z * translation.x +
            basis.up.z * translation.y +
            basis.forward.z * translation.z,
        );
    }

    /**
     * 
     * @param {Dimension} dimension 
     * @param {Vector3} startingPos 
     * @param {Vector3} forwardDir 
     * @param {Vector3[]} targetPositions 
     * @param {Vector3} attackOffset
     * @param {number} totalHorizontalAngleDeg 
     * @param {number} totalVerticalAngleDeg 
     * @param {number} maxRange 
     * @param {number} minRange
     * @returns {boolean[]}
     */
    static isInFov(dimension, startingPos, forwardDir, targetPositions, attackOffset, totalHorizontalAngleDeg, totalVerticalAngleDeg, maxRange, minRange) {
        const basis = CustomVectorUtil.createBasisFromForward(forwardDir);

        // Apply attack offset in local space
        const origin = CustomVectorUtil.translateRelativeToBasis(
            startingPos,
            basis,
            attackOffset
        );
        const halfH = (totalHorizontalAngleDeg * Math.PI) / 360;
        const halfV = (totalVerticalAngleDeg * Math.PI) / 360;

        const results = [];

        for(const targetPos of targetPositions) {
            const D = new Vector3(targetPos.x, targetPos.y, targetPos.z).sub(origin);
            const dist = D.length();
            // Check radial distance
            if (dist > maxRange || dist < minRange) {
                results.push(false);
                continue;
            }

            if(dimension.getBlockFromRay(origin, D, { maxDistance: dist })) {
                results.push(false);
                continue;
            }

            const DNorm = D.normalize();

            const horizontalDot = new Vector3(DNorm.x, DNorm.y, DNorm.z).dot(basis.right);
            const verticalDot = new Vector3(DNorm.x, DNorm.y, DNorm.z).dot(basis.up);
            const forwardDot = new Vector3(DNorm.x, DNorm.y, DNorm.z).dot(basis.forward);
            const horizontalAngle = Math.atan2(horizontalDot, forwardDot);
            const verticalAngle = Math.atan2(verticalDot, Math.sqrt(forwardDot * forwardDot + horizontalDot * horizontalDot));

            world.sendMessage(`Horizontal Angle: ${(horizontalAngle * 180 / Math.PI).toFixed(2)}°, Vertical Angle: ${(verticalAngle * 180 / Math.PI).toFixed(2)}°`);
            world.sendMessage(`Half Horizontal Bound: ${(halfH * 180 / Math.PI).toFixed(2)}°, Half Vertical Bound: ${(halfV * 180 / Math.PI).toFixed(2)}°`);
            results.push(horizontalAngle >= -halfH && horizontalAngle <= halfH && verticalAngle >= -halfV && verticalAngle <= halfV);
        }
        return results;
    }

    /**
     * 
     * @param {Dimension} dimension 
     * @param {Vector3} pos 
     * @param {Vector3} forward 
     * @param {number} numOfParticles 
     * @param {Vector3} attackOffset
     * @param {number} totalHorizontalAngleDeg 
     * @param {number} totalVerticalAngleDeg 
     * @param {number} maxRange 
     * @param {number} minRange
     */
    static drawEffect(dimension, pos, forward, numOfParticles, attackOffset, totalHorizontalAngleDeg, totalVerticalAngleDeg, maxRange, minRange) {
        const halfH = (totalHorizontalAngleDeg * Math.PI) / 360;
        const halfV = (totalVerticalAngleDeg * Math.PI) / 360;
        
        const basis = CustomVectorUtil.createBasisFromForward(forward);
        const right = basis.right, up = basis.up;
        pos = CustomVectorUtil.translateRelativeToBasis(
            pos,
            basis,
            attackOffset
        );

        const particlesNum = Math.round(numOfParticles ? numOfParticles : 3*maxRange);
        const lineParticlesNum = Math.round(numOfParticles ? numOfParticles : 3*(maxRange - minRange));
        
        // --- Horizontal boundaries ---
        const leftVector    = CustomVectorUtil.rotateAroundAxis(forward, up,  halfH);
        const rightVector  = CustomVectorUtil.rotateAroundAxis(forward, up, -halfH);

        const leftUpVector  = CustomVectorUtil.rotateAroundAxis(CustomVectorUtil.rotateAroundAxis(forward, up, halfH), right, halfV);
        const leftDownVector = CustomVectorUtil.rotateAroundAxis(CustomVectorUtil.rotateAroundAxis(forward, up, halfH), right, -halfV);
        const rightUpVector  = CustomVectorUtil.rotateAroundAxis(CustomVectorUtil.rotateAroundAxis(forward, up, -halfH), right, halfV);
        const rightDownVector = CustomVectorUtil.rotateAroundAxis(CustomVectorUtil.rotateAroundAxis(forward, up, -halfH), right, -halfV);

        // Draw boundary rays from minRadius to maxRadius
        const rayLength = maxRange - minRange;

        DrawEffects.drawRay(dimension, new Vector3(leftUpVector.x, leftUpVector.y, leftUpVector.z).multiplyScalar(minRange).add(pos), leftUpVector, rayLength, lineParticlesNum);
        DrawEffects.drawRay(dimension, new Vector3(leftDownVector.x, leftDownVector.y, leftDownVector.z).multiplyScalar(minRange).add(pos), leftDownVector, rayLength, lineParticlesNum);
        DrawEffects.drawRay(dimension, new Vector3(rightUpVector.x, rightUpVector.y, rightUpVector.z).multiplyScalar(minRange).add(pos), rightUpVector, rayLength, lineParticlesNum);
        DrawEffects.drawRay(dimension, new Vector3(rightDownVector.x, rightDownVector.y, rightDownVector.z).multiplyScalar(minRange).add(pos), rightDownVector, rayLength, lineParticlesNum);
        // Outer boundary arcs
        //Horizontal arc
        DrawEffects.drawArc(dimension, pos, forward, maxRange, [{rotAxis: up, angleDeg: halfH}], particlesNum);
        //Vertical arc
        DrawEffects.drawArc(dimension, pos, forward, maxRange, [{rotAxis: right, angleDeg: halfV}], particlesNum);
        //Up arc
        DrawEffects.drawArc(dimension, pos, forward, maxRange, [{rotAxis: up, angleDeg: halfH}, {rotAxis: right, angleDeg: -halfV}], particlesNum);
        //Down arc
        DrawEffects.drawArc(dimension, pos, forward, maxRange, [{rotAxis: up, angleDeg: halfH}, {rotAxis: right, angleDeg: halfV}], particlesNum);
        //Left arc
        DrawEffects.drawArc(dimension, pos, leftVector, maxRange, [{rotAxis: right, angleDeg: -halfV}], particlesNum);
        //Right arc
        DrawEffects.drawArc(dimension, pos, rightVector, maxRange, [{rotAxis: right, angleDeg: halfV}], particlesNum);

        // Draw inner boundary if minAttackRadius > 0
        if (minRange > 0) {
            // Inner boundary arcs
            //Horizontal arc
            DrawEffects.drawArc(dimension, pos, forward, minRange, [{rotAxis: up, angleDeg: halfH}], particlesNum);
            //Vertical arc
            DrawEffects.drawArc(dimension, pos, forward, minRange, [{rotAxis: right, angleDeg: halfV}], particlesNum);
            //Up arc
            DrawEffects.drawArc(dimension, pos, forward, minRange, [{rotAxis: up, angleDeg: halfH}, {rotAxis: right, angleDeg: -halfV}], particlesNum);
            //Down arc
            DrawEffects.drawArc(dimension, pos, forward, minRange, [{rotAxis: up, angleDeg: halfH}, {rotAxis: right, angleDeg: halfV}], particlesNum);
            //Left arc
            DrawEffects.drawArc(dimension, pos, leftVector, minRange, [{rotAxis: right, angleDeg: -halfV}], particlesNum);
            //Right arc
            DrawEffects.drawArc(dimension, pos, rightVector, minRange, [{rotAxis: right, angleDeg: halfV}], particlesNum);
        }
    }
}

export class DrawEffects {
    /**
     * 
     * @param {Dimension} dimension 
     * @param {Vector3} startPos 
     * @param {Vector3} direction 
     * @param {number} length 
     * @param {number} pointsNum 
     */
  static drawRay(
    dimension,
    startPos,
    direction,
    length,
    pointsNum,
  ) {
    for (let i = 0; i < pointsNum; i++) {
      const t = i / pointsNum;
      dimension.spawnParticle("minecraft:basic_flame_particle", {
        x: startPos.x + direction.x * t * length,
        y: startPos.y + direction.y * t * length,
        z: startPos.z + direction.z * t * length,
      });
    }
  }

  /**
   * 
   * @param {Dimension} dimension 
   * @param {Vector3} startPos 
   * @param {Vector3} direction 
   * @param {number} distance 
   * @param {{
   *    rotAxis: Vector3;
   *    angleDeg: number;
   * }[]} arcRotation 
   * @param {number} pointsNum 
   */
  static drawArc(
    dimension,
    startPos,
    direction,
    distance,
    arcRotation,
    pointsNum,
  ) {
    for (let i = 0; i <= pointsNum; i++) {
      const a =
        -arcRotation[0].angleDeg +
        (i / pointsNum) * (2 * arcRotation[0].angleDeg);
      let dir = CustomVectorUtil.rotateAroundAxis(
        direction,
        arcRotation[0].rotAxis,
        a,
      );
      let r = 1;
      while (arcRotation.length > r) {
        dir = CustomVectorUtil.rotateAroundAxis(
          dir,
          arcRotation[r].rotAxis,
          arcRotation[r].angleDeg,
        );
        r++;
      }

      dimension.spawnParticle("minecraft:basic_flame_particle", {
        x: startPos.x + dir.x * distance,
        y: startPos.y + dir.y * distance,
        z: startPos.z + dir.z * distance,
      });
    }
  }
}
