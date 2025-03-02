import { Global } from '../Global.js';
import * as Def from '../Definitions/AnimationDefinition.js';

//-----------------------------------------------------------------------------------------------------
//----------------------------------------- Reload Animations -----------------------------------------
//-----------------------------------------------------------------------------------------------------
const rifleReloadSwapLightAttributes = {
    duration: 40, //in ticks
    type:     Def.AnimationTypes.reloadSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_out_light",
            timeToPlayInTicks: 14,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_light",
            timeToPlayInTicks: 22,
            soundRange: 40
        }
    ]
}
const rifleReloadSwapMediumAttributes = {
    duration: 40, //in ticks
    type:     Def.AnimationTypes.reloadSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_out_medium",
            timeToPlayInTicks: 14,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_medium",
            timeToPlayInTicks: 22,
            soundRange: 40
        }
    ]
}
const rifleReloadSwapHeavyAttributes = {
    duration: 40, //in ticks
    type:     Def.AnimationTypes.reloadSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_out_heavy",
            timeToPlayInTicks: 14,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_heavy",
            timeToPlayInTicks: 22,
            soundRange: 40
        }
    ]
}
const rifleReloadSwapPubgAttributes = {
    duration: 40, //in ticks
    type:     Def.AnimationTypes.reloadSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_out_pubg",
            timeToPlayInTicks: 14,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_pubg",
            timeToPlayInTicks: 22,
            soundRange: 40
        }
    ]
}

const rifleReloadNoSwapLightAttributes = {
    duration: 20, //in ticks
    type:     Def.AnimationTypes.reloadNoSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_light",
            timeToPlayInTicks: 13,
            soundRange: 40
        }
    ]
}
const rifleReloadNoSwapMediumAttributes = {
    duration: 20, //in ticks
    type:     Def.AnimationTypes.reloadNoSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_medium",
            timeToPlayInTicks: 13,
            soundRange: 40
        }
    ]
}
const rifleReloadNoSwapHeavyAttributes = {
    duration: 20, //in ticks
    type:     Def.AnimationTypes.reloadNoSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_heavy",
            timeToPlayInTicks: 13,
            soundRange: 40
        }
    ]
}
const rifleReloadNoSwapPubgAttributes = {
    duration: 20, //in ticks
    type:     Def.AnimationTypes.reloadNoSwap,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_in_pubg",
            timeToPlayInTicks: 13,
            soundRange: 40
        }
    ]
}

const rifleReloadCockLightAttributes = {
    duration: 10, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_cock_toward_light",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_cock_away_light",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ]
}
const rifleReloadCockHeavyAttributes = {
    duration: 10, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_cock_toward_heavy",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_cock_away_heavy",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ]
}
const rifleReloadCockPubgAttributes = {
    duration: 10, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.rifle_reload_magazine_cock_toward_pubg",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.rifle_reload_magazine_cock_away_pubg",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ]
}

const sniperReloadCockAttributes = {
    duration: 10, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.sniper_reload_bolt_pull_toward",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.sniper_reload_bolt_pull_away",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ],
    animationDefiniton: "animation.mk13_shoot_with_ammo"
}

const pistolReloadSwapAttributes = {
    duration: 40, //in ticks
    type:     Def.AnimationTypes.reloadSwap,
    sounds: [
        {
            soundDefinition: "firearm.pistol_reload_magazine_out",
            timeToPlayInTicks: 16,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.pistol_reload_magazine_in",
            timeToPlayInTicks: 23,
            soundRange: 40
        }
    ]
}
const pistolReloadNoSwapAttributes = {
    duration: 20, //in ticks
    type:     Def.AnimationTypes.reloadNoSwap,
    sounds: [
        {
            soundDefinition: "firearm.p90_reload_magazine_in",
            timeToPlayInTicks: 18,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.p90_reload_smack_magazine",
            timeToPlayInTicks: 25,
            soundRange: 40
        }
    ]
}
const pistolReloadCockAttributes = {
    duration: 10, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.pistol_reload_cock_toward",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.pistol_reload_cock_away",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ]
}

