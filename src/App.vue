<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCasinoStore } from '@/stores/casino'

const casino = useCasinoStore()
const error = ref<string | null>(null)

onMounted(async () => {
  const tenant = new URLSearchParams(window.location.search).get('tenant')
  if (!tenant) {
    error.value = 'No tenant specified. Add ?tenant=wolfy or ?tenant=pantaloo to the URL.'
    return
  }
  try {
    await casino.init(tenant)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load casino'
  }
})
</script>

<template>
  <div v-if="error" style="padding: 1rem; color: red;">{{ error }}</div>
  <RouterView v-else-if="casino.ready" />
  <div v-else style="padding: 1rem;">Loading...</div>
</template>
