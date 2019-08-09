export enum SlotType {
    MAIN_HAND = 'MAIN_HAND',
    OFF_HAND = 'OFF_HAND',
    HEAD = 'HEAD',
    BODY = 'BODY',
    HANDS = 'HANDS',
    WAIST = 'WAIST',
    LEGS = 'LEGS',
    FEET = 'FEET',
    EARS = 'EARS',
    NECK = 'NECK',
    WRISTS = 'WRISTS',
    LEFT_RING = 'LEFT_RING',
    RIGHT_RING = 'RIGHT_RING'
}

export interface IStats {
    directHit?: number;
    criticalHit?: number;
    determination?: number;
    speed?: number;
}

export interface IGear {
    slot?: SlotType;
    name?: string;
    materiaSet?: number;
    baseStats?: IStats;
    materiaStats?: IStats;
}

export class Gear {
    public slot = null;
    public name = null;
    public materiaSet = null;
    public baseStats = null;
    public materiaStats = null;

    constructor(gear: Partial<IGear>) {
        this.slot = gear.slot ? gear.slot : this.slot;
        this.name = gear.name ? gear.name : this.name;
        this.materiaSet = gear.materiaSet ? gear.materiaSet : this.materiaSet;
        this.baseStats = gear.baseStats ? gear.baseStats : this.baseStats;
        this.materiaStats = gear.materiaStats ? gear.materiaStats : this.materiaStats;
    }
}
