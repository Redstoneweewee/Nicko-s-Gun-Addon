import "./CustomComponents/Initialization.js";
import "./WorldInitialization.js";

import "./3Lists/FirearmsList.js";
import "./3Lists/MagazinesList.js";

import "./ScriptEvent/Functions.js";
import "./ScriptEvent/SettingsCommand.js";
import "./ScriptEvent/FirearmScriptEvents.js";
import "./Settings.js";
import "./Teams.js";



import { world, system } from '@minecraft/server';
import { Vector3 } from './Math/Vector3.js';
import { Global } from "./Global.js";
const Vector = new Vector3();


import * as ShootDetection from "./Detectors/ShootDetection.js";
import { ReloadTypes } from "./1Enums/ReloadEnums.js";
import * as Reload from "./Reload.js";


world.afterEvents.itemStartUse.subscribe((eventData) => {
    const player = eventData.source;
    const itemStack = eventData.itemStack;
    ShootDetection.shootDetection(player, itemStack);
    //FirearmUtil.tryRenewFirearmAmmoOnMagazineChange(player);
    //AutoReloadDetection.automaticMagazineSwap(player, itemStack, false);
    Reload.tryManualReload(player);
    Reload.tryAutomaticReload(player, ReloadTypes.Normal);
});


import * as HoldDetection from "./Detectors/HoldDetection.js";
import * as DirectionDetection from "./Detectors/DirectionDetection.js";
import * as OffhandStackCheck from "./Detectors/OffhandStackDetection.js";
import * as AimDetection from "./Detectors/AimDetection.js";
import { renewAmmoCount } from "./AmmoText.js";
import { FirearmUtil } from "./Utilities.js";
import * as Mining from "./Blocks/Mining.js";

//import { teleportHitboxEntity } from "./Hitbox.js";


//world.getAllPlayers().forEach(player => {
//    teleportHitboxEntity(player);
//});

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        DirectionDetection.directionDetection(player);
        OffhandStackCheck.offhandStackCheck(player);
        HoldDetection.holdingFirearmDetectionPart1(player);
        //test(player);
    });
    for(const func of Global.mainLoops.values()) {
        func(); //runs all main loop functions here
    }
    world.getAllPlayers().forEach(player => {
        player.inputInfo
        HoldDetection.holdingFirearmDetectionPart2(player);
        if(system.currentTick % 15 === 0) { renewAmmoCount(player); }

        if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_shooting) === false) {
            FirearmUtil.tryDecreaseRecoil(player);
        }
        AimDetection.aimDetection(player);
        //FirearmUtil.tryRenewFirearmAmmoOnMagazineChange(player);
        Reload.tryManualReload(player);
        //LeftClickAbilityDetection.leftClickAbilityDetection(player);

        
        //---------- block & pickaxe destroy time ----------
        Mining.miningRaycast(player);
        //--------------------------------------------------
    });
});



//import "./Blocks/FirearmsWorkbench.js";

//system.runInterval(() => {
//    world.setDynamicProperty("firearmId:"+getRandomNumber(Math.pow(2,-32),Math.pow(2,32)).toString(), 999);
//},0);

/**
 * |------------------------------------------------------------|
 * |                                                            |
 * | Make sure all firearms have the "yes:is_firearmgun" typeId |
 * |     and the typeId of their own variant like "yes:ak47"    |
 * |                                                            |
 * |------------------------------------------------------------|
 * |                                                            |
 * |  Make sure all magazines have the "yes:is_magazine" typeId |
 * |  and of their own variant like "yes:rifle_magazine_30"     |
 * |                                                            |
 * |------------------------------------------------------------|
 */


/**
 * Settings and UI stuff run after all other scripts
 */
import "./UI/SettingsMessage.js";
