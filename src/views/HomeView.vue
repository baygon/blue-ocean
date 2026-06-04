<script setup lang="ts">
import { useCasinoStore } from '@/stores/casino'

const casino = useCasinoStore()
</script>

<template>
  <div class="home">
    <template v-for="section in casino.sections" :key="section.id">
      <component :is="section.component" v-if="section.kind === 'custom'" />
      <section v-else class="section">
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
      </section>
    </template>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section h2 {
  margin-bottom: 0.5rem;
}
</style>
