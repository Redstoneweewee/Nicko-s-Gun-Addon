import { GameMode } from "@minecraft/server";

/** @type {string[]} */
const ExcludedFamilies = [
    "minecraft:inanimate",
    "minecraft:projectile"
]

/** @type {string[]} */
const ExcludedTypes = [
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

/** @type {GameMode[]} */
const ExcludedGameModes = [
    GameMode.creative,
    GameMode.spectator
]

export { ExcludedFamilies, ExcludedTypes, ExcludedGameModes };