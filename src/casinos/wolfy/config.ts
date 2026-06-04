import type { CasinoConfig } from '@/casinos/types'

const config: CasinoConfig = {
  tenant: 'wolfy',
  apiKey: 'wolfykey',
  template: 'wolfy',
  sections: {
    welcome: { order: 1 },
    about: { order: 2 },
  },
}

export default config
