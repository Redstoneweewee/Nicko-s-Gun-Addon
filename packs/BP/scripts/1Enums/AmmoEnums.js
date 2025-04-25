import { TypeUtil } from "../Utilities";

/** 
 * @enum {string}
 * @type {{
 * normal: "Normal",
 * hollowPoint: "HollowPoint",
 * armorPiercing: "ArmorPiercing",
 * antiMaterial: "AntiMaterial",
 * exploding: "Exploding",
 * incendiary: "Incendiary"
 * }}
 */
const BulletClasses = {
    normal: "Normal",
    hollowPoint: "HollowPoint",
    armorPiercing: "ArmorPiercing",
    antiMaterial: "AntiMaterial",
    exploding: "Exploding",
    incendiary: "Incendiary"
}

/** 
 * @enum {string}
 * @type {{
 * birdshot: "Birdshot",
 * buckshot: "Buckshot",
 * slug: "Slug"
 * }}
 */
const ShotgunShellClasses = {
    birdshot: "Birdshot",
    buckshot: "Buckshot",
    slug: "Slug"
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
 * spread: "Spread",
 * camerashake: "Camerashake",
 * bodyshotDamage: "BodyshotDamage",
 * headshotDamage: "HeadshotDamage",
 * riotShieldDamage: "RiotShieldDamage",
 * armorEffectiveness: "ArmorEffectiveness",
 * helmetEffectiveness: "HelmetEffectiveness"
 * }} 
 */
const AmmoMultiplierTypes = {
   spread: "Spread",
   camerashake: "Camerashake",
   bodyshotDamage: "BodyshotDamage",
   headshotDamage: "HeadshotDamage",
   riotShieldDamage: "RiotShieldDamage",
   armorEffectiveness: "ArmorEffectiveness",
   helmetEffectiveness: "HelmetEffectiveness"
};






/** 
 * @enum {string}
 * @type {{
 * bullet:        "yes:bullet",
 * shotgunShell: "yes:shotgun_shell"
 * }}
 */
const AmmoTypes = {
   bullet:        "yes:bullet",
   shotgunShell: "yes:shotgun_shell",
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