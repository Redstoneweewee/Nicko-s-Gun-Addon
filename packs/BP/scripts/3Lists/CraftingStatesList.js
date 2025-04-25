import { Player } from "@minecraft/server";
import * as Def from "../2Definitions/CraftingDefinition.js";
import { FirearmCraftingObjects, CustomMaterials, MagazineCraftingObjects, AmmunitionCraftingObjects } from "./CraftingList.js";
import { Global } from "../Global.js";
import * as ui from "@minecraft/server-ui";
import { CraftingUtil, SoundsUtil, StringUtil } from "../Utilities.js";
import * as Enums from "../1Enums/CraftingStateEnums.js"


/** @type {Record<string, Def.CraftingState>} */
const CraftingStatesList = {
    SelectorCraftingState:   new Def.CraftingState(Enums.CraftingMessageTypes.Selector, showSelectorForm),
    FirearmCraftingState:    new Def.CraftingState(Enums.CraftingMessageTypes.Firearm, showFirearmsForm),
    MagazineCraftingState:   new Def.CraftingState(Enums.CraftingMessageTypes.Magazine, showMagazinesForm),
    AmmunitionCraftingState: new Def.CraftingState(Enums.CraftingMessageTypes.Ammunition, showAmmunitionForm),
    ConfirmCraftingState:    new Def.CraftingState(Enums.CraftingMessageTypes.Confirm, showConfirmationForm),
}





// ----------------------- SelectorCraftingForm -----------------------
const selectorTitle = `§j§l<§r§jSimple Arsenal§l> §r§jCrafting:`;
const selectorForm = new ui.ActionFormData().title(selectorTitle);

selectorForm.button(`§0> §rCraft Firearms! §0<`, "textures/scripting_ui/misc/firearm_crafting");
selectorForm.button(`§0> §rCraft Magazines! §0<`, "textures/scripting_ui/misc/magazine_crafting");
selectorForm.button(`§0> §rCraft Ammunition! §0<`, "textures/scripting_ui/misc/ammunition_crafting");

// ---------------------------------------------------------------------


// ----------------------- FirearmCraftingForm -----------------------
const firearmTitle = `§jCraft Firearms:`;
const firearmForm = new ui.ActionFormData().title(firearmTitle);

for(const object of FirearmCraftingObjects) {
    let text = `§0> §j${object.name} §0<`;
    //let text = `§0> §j${object.name} §0<\n§7Cost: [`;
    //for(const craftingItem of object.craftingItems) {
    //    text += `§8${craftingItem.amount}${craftingItem.hexIcon} `;
    //}
    //text = text.substring(0, text.length-1) + "§7]";
    firearmForm.button(text, object.imagePath);
};
// ---------------------------------------------------------------------


// ----------------------- MagazineCraftingForm -----------------------
const magazineTitle = `§jCraft Magazines:`;
const magazineForm = new ui.ActionFormData().title(magazineTitle);

for(const object of MagazineCraftingObjects) {
    let text = `§r${object.name}`;
    magazineForm.button(text, object.imagePath);
};
// ---------------------------------------------------------------------

// ----------------------- AmmunitionCraftingForm -----------------------
const ammunitionTitle = `§jCraft Ammunition:`;
const ammunitionForm = new ui.ActionFormData().title(ammunitionTitle);

for(const object of AmmunitionCraftingObjects) {
    let text = `§r${object.name}`;
    ammunitionForm.button(text, object.imagePath);
};
// ---------------------------------------------------------------------





/**
 * Shows a selector form to the player and returns the response asynchronously.
 * @param {Player} player 
 * @returns {Promise<ui.ActionFormResponse>}
 */
function showSelectorForm(player) {
    if(CraftingStatesList.SelectorCraftingState.onEnter) {
        CraftingStatesList.SelectorCraftingState.onEnter(player);
    }
    return selectorForm.show(player).then(response => {
        if(CraftingStatesList.SelectorCraftingState.onExit) {
            CraftingStatesList.SelectorCraftingState.onExit(player);
        }
        return response;
    });
}


/**
 * Shows a selector form to the player and returns the response asynchronously.
 * @param {Player} player 
 * @returns {Promise<ui.ActionFormResponse>}
 */
function showFirearmsForm(player) {
    if(CraftingStatesList.FirearmCraftingState.onEnter) {
        CraftingStatesList.FirearmCraftingState.onEnter(player);
    }
    return firearmForm.show(player).then(response => {
        if(CraftingStatesList.FirearmCraftingState.onExit) {
            CraftingStatesList.FirearmCraftingState.onExit(player);
        }
        return response;
    });
}


/**
 * Shows a selector form to the player and returns the response asynchronously.
 * @param {Player} player 
 * @returns {Promise<ui.ActionFormResponse>}
 */
