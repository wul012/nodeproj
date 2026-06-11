# Node v385 code walkthrough: live-read gate plan intake archive verification

## Version goal

v385 verifies the v384 archive for Java / mini-kv live-read gate plan intake. It proves the v384 JSON, Markdown, summary, screenshot, explanation, plan, and code walkthrough are present, then replays v384 from frozen historical fixtures.

This version does not start Java or mini-kv, does not perform runtime probes, does not open managed audit, and does not enable active shard routing.

## Main files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification.test.ts`
- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.json`
- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.md`

## Flow

1. Load the v384 archive under `e/384`.
2. Parse the v384 HTTP JSON and summary, tolerating UTF-8 BOM.
3. Check the v384 Markdown, browser snapshot, HTML, screenshot, explanation, plan, indexes, and walkthrough.
4. Replay the v384 intake service from frozen historical fixtures.
5. Require Java v159, mini-kv v150, and mini-kv v149 to resolve through historical fixtures.
6. Build a stable archive verification digest.
7. Expose JSON and Markdown through the audit route table.

## Important checks

- v384 source archive must be ready and have 46/46 checks.
- Java v159, mini-kv v150, and mini-kv v149 versions must match the archived intake.
- v384 must have used frozen historical snapshots.
- v384 and replay must keep live read and runtime probe disabled.
- v384 and replay must keep active shard prototype disabled.
- v385 must not start services, mutate sibling state, open managed audit, read credential values, or parse raw endpoint URLs.

## Route

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification?format=markdown
```

## Archive

v385 writes:

- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.json`
- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.md`
- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-summary.json`
- `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-browser-snapshot.md`
- `e/385/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385.html`
- `e/385/图片/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385.png`
- `e/385/解释/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385.md`

## Next step

Node should pause after v385 unless operator-owned service lifecycle evidence appears with service owner, startup responsibility, ports, read-only smoke targets, fail-closed behavior, and cleanup.
