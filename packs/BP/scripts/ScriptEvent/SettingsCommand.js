import { Player, system } from "@minecraft/server";

system.afterEvents.scriptEventReceive.subscribe(eventData => {
    const id = eventData.id;
    const player = eventData.sourceEntity;
    if(id === "yes:settings" && player instanceof Player) {
        //showSettingsForm(player);
    }
});