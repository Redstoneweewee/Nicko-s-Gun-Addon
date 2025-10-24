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
 *   reloadCockPubg: Def.StaticAnimation,
 *   kar98ReloadSwap: Def.StaticAnimation,
 *   kar98ReloadNoSwap: Def.StaticAnimation,
 *   kar98ReloadOpenCock: Def.StaticAnimation,
 *   kar98ReloadCock: Def.StaticAnimation,
 *   stg44ReloadSwap: Def.StaticAnimation,
 *   stg44ReloadNoSwap: Def.StaticAnimation,
 *   stg44ReloadCock: Def.StaticAnimation,
 * }} ARReloadAnimations
 * 
 * @typedef {{
 * p90ReloadSwap: Def.StaticAnimation,
 * p90ReloadNoSwap: Def.StaticAnimation,
 * p90ReloadCock: Def.StaticAnimation
 * }} SmgReloadAnimations
 * 
 * @typedef {{
 * reloadSwap: Def.StaticAnimation,
 * reloadNoSwap: Def.StaticAnimation,
 * magnumReload: Def.StaticAnimation,
 * lugerReloadSwap: Def.StaticAnimation,
 * lugerReloadNoSwap: Def.StaticAnimation,
 * reloadCock: Def.StaticAnimation,
 * lugerReloadCock: Def.StaticAnimation
 * }} PistolReloadAnimations
 * 
 * @typedef {{
 * shotgunReload:          Def.StaticAnimation,
 * agmReload:              Def.StaticAnimation,
 * strikerReload:          Def.StaticAnimation,
 * shotgunReloadCock:      Def.StaticAnimation,
 * agmReloadCock:          Def.StaticAnimation,
 * agmReloadOpenCock:      Def.StaticAnimation,
 * strikerReloadOpenPort:  Def.StaticAnimation,
 * strikerReloadClosePort: Def.StaticAnimation,
 * }} ShotgunReloadAnimations
 * 
 * @typedef {{
 * rpg7ReloadSwap:       Def.StaticAnimation,
 * rpg7ReloadNoSwap:       Def.StaticAnimation,
 * }} OtherReloadAnimations
 */

