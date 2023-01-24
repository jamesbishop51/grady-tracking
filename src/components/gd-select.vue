<script lang="ts" setup>
interface Props {
  options: string[]
  modelValue?: string
  selectPrompt?: string
}
defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<template>
  <select :value="modelValue" @change="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm">
    <option value="">{{ selectPrompt }}</option>
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>