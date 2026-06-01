# Node v479 Java / mini-kv latest route catalog cleanup evidence archive verification route

## Summary

Node v479 exposes the v478 latest evidence archive verifier as JSON and Markdown.

## What Changed

- Added Markdown rendering for the archive verifier.
- Registered the verifier as the third route in the route catalog cleanup handoff group.
- Updated route catalog counts to 50 groups / 201 routes.

## Cross-Project Check

- Java is at v211 / `d57ad648`, with v212-like work in progress.
- mini-kv is at v195 / `adb646e`, with v196-like work in progress.
- Node v479 only exposes Node archive verification, so Java and mini-kv can continue in parallel.

## Validation

- Focused Vitest: passed, 5 files / 11 tests.
- Typecheck: passed.
- Build: passed.
- HTTP-style smoke: all three cleanup handoff routes returned 200; verifier ready=true with 16/16 checks.

## Boundary

v479 adds one read-only archive verification route. It does not start Java, start mini-kv, mutate sibling state, read credentials, or enable runtime execution.
