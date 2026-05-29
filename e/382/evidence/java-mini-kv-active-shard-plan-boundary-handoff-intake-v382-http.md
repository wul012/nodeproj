# Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake

- Service: orderops-node
- Generated at: 2026-05-29T11:00:23.351Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1
- Intake state: java-mini-kv-active-shard-plan-boundary-handoff-intake-ready
- Intake decision: consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence
- Active Node version: Node v382
- Source Node version: Node v381
- Ready for Node v383 archive verification: true
- Evidence intake only: true
- Reruns live read: false
- Starts Java service: false
- Starts mini-kv service: false
- Stops Java service: false
- Stops mini-kv service: false
- Connects managed audit: false
- Execution allowed: false
- Active shard prototype enabled: false

## Source Node v381

- sourceVersion: Node v381
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification.v1
- archiveVerificationState: java-mini-kv-active-shard-plan-evidence-intake-archive-verified
- archiveVerificationDecision: archive-active-shard-plan-evidence-intake-and-prepare-v381
- readyForActiveShardPlanEvidenceIntakeArchiveVerification: true
- readyForNodeV381NextArchiveVerification: true
- activeNodeVersion: Node v381
- sourceNodeVersion: Node v380
- archiveVerificationDigest: 96d7e2342ab2046b9c9555a900327e3caec784152e0dc3fa676d96e43d113ef7
- checkCount: 33
- passedCheckCount: 33
- productionBlockerCount: 0
- startsJavaService: false
- startsMiniKvService: false
- stopsJavaService: false
- stopsMiniKvService: false
- connectsManagedAudit: false
- executionAllowed: false
- activeShardPrototypeEnabled: false

## Java v158 Boundary Handoff

- project: advanced-order-platform
- version: Java v158
- readOnly: true
- executionAllowed: false
- activeShardPrototypeEnabled: false
- liveReadAllowed: false
- sourceHandoffVersion: Java v157
- lastConsumedByNodeVersion: Node v380
- nodeArchiveVerificationVersion: Node v381
- javaRole: read-only-active-shard-plan-boundary-handoff
- activePrototypeAuthority: mini-kv-active-prototype-plan
- frozenJavaEvidence: ["Java v157","/api/v1/ops/shard-readiness/evidence-handoff","/contracts/java-shard-readiness-evidence-handoff-v157.fixture.json","e/157/evidence/java-shard-readiness-evidence-handoff-v157.json"]
- nodeConsumptionReferences: ["Node v380 consumed Java v157 handoff as frozen evidence","Node v381 verified the v380 archive with frozen evidence replay","docs/plans3/v380-post-java-mini-kv-active-shard-plan-evidence-intake-roadmap.md","docs/plans3/v381-post-java-mini-kv-active-shard-plan-evidence-intake-archive-verification-roadmap.md"]
- javaBoundaryRules: ["java-remains-read-only-contract-echo-and-handoff-producer","active-shard-prototype-authority-stays-with-mini-kv-plan","do-not-enable-java-shard-router-or-write-routing","do-not-start-or-stop-node-or-mini-kv-from-java-handoff","live-read-gate-requires-explicit-service-start-port-and-cleanup-plan"]
- stopConditions: ["source-handoff-status-not-passed","request-would-enable-active-shard-prototype","request-would-change-order-payment-inventory-ledger-or-sql-routing","node-requests-live-read-without-service-responsibility-plan","mini-kv-active-prototype-plan-not-frozen-or-not-read-only"]
- evidencePath: e/158/evidence/java-shard-readiness-active-shard-plan-handoff-v158.json
- status: passed

## mini-kv v149 Consumer Handoff

- project: mini-kv
- contract: shard-readiness.v1
- releaseVersion: v149
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- shardCount: 1
- slotCount: 16
- routingMode: single-shard-readiness-prototype
- status: frozen-evidence-handoff-read-only
- evidencePath: fixtures/release/shard-readiness.json
- writeCommandsAllowed: false
- adminCommandsAllowed: false
- loadRestoreCompactAllowed: false
- setnxexExecutionAllowed: false
- activeRouterInstalled: false
- storageDirectoriesCreated: false
- multiProcessStarted: false
- archivedNodeEvidenceMutated: false
- activeShardPrototypeAllowed: false
- routerActivationAllowed: false
- shardDirectoryCreationAllowed: false
- multiProcessStartAllowed: false
- writeRoutingAllowed: false
- activePlanFreezeFrozenReleaseVersion: v148
- activePlanFreezeFrozenFixturePath: fixtures/release/shard-readiness-v148.json
- activePlanFreezePreservesActivePrototypePlan: true
- activePlanFreezeRouterActivationAllowed: false
- activePlanFreezeWriteRoutingAllowed: false
- activePlanFreezeRollingCurrentUsedForFrozenBaseline: false
- consumerHandoffMode: frozen-evidence-only
- consumerFrozenReleaseVersion: v148
- consumerFrozenFixturePath: fixtures/release/shard-readiness-v148.json
- readyForNodeConsumption: true
- liveReadGateRequiredBeforeRuntimeProbe: true
- consumerStartsServices: false
- consumerActiveShardPrototypeEnabled: false
- consumerRouterActivationAllowed: false
- consumerWriteRoutingAllowed: false
- consumerExecutionAllowed: false
- previousConsumedReleaseVersion: v148
- previousConsumedFixturePath: fixtures/release/shard-readiness-v148.json
- previousConsumptionNodeVersion: Node v382 pending completed evidence intake
- rollingCurrentUsedForHistoricalBaseline: false
- nodeV381ArchiveVerificationPreserved: true
- nodeV382ReadsUnfinishedUpstream: false
- archivedNodeVersions: ["Node v370","Node v371","Node v372","Node v373","Node v374","Node v375","Node v376","Node v377","Node v378","Node v379","Node v380","Node v381"]
- changesArchivedNodeEvidence: false
- futureNodeConsumer: Node v382 or later after v148 frozen evidence handoff
- evidenceDigest: fnv1a64:521fe6dee47f7f2c

