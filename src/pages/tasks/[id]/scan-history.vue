<script lang="ts" setup>
import GdCard from '~/components/gd-card.vue';
import GdContainer from '~/components/gd-container.vue';
import { onMounted } from 'vue';
import { TaskReport, useOperatorStore } from '~/features/operators/operator-store';

const store = useOperatorStore()

onMounted(async () => {
  await store.loadTaskHistory(store.currentUserId)
})

function dateString(dateCompleted: string | Date | undefined) {
  if (!dateCompleted) return ""

  const date = new Date(dateCompleted)
  return date.toLocaleString()
}

</script>
<template>
  <GdContainer>
    <GdCard>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="text-left text-gray-500 py-2">Task</th>
            <th class="text-left text-gray-500 py-2">Date Submitted</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tasks, i) in store.taskHistory" :key="i">
            <td class="p-2 border-b">{{ dateString(tasks.dateSubmitted) }}</td>
          </tr>
        </tbody>
      </table>
    </GdCard>
  </GdContainer>
</template>