/**
 * @enum {Record<string, Def.StaticAnimation>}
 * @type {{
 *   sniper:  SniperReloadAnimations,
 *   ar:      ARReloadAnimations,
 *   smg:     SmgReloadAnimations,
 *   pistol:  PistolReloadAnimations,
 *   shotgun: ShotgunReloadAnimations,
 *   other:   OtherReloadAnimations
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
    ar: {
        reloadSwapLight: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.ar_reload_magazine_out_light",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_in_light",
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
                    soundId: "firearm.ar_reload_magazine_out_medium",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_in_medium",
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
                    soundId: "firearm.ar_reload_magazine_out_heavy",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_in_heavy",
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
                    soundId: "firearm.ar_reload_magazine_out_pubg",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_in_pubg",
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
                    soundId: "firearm.ar_reload_magazine_in_light",
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
                    soundId: "firearm.ar_reload_magazine_in_medium",
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
                    soundId: "firearm.ar_reload_magazine_in_heavy",
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
                    soundId: "firearm.ar_reload_magazine_in_pubg",
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
                    soundId: "firearm.ar_reload_magazine_cock_toward_light",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_cock_away_light",
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
                    soundId: "firearm.ar_reload_magazine_cock_toward_heavy",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_cock_away_heavy",
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
                    soundId: "firearm.ar_reload_magazine_cock_toward_pubg",
                    timeout: 2,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_cock_away_pubg",
                    timeout: 6,
                    soundRange: 40
                }
            ]
        }),
        
        kar98ReloadSwap: new Def.StaticAnimation({
            duration: 18, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.kar98_bullet_in_single",
                    timeout: 10,
                    soundRange: 40
                }
            ]
        }),
        kar98ReloadNoSwap: new Def.StaticAnimation({
            duration: 33, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.kar98_clip_in",
                    timeout: 14,
                    soundRange: 40
                },
                {
                    soundId: "firearm.kar98_bullet_in_full",
                    timeout: 21,
                    soundRange: 40
                }
            ]
        }),
        kar98ReloadOpenCock: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadOpenCock,
            animationSounds: [
                {
                    soundId: "firearm.kar98_bolt_pull_toward",
                    timeout: 13,
                    soundRange: 40
                }
            ]
        }),
        kar98ReloadCock: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.kar98_bolt_pull_away",
                    timeout: 9,
                    soundRange: 40
                }
            ]
        }),
        stg44ReloadSwap: new Def.StaticAnimation({
            duration: 36, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.ar_reload_magazine_out_medium",
                    timeout: 10,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_in_medium",
                    timeout: 32,
                    soundRange: 40
                }
            ]
        }),
        stg44ReloadNoSwap: new Def.StaticAnimation({
            duration: 22, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.ar_reload_magazine_in_medium",
                    timeout: 18,
                    soundRange: 40
                }
            ]
        }),
        stg44ReloadCock: new Def.StaticAnimation({
            duration: 15, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.ar_reload_magazine_cock_toward_light",
                    timeout: 5,
                    soundRange: 40
                },
                {
                    soundId: "firearm.ar_reload_magazine_cock_away_light",
                    timeout: 11,
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
        magnumReload: new Def.StaticAnimation({
            duration: 51, //in ticks
            type:     Enums.AnimationTypes.ReloadBoth,
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
        lugerReloadSwap: new Def.StaticAnimation({
            duration: 45, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
                {
                    soundId: "firearm.pistol_reload_magazine_out",
                    timeout: 10,
                    soundRange: 40
                },
                {
                    soundId: "firearm.pistol_reload_magazine_in",
                    timeout: 30,
                    soundRange: 40
                }
            ]
        }),
        lugerReloadNoSwap: new Def.StaticAnimation({
            duration: 27, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
                {
                    soundId: "firearm.pistol_reload_magazine_in",
                    timeout: 13,
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
        }),
        lugerReloadCock: new Def.StaticAnimation({
            duration: 15, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.pistol_reload_cock_away",
                    timeout: 5,
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
        agmReload: new Def.StaticAnimation({
            duration: 15, //in ticks
            type:     Enums.AnimationTypes.ReloadBoth,
            animationSounds: [
                {
                    soundId: "firearm.agm_reload_magazine_in",
                    timeout: 10,
                    soundRange: 40
                }
            ]
        }),
        strikerReload: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ReloadBoth,
            animationSounds: [
                {
                    soundId: "firearm.agm_reload_magazine_in",
                    timeout: 9,
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
        }),
        agmReloadCock: new Def.StaticAnimation({
            duration: 8, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.agm_reload_cock_away",
                    timeout: 4,
                    soundRange: 40
                }
            ]
        }),
        agmReloadOpenCock: new Def.StaticAnimation({
            duration: 8, //in ticks
            type:     Enums.AnimationTypes.ReloadOpenCock,
            animationSounds: [
                {
                    soundId: "firearm.agm_reload_slide_open",
                    timeout: 3,
                    soundRange: 40
                },
                {
                    soundId: "firearm.agm_reload_cock_toward",
                    timeout: 5,
                    soundRange: 40
                }
            ]
        }),
        strikerReloadOpenPort: new Def.StaticAnimation({
            duration: 6, //in ticks
            type:     Enums.AnimationTypes.ReloadOpenCock,
            animationSounds: [
                {
                    soundId: "firearm.agm_reload_slide_open",
                    timeout: 5,
                    soundRange: 40
                },
                {
                    soundId: "firearm.agm_reload_cock_toward",
                    timeout: 5,
                    soundRange: 40
                }
            ]
        }),
        strikerReloadClosePort: new Def.StaticAnimation({
            duration: 6, //in ticks
            type:     Enums.AnimationTypes.ReloadCock,
            animationSounds: [
                {
                    soundId: "firearm.agm_reload_cock_away",
                    timeout: 4,
                    soundRange: 40
                }
            ]
        }),
    },
    other: {
        rpg7ReloadSwap: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadSwap,
            animationSounds: [
            ]
        }),
        rpg7ReloadNoSwap: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ReloadNoSwap,
            animationSounds: [
            ]
        }),
    }
}



/**
 * @typedef {{
 *   ak47Shoot: Def.StaticAnimation,
 *   akmShoot: Def.StaticAnimation,
 *   m4a1Shoot: Def.StaticAnimation,
 *   ar15Shoot: Def.StaticAnimation,
 *   hk417Shoot: Def.StaticAnimation,
 *   m4Shoot: Def.StaticAnimation,
 *   kar98ShootWithAmmo: Def.StaticAnimation,
 *   kar98ShootOutOfAmmo: Def.StaticAnimation,
 *   stg44ShootWithAmmo: Def.StaticAnimation,
 *   stg44ShootOutOfAmmo: Def.StaticAnimation
 * }} ARShootAnimations
 * 
 * @typedef {{
 * ump45Shoot: Def.StaticAnimation,
 * p90Shoot: Def.StaticAnimation
 * mp5Shoot: Def.StaticAnimation
 * }} SmgShootAnimations
 * 
 * @typedef {{
 * mk13ShootWithAmmo: Def.StaticAnimation,
 * mk13ShootOutOfAmmo: Def.StaticAnimation
 * }} SniperShootAnimations
 * 
 * @typedef {{
 * remington870ShootWithAmmo: Def.StaticAnimation,
 * remington870ShootOutOfAmmo: Def.StaticAnimation,
 * agmShootWithAmmo: Def.StaticAnimation,
 * agmShootOutOfAmmo: Def.StaticAnimation,
 * benelliShoot: Def.StaticAnimation,
 * strikerShoot: Def.StaticAnimation
 * }} ShotgunShootAnimations
 * 
 * @typedef {{
 * desertEagleShootWithAmmo: Def.StaticAnimation,
 * desertEagleShootOutOfAmmo: Def.StaticAnimation,
 * m92fShootWithAmmo: Def.StaticAnimation,
 * m92fShootOutOfAmmo: Def.StaticAnimation,
 * makarovShootWithAmmo: Def.StaticAnimation,
 * makarovShootOutOfAmmo: Def.StaticAnimation,
 * uspShootWithAmmo: Def.StaticAnimation,
 * uspShootOutOfAmmo: Def.StaticAnimation,
 * lugerShootWithAmmo: Def.StaticAnimation,
 * lugerShootOutOfAmmo: Def.StaticAnimation
 * }} PistolShootAnimations
 * 
 * @typedef {{
 * rpg7Shoot: Def.StaticAnimation,
 * javelinShoot: Def.StaticAnimation
 * }} OtherShootAnimations
 */

