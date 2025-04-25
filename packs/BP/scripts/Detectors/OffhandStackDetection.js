import { Player, system, world } from "@minecraft/server";
import { FirearmUtil, ItemUtil } from '../Utilities.js';

/**
 * 
 * @param {Player} player 
 */
function offhandStackCheck(player) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(ItemUtil.getSelectedItemStack(player));
    if(firearmObject === undefined) { return; }
    const offhandItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    if(offhandItemStack === undefined) { return; }
    if(offhandItemStack.amount > firearmObject.magazineAttribute.maxMagazineItemStackAmount && !FirearmUtil.isSwitchingFirearm(player)) { 
        ItemUtil.moveOldOffhandItemOff(player, firearmObject.magazineAttribute.maxMagazineItemStackAmount);
    }
}

//---------------------- Ran in Main.js ----------------------
export { offhandStackCheck };
//---------------------- Ran in Main.js ----------------------