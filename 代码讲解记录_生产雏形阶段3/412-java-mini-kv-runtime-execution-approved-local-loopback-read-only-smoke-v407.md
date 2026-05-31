# 412. Node v407 Java / mini-kv runtime execution approved local-loopback read-only smoke

## Files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke.test.ts`
- `src/routes/auditJsonMarkdownRoutes.ts`

## Flow

`loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke(...)` first replays Node v406 live-read gate. If `UPSTREAM_PROBES_ENABLED=false`, it returns closed-window skipped records and does not contact Java or mini-kv.

When the approved window is open, it runs only two read-only targets:

- `orderPlatform.health()` for Java actuator health.
- `miniKv.health()` for mini-kv TCP inline `HEALTH`.

The route records attempted/pass/fail counts, a stable smoke digest, and checks that probes are loopback-only, read-only, no-write, no managed audit, no credential/raw endpoint, and no service lifecycle operation from the route.

## Boundary

v407 is pass evidence capture, not production execution. Service start/stop belongs to the outer smoke orchestration and is archived separately as cleanup proof. The route itself never starts or stops Java / mini-kv.
