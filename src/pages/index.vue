<script lang="ts" setup>
import GdSelect from '../components/gd-select.vue';
import GdContainer from '../components/gd-container.vue';
import { useOperatorStore } from '../features/operators/operator-store';
import GdLabel from '../components/gd-label.vue';
import { options } from '../features/operators/operator-options';

defineProps<{id: string}>()
const store = useOperatorStore()


</script>

<template>
  <GdContainer>
    <div class="fex flex-col gap-4 pt-8" v-for="operators in store.operatorItems" :key="operators.id">
      <GdLabel>Operator</GdLabel>
      <GdSelect v-model="operators.id" :options="operators.tasks" select-prompt="Select Operator"></GdSelect>
      <GdLabel>Tasks</GdLabel>
    <select>
        <option v-for="operators in store.operatorItems">{{ operators.name }}</option>
      </select>
      
    </div>
  </GdContainer>

</template>