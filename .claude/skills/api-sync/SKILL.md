---
name: api-sync
description: Use when calling a NestJS backend endpoint from Marketing or Admin, when a field from packages/api-client/src/generated looks wrong or missing, or after being told the backend API changed shape
---

# API Sync (Web)

## Overview

`backend/` is a **separate repo** — this repo cannot see NestJS source code, only its published OpenAPI schema. All request/response types under `packages/api-client/src/generated/` are machine-generated from that schema via `openapi-typescript`. They are not hand-authored and must never be hand-edited.

## When to Use

- Adding a new API call from `apps/marketing` or `apps/admin`.
- A generated type is missing a field you know the backend returns, or has a field that no longer matches reality.
- Someone says "backend changed the shape of X."
- `tsc` fails on a field inside `packages/api-client/src/generated/**` after a backend change.

## The Rule

**Never hand-edit anything under `packages/api-client/src/generated/`.** If a type is wrong, the fix is regenerating it from the backend's current OpenAPI schema, not patching the generated file.

**Never invent a field or endpoint shape that isn't in the generated types.** If you need a field the generated types don't have, that means the backend hasn't published it yet — surface this to the user instead of guessing the shape.

## Workflow

1. Get the backend's current OpenAPI schema (`@nestjs/swagger` exposes it, typically at `/api-docs-json` or similar — confirm the URL with whoever owns `backend/`, it's not discoverable from this repo).
2. Regenerate: `pnpm --filter @pho-minh/api-client exec openapi-typescript <schema-url-or-file> -o src/generated/schema.ts` (adjust output path to match whatever `packages/api-client/src/generated/` already contains).
3. Run `pnpm turbo run type-check` from the web root. Every place that used a now-removed/renamed field will fail to compile — that's the safety net working, not a bug. Fix each call site; don't suppress with `as any`.
4. Never commit a manual edit to a file under `generated/` — if the generator output looks wrong, the schema or the generator invocation is wrong, not the file.

## Common Mistakes

| Mistake | Why it's wrong |
|---|---|
| Hand-editing a `.ts` file under `generated/` to add a missing field | Next regeneration silently wipes the edit; the type still lies about what the backend actually returns |
| Casting a response `as SomeInventedType` instead of regenerating | Defeats the entire point of `ky` + OpenAPI codegen described in the FE tech doc §5 — type safety becomes fake |
| Assuming a field exists because "it probably does" | `backend/` is a repo you cannot read from here — only the published schema is truth |
