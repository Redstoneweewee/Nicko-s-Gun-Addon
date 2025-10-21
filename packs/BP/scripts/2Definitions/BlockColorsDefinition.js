import { MathUtils } from "../Math/MathUtils";

class CustomColor {

    /**@type {string} */
    hex = "#000000";
    /**@type {import("@minecraft/server").RGB} */
    rgb = { red: 0, blue: 0, green: 0 }

    /**
     * @param {string} hex 
     * @returns {import("@minecraft/server").RGB?}
     */
    static hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: MathUtils.mapLinear(parseInt(result[1], 16), 0, 255, 0, 1),
            green: MathUtils.mapLinear(parseInt(result[2], 16), 0, 255, 0, 1),
            blue: MathUtils.mapLinear(parseInt(result[3], 16), 0, 255, 0, 1),
        } : null;
    }
}

class BlockColor extends CustomColor {
    /**@type {string} */
    blockName = "";

    /**
     * 
     * @param {string} blockName 
     */
    constructor(blockName) {
        super();
        this.blockName = blockName;
    }

    /**
     * 
     * @param {string} hex 
     * @returns {BlockColor}
     */
    setColorUsingHex(hex) {
        this.hex = hex;
        const temp = CustomColor.hexToRgb(hex);
        if(temp === null) {
            console.error(`could not convert hex ${hex} to rgb.`);
            return this;
        }
        this.rgb = temp;
        return this;
    }
}

class TagColor extends CustomColor {
    /**@type {string} */
    tagName = "";

    /**
     * 
     * @param {string} tagName 
     */
    constructor(tagName) {
        super();
        this.tagName = tagName;
    }

    /**
     * 
     * @param {string} hex 
     * @returns {TagColor}
     */
    setColorUsingHex(hex) {
        this.hex = hex;
        const temp = CustomColor.hexToRgb(hex);
        if(temp === null) {
            console.error(`could not convert hex ${hex} to rgb.`);
            return this;
        }
        this.rgb = temp;
        return this;
    }
}

class PartialBlockNameColor extends CustomColor {
    /**@type {string} */
    partialName = "";

    /**
     * 
     * @param {string} partialName 
     */
    constructor(partialName) {
        super();
        this.partialName = partialName;
    }

    /**
     * 
     * @param {string} hex 
     * @returns {PartialBlockNameColor}
     */
    setColorUsingHex(hex) {
        this.hex = hex;
        const temp = CustomColor.hexToRgb(hex);
        if(temp === null) {
            console.error(`could not convert hex ${hex} to rgb.`);
            return this;
        }
        this.rgb = temp;
        return this;
    }
}

const standardColors = {
    white:      "#CCD2D3",
    lightGray:  "#7B7B71",
    gray:       "#36393D",
    black:      "#090B10",
    brown:      "#5E3A1E",
    red:        "#8C2121",
    orange:     "#DC6001",
    yellow:     "#ECAC14",
    lime:       "#5BA417",
    green:      "#475923",
    cyan:       "#147484",
    lightBlue:  "#2487C3",
    blue:       "#2B2D8C",
    purple:     "#631F99",
    magenta:    "#A52F9B",
    pink:       "#D1648D"

}



/**
 * @type {CustomColor[]}
 */
