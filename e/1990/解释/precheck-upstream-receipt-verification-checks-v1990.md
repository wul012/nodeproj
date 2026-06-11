# v1990 checks

This version moves readiness check construction into `managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationPolicy.ts`.

The policy checks still require Node v245 readiness, Java v99 readiness, mini-kv v108 readiness, aligned counts, aligned field names, aligned timeout, closed credential boundary, closed connection boundary, closed write boundary, closed auto-start boundary, route quality, and disabled upstream actions.
