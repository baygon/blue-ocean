import type { CasinoConfig } from '@/casinos/types'

const config: CasinoConfig = {
  apiKey: 'wolfykey',
  template: 'wolfy',
  sections: {
    welcome: { order: 1, overrides: { title: 'Welcome to the Wolf Den' } },
    about: { order: 2 },
    promo: { order: 3, component: () => import('./sections/PromoSection.vue') },
  },
}

export default config
