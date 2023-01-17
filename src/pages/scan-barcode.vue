<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import GdTextInput from '../components/gd-text-input.vue';
import GdLabel from '../components/gd-label.vue';
import GdButtonLink from '../components/gd-button-link.vue';

onMounted(() => {
  startScan()
})

onUnmounted(() => {
  stopScan()
})

const barCode = ref<string>()

async function CheckPermissions() {
  const status = await BarcodeScanner.checkPermission({ force: true })

  if (status.granted) {
    return true;
  }
  if (status.denied) {
    const c = confirm('We need your permission to use your camera to be able to scan BarCodes');

    if (c) {
      BarcodeScanner.openAppSettings();
    }
    return true
  }
  return false
}

async function startScan() {
  const allowed = await CheckPermissions();

  if (allowed) {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      barCode.value = result.content
      stopScan();
    }
  }
}



async function stopScan() {
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
}

</script>
<template>
  <div class="p-4 grid sm:grid-cols-3">
    <h5 class="text-4xl font-bold tracking-tight">User - Task PH</h5>
    <GdLabel>Manual Entry</GdLabel>
    <GdTextInput></GdTextInput>
    <GdButtonLink class="mt-4" to="/">Submit</GdButtonLink>
  </div>

</template>