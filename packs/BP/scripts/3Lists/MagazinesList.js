import { Global } from '../Global.js';
import * as Def from '../2Definitions/MagazineDefinition.js';
import { ItemStack } from '@minecraft/server';
import { MagazineClasses } from '../2Definitions/FirearmDefinition.js';
import { BulletClasses } from '../1Enums/AmmoEnums.js';


/**
 * @typedef {{
 * none: "none",
 * rifleMagazine30:         "yes:rifle_magazine_30",
 * rifleMagazine50:         "yes:rifle_magazine_50",
 * marksmanRifleMagazine15: "yes:marksman_rifle_magazine_15",
 * smgMagazine24:           "yes:smg_magazine_24",
 * p90Magazine50:           "yes:p90_magazine_50",
 * sniperMagazine3:         "yes:sniper_magazine_3",
 * pistolMagazine8:         "yes:pistol_magazine_8",
 * shotgunShell:            "yes:shotgun_shell",
 * }} MagazineTagsDef
 */

/** 
 * @type { MagazineTagsDef 
 * & Iterable<[keyof MagazineTagsDef, MagazineTagsDef[keyof MagazineTagsDef]]>
 * } 
 */
const MagazineTags = {
    none: "none",
    rifleMagazine30:         "yes:rifle_magazine_30",
    rifleMagazine50:         "yes:rifle_magazine_50",
    marksmanRifleMagazine15: "yes:marksman_rifle_magazine_15",
    smgMagazine24:           "yes:smg_magazine_24",
    p90Magazine50:           "yes:p90_magazine_50",
    sniperMagazine3:         "yes:sniper_magazine_3",
    pistolMagazine8:         "yes:pistol_magazine_8",
    shotgunShell:            "yes:shotgun_shell",

    /** @returns {Generator<[keyof MagazineTagsDef, MagazineTagsDef[keyof MagazineTagsDef]]>} */
    [Symbol.iterator]: function* () {
        for (const key in this) {
            if (typeof this[key] !== "string") { continue; }
            yield /** @type {[keyof MagazineTagsDef, MagazineTagsDef[keyof MagazineTagsDef]]} */ ([key, this[key]]);
        }
    }
};

const MagazineObjects = {
    rifleMagazine30: new Def.Magazine(
        "yes:rifle_magazine_30",
        "Rifle Magazine [§a30§7/§a30 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.Rifle,
        Def.MagazineTypes.durabilityBased,
        30,
        new ItemStack("yes:rifle_magazine_30", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),

    rifleMagazine50: new Def.Magazine("yes:rifle_magazine_50",
        "Rifle Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.Rifle,
        Def.MagazineTypes.durabilityBased,
        50,
        new ItemStack("yes:rifle_magazine_50", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),

    marksmanRifleMagazine15: new Def.Magazine("yes:marksman_rifle_magazine_15",
        "Marksman Rifle Magazine [§a15§7/§a15 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.MarksmanRifle,
        Def.MagazineTypes.durabilityBased,
        15,
        new ItemStack("yes:marksman_rifle_magazine_15", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),

    smgMagazine24: new Def.Magazine("yes:smg_magazine_24",
        "SMG Magazine [§a24§7/§a24 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.Smg,
        Def.MagazineTypes.durabilityBased,
        24,
        new ItemStack("yes:smg_magazine_24", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),

    p90Magazine50: new Def.Magazine("yes:p90_magazine_50",
        "P90 Magazine [§a50§7/§a50 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.P90,
        Def.MagazineTypes.durabilityBased,
        50,
        new ItemStack("yes:p90_magazine_50", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),

    sniperMagazine3: new Def.Magazine("yes:sniper_magazine_3",
        "Sniper Magazine [§a3§7/§a3 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.Sniper,
        Def.MagazineTypes.durabilityBased,
        3,
        new ItemStack("yes:sniper_magazine_3", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),

    pistolMagazine8: new Def.Magazine("yes:pistol_magazine_8",
        "Pistol Magazine [§a8§7/§a8 Rounds§f]\n§7[Interact to load ammo in]",
        MagazineClasses.Pistol,
        Def.MagazineTypes.durabilityBased,
        8,
        new ItemStack("yes:pistol_magazine_8", 1),
        [BulletClasses.normal, BulletClasses.hollowPoint, BulletClasses.armorPiercing, BulletClasses.antiMaterial, BulletClasses.exploding, BulletClasses.incendiary]
    ),
    
    shotgunShell: new Def.Magazine("yes:shotgun_shell",
        "Shotgun Shell",
        MagazineClasses.Shotgun,
        Def.MagazineTypes.stackBased,
        64,
        new ItemStack("yes:shotgun_shell", 1),
        []
    ),
}


for(const pair of MagazineTags) {
    if(pair[1] === MagazineTags.none) { continue; }
    Global.magazines.set(pair[1], MagazineObjects[pair[0]]);
}

export { MagazineObjects, MagazineTags };
console.log("Magazines initialized with no errors.");