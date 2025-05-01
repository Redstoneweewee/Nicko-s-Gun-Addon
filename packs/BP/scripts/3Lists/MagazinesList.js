import { Global } from '../Global.js';
import * as Def from '../2Definitions/MagazineDefinition.js';
import * as Enums from "../1Enums/MagazineEnums.js"
import { ItemStack } from '@minecraft/server';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { BulletClasses } from '../1Enums/AmmoEnums.js';
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
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    ARMagazine30: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine30,
        name:                  "AR Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        itemStack:             new ItemStack("yes:ar_magazine_30", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    ARMagazine50: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ARMagazine50,
        name:                  "AR Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.AR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               50,
        itemStack:             new ItemStack("yes:ar_magazine_50", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    DMRMagazine15: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.DMRMagazine15,
        name:                  "DMR Magazine [§a15§7/§a15 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.DMR,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               15,
        itemStack:             new ItemStack("yes:dmr_magazine_15", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    SMGMagazine24: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.SMGMagazine24,
        name:                  "SMG Magazine [§a24§7/§a24 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.SMG,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               24,
        itemStack:             new ItemStack("yes:smg_magazine_24", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    P90Magazine50: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.P90Magazine50,
        name:                  "P90 Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.P90,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               50,
        itemStack:             new ItemStack("yes:p90_magazine_50", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    SniperMagazine3: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.SniperMagazine3,
        name:                  "Sniper Magazine [§a3§7/§a3 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Sniper,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               3,
        itemStack:             new ItemStack("yes:sniper_magazine_3", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),

    PistolMagazine8: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.PistolMagazine8,
        name:                  "Pistol Magazine [§a8§7/§a8 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Pistol,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               8,
        itemStack:             new ItemStack("yes:pistol_magazine_8", 1),
        fillableByAmmoClasses: [BulletClasses.Normal, BulletClasses.HollowPoint, BulletClasses.ArmorPiercing, BulletClasses.AntiMaterial, BulletClasses.Exploding, BulletClasses.Incendiary]
    }),
    
    ShotgunShell: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.ShotgunShell,
        name:                  "Shotgun Shell",
        magazineClass:         MagazineClasses.Shotgun,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:shotgun_shell", 1),
        fillableByAmmoClasses: []
    }),
}


for(const [type, typeId] of TypeUtil.getIterable(Enums.MagazineTypeIds)) {
    if(typeId === Enums.MagazineTypeIds.None) { continue; }
    Global.magazines.set(typeId, MagazineObjects[type]);
}

export { MagazineObjects };
console.log("Magazines initialized with no errors.");