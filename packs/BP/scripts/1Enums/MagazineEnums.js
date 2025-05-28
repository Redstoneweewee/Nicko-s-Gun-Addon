


/**
 * @enum {string}
 * @type {{
 * None:             "none",
 * ARMagazine30:     "yes:ar_magazine_30",
 * ARMagazine50:     "yes:ar_magazine_50",
 * DMRMagazine15:    "yes:dmr_magazine_15",
 * SMGMagazine24:    "yes:smg_magazine_24",
 * SniperMagazine3:  "yes:sniper_magazine_3",
 * PistolMagazine8:  "yes:pistol_magazine_8",
 * Ammo12Gauge:      "yes:ammo_12gauge",
 * Ammo762MM:        "yes:ammo_762mm",
 * Ammo9MM:          "yes:ammo_9mm",
 * Ammo45ACP:        "yes:ammo_45acp",
 * ExplosiveGrenade: "yes:explosive_grenade",
 * FlameGrenade:     "yes:flame_grenade",
 * FlashGrenade:     "yes:flash_grenade",
 * AcidGrenade:      "yes:acid_grenade",
 * TeslaAmmo:        "yes:tesla_ammo"
 * }}
 */
const MagazineTypeIds = {
   None:             "none",
   ARMagazine30:     "yes:ar_magazine_30",
   ARMagazine50:     "yes:ar_magazine_50",
   DMRMagazine15:    "yes:dmr_magazine_15",
   SMGMagazine24:    "yes:smg_magazine_24",
   SniperMagazine3:  "yes:sniper_magazine_3",
   PistolMagazine8:  "yes:pistol_magazine_8",
   Ammo12Gauge:      "yes:ammo_12gauge",
   Ammo762MM:        "yes:ammo_762mm",
   Ammo9MM:          "yes:ammo_9mm",
   Ammo45ACP:        "yes:ammo_45acp",
   ExplosiveGrenade: "yes:explosive_grenade",
   FlameGrenade:     "yes:flame_grenade",
   FlashGrenade:     "yes:flash_grenade",
   AcidGrenade:      "yes:acid_grenade",
   TeslaAmmo:        "yes:tesla_ammo"
};



/** 
 * @enum {string}
 * @type {{
 * DurabilityBased: "durabilityBased",
 * StackBased:      "stackBased"
 * }}
 */
const MagazineTypes = {
   DurabilityBased: "durabilityBased",
   StackBased:      "stackBased"
}



/** 
 * @enum {string}
 * @type {{
* Sniper:  "sniper",
* AR:      "ar",
* DMR:     "dmr",
* SMG:     "smg",
* Pistol:  "pistol",
* P90:     "p90",
* Minigun: "minigun"
* }} 
*/
const DurabilityMagazineClasses = {
   Sniper:  "sniper",
   AR:      "ar",
   DMR:     "dmr",
   SMG:     "smg",
   Pistol:  "pistol",
   P90:     "p90",
   Minigun: "minigun"
}

/** 
* @enum {string}
* @type {{
* Sniper:          "sniper",
* AR:              "ar",
* DMR:             "dmr",
* SMG:             "smg",
* Pistol:          "pistol",
* Shotgun:         "shotgun",
* Magnum:          "magnum",
* GrenadeLauncher: "grenadeLauncher",
* TeslaGun:        "teslaGun"
* }} 
*/
const StackMagazineClasses = {
   Sniper:          "sniper",
   AR:              "ar",
   DMR:             "dmr",
   SMG:             "smg",
   Pistol:          "pistol",
   Shotgun:         "shotgun",
   Magnum:          "magnum",
   GrenadeLauncher: "grenadeLauncher",
   TeslaGun:        "teslaGun"
}

/** 
* @enum {string}
*/
const MagazineClasses = {
   ...StackMagazineClasses
}


/** 
 * @enum {string} 
 * @type {Record<keyof typeof MagazineClasses, string>}
 */
const MagazineClassTextNames = {
   Sniper:  "Round Magazine",
   AR:      "Round Magazine",
   DMR:     "Round Magazine",
   SMG:     "Round Magazine",
   Pistol:  "Round Magazine",
   Shotgun: "Shotgun Shells",
   Magnum:  ".45 ACP Bullets",
   GrenadeLauncher: "Grenades",
   TeslaGun: "Tesla Ammo"
}




export { MagazineTypeIds, MagazineTypes, DurabilityMagazineClasses, StackMagazineClasses, MagazineClasses, MagazineClassTextNames }