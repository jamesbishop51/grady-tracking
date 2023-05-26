<script lang="ts" setup>
import GdButtonLink from '~/components/gd-button-link.vue';
import GdCard from '~/components/gd-card.vue';
import GdContainer from '~/components/gd-container.vue';
import { useOperatorStore } from '~/features/operators/operator-store';

const { id } = defineProps<{ id: string }>()

const store = useOperatorStore()

</script>

<template>
  <div>
    <GdContainer>
      <GdCard>
        <h5 v-if="store.currentUser" class="text-2xl font-bold tracking-tight px-4 pt-4">{{ store.currentUser.name }} |
          {{ store.currentUser.task }}</h5>
        <div class="p-4 grid gap-4 sm:grid-cols-2">
          <GdButtonLink :to="`/tasks/${id}/scan-barcode`">Scan Barcode</GdButtonLink>
          <!-- <GdButtonLink to="/">Error List</GdButtonLink>
          <GdButtonLink :to="`/tasks/${id}/scan-history/`">Scan History</GdButtonLink> -->
          <GdButtonLink :to="`/tasks/${id}/scan-nfc`">Scan NFC</GdButtonLink>
          <GdButtonLink @click="store.logOut" to="/">Change User</GdButtonLink>
        </div>

      </GdCard>
    </GdContainer>
  </div>
</template>
