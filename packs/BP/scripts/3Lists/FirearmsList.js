import { Global } from '../Global.js';
import * as Def from '../2Definitions/FirearmDefinition.js';
import * as Enums from "../1Enums/FirearmEnums.js"
import { SwitchFiringModeAttribute, SwitchScopeZoomAttribute } from '../2Definitions/LeftClickAbilityDefinition.js';
import { MagazineObjects } from './MagazinesList.js';
import { BulletClasses, ShotgunShellClasses } from '../1Enums/AmmoEnums.js';
import { TypeUtil } from '../Utilities.js';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { LeftClickAbilityTypes } from '../1Enums/LeftClickAbilityEnums.js';
import { NormalAnimation, ScaledAnimation } from '../2Definitions/AnimationDefinition.js';
import { StaticReloadAnimations, StaticShootAnimations, StaticOtherAnimations } from './AnimationList.js';

/**
 * @enum {Def.Firearm}
 * @type {Record<keyof typeof Enums.FirearmTypeIds, Def.Firearm>}
 */
const FirearmObjects = {
    /**@type {Def.Gun} */
    ak47: {
        tag:                    Enums.FirearmTypeIds.ak47,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapMedium,
                scaleDurationToValue: 30
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapMedium,
                scaleDurationToValue: 15
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadCockLight,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.rifle.ak47Shoot
            })
        ],
        magazineAttribute: {
            magazineClass:          MagazineClasses.Rifle,
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
    },
    /**@type {Def.Gun} */
    akm: {
        tag:                    Enums.FirearmTypeIds.akm,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapPubg, 
                scaleDurationToValue: 35
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapPubg,
                scaleDurationToValue: 18
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadCockPubg,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.rifle.akmShoot
            })
        ],
        magazineAttribute: {
            magazineClass:          MagazineClasses.Rifle,
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
    },
    /**@type {Def.Gun} */
    m4a1: {
        tag:                    Enums.FirearmTypeIds.m4a1,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapPubg,
                scaleDurationToValue: 35
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapPubg,
                scaleDurationToValue: 18
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadCockPubg,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.rifle.m4a1Shoot
            })
        ],
        magazineAttribute: {
            magazineClass:          MagazineClasses.Rifle,
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
    },
    /**@type {Def.Gun} */
    ar15: {
        tag:                    Enums.FirearmTypeIds.ar15,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapMedium,
                scaleDurationToValue: 38
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapMedium,
                scaleDurationToValue: 19
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadCockLight,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.rifle.ar15Shoot
            })
        ],
        magazineAttribute: {
            magazineClass:          MagazineClasses.MarksmanRifle,
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
    },
    /**@type {Def.GunWithAbility} */
    hk417: {
        /**@type {SwitchFiringModeAttribute} */
        leftClickAbilityAttribute: {
            leftClickAbilityType: LeftClickAbilityTypes.SwitchFiringMode,
            alternateFiringMode:  Enums.FiringModes.Auto,
            alternateFiringRate:  300
        },
        tag:                    Enums.FirearmTypeIds.hk417,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapHeavy,
                scaleDurationToValue: 38
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapHeavy,
                scaleDurationToValue: 19
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadCockHeavy,
                scaleDurationToValue: 8
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.rifle.hk417Shoot
            }),
            new NormalAnimation({
                staticAnimation: StaticOtherAnimations.switchFiringModeToSemi
            }),
            new NormalAnimation({
                staticAnimation: StaticOtherAnimations.switchFiringModeToAuto
            })
        ],
        magazineAttribute: {
            magazineClass:          MagazineClasses.MarksmanRifle,
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
    },
    /**@type {Def.GunWithAbility} */
    mk13: {
        /** @type {SwitchScopeZoomAttribute} */
        leftClickAbilityAttribute: {
            leftClickAbilityType: LeftClickAbilityTypes.SwitchScopeZoom,
            alternateScopeAttribute: {
                slowness:           9,
                speed:              0,
                recoilMultiplier:   0.5,
                stopAimOnCooldown: false
            }
        },
        tag:                    Enums.FirearmTypeIds.mk13,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapHeavy,
                scaleDurationToValue: 38
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapHeavy,
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
        magazineAttribute: {
            magazineClass:          MagazineClasses.Sniper,
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
    },
    /**@type {Def.Gun} */
    p90: {
        tag:                    Enums.FirearmTypeIds.p90,
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
        magazineAttribute: {
            magazineClass:          MagazineClasses.P90,
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
    },
    /**@type {Def.Gun} */
    ump45: {
        tag:                    Enums.FirearmTypeIds.ump45,
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
                staticAnimation:      StaticReloadAnimations.rifle.reloadSwapLight,
                scaleDurationToValue: 26
            }),
            new ScaledAnimation({
                staticAnimation:      StaticReloadAnimations.rifle.reloadNoSwapLight,
                scaleDurationToValue: 13
            }),
            new NormalAnimation({
                staticAnimation: StaticShootAnimations.smg.ump45Shoot
            })
        ],
        magazineAttribute: {
            magazineClass:          MagazineClasses.Smg,
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
    },
    /**@type {Def.Gun} */
    desertEagle: {
        tag:                    Enums.FirearmTypeIds.desertEagle,
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
        magazineAttribute: {
            magazineClass:          MagazineClasses.Pistol,
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
    },
    /**@type {Def.Gun} */
    remington870: {
        tag:                    Enums.FirearmTypeIds.remington870,
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
        magazineAttribute: {
            magazineClass:          MagazineClasses.Shotgun,
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
}


for(const [type, typeId] of TypeUtil.getIterable(Enums.FirearmTypeIds)) {
    Global.firearms.set(typeId, FirearmObjects[type]);
}

console.log("Firearms initialized with no errors.");