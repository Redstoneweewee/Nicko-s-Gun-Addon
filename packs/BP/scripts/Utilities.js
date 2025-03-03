import { Entity, EntityDamageCause, EntityHealthComponent, EntityInventoryComponent, GameMode, ContainerSlot, Player, system, ItemStack, ItemDurabilityComponent, EntityEquippableComponent, EquipmentSlot, EntityComponentTypes, ItemComponentTypes, world, EntityTypeFamilyComponent } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from './Global.js';
import { Firearm, AmmoTypes, AmmoNames, Gun, Explosive, GunWithAbility, FiringModes } from './Definitions/FirearmDefinition.js';
import { Magazine } from './Definitions/MagazineDefinition.js';
import { MagazineTags } from './Lists/MagazinesList.js';
import { startReloadCooldown } from './Reload.js';
import { AnimationLink } from './AnimationLink.js';
import { LeftClickAbilityAttributes, LeftClickAbilityTypes, SwitchFiringModeAttributes, SwitchScopeZoomAttributes } from './Definitions/LeftClickAbilityDefinition.js';
import { AnimationTypes, ReloadAnimationAttributes, SoundTimeoutIdObject } from './Definitions/AnimationDefinition.js';
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
    /**
     * @param {Map} map
     */
    static printMap(map) {
        const output = this.getMapAsString(map)
        console.log(output);
    }
    /**
     * @param {Map} map
     * @returns {string}
     */
    static getMapAsString(map) {
        let output = "";
        for(const entry of map) {
            output += `key: ${entry[0]}, value: ${entry[1]}\n`;
        }
        return output;
    }
}

export { MapUtil };




class LoopUtil {

    /**
     * @param {Player} player
     * @param {Map} map - A Global map. Must be a `Global.playerShootingLoopIds`
     * @param {function} func
     * @param {number} deltaTime
     */
    static startAsyncLoop(player, map, func, deltaTime) {
        //if(Global.playerShootingLoopIds.get(player.id) != -1) {
        //    console.warn(`player ${player.name} is already shooting with loop ID ${Global.playerShootingLoopIds.get(player.id)}!`);
        //    return;
        //}
        func(); 
        const loopId = system.runInterval(() => {
            func();
        }, deltaTime);
        this.#addId(player, map, loopId);
    }

    /**
     * @param {Player} player
     * @param {Map} map - A Global map.
     */
    static stopAsyncLoop(player, map) {
        const loopIds = map.get(player.id);
        //console.log(loopIds);
        if(loopIds === undefined) { return; }
        loopIds.forEach(e => {
            system.clearRun(e);
        });
        map.set(player.id, []);
    }


