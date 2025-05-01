/** 
 * @enum {string}
 * @type {{
 * Normal:        "normal",
 * HollowPoint:   "hollowPoint",
 * ArmorPiercing: "armorPiercing",
 * AntiMaterial:  "antiMaterial",
 * Exploding:     "exploding",
 * Incendiary:    "incendiary"
 * }}
 */
const BulletClasses = {
    Normal:        "normal",
    HollowPoint:   "hollowPoint",
    ArmorPiercing: "armorPiercing",
    AntiMaterial:  "antiMaterial",
    Exploding:     "exploding",
    Incendiary:    "incendiary"
}

/** 
 * @enum {string}
 * @type {{
 * Birdshot: "birdshot",
 * Buckshot: "buckshot",
 * Slug:     "slug"
 * }}
 */
const ShotgunShellClasses = {
    Birdshot: "birdshot",
    Buckshot: "buckshot",
    Slug:     "slug"
}

/** 
* @enum {string}
*/
const AmmoClasses = {
   ...BulletClasses,
   ...ShotgunShellClasses
};


/**
 * 
   tryGetClass(classString) {
       for(const ammoClass of this) {
           if(ammoClass === classString) {
               return ammoClass;
           }
       }
       return;
   }
 */



/**
 * @enum {string}
 * @type {{
 * Spread:              "spread",
 * Camerashake:         "camerashake",
 * BodyshotDamage:      "bodyshotDamage",
 * HeadshotDamage:      "headshotDamage",
 * RiotShieldDamage:    "riotShieldDamage",
 * ArmorEffectiveness:  "armorEffectiveness",
 * HelmetEffectiveness: "helmetEffectiveness"
 * }} 
 */
const AmmoMultiplierTypes = {
   Spread:              "spread",
   Camerashake:         "camerashake",
   BodyshotDamage:      "bodyshotDamage",
   HeadshotDamage:      "headshotDamage",
   RiotShieldDamage:    "riotShieldDamage",
   ArmorEffectiveness:  "armorEffectiveness",
   HelmetEffectiveness: "helmetEffectiveness"
};






/** 
 * @enum {string}
 * @type {{
 * Bullet:       "yes:bullet",
 * ShotgunShell: "yes:shotgun_shell"
 * }}
 */
const AmmoTypes = {
   Bullet:        "yes:bullet",
   ShotgunShell: "yes:shotgun_shell",
};


/**
 *    tryGetAmmoType(itemTypeId) {
       for(const type of AmmoTypes) {
           if(type === itemTypeId) {
               return type;
           }
       }
       return;
   }
 */
export { BulletClasses, ShotgunShellClasses, AmmoClasses, AmmoMultiplierTypes, AmmoTypes };