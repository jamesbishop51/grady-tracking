<script lang="ts" setup>
import GdSelect from '../components/gd-select.vue';
import GdContainer from '../components/gd-container.vue';
import { useOperatorStore } from '../features/operators/operator-store';
import GdLabel from '../components/gd-label.vue';
import { options } from '../features/operators/operator-options';
import GdButtonLink from '../components/gd-button-link.vue';

defineProps<{id: string}>()
const store = useOperatorStore()
const operator = store.operatorItems

</script>

<template>
  <GdContainer>
    <div class="fex flex-col gap-4 pt-8" v-for="operators in store.operatorItems" :key="operators.id">
      <GdLabel>Operator</GdLabel>
    <GdSelect v-model="store.currentUser.name" :options="store.getOperator" select-prompt="Select Operator"></GdSelect>
    {{ operators.name }}
      <GdLabel>Tasks</GdLabel>
      <GdSelect v-model="store.currentUser.task" :options="store.getTasks(operators.id)" select-prompt="Select Operator"></GdSelect>
      <GdButtonLink to="/home">test</GdButtonLink>
    </div>
  </GdContainer>

</template>