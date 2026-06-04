import type { Component } from 'vue'

export type TemplateName = 'wolfy' | 'pantaloo'

export interface SectionConfig {
  visible?: boolean
  order?: number
  overrides?: Record<string, unknown>
  component?: () => Promise<{ default: Component }>
}

export interface CasinoConfig {
  tenant: string
  apiKey: string
  template: TemplateName
  sections?: Record<string, SectionConfig>
}
