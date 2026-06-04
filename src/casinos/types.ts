import type { Component } from 'vue'
import type { Section } from '@/api/types'

export type TemplateName = 'wolfy' | 'pantaloo'

export interface MergedSection {
  id: string
  title?: string
  body?: string
  component?: Component
}

// Casino-authored overrides for a section's renderable content.
// Typed against the API Section so typos and wrong fields are caught.
export type SectionOverrides = Partial<Pick<Section, 'title' | 'body'>>

export interface SectionConfig {
  visible?: boolean
  order?: number
  overrides?: SectionOverrides
  component?: () => Promise<{ default: Component }>
}

export interface CasinoConfig {
  tenant: string
  apiKey: string
  template: TemplateName
  sections?: Record<string, SectionConfig>
}
