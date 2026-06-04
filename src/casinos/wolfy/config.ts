import type { CasinoConfig } from '@/casinos/types'

const config: CasinoConfig = {
  tenant: 'wolfy',
  apiKey: 'wolfykey',
  template: 'wolfy',
  sections: {
    welcome: { order: 2, overrides: { title: 'Test' } },
    about: { order: 1 },
  },
}

export default config
