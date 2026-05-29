# Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake

- Service: orderops-node
- Generated at: 2026-05-29T23:01:12.767Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1
- Intake state: java-mini-kv-declared-operator-lifecycle-evidence-intake-ready
- Intake decision: consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence
- Active Node version: Node v388
- Source Node version: Node v387
- Ready for Node v389 archive verification: true
- Ready for runtime live-read gate: false
- Evidence intake only: true
- Declared operator lifecycle evidence present: true
- Runtime gate requires separate approval: true
- Live read gate allowed: false
- Runtime probe allowed: false
- Starts Java service: false
- Starts mini-kv service: false
- Stops Java service: false
- Stops mini-kv service: false
- Connects managed audit: false
- Execution allowed: false
- Active shard prototype enabled: false

## Source Node v387

- sourceVersion: Node v387
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification.v1
- archiveVerificationState: java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified
- archiveVerificationDecision: archive-operator-service-lifecycle-evidence-intake-and-prepare-v388
- readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: true
- readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate: true
- readyForRuntimeLiveReadGate: false
- activeNodeVersion: Node v387
- sourceNodeVersion: Node v386
- archiveVerificationDigest: e70ec6e075e5196aa79389d48afdb98de806611b65ff74eb326589ba08565b44
- sourceCheckCount: 45
- sourcePassedCheckCount: 45
- replayCheckCount: 45
- replayPassedCheckCount: 45
- declaredMiniKvOperatorEvidenceCount: 0
- productionBlockerCount: 0
- archiveVerificationOnly: true
- rerunsLiveRead: false
- startsJavaService: false
- startsMiniKvService: false
- stopsJavaService: false
- stopsMiniKvService: false
- connectsManagedAudit: false
- executionAllowed: false
- activeShardPrototypeEnabled: false

## Java v161 Declared Operator Lifecycle

- project: advanced-order-platform
- version: Java v161
- readOnly: true
- executionAllowed: false
- operatorOwned: true
- operatorLifecycleDeclared: true
- startupCommandDeclared: true
- portDeclared: true
- getOnlySmokeDeclared: true
- cleanupDeclared: true
- failClosedDeclared: true
- runtimeProbeAllowed: false
- nodeMayStartService: false
- nodeMayStopService: false
- sourceLifecycleEvidenceVersion: Java v160
- lastVerifiedByNodeVersion: Node v387
- nextNodeConsumerHint: Node v388
- javaServiceOwner: java-platform-operator
- javaStartOwner: java-platform-operator
- javaStopOwner: java-platform-operator
- declaredWorkingDirectory: advanced-order-platform
- declaredStartupCommand: mvn spring-boot:run -Dspring-boot.run.profiles=local
- declaredPorts: ["8080"]
- javaBaseUrlHandle: java-local-readonly-base-url
- getOnlySmokeTargets: ["GET /actuator/health","GET /api/v1/ops/shard-readiness/declared-operator-lifecycle","GET /api/v1/ops/shard-readiness/operator-service-lifecycle","GET /api/v1/ops/shard-readiness/live-read-gate-plan"]
- failClosedRules: ["missing-java-service-owner-blocks-runtime-gate","missing-java-start-command-blocks-runtime-gate","missing-java-port-blocks-runtime-gate","missing-java-cleanup-owner-blocks-runtime-gate","non-get-smoke-target-blocks-runtime-gate","failed-java-smoke-blocks-node-consumption"]
- cleanupResponsibilities: ["java-operator-stops-service-if-java-operator-started-it","node-must-not-stop-java-from-declared-evidence","node-may-clean-only-processes-started-by-separate-approved-runtime-gate","archive-java-smoke-output-before-cleanup"]
- runtimeGatePrerequisites: ["mini-kv-declared-operator-lifecycle-evidence","separate-approved-runtime-live-read-gate","operator-confirms-java-service-running-and-port","operator-confirms-get-only-smoke-before-node-consumption","node-records-fail-closed-result-before-consuming"]
- stopConditions: ["source-lifecycle-status-not-passed","request-would-start-java-from-this-evidence","request-would-stop-java-from-this-evidence","request-would-run-runtime-probe-before-mini-kv-declared-lifecycle","request-would-run-non-get-smoke","request-would-read-credential-or-raw-endpoint-value","request-would-enable-active-shard-router-or-write-routing"]
- evidencePath: e/161/evidence/java-shard-readiness-declared-operator-lifecycle-v161.json
- status: passed

## mini-kv v152 Declared Operator Lifecycle

