
import { Player } from "@minecraft/server";
import { FormResponse } from "@minecraft/server-ui";

class CraftingState {

    /**
     * @param {string} type 
     * @param {(player: Player, craftingObject?: Crafting) => Promise<FormResponse>} showForm
     * @param {null | ((player: Player) => void)} onEnter 
     * @param {null | ((player: Player) => void)} onExit 
     */
    constructor(type, showForm, onEnter = null, onExit = null) {
        this.type = type;
        this.showForm = showForm;
        this.onEnter = onEnter;
        this.onExit = onExit;
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