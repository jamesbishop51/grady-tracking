<script lang="ts" setup>
import { ref, onUnmounted } from 'vue'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import GdTextInput from '~/components/gd-text-input.vue'
import GdLabel from '~/components/gd-label.vue'
import { useRouter } from 'vue-router'
import GdButtonLink from '~/components/gd-button-link.vue'
import { useOperatorStore } from '~/features/operators/operator-store'
import GdButton from '~/components/gd-button.vue'
import GdCard from '~/components/gd-card.vue'
import GdContainer from '~/components/gd-container.vue'

const { id } = defineProps<{ id: string }>()

const store = useOperatorStore()

const router = useRouter()

onUnmounted(() => {
  stopScan()
})

const active = ref<boolean>(true)
async function checkPermissions() {
  const status = await BarcodeScanner.checkPermission({ force: true })

  if (status.granted) {
    return true
  }

  if (status.denied) {
    const c = confirm(
      'We need your permission to use your camera to be able to scan BarCodes'
    )

    if (c) {
      BarcodeScanner.openAppSettings()
    }
    return true
  }
  return false
}

async function startScan() {
  const allowed = await checkPermissions()
  active.value = false
  if (allowed) {
    BarcodeScanner.hideBackground()
    const result = await BarcodeScanner.startScan()

    if (result.hasContent) {
      store.scannedBarcode = result.content || ''
      stopScan()
      router.push(`/tasks/${id}/submit`)
    }
  }
}

async function stopScan() {
  BarcodeScanner.showBackground()
  BarcodeScanner.stopScan()
  active.value = true
}
</script>
<template>
  <GdContainer>
    <div v-if="active">
      <GdCard>
        <div>
          <h5 class="text-2xl font-bold tracking-tight px-4 pt-4">
            {{ store.currentUser?.name }} | {{ store.currentUser?.task }}
          </h5>
          <div class="p-4">
            <GdButton class="mt-4" @click="startScan()">Scan Barcode</GdButton>
          </div>
        </div>
      </GdCard>
      <GdCard class="mt-20">
        <div class="p-4">
          <GdLabel>Manual Entry</GdLabel>
          <GdTextInput
            placeholder=""
            v-model="store.scannedBarcode"
          ></GdTextInput>
          <GdButtonLink
            :to="`/tasks/${id}/submit/${store.scannedBarcode}`"
            class="mt-4"
            >Enter Manual Code
          </GdButtonLink>
        </div>
      </GdCard>
    </div>
    <div v-else class="grid">
      <GdCard>
        <GdButton class="ms-2" @click="stopScan()">Cancel Scan</GdButton>
      </GdCard>
    </div>
  </GdContainer>
</template>
