import { ItemStack } from "@minecraft/server"
import { AmmoClasses } from "../1Enums/AmmoEnums";
import * as Enums from "../1Enums/MagazineEnums"
import { TypeUtil } from "../Utilities";

class Magazine {
    /**
     * @param {{
     * itemTypeId:            typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds],
     * name:                  string,
     * magazineClass:         typeof Enums.MagazineClasses[keyof typeof Enums.MagazineClasses],
     * magazineType:          typeof Enums.MagazineTypes[keyof typeof Enums.MagazineTypes],
     * maxAmmo:               number,
     * itemStack:             ItemStack,
     * fillableByAmmoClasses: typeof AmmoClasses[keyof typeof AmmoClasses][]
     * }} def
     */
    constructor(def) {
        this.itemTypeId            = def.itemTypeId;
        this.name                  = def.name;
        this.magazineClass         = def.magazineClass;
        this.magazineType          = def.magazineType;
        this.maxAmmo               = def.maxAmmo;
        this.itemStack             = def.itemStack;
        this.fillableByAmmoClasses = def.fillableByAmmoClasses;
    }
    
    /**
     * @returns {typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds]|undefined}
     */
    getMagazineTypeIdEnum() {
        for(const [, typeId] of TypeUtil.getIterable(Enums.MagazineTypeIds)) {
            if(typeId === this.itemTypeId) {
                return typeId;
            }
        }
        console.error(`getMagazineTypeIdEnum() failed: Magazine with tag ${this.itemTypeId} is not defined in MagazineTypeIds`);
        return;
    }
}


export { Magazine };