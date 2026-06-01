# 486 Java / mini-kv current route catalog cleanup evidence intake v481

## Version Progress

Node v481 starts the next route-catalog-cleanup evidence batch after v480.

## Key Files

- `src/services/javaMiniKvRouteCatalogCleanupCurrentEvidence.ts`
- `test/javaMiniKvRouteCatalogCleanupCurrentEvidence.test.ts`
- `docs/plans3/v481-post-java-mini-kv-current-route-catalog-cleanup-evidence-intake-roadmap.md`
- `e/481/解释/java-mini-kv-current-route-catalog-cleanup-evidence-intake-v481.md`

## Core Flow

The service resolves six frozen inputs through `historicalEvidenceResolver`: Java v211 bundle evidence, Java v211 fixture, Java v214 integrity evidence, mini-kv v199 closeout fixture, mini-kv v200 frozen audit fixture, and the v200 command archive note.

It normalizes those inputs into small evidence summaries, then checks counts, versions, digests, read-only flags, and runtime boundaries. The v200 rolling output is copied into a versioned Node historical alias so later fallback runs do not read a moving sibling file.

## Validation

- Focused v481 intake test.
- Forced historical fallback inside the focused test.
- Typecheck.
- Build.

## Maturity

v481 is intake only. The next version can expose the same evidence through the existing Java/mini-kv cleanup route group without adding service startup or runtime authority.
