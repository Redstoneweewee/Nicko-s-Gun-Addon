import { world } from '@minecraft/server';
import { customComponents } from "./Components.js";

world.beforeEvents.worldInitialize.subscribe(eventData => {
    customComponents.forEach(component => {
        if(component.type === "item")       { eventData.itemComponentRegistry.registerCustomComponent(component.name, component.itemCustomComponent); }
        else if(component.type === "block") { eventData.blockComponentRegistry.registerCustomComponent(component.name, component.blockCustomComponent); }
        
    })
});

console.warn("custom_components/initialization.js ran with no errors");