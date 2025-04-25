import * as Def from "../2Definitions/CraftingDefinition.js";



/** @enum {Def.CustomMaterial} */ //can only use enums when there are no iterators or functions
const CustomMaterials = {
    /** @type {Def.CustomMaterial} */
    polishedWoodPlate: {
        itemTypeId: "yes:polished_wood_plate",
        nameNormal: "Polished Wood Plate",
        namePlural: "Polished Wood Plates",
        imagePath: "textures/items/polished_wood_plate",
        hexIcon: "\ue160"
    },
    /** @type {Def.CustomMaterial} */
    plasticSheet: {
        itemTypeId: "yes:plastic_sheet",
        nameNormal: "Plastic Sheet",
        namePlural: "Plastic Sheets",
        imagePath: "textures/items/plastic_sheet",
        hexIcon: "\ue161"
    },
    /** @type {Def.CustomMaterial} */
    kevlarSheet: {
        itemTypeId: "yes:kevlar_sheet",
        nameNormal: "Kevlar Sheet",
        namePlural: "Kevlar Sheets",
        imagePath: "textures/items/kevlar_sheet",
        hexIcon: "\ue162"
    },
    /** @type {Def.CustomMaterial} */
    aluminumIngot: {
        itemTypeId: "yes:aluminum_ingot",
        nameNormal: "Aluminum Ingot",
        namePlural: "Aluminum Ingots",
        imagePath: "textures/items/aluminum_ingot",
        hexIcon: "\ue170"
    },
    /** @type {Def.CustomMaterial} */
    steelIngot: {
        itemTypeId: "yes:steel_ingot",
        nameNormal: "Steel Ingot",
        namePlural: "Steel Ingots",
        imagePath: "textures/items/steel_ingot",
        hexIcon: "\ue171"
    },
    /** @type {Def.CustomMaterial} */
    titaniumIngot: {
        itemTypeId: "yes:titanium_ingot",
        nameNormal: "Titanium Ingot",
        namePlural: "Titanium Ingots",
        imagePath: "textures/items/titanium_ingot",
        hexIcon: "\ue172"
    },


    /** @type {Def.CustomMaterial} */
    copperIngot: {
        itemTypeId: "minecraft:copper_ingot",
        nameNormal: "Copper Ingot",
        namePlural: "Copper Ingots",
        imagePath: "textures/items/copper_ingot",
        hexIcon: "\ue150"
    },
    /** @type {Def.CustomMaterial} */
    gunpowder: {
        itemTypeId: "minecraft:gunpowder",
        nameNormal: "Gunpowder",
        namePlural: "Gunpowder",
        imagePath: "textures/items/gunpowder",
        hexIcon: "\ue151"
    },
    /** @type {Def.CustomMaterial} */
    ironIngot: {
        itemTypeId: "minecraft:iron_ingot",
        nameNormal: "Iron Ingot",
        namePlural: "Iron Ingots",
        imagePath: "textures/items/iron_ingot",
        hexIcon: "\ue152"
    },

    /** @type {Def.CustomMaterial} */
    bullet: {
        itemTypeId: "yes:bullet",
        nameNormal: "Bullet",
        namePlural: "Bullets",
        imagePath: "textures/scripting_ui/ammunition/bullet",
        hexIcon: ""
    },
    /** @type {Def.CustomMaterial} */
    shotgunShell: {
        itemTypeId: "yes:shotgun_shell",
        nameNormal: "Shotgun Shell",
        namePlural: "Shotgun Shells",
        imagePath: "textures/scripting_ui/ammunition/shotgun_shell",
        hexIcon: ""
    }
}


