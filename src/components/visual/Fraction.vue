<template>
    <div class="fraction">
        <VariableBlock v-model:variableVal="fraction.numerator" />
        <span class="fraction__separator"></span>
        <VariableBlock v-model:variableVal="fraction.denominator" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import VariableBlock from './VariableBlock.vue'
import { fraction } from '../../types/fraction';


export default defineComponent({
    props: {
        fraction: {
            type: Object as PropType<fraction>,
            required: true,
        },
    },
    components: {
        VariableBlock
    }
})
</script>

<style scoped>
.fraction {
    display: flex;
    flex-direction: column;
    width: fit-content;
}
</style>