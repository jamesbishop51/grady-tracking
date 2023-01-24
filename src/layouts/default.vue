<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <main class="pt-4 pb-8">
<div >
  <RouterView />
</div>
  </main>
  <footer>
      <GdContainer>
        <div class="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
          <span class="block sm:inline">Grady Door & Window Manufacturers</span>
        </div>
      </GdContainer>
    </footer>
</template>