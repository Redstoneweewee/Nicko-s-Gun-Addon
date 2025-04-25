import { EntityComponentTypes, EntityInventoryComponent, ItemStack, world } from '@minecraft/server'
import { FirearmNameUtil, FirearmUtil, ItemUtil } from '../Utilities';

world.afterEvents.itemStartUse.subscribe((eventData) => {
	const magazineItemStack = eventData.itemStack;
    const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
    if(magazineObject === undefined) { return; }
    if(!isEmpty && magazineItemStack.amount > 1) { return; }

    const magazineDurability = ItemUtil.tryGetDurability(magazineItemStack);
    if(magazineDurability === null || magazineDurability === magazineObject.maxAmmo) { return; }
    
    const player = eventData.source;
    const inv = player.getComponent(EntityComponentTypes.Inventory);
    if(inv === undefined) { return; }
    if(!(inv instanceof EntityInventoryComponent)) { return; }
    const container = inv.container;
    if(container === undefined) { return; }

    for(let i=0; i<inv.inventorySize; i++) {
        const ammoItemStack = container.getItem(i);
        if(ammoItemStack === undefined || !FirearmUtil.isFillableAmmoType(ammoItemStack, magazineObject)) { continue; }
        
        let addBulletCount = ammoItemStack.amount;
        let removeBulletCount = ammoItemStack.amount;
        if(ammoItemStack.amount >= 5) {
            addBulletCount = 5;
            removeBulletCount = 5;
        }


        //add up to 5 bullets to magazine
        if(isEmpty) {
            let newMagazineItemStack = new ItemStack(magazineObject.tag);
            ItemUtil.trySetDurability(newMagazineItemStack, addBulletCount);
            FirearmNameUtil.renewMagazineName(newMagazineItemStack, addBulletCount);
            container.setItem(player.selectedSlotIndex, newMagazineItemStack);
        }
        else if(magazineDurability+addBulletCount < magazineObject.maxAmmo) {
            ItemUtil.trySetDurability(magazineItemStack, magazineDurability+addBulletCount);
            FirearmNameUtil.renewMagazineName(magazineItemStack,  magazineDurability+addBulletCount);
            container.setItem(player.selectedSlotIndex, magazineItemStack);
        }
        else {
            container.setItem(player.selectedSlotIndex, magazineObject.itemStack);
            removeBulletCount = magazineObject.maxAmmo - magazineDurability;
        }

        //move empty stack off & keep only 1 in mainhand
        if(moveEmptyOff) {
            container.addItem(new ItemStack(magazineObject.tag+"_empty", magazineItemStack.amount-1));
        }

        //remove 1 bullet
        if(ammoItemStack.amount >= removeBulletCount+1) {
            ammoItemStack.amount -= removeBulletCount;
            container.setItem(i, ammoItemStack);
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