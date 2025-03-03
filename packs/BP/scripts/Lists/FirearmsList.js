import { Global } from '../Global.js';
import * as Def from '../Definitions/FirearmDefinition.js';
import { AnimationAttributes, ReloadAnimationAttributes } from '../Definitions/AnimationDefinition.js'
import { LeftClickAbilityTypes, LeftClickAbilityAttributes, SwitchFiringModeAttributes, SwitchScopeZoomAttributes } from '../Definitions/LeftClickAbilityDefinition.js';
import { magazinesList } from './MagazinesList.js';
import { LeftClickAbilityAnimations, ReloadAnimations, ShootAnimations } from "./AnimationList.js";

var ak47Attributes = {
    tag:                    "yes:ak47",
    normalName:             "AK-47\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               600,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     1.5,
    headshotBulletDamage:   10,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.medium,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapMedium,   30),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapMedium, 15),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadCockLight,    8),
        new AnimationAttributes(ShootAnimations.rifle.ak47Shoot)
    ],
    ammoType:               Def.AmmoTypes.Rifle,
    defaultMagazine:        magazinesList['yes:rifle_magazine_30'],
    scopeAttributes: {
        slowness:           4,
        speed:              35,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.2,
    maxSpreadDegrees:       0.8,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      5,
            minCamerashake:     0.02,
            maxCamerashake:     0.04,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var akmAttributes = {
    tag:                    "yes:akm",
    normalName:             "AKM\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               600,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     2,
    headshotBulletDamage:   12,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapPubg,   35),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapPubg, 18),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadCockPubg,   8),
        new AnimationAttributes(ShootAnimations.rifle.akmShoot)
    ],
    ammoType:               Def.AmmoTypes.Rifle,
    defaultMagazine:        magazinesList['yes:rifle_magazine_30'],
    scopeAttributes: {
        slowness:           2,
        speed:              13,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.3,
    maxSpreadDegrees:       1,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      8,
            minCamerashake:     0.025,
            maxCamerashake:     0.05,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}
