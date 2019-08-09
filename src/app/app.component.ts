import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IGearSet, GearSet, GearSetInfo, IGearSetInfo } from './library/models/gearset.model';
import { dncGear } from './library/constants/gear-options.constants';
import { IGear, SlotType } from './library/models/gear.model';
import { levelMod, baseDirectHit, baseCriticalHit, baseDetermination, baseSpeed } from './library/constants/base-stats.constants';
import { IFood, IFoodInfo, FoodInfo } from './library/models/food.model';
import { foodOptions } from './library/constants/food-options.constants';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    bisSetInfo$: BehaviorSubject<IGearSetInfo[]> = new BehaviorSubject<IGearSetInfo[]>(null);
    totalCombinations: number;
    currentCount: number;
    busy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    useFood: boolean;

    gcdLimitLower = null;
    gcdLimitUpper = null;

    // Scaling due to job mechanics which affect a stat's effectiveness
    speedScaler = 0.8166666666; // 1 = default, no scaling
    speedScalerReasoning = 'Standard Step and Technical Step are not affected by skill speed.';
    // Increase in crit/dh rate due to job mechanics
    critRateIncrease = 0.0333333333; // 0 = default, no increase/decrease
    critRateIncreaseReasoning = 'Devilment increases critical hit rate.';
    dhRateIncrease = 0.0333333333; // 0 = default, no increase/decrease
    dhRateIncreaseReasoning = 'Devilment increases critical hit rate.';

    private init() {
        this.bisSetInfo$.next(null);
        this.totalCombinations = 0;
        this.currentCount = 0;
    }

    calcBisSet() {
        this.init();
        let bis: IGearSetInfo[] = [];

        const mainHandOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.MAIN_HAND);
        if (mainHandOptions.length === 0) { mainHandOptions.push(null); }
        const offHandOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.OFF_HAND);
        if (offHandOptions.length === 0) { offHandOptions.push(null); }
        const headOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.HEAD);
        if (headOptions.length === 0) { headOptions.push(null); }
        const bodyOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.BODY);
        if (bodyOptions.length === 0) { bodyOptions.push(null); }
        const handsOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.HANDS);
        if (handsOptions.length === 0) { handsOptions.push(null); }
        const waistOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.WAIST);
        if (waistOptions.length === 0) { waistOptions.push(null); }
        const legsOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.LEGS);
        if (legsOptions.length === 0) { legsOptions.push(null); }
        const feetOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.FEET);
        if (feetOptions.length === 0) { feetOptions.push(null); }
        const earsOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.EARS);
        if (earsOptions.length === 0) { earsOptions.push(null); }
        const neckOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.NECK);
        if (neckOptions.length === 0) { neckOptions.push(null); }
        const wristsOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.WRISTS);
        if (wristsOptions.length === 0) { wristsOptions.push(null); }
        const leftRingOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.LEFT_RING);
        if (leftRingOptions.length === 0) { leftRingOptions.push(null); }
        const rightRingOptions: IGear[] = dncGear.filter(g => g.slot === SlotType.RIGHT_RING);
        if (rightRingOptions.length === 0) { rightRingOptions.push(null); }

        this.totalCombinations = mainHandOptions.length * headOptions.length * bodyOptions.length * handsOptions.length
                * waistOptions.length * legsOptions.length * feetOptions.length * earsOptions.length
                * neckOptions.length * wristsOptions.length * leftRingOptions.length * rightRingOptions.length;
        this.busy$.next(true);

        for (const mhOpt of mainHandOptions) {
            for (const ohOpt of offHandOptions) {
                for (const headOpt of headOptions) {
                    for (const bodyOpt of bodyOptions) {
                        for (const handsOpt of handsOptions) {
                            for (const waistOpt of waistOptions) {
                                for (const legsOpt of legsOptions) {
                                    for (const feetOpt of feetOptions) {
                                        for (const earsOpt of earsOptions) {
                                            for (const neckOpt of neckOptions) {
                                                for (const wristsOpt of wristsOptions) {
                                                    for (const leftRingOpt of leftRingOptions) {
                                                        for (const rightRingOpt of rightRingOptions) {
                                                            this.currentCount++;
                                                            const gearSetInfo = new GearSetInfo({
                                                                setNumber: this.currentCount,
                                                                gearSet: new GearSet({
                                                                    mainHand: mhOpt,
                                                                    offHand: ohOpt,
                                                                    head: headOpt,
                                                                    body: bodyOpt,
                                                                    hands: handsOpt,
                                                                    waist: waistOpt,
                                                                    legs: legsOpt,
                                                                    feet: feetOpt,
                                                                    ears: earsOpt,
                                                                    neck: neckOpt,
                                                                    wrists: wristsOpt,
                                                                    leftRing: leftRingOpt,
                                                                    rightRing: rightRingOpt
                                                                })
                                                            });
                                                            gearSetInfo.dmgIndex = this.calculateDmgIndex(gearSetInfo.gearSet);
                                                            gearSetInfo.gcdTime = this.calcGcd(gearSetInfo.gearSet);

                                                            if (bis === null || bis === undefined || bis.length === 0
                                                                    || gearSetInfo.dmgIndex > bis[0].dmgIndex) {
                                                                bis = [gearSetInfo];
                                                            } else if (gearSetInfo.dmgIndex === bis[0].dmgIndex) {
                                                                bis.push(gearSetInfo);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (const gearSetInfo of bis) {
            gearSetInfo.bestFoods = this.calcBestFood(gearSetInfo.gearSet);
        }
        this.bisSetInfo$.next(bis);
    }

    calcFoodDirectHit(gearSet: IGearSet, food: IFood, dhFromGear?: number) {
        if (!food || !food.stats || !food.stats.dhPerc) {
            return 0;
        }

        let directHit = dhFromGear;

        if (!directHit) {
            directHit = 0;
            const items: IGear[] = Object.values(gearSet);

            for (let i = 0; i < items.length; i++) {
                const gear: IGear = items[i];
                if (!gear) { continue; }
                directHit += gear ? gear.baseStats.directHit + gear.materiaStats.directHit : 0;
            }
        }

        return Math.min((baseDirectHit + directHit) * food.stats.dhPerc, food.stats.dhMax);
    }

    calcFoodCriticalHit(gearSet: IGearSet, food: IFood, critFromGear?: number) {
        if (!food || !food.stats || !food.stats.critPerc) {
            return 0;
        }

        let criticalHit = critFromGear;

        if (!criticalHit) {
            criticalHit = 0;
            const items: IGear[] = Object.values(gearSet);

            for (let i = 0; i < items.length; i++) {
                const gear: IGear = items[i];
                if (!gear) { continue; }
                criticalHit += gear ? gear.baseStats.criticalHit + gear.materiaStats.criticalHit : 0;
            }
        }

        return Math.min((baseCriticalHit + criticalHit) * food.stats.critPerc, food.stats.critMax);
    }

    calcFoodDetermination(gearSet: IGearSet, food: IFood, detFromGear?: number) {
        if (!food || !food.stats || !food.stats.detPerc) {
            return 0;
        }

        let determination = detFromGear;

        if (!determination) {
            determination = 0;
            const items: IGear[] = Object.values(gearSet);

            for (let i = 0; i < items.length; i++) {
                const gear: IGear = items[i];
                if (!gear) { continue; }
                determination += gear ? gear.baseStats.determination + gear.materiaStats.determination : 0;
            }
        }

        return Math.min((baseDetermination + determination) * food.stats.detPerc, food.stats.detMax);
    }

    calcFoodSkillSpeed(gearSet: IGearSet, food: IFood, sksFromGear?: number) {
        if (!food || !food.stats || !food.stats.skillSpeedPerc) {
            return 0;
        }

        let speed = sksFromGear;

        if (!speed) {
            speed = 0;
            const items: IGear[] = Object.values(gearSet);

            for (let i = 0; i < items.length; i++) {
                const gear: IGear = items[i];
                if (!gear) { continue; }
                speed += gear ? gear.baseStats.speed + gear.materiaStats.speed : 0;
            }
        }

        return Math.min((baseSpeed + speed) * food.stats.skillSpeedPerc, food.stats.skillSpeedMax);
    }

    private calcBestFood(gearSet: IGearSet): IFoodInfo[] {
        let bisFood: IFoodInfo[] = [];
        // Iterate through all foods
        for (const foodOpt of foodOptions) {
            // Calculate damage index
            const foodInfo = new FoodInfo({
                dmgIndex: this.calculateDmgIndex(gearSet, foodOpt),
                food: foodOpt
            });
            // Compile list of best foods
            if (bisFood === null || bisFood === undefined || bisFood.length === 0 || foodInfo.dmgIndex > bisFood[0].dmgIndex) {
                foodInfo.dhAdded = this.calcFoodDirectHit(gearSet, foodOpt);
                foodInfo.critAdded = this.calcFoodCriticalHit(gearSet, foodOpt);
                foodInfo.detAdded = this.calcFoodDetermination(gearSet, foodOpt);
                foodInfo.skillSpeedAdded = this.calcFoodSkillSpeed(gearSet, foodOpt);
                foodInfo.gcdTime = this.calcGcd(gearSet, foodOpt);
                bisFood = [foodInfo];
            } else if (foodInfo.dmgIndex === bisFood[0].dmgIndex) {
                foodInfo.dhAdded = this.calcFoodDirectHit(gearSet, foodOpt);
                foodInfo.critAdded = this.calcFoodCriticalHit(gearSet, foodOpt);
                foodInfo.detAdded = this.calcFoodDetermination(gearSet, foodOpt);
                foodInfo.skillSpeedAdded = this.calcFoodSkillSpeed(gearSet, foodOpt);
                foodInfo.gcdTime = this.calcGcd(gearSet, foodOpt);
                bisFood.push(foodInfo);
            }
        }
        return bisFood;
    }

    private calculateDmgIndex(gearSet: IGearSet, food?: IFood): number {
        let directHit = 0;
        let criticalHit = 0;
        let determination = 0;
        let speed = 0;

        const items: IGear[] = Object.values(gearSet);

        for (let i = 0; i < items.length; i++) {
            const gear: IGear = items[i];
            if (!gear) { continue; }
            directHit += gear ? gear.baseStats.directHit + gear.materiaStats.directHit : 0;
            criticalHit += gear ? gear.baseStats.criticalHit + gear.materiaStats.criticalHit : 0;
            determination += gear ? gear.baseStats.determination + gear.materiaStats.determination : 0;
            speed += gear ? gear.baseStats.speed + gear.materiaStats.speed : 0;
        }
        directHit += food ? this.calcFoodDirectHit(gearSet, food, directHit) : 0;
        criticalHit += food ? this.calcFoodDirectHit(gearSet, food, criticalHit) : 0;
        determination += food ? this.calcFoodDetermination(gearSet, food, determination) : 0;
        speed += food ? this.calcFoodSkillSpeed(gearSet, food, speed) : 0;

        const dmgIndex = (this.calcCriticalHitDmgIndex(criticalHit) * this.calcDirectHitDmgIndex(directHit))
                 + this.calcDeterminationDmgIndex(determination) + this.calcSpeedDmgIndex(speed) - 2;
        return dmgIndex;
    }

    // Do not include base stats of a naked character
    private calcCriticalHitDmgIndex(stat: number): number {
        const critRate = (Math.floor(200 * stat / levelMod) + 50) / 1000;
        const critDmgBonus = (Math.floor(200 * stat / levelMod) + 400) / 1000;
        const dmgIndex = 1 + ((critRate + this.critRateIncrease) * critDmgBonus);
        return dmgIndex;
    }

    private calcDirectHitDmgIndex(stat: number): number {
        const directHitRate = (Math.floor(550 * stat / levelMod)) / 1000;
        const directHitDmgBonus = 0.25;
        const dmgIndex = 1 + ((directHitRate + this.dhRateIncrease) * directHitDmgBonus);
        return dmgIndex;
    }

    private calcDeterminationDmgIndex(stat: number): number {
        const dmgIndex = (1000 + Math.floor(130 * stat / levelMod)) / 1000;
        return dmgIndex;
    }

    private calcSpeedDmgIndex(stat: number): number {
        let dmgIndex = (1000 + Math.floor(130 * stat / levelMod)) / 1000;
        dmgIndex = ((dmgIndex - 1) * this.speedScaler) + 1;
        return dmgIndex;
    }

    private calcGcd(gearSet: IGearSet, food?: IFood): number {
        let speed = 0;

        const items: IGear[] = Object.values(gearSet);

        for (let i = 0; i < items.length; i++) {
            const gear: IGear = items[i];
            if (!gear) { continue; }
            speed += gear ? gear.baseStats.speed + gear.materiaStats.speed : 0;
        }

        if (food && food.stats && food.stats.skillSpeedPerc) {
            speed += Math.min((baseSpeed + speed) * food.stats.skillSpeedPerc, food.stats.skillSpeedMax);
        }

        const gcd = Math.floor(Math.floor(100 * 100 * (Math.floor(2500 *
            (1000 - Math.floor(130 * speed / levelMod)) / 1000) / 1000)) / 100) / 100;
        return gcd;
    }
}
