import { ContainerSlot, Entity, ItemStack } from "@minecraft/server"
import { FiringModes, ScopeAttribute, GunWithAbility } from "./FirearmDefinition";
import { Global } from "../Global";

/**
 * @typedef {{
 * leftClickAbilityType: keyof LeftClickAbilityTypes
 * }} LeftClickAbilityAttributeDef
 */
class LeftClickAbilityAttribute {

    /**
     * 
     * @param {LeftClickAbilityAttributeDef} def
     */ 
    constructor(def) {
        this.leftClickAbilityType = def.leftClickAbilityType;
    }
}


class SwitchFiringModeAttribute extends LeftClickAbilityAttribute {
    /**
     * @param {{
     * leftClickAbilityType: keyof LeftClickAbilityTypes,
     * alternateFiringMode:  keyof FiringModes,
     * alternateFiringRate:  number
     * }} def
     */
    constructor(def) {
        super(def);
        this.alternateFiringMode = def.alternateFiringMode;
        this.alternateFiringRate = def.alternateFiringRate;
    }
}

class SwitchScopeZoomAttribute extends LeftClickAbilityAttribute {
    /**
     * @param {{
     * leftClickAbilityType:     keyof LeftClickAbilityTypes,
     * alternateScopeAttribute:  ScopeAttribute
     * }} def
     */
    constructor(def) {
        super(def);
        this.alternateScopeAttribute = def.alternateScopeAttribute;
    }
}


/** 
 * @type {{
 * switchFiringMode: "switchFiringMode",
 * switchScopeZoom: "switchScopeZoom"
 *}} 
 */
const LeftClickAbilityTypes = {
    switchFiringMode: "switchFiringMode",
    switchScopeZoom: "switchScopeZoom"
}


export { LeftClickAbilityTypes, LeftClickAbilityAttribute, SwitchFiringModeAttribute, SwitchScopeZoomAttribute };
