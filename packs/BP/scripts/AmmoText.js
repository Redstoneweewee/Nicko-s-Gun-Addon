import { Player } from "@minecraft/server";
import { Global } from './Global.js';
import { ItemUtil, FirearmUtil} from './Utilities.js';
import { MagazineTypes } from "./1Enums/MagazineEnums.js";
/**
 * 
 * @param {Player} player 
 */
function renewAmmoCount(player) {
    if(!FirearmUtil.isHoldingFirearm(player)) { return; }
    const isReloading = Boolean(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.is_reloading));
    if(isReloading) { return; }
    const firearmItemStack = ItemUtil.getSelectedItemStack(player);
    const firearm = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
    if(firearmItemStack === undefined) { return; }
    const firearmId = Number(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.id));

    const magazineItemStack = ItemUtil.getPlayerOffhandContainerSlot(player)?.getItem();
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStack(magazineItemStack);

    const ammoCount = FirearmUtil.getWorldAmmoUsingId(firearmId);
    const isMagazineEmpty = Boolean(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.isMagazineEmpty));
    //const magazineTypeId     = String(firearmItemStack.getDynamicProperty(Global.FirearmDynamicProperties.magazineTypeId));
    if(ammoCount === null || isMagazineEmpty === undefined) { return; }
    if(isMagazineEmpty) {
        player.onScreenDisplay.setActionBar(`Ammo: §l§e<§r§eOut of Ammo§e§l>`);
    }
    else if(magazineObject === undefined) {
        player.onScreenDisplay.setActionBar(`Ammo: §l§e<§r§cNo Magazine§e§l>`);
    }
    else if(firearm?.magazineAttribute.magazineClass !== magazineObject.magazineClass) {
        player.onScreenDisplay.setActionBar(`Ammo: §l§e<§r§eWrong Magazine Type§e§l>`);
    }
    else {
        const firearmObject = FirearmUtil.getFirearmObjectFromItemStack(firearmItemStack);
        if(firearmObject === undefined) { return; }
        const maxAmmo = magazineObject.magazineType === MagazineTypes.DurabilityBased ? magazineObject.maxAmmo : firearmObject.magazineAttribute.maxMagazineItemStackAmount;
        player.onScreenDisplay.setActionBar(`Ammo: §l§e<§r§a${ammoCount}/${maxAmmo}§e§l>`);
    }
}

export { renewAmmoCount };