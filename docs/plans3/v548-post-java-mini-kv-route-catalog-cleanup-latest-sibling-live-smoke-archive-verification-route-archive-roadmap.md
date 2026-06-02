# Node v548 post Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive roadmap

## Goal

Node v548 archives the v547 live-smoke archive verifier route output.

## Cross-Project State

Java and mini-kv do not need to start. This version uses local Fastify inject against the Node app and only captures JSON/Markdown route responses.

Java and mini-kv remain recommended parallel.

## Necessity Proof

- Blocker resolved: v547 exposed the verifier route, but its route output was not yet archived with digests.
- Later consumer: v549 can verify these archive files.
- Existing archive cannot be reused: v541 archived the latest sibling evidence report, not the live-smoke archive verifier route.
- Growth stop condition: write JSON, Markdown, and summary only. Do not add verifier logic in this archive version.

## Archived Evidence

- `e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.json`
- `e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.md`
- `e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v548-archive-summary.json`

## Validation Plan

- Generate route output through Fastify inject.
- Verify JSON and Markdown status codes are 200.
- Verify ready=true and 24/24 checks.
- Run focused route tests, typecheck, and build.
- Remove temporary generator and `dist` before commit.
