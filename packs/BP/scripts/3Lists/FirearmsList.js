import { Global } from '../Global.js';
import * as Def from '../2Definitions/FirearmDefinition.js';
import { AnimationAttribute, ReloadAnimationAttribute } from '../2Definitions/AnimationDefinition.js'
import { LeftClickAbilityTypes, SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from '../2Definitions/LeftClickAbilityDefinition.js';
import { MagazineObjects } from './MagazinesList.js';
import { LeftClickAbilityAnimations, ReloadAnimations, ShootAnimations } from "./AnimationList.js";
import { BulletClasses, ShotgunShellClasses } from '../1Enums/AmmoEnums.js';


/**
 * @typedef {{
 * ak47:         "yes:ak47",
 * akm:          "yes:akm",
 * m4a1:         "yes:m4a1",
 * ar15:         "yes:ar15",
 * hk417:        "yes:hk417",
 * mk13:         "yes:mk13",
 * p90:          "yes:p90",
 * ump45:        "yes:ump45",
 * desertEagle:  "yes:desert_eagle",
 * remington870: "yes:remington870"
 * }} FirearmTypeIdsDef
 */
/** @type {FirearmTypeIdsDef & Iterable<[keyof FirearmTypeIdsDef, FirearmTypeIdsDef[keyof FirearmTypeIdsDef]]>} */
const FirearmTypeIds = {
    ak47:         "yes:ak47",
    akm:          "yes:akm",
    m4a1:         "yes:m4a1",
    ar15:         "yes:ar15",
    hk417:        "yes:hk417",
    mk13:         "yes:mk13",
    p90:          "yes:p90",
    ump45:        "yes:ump45",
    desertEagle:  "yes:desert_eagle",
    remington870: "yes:remington870",

    /** @returns {Generator<[keyof FirearmTypeIdsDef, FirearmTypeIdsDef[keyof FirearmTypeIdsDef]]>} */
    [Symbol.iterator]: function* () {
        for (const key in this) {
            if (typeof this[key] !== "string") { continue; }
            yield /** @type {[keyof FirearmTypeIdsDef, FirearmTypeIdsDef[keyof FirearmTypeIdsDef]]} */ ([key, this[key]]);
        }
    }
}


var ak47Attribute = {
    tag:                    FirearmTypeIds.ak47,
    normalName:             "AK-47\n§7[Interact to shoot]",
    firingMode:             Def.FiringModes.auto,
    firingRate:             600,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     1.5,
    headshotBulletDamage:   10,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.medium,
    range:                  500,

    minSpreadDegrees:       0.2,
    maxSpreadDegrees:       0.8,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapMedium,   30),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapMedium, 15),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadCockLight,    8),
        new AnimationAttribute(ShootAnimations.rifle.ak47Shoot)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Rifle,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.exploding],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   30,
        defaultMagazine:        MagazineObjects.rifleMagazine30,
    },
    scopeAttribute: {
        slowness:           4,
        speed:              35,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 5,
        mainCamerashakeAttribute: {
            minCamerashake:     0.02,
            maxCamerashake:     0.04,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var akmAttribute = {
    tag:                    FirearmTypeIds.akm,
    normalName:             "AKM\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.auto,
    firingRate:               600,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     2,
    headshotBulletDamage:   12,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,

    minSpreadDegrees:       0.3,
    maxSpreadDegrees:       1,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapPubg,   35),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapPubg, 18),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadCockPubg,   8),
        new AnimationAttribute(ShootAnimations.rifle.akmShoot)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Rifle,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.armorPiercing],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   30,
        defaultMagazine:        MagazineObjects.rifleMagazine30,
    },
    scopeAttribute: {
        slowness:           2,
        speed:              13,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 8,
        mainCamerashakeAttribute: {
            minCamerashake:     0.025,
            maxCamerashake:     0.05,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}
var m4a1Attribute = {
    tag:                    FirearmTypeIds.m4a1,
    normalName:             "M4A1\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.auto,
    firingRate:               960,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     1,
    headshotBulletDamage:   9.5,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,

    minSpreadDegrees:       0.15,
    maxSpreadDegrees:       1,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapPubg,   35),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapPubg, 18),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadCockPubg,   8),
        new AnimationAttribute(ShootAnimations.rifle.m4a1Shoot1)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Rifle,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.armorPiercing, BulletClasses.antiMaterial],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   30,
        defaultMagazine:        MagazineObjects.rifleMagazine30,
    },
    scopeAttribute: {
        slowness:           2,
        speed:              13,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 8,
        mainCamerashakeAttribute: {
            minCamerashake:     0.018,
            maxCamerashake:     0.05,
            minCamerashakeTime: 0.08,
            maxCamerashakeTime: 0.08
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var ar15Attribute = {
    tag:                    FirearmTypeIds.ar15,
    normalName:             "AR-15\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.semi,
    firingRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     4,
    headshotBulletDamage:   20,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,

    minSpreadDegrees:       0.05,
    maxSpreadDegrees:       0.2,
    
    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapMedium,   38),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapMedium, 19),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadCockLight,    8),
        new AnimationAttribute(ShootAnimations.rifle.ar15Shoot)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.MarksmanRifle,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   15,
        defaultMagazine:        MagazineObjects.marksmanRifleMagazine15,
    },
    scopeAttribute: {
        slowness:           4,
        speed:              35,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 10,
        mainCamerashakeAttribute: {
            minCamerashake:     0.025,
            maxCamerashake:     0.07,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

/** @type {SwitchFiringModeAttribute} */
const hk417LeftClickAbilityAttribute = {
    leftClickAbilityType: LeftClickAbilityTypes.switchFiringMode,
    alternateFiringMode:  Def.FiringModes.auto,
    alternateFiringRate:  300
}
const hk417SwitchFiringModeAttribute = new SwitchFiringModeAttribute(hk417LeftClickAbilityAttribute);
var hk417Attribute = {
    leftClickAbilityAttribute: hk417SwitchFiringModeAttribute,
    tag:                    FirearmTypeIds.hk417,
    normalName:             "HK417\n§7[Interact to shoot]",
    firingMode:             Def.FiringModes.semi,
    firingRate:             0,
    bulletsPerShot:         1,
    normalBulletDamage:     5,
    headshotBulletDamage:   20,
    pierce:                 2,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,

    minSpreadDegrees:       0.1,
    maxSpreadDegrees:       0.8,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapHeavy,   38),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapHeavy, 19),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadCockHeavy,   8),
        new AnimationAttribute(ShootAnimations.rifle.hk417Shoot),
        new AnimationAttribute(LeftClickAbilityAnimations.switchFiringModeToSemi),
        new AnimationAttribute(LeftClickAbilityAnimations.switchFiringModeToAuto)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.MarksmanRifle,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.antiMaterial],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   15,
        defaultMagazine:        MagazineObjects.marksmanRifleMagazine15,
    },
    scopeAttribute: {
        slowness:           5,
        speed:              95,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 20,
        mainCamerashakeAttribute: {
            minCamerashake:     0.04,
            maxCamerashake:     0.08,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

/** @type {SwitchScopeZoomAttribute} */
const mk13LeftClickAbilityAttribute = {
    leftClickAbilityType: LeftClickAbilityTypes.switchScopeZoom,
    alternateScopeAttribute: {
        slowness:           9,
        speed:              0,
        recoilMultiplier:   0.5,
        stopAimOnCooldown: false
    }
}
const mk13SwitchScopeZoomAttribute = new SwitchScopeZoomAttribute(mk13LeftClickAbilityAttribute);
var mk13Attribute = {
    leftClickAbilityAttribute: mk13SwitchScopeZoomAttribute,
    tag:                    FirearmTypeIds.mk13,
    normalName:             "MK13\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.semi,
    firingRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     18,
    headshotBulletDamage:   40,
    pierce:                 3,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,

    minSpreadDegrees:       0,
    maxSpreadDegrees:       0,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapHeavy,   38),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapHeavy, 28),
        new ReloadAnimationAttribute(ReloadAnimations.sniper.sniperReloadCock, 12),
        new AnimationAttribute(ShootAnimations.sniper.mk13ShootWithAmmo), 
        new AnimationAttribute(ShootAnimations.sniper.mk13ShootOutOfAmmo), 
        new AnimationAttribute(LeftClickAbilityAnimations.switchScopeZoomToDefault),
        new AnimationAttribute(LeftClickAbilityAnimations.switchScopeZoomToAlternate)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Sniper,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.antiMaterial],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   3,
        defaultMagazine:        MagazineObjects.sniperMagazine3,
    },
    scopeAttribute: {
        slowness:           5,
        speed:              95,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 50,
        mainCamerashakeAttribute: {
            minCamerashake:     0.05,
            maxCamerashake:     0.08,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var p90Attribute = {
    tag:                    FirearmTypeIds.p90,
    normalName:             "P90\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.auto,
    firingRate:               1200,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     1,
    headshotBulletDamage:   6,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.low,
    range:                  500,

    minSpreadDegrees:       0.5,
    maxSpreadDegrees:       1.2,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.smg.p90ReloadSwap,   34),
        new ReloadAnimationAttribute(ReloadAnimations.smg.p90ReloadNoSwap, 17),
        new ReloadAnimationAttribute(ReloadAnimations.smg.p90ReloadCock,   8),
        new AnimationAttribute(ShootAnimations.smg.p90Shoot)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.P90,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.exploding],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   50,
        defaultMagazine:        MagazineObjects.p90Magazine50,
    },
    scopeAttribute: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 2,
        mainCamerashakeAttribute: {
            minCamerashake:     0.025,
            maxCamerashake:     0.04,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}
