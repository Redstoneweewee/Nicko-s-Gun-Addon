import { world } from '@minecraft/server';
import { Global } from '../Global.js';
import * as Def from '../Definitions/SettingsDefinition.js';

const SettingsTypes = {
    MultiplayerSupport: "MultiplayerSupport",
    CraftingRecipes: "CraftingRecipes",
    ShowSettingsOnEnterWorld: "ShowSettingsOnEnterWorld"
}

/**
 * @returns {boolean}
 */
function craftingRecipesAvailabilityTest() {
    if(world.getDynamicProperty(SettingsTypes.CraftingRecipes) === true) {
        return true;
    }
    return false;
} //not necessary because a DLC download is not needed


const settingsList = {

    //All settings are declared as their default states
    MultiplayerSupport:       new Def.Settings("Multiplayer Support",                SettingsTypes.MultiplayerSupport,       Def.ToggleTypes.Dropdown, true,  function() { return true; },     true),
    CraftingRecipes:          new Def.Settings("Crafting Recipes",                   SettingsTypes.CraftingRecipes,          Def.ToggleTypes.Dropdown, false, craftingRecipesAvailabilityTest, true),
    ShowSettingsOnEnterWorld: new Def.Settings("Show Settings After Entering World", SettingsTypes.ShowSettingsOnEnterWorld, Def.ToggleTypes.Toggle,   true,  function() { return true; }),
    

    [Symbol.iterator]() {
        const entries = Object.entries(this); // Convert object properties to an array
        let index = 0;

        return {
            next: () => {
                while (index < entries.length) {
                    const [name, object] = entries[index++];
                    return { value: { name, object }, done: false };
                }
                return { done: true };
            }
        };
    }
}

export { SettingsTypes, settingsList };