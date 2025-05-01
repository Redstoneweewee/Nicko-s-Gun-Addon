


/**
 * @enum {string}
 * @type {{
 * None:            "none",
 * ARMagazine30:    "yes:ar_magazine_30",
 * ARMagazine50:    "yes:ar_magazine_50",
 * DMRMagazine15:   "yes:dmr_magazine_15",
 * SMGMagazine24:   "yes:smg_magazine_24",
 * P90Magazine50:   "yes:p90_magazine_50",
 * SniperMagazine3: "yes:sniper_magazine_3",
 * PistolMagazine8: "yes:pistol_magazine_8",
 * ShotgunShell:    "yes:shotgun_shell"
 * }}
 */
const MagazineTypeIds = {
   None:            "none",
   ARMagazine30:    "yes:ar_magazine_30",
   ARMagazine50:    "yes:ar_magazine_50",
   DMRMagazine15:   "yes:dmr_magazine_15",
   SMGMagazine24:   "yes:smg_magazine_24",
   P90Magazine50:   "yes:p90_magazine_50",
   SniperMagazine3: "yes:sniper_magazine_3",
   PistolMagazine8: "yes:pistol_magazine_8",
   ShotgunShell:    "yes:shotgun_shell"
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
* Shotgun: "shotgun",
* RPG:     "rpg",
* Javelin: "javelin",
* MGL:     "mgl"
* }} 
*/
const StackMagazineClasses = {
   //specific weapons
   Shotgun: "shotgun",
   RPG:     "rpg",
   Javelin: "javelin",
   MGL:     "mgl"
}

/** 
* @enum {string}
*/
const MagazineClasses = {
   ...DurabilityMagazineClasses,
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
   P90:     "Round Magazine",
   Minigun: "Round Magazine",

   Shotgun: "Shotgun Shells",
   RPG:     "RPG Rockets",
   Javelin: "Javelin Missiles",
   MGL:     "MGL Shells",
}




export { MagazineTypeIds, MagazineTypes, DurabilityMagazineClasses, StackMagazineClasses, MagazineClasses, MagazineClassTextNames }