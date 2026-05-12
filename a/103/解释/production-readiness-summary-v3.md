# Production readiness summary v3

- Service: orderops-node
- Generated at: 2026-05-12T22:03:08.034Z
- Summary version: production-readiness-summary.v3
- Maturity target: production-near
- Ready for production operations: false
- Read only: true
- Execution allowed: false

## Checks

- previousSummaryAvailable: true
- javaReplayEvidenceIndexReady: true
- miniKvRecoveryFixtureIndexReady: true
- accessPolicyCoverageReady: true
- accessGuardDryRunReady: true
- auditStoreRuntimeSelectable: true
- auditStoreRuntimeDurable: true
- auditStoreProductionReady: false
- upstreamActionsStillDisabled: true
- executionStillBlocked: true
- categorizedProductionBlockersPresent: true

## Summary

- categoryCount: 4
- readyCategoryCount: 2
- notReadyCategoryCount: 2
- productionBlockerCount: 3
- warningCount: 5
- recommendationCount: 11
- accessPolicyCount: 6
- protectedRouteGroupCount: 6
- javaLiveEvidenceEndpointCount: 6
- javaStaticEvidenceSampleCount: 4
- miniKvRecoveryFixtureCount: 1
- auditRuntimeStoreKind: file

## Categories

### upstream-observability

- Title: Upstream observability indexes
- Ready: true
- Read only: true
- Execution allowed: false
- Blocker count: 0
- Warning count: 0
- Recommendation count: 1
- Evidence endpoints: /api/v1/production/readiness-summary-v2, /api/v1/failed-events/replay-evidence-index, fixtures/recovery/index.json
- Note: Java v47 and mini-kv v56 indexes are accepted as read-only upstream evidence, not as permission to execute.

### access-control

- Title: Access policy and dry-run guard
- Ready: false
- Read only: true
- Execution allowed: false
- Blocker count: 2
- Warning count: 3
- Recommendation count: 4
- Evidence endpoints: /api/v1/security/access-policy, /api/v1/security/access-guard-readiness
- Note: Policy coverage and dry-run evaluation exist, but real auth/RBAC enforcement is still intentionally blocked.

### audit

- Title: Audit runtime durability
- Ready: false
- Read only: true
- Execution allowed: false
- Blocker count: 1
- Warning count: 2
- Recommendation count: 6
- Evidence endpoints: /api/v1/audit/store-profile, /api/v1/audit/store-config-profile
- Note: File mode can be selected for rehearsal, but production audit still needs managed durable storage and retention.

### execution-safety

- Title: Execution safety
- Ready: true
- Read only: true
- Execution allowed: false
- Blocker count: 0
- Warning count: 0
- Recommendation count: 0
- Evidence endpoints: /api/v1/production/readiness-summary-v3, /api/v1/production/readiness-summary-v2
- Note: Node keeps upstream execution disabled while access and audit are not production-ready.

## Upstream Evidence Indexes

- javaReplay.source: {"project":"java","path":"D:\\nodeproj\\orderops-node\\fixtures\\upstream-production-evidence\\failed-event-replay-evidence-index.sample.json","status":"available","message":"Evidence fixture was read and parsed."}
- javaReplay.evidenceVersion: failed-event-replay-evidence-index.v1
- javaReplay.readOnly: true
- javaReplay.executionAllowed: false
- javaReplay.liveEvidenceEndpointCount: 6
- javaReplay.staticEvidenceSampleCount: 4
- javaReplay.auditIdentityFields: ["operator.operatorId","operator.operatorRole","requestId","decisionId","approval.requestedBy","approval.reviewedBy","execution.attemptAuditType","execution.attemptStatus"]
- javaReplay.executionSafetyRules: ["REAL_REPLAY_REQUIRES_APPROVED_STATUS","REAL_REPLAY_REQUIRES_OPERATOR_ACTION_REPLAY_FAILED_EVENT","REAL_REPLAY_REQUIRES_NON_BLANK_REASON","REAL_REPLAY_REQUIRES_RABBITMQ_OUTBOX_ENABLED","READ_ONLY_EVIDENCE_ENDPOINTS_MUST_NOT_CHANGE_REPLAY_STATE","BLOCKED_PRECHECK_MUST_NOT_CREATE_REPLAY_ATTEMPT"]
- javaReplay.checks: {"evidenceVersionMatches":true,"readOnlyIndex":true,"executionBlocked":true,"liveEvidenceEndpointsReadOnly":true,"staticEvidenceSamplesPresent":true,"auditIdentityFieldsPresent":true,"safetyRulesPresent":true}
- miniKvRecovery.source: {"project":"mini-kv","path":"D:\\C\\mini-kv\\fixtures\\recovery\\index.json","status":"available","message":"Evidence fixture was read and parsed."}
- miniKvRecovery.indexVersion: mini-kv-recovery-fixtures.v1
- miniKvRecovery.readOnly: true
- miniKvRecovery.executionAllowed: false
- miniKvRecovery.orderAuthoritative: false
- miniKvRecovery.fixtureCount: 1
- miniKvRecovery.consumerHint: Node v103 production readiness summary v3
- miniKvRecovery.boundaries: ["read-only fixture","no server command added","no write command expanded","not order authoritative"]
- miniKvRecovery.checks: {"indexVersionMatches":true,"readOnlyIndex":true,"executionBlocked":true,"notOrderAuthoritative":true,"recoveryFixturePresent":true,"recoveryFixtureValid":true,"fixtureCountMatchesDiagnostics":true,"consumerHintTargetsNodeV103":true}

