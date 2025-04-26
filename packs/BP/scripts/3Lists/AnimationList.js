import * as Def from '../2Definitions/AnimationDefinition.js';
import * as Enums from "../1Enums/AnimationEnums.js";

/**
 * @typedef {{
 *   sniperReloadCock: Def.StaticAnimation
 * }} SniperReloadAnimations
 * 
 * @typedef {{
 *   reloadSwapLight: Def.StaticAnimation,
 *   reloadSwapMedium: Def.StaticAnimation,
 *   reloadSwapHeavy: Def.StaticAnimation,
 *   reloadSwapPubg: Def.StaticAnimation,
 *   reloadNoSwapLight: Def.StaticAnimation,
 *   reloadNoSwapMedium: Def.StaticAnimation,
 *   reloadNoSwapHeavy: Def.StaticAnimation,
 *   reloadNoSwapPubg: Def.StaticAnimation,
 *   reloadCockLight: Def.StaticAnimation,
 *   reloadCockHeavy: Def.StaticAnimation,
 *   reloadCockPubg: Def.StaticAnimation
 * }} RifleReloadAnimations
 * 
 * @typedef {{
 *   p90ReloadSwap: Def.StaticAnimation,
 *   p90ReloadNoSwap: Def.StaticAnimation,
 *   p90ReloadCock: Def.StaticAnimation
 * }} SmgReloadAnimations
 * 
 * @typedef {{
 *   reloadSwap: Def.StaticAnimation,
 *   reloadNoSwap: Def.StaticAnimation,
 *   reloadCock: Def.StaticAnimation
 * }} PistolReloadAnimations
 * 
 * @typedef {{
 *   shotgunReload: Def.StaticAnimation,
 *   shotgunReloadCock: Def.StaticAnimation
 * }} ShotgunReloadAnimations
 */

/**
 * @enum {Record<string, Def.StaticAnimation>}
 * @type {{
 *   sniper:  SniperReloadAnimations,
 *   rifle:   RifleReloadAnimations,
 *   smg:     SmgReloadAnimations,
 *   pistol:  PistolReloadAnimations,
 *   shotgun: ShotgunReloadAnimations
 * }}
 */
const StaticReloadAnimations = {
    sniper: {
        sniperReloadCock: new Def.StaticAnimation({
            duration: 10, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.sniper_reload_bolt_pull_toward",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.sniper_reload_bolt_pull_away",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        })
    },
    rifle: {
        reloadSwapLight: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_out_light",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_in_light",
                    timeout: 22,
                    soundRange: 40
                }
            ]
        }),
        reloadSwapMedium: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_out_medium",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_in_medium",
                    timeout: 22,
                    soundRange: 40
                }
            ]
        }),
        reloadSwapHeavy: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_out_heavy",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_in_heavy",
                    timeout: 22,
                    soundRange: 40
                }
            ]
        }),
        reloadSwapPubg: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_out_pubg",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_in_pubg",
                    timeout: 22,
                    soundRange: 40
                }
            ]
        }),
        reloadNoSwapLight: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_in_light",
                    timeout: 13,
                    soundRange: 40
                }
            ]
        }),
        reloadNoSwapMedium: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_in_medium",
                    timeout: 13,
                    soundRange: 40
                }
            ]
        }),
        reloadNoSwapHeavy: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_in_heavy",
                    timeout: 13,
                    soundRange: 40
                }
            ]
        }),
        reloadNoSwapPubg: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_in_pubg",
                    timeout: 13,
                    soundRange: 40
                }
            ]
        }),
        reloadCockLight: new Def.StaticAnimation({
            duration: 10, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_cock_toward_light",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_cock_away_light",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        }),
        reloadCockHeavy: new Def.StaticAnimation({
            duration: 10, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_cock_toward_heavy",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_cock_away_heavy",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        }),
        reloadCockPubg: new Def.StaticAnimation({
            duration: 10, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.rifle_reload_magazine_cock_toward_pubg",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.rifle_reload_magazine_cock_away_pubg",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        })
    },
    smg: {
        p90ReloadSwap: new Def.StaticAnimation({
            duration: 45, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.p90_reload_magazine_out",
                    timeout: 6,
                    soundRange: 40
                },
                {
                    soundId: "firearm.p90_reload_magazine_in",
                    timeout: 32,
                    soundRange: 40
                },
                {
                    soundId: "firearm.p90_reload_smack_magazine",
                    timeout: 39,
                    soundRange: 40
                }
            ]
        }),
        p90ReloadNoSwap: new Def.StaticAnimation({
            duration: 32, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.p90_reload_magazine_in",
                    timeout: 18,
                    soundRange: 40
                },
                {
                    soundId: "firearm.p90_reload_smack_magazine",
                    timeout: 25,
                    soundRange: 40
                }
            ]
        }),
        p90ReloadCock: new Def.StaticAnimation({
            duration: 10, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.p90_reload_cock_toward",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.p90_reload_cock_away",
                    timeout: 8,
                    soundRange: 40
                }
            ]
        })
    },
    pistol: {
        reloadSwap: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.pistol_reload_magazine_out",
                    timeout: 16,
                    soundRange: 40
                },
                {
                    soundId: "firearm.pistol_reload_magazine_in",
                    timeout: 23,
                    soundRange: 40
                }
            ]
        }),
        reloadNoSwap: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.p90_reload_magazine_in",
                    timeout: 18,
                    soundRange: 40
                },
                {
                    soundId: "firearm.p90_reload_smack_magazine",
                    timeout: 25,
                    soundRange: 40
                }
            ]
        }),
        reloadCock: new Def.StaticAnimation({
            duration: 10, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.pistol_reload_cock_toward",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.pistol_reload_cock_away",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        })
    },
    shotgun: {
        shotgunReload: new Def.StaticAnimation({
            duration: 15, //in ticks
            type:     Enums.AnimationTypes.ReloadBoth,
            animationSounds: [
                {
                    soundId: "firearm.shotgun_reload_magazine_in",
                    timeout: 10,
                    soundRange: 40
                }
            ]
        }),
        shotgunReloadCock: new Def.StaticAnimation({
            duration: 8, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.shotgun_reload_cock_toward",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.shotgun_reload_cock_away",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        })
    }
}



