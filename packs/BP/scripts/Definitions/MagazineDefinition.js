import { ItemStack } from "@minecraft/server"
import { AmmoTypes } from "./FirearmDefinition";

const BulletTypes = {
    any: "yes:is_bullet_type",
    bullet: "yes:bullet",
    shotgunShell: "yes:shotgun_shell",

}
class Magazine {
    /**
     * 
     * @param {string} tag 
     * @param {string} name 
     * @param {string} ammoType 
     * @param {number} maxAmmo 
     * @param {ItemStack} itemStack 
     * @param {string} bulletType
     * @param {Boolean} scaleReloadTimeWithAmmo
     */
    constructor(tag, name, ammoType, maxAmmo, itemStack, bulletType, scaleReloadTimeWithAmmo) {
        this.tag        = tag;
        this.name       = name;
        this.ammoType   = ammoType;
        this.maxAmmo    = maxAmmo;
        this.itemStack  = itemStack;
        this.bulletType = bulletType;
        this.scaleReloadTimeWithAmmo = scaleReloadTimeWithAmmo;
    }
}


export { Magazine, BulletTypes };