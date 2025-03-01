import { EntityComponentTypes, EntityInventoryComponent, ItemStack, world } from '@minecraft/server'
import { FirearmNameUtil, FirearmUtil, ItemUtil } from '../Utilities';

world.afterEvents.itemStartUse.subscribe((eventData) => {
	const magazineItemStack = eventData.itemStack;
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
    if(magazineObject === null) { return; }
    if(magazineItemStack.amount > 1) { return; }

    const magazineDurability = ItemUtil.tryGetDurability(magazineItemStack);
    if(magazineDurability === null || magazineDurability === magazineObject.maxAmmo) { return; }
    
    const player = eventData.source;
    const inv = player.getComponent(EntityComponentTypes.Inventory);
    if(inv === undefined) { return; }
    if(!(inv instanceof EntityInventoryComponent)) { return; }
    const container = inv.container;
    if(container === undefined) { return; }

    for(let i=0; i<inv.inventorySize; i++) {
        const bulletItemStack = container.getItem(i);
        if(bulletItemStack === undefined || !FirearmUtil.isBulletType(bulletItemStack, magazineObject.bulletType)) { continue; }
        
        if(magazineDurability+1 < magazineObject.maxAmmo) {
            ItemUtil.trySetDurability(magazineItemStack, magazineDurability+1);
            FirearmNameUtil.renewMagazineName(magazineItemStack,  magazineDurability+1);
            container.setItem(player.selectedSlotIndex, magazineItemStack);
        }
        else {
            container.setItem(player.selectedSlotIndex, magazineObject.itemStack);
        }
        if(bulletItemStack.amount >= 2) {
            bulletItemStack.amount -= 1;
            container.setItem(i, bulletItemStack);
        }
        else {
            container.setItem(i);
        }
        break;
    }  
});


/*
world.afterEvents.itemStartUse.subscribe((eventData) => {
    const itemStack = eventData.itemStack;
    let attributes = "\n";
    attributes += `amount: ${itemStack.amount}\n`;
    attributes += `getCanDestroy: ${itemStack.getCanDestroy()}\n`;
    attributes += `getCanPlaceOn: ${itemStack.getCanPlaceOn()}\n`;
    attributes += `components: [`;
    itemStack.getComponents().forEach(comp => { attributes += `${comp.typeId}, `; });
    attributes += `]\n`;
    attributes += `getDynamicPropertyIds: ${itemStack.getDynamicPropertyIds()}\n`;
    attributes += `getLore: ${itemStack.getLore()}\n`;
    attributes += `tags: ${itemStack.getTags()}\n`;
    attributes += `isStackable: ${itemStack.isStackable}\n`;
    attributes += `keepOnDeath: ${itemStack.keepOnDeath}\n`;
    attributes += `lockMode: ${itemStack.lockMode}\n`;
    attributes += `maxAmount: ${itemStack.maxAmount}\n`;
    attributes += `nameTag: ${itemStack.nameTag}\n`;
    attributes += `typeId: ${itemStack.typeId}\n`;
    console.log(`attributes: ${attributes}`);
});
*/