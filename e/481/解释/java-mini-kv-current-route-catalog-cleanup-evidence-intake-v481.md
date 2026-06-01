# v481 Java / mini-kv current route catalog cleanup evidence intake

Node v481 freezes and reads the current clean sibling evidence after the v480 closeout.

## Inputs

- Java v211 consumer handoff bundle evidence and static fixture.
- Java v214 consumer handoff bundle integrity evidence.
- mini-kv v199 versioned closeout fixture.
- mini-kv v200 closeout audit fixture, frozen from the rolling `SHARDJSON` output under a Node historical alias.
- mini-kv v200 command archive note proving build, focused CTest, full CTest, and TCP smoke passed.

## Result

The intake reports 6/6 files present and 18/18 checks passed. It also verifies forced historical fallback so GitHub-style runners do not need live sibling checkouts.

## Validation

- `npm test -- test/javaMiniKvRouteCatalogCleanupCurrentEvidence.test.ts`
- `npm run typecheck`
- `npm run build`

## Boundaries

This version does not start Java or mini-kv, does not mutate sibling state, does not open runtime execution, and does not make mini-kv order or audit authoritative.
