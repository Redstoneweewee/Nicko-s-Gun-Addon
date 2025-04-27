import { system, world } from "@minecraft/server";
import { FirearmIdUtil } from "../Utilities";
import { Global } from "../Global";

const listOfEvents = {
    "yes:resetWorldDynamicProperties": "resets all world dynamic properties. Usage: '/scriptevent yes:resetWorldDynamicProperties'",
    "yes:printFirearmIds": "prints all world firearm ids. Usage: '/scriptevent yes:printFirearmIds'",
    "yes:changeName": "changes all player names to {message} afterward. Usage: '/scriptevent yes:changeName {new_player_name}'",
    "yes:transform_offset": "appends an animation offset to all players (only for testing animations). Usage: '/scriptevent yes:transfrm_offset {type1: t, r}{direction: x, y, z}{type2: +, -, s}{amount: -1, 1, 5, etc.} OR {'read'} to read all offsets.'",


    [Symbol.iterator]() {
        const entries = Object.entries(this); // Convert object properties to an array of [key, value]
        let index = 0;

        return {
            next() {
                if (index < entries.length) {
                    const [key, value] = entries[index++];
                    return { value: { key, value }, done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }
}

system.afterEvents.scriptEventReceive.subscribe(eventData => {
    const id = eventData.id;
    const message = eventData.message;
    if(id === "yes:?") {
        for(const event of listOfEvents) {
            console.log(event?.key+":\n"+event?.value);
        }
    }
    else if(id === "yes:resetWorldDynamicProperties") {
        world.clearDynamicProperties();
        //Global.worldFirearmIds = [];
        FirearmIdUtil.printFirearmIds();
    }
    else if(id === "yes:printFirearmIds") {
        FirearmIdUtil.printFirearmIds();
    }
    else if(id === "yes:changeName") {
        world.getAllPlayers().forEach(player => {
            const oldName = player.nameTag;
            player.nameTag = message;
            console.log(`Changed ${oldName}'s name to ${player.nameTag}`);
        });
    }
    else if(id === "yes:transform_offset") {
        const lowerCase = message.toLowerCase();
        const type1 = lowerCase[0];
        const direction = lowerCase[1];
        const type2 = lowerCase[2];
        let amount = Number(lowerCase.match(/\d+/)??[][0]);
        if(type2 === "-") {
            amount = -1*amount;
        }
        
        world.getAllPlayers().forEach(player => {
            if(lowerCase === "read") {
                const offsets = {
                    rx: 0,
                    ry: 0,
                    rz: 0,
                    tx: 0,
                    ty: 0,
                    tz: 0
                }
                offsets.rx = Number(player.getProperty("yes:rotation_offset_x"));
                offsets.ry = Number(player.getProperty("yes:rotation_offset_y"));
                offsets.rz = Number(player.getProperty("yes:rotation_offset_z"));
                offsets.tx = Number(player.getProperty("yes:transform_offset_x"));
                offsets.ty = Number(player.getProperty("yes:transform_offset_y"));
                offsets.tz = Number(player.getProperty("yes:transform_offset_z"));
                const message = `rotation offset x:  ${offsets.rx}\n`+
                                `rotation offset y:  ${offsets.ry}\n`+
                                `rotation offset z:  ${offsets.rz}\n`+
                                `transform offset x: ${offsets.tx}\n`+
                                `transform offset y: ${offsets.ty}\n`+
                                `transform offset z: ${offsets.tz}`;
                world.sendMessage(message);
            }
            if(type2 !== "s") {
                if(type1 === "r" && direction === "x") {
                    const oldAmount = Number(player.getProperty("yes:rotation_offset_x"));
                    if(Number.isNaN(oldAmount)) { return; }
                    player.setProperty("yes:rotation_offset_x", oldAmount+amount);
                    world.sendMessage(`oldAmount: ${oldAmount}, newAmount: ${oldAmount+amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "r" && direction === "y") {
                    const oldAmount = Number(player.getProperty("yes:rotation_offset_y"));
                    if(Number.isNaN(oldAmount)) { return; }
                    player.setProperty("yes:rotation_offset_y", oldAmount+amount);
                    world.sendMessage(`oldAmount: ${oldAmount}, newAmount: ${oldAmount+amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "r" && direction === "z") {
                    const oldAmount = Number(player.getProperty("yes:rotation_offset_z"));
                    if(Number.isNaN(oldAmount)) { return; }
                    player.setProperty("yes:rotation_offset_z", oldAmount+amount);
                    world.sendMessage(`oldAmount: ${oldAmount}, newAmount: ${oldAmount+amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }

                else if(type1 === "t" && direction === "x") {
                    const oldAmount = Number(player.getProperty("yes:transform_offset_x"));
                    if(Number.isNaN(oldAmount)) { return; }
                    player.setProperty("yes:transform_offset_x", oldAmount+amount);
                    world.sendMessage(`oldAmount: ${oldAmount}, newAmount: ${oldAmount+amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "t" && direction === "y") {
                    const oldAmount = Number(player.getProperty("yes:transform_offset_y"));
                    if(Number.isNaN(oldAmount)) { return; }
                    player.setProperty("yes:transform_offset_y", oldAmount+amount);
                    world.sendMessage(`oldAmount: ${oldAmount}, newAmount: ${oldAmount+amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "t" && direction === "z") {
                    const oldAmount = Number(player.getProperty("yes:transform_offset_z"));
                    if(Number.isNaN(oldAmount)) { return; }
                    player.setProperty("yes:transform_offset_z", oldAmount+amount);
                    world.sendMessage(`oldAmount: ${oldAmount}, newAmount: ${oldAmount+amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
            }
            else {
                if(type1 === "r" && direction === "x") {
                    player.setProperty("yes:rotation_offset_x", amount);
                    world.sendMessage(`set to newAmount: ${amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "r" && direction === "y") {
                    player.setProperty("yes:rotation_offset_y", amount);
                    world.sendMessage(`set to newAmount: ${amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "r" && direction === "z") {
                    player.setProperty("yes:rotation_offset_z", amount);
                    world.sendMessage(`set to newAmount: ${amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }

                else if(type1 === "t" && direction === "x") {
                    player.setProperty("yes:transform_offset_x", amount);
                    world.sendMessage(`set to newAmount: ${amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "t" && direction === "y") {
                    player.setProperty("yes:transform_offset_y", amount);
                    world.sendMessage(`set to newAmount: ${amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
                else if(type1 === "t" && direction === "z") {
                    player.setProperty("yes:transform_offset_z", amount);
                    world.sendMessage(`set to newAmount: ${amount}, direction: ${direction}, type: ${type2}, amount: ${amount}`);
                }
            }
        });
    }
});