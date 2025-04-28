
/** 
 * @enum {string}
 * @type {{
 * usp:          "yes:usp",
 * makarov:      "yes:makarov",
 * magnum:       "yes:magnum",
 * m92f:         "yes:m92f",
 * mp5:          "yes:mp5",
 * m4:           "yes:m4",
 * benelli:      "yes:benelli",
 * agm:          "yes:agm",
 * striker:      "yes:striker"
 * }} 
 * */
const FirearmTypeIds = {
    usp:          "yes:usp",
    makarov:      "yes:makarov",
    magnum:       "yes:magnum",
    m92f:         "yes:m92f",
    mp5:          "yes:mp5",
    m4:           "yes:m4",
    benelli:      "yes:benelli",
    agm:          "yes:agm",
    striker:      "yes:striker"
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