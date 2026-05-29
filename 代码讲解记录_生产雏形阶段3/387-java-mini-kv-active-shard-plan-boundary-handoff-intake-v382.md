# Node v382 code walkthrough: Java / mini-kv active shard plan boundary handoff intake

## Version goal

v382 consumes the next frozen upstream handoff after Node v381:

- Java v158: active shard plan boundary handoff.
- mini-kv v149: frozen consumer handoff.
- mini-kv v148: supporting frozen active plan source referenced by v149.

It is not a live-read gate. It does not start Java or mini-kv, does not open a managed audit connection, does not parse raw endpoint values, and does not enable the active shard prototype.

## Main files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.test.ts`
- `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/158/evidence/java-shard-readiness-active-shard-plan-handoff-v158.json`
- `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v148.json`
- `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v149.json`

## Flow

1. Load the Node v381 archive JSON from `e/381/evidence/...v381-http.json`.
2. Resolve Java v158 and mini-kv v149 through `historicalEvidenceResolver`.
3. Force the mini-kv v149 handoff to use a versioned frozen fixture path, not `fixtures/release/shard-readiness.json`.
4. Verify mini-kv v148 is present because v149 names it as the frozen source for the consumer handoff.
5. Build a stable intake digest with `sha256StableJson`.
6. Fail closed if any boundary check is false.
7. Expose JSON and Markdown from the audit route table.

## Important checks

- Java v158 must be read-only, `executionAllowed=false`, `activeShardPrototypeEnabled=false`, and `liveReadAllowed=false`.
- Java v158 must point back to Java v157, Node v380, and Node v381.
- Java v158 must keep active prototype authority with the mini-kv plan.
- mini-kv v149 must be `frozen-evidence-handoff-read-only`.
- mini-kv v149 `consumerHandoff` must be `frozen-evidence-only` and point to `fixtures/release/shard-readiness-v148.json`.
- mini-kv v149 must require a future live-read gate before runtime probing.
- mini-kv v149 and v148 must keep router activation, write routing, service starts, and execution disabled.
- All consumed inputs must resolve to Node historical fixtures.

## Route

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake?format=markdown
```

## Archive

v382 writes:

- `e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-http.json`
- `e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-http.md`
- `e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-summary.json`
- `e/382/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382-browser-snapshot.md`
- `e/382/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382.html`
- `e/382/图片/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382.png`
- `e/382/解释/java-mini-kv-active-shard-plan-boundary-handoff-intake-v382.md`

## Next step

Node v383 should archive-verify v382. Java and mini-kv can continue in parallel unless they specifically need the v382 digest as a downstream receipt.
