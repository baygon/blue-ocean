<script setup lang="ts">
import { useCasinoStore } from '@/stores/casino'

const casino = useCasinoStore()
</script>

<template>
  <pre>{{ JSON.stringify({ config: casino.config, apiData: casino.apiData, sections: casino.sections }, null, 2) }}</pre>
</template>
