<template>
  <div class="container-fluid">
    <Calculations v-if="fractions === null" />
    <CalculationsSaves v-if="fractions !== null" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calculations from './components/Calculations.vue'
import CalculationsSaves from './components/CalculationsSaves.vue';
import { useFractionsStore } from "./stores/fractions";
import { fraction } from './types/fraction';

export default defineComponent({
  components: {
    Calculations,
    CalculationsSaves
  },
  computed: {
    fractionsStore: (): object => {
      return useFractionsStore();
    },
    fractions(this: any): fraction[] {
      return this.fractionsStore.fractions
    },
  },
})
</script>

<style scoped>
.container-fluid {
  padding: 50px 20px;
  max-width: 1440px;
  margin: auto;
}
</style>
