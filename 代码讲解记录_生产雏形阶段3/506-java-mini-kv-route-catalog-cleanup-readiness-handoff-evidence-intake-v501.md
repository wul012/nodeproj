# Node v501 code walkthrough: readiness handoff evidence intake

## Version Progress

v501 starts the final five-version segment in this fifteen-version run. Unlike the queue-only idea, the sibling projects had clean tagged evidence available, so v501 consumes that instead of waiting.

## Why This Version Exists

Java advanced from v224 to clean v231, then began dirty v232 work. mini-kv advanced to clean v212, then began dirty v213 work. Node needs to consume the clean window while explicitly rejecting the dirty next window.

## Evidence Inputs

The Java side contributes:

- v225 readiness handoff JSON;
- v225 readiness handoff fixture;
- v226 snapshot freeze;
- v227 historical compatibility;
- v228 integrity;
- v229 route inventory;
- v230 evidence chain;
- v231 ops evidence alignment.

The mini-kv side contributes:

- `fixtures/release/shard-readiness-v211.json`;
- `fixtures/release/shard-readiness-v212.json`.

## Code Flow

`loadJavaMiniKvRouteCatalogCleanupReadinessHandoffEvidence()` builds historical file references, parses the Java handoff and guard files, parses mini-kv retention fixtures, then evaluates sixteen checks.

The service uses the same historical evidence resolver as the previous intakes. The forced fallback test sets `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, proving Node can reproduce the intake from copied fixtures under `fixtures/historical/sibling-workspaces`.

## Checks

The checks prove:

- all ten files are present;
- Java v225 handoff endpoint, fixture endpoint, digest counts, guard evidence count, and boundary are stable;
- Java v225 fixture is read-only, GET-only, and blocks runtime authority;
- Java v226-v231 guards are passed, read-only, and execution-disabled;
- mini-kv v211-v212 are sequential, read-only, and versioned;
- dirty sibling worktrees are excluded;
- runtime authority remains closed.

## Boundary Decisions

v501 does not add a route. It also does not consume Java v232-like work or mini-kv v213-like work. The next dirty sibling changes can keep moving in parallel, but Node waits for clean tags before consuming them.

## What v502 Can Safely Do

v502 can expose this intake as a report route and update catalog counts from 209 to 210.
