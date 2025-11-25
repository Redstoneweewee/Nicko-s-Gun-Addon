import { MathUtils } from "../Math/MathUtils";

class NumRange {
    /**
     * @param {number} min
     * @param {number} max
     */
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    /**
     * 
     * @param {number} inputValue 
     * @param {number} inputMin 
     * @param {number} inputMax 
     * @returns { number }
     */
    mapLinear(inputValue, inputMin, inputMax) {
        return MathUtils.mapLinear(inputValue, inputMin, inputMax, this.min, this.max);
    }
}

class Vec2Range {
    /**
     * @param {import('@minecraft/server').Vector2} min
     * @param {import('@minecraft/server').Vector2} max
     */
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

export { NumRange, Vec2Range };