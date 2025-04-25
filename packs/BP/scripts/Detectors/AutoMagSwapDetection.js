import { EntityComponentTypes, EntityInventoryComponent, GameMode, ItemStack, Player, world } from "@minecraft/server";
import { FirearmUtil, ItemUtil } from '../Utilities.js';
import { Global } from "../Global.js";
import { MagazineTags } from "../3Lists/MagazinesList.js";



/**
 * 
 * @param {Player} player 
 * @param {ItemStack} itemStack 
 * @param {boolean} isTactical
 * @returns 
 */
// function automaticMagazineSwap(player, itemStack, isTactical) {
//     if(!FirearmUtil.isHoldingFirearm(player)) { return; }
//     const firearmId = Number(itemStack.getDynamicProperty(Global.FirearmDynamicProperties.id));
//     if(firearmId === null || firearmId === undefined) { return; }
//     if(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading)) { return; }
    
//     const ammoCount = FirearmUtil.getWorldAmmoUsingId(firearmId);
//     if(ammoCount === null || ammoCount === undefined) { return; }
//     if(!isTactical && ammoCount > 0) { return; }

//     console.log("automatic reload");

//     //If the player is in creative, use the full counterpart of the empty one as a replacement
//     if(player.getGameMode() === GameMode.creative) {
//         if(tryRenewCreativeAmmo(player, isTactical)) { return; }
//     }

//     const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(itemStack);
//     if(firearmObject === null) { return; }
//     //Switch out offhand item with a full one if found
//     //If no offhand item make sure it doesn't break
//     const inv = player.getComponent(EntityComponentTypes.Inventory);
//     if(!(inv instanceof EntityInventoryComponent)) { return; }
//     const container = inv.container;
//     if(container === undefined) { return; }

    
//     //If the player is in survival, finds the magazine with the most ammo and swaps
//     let mostAmmoIndex = -1;
//     let mostAmmoCount = ammoCount;
//     for(let i=0; i<inv.inventorySize; i++) {
//         const itemStack = container.getItem(i);
//         if(itemStack === undefined) { continue; }
//         const magazine = FirearmUtil.getMagazineObjectFromItemStack(itemStack);
//         //if magazine === null then it's not a magazine
//         if(magazine === null) { continue; }
//         if(firearmObject.magazineClass !== magazine.magazineClass) { continue; }

//         const magazineAmmoCount = ItemUtil.tryGetDurability(itemStack);
//         if(magazineAmmoCount === null) { continue; }
//         if(magazineAmmoCount > mostAmmoCount) {
//             mostAmmoIndex = i;
//             mostAmmoCount = magazineAmmoCount;
//         }
//     }  

//     //If mostAmmoIndex === -1, then could not find usable magazine
//     if(mostAmmoIndex === -1 && player.getGameMode() !== GameMode.creative) { console.log("could not find any usable magazines."); return; }
//     else if(mostAmmoIndex === -1 && player.getGameMode() === GameMode.creative) { FirearmUtil.tryRenewFirearmAmmoOnMagazineChange(player); return; }
    
//     //Swaps offhand item with magazine
//     const magazineContainerSlot = container.getSlot(mostAmmoIndex);
//     const offhandContainerSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
//     if(offhandContainerSlot === null) { console.error("offhand Container Slot is null when trying to automatically reload."); return; }
//     if(offhandContainerSlot.getItem() === undefined) {
//         offhandContainerSlot.setItem(magazineContainerSlot.getItem());
//         magazineContainerSlot.setItem(); //clears the container slot for where the magazine(s) used to be
//     }
//     else {
//         const offhandItemStack = offhandContainerSlot.getItem();
//         offhandContainerSlot.setItem(magazineContainerSlot.getItem());
//         if(offhandItemStack === undefined) { return; }
//         magazineContainerSlot.setItem();
//         container.addItem(offhandItemStack);
//     }
// }

/**
 * 
 * @param {Player} player 
 * @param {boolean} isTactical
 * @returns {Boolean}
 */
function tryRenewCreativeAmmo(player, isTactical) {
    const offhandContainerSlot = ItemUtil.getPlayerOffhandContainerSlot(player);
    if(offhandContainerSlot === null) { return false; }
    const offhandItemStack = offhandContainerSlot.getItem();
    if(offhandItemStack === undefined) { return false; }
    const magazineObject = isTactical ? FirearmUtil.getMagazineObjectFromItemStackBoth(offhandItemStack) : FirearmUtil.getMagazineObjectFromItemStackEmpty(offhandItemStack);
    if(magazineObject === undefined) { return false; }
    offhandContainerSlot.setItem(new ItemStack(magazineObject.tag, 1));
    return true;
}


//---------------------- Ran in Main.js ----------------------
//export { automaticMagazineSwap };
//---------------------- Ran in Main.js ----------------------