import { Global } from '../Global.js';
import * as Def from '../2Definitions/FirearmDefinition.js';
import * as Enums from "../1Enums/FirearmEnums.js"
import { SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from '../2Definitions/LeftClickAbilityDefinition.js';
import { MagazineObjects } from './MagazinesList.js';
import { BulletClasses, Ammo12GaugeClasses } from '../1Enums/AmmoEnums.js';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { LeftClickAbilityTypes } from '../1Enums/LeftClickAbilityEnums.js';
import { NormalAnimation, ScaledAnimation } from '../2Definitions/AnimationDefinition.js';
import { StaticReloadAnimations, StaticShootAnimations, StaticOtherAnimations } from './AnimationList.js';
import { TypeUtil } from '../UtilitiesInit.js';

/**
 * @enum {Def.Firearm}
 * @type {Record<keyof typeof Enums.FirearmTypeIds, Def.Firearm>}
 */
const FirearmObjects = {
    /*
    ak47: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.ak47,
        normalName:             "AK-47\n§7[Interact to shoot]",
        firingMode:             Enums.FiringModes.Auto,
        firingRate:             600,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        normalBulletDamage:     1.5,
        headshotBulletDamage:   10,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.Medium,
        range:                  500,
    
        minSpreadDegrees:       0.2,
        maxSpreadDegrees:       0.8,
    
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapMedium,
                scaleDurationToValue: 30
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapMedium,
                scaleDurationToValue: 15
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadCockLight,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.ak47Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.Exploding],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   30,
            defaultMagazine:        MagazineObjects.ARMagazine30,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           4,
            speed:              35,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 5,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.02,
                maxCamerashake:     0.04,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    AKM: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.AKM,
        normalName:             "AKM\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               600,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        normalBulletDamage:     2,
        headshotBulletDamage:   12,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,
    
        minSpreadDegrees:       0.3,
        maxSpreadDegrees:       1,
    
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
                staticAnimation: StaticShootAnimations.ar.akmShoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.ArmorPiercing],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   30,
            defaultMagazine:        MagazineObjects.ARMagazine30,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           2,
            speed:              13,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.025,
                maxCamerashake:     0.05,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    M4A1: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.M4A1,
        normalName:             "M4A1\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               960,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        normalBulletDamage:     1,
        headshotBulletDamage:   9.5,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,
    
        minSpreadDegrees:       0.15,
        maxSpreadDegrees:       1,
    
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
                staticAnimation: StaticShootAnimations.ar.m4a1Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.AR,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   30,
            defaultMagazine:        MagazineObjects.ARMagazine30,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           2,
            speed:              13,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.018,
                maxCamerashake:     0.05,
                minCamerashakeTime: 0.08,
                maxCamerashakeTime: 0.08
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    AR15: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.AR15,
        normalName:             "AR-15\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        normalBulletDamage:     4,
        headshotBulletDamage:   20,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,
    
        minSpreadDegrees:       0.05,
        maxSpreadDegrees:       0.2,
        
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapMedium,
                scaleDurationToValue: 38
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapMedium,
                scaleDurationToValue: 19
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadCockLight,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.ar15Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.DMR,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   15,
            defaultMagazine:        MagazineObjects.DMRMagazine15,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           4,
            speed:              35,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 10,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.025,
                maxCamerashake:     0.07,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    HK417: new Def.GunWithAbility({
        leftClickAbilityAttribute: new SwitchFiringModeAttribute({
            leftClickAbilityType: LeftClickAbilityTypes.SwitchFiringMode,
            alternateFiringMode:  Enums.FiringModes.Auto,
            alternateFiringRate:  300
        }),
        itemTypeId:             Enums.FirearmTypeIds.HK417,
        normalName:             "HK417\n§7[Interact to shoot]",
        firingMode:             Enums.FiringModes.Semi,
        firingRate:             0,
        bulletsPerShot:         1,
        normalBulletDamage:     5,
        headshotBulletDamage:   20,
        pierce:                 2,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,

        minSpreadDegrees:       0.1,
        maxSpreadDegrees:       0.8,

        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapHeavy,
                scaleDurationToValue: 38
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapHeavy,
                scaleDurationToValue: 19
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadCockHeavy,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.ar.hk417Shoot
            }),
            new NormalAnimation({
                staticAnimation: StaticOtherAnimations.switchFiringModeToSemi
            }),
            new NormalAnimation({
                staticAnimation: StaticOtherAnimations.switchFiringModeToAuto
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.DMR,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.AntiMaterial],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   15,
            defaultMagazine:        MagazineObjects.DMRMagazine15,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           5,
            speed:              95,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 20,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.08,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    MK13: new Def.GunWithAbility({
        leftClickAbilityAttribute: new SwitchScopeZoomAttribute({
            leftClickAbilityType: LeftClickAbilityTypes.SwitchScopeZoom,
            alternateScopeAttribute: new Def.ScopeAttribute({
                slowness:           9,
                speed:              0,
                recoilMultiplier:   0.5,
                stopAimOnCooldown: false
            })
        }),
        itemTypeId:             Enums.FirearmTypeIds.MK13,
        normalName:             "MK13\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        normalBulletDamage:     18,
        headshotBulletDamage:   40,
        pierce:                 3,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,

        minSpreadDegrees:       0,
        maxSpreadDegrees:       0,

        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapHeavy,
                scaleDurationToValue: 38
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapHeavy,
                scaleDurationToValue: 28
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.sniper.sniperReloadCock,
                scaleDurationToValue: 12
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.sniper.mk13ShootWithAmmo
            }), 
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.sniper.mk13ShootOutOfAmmo
            }), 
            new NormalAnimation({
                staticAnimation: StaticOtherAnimations.switchScopeZoomToDefault
            }),
            new NormalAnimation({
                staticAnimation: StaticOtherAnimations.switchScopeZoomToAlternate
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Sniper,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.AntiMaterial],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   3,
            defaultMagazine:        MagazineObjects.SniperMagazine3,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           5,
            speed:              95,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 50,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.05,
                maxCamerashake:     0.08,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    P90: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.P90,
        normalName:             "P90\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               1200,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        normalBulletDamage:     1,
        headshotBulletDamage:   6,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.Low,
        range:                  500,
    
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1.2,
    
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.smg.p90ReloadSwap,
                scaleDurationToValue: 34
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.smg.p90ReloadNoSwap,
                scaleDurationToValue: 17
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.smg.p90ReloadCock,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.smg.p90Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.P90,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.Exploding],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   50,
            defaultMagazine:        MagazineObjects.P90Magazine50,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 2,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.025,
                maxCamerashake:     0.04,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    UMP45: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.UMP45,
        normalName:             "UMP-45\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               540,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        normalBulletDamage:     2,
        headshotBulletDamage:   8,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.Medium,
        range:                  500,
    
        minSpreadDegrees:       0.3,
        maxSpreadDegrees:       0.8,
    
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadSwapLight,
                scaleDurationToValue: 26
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.ar.reloadNoSwapLight,
                scaleDurationToValue: 13
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.smg.ump45Shoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.SMG,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.ArmorPiercing],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   24,
            defaultMagazine:        MagazineObjects.SMGMagazine24,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 4,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.025,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    DesertEagle: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.DesertEagle,
        normalName:             "Desert Eagle\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        normalBulletDamage:     4.5,
        headshotBulletDamage:   12,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,
    
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
    
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
                staticAnimation: StaticShootAnimations.pistol.desertEagleShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.desertEagleShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Pistol,
            usableAmmoClasses:      [BulletClasses.Normal, BulletClasses.AntiMaterial, BulletClasses.Exploding],
            maxMagazineItemStackAmount: 1,
            maxMagazineAmmoCount:   8,
            defaultMagazine:        MagazineObjects.PistolMagazine8,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown: false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Remington870: new Def.Gun({
        itemTypeId:             Enums.FirearmTypeIds.Remington870,
        normalName:             "Remington 870\n§7[Interact to shoot]",
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         8,
        normalBulletDamage:     1,
        headshotBulletDamage:   3,
        pierce:                 3,
        knockbackAmount:        Enums.KnockbackAmounts.VeryHigh,
        range:                  300,
    
        minSpreadDegrees:       1,
        maxSpreadDegrees:       1.5,
    
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.shotgunReload,
                scaleDurationToValue: 15
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.shotgunReloadCock,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.remington870ShootWithAmmo
            }), 
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.remington870ShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Shotgun,
            usableAmmoClasses:      [Ammo12GaugeClasses.Birdshot, Ammo12GaugeClasses.Buckshot],
            maxMagazineItemStackAmount: 6,
            maxMagazineAmmoCount:   1,
            defaultMagazine:        MagazineObjects.Ammo12Gauge,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  false
        }),
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.08,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    */
    USP: new Def.Gun({
        itemTypeId:             "yes:usp",
        normalName:             "USP\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:             Enums.FiringModes.Semi,
        firingRate:             0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Luger: new Def.Gun({
        itemTypeId:             "yes:luger",
        normalName:             "Luger\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:             Enums.FiringModes.Semi,
        firingRate:             0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Makarov: new Def.Gun({
        itemTypeId:                    "yes:makarov",
        normalName:             "Makarov\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Magnum: new Def.Gun({
        itemTypeId:                    "yes:magnum",
        normalName:             "Magnum Revolver\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  500,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.pistol.magnumReload,
                scaleDurationToValue: 80
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    M92F: new Def.Gun({
        itemTypeId:                    "yes:m92f",
        normalName:             "M92F\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
                staticAnimation: StaticShootAnimations.pistol.m92fShootWithAmmo
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.pistol.m92fShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Pistol,
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.06,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Kar98: new Def.Gun({
        itemTypeId:                    "yes:kar98",
        normalName:             "Kar98\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      true,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 40,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.1,
                maxCamerashake:     0.16,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Stg44: new Def.Gun({
        itemTypeId:                    "yes:stg44",
        normalName:             "StG 44\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               540,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
            stopAimOnCooldown:  true,
            stopAimDelay:       4
        }),
        minSpreadDegrees:       0.5,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.1,
                maxCamerashake:     0.16,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    MP5: new Def.Gun({
        itemTypeId:                    "yes:mp5",
        normalName:             "MP-5\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               300,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.15,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.018,
                maxCamerashake:     0.05,
                minCamerashakeTime: 0.08,
                maxCamerashakeTime: 0.08
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    M4: new Def.Gun({
        itemTypeId:                    "yes:m4",
        normalName:             "M4\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     true,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               172,  //ideally, use multiples of 60
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 10,
            maxDamage: 10,
            minDropOffRange: 0,
            maxDropOffRange: 0
        }),
        headshotMultiplier: 2,
        pierce:                 1,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
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
        minSpreadDegrees:       0.15,
        maxSpreadDegrees:       1,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 8,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.018,
                maxCamerashake:     0.05,
                minCamerashakeTime: 0.08,
                maxCamerashakeTime: 0.08
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Benelli: new Def.Gun({
        itemTypeId:                    "yes:benelli",
        normalName:             "Benelli Shotgun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         10,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 5,
            maxDamage: 35,
            minDropOffRange: 1.5,
            maxDropOffRange: 10
        }),
        headshotMultiplier:     2,
        pierce:                 4,
        knockbackAmount:        Enums.KnockbackAmounts.High,
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
            usableAmmoClasses:      [BulletClasses.Normal],
            maxMagazineItemStackAmount: 10,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Ammo12Gauge,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  false,
            stopAimDelay:       0
        }),
        minSpreadDegrees:       2,
        maxSpreadDegrees:       3,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.08,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    AGM: new Def.Gun({
        itemTypeId:                    "yes:agm",
        normalName:             "AGM Shotgun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Semi,
        firingRate:               0,
        bulletsPerShot:         10,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 5,
            maxDamage: 35,
            minDropOffRange: 1.5,
            maxDropOffRange: 10
        }),
        headshotMultiplier:     2,
        pierce:                 4,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  50,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.agmReload,
                scaleDurationToValue: 20
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.agmReloadOpenCock,
                scaleDurationToValue: 12
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.agmReloadCock,
                scaleDurationToValue: 12
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.agmShootWithAmmo
            }), 
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.agmShootOutOfAmmo
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Shotgun,
            usableAmmoClasses:      [BulletClasses.Normal],
            maxMagazineItemStackAmount: 6,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Ammo12Gauge,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       2
        }),
        minSpreadDegrees:       2,
        maxSpreadDegrees:       3,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.08,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    }),
    Striker: new Def.Gun({
        itemTypeId:                    "yes:striker",
        normalName:             "Striker Shotgun\n§7[Right-Click/Hold to shoot]",
        hasMagazineWhenEmpty:     false,
        manualAmmoEject:      false,
        firingMode:               Enums.FiringModes.Auto,
        firingRate:               200,
        bulletsPerShot:         1,
        damageDropoff: new Def.DamageDropoffAttribute({
            minDamage: 5,
            maxDamage: 35,
            minDropOffRange: 1.5,
            maxDropOffRange: 10
        }),
        headshotMultiplier:     2,
        pierce:                 4,
        knockbackAmount:        Enums.KnockbackAmounts.High,
        range:                  50,
        animationAttributes: [
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.strikerReload,
                scaleDurationToValue: 13
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.strikerReloadOpenPort,
                scaleDurationToValue: 5
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.shotgun.strikerReloadClosePort,
                scaleDurationToValue: 5
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.shotgun.strikerShoot
            })
        ],
        magazineAttribute: new Def.MagazineAttribute({
            magazineClass:          MagazineClasses.Shotgun,
            usableAmmoClasses:      [BulletClasses.Normal],
            maxMagazineItemStackAmount: 20,
            maxMagazineAmmoCount:       1,
            maxAmmoPerReloadCount:      1,
            maxEmptyAmmoPerReloadCount: 1,
            defaultMagazine:        MagazineObjects.Ammo12Gauge,
        }),
        scopeAttribute: new Def.ScopeAttribute({
            slowness:           3,
            speed:              20,
            recoilMultiplier:   0.75,
            stopAimOnCooldown:  true,
            stopAimDelay:       0
        }),
        minSpreadDegrees:       2,
        maxSpreadDegrees:       3,
        recoilAttribute: new Def.RecoilAttribute({
            amountPerShot: 30,
            mainCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.04,
                maxCamerashake:     0.08,
                minCamerashakeTime: 0.05,
                maxCamerashakeTime: 0.05
            }),
            residualCamerashakeAttribute: new Def.CamerashakeAttribute({
                minCamerashake:     0.0001,
                maxCamerashake:     0.0006,
                minCamerashakeTime: 4,
                maxCamerashakeTime: 10
            })
        })
    })
}



for(const [type, typeId] of TypeUtil.getIterable(Enums.FirearmTypeIds)) {
    Global.firearms.set(typeId, FirearmObjects[type]);
}

console.log("Firearms initialized with no errors.");