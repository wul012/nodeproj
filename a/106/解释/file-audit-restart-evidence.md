# File audit restart evidence

- Service: orderops-node
- Generated at: 2026-05-12T22:45:07.570Z
- Evidence version: file-audit-restart-evidence.v1
- Ready for production audit: false
- Read only: true
- Execution allowed: false

## Runtime

- requestedStoreKind: file
- runtimeStoreKind: file
- storeImplementation: FileBackedAuditStore
- durableAtRuntime: true
- configuredByEnvironment: true
- auditStorePath: D:\nodeproj\orderops-node\output\v106\audit-smoke.jsonl

## Rehearsal

- mode: file-runtime-reload
- writesSyntheticEvent: true
- beforeEventCount: 2
- writtenEventCount: 1
- restoredEventCount: 3
- expectedRequestId: restart-evidence-1346a971-501c-420b-ac21-7383b40eb8fa
- restoredRequestIds: ["restart-evidence-1346a971-501c-420b-ac21-7383b40eb8fa","ff9ceb45-93a4-4acd-9aa7-8089ecad34e4","restart-evidence-98075e3f-3a78-4d47-ab7d-7b4fb6fb3588"]
- digestBefore: sha256:35e3b67a18c70aac76f35df6f24de57b3448fe5318cadced6bdd165e498fba79
- digestAfterWrite: sha256:24874c75e58c17228fee2a9811f5ccdb6b1dfa1da17ac14ad5bb85c33686d8c2
- digestAfterRestore: sha256:24874c75e58c17228fee2a9811f5ccdb6b1dfa1da17ac14ad5bb85c33686d8c2
- recoveryVerified: true

## Checks

- fileRuntimeSelected: true
- filePathConfigured: true
- syntheticWriteRecorded: true
- restoredEventPresent: true
- digestChangedAfterWrite: true
- digestStableAfterRestore: true
- memoryRuntimeNotClaimedDurable: true
- productionAuditStillBlocked: true

## Summary

- productionBlockerCount: 2
- warningCount: 1
- recommendationCount: 2

## Production Blockers

- MANAGED_AUDIT_STORE_MISSING (blocker): File-backed audit restart evidence is not a managed production audit store.
- AUDIT_RETENTION_POLICY_MISSING (blocker): Production audit still needs retention, rotation, backup, and access policy.

## Warnings

- FILE_RUNTIME_REHEARSAL_ONLY (warning): File runtime proves local reload behavior but is still not the final production audit target.

## Recommendations

- PROMOTE_MANAGED_AUDIT_STORE (recommendation): Move audit evidence to a managed durable store in a dedicated production-hardening version.
- COVER_RETENTION_AND_BACKUP (recommendation): Add explicit tests and documentation for retention, rotation, backup, and restore policy.

## Evidence Endpoints

- fileAuditRestartEvidenceJson: /api/v1/audit/file-restart-evidence
- fileAuditRestartEvidenceMarkdown: /api/v1/audit/file-restart-evidence?format=markdown
- auditStoreProfileJson: /api/v1/audit/store-profile
- auditEventsJson: /api/v1/audit/events?limit=50

## Next Actions

- Keep file-backed audit as restart rehearsal evidence, not as the final production audit store.
- Add retention, rotation, backup, encryption, and access-control policy before production operations.
- Use this report as input for the next production readiness summary.

