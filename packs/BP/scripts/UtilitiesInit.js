import { Player, world } from "@minecraft/server";
import { SettingsTypes } from "./1Enums/SettingsEnums";
import { linkName } from './UI/SettingsMessage.js';
import { Settings } from "./2Definitions/SettingsDefinition";


class SettingsUtil {
    /**
     * 
     * @param {typeof SettingsTypes[keyof typeof SettingsTypes]} settingType
     * @returns {Number | undefined}
     */
    static getSettingsValue(settingType) {
        return world.scoreboard.getObjective("Settings")?.getScore(settingType);
    }

    
    /**
     * 
     * @param {Settings} setting
     * @param {typeof SettingsTypes[keyof typeof SettingsTypes]} settingType
     * @param {Number} value
     */
    static setSettingsValue(setting, settingType, value) {
        world.scoreboard.getObjective("Settings")?.setScore(settingType, value);
        if(setting.onChangeValue != null) {
            setting.onChangeValue();
        }
    }

    /**
     * 
     * @param {Player} player 
     */
    static sendDownloadMessage(player) {
        player.sendMessage(`Link to full downloads: ${linkName}`);
    }
}

export { SettingsUtil };

class TypeUtil {
    /**
     * Creates an iterable from an object (e.g. enum-style object).
     * Filters out non-object or function properties.
     *
     * @template {string} K - The type of the keys in the object
     * @template V - The type of the values in the object
     * @param {{ [key in K]: V }} enumObj
     * @returns {Iterable<[K, V]>}
     */
    static getIterable(enumObj) {
        return {
            [Symbol.iterator]: function* () {
                for (const key in enumObj) {
                    const val = enumObj[key];
                    // Optional filter: only iterate over plain objects (not functions or symbols)
                    if (typeof val !== "function" && typeof key === "string") {
                        yield [key, val];
                    }
                }
            }
        };
    }


    /**
     * Helper type for enum values
     * @template {Record<string, string | number | symbol>} T
     * @typedef {T[keyof T]} EnumValue<T>
     */

    /**
     * Is equivalent to `mapObject.get("some string");`
     * @example // Basic usage
     * const AmmoTypes = { bullet: "yes:normal_bullet" };
     * const AmmoMap = new Map();
     * AmmoMap.set(AmmoTypes.bullet, new Ammo());
     * 
     * getValueFromMap(AmmoMap, AmmoTypes, "yes:normal_bullet"); //returns the Ammo object
     * @template {Record<string, string | number | symbol>} TEnum
     * @template TValue
     * @param {Map<EnumValue<TEnum>, TValue>} map - Map with enum keys
     * @param {TEnum} enumObj - Enum object for validation
     * @param {string} input - String to convert to enum key
     * @returns {TValue | undefined} - Returns undefined if invalid
     */
    static getValueFromMap(map, enumObj, input) {
        // Step 1: Check if input is a valid enum value
        const enumValues = Object.values(enumObj);
        if (!enumValues.includes(input)) return undefined;

        // Step 2: Safely access the map (TS knows input is EnumValue<TEnum> here)
        return map.get(/** @type {EnumValue<TEnum>} */(input));
    }
    
    /**
     * Converts a string to a value from the given enum object.
     * @template T
     * @param {Record<string, T>} enumObj - The enum object to look in.
     * @param {string} str - The string to match against enum values.
     * @returns {T | undefined} - The matching enum value, or undefined if not found.
     */
    static getValueFromList(enumObj, str) {
        for (const key in enumObj) {
            if (enumObj[key] === str) return enumObj[key];
        }
        return undefined;
    }


    static logStack() {
        const stack = new Error().stack;
        console.log(stack);
    }
}

export { TypeUtil };
