import type { Component } from 'vue'
import type { Section } from '@/api/types'

export type TemplateName = 'wolfy' | 'pantaloo'

// A section is either standard (title/body from the API) or custom (a
// casino-supplied component). The `kind` discriminant lets the view narrow.
export type MergedSection =
  | { kind: 'standard'; id: string; title: string; body: string }
  | { kind: 'custom'; id: string; component: Component }

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
  apiKey: string
  template: TemplateName
  sections?: Record<string, SectionConfig>
}
