# Node v507 post Java / mini-kv route catalog cleanup fresh baseline evidence intake roadmap

## Goal

Node v507 consumes the next clean sibling evidence baseline after v505.

## Cross-Project State

Java and mini-kv are recommended parallel.

- Java clean evidence now reaches v239.
- mini-kv clean evidence now reaches v220.
- Node v507 freezes Java v232-v239 and mini-kv v213-v220 under Node historical fixtures before consuming them.

## Necessity Proof

- Blocker resolved: Node v505 stopped at Java v231 and mini-kv v212 because later sibling work was not yet clean.
- Later consumer: v508 can expose a report route over this fresh baseline.
- Existing routes are not enough: v502 reports only the older Java v225-v231 / mini-kv v211-v212 baseline.
- Growth stop condition: this intake starts the v507-v511 evidence/report/archive/verifier/route chain, then later versions should batch-close it instead of duplicating intake routes.

## Validation Plan

- Run focused evidence tests with normal resolution.
- Force `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` in the same test file.
- Run typecheck before commit.
- Run full Vitest with a capped worker count to avoid runaway local test concurrency.
- Run build, then remove generated `dist` before commit.
- Leave no background service running.