const p90ReloadSwapAttributes = {
    duration: 45, //in ticks
    type:     Def.AnimationTypes.reloadSwap,
    sounds: [
        {
            soundDefinition: "firearm.p90_reload_magazine_out",
            timeToPlayInTicks: 6,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.p90_reload_magazine_in",
            timeToPlayInTicks: 32,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.p90_reload_smack_magazine",
            timeToPlayInTicks: 39,
            soundRange: 40
        }
    ]
}
const p90ReloadNoSwapAttributes = {
    duration: 32, //in ticks
    type:     Def.AnimationTypes.reloadNoSwap,
    sounds: [
        {
            soundDefinition: "firearm.p90_reload_magazine_in",
            timeToPlayInTicks: 18,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.p90_reload_smack_magazine",
            timeToPlayInTicks: 25,
            soundRange: 40
        }
    ]
}
const p90ReloadCockAttributes = {
    duration: 10, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.p90_reload_cock_toward",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.p90_reload_cock_away",
            timeToPlayInTicks: 8,
            soundRange: 40
        }
    ]
}


const shotgunReloadAttributes = {
    duration: 15*6, //in ticks
    type:     Def.AnimationTypes.reloadBoth,
    sounds: [
        {
            soundDefinition: "firearm.shotgun_reload_magazine_in",
            timeToPlayInTicks: 10,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_magazine_in",
            timeToPlayInTicks: 25,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_magazine_in",
            timeToPlayInTicks: 40,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_magazine_in",
            timeToPlayInTicks: 55,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_magazine_in",
            timeToPlayInTicks: 70,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_magazine_in",
            timeToPlayInTicks: 85,
            soundRange: 40
        }
    ]
}
const shotgunReloadCockAttributes = {
    duration: 8, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.shotgun_reload_cock_toward",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_cock_away",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ]
}

const agmReloadAttributes = {
    duration: 15*6, //in ticks
    type:     Def.AnimationTypes.reloadBoth,
    sounds: [
        {
            soundDefinition: "firearm.agm_reload_magazine_in",
            timeToPlayInTicks: 10,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_magazine_in",
            timeToPlayInTicks: 25,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_magazine_in",
            timeToPlayInTicks: 40,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_magazine_in",
            timeToPlayInTicks: 55,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_magazine_in",
            timeToPlayInTicks: 70,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_magazine_in",
            timeToPlayInTicks: 85,
            soundRange: 40
        }
    ]
}
const agmReloadOpenCockAttributes = {
    duration: 8, //in ticks
    type:     Def.AnimationTypes.reloadOpenCock,
    sounds: [
        {
            soundDefinition: "firearm.agm_reload_slide_open",
            timeToPlayInTicks: 3,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_cock_toward",
            timeToPlayInTicks: 5,
            soundRange: 40
        }
    ]
}
const agmReloadCockAttributes = {
    duration: 8, //in ticks
    type:     Def.AnimationTypes.reloadCock,
    sounds: [
        {
            soundDefinition: "firearm.agm_reload_cock_away",
            timeToPlayInTicks: 3,
            soundRange: 40
        }
    ]
}

const rifleReloadSwapLight = new Def.Animation(
    rifleReloadSwapLightAttributes.duration,
    rifleReloadSwapLightAttributes.type,
    rifleReloadSwapLightAttributes.sounds
)
const rifleReloadSwapMedium = new Def.Animation(
    rifleReloadSwapMediumAttributes.duration,
    rifleReloadSwapMediumAttributes.type,
    rifleReloadSwapMediumAttributes.sounds
)
const rifleReloadSwapHeavy = new Def.Animation(
    rifleReloadSwapHeavyAttributes.duration,
    rifleReloadSwapHeavyAttributes.type,
    rifleReloadSwapHeavyAttributes.sounds
)
const rifleReloadSwapPubg = new Def.Animation(
    rifleReloadSwapPubgAttributes.duration,
    rifleReloadSwapPubgAttributes.type,
    rifleReloadSwapPubgAttributes.sounds
)

