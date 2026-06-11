# Production shard execution failure, abort, and rollback matrix

- Service: orderops-node
- Generated at: 2026-06-11T12:51:54.571Z
- Profile version: production-shard-execution-failure-matrix.v1
- Stage: failure-matrix
- Active Node version: Node v2080
- Source Node version: Node v2079
- State: failure-matrix-ready
- Decision: accept-failure-abort-rollback-matrix
- Ready for next stage: true
- Ready for production shard execution: false
- Execution allowed: false
- Java / mini-kv recommended parallel: true

## Stage

- stageId: failure-matrix
- activeNodeVersion: Node v2080
- sourceNodeVersion: Node v2079
- state: failure-matrix-ready
- decision: accept-failure-abort-rollback-matrix
- readinessDigest: 68b8b2c1bf0ff54df5f2834f16a14d06ffea05ddf07156535fe8fe8b48769408
- readyForNextStage: true

## Safety Boundary

- readOnly: true
- executionAllowed: false
- readyForProductionWindow: false
- readyForProductionOperations: false
- startsJavaService: false
- startsMiniKvService: false
- stopsJavaService: false
- stopsMiniKvService: false
- mutatesJavaState: false
- mutatesMiniKvState: false
- connectsManagedAudit: false
- credentialValueRead: false
- rawEndpointUrlParsed: false
- activeShardPrototypeEnabled: false

## Sources

- id: node-v2079-candidate-contract
- version: Node v2079
- evidenceRole: Disabled shard execution candidate contract
- routeOrArtifact: /api/v1/audit/production-shard-execution-candidate-contract
- ready: true
- digest: 50b79fc6aaa4b66b4d1dd97aaf0211c76af47dd1802dbf87fc43257572dec1e5
- checkCount: 18
- passedCheckCount: 18
- productionBlockerCount: 0

## Controls

- id: failure-classes-cover-candidate-phases
- title: Failure classes cover candidate phases
- owner: node
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: pre-window-evidence-missing,operator-approval-mismatch,java-read-probe-failed,mini-kv-read-probe-failed,cleanup-proof-missing
- nextAction: Use these classes as the v2081 worksheet stop conditions.
- status: satisfied
- id: archive-required-for-every-failure
- title: Every failure class requires archive evidence
- owner: cross-project
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: archiveRequired=true for every matrix row
- nextAction: Do not let an operator close the window without an outcome archive.
- status: satisfied
- id: signed-production-execution-approval
- title: Signed production execution approval
- owner: operator
- evidence: No signed production execution approval artifact is present in this candidate batch.
- nextAction: Capture a signed approval artifact before any production execution window can open.
- status: pending
- blocksNextStage: false
- blocksProductionExecution: true
- id: managed-audit-production-store
- title: Managed audit production store binding
- owner: node
- evidence: The candidate remains archive-backed and does not connect to managed audit production storage.
- nextAction: Bind immutable production execution records to a managed audit store before real execution.
- status: pending
- blocksNextStage: false
- blocksProductionExecution: true
- id: rollback-owner-confirmation
- title: Rollback and abort owner confirmation
- owner: cross-project
- evidence: Abort and rollback semantics are documented as a candidate matrix, not signed by all service owners.
- nextAction: Have Node, Java, and mini-kv owners sign the abort and rollback responsibilities.
- status: pending
- blocksNextStage: false
- blocksProductionExecution: true

## Stage Payload

- failureMatrix: [{"class":"pre-window-evidence-missing","abortOwner":"node","rollbackAction":"none","archiveRequired":true},{"class":"operator-approval-mismatch","abortOwner":"operator","rollbackAction":"none","archiveRequired":true},{"class":"java-read-probe-failed","abortOwner":"java","rollbackAction":"stop-owned-read-only-window","archiveRequired":true},{"class":"mini-kv-read-probe-failed","abortOwner":"mini-kv","rollbackAction":"stop-owned-read-only-window","archiveRequired":true},{"class":"cleanup-proof-missing","abortOwner":"cross-project","rollbackAction":"keep-execution-denied-until-cleanup-proof","archiveRequired":true}]
- invariant: Any failed row archives evidence and leaves production execution disabled.
- growthStopCondition: Add a new failure class only when a new candidate phase or upstream runtime behavior appears.

## Checks

- sourceV2079Ready: true
- sourceV2079DigestValid: true
- fiveFailureClassesNamed: true
- nodeFailureClassPresent: true
- operatorFailureClassPresent: true
- javaFailureClassPresent: true
- miniKvFailureClassPresent: true
- crossProjectCleanupFailurePresent: true
- everyFailureRequiresArchive: true
- noFailureClassAllowsWriteRollback: true
- cleanupFailureKeepsExecutionDenied: true
- readOnlyBoundaryPreserved: true
- executionStillDenied: true
- productionOperationsStillDenied: true
- noJavaLifecycleOwnedByNode: true
- noMiniKvLifecycleOwnedByNode: true
- noUpstreamMutation: true
- noManagedAuditCredentialOrRawEndpoint: true
- activeShardPrototypeStillDisabled: true

## Summary

- checkCount: 19
- passedCheckCount: 19
- sourceCount: 1
- readySourceCount: 1
- controlCount: 5
- nextStageBlockingControlCount: 0
- productionBlockingControlCount: 3
- productionBlockerCount: 3
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- PRODUCTION_BLOCKED_SIGNED_PRODUCTION_EXECUTION_APPROVAL (blocker, operator): Signed production execution approval is still pending. Capture a signed approval artifact before any production execution window can open.
- PRODUCTION_BLOCKED_MANAGED_AUDIT_PRODUCTION_STORE (blocker, node): Managed audit production store binding is still pending. Bind immutable production execution records to a managed audit store before real execution.
- PRODUCTION_BLOCKED_ROLLBACK_OWNER_CONFIRMATION (blocker, cross-project): Rollback and abort owner confirmation is still pending. Have Node, Java, and mini-kv owners sign the abort and rollback responsibilities.

## Warnings

- FAILURE_MATRIX_HAS_NO_PRODUCTION_AUTHORITY (warning, node-v2080): The matrix explains how to stop safely; it does not authorize production execution.

## Recommendations

- BUILD_OPERATOR_WORKSHEET_NEXT (recommendation, node-v2080): Turn the failure matrix into a concrete operator window worksheet with ordered evidence checkpoints.

## Evidence Endpoints

- json: /api/v1/audit/production-shard-execution-failure-matrix
- markdown: /api/v1/audit/production-shard-execution-failure-matrix?format=markdown
- activePlan: docs/plans3/v2080-production-shard-execution-failure-matrix-roadmap.md
- nextPlan: docs/plans3/v2081-production-shard-execution-operator-window-worksheet-roadmap.md

## Next Actions

- Use v2080 as the stop-condition source for the v2081 operator window worksheet.
- Keep failure handling archive-first and write-free.
- Require Java and mini-kv owner acknowledgement only for the rows they own.
