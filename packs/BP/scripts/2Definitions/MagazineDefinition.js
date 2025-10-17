import { ItemStack } from "@minecraft/server"
import { FirearmAmmoClasses } from "../1Enums/AmmoEnums";
import * as Enums from "../1Enums/MagazineEnums"
import { TypeUtil } from "../UtilitiesInit";

class Magazine {
    /**
     * @param {{
     * itemTypeId:            typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds],
     * name:                  string,
     * magazineClass:         typeof Enums.MagazineClasses[keyof typeof Enums.MagazineClasses],
     * magazineType:          typeof Enums.MagazineTypes[keyof typeof Enums.MagazineTypes],
     * maxAmmo:               number,
     * itemStack:             ItemStack,
     * fillableByAmmoClasses: typeof FirearmAmmoClasses[keyof typeof FirearmAmmoClasses][]
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
        console.error(`getMagazineTypeIdEnum() failed: Magazine with itemTypeId ${this.itemTypeId} is not defined in MagazineTypeIds`);
        return;
    }
}

class ExplosiveMagazineAmmo extends Magazine {
    /**
     * @param {{
     * itemTypeId:            typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds],
     * name:                  string,
     * magazineClass:         typeof Enums.MagazineClasses[keyof typeof Enums.MagazineClasses],
     * magazineType:          typeof Enums.MagazineTypes[keyof typeof Enums.MagazineTypes],
     * maxAmmo:               number,
     * itemStack:             ItemStack,
     * fillableByAmmoClasses: typeof FirearmAmmoClasses[keyof typeof FirearmAmmoClasses][],
     * projectileAttribute:   ProjectileAttribute
     * }} def
     */
    constructor(def) {
        super(def);
        this.projectileAttribute = def.projectileAttribute;
    }
}

class ProjectileAttribute {
    /**
     * @param {{
     * explosiveDamage: ExplosiveDamage,
     * explosiveCamerashakes: ExplosiveCamerashakeAttribute[],
     * explosiveStun: ExplosiveStunAttribute,
     * typeId: string,
     * speed: number,
     * spawnOffset: import("@minecraft/server").Vector3,
     * shootDirectionOffset: import("@minecraft/server").Vector2
     * }} def
     */
    constructor(def) {
        this.explosiveDamage        = def.explosiveDamage;
        this.explosiveCamerashakes  = def.explosiveCamerashakes;
        this.explosiveStun          = def.explosiveStun;
        this.typeId                 = def.typeId;
        this.speed                  = def.speed;
        this.spawnOffset            = def.spawnOffset;
        this.shootDirectionOffset   = def.shootDirectionOffset;
    }
}


class ExplosiveDamage {
    /**
     * @param {{
     * maxDamage: number,
     * minDamage: number,
     * range: number
     * }} def 
     */
    constructor(def) {
        this.maxDamage = def.maxDamage;
        this.minDamage = def.minDamage;
        this.range     = def.range;
    }
}


class ExplosiveCamerashakeAttribute {
    /**
     * @param {{
     * intensity: number,
     * duration: number,
     * range: number
     * }} def
     */
    constructor(def) {
        this.intensity  = def.intensity;
        this.duration  = def.duration;
        this.range = def.range;
    }
}

class ExplosiveStunAttribute {
    /**
     * @param {{
     * minScreenDuration: number,
     * maxScreenDuration: number,
     * minAimRestrictionDuration: number,
     * maxAimRestrictionDuration: number,
     * minScreenDebrisDuration: number,
     * maxScreenDebrisDuration: number,
     * range: number
     * }} def
     */
    constructor(def) {
        this.minScreenDuration = def.minScreenDuration;
        this.maxScreenDuration = def.maxScreenDuration;
        this.minAimRestrictionDuration    = def.minAimRestrictionDuration;
        this.maxAimRestrictionDuration    = def.maxAimRestrictionDuration;
        this.minScreenDebrisDuration = def.minScreenDebrisDuration;
        this.maxScreenDebrisDuration = def.maxScreenDebrisDuration;
        this.range             = def.range;
    }
}

export { Magazine, ExplosiveMagazineAmmo, ProjectileAttribute, ExplosiveDamage, ExplosiveCamerashakeAttribute, ExplosiveStunAttribute };