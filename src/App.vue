<script lang="ts" setup>
import { App } from '@capacitor/app'
import { onMounted } from 'vue';
import { useOperatorStore } from './features/operators/operator-store';

const store = useOperatorStore()

console.log('init test')
onMounted(async () => {
  await store.loadUsersAndTasks()
})
App.addListener('backButton', ({ canGoBack}) => {
  if(!canGoBack) {
    App.exitApp();
  }else {
    window.history.back();
  }
})
</script>
<template class="bg-offWhite">
  <router-view />
</template>
