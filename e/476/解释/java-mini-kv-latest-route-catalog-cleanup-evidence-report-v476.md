# Node v476 Java / mini-kv latest route catalog cleanup evidence report

## Summary

Node v476 exposes the v475 latest frozen Java / mini-kv route catalog cleanup evidence as JSON and Markdown.

## What Changed

- Added a report wrapper and Markdown renderer for the v475 latest evidence reader.
- Added a second route under the existing `java-mini-kv-route-catalog-cleanup-handoff` route group.
- Updated audit JSON/Markdown route catalog counts to 50 groups / 200 routes.

## Cross-Project Check

- Java is at v209 / `7a5c180e`, with v210-like historical compatibility work staged locally.
- mini-kv is at v194 / `5bd9a3c`, with v195-like work in progress.
- Node v476 only exposes frozen v475 evidence, so Java and mini-kv can continue in parallel.

## Validation

- Focused Vitest: passed, 4 files / 9 tests.
- Typecheck: passed.
- Build: passed.
- HTTP-style smoke: handoff JSON 200, latest JSON 200, latest Markdown 200, 16/16 checks.

## Boundary

v476 adds one read-only audit report route. It does not start Java, start mini-kv, mutate sibling state, read credentials, or enable runtime execution.
