import { Player, system } from "@minecraft/server";
import { showSettingsForm } from '../UI/SettingsMessage.js';

system.afterEvents.scriptEventReceive.subscribe(eventData => {
    const id = eventData.id;
    const player = eventData.sourceEntity;
    if(id === "yes:settings" && player instanceof Player) {
        showSettingsForm(player);
    }
});