# Java / mini-kv route catalog cleanup latest sibling evidence report

- Service: orderops-node
- Generated at: 2026-06-02T06:41:47.310Z
- Profile version: java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report.v1
- Report state: ready
- Ready: true
- Active Node version: Node v540
- Source Node version: Node v538
- CI stabilization version: Node v539
- Execution allowed: false

## Summary

- fileCount: 4
- presentFileCount: 4
- snippetCount: 4
- matchedSnippetCount: 4
- checkCount: 13
- passedCheckCount: 13
- javaLatestCleanVersion: Java v274
- javaGuardCount: 4
- javaValidationCount: 3
- miniKvLatestCleanVersion: v247
- miniKvEvidenceDigest: fnv1a64:9fb71e13c517fff8
- miniKvHistoricalFixtureCount: 103
- routeCount: 223
- javaMiniKvDomainRouteCount: 59
- cleanupHandoffRouteGroupRouteCount: 25
- currentRouteCount: 224
- currentJavaMiniKvDomainRouteCount: 60
- currentCleanupHandoffRouteGroupRouteCount: 26

## Checks

- allFilesPresent: true
- evidenceResolvedFromHistoricalFixtures: true
- javaLatestReceiptReady: true
- javaFifteenVersionRunComplete: true
- javaRuntimeBoundaryClosed: true
- miniKvLatestReleaseReady: true
- miniKvFinalVerificationRouteReady: true
- miniKvRuntimeBoundaryClosed: true
- commandEvidenceExplainsVerification: true
- nodeRouteCatalogStillStable: true
- crossProjectParallelReady: true
- noRuntimeAuthorityOpened: true
- readyForRouteCatalogCleanupLatestSiblingEvidenceIntake: true
- reportRouteRegisteredInCurrentCatalog: true
- readyForRouteCatalogCleanupLatestSiblingEvidenceReport: true

## Java v274 Receipt

- version: Java v274
- status: passed
- scope: v1 contract consumer readiness handoff fifteen-version completion
- readOnly: true
- executionAllowed: false
- receiptId: java-shard-readiness-v1-contract-consumer-readiness-handoff-fifteen-version-completion-receipt-v274
- summary: v274 completes the v260-v274 fifteen-version run while keeping the frozen Java v225 readiness handoff separate from post-handoff catalog evidence.
- guardCount: 4
- validationCount: 3
- boundaryRuntimeClosed: true

## mini-kv v247 Release

- releaseVersion: v247
- status: node-route-catalog-cleanup-post-closeout-continuity-read-only
- readOnly: true
- executionAllowed: false
- evidenceDigest: fnv1a64:9fb71e13c517fff8
- sourceFrozenReleaseVersion: v246
- sourceFrozenFixturePath: fixtures/release/shard-readiness-v246.json
- continuityStage: post-closeout-continuity-node-v522-final-verification-route-readiness
- stageSequence: 47
- trackedPostCloseoutReleaseCount: 47
- nodeBatchCloseoutVersion: Node v522
- nodePlanStillLatestForMiniKv: true
- readyForNextNodeBatch: true
- nodeConsumesFreshMiniKvEvidence: false
- previousConsumedReleaseVersion: v246
- historicalFixtureCount: 103
- boundaryGroupCount: 40
- nodeConsumer: Node v523+ may consume v247 as Node v522 final verification route readiness evidence only
- writeCommandsAllowed: false
- adminCommandsAllowed: false
- activeRouterInstalled: false
- archivedNodeEvidenceMutated: false
- runtimeBoundaryClosed: true

## Route Catalog

- groupCount: 50
- routeCount: 224
- javaMiniKvDomainRouteCount: 60
- cleanupHandoffRouteGroupRouteCount: 26

## Evidence Files

- java-v274-fifteen-version-completion-receipt: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\274\evidence\java-shard-readiness-v1-contract-consumer-readiness-handoff-fifteen-version-completion-v274.json
  - SHA-256: 9f5ca6b9209a4473e356640d8976b1b6e253535d2d306411143e3b1858980c20
- java-v274-fifteen-version-completion-explanation: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\274\解释\说明.md
  - SHA-256: 9ebc2998f3d547a6fe57b2d842fbb3a2c4a511131fe112293973d5bcb1193fa6
- mini-kv-v247-node-v538-frozen-shard-readiness: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v247-node-v538.json
  - SHA-256: e29b5af4fdb285ee7cec59c8b4f19efad3a7c0a2f6025541b4578fd93acf3fcf
- mini-kv-v247-command-evidence-explanation: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\e\247\解释\说明.md
  - SHA-256: 7b26dd52a215f9775180a7247e87c3e138a0b4da48b34269f3016b12f350e05d

## Documentation Snippets

- java-v274-sequence-complete: matched
- java-v274-frozen-v225-separated: matched
- mini-kv-v247-full-ctest: matched
- mini-kv-v247-tcp-cleanup: matched

## Evidence Endpoints

- reportJson: /api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence
- reportMarkdown: /api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence?format=markdown
- sourcePlan: docs/plans3/v538-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-intake-roadmap.md
- currentPlan: docs/plans3/v540-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-roadmap.md
- nextPlan: docs/plans3/v541-post-java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-archive-roadmap.md
- nextNodeVersion: Node v541

## Next Actions

- Archive this latest sibling evidence report before adding an archive verifier.
- Keep Java and mini-kv available for a later explicitly planned read-only live smoke.
