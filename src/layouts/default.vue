<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import GdButtonLink from '../components/gd-button-link.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <h1 class="text-4xl font-bold tracking-tight text-secondary p-2 border-b-2">Grady Tracking App</h1>
    <main class="p-2 flex-1 overflow-y-scroll">
      <div>
        <RouterView />
      </div>
    </main>
    <footer>
      <GdContainer>
        <div class="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
          <span class="block sm:inline">Grady Door & Window Manufacturers</span>
        </div>
      </GdContainer>
    </footer>
  </div>
</template>