## Access Control Evidence

- policyProfileVersion: access-policy-profile.v1
- policyCount: 6
- protectedRouteGroupCount: 6
- guardProfileVersion: access-guard-readiness-profile.v1
- guardMode: dry-run
- rejectsRequests: false
- routeGroups: ["readiness","audit","intent","approval","archive","upstream-proxy"]
- productionBlockerCount: 2

## Audit Evidence

- runtimeProfileVersion: audit-store-runtime-profile.v1
- runtimeStoreKind: file
- storeImplementation: FileBackedAuditStore
- durableAtRuntime: true
- configuredByEnvironment: true
- envProfileReadyForMigration: false
- productionBlockerCount: 3

## Production Blockers

- ACCESS_POLICY_CONTRACT_ONLY (blocker, access-control, access-policy-profile): Access policy is still a contract and is not enforceable production authentication.
- ACCESS_GUARD_DRY_RUN_ONLY (blocker, access-control, access-guard-readiness-profile): Access guard still records would-deny evidence without rejecting requests.
- AUDIT_PRODUCTION_STORE_NOT_READY (blocker, audit, audit-store-runtime-profile): Durable audit still needs production storage, retention, rotation, and backup policy.

## Warnings

- POLICY_CONTRACT_ONLY (warning, access-control, access-policy-profile): This version defines the access contract but deliberately does not reject requests.
- IDENTITY_IS_ANONYMOUS (warning, access-control, access-policy-profile): The current runtime identity sample is anonymous until an auth middleware attaches operator context.
- DRY_RUN_HEADERS_ONLY (warning, access-control, access-guard-readiness-profile): Access guard evidence is currently exposed through response headers and readiness profile, not durable audit.
- FILE_STORE_IS_PROTOTYPE (warning, audit, audit-store-runtime-profile): FileBackedAuditStore is useful for adapter validation but is not enough for production audit retention.
- FILE_STORE_NOT_FINAL_PRODUCTION_TARGET (warning, audit, audit-store-env-config-profile): File-backed audit can help migration rehearsal but still needs rotation, retention, and backup policy.

## Recommendations

- ADD_DRY_RUN_GUARD (recommendation, access-control, access-policy-profile): Next version should evaluate this policy per request in dry-run mode and record wouldDeny evidence.
- PROPAGATE_IDENTITY_TO_AUDIT (recommendation, access-control, access-policy-profile): Attach operator identity and matched roles to audit events before enabling upstream actions.
- WRITE_GUARD_CONTEXT_TO_AUDIT (recommendation, access-control, access-guard-readiness-profile): Persist routeGroup, requiredRole, matchedRoles, and wouldDeny in audit evidence before real enforcement.
- ADD_AUTH_MIDDLEWARE (recommendation, access-control, access-guard-readiness-profile): Replace header-derived dry-run identity with authenticated operator context.
- PROMOTE_MANAGED_AUDIT_STORE (recommendation, audit, audit-store-runtime-profile): Promote audit storage to a managed durable service before real production operations.
- ADD_DURABLE_STORE_TESTS (recommendation, audit, audit-store-runtime-profile): Add integration tests for restart recovery, retention limits, and malformed audit records.
- ADD_AUDIT_ACCESS_POLICY (recommendation, audit, audit-store-runtime-profile): Protect audit export and query endpoints before exposing the control plane outside local smoke.
- VERIFY_FILE_STORE_RUNTIME (recommendation, audit, audit-store-env-config-profile): Use AUDIT_STORE_KIND=file only for restart and migration rehearsal until managed audit storage exists.
- ADD_RESTART_RECOVERY_TEST (recommendation, audit, audit-store-env-config-profile): Verify audit events survive restart before claiming durable audit readiness.
- DEFINE_RETENTION_AND_BACKUP (recommendation, audit, audit-store-env-config-profile): Document retention, rotation, backup, and access policy for audit evidence.
- KEEP_UPSTREAM_INDEXES_VERSIONED (recommendation, upstream-observability, production-readiness-summary-v3): Keep Java replay evidence and mini-kv recovery indexes versioned before live probe windows.

## Evidence Endpoints

- productionReadinessSummaryV3Json: /api/v1/production/readiness-summary-v3
- productionReadinessSummaryV3Markdown: /api/v1/production/readiness-summary-v3?format=markdown
- productionReadinessSummaryV2Json: /api/v1/production/readiness-summary-v2
- accessPolicyProfileJson: /api/v1/security/access-policy
- accessGuardReadinessJson: /api/v1/security/access-guard-readiness
- auditStoreRuntimeProfileJson: /api/v1/audit/store-profile
- auditStoreEnvConfigProfileJson: /api/v1/audit/store-config-profile
- javaReplayEvidenceIndex: /api/v1/failed-events/replay-evidence-index
- miniKvRecoveryFixtureIndex: fixtures/recovery/index.json

## Next Actions

- Promote access guard evidence into durable audit records before real enforcement.
- Add operator identity authentication and RBAC middleware in a dedicated Node version.
- Keep using file-backed audit only for local restart rehearsal until managed audit storage and retention exist.