//Firearm crafting ------------------------------
/** @type {Def.Crafting[]} */
const FirearmCraftingObjects = [
    {
        itemTypeId: "yes:sg550",
        name: "SG550",
        imagePath: "textures/scripting_ui/firearms/sg550",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 3
            })
        ]
    },
    {
        itemTypeId: "yes:ak47",
        name: "AK-47",
        imagePath: "textures/scripting_ui/firearms/ak47",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.polishedWoodPlate,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 3
            })
        ]
    },
    {
        itemTypeId: "yes:akm",
        name: "AKM",
        imagePath: "textures/scripting_ui/firearms/akm",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 6
            })
        ]
    },
    {
        itemTypeId: "yes:m4a1",
        name: "M4A1",
        imagePath: "textures/scripting_ui/firearms/m4a1",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 4
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 4
            })
        ]
    },
    {
        itemTypeId: "yes:ar15",
        name: "AR-15",
        imagePath: "textures/scripting_ui/firearms/ar15",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.polishedWoodPlate,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 4
            })
        ]
    },
    {
        itemTypeId: "yes:hk417",
        name: "HK417",
        imagePath: "textures/scripting_ui/firearms/hk417",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.titaniumIngot,
                amount: 3
            })
        ]
    },
    {
        itemTypeId: "yes:mk13",
        name: "MK13",
        imagePath: "textures/scripting_ui/firearms/mk13",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.polishedWoodPlate,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.titaniumIngot,
                amount: 5
            })
        ]
    },
    {
        itemTypeId: "yes:p90",
        name: "P90",
        imagePath: "textures/scripting_ui/firearms/p90",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 6
            })
        ]
    },
    {
        itemTypeId: "yes:ump45",
        name: "UMP-45",
        imagePath: "textures/scripting_ui/firearms/ump45",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 4
            }),
        ]
    },
    {
        itemTypeId: "yes:desert_eagle",
        name: "Desert Eagle",
        imagePath: "textures/scripting_ui/firearms/desert_eagle",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.polishedWoodPlate,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.titaniumIngot,
                amount: 1
            })
        ]
    },
    {
        itemTypeId: "yes:remington870",
        name: "Remington 870",
        imagePath: "textures/scripting_ui/firearms/remington870",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.polishedWoodPlate,
                amount: 4
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.steelIngot,
                amount: 4
            })
        ]
    }
]


//Magazine crafting ------------------------------
/** @type {Def.Crafting[]} */
const MagazineCraftingObjects = [
    {
        itemTypeId: "yes:rifle_magazine_30",
        name: "Rifle Magazine\n[§q30 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/rifle_30",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 30
            })
        ]
    },
    {
        itemTypeId: "yes:rifle_magazine_50",
        name: "Rifle Magazine\n[§q50 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/rifle_50",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 50
            })
        ]
    },
    {
        itemTypeId: "yes:marksman_rifle_magazine_15",
        name: "Marksman Rifle Magazine\n[§q15 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/dmr_15",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 15
            })
        ]
    },
    {
        itemTypeId: "yes:smg_magazine_24",
        name: "SMG Magazine\n[§q24 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/smg_24",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 24
            })
        ]
    },
    {
        itemTypeId: "yes:p90_magazine_50",
        name: "P90 Magazine\n[§q50 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/p90_50",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 2
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 50
            })
        ]
    },
    {
        itemTypeId: "yes:sniper_magazine_3",
        name: "Sniper Magazine\n[§q3 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/sniper_3",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 3
            })
        ]
    },
    {
        itemTypeId: "yes:pistol_magazine_8",
        name: "Pistol Magazine\n[§q8 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/pistol_8",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.aluminumIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.bullet,
                amount: 8
            })
        ]
    },
    {
        itemTypeId: "yes:shotgun_magazine_6",
        name: "Shotgun Shell Batch\n[§q6 Rounds§r]",
        imagePath: "textures/scripting_ui/magazines/shotgun_6",
        amount: 1,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.shotgunShell,
                amount: 6
            })
        ]
    }
]




/** @type {Def.Crafting[]} */
const AmmunitionCraftingObjects = [
    {
        itemTypeId: "yes:bullet",
        name: "Bullet §r[§qx64§r]",
        imagePath: "textures/scripting_ui/ammunition/bullet",
        amount: 64,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.ironIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.copperIngot,
                amount: 3
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.gunpowder,
                amount: 1
            })
        ]
    },
    {
        itemTypeId: "yes:shotgun_shell",
        name: "Shotgun Shell §r[§qx32§r]",
        imagePath: "textures/scripting_ui/ammunition/shotgun_shell",
        amount: 32,
        craftingItems: [
            new Def.CraftingItem({
                customMaterial: CustomMaterials.ironIngot,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.plasticSheet,
                amount: 1
            }),
            new Def.CraftingItem({
                customMaterial: CustomMaterials.gunpowder,
                amount: 1
            })
        ]
    }
]

export { CustomMaterials, FirearmCraftingObjects, MagazineCraftingObjects, AmmunitionCraftingObjects };