    /**
     * @param {Player} player
     * @param {Map} map - A Global map. Must be a `Global.playerShootingLoopIds`
     * @param {number} id
     */
    static #addId(player, map, id) {
        const newIds = map.get(player.id)? Array.prototype.concat(id, map.get(player.id)) : [id];
        map.set(player.id, newIds);
    }


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
     * @returns {ItemStack?}
     */
    static getSelectedItemStack(player) {
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(inv === undefined) { return null; }
        if(!(inv instanceof EntityInventoryComponent)) { return null; }
        const container = inv.container;
        if(container === undefined) { return null; }
        return container.getSlot(player.selectedSlotIndex).getItem()??null;
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
     * @returns {number?}
     */
    static tryGetDurability(itemStack) {
        if(itemStack === null || itemStack === undefined) { return null; }
        const durabilityComponent = itemStack.getComponent(ItemComponentTypes.Durability);
        if(!(durabilityComponent instanceof ItemDurabilityComponent)) { return null; }
        return durabilityComponent.maxDurability - durabilityComponent.damage;
    }

    /**
     * 
     * @param {ItemStack} itemStack 
     * @param {number} durability 
     * @returns {ItemStack?}
     */
    static trySetDurability(itemStack, durability) {
        if(itemStack === null || itemStack === undefined) { return null; }
        const durabilityComponent = itemStack.getComponent(ItemComponentTypes.Durability);
        if(!(durabilityComponent instanceof ItemDurabilityComponent)) { return null; }
        if(durabilityComponent.maxDurability - durability < 0) { return null; }
        durabilityComponent.damage = durabilityComponent.maxDurability - durability;
        return itemStack;
    }
    
    /**
     * @param {Player} player 
     * @param {number} damage
     * @returns {number?} - Returns the durability (ammo count) of the magazine
     */
    static tryDealDurabilityDamageToOffhandMagazine(player, damage) {
        if(!FirearmUtil.isOffhandAnAmmoType(player)) { return null; }
        const itemStack = this.getPlayerOffhandContainerSlot(player)?.getItem();
        if(itemStack === null || itemStack === undefined) { return null; }
        const durabilityComponent = itemStack.getComponent(ItemComponentTypes.Durability);
        if(!(durabilityComponent instanceof ItemDurabilityComponent)) { return null; }
        const durability = durabilityComponent.maxDurability - durabilityComponent.damage;

        let output = durability - damage;
        if(durability >= damage) {
            durabilityComponent.damage = durabilityComponent.damage + damage;
        }
        const magazineContainerSlot = this.getPlayerOffhandContainerSlot(player);
        if(magazineContainerSlot === null) { return null; }
        if(durabilityComponent.damage === durabilityComponent.maxDurability) {
            try {
                //console.log(`set magazine to ${itemStack.typeId}_empty`);
                const emptyMagazineItemStack = new ItemStack(itemStack.typeId+"_empty", 1);
                magazineContainerSlot.setItem(emptyMagazineItemStack);
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, false);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
            }
            catch {
                console.error(`Magazine ${itemStack.typeId} does not have an empty counterpart.`);
            }
            output = 0;
        }
        else {
            if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo) === undefined ||
               player.getDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo) === false) {
                player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_has_ammo, true);
                AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_has_ammo);
            }
            FirearmNameUtil.renewMagazineName(itemStack, (durabilityComponent.maxDurability-durabilityComponent.damage));
            magazineContainerSlot.setItem(itemStack);
        }
        return output;
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
     * @param {boolean} keepOneItemInSlot
     */
    static moveOldOffhandItemOff(player, keepOneItemInSlot) {
        const offhandSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
        const oldItem = offhandSlot?.getItem();
        if(oldItem === undefined) { return; }
        
        const inv = player.getComponent(EntityComponentTypes.Inventory);
        if(inv === undefined) { return null; }
        if(!(inv instanceof EntityInventoryComponent)) { return null; }
        const container = inv.container;
        if(container === undefined) { return; }

        if(!keepOneItemInSlot) {
            if(container.emptySlotsCount > 0) {
                container.addItem(oldItem);
            }
            else {
                const offset = 1.5;
                const spawnLocation = new Vector3(player.getHeadLocation().x+player.getViewDirection().x*offset,
                                                player.getHeadLocation().y+player.getViewDirection().y*offset,
                                                player.getHeadLocation().z+player.getViewDirection().z*offset, );
                const itemEntity = player.dimension.spawnItem(oldItem, spawnLocation);
                itemEntity.applyImpulse(new Vector3(player.getViewDirection().x*0.2,player.getViewDirection().y*0.2,player.getViewDirection().z*0.2));
            }
        }
        else {
            oldItem.amount = oldItem.amount-1;
            if(container.emptySlotsCount > 0) {
                container.addItem(oldItem);
            }
            else {
                const offset = 2.5;
                const spawnLocation = new Vector3(player.getHeadLocation().x+player.getViewDirection().x*offset,
                                                player.getHeadLocation().y+player.getViewDirection().y*offset,
                                                player.getHeadLocation().z+player.getViewDirection().z*offset, );
                const itemEntity = player.dimension.spawnItem(oldItem, spawnLocation);
                itemEntity.applyImpulse(new Vector3(player.getViewDirection().x*0.3,player.getViewDirection().y*0.3,player.getViewDirection().z*0.3));
            }
            oldItem.amount = 1;
            offhandSlot?.setItem(oldItem);
        }
    }

    ///**
    // * 
    // * @param {ItemStack} itemStack1 
    // * @param {ItemStack} itemStack2 
    // * @returns {boolean}
    // */
    //static isSameFirearmItemStack(itemStack1, itemStack2) {
    //    if(itemStack1 === null || itemStack1 === undefined) { return false; }
    //    if(itemStack2 === null || itemStack2 === undefined) { return false; }
    //    if(itemStack1.typeId !== itemStack2.typeId) {
    //        return false;
    //    }
    //    for (var property in Global.ItemDynamicProperties) {
    //        if (Object.prototype.hasOwnProperty.call(Global.ItemDynamicProperties, property)) {
    //            if(itemStack1.getDynamicProperty(property) !== itemStack2.getDynamicProperty(property)) {
    //                return false;
    //            }
    //        }
    //    }
    //    return true;
    //}
}

export { ItemUtil };



class FirearmUtil {

    /**
     * @param {Player} player 
     * @param {Firearm} firearm
     * @param {number} ammoCount 
     * @returns {number?} - Returns the new ammo count of the firearm
     */
    static tryConsumeFirearmAmmo(player, firearm, ammoCount) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        if(firearmItemStack === null) { return null; }
        
        const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
        this.#consumeAmmoUsingId(firearmId, ammoCount);

