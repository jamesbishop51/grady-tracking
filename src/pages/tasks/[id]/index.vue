<script lang="ts" setup>
import GdButtonLink from '../../../components/gd-button-link.vue';
import GdCard from '../../../components/gd-card.vue';
import GdContainer from '../../../components/gd-container.vue';
import { useOperatorStore } from '../../../features/operators/operator-store';

const { id } = defineProps<{ id: string }>()

const store = useOperatorStore()

</script>

<template>
  <div>
    <GdCard>
    <GdContainer>
      <div class="p-4 grid gap-4 sm:grid-cols-3">
        <h5 v-if="store.selectedUser" class="text-2xl font-bold tracking-tight">{{store.nameAndTask}}</h5>
        <GdButtonLink  :to="`/tasks/${id}/scan-barcode`">Scan Barcode</GdButtonLink>
        <GdButtonLink  to="/">Error List</GdButtonLink>
        <GdButtonLink  to="/">Scan History</GdButtonLink>
        <GdButtonLink  to="/">Change User</GdButtonLink>
      </div>
    </GdContainer>
  </GdCard>
  </div>
</template>
