# Node v549 explanation: latest sibling live smoke archive verification route archive verification

v549 verifies the v548 route archive files.

The verifier reads:

- `e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.json`
- `e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.md`
- `e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v548-archive-summary.json`

It checks JSON and Markdown were both 200, the archived verifier is ready, 24/24 checks passed, route counts are still 226/62/28, SHA-256 digests match, and runtime authority remains closed.

Validation completed:

- focused v549 test;
- TypeScript typecheck.

Next step: v550 stabilizes the extended closeout route-count assertion after v547 CI; v551 can expose this verifier through the cleanup route group.
