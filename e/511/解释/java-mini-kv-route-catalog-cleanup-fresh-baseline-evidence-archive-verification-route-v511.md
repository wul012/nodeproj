# Node v511 Java / mini-kv route catalog cleanup fresh baseline evidence archive verification route

v511 exposes the v510 archive verifier through the cleanup audit route group.

## Route

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification`

The route supports JSON and `?format=markdown`.

## Result

- Audit route count moves from 212 to 213.
- Java / mini-kv domain route count moves from 48 to 49.
- The cleanup handoff route group moves from 14 to 15 routes.
- The verifier remains read-only and execution is not allowed.

## Boundary

The route reads Node archive files only. It does not start Java, start mini-kv, mutate sibling state, connect managed audit, or authorize runtime execution.

## Next Direction

v512 should batch-close the v507-v511 fresh baseline chain instead of adding another route for the same archive pair.
