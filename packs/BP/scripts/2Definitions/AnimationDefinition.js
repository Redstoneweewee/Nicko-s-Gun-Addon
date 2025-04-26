import * as Enums from "../1Enums/AnimationEnums";

class StaticAnimation {
    /**
     * @param {{
    * type:            typeof Enums.AnimationTypes[keyof typeof Enums.AnimationTypes]
    * duration:     number,
    * animationSounds: AnimationSound[]
    * animationId?:    string
    * }} def
    */
    constructor(def) {
        this.type            = def.type;
        this.duration        = def.duration;
        this.animationSounds = def.animationSounds;
        this.animationId     = def.animationId;
    }   
}

class NormalAnimation {

    /**
     * @param {{
     * staticAnimation: StaticAnimation
     * }} def
     */
    constructor(def) {
        this.staticAnimation      = def.staticAnimation;
    }
}
class ScaledAnimation extends NormalAnimation{

    /**
     * @param {{
     * staticAnimation: StaticAnimation
     * scaleDurationToValue: number
     * }} def
     */
    constructor(def) {
        super(def);
        this.scaleDurationToValue = def.scaleDurationToValue;
    }
}


class AnimationSound {

    /**
     * @param {{
     * soundId:    string,
     * timeout:    number,
     * soundRange: number
     * }} def
     */
    constructor(def) {
        this.soundId    = def.soundId;
        this.timeout    = def.timeout;
        this.soundRange = def.soundRange;
    }
}



class SoundTimeoutIdObject {
    /**
     * @param {{
     * timeoutId: number,
     * animationType: typeof Enums.AnimationTypes[keyof typeof Enums.AnimationTypes]
     * }} def
     */
    constructor(def) {
        this.timeoutId     = def.timeoutId;
        this.animationType = def.animationType;
    }
}


export { StaticAnimation, NormalAnimation, ScaledAnimation, AnimationSound, SoundTimeoutIdObject };