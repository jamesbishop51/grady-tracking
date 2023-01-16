<script lang="ts" setup>
import { App } from '@capacitor/app'


console.log('init test')

App.addListener('backButton', ({ canGoBack}) => {
  if(!canGoBack) {
    App.exitApp();
  }else {
    window.history.back();
  }
})
</script>
<template>
  <div class="flex flex-col h-screen">
    <h1 class="text-4xl font-bold tracking-tight text-secondary p-2 border-b-2">Grady Tracking App</h1>
      <main class="p-2 flex-1 overflow-y-scroll">
        <RouterView />
      </main>
      <footer>
        <RouterLink to="/">Home</RouterLink>
      </footer>
    
  </div>
</template>