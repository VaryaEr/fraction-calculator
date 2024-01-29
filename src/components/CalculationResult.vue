<template>
    <div v-if="result != null" class="result-container">
        <div class="result__whole">{{ result.whole }}</div>
        <div class="result__fraction" v-if="result.numerator && result.denominator && result.numerator > 0">
            <div class="result__numeric">{{ result.numerator }}</div>
            <span class="fraction__separator"></span>
            <div class="result__denominator">{{ result.denominator }}</div>
        </div>
    </div>
    <div v-else class="result-none">?</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { fraction } from '../types/fraction';

interface whole {
    whole: number | null
}
export default defineComponent({
    props: {
        result: {
            type: null as unknown as PropType<fraction & whole | null>,
            required: true,
        }
    }
})
</script>

<style scoped>
.result-container {
    display: flex;
    align-items: center;
}

.result__whole {
    margin-right: 10px;
}
</style>