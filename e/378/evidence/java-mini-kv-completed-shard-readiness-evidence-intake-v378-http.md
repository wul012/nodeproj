# Managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake

- Service: orderops-node
- Generated at: 2026-05-29T04:36:12.758Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1
- Intake state: java-mini-kv-completed-shard-readiness-evidence-intake-ready
- Intake decision: consume-java-v156-and-mini-kv-v146-completed-evidence
- Active Node version: Node v378
- Source Node version: Node v377
- Ready for Node v379 archive verification: true
- Evidence intake only: true
- Reruns live read: false
- Starts Java service: false
- Starts mini-kv service: false
- Stops Java service: false
- Stops mini-kv service: false
- Connects managed audit: false
- Execution allowed: false

## Source Node v377

- sourceVersion: Node v377
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification.v1
- archiveVerificationState: java-mini-kv-shard-readiness-evidence-consumption-archive-verified
- archiveVerificationDecision: archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378
- readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: true
- readyForNodeV378CompletedEvidenceIntake: true
- activeNodeVersion: Node v377
- sourceNodeVersion: Node v376
- archiveVerificationDigest: 00711de2cdbee6828a2804c9af935cc1b783af602b3eb83d4d6355c31d728956
- checkCount: 30
- passedCheckCount: 30
- productionBlockerCount: 0
- startsJavaService: false
- startsMiniKvService: false
- stopsJavaService: false
- stopsMiniKvService: false
- connectsManagedAudit: false
- executionAllowed: false

## Java v156 Verification

- project: advanced-order-platform
- version: Java v156
- readOnly: true
- executionAllowed: false
- sourceIndexVersion: Java v155
- sourceIndexEvidencePath: e/155/evidence/java-shard-readiness-evidence-index-v155.json
- verifiedEntryCount: 2
- verifiedEvidenceVersions: ["Java v153","Java v154"]
- checkCount: 8
- passedCheckCount: 8
- failedCheckCount: 0
- fallbackPolicy: ["use-versioned-fixture-endpoints-only","use-versioned-archive-paths-only","do-not-read-rolling-current-files-for-historical-baselines","fail-closed-if-versioned-source-is-missing"]
- status: passed
- evidencePath: e/156/evidence/java-shard-readiness-evidence-verification-v156.json

## Java v155 Index

- project: advanced-order-platform
- version: Java v155
- readOnly: true
- executionAllowed: false
- lastConsumedByNodeVersion: Node v376
- requiredContractFieldCount: 9
- evidenceEntryCount: 2
- frozenEntryCount: 2
- rollingCurrentPointerCount: 0
- evidenceVersions: ["Java v153","Java v154"]
- fallbackPolicy: ["use-versioned-fixture-endpoints-only","use-versioned-archive-paths-only","do-not-read-rolling-current-files-for-historical-baselines","fail-closed-if-versioned-source-is-missing"]
- compatibilityGuarantees: ["v153-core-contract-remains-frozen","v154-hardening-remains-additive","v155-index-does-not-enable-sharding","no-node-v370-v376-archive-mutation","no-order-payment-inventory-ledger-sql-change"]
- status: passed
- evidencePath: e/155/evidence/java-shard-readiness-evidence-index-v155.json

## mini-kv v146 Snapshot

- project: mini-kv
- contract: shard-readiness.v1
- evidenceType: shard_readiness
- releaseVersion: v146
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- shardCount: 1
- slotCount: 16
- routingMode: single-shard-readiness-prototype
- status: historical-fallback-hardened-read-only
- evidencePath: fixtures/release/shard-readiness.json
- previousConsumedReleaseVersion: v145
- previousConsumedFixturePath: fixtures/release/shard-readiness-v145.json
- rollingCurrentUsedForHistoricalBaseline: false
- nodeV376ConsumptionPreserved: true
- archivedNodeVersions: ["Node v370","Node v371","Node v372","Node v373","Node v374","Node v375","Node v376"]
- changesArchivedNodeEvidence: false
- writeCommandsAllowed: false
- adminCommandsAllowed: false
- loadRestoreCompactAllowed: false
- activeRouterInstalled: false
- storageDirectoriesCreated: false
- multiProcessStarted: false
- futureNodeConsumer: Node v378 or later after v377 archive verification
- evidenceDigest: fnv1a64:6847d87decb76fcb

## Evidence Files

