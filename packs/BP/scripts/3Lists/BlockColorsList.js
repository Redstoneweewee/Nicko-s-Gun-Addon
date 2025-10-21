import * as Def from "../2Definitions/BlockColorsDefinition.js";

/**
 * @type {Map<string, import("@minecraft/server").RGB>}
 */
const blockColorsMap = new Map();
/**
 * @type {Map<string, import("@minecraft/server").RGB>}
 */
const partialNameColorsMap = new Map();
/**
 * @type {Map<string, import("@minecraft/server").RGB>}
 */
const tagColorsMap = new Map();


Def.customColors.forEach(customColor => {
    if(customColor instanceof Def.BlockColor) {
        blockColorsMap.set(customColor.blockName, customColor.rgb);
    }
    else if(customColor instanceof Def.PartialBlockNameColor) {
        partialNameColorsMap.set(customColor.partialName, customColor.rgb);
    }
    else if(customColor instanceof Def.TagColor) {
        tagColorsMap.set(customColor.tagName, customColor.rgb);
    }
    else {
        console.warn(`undefined customColor instance: ${typeof(customColor)}`);
    }
});


const defaultColor = new Def.BlockColor("minecraft:stone").setColorUsingHex(Def.standardColors.gray).rgb;

export { blockColorsMap, tagColorsMap, partialNameColorsMap, defaultColor };