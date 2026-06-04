<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useCasinoStore } from '@/stores/casino'

const casino = useCasinoStore()
</script>

<template>
  <div
    class="layout"
    :style="{ '--bg': casino.theme?.background, '--color': casino.theme?.text }"
  >
    <header class="header">
      <strong>{{ casino.name }}</strong>
      <input type="text" placeholder="Search..." />
    </header>

    <nav class="subnav">
      <RouterLink
        v-for="item in casino.menu"
        :key="item.id"
        :to="item.path"
        class="nav-link"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  background: var(--bg);
  color: var(--color);
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid currentColor;
}

.subnav {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid currentColor;
}

.nav-link {
  color: inherit;
  text-decoration: none;
}

.content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