        return ItemUtil.tryDealDurabilityDamageToOffhandMagazine(player, ammoCount);
    }
    /**
     * 
     * @param {Number} id 
     * @param {Number} ammoCount 
     */
    static #consumeAmmoUsingId(id, ammoCount) {
        /*
        let found = false;
        let newMap = new Map();
        for(let i=Global.worldFirearmIds.length-1; i>=0; i--) {
            for(const entry of Global.worldFirearmIds[i]) {
                if(entry[0] === id) {
                    found = true;
                    newMap.set(entry[0], entry[1] - ammoCount);
                    break;
                }
            }
            if(found) {
                Global.worldFirearmIds.splice(i, 1);
                Global.worldFirearmIds.push(newMap);
                //FirearmIdUtil.printFirearmIds();
                break;
            }
        }
        */
        const firearmIdString = FirearmIdUtil.firearmIdToString(id);
        const oldAmmoCount = Number(world.getDynamicProperty(firearmIdString));
        if(oldAmmoCount === undefined || oldAmmoCount === null || Number.isNaN(oldAmmoCount)) {
            console.error(`Firearm with id ${id} has an undefined amount of ammo`);
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
        if(firearmItemStack === null) { return; }
        const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
        if(firearmId === undefined || firearmId === null || Number.isNaN(firearmId)) { return; }
        const firearmIdString = FirearmIdUtil.firearmIdToString(firearmId);
        if(world.getDynamicProperty(firearmIdString) === undefined) {
            const firearmAmmoCount = FirearmUtil.getItemAmmoUsingItemStack(firearmItemStack);
            if(firearmAmmoCount === null) { return; }
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
        if(ammoCount === undefined || ammoCount === null || Number.isNaN(ammoCount)) { return; }
        containerSlot.setDynamicProperty(Global.ItemDynamicProperties.ammoCount, ammoCount);
        //this.printFirearmDynamicProperties(containerSlot.getItem());
    }
    /**
     * 
     * @param {Number} id 
     * @param {Number} ammoCount 
     */
    static setWorldAmmoUsingId(id, ammoCount) {
        /*
        let found = false;
        let newMap = new Map();
        for(let i=Global.worldFirearmIds.length-1; i>=0; i--) {
            for(const entry of Global.worldFirearmIds[i]) {
                if(entry[0] === id) {
                    found = true;
                    newMap.set(entry[0], ammoCount);
                    break;
                }
            }
            if(found) { 
                Global.worldFirearmIds[i] = newMap;
                break; 
            }
        }
        */
        world.setDynamicProperty(FirearmIdUtil.firearmIdToString(id), ammoCount);
    }
    /**
     * 
     * @param {ItemStack} itemStack
     * @returns {Number?}
     */
    static getItemAmmoUsingItemStack(itemStack) {
        const ammoCount = Number(itemStack.getDynamicProperty(Global.ItemDynamicProperties.ammoCount));
        if(ammoCount === undefined || ammoCount === null || Number.isNaN(ammoCount)) { 
            console.error(`itemDynamicProperty ammoCount of ${itemStack.typeId} is undefined`);
            return null;
        }
        return ammoCount;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Number?}
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
        if(ammoCount === undefined || ammoCount === null || Number.isNaN(ammoCount)) {
            console.error(`Firearm with id ${id} has an undefined amount of ammo`);
            return null;
        } 
        return ammoCount;
    }

    /**
     * 
     * @param {Player} player 
     * @returns {number?}
     */
    static getAmmoCountFromOffhand(player) {
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(offhandItemStack === null || offhandItemStack === undefined) { return null; }
        const magazineObject = this.getMagazineObjectFromItemStack(offhandItemStack);
        if(magazineObject === null || magazineObject === undefined) { return null; }
        return ItemUtil.tryGetDurability(offhandItemStack);
    }

    /**
     * 
     * @param {Player} player 
     * @returns {boolean}
     */
    static isOffhandAmmoTypeCorrect(player) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(firearmItemStack === null || firearmItemStack === undefined) { return false; }
        if(offhandItemStack === null || offhandItemStack === undefined) { return false; }
        const firearmObject = this.getFirearmObjectFromItemStack(firearmItemStack);
        const magazineObject = this.getMagazineObjectFromItemStack(offhandItemStack);
        if(firearmObject === null || firearmObject === undefined) { return false; }
        if(magazineObject === null || magazineObject === undefined) { return false; }

        if(firearmObject.ammoType === magazineObject.ammoType) { return true; }
        return false;
    }

    static isOffhandAmmoTypeEmptyButCorrect(player) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(firearmItemStack === null || firearmItemStack === undefined) { return false; }
        if(offhandItemStack === null || offhandItemStack === undefined) { return false; }
        const firearmObject = this.getFirearmObjectFromItemStack(firearmItemStack);
        const magazineObject = this.getMagazineObjectFromItemStackEmpty(offhandItemStack);
        if(firearmObject === null || firearmObject === undefined) { return false; }
        if(magazineObject === null || magazineObject === undefined) { return false; }
        if(firearmObject.ammoType === magazineObject.ammoType) { return true; }
        return false;
    }

    /**
     * 
     * @param {Player} player 
     * @returns {boolean}
     */
    static isOffhandAnAmmoType(player) {
        const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        if(offhandItemStack === null || offhandItemStack === undefined) { return false; }
        if(offhandItemStack.hasTag("yes:is_magazine")) { return true; }
        return false;
    }

    /**
     * 
     * @param {ContainerSlot} firearmContainerSlot 
     * @param {number} ammoCount 
     */
    //static saveAmmoCountAsDynamicProperty(firearmContainerSlot, ammoCount) {
    //    if(firearmContainerSlot === null || firearmContainerSlot === undefined) { return; }
    //    console.log(`saved ammo count ${ammoCount} to ${firearmContainerSlot.typeId} as a dynamic property`);
    //    firearmContainerSlot.setDynamicProperty(Global.ItemDynamicProperties., ammoCount);
    //}
    /**
     * 
     * @param {ItemStack?} firearmItemStack
     * @returns {number?}
     */
    //static getAmmoCountFromDynamicProperty(firearmItemStack) {
    //    if(firearmItemStack === null || firearmItemStack === undefined) { return null; }
    //    const ammoCount = Number(firearmItemStack.getDynamicProperty(Global.ItemDynamicProperties.ammoCount));
    //    if(Number.isNaN(ammoCount)) { return null; }
    //    console.log(`got ammo count ${ammoCount} from ${firearmItemStack.typeId} as a dynamic property`);
    //    return ammoCount;
    //}

    /**
     * @param {Player} player 
     * @returns {boolean}
     */
    static isHoldingFirearm(player) {
        const itemStack = ItemUtil.getSelectedItemStack(player);
        if(itemStack === undefined || itemStack === null) { return false; }
        if(!itemStack.hasTag("yes:is_firearm")) { return false; }
        return true;
    }

    /**
     * @param {Player} player 
     * @returns {boolean}
     */
    static isHoldingFirearmWithAbility(player) {
        if(!this.isHoldingFirearm(player)) { return false; }
        const itemStack = ItemUtil.getSelectedItemStack(player);
        const firearmObject = this.getFirearmObjectFromItemStack(itemStack);
        if(firearmObject === null) { return false; }
        if(firearmObject instanceof GunWithAbility) { return true; }
        return false;
    }

    
    /**
     * 
     * @param {Player} player 
     * @param {LeftClickAbilityAttributes} abilityType 
     */
    /*
    static isHoldingFirearmWithSpecificAbility(player, abilityType) {
        if(!this.isHoldingFirearmWithAbility(player)) { return; }
        const itemStack = ItemUtil.getSelectedItemStack(player);
        const firearmObject = this.getFirearmObjectFromItemStack(itemStack);
        if(firearmObject === null) { return false; }
        if(!(firearmObject instanceof GunWithAbility)) { return false; }
        if(typeof(firearmObject.leftClickAbilityAttributes) === typeof(abilityType)) {
            return true;
        }
        return false;
    }
    */

    /**
     * @param {Player} player 
     * @returns {boolean}
     */
    static isSwitchingFirearm(player) {
        if(!this.isHoldingFirearm(player)) { return false; }
        if(Global.playerCurrentFirearmId.get(player.id) === null || Global.playerCurrentFirearmId.get(player.id) === undefined) { return false; }
        const oldFirearmId = Global.playerCurrentFirearmId.get(player.id);
        const itemStack = ItemUtil.getSelectedItemStack(player);
        if(itemStack === undefined || itemStack === null) { return false; }
        const newFirearmId = itemStack.getDynamicProperty(Global.ItemDynamicProperties.id);
        if(oldFirearmId !== newFirearmId) { return true; }
        return false;
    }

    /**
     * @param {Player} player
     */
    static renewFirearmAmmoOnMagazineChange(player) {
        if(!this.isHoldingFirearm(player)) { return; }
        const firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player);
        if(firearmContainerSlot === null || firearmContainerSlot === undefined) { return; }
        const firearmItemStack = firearmContainerSlot?.getItem();
        if(firearmItemStack === null || firearmItemStack === undefined) { return; }
        const firearmId = FirearmIdUtil.getFirearmId(firearmItemStack);
        const currentMagazineTag = firearmItemStack.getDynamicProperty(Global.ItemDynamicProperties.magazineTag);
        this.tryCopyFirearmAmmoToWorld(player);
        //console.log("tryCopyFirearmAmmoToWorld");
        const currentAmmoCount = this.getWorldAmmoUsingId(firearmId)??0;

        const isMagazineEmpty = Boolean(firearmContainerSlot.getDynamicProperty(Global.ItemDynamicProperties.isMagazineEmpty));
        const magazineItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
        const oldMagazineTag = String(firearmContainerSlot.getDynamicProperty(Global.ItemDynamicProperties.magazineTag));
        const newMagazineTag = magazineItemStack ? FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack)?.tag??null : null;
        if(this.isOffhandAmmoTypeEmptyButCorrect(player) && !isMagazineEmpty && newMagazineTag) {
            console.log(`1`);
            //console.log(`set ammoCount to 0 and isMagazineEmpty to ${true}`);
            this.setFirearmMagazineToEmpty(player, newMagazineTag, firearmContainerSlot, firearmId);
            return;
        }
        else if(this.isOffhandAmmoTypeEmptyButCorrect(player) && newMagazineTag && oldMagazineTag !== newMagazineTag) {
            console.log(`set ammoCount to 0 and isMagazineEmpty to ${true}`);
            console.log(`2`);
            this.setFirearmMagazineToEmpty(player, newMagazineTag, firearmContainerSlot, firearmId);
            return;
        }
        else if(!this.isOffhandAmmoTypeCorrect(player)) {
            if((currentAmmoCount !== 0 || currentMagazineTag !== MagazineTags.none) && !this.isOffhandAmmoTypeEmptyButCorrect(player)) {
                console.log(`set ammoCount to 0 and magazineType to ${MagazineTags.none}`);
                console.log(`3`);
                this.setFirearmMagazineToNone(player, firearmContainerSlot, firearmId, false);
            }
            return;
        }
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { return; }
        if(magazineItemStack === null || magazineItemStack === undefined) { return; }
        const newMagazineAmmoCount = FirearmUtil.getAmmoCountFromOffhand(player);
        if(newMagazineTag === null || newMagazineTag === undefined) { return; }
        if(newMagazineAmmoCount !== currentAmmoCount || currentMagazineTag !== newMagazineTag) {
            if(newMagazineAmmoCount === null || newMagazineAmmoCount === undefined) { return; }
            
            this.setFirearmMagazineToNone(player, firearmContainerSlot, firearmId, true);
            //const itemStack = ItemUtil.getPlayerOffhandContainerSlot(player);
            //if(itemStack === null) { return; }
            //const emptyMagazineItemStack = new ItemStack(itemStack.typeId+"_empty", 1);
            //const magazineContainerSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
            //magazineContainerSlot?.setItem(emptyMagazineItemStack);
            //console.log(`starting reload cooldodwn: item: ${itemStack.typeId}`);
            //system.run(() => {
                startReloadCooldown(player, newMagazineTag, currentAmmoCount, newMagazineAmmoCount, magazineItemStack);
            //});
        }
    }

    /**
     * 
     * @param {Player} player
     * @param {string} newMagazineTag
     * @param {ContainerSlot} firearmContainerSlot
     * @param {Number} firearmId
     */
    static setFirearmMagazineToEmpty(player, newMagazineTag, firearmContainerSlot, firearmId) {
        FirearmUtil.setWorldAmmoUsingId(firearmId, 0);
        firearmContainerSlot.setDynamicProperty(Global.ItemDynamicProperties.isMagazineEmpty, true);
        firearmContainerSlot.setDynamicProperty(Global.ItemDynamicProperties.magazineTag, newMagazineTag);
        const firearmItemStack = firearmContainerSlot.getItem();
        if(firearmItemStack !== undefined) {
            Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
        if(firearmObject === null) { return; }
        FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
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
        firearmContainerSlot.setDynamicProperty(Global.ItemDynamicProperties.isMagazineEmpty, false);
        firearmContainerSlot.setDynamicProperty(Global.ItemDynamicProperties.magazineTag, MagazineTags.none);
        const firearmItemStack = firearmContainerSlot.getItem();
        if(firearmItemStack !== undefined) {
            Global.playerCurrentFirearmItemStack.set(player.id, firearmItemStack);
        }
        if(!isSwappingOrReloading) {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.has_offhand_magazine, false);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.has_offhand_magazine);
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.should_cock_on_reload, true);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.should_cock_on_reload);
        }

        //this.printFirearmDynamicProperties(firearmContainerSlot.getItem());
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmContainerSlot.getItem());
        if(firearmObject === null) { return; }
        FirearmNameUtil.renewFirearmName(firearmContainerSlot, firearmObject);
    }

    
    /**
     * 
     * @param {ItemStack?} itemStack 
     * @returns {Magazine?}
     */
    static getMagazineObjectFromItemStack(itemStack) {
        if(itemStack === null) { return null; }
        for(const entry of Global.magazines) {
            if(itemStack.hasTag(entry[0])) {
                return entry[1];
            }
        }
        return null;
    }

    
    /**
     * 
     * @param {ItemStack?} itemStack 
     * @returns {Magazine?}
     */
    static getMagazineObjectFromItemStackEmpty(itemStack) {
        if(itemStack === null) { return null; }
        for(const entry of Global.magazines) {
            if(itemStack.hasTag(entry[0]+"_empty")) {
                return entry[1];
            }
        }
        return null;
    }


    /**
     * 
     * @param {ItemStack | null | undefined} itemStack 
     * @returns {Firearm?}
     */
    static getFirearmObjectFromItemStack(itemStack) {
        if(itemStack === null || itemStack === undefined) { return null; }
        for(const entry of Global.firearms) {
            if(itemStack.hasTag(entry[0])) {
                return entry[1];
            }
        }
        return null;
    }


    /**
     * 
     * @param {ItemStack?} itemStack 
     * @returns {Magazine?}
     */
    static getMagazineObjectFromItemStackBoth(itemStack) {
        if(itemStack === null) { return null; }
        for(const entry of Global.magazines) {
            if(itemStack.hasTag(entry[0])) {
                return entry[1];
            }
            else if(itemStack.hasTag(entry[0]+"_empty")) {
                return entry[1];
            }
        }
        return null;
    }

    /**
     * 
     * @param {ItemStack} itemStack 
     * @param {string} bulletType - a MagazineDefinition.BulletTypes enum
     * @returns {boolean}
     */
    static isBulletType(itemStack, bulletType) {
        if(!itemStack.hasTag(bulletType)) {
            return false;
        }
        return true;
    }

    /**
     * @param {Player} player 
     * @param {Firearm} firearm 
     */
    static tryIncreaseRecoil(player, firearm) {
        const addRecoil = firearm.mainRecoilAttributes.amountPerShot;
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
     * @param {Firearm} firearm
     */
    static tryAddScreenshakeRecoil(player, firearm) {
        const recoil = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.recoil));
        if(recoil === undefined || recoil === null || Number.isNaN(recoil)) { return; }

        let recoilMultiplier = 1.0;
        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_aiming)) {
            recoilMultiplier = firearm.scopeAttributes.recoilMultiplier;
        }


        let mainCamerashakeAmount = firearm.mainRecoilAttributes.minCamerashake + (firearm.mainRecoilAttributes.maxCamerashake-firearm.mainRecoilAttributes.minCamerashake)*(recoil/100);
        if(mainCamerashakeAmount > firearm.mainRecoilAttributes.maxCamerashake) { mainCamerashakeAmount = firearm.mainRecoilAttributes.maxCamerashake; }
        mainCamerashakeAmount = mainCamerashakeAmount*recoilMultiplier;

        
        let residualCamerashakeAmount = firearm.residualRecoilAttributes.minCamerashake + (firearm.residualRecoilAttributes.maxCamerashake-firearm.residualRecoilAttributes.minCamerashake)*(recoil/100);
        if(residualCamerashakeAmount > firearm.residualRecoilAttributes.maxCamerashake) { residualCamerashakeAmount = firearm.residualRecoilAttributes.maxCamerashake; }
        residualCamerashakeAmount = residualCamerashakeAmount*recoilMultiplier;

        const mainCamerashakeTime     = NumberUtil.getRandomFloat(firearm.mainRecoilAttributes.minCamerashakeTime, firearm.mainRecoilAttributes.maxCamerashakeTime);
        const residualCamerashakeTime = NumberUtil.getRandomFloat(firearm.residualRecoilAttributes.minCamerashakeTime, firearm.residualRecoilAttributes.maxCamerashakeTime);
        player.runCommandAsync(`camerashake add @s ${mainCamerashakeAmount} ${mainCamerashakeTime} rotational`);
        player.runCommandAsync(`camerashake add @s ${residualCamerashakeAmount} ${residualCamerashakeTime} rotational`);
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
        if(firearmObject === null) {
            //this.#trySetReloadNormalAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadNoSwapAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadOpenCockAnimationMultiplierValue(player, 1.0);
            //this.#trySetReloadCockAnimationMultiplierValue(player, 1.0);
            //console.log("resetted");
            return;
        }
        let normalMultiplier = 1;
        let noSwapMultiplier = 1;
        let openCockMultiplier = 1;
        let cockMultiplier = 1;
        firearmObject.animationsAttributes.forEach(attributes => {
            if(!(attributes instanceof ReloadAnimationAttributes)) { return; }
            if(attributes.animation.type === AnimationTypes.reloadSwap || attributes.animation.type === AnimationTypes.reloadBoth) {
                normalMultiplier = attributes.animation.timeInTicks/attributes.scaleDurationToValue;
            }
            else if(attributes.animation.type === AnimationTypes.reloadNoSwap) {
                noSwapMultiplier = attributes.animation.timeInTicks/attributes.scaleDurationToValue;
            }
            else if(attributes.animation.type === AnimationTypes.reloadOpenCock) {
                openCockMultiplier = attributes.animation.timeInTicks/attributes.scaleDurationToValue;
            }
            else if(attributes.animation.type === AnimationTypes.reloadCock) {
                cockMultiplier = attributes.animation.timeInTicks/attributes.scaleDurationToValue;
            }
        });
        if(firearmObject instanceof Gun) {
            this.#trySetReloadNormalAnimationMultiplierValue(player, normalMultiplier);
            this.#trySetReloadNoSwapAnimationMultiplierValue(player, noSwapMultiplier);
            this.#trySetReloadOpenCockAnimationMultiplierValue(player, openCockMultiplier);
            this.#trySetReloadCockAnimationMultiplierValue(player, cockMultiplier);
        }
        else if(firearmObject instanceof Explosive) {
            this.#trySetReloadNormalAnimationMultiplierValue(player, normalMultiplier);
            this.#trySetReloadNoSwapAnimationMultiplierValue(player, 1.0);
            this.#trySetReloadOpenCockAnimationMultiplierValue(player, 1.0);
            this.#trySetReloadCockAnimationMultiplierValue(player, 1.0);
        }
        else {
            console.error(`Could not find firearmObject of type ${typeof(firearmObject)} in renewReloadAnimationMultiplier()`);
        }
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
     * @param {ContainerSlot?} firearmContainerSlot
     */
    static setPlayerFiringModeAndFireRate(player, firearm, firearmContainerSlot = null) {
        if(firearm instanceof GunWithAbility && firearm.leftClickAbilityAttributes instanceof SwitchFiringModeAttributes) {
            if(firearmContainerSlot === null) { firearmContainerSlot = ItemUtil.getSelectedContainerSlot(player); }
            if(firearmContainerSlot === null) { return; }
            if(firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === undefined ||
            firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode) === firearm.leftClickAbilityAttributes.defaultFiringMode) {
                this.#setFiringModeAndFireRateDynamicProperties(player, firearm.leftClickAbilityAttributes.defaultFiringMode, firearm.leftClickAbilityAttributes.defaultFireRate);
            }
            else {
                this.#setFiringModeAndFireRateDynamicProperties(player, firearm.leftClickAbilityAttributes.alternateFiringMode, firearm.leftClickAbilityAttributes.alternateFireRate);
            }
        }
        else {
            this.#setFiringModeAndFireRateDynamicProperties(player, firearm.firingMode, firearm.firingRate);
        }
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_firing_mode);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.firearm_fire_rate);
    }

    /**
     * 
     * @param {Player} player 
     * @param {String} firingMode 
     * @param {Number} fireRate 
     */
    static #setFiringModeAndFireRateDynamicProperties(player, firingMode, fireRate) {
        if(fireRate < 0) { 
            fireRate = 0;
            console.error("Fire rate cannot be negative.");
        }
        else if(fireRate > 1200) { 
            fireRate = 1200; 
            console.error("The fastest fire rate is 1200 RPM.");
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_firing_mode, firingMode);
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.firearm_fire_rate, fireRate);
    }
}

