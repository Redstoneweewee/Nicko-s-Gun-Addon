import { world, system } from "@minecraft/server";
//import { getItemType, getTagName, applyDurabilityDamage } from "../basic_functions.js";
//import { listOfEquipmentTypes } from "../equipment_attributes/list_of_equipment_types.js";

//item custom components
function onUse(eventData) {
    const player = eventData.source;
    const itemStack = eventData.itemStack;

    //if(itemStack.hasTag("yes:automatic_gun")) {
    //    
    //}
}
//block custom components
/* unused until they add a beforeEvent
function onPlayerDestroy(eventData) {
    const player = eventData.player;
    const block = eventData.block;
    const blockPremutation = eventData.destroyedBlockPermutation;
    blockLoot(player, block, blockPremutation);
}
    */
//will add more functions as more custom components are used

export const functions = {
    onUse: onUse
    //onPlayerDestroy: onPlayerDestroy
};