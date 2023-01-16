<script lang="ts" setup>
import { ref, onMounted, onUnmounted} from 'vue';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'

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
    const c = confirm('We need your permission to use your camera to be able to scan barcodes');

    if(c) {
      BarcodeScanner.openAppSettings();
    }
    return true
  }
  return false
}

async function startScan() {
  const allowed = await CheckPermissions();

  if(allowed){
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();

    if( result.hasContent) {
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
  <div class="flex flex-col gap-4 pt-8 h-full" v-if="barCode">
    {{ barCode }}
  </div>
</template>