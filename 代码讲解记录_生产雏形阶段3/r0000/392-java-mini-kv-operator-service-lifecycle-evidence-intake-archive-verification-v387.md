# 392 Java / mini-kv operator service lifecycle evidence intake archive verification v387

## Version progress

Node v387 verifies the Node v386 operator service lifecycle evidence intake archive.

- Source archive root: `e/386`
- Source route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake`
- Replay inputs: Java v160, mini-kv v151, and mini-kv v150 frozen historical fixtures
- Result: ready for archive verification, not ready for runtime live read

## Key files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationRenderer.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationTypes.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerification.test.ts`
- `docs/plans3/v387-post-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-roadmap.md`

## Flow

1. The service reads the v386 JSON, Markdown, summary, browser snapshot, HTML, screenshot, explanation, code walkthrough, and indexes.
2. It parses the v386 intake state and confirms Java v160, mini-kv v151, and mini-kv v150 evidence versions.
3. It replays v386 from frozen historical fixtures.
4. It verifies the replay still reports `readyForRuntimeLiveReadGate=false`.
5. It verifies mini-kv v151 remains template-only with zero declared operator evidence fields.
6. It emits a v387 archive verification profile for JSON and Markdown routes.

## Boundary result

```text
Archive verification only: true
Starts Java: false
Starts mini-kv: false
Stops Java: false
Stops mini-kv: false
Runtime probe: false
Managed audit connection: false
Credential value read: false
Raw endpoint parsed: false
Active shard prototype: false
Runtime live-read gate: false
```

## Verification result

Focused v387 test passed: 3/3.
Adjacent v386+v387 tests passed.
Typecheck and build passed.
The final archive and smoke checks are recorded under `e/387`.

## Project maturity

v387 closes the archive loop for the v386 lifecycle evidence intake. It makes the next decision plain: Node should wait unless mini-kv provides declared operator-owned service lifecycle evidence, because v151 is still a template and not runtime approval.
