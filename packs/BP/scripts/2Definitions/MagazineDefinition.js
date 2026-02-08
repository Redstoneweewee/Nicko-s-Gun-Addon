import { ItemStack } from "@minecraft/server"
import { FirearmAmmoClasses } from "../1Enums/AmmoEnums";
import * as Enums from "../1Enums/MagazineEnums"
import { TypeUtil } from "../UtilitiesInit";
import { NumRange, Vec2Range } from "./GlobalDefinition";
import { SmokeParticleTypes } from "../1Enums/ParticleEnums";

class Magazine {
    /**
     * @param {{
     * itemTypeId:            typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds],
     * name:                  string,
     * magazineClass:         typeof Enums.MagazineClasses[keyof typeof Enums.MagazineClasses],
     * magazineType:          typeof Enums.MagazineTypes[keyof typeof Enums.MagazineTypes],
     * maxAmmo:               number,
     * fillableByAmmoClasses: typeof FirearmAmmoClasses[keyof typeof FirearmAmmoClasses][]
     * }} def
     */
    constructor(def) {
        this.itemTypeId            = def.itemTypeId;
        this.name                  = def.name;
        this.magazineClass         = def.magazineClass;
        this.magazineType          = def.magazineType;
        this.maxAmmo               = def.maxAmmo;
        this.fillableByAmmoClasses = def.fillableByAmmoClasses;
    }
    
    /**
     * @returns {typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds]|undefined}
     */
    getMagazineTypeIdEnum() {
        for(const [, typeId] of TypeUtil.getIterable(Enums.MagazineTypeIds)) {
            if(typeId === this.itemTypeId) {
                return typeId;
            }
        }
        console.error(`getMagazineTypeIdEnum() failed: Magazine with itemTypeId ${this.itemTypeId} is not defined in MagazineTypeIds`);
        return;
    }
}

class ExplosiveMagazineAmmo extends Magazine {
    /**
     * @param {{
     * itemTypeId:            typeof Enums.MagazineTypeIds[keyof typeof Enums.MagazineTypeIds],
     * name:                  string,
     * magazineClass:         typeof Enums.MagazineClasses[keyof typeof Enums.MagazineClasses],
     * magazineType:          typeof Enums.MagazineTypes[keyof typeof Enums.MagazineTypes],
     * maxAmmo:               number,
     * fillableByAmmoClasses: typeof FirearmAmmoClasses[keyof typeof FirearmAmmoClasses][],
     * projectileAttribute:   ProjectileAttribute,
     * particleAttribute:     ParticleAttribute
     * }} def
     */
    constructor(def) {
        super(def);
        this.projectileAttribute = def.projectileAttribute;
        this.particleAttribute = def.particleAttribute;
    }
}

class ProjectileAttribute {
    /**
     * @param {{
     * explosiveCamerashakes: ExplosiveCamerashakeAttribute[],
     * explosiveDamage?: ExplosiveDamage,
     * explosiveStun?: ExplosiveStunAttribute,
     * explosiveEffect?: ExplosiveEffectAttribute,
     * typeId: string,
     * speed: number,
     * explosionPower: 0|1|1.5|2|2.5|3|3.5|4|4.5|5|6|7|8|9|10|15|20|25|30|35|40|45|50|60|70|80|90|100,
     * spawnOffset: import("@minecraft/server").Vector3,
     * shootDirectionOffset: import("@minecraft/server").Vector2
     * shooterKnockback: import("@minecraft/server").Vector2
     * }} def
     */
    constructor(def) {
        this.explosiveDamage        = def.explosiveDamage;
        this.explosiveCamerashakes  = def.explosiveCamerashakes;
        this.explosiveStun          = def.explosiveStun;
        this.explosiveEffect        = def.explosiveEffect;
        this.explosionPower         = def.explosionPower;
        this.typeId                 = def.typeId;
        this.speed                  = def.speed;
        this.spawnOffset            = def.spawnOffset;
        this.shootDirectionOffset   = def.shootDirectionOffset;
        this.shooterKnockback       = def.shooterKnockback;
    }
}


class ExplosiveDamage {
    /**
     * @param {{
     * damage: NumRange,
     * knockback: Vec2Range,
     * range: number
     * }} def 
     */
    constructor(def) {
        this.damage = def.damage;
        this.knockback = def.knockback;
        this.range     = def.range;
    }
}


class ExplosiveCamerashakeAttribute {
    /**
     * @param {{
     * intensity: number,
     * duration: number,
     * range: number
     * }} def
     */
    constructor(def) {
        this.intensity = def.intensity;
        this.duration  = def.duration;
        this.range     = def.range;
    }
}

class ExplosiveStunAttribute {
    /**
     * @param {{
     * screenDuration: NumRange,
     * aimRestrictionDuration: NumRange,
     * screenDebrisDuration: NumRange,
     * screenFlashDuration: NumRange,
     * movementRestrictionMultiplier: NumRange,
     * movementRestrictionDuration: NumRange,
     * range: number
     * }} def
     */
    constructor(def) {
        this.screenDuration                = def.screenDuration;
        this.aimRestrictionDuration        = def.aimRestrictionDuration;
        this.screenDebrisDuration          = def.screenDebrisDuration;
        this.screenFlashDuration           = def.screenFlashDuration;
        this.movementRestrictionMultiplier = def.movementRestrictionMultiplier;
        this.movementRestrictionDuration   = def.movementRestrictionDuration;
        this.range                         = def.range;
    }
}

class ExplosiveEffectAttribute {
    /**
     * @param {{
     * range: number,
     * setFire?: {height: number, chance: number},
     * applyPoison?: {damage: number, ticksPerDamage: number, duration: number},
     * }} def 
     */
    constructor(def) {
        this.range = def.range;
        this.setFire = def.setFire;
        this.applyPoison = def.applyPoison;
    }
}

class ParticleAttribute {
    /**
     * @param {{
     * explosionSize: number,
     * showExplosionFlash: boolean,
     * showExplosionSparks: boolean,
     * showExplosionMushroom: boolean,
     * explosionSmokeType: SmokeParticleTypes,
     * showExplosionSmokeFlash: boolean,
     * }} def
     */
    constructor(def) {
        this.explosionSize           = def.explosionSize;
        this.showExplosionFlash      = def.showExplosionFlash;
        this.showExplosionSparks     = def.showExplosionSparks;
        this.showExplosionMushroom   = def.showExplosionMushroom;
        this.explosionSmokeType      = def.explosionSmokeType;
        this.showExplosionSmokeFlash = def.showExplosionSmokeFlash;
    }
}

export { Magazine, ExplosiveMagazineAmmo, ProjectileAttribute, ExplosiveDamage, ExplosiveCamerashakeAttribute, ExplosiveStunAttribute, ExplosiveEffectAttribute, ParticleAttribute };