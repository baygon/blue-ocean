# Architecture

## How it fits together

Three layers: **templates**, **casinos**, and the **config layer** between them.

**Templates** (`src/templates/`) own the layout — header, nav, sidebar, content slot. They're shared and know nothing about any specific casino.

**Casinos** (`src/casinos/`) are pure config files. Each one declares which template it uses, its API key, and how sections should behave. No components, no logic.

**Config layer** is what makes it flexible. The API returns flat data. The casino config adds the front-end concerns the API doesn't model: section order, visibility, field overrides, custom components.

Startup flow:

```
?tenant=wolfy
  → load wolfy/config.ts (dynamic import)
  → POST /auth/token
  → GET /casino
  → merge API data + config overrides
  → lazy-load WolfyTemplate
  → render HomeView inside it
```

## Adding a new casino

1. Create `src/casinos/<name>/config.ts`
2. Add one line to `src/casinos/registry.ts`

No shared code changes needed.

## Adding a new template

1. Create `src/templates/<Name>Template.vue`
2. Nothing else — `import.meta.glob` auto-discovers it

Naming convention: `wolfy` maps to `WolfyTemplate.vue`.

## Performance at scale

Every casino config and template is a separate async chunk. The registry holds only function references — nothing loads until needed. A visitor downloads exactly the active casino's config and template, nothing else. Adding casino #101 doesn't affect anyone visiting casino #1.

## Section config shape

The API returns sections as a flat array. The front-end config controls the rest:

```ts
sections: {
  [id: string]: {
    visible?: boolean
    // default true
    order?: number
    // lower = first
    overrides?: Record<string, unknown>
    // overrides API fields
    component?: () => Promise<{ default: Component }>
    // custom section
  }
}
```

## Custom sections

A casino can add a section that doesn't exist in shared code:

```ts
sections: {
  promo: {
    order: 3,
    component: () => import('./sections/PromoSection.vue'),
  }
}
```

`HomeView` detects `component` and renders it via `defineAsyncComponent`. The component is pre-resolved in the casino store so the view just uses `<component :is="section.component" />`. Custom sections are sorted and filtered the same way as standard ones.

## API contract isolation

Templates never access raw API data directly. The casino store exposes computed properties (`name`, `menu`, `theme`, `sidebar`) that templates consume. If the API shape changes, only the store needs updating. Templates are unaffected

## Trade-offs

**Query param for tenant** (`?tenant=wolfy`) is fine for this task. In production it would be subdomain-based, resolved at the CDN level.

**Theme via CSS variables** on the template root. Better approach: set them on `document.documentElement` in the store so templates are free of dynamic styles entirely.

**Manual casino registry** is explicit and type-safe. At 100+ casinos, `import.meta.glob` could replace it the same way templates work, trading explicitness for zero maintenance.

**Explicit override fields** — `overrides` only applies `title` and `body` explicitly, not a blind spread. Safe and type-correct, but if `Section` grows a new field it needs to be wired manually. A blind spread would pick it up automatically but loses type safety.

**One template vs many** — Wolfy and Pantaloo could technically be one template with a layout flag. They're kept separate intentionally. Each template is a distinct layout archetype. Merging them means every new layout requires modifying an existing file, which breaks the extension point. The header is duplicated across templates. A shared `CasinoHeader.vue` component would clean that up.

**No tests** — I'd cover the sections computed logic (order, visibility, overrides) with Vitest unit tests and add a Playwright smoke test per casino.