export { FirearmUtil };



class DamageUtil {
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
            if(target.getGameMode() !== GameMode.survival && target.getGameMode() !== GameMode.adventure) { return; }
            healthComponent.setCurrentValue(healthComponent.currentValue-damage);
        }
        else {
            healthComponent.setCurrentValue(healthComponent.currentValue-damage*1.5/**mobs get dealt 1.5x dmg from all sources*/);
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
            target.applyKnockback(knockbackVectorXZ.x, knockbackVectorXZ.z, gun.knockbackAmount.x, 0);
        }
        else {
            target.applyKnockback(knockbackVectorXZ.x, knockbackVectorXZ.z, gun.knockbackAmount.x, gun.knockbackAmount.y);
        }
        //console.log(`applied knockback: ${knockbackVectorXZ.x*gun.knockbackAmount.x}, ${gun.knockbackAmount.y}, ${knockbackVectorXZ.z*gun.knockbackAmount.x}`);
    }

    /**
     * 
     * @returns {string[]}
     */
    static getHitExcludedFamilies() {
        return ["minecraft:inanimate", "minecraft:projectile"];
    }

    /**
     * 
     * @returns {string[]}
     */
    static getHitExcludedTypes() {
        return [
            "minecraft:item", 
            "minecraft:snowball", 
            "minecraft:arrow", 
            "minecraft:tnt", 
            "minecraft:egg", 
            "minecraft:ender_pearl", 
            "minecraft:fireworks_rocket", 
            "minecraft:fireball", 
            "minecraft:dragon_fireball", 
            "minecraft:small_fireball", 
            "minecraft:evocation_fang", 
            "minecraft:eye_of_ender_signal", 
            "minecraft:falling_block", 
            "minecraft:fishing_hook"
        ];
    }
    /**
     * 
     * @returns {GameMode[]}
     */
    static getHitExcludeGameModes() {
        return [GameMode.creative, GameMode.spectator];
    }
}