/**
 * @typedef {{
 *   ak47Shoot: Def.StaticAnimation,
 *   akmShoot: Def.StaticAnimation,
 *   m4a1Shoot: Def.StaticAnimation,
 *   ar15Shoot: Def.StaticAnimation,
 *   hk417Shoot: Def.StaticAnimation
 * }} RifleShootAnimations
 * 
 * @typedef {{
 *   ump45Shoot: Def.StaticAnimation,
 *   p90Shoot: Def.StaticAnimation
 * }} SmgShootAnimations
 * 
 * @typedef {{
 *   mk13ShootWithAmmo: Def.StaticAnimation,
 *   mk13ShootOutOfAmmo: Def.StaticAnimation
 * }} SniperShootAnimations
 * 
 * @typedef {{
 *   remington870ShootWithAmmo: Def.StaticAnimation,
 *   remington870ShootOutOfAmmo: Def.StaticAnimation
 * }} ShotgunShootAnimations
 * 
 * @typedef {{
 *   desertEagleShootWithAmmo: Def.StaticAnimation,
 *   desertEagleShootOutOfAmmo: Def.StaticAnimation
 * }} PistolShootAnimations
 * 
 * @typedef {{
 *   rpg7Shoot: Def.StaticAnimation,
 *   javelinShoot: Def.StaticAnimation
 * }} OtherShootAnimations
 */

/**
 * @enum {Record<string, Def.StaticAnimation>}
 * @type {{
 *   rifle: RifleShootAnimations,
 *   smg: SmgShootAnimations,
 *   sniper: SniperShootAnimations,
 *   shotgun: ShotgunShootAnimations,
 *   pistol: PistolShootAnimations,
 *   other: OtherShootAnimations
 * }}
 */
