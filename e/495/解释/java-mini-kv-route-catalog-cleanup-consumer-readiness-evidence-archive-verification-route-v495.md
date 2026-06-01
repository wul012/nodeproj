# Node v495 Java / mini-kv route catalog cleanup consumer readiness evidence archive verification route

v495 exposes the v494 archive verifier as a JSON/Markdown audit route.

## Route

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification`

## Result

The cleanup route group now has 9 routes. Total JSON/Markdown audit routes are 207, and Java/mini-kv domain routes are 43.

## Boundary

The route reads Node archive files only. It does not start Java, start mini-kv, mutate upstream state, or open runtime execution authority.

## Next Step

v496 should close the v491-v495 consumer-readiness chain as a batch before starting the next five-version segment.
