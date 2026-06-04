import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/PlaceholderView.vue'),
    },
  ],
})

export default router
