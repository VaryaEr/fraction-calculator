<template>
    <div class="result__fraction-block">
        <div class="result__franction">
            <div class="result__fraction-el" v-for="(el, index) in fractions" :key="index">
                <div class="result__fraction-el_container">
                    <div class="result__numeric">{{ el.numerator }}</div>
                    <span class="fraction__separator"></span>
                    <div class="result__denominator">{{ el.denominator }}</div>
                </div>
                <span class="result__plus plus-el"></span>
            </div>
        </div>
        <div class="fractions-equals">
        </div>
        <CalculationResult :result="fractionResult" />
    </div>
    <button class="result__primary-btn primary-btn" @click="deleteSumm()">Удалить расчёт</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Fraction from './visual/Fraction.vue';
import { useFractionsStore } from "../stores/fractions";
import CalculationResult from './CalculationResult.vue';
import { fraction } from '../types/fraction';

interface whole {
    whole: number | null
}
export default defineComponent({
    components: {
        Fraction,
        CalculationResult
    },
    computed: {
        fractionsStore: (): { resetValues: any } => {
            return useFractionsStore();
        },
        fractions(this: any): fraction[] {
            return this.fractionsStore.fractions
        },
        fractionResult<T extends fraction & whole>(this: any): T | null {
            if (this.fractions) {
                return this.fractionsStore.fractionResult
            }
            return null
        },
    },
    methods: {
        deleteSumm(): void {
            this.fractionsStore.resetValues()
        },
    },
})
</script>

<style scoped>
.result__fraction-el_container {
    width: 60px;
}

.result__numeric,
.result__denominator {
    padding: 13px 20px;
    color: #383129;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    text-align: center;
}

.result__franction,
.result__fraction-el,
.result__fraction-block {
    display: flex;
    align-items: center;
}

.result__franction .result__fraction-el:last-child .result__plus {
    display: none;
}

.result__primary-btn {
    margin-top: 20px;
}
</style>