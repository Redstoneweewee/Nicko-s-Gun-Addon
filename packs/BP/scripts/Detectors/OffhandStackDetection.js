import { Player, system, world } from "@minecraft/server";
import { FirearmUtil, ItemUtil } from '../Utilities.js';

/**
 * 
 * @param {Player} player 
 */
function offhandStackCheck(player) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    if(offhandItemStack === null || offhandItemStack === undefined) { return; }
    if(offhandItemStack.amount > 1) { 
        ItemUtil.moveOldOffhandItemOff(player, true);
    }
}

//---------------------- Ran in Main.js ----------------------
export { offhandStackCheck };
//---------------------- Ran in Main.js ----------------------