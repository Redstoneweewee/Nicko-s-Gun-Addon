import { Magazine } from "./MagazineDefinition.js";
import { LeftClickAbilityAttribute, SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from "./LeftClickAbilityDefinition.js";
import { ItemStack } from "@minecraft/server";
import { FirearmAmmoClasses } from "../1Enums/AmmoEnums.js";
import * as Enums from "../1Enums/FirearmEnums.js"
import { MagazineClasses } from "../1Enums/MagazineEnums.js";
import { NormalAnimation } from "./AnimationDefinition.js";
import { NumRange } from "./GlobalDefinition.js";
class Firearm {
    /**
     * @param {{
     * itemTypeId:           string,
     * normalName:           string,
     * firingMode:           string,
     * firingRate:           number,
     * hasMagazineWhenEmpty: boolean,
     * manualAmmoEject:      boolean,
     * spreadDegrees:        NumRange,
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
        this.manualAmmoEject      = def.manualAmmoEject;
        this.spreadDegrees   = def.spreadDegrees;
        
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
     * @param {Firearm} def
     */
    constructor(def) {
        super(def);
    }
}

class TeslaGun extends Firearm {
    /**
     * @param {Firearm & {
     * damage: number,
     * range: number,
     * horizontalFov: number,
     * verticalFov: number,
     * }} def
     */
    constructor(def) {
        super(def);
        this.damage = def.damage;
        this.range = def.range;
        this.horizontalFov = def.horizontalFov;
        this.verticalFov = def.verticalFov;
    }
}


class MagazineAttribute {
    /**
     * @param {{
     * magazineClass:              typeof MagazineClasses[keyof typeof MagazineClasses],
     * usableAmmoClasses:          (typeof FirearmAmmoClasses[keyof typeof FirearmAmmoClasses])[],
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
     * camerashake: NumRange,
     * camerashakeRandomTime: NumRange,
     * }} def
     */
    constructor(def) {
        this.camerashake = def.camerashake;
        this.camerashakeRandomTime = def.camerashakeRandomTime;
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
     * damage:  NumRange,
     * dropOff: NumRange
     * }} def
     */
    constructor(def) {
        this.damage  = def.damage;
        this.dropOff = def.dropOff;
    }
}

export { Firearm, Gun, GunWithAbility, Explosive, TeslaGun, MagazineAttribute, ScopeAttribute, CamerashakeAttribute, RecoilAttribute, DamageDropoffAttribute };