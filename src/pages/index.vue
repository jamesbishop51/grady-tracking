<script lang="ts" setup>
import GdSelect from '../components/gd-select.vue';
import GdContainer from '../components/gd-container.vue';
import { useOperatorStore } from '../features/operators/operator-store';
import GdLabel from '../components/gd-label.vue';
import GdButtonLink from '../components/gd-button-link.vue';
import gdButtonVue from '../components/gd-button.vue';

const store = useOperatorStore()
const id = store.operatorItems

async function updateUser(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  store.selectUserById(value)
}
</script>

<template>
  <GdContainer>
    <div class="fex flex-col gap-4 pt-8">
      <GdLabel>Operator</GdLabel>
      <select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary 
        focus:outline-none focus:ring-secondary sm:text-sm" @change="updateUser">
        <option value="">Select Operator</option>
        <option v-for="opt in store.operatorsToOptions" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option>
      </select>

      <GdLabel>Tasks</GdLabel>
      <select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary 
        focus:outline-none focus:ring-secondary sm:text-sm" v-model="store.currentUserTask">
        <option value="">Select Task</option>
        <option v-for="options in store.currentUserTasks">{{ options.text }}</option>
      </select>
      <GdButtonLink to="/home">test</GdButtonLink>
    </div>
    <div v-if="store.selectedUser">
    {{ store.selectedUser.name }} - {{ store.selectedUser.task }}</div>
  </GdContainer>

</template>