var ump45Attribute = {
    tag:                    FirearmTypeIds.ump45,
    normalName:             "UMP-45\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.auto,
    firingRate:               540,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     2,
    headshotBulletDamage:   8,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.medium,
    range:                  500,

    minSpreadDegrees:       0.3,
    maxSpreadDegrees:       0.8,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadSwapLight,   26),
        new ReloadAnimationAttribute(ReloadAnimations.rifle.reloadNoSwapLight, 13),
        new AnimationAttribute(ShootAnimations.smg.ump45Shoot)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Smg,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.armorPiercing],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   24,
        defaultMagazine:        MagazineObjects.smgMagazine24,
    },
    scopeAttribute: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 4,
        mainCamerashakeAttribute: {
            minCamerashake:     0.025,
            maxCamerashake:     0.06,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var desertEagleAttribute = {
    tag:                    FirearmTypeIds.desertEagle,
    normalName:             "Desert Eagle\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.semi,
    firingRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     4.5,
    headshotBulletDamage:   12,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,

    minSpreadDegrees:       0.5,
    maxSpreadDegrees:       1,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.pistol.reloadSwap,   30),
        new ReloadAnimationAttribute(ReloadAnimations.pistol.reloadNoSwap, 15),
        new ReloadAnimationAttribute(ReloadAnimations.pistol.reloadCock,   8),
        new AnimationAttribute(ShootAnimations.pistol.desertEagleShootWithAmmo),
        new AnimationAttribute(ShootAnimations.pistol.desertEagleShootOutOfAmmo)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Pistol,
        usableAmmoClasses:      [BulletClasses.normal, BulletClasses.antiMaterial, BulletClasses.exploding],
        maxMagazineItemStackAmount: 1,
        maxMagazineAmmoCount:   8,
        defaultMagazine:        MagazineObjects.pistolMagazine8,
    },
    scopeAttribute: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    recoilAttribute: {
        amountPerShot: 30,
        mainCamerashakeAttribute: {
            minCamerashake:     0.04,
            maxCamerashake:     0.06,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var remington870Attribute = {
    tag:                    FirearmTypeIds.remington870,
    normalName:             "Remington 870\n§7[Interact to shoot]",
    firingMode:               Def.FiringModes.semi,
    firingRate:               0,
    bulletsPerShot:         8,
    normalBulletDamage:     1,
    headshotBulletDamage:   3,
    pierce:                 3,
    knockbackAmount:        Def.KnockbackAmounts.veryHigh,
    range:                  300,

    minSpreadDegrees:       1,
    maxSpreadDegrees:       1.5,

    animationAttributes: [
        new ReloadAnimationAttribute(ReloadAnimations.shotgun.shotgunReload,     15),
        new ReloadAnimationAttribute(ReloadAnimations.shotgun.shotgunReloadCock, 8),
        new AnimationAttribute(ShootAnimations.shotgun.remington870ShootWithAmmo), 
        new AnimationAttribute(ShootAnimations.shotgun.remington870ShootOutOfAmmo)
    ],
    magazineAttribute: {
        magazineClass:           Def.MagazineClasses.Shotgun,
        usableAmmoClasses:      [ShotgunShellClasses.birdshot, ShotgunShellClasses.buckshot],
        maxMagazineItemStackAmount: 6,
        maxMagazineAmmoCount:   1,
        defaultMagazine:        MagazineObjects.shotgunShell,
    },
    scopeAttribute: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown:  false
    },
    recoilAttribute: {
        amountPerShot: 30,
        mainCamerashakeAttribute: {
            minCamerashake:     0.04,
            maxCamerashake:     0.08,
            minCamerashakeTime: 0.05,
            maxCamerashakeTime: 0.05
        },
        residualCamerashakeAttribute: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

const firearmsObject = {
    ak47:         new Def.Gun(ak47Attribute),
    akm:          new Def.Gun(akmAttribute),
    m4a1:         new Def.Gun(m4a1Attribute),
    ar15:         new Def.Gun(ar15Attribute),
    hk417:        new Def.GunWithAbility(hk417Attribute),
    mk13:         new Def.GunWithAbility(mk13Attribute),
    p90:          new Def.Gun(p90Attribute),
    ump45:        new Def.Gun(ump45Attribute),
    desertEagle:  new Def.Gun(desertEagleAttribute),
    remington870: new Def.Gun(remington870Attribute)
}



for(const pair of FirearmTypeIds) {
    Global.firearms.set(pair[1], firearmsObject[pair[0]]);
}



export { MagazineObjects, FirearmTypeIds };

console.log("Firearms initialized with no errors.");