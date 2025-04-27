
/**
 * @enum {string}
 * @type {{
 * Selector:   "Selector",
 * Firearm:    "Firearm",
 * Magazine:   "Magazine",
 * Ammunition: "Ammunition",
 * Confirm:    "Confirm"
 * }}
 */
const CraftingMessageTypes = {
    Selector:   "Selector",
    Firearm:    "Firearm",
    Magazine:   "Magazine",
    Ammunition: "Ammunition",
    Confirm:    "Confirm"
}


/**
 * @enum {string}
 * @type {{
* SelectorCraftingState:   "selectorCraftingState",
* FirearmCraftingState:    "firearmCraftingState",
* MagazineCraftingState:   "magazineCraftingState",
* AmmunitionCraftingState: "ammunitionCraftingState",
* ConfirmCraftingState:    "confirmCraftingState"
* }}
*/
const CraftingStateTypes = {
    SelectorCraftingState:   "selectorCraftingState",
    FirearmCraftingState:    "firearmCraftingState",
    MagazineCraftingState:   "magazineCraftingState",
    AmmunitionCraftingState: "ammunitionCraftingState",
    ConfirmCraftingState:    "confirmCraftingState"
}

export { CraftingMessageTypes, CraftingStateTypes };