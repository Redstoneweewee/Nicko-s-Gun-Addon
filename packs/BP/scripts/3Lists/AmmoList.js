import * as Def from "../2Definitions/AmmoDefinition.js";
import * as Enums from "../1Enums/AmmoEnums.js";
import { TypeUtil } from "../UtilitiesInit.js";

/**
 * @enum {Def.Ammo}
 * @type {Record<keyof typeof Enums.AmmoTypes, Def.Ammo>}
 */
const AmmoList = {
    Bullet: new Def.Ammo({
        itemTypeId: "yes:bullet",
        type: Enums.AmmoClasses.Normal,
        entityPierce: 1,
        blockPierce: 0,
        blockBreakPotency: 0,
        incendiaryChance: 0,
        multipliers: []
    }),
    Ammo12Gauge: new Def.Ammo({
        itemTypeId: "yes:ammo_12gauge",
        type: Enums.AmmoClasses.Birdshot,
        entityPierce: 1,
        blockPierce: 0,
        blockBreakPotency: 0,
        incendiaryChance: 0,
        multipliers: []
    })
};


/** @type {Map<typeof Enums.AmmoTypes[keyof typeof Enums.AmmoTypes], Def.Ammo>} */
const AmmoMap = new Map();

for(const [type, typeId] of TypeUtil.getIterable(Enums.AmmoTypes)) {
    AmmoMap.set(typeId, AmmoList[type]);
}

export { AmmoMap };
console.log("Magazines initialized with no errors.");