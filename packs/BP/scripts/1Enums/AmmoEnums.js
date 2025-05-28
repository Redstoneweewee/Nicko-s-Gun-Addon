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
const Ammo12GaugeClasses = {
    Birdshot: "birdshot",
    Buckshot: "buckshot",
    Slug:     "slug"
}

/** 
* @enum {string}
*/
const AmmoClasses = {
   ...BulletClasses,
   ...Ammo12GaugeClasses
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
 * Ammo12Gauge: "yes:ammo_12gauge"
 * }}
 */
const AmmoTypes = {
   Bullet:        "yes:bullet",
   Ammo12Gauge: "yes:ammo_12gauge",
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
export { BulletClasses, Ammo12GaugeClasses, AmmoClasses, AmmoMultiplierTypes, AmmoTypes };