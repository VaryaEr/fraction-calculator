<template>
    <div class="fractions-container">
        <div class="fractions" :class="{ 'permit-delete': fractions.length > 2 }">
            <div class="freactions__container">
                <div v-for="(el, index) in fractions" :key="index" class="fractions-el">
                    <div class="fractions-el__delete" @click="deleteFraction(index)"></div>
                    <Fraction :el="el" v-model:fraction="fractions[index]" />
                    <span class="fractions-el__plus plus-el"></span>
                </div>
            </div>
            <div class="fractions-equals">
            </div>

            <CalculationResult :result="fractionResult" />
        </div>
        <button :disabled="fractions.length >= 5" class="fractions__primary-btn primary-btn" @click="addFraction()">Добавить
            дробь</button>
        <button @click="saveSumm()" :disabled="fractionResult === null" class="primary-btn_orange">Сохранить
            расчёты</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Fraction from './visual/Fraction.vue';
import { fraction } from '../types/fraction';
import CalculationResult from './CalculationResult.vue';
import { useFractionsStore } from "../stores/fractions";

interface whole {
    whole: number | null
}
interface State {
    fractions: fraction[];
}
export default defineComponent({
    data(): State {
        return {
            fractions: [
                {
                    numerator: null,
                    denominator: null,
                },
                {
                    numerator: null,
                    denominator: null,
                },
            ],
        }
    },
    computed: {
        fractionResult<T extends fraction & whole>(): T | null {
            if (this.fractions) {
                let fractions = this.fractions
                return this.allFractionsVal(fractions)
            }
            return null
        },
        fractionsStore: (): { setStateValues: any } => {
            return useFractionsStore();
        },
    },
    components: {
        Fraction,
        CalculationResult
    },
    methods: {
        saveSumm(): void {
            this.fractionsStore.setStateValues(this.fractions, this.fractionResult)
        },
        allFractionsVal<T extends fraction & whole>(fractions: fraction[]): T | null {
            let summ = null
            for (let i = 1; i < fractions.length; i++) {
                if (fractions[i].numerator !== null && fractions[i].denominator !== null) {
                    if (summ === null) {
                        summ = this.sumOfFractions(fractions[i - 1], fractions[i])
                    } else {
                        summ = this.sumOfFractions(summ, fractions[i])
                    }
                } else {
                    return null
                }
            }
            return this.setResult(summ) as T
        },
        sumOfFractions<T extends fraction>(fraction1: fraction, fraction2: fraction): T | null {
            if (fraction1.numerator && fraction1.denominator && fraction2.numerator && fraction2.denominator) {
                return {
                    numerator: (fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator),
                    denominator: this.commonDenominator(fraction1, fraction2),
                } as T;
            }
            return null

        },
        commonDenominator(fraction1: fraction, fraction2: fraction): number | null {
            if (fraction1.denominator && fraction2.denominator) {
                return fraction1.denominator * fraction2.denominator;
            }
            return null
        },
        addFraction(): void {
            if (this.fractions.length < 5) {
                let fraction = {
                    numerator: null,
                    denominator: null,
                }
                this.fractions.push(fraction)
            }
        },
        deleteFraction(index: number): void {
            if (this.fractions.length > 2) {
                this.fractions.splice(index, 1)
            }
        },
        setResult<T extends fraction & whole>(fraction: fraction | null): T {
            let resultSumm: fraction & whole = {
                whole: null,
                numerator: null,
                denominator: null,
            }

            if (fraction != null && fraction.numerator && fraction.denominator) {

                let NOD = this.NOD(fraction)

                fraction.numerator = fraction.numerator / NOD
                fraction.denominator = fraction.denominator / NOD

                if (fraction.numerator > fraction.denominator) {
                    resultSumm.whole = parseInt((fraction.numerator / fraction.denominator).toString())
                    fraction.numerator = fraction.numerator - resultSumm.whole * fraction.denominator
                }
                resultSumm.numerator = fraction.numerator
                resultSumm.denominator = fraction.denominator
            }
            return resultSumm as T
        },
        NOD(fraction: fraction): number {
            if (fraction != null && fraction.numerator && fraction.denominator) {
                let x = fraction.numerator
                let y = fraction.denominator;
                while (x && y) {
                    x > y ? x %= y : y %= x;
                }
                x += y;

                return x;
            }
            return 1
        }
    }
})
</script>

<style scoped>
.fractions-el {
    display: flex;
    align-items: center;
    position: relative;
}

.fractions,
.freactions__container {
    display: flex;
    align-items: center;
}

.freactions__container .fractions-el:last-child .fractions-el__plus {
    display: none;
}

.fractions__primary-btn {
    margin: 20px 0;
}

.fractions-el__delete {
    display: inline-block;
    width: 20px;
    height: 20px;
    background:
        linear-gradient(#9D9C9C, #9D9C9C),
        linear-gradient(#9D9C9C, #9D9C9C);
    background-position: center;
    background-size: 150% 3px, 3px 150%;
    background-repeat: no-repeat;
    transform: rotate(45deg);
    position: absolute;
    top: -25px;
    left: 40px;
    cursor: pointer;
    display: none;
}

.permit-delete .fractions-el__delete {
    display: block;
}
</style>