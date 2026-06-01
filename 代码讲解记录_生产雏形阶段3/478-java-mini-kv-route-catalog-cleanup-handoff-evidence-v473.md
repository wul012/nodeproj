# 478 Java / mini-kv route catalog cleanup handoff evidence v473

## Version Progress

Node v473 starts the post-v472 sibling handoff intake batch by adding a typed, fallback-safe reader for Java and mini-kv route catalog cleanup evidence.

## Key Files

- `src/services/javaMiniKvRouteCatalogCleanupHandoffEvidence.ts`
- `test/javaMiniKvRouteCatalogCleanupHandoffEvidence.test.ts`
- `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-probe-plan-v202.fixture.json`
- `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/206/evidence/java-shard-readiness-v1-contract-endpoint-pair-integrity-v206.json`
- `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v191.json`
- `fixtures/historical/sibling-workspaces/mini-kv/e/192/解释/说明.md`

## Core Flow

The service resolves the real sibling evidence path through `historicalEvidenceReportUtils`. When `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, the same reader resolves the frozen copy under `fixtures/historical/sibling-workspaces`.

It extracts the Java v202 GET-only probe plan, the Java v206 endpoint pair integrity evidence, the mini-kv v191 handoff fixture, and snippets from the mini-kv v192 audit note. The service then reports 16 boolean checks and a compact summary for later route/report versions.

## Validation

- Focused Vitest passed for real-path and forced-fallback resolution.
- Typecheck passed.
- Build passed.

## Maturity

This version keeps Node independent from dirty sibling working trees while still making the latest tagged Java and mini-kv evidence available for later Node versions.
