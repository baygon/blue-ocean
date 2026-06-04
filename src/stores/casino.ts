import { defineStore } from 'pinia'
import { ref, computed, defineAsyncComponent } from 'vue'
import { loadCasinoConfig } from '@/casinos/registry'
import { useAuthStore } from '@/stores/auth'
import { apiClient } from '@/api/client'
import type { CasinoConfig, MergedSection } from '@/casinos/types'
import type { CasinoApiResponse } from '@/api/types'

export const useCasinoStore = defineStore('casino', () => {
  const config = ref<CasinoConfig | null>(null)
  const apiData = ref<CasinoApiResponse | null>(null)
  const ready = ref(false)

  const sections = computed<MergedSection[]>(() => {
    if (!apiData.value || !config.value) return []
    const sectionConfigs = config.value.sections ?? {}

    const apiIds = new Set(apiData.value.sections.map(s => s.id))

    const standard: (MergedSection & { _order: number; _index: number })[] =
      apiData.value.sections
        .filter(s => sectionConfigs[s.id]?.visible !== false)
        .map((s, i) => ({
          id: s.id,
          title: (sectionConfigs[s.id]?.overrides?.title as string | undefined) ?? s.title,
          body: (sectionConfigs[s.id]?.overrides?.body as string | undefined) ?? s.body,
          _order: sectionConfigs[s.id]?.order ?? Infinity,
          _index: i,
        }))

    const custom: (MergedSection & { _order: number; _index: number })[] =
      Object.entries(sectionConfigs)
        .filter(([id, cfg]) => !apiIds.has(id) && cfg.component && cfg.visible !== false)
        .map(([id, cfg], i) => ({
          id,
          component: defineAsyncComponent(cfg.component!),
          _order: cfg.order ?? Infinity,
          _index: apiData.value!.sections.length + i,
        }))

    return [...standard, ...custom]
      .sort((a, b) => a._order !== b._order ? a._order - b._order : a._index - b._index)
      .map(({ _order: _o, _index: _i, ...s }) => s)
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