- java-v156-verification: exists=true; fallback=true; bytes=2507; digest=f1b6463c52ae04e996a39b08747c516f7c79626cd509a4b34863d99df463bf60; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\156\evidence\java-shard-readiness-evidence-verification-v156.json
- java-v155-index: exists=true; fallback=true; bytes=1840; digest=696ae9761710b53d90fafdb1897e3da2bb272fdd5cb595b1e0cefb7285da2fa0; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\155\evidence\java-shard-readiness-evidence-index-v155.json
- mini-kv-v146-snapshot: exists=true; fallback=true; bytes=3076; digest=d5000b905caa541e6d8da4da9cc0665cb0c1d1be576ca1ecf09005def86905cc; resolved=D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v146.json

## Intake

- intakeMode: java-mini-kv-completed-shard-readiness-evidence-intake
- sourceSpan: Node v377 + Java v156/v155 + mini-kv v146
- sourceNodeV377Digest: 00711de2cdbee6828a2804c9af935cc1b783af602b3eb83d4d6355c31d728956
- javaV156Digest: f1b6463c52ae04e996a39b08747c516f7c79626cd509a4b34863d99df463bf60
- javaV155Digest: 696ae9761710b53d90fafdb1897e3da2bb272fdd5cb595b1e0cefb7285da2fa0
- miniKvV146Digest: d5000b905caa541e6d8da4da9cc0665cb0c1d1be576ca1ecf09005def86905cc
- usesFrozenJavaV156Verification: true
- usesFrozenJavaV155Index: true
- usesFrozenMiniKvV146Snapshot: true
- consumesRollingCurrentAsHistoricalBaseline: false
- ready: true
- intakeDigest: fdc3d626bb92295e7c6e5da7f99f66d373c7c2864cc4793cb2b991f985b3b0af
- startsUpstreamServices: false
- stopsUpstreamServices: false
- writesUpstreamState: false
- opensManagedAuditConnection: false
- nextNodeVersionSuggested: Node v379

## Checks

- sourceNodeV377Ready: true
- sourceNodeV377ArchiveVerified: true
- sourceNodeV377BoundariesClosed: true
- javaV156VerificationFilePresent: true
- javaV155IndexFilePresent: true
- javaV156VersionValid: true
- javaV155VersionValid: true
- javaV156ReadOnly: true
- javaV156ExecutionBlocked: true
- javaV156StatusPassed: true
- javaV156ChecksAllPassed: true
- javaV156ReferencesJavaV155: true
- javaV156VerifiedEntryCountValid: true
- javaV156NoRollingCurrentPolicy: true
- javaV155EntriesFrozen: true
- javaV155NoRollingCurrentPointers: true
- javaV155RequiredFieldsIndexed: true
- miniKvV146SnapshotPresent: true
- miniKvV146ReleaseVersionValid: true
- miniKvV146ReadOnly: true
- miniKvV146ExecutionBlocked: true
- miniKvV146StatusAccepted: true
- miniKvV146HistoricalFallbackHardened: true
- miniKvV146PreservesNodeV376: true
- miniKvV146DoesNotMutateArchivedNodeEvidence: true
- miniKvV146BoundarySafe: true
- miniKvV146FutureNodeConsumerReady: true
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
- readyForCompletedShardReadinessEvidenceIntake: true

## Summary

- evidenceSourceCount: 3
- readyEvidenceSourceCount: 3
- javaVerificationCheckCount: 8
- javaVerificationPassedCheckCount: 8
- requiredContractFieldCount: 9
- archivedNodeVersionCount: 7
- checkCount: 38
- passedCheckCount: 38
- productionBlockerCount: 0
- warningCount: 2
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- COMPLETED_EVIDENCE_IS_STILL_READINESS_ONLY (warning, shard-readiness): Java v156 and mini-kv v146 are completed evidence inputs, not active shard routing.
- SOURCE_MINI_KV_V146_WAS_CURRENT_FILE (warning, mini-kv-v146): mini-kv v146 completed evidence came from current output, so Node freezes it as shard-readiness-v146.json.

## Recommendations

- ARCHIVE_V378_BEFORE_NEXT_CONSUMPTION (recommendation, node-v378): Archive and verify v378 before consuming another Java/mini-kv shard-readiness step.

## Next Actions

- Use Node v379 to verify the v378 archive before consuming another shard-readiness step.
- Keep Java and mini-kv parallel work independent; Node should consume only completed frozen evidence.
- Do not convert readiness evidence into active shard routing without a separate mini-kv prototype plan.
