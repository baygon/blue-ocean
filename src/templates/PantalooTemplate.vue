<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useCasinoStore } from '@/stores/casino'

const casino = useCasinoStore()

const sidebarRight = computed(() => casino.apiData?.sidebar === 'right')
</script>

<template>
  <div
    class="layout"
    :style="{ '--bg': casino.apiData?.theme.background, '--color': casino.apiData?.theme.text }"
  >
    <header class="header">
      <strong>{{ casino.apiData?.name }}</strong>
      <input type="text" placeholder="Search..." />
    </header>

    <div class="body" :class="{ 'sidebar-right': sidebarRight }">
      <nav class="sidebar">
        <RouterLink
          v-for="item in casino.apiData?.menu"
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

.body {
  display: flex;
}

.body.sidebar-right {
  flex-direction: row-reverse;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 240px;
  flex-shrink: 0;
  padding: 1rem;
  border-right: 1px solid currentColor;
}

.nav-link {
  color: inherit;
  text-decoration: none;
}

.content {
  flex: 1;
  padding: 1rem;
}
</style>
