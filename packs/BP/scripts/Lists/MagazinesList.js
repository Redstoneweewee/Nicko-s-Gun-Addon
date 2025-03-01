import { Global } from '../Global.js';
import * as Def from '../Definitions/MagazineDefinition.js';
import { ItemStack } from '@minecraft/server';
import { AmmoTypes } from '../Definitions/FirearmDefinition.js';

var magazinesList = {
    "yes:rifle_magazine_30":           new Def.Magazine("yes:rifle_magazine_30",
                                                        "Rifle Magazine [§a30§7/§a30 Rounds§f]",
                                                        AmmoTypes.Rifle,
                                                        30,
                                                        new ItemStack("yes:rifle_magazine_30", 1),
                                                        Def.BulletTypes.bullet,
                                                        false),

    "yes:rifle_magazine_50":           new Def.Magazine("yes:rifle_magazine_50",
                                                        "Rifle Magazine [§a50§7/§a50 Rounds§f]",
                                                        AmmoTypes.Rifle,
                                                        50,
                                                        new ItemStack("yes:rifle_magazine_50", 1),
                                                        Def.BulletTypes.bullet,
                                                        false), 

    "yes:marksman_rifle_magazine_15":  new Def.Magazine("yes:marksman_rifle_magazine_15",
                                                        "Marksman Rifle Magazine [§a15§7/§a15 Rounds§f]",
                                                        AmmoTypes.MarksmanRifle,
                                                        15,
                                                        new ItemStack("yes:marksman_rifle_magazine_15", 1),
                                                        Def.BulletTypes.bullet,
                                                        false), 

    "yes:smg_magazine_24":             new Def.Magazine("yes:smg_magazine_24",
                                                        "SMG Magazine [§a24§7/§a24 Rounds§f]",
                                                        AmmoTypes.Smg,
                                                        24,
                                                        new ItemStack("yes:smg_magazine_24", 1),
                                                        Def.BulletTypes.bullet,
                                                        false),

    "yes:p90_magazine_50":             new Def.Magazine("yes:p90_magazine_50",
                                                        "P90 Magazine [§a50§7/§a50 Rounds§f]",
                                                        AmmoTypes.P90,
                                                        50,
                                                        new ItemStack("yes:p90_magazine_50", 1),
                                                        Def.BulletTypes.bullet,
                                                        false),

    "yes:sniper_magazine_3":           new Def.Magazine("yes:sniper_magazine_3",
                                                        "Sniper Magazine [§a3§7/§a3 Rounds§f]",
                                                        AmmoTypes.Sniper,
                                                        3,
                                                        new ItemStack("yes:sniper_magazine_3", 1),
                                                        Def.BulletTypes.bullet,
                                                        false),

    "yes:pistol_magazine_8":           new Def.Magazine("yes:pistol_magazine_8",
                                                        "Pistol Magazine [§a8§7/§a8 Rounds§f]",
                                                        AmmoTypes.Pistol,
                                                        8,
                                                        new ItemStack("yes:pistol_magazine_8", 1),
                                                        Def.BulletTypes.bullet,
                                                        false),
                                                        
    "yes:shotgun_magazine_6":          new Def.Magazine("yes:shotgun_magazine_6",
                                                        "Shotgun Magazine [§a6§7/§a6 Shells§f]",
                                                        AmmoTypes.Shotgun,
                                                        6,
                                                        new ItemStack("yes:shotgun_magazine_6", 1),
                                                        Def.BulletTypes.shotgunShell,
                                                        true)
}


const MagazineTags = {
    "none": "none",
    "yes:rifle_magazine_30":          "yes:rifle_magazine_30",
    "yes:rifle_magazine_50":          "yes:rifle_magazine_50",
    "yes:marksman_rifle_magazine_15": "yes:marksman_rifle_magazine_15",
    "yes:smg_magazine_24":            "yes:smg_magazine_24",
    "yes:p90_magazine_50":            "yes:p90_magazine_50",
    "yes:sniper_magazine_3":          "yes:sniper_magazine_3",
    "yes:pistol_magazine_8":          "yes:pistol_magazine_8",
    "yes:shotgun_magazine_6":         "yes:shotgun_magazine_6"
}


Global.magazines.set(MagazineTags["yes:rifle_magazine_30"],          magazinesList["yes:rifle_magazine_30"]);
Global.magazines.set(MagazineTags["yes:rifle_magazine_50"],          magazinesList["yes:rifle_magazine_50"]);
Global.magazines.set(MagazineTags["yes:marksman_rifle_magazine_15"], magazinesList["yes:marksman_rifle_magazine_15"]);
Global.magazines.set(MagazineTags["yes:smg_magazine_24"],            magazinesList["yes:smg_magazine_24"]);
Global.magazines.set(MagazineTags["yes:p90_magazine_50"],            magazinesList["yes:p90_magazine_50"]);
Global.magazines.set(MagazineTags["yes:sniper_magazine_3"],          magazinesList["yes:sniper_magazine_3"]);
Global.magazines.set(MagazineTags["yes:pistol_magazine_8"],          magazinesList["yes:pistol_magazine_8"]);
Global.magazines.set(MagazineTags["yes:shotgun_magazine_6"],         magazinesList["yes:shotgun_magazine_6"]);

export { magazinesList, MagazineTags };
console.log("Magazines initialized with no errors.");