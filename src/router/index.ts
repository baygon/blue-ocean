import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/DummyView.vue'),
    },
  ],
})

// Keep the ?tenant= param on every navigation so sub-routes stay shareable
// and survive a refresh. (In production the tenant would come from the host.)
router.beforeEach((to, from) => {
  const tenant = to.query.tenant ?? from.query.tenant
  if (tenant && to.query.tenant !== tenant) {
    return { path: to.path, query: { ...to.query, tenant }, hash: to.hash, replace: true }
  }
})

export default router
