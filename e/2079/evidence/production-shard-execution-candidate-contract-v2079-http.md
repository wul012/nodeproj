# Production shard execution candidate contract

- Service: orderops-node
- Generated at: 2026-06-11T12:51:54.551Z
- Profile version: production-shard-execution-candidate-contract.v1
- Stage: candidate-contract
- Active Node version: Node v2079
- Source Node version: Node v2078
- State: candidate-contract-ready
- Decision: accept-disabled-shard-execution-candidate-contract
- Ready for next stage: true
- Ready for production shard execution: false
- Execution allowed: false
- Java / mini-kv recommended parallel: true

## Stage

- stageId: candidate-contract
- activeNodeVersion: Node v2079
- sourceNodeVersion: Node v2078
- state: candidate-contract-ready
- decision: accept-disabled-shard-execution-candidate-contract
- readinessDigest: 50b79fc6aaa4b66b4d1dd97aaf0211c76af47dd1802dbf87fc43257572dec1e5
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

- id: node-v2078-handoff-readiness
- version: Node v2078
- evidenceRole: Production shard handoff readiness
- routeOrArtifact: /api/v1/audit/production-shard-execution-handoff-readiness
- ready: true
- digest: d387aa6854831f4d855939c365292ac96e75fab81ce784648a43ecb04d8bc9bb
- checkCount: 16
- passedCheckCount: 16
- productionBlockerCount: 0

## Controls

- id: candidate-phases-named
- title: Candidate phases are explicitly named
- owner: node
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: pre-window-evidence-lock,operator-approved-read-only-probe,shard-plan-digest-binding,candidate-decision-freeze,archive-and-cleanup-proof
- nextAction: Use these phases as the only allowed v2080 failure-matrix scope.
- status: satisfied
- id: candidate-invariants-named
- title: Execution invariants are explicitly named
- owner: node
- blocksNextStage: true
- blocksProductionExecution: false
- evidence: executionAllowed remains false until signed production approval exists; Node does not start or stop Java / mini-kv from this route; candidate phases are replayable from digests before any production window; write and migration operations stay outside the shard candidate contract
- nextAction: Verify each invariant in v2080 and v2081.
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

- candidateContract: {"contractMode":"disabled-production-shard-execution-candidate","phases":["pre-window-evidence-lock","operator-approved-read-only-probe","shard-plan-digest-binding","candidate-decision-freeze","archive-and-cleanup-proof"],"invariants":["executionAllowed remains false until signed production approval exists","Node does not start or stop Java / mini-kv from this route","candidate phases are replayable from digests before any production window","write and migration operations stay outside the shard candidate contract"],"allowedRuntimeSurface":"read-only probe evidence and archive replay only","forbiddenRuntimeSurface":"write commands, migrations, credential reads, raw endpoint parsing, active shard routing"}
- growthStopCondition: Do not add another candidate contract unless a later Java or mini-kv artifact changes the execution surface.

## Checks

- sourceV2078Ready: true
- sourceV2078DigestValid: true
- fiveCandidatePhasesNamed: true
- allCandidatePhasesHaveStopOrArchiveMeaning: true
- invariantsPreventExecutionEnablement: true
- invariantsPreventServiceLifecycleOwnership: true
- invariantsRequireDigestReplay: true
- invariantsKeepWritesOut: true
- candidateContractDoesNotConsumeFreshSiblingRuntime: true
- javaMiniKvCanContinueParallel: true
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

- CANDIDATE_CONTRACT_IS_DISABLED (warning, node-v2079): The candidate contract names the execution shape but still denies production execution.

## Recommendations

- CLASSIFY_FAILURES_NEXT (recommendation, node-v2079): Derive v2080 failure, abort, and rollback semantics directly from the five candidate phases.

## Evidence Endpoints

- json: /api/v1/audit/production-shard-execution-candidate-contract
- markdown: /api/v1/audit/production-shard-execution-candidate-contract?format=markdown
- activePlan: docs/plans3/v2079-production-shard-execution-candidate-contract-roadmap.md
- nextPlan: docs/plans3/v2080-production-shard-execution-failure-matrix-roadmap.md

## Next Actions

- Use v2079 as the contract boundary for v2080 failure, abort, and rollback classification.
- Keep the contract disabled-by-default; production blockers remain intentional until signed approval exists.
- Ask Java and mini-kv only for evidence that maps to these phases, not broad new reports.
