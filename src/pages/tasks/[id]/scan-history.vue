<script setup lang="ts">
import { useOperatorStore } from '~/features/operators/operator-store'
import { onMounted } from 'vue'
import GdCard from '~/components/gd-card.vue'

const store = useOperatorStore()

onMounted(async () => {
  await store.loadTaskHistory()
})
</script>
<template>
  <GdCard>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Task</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Batch No</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Scanned</th>

                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="tasks in store.taskHistory">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ tasks.task }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ tasks.batchNo }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ tasks.dateScanned }}</td>
                </tr>
                <tr v-if="!store.taskHistory.length">
                  <td colspan="4">
                    No Scanned Tasks
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div class="flex flex-1 justify-between sm:justify-end">
                <button
                  class="relative inline-flex items-center rounded-md border border-gray-300 bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary-hover"
                  @click="store.previousPage()">
                  Previous
                </button>
                <button
                  class="relative inline-flex items-center rounded-md border border-gray-300 bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary-hover"
                  @click="store.nextPage()">
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </GdCard>
</template>