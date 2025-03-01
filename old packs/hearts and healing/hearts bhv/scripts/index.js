import { world, system } from '@minecraft/server';

const lastJumped = new Map()

system.runInterval(() => {

    world.getAllPlayers().forEach(player => {

        if (lastJumped.has(player.id) && lastJumped.get(player.id) && (system.currentTick - lastJumped.get(player.id)) > 60) {
            lastJumped.set(player.id, false);
        }

        if (player.isJumping && !lastJumped.get(player.id)) {
            player.addEffect('resistance', 10, { amplifier: 255, showParticles: false });
            lastJumped.set(player.id, system.currentTick);
        }

    })

})

world.beforeEvents.itemUse.subscribe(({ itemStack, source }) => {
    if (!itemStack.typeId.includes('heart')) return;
    system.run(() => {
        source.triggerEvent('health_increase')
        if (source.getGameMode() == 'creative') return;
        try {
            itemStack.amount -= 1
            source.getComponent('equippable').setEquipment('Mainhand', itemStack)
        } catch (error) {
            source.getComponent('equippable').setEquipment('Mainhand')
        }
    })
})

world.afterEvents.playerJoin.subscribe(event => {

    const { playerId } = event;

    const run = system.runInterval(() => {

        const player = world.getEntity(playerId)

        if (!player) return;

        if (!player.getComponent('variant')) player.triggerEvent('start')
        system.clearRun(run)

    })

})

world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
    deadEntity.triggerEvent('health_decrease')
}, { entityTypes: ['minecraft:player'] })