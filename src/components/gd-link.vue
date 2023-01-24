<script lang="ts" setup>
defineProps<{ to: string }>()
</script>

<template>
  <RouterLink :to="to" class="text-secondary hover:text-secondary-hover underline underline-offset-2">
    <slot />
  </RouterLink>
</template>
