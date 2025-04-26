


/**
 * @enum {string}
 * @type {{
 * none: "none",
 * rifleMagazine30:         "yes:rifle_magazine_30",
 * rifleMagazine50:         "yes:rifle_magazine_50",
 * marksmanRifleMagazine15: "yes:marksman_rifle_magazine_15",
 * smgMagazine24:           "yes:smg_magazine_24",
 * p90Magazine50:           "yes:p90_magazine_50",
 * sniperMagazine3:         "yes:sniper_magazine_3",
 * pistolMagazine8:         "yes:pistol_magazine_8",
 * shotgunShell:            "yes:shotgun_shell",
 * }}
 */
const MagazineTypeIds = {
   none: "none",
   rifleMagazine30:         "yes:rifle_magazine_30",
   rifleMagazine50:         "yes:rifle_magazine_50",
   marksmanRifleMagazine15: "yes:marksman_rifle_magazine_15",
   smgMagazine24:           "yes:smg_magazine_24",
   p90Magazine50:           "yes:p90_magazine_50",
   sniperMagazine3:         "yes:sniper_magazine_3",
   pistolMagazine8:         "yes:pistol_magazine_8",
   shotgunShell:            "yes:shotgun_shell"
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
* Sniper:        "sniper",
* Rifle:         "rifle",
* MarksmanRifle: "marksmanRifle",
* Smg:           "smg",
* Pistol:        "pistol",
* P90:           "p90",
* Minigun:       "minigun"
* }} 
*/
const DurabilityMagazineClasses = {
   Sniper:        "sniper",
   Rifle:         "rifle",
   MarksmanRifle: "marksmanRifle",
   Smg:           "smg",
   Pistol:        "pistol",
   P90:           "p90",
   Minigun:       "minigun"
}

/** 
* @enum {string}
* @type {{
* Shotgun: "shotgun",
* Rpg:     "rpg",
* Javelin: "javelin",
* Mgl:     "mgl"
* }} 
*/
const StackMagazineClasses = {
   //specific weapons
   Shotgun: "shotgun",
   Rpg:     "rpg",
   Javelin: "javelin",
   Mgl:     "mgl"
}

/** 
* @enum {string}
*/
const MagazineClasses = {
   ...DurabilityMagazineClasses,
   ...StackMagazineClasses
}






export { MagazineTypeIds, MagazineTypes, DurabilityMagazineClasses, StackMagazineClasses, MagazineClasses }