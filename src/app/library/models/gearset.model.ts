import { IGear } from './gear.model';
import { IFoodInfo } from './food.model';

export interface IGearSet {
    mainHand?: IGear;
    offHand?: IGear;
    head?: IGear;
    body?: IGear;
    hands?: IGear;
    waist?: IGear;
    legs?: IGear;
    feet?: IGear;
    ears?: IGear;
    neck?: IGear;
    wrists?: IGear;
    leftRing?: IGear;
    rightRing?: IGear;
}

export class GearSet {
    public mainHand = null;
    public offHand = null;
    public head = null;
    public body = null;
    public hands = null;
    public waist = null;
    public legs = null;
    public feet = null;
    public ears = null;
    public neck = null;
    public wrists = null;
    public leftRing = null;
    public rightRing = null;

    constructor(gearSet: Partial<IGearSet>) {
        this.mainHand = gearSet.mainHand ? gearSet.mainHand : this.mainHand;
        this.offHand = gearSet.offHand ? gearSet.offHand : this.offHand;
        this.head = gearSet.head ? gearSet.head : this.head;
        this.body = gearSet.body ? gearSet.body : this.body;
        this.hands = gearSet.hands ? gearSet.hands : this.hands;
        this.waist = gearSet.waist ? gearSet.waist : this.waist;
        this.legs = gearSet.legs ? gearSet.legs : this.legs;
        this.feet = gearSet.feet ? gearSet.feet : this.feet;
        this.ears = gearSet.ears ? gearSet.ears : this.ears;
        this.neck = gearSet.neck ? gearSet.neck : this.neck;
        this.wrists = gearSet.wrists ? gearSet.wrists : this.wrists;
        this.leftRing = gearSet.leftRing ? gearSet.leftRing : this.leftRing;
        this.rightRing = gearSet.rightRing ? gearSet.rightRing : this.rightRing;
    }
}

export interface IGearSetInfo {
    setNumber?: number;
    dmgIndex?: number;
    gcdTime?: number;
    gearSet?: IGearSet;
    bestFoods?: IFoodInfo[];
}

export class GearSetInfo {
    public setNumber = null;
    public dmgIndex = null;
    public gcdTime = null;
    public gearSet = null;
    public bestFoods = null;

    constructor(gearSetInfo: Partial<IGearSetInfo>) {
        this.setNumber = gearSetInfo.setNumber ? gearSetInfo.setNumber : this.setNumber;
        this.dmgIndex = gearSetInfo.dmgIndex ? gearSetInfo.dmgIndex : this.dmgIndex;
        this.gcdTime = gearSetInfo.gcdTime ? gearSetInfo.gcdTime : this.gcdTime;
        this.gearSet = gearSetInfo.gearSet ? gearSetInfo.gearSet : this.gearSet;
        this.bestFoods = gearSetInfo.bestFoods ? gearSetInfo.bestFoods : this.bestFoods;
    }
}
