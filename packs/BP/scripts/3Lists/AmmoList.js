import * as Def from "../2Definitions/AmmoDefinition.js";
import * as Enums from "../1Enums/AmmoEnums.js";
import { TypeUtil } from "../Utilities.js";

/** @type {Def.Ammo} */
const normalBullet = {
    itemTypeId: "yes:bullet",
    type: Enums.AmmoClasses.normal,
    entityPierce: 1,
    blockPierce: 0,
    blockBreakPotency: 0,
    incendiaryChance: 0,
    multipliers: []
}

/** @type {Def.Ammo} */
const birdshot = {
    itemTypeId: "yes:shotgun_shell",
    type: Enums.AmmoClasses.birdshot,
    entityPierce: 1,
    blockPierce: 0,
    blockBreakPotency: 0,
    incendiaryChance: 0,
    multipliers: []
}

/**
 * @enum {Def.Ammo}
 * @type {Record<keyof typeof Enums.AmmoTypes, Def.Ammo>}
 */
const AmmoList = {
    bullet: new Def.Ammo(normalBullet),
    shotgunShell: new Def.Ammo(birdshot)
};


/** @type {Map<typeof Enums.AmmoTypes[keyof typeof Enums.AmmoTypes], Def.Ammo>} */
const AmmoMap = new Map();

for(const [type, typeId] of TypeUtil.getIterable(Enums.AmmoTypes)) {
    AmmoMap.set(typeId, AmmoList[type]);
}

export { AmmoMap };
console.log("Magazines initialized with no errors.");