/**
 * @enum {Record<string, Def.StaticAnimation>}
 * @type {{
 *   ar: ARShootAnimations,
 *   smg: SmgShootAnimations,
 *   sniper: SniperShootAnimations,
 *   shotgun: ShotgunShootAnimations,
 *   pistol: PistolShootAnimations,
 *   other: OtherShootAnimations
 * }}
 */
const StaticShootAnimations = {
    ar: {
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
        }),
        m4Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.m4_shoot"
        }),
        kar98ShootWithAmmo: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.kar98_shoot",
                    timeout: 0,
                    soundRange: 200
                },
                {
                    soundId: "firearm.kar98_bolt_pull_toward",
                    timeout: 9,
                    soundRange: 40
                },
                {
                    soundId: "firearm.kar98_bolt_pull_away",
                    timeout: 12,
                    soundRange: 40
                }
            ],
            animationId: "animation.kar98_shoot_with_ammo"
        }),
        kar98ShootOutOfAmmo: new Def.StaticAnimation({
            duration: 20, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.kar98_shoot",
                    timeout: 0,
                    soundRange: 200
                }
            ],
            animationId: "animation.kar98_shoot_out_of_ammo"
        }),
        stg44ShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.stg44_shoot_with_ammo"
        }),
        stg44ShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.stg44_shoot_out_of_ammo"
        }),
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
        }),
        mp5Shoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.mp5_shoot"
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
        }),
        agmShootWithAmmo: new Def.StaticAnimation({
            duration: 40, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.agm_shoot",
                    timeout: 0,
                    soundRange: 150
                },
                {
                    soundId: "firearm.agm_reload_cock_toward",
                    timeout: 11,
                    soundRange: 40
                },
                {
                    soundId: "firearm.agm_reload_cock_away",
                    timeout: 23,
                    soundRange: 40
                }
            ],
            animationId: "animation.agm_shoot_with_ammo"
        }),
        agmShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.agm_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.agm_shoot_out_of_ammo"
        }),
        benelliShoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.benelli_shoot"
        }),
        strikerShoot: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.Shoot,
            animationSounds: [
                {
                    soundId: "firearm.ak47_shoot",
                    timeout: 0,
                    soundRange: 150
                }
            ],
            animationId: "animation.striker_shoot"
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
        }),
        m92fShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.m92f_shoot_with_ammo"
        }),
        m92fShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.m92f_shoot_out_of_ammo"
        }),
        makarovShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.makarov_shoot_with_ammo"
        }),
        makarovShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.makarov_shoot_out_of_ammo"
        }),
        uspShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.usp_shoot_with_ammo"
        }),
        uspShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.usp_shoot_out_of_ammo"
        }),
        lugerShootWithAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootWithAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.luger_shoot_with_ammo"
        }),
        lugerShootOutOfAmmo: new Def.StaticAnimation({
            duration: 30, //in ticks
            type:     Enums.AnimationTypes.ShootOutOfAmmo,
            animationSounds: [
                {
                    soundId: "firearm.desert_eagle_shoot",
                    timeout: 0,
                    soundRange: 168.75
                }
            ],
            animationId: "animation.luger_shoot_out_of_ammo"
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

