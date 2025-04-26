import { ContainerSlot, Entity, ItemStack } from "@minecraft/server"
import { ScopeAttribute } from "./FirearmDefinition";
import { Global } from "../Global";
import { FiringModes } from "../1Enums/FirearmEnums";
import * as Enums from "../1Enums/LeftClickAbilityEnums"

class LeftClickAbilityAttribute {

    /**
     * 
     * @param {{
     * leftClickAbilityType: typeof Enums.LeftClickAbilityTypes[keyof typeof Enums.LeftClickAbilityTypes]
     * }} def
     */ 
    constructor(def) {
        this.leftClickAbilityType = def.leftClickAbilityType;
    }
}


class SwitchFiringModeAttribute extends LeftClickAbilityAttribute {
    /**
     * @param {LeftClickAbilityAttribute & {
     * alternateFiringMode:  typeof FiringModes[keyof typeof FiringModes],
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
     * @param {LeftClickAbilityAttribute & {
     * alternateScopeAttribute:  ScopeAttribute
     * }} def
     */
    constructor(def) {
        super(def);
        this.alternateScopeAttribute = def.alternateScopeAttribute;
    }
}


export { LeftClickAbilityAttribute, SwitchFiringModeAttribute, SwitchScopeZoomAttribute };
