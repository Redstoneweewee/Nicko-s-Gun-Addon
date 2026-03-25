import { Global } from '../Global.js';
import * as Def from '../2Definitions/FirearmDefinition.js';
import * as Enums from "../1Enums/FirearmEnums.js"
import { SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from '../2Definitions/LeftClickAbilityDefinition.js';
import { MagazineObjects } from './MagazinesList.js';
import { BulletAmmoClasses, ShotgunAmmoClasses } from '../1Enums/AmmoEnums.js';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { LeftClickAbilityTypes } from '../1Enums/LeftClickAbilityEnums.js';
import { NormalAnimation, ScaledAnimation } from '../2Definitions/AnimationDefinition.js';
import { StaticReloadAnimations, StaticShootAnimations, StaticOtherAnimations } from './AnimationList.js';
import { TypeUtil } from '../UtilitiesInit.js';
import { NumRange } from '../2Definitions/GlobalDefinition.js';

/**
 * @enum {Def.Firearm}
 * @type {Record<keyof typeof Enums.FirearmTypeIds, Def.Firearm>}
 */
const FirearmObjects = {
    USP: new Def.Gun({
        itemTypeId:             "yes:usp",
        normalName:             "USP\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:             Enums.FiringModes.Semi,
        firingRate:             0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(10, 10),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 3,
        knockbackAmount:        Enums.KnockbackAmounts.VeryLow,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadSwap,
                scaleDurationToValue: 30
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadNoSwap,
                scaleDurationToValue: 15
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadCock,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.uspShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.uspShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Pistol,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 10,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      10,
            maxEmptyAmmoPerReloadCount: 10,
            defaultMagazine:        MagazineObjects.Ammo9MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.06),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    M92F: new Def.Gun({
        itemTypeId:                    "yes:m92f",
        normalName:             "M92F\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(13, 13),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.VeryLow,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadSwap,
                scaleDurationToValue: 40
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadNoSwap,
                scaleDurationToValue: 22
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadCock,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.m92fShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.m92fShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Pistol,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 15,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      15,
            maxEmptyAmmoPerReloadCount: 15,
            defaultMagazine:        MagazineObjects.Ammo9MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.06),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Luger: new Def.Gun({
        itemTypeId:             "yes:luger",
        normalName:             "Luger\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:             Enums.FiringModes.Semi,
        firingRate:             0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(14, 14),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.lugerReloadSwap,
                scaleDurationToValue: 32
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.lugerReloadNoSwap,
                scaleDurationToValue: 20
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.lugerReloadCock,
                scaleDurationToValue: 15
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.lugerShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.lugerShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Pistol,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 8,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      8,
            maxEmptyAmmoPerReloadCount: 8,
            defaultMagazine:        MagazineObjects.Ammo9MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.06),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Makarov: new Def.Gun({
        itemTypeId:                    "yes:makarov",
        normalName:             "Makarov\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(18, 18),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.Low,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadSwap,
                scaleDurationToValue: 30
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadNoSwap,
                scaleDurationToValue: 15
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.reloadCock,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.makarovShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.makarovShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Pistol,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 5,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      5,
            maxEmptyAmmoPerReloadCount: 5,
            defaultMagazine:        MagazineObjects.Ammo9MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.06),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Magnum: new Def.Gun({
        itemTypeId:                    "yes:magnum",
        normalName:             "Magnum Revolver\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(20, 20),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 4,
        knockbackAmount:        Enums.KnockbackAmounts.VeryHigh,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.magnumReload,
                scaleDurationToValue: 60
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.desertEagleShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.desertEagleShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Magnum,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 8,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      8,
            maxEmptyAmmoPerReloadCount: 8,
            defaultMagazine:        MagazineObjects.Ammo45ACP,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.06),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    MP5: new Def.Gun({
        itemTypeId:                    "yes:mp5",
        normalName:             "MP-5\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               900,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(6, 6),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 4,
        knockbackAmount:        Enums.KnockbackAmounts.VeryLow,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapPubg,
                scaleDurationToValue: 35
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapPubg,
                scaleDurationToValue: 18
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadCockPubg,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.smg.mp5Shoot})
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 30,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      30,
            maxEmptyAmmoPerReloadCount: 30,
            defaultMagazine:        MagazineObjects.Ammo762MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           2,
            speed:              13,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        spreadDegrees:     new NumRange(0.15, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.018, 0.05),
                camerashakeRandomTime:     new NumRange(0.08, 0.08)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Stg44: new Def.Gun({
        itemTypeId:                    "yes:stg44",
        normalName:             "StG 44\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               540,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(7, 7),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 2,
        knockbackAmount:        Enums.KnockbackAmounts.Medium,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.stg44ReloadSwap,
                scaleDurationToValue: 30
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.stg44ReloadNoSwap,
                scaleDurationToValue: 20
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.stg44ReloadCock,
                scaleDurationToValue: 15
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.stg44ShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.stg44ShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 30,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      30,
            maxEmptyAmmoPerReloadCount: 30,
            defaultMagazine:        MagazineObjects.Ammo762MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  false,
            stopAimDelay:       0
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.1, 0.16),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    M4: new Def.Gun({
        itemTypeId:                    "yes:m4",
        normalName:             "M4\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               480,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(10, 10),dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 2,
        knockbackAmount:        Enums.KnockbackAmounts.Low,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapPubg,
                scaleDurationToValue: 35
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapPubg,
                scaleDurationToValue: 18
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadCockPubg,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.m4Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 20,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      20,
            maxEmptyAmmoPerReloadCount: 20,
            defaultMagazine:        MagazineObjects.Ammo762MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           2,
            speed:              13,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false,
            stopAimDelay:       0
        }),
        
        spreadDegrees:     new NumRange(0.15, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.018, 0.05),
                camerashakeRandomTime:     new NumRange(0.08, 0.08)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Striker: new Def.Gun({
        itemTypeId:                    "yes:striker",
        normalName:             "Striker Shotgun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      false,
        alwaysEndCock:        true,
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               200,
        bulletsPerShot:         8,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:     new NumRange(1.5, 45),
            dropOff:     new NumRange(5, 10)
        }),
        headshotMultiplier:     2,
        pierce:                 5,
        knockbackAmount:        Enums.KnockbackAmounts.Medium,
        range:                  50,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.strikerReload,
                scaleDurationToValue: 13
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.strikerReloadOpenPort,
                scaleDurationToValue: 6
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.strikerReloadClosePort,
                scaleDurationToValue: 10
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.strikerShoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Shotgun,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 20,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Birdshot,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       0
        }),
        spreadDegrees:     new NumRange(3, 4.5),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.08),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    AGM: new Def.Gun({
        itemTypeId:                    "yes:agm",
        normalName:             "AGM Shotgun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      false,
        alwaysEndCock:        true,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         10,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:     new NumRange(5, 35),
            dropOff:     new NumRange(5, 10)
        }),
        headshotMultiplier:     2,
        pierce:                 4,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  50,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.agmReload,
                scaleDurationToValue: 15
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.agmReloadOpenCock,
                scaleDurationToValue: 6
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.agmReloadCock,
                scaleDurationToValue: 10
            }),
            new ScaledAnimation({
                staticAnimation: StaticShootAnimations.shotgun.agmShootWithAmmo,
                scaleDurationToValue: 20
            }), 
            new ScaledAnimation({
                staticAnimation: StaticShootAnimations.shotgun.agmShootOutOfAmmo,
                scaleDurationToValue: 20
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Shotgun,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 6,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Birdshot,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       2
        }),
        spreadDegrees:     new NumRange(2, 3),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.08),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Benelli: new Def.Gun({
        itemTypeId:                    "yes:benelli",
        normalName:             "Benelli Shotgun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         10,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:     new NumRange(20, 35),
            dropOff:     new NumRange(5, 10)
        }),
        headshotMultiplier:     2,
        pierce:                 3,
        knockbackAmount:        Enums.KnockbackAmounts.VeryHigh,
        range:                  50,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.shotgunReload,
                scaleDurationToValue: 15
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.benelliShoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Shotgun,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 10,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Birdshot,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  false,
            stopAimDelay:       0
        }),
        spreadDegrees:     new NumRange(1, 2),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.08),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Kar98: new Def.Gun({
        itemTypeId:                    "yes:kar98",
        normalName:             "Kar98\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      true,
        alwaysEndCock:        true,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            damage:  new NumRange(35, 35),
            dropOff: new NumRange(0, 0),
        }),
        headshotMultiplier: 2,
        pierce:                 3,
        knockbackAmount:        Enums.KnockbackAmounts.VeryHigh,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.kar98ReloadSwap,
                scaleDurationToValue: 18
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.kar98ReloadNoSwap,
                scaleDurationToValue: 33
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.kar98ReloadOpenCock,
                scaleDurationToValue: 20
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.kar98ReloadCock,
                scaleDurationToValue: 20
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.kar98ShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.kar98ShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 5,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 5,
            defaultMagazine:        MagazineObjects.Ammo762MM,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       4
        }),
        spreadDegrees: new NumRange(0.5, 1),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 40,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.1, 0.16),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    TeslaGun: new Def.TeslaGun({
        itemTypeId:             "yes:teslagun",
        normalName:             "Tesla Gun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:   false,
        manualAmmoEject:        false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        damage:                 30, 
        range:                 25, 
        knockbackAmount:       Enums.KnockbackAmounts.High,
        horizontalFov:         110,
        verticalFov:           80,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.other.teslaGunReload,
                scaleDurationToValue: 60
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.other.teslaGunShoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.TeslaGun,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:       3,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.TeslaAmmo,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       0
        }),
        spreadDegrees:     new NumRange(0.05, 0.15),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.08),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Natic: new Def.Explosive({
        itemTypeId:             "yes:natic",
        normalName:             "NATIC Grenade Launcher\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:   false,
        manualAmmoEject:        false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.other.naticReloadFirstAmmo,
                scaleDurationToValue: 30
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.other.naticReload,
                scaleDurationToValue: 20
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.other.naticShoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.GrenadeLauncher,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 6,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.ExplosiveGrenade,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  false,
            stopAimDelay:       0
        }),
        
        spreadDegrees:     new NumRange(0.05, 0.15),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.08),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
    Rpg7: new Def.Explosive({
        itemTypeId:             "yes:rpg7",
        normalName:             "RPG-7\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:   false,
        manualAmmoEject:        false,
        alwaysEndCock:        false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.other.rpg7ReloadSwap,
                scaleDurationToValue: 40
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.other.rpg7ReloadNoSwap,
                scaleDurationToValue: 40
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.other.rpg7Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Rocket,
            usableAmmoClasses:      [BulletAmmoClasses.Normal],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Rocket,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       0
        }),
        spreadDegrees:     new NumRange(0.05, 0.15),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake:     new NumRange(0.04, 0.08),
                camerashakeRandomTime: new NumRange(0.05, 0.05)
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                camerashake: new NumRange(0.0001, 0.0006),
                camerashakeRandomTime: new NumRange(4, 10)
            })
        })
    }),
}



for(const [type, typeId] of TypeUtil.getIterable(Enums.FirearmTypeIds)) {
    Global.firearms.set(typeId, FirearmObjects[type]);
}

console.log("Firearms initialized with no errors.");
