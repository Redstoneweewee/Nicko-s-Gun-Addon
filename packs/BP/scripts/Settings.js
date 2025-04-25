import { world, system } from "@minecraft/server";
import { settingsList, SettingsTypes } from "./3Lists/SettingsList.js";
import { SettingsUtil } from "./Utilities.js";
import { RestrictedSettings } from "./2Definitions/SettingsDefinition.js";

if (world.scoreboard.getObjective("Settings") === undefined) {
    world.scoreboard.addObjective("Settings");
}

/**
 * change whether the setting is active based on the Settings scoreboard
 * if the setting is not active, skips it & stays false
*/
for(const settings of settingsList) {
    if(settings === undefined) { continue; }
    if(!world.scoreboard.getObjective("Settings")?.hasParticipant(settings.name)) {
        SettingsUtil.setSettingsValue(settings.object, settings.name, settings.object.active ? 1 : 0);
    }
    /**
     * Sets all to false before they get loaded by individual DLCs
     * For settings that don't need DLCs, their dynamic properties are not used
     */
    world.setDynamicProperty(settings.name, false);
 
    if((settings.object instanceof RestrictedSettings) && !settings.object.availabilityTest()) { 
        SettingsUtil.setSettingsValue(settings.object, settings.name , 0);
        continue; 
    }
    if(settings.object.onlyActive) {
        settings.object.active = true;
        SettingsUtil.setSettingsValue(settings.object, settings.name, 1);
    }
    else {
        settings.object.active = SettingsUtil.getSettingsValue(settings.name) === 0 ? false : true;
    }
}