const rifleReloadNoSwapLight = new Def.Animation(
    rifleReloadNoSwapLightAttributes.duration,
    rifleReloadNoSwapLightAttributes.type,
    rifleReloadNoSwapLightAttributes.sounds
)
const rifleReloadNoSwapMedium = new Def.Animation(
    rifleReloadNoSwapMediumAttributes.duration,
    rifleReloadNoSwapMediumAttributes.type,
    rifleReloadNoSwapMediumAttributes.sounds
)
const rifleReloadNoSwapHeavy = new Def.Animation(
    rifleReloadNoSwapHeavyAttributes.duration,
    rifleReloadNoSwapHeavyAttributes.type,
    rifleReloadNoSwapHeavyAttributes.sounds
)
const rifleReloadNoSwapPubg = new Def.Animation(
    rifleReloadNoSwapPubgAttributes.duration,
    rifleReloadNoSwapPubgAttributes.type,
    rifleReloadNoSwapPubgAttributes.sounds
)

const rifleReloadCockLight = new Def.Animation(
    rifleReloadCockLightAttributes.duration,
    rifleReloadCockLightAttributes.type,
    rifleReloadCockLightAttributes.sounds
)
const rifleReloadCockHeavy = new Def.Animation(
    rifleReloadCockHeavyAttributes.duration,
    rifleReloadCockHeavyAttributes.type,
    rifleReloadCockHeavyAttributes.sounds
)
const rifleReloadCockPubg = new Def.Animation(
    rifleReloadCockPubgAttributes.duration,
    rifleReloadCockPubgAttributes.type,
    rifleReloadCockPubgAttributes.sounds
)
const sniperReloadCock = new Def.Animation(
    sniperReloadCockAttributes.duration,
    sniperReloadCockAttributes.type,
    sniperReloadCockAttributes.sounds
)


const pistolReloadSwap = new Def.Animation(
    pistolReloadSwapAttributes.duration,
    pistolReloadSwapAttributes.type,
    pistolReloadSwapAttributes.sounds
)
const pistolReloadNoSwap = new Def.Animation(
    pistolReloadNoSwapAttributes.duration,
    pistolReloadNoSwapAttributes.type,
    pistolReloadNoSwapAttributes.sounds
)
const pistolReloadCock = new Def.Animation(
    pistolReloadCockAttributes.duration,
    pistolReloadCockAttributes.type,
    pistolReloadCockAttributes.sounds
)



const p90ReloadSwap = new Def.Animation(
    p90ReloadSwapAttributes.duration,
    p90ReloadSwapAttributes.type,
    p90ReloadSwapAttributes.sounds
)
const p90ReloadNoSwap = new Def.Animation(
    p90ReloadNoSwapAttributes.duration,
    p90ReloadNoSwapAttributes.type,
    p90ReloadNoSwapAttributes.sounds
)
const p90ReloadCock = new Def.Animation(
    p90ReloadCockAttributes.duration,
    p90ReloadCockAttributes.type,
    p90ReloadCockAttributes.sounds
)


const shotgunReload = new Def.Animation(
    shotgunReloadAttributes.duration,
    shotgunReloadAttributes.type,
    shotgunReloadAttributes.sounds
)
const shotgunReloadCock = new Def.Animation(
    shotgunReloadCockAttributes.duration,
    shotgunReloadCockAttributes.type,
    shotgunReloadCockAttributes.sounds
)

const agmReload = new Def.Animation(
    agmReloadAttributes.duration,
    agmReloadAttributes.type,
    agmReloadAttributes.sounds
)
const agmReloadOpenCock = new Def.Animation(
    agmReloadOpenCockAttributes.duration,
    agmReloadOpenCockAttributes.type,
    agmReloadOpenCockAttributes.sounds
)
const agmReloadCock = new Def.Animation(
    agmReloadCockAttributes.duration,
    agmReloadCockAttributes.type,
    agmReloadCockAttributes.sounds
)

