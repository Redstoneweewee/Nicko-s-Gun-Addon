import { Magazine } from "./MagazineDefinition";
import { AnimationAttributes, ReloadAnimationAttributes } from "./AnimationDefinition.js";
import { LeftClickAbilityAttributes } from "./LeftClickAbilityDefinition.js";

class Firearm {
    /**
     * @param {string}           tag
     * @param {string}           normalName 
     * @param {string}           firingMode 
     * @param {Number}           firingRate 
     * @param {string}           ammoType 
     * @param {Magazine}         defaultMagazine 
     * @param {ScopeAttributes}  scopeAttributes 
     * @param {Number}           minSpreadDegrees
     * @param {Number}           maxSpreadDegrees
     * @param {MainRecoilAttributes} mainRecoilAttributes 
     * @param {RecoilAttributes} residualRecoilAttributes 
     * @param {AnimationAttributes[]} animationsAttributes
     */
    constructor(tag, normalName, firingMode, firingRate, 
                ammoType, defaultMagazine, scopeAttributes, 
                minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
                animationsAttributes) {
        this.tag              = tag;
        this.normalName       = normalName;
        this.firingMode       = firingMode;
        this.firingRate       = firingRate;
        
        this.ammoType        = ammoType;
        this.defaultMagazine = defaultMagazine;
        this.scopeAttributes = scopeAttributes;

        this.minSpreadDegrees         = minSpreadDegrees;
        this.maxSpreadDegrees         = maxSpreadDegrees;
        this.mainRecoilAttributes     = mainRecoilAttributes;
        this.residualRecoilAttributes = residualRecoilAttributes;

        this.animationsAttributes = animationsAttributes;
    }
}

class Gun extends Firearm {
    /**
     * @param {string}           tag
     * @param {string}           normalName 
     * @param {string}           firingMode 
     * @param {number}           firingRate 
     * @param {number}           bulletsPerShot 
     * @param {number}           normalBulletDamage
     * @param {number}           headshotBulletDamage
     * @param {number}           pierce 
     * @param {import("@minecraft/server").Vector2} knockbackAmount
     * @param {number}           range
     * @param {string}           ammoType 
     * @param {Magazine}         defaultMagazine 
     * @param {ScopeAttributes}  scopeAttributes 
     * @param {Number}           minSpreadDegrees
     * @param {Number}           maxSpreadDegrees
     * @param {MainRecoilAttributes} mainRecoilAttributes 
     * @param {RecoilAttributes} residualRecoilAttributes 
     * @param {AnimationAttributes[]} animationsAttributes
     */
    constructor(tag, normalName, firingMode, firingRate, bulletsPerShot, normalBulletDamage, headshotBulletDamage, pierce, knockbackAmount, range,
                ammoType, defaultMagazine, scopeAttributes, 
                minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
                animationsAttributes) {
        super(tag, normalName, firingMode, firingRate, 
              ammoType, defaultMagazine, scopeAttributes, 
              minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
              animationsAttributes);

        this.bulletsPerShot       = bulletsPerShot;
        this.normalBulletDamage   = normalBulletDamage;
        this.headshotBulletDamage = headshotBulletDamage;
        this.pierce               = pierce;
        this.knockbackAmount      = knockbackAmount;
        this.range                = range;
    }
}
class GunWithAbility extends Gun {
    /**
     * @param {string}           tag
     * @param {string}           normalName 
     * @param {string}           firingMode 
     * @param {number}           firingRate 
     * @param {number}           bulletsPerShot
     * @param {number}           normalBulletDamage
     * @param {number}           headshotBulletDamage
     * @param {number}           pierce 
     * @param {import("@minecraft/server").Vector2} knockbackAmount
     * @param {number}           range
     * @param {string}           ammoType 
     * @param {Magazine}         defaultMagazine 
     * @param {ScopeAttributes}  scopeAttributes 
     * @param {Number}           minSpreadDegrees
     * @param {Number}           maxSpreadDegrees
     * @param {MainRecoilAttributes} mainRecoilAttributes 
     * @param {RecoilAttributes} residualRecoilAttributes 
     * @param {AnimationAttributes[]} animationsAttributes
     * @param {LeftClickAbilityAttributes} leftClickAbilityAttributes
     */
    constructor(tag, normalName, firingMode, firingRate, bulletsPerShot, normalBulletDamage, headshotBulletDamage, pierce, knockbackAmount, range,
                ammoType, defaultMagazine, scopeAttributes, 
                minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
                animationsAttributes, leftClickAbilityAttributes) {
        super(tag, normalName, firingMode, firingRate, bulletsPerShot, normalBulletDamage, headshotBulletDamage, pierce, knockbackAmount, range,
              ammoType, defaultMagazine, scopeAttributes, 
              minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
              animationsAttributes)
        this.leftClickAbilityAttributes = leftClickAbilityAttributes;
    }
}

