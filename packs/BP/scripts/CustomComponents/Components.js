import { functions } from "./Functions.js";
//if(names.length !== functions.length) {
//    console.warn(`Custom Components error: names[] length is ${names.length} while functions[] length is ${functions.length}.`);
//}
export const customComponents = [
    {
        type: "item",
        name: "yes:on_use",
        itemCustomComponent: { onUse: e => { functions.onUse(e); } }
    }
    //{
    //    type: "block",
    //    name: "yes:drop_loot",
    //    blockCustomComponent: { onPlayerDestroy: e => { functions.onPlayerDestroy(e); } }
    //}
]; 