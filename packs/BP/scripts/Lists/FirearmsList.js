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


var uspAttributes = {
    tag:                    "yes:usp",
    normalName:             "USP\n§7[Right-Click/Hold to shoot]",
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
        new AnimationAttributes(ShootAnimations.pistol.uspShootWithAmmo),
        new AnimationAttributes(ShootAnimations.pistol.uspShootOutOfAmmo)
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
var makarovAttributes = {
    tag:                    "yes:makarov",
    normalName:             "Makarov\n§7[Right-Click/Hold to shoot]",
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
        new AnimationAttributes(ShootAnimations.pistol.makarovShootWithAmmo),
        new AnimationAttributes(ShootAnimations.pistol.makarovShootOutOfAmmo)
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
var magnumAttributes = {
    tag:                    "yes:magnum",
    normalName:             "Magnum Revolver\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         1,
    normalBulletDamage:     4.5,
    headshotBulletDamage:   12,
    pierce:                 1,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  500,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.pistol.magnumReload,   80),
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
var m92fAttributes = {
    tag:                    "yes:m92f",
    normalName:             "M92F\n§7[Right-Click/Hold to shoot]",
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
        new AnimationAttributes(ShootAnimations.pistol.m92fShootWithAmmo),
        new AnimationAttributes(ShootAnimations.pistol.m92fShootOutOfAmmo)
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

var mp5Attributes = {
    tag:                    "yes:mp5",
    normalName:             "MP-5\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               300,  //ideally, use multiples of 60
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
        new AnimationAttributes(ShootAnimations.rifle.mp5Shoot)
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
var m4Attributes = {
    tag:                    "yes:m4",
    normalName:             "M4\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.auto,
    fireRate:               172,  //ideally, use multiples of 60
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
        new AnimationAttributes(ShootAnimations.rifle.m4Shoot)
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
var benelliAttributes = {
    tag:                    "yes:benelli",
    normalName:             "Benelli Shotgun\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         10,
    damage: {
        maxDamage: 35,
        minDamage: 5,
        dropOffMinRange: 1.5,
        dropOffMaxRange: 10
    },
    headshotMultiplier:     2,
    pierce:                 4,
    knockbackAmount:        Def.KnockbackAmounts.high,
    range:                  50,
    animationAttributes: [
        new ReloadAnimationAttributes(ReloadAnimations.shotgun.shotgunReload,     132),
        new AnimationAttributes(ShootAnimations.shotgun.benelliShoot)
    ],
    ammoType:               Def.AmmoTypes.Shotgun,
    defaultMagazine:        magazinesList['yes:12_gauge_shotgun_shells_6'],
    scopeAttributes: {
        slowness:           3,
        speed:              20,
        recoilMultiplier:   0.75,
        stopAimOnCooldown:  false
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

var agmAttributes = {
    tag:                    "yes:agm",
    normalName:             "AGM Shotgun\n§7[Right-Click/Hold to shoot]",
    fireMode:               Def.FiringModes.semi,
    fireRate:               0,
    bulletsPerShot:         10,
    damage: {
        maxDamage: 35,
        minDamage: 5,
        dropOffMinRange: 1.5,
        dropOffMaxRange: 10
    },
    headshotMultiplier:     2,
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

const usp = new Def.Gun(
    uspAttributes.tag,
    uspAttributes.normalName,
    uspAttributes.fireMode,
    uspAttributes.fireRate,
    uspAttributes.bulletsPerShot,
    uspAttributes.damage,
    uspAttributes.headshotMultiplier,
    uspAttributes.pierce,
    uspAttributes.knockbackAmount,
    uspAttributes.range,
    uspAttributes.ammoType,
    uspAttributes.defaultMagazine,
    new Def.ScopeAttributes(uspAttributes.scopeAttributes.slowness, 
                            uspAttributes.scopeAttributes.speed,
                            uspAttributes.scopeAttributes.recoilMultiplier,
                            uspAttributes.scopeAttributes.stopAimOnCooldown),
    uspAttributes.minSpreadDegrees,
    uspAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(uspAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 uspAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 uspAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 uspAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 uspAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(uspAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             uspAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             uspAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             uspAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    uspAttributes.animationAttributes
);
const makarov = new Def.Gun(
    makarovAttributes.tag,
    makarovAttributes.normalName,
    makarovAttributes.fireMode,
    makarovAttributes.fireRate,
    makarovAttributes.bulletsPerShot,
    makarovAttributes.damage,
    makarovAttributes.headshotMultiplier,
    makarovAttributes.pierce,
    makarovAttributes.knockbackAmount,
    makarovAttributes.range,
    makarovAttributes.ammoType,
    makarovAttributes.defaultMagazine,
    new Def.ScopeAttributes(makarovAttributes.scopeAttributes.slowness, 
                            makarovAttributes.scopeAttributes.speed,
                            makarovAttributes.scopeAttributes.recoilMultiplier,
                            makarovAttributes.scopeAttributes.stopAimOnCooldown),
    makarovAttributes.minSpreadDegrees,
    makarovAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(makarovAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 makarovAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 makarovAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 makarovAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 makarovAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(makarovAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             makarovAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             makarovAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             makarovAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    makarovAttributes.animationAttributes
);
const magnum = new Def.Gun(
    magnumAttributes.tag,
    magnumAttributes.normalName,
    magnumAttributes.fireMode,
    magnumAttributes.fireRate,
    magnumAttributes.bulletsPerShot,
    magnumAttributes.damage,
    magnumAttributes.headshotMultiplier,
    magnumAttributes.pierce,
    magnumAttributes.knockbackAmount,
    magnumAttributes.range,
    magnumAttributes.ammoType,
    magnumAttributes.defaultMagazine,
    new Def.ScopeAttributes(magnumAttributes.scopeAttributes.slowness, 
                            magnumAttributes.scopeAttributes.speed,
                            magnumAttributes.scopeAttributes.recoilMultiplier,
                            magnumAttributes.scopeAttributes.stopAimOnCooldown),
    magnumAttributes.minSpreadDegrees,
    magnumAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(magnumAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 magnumAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 magnumAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 magnumAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 magnumAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(magnumAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             magnumAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             magnumAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             magnumAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    magnumAttributes.animationAttributes
);
const m92f = new Def.Gun(
    m92fAttributes.tag,
    m92fAttributes.normalName,
    m92fAttributes.fireMode,
    m92fAttributes.fireRate,
    m92fAttributes.bulletsPerShot,
    m92fAttributes.damage,
    m92fAttributes.headshotMultiplier,
    m92fAttributes.pierce,
    m92fAttributes.knockbackAmount,
    m92fAttributes.range,
    m92fAttributes.ammoType,
    m92fAttributes.defaultMagazine,
    new Def.ScopeAttributes(m92fAttributes.scopeAttributes.slowness, 
                            m92fAttributes.scopeAttributes.speed,
                            m92fAttributes.scopeAttributes.recoilMultiplier,
                            m92fAttributes.scopeAttributes.stopAimOnCooldown),
    m92fAttributes.minSpreadDegrees,
    m92fAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(m92fAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 m92fAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 m92fAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 m92fAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 m92fAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(m92fAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             m92fAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             m92fAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             m92fAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    m92fAttributes.animationAttributes
);
const mp5 = new Def.Gun(
    mp5Attributes.tag,
    mp5Attributes.normalName,
    mp5Attributes.fireMode,
    mp5Attributes.fireRate,
    mp5Attributes.bulletsPerShot,
    mp5Attributes.damage,
    mp5Attributes.headshotMultiplier,
    mp5Attributes.pierce,
    mp5Attributes.knockbackAmount,
    mp5Attributes.range,
    mp5Attributes.ammoType,
    mp5Attributes.defaultMagazine,
    new Def.ScopeAttributes(mp5Attributes.scopeAttributes.slowness, 
                            mp5Attributes.scopeAttributes.speed,
                            mp5Attributes.scopeAttributes.recoilMultiplier,
                            mp5Attributes.scopeAttributes.stopAimOnCooldown),
    mp5Attributes.minSpreadDegrees,
    mp5Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(mp5Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 mp5Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 mp5Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 mp5Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 mp5Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(mp5Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             mp5Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             mp5Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             mp5Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    mp5Attributes.animationAttributes
);
const m4 = new Def.Gun(
    m4Attributes.tag,
    m4Attributes.normalName,
    m4Attributes.fireMode,
    m4Attributes.fireRate,
    m4Attributes.bulletsPerShot,
    m4Attributes.damage,
    m4Attributes.headshotMultiplier,
    m4Attributes.pierce,
    m4Attributes.knockbackAmount,
    m4Attributes.range,
    m4Attributes.ammoType,
    m4Attributes.defaultMagazine,
    new Def.ScopeAttributes(m4Attributes.scopeAttributes.slowness, 
                            m4Attributes.scopeAttributes.speed,
                            m4Attributes.scopeAttributes.recoilMultiplier,
                            m4Attributes.scopeAttributes.stopAimOnCooldown),
    m4Attributes.minSpreadDegrees,
    m4Attributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(m4Attributes.recoilAttributes.mainRecoil.amountPerShot,
                                 m4Attributes.recoilAttributes.mainRecoil.minCamerashake,
                                 m4Attributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 m4Attributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 m4Attributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(m4Attributes.recoilAttributes.residualRecoil.minCamerashake,
                             m4Attributes.recoilAttributes.residualRecoil.maxCamerashake,
                             m4Attributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             m4Attributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    m4Attributes.animationAttributes
);
const benelli = new Def.Gun(
    benelliAttributes.tag,
    benelliAttributes.normalName,
    benelliAttributes.fireMode,
    benelliAttributes.fireRate,
    benelliAttributes.bulletsPerShot,
    benelliAttributes.damage,
    benelliAttributes.headshotMultiplier,
    benelliAttributes.pierce,
    benelliAttributes.knockbackAmount,
    benelliAttributes.range,
    benelliAttributes.ammoType,
    benelliAttributes.defaultMagazine,
    new Def.ScopeAttributes(benelliAttributes.scopeAttributes.slowness, 
                            benelliAttributes.scopeAttributes.speed,
                            benelliAttributes.scopeAttributes.recoilMultiplier,
                            benelliAttributes.scopeAttributes.stopAimOnCooldown),
    benelliAttributes.minSpreadDegrees,
    benelliAttributes.maxSpreadDegrees,
    new Def.MainRecoilAttributes(benelliAttributes.recoilAttributes.mainRecoil.amountPerShot,
                                 benelliAttributes.recoilAttributes.mainRecoil.minCamerashake,
                                 benelliAttributes.recoilAttributes.mainRecoil.maxCamerashake,
                                 benelliAttributes.recoilAttributes.mainRecoil.camerashakeTime,
                                 benelliAttributes.recoilAttributes.mainRecoil.camerashakeTime),
    new Def.RecoilAttributes(benelliAttributes.recoilAttributes.residualRecoil.minCamerashake,
                             benelliAttributes.recoilAttributes.residualRecoil.maxCamerashake,
                             benelliAttributes.recoilAttributes.residualRecoil.minCamerashakeTime,
                             benelliAttributes.recoilAttributes.residualRecoil.maxCamerashakeTime),
    benelliAttributes.animationAttributes
);
const agm = new Def.Gun(
    agmAttributes.tag,
    agmAttributes.normalName,
    agmAttributes.fireMode,
    agmAttributes.fireRate,
    agmAttributes.bulletsPerShot,
    agmAttributes.damage,
    agmAttributes.headshotMultiplier,
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
    "yes:agm":          "yes:agm",
    "yes:benelli":      "yes:benelli",
    "yes:mp5":          "yes:mp5",
    "yes:m4":           "yes:m4",
    "yes:m92f":         "yes:m92f",
    "yes:magnum":       "yes:magnum",
    "yes:makarov":      "yes:makarov",
    "yes:usp":          "yes:usp",
}

Global.firearms.set(FirearmTags['yes:agm'], agm);
Global.firearms.set(FirearmTags['yes:benelli'], benelli);
Global.firearms.set(FirearmTags['yes:mp5'], mp5);
Global.firearms.set(FirearmTags['yes:m4'], m4);
Global.firearms.set(FirearmTags['yes:m92f'], m92f);
Global.firearms.set(FirearmTags['yes:magnum'], magnum);
Global.firearms.set(FirearmTags['yes:makarov'], makarov);
Global.firearms.set(FirearmTags['yes:usp'], usp);

export { magazinesList, FirearmTags };

console.log("Firearms initialized with no errors.");