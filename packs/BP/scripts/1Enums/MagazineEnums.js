


/**
 * @enum {string}
 * @type {{
 * None:             "none",
 * Birdshot:      "yes:birdshot",
 * Ammo762MM:        "yes:ammo_762mm",
 * Ammo9MM:          "yes:ammo_9mm",
 * Ammo45ACP:        "yes:ammo_45acp",
 * ExplosiveGrenade: "yes:explosive_grenade",
 * FlameGrenade:     "yes:flame_grenade",
 * FlashGrenade:     "yes:flash_grenade",
 * AcidGrenade:      "yes:acid_grenade",
 * Rocket:           "yes:rocket",
 * TeslaAmmo:        "yes:tesla_ammo"
 * }}
 */
const MagazineTypeIds = {
   None:             "none",
   Birdshot:      "yes:birdshot",
   Ammo762MM:        "yes:ammo_762mm",
   Ammo9MM:          "yes:ammo_9mm",
   Ammo45ACP:        "yes:ammo_45acp",
   ExplosiveGrenade: "yes:explosive_grenade",
   FlameGrenade:     "yes:flame_grenade",
   FlashGrenade:     "yes:flash_grenade",
   AcidGrenade:      "yes:acid_grenade",
   Rocket:           "yes:rocket",
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
* Tesla:  "tesla"
* }} 
*/
const DurabilityMagazineClasses = {
   Tesla:  "tesla"
}

/** 
* @enum {string}
* @type {{
* Ammo762MM:        "762mm",
* Ammo9MM:          "9mm",
* Ammo45ACP:        "45ACP",
* ShotgunShell:     "birdshot",
* Grenade:          "grenade",
* Rocket:           "rocket"
* }} 
*/
const StackMagazineClasses = {
   Ammo762MM:        "762mm",
   Ammo9MM:          "9mm",
   Ammo45ACP:        "45ACP",
   ShotgunShell:     "birdshot",
   Grenade:          "grenade",
   Rocket:           "rocket"
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
   Ammo762MM:        "Rounds",
   Ammo9MM:          "Rounds",
   Ammo45ACP:        "Rounds",
   ShotgunShell:     "Shells",
   Grenade:          "Grenades",
   Rocket:           "Rockets",
   Tesla:            "Tesla Shots"
}



export { MagazineTypeIds, MagazineTypes, DurabilityMagazineClasses, StackMagazineClasses, MagazineClasses, MagazineClassTextNames }