import { GameMode } from "@minecraft/server";

/** 
 * @type {string[]}
 */
const excludedFamilies = [
    "minecraft:inanimate",
    "minecraft:projectile"
]

/** 
 * @type {string[]}
 */
const excludedTypes = [
    "minecraft:item", 
    "minecraft:snowball", 
    "minecraft:arrow", 
    "minecraft:tnt", 
    "minecraft:egg", 
    "minecraft:ender_pearl", 
    "minecraft:fireworks_rocket", 
    "minecraft:fireball", 
    "minecraft:dragon_fireball", 
    "minecraft:small_fireball", 
    "minecraft:evocation_fang", 
    "minecraft:eye_of_ender_signal", 
    "minecraft:falling_block", 
    "minecraft:fishing_hook"
]

/** 
 * @type {GameMode[]}
 */
const excludedGameModes = [
    GameMode.creative,
    GameMode.spectator
]


export { excludedFamilies, excludedTypes, excludedGameModes };