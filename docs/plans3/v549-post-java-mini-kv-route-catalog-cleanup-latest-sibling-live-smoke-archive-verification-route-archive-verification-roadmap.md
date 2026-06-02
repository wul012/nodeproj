# Node v549 post Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification roadmap

## Goal

Node v549 verifies the v548 archive of the v547 live-smoke archive verifier route.

## Cross-Project State

Java and mini-kv do not need to start. This version reads Node archive files only.

Java and mini-kv remain recommended parallel.

## Necessity Proof

- Blocker resolved: v548 archived the route output, but no typed verifier had checked the archive digests and response fields.
- Later consumer: v550 can expose this archive verification as a route.
- Existing verifier cannot be reused: v546 verifies v545 live-smoke archive files, while v549 verifies v548 route archive files.
- Growth stop condition: verify these three files only, then expose one route in v550.

## Scope

- Add a typed route archive verifier service.
- Add a Markdown renderer.
- Add a focused test.
- Do not start Java, mini-kv, or an HTTP server.

## Validation Plan

- Focused v549 test.
- Adjacent route/archive focused tests.
- TypeScript typecheck.
- Build before commit.
- Remove `dist` before commit.