export { DamageUtil };


class FirearmIdUtil {

    /**
     * 
     * @param {ItemStack} itemStack 
     * @returns {Number}
     */
    static getFirearmId(itemStack) {
        return Number(itemStack.getDynamicProperty(Global.ItemDynamicProperties.id));
    }

    
    /**
     * 
     * @param {Number} id 
     * @param {ContainerSlot} firearmContainerSlot 
     * @param {Number} ammoCount 
     */
    static initializeFirearmIdAndAmmo(id, firearmContainerSlot, ammoCount) {
        this.#addIdAndAmmoToContainerSlot(firearmContainerSlot, id, ammoCount);
        this.#addIdAndAmmoToWorld(id, ammoCount);
        //this.addIdAndAmmoToGlobalList(id, ammoCount);
    }

    /**
     * 
     * @param {number?} firearmId 
     * @returns {string}
     */
    static firearmIdToString(firearmId) {
        if(Number.isNaN(firearmId) || firearmId === null || firearmId === undefined) { return ""; }
        return "firearmId:"+firearmId.toString();
    }

    /**
     * 
     * @param {string} firearmIdString 
     * @returns {number?}
     */
    static firearmIdStringToNumber(firearmIdString) {
        if(!firearmIdString.startsWith("firearmId:")) { return null; }
        const firearmId = Number(firearmIdString.split(":")[1]);
        if(firearmId === null || Number.isNaN(firearmId) || firearmId === undefined) { return null; }
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
        if(firearmId === null || Number.isNaN(firearmId) || firearmId === undefined) { return false; }
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
    static #addIdAndAmmoToContainerSlot(containerSlot, id, ammoCount) {
        containerSlot.setDynamicProperty(Global.ItemDynamicProperties.id, id);
        containerSlot.setDynamicProperty(Global.ItemDynamicProperties.ammoCount, ammoCount);
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
        const magazineTag = String(firearmContainerSlot.getDynamicProperty(Global.ItemDynamicProperties.magazineTag));
        const isMagazineEmpty = Boolean(firearmContainerSlot.getDynamicProperty(Global.ItemDynamicProperties.isMagazineEmpty));
        if(magazineTag === null || magazineTag === undefined) { return; }
        const magazineName = this.#convertMagazineTagToName(magazineTag, isMagazineEmpty);
        //firearmContainerSlot.setLore([`§r§f${firearm.normalName}\n§r§7Magazine: ${magazineName}`]);
        firearmContainerSlot.nameTag = `§r§f${firearm.normalName}`;
        firearmContainerSlot.nameTag += `\n§r§7Magazine: ${magazineName}`;
        if(firearm instanceof GunWithAbility) {
            if(firearm.leftClickAbilityAttributes instanceof SwitchFiringModeAttributes) {
                let firingMode = firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentFiringMode);
                if(firingMode === undefined) {
                    firingMode = firearm.firingMode;
                }
                else if(firingMode === FiringModes.semi) {
                    firearmContainerSlot.nameTag += `\n§r§7Firing Mode: <§aSemi Auto§7>`;
                }
                else if(firingMode === FiringModes.auto) {
                    firearmContainerSlot.nameTag += `\n§r§7Firing Mode: <§aFull Auto§7>`;
                }
                else if(firingMode === FiringModes.burst) {
                    firearmContainerSlot.nameTag += `\n§r§7Firing Mode: <§aBurst§7>`;
                }
                else {
                    console.error(`undefined firing mode ${firingMode} in renewFirearmName()`);
                }
            }
            else if(firearm.leftClickAbilityAttributes instanceof SwitchScopeZoomAttributes) {
                const scopeZoom = firearmContainerSlot.getDynamicProperty(Global.ItemAbilityDynamicProperties.currentScopeZoom);
                if(scopeZoom === undefined) {
                    const zoomLevel = firearm.scopeAttributes.slowness;
                    firearmContainerSlot.nameTag += `\n§r§7Scope Zoom: <§aLevel ${zoomLevel}§7>`
                }
                else if(scopeZoom === 1) {
                    const zoomLevel = firearm.leftClickAbilityAttributes.defaultScopeAttributes.slowness;
                    firearmContainerSlot.nameTag += `\n§r§7Scope Zoom: <§aLevel ${zoomLevel}§7>`
                }
                else if(scopeZoom === 2) {
                    const zoomLevel = firearm.leftClickAbilityAttributes.alternateScopeAttributes.slowness;
                    firearmContainerSlot.nameTag += `\n§r§7Scope Zoom: <§aLevel ${zoomLevel}§7>`
                }
                else {
                    console.error(`undefined scope zoom level ${scopeZoom} in renewFirearmName()`);
                }
            }
            else {
                console.error(`undefined left click ability type ${typeof(firearm.leftClickAbilityAttributes)} in renewFirearmName()`);
            }
        }
        
    }

    /**
     * 
     * @param {string} magazineTag 
     * @param {boolean} isMagazineEmpty 
     * @returns {string}
     */
    static #convertMagazineTagToName(magazineTag, isMagazineEmpty) {
        if(magazineTag === MagazineTags.none) { return "§7<§cNone§r§7>"; }
        const ammoType = this.#convertMagazineTagToAmmoType(magazineTag);
        if(ammoType === null) { return "§7<§cNone§r§7>"; }
        let name = "";
        let numbers = magazineTag.match(/\d+/g);
        let ammoCount = 0;
        if(numbers) {
            ammoCount = Number(numbers[numbers.length-1]);
        }
        name += ammoCount.toString()+" ";
        for(const key of AmmoNames) {
            for(let i=0; i<key.Types.length; i++) {
                if(key.Types[i] === ammoType) {
                    name += key.Name;
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
        const parts = magazineTag.split(":")[1].split("_");
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
     * @param {string} magazineTag 
     * @returns {string?}
     */
    static #convertMagazineTagToAmmoType(magazineTag) {
        magazineTag = magazineTag.toLowerCase();
        for(const type in AmmoTypes) {
            const lowercaseType = type.toLowerCase();
            if(magazineTag.includes(lowercaseType)) {
                return type;
            }
        }
        console.error(`Could not convert magazineTag [${magazineTag}] to any AmmoType.`);
        return null;
    }

    /**
     * 
     * @param {ItemStack} magazineItemStack 
     * @param {Number} ammoCount 
     */
    static renewMagazineName(magazineItemStack, ammoCount) {
        if(magazineItemStack === undefined) { return; }
        const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
        if(magazineObject === null) { return; }
        const name = magazineObject.name;
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
    }
}

export { FirearmNameUtil };


class SoundsUtil {
    
    /**
     * 
     * @param {Player} fromPlayer 
     * @param {string} soundDefinition 
     * @param {import('@minecraft/server').Vector3} location 
     * @param {Number} maxDistance
     * @param {Number} maxVolume 
     * @param {Number} minPitch 
     * @param {Number} maxPitch 
     */
    static playSound(fromPlayer, soundDefinition, location, maxDistance, maxVolume, minPitch, maxPitch) {
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
            player.playSound(soundDefinition, {location: playLocation, volume: volume, pitch: NumberUtil.getRandomFloat(minPitch, maxPitch)});
        });
    }

    /**
     * 
     * @param {SoundTimeoutIdObject[]} SoundTimeoutIdObjects 
     * @param {string[]} [animationTypes] 
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
}

export { SoundsUtil };


class AnimationUtil {
    
    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {string} animationType - an AnimationTypes enum, from AnimationDefinition
     */
    static playAnimation(player, firearm, animationType) {
        let playedAnimation = false;
        firearm.animationsAttributes.forEach(attributes => {
            if(attributes.animation.type === animationType) {
                player.playAnimation(attributes.animation.animationDefiniton);
                playedAnimation = true;
            }
        })
        if(!playedAnimation) {
            console.warn(`animation ${animationType} was not found on firearm ${firearm.tag}`);
        }
    }

    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {string} animationType - an AnimationTypes enum, from AnimationDefinition
     * @param {Number} timeMultiplier
     * @param {Number} startDelay
     * @returns {SoundTimeoutIdObject[] | undefined} - returns an array of sound timeoutIds
     */
    static playAnimationWithSound(player, firearm, animationType, timeMultiplier = 1, startDelay = 0) {
        /**@type {SoundTimeoutIdObject[]} */
        let timeoutObjects = [];
        for(let attributes of firearm.animationsAttributes) {
            if(attributes.animation.type !== animationType) { continue; }

            if(startDelay <= 0) { player.playAnimation(attributes.animation.animationDefiniton); }
            else {
                const delayId = system.runTimeout(() => {
                    player.playAnimation(attributes.animation.animationDefiniton);
                }, startDelay);
                timeoutObjects.push(new SoundTimeoutIdObject(delayId, attributes.animation.type));
            }

            attributes.animation.animationSoundAttributes.forEach(sound => {
                const timeoutTime = Math.floor(sound.timeToPlayInTicks/timeMultiplier);
                const timeoutId = system.runTimeout(() => {
                    SoundsUtil.playSound(player, sound.soundDefinition, player.getHeadLocation(), sound.soundRange, 1, 0.9, 1.1);
                }, timeoutTime+startDelay);
                timeoutObjects.push(new SoundTimeoutIdObject(timeoutId, attributes.animation.type));
            });
            return timeoutObjects;
        }
        return undefined;
    }

    /**
     * 
     * @param {Player} player 
     * @param {Firearm} firearm 
     * @param {string} animationType - an AnimationTypes enum, from AnimationDefinition
     */
    static stopAllAnimationSounds(player, firearm, animationType) {
        for(let attributes of firearm.animationsAttributes) {
            if(attributes.animation.type !== animationType) { continue; }
            attributes.animation.animationSoundAttributes.forEach(sound => {
                player.runCommandAsync(`stopsound @s ${sound.soundDefinition}`);
            });
            return;
        }
    }
}
export { AnimationUtil };


class SettingsUtil {
    /**
     * 
     * @param {String} settingType - a settingsType enum
     * @returns {Number | undefined}
     */
    static getSettingsValue(settingType) {
        return world.scoreboard.getObjective("Settings")?.getScore(settingType);
    }

    
    /**
     * 
     * @param {String} settingType - a settingsType enum
     * @param {Number} value
     */
    static setSettingsValue(settingType, value) {
        world.scoreboard.getObjective("Settings")?.setScore(settingType, value);
    }
}

export { SettingsUtil };