function showMagazinesForm(player) {
    if(CraftingStatesList.MagazineCraftingState.onEnter) {
        CraftingStatesList.MagazineCraftingState.onEnter(player);
    }
    return magazineForm.show(player).then(response => {
        if(CraftingStatesList.MagazineCraftingState.onExit) {
            CraftingStatesList.MagazineCraftingState.onExit(player);
        }
        return response;
    });
}

/**
 * Shows a selector form to the player and returns the response asynchronously.
 * @param {Player} player 
 * @returns {Promise<ui.ActionFormResponse>}
 */
function showAmmunitionForm(player) {
    if(CraftingStatesList.AmmunitionCraftingState.onEnter) {
        CraftingStatesList.AmmunitionCraftingState.onEnter(player);
    }
    return ammunitionForm.show(player).then(response => {
        if(CraftingStatesList.AmmunitionCraftingState.onExit) {
            CraftingStatesList.AmmunitionCraftingState.onExit(player);
        }
        return response;
    });
}


/**
 * Represents a collection of material counts in the player's inventory.
 * @typedef {Object} MaterialCounts
 * @property {number} polishedWoodPlate - Count of polished wood plates.
 * @property {number} plasticSheet - Count of plastic sheets.
 * @property {number} kevlarSheet - Count of kevlar sheets.
 * @property {number} aluminumIngot - Count of aluminum ingots.
 * @property {number} steelIngot - Count of steel ingots.
 * @property {number} titaniumIngot - Count of titanium ingots.
 * @property {number} copperIngot - Count of copper ingots.
 * @property {number} gunpowder - Count of gunpowder.
 * @property {number} ironIngot - Count of iron ingots.
 * @property {number} bullet - Count of bullets.
 * @property {number} shotgunShell - Count of shotgun shells.
 */
/**
 * Shows a selector form to the player and returns the response asynchronously.
 * @param {Player} player 
 * @param {Def.Crafting|undefined} crafingObject 
 * @returns {Promise<ui.ActionFormResponse>}
 */
function showConfirmationForm(player, crafingObject) {
    if(CraftingStatesList.ConfirmCraftingState.onEnter) {
        CraftingStatesList.ConfirmCraftingState.onEnter(player);
    }

    const confirmTitle = `§jCraft ${crafingObject?.name}:`;
    const confirmForm = new ui.ActionFormData().title(confirmTitle);


    /** @type {MaterialCounts & Iterable<[string, number]>} */
    const counts = {
        polishedWoodPlate: CraftingUtil.getItemCountInInventory(player, CustomMaterials.polishedWoodPlate.itemTypeId),
        plasticSheet: CraftingUtil.getItemCountInInventory(player, CustomMaterials.plasticSheet.itemTypeId),
        kevlarSheet: CraftingUtil.getItemCountInInventory(player, CustomMaterials.kevlarSheet.itemTypeId),
        aluminumIngot: CraftingUtil.getItemCountInInventory(player, CustomMaterials.aluminumIngot.itemTypeId),
        steelIngot: CraftingUtil.getItemCountInInventory(player, CustomMaterials.steelIngot.itemTypeId),
        titaniumIngot: CraftingUtil.getItemCountInInventory(player, CustomMaterials.titaniumIngot.itemTypeId),

        copperIngot: CraftingUtil.getItemCountInInventory(player, CustomMaterials.copperIngot.itemTypeId),
        gunpowder: CraftingUtil.getItemCountInInventory(player, CustomMaterials.gunpowder.itemTypeId),
        ironIngot: CraftingUtil.getItemCountInInventory(player, CustomMaterials.ironIngot.itemTypeId),

        bullet: CraftingUtil.getItemCountInInventory(player, CustomMaterials.bullet.itemTypeId),
        shotgunShell: CraftingUtil.getItemCountInInventory(player, CustomMaterials.shotgunShell.itemTypeId),
        
        [Symbol.iterator]() {
            return Object.entries(this)[Symbol.iterator]();
        }
    };
    const invAmount = centerInventoryMaterialText(counts);
    let bodyText = 
    `§r                   You have:\n`+
    `§8---------------------------------§r\n`+
    `${invAmount}\n\n`+
    `Materials needed:\n\n`;

    const obj = getMaterialsNeeded(crafingObject, counts);
    bodyText += obj.text;
    bodyText += "\n";
    confirmForm.body(bodyText);

    if(obj.canCraft) {
        confirmForm.button(`§qCraft ${StringUtil.reformat(crafingObject?.name, '§q', true)}!`);
    }
    else {
        confirmForm.button("§mYou don't have enough materials!");
    }


    return confirmForm.show(player).then(response => {
        if(CraftingStatesList.ConfirmCraftingState.onExit) {
            CraftingStatesList.ConfirmCraftingState.onExit(player);
        }
        if(!response.canceled) {
            if(obj.canCraft && CraftingUtil.craftItem(player, crafingObject)) {
                player.sendMessage(`§aYou successfully crafted ${StringUtil.reformat(crafingObject?.name, '§a', true)}!`);
                player.playSound("random.anvil_use");
            }
            else {
                player.sendMessage(`§cYou don't have enough materials to craft ${StringUtil.reformat(crafingObject?.name, '§c', true)}!`);
                SoundsUtil.playErrorSound(player);
            }
        }
        return response;
    });
}

