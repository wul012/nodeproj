# Node v538 post Java / mini-kv route catalog cleanup latest sibling evidence intake roadmap

## Goal

Node v538 consumes the latest clean Java and mini-kv sibling evidence after the v537 final closeout.

## Three-Project State

Node is clean at v537. Java is clean at v274. mini-kv is clean at v247.

Java and mini-kv are recommended parallel. Node does not require either project to wait for this version, does not request a new upstream file, and does not start their services.

## Necessity Proof

- Blocker resolved: after v537, Node had a mature local final closeout but had not frozen the latest Java v274 and mini-kv v247 evidence.
- Later consumer: v539 can expose a report route only if a public JSON/Markdown endpoint is useful; otherwise the intake can remain internal.
- Existing reports are not enough: v537 intentionally consumed Node-local closeout evidence only, while v507 consumed older Java v239 and mini-kv v220 evidence.
- Growth stop condition: v538 adds one internal intake and one test file. Do not start another report/archive/verifier chain unless a public route is actually needed.

## Validation Plan

- Freeze Java v274 receipt and explanation under Node historical fixtures.
- Freeze mini-kv v247 rolling `shard-readiness.json` as `shard-readiness-v247-node-v538.json`, plus its command explanation.
- Run focused intake tests with normal resolution.
- Force `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` in the focused test file and verify all resolved paths are under `fixtures/historical/sibling-workspaces`.
- Run typecheck and build.
- Remove generated `dist` before commit.
- Leave no background service running.
