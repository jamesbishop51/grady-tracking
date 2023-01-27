<script lang="ts" setup>
defineProps<{ to: string }>()
</script>

<template>
  <RouterLink
    :to="to"
    class="flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-secondary-hover focus:ring-offset-2"
  >
    <slot />
  </RouterLink>
</template>
