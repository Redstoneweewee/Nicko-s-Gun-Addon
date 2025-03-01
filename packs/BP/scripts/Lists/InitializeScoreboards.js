import { world } from '@minecraft/server';

const scoreboardList = [
]

//initializes all scoreboards 
scoreboardList.forEach(e => {
    if(!world.scoreboard.getObjective(e)?.isValid()) {
        world.scoreboard.addObjective(e, e); 
        console.warn(`scoreboard: [${e}] added`);
    }
});