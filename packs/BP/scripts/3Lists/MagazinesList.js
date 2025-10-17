import { Global } from '../Global.js';
import * as Def from '../2Definitions/MagazineDefinition.js';
import * as Enums from "../1Enums/MagazineEnums.js"
import { ItemStack } from '@minecraft/server';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { BulletAmmoClasses } from '../1Enums/AmmoEnums.js';
import { TypeUtil } from '../UtilitiesInit.js';

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
        itemStack:             new ItemStack("yes:ar_magazine_30", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    ARMagazine30: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine30,
        name:                  "AR Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        itemStack:             new ItemStack("yes:ar_magazine_30", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    ARMagazine50: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine50,
        name:                  "AR Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               50,
        itemStack:             new ItemStack("yes:ar_magazine_50", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    DMRMagazine15: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.DMRMagazine15,
        name:                  "DMR Magazine [§a15§7/§a15 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.DMR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               15,
        itemStack:             new ItemStack("yes:dmr_magazine_15", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    SMGMagazine24: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.SMGMagazine24,
        name:                  "SMG Magazine [§a24§7/§a24 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.SMG,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               24,
        itemStack:             new ItemStack("yes:smg_magazine_24", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    SniperMagazine3: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.SniperMagazine3,
        name:                  "Sniper Magazine [§a3§7/§a3 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Sniper,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               3,
        itemStack:             new ItemStack("yes:sniper_magazine_3", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),

    PistolMagazine8: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.PistolMagazine8,
        name:                  "Pistol Magazine [§a8§7/§a8 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Pistol,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               8,
        itemStack:             new ItemStack("yes:pistol_magazine_8", 1),
        fillableByAmmoClasses: [BulletAmmoClasses.Normal, BulletAmmoClasses.HollowPoint, BulletAmmoClasses.ArmorPiercing, BulletAmmoClasses.AntiMaterial, BulletAmmoClasses.Exploding, BulletAmmoClasses.Incendiary]
    }),
    
    Birdshot: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Birdshot,
        name:                  "Shotgun Shell",
        magazineClass:         MagazineClasses.Shotgun,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:birdshot", 1),
        fillableByAmmoClasses: []
    }),
    
    Ammo9MM: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo9MM,
        name:                  "9mm Bullet",
        magazineClass:         MagazineClasses.Pistol,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:ammo_9mm", 1),
        fillableByAmmoClasses: []
    }),
    
    Ammo762MM: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo762MM,
        name:                  "7.62mm Bullet",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:ammo_762mm", 1),
        fillableByAmmoClasses: []
    }),
    
    Ammo45ACP: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.Ammo45ACP,
        name:                  ".45 ACP Bullet",
        magazineClass:         MagazineClasses.Magnum,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:ammo_45acp", 1),
        fillableByAmmoClasses: []
    }),
    
    ExplosiveGrenade: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ExplosiveGrenade,
        name:                  "Explosive Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:explosive_grenade", 1),
        fillableByAmmoClasses: []
    }),
    
    FlameGrenade: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.FlameGrenade,
        name:                  "Flame Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:flame_grenade", 1),
        fillableByAmmoClasses: []
    }),
    
    FlashGrenade: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.FlashGrenade,
        name:                  "Flash Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:flash_grenade", 1),
        fillableByAmmoClasses: []
    }),
    
    AcidGrenade: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.AcidGrenade,
        name:                  "Acid Grenade",
        magazineClass:         MagazineClasses.GrenadeLauncher,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:acid_grenade", 1),
        fillableByAmmoClasses: []
    }),
    
    Rocket: new Def.ExplosiveMagazineAmmo({
        itemTypeId:            Enums.MagazineTypeIds.Rocket,
        name:                  "Rocket",
        magazineClass:         MagazineClasses.Rocket,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:rocket", 1),
        fillableByAmmoClasses: [],
        projectileAttribute: new Def.ProjectileAttribute({
            explosiveDamage: new Def.ExplosiveDamage({
                maxDamage: 20,
                minDamage: 10,
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
                minScreenDuration: 2,
                maxScreenDuration: 25,
                minAimRestrictionDuration: 10,
                maxAimRestrictionDuration: 30,
                minScreenDebrisDuration: 20,  //unused
                maxScreenDebrisDuration: 150,
                range: 15
            }),
            typeId: "yes:rocket", 
            speed: 3.5,
            spawnOffset: {x: 0.05, y:-0.15, z:2.1}, //x:left-right, y:up-down, z:forward-backward
            shootDirectionOffset: {x:0, y:0.0075} //x:left-right, y:up-down
        })
    }),
    
    TeslaAmmo: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.TeslaAmmo,
        name:                  "Tesla Ammo",
        magazineClass:         MagazineClasses.TeslaGun,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:tesla_ammo", 1),
        fillableByAmmoClasses: []
    })
}


for(const [type, typeId] of TypeUtil.getIterable(Enums.MagazineTypeIds)) {
    if(typeId === Enums.MagazineTypeIds.None) { continue; }
    Global.magazines.set(typeId, MagazineObjects[type]);
}

export { MagazineObjects };
console.log("Magazines initialized with no errors.");