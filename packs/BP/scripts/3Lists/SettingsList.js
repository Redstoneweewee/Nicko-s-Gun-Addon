import { world } from '@minecraft/server';
import { Global } from '../Global.js';
import * as Def from '../2Definitions/SettingsDefinition.js';
import * as Enums from "../1Enums/SettingsEnums.js"
import { SettingsUtil, TypeUtil } from '../Utilities.js';
import { AnimationLink } from '../AnimationLink.js';

/**
 * @returns {boolean}
 */
function craftingRecipesAvailabilityTest() {
    return true;
} //not necessary if a DLC download is not needed


class OnChangeSettingsValue {

    static playerOutlines() {
        const active = SettingsUtil.getSettingsValue(Enums.SettingsTypes.ShowPlayerOutlines) === 1 ? true : false;
        world.getAllPlayers().forEach(player => {
            player.setDynamicProperty(Global.PlayerDynamicProperties.animation.outlines_active, active);
            AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.outlines_active);
        });
    }

}


/**
 * @enum {Def.Settings}
 * @type {Record<keyof typeof Enums.SettingsTypes, Def.Settings>}
 */
const SettingsList = {

    //All settings are declared as their default states
    MultiplayerSupport: new Def.Settings({
        displayName:   "Multiplayer Support",
        settingsType:  Enums.SettingsTypes.MultiplayerSupport,
        toggleType:    Enums.ToggleTypes.Dropdown,
        active:        true,
        onChangeValue: null,
        onlyActive:    true
    }),
    CraftingRecipes: new Def.RestrictedSettings({
        displayName:            "Crafting Recipes",
        settingsType:           Enums.SettingsTypes.CraftingRecipes,
        toggleType:             Enums.ToggleTypes.Dropdown,
        active:                 false,
        onChangeValue:          null,
        onlyActive:             true,
        restrictedDropdownText: "§mDownload the §bSAR Premium Pack §mto activate! §r[§gXLiteMC.com§r]",
        restrictedMessageText:  "§cDownload the §gSAR Premium Pack §cto activate Crafting Recipes!",
        availabilityTest:       craftingRecipesAvailabilityTest
    }),
    GunBreakBlocks: new Def.Settings({
        displayName:   "Guns Breaking Blocks",
        settingsType:  Enums.SettingsTypes.GunBreakBlocks,
        toggleType:    Enums.ToggleTypes.Dropdown,
        active:        true,
        onChangeValue: null,
        onlyActive:    false
    }),
    ShowPlayerOutlines: new Def.Settings({
        displayName:   "Show Player Outlines",
        settingsType:  Enums.SettingsTypes.ShowPlayerOutlines,
        toggleType:    Enums.ToggleTypes.Dropdown,
        active:        true,
        onChangeValue: OnChangeSettingsValue.playerOutlines,
        onlyActive:    false
    }),
    ShowSettingsOnEnterWorld: new Def.Settings({
        displayName:   "Show Settings After Entering World",
        settingsType:  Enums.SettingsTypes.ShowSettingsOnEnterWorld,
        toggleType:    Enums.ToggleTypes.Dropdown,
        active:        true,
        onChangeValue: null,
        onlyActive:    false
    })
}


world.afterEvents.playerSpawn.subscribe(evetData => {
    if(!evetData.initialSpawn) { return; }
    for(const [, object] of TypeUtil.getIterable(SettingsList)) {
        if(object.onChangeValue != null) {
            object.onChangeValue();
        }
    }
});

export { SettingsList };