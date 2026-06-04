import type { CasinoConfig } from './types'

type CasinoLoader = () => Promise<{ default: CasinoConfig }>

const registry: Record<string, CasinoLoader> = {
  wolfy: () => import('./wolfy/config'),
  pantaloo: () => import('./pantaloo/config'),
}

export async function loadCasinoConfig(tenant: string): Promise<CasinoConfig> {
  const loader = registry[tenant]
  if (!loader) throw new Error(`Unknown tenant: "${tenant}"`)
  return (await loader()).default
}
