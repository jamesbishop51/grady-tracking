<script lang="ts" setup>
import { useOperatorStore } from '~/features/operators/operator-store';
import { ref } from 'vue';
import GdButtonLink from '~/components/gd-button-link.vue';
import GdButton from '~/components/gd-button.vue';
import GdCard from '~/components/gd-card.vue';
import { useRouter } from 'vue-router';
import GdContainer from '~/components/gd-container.vue';
import GdLabel from '~/components/gd-label.vue';
import GdTextInput from '~/components/gd-text-input.vue';

const { id } = defineProps<{ id: string }>()

const store = useOperatorStore()

const router = useRouter()
const date = new Date()
const comments = ref('')

function dateString(dateCompleted: string | Date | undefined) {
  if (!dateCompleted) return ""

  const date = new Date(dateCompleted)
  return date.toLocaleString()
}

async function complete() {
  await store.postBarcode(comments.value)
  await router.push(`/tasks/${id}`)
}

</script>
<template>
  <GdContainer>
    <GdCard>
      <div class="px-4 pt-4">
        <h1 class="text-3xl font-bold tracking-tight">{{ store.currentUser?.name }} | {{ store.currentUser?.task }}</h1>
        <h2 class="text-2xl font-bold tracking-tight pt-2">{{ store.scannedBarcode }}</h2>
      </div>
      <div class="p-4 grid gap-4 sm:grid-cols-4">
        <div>
          <GdLabel>Time</GdLabel>
          <p>{{ dateString(date) }}</p>
        </div>
        <div>
          <GdLabel>Extras (optional)</GdLabel>
          <GdTextInput v-model="comments"></GdTextInput>
        </div>
        <GdButtonLink to="">Add image/video</GdButtonLink>
        <GdButton @click="complete()">Submit</GdButton>
      </div>
    </GdCard>
  </GdContainer>
</template>