import { defineStore } from "pinia";
import { fraction } from "../types/fraction";

interface whole {
    whole: number | null;
}
export const useFractionsStore = defineStore("fractions", {
    state: () => {
        return {
            fractions: null as fraction[] | null,
            fractionResult: null as (fraction & whole) | null,
        };
    },
    persist: true,
    actions: {
        setStateValues(fractions: fraction[] | null, fractionResult: (fraction & whole) | null): void {
            this.fractions = fractions;
            this.fractionResult = fractionResult;
        },
        resetValues(): void {
            this.fractions = null;
            this.fractionResult = null;
        },
    },
});
