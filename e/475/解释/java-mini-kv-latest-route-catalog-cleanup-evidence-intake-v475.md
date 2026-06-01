# Node v475 Java / mini-kv latest route catalog cleanup evidence intake

## Summary

Node v475 freezes the latest completed Java and mini-kv route catalog cleanup handoff evidence.

## What Changed

- Added `src/services/javaMiniKvRouteCatalogCleanupLatestEvidence.ts`.
- Added focused tests for normal and forced historical fallback resolution.
- Added frozen historical fixtures for Java v207, Java v208, the Java v208 endpoint catalog fixture, and mini-kv v193.

## Evidence Consumed

- Java v207: controller split from `OpsShardReadinessController` into `OpsShardReadinessV1ContractController`, preserving 6 v1 routes.
- Java v208: endpoint catalog with 6 contract artifacts and 7 registry pairs, included in Ops evidence probes.
- mini-kv v193: route catalog cleanup closeout handoff audit freeze, based on v192 and preserving the Node v472 window.

## Cross-Project Check

- Java is at v208 / `ff116a92`, with v209-like snapshot work in progress.
- mini-kv is at v193 / `8046f37`, with v194-like work in progress.
- Node v475 consumes frozen tagged evidence only, so Java and mini-kv can continue in parallel.

## Validation

- Focused Vitest: passed, 1 file / 2 tests.
- Forced historical fallback: passed inside the focused test.
- Typecheck: passed.
- Build: passed.

## Boundary

v475 does not add routes, approvals, credentials, write behavior, runtime execution, Java service startup, or mini-kv service startup.
