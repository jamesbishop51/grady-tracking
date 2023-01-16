<script lang="ts">
// use normal <script> to declare options
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="flex items-center">
    <input
      type="checkbox" v-bind="$attrs"
      class="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
    >
    <label for="remember-me" class="ml-2 block text-sm text-gray-900"><slot /></label>
  </div>
</template>
