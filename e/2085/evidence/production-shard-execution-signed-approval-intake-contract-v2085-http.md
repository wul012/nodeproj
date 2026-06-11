# Production shard execution signed approval intake contract

- Service: orderops-node
- Generated at: 2026-06-11T13:29:11.276Z
- Profile version: production-shard-execution-signed-approval-intake-contract.v1
- Stage: signed-approval-intake-contract
- Active Node version: Node v2085
- Source Node version: Node v2084
- State: signed-approval-intake-contract-ready
- Decision: accept-signed-approval-intake-contract
- Ready for next stage: true
- Ready for production shard execution: false
- Execution allowed: false
- Java / mini-kv recommended parallel: true

## Stage

- stageId: signed-approval-intake-contract
- activeNodeVersion: Node v2085
- sourceNodeVersion: Node v2084
- state: signed-approval-intake-contract-ready
- decision: accept-signed-approval-intake-contract
- readinessDigest: 9ff41e9845c9f3f8631920188b3680c618a2a07a29ca6cd0298e07a6a1278e0f
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

- id: node-v2084-route-catalog-forward-compatibility
- version: Node v2084
- evidenceRole: Route catalog forward compatibility
- routeOrArtifact: /api/v1/audit/production-shard-execution-route-catalog-forward-compatibility
- ready: true
- digest: 7445622074322e874b2798074dacc18cdd3d381006cf991eaf8276771d8548be
- checkCount: 18
- passedCheckCount: 18
- productionBlockerCount: 0

## Controls

- id: signed-approval-required-fields-named
- title: Signed approval required fields are named
- owner: operator
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: approvalId,approvalWindowId,operatorIdentity,approvedScope,sourceReadinessDigest,approvalIssuedAt,approvalExpiresAt,signatureDigest
- nextAction: Use these fields as the only accepted approval artifact shape for later real intake.
- status: satisfied
- id: signed-approval-schema-only
- title: Signed approval intake remains schema-only
- owner: node
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: No approval value, token, signature secret, or production window is accepted by this version.
- nextAction: Keep production execution blocked until an external approval artifact is supplied and verified.
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

- signedApprovalIntakeContract: {"artifactMode":"schema-only-no-real-approval-present","requiredFields":["approvalId","approvalWindowId","operatorIdentity","approvedScope","sourceReadinessDigest","approvalIssuedAt","approvalExpiresAt","signatureDigest"],"scopeRules":["scope must bind to one source readiness digest","scope cannot include write commands or migrations","scope expires before any execution replay can be accepted","operator identity must match the access-guard identity surface"],"acceptedExecutionAuthority":false}
- growthStopCondition: Do not add another approval-intake contract unless the real approval provider changes required fields.

## Checks

- sourceV2084Ready: true
- sourceV2084DigestValid: true
- approvalHasEightRequiredFields: true
- approvalBindsOperatorIdentity: true
- approvalBindsSourceDigest: true
- approvalRequiresExpiry: true
- approvalRequiresSignatureDigest: true
- scopeRulesForbidWrites: true
- scopeRulesBindSingleDigest: true
- schemaOnlyDoesNotClaimRealApproval: true
- noApprovalCredentialValueRead: true
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

- SIGNED_APPROVAL_ARTIFACT_NOT_PRESENT (warning, node-v2085): v2085 names the artifact shape only; a real signed approval artifact is still absent.

## Recommendations

- PREFLIGHT_MANAGED_AUDIT_STORE_NEXT (recommendation, node-v2085): Define the managed audit store binding preflight before accepting any real approval artifact.

## Evidence Endpoints

- json: /api/v1/audit/production-shard-execution-signed-approval-intake-contract
- markdown: /api/v1/audit/production-shard-execution-signed-approval-intake-contract?format=markdown
- activePlan: docs/plans3/v2085-production-shard-execution-signed-approval-intake-contract-roadmap.md
- nextPlan: docs/plans3/v2086-production-shard-execution-managed-audit-store-binding-preflight-roadmap.md

## Next Actions

- Use v2085 as the artifact contract for future signed production approval intake.
- Prepare v2086 around managed audit store binding preflight; keep it disconnected until credentials and store owners exist.
- Do not treat this schema-only stage as a real approval.
