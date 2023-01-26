<script lang="ts" setup>
defineProps<{ modelValue?: string }>()
defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue"  @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#e2c69f] focus:outline-none focus:ring-[#e2c69f] sm:text-sm">
</template>