/**
 * 
 * @param {MaterialCounts & Iterable<[string, number]>} counts 
 * @return {string}
 */
function centerInventoryMaterialText(counts) {

    let numsLength = "";
    let index = 0;
    for(const n of counts) {
        if(index <= 5) { numsLength += n[1]; }
        else { break; }
        index++;
    }
    const offset = Math.trunc((numsLength.length-6)*1.5);
    
    /**
     * 3 spaces = 2 numbers
     * 14 spaces total with all 0's, 6 left, 5 right
     */
    let left = "      ";
    let right = "     ";
    for(let i=0; i<offset; i++) {
        if(i % 2 == 0) { left = left.substring(1); }
        else           { right = right.substring(1); }
    }
    return `§r${left}${counts.polishedWoodPlate}${CustomMaterials.polishedWoodPlate.hexIcon} `+
                    `${counts.plasticSheet}${CustomMaterials.plasticSheet.hexIcon} `+
                    `${counts.kevlarSheet}${CustomMaterials.kevlarSheet.hexIcon} `+
                    `${counts.aluminumIngot}${CustomMaterials.aluminumIngot.hexIcon} `+
                    `${counts.steelIngot}${CustomMaterials.steelIngot.hexIcon} `+
                    `${counts.titaniumIngot}${CustomMaterials.titaniumIngot.hexIcon}${right}§r`;
}


/**
 * @param {Def.Crafting|undefined} crafingObject 
 * @param {MaterialCounts & Iterable<[string, number]>} counts 
 * @return {{ text: string, canCraft: boolean }}
 */
function getMaterialsNeeded(crafingObject, counts) {
    if(crafingObject === undefined) { return {text: "undefined", canCraft: false}}
    let output = "";
    let enough = "§a";
    let missing = "§c";
    let canCraft = true;

    for(const craftingitem of crafingObject.craftingItems) {
        output += `§7§l· §r`;
        switch(craftingitem.itemTypeId) {
            case "yes:polished_wood_plate":
                if(counts.polishedWoodPlate >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.polishedWoodPlate.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.polishedWoodPlate.nameNormal : CustomMaterials.polishedWoodPlate.namePlural) + "\n";
                break;
                
            case "yes:plastic_sheet":
                if(counts.plasticSheet >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.plasticSheet.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.plasticSheet.nameNormal : CustomMaterials.plasticSheet.namePlural) + "\n";
                break;
                
            case "yes:kevlar_sheet":
                if(counts.kevlarSheet >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.kevlarSheet.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.kevlarSheet.nameNormal : CustomMaterials.kevlarSheet.namePlural) + "\n";
                break;
                
            case "yes:aluminum_ingot":
                if(counts.aluminumIngot >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.aluminumIngot.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.aluminumIngot.nameNormal : CustomMaterials.aluminumIngot.namePlural) + "\n";
                break;
                
            case "yes:steel_ingot":
                if(counts.steelIngot >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.steelIngot.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.steelIngot.nameNormal : CustomMaterials.steelIngot.namePlural) + "\n";
                break;
                
            case "yes:titanium_ingot":
                if(counts.titaniumIngot >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.titaniumIngot.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.titaniumIngot.nameNormal : CustomMaterials.titaniumIngot.namePlural) + "\n";
                break;



            case "minecraft:copper_ingot":
                if(counts.copperIngot >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.copperIngot.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.copperIngot.nameNormal : CustomMaterials.copperIngot.namePlural) + "\n";
                break;
                    
            case "minecraft:gunpowder":
                if(counts.gunpowder >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.gunpowder.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.gunpowder.nameNormal : CustomMaterials.gunpowder.namePlural) + "\n";
                break;
                
            case "minecraft:iron_ingot":
                if(counts.ironIngot >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.ironIngot.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.ironIngot.nameNormal : CustomMaterials.ironIngot.namePlural) + "\n";
                break;



            case "yes:bullet":
                if(counts.bullet >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.bullet.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.bullet.nameNormal : CustomMaterials.bullet.namePlural) + "\n";
                break;

            case "yes:shotgun_shell":
                if(counts.shotgunShell >= craftingitem.amount) { output += enough; }
                else { output += missing; canCraft = false; }
                output += `${craftingitem.amount} ${CustomMaterials.shotgunShell.hexIcon} §r` + (craftingitem.amount <= 1 ? CustomMaterials.shotgunShell.nameNormal : CustomMaterials.shotgunShell.namePlural) + "\n";
                break;

            default:
                console.error(`undefined crafting material in CraftingStatesList -> getMaterialsNeeded(): ${craftingitem.itemTypeId}`);
                canCraft = false;
        }
    }
    return {text: output, canCraft: canCraft};
}
    



export { CraftingStatesList };