const ReloadAnimations = {
    rifle: {
        reloadSwapLight:    rifleReloadSwapLight,
        reloadSwapMedium:   rifleReloadSwapMedium,
        reloadSwapHeavy:    rifleReloadSwapHeavy,
        reloadSwapPubg:     rifleReloadSwapPubg,
        reloadNoSwapLight:  rifleReloadNoSwapLight,
        reloadNoSwapMedium: rifleReloadNoSwapMedium,
        reloadNoSwapHeavy:  rifleReloadNoSwapHeavy,
        reloadNoSwapPubg:   rifleReloadNoSwapPubg,
        reloadCockLight:    rifleReloadCockLight,
        reloadCockHeavy:    rifleReloadCockHeavy,
        reloadCockPubg:    rifleReloadCockPubg
    },
    sniper: {
        sniperReloadCock: sniperReloadCock
    },
    smg: {
        p90ReloadSwap:   p90ReloadSwap,
        p90ReloadNoSwap: p90ReloadNoSwap,
        p90ReloadCock:   p90ReloadCock
    },
    pistol: {
        reloadSwap:   pistolReloadSwap,
        reloadNoSwap: pistolReloadNoSwap,
        reloadCock:   pistolReloadCock
    },
    shotgun: {
        shotgunReload: shotgunReload,
        shotgunReloadCock: shotgunReloadCock,
        agmReload: agmReload,
        agmReloadOpenCock: agmReloadOpenCock,
        agmReloadCock: agmReloadCock
    }
}

//-----------------------------------------------------------------------------------------------------
//----------------------------------------- Reload Animations -----------------------------------------
//-----------------------------------------------------------------------------------------------------




//----------------------------------------------------------------------------------------------------
//----------------------------------------- Shoot Animations -----------------------------------------
//----------------------------------------------------------------------------------------------------
const ak47ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.ak47_shoot",
            timeToPlayInTicks: 0,
            soundRange: 150
        }
    ],
    animationDefiniton: "animation.ak47_shoot"
}
const akmShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.akm_shoot",
            timeToPlayInTicks: 0,
            soundRange: 187.5
        }
    ],
    animationDefiniton: "animation.akm_shoot"
}
const m4a1ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.m4a1_shoot",
            timeToPlayInTicks: 0,
            soundRange: 168.75
        }
    ],
    animationDefiniton: "animation.m4a1_shoot"
}
const ar15ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.ar15_shoot",
            timeToPlayInTicks: 0,
            soundRange: 168.75
        }
    ],
    animationDefiniton: "animation.ar15_shoot"
}
const hk417ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.hk417_shoot",
            timeToPlayInTicks: 0,
            soundRange: 187.5
        }
    ],
    animationDefiniton: "animation.hk417_shoot"
}
const ump45ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.ump45_shoot",
            timeToPlayInTicks: 0,
            soundRange: 93.75
        }
    ],
    animationDefiniton: "animation.ump45_shoot"
}
const p90ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.p90_shoot",
            timeToPlayInTicks: 0,
            soundRange: 112.5
        }
    ],
    animationDefiniton: "animation.p90_shoot"
}
const mk13ShootWithAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootWithAmmo,
    sounds: [
        {
            soundDefinition: "firearm.mk13_shoot",
            timeToPlayInTicks: 0,
            soundRange: 225
        },
        {
            soundDefinition: "firearm.sniper_reload_bolt_pull_toward",
            timeToPlayInTicks: 8,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.sniper_reload_bolt_pull_away",
            timeToPlayInTicks: 14,
            soundRange: 40
        }
    ],
    animationDefiniton: "animation.mk13_shoot_with_ammo"
}
const mk13ShootOutOfAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootOutOfAmmo,
    sounds: [
        {
            soundDefinition: "firearm.mk13_shoot",
            timeToPlayInTicks: 0,
            soundRange: 225
        }
    ],
    animationDefiniton: "animation.mk13_shoot_out_of_ammo"
}
const remington870ShootWithAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootWithAmmo,
    sounds: [
        {
            soundDefinition: "firearm.remington870_shoot",
            timeToPlayInTicks: 0,
            soundRange: 150
        },
        {
            soundDefinition: "firearm.shotgun_reload_cock_toward",
            timeToPlayInTicks: 6,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.shotgun_reload_cock_away",
            timeToPlayInTicks: 12,
            soundRange: 40
        }
    ],
    animationDefiniton: "animation.remington870_shoot_with_ammo"
}
const remington870ShootOutOfAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootOutOfAmmo,
    sounds: [
        {
            soundDefinition: "firearm.remington870_shoot",
            timeToPlayInTicks: 0,
            soundRange: 150
        }
    ],
    animationDefiniton: "animation.remington870_shoot_out_of_ammo"
}
const desertEagleShootWithAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootWithAmmo,
    sounds: [
        {
            soundDefinition: "firearm.desert_eagle_shoot",
            timeToPlayInTicks: 0,
            soundRange: 168.75
        }
    ],
    animationDefiniton: "animation.desert_eagle_shoot_with_ammo"
}
const desertEagleShootOutOfAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootOutOfAmmo,
    sounds: [
        {
            soundDefinition: "firearm.desert_eagle_shoot",
            timeToPlayInTicks: 0,
            soundRange: 168.75
        }
    ],
    animationDefiniton: "animation.desert_eagle_shoot_out_of_ammo"
}
const rpg7ShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.rpg7_shoot",
            timeToPlayInTicks: 0,
            soundRange: 281.25
        }
    ],
    animationDefiniton: "animation.rpg7_shoot"
}
const javelinShootAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shoot,
    sounds: [
        {
            soundDefinition: "firearm.javelin_shoot",
            timeToPlayInTicks: 0,
            soundRange: 281.25
        }
    ],
    animationDefiniton: "animation.javelin_shoot"
}

const agmShootWithAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootWithAmmo,
    sounds: [
        {
            soundDefinition: "firearm.agm_shoot",
            timeToPlayInTicks: 0,
            soundRange: 150
        },
        {
            soundDefinition: "firearm.agm_reload_cock_toward",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
        {
            soundDefinition: "firearm.agm_reload_cock_away",
            timeToPlayInTicks: 6,
            soundRange: 40
        }
    ],
    animationDefiniton: "animation.agm_shoot_with_ammo"
}
const agmShootOutOfAmmoAttributes = {
    duration: 30, //in ticks
    type:     Def.AnimationTypes.shootOutOfAmmo,
    sounds: [
        {
            soundDefinition: "firearm.agm_shoot",
            timeToPlayInTicks: 0,
            soundRange: 150
        }
    ],
    animationDefiniton: "animation.agm_shoot_out_of_ammo"
}

const ak47Shoot = new Def.Animation(
    ak47ShootAttributes.duration,
    ak47ShootAttributes.type,
    ak47ShootAttributes.sounds,
    ak47ShootAttributes.animationDefiniton
)
const akmShoot = new Def.Animation(
    akmShootAttributes.duration,
    akmShootAttributes.type,
    akmShootAttributes.sounds,
    akmShootAttributes.animationDefiniton
)
const m4a1Shoot = new Def.Animation(
    m4a1ShootAttributes.duration,
    m4a1ShootAttributes.type,
    m4a1ShootAttributes.sounds,
    m4a1ShootAttributes.animationDefiniton
)
const ar15Shoot = new Def.Animation(
    ar15ShootAttributes.duration,
    ar15ShootAttributes.type,
    ar15ShootAttributes.sounds,
    ar15ShootAttributes.animationDefiniton
)
const hk417Shoot = new Def.Animation(
    hk417ShootAttributes.duration,
    hk417ShootAttributes.type,
    hk417ShootAttributes.sounds,
    hk417ShootAttributes.animationDefiniton
)

