import { GameRule, world } from '@minecraft/server';
import { Global } from './Global';
import { AnimationLink } from './AnimationLink';

const Teams = {
    gold: "gold",
    blue: "blue"
}


world.afterEvents.playerSpawn.subscribe((eventData) => {
    const player = eventData.player;
    if(eventData.initialSpawn) {
        const pvp = world.gameRules.pvp;
        let team = Teams.gold;
        if(!pvp) {
            team = Teams.blue
        }
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.team, team);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.team);
    }
});

/**
 * currently, teams are determined by the pvp gamerule
 * If pvp is on, everyone is on gold team (all are enemies of each other)
 * If pvp is off, everyone is on blue team (all are allies of each other)
 */
world.afterEvents.gameRuleChange.subscribe(eventData => {
    const rule = eventData.rule;
    if(rule !== GameRule.Pvp) { return; }
    const value = Boolean(eventData.value);

    let team = Teams.gold;
    if(!value) {
        team = Teams.blue
    }
    world.getAllPlayers().forEach(player => {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.team, team);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.team);
    });
})

export { Teams };