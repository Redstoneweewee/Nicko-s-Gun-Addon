import * as Enums from "../1Enums/CustomBlockEnums"


class CustomBlock {
    /**
     * @param {{
     * typeId: typeof Enums.CustomBlockTypes[keyof typeof Enums.CustomBlockTypes],
     * speedTag: string,
     * xpMin: number,
     * xpMax: number,
     * blockLoots: BlockLoot[]
     * }} def 
     */
    constructor(def) {
        this.typeId     = def.typeId;
        this.speedTag   = def.speedTag;
        this.xpMin      = def.xpMin;
        this.xpMax      = def.xpMax;
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