var m4a1Attributes = {
    tag:                    "yes:m4a1",
    normalName:             "M4A1\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               960,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     1,
    headshotBulletDamage:   9.5,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapPubg,   35),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapPubg, 18),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadCockPubg,   8),
        new AnimationAttributes(ShootAnimations.rifle.m4a1Shoot1)
    ],
    ammoType:               Def.AmmoTypes.Rifle,
    defaultMagazine:        magazinesList['yes:rifle_magazine_30'],
    scopeAttributes: {
        slowness:           2,
        speed:              13,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.15,
    maxSpreadDegrees:       1,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      8,
            minCamerashake:     0.018,
            maxCamerashake:     0.05,
            camerashakeTime:    0.08
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var ar15Attributes = {
    tag:                    "yes:ar15",
    normalName:             "AR-15\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     4,
    headshotBulletDamage:   20,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapMedium,   38),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapMedium, 19),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadCockLight,    8),
        new AnimationAttributes(ShootAnimations.rifle.ar15Shoot)
    ],
    ammoType:               Def.AmmoTypes.MarksmanRifle,
    defaultMagazine:        magazinesList['yes:marksman_rifle_magazine_15'],
    scopeAttributes: {
        slowness:           4,
        speed:              35,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.05,
    maxSpreadDegrees:       0.2,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      10,
            minCamerashake:     0.025,
            maxCamerashake:     0.07,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var hk417Attributes = {
    leftClickAbilityType:   LeftClickAbilityTypes.switchFiringMode,
    tag:                    "yes:hk417",
    normalName:             "HK417\n§7[Right-Click/Hold to shoot]",
    fireModes: {
        defaultFireMode: Def.FiringModes.semi,
        alternateFireMode: Def.FiringModes.auto
    },
    fireRates: {
        defaultFireRate: 0,
        alternateFireRate: 300
    },
    bulletsPerShot:         1,
    normalBulletDamage:     5,
    headshotBulletDamage:   20,
    pierce:                 2,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapHeavy,   38),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapHeavy, 19),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadCockHeavy,   8),
        new AnimationAttributes(ShootAnimations.rifle.hk417Shoot),
        new AnimationAttributes(LeftClickAbilityAnimations.switchFiringModeToSemi),
        new AnimationAttributes(LeftClickAbilityAnimations.switchFiringModeToAuto)
    ],
    ammoType:               Def.AmmoTypes.MarksmanRifle,
    defaultMagazine:        magazinesList['yes:marksman_rifle_magazine_15'],
    scopeAttributes: {
        slowness:           5,
        speed:              95,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.1,
    maxSpreadDegrees:       0.8,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      20,
            minCamerashake:     0.04,
            maxCamerashake:     0.08,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var mk13Attributes = {
    leftClickAbilityType:   LeftClickAbilityTypes.switchScopeZoom,
    tag:                    "yes:mk13",
    normalName:             "MK13\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     18,
    headshotBulletDamage:   40,
    pierce:                 3,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapHeavy,   38),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapHeavy, 28),
        new ReloadAnimationAttributes(ReloadAnimations.sniper.sniperReloadCock, 12),
        new AnimationAttributes(ShootAnimations.sniper.mk13ShootWithAmmo), 
        new AnimationAttributes(ShootAnimations.sniper.mk13ShootOutOfAmmo), 
        new AnimationAttributes(LeftClickAbilityAnimations.switchScopeZoomToDefault),
        new AnimationAttributes(LeftClickAbilityAnimations.switchScopeZoomToAlternate)
    ],
    ammoType:               Def.AmmoTypes.Sniper,
    defaultMagazine:        magazinesList['yes:sniper_magazine_3'],
    defaultScopeAttributes: {
        slowness:           5,
        speed:              95,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    alternateScopeAttributes: {
        slowness:           9,
        speed:              0,
        recoilMultiplier:   0.5,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0,
    maxSpreadDegrees:       0,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      50,
            minCamerashake:     0.05,
            maxCamerashake:     0.08,
            camerashakeTime:    0.05,
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var p90Attributes = {
    tag:                    "yes:p90",
    normalName:             "P90\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               1200,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     1,
    headshotBulletDamage:   6,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.low,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.smg.p90ReloadSwap,   34),
        new ReloadAnimationAttributes(ReloadAnimations.smg.p90ReloadNoSwap, 17),
        new ReloadAnimationAttributes(ReloadAnimations.smg.p90ReloadCock,   8),
        new AnimationAttributes(ShootAnimations.smg.p90Shoot)
    ],
    ammoType:               Def.AmmoTypes.P90,
    defaultMagazine:        magazinesList['yes:p90_magazine_50'],
    scopeAttributes: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.5,
    maxSpreadDegrees:       1.2,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      2,
            minCamerashake:     0.025,
            maxCamerashake:     0.04,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}
