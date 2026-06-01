# Node v477 Java / mini-kv latest route catalog cleanup evidence report archive

## Summary

Node v477 archives the v476 latest evidence report route output.

## What Changed

- Captured JSON response for `/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-evidence`.
- Captured Markdown response for the same route with `format=markdown`.
- Added an archive summary with SHA-256 digests.

## Cross-Project Check

- Java is at v210 / `9b1ac4d4`, with v211-like work in progress.
- mini-kv is at v194 / `5bd9a3c`, with v195-like work in progress.
- Node v477 only archives v476 route output, so Java and mini-kv can continue in parallel.

## Validation

- HTTP-style capture: passed, JSON 200 and Markdown 200.
- Captured report readiness: true.
- Captured report checks: 16/16.
- Typecheck: passed.
- Build: passed.

## Boundary

v477 does not add routes, approvals, credentials, write behavior, runtime execution, Java service startup, or mini-kv service startup.
