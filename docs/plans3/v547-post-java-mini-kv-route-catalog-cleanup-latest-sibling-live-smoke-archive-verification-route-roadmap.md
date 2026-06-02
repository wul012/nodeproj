# Node v547 post Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route roadmap

## Goal

Node v547 exposes the v546 live-smoke archive verifier through the Java / mini-kv cleanup route group.

## Cross-Project State

Java and mini-kv do not need to start. This version only registers a Node JSON/Markdown route for verified local archive evidence.

Java and mini-kv remain recommended parallel. Node is not waiting for fresh sibling work.

## Necessity Proof

- Blocker resolved: v546 verified v545 files, but downstream consumers still lacked a stable HTTP/Markdown route.
- Later consumer: a v548 route archive can capture this route output.
- Existing route cannot be reused: the v543 route verifies latest sibling evidence, not the v545 live-smoke cleanup proof.
- Growth stop condition: expose one route, then archive it. Do not add another route layer before archiving.

## Route

- JSON: `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification`
- Markdown: `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification?format=markdown`

## Catalog Update

- Total JSON/Markdown routes: `226`
- Java / mini-kv domain routes: `62`
- Cleanup handoff route group routes: `28`

## Validation Plan

- Route focused tests.
- Route catalog tests.
- TypeScript typecheck.
- Build before commit.
- Remove `dist` before commit.