var ump45Attributes = {
    tag:                    "yes:ump45",
    normalName:             "UMP-45\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               540,  //ideally, use multiples of 60
    bulletsPerShot:         1,
    normalBulletDamage:     2,
    headshotBulletDamage:   8,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.medium,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadSwapLight,   26),
        new ReloadAnimationAttributes(ReloadAnimations.rifle.reloadNoSwapLight, 13),
        new AnimationAttributes(ShootAnimations.smg.ump45Shoot)
    ],
    ammoType:               Def.AmmoTypes.Smg,
    defaultMagazine:        magazinesList['yes:smg_magazine_24'],
    scopeAttributes: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.3,
    maxSpreadDegrees:       0.8,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      4,
            minCamerashake:     0.025,
            maxCamerashake:     0.06,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var desertEagleAttributes = {
    tag:                    "yes:desert_eagle",
    normalName:             "Desert Eagle\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     4.5,
    headshotBulletDamage:   12,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.pistol.reloadSwap,   30),
        new ReloadAnimationAttributes(ReloadAnimations.pistol.reloadNoSwap, 15),
        new ReloadAnimationAttributes(ReloadAnimations.pistol.reloadCock,   8),
        new AnimationAttributes(ShootAnimations.pistol.desertEagleShootWithAmmo),
        new AnimationAttributes(ShootAnimations.pistol.desertEagleShootOutOfAmmo)
    ],
    ammoType:               Def.AmmoTypes.Pistol,
    defaultMagazine:        magazinesList['yes:pistol_magazine_8'],
    scopeAttributes: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown: false
    },
    minSpreadDegrees:       0.5,
    maxSpreadDegrees:       1,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      30,
            minCamerashake:     0.04,
            maxCamerashake:     0.06,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var remington870Attributes = {
    tag:                    "yes:remington870",
    normalName:             "Remington 870\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         8,
    normalBulletDamage:     1,
    headshotBulletDamage:   3,
    pierce:                 3,
    knockbackAmount:        Def.KnockbackAmounts.veryHigh,
    range:                  300,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.shotgun.shotgunReload,     68),
        new ReloadAnimationAttributes(ReloadAnimations.shotgun.shotgunReloadCock, 8),
        new AnimationAttributes(ShootAnimations.shotgun.remington870ShootWithAmmo), 
        new AnimationAttributes(ShootAnimations.shotgun.remington870ShootOutOfAmmo)
    ],
    ammoType:               Def.AmmoTypes.Shotgun,
    defaultMagazine:        magazinesList['yes:shotgun_magazine_6'],
    scopeAttributes: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown:  false
    },
    minSpreadDegrees:       1,
    maxSpreadDegrees:       1.5,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      30,
            minCamerashake:     0.04,
            maxCamerashake:     0.08,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

var agmAttributes = {
    tag:                    "yes:agm",
    normalName:             "AGM Shotgun\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         10,
    normalBulletDamage:     2,
    headshotBulletDamage:   8,
    pierce:                 4,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  50,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.shotgun.agmReload,     120),
        new ReloadAnimationAttributes(ReloadAnimations.shotgun.agmReloadOpenCock, 12),
        new ReloadAnimationAttributes(ReloadAnimations.shotgun.agmReloadCock, 12),
        new AnimationAttributes(ShootAnimations.shotgun.agmShootWithAmmo), 
        new AnimationAttributes(ShootAnimations.shotgun.agmShootOutOfAmmo)
    ],
    ammoType:               Def.AmmoTypes.Shotgun,
    defaultMagazine:        magazinesList['yes:12_gauge_shotgun_shells_6'],
    scopeAttributes: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown:  true
    },
    minSpreadDegrees:       2,
    maxSpreadDegrees:       3,
    recoilAttributes: {
        mainRecoil: {
            amountPerShot:      30,
            minCamerashake:     0.04,
            maxCamerashake:     0.08,
            camerashakeTime:    0.05
        },
        residualRecoil: {
            minCamerashake:     0.0001,
            maxCamerashake:     0.0006,
            minCamerashakeTime: 4,
            maxCamerashakeTime: 10
        }
    }
}

