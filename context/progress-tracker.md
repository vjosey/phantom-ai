# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor chrome

## Current Goal

- Implement `context/feature-specs/02-editor-chrome.md`: `editor-navbar.tsx`, `project-sidebar.tsx`, and a reusable dialog pattern (title/description/footer) for future use.

## Completed

- Design system & UI primitives (`context/feature-specs/01-design-system.md`):
  - Installed and configured shadcn/ui (`components.json`, base color `neutral`, CSS variables enabled).
  - Added components: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea (`components/ui/*`, untouched after generation).
  - Installed `lucide-react`.
  - `lib/utils.ts` created with `cn()` helper (clsx + tailwind-merge).
  - `app/globals.css` rewritten to a single dark theme (no light/`.dark` toggle) using the hex values from `context/ui-context.md`'s color table, mapped onto shadcn's semantic variables (`--background`, `--foreground`, `--primary`, etc.).
  - Verified: `tsc --noEmit` and `next build` both pass clean; no light-mode tokens remain in `globals.css`.

- Editor chrome (`context/feature-specs/02-editor-chrome.md`):
  - `components/editor/editor-navbar.tsx` — fixed-height (`h-12`) top navbar, three-section grid layout, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose` based on `isSidebarOpen` prop, dark `bg-background` with `border-b border-border`. Center/right sections are empty placeholders for future content.
  - `components/editor/project-sidebar.tsx` — floating overlay panel (`fixed`, doesn't affect page flow), slides in/out from the left via `translate-x` + `isOpen` prop, header with "Projects" title and close button, shadcn `Tabs` (My Projects / Shared) each with an empty placeholder string, full-width "New Project" button with `Plus` icon pinned to the bottom.
  - `components/editor/editor-dialog.tsx` — reusable dialog pattern wrapping shadcn `Dialog` with `title`, optional `description`, optional `footer`, and `children` slots. Not instantiated anywhere yet — ready for future dialogs to consume.
  - Verified: `tsc --noEmit`, `eslint`, and `next build` all pass clean.

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