- project: mini-kv
- contract: shard-readiness.v1
- releaseVersion: v152
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- status: declared-operator-lifecycle-no-runtime-read-only
- evidencePath: fixtures/release/shard-readiness.json
- writeCommandsAllowed: false
- adminCommandsAllowed: false
- loadRestoreCompactAllowed: false
- setnxexExecutionAllowed: false
- activeRouterInstalled: false
- storageDirectoriesCreated: false
- multiProcessStarted: false
- archivedNodeEvidenceMutated: false
- previousConsumedReleaseVersion: v151
- previousConsumedFixturePath: fixtures/release/shard-readiness-v151.json
- previousConsumptionNodeVersion: Node v388 pending separate runtime gate approval
- rollingCurrentUsedForHistoricalBaseline: false
- nodeV387ArchiveVerificationPreserved: true
- nodeV388ReadsUnfinishedUpstream: false
- archivedNodeVersions: ["Node v370","Node v371","Node v372","Node v373","Node v374","Node v375","Node v376","Node v377","Node v378","Node v379","Node v380","Node v381","Node v382","Node v383","Node v384","Node v385","Node v386","Node v387"]
- changesArchivedNodeEvidence: false
- futureNodeConsumer: Node v388 or later after declared operator lifecycle evidence
- operatorTemplateFreezeFrozenReleaseVersion: v151
- operatorTemplateFreezeFrozenFixturePath: fixtures/release/shard-readiness-v151.json
- operatorTemplateFreezePreservesTemplate: true
- frozenServiceOwnerDeclared: false
- frozenStartupCommandDeclared: false
- frozenPortListDeclared: false
- frozenGetOnlySmokeTargetDeclared: false
- frozenCleanupResponsibilityDeclared: false
- frozenRuntimeProbeAllowed: false
- frozenExecutionAllowed: false
- operatorEvidenceMode: declared-lifecycle-no-runtime
- operatorSourceFrozenReleaseVersion: v151
- operatorSourceFrozenFixturePath: fixtures/release/shard-readiness-v151.json
- operatorOwnedServiceLifecycleDeclared: true
- serviceOwnerDeclared: true
- serviceOwnerHandle: mini-kv-local-operator
- startupCommandDeclared: true
- startupCommand: minikv_server.exe <operator-approved-loopback-port> 127.0.0.1
- portListDeclared: true
- declaredPortHandles: ["operator-approved-loopback-port"]
- getOnlySmokeTargetDeclared: true
- getOnlySmokeTarget: GET-only SHARDJSON evidence read
- failClosedBehaviorDeclared: true
- failClosedBehavior: missing evidence or port conflict blocks runtime gate
- cleanupResponsibilityDeclared: true
- cleanupResponsibility: operator stops service and verifies no LISTENING port
- runtimeGateApproved: false
- startsServices: false
- runtimeProbeAllowed: false
- liveReadAllowed: false
- activeShardPrototypeEnabled: false
- routerActivationAllowed: false
- writeRoutingAllowed: false
- operatorExecutionAllowed: false
- requiresSeparateRuntimeGate: true
- requiredBeforeRuntimeGate: ["operator approval record","concrete loopback port assignment","GET-only smoke command","cleanup proof"]
- evidenceDigest: fnv1a64:55cd5b8db109c64f

## mini-kv v151 Frozen Operator Template

- project: mini-kv
- releaseVersion: v151
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- status: operator-service-lifecycle-template-read-only
- operatorEvidenceMode: template-only-no-runtime
- operatorOwnedServiceLifecycleRequired: true
- serviceOwnerDeclared: false
- startupCommandDeclared: false
- portListDeclared: false
- getOnlySmokeTargetDeclared: false
- cleanupResponsibilityDeclared: false
- runtimeProbeAllowed: false
- liveReadAllowed: false
- executionAllowedByOperatorTemplate: false

## Evidence Files

- java-v161-declared-operator-lifecycle: exists=true; fallback=true; bytes=2620; digest=db64ca2231e4b907ff3370627a4bd5dcd9b3e50a79ea79727737ed91bc600454; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\161\evidence\java-shard-readiness-declared-operator-lifecycle-v161.json
- mini-kv-v152-declared-operator-lifecycle: exists=true; fallback=true; bytes=10941; digest=f1499995551fc127d81906a5b25c1a84192f8ba0ca8f0c083d4a2ac220a657ec; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v152.json
- mini-kv-v151-frozen-operator-template: exists=true; fallback=true; bytes=8494; digest=6748fdf9400dda1ed69313ed8ad3ba6cc8f5aeedc02b707d5478015e8bb101a8; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v151.json

## Intake

