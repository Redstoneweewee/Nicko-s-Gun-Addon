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
const BulletAmmoClasses = {
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
const ShotgunAmmoClasses = {
    Birdshot: "birdshot",
    Buckshot: "buckshot",
    Slug:     "slug"
}

/** 
 * @enum {string}
 * @type {{
 * Exploding:     "exploding",
 * Fragmentation: "fragmentation"
 * Incendiary:    "incendiary",
 * Flashing:      "flashing",
 * Acidic:        "acidic"
 * }}
 */
const ExploiveAmmoClasses = {
    Exploding:     "exploding",
    Fragmentation: "fragmentation",
    Incendiary:    "incendiary",
    Flashing:      "flashing",
    Acidic:        "acidic"
}

/** 
* @enum {string}
*/
const FirearmAmmoClasses = {
   ...BulletAmmoClasses,
   ...ShotgunAmmoClasses
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
 * NormalBullet:  "yes:normal_bullet",
 * Birdshot: "yes:birdshot"
 * }}
 */
const AmmoTypes = {
   NormalBullet:  "yes:normal_bullet",
   Birdshot: "yes:birdshot"
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
export { BulletAmmoClasses, ShotgunAmmoClasses, FirearmAmmoClasses, ExploiveAmmoClasses, AmmoMultiplierTypes, AmmoTypes };