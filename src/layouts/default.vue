<script lang="ts" setup>
import { RouterView } from 'vue-router'
import GdContainer from '../components/gd-container.vue'
import { Icon } from '@iconify/vue'
import { useOperatorStore } from '~/features/operators/operator-store';


const store = useOperatorStore()

</script>

<template>

  <div class="flex flex-col h-screen">
    <div class="flex items-start mt-1 md:col-span-5 md:mt-0 border-b-2 bg-white">
      <RouterLink :to="`/tasks/${store.currentUserId}`">
        <Icon class="flex-1 text-secondary" height="3em" icon="material-symbols:home-outline" />
      </RouterLink>
      <h1 class="text-4xl font-bold tracking-tight text-secondary p-2 flex-3">Grady Tracking App</h1>
    </div>
    <main class="p-2 flex-1 overflow-y-scroll">
      <div>
        <RouterView />
      </div>
    </main>
    <footer>
      
        <div class="border-t border-gray-200 py-4 text-center text-sm text-gray-500 sm:text-left bg-white">
          <span class="block sm:inline">Grady Door & Window Manufacturers</span>
        </div>
    </footer>
  </div>
</template>