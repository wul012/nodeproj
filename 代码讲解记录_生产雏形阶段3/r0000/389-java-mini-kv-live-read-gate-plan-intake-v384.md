# Node v384 code walkthrough: Java / mini-kv live-read gate plan intake

## Version goal

v384 consumes Java v159 and mini-kv v150 frozen live-read gate plan evidence. It records that both sibling projects now describe the service owner, port, smoke target, fail-closed, and cleanup prerequisites for a future live-read gate.

This version does not start Java or mini-kv, does not run runtime probes, does not open managed audit, and does not enable active shard routing.

## Main files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake.test.ts`
- `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/159/evidence/java-shard-readiness-live-read-gate-plan-v159.json`
- `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v150.json`

## Flow

1. Load the v383 archive verification JSON from `e/383`.
2. Load Java v159 from the Node historical fixture fallback.
3. Load mini-kv v150 from the Node historical fixture fallback.
4. Load mini-kv v149 as the frozen consumer handoff that v150 references.
5. Verify that Java and mini-kv both require an explicit live-read service lifecycle plan.
6. Verify that runtime probe, service start/stop, router activation, write routing, credential reads, and raw endpoint parsing stay disabled.
7. Build a stable intake digest and expose JSON / Markdown through the audit route table.

## Important checks

- v383 must be archive-verified and ready for v384.
- Java v159 must be read-only, execution-blocked, fail-closed, GET-smoke-only, and service-lifecycle-owned outside Node.
- mini-kv v150 must be read-only and prerequisite-only.
- mini-kv v150 must reference frozen v149 consumer handoff instead of rolling current evidence.
- mini-kv v149 must remain read-only and service-free.
- All sibling evidence must resolve through historical fallback snapshots.
- v384 must not start services, mutate sibling state, open managed audit, read credential values, or parse raw endpoint URLs.

## Route

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake?format=markdown
```

## Archive

v384 writes:

- `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-http.json`
- `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-http.md`
- `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-summary.json`
- `e/384/evidence/java-mini-kv-live-read-gate-plan-intake-v384-browser-snapshot.md`
- `e/384/java-mini-kv-live-read-gate-plan-intake-v384.html`
- `e/384/图片/java-mini-kv-live-read-gate-plan-intake-v384.png`
- `e/384/解释/java-mini-kv-live-read-gate-plan-intake-v384.md`

## Next step

Node v385 should archive and verify the v384 intake before any later runtime gate is considered. Live integration stays blocked until service owner, startup responsibility, ports, read-only smoke targets, fail-closed behavior, and cleanup are explicit.
