import { world, system } from "@minecraft/server";
import { RestrictedSettings } from "./2Definitions/SettingsDefinition.js";
import { SettingsList } from "./3Lists/SettingsList.js";
import { SettingsUtil, TypeUtil } from "./UtilitiesInit.js";

if (world.scoreboard.getObjective("Settings") === undefined) {
    world.scoreboard.addObjective("Settings");
}

/**
 * change whether the setting is active based on the Settings scoreboard
 * if the setting is not active, skips it & stays false
*/
for(const [, setting] of TypeUtil.getIterable(SettingsList)) {
    if(setting === undefined) { continue; }
    if(!world.scoreboard.getObjective("Settings")?.hasParticipant(setting.type)) {
        SettingsUtil.setSettingsValue(setting, setting.type, setting.active ? 1 : 0);
    }
    /**
     * Sets all to false before they get loaded by individual DLCs
     * For settings that don't need DLCs, their dynamic properties are not used
     */
    world.setDynamicProperty(setting.type, false);
 
    if((setting instanceof RestrictedSettings) && !setting.availabilityTest()) { 
        SettingsUtil.setSettingsValue(setting, setting.type , 0);
        continue; 
    }
    if(setting.onlyActive) {
        setting.active = true;
        SettingsUtil.setSettingsValue(setting, setting.type, 1);
    }
    else {
        setting.active = SettingsUtil.getSettingsValue(setting.type) === 0 ? false : true;
    }
}