const StaticShootAnimations = {
    rifle: {
        ak47Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.ak47_shoot"
        }),
        akmShoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.akm_shoot",
                    timeout: 0,
                    soundRange: 187.5
                }
            ],
            animationId: "animation.akm_shoot"
        }),
        m4a1Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.m4a1_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.m4a1_shoot"
        }),
        ar15Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ar15_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.ar15_shoot"
        }),
        hk417Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.hk417_shoot",
                    timeout: 0,
                    soundRange: 187.5
                }
            ],
            animationId: "animation.hk417_shoot"
        })
    },
    smg: {
        ump45Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ump45_shoot",
                    timeout: 0,
                    soundRange: 93.75
                }
            ],
            animationId: "animation.ump45_shoot"
        }),
        p90Shoot:   new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.p90_shoot",
                    timeout: 0,
                    soundRange: 112.5
                }
            ],
            animationId: "animation.p90_shoot"
        })
    },
    sniper: {
        mk13ShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.mk13_shoot",
                    timeout: 0,
                    soundRange: 225
                },
                {
                    soundId: "firearm.sniper_reload_bolt_pull_toward",
                    timeout: 8,
                    soundRange: 40
                },
                {
                    soundId: "firearm.sniper_reload_bolt_pull_away",
                    timeout: 14,
                    soundRange: 40
                }
            ],
            animationId: "animation.mk13_shoot_with_ammo"
        }),
        mk13ShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.mk13_shoot",
                    timeout: 0,
                    soundRange: 225
                }
            ],
            animationId: "animation.mk13_shoot_out_of_ammo"
        })
    },
    shotgun: {
        remington870ShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.remington870_shoot",
                    timeout: 0,
                    soundRange: 150
                },
                {
                    soundId: "firearm.shotgun_reload_cock_toward",
                    timeout: 6,
                    soundRange: 40
                },
                {
                    soundId: "firearm.shotgun_reload_cock_away",
                    timeout: 12,
                    soundRange: 40
                }
            ],
            animationId: "animation.remington870_shoot_with_ammo"
        }),
        remington870ShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.remington870_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.remington870_shoot_out_of_ammo"
        })
    },
    pistol: {
        desertEagleShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.desert_eagle_shoot_with_ammo"
        }),
        desertEagleShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.desert_eagle_shoot_out_of_ammo"
        })
    },
    other: {
        rpg7Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.rpg7_shoot",
                    timeout: 0,
                    soundRange: 281.25
                }
            ],
            animationId: "animation.rpg7_shoot"
        }),
        javelinShoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.javelin_shoot",
                    timeout: 0,
                    soundRange: 281.25
                }
            ],
            animationId: "animation.javelin_shoot"
        })
    }
}


/**
 * @enum {Def.StaticAnimation}
 * @type {{
 * switchFiringModeToSemi:     Def.StaticAnimation,
 * switchFiringModeToAuto:     Def.StaticAnimation,
 * switchScopeZoomToDefault:   Def.StaticAnimation,
 * switchScopeZoomToAlternate: Def.StaticAnimation,
 * }}
 */
const StaticOtherAnimations = {
    switchFiringModeToSemi: new Def.StaticAnimation({
        duration: 9, //in ticks
        type:     Enums.AnimationTypes.SwitchFiringModeToDefault,
        animationSounds: [
            {
                soundId: "firearm.switch_firing_mode_to_default",
                timeout: 0,
                soundRange: 40
            },
        ],
        animationId: "animation.switch_firing_mode"
    }),


    switchFiringModeToAuto: new Def.StaticAnimation({
        duration: 9, //in ticks
        type:     Enums.AnimationTypes.SwitchFiringModeToAlternate,
        animationSounds: [
            {
                soundId: "firearm.switch_firing_mode_to_alternate",
                timeout: 0,
                soundRange: 40
            },
        ],
        animationId: "animation.switch_firing_mode"
    }),


    switchScopeZoomToDefault: new Def.StaticAnimation({
        duration: 12, //in ticks
        type:     Enums.AnimationTypes.SwitchScopeZoomToDefault,
        animationSounds: [
            {
                soundId: "firearm.switch_scope_zoom_to_default",
                timeout: 2,
                soundRange: 40
            },
        ],
        animationId: "animation.switch_scope_zoom"
    }),


    switchScopeZoomToAlternate: new Def.StaticAnimation({
        duration: 12, //in ticks
        type:     Enums.AnimationTypes.SwitchScopeZoomToAlternate,
        animationSounds: [
            {
                soundId: "firearm.switch_scope_zoom_to_alternate",
                timeout: 2,
                soundRange: 40
            },
        ],
        animationId: "animation.switch_scope_zoom"
    })
}
export { StaticReloadAnimations, StaticShootAnimations, StaticOtherAnimations };