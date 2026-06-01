# Java / mini-kv route catalog cleanup current evidence report

- Service: orderops-node
- Generated at: 2026-06-01T13:42:22.470Z
- Profile version: java-mini-kv-route-catalog-cleanup-current-evidence-report.v1
- Report state: ready
- Ready: true
- Active Node version: Node v482
- Source Node version: Node v481
- Execution allowed: false

## Summary

- fileCount: 6
- presentFileCount: 6
- checkCount: 18
- passedCheckCount: 18
- javaCatalogedArtifactCount: 6
- javaConsumerReadTargetCount: 6
- miniKvV199ArchivedNodeVersionCount: 97
- miniKvV200HistoricalFixtureCount: 56
- miniKvV200BoundaryGroupCount: 39

## Checks

- javaV211FilePresent: true
- javaV211HandoffBundleReady: true
- javaV211HandoffBundleCountsStable: true
- javaV211FixtureFilePresent: true
- javaV211FixtureReady: true
- javaV211FixtureGetOnly: true
- javaV214FilePresent: true
- javaV214IntegrityReady: true
- javaV214IntegrityGuardsComplete: true
- miniKvV199FilePresent: true
- miniKvV199CloseoutReady: true
- miniKvV199PreservesNodeV480Window: true
- miniKvV200FilePresent: true
- miniKvV200AuditReady: true
- miniKvV200UsesV199Baseline: true
- miniKvV200AuditNotePresent: true
- miniKvV200AuditNoteMatchesFixture: true
- noRuntimeAuthorityOpened: true

## Java v211 Consumer Handoff Bundle

- version: Java v211
- status: passed
- readOnly: true
- executionAllowed: false
- receiptId: java-shard-readiness-v1-contract-consumer-handoff-bundle-receipt-v211
- handoffBundleEndpoint: /api/v1/ops/shard-readiness/v1-contract-consumer-handoff-bundle
- handoffBundleFixtureEndpoint: /contracts/java-shard-readiness-v1-contract-consumer-handoff-bundle-v211.fixture.json
- endpointCatalogEndpoint: /api/v1/ops/shard-readiness/v1-contract-endpoint-catalog
- endpointCatalogReceiptId: java-shard-readiness-v1-contract-endpoint-catalog-receipt-v208
- catalogedArtifactCount: 6
- requiredEvidenceCount: 9
- handoffEvidenceCount: 4
- validationCount: 3
- boundaryRuntimeClosed: true

## Java v211 Consumer Handoff Bundle Fixture

- project: advanced-order-platform
- version: Java v211
- contractName: shard-readiness.v1
- readOnly: true
- executionAllowed: false
- receiptId: java-shard-readiness-v1-contract-consumer-handoff-bundle-receipt-v211
- status: passed
- catalogedArtifactCount: 6
- consumerReadTargetCount: 6
- fixtureReadTargetCount: 6
- requiredEvidenceCount: 9
- handoffEvidenceCount: 4
- blockedOperationCount: 7
- probesAreGetOnly: true
- upstreamActionsAllowed: false
- nodeMayStartOrStopJavaOrMiniKv: false

## Java v214 Consumer Handoff Bundle Integrity

- version: Java v214
- status: passed
- readOnly: true
- executionAllowed: false
- receiptId: java-shard-readiness-v1-contract-consumer-handoff-bundle-integrity-receipt-v214
- scope: v1 contract consumer handoff bundle integrity
- guardCount: 6
- validationCount: 3
- boundaryRuntimeClosed: true

## mini-kv v199 Batch Closeout

- releaseVersion: v199
- status: node-route-catalog-cleanup-evidence-batch-closeout-read-only
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- evidenceDigest: fnv1a64:3a5716f6f09c2b3b
- fieldCount: 778
- groupCount: 38
- archivedNodeVersionCount: 97
- historicalFixtureCount: 55
- previousConsumedReleaseVersion: v198
- previousConsumptionNodeVersion: Node v480 batch closeout may consume v198 package audit
- nodeConsumer: Node v481+ may consume v199 as route catalog cleanup evidence batch closeout only
- writeCommandsAllowed: false
- adminCommandsAllowed: false
- activeRouterInstalled: false
- changesArchivedNodeEvidence: false

## mini-kv v200 Batch Closeout Audit

- releaseVersion: v200
- status: node-route-catalog-cleanup-evidence-batch-closeout-audit-read-only
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- evidenceDigest: fnv1a64:d1e889711b5d8574
- fieldCount: 800
- groupCount: 39
- archivedNodeVersionCount: 97
- historicalFixtureCount: 56
- previousConsumedReleaseVersion: v199
- previousConsumptionNodeVersion: Node v480 batch closeout may consume v199 cleanup evidence closeout
- nodeConsumer: Node v481+ may consume v200 as route catalog cleanup evidence batch closeout audit only
- writeCommandsAllowed: false
- adminCommandsAllowed: false
- activeRouterInstalled: false
- changesArchivedNodeEvidence: false

## Evidence Files

- java-v211-consumer-handoff-bundle: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\211\evidence\java-shard-readiness-v1-contract-consumer-handoff-bundle-v211.json
  - SHA-256: 67beeedfeb218c7f0b8bbb090820fc7933a42bbf3a4630f9a61d58cdca92f811
- java-v211-consumer-handoff-bundle-fixture: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\src\main\resources\static\contracts\java-shard-readiness-v1-contract-consumer-handoff-bundle-v211.fixture.json
  - SHA-256: 3254335318fea846df7c17e13fcb14dbba376695a184072274a476842d8f63d0
- java-v214-consumer-handoff-bundle-integrity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\214\evidence\java-shard-readiness-v1-contract-consumer-handoff-bundle-integrity-v214.json
  - SHA-256: 2dbb0627cb56268bedec88cc5938697bf2222379629e2dd142cf40e599f8287b
- mini-kv-v199-route-catalog-cleanup-batch-closeout: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v199.json
  - SHA-256: 5d2803d447b26dbd874740612d63e56cf88dca689b0f1fee59bbc896609e15de
- mini-kv-v200-route-catalog-cleanup-batch-closeout-audit: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v200-frozen-from-rolling.json
  - SHA-256: f97de6e20b8f207ee402e2de7e854066eadd79629baa48ac6423062da67b68eb
- mini-kv-v200-route-catalog-cleanup-batch-closeout-audit-note: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\e\200\route-catalog-cleanup-evidence-batch-closeout-audit-v200.md
  - SHA-256: 3a727ca963a1d24fb9ce7c4f84fa498ce7aa89b4c33a34f28fccdca4ba793b6a

## Evidence Endpoints

- reportJson: /api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence
- reportMarkdown: /api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence?format=markdown
- sourcePlan: docs/plans3/v481-post-java-mini-kv-current-route-catalog-cleanup-evidence-intake-roadmap.md
- nextPlan: docs/plans3/v482-post-java-mini-kv-current-route-catalog-cleanup-evidence-report-roadmap.md
- nextNodeVersion: Node v483

## Next Actions

- Archive this current evidence report before consuming Java v215 or mini-kv v201 work.
- Keep Java v215-like and mini-kv v201-like dirty work out of Node evidence until tagged.
- Keep current cleanup evidence read-only and non-authoritative for runtime execution.
