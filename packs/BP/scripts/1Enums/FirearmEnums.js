
/** 
 * @enum {string}
 * @type {{
 * USP:          "yes:usp",
 * Luger:        "yes:luger",
 * Makarov:      "yes:makarov",
 * Magnum:       "yes:magnum",
 * M92F:         "yes:m92f",
 * Kar98:        "yes:kar98",
 * MP5:          "yes:mp5",
 * M4:           "yes:m4",
 * Benelli:      "yes:benelli",
 * AGM:          "yes:agm",
 * Striker:      "yes:striker"
 * }} 
 * */
const FirearmTypeIds = {
    USP:          "yes:usp",
    Luger:        "yes:luger",
    Makarov:      "yes:makarov",
    Magnum:       "yes:magnum",
    M92F:         "yes:m92f",
    Kar98:        "yes:kar98",
    MP5:          "yes:mp5",
    M4:           "yes:m4",
    Benelli:     "yes:benelli",
    AGM:          "yes:agm",
    Striker:      "yes:striker"
}


/**
 * @enum {import("@minecraft/server").Vector2}
 * @type {{
 * VeryLow:  { x: 0.1, y: 0.1 },
 * Low:      { x: 0.25, y: 0.13 },
 * Medium:   { x: 0.4, y: 0.2 },
 * High:     { x: 0.5, y: 0.25 },
 * VeryHigh: { x: 0.7, y: 0.3 }
 * }}
 */
const KnockbackAmounts = {
    VeryLow:  { x: 0.1, y: 0.1 },
    Low:      { x: 0.25, y: 0.13 },
    Medium:   { x: 0.4, y: 0.2 },
    High:     { x: 0.5, y: 0.25 },
    VeryHigh: { x: 0.7, y: 0.3 }
}

/** 
 * @enum {string}
 * @type {{
 * Semi:  "semi",
 * Auto:  "auto",
 * Burst: "burst"
 * }} 
 */
const FiringModes = {
    Semi: "semi",
    Auto: "auto",
    Burst: "burst"
}


export { FirearmTypeIds, KnockbackAmounts, FiringModes }