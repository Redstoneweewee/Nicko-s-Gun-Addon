import { Global } from "../Global";
import * as Enums from "../1Enums/AnimationEnums";


class Animation {

    /**
     * @param {Number} durationInTicks 
     * @param {keyof typeof Enums.AnimationTypes} type
     * @param {AnimationSoundAttribute[]} animationSoundAttributes - An array of sounds to be played during the animation at certain times
     * @param {string} animationDefiniton - Not used in ReloadAnimationAttributes because the animations are played in animation controllers
     */
    constructor(durationInTicks, type, animationSoundAttributes, animationDefiniton = "") {
        this.timeInTicks              = durationInTicks;
        this.type                     = type;
        this.animationSoundAttributes = animationSoundAttributes;
        this.animationDefiniton       = animationDefiniton;
    }
}


class AnimationAttribute {
    /**
     * 
     * @param {Animation} animation 
     */
    constructor(animation) {
        this.animation  = animation;
    }   
}

class ReloadAnimationAttribute extends AnimationAttribute {

    /**
     * 
     * @param {Animation} reloadAnimation 
     * @param {Number} scaleDurationToValue - The number of ticks this animation should scale to (the animation will now take this many ticks to finish)
     */
    constructor(reloadAnimation, scaleDurationToValue) {
        super(reloadAnimation);
        this.scaleDurationToValue = scaleDurationToValue;
    }   
}

class AnimationSoundAttribute {

    /**
     * @param {string} soundDefinition - The string name of the sound, such as "firearm.rifle_reload_magazine_out_light"
     * @param {Number} timeToPlayInTicks - The time in the animation to play the sound
     * @param {Number} soundRange
     */
    constructor(soundDefinition, timeToPlayInTicks, soundRange) {
        this.soundDefinition   = soundDefinition;
        this.timeToPlayInTicks = timeToPlayInTicks;
        this.soundRange        = soundRange;
    }
}


class RestrictedAnimationSoundAttribute extends AnimationSoundAttribute {

    /**
     * @param {string} soundDefinition - The string name of the sound, such as "firearm.rifle_reload_magazine_out_light"
     * @param {Number} timeToPlayInTicks - The time in the animation to play the sound
     * @param {Number} restrictedForTicks - The time in ticks that must pass before this animation can be played again
     * @param {Number} soundRange
     */
    constructor(soundDefinition, timeToPlayInTicks, restrictedForTicks, soundRange) {
        super(soundDefinition, timeToPlayInTicks, soundRange);
        this.restrictedForTicks   = restrictedForTicks;
    }
}


class SoundTimeoutIdObject {
    /**
     * 
     * @param {Number} timeoutId 
     * @param {string} animationType - An AnimationEnums enum
     */
    constructor(timeoutId, animationType) {
        this.timeoutId = timeoutId;
        this.animationType = animationType;
    }
}


export { Animation, AnimationSoundAttribute, AnimationAttribute, ReloadAnimationAttribute, RestrictedAnimationSoundAttribute, SoundTimeoutIdObject};