# Feature Flags

## Registry

- **Registry file:** `flags/registry.json`
- **Loader module:** `src/config/featureFlags.ts`

The registry is the source of truth for flag metadata (owner, creation date, expiry, defaults, and removal decision). The loader reads environment variables and exposes typed booleans and metadata.

## Toggling flags

Add overrides in `.env.local` (Next.js loads it automatically), then restart the dev server:

```env
NEXT_PUBLIC_ENABLE_NEW_NAVBAR=true
NEXT_PUBLIC_SHOW_POPULAR_TAGS=false
NEXT_PUBLIC_USE_V2_API_CLIENT=true
```

## Flags in this repo

- **ENABLE_NEW_NAVBAR** — Toggle the modern navbar UI.
- **SHOW_POPULAR_TAGS** — Show or hide the Popular Tags sidebar on the home page.
- **USE_V2_API_CLIENT** — Select the v2 internal API client (legacy v1 path is kept as dead code until removal).

## App Router / Client Components note

If you need to use a flag inside a client component, only read from the `flags` object and ensure the environment variable is prefixed with `NEXT_PUBLIC_`. This repo already follows that convention.

## Removal

When a flag is no longer needed:

1. Remove it from `flags/registry.json`.
2. Remove the check in `src/config/featureFlags.ts`.
3. Delete the conditional code path and the env var entry.
