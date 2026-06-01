# Node v473 Java / mini-kv route catalog cleanup handoff evidence

## Summary

Node v473 freezes and reads the newest completed Java and mini-kv route catalog cleanup handoff inputs.

## What Changed

- Added `src/services/javaMiniKvRouteCatalogCleanupHandoffEvidence.ts`.
- Added focused tests for live sibling-path resolution and forced historical fixture fallback.
- Added frozen historical fixtures for Java v202, Java v206, mini-kv v191, and the mini-kv v192 explanation note.

## Evidence Consumed

- Java v202 consumer probe plan: 5 read targets, 5 fixture targets, 6 GET-only probe steps, 10 required evidence entries, 8 stop conditions.
- Java v206 endpoint pair integrity: 6 stable v1 contract endpoint pairs, distinct live/fixture endpoints, and no new production route.
- mini-kv v191 handoff: read-only route catalog cleanup handoff, 89 archived Node versions, no historical baseline mutation.
- mini-kv v192 note: confirms the v192 audit over v191 with `executionAllowed=False`.

## Cross-Project Check

- Java is at v206 / `9581a898`, with local v207-like controller split work in progress.
- mini-kv is at v192 / `2f653ed`, with local v193-like work in progress.
- Node v473 consumes frozen evidence only, so Java and mini-kv can continue in parallel.

## Validation

- Focused Vitest: passed, 1 file / 2 tests.
- Forced historical fallback: passed inside the focused test.
- Typecheck: passed.
- Build: passed.

## Boundary

v473 does not add routes, browser-visible pages, approvals, credentials, write behavior, runtime execution, Java service startup, or mini-kv service startup.
