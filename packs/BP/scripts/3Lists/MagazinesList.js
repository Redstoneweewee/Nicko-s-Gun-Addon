import { Global } from '../Global.js';
import * as Def from '../2Definitions/MagazineDefinition.js';
import * as Enums from "../1Enums/MagazineEnums.js"
import * as FirearmEnums from "../1Enums/FirearmEnums.js"
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
        itemTypeId:            Enums.MagazineTypeIds.Ammo9MM,
        name:                  "9mm Bullet",
        magazineClass:         MagazineClasses.Ammo9MM,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),
    Birdshot: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Birdshot,
        name:                  "Shotgun Shell",
        magazineClass:         MagazineClasses.ShotgunShell,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    Ammo9MM: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo9MM,
        name:                  "9mm Bullet",
        magazineClass:         MagazineClasses.Ammo9MM,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    Ammo762MM: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo762MM,
        name:                  "7.62mm Bullet",
        magazineClass:         MagazineClasses.Ammo762MM,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    Ammo45ACP: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo45ACP,
        name:                  ".45 ACP Bullet",
        magazineClass:         MagazineClasses.Ammo45ACP,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        fillableByAmmoClasses: []
    }),
    
    ExplosiveGrenade: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.ExplosiveGrenade,
        name:                  "Explosive Grenade",
        magazineClass:         MagazineClasses.Grenade,
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
                damage:    new NumRange(15, 30),
                directDamage: 30,
                knockback: new Vec2Range(FirearmEnums.KnockbackAmounts.High, FirearmEnums.KnockbackAmounts.VeryHigh),
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
        magazineClass:         MagazineClasses.Grenade,
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
                damage:    new NumRange(10, 20),
                directDamage: 50,
                knockback: new Vec2Range(FirearmEnums.KnockbackAmounts.Medium, FirearmEnums.KnockbackAmounts.Medium),
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
        magazineClass:         MagazineClasses.Grenade,
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
                directDamage: 50,
                knockback: new Vec2Range(FirearmEnums.KnockbackAmounts.High, FirearmEnums.KnockbackAmounts.VeryHigh),
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
                aimRestrictionDuration: new NumRange(20, 80),
                screenDebrisDuration:   new NumRange(40, 200),
                screenFlashDuration:    new NumRange(20, 100),
                movementRestrictionMultiplier: new NumRange(0.5, 1),
                movementRestrictionDuration: new NumRange(100, 20),
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
        magazineClass:         MagazineClasses.Grenade,
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
            explosiveDamage: new Def.ExplosiveDamage({
                damage:    new NumRange(0, 0),
                directDamage: 50,
                knockback: new Vec2Range(FirearmEnums.KnockbackAmounts.Low, FirearmEnums.KnockbackAmounts.Low),
                range:     0
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
                damage:    new NumRange(20, 60),
                directDamage: 99999, //guaranteed direct hit kill if within blast radius
                knockback: new Vec2Range(FirearmEnums.KnockbackAmounts.High, FirearmEnums.KnockbackAmounts.VeryHigh),
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
        magazineClass:         MagazineClasses.Tesla,
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