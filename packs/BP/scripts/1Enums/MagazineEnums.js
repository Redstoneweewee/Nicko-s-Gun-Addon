


/**
 * @enum {string}
 * @type {{
 * none: "none",
 * arMagazine30:    "yes:ar_magazine_30",
 * arMagazine50:    "yes:ar_magazine_50",
 * dmrMagazine15:   "yes:dmr_magazine_15",
 * smgMagazine24:   "yes:smg_magazine_24",
 * p90Magazine50:   "yes:p90_magazine_50",
 * sniperMagazine3: "yes:sniper_magazine_3",
 * pistolMagazine8: "yes:pistol_magazine_8",
 * shotgunShell:    "yes:shotgun_shell"
 * }}
 */
const MagazineTypeIds = {
   none: "none",
   arMagazine30:    "yes:ar_magazine_30",
   arMagazine50:    "yes:ar_magazine_50",
   dmrMagazine15:   "yes:dmr_magazine_15",
   smgMagazine24:   "yes:smg_magazine_24",
   p90Magazine50:   "yes:p90_magazine_50",
   sniperMagazine3: "yes:sniper_magazine_3",
   pistolMagazine8: "yes:pistol_magazine_8",
   shotgunShell:    "yes:shotgun_shell"
};



/** 
 * @enum {string}
 * @type {{
 * DurabilityBased: "durabilityBased",
 * StackBased: "stackBased"
 * }}
 */
const MagazineTypes = {
    DurabilityBased: "durabilityBased",
    StackBased: "stackBased"
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
 * @type {Record<typeof MagazineClasses[keyof typeof MagazineClasses], string>}
 */
const MagazineClassTextNames = {
   sniper:  "Round Magazine",
   ar:      "Round Magazine",
   dmr:     "Round Magazine",
   smg:     "Round Magazine",
   pistol:  "Round Magazine",
   p90:     "Round Magazine",
   minigun: "Round Magazine",

   shotgun: "Shotgun Shells",
   rpg:     "RPG Rockets",
   javelin: "Javelin Missiles",
   mgl:     "MGL Shells",
}




export { MagazineTypeIds, MagazineTypes, DurabilityMagazineClasses, StackMagazineClasses, MagazineClasses, MagazineClassTextNames }