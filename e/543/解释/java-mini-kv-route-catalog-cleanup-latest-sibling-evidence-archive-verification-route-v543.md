# Node v543 Java / mini-kv route catalog cleanup latest sibling evidence archive verification route

v543 exposes the v542 latest sibling evidence archive verifier through the cleanup handoff route group.

## Route

- JSON: `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification`
- Markdown: `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification?format=markdown`

## Result

The route returns ready archive verification. Current audit route catalog counts are 225 total routes, 61 Java / mini-kv routes, and 27 cleanup handoff routes.

## Boundary

This route exposes Node-local archive verification only. It does not start Java, start mini-kv, mutate upstream state, open runtime execution, or connect managed audit.

## Next Direction

The next meaningful maturity step is a live-smoke preflight that writes explicit Java and mini-kv startup commands, ports, service ownership, and cleanup requirements before starting upstream services.
