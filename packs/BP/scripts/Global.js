import { ItemStack } from "@minecraft/server";
import { Firearm } from "./2Definitions/FirearmDefinition";
import { Magazine } from "./2Definitions/MagazineDefinition";
import { FirearmTypeIds } from "./1Enums/FirearmEnums";
import { MagazineTypeIds } from "./1Enums/MagazineEnums";

class Global {
    /**
     * A dictionary of all guns
     * `key: FirearmTypeIds enum {string}`, `value: Firearm Object {Firearm}`
     * @type {Map<typeof FirearmTypeIds[keyof typeof FirearmTypeIds], Firearm>}
     */
    static firearms = new Map();

    /**
     * A dictionary of all guns
     * `key: MagazineTypeIds enum {string}`, `value: Magazine Object {Magazine}`
     * @type {Map<typeof MagazineTypeIds[keyof typeof MagazineTypeIds], Magazine>}
     */
    static magazines = new Map();

    /**
     * A dictionary to store mainLoopIds and functions
     * `key: mainLoopId {number}`, `value: function()`
     * @type {Map<number, function>}
     */
    static mainLoops = new Map();

    /**
     * A dictionary to store shooting loop ids
     * `key: player.id {string}`, `value: loopId {number}`
     * @type {Map<string, number[]>}
     */
    static playerShootingLoopIds = new Map();

    /**
     * A dictionary to store hit marker timeout ids
     * `key: player.id {string}`, `value: timeoutId {number}`
     * @type {Map<string, number>}
     */
    static playerHitMarkerIds = new Map();

    /**
     * A dictionary to store left click ability loop ids
     * `key: player.id {string}`, `value: loopId {number}`
     * @type {Map<string, number>}
     */
    static playerFirearmAbilityLoopIds = new Map();

    /**
     * A dictionary to store the firearm id of firearms that players are currently holding.
     * If they aren't holding a firearm, then tey are not in the map.
     * `key: player.id {string}`, `value: firearmId {number}`
     * @type {Map<string, number>}
     */
    static playerCurrentFirearmId = new Map();

    /**
     * A dictionary to store the firearm itemstacks that players are currently holding.
     * If they aren't holding a firearm, then tey are not in the map.
     * Used to check item dynamic properties when the player switches to a different item.
     * `key: player.id {string}`, `value: firearmItemStack {ItemStack}`
     * @type {Map<string, ItemStack>}
     */
    static playerCurrentFirearmItemStack = new Map();


    /**
     * A list of maps containing all firearmIds and their ammo count
     * Map(`key: firearm id {number}`, `value: ammoCount {number}`)
     * Is initialized in WorldInitialization.js
    */
    //static worldFirearmIds = [];


    /**
     * An enum of all player dynamic properties
     */
    static PlayerDynamicProperties = {
        "script": {
            isInThirdPersonCamera:        "isInThirdPersonCamera",        //boolean reset across reload
            loadedOffhandMagazine:        "loadedOffhandMagazine",        //boolean keep across reload
            currentFirearmIdSaved:        "currentFirearmIdSaved",        //boolean reset across reload
            currentFirearmItemStackSaved: "currentFirearmItemStackSaved", //boolean reset across reload
            currentMultipliersSaved:      "currentMultipliersSaved",      //boolean reset across reload
            isHoldingAbilityFirearm:      "isHoldingAbilityFirearm",      //boolean reset across reload
            lastShootTick:                "lastShootTick",         //number reset across reload
        },  

        "animation": {
            team:                       "team",                        //Team enum ("gold" or "blue"), reset across reload
            outlines_active:            "outlines_active",             //boolean keep across reload
            hit_marker_variant:         "hit_marker_variant",          //HitMarkerVariants enum ("none", "normal", or "headshot"), reset across reload
            has_offhand_magazine:       "has_offhand_magazine",        //boolean keep across reload
            firearm_firing_mode:        "firearm_firing_mode",         //boolean reset across reload
            firearm_fire_rate:          "firearm_fire_rate",           //boolean reset across reload
            firearm_has_ammo:           "firearm_has_ammo",            //boolean keep across reload
            should_open_cock_on_reload: "should_open_cock_on_reload",  //boolean reset across reload
            should_cock_on_reload:      "should_cock_on_reload",       //boolean keep across reload
            is_aiming:                  "is_aiming",                   //boolean reset across reload
            is_shooting:                "is_shooting",                 //boolean reset across reload
            is_reloading:               "is_reloading",                //boolean reset across reload
            should_start_cock:          "should_start_cock",           //boolean reset across reload
            recoil:                     "recoil",                      //float reset across reload
            movement_direction:         "movement_direction",          //Direction enum {string} reset across reload
            movement_direction_value:   "movement_direction_value",    //float reset across reload
            reload_normal_animation_multiplier: "reload_normal_animation_multiplier",         //float reset across reload
            reload_no_swap_animation_multiplier: "reload_no_swap_animation_multiplier",       //float reset across reload
            reload_open_cock_animation_multiplier: "reload_open_cock_animation_multiplier", //float reset across reload
            reload_cock_animation_multiplier: "reload_cock_animation_multiplier",              //float reset across reload
            has_shell_in_chamber: "has_shell_in_chamber"                                            //float reset across reload
        }
    }

    //Only used in worldInitialization
    static PersistentPlayerDynamicProperties = {
        /**
         * Must keep `loadedOffhandMagazine` or else the player will get a duplicate magazine every time they join
         * because the game will think the magazine in their hand was not a part of the firearm.
         */
        loadedOffhandMagazine: "loadedOffhandMagazine",
        /** These are tied to loadedOffhandMagazine from HoldDetection() */
        outlines_active:       "outlines_active",
        has_offhand_magazine:  "has_offhand_magazine",
        should_open_cock_on_reload: "should_open_cock_on_reload",
        should_cock_on_reload: "should_cock_on_reload",
        firearm_has_ammo:      "firearm_has_ammo"

    }

    /**
     * An enum of all item dynamic properties
     */
    static FirearmDynamicProperties = {
        id: "id",                          //number
        /**
         * Is a less accurate rep of ammoCount compared to world ammoCount, but is used after world reload.
         * World ammoCount is deleted after world reload, which takes the firearm ammoCount when requested.
         * Takes the firearm id's world ammoCount when:
         *   1. The player holds the firearm (first tick)
         *   2. When the player stops shooting
         */
        ammoCount: "ammoCount",            //number {}
        magazineTypeId: "magazineTypeId",        //MagazineTypeIds enum {string}
        isMagazineEmpty: "isMagazineEmpty", //boolean
        hasShellInChamber: "hasShellInChamber" //boolean
    }

    /**
     * An enum of all item dynamic properties
     */
    static MagazineDynamicProperties = {
        ammoClass: "ammoClass",  //an AmmoClass enum {string}
    }

    /**
     * An enum of all firearm ability dynamic properties
     */
    static ItemAbilityDynamicProperties = {
        currentScopeZoom: "currentScopeZoom",      //number, can either be 1 or 2, for switchScopeZoom LeftClickAbility 
        currentFiringMode: "currentFiringMode",    //string, FiringMode enum, for switchFiringMode LeftClickAbility
    }
}

export { Global };