<script setup lang="ts">
import { useCasinoStore } from '@/stores/casino'

const casino = useCasinoStore()
</script>

<template>
  <div class="home">
    <section
      v-for="section in casino.sections"
      :key="section.id"
      class="section"
    >
      <h2>{{ section.title }}</h2>
      <p>{{ section.body }}</p>
    </section>
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