class Explosive extends Firearm {
    /**
     * @param {string}           tag
     * @param {string}           normalName 
     * @param {string}           firingMode 
     * @param {number}           firingRate 
     * @param {ExplosiveDamage}  explosiveDamage 
     * @param {string}           ammoType 
     * @param {Magazine}         defaultMagazine 
     * @param {ScopeAttributes}  scopeAttributes 
     * @param {Number}           minSpreadDegrees
     * @param {Number}           maxSpreadDegrees
     * @param {MainRecoilAttributes} mainRecoilAttributes 
     * @param {RecoilAttributes} residualRecoilAttributes 
     * @param {string}           projectile
     * @param {number}           projectileSpeed
     * @param {AnimationAttributes[]} animationsAttributes
     */
    constructor(tag, normalName, firingMode, firingRate, explosiveDamage,
                ammoType, defaultMagazine, scopeAttributes, 
                minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
                projectile, projectileSpeed, animationsAttributes) {
        super(tag, normalName, firingMode, firingRate, 
              ammoType, defaultMagazine, scopeAttributes, 
              minSpreadDegrees, maxSpreadDegrees, mainRecoilAttributes, residualRecoilAttributes,
              animationsAttributes);

        this.explosiveDamage           = explosiveDamage;
        this.projectile                = projectile;
        this.projectileSpeed           = projectileSpeed;
    }
}

const KnockbackAmounts = {
    veryLow:  { x: 0.1, y: 0.1 },
    low:      { x: 0.25, y: 0.13 },
    medium:   { x: 0.4, y: 0.2 },
    high:     { x: 0.5, y: 0.25 },
    veryHigh: { x: 0.7, y: 0.3 }
}

const FiringModes = {
    semi: "semi",
    auto: "auto",
    burst: "burst"
}

const AmmoTypes = {
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

const AmmoNames = {
    Round: {
        Name: "Round Magazine",
        Types: [ AmmoTypes.Sniper, AmmoTypes.Rifle, AmmoTypes.MarksmanRifle, AmmoTypes.Smg, AmmoTypes.Pistol, AmmoTypes.Minigun, AmmoTypes.P90 ]
    },
    Shell: {
        Name: "Shell Batch",
        Types: [ AmmoTypes.Shotgun ]
    },
    Rocket: {
        Name: "Rocket",
        Types: [ AmmoTypes.Rpg ]
    },
    Javelin: {
        Name: "Missile",
        Types: [ AmmoTypes.Javelin ]
    },
    Grenade: {
        Name: "Grenade Batch",
        Types: [ AmmoTypes.Mgl ]
    },

    [Symbol.iterator]: function* () {
        for (const key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] === "object") {
                yield { key, ...this[key] }; // Yield the key and object data
            }
        }
    }
}

class ScopeAttributes {
    /**
     * @param {number} slowness 
     * @param {number} speed 
     * @param {number} recoilMultiplier 
     * @param {boolean} stopAimOnCooldown
     */
    constructor(slowness, speed, recoilMultiplier, stopAimOnCooldown) {
        this.slowness        = slowness;
        this.speed           = speed;
        this.recoilMultiplier = recoilMultiplier;
        this.stopAimOnCooldown = stopAimOnCooldown;
    }
}

class RecoilAttributes {
    /**
     * 
     * @param {number} minCamerashake
     * @param {number} maxCamerashake
     * @param {number} minCamerashakeTime
     * @param {number} maxCamerashakeTime
     */
    constructor(minCamerashake, maxCamerashake, minCamerashakeTime, maxCamerashakeTime) {
        this.minCamerashake  = minCamerashake;
        this.maxCamerashake  = maxCamerashake;
        this.minCamerashakeTime = minCamerashakeTime;
        this.maxCamerashakeTime = maxCamerashakeTime;
    }
}

class MainRecoilAttributes extends RecoilAttributes {
    /**
     * 
     * @param {number} amountPerShot
     * @param {number} minCamerashake
     * @param {number} maxCamerashake
     * @param {number} minCamerashakeTime
     * @param {number} maxCamerashakeTime
     */
    constructor(amountPerShot, minCamerashake, maxCamerashake, minCamerashakeTime, maxCamerashakeTime) {
        super(minCamerashake, maxCamerashake, minCamerashakeTime, maxCamerashakeTime);
        this.amountPerShot   = amountPerShot;
    }
}

class ExplosiveDamage {
    /**
     * 
     * @param {number} maxDamage 
     * @param {number} lowDamage 
     * @param {number} range 
     */
    constructor(maxDamage, lowDamage, range) {
        this.maxDamage = maxDamage;
        this.lowDamage = lowDamage;
        this.range     = range;
    }
}

export { Firearm, Gun, GunWithAbility, Explosive, KnockbackAmounts, FiringModes, AmmoTypes, AmmoNames, ScopeAttributes, RecoilAttributes, MainRecoilAttributes };