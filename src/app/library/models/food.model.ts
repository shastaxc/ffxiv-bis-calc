export interface IFoodStats {
    vitPerc?: number;
    vitMax?: number;
    dhPerc?: number;
    dhMax?: number;
    critPerc?: number;
    critMax?: number;
    detPerc?: number;
    detMax?: number;
    spellSpeedPerc?: number;
    spellSpeedMax?: number;
    skillSpeedPerc?: number;
    skillSpeedMax?: number;
    tenacityPerc?: number;
    tenacityMax?: number;
    pietyPerc?: number;
    pietyMax?: number;
}

export interface IFood {
    name?: string;
    stats?: IFoodStats;
}

export interface IFoodInfo {
    food?: IFood;
    dmgIndex?: number;
    gcdTime?: number;
    vitAdded?: number;
    dhAdded?: number;
    critAdded?: number;
    detAdded?: number;
    spellSpeedAdded?: number;
    skillSpeedAdded?: number;
    tenacityAdded?: number;
    pietyAdded?: number;
}

export class FoodInfo {
    public food = null;
    public dmgIndex = null;
    public gcdTime = null;
    public vitAdded = null;
    public dhAdded = null;
    public critAdded = null;
    public detAdded = null;
    public spellSpeedAdded = null;
    public skillSpeedAdded = null;
    public tenacityAdded = null;
    public pietyAdded = null;

    constructor(foodInfo: Partial<IFoodInfo>) {
        this.food = foodInfo.food ? foodInfo.food : this.food;
        this.dmgIndex = foodInfo.dmgIndex ? foodInfo.dmgIndex : this.dmgIndex;
        this.gcdTime = foodInfo.gcdTime ? foodInfo.gcdTime : this.gcdTime;
        this.vitAdded = foodInfo.vitAdded ? foodInfo.vitAdded : this.vitAdded;
        this.dhAdded = foodInfo.dhAdded ? foodInfo.dhAdded : this.dhAdded;
        this.critAdded = foodInfo.critAdded ? foodInfo.critAdded : this.critAdded;
        this.detAdded = foodInfo.detAdded ? foodInfo.detAdded : this.detAdded;
        this.spellSpeedAdded = foodInfo.spellSpeedAdded ? foodInfo.spellSpeedAdded : this.spellSpeedAdded;
        this.skillSpeedAdded = foodInfo.skillSpeedAdded ? foodInfo.skillSpeedAdded : this.skillSpeedAdded;
        this.tenacityAdded = foodInfo.tenacityAdded ? foodInfo.tenacityAdded : this.tenacityAdded;
        this.pietyAdded = foodInfo.pietyAdded ? foodInfo.pietyAdded : this.pietyAdded;
    }
}
