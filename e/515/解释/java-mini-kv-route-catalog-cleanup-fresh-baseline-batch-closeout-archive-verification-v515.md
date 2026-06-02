# Node v515 Java / mini-kv route catalog cleanup fresh baseline batch closeout archive verification

v515 verifies the v514 archived JSON and Markdown outputs for the v513 closeout route.

## Verified Inputs

- `e/514/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-v513-http.json`
- `e/514/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-v513-http.md`
- `e/514/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-v514-archive-summary.json`

## Result

The verifier is ready. It checks archive presence, SHA-256 parity, source report version, ready=true, 14/14 checks, closed versions v507-v511, route snapshot 213/49/15, and closed runtime boundaries.

## Boundary

This verifier reads Node archive files only. It does not start Java, start mini-kv, mutate sibling state, or authorize runtime execution.
