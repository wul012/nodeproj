# Node v465 code health route group evidence

## Summary

Node v465 updates the managed-audit sandbox code-health pass to use the actual precheck route group as route registration evidence.

## What Changed

- Added `routeGroupFile` evidence to code-health regression coverage.
- Stopped treating `...managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes` in the central route table as the registration proof.
- Kept the existing `routeRegisteredThroughTable` and `markdownRendererRegisteredThroughTable` booleans stable for downstream reports.

## Cross-Project Check

- Java is clean at v198 / `64d1dfdb`.
- mini-kv is clean at v184 / `506ff62`.
- Node v465 does not need fresh Java or mini-kv evidence.

## Validation

- Focused code-health/catalog tests passed: 3 files / 6 tests.
- Typecheck passed.
- Build passed.

## Boundary

v465 does not add routes, change API responses, start sibling services, read credentials, open managed-audit connections, or create new approval/evidence chains.
