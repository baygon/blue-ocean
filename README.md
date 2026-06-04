# BlueOcean Gaming

White-label casino SPA. Multiple casino brands, one codebase, one build.

Vue 3, Vite, Pinia, TypeScript.

## Run

**Mock API** (terminal 1)
```bash
cd mock-api && npm install && npm start
```

**App** (terminal 2)
```bash
npm install && npm run dev
```

## Casinos

Tenant is resolved from the `?tenant=` query param.

Wolfy: `http://localhost:5173/?tenant=wolfy`

Pantaloo: `http://localhost:5173/?tenant=pantaloo`

## Structure

```
src/
  api/          axios client, API types
  casinos/      per-casino configs, registry
  stores/       auth, casino (Pinia)
  templates/    WolfyTemplate, PantalooTemplate
  views/        HomeView, DummyView
  router/
mock-api/       Express mock API
```

See `ARCHITECTURE.md` for design decisions.
