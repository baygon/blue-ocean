import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadCasinoConfig } from '@/casinos/registry'
import { useAuthStore } from '@/stores/auth'
import { apiClient } from '@/api/client'
import type { CasinoConfig } from '@/casinos/types'
import type { CasinoApiResponse, Section } from '@/api/types'

export const useCasinoStore = defineStore('casino', () => {
  const config = ref<CasinoConfig | null>(null)
  const apiData = ref<CasinoApiResponse | null>(null)
  const ready = ref(false)

  const sections = computed<Section[]>(() => {
    if (!apiData.value || !config.value) return []
    const sectionConfigs = config.value.sections ?? {}
    return apiData.value.sections
      .filter(s => sectionConfigs[s.id]?.visible !== false)
      .map((s, i) => ({
        ...s,
        ...(sectionConfigs[s.id]?.overrides as Partial<Section> | undefined ?? {}),
        _index: i,
      }))
      .sort((a, b) => {
        const orderA = sectionConfigs[a.id]?.order ?? Infinity
        const orderB = sectionConfigs[b.id]?.order ?? Infinity
        return orderA !== orderB ? orderA - orderB : a._index - b._index
      })
      .map(({ _index: _, ...s }) => s)
  })

  async function init(tenant: string): Promise<void> {
    const auth = useAuthStore()
    config.value = await loadCasinoConfig(tenant)
    await auth.init(config.value.apiKey)
    const { data } = await apiClient.get<CasinoApiResponse>('/casino')
    apiData.value = data
    ready.value = true
  }

  return { config, apiData, sections, ready, init }
})
