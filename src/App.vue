<script lang="ts" setup>
import { App } from '@capacitor/app'
import { onMounted } from 'vue'
import { useOperatorStore } from './features/operators/operator-store'
import { useRouter } from 'vue-router'

const store = useOperatorStore()
const router = useRouter()

console.log('init test')

onMounted(async () => {
  await store.loadUsersAndTasks()
  await store.loadLocalUser()

  if (store.currentUser) await router.push(`/tasks/${store.currentUser.id}`)
})

App.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    App.exitApp()
  } else {
    window.history.back()
  }
})
</script>
<template>
  <router-view />
</template>
