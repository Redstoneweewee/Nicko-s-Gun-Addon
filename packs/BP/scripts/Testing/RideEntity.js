import { system, world, Player, EntityRideableComponent, InputPermissionCategory, Entity, EntityComponentTypes } from "@minecraft/server";


world.getAllPlayers().forEach(player => {
    const vehicles = player.dimension.getEntities({type: "minecraft:horse"});
    vehicles.forEach(vehicle => {
        const loopId = testForRiders(vehicle);
        vehicle.setDynamicProperty("testForRidersLoopId", loopId);
    });
});

world.afterEvents.entitySpawn.subscribe(eventData => {
    const entity = eventData.entity;
    if(entity.typeId !== "minecraft:horse") { return; }

        const loopId = testForRiders(entity);
        entity.setDynamicProperty("testForRidersLoopId", loopId);
});

world.afterEvents.entityDie.subscribe(eventData => {
    const entity = eventData.deadEntity;
    if(entity.typeId !== "minecraft:horse") { return; }

    const loopId = Number(entity.getDynamicProperty("testForRidersLoopId"));
    if(loopId === undefined || Number.isNaN(loopId)) { return; }
    system.clearRun(loopId);

})

/**
 * 
 * @param {Entity} entity 
 * @returns {Number}
 */
function testForRiders(entity) {
    const loopId = system.runInterval(() => {
        const rideableComponent = entity.getComponent(EntityComponentTypes.Rideable);
        if(!(rideableComponent instanceof EntityRideableComponent)) { return; }

        const riders = rideableComponent.getRiders();
        riders.forEach((rider) => {
            if(rider instanceof Player) {
                rider.setDynamicProperty("isRidingVehicle", true);
            }
        });
    });
    return loopId;
}


function clearMovementRestriction(player) {
        player.inputPermissions.setPermissionCategory(InputPermissionCategory.MoveLeft, true);
        player.inputPermissions.setPermissionCategory(InputPermissionCategory.MoveRight, true);
        player.setDynamicProperty("movementRestrictionCleared", false);
        console.log("cleared");
}
function setMovementRestriction(player) {
    player.inputPermissions.setPermissionCategory(InputPermissionCategory.MoveLeft, false);
    player.inputPermissions.setPermissionCategory(InputPermissionCategory.MoveRight, false);
    player.setDynamicProperty("movementRestrictionCleared", true);
    console.log("restricted");
}


system.runInterval(() => {
    
    world.getAllPlayers().forEach(player => {
        if(player.getDynamicProperty("isRidingVehicle") === true) {
            setMovementRestriction(player);
        }
        else if(player.getDynamicProperty("isRidingVehicle") === false && player.getDynamicProperty("movementRestrictionCleared") === true) {
            clearMovementRestriction(player);
        }

        /**
         * Always sets it back to false after every 2 ticks, which is fine because if the player was riding
         * a vehicle the vehicle's loop will always set it back to true first before this runs.
         */
        player.setDynamicProperty("isRidingVehicle", false);
    });
}, 2) 