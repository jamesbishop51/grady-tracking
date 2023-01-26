<script lang="ts" setup>
import GdSelect from '~/components/gd-select.vue';
import GdContainer from '~/components/gd-container.vue';
import { useOperatorStore } from '~/features/operators/operator-store';
import GdLabel from '~/components/gd-label.vue';
import GdButtonLink from '~/components/gd-button-link.vue';
import gdButton from '~/components/gd-button.vue';
import { onMounted } from 'vue'
import GdCard from '~/components/gd-card.vue';

const store = useOperatorStore()
const id = store.operatorItems

function updateUser(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  store.selectUserById(value)
}


</script>

<template>
  <GdContainer>
    <GdCard class="p-4">
    <div class="fex flex-col gap-4 pt-8">
      <GdLabel>Operator</GdLabel>
      <select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary 
        focus:outline-none focus:ring-secondary sm:text-sm" @change="updateUser">
        <option value="">Select Operator</option>
        <option v-for="opt in store.operatorsToOptions" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option>
      </select>

      <GdLabel class="pt-4">Tasks</GdLabel>
      <select class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary 
        focus:outline-none focus:ring-secondary sm:text-sm" v-model="store.currentUserTask">
        <option value="">Select Task</option>
        <option v-for="options in store.currentUserTasks">{{ options.text }}</option>
      </select>
      <div class="py-4">
        <GdButtonLink :to="`/tasks/${store.currentUserId}`">Set mode</GdButtonLink>
      </div>

    </div>
  </GdCard>
  </GdContainer>

</template>