- intakeMode: java-mini-kv-declared-operator-lifecycle-evidence-intake
- sourceSpan: Node v387 + Java v161 + mini-kv v152
- sourceNodeV387Digest: e70ec6e075e5196aa79389d48afdb98de806611b65ff74eb326589ba08565b44
- javaV161Digest: db64ca2231e4b907ff3370627a4bd5dcd9b3e50a79ea79727737ed91bc600454
- miniKvV152Digest: f1499995551fc127d81906a5b25c1a84192f8ba0ca8f0c083d4a2ac220a657ec
- miniKvV151Digest: 6748fdf9400dda1ed69313ed8ad3ba6cc8f5aeedc02b707d5478015e8bb101a8
- usesFrozenJavaV161DeclaredLifecycleEvidence: true
- usesFrozenMiniKvV152DeclaredLifecycleEvidence: true
- verifiesMiniKvV151OperatorTemplateFreeze: true
- javaDeclaredOperatorLifecyclePresent: true
- miniKvDeclaredOperatorLifecyclePresent: true
- miniKvRuntimeGateApproved: false
- runtimeGateStillBlocked: true
- consumesRollingCurrentAsHistoricalBaseline: false
- liveReadGateAllowed: false
- runtimeProbeAllowed: false
- activeShardPrototypeEnabled: false
- ready: true
- intakeDigest: 1ca8be7363556c933644d96c3d17ac06e75f7c40469be52bf8e12c2a03d793b4
- startsUpstreamServices: false
- stopsUpstreamServices: false
- writesUpstreamState: false
- opensManagedAuditConnection: false
- nextNodeVersionSuggested: Node v389

## Checks

- sourceNodeV387Ready: true
- sourceNodeV387ArchiveVerified: true
- sourceNodeV387ChecksAllPassed: true
- sourceNodeV387BoundariesClosed: true
- javaV161FilePresent: true
- javaV161VersionValid: true
- javaV161ReadOnly: true
- javaV161ExecutionBlocked: true
- javaV161DeclaredLifecycleComplete: true
- javaV161NodeLifecycleBlocked: true
- javaV161ReferencesV160AndNodeV387: true
- javaV161OwnerPortAndStartupPresent: true
- javaV161SmokeTargetsReadOnlyGet: true
- javaV161FailClosedRulesComplete: true
- javaV161CleanupResponsibilitiesSafe: true
- javaV161RuntimeGatePrerequisitesComplete: true
- javaV161StopConditionsSafe: true
- javaV161StatusPassed: true
- miniKvV152FilePresent: true
- miniKvV152ReleaseVersionValid: true
- miniKvV152ReadOnly: true
- miniKvV152ExecutionBlocked: true
- miniKvV152ShardDisabled: true
- miniKvV152StatusAccepted: true
- miniKvV152BoundarySafe: true
- miniKvV152HistoricalFallbackSafe: true
- miniKvV152PreservesNodeV387Archive: true
- miniKvV152OperatorTemplateFreezeSafe: true
- miniKvV152DeclaredLifecycleComplete: true
- miniKvV152RuntimeGateStillBlocked: true
- miniKvV152RequiresSeparateRuntimeGate: true
- miniKvV152NoRollingCurrentBaseline: true
- miniKvV151FrozenTemplatePresent: true
- miniKvV151FrozenTemplateSafe: true
- allEvidenceUsesHistoricalFallbackSnapshots: true
- runtimeGateStillBlocked: true
- intakeDigestStable: true
- noAutomaticUpstreamStartStop: true
- noUpstreamMutation: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForDeclaredOperatorLifecycleEvidenceIntake: true

## Summary

- evidenceSourceCount: 3
- readyEvidenceSourceCount: 3
- javaSmokeTargetCount: 4
- javaDeclaredPortCount: 1
- miniKvArchivedNodeVersionCount: 18
- miniKvDeclaredPortHandleCount: 1
- miniKvRequiredBeforeRuntimeGateCount: 4
- declaredOperatorEvidenceSourceCount: 2
- checkCount: 45
- passedCheckCount: 45
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- DECLARED_LIFECYCLE_INTAKE_IS_NOT_RUNTIME_GATE (warning, node-v388): v388 consumes declared lifecycle evidence only; it does not run Java, mini-kv, or runtime probes.

## Recommendations

- ARCHIVE_V388_BEFORE_RUNTIME_GATE_PLAN (recommendation, node-v388): Archive and verify v388 before writing any separate runtime live-read gate plan.

## Next Actions

- Use Node v389 to archive and verify the v388 declared operator lifecycle evidence intake.
- Plan a separate runtime live-read gate only after operator approval and concrete loopback ports are recorded.
- Do not run runtime probes, start services, or enable active shard routing from this evidence intake.
