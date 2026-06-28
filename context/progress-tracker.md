# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Design system & UI primitives

## Current Goal

- Implement `context/feature-specs/01-design-system.md`: install/configure shadcn/ui, add UI primitives, install lucide-react, create `lib/utils.ts` cn() helper, match existing dark theme.

## Completed

- Design system & UI primitives (`context/feature-specs/01-design-system.md`):
  - Installed and configured shadcn/ui (`components.json`, base color `neutral`, CSS variables enabled).
  - Added components: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea (`components/ui/*`, untouched after generation).
  - Installed `lucide-react`.
  - `lib/utils.ts` created with `cn()` helper (clsx + tailwind-merge).
  - `app/globals.css` rewritten to a single dark theme (no light/`.dark` toggle) using the hex values from `context/ui-context.md`'s color table, mapped onto shadcn's semantic variables (`--background`, `--foreground`, `--primary`, etc.).
  - Verified: `tsc --noEmit` and `next build` both pass clean; no light-mode tokens remain in `globals.css`.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- `ui-context.md`'s custom Tailwind utility names (`bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.) are not yet wired up as Tailwind theme tokens — only shadcn's standard semantic variables (`background`, `foreground`, `primary`, `border`, ...) exist today. The variable names in the table (`--bg-base`, `--text-primary`, `--border-default`, `--accent-primary`, ...) don't directly produce the example utility class names listed in the same doc, so the exact key naming needs to be decided before building that layer out. Out of scope for `01-design-system.md`; resolve before any component styling work that needs those specific utility names.

## Architecture Decisions

- Project is dark-only: `globals.css` defines one `:root` theme (no `.dark` class variant, no light fallback).

## Session Notes

- Add context needed to resume work in the next session.
