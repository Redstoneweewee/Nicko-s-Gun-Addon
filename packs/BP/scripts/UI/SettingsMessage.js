import { Player, system, world } from "@minecraft/server";
import { RestrictedSettings, ToggleTypes } from "../2Definitions/SettingsDefinition";
import { settingsList, SettingsTypes } from "../3Lists/SettingsList";
import { Vector3 } from "../Math/Vector3";
import * as ui from "@minecraft/server-ui";
import { SettingsUtil } from "../Utilities";

const addonName = `§e§l<§r§eSimple Arsenal§l> §r§h[Base Pack]`;
const addonNameLeftWhiteSpace = `      `;
const addonNameRightWhiteSpace = `      `;
const linkNameRaw = `XLiteMC.com/SA`;
const linkName = `§b${linkNameRaw}§r`;
const functionName = `§a/function SA_settings§r`;

const formTitleName = `§8Simple Arsenal Settings:`;


//                  `IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII`;
const baseMessage = ` §8-------------------------------`+
                    `          §rThank you for downloading       \n`+
                    `${addonNameLeftWhiteSpace}${addonName}!${addonNameRightWhiteSpace}`+
                    ` §8-------------------------------\n\n`+
                    `§rThe base version only has a limited number of features. `+
                    `To download the rest of the features, go to ${linkName}!!\n\n`+
                    `Do §aCTRL+A §f& §aCTRL+C §fto copy the link!!\n\n`+
                    `   ---- §aLink to full downloads: §r----   `;

//const settingsMesssage = `\n§8--------------------------------\n`+
//                         `§8------------ §aSettings: §8------------\n`+
//                         `§8--------------------------------\n\n§r`;

const settingsMesssage = `                  §8.________.           `+
                         `\n§8   ._________/ §aSettings §8\\_________.\n`+
                         `   |============================|\n\n§r`;

const settingsMessageEnd = `§8|============================|§r`;
const settingsMesssagePlayer = `               §8.________.        `+
                               `\n§8._________/ §aSettings §8\\_________.\n`+
                               settingsMessageEnd+'\n\n';


world.getAllPlayers().forEach(player => {
    const intervalID = system.runInterval(() => {
        if(new Vector3(player.getVelocity().x, player.getVelocity().y, player.getVelocity().z).length() > 0) {
            if(SettingsUtil.getSettingsValue(SettingsTypes.ShowSettingsOnEnterWorld) === 1) {
                showSettingsForm(player);
            }
            else {
                player.sendMessage(`Use '${functionName}' to change settings!`);
                player.sendMessage(`\nThe base version only has a limited number of features. To download the rest of the features, go to ${linkName}!!\n\n`);
            }
            system.clearRun(intervalID);
        }
    });
});

/**
 * 
 * @param {Player} player 
 */
function showSettingsForm(player) {
    const settingsForm = new ui.ModalFormData()
        .title(formTitleName)
        .textField(baseMessage, linkNameRaw, linkNameRaw)
        .submitButton("Okay!");


    let first = true;
    for(const setting of settingsList) {
        if(setting === undefined) { continue; }
        const options = setting.object.availabilityTest() ? (setting.object.onlyActive ? ["§qActive"] : ["§qActive", "§mInactive"]) : [`§mDownload §b${setting.object.displayName} Feature Pack §mto activate!`];
        const score = SettingsUtil.getSettingsValue(setting.name);
        const defaultIndex = setting.object.availabilityTest() ? (score ? 0 : 1) : 0;
        if(first) {
            if(setting.object.toggleType === ToggleTypes.Dropdown) {
                settingsForm.dropdown(settingsMesssage+setting.object.displayName, options, defaultIndex);
            }
            else if(setting.object.toggleType === ToggleTypes.Toggle) {
                settingsForm.toggle(settingsMesssage+setting.object.displayName, Boolean(defaultIndex ? 0 : 1));
            }
            else {
                console.error("Settings only support dropdowns and toggles at the moment");
            }
            first = false;
        }
        else {
            if(setting.object.toggleType === ToggleTypes.Dropdown) {
                settingsForm.dropdown(setting.object.displayName, options, defaultIndex);
            }
            else if(setting.object.toggleType === ToggleTypes.Toggle) {
                settingsForm.toggle(setting.object.displayName, Boolean(defaultIndex ? 0 : 1));
            }
            else {
                console.error("Settings only support dropdowns and toggles at the moment");
            }
        }
        console.log(`${setting.name} is ${setting.object.active}`);
    }


    settingsForm.show(player).then(response => {
        player.sendMessage(settingsMesssagePlayer);
        let downloadPrompt = "";
        if (response.formValues) {
            let formValues = response.formValues.slice(1); //delete the first one, which is a ref to the download link          
            let index = 0;
            for(const setting of settingsList) {
                if(setting === undefined) { index++; continue; }
                let value;
                const formValue = formValues[index];
                if(typeof(formValue) === "number" && formValue <= 1) {
                    /**
                     * for dropdowns:
                     * if available,     0 = active, 1 = inactive
                     * if not available, 0 = inactive
                     */
                    if(setting.object.availabilityTest()) {
                        value = formValue ? 0 : 1;
                    }
                    else {
                        value = 0;
                    }
                }
                else if(typeof(formValue) === "boolean") {
                    value = Number(formValue);
                }
                else {
                    console.error("Settings do not support strings or dropdowns with more than 2 options at the moment.");
                    continue;
                }

                SettingsUtil.setSettingsValue(setting.name, value)
                let activityText = "§r§f[§cInactive§r§f]";
                if(setting.object.availabilityTest()) {
                    if(!setting.object.onlyActive) {
                        activityText = value == 1 ? "§r§f[§aActive§r§f]" : "§r§f[§cInactive§r§f]";
                    }
                    else {
                        activityText = "§r§f[§aActive§r§f]";
                    }
                }
                else {
                    downloadPrompt += `§l·§r §cDownload §b${setting.object.displayName} Feature Pack §cto activate ${setting.object.displayName}!\n`;
                }
                player.sendMessage(`§l·§r ${setting.object.displayName}: ${activityText}`);
                index++;
            }
        }
        else {
            player.sendMessage(`§cChanges not saved! Do not press the "X" if you want to change settings!`);
        }
        if(downloadPrompt !== "") { player.sendMessage("\n"+downloadPrompt); }
        player.sendMessage(`\nUse '${functionName}' to change settings!`);
        player.sendMessage(`Link to full downloads: ${linkName}`);
        player.sendMessage("\n"+settingsMessageEnd);
    });
}


export { showSettingsForm };