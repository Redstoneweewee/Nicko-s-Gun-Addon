import * as Enums from "../1Enums/AmmoEnums";

class AmmoMultiplier {
    /**
     * @param {{
     * type: keyof Enums.AmmoMultiplierTypes,
     * multiplier: number
     * }} def
     */
    constructor(def) {
        this.type       = def.type;
        this.multiplier = def.multiplier;
    }
}
class Ammo {
    /**
     * @param {{
     * itemTypeId: string,
     * type: typeof Enums.AmmoClasses[keyof typeof Enums.AmmoClasses],
     * entityPierce: number,
     * blockPierce: number,
     * blockBreakPotency: number,
     * incendiaryChance: number,
     * multipliers?: AmmoMultiplier[]
     * }} def
     */
    constructor(def) {
        this.itemTypeId        = def.itemTypeId;
        this.type              = def.type;
        this.entityPierce      = def.entityPierce;
        this.blockPierce       = def.blockPierce;
        this.blockBreakPotency = def.blockBreakPotency;
        this.incendiaryChance  = def.incendiaryChance;
        this.multipliers       = def.multipliers;
    }
}


export { Ammo, AmmoMultiplier };