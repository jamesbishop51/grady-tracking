<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import GdTextInput from '~/components/gd-text-input.vue';
import GdLabel from '~/components/gd-label.vue';
import GdButtonLink from '~/components/gd-button-link.vue';
import { useOperatorStore } from '~/features/operators/operator-store';
import GdButton from '~/components/gd-button.vue';
import GdCard from '~/components/gd-card.vue';
import GdContainer from '~/components/gd-container.vue';

const { id } = defineProps<{ id: string }>()

const store = useOperatorStore()

onMounted(() => {

})

onUnmounted(() => {
  stopScan()
})

const barCode = ref<string>()
const active = ref<boolean>(true)

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
  active.value = false
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
  active.value = true
}

</script>
<template>
  <GdContainer>
    <GdCard>
      <div v-if="active">
        <h5 class="text-2xl font-bold tracking-tight px-4 pt-4">{{ store.nameAndTask }}</h5>
        <div class="p-4 grid gap-4 sm:grid-cols-3">
          <GdButton @click="startScan()">Scan Barcode</GdButton>
          <form @submit.prevent="!barCode">
          <div>
            <GdLabel>Manual Entry</GdLabel>
            <GdTextInput v-model="barCode"></GdTextInput>
          </div>      
          <GdButtonLink type="submit" class="mt-4" :to="`/tasks/${id}/submit/${barCode}`">Submit</GdButtonLink>
        </form>
        </div>
      </div>
      <div v-else class="grid">
        <GdButton class="ms-2" @click="stopScan()">Cancel Scan</GdButton>
      </div>
    </GdCard>

  </GdContainer>




</template>