## mini-kv v148 Frozen Active Plan

- project: mini-kv
- releaseVersion: v148
- readOnly: true
- executionAllowed: false
- status: active-prototype-plan-frozen-read-only
- activeShardPrototypeAllowed: false
- routerActivationAllowed: false
- writeRoutingAllowed: false
- rollingCurrentUsedForFrozenBaseline: false

## Evidence Files

- java-v158-boundary-handoff: exists=true; fallback=true; bytes=1842; digest=92c42f4078aaaa91933239a229b1820e272becfc52fd73302ee2892e72db3570; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\158\evidence\java-shard-readiness-active-shard-plan-handoff-v158.json
- mini-kv-v149-consumer-handoff: exists=true; fallback=true; bytes=5455; digest=f8ebb3c724f72ceadc2a7a3f981becfb5a0887d49bc061c74e449959a17e2c9e; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v149.json
- mini-kv-v148-frozen-active-plan: exists=true; fallback=true; bytes=4659; digest=f84a9a2ba36bf6b4e93ccbc45fc2c754f8ad14889f1303c32cbc3ccf92bd861c; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v148.json

## Intake

- intakeMode: java-mini-kv-active-shard-plan-boundary-handoff-intake
- sourceSpan: Node v381 + Java v158 + mini-kv v149
- sourceNodeV381Digest: 96d7e2342ab2046b9c9555a900327e3caec784152e0dc3fa676d96e43d113ef7
- javaV158Digest: 92c42f4078aaaa91933239a229b1820e272becfc52fd73302ee2892e72db3570
- miniKvV149Digest: f8ebb3c724f72ceadc2a7a3f981becfb5a0887d49bc061c74e449959a17e2c9e
- miniKvV148Digest: f84a9a2ba36bf6b4e93ccbc45fc2c754f8ad14889f1303c32cbc3ccf92bd861c
- usesFrozenJavaV158Handoff: true
- usesFrozenMiniKvV149Handoff: true
- verifiesMiniKvV148FrozenPlan: true
- consumesRollingCurrentAsHistoricalBaseline: false
- activeShardPrototypeEnabled: false
- liveReadGateRequiredBeforeRuntimeProbe: true
- ready: true
- intakeDigest: 9b37f26d38304a94d5fc4a730e233ece5d908b62d4a46939433b6330ba44c183
- startsUpstreamServices: false
- stopsUpstreamServices: false
- writesUpstreamState: false
- opensManagedAuditConnection: false
- nextNodeVersionSuggested: Node v383

## Checks

- sourceNodeV381Ready: true
- sourceNodeV381ArchiveVerified: true
- sourceNodeV381BoundariesClosed: true
- javaV158HandoffFilePresent: true
- javaV158VersionValid: true
- javaV158ReadOnly: true
- javaV158ExecutionBlocked: true
- javaV158ActivePrototypeDisabled: true
- javaV158LiveReadDisabled: true
- javaV158StatusPassed: true
- javaV158SourceReferencesV157: true
- javaV158ReferencesNodeV380AndV381: true
- javaV158BoundaryRulesSafe: true
- javaV158StopConditionsSafe: true
- miniKvV149HandoffFilePresent: true
- miniKvV149ReleaseVersionValid: true
- miniKvV149ReadOnly: true
- miniKvV149ExecutionBlocked: true
- miniKvV149StatusAccepted: true
- miniKvV149ConsumerHandoffReady: true
- miniKvV149ConsumerHandoffRequiresLiveGate: true
- miniKvV149BoundarySafe: true
- miniKvV149ActivePrototypeStillDisabled: true
- miniKvV149ActivePlanFreezeSafe: true
- miniKvV149HistoricalFallbackSafe: true
- miniKvV149PreservesNodeV381Path: true
- miniKvV148FrozenPlanFilePresent: true
- miniKvV148FrozenPlanValid: true
- allEvidenceUsesHistoricalFallbackSnapshots: true
- intakeDigestStable: true
- noRollingCurrentHistoricalBaseline: true
- noAutomaticUpstreamStartStop: true
- noUpstreamMutation: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForActiveShardPlanBoundaryHandoffIntake: true

## Summary

- evidenceSourceCount: 3
- readyEvidenceSourceCount: 3
- javaBoundaryRuleCount: 5
- miniKvArchivedNodeVersionCount: 12
- checkCount: 39
- passedCheckCount: 39
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- BOUNDARY_HANDOFF_IS_NOT_LIVE_READ (warning, node-v382): v382 consumes frozen Java/mini-kv boundary handoff evidence only; it does not run a live-read gate.

## Recommendations

- ARCHIVE_V382_BEFORE_NEXT_GATE (recommendation, node-v382): Archive and verify v382 before considering a live-read gate with explicit service ownership.

## Next Actions

- Use Node v383 to archive and verify the v382 boundary handoff intake.
- Keep Java v158 as a read-only boundary handoff; it is not an active shard router.
- Keep mini-kv v149 as frozen consumer handoff evidence until a separate live-read gate owns service startup and cleanup.