const customColors = [
    new BlockColor("minecraft:light_gray_candle").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_carpet").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_concrete").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_concrete_powder").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_shulker_box").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_stained_glass").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_stained_glass_pane").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_terracotta").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:light_gray_wool").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:silver_glazed_terracotta").setColorUsingHex(standardColors.lightGray),

    new BlockColor("minecraft:gray_candle").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_carpet").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_concrete").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_concrete_powder").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_shulker_box").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_stained_glass").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_stained_glass_pane").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_terracotta").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_wool").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:gray_glazed_terracotta").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:bedrock").setColorUsingHex(standardColors.gray),

    new BlockColor("minecraft:light_blue_candle").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_carpet").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_concrete").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_concrete_powder").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_shulker_box").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_stained_glass").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_stained_glass_pane").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_terracotta").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_wool").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:light_blue_glazed_terracotta").setColorUsingHex(standardColors.lightBlue),

    new BlockColor("minecraft:blue_candle").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_carpet").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_concrete").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_concrete_powder").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_shulker_box").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_stained_glass").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_stained_glass_pane").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_terracotta").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_wool").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:blue_glazed_terracotta").setColorUsingHex(standardColors.blue),

    new BlockColor("minecraft:grass_block").setColorUsingHex(standardColors.green),
    new BlockColor("minecraft:podzol").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:farmland").setColorUsingHex("#946A49"),
    new BlockColor("minecraft:grass_path").setColorUsingHex("#8E733F"),
    new BlockColor("minecraft:mycelium").setColorUsingHex("#816869"),

    new BlockColor("minecraft:sandstone_wall").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:sandstone_stairs").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:smooth_sandstone_stairs").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:sandstone_slab").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:cut_sandstone_slab").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:smooth_sandstone_slab").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:sandstone").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:chiseled_sandstone").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:cut_sandstone").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:smooth_sandstone").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:sand").setColorUsingHex("#D2C194"),
    new BlockColor("minecraft:suspicious_sand").setColorUsingHex("#D2C194"),

    new BlockColor("minecraft:red_sandstone_wall").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:red_sandstone_stairs").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:smooth_red_sandstone_stairs").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:red_sandstone_slab").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:cut_red_sandstone_slab").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:smooth_red_sandstone_slab").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:red_sandstone").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:chiseled_red_sandstone").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:cut_red_sandstone").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:smooth_red_sandstone").setColorUsingHex("#BC6620"),
    new BlockColor("minecraft:red_sand").setColorUsingHex("#BC6620"),
    
    new BlockColor("minecraft:brick_block").setColorUsingHex("#995542"),
    new BlockColor("minecraft:brick_wall").setColorUsingHex("#995542"),
    new BlockColor("minecraft:brick_stairs").setColorUsingHex("#995542"),
    new BlockColor("minecraft:brick_slab").setColorUsingHex("#995542"),
    
    new BlockColor("minecraft:stone_brick_wall").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:stone_brick_stairs").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:stone_brick_slab").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:stone_bricks").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:cracked_stone_bricks").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:chiseled_stone_bricks").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:stone_stairs").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:stone_slab").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:stone").setColorUsingHex(standardColors.lightGray),
    
    new BlockColor("minecraft:cobblestone_wall").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:cobblestone_stairs").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:cobblestone_slab").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:cobblestone").setColorUsingHex(standardColors.lightGray),

    new BlockColor("minecraft:smooth_stone_slab").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:smooth_stone").setColorUsingHex(standardColors.white),

    new BlockColor("minecraft:netherrack").setColorUsingHex("#642727"),
    new BlockColor("minecraft:obsidian").setColorUsingHex(standardColors.black),
    new BlockColor("minecraft:crying_obsidian").setColorUsingHex(standardColors.purple),

    new BlockColor("minecraft:gold_block").setColorUsingHex(standardColors.yellow),
    new BlockColor("minecraft:emerald_block").setColorUsingHex(standardColors.lime),
    new BlockColor("minecraft:redstone_block").setColorUsingHex(standardColors.red),
    new BlockColor("minecraft:diamond_block").setColorUsingHex(standardColors.lightBlue),
    new BlockColor("minecraft:lapis_block").setColorUsingHex(standardColors.blue),
    new BlockColor("minecraft:coal_block").setColorUsingHex(standardColors.black),
    new BlockColor("minecraft:netherite_block").setColorUsingHex(standardColors.gray),
    
    new BlockColor("minecraft:dragon_head").setColorUsingHex(standardColors.black),
    new BlockColor("minecraft:player_head").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:zombie_head").setColorUsingHex(standardColors.green),
    new BlockColor("minecraft:creeper_head").setColorUsingHex(standardColors.lime),
    new BlockColor("minecraft:skeleton_skull").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:wither_skeleton_skull").setColorUsingHex(standardColors.black),
    new BlockColor("minecraft:piglin_head").setColorUsingHex("#EFB784"),

    new BlockColor("minecraft:cactus").setColorUsingHex(standardColors.green),
    new BlockColor("minecraft:melon").setColorUsingHex(standardColors.lime),
    new BlockColor("minecraft:slime_block").setColorUsingHex(standardColors.lime),

    new BlockColor("minecraft:glass").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:glass_pane").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:ladder").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:scaffolding").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:bone").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:raw_gold_block").setColorUsingHex(standardColors.yellow),
    new BlockColor("minecraft:lodestone").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:clay").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:ancient_debris").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:gravel").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:suspicious_gravel").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:bee_nest").setColorUsingHex(standardColors.yellow),
    new BlockColor("minecraft:beehive").setColorUsingHex(standardColors.yellow),
    new BlockColor("minecraft:calcite").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:brown_mushroom_block").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:red_mushroom_block").setColorUsingHex(standardColors.red),
    new BlockColor("minecraft:mushroom_stem").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:creaking_heart").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:end_portal_frame").setColorUsingHex("#417266"),
    new BlockColor("minecraft:ender_chest").setColorUsingHex("#2F4246"),
    new BlockColor("minecraft:end_rod").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:dragon_egg").setColorUsingHex(standardColors.black),
    new BlockColor("minecraft:respawn_anchor").setColorUsingHex(standardColors.black),
    new BlockColor("minecraft:magma").setColorUsingHex(standardColors.orange),
    new BlockColor("minecraft:mob_spawner").setColorUsingHex("#294354"),
    new BlockColor("minecraft:trial_spawner").setColorUsingHex("#294354"),
    new BlockColor("minecraft:vault").setColorUsingHex("#294354"),
    new BlockColor("minecraft:smoker").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:brewing_stand").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:crafter").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:piston").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:observer").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:hopper").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:dropper").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:dispenser").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:daylight_detector").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:daylight_detector_inverted").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:sticky_piston").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:grindstone").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:enchanting_table").setColorUsingHex(standardColors.red),
    new BlockColor("minecraft:stonecutter").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:heavy_core").setColorUsingHex(standardColors.lightGray),
    new BlockColor("minecraft:loom").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:target").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:lectern").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:composter").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:barrel").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:note_block").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:jukebox").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:redstone_lamp").setColorUsingHex(standardColors.brown),
    new BlockColor("minecraft:sea_lantern").setColorUsingHex(standardColors.white),
    new BlockColor("minecraft:glowstone").setColorUsingHex(standardColors.yellow),
    new BlockColor("minecraft:cauldron").setColorUsingHex(standardColors.gray),
    new BlockColor("minecraft:beacon").setColorUsingHex(standardColors.lightBlue),



    //colors with no overlapping names
    new PartialBlockNameColor("white").setColorUsingHex(standardColors.white),
    new PartialBlockNameColor("black").setColorUsingHex(standardColors.black),
    new PartialBlockNameColor("brown").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("red").setColorUsingHex(standardColors.red),
    new PartialBlockNameColor("orange").setColorUsingHex(standardColors.orange),
    new PartialBlockNameColor("yellow").setColorUsingHex(standardColors.yellow),
    new PartialBlockNameColor("lime").setColorUsingHex(standardColors.lime),
    new PartialBlockNameColor("green").setColorUsingHex(standardColors.green),
    new PartialBlockNameColor("cyan").setColorUsingHex(standardColors.cyan),
    new PartialBlockNameColor("purple").setColorUsingHex(standardColors.purple),
    new PartialBlockNameColor("magenta").setColorUsingHex(standardColors.magenta),
    new PartialBlockNameColor("pink").setColorUsingHex(standardColors.pink),

    //stones
    new PartialBlockNameColor("ore").setColorUsingHex(standardColors.lightGray),
    new PartialBlockNameColor("mud").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("resin").setColorUsingHex(standardColors.orange),
    new PartialBlockNameColor("prismarine").setColorUsingHex(standardColors.cyan),
    new PartialBlockNameColor("amethyst").setColorUsingHex(standardColors.purple),
    
    new PartialBlockNameColor("iron").setColorUsingHex(standardColors.white),
    new PartialBlockNameColor("quartz").setColorUsingHex(standardColors.white),
    new PartialBlockNameColor("deepslate").setColorUsingHex(standardColors.gray),
    new PartialBlockNameColor("blackstone").setColorUsingHex(standardColors.black),
    new PartialBlockNameColor("diorite").setColorUsingHex(standardColors.white),
    new PartialBlockNameColor("andesite").setColorUsingHex("#A57462"),
    new PartialBlockNameColor("mossy").setColorUsingHex("#617740"),
    new PartialBlockNameColor("moss").setColorUsingHex("#617740"),
    new PartialBlockNameColor("tuff").setColorUsingHex("#5A615D"),
    new PartialBlockNameColor("nether").setColorUsingHex("#2F181C"),
    new PartialBlockNameColor("basalt").setColorUsingHex(standardColors.gray),
    new PartialBlockNameColor("end").setColorUsingHex("#E9F8AD"),
    new PartialBlockNameColor("purpur").setColorUsingHex("#AA79AA"),
    new PartialBlockNameColor("copper").setColorUsingHex("#BF6A4B"),  //this works because "exposed", "weathered", and "oxidized" always appear before "copper" in block names
    new PartialBlockNameColor("exposed").setColorUsingHex("#A67561"),
    new PartialBlockNameColor("weathered").setColorUsingHex("#639E75"),
    new PartialBlockNameColor("oxidized").setColorUsingHex("#58AF90"),

    //woods
    new PartialBlockNameColor("leaves").setColorUsingHex(standardColors.green),
    new PartialBlockNameColor("crimson").setColorUsingHex("#7C3955"),
    new PartialBlockNameColor("warped").setColorUsingHex("#388180"),
    new PartialBlockNameColor("mangrove").setColorUsingHex("#753833"),
    new PartialBlockNameColor("cherry").setColorUsingHex("#E3B0AB"),
    new PartialBlockNameColor("pale").setColorUsingHex("#E4E0DE"),

    //misc
    new PartialBlockNameColor("campfire").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("sponge").setColorUsingHex(standardColors.yellow),
    new PartialBlockNameColor("infested").setColorUsingHex(standardColors.lightGray),
    new PartialBlockNameColor("dripstone").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("froglight").setColorUsingHex(standardColors.white),
    new PartialBlockNameColor("bamboo").setColorUsingHex(standardColors.yellow),
    new PartialBlockNameColor("pumpkin").setColorUsingHex(standardColors.orange),
    new PartialBlockNameColor("honey").setColorUsingHex(standardColors.yellow),
    new PartialBlockNameColor("azalea").setColorUsingHex(standardColors.lime),
    new PartialBlockNameColor("chorus").setColorUsingHex(standardColors.purple),
    new PartialBlockNameColor("pot").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("ice").setColorUsingHex(standardColors.lightBlue),
    new PartialBlockNameColor("snow").setColorUsingHex(standardColors.white),
    new PartialBlockNameColor("soul").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("sculk").setColorUsingHex("#04303A"),
    new PartialBlockNameColor("dirt").setColorUsingHex("#775439"),

    //interactables
    new PartialBlockNameColor("sign").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("shelf").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("table").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("chest").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("frame").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("bookshelf").setColorUsingHex(standardColors.brown),
    new PartialBlockNameColor("furnace").setColorUsingHex(standardColors.lightGray),
    new PartialBlockNameColor("anvil").setColorUsingHex(standardColors.gray),


    
    new TagColor("wood").setColorUsingHex(standardColors.brown),
]

export { BlockColor, TagColor, PartialBlockNameColor, standardColors, customColors }