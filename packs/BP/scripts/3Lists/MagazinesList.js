import { Global } from '../Global.js';
import * as Def from '../2Definitions/MagazineDefinition.js';
import * as Enums from "../1Enums/MagazineEnums.js"
import { ItemStack } from '@minecraft/server';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { BulletAmmoClasses } from '../1Enums/AmmoEnums.js';
import { TypeUtil } from '../UtilitiesInit.js';
import { NumRange, Vec2Range } from '../2Definitions/GlobalDefinition.js';

/**
 * @enum {Def.Magazine}
 * @type {Record<keyof typeof Enums.MagazineTypeIds, Def.Magazine>}
 */
const MagazineObjects = {
    None: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine30,
        name:                  "AR Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    ARMagazine30: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine30,
        name:                  "AR Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    ARMagazine50: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine50,
        name:                  "AR Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               50,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    DMRMagazine15: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.DMRMagazine15,
        name:                  "DMR Magazine [§a15§7/§a15 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.DMR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               15,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    SMGMagazine24: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.SMGMagazine24,
        name:                  "SMG Magazine [§a24§7/§a24 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.SMG,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               24,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    SniperMagazine3: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.SniperMagazine3,
        name:                  "Sniper Magazine [§a3§7/§a3 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Sniper,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               3,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    PistolMagazine8: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.PistolMagazine8,
        name:                  "Pistol Magazine [§a8§7/§a8 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Pistol,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               8,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),
    
    Birdshot: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Birdshot,
        name:                  "Shotgun Shell",
        magazineClass:         MagazineClasses.Shotgun,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    Ammo9MM: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo9MM,
        name:                  "9mm Bullet",
        magazineClass:         MagazineClasses.Pistol,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    Ammo762MM: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo762MM,
        name:                  "7.62mm Bullet",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    Ammo45ACP: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo45ACP,
        name:                  ".45 ACP Bullet",
        magazineClass:         MagazineClasses.Magnum,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    ExplosiveGrenade: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.ExplosiveGrenade,
        name:                  "Explosive Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: [],
        projectileAttribute: new Def.ProjectileAttribute({
            typeId: "yes:explosive_grenade", 
            speed: 2,
            explosionPower: 1.5,
            spawnOffset: {x: 0.05, y:-0.15, z:2.1}, //x:left-right, y:up-down, z:forward-backward
            shootDirectionOffset: {x:0, y:0.035}, //x:left-right, y:up-down
            shooterKnockback: {x:0, y:0}, //x:forwar-backward, y:up-down
            explosiveDamage: new Def.ExplosiveDamage({
                damage:    new NumRange(3, 15),
                directDamage: 10,
                knockback: new Vec2Range({x:0.7, y:0.2}, {x:1.2, y:0.3}),
                range:     5
            }),
            explosiveCamerashakes: [
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.02,
                    duration: 100,
                    range: 5
                }),
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.008,
                    duration: 200,
                    range: 10
                })
            ],
            explosiveStun: new Def.ExplosiveStunAttribute({
                screenDuration:         new NumRange(2, 25),
                aimRestrictionDuration: new NumRange(10, 30),
                screenDebrisDuration:   new NumRange(20, 150),
                screenFlashDuration:    new NumRange(0, 0),
                movementRestrictionMultiplier: new NumRange(0, 0),
                movementRestrictionDuration: new NumRange(0, 0),
                range: 15
            })
        }),
        particleAttribute: new Def.ParticleAttribute({
            explosionSize: 0.5, //usually 1/3 of explosionPower
            showExplosionFlash:      true,
            showExplosionSparks:     true,
            showExplosionMushroom:   true,
            explosionSmokeType:      "black",
            showExplosionSmokeFlash: true
        })
    }),
    

    FlameGrenade: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.FlameGrenade,
        name:                  "Flame Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: [],
        projectileAttribute: new Def.ProjectileAttribute({
            typeId: "yes:flame_grenade", 
            speed: 2,
            explosionPower: 1,
            spawnOffset: {x: 0.05, y:-0.15, z:2.1}, //x:left-right, y:up-down, z:forward-backward
            shootDirectionOffset: {x:0, y:0.035}, //x:left-right, y:up-down
            shooterKnockback: {x:0, y:0}, //x:forwar-backward, y:up-down
            explosiveDamage: new Def.ExplosiveDamage({
                damage:    new NumRange(3, 10),
                directDamage: 0,
                knockback: new Vec2Range({x:0.7, y:0.2}, {x:1.2, y:0.3}),
                range:     5
            }),
            explosiveCamerashakes: [
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.02,
                    duration: 100,
                    range: 5
                }),
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.008,
                    duration: 200,
                    range: 10
                })
            ],
            explosiveEffect: new Def.ExplosiveEffectAttribute({
                range: 6,
                setFire: {height: 3, chance: 0.65}
            })
        }),
        particleAttribute: new Def.ParticleAttribute({
            explosionSize: 0.333, //usually 1/3 of explosionPower
            showExplosionFlash:      true,
            showExplosionSparks:     false,
            showExplosionMushroom:   true,
            explosionSmokeType:      "black",
            showExplosionSmokeFlash: true
        })
    }),
    
    FlashGrenade: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.FlashGrenade,
        name:                  "Flash Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: [],
        projectileAttribute: new Def.ProjectileAttribute({
            typeId: "yes:flash_grenade", 
            speed: 2,
            explosionPower: 0,
            spawnOffset: {x: 0.05, y:-0.15, z:2.1}, //x:left-right, y:up-down, z:forward-backward
            shootDirectionOffset: {x:0, y:0.035}, //x:left-right, y:up-down
            shooterKnockback: {x:0, y:0}, //x:forwar-backward, y:up-down
            explosiveDamage: new Def.ExplosiveDamage({
                damage:    new NumRange(0, 0),
                directDamage: 0,
                knockback: new Vec2Range({x:0, y:0}, {x:1, y:0}),
                range:     0
            }),
            explosiveCamerashakes: [
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.02,
                    duration: 100,
                    range: 15
                }),
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.008,
                    duration: 200,
                    range: 25
                })
            ],
            explosiveStun: new Def.ExplosiveStunAttribute({
                screenDuration:         new NumRange(2, 25),
                aimRestrictionDuration: new NumRange(10, 30),
                screenDebrisDuration:   new NumRange(20, 150),
                screenFlashDuration:    new NumRange(10, 50),
                movementRestrictionMultiplier: new NumRange(0.5, 1),
                movementRestrictionDuration: new NumRange(50, 10),
                range: 12
            })
        }),
        particleAttribute: new Def.ParticleAttribute({
            explosionSize: 0.5, //usually 1/3 of explosionPower
            showExplosionFlash:      true,
            showExplosionSparks:     true,
            showExplosionMushroom:   false,
            explosionSmokeType:      "white",
            showExplosionSmokeFlash: false
        })
    }),
    

    AcidGrenade: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.AcidGrenade,
        name:                  "Acid Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: [],
        projectileAttribute: new Def.ProjectileAttribute({
            typeId: "yes:acid_grenade", 
            speed: 2,
            explosionPower: 1,
            spawnOffset: {x: 0.05, y:-0.15, z:2.1}, //x:left-right, y:up-down, z:forward-backward
            shootDirectionOffset: {x:0, y:0.035}, //x:left-right, y:up-down
            shooterKnockback: {x:0, y:0}, //x:forwar-backward, y:up-down
            explosiveCamerashakes: [
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.02,
                    duration: 100,
                    range: 5
                }),
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.008,
                    duration: 200,
                    range: 10
                })
            ],
            explosiveEffect: new Def.ExplosiveEffectAttribute({
                range: 10,
                applyPoison: new Def.ApplyPoison({
                    damage: 1, ticksPerDamage: 5, duration: 240,
                    potionEffects: [
                        new Def.PotionEffect({potionType: "slowness", amplifier: 0, duration: 200}),
                        new Def.PotionEffect({potionType: "weakness", amplifier: 0, duration: 200})
                    ]
                })
            })
        }),
        particleAttribute: new Def.ParticleAttribute({
            explosionSize: 1, //usually 1/3 of explosionPower
            showExplosionFlash:      true,
            showExplosionSparks:     false,
            showExplosionMushroom:   false,
            explosionSmokeType:      "none",
            showExplosionSmokeFlash: false
        })
    }),
    
    Rocket: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.Rocket,
        name:                  "Rocket",
        magazineClass:         MagazineClasses.Rocket,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: [],
        projectileAttribute: new Def.ProjectileAttribute({
            typeId: "yes:rocket", 
            speed: 3.5,
            explosionPower: 3,
            spawnOffset: {x: 0.05, y:-0.15, z:2.1}, //x:left-right, y:up-down, z:forward-backward
            shootDirectionOffset: {x:0, y:0.0075}, //x:left-right, y:up-down
            shooterKnockback: {x:-1, y:-0.1}, //x:forwar-backward, y:up-down
            explosiveDamage: new Def.ExplosiveDamage({
                damage:    new NumRange(3, 24),
                directDamage: 99999, //guaranteed direct hit kill if within blast radius
                knockback: new Vec2Range({x:0.7, y:0.2}, {x:1.2, y:0.3}),
                range:     8 
            }),
            explosiveCamerashakes: [
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.02,
                    duration: 100,
                    range: 5
                }),
                new Def.ExplosiveCamerashakeAttribute({
                    intensity: 0.008,
                    duration: 200,
                    range: 10
                })
            ],
            explosiveStun: new Def.ExplosiveStunAttribute({
                screenDuration:         new NumRange(2, 25),
                aimRestrictionDuration: new NumRange(10, 30),
                screenDebrisDuration:   new NumRange(20, 150),
                screenFlashDuration:    new NumRange(0, 0),
                movementRestrictionMultiplier: new NumRange(1, 1),
                movementRestrictionDuration: new NumRange(0, 0),
                range: 15
            })
        }),
        particleAttribute: new Def.ParticleAttribute({
            explosionSize: 1, //usually 1/3 of explosionPower
            showExplosionFlash:      true,
            showExplosionSparks:     true,
            showExplosionMushroom:   true,
            explosionSmokeType:      "black",
            showExplosionSmokeFlash: true
        })
    }),
    
    TeslaAmmo: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.TeslaAmmo,
        name:                  "Tesla Ammo",
        magazineClass:         MagazineClasses.TeslaGun,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               3,
        fillableByAmmoClasses: []
    })
}


for(const [type, typeId] of TypeUtil.getIterable(Enums.MagazineTypeIds)) {
    if(typeId === Enums.MagazineTypeIds.None) { continue; }
    Global.magazines.set(typeId, MagazineObjects[type]);
}

export { MagazineObjects };
console.log("Magazines initialized with no errors.");