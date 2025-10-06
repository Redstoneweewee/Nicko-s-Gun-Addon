import { Player, system } from "@minecraft/server";
import { Global } from "./Global";
import { TypeUtil } from "./UtilitiesInit";



class AnimationLink {
    /**
     * @param {Player} player
     */
    static renewAllPlayerClientAnimationVariables(player) {
        for(const property in Global.PlayerDynamicProperties.animation) {
            const dynamicValue = player.getDynamicProperty(property);
            if(dynamicValue === undefined) { continue; }
            const clientProperty = "yes:"+property;
            // @ts-ignore
            player.setProperty(clientProperty, dynamicValue);
            console.log(`player ${player.name}'s property ${property} has been set to ${dynamicValue}`);
        }
    }

    /**
     * 
     * @param {Player} player 
     * @param {string} propertyEnum 
     */
    static renewClientAnimationVariable(player, propertyEnum) {
        const dynamicValue = player.getDynamicProperty(propertyEnum);
        const clientProperty = "yes:"+propertyEnum;
        if(dynamicValue === undefined) { return; }
        // @ts-ignore
        player.setProperty(clientProperty, dynamicValue);
        //if(propertyEnum == Global.PlayerDynamicProperties.animation.has_last_casing_in_chamber) {
        //    console.log(`player ${player.name}'s property ${propertyEnum} has been set to ${dynamicValue}`);
        //    TypeUtil.logStack();
        //}
    }
}

export { AnimationLink };