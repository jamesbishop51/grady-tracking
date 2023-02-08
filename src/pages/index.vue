<script lang="ts" setup>
import GdContainer from '~/components/gd-container.vue';
import { useOperatorStore } from '~/features/operators/operator-store';
import GdLabel from '~/components/gd-label.vue';
import GdButton from '~/components/gd-button.vue';
import GdCard from '~/components/gd-card.vue';
import {useRouter } from 'vue-router';

const store = useOperatorStore()
const router = useRouter()

function updateUser(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  store.selectUserById(value)
  console.log(store.operatorItems)
}

function saveLocalUser() {
  store.setUser()
  router.push(`/tasks/${store.currentUser?.id}`)
}

</script>

<template>
  <GdContainer>
    <GdCard class="p-4">
      <div class="fex flex-col gap-4">

        <GdLabel>Operator</GdLabel>
        <select class="mt-1 block w-full rounded-md outline outline-offset-1 outline-1 outline-secondary border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary 
        focus:outline-none focus:ring-secondary sm:text-sm" @change="updateUser">
          <option value="">Select Operator</option>
          <option v-for="opt in store.operatorsToOptions" :key="opt.value" :value="opt.value">
            {{ opt.text }}
          </option>
        </select>

        <GdLabel class="pt-4">Tasks</GdLabel>
        <select class="mt-1 block w-full rounded-md outline outline-offset-1 outline-1 outline-secondary py-2 pl-3 pr-10 text-base focus:border-secondary 
        focus:outline-none focus:ring-secondary sm:text-sm" v-model="store.currentUser.task" >
          <option value="">Select Task</option>
          <option v-for="options in store.currentUserTasks">{{ options.text }}</option>
        </select>

        <div class="py-4">
          <GdButton @click="saveLocalUser">Set mode</GdButton>
        </div>

      </div>
    </GdCard>
  </GdContainer>

</template>