import { Magazine } from "./MagazineDefinition.js";
import { AnimationAttribute, ReloadAnimationAttribute } from "./AnimationDefinition.js";
import { LeftClickAbilityAttribute, LeftClickAbilityTypes, SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from "./LeftClickAbilityDefinition.js";
import { ItemStack } from "@minecraft/server";
import { AmmoClasses } from "../1Enums/AmmoEnums.js";

/**
 * @typedef {object} FirearmDef
 * @property {string}               tag
 * @property {string}               normalName 
 * @property {string}               firingMode 
 * @property {Number}               firingRate 
 * @property {Number}               minSpreadDegrees
 * @property {Number}               maxSpreadDegrees
 * @property {MagazineAttribute}    magazineAttribute
 * @property {ScopeAttribute}       scopeAttribute 
 * @property {RecoilAttribute}      recoilAttribute 
 * @property {AnimationAttribute[]} animationAttributes
 */
class Firearm {
    /**
     * @param {FirearmDef} def
     */
    constructor(def) {
        this.tag              = def.tag;
        this.normalName       = def.normalName;
        this.firingMode       = def.firingMode;
        this.firingRate       = def.firingRate;
        this.minSpreadDegrees = def.minSpreadDegrees;
        this.maxSpreadDegrees = def.maxSpreadDegrees;
        
        this.magazineAttribute    = def.magazineAttribute;
        this.scopeAttribute       = def.scopeAttribute;
        this.recoilAttribute      = def.recoilAttribute;
        this.animationAttributes = def.animationAttributes;
    }
}

/**
 * @typedef {FirearmDef & {
 * bulletsPerShot: number,
 * normalBulletDamage: number,
 * headshotBulletDamage: number,
 * pierce: number,
 * knockbackAmount: import("@minecraft/server").Vector2,
 * range: number
 * }} GunDef
 */
class Gun extends Firearm {
    /**
     * @param {GunDef} def
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

/**
 * @typedef {GunDef & {
 * leftClickAbilityAttribute: SwitchFiringModeAttribute | SwitchScopeZoomAttribute
 * }} GunWithAbilityDef
 */
class GunWithAbility extends Gun {
    /**
     * @param {GunWithAbilityDef} def
     */
    constructor(def) {
        super(def);
        this.leftClickAbilityAttribute = def.leftClickAbilityAttribute;
    }
}

/**
 * @typedef {FirearmDef & {
* explosiveDamage: ExplosiveDamage,
* projectileTypeId: string,
* projectileSpeed: number
* }} ExplosiveDef
*/
class Explosive extends Firearm {
    /**
     * @param {ExplosiveDef} def
     */
    constructor(def) {
        super(def);

        this.explosiveDamage  = def.explosiveDamage;
        this.projectileTypeId = def.projectileTypeId;
        this.projectileSpeed  = def.projectileSpeed;
    }
}

const KnockbackAmounts = {
    veryLow:  { x: 0.1, y: 0.1 },
    low:      { x: 0.25, y: 0.13 },
    medium:   { x: 0.4, y: 0.2 },
    high:     { x: 0.5, y: 0.25 },
    veryHigh: { x: 0.7, y: 0.3 }
}

/** 
 * @type {{
 * semi: "semi",
 * auto: "auto",
 * burst: "burst"
 * }} 
 */
const FiringModes = {
    semi: "semi",
    auto: "auto",
    burst: "burst"
}

/** 
 * @type {{
 * Sniper:        "Sniper",
 * Shotgun:       "Shotgun",
 * Rifle:         "Rifle",
 * MarksmanRifle: "MarksmanRifle",
 * Smg:           "Smg",
 * Pistol:        "Pistol",
 * P90:           "P90",
 * Rpg:           "Rpg",
 * Javelin:       "Javelin",
 * Minigun:       "Minigun",
 * Mgl:           "Mgl"
 * }} 
 */
const MagazineClasses = {
    Sniper:        "Sniper",
    Shotgun:       "Shotgun",
    Rifle:         "Rifle",
    MarksmanRifle: "MarksmanRifle",
    Smg:           "Smg",
    Pistol:        "Pistol",
    //specific weapons
    P90:           "P90",
    Rpg:           "Rpg",
    Javelin:       "Javelin",
    Minigun:       "Minigun",
    Mgl:           "Mgl"
}

const MagazineClassNames = {
    Round: {
        Name: "Round Magazine",
        Types: [ MagazineClasses.Sniper, MagazineClasses.Rifle, MagazineClasses.MarksmanRifle, MagazineClasses.Smg, MagazineClasses.Pistol, MagazineClasses.Minigun, MagazineClasses.P90 ]
    },
    Shell: {
        Name: "Shell Batch",
        Types: [ MagazineClasses.Shotgun ]
    },
    Rocket: {
        Name: "Rocket",
        Types: [ MagazineClasses.Rpg ]
    },
    Javelin: {
        Name: "Missile",
        Types: [ MagazineClasses.Javelin ]
    },
    Grenade: {
        Name: "Grenade Batch",
        Types: [ MagazineClasses.Mgl ]
    },

    [Symbol.iterator]: function* () {
        for (const key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] === "object") {
                yield { key, ...this[key] }; // Yield the key and object data
            }
        }
    }
}

/**
 * @typedef {object} MagazineAttributeDef
 * @property {keyof MagazineClasses} magazineClass 
 * @property {(typeof AmmoClasses[keyof typeof AmmoClasses])[]} usableAmmoClasses 
 * @property {number} maxMagazineItemStackAmount 
 * @property {number} maxMagazineAmmoCount
 * @property {Magazine} defaultMagazine
 */
class MagazineAttribute {
    /**
     * @param {MagazineAttributeDef} def
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

export { Firearm, Gun, GunWithAbility, Explosive, KnockbackAmounts, FiringModes, MagazineClasses, MagazineClassNames, MagazineAttribute, ScopeAttribute, CamerashakeAttribute, RecoilAttribute, ExplosiveDamage };