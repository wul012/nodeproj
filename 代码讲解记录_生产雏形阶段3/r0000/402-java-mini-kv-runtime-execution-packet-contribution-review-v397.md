# Node v397 code walkthrough: Java / mini-kv runtime execution packet contribution review

## Entry Point

The v397 route is:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review`

It is registered in `src/routes/auditJsonMarkdownRoutes.ts` and supports the existing JSON / `?format=markdown` audit route pattern.

## Service Split

The implementation stays split across three files:

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview.ts` builds the profile and checks.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewTypes.ts` owns the profile, check, summary, and row types.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewRenderer.ts` renders Markdown.

This keeps the version-specific service from turning into one large file with mixed route, type, and rendering responsibilities.

## Source Evidence Handling

v397 reads the frozen Node v396 archive JSON from:

`e/396/evidence/java-mini-kv-runtime-execution-artifact-upstream-progress-intake-v396-http.json`

That is intentional. Re-running the old v396 service would replay older source gates against newer sibling evidence and could make historical proof drift after Java or mini-kv move forward. The frozen v396 archive is the stable prerequisite.

The new upstream inputs are read through the historical sibling resolver:

- Java v163: `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/163/evidence/java-shard-readiness-runtime-execution-packet-contribution-v163.json`
- mini-kv v154: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v154.json`

Focused tests force `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` and assert these resolved paths.

## Runtime Boundary

v397 records Java-side and mini-kv candidate contributions but still keeps runtime blocked:

- `presentRuntimeExecutionArtifactCount=0`
- `missingRuntimeExecutionArtifactCount=6`
- `runtimeExecutionPacketPresent=false`
- `runtimeExecutionPacketExecutable=false`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `executionAttempted=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `activeShardPrototypeEnabled=false`

The review matrix keeps all six rows `crossProjectAccepted=false` until a Node-approved runtime window and one correlated operator approval bind both projects together.

## Verification Focus

The focused test covers:

- successful Java v163 + mini-kv v154 contribution review from frozen historical evidence;
- fail-closed behavior when the Node v396 archive JSON is unavailable;
- JSON and Markdown route output with access-guard headers.
