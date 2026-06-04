import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/PlaceholderView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/DummyView.vue'),
    },
  ],
})

export default router
