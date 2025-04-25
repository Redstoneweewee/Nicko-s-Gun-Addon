import { world } from '@minecraft/server';
import { Global } from '../Global.js';
import * as Def from '../2Definitions/SettingsDefinition.js';
import { SettingsUtil } from '../Utilities.js';
import { AnimationLink } from '../AnimationLink.js';

const SettingsTypes = {
    MultiplayerSupport: "MultiplayerSupport",
    CraftingRecipes: "CraftingRecipes",
    GunBreakBlocks: "GunBreakBlocks",
    ShowPlayerOutlines: "ShowPlayerOutlines",
    ShowSettingsOnEnterWorld: "ShowSettingsOnEnterWorld"
}

/**
 * @returns {boolean}
 */
function craftingRecipesAvailabilityTest() {
    return true;
} //not necessary if a DLC download is not needed

class OnChangeSettingsValue {

    static playerOutlines() {
        const active = SettingsUtil.getSettingsValue(SettingsTypes.ShowPlayerOutlines) === 1 ? true : false;
        world.getAllPlayers().forEach(player => {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.outlines_active, active);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.outlines_active);
        });
    }

}



const settingsList = {

    //All settings are declared as their default states
    MultiplayerSupport:       new Def.Settings("Multiplayer Support",                SettingsTypes.MultiplayerSupport,       Def.ToggleTypes.Dropdown, true, null, true),
    CraftingRecipes:          new Def.RestrictedSettings("Crafting Recipes", "§mDownload the §bSAR Premium Pack §mto activate! §r[§gXLiteMC.com§r]", "§cDownload the §gSAR Premium Pack §cto activate Crafting Recipes!",
                                                                                     SettingsTypes.CraftingRecipes,          Def.ToggleTypes.Dropdown, false, craftingRecipesAvailabilityTest, null, true),
    GunBreakBlocks:           new Def.Settings("Guns Breaking Blocks",               SettingsTypes.GunBreakBlocks,           Def.ToggleTypes.Dropdown, true, null, false),
    ShowPlayerOutlines:       new Def.Settings("Show Player Outlines",               SettingsTypes.ShowPlayerOutlines,       Def.ToggleTypes.Dropdown, true, OnChangeSettingsValue.playerOutlines, false),
    ShowSettingsOnEnterWorld: new Def.Settings("Show Settings After Entering World", SettingsTypes.ShowSettingsOnEnterWorld, Def.ToggleTypes.Dropdown, true, null, false),
    

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




world.afterEvents.playerSpawn.subscribe(evetData => {
    if(!evetData.initialSpawn) { return; }
    for(const settings of settingsList) {
        if(settings?.object.onChangeValue != null) {
            settings?.object.onChangeValue();
        }
    }
});

export { SettingsTypes, settingsList, OnChangeSettingsValue };