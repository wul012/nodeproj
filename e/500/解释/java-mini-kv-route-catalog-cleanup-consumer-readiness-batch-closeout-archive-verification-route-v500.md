# Node v500 Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification route

v500 exposes the v499 archive verifier as a JSON/Markdown route.

## Route

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-archive-verification`

## Result

The current route catalog now has 209 JSON/Markdown audit routes, 45 Java/mini-kv domain routes, and 11 cleanup handoff routes.

## Boundary

The route verifies Node archive files only. It does not start Java, start mini-kv, mutate sibling state, or open runtime execution.

## Next Step

v501 should begin the final five-version segment for this requested fifteen-version run.
