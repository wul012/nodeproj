# 411. Node v406 Java / mini-kv runtime execution live-read gate

## Files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate.test.ts`
- `src/routes/auditJsonMarkdownRoutes.ts`

## Flow

`loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate(...)` replays Node v405 value validation, reads the three canonical approval inputs, and turns the approved packet into two service targets:

- Java: owner, loopback host/port, GET health path, cleanup rule.
- mini-kv: owner, loopback host/port, GET health path, cleanup rule.

The service then creates a digest-backed gate record and checks that:

- v405 is ready and has no blockers.
- all canonical inputs are still present and valid.
- approval correlation and runtime window bindings remain stable.
- targets are loopback-only, concrete-port, GET-only, and owner-scoped.
- cleanup proof is required.
- upstream actions, credential reads, raw endpoint parsing, managed audit, writes, service start/stop, and active shard routing remain closed.

The route exposes the profile as JSON or Markdown at:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate`

## Boundary

v406 opens only the next gate record. It does not run the smoke and does not start or stop Java / mini-kv. Runtime smoke is intentionally deferred to v407 so PID/port ownership and cleanup proof can be handled as a separate execution artifact.