const ump45Shoot = new Def.Animation(
    ump45ShootAttributes.duration,
    ump45ShootAttributes.type,
    ump45ShootAttributes.sounds,
    ump45ShootAttributes.animationDefiniton
)
const p90Shoot = new Def.Animation(
    p90ShootAttributes.duration,
    p90ShootAttributes.type,
    p90ShootAttributes.sounds,
    p90ShootAttributes.animationDefiniton
)
const mk13ShootWithAmmo = new Def.Animation(
    mk13ShootWithAmmoAttributes.duration,
    mk13ShootWithAmmoAttributes.type,
    mk13ShootWithAmmoAttributes.sounds,
    mk13ShootWithAmmoAttributes.animationDefiniton
)
const mk13ShootOutOfAmmo = new Def.Animation(
    mk13ShootOutOfAmmoAttributes.duration,
    mk13ShootOutOfAmmoAttributes.type,
    mk13ShootOutOfAmmoAttributes.sounds,
    mk13ShootOutOfAmmoAttributes.animationDefiniton
)
const remington870ShootWithAmmo = new Def.Animation(
    remington870ShootWithAmmoAttributes.duration,
    remington870ShootWithAmmoAttributes.type,
    remington870ShootWithAmmoAttributes.sounds,
    remington870ShootWithAmmoAttributes.animationDefiniton
)
const remington870ShootOutOfAmmo = new Def.Animation(
    remington870ShootOutOfAmmoAttributes.duration,
    remington870ShootOutOfAmmoAttributes.type,
    remington870ShootOutOfAmmoAttributes.sounds,
    remington870ShootOutOfAmmoAttributes.animationDefiniton
)
const desertEagleShootWithAmmo = new Def.Animation(
    desertEagleShootWithAmmoAttributes.duration,
    desertEagleShootWithAmmoAttributes.type,
    desertEagleShootWithAmmoAttributes.sounds,
    desertEagleShootWithAmmoAttributes.animationDefiniton
)
const desertEagleShootOutOfAmmo = new Def.Animation(
    desertEagleShootOutOfAmmoAttributes.duration,
    desertEagleShootOutOfAmmoAttributes.type,
    desertEagleShootOutOfAmmoAttributes.sounds,
    desertEagleShootOutOfAmmoAttributes.animationDefiniton
)

const rpg7Shoot = new Def.Animation(
    rpg7ShootAttributes.duration,
    rpg7ShootAttributes.type,
    rpg7ShootAttributes.sounds,
    rpg7ShootAttributes.animationDefiniton
)
const javelinShoot = new Def.Animation(
    javelinShootAttributes.duration,
    javelinShootAttributes.type,
    javelinShootAttributes.sounds,
    javelinShootAttributes.animationDefiniton
)

const agmShootWithAmmo = new Def.Animation(
    agmShootWithAmmoAttributes.duration,
    agmShootWithAmmoAttributes.type,
    agmShootWithAmmoAttributes.sounds,
    agmShootWithAmmoAttributes.animationDefiniton
)
const agmShootOutOfAmmo = new Def.Animation(
    agmShootOutOfAmmoAttributes.duration,
    agmShootOutOfAmmoAttributes.type,
    agmShootOutOfAmmoAttributes.sounds,
    agmShootOutOfAmmoAttributes.animationDefiniton
)

const ShootAnimations = {
    rifle: {
        ak47Shoot:          ak47Shoot,
        akmShoot:           akmShoot,
        m4a1Shoot1:         m4a1Shoot,
        ar15Shoot:          ar15Shoot,
        hk417Shoot:         hk417Shoot
    },
    smg: {
        ump45Shoot: ump45Shoot,
        p90Shoot:   p90Shoot
    },
    sniper: {
        mk13ShootWithAmmo: mk13ShootWithAmmo,
        mk13ShootOutOfAmmo: mk13ShootOutOfAmmo
    },
    shotgun: {
        remington870ShootWithAmmo:  remington870ShootWithAmmo,
        remington870ShootOutOfAmmo: remington870ShootOutOfAmmo,
        agmShootWithAmmo:  agmShootWithAmmo,
        agmShootOutOfAmmo: agmShootOutOfAmmo
    },
    pistol: {
        desertEagleShootWithAmmo:  desertEagleShootWithAmmo,
        desertEagleShootOutOfAmmo: desertEagleShootOutOfAmmo
    },
    other: {
        rpg7Shoot: rpg7Shoot,
        javelinShoot: javelinShoot
    }
}

