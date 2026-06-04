import type { CasinoConfig } from '@/casinos/types'

const config: CasinoConfig = {
  tenant: 'pantaloo',
  apiKey: 'pantalookey',
  template: 'pantaloo',
  sections: {
    hero: { order: 1 },
    news: { order: 2 },
  },
}

export default config