const ak47 = new Def.Gun(
    ak47Attributes.tag,
    ak47Attributes.normalName,
    ak47Attributes.fireMode,
    ak47Attributes.fireRate,
    ak47Attributes.bulletsPerShot,
    ak47Attributes.normalBulletDamage,
    ak47Attributes.headshotBulletDamage,
    ak47Attributes.pierce,
    ak47Attributes.knockbackAmount,
    ak47Attributes.range,
    ak47Attributes.ammoType,
    ak47Attributes.defaultMagazine,
    new Def.ScopeAttributes(ak47Attributes.scopeAttributes.slowness, 
                            ak47Attributes.scopeAttributes.speed,
                            ak47Attributes.scopeAttributes.recoilMultiplier,
                            ak47Attributes.scopeAttributes.stopAimOnCooldown),
    ak47Attributes.minSpreadDegrees,
    ak47Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(ak47Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 ak47Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 ak47Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 ak47Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 ak47Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(ak47Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             ak47Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             ak47Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             ak47Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    ak47Attributes.animationAttributes
);
const akm = new Def.Gun(
    akmAttributes.tag,
    akmAttributes.normalName,
    akmAttributes.fireMode,
    akmAttributes.fireRate,
    akmAttributes.bulletsPerShot,
    akmAttributes.normalBulletDamage,
    akmAttributes.headshotBulletDamage,
    akmAttributes.pierce,
    akmAttributes.knockbackAmount,
    akmAttributes.range,
    akmAttributes.ammoType,
    akmAttributes.defaultMagazine,
    new Def.ScopeAttributes(akmAttributes.scopeAttributes.slowness, 
                            akmAttributes.scopeAttributes.speed,
                            akmAttributes.scopeAttributes.recoilMultiplier,
                            akmAttributes.scopeAttributes.stopAimOnCooldown),
    akmAttributes.minSpreadDegrees,
    akmAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(akmAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 akmAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 akmAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 akmAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 akmAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(akmAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             akmAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             akmAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             akmAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    akmAttributes.animationAttributes
);
const m4a1 = new Def.Gun(
    m4a1Attributes.tag,
    m4a1Attributes.normalName,
    m4a1Attributes.fireMode,
    m4a1Attributes.fireRate,
    m4a1Attributes.bulletsPerShot,
    m4a1Attributes.normalBulletDamage,
    m4a1Attributes.headshotBulletDamage,
    m4a1Attributes.pierce,
    m4a1Attributes.knockbackAmount,
    m4a1Attributes.range,
    m4a1Attributes.ammoType,
    m4a1Attributes.defaultMagazine,
    new Def.ScopeAttributes(m4a1Attributes.scopeAttributes.slowness, 
                            m4a1Attributes.scopeAttributes.speed,
                            m4a1Attributes.scopeAttributes.recoilMultiplier,
                            m4a1Attributes.scopeAttributes.stopAimOnCooldown),
    m4a1Attributes.minSpreadDegrees,
    m4a1Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(m4a1Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 m4a1Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 m4a1Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 m4a1Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 m4a1Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(m4a1Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             m4a1Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             m4a1Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             m4a1Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    m4a1Attributes.animationAttributes
);
const ar15 = new Def.Gun(
    ar15Attributes.tag,
    ar15Attributes.normalName,
    ar15Attributes.fireMode,
    ar15Attributes.fireRate,
    ar15Attributes.bulletsPerShot,
    ar15Attributes.normalBulletDamage,
    ar15Attributes.headshotBulletDamage,
    ar15Attributes.pierce,
    ar15Attributes.knockbackAmount,
    ar15Attributes.range,
    ar15Attributes.ammoType,
    ar15Attributes.defaultMagazine,
    new Def.ScopeAttributes(ar15Attributes.scopeAttributes.slowness, 
                            ar15Attributes.scopeAttributes.speed,
                            ar15Attributes.scopeAttributes.recoilMultiplier,
                            ar15Attributes.scopeAttributes.stopAimOnCooldown),
    ar15Attributes.minSpreadDegrees,
    ar15Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(ar15Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 ar15Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 ar15Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 ar15Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 ar15Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(ar15Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             ar15Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             ar15Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             ar15Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    ar15Attributes.animationAttributes
);
const hk417 = new Def.GunWithAbility(
    hk417Attributes.tag,
    hk417Attributes.normalName,
    hk417Attributes.fireModes.defaultFireMode,
    hk417Attributes.fireRates.defaultFireRate,
    hk417Attributes.bulletsPerShot,
    hk417Attributes.normalBulletDamage,
    hk417Attributes.headshotBulletDamage,
    hk417Attributes.pierce,
    hk417Attributes.knockbackAmount,
    hk417Attributes.range,
    hk417Attributes.ammoType,
    hk417Attributes.defaultMagazine,
    new Def.ScopeAttributes(hk417Attributes.scopeAttributes.slowness, 
                            hk417Attributes.scopeAttributes.speed,
                            hk417Attributes.scopeAttributes.recoilMultiplier,
                            hk417Attributes.scopeAttributes.stopAimOnCooldown),
    hk417Attributes.minSpreadDegrees,
    hk417Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(hk417Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 hk417Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 hk417Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 hk417Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 hk417Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(hk417Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             hk417Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             hk417Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             hk417Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    hk417Attributes.animationAttributes,
    new SwitchFiringModeAttributes(hk417Attributes.leftClickAbilityType,
                                  hk417Attributes.fireModes.defaultFireMode,
                                  hk417Attributes.fireModes.alternateFireMode,
                                  hk417Attributes.fireRates.defaultFireRate,
                                  hk417Attributes.fireRates.alternateFireRate)
);
const mk13 = new Def.GunWithAbility(
    mk13Attributes.tag,
    mk13Attributes.normalName,
    mk13Attributes.fireMode,
    mk13Attributes.fireRate,
    mk13Attributes.bulletsPerShot,
    mk13Attributes.normalBulletDamage,
    mk13Attributes.headshotBulletDamage,
    mk13Attributes.pierce,
    mk13Attributes.knockbackAmount,
    mk13Attributes.range,
    mk13Attributes.ammoType,
    mk13Attributes.defaultMagazine,
    new Def.ScopeAttributes(mk13Attributes.defaultScopeAttributes.slowness, 
                            mk13Attributes.defaultScopeAttributes.speed,
                            mk13Attributes.defaultScopeAttributes.recoilMultiplier,
                            mk13Attributes.defaultScopeAttributes.stopAimOnCooldown),
    mk13Attributes.minSpreadDegrees,
    mk13Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(mk13Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 mk13Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 mk13Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 mk13Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 mk13Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(mk13Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             mk13Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             mk13Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             mk13Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    mk13Attributes.animationAttributes,
    new SwitchScopeZoomAttributes(mk13Attributes.leftClickAbilityType,
                                  mk13Attributes.defaultScopeAttributes,
                                  mk13Attributes.alternateScopeAttributes)
);
const p90 = new Def.Gun(
    p90Attributes.tag,
    p90Attributes.normalName,
    p90Attributes.fireMode,
    p90Attributes.fireRate,
    p90Attributes.bulletsPerShot,
    p90Attributes.normalBulletDamage,
    p90Attributes.headshotBulletDamage,
    p90Attributes.pierce,
    p90Attributes.knockbackAmount,
    p90Attributes.range,
    p90Attributes.ammoType,
    p90Attributes.defaultMagazine,
    new Def.ScopeAttributes(p90Attributes.scopeAttributes.slowness, 
                            p90Attributes.scopeAttributes.speed,
                            p90Attributes.scopeAttributes.recoilMultiplier,
                            p90Attributes.scopeAttributes.stopAimOnCooldown),
    p90Attributes.minSpreadDegrees,
    p90Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(p90Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 p90Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 p90Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 p90Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 p90Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(p90Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             p90Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             p90Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             p90Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    p90Attributes.animationAttributes
);
const ump45 = new Def.Gun(
    ump45Attributes.tag,
    ump45Attributes.normalName,
    ump45Attributes.fireMode,
    ump45Attributes.fireRate,
    ump45Attributes.bulletsPerShot,
    ump45Attributes.normalBulletDamage,
    ump45Attributes.headshotBulletDamage,
    ump45Attributes.pierce,
    ump45Attributes.knockbackAmount,
    ump45Attributes.range,
    ump45Attributes.ammoType,
    ump45Attributes.defaultMagazine,
    new Def.ScopeAttributes(ump45Attributes.scopeAttributes.slowness, 
                            ump45Attributes.scopeAttributes.speed,
                            ump45Attributes.scopeAttributes.recoilMultiplier,
                            ump45Attributes.scopeAttributes.stopAimOnCooldown),
    ump45Attributes.minSpreadDegrees,
    ump45Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(ump45Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 ump45Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 ump45Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 ump45Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 ump45Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(ump45Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             ump45Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             ump45Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             ump45Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    ump45Attributes.animationAttributes
);
const desertEagle = new Def.Gun(
    desertEagleAttributes.tag,
    desertEagleAttributes.normalName,
    desertEagleAttributes.fireMode,
    desertEagleAttributes.fireRate,
    desertEagleAttributes.bulletsPerShot,
    desertEagleAttributes.normalBulletDamage,
    desertEagleAttributes.headshotBulletDamage,
    desertEagleAttributes.pierce,
    desertEagleAttributes.knockbackAmount,
    desertEagleAttributes.range,
    desertEagleAttributes.ammoType,
    desertEagleAttributes.defaultMagazine,
    new Def.ScopeAttributes(desertEagleAttributes.scopeAttributes.slowness, 
                            desertEagleAttributes.scopeAttributes.speed,
                            desertEagleAttributes.scopeAttributes.recoilMultiplier,
                            desertEagleAttributes.scopeAttributes.stopAimOnCooldown),
    desertEagleAttributes.minSpreadDegrees,
    desertEagleAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(desertEagleAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 desertEagleAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 desertEagleAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 desertEagleAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 desertEagleAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(desertEagleAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             desertEagleAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             desertEagleAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             desertEagleAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    desertEagleAttributes.animationAttributes
);
const remington870 = new Def.Gun(
    remington870Attributes.tag,
    remington870Attributes.normalName,
    remington870Attributes.fireMode,
    remington870Attributes.fireRate,
    remington870Attributes.bulletsPerShot,
    remington870Attributes.normalBulletDamage,
    remington870Attributes.headshotBulletDamage,
    remington870Attributes.pierce,
    remington870Attributes.knockbackAmount,
    remington870Attributes.range,
    remington870Attributes.ammoType,
    remington870Attributes.defaultMagazine,
    new Def.ScopeAttributes(remington870Attributes.scopeAttributes.slowness, 
                            remington870Attributes.scopeAttributes.speed,
                            remington870Attributes.scopeAttributes.recoilMultiplier,
                            remington870Attributes.scopeAttributes.stopAimOnCooldown),
    remington870Attributes.minSpreadDegrees,
    remington870Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(remington870Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 remington870Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 remington870Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 remington870Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 remington870Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(remington870Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             remington870Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             remington870Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             remington870Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    remington870Attributes.animationAttributes
);
const agm = new Def.Gun(
    agmAttributes.tag,
    agmAttributes.normalName,
    agmAttributes.fireMode,
    agmAttributes.fireRate,
    agmAttributes.bulletsPerShot,
    agmAttributes.normalBulletDamage,
    agmAttributes.headshotBulletDamage,
    agmAttributes.pierce,
    agmAttributes.knockbackAmount,
    agmAttributes.range,
    agmAttributes.ammoType,
    agmAttributes.defaultMagazine,
    new Def.ScopeAttributes(agmAttributes.scopeAttributes.slowness, 
                            agmAttributes.scopeAttributes.speed,
                            agmAttributes.scopeAttributes.recoilMultiplier,
                            agmAttributes.scopeAttributes.stopAimOnCooldown),
    agmAttributes.minSpreadDegrees,
    agmAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(agmAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 agmAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 agmAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 agmAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 agmAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(agmAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             agmAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             agmAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             agmAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    agmAttributes.animationAttributes
);





const FirearmTags = {
    "yes:ak47":         "yes:ak47",
    "yes:akm":          "yes:akm",
    "yes:m4a1":         "yes:m4a1",
    "yes:ar15":         "yes:ar15",
    "yes:hk417":        "yes:hk417",
    "yes:mk13":         "yes:mk13",
    "yes:p90":          "yes:p90",
    "yes:ump45":        "yes:ump45",
    "yes:desert_eagle": "yes:desert_eagle",
    "yes:remington870": "yes:remington870",
    "yes:agm":          "yes:agm"
}

Global.firearms.set(FirearmTags['yes:ak47'],         ak47);
Global.firearms.set(FirearmTags['yes:akm'],          akm);
Global.firearms.set(FirearmTags['yes:m4a1'],         m4a1);
Global.firearms.set(FirearmTags['yes:ar15'],         ar15);
Global.firearms.set(FirearmTags['yes:hk417'],        hk417);
Global.firearms.set(FirearmTags['yes:mk13'],         mk13);
Global.firearms.set(FirearmTags['yes:p90'],          p90);
Global.firearms.set(FirearmTags['yes:ump45'],        ump45);
Global.firearms.set(FirearmTags['yes:desert_eagle'], desertEagle);
Global.firearms.set(FirearmTags['yes:remington870'], remington870);
Global.firearms.set(FirearmTags['yes:agm'], agm);

export { magazinesList, FirearmTags };

console.log("Firearms initialized with no errors.");