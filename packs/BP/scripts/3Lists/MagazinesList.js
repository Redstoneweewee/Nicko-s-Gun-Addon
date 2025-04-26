import { Global } from '../Global.js';
import * as Def from '../2Definitions/MagazineDefinition.js';
import * as Enums from "../1Enums/MagazineEnums.js"
import { ItemStack } from '@minecraft/server';
import { MagazineClasses } from '../1Enums/MagazineEnums.js';
import { BulletClasses } from '../1Enums/AmmoEnums.js';
import { TypeUtil } from '../Utilities.js';

/**
 * @enum {Def.Magazine}
 * @type {Record<keyof typeof Enums.MagazineTypeIds, Def.Magazine>}
 */
const MagazineObjects = {
    none: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.rifleMagazine30,
        name:                  "Rifle Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Rifle,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        itemStack:             new ItemStack("yes:rifle_magazine_30", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    rifleMagazine30:           new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.rifleMagazine30,
        name:                  "Rifle Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Rifle,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               30,
        itemStack:             new ItemStack("yes:rifle_magazine_30", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    rifleMagazine50: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.rifleMagazine50,
        name:                  "Rifle Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Rifle,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               50,
        itemStack:             new ItemStack("yes:rifle_magazine_50", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    marksmanRifleMagazine15: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.marksmanRifleMagazine15,
        name:                  "Marksman Rifle Magazine [§a15§7/§a15 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.MarksmanRifle,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               15,
        itemStack:             new ItemStack("yes:marksman_rifle_magazine_15", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    smgMagazine24: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.smgMagazine24,
        name:                  "SMG Magazine [§a24§7/§a24 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Smg,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               24,
        itemStack:             new ItemStack("yes:smg_magazine_24", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    p90Magazine50: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.p90Magazine50,
        name:                  "P90 Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.P90,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               50,
        itemStack:             new ItemStack("yes:p90_magazine_50", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    sniperMagazine3: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.sniperMagazine3,
        name:                  "Sniper Magazine [§a3§7/§a3 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Sniper,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               3,
        itemStack:             new ItemStack("yes:sniper_magazine_3", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),

    pistolMagazine8: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.pistolMagazine8,
        name:                  "Pistol Magazine [§a8§7/§a8 Rounds§f]\n§7[Interact to load ammo in]",
        magazineClass:         MagazineClasses.Pistol,
        magazineType:          Enums.MagazineTypes.DurabilityBased,
        maxAmmo:               8,
        itemStack:             new ItemStack("yes:pistol_magazine_8", 1),
        fillableByAmmoClasses: [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    }),
    
    shotgunShell: new Def.Magazine({
        itemTypeId:            Enums.MagazineTypeIds.shotgunShell,
        name:                  "Shotgun Shell",
        magazineClass:         MagazineClasses.Shotgun,
        magazineType:          Enums.MagazineTypes.StackBased,
        maxAmmo:               64,
        itemStack:             new ItemStack("yes:shotgun_shell", 1),
        fillableByAmmoClasses: []
    }),
}


for(const [type, typeId] of TypeUtil.getIterable(Enums.MagazineTypeIds)) {
    if(typeId === Enums.MagazineTypeIds.none) { continue; }
    Global.magazines.set(typeId, MagazineObjects[type]);
}

export { MagazineObjects };
console.log("Magazines initialized with no errors.");