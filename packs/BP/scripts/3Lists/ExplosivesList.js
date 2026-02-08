/**
 * @enum {string[]}
 * Later, change stack-based mags into ammo so we don't have redefinitions
 */
const ExplosivesList = {
    Rockets: ["yes:rocket"],
    Grenades: ["yes:explosive_grenade", "yes:flash_grenade", "yes:acid_grenade", "yes:flame_grenade"],
    Missiles: ["yes:javelin_missile"],
};

export { ExplosivesList };