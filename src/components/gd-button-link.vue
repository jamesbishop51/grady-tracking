<script lang="ts" setup>
defineProps<{ to: string, secondary?: boolean }>()
</script>

<template>
  <RouterLink :to="to" class="inline-flex items-center rounded-md border border-transparent 
    px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2" :class="secondary
    ? 'bg-green-100 hover:bg-green-200'
    : 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary-hover'">
    <slot />
  </RouterLink>
</template>