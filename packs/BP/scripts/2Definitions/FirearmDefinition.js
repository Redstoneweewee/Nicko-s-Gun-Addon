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
     * tag:                 string,
     * normalName:          string,
     * firingMode:          string,
     * firingRate:          number,
     * minSpreadDegrees:    number,
     * maxSpreadDegrees:    number,
     * magazineAttribute:   MagazineAttribute,
     * scopeAttribute:      ScopeAttribute,
     * recoilAttribute:     RecoilAttribute,
     * animationAttributes: NormalAnimation[]
     * }} def
     */
    constructor(def) {
        this.tag              = def.tag;
        this.normalName       = def.normalName;
        this.firingMode       = def.firingMode;
        this.firingRate       = def.firingRate;
        this.minSpreadDegrees = def.minSpreadDegrees;
        this.maxSpreadDegrees = def.maxSpreadDegrees;
        
        this.magazineAttribute   = def.magazineAttribute;
        this.scopeAttribute      = def.scopeAttribute;
        this.recoilAttribute     = def.recoilAttribute;
        this.animationAttributes = def.animationAttributes;
    }
}

class Gun extends Firearm {
    /**
     * @param {Firearm & {
     * bulletsPerShot:       number,
     * normalBulletDamage:   number,
     * headshotBulletDamage: number,
     * pierce:               number,
     * knockbackAmount:      import("@minecraft/server").Vector2,
     * range:                number
     * }} def
     */
    constructor(def) {
        super(def);

        this.bulletsPerShot       = def.bulletsPerShot;
        this.normalBulletDamage   = def.normalBulletDamage;
        this.headshotBulletDamage = def.headshotBulletDamage;
        this.pierce               = def.pierce;
        this.knockbackAmount      = def.knockbackAmount;
        this.range                = def.range;
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
     * explosiveDamage: ExplosiveDamage,
     * projectileTypeId: string,
     * projectileSpeed: number
     * }} def
     */
    constructor(def) {
        super(def);

        this.explosiveDamage  = def.explosiveDamage;
        this.projectileTypeId = def.projectileTypeId;
        this.projectileSpeed  = def.projectileSpeed;
    }
}


class MagazineAttribute {
    /**
     * @param {{
     * magazineClass:              typeof MagazineClasses[keyof typeof MagazineClasses],
     * usableAmmoClasses:          (typeof AmmoClasses[keyof typeof AmmoClasses])[],
     * maxMagazineItemStackAmount: number,
     * maxMagazineAmmoCount:       number,
     * defaultMagazine:            Magazine
     * }} def
     */
    constructor(def) {
        this.magazineClass               = def.magazineClass;
        this.usableAmmoClasses          = def.usableAmmoClasses;
        this.maxMagazineItemStackAmount = def.maxMagazineItemStackAmount;
        this.maxMagazineAmmoCount       = def.maxMagazineAmmoCount;
        this.defaultMagazine            = def.defaultMagazine;
    }
}


class ScopeAttribute {
    /**
     * @param {{
     * slowness: number,
     * speed: number,
     * recoilMultiplier: number,
     * stopAimOnCooldown: boolean
     * }} def
     */
    constructor(def) {
        this.slowness          = def.slowness;
        this.speed             = def.speed;
        this.recoilMultiplier  = def.recoilMultiplier;
        this.stopAimOnCooldown = def.stopAimOnCooldown;
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

class ExplosiveDamage {
    /**
     * @param {{
     * maxDamage: number,
     * lowDamage: number,
     * range: number
     * }} def 
     */
    constructor(def) {
        this.maxDamage = def.maxDamage;
        this.lowDamage = def.lowDamage;
        this.range     = def.range;
    }
}

export { Firearm, Gun, GunWithAbility, Explosive, MagazineAttribute, ScopeAttribute, CamerashakeAttribute, RecoilAttribute, ExplosiveDamage };