# Node v474 Java / mini-kv route catalog cleanup handoff evidence report

## Summary

Node v474 exposes the v473 frozen Java / mini-kv handoff evidence through the shared audit JSON/Markdown route system.

## What Changed

- Added a report wrapper and Markdown renderer for the v473 evidence reader.
- Added a dedicated audit route group for route catalog cleanup handoff evidence.
- Updated audit route catalog counts from 49/198 to 50/199.
- Extended the access policy audit-read pattern to cover `/api/v1/audit/java-mini-kv-*`.

## Cross-Project Check

- Java is at v207 / `4ab89d0b`, with v208-like endpoint catalog work in progress.
- mini-kv is at v193 / `8046f37`, with v194-like work in progress.
- Node v474 only exposes frozen v473 evidence, so Java and mini-kv can continue in parallel.

## Validation

- Focused Vitest: passed, 6 files / 15 tests.
- Typecheck: passed.
- Build: passed.
- HTTP-style smoke: JSON 200, Markdown 200, ready=true, 16/16 checks.

## Boundary

v474 adds one read-only audit report route. It does not start Java, start mini-kv, mutate sibling state, read credentials, or enable runtime execution.
