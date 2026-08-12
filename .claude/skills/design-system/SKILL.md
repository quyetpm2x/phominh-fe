---
name: design-system
description: Use when writing or editing any styled UI in apps/marketing, apps/admin, or packages/ui, before choosing a color, spacing, or font value
---

# Design System (Web)

## Overview

All brand colors, spacing, and typography live in `packages/design-tokens/src/{colors,spacing,typography}.ts`, consumed via CSS variables in `packages/ui/src/styles/theme.css` and mapped into Tailwind by `packages/ui/tailwind-preset.js`. **Never write a raw hex code, arbitrary spacing value, or font-family string directly in component code.**

## The Rule

If a color/spacing/font value you need isn't already a token, that is a signal to add it to `packages/design-tokens` first — not to inline a value that "looks close enough" or "is just this once."

**No exceptions:**
- Not for a one-off status badge color.
- Not for "the mockup shows a slightly different shade."
- Not for admin-only UI that "nobody will notice."
- Not for a quick prototype — prototypes become production code.

## Correct Pattern

```tsx
// ❌ Wrong — invented hex value, bypasses the token system
<div style={{ color: '#2D71E0' }}>

// ✅ Right — use the Tailwind class mapped to the token
<div className="text-primary">

// ✅ Right — new token needed? Add it to design-tokens first
// packages/design-tokens/src/colors.ts
export const colors = { ..., warning: { DEFAULT: '#E0A62D' } }
// then reference packages/ui/tailwind-preset.js `colors.warning`, use className="text-warning"
```

## Rationalization Table

| Excuse | Reality |
|---|---|
| "It's just one badge, not worth a new token" | Every hardcoded hex is a color that silently drifts from the palette the next time branding changes — `design-tokens` exists precisely so a rebrand is a one-file edit |
| "This shade is basically the same as an existing token" | If it's basically the same, use the existing token — don't add a near-duplicate hex that makes the palette inconsistent |
| "The Figma/design file shows this exact hex" | Translate it into a token addition, not an inline value — same visual result, but now it's governed |
| "Admin panel isn't public-facing, doesn't matter" | Admin still uses `packages/ui` components and the same theme — inconsistency there breaks the shared component library for Marketing too |

## Red Flags — Stop and Use a Token Instead

- Writing `style={{ color: '#...' }}` or `className="text-[#...]"` anywhere in `apps/*` or `packages/ui`.
- Writing a raw `px`/`rem` value instead of a Tailwind spacing class backed by `packages/design-tokens/src/spacing.ts`.
- Writing a font-family string instead of `font-sans` / `font-mono` (backed by `packages/design-tokens/src/typography.ts`).
- Reaching for `packages/ui/tailwind-preset.js` to "just add this one color inline" instead of editing `packages/design-tokens` first.

## Mobile Has Its Own Copy

`web + app/app/` (Mobile) keeps a **hand-copied, not shared** version of these tokens at `src/constants/design-tokens.ts` — this is a documented tradeoff (FE tech doc §1), not a bug. If you change brand colors here, update the mobile copy too; don't assume it updates itself.
