import { Player, system, world } from "@minecraft/server";
import { RestrictedSettings } from "../2Definitions/SettingsDefinition";
import { Vector3 } from "../Math/Vector3";
import * as ui from "@minecraft/server-ui";
import { SettingsTypes, ToggleTypes } from "../1Enums/SettingsEnums";
import { SettingsList } from "../3Lists/SettingsList";
import { SettingsUtil, TypeUtil } from "../UtilitiesInit";

const addonName = `§e§l<§r§eSimple Arsenal§l> §r§g[Premium Pack]`;
const addonNameLeftWhiteSpace = `    `;
const addonNameRightWhiteSpace = `    `;
const linkNameRaw = `XLiteMC.com`;
const linkName = `§b${linkNameRaw}§r`;
const functionName = `§a/function SAR_settings§r`;

const formTitleName = `§8Simple Arsenal Settings:`;


//                  `IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII`;
const baseMessage = ` §8-------------------------------`+
                    `          §rThank you for downloading       \n`+
                    `${addonNameLeftWhiteSpace}${addonName}!${addonNameRightWhiteSpace}`+
                    ` §8-------------------------------\n\n`+
                    `§rThe premium version has the most advanced features possible! `+
                    `To download §gDLCs§r and §gFeature Packs§r, go to ${linkName}!!\n\n`+
                    `Do §aCTRL+A §f& §aCTRL+C §fto copy the link!!\n\n`+
                    `   ---- §aLink to full downloads: §r----   `;

//const settingsMesssage = `\n§8--------------------------------\n`+
//                         `§8------------ §aSettings: §8------------\n`+
//                         `§8--------------------------------\n\n§r`;

const settingsMesssage = `            §8._______________.            `+
                         `\n§8   ._____/  §e§l<§r§eSAR§l>§r §aSettings  §8\\_____.\n`+
                         `   |===========================|\n\n§r`;

const settingsMessageEnd = `§8|===========================|§r`;
const settingsMesssagePlayer = `         §8._______________.            `+
                         `\n§8._____/  §e§l<§r§eSAR§l>§r §aSettings  §8\\_____.\n`+
                               settingsMessageEnd+'\n\n';


const beforeSettingName = "\n§l·§r ";

let initialMessage = false;
world.afterEvents.playerSpawn.subscribe(evetData => {
    if(!evetData.initialSpawn || initialMessage) { return; }
    const player = evetData.player;
    showSettings(player, initialMessage);
    initialMessage = true;
});
world.getAllPlayers().forEach(player => {
    showSettings(player, initialMessage);
    initialMessage = true;
});


function showSettings(player, initialMessage) {
    const iVD = player.getViewDirection();
    const intervalID = system.runInterval(() => {
        const speed = new Vector3(player.getVelocity().x, player.getVelocity().y, player.getVelocity().z).length();
        const vD = player.getViewDirection();
        if(speed > 0 || iVD.x !== vD.x || iVD.y !== vD.y || iVD.z !== vD.z) {
            if(SettingsUtil.getSettingsValue(SettingsTypes.ShowSettingsOnEnterWorld) === 1 && !initialMessage) {
                showSettingsForm(player);
            }
            else {
                player.sendMessage(`Use '${functionName}' to change settings!`);
                player.sendMessage(`\nThe base version only has a limited number of features. To download the rest of the features, go to ${linkName}!!\n\n`);
            }
            system.clearRun(intervalID);
        }
    });
}

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
    for(const [, setting] of TypeUtil.getIterable(SettingsList)) {
        if(setting === undefined) { continue; }
        const score = SettingsUtil.getSettingsValue(setting.type);
        let options = setting.onlyActive ? ["§qActive"] : ["§qActive", "§mInactive"];
        let defaultIndex = score ? 0 : 1;
        if(setting instanceof RestrictedSettings && !setting.availabilityTest()) {
            options = [setting.restrictedDropdownText];
        }
        if(setting instanceof RestrictedSettings) {
            defaultIndex = 0;
        }
        if(first) {
            if(setting.toggleType === ToggleTypes.Dropdown) {
                settingsForm.dropdown(settingsMesssage+beforeSettingName+setting.displayName, options, defaultIndex);
            }
            else if(setting.toggleType === ToggleTypes.Toggle) {
                settingsForm.toggle(settingsMesssage+beforeSettingName+setting.displayName, Boolean(defaultIndex ? 0 : 1));
            }
            else {
                console.error("Settings only support dropdowns and toggles at the moment");
            }
            first = false;
        }
        else {
            if(setting.toggleType === ToggleTypes.Dropdown) {
                settingsForm.dropdown(beforeSettingName+setting.displayName, options, defaultIndex);
            }
            else if(setting.toggleType === ToggleTypes.Toggle) {
                settingsForm.toggle(beforeSettingName+setting.displayName, Boolean(defaultIndex ? 0 : 1));
            }
            else {
                console.error("Settings only support dropdowns and toggles at the moment");
            }
        }
        console.log(`${setting.type} is ${setting.active}`);
    }


    settingsForm.show(player).then(response => {
        player.sendMessage(settingsMesssagePlayer);
        let downloadPrompt = "";
        if (response.formValues) {
            let formValues = response.formValues.slice(1); //delete the first one, which is a ref to the download link          
            let index = 0;
            for(const [, setting] of TypeUtil.getIterable(SettingsList)) {
                if(setting === undefined) { index++; continue; }
                let value;
                const formValue = formValues[index];
                if(typeof(formValue) === "number" && formValue <= 1) {
                    /**
                     * for dropdowns:
                     * if available,     0 = active, 1 = inactive
                     * if not available, 0 = inactive
                     */
                    if(setting instanceof RestrictedSettings && !setting.availabilityTest()) {
                        value = 0;
                    }
                    else {
                        value = formValue ? 0 : 1;
                    }
                }
                else if(typeof(formValue) === "boolean") {
                    value = Number(formValue);
                }
                else {
                    console.error("Settings do not support strings or dropdowns with more than 2 options at the moment.");
                    continue;
                }

                SettingsUtil.setSettingsValue(setting, setting.type, value);
                let activityText = "§r§f[§cInactive§r§f]";
                //if(setting.object instanceof RestrictedSettings && setting.object.availabilityTest()) {
                    if(!setting.onlyActive) {
                        activityText = value == 1 ? "§r§f[§aActive§r§f]" : "§r§f[§cInactive§r§f]";
                    }
                    else {
                        activityText = "§r§f[§aActive§r§f]";
                    }
                //}
                if(setting instanceof RestrictedSettings && !setting.availabilityTest()) {
                    downloadPrompt += `§l·§r ${setting.restrictedMessageText}\n`;
                }
                player.sendMessage(`§l·§r ${setting.displayName}: ${activityText}`);
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


export { showSettingsForm, linkName };