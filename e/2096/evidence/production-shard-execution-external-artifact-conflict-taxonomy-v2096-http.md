# Production shard execution external artifact conflict taxonomy

- Service: orderops-node
- Generated at: 2026-06-11T23:29:19.519Z
- Profile version: production-shard-execution-external-artifact-conflict-taxonomy.v1
- Stage: external-artifact-conflict-taxonomy
- Active Node version: Node v2096
- Source Node version: Node v2095
- State: external-artifact-conflict-taxonomy-ready
- Decision: accept-external-artifact-conflict-taxonomy
- Ready for next stage: true
- Ready for production shard execution: false
- Execution allowed: false
- Java / mini-kv recommended parallel: true

## Stage

- stageId: external-artifact-conflict-taxonomy
- activeNodeVersion: Node v2096
- sourceNodeVersion: Node v2095
- state: external-artifact-conflict-taxonomy-ready
- decision: accept-external-artifact-conflict-taxonomy
- readinessDigest: 9f24569f9bba568b4910cdfc59383280fd30463f5e1c8276d2302d98d62b0471
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

- id: node-v2095-external-artifact-provenance-preflight
- version: Node v2095
- evidenceRole: Artifact provenance preflight
- routeOrArtifact: /api/v1/audit/production-shard-execution-external-artifact-provenance-preflight
- ready: true
- digest: 6e9f8bb77bd44bb6a9aa0fbb546c170b5212c4e7e2826bc9d9d6b182fced5cc7
- checkCount: 19
- passedCheckCount: 19
- productionBlockerCount: 0

## Controls

- id: conflict-classes-named
- title: External artifact conflict classes are named
- owner: cross-project
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: duplicate-approval-artifact,stale-source-readiness-digest,owner-receipt-scope-mismatch,managed-audit-store-owner-mismatch,cleanup-reconciliation-missing
- nextAction: Use these classes as quarantine reasons in v2097.
- status: satisfied
- id: conflicts-block-production-by-default
- title: Artifact conflicts block production by default
- owner: node
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: any conflict routes the artifact to quarantine, not production execution
- nextAction: Keep production execution blocked when a conflict class matches.
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

- externalArtifactConflictTaxonomy: {"conflictClasses":["duplicate-approval-artifact","stale-source-readiness-digest","owner-receipt-scope-mismatch","managed-audit-store-owner-mismatch","cleanup-reconciliation-missing"],"defaultConflictAction":"quarantine-and-block-production","realArtifactPayloadAccepted":false}
- growthStopCondition: Do not add conflict classes unless a real provider introduces a new contradiction mode.

## Checks

- sourceV2095Ready: true
- sourceV2095DigestValid: true
- fiveConflictClassesNamed: true
- duplicateApprovalConflictPresent: true
- staleDigestConflictPresent: true
- ownerReceiptScopeConflictPresent: true
- storeOwnerMismatchConflictPresent: true
- cleanupMissingConflictPresent: true
- conflictsDefaultToQuarantine: true
- conflictTaxonomyDoesNotAcceptPayload: true
- readOnlyBoundaryPreserved: true
- executionStillDenied: true
- productionOperationsStillDenied: true
- noJavaLifecycleOwnedByNode: true
- noMiniKvLifecycleOwnedByNode: true
- noUpstreamMutation: true
- noManagedAuditCredentialOrRawEndpoint: true
- activeShardPrototypeStillDisabled: true

## Summary

- checkCount: 18
- passedCheckCount: 18
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

- CONFLICT_TAXONOMY_BLOCKS_PRODUCTION (warning, node-v2096): Any conflict class sends an artifact to quarantine and keeps production execution blocked.

## Recommendations

- DEFINE_QUARANTINE_ENVELOPE_NEXT (recommendation, node-v2096): Define how conflicting or unverified artifacts are quarantined before closing the preflight batch.

## Evidence Endpoints

- json: /api/v1/audit/production-shard-execution-external-artifact-conflict-taxonomy
- markdown: /api/v1/audit/production-shard-execution-external-artifact-conflict-taxonomy?format=markdown
- activePlan: docs/plans3/v2096-production-shard-execution-external-artifact-conflict-taxonomy-roadmap.md
- nextPlan: docs/plans3/v2097-production-shard-execution-external-artifact-quarantine-envelope-roadmap.md

## Next Actions

- Use v2096 as the quarantine reason taxonomy.
- Define the artifact quarantine envelope in v2097.
- Keep conflicting artifacts from producing production authority.