export { ReloadAnimations, ShootAnimations };
//----------------------------------------------------------------------------------------------------
//----------------------------------------- Shoot Animations -----------------------------------------
//----------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------------------
//----------------------------------- Left Click Ability Animations -----------------------------------
//-----------------------------------------------------------------------------------------------------
const switchFiringModeToSemiAttributes = {
    duration: 9, //in ticks
    type:     Def.AnimationTypes.switchFiringModeToDefault,
    sounds: [
        {
            soundDefinition: "firearm.switch_firing_mode_to_default",
            timeToPlayInTicks: 0,
            soundRange: 40
        },
    ],
    animationDefiniton: "animation.switch_firing_mode"
}
const switchFiringModeToAutoAttributes = {
    duration: 9, //in ticks
    type:     Def.AnimationTypes.switchFiringModeToAlternate,
    sounds: [
        {
            soundDefinition: "firearm.switch_firing_mode_to_alternate",
            timeToPlayInTicks: 0,
            soundRange: 40
        },
    ],
    animationDefiniton: "animation.switch_firing_mode"
}

const switchScopeZoomToDefaultAttributes = {
    duration: 12, //in ticks
    type:     Def.AnimationTypes.switchScopeZoomToDefault,
    sounds: [
        {
            soundDefinition: "firearm.switch_scope_zoom_to_default",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
    ],
    animationDefiniton: "animation.switch_scope_zoom"
}
const switchScopeZoomToAlternateAttributes = {
    duration: 12, //in ticks
    type:     Def.AnimationTypes.switchScopeZoomToAlternate,
    sounds: [
        {
            soundDefinition: "firearm.switch_scope_zoom_to_alternate",
            timeToPlayInTicks: 2,
            soundRange: 40
        },
    ],
    animationDefiniton: "animation.switch_scope_zoom"
}

const switchFiringModeToSemi = new Def.Animation(
    switchFiringModeToSemiAttributes.duration,
    switchFiringModeToSemiAttributes.type,
    switchFiringModeToSemiAttributes.sounds,
    switchFiringModeToSemiAttributes.animationDefiniton
)
const switchFiringModeToAuto = new Def.Animation(
    switchFiringModeToAutoAttributes.duration,
    switchFiringModeToAutoAttributes.type,
    switchFiringModeToAutoAttributes.sounds,
    switchFiringModeToAutoAttributes.animationDefiniton
)
const switchScopeZoomToDefault = new Def.Animation(
    switchScopeZoomToDefaultAttributes.duration,
    switchScopeZoomToDefaultAttributes.type,
    switchScopeZoomToDefaultAttributes.sounds,
    switchScopeZoomToDefaultAttributes.animationDefiniton
)
const switchScopeZoomToAlternate = new Def.Animation(
    switchScopeZoomToAlternateAttributes.duration,
    switchScopeZoomToAlternateAttributes.type,
    switchScopeZoomToAlternateAttributes.sounds,
    switchScopeZoomToAlternateAttributes.animationDefiniton
)

const LeftClickAbilityAnimations = {
    switchFiringModeToSemi:     switchFiringModeToSemi,
    switchFiringModeToAuto:     switchFiringModeToAuto,
    switchScopeZoomToDefault:   switchScopeZoomToDefault,
    switchScopeZoomToAlternate: switchScopeZoomToAlternate
}
export { LeftClickAbilityAnimations };
//-----------------------------------------------------------------------------------------------------
//----------------------------------- Left Click Ability Animations -----------------------------------
//-----------------------------------------------------------------------------------------------------