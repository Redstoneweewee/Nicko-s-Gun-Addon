import { EntityComponentTypes, EntityInventoryComponent, ItemStack, world } from '@minecraft/server'
import { FirearmNameUtil, FirearmUtil, ItemUtil } from '../Utilities';

world.afterEvents.itemStartUse.subscribe((eventData) => {
	const magazineItemStack = eventData.itemStack;
    let isEmpty = false;
    if(FirearmUtil.getMagazineObjectFromItemStackEmpty(magazineItemStack)) {
        isEmpty = true;
    }

    const magazineObject = FirearmUtil.getMagazineObjectFromItemStackBoth(magazineItemStack);
    if(magazineObject === undefined) { return; }
    if(!isEmpty && magazineItemStack.amount > 1) { return; }

    let moveEmptyOff = false;
    if(isEmpty && magazineItemStack.amount > 1) {
        moveEmptyOff = true;
    }

    let magazineDurability = ItemUtil.tryGetDurability(magazineItemStack);
    if(magazineDurability === magazineObject.maxAmmo) { return; }
    if(magazineDurability === undefined && isEmpty) {
        magazineDurability = 0;
    }
    if(magazineDurability === undefined) { return; }
    
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
            let newMagazineItemStack = new ItemStack(magazineObject.itemTypeId);
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
            container.addItem(new ItemStack(magazineObject.itemTypeId+"_empty", magazineItemStack.amount-1));
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
