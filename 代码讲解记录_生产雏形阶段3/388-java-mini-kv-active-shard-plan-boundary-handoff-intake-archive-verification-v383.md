# Node v383 code walkthrough: active shard plan boundary handoff intake archive verification

## Version goal

v383 verifies the v382 archive for Java / mini-kv active shard plan boundary handoff intake. It proves the v382 JSON, Markdown, summary, screenshot, explanation, plan, and code walkthrough are present, then replays v382 from frozen historical fixtures.

This version does not start Java or mini-kv, does not perform live reads, does not open managed audit, and does not enable active shard routing.

## Main files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification.test.ts`
- `e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.json`
- `e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.md`

## Flow

1. Load the v382 archive under `e/382`.
2. Parse the v382 HTTP JSON and summary, tolerating UTF-8 BOM because v382 archive files were generated from PowerShell.
3. Check the v382 Markdown, browser snapshot, HTML, screenshot, explanation, plan, indexes, and walkthrough.
4. Replay the v382 intake service from frozen historical fixtures.
5. Require Java v158, mini-kv v149, and mini-kv v148 to resolve through historical fixtures.
6. Build a stable archive verification digest.
7. Expose JSON and Markdown through the audit route table.

## Important checks

- v382 source archive must be ready and have 39/39 checks.
- Java v158 and mini-kv v149/v148 versions must match the archived intake.
- v382 must have used frozen historical snapshots.
- v382 and replay must keep active shard prototype disabled.
- Replay must keep live read behind a separate gate.
- v383 must not start services, mutate sibling state, open managed audit, read credential values, or parse raw endpoint URLs.

## Route

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification?format=markdown
```

## Archive

v383 writes:

- `e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.json`
- `e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.md`
- `e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-summary.json`
- `e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-browser-snapshot.md`
- `e/383/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383.html`
- `e/383/图片/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383.png`
- `e/383/解释/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383.md`

## Next step

Node should pause after v383 unless a new frozen evidence set arrives or a live-read gate plan is explicitly requested with service startup, ports, ownership, smoke target, fail-closed behavior, and cleanup.
