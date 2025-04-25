import * as Def from "../2Definitions/CustomBlockDefinition"
import * as Enums from "../1Enums/CustomBlockEnums"
import { TypeUtil } from "../Utilities";

/**
 * @enum {Def.CustomBlock}
 * @type {Record<keyof typeof Enums.CustomBlockTypes, Def.CustomBlock>}
 */
const CustomBlocks = {
    aluminumOre: {
        typeId: Enums.CustomBlockTypes.aluminumOre,
        speedTag: "iron_pick_diggable",
        xpMin: 0,
        xpMax: 3,
        blockLoots: [
            {
                typeId: "yes:raw_aluminum",
                amount: 1,
                affectedByFortune: true
            }
        ]
    },
    deepslateAluminumOre: {
        typeId: Enums.CustomBlockTypes.deepslateAluminumOre,
        speedTag: "iron_pick_diggable",
        xpMin: 0,
        xpMax: 4,
        blockLoots: [
            {
                typeId: "yes:raw_aluminum",
                amount: 1,
                affectedByFortune: true
            }
        ]
    },
    deepslateTitaniumOre: {
        typeId: Enums.CustomBlockTypes.deepslateTitaniumOre,
        speedTag: "diamond_pick_diggable",
        xpMin: 10,
        xpMax: 15,
        blockLoots: [
            {
                typeId: "yes:raw_titanium",
                amount: 1,
                affectedByFortune: true
            }
        ]
    }
}

/** @type {Map<typeof Enums.CustomBlockTypes[keyof typeof Enums.CustomBlockTypes], Def.CustomBlock>} */
const CustomBlocksMap = new Map();
for(const [, object] of TypeUtil.getIterable(CustomBlocks)) {
    CustomBlocksMap.set(object.typeId, object);
}



export { CustomBlocksMap };