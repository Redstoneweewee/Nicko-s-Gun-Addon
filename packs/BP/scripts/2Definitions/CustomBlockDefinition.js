import * as Enums from "../1Enums/CustomBlockEnums"
import { NumRange } from "./GlobalDefinition";


class CustomBlock {
    /**
     * @param {{
     * typeId: typeof Enums.CustomBlockTypes[keyof typeof Enums.CustomBlockTypes],
     * speedTag: string,
     * xp: NumRange,
     * blockLoots: BlockLoot[]
     * }} def 
     */
    constructor(def) {
        this.typeId     = def.typeId;
        this.speedTag   = def.speedTag;
        this.xp         = def.xp;
        this.blockLoots = def.blockLoots;
    }
}

class BlockLoot {
    /**
     * @param {{
     * typeId: string,
     * amount: number,
     * affectedByFortune: boolean
     * }} def 
     */
    constructor(def) {
        this.typeId            = def.typeId;
        this.amount            = def.amount;
        this.affectedByFortune = def.affectedByFortune;
    }
}

export { CustomBlock, BlockLoot }