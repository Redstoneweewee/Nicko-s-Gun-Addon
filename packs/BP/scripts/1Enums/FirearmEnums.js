
/** 
 * @enum {string}
 * @type {{
 * ak47:         "yes:ak47",
 * akm:          "yes:akm",
 * m4a1:         "yes:m4a1",
 * ar15:         "yes:ar15",
 * hk417:        "yes:hk417",
 * mk13:         "yes:mk13",
 * p90:          "yes:p90",
 * ump45:        "yes:ump45",
 * desertEagle:  "yes:desert_eagle",
 * remington870: "yes:remington870"
 * }} 
 * */
const FirearmTypeIds = {
   ak47:         "yes:ak47",
   akm:          "yes:akm",
   m4a1:         "yes:m4a1",
   ar15:         "yes:ar15",
   hk417:        "yes:hk417",
   mk13:         "yes:mk13",
   p90:          "yes:p90",
   ump45:        "yes:ump45",
   desertEagle:  "yes:desert_eagle",
   remington870: "yes:remington870"
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