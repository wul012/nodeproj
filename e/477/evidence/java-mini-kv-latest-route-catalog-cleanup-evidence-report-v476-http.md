# Java / mini-kv route catalog cleanup latest evidence report

- Service: orderops-node
- Generated at: 2026-06-01T12:05:09.320Z
- Profile version: java-mini-kv-route-catalog-cleanup-latest-evidence-report.v1
- Report state: ready
- Ready: true
- Active Node version: Node v476
- Source Node version: Node v475
- Execution allowed: false

## Summary

- fileCount: 4
- presentFileCount: 4
- checkCount: 16
- passedCheckCount: 16
- javaV1RouteCount: 6
- javaEndpointCatalogCount: 6
- miniKvArchivedNodeVersionCount: 89
- miniKvHistoricalFixtureCount: 49

## Checks

- javaV207FilePresent: true
- javaV207ControllerSplitReady: true
- javaV207RouteSplitCountStable: true
- javaV207RuntimeBoundaryClosed: true
- javaV208FilePresent: true
- javaV208EndpointCatalogReady: true
- javaV208EndpointCatalogCountsStable: true
- javaV208RuntimeBoundaryClosed: true
- javaV208FixtureFilePresent: true
- javaV208FixtureReady: true
- javaV208FixtureGetOnly: true
- miniKvV193FilePresent: true
- miniKvV193AuditFreezeReady: true
- miniKvV193PreservesNodeV472Window: true
- miniKvV193UsesV192Baseline: true
- noRuntimeAuthorityOpened: true

## Java v207 Controller Split

- version: Java v207
- status: passed
- readOnly: true
- executionAllowed: false
- sourceController: OpsShardReadinessController
- newController: OpsShardReadinessV1ContractController
- v1RouteCount: 6
- mainControllerKeepsCount: 3
- guardsCount: 4
- boundaryRuntimeClosed: true

## Java v208 Endpoint Catalog

- version: Java v208
- status: passed
- readOnly: true
- executionAllowed: false
- endpointCatalogEndpoint: /api/v1/ops/shard-readiness/v1-contract-endpoint-catalog
- endpointCatalogFixtureEndpoint: /contracts/java-shard-readiness-v1-contract-endpoint-catalog-v208.fixture.json
- contractEndpointCount: 6
- catalogedArtifactCount: 6
- registryPairCount: 7
- includedInOpsEvidenceProbes: true
- boundaryRuntimeClosed: true

## Java v208 Endpoint Catalog Fixture

- version: Java v208
- contractName: shard-readiness.v1
- readOnly: true
- executionAllowed: false
- endpointCount: 6
- liveProbeEndpointCount: 6
- fixtureProbeEndpointCount: 6
- evidencePathCount: 6
- probesAreGetOnly: true
- upstreamActionsAllowed: false
- nodeMayStartOrStopJavaOrMiniKv: false
- status: passed

## mini-kv v193 Handoff Audit Freeze

- releaseVersion: v193
- status: node-route-catalog-cleanup-closeout-handoff-audit-freeze-read-only
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- archivedNodeVersionCount: 89
- historicalFixtureCount: 49
- previousConsumedReleaseVersion: v192
- previousConsumptionNodeVersion: Node v472 route catalog cleanup closeout may consume v192 handoff audit
- nodeConsumer: Node v472+ may consume v193 as route catalog cleanup closeout handoff audit freeze only
- evidenceDigest: fnv1a64:0aad0fd5d2732af5
- writeCommandsAllowed: false
- activeRouterInstalled: false
- fieldCount: 648
- groupCount: 32

## Evidence Files

- java-v207-controller-split: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\207\evidence\java-shard-readiness-v1-contract-controller-split-v207.json
  - SHA-256: 317c8d5c5a7dd9c6fed2cd31b9fb50c55ee1963622b102c10e5e23694dc02fd8
- java-v208-endpoint-catalog: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\208\evidence\java-shard-readiness-v1-contract-endpoint-catalog-v208.json
  - SHA-256: e02063e732f92f79b79030d24c6da176d5d657e13e6cba106be4710804e37e2d
- java-v208-endpoint-catalog-fixture: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\src\main\resources\static\contracts\java-shard-readiness-v1-contract-endpoint-catalog-v208.fixture.json
  - SHA-256: a66d8a893ca591435a31866413bc8c43a5c79b23eb06ee09a32df6a58186211d
- mini-kv-v193-handoff-audit-freeze: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v193.json
  - SHA-256: f97f7173a59748f665b8c5cb6a684fecb46767773c8eed9a978a403ed785d926

## Evidence Endpoints

- reportJson: /api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-evidence
- reportMarkdown: /api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-evidence?format=markdown
- sourcePlan: docs/plans3/v475-post-java-mini-kv-latest-route-catalog-cleanup-evidence-intake-roadmap.md
- nextPlan: docs/plans3/v476-post-java-mini-kv-latest-route-catalog-cleanup-evidence-report-roadmap.md
- nextNodeVersion: Node v477

## Next Actions

- Archive and verify this latest evidence report before consuming Java v209 or mini-kv v194.
- Keep dirty Java v210-like and mini-kv v195-like work out of Node evidence until tagged.
- Keep route catalog cleanup evidence read-only and non-authoritative for runtime execution.
