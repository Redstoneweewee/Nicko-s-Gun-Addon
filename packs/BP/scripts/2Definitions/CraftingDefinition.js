
import { Player } from "@minecraft/server";
import { FormResponse } from "@minecraft/server-ui";
import * as Enums from "../1Enums/CraftingStateEnums"

class CraftingState {

    /**
     * @param {{
     * messageType: typeof Enums.CraftingMessageTypes[keyof typeof Enums.CraftingMessageTypes]
     * showForm:    (player: Player, craftingObject?: Crafting) => Promise<FormResponse>
     * onEnter?:    null | ((player: Player) => void)
     * onExit?:     null | ((player: Player) => void)
     * }} def
     */
    constructor(def) {
        this.messageType = def.messageType;
        this.showForm    = def.showForm;
        this.onEnter     = def.onEnter;
        this.onExit      = def.onExit;
    }
}


/**
 * @typedef {{
* itemTypeId: string,
* nameNormal: string,
* namePlural: string,
* imagePath:  string,
* hexIcon:    string
* }} CustomMaterialDef
*/

class CustomMaterial {
   /**
    * @param {CustomMaterialDef} def
    */
   constructor(def) {
       this.itemTypeId = def.itemTypeId;
       this.nameNormal = def.nameNormal;
       this.namePlural = def.namePlural;
       this.imagePath  = def.imagePath;
       this.hexIcon    = def.hexIcon;
   }
}

/**
 * @typedef {{
 * customMaterial: CustomMaterialDef,
 * amount:         number
 * }} CraftingItemDef
 */

class CraftingItem {
    /**
     * 
     * @param {CraftingItemDef} def
     */
    constructor(def) {
        this.itemTypeId = def.customMaterial.itemTypeId;
        this.nameNormal = def.customMaterial.nameNormal;
        this.namePlural = def.customMaterial.namePlural;
        this.imagePath  = def.customMaterial.imagePath;
        this.hexIcon    = def.customMaterial.hexIcon;
        this.amount     = def.amount;
    }
}

/**
 * @typedef {{
* itemTypeId:    string,
* name:          string,
* imagePath:     string,
* amount:        number,
* craftingItems: CraftingItem[]
* }} CraftingDef
*/

class Crafting {

    /**
     * @param {CraftingDef} def 
     */
    constructor(def) {
        this.itemTypeId    = def.itemTypeId;
        this.name          = def.name;
        this.imagePath     = def.imagePath;
        this.amount        = def.amount;
        this.craftingItems = def.craftingItems;
    }
}

export { CraftingState, CustomMaterial, CraftingItem, Crafting };