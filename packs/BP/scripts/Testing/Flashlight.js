import { Player, ItemStack, MolangVariableMap } from '@minecraft/server';
import { Vector3 } from '../Math/Vector3.js';
import { Mat3 } from '../Math/MADLAD/index.js';

const angle = 1;

/**
 * 
 * @param {Player} player 
 * @param {ItemStack} itemStack 
 */
function flashlightTest(player, itemStack) {
    const blockRayCast = player.getBlockFromViewDirection({maxDistance: 50, includePassableBlocks: false});
    if(blockRayCast === undefined) { return; }
    
    // /const basis = Mat3.buildTNB(player.getViewDirection());

    const startPosition = new Vector3(player.getHeadLocation().x, player.getHeadLocation().y+0.1, player.getHeadLocation().z);
    const hitPosition = new Vector3(blockRayCast.block.location.x, blockRayCast.block.location.y, blockRayCast.block.location.z).add(blockRayCast.faceLocation);
    const distanceVector = new Vector3(hitPosition.x-startPosition.x, hitPosition.y-startPosition.y, hitPosition.z-startPosition.z);

    const width  = distanceVector.length()*Math.tan(angle/180*Math.PI);
    const length = distanceVector.length()/Math.cos(angle/180*Math.PI);

    //const lengthVector1 = distanceVector.add(new Vector3());

    const direction = distanceVector.normalize().cross(new Vector3(0, 1, 0));
    const vars = new MolangVariableMap();
    vars.setVector3("view_direction", player.getViewDirection());
    vars.setVector3("direction", direction);
    vars.setFloat("width", width*2);
    vars.setFloat("length", length/2);
    vars.setFloat("rotation", -player.getRotation().x+90);
    player.dimension.spawnParticle("yes:flashlight", startPosition, vars);
    console.log(`${direction.x}, ${direction.y}, ${direction.z}`);
    console.log(`width: ${width}`);
    console.log(`length: ${length}`);
    console.log(-player.getRotation().x+90);
}

export { flashlightTest };


