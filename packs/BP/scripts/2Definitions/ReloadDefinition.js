
/**
 * @typedef {object} ReloadTypesDef
 * @property {"normal"} normal
 * @property {"tactical"} tactical
 * @property {"manualSwap"} manualSwap
 */


class ReloadType {
    /**
     * 
     * @param {keyof import("./MagazineDefinition").MagazineTypesDef} magazineType 
     * @param {keyof ReloadTypesDef} reloadType 
     */
    constructor(magazineType, reloadType) {
        this.magazineType = magazineType;
        this.reloadType = reloadType;
    }
}

/** @type {ReloadTypesDef} */
const ReloadTypes = {
    normal: "normal",
    tactical: "tactical",
    manualSwap: "manualSwap"
}

export {ReloadType, ReloadTypes};