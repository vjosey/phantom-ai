# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Dialog

## Current Goal

- Implement `context/feature-specs/04-project-dialog.md`

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

- Project Dialogs & Editor Home (`context/feature-specs/04-project-dialogs.md`):
  - `lib/mock-projects.ts` — `MockProject` interface + `MOCK_PROJECTS` array (2 owned, 1 shared).
  - `hooks/use-project-dialogs.ts` — `useProjectDialogs` hook managing dialog type, active project, name input, loading state; `generateSlug()` helper.
  - `components/editor/project-dialogs-context.tsx` — `ProjectDialogsContext` + `useProjectDialogsContext()` consumer hook.
  - `components/editor/create-project-dialog.tsx` — name input with live slug preview, Enter submits.
  - `components/editor/rename-project-dialog.tsx` — prefilled input, auto-focus, current project name in description, Enter submits.
  - `components/editor/delete-project-dialog.tsx` — destructive confirm, no input, destructive button style.
  - `components/editor/editor-home.tsx` — center home screen: heading, description, "New Project" button wired to Create dialog.
  - `components/editor/project-sidebar.tsx` — project list in My Projects/Shared tabs; rename/delete icon buttons (hover-reveal) shown only for owned projects; "New Project" button opens Create dialog.
  - `components/editor/editor-shell.tsx` — provides `ProjectDialogsContext`, renders all three dialogs, adds mobile backdrop scrim (closes sidebar on tap).
  - `app/editor/page.tsx` — renders `<EditorHome />`.
  - Verified: `tsc --noEmit`, `eslint`, and `next build` all pass clean.

- Auth (`context/feature-specs/03-auth.md`):
  - `app/layout.tsx` — `ClerkProvider` uses Clerk's `dark` base theme (`@clerk/ui/themes`) with `variables` overridden to reference the app's existing CSS custom properties (`var(--card)`, `var(--foreground)`, `var(--primary)`, `var(--destructive)`, `var(--muted)`, `var(--input)`, `var(--radius)`, etc.) — no hardcoded colors.
  - `proxy.ts` — public routes are derived from `NEXT_PUBLIC_CLERK_SIGN_IN_URL`/`NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars (not hardcoded paths); everything else is protected via `auth.protect()`. `/__clerk/:path*` matcher retained.
  - `components/auth/auth-screen.tsx` — shared two-panel layout: left panel (`hidden lg:flex`) with compact wordmark, one-line tagline, and a short text-only feature list; right panel centers the Clerk form. No gradients, hero sections, feature cards, or scroll. Small screens show form only. Used by `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`.
  - `app/page.tsx` — now just `redirect("/editor")`; unauthenticated requests never reach it because `/` is protected by the proxy and `auth.protect()` redirects them to sign-in first.
  - Recreated `app/editor/layout.tsx` + `app/editor/page.tsx` (placeholder canvas) as the authenticated redirect target, using `components/editor/editor-shell.tsx` (sidebar open/close state) to compose `EditorNavbar` + `ProjectSidebar`.
  - `components/editor/editor-navbar.tsx` — right section now renders Clerk's `UserButton` for profile/logout.
  - Removed the now-unused `@import "@clerk/ui/themes/shadcn.css"` from `globals.css` (superseded by the `dark` theme + variable overrides).
  - Verified: `tsc --noEmit`, `eslint`, `next build` all pass clean; manually confirmed `/` and `/editor` 307-redirect unauthenticated requests to `/sign-in` (with `redirect_url`), and `/sign-in`/`/sign-up` both return 200.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- `ui-context.md`'s custom Tailwind utility names (`bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.) are not yet wired up as Tailwind theme tokens — only shadcn's standard semantic variables (`background`, `foreground`, `primary`, `border`, ...) exist today. The variable names in the table (`--bg-base`, `--text-primary`, `--border-default`, `--accent-primary`, ...) don't directly produce the example utility class names listed in the same doc, so the exact key naming needs to be decided before building that layer out. Out of scope for `01-design-system.md`; resolve before any component styling work that needs those specific utility names.

## Architecture Decisions

- Project is dark-only: `globals.css` defines one `:root` theme (no `.dark` class variant, no light fallback).

## Session Notes

- Add context needed to resume work in the next session.
