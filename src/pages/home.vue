<script lang="ts" setup>
import GdButtonLink from '../components/gd-button-link.vue';
import GdCard from '../components/gd-card.vue';
import GdContainer from '../components/gd-container.vue';

</script>
<template>
  <GdCard>
    <GdContainer>
      <div class="p-4 grid gap-4 sm:grid-cols-3">
        <h5 class="text-4xl font-bold tracking-tight">User - Task PH</h5>
        <GdButtonLink  to="/scan-barcode">Scan Barcode</GdButtonLink>
        <GdButtonLink  to="/">Error List</GdButtonLink>
        <GdButtonLink  to="/">Scan History</GdButtonLink>
        <GdButtonLink  to="/">Change User</GdButtonLink>
      </div>

    </GdContainer>
  </GdCard>
</template>