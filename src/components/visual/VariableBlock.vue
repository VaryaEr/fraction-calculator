<template>
    <input placeholder="00" :value="variableVal" @input="validateVariable($event)" class="variable-input" type="text">
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        variableVal: {
            type: null as unknown as PropType<Number | null>,
            required: true,
        },
    },
    emits: ['update:variableVal'],
    methods: {

        validateVariable(e: Event): void {
            const el = e.target as HTMLInputElement
            let elValue = el.value
            el.value = elValue.replace(/[^0-9]/g, "")
            if (!(Number(elValue) > 0 && Number(elValue) < 100) && elValue.length > 0) {
                el.value = elValue.substring(0, elValue.length - 1)
            }
            this.$emit('update:variableVal', el.value)
        },

    }
})
</script>

<style scoped>
.variable-input {
    border-radius: 5px;
    border: 1px solid #CBC9C9;
    background: #FFF;
    padding: 13px 20px;
    width: 60px;
    color: #383129;
    font-family: "Open Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    text-align: center;
    transition: all 0.3s ease;
}

.variable-input::placeholder {
    color: #9D9C9C;
}

.variable-input:hover {
    border: 1px solid #9D9C9C;
}

.variable-input:focus {
    border: 1px solid #383129;
}
</style>

