# Node v516 Java / mini-kv route catalog cleanup fresh baseline batch closeout archive verification route

v516 exposes the v515 batch closeout archive verifier through the cleanup audit route group.

## Route

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-archive-verification`

The route supports JSON and `?format=markdown`.

## Result

- Audit route count moves from 214 to 215.
- Java / mini-kv domain route count moves from 50 to 51.
- The cleanup handoff route group moves from 16 to 17 routes.
- The verifier remains read-only and execution is not allowed.

## Snapshot Note

The verifier source report intentionally records the v512 closeout snapshot as 213/49/15. The live catalog after v516 is 215/51/17.

## Next Direction

v517 should start a stabilization closeout instead of extending the same archive chain.
