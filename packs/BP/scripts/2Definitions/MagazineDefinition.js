import { ItemStack } from "@minecraft/server"
import { MagazineClasses } from "./FirearmDefinition";
import { AmmoClasses } from "../1Enums/AmmoEnums";

/**
 * @typedef {object} MagazineTypesDef
 * @property {"stackBased"} stackBased
 * @property {"durabilityBased"} durabilityBased
 */
/** @type {MagazineTypesDef} */
const MagazineTypes = {
    stackBased: "stackBased",
    durabilityBased: "durabilityBased"
}
class Magazine {
    /**
     * 
     * @param {string} tag 
     * @param {string} name 
     * @param {string} magazineClass 
     * @param {keyof MagazineTypesDef} magazineType 
     * @param {number} maxAmmo 
     * @param {ItemStack} itemStack 
     * @param {typeof AmmoClasses[keyof typeof AmmoClasses][]} fillableByAmmoClasses
     */
    constructor(tag, name, magazineClass, magazineType, maxAmmo, itemStack, fillableByAmmoClasses) {
        this.tag        = tag;
        this.name       = name;
        this.magazineClass   = magazineClass;
        this.magazineType = magazineType;
        this.maxAmmo    = maxAmmo;
        this.itemStack  = itemStack;
        this.fillableByAmmoClasses = fillableByAmmoClasses;
    }
    
    ///**
    // * @returns {import("../3Lists/MagazinesList").MagazineTagsDef[keyof import("../3Lists/MagazinesList").MagazineTagsDef]|undefined}
    // */
    //getMagazineTagEnum() {
    //    for(const pair of MagazineTags) {
    //        if(pair[1] === this.tag) {
    //            return pair[1];
    //        }
    //    }
    //    console.error(`getMagazineTagEnum() failed: Magazine with tag ${this.tag} is not defined in MagazineTags`);
    //    return;
    //}
}


export { Magazine, MagazineTypes };