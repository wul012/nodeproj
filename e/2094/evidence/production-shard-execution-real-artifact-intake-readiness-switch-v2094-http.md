# Production shard execution real artifact intake readiness switch

- Service: orderops-node
- Generated at: 2026-06-11T23:29:17.012Z
- Profile version: production-shard-execution-real-artifact-intake-readiness-switch.v1
- Stage: real-artifact-intake-readiness-switch
- Active Node version: Node v2094
- Source Node version: Node v2093
- State: real-artifact-intake-readiness-switch-ready
- Decision: accept-real-artifact-intake-readiness-switch
- Ready for next stage: true
- Ready for production shard execution: false
- Execution allowed: false
- Java / mini-kv recommended parallel: true

## Stage

- stageId: real-artifact-intake-readiness-switch
- activeNodeVersion: Node v2094
- sourceNodeVersion: Node v2093
- state: real-artifact-intake-readiness-switch-ready
- decision: accept-real-artifact-intake-readiness-switch
- readinessDigest: cbd63233392124cabd56cc57446d580271ed595c408caa45a49aa69fddf7b02a
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

- id: node-v2093-external-artifact-dry-run-closeout
- version: Node v2093
- evidenceRole: External artifact dry-run closeout
- routeOrArtifact: /api/v1/audit/production-shard-execution-external-artifact-dry-run-closeout
- ready: true
- digest: 581a6bcf40d00474c36c150f090310c132969ce72fd01bd47bd811fd8b164c61
- checkCount: 21
- passedCheckCount: 21
- productionBlockerCount: 0

## Controls

- id: real-artifact-intake-switch-default-closed
- title: Real artifact intake switch defaults closed
- owner: node
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: realArtifactIntakeEnabled=false until a trusted external source appears
- nextAction: Keep the switch closed while building provenance and conflict preflight stages.
- status: satisfied
- id: real-artifact-required-kinds-named
- title: Required real artifact kinds are named
- owner: cross-project
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: signed-production-approval,managed-audit-store-owner-binding,java-owner-receipt,mini-kv-owner-receipt,cleanup-reconciliation-receipt
- nextAction: Use these kinds as the exact scope for provenance validation.
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

- realArtifactIntakeReadinessSwitch: {"realArtifactIntakeEnabled":false,"requiredRealArtifactKinds":["signed-production-approval","managed-audit-store-owner-binding","java-owner-receipt","mini-kv-owner-receipt","cleanup-reconciliation-receipt"],"syntheticFixturesAcceptedForProduction":false,"productionAuthority":false}
- archiveLayout: {"evidence":"e/<version>/evidence","explanation":"f/<version>/解释","images":"f/<version>/图片 only when image evidence exists"}
- growthStopCondition: Do not open real artifact intake until provenance and conflict preflights are both defined.

## Checks

- sourceV2093Ready: true
- sourceV2093DigestValid: true
- fiveRequiredRealArtifactKindsNamed: true
- signedApprovalKindRequired: true
- storeOwnerBindingKindRequired: true
- javaOwnerReceiptKindRequired: true
- miniKvOwnerReceiptKindRequired: true
- cleanupReceiptKindRequired: true
- realArtifactIntakeSwitchClosed: true
- syntheticFixtureRejectedForProduction: true
- fFolderArchiveLayoutPreserved: true
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

- REAL_ARTIFACT_INTAKE_SWITCH_CLOSED (warning, node-v2094): v2094 prepares a real artifact intake switch but keeps it closed.

## Recommendations

- DEFINE_PROVENANCE_PREFLIGHT_NEXT (recommendation, node-v2094): Define provenance fields before any real external artifact is accepted.

## Evidence Endpoints

- json: /api/v1/audit/production-shard-execution-real-artifact-intake-readiness-switch
- markdown: /api/v1/audit/production-shard-execution-real-artifact-intake-readiness-switch?format=markdown
- activePlan: docs/plans3/v2094-production-shard-execution-real-artifact-intake-readiness-switch-roadmap.md
- nextPlan: docs/plans3/v2095-production-shard-execution-external-artifact-provenance-preflight-roadmap.md

## Next Actions

- Use v2094 as the closed real-artifact intake switch.
- Define external artifact provenance preflight in v2095.
- Keep Java and mini-kv parallel on real owner receipt production.
