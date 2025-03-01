import { Player, system } from '@minecraft/server';
import { Vector3 } from '../Math/Vector3.js';
import { Global } from '../Global.js';
import { AnimationLink } from "../AnimationLink.js";
const Vector = new Vector3();

const hipfireStayTime = 50;

const threshold = 0.1; //A higher threshold = more of it will be center
const maxSpeed = 0.3;

const Directions = {
    left: "left",
    center: "center",
    right: "right"
}

/**
 * 
 * @param {Player} player 
 */
function directionDetection(player) {
    if(!player.getDynamicProperty(Global.PlayerDynamicProperties.script.isAiming) && 
       system.currentTick - Number(player.getDynamicProperty(Global.PlayerDynamicProperties.script.lastShootTick)) > hipfireStayTime) { return; }
    let viewDirection = new Vector3(player.getViewDirection().x, 0, player.getViewDirection().z).normalize();
    const speed = new Vector3(player.getVelocity().x, 0, player.getVelocity().z).length();
    let velocity = new Vector3(player.getVelocity().x, 0, player.getVelocity().z).normalize(); 
    //velocity.multiplyScalar(speed);
    //let dotLength = Math.round(velocity.dot(viewDirection) * speed * 100)/100;
    let crossLength = Math.round(velocity.cross(viewDirection).y * speed * 100)/100;
    //console.log(`view:[${viewDirection.x}, ${viewDirection.y}, ${viewDirection.z}], velo:[${velocity.x}, ${velocity.y}, ${velocity.z}], speed:${speed}, cross:${crossLength}`);
    if(crossLength > 1)  { crossLength = 1;  }
    else if(crossLength < -1) { crossLength = -1; }
    
    let direction;
    if(crossLength < -threshold*maxSpeed) { 
        direction = Directions.left;
    }
    else if(crossLength > threshold*maxSpeed) {
        direction = Directions.right;
    }
    else {
        direction = Directions.center;
    }
    const oldDirection = player.getDynamicProperty(Global.PlayerDynamicProperties.animation.movement_direction);
    if(oldDirection !== direction) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.movement_direction, direction);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.movement_direction);
    }
    const oldLength = Number(player.getDynamicProperty(Global.PlayerDynamicProperties.animation.movement_direction_value));
    if(oldLength !== crossLength) {
        player.setDynamicProperty(Global.PlayerDynamicProperties.animation.movement_direction_value, crossLength);
        AnimationLink.renewClientAnimationVariable(player, Global.PlayerDynamicProperties.animation.movement_direction_value);
    }
}

export { Directions, directionDetection };