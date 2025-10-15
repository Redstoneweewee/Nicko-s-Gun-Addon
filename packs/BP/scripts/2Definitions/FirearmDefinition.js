import { Magazine } from "./MagazineDefinition.js";
import { LeftClickAbilityAttribute, SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from "./LeftClickAbilityDefinition.js";
import { ItemStack } from "@minecraft/server";
import { AmmoClasses } from "../1Enums/AmmoEnums.js";
import * as Enums from "../1Enums/FirearmEnums.js"
import { MagazineClasses } from "../1Enums/MagazineEnums.js";
import { NormalAnimation } from "./AnimationDefinition.js";
class Firearm {
    /**
     * @param {{
     * itemTypeId:           string,
     * normalName:           string,
     * firingMode:           string,
     * firingRate:           number,
     * hasMagazineWhenEmpty: boolean,
     * manualAmmoEject:  boolean,
     * minSpreadDegrees:     number,
     * maxSpreadDegrees:     number,
     * magazineAttribute:    MagazineAttribute,
     * scopeAttribute:       ScopeAttribute,
     * recoilAttribute:      RecoilAttribute,
     * animationAttributes:  NormalAnimation[]
     * }} def
     */
    constructor(def) {
        this.itemTypeId           = def.itemTypeId;
        this.normalName           = def.normalName;
        this.firingMode           = def.firingMode;
        this.firingRate           = def.firingRate;
        this.hasMagazineWhenEmpty = def.hasMagazineWhenEmpty;
        this.manualAmmoEject  = def.manualAmmoEject;
        this.minSpreadDegrees     = def.minSpreadDegrees;
        this.maxSpreadDegrees     = def.maxSpreadDegrees;
        
        this.magazineAttribute   = def.magazineAttribute;
        this.scopeAttribute      = def.scopeAttribute;
        this.recoilAttribute     = def.recoilAttribute;
        this.animationAttributes = def.animationAttributes;
    }
}

class Gun extends Firearm {
    /**
     * @param {Firearm & {
     * bulletsPerShot:     number,
     * damageDropoff:      DamageDropoffAttribute,
     * headshotMultiplier: number,
     * pierce:             number,
     * knockbackAmount:    import("@minecraft/server").Vector2,
     * range:              number
     * }} def
     */
    constructor(def) {
        super(def);

        this.bulletsPerShot     = def.bulletsPerShot;
        this.damageDropoff      = def.damageDropoff;
        this.headshotMultiplier = def.headshotMultiplier;
        this.pierce             = def.pierce;
        this.knockbackAmount    = def.knockbackAmount;
        this.range              = def.range;
    }
}

class GunWithAbility extends Gun {
    /**
     * @param {Gun & {
     * leftClickAbilityAttribute: SwitchFiringModeAttribute | SwitchScopeZoomAttribute
     * }} def
     */
    constructor(def) {
        super(def);
        this.leftClickAbilityAttribute = def.leftClickAbilityAttribute;
    }
}

class Explosive extends Firearm {
    /**
     * @param {Firearm & {
     * projectileAttribute: ProjectileAttribute
     * }} def
     */
    constructor(def) {
        super(def);

        this.projectileAttribute  = def.projectileAttribute;
    }
}

class ProjectileAttribute {
    /**
     * @param {{
     * explosiveDamage: ExplosiveDamage,
     * typeId: string,
     * speed: number,
     * spawnOffset: import("@minecraft/server").Vector3,
     * shootDirectionOffset: import("@minecraft/server").Vector2
     * }} def
     */
    constructor(def) {
        this.explosiveDamage        = def.explosiveDamage;
        this.typeId                 = def.typeId;
        this.speed                  = def.speed;
        this.spawnOffset            = def.spawnOffset;
        this.shootDirectionOffset   = def.shootDirectionOffset;
    }
}

class MagazineAttribute {
    /**
     * @param {{
     * magazineClass:              typeof MagazineClasses[keyof typeof MagazineClasses],
     * usableAmmoClasses:          (typeof AmmoClasses[keyof typeof AmmoClasses])[],
     * maxMagazineItemStackAmount: number,
     * maxMagazineAmmoCount:       number,
     * maxAmmoPerReloadCount:      number,
     * maxEmptyAmmoPerReloadCount: number,
     * defaultMagazine:            Magazine
     * }} def
     */
    constructor(def) {
        this.magazineClass              = def.magazineClass;
        this.usableAmmoClasses          = def.usableAmmoClasses;
        this.maxMagazineItemStackAmount = def.maxMagazineItemStackAmount;
        this.maxMagazineAmmoCount       = def.maxMagazineAmmoCount;
        this.maxAmmoPerReloadCount      = def.maxAmmoPerReloadCount;
        this.maxEmptyAmmoPerReloadCount = def.maxEmptyAmmoPerReloadCount;
        this.defaultMagazine            = def.defaultMagazine;
    }
}


class ScopeAttribute {
    /**
     * @param {{
     * slowness: number,
     * speed: number,
     * recoilMultiplier: number,
     * stopAimOnCooldown: boolean,
     * stopAimDelay: number
     * }} def
     */
    constructor(def) {
        this.slowness          = def.slowness;
        this.speed             = def.speed;
        this.recoilMultiplier  = def.recoilMultiplier;
        this.stopAimOnCooldown = def.stopAimOnCooldown;
        this.stopAimDelay      = def.stopAimDelay;
    }
}


class CamerashakeAttribute {
    /**
     * @param {{
     * minCamerashake: number,
     * maxCamerashake: number,
     * minCamerashakeTime: number,
     * maxCamerashakeTime: number
     * }} def
     */
    constructor(def) {
        this.minCamerashake  = def.minCamerashake;
        this.maxCamerashake  = def.maxCamerashake;
        this.minCamerashakeTime = def.minCamerashakeTime;
        this.maxCamerashakeTime = def.maxCamerashakeTime;
    }
}



class RecoilAttribute {
    /**
     * @param {{
     * amountPerShot: number,
     * mainCamerashakeAttribute: CamerashakeAttribute,
     * residualCamerashakeAttribute: CamerashakeAttribute
     * }} def
     */
    constructor(def) {
        this.amountPerShot                = def.amountPerShot;
        this.mainCamerashakeAttribute     = def.mainCamerashakeAttribute;
        this.residualCamerashakeAttribute = def.residualCamerashakeAttribute;
    }
}

class DamageDropoffAttribute {
    /**
     * @param {{
     * minDamage:       number,
     * maxDamage:       number,
     * minDropOffRange: number,
     * maxDropOffRange: number
     * }} def
     */
    constructor(def) {
        this.minDamage       = def.minDamage;
        this.maxDamage       = def.maxDamage;
        this.minDropOffRange = def.minDropOffRange;
        this.maxDropOffRange = def.maxDropOffRange;
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

export { Firearm, Gun, GunWithAbility, Explosive, MagazineAttribute, ScopeAttribute, CamerashakeAttribute, RecoilAttribute, DamageDropoffAttribute, ProjectileAttribute, ExplosiveDamage };