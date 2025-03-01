import { ContainerSlot, Entity, ItemStack } from "@minecraft/server"
import { FiringModes, ScopeAttributes, GunWithAbility } from "./FirearmDefinition";
import { Global } from "../Global";


class LeftClickAbilityAttributes {

    /**
     * 
     * @param {string} leftClickAbilityType - a LeftClickAbilityTypes enum
     */ 
    constructor(leftClickAbilityType) {
        this.leftClickAbilityType = leftClickAbilityType;
    }
}

class SwitchFiringModeAttributes extends LeftClickAbilityAttributes {
    /**
     *  
     * @param {string} leftClickAbilityType - a LeftClickAbilityTypes enum
     * @param {string} defaultFiringMode - a FiringModes enum
     * @param {string} alternateFiringMode - a FiringModes enum
     * @param {number} defaultFireRate
     * @param {number} alternateFireRate
     */
    constructor(leftClickAbilityType, defaultFiringMode, alternateFiringMode, defaultFireRate, alternateFireRate) {
        super(leftClickAbilityType);
        this.defaultFiringMode   = defaultFiringMode;
        this.alternateFiringMode = alternateFiringMode;
        this.defaultFireRate = defaultFireRate;
        this.alternateFireRate = alternateFireRate;
    }
}

class SwitchScopeZoomAttributes extends LeftClickAbilityAttributes {
    /**
     *  
     * @param {string} leftClickAbilityType - a LeftClickAbilityTypes enum
     * @param {ScopeAttributes} defaultScopeAttributes
     * @param {ScopeAttributes} alternateScopeAttributes
     */
    constructor(leftClickAbilityType, defaultScopeAttributes, alternateScopeAttributes) {
        super(leftClickAbilityType);
        this.defaultScopeAttributes   = defaultScopeAttributes;
        this.alternateScopeAttributes = alternateScopeAttributes;
    }
}

const LeftClickAbilityTypes = {
    switchFiringMode: "switchFiringMode",
    switchScopeZoom: "switchScopeZoom"
}


export { LeftClickAbilityTypes, LeftClickAbilityAttributes, SwitchFiringModeAttributes, SwitchScopeZoomAttributes };