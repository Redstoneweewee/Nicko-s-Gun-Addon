import { Player, system } from "@minecraft/server";
import { showSettingsForm } from '../UI/SettingsMessage.js';
import { AnimationUtil, FirearmUtil, ItemUtil, SoundsUtil } from "../Utilities.js";
import { AnimationTypes } from "../Definitions/AnimationDefinition.js";
import { shoot } from "../Shoot.js";
import { onLeftClick } from "../Detectors/LeftClickAbilityDetection.js";

system.afterEvents.scriptEventReceive.subscribe(eventData => {
    const id = eventData.id;
    const message = eventData.message;
    const player = eventData.sourceEntity;
    if(id === "yes:firearm_shoot" && player instanceof Player) {
        const firearmItemStack = ItemUtil.getSelectedItemStack(player);
        if(firearmItemStack === null) { return; }
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
        if(firearmObject === null) { return; }
        shoot(player, firearmObject);
    }
    else if(id === "yes:firearm_left_click" && player instanceof Player) {
        onLeftClick(player);
    }
});