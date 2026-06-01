# Node v480 Java / mini-kv route catalog cleanup evidence batch closeout

## Summary

Node v480 closes the v473-v479 batch with full validation.

## What Closed

- v473-v474: frozen handoff evidence and report route.
- v475-v476: latest tagged evidence and report route.
- v477-v479: route output archive, archive verifier, and verifier route.
- Route catalog cleanup handoff group now has 3 read-only routes.

## Cross-Project Check

- Java is at v214 / `4111cee4`, clean and pushed.
- mini-kv is at v197 / `e559708`, clean and pushed.
- Node v480 does not consume those new clean tags; they are the recommended start for the next Node batch.

## Validation

- Focused cleanup/catalog tests passed.
- Full Vitest passed in four `--maxWorkers=4` shards: 398 files / 1230 tests.
- Typecheck: passed.
- Build: passed.
- HTTP-style smoke: three cleanup handoff routes returned 200; verifier ready=true with 16/16 checks.

## Boundary

v480 is closeout only. It does not add routes, approvals, credentials, write behavior, runtime execution, Java service startup, or mini-kv service startup.
