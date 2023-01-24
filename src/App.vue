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
  <router-view />
</template>
