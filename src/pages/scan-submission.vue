<script lang="ts" setup>
import GdButtonLink from '../components/gd-button-link.vue';
import GdCard from '../components/gd-card.vue';
import GdContainer from '../components/gd-container.vue';
import GdLabel from '../components/gd-label.vue';
import GdTextInput from '../components/gd-text-input.vue';

</script>
<template>
  <GdCard>
    <div class="p-4 grid gap-4 sm:grid-cols-3">
      <h1 class="text-4xl font-bold tracking-tight">User - Task PH</h1>
      <h2 class="text-2xl font-bold tracking-tight pt-2">Door ID PH</h2>

      <div>
        <GdLabel>Time</GdLabel>
        <p>date/time here</p>
      </div>

      <div>
        <GdLabel>Extras (optional)</GdLabel>
        <GdTextInput></GdTextInput>
      </div>

      <GdButtonLink to="/">Add image/video</GdButtonLink>
      <GdButtonLink to="/">Submit</GdButtonLink>
    </div>
  </GdCard>
</template>