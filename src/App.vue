<script setup lang="ts">
import { onMounted, ref, computed, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import { useCasinoStore } from '@/stores/casino'

const templateModules = import.meta.glob<{ default: Component }>('@/templates/*.vue')

function resolveTemplate(name: string) {
  const key = `/src/templates/${name.charAt(0).toUpperCase() + name.slice(1)}Template.vue`
  const loader = templateModules[key]
  return loader ? defineAsyncComponent(loader) : null
}

const casino = useCasinoStore()
const error = ref<string | null>(null)

const activeTemplate = computed(() => {
  const name = casino.template
  if (!name) return null
  return resolveTemplate(name)
})

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
  <div v-if="error" class="state error">{{ error }}</div>
  <component :is="activeTemplate" v-else-if="casino.ready && activeTemplate" />
  <div v-else class="state">Loading...</div>
</template>

<style scoped>
.state {
  padding: 1rem;
}

.error {
  color: red;
}
</style>
