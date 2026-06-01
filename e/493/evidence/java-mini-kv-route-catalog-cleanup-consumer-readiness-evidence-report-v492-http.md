# Java / mini-kv route catalog cleanup consumer readiness evidence report

- Service: orderops-node
- Generated at: 2026-06-01T23:18:23.881Z
- Profile version: java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report.v1
- Report state: ready
- Ready: true
- Active Node version: Node v492
- Source Node version: Node v491
- Execution allowed: false

## Summary

- fileCount: 15
- presentFileCount: 15
- checkCount: 21
- passedCheckCount: 21
- javaGuardCount: 20
- javaDigestEvidenceCount: 5
- miniKvVersionedReleaseCount: 8
- miniKvLatestVersionedRelease: v209
- miniKvLatestObservedAuditRelease: v210
- miniKvLatestVersionedFixtureCount: 65
- miniKvBoundaryGroupCount: 40

## Checks

- javaV220FilePresent: true
- javaV220DigestReady: true
- javaV220DigestCountsStable: true
- javaV220FixtureFilePresent: true
- javaV220FixtureReady: true
- javaV220FixtureGetOnlyBoundary: true
- javaV221FilePresent: true
- javaV221SnapshotFreezeReady: true
- javaV222FilePresent: true
- javaV222HistoricalCompatibilityReady: true
- javaV223FilePresent: true
- javaV223IntegrityReady: true
- javaV224FilePresent: true
- javaV224CompletionReady: true
- miniKvVersionedReleaseFilesPresent: true
- miniKvPostCloseoutReleaseChainReady: true
- miniKvPostCloseoutReleaseChainSequential: true
- miniKvPostCloseoutDigestsStable: true
- miniKvV210AuditNotePresent: true
- miniKvV210AuditNoteDocumentsRollingBoundary: true
- noRuntimeAuthorityOpened: true

## Java v220 Consumer Evidence Digest

- version: Java v220
- status: passed
- scope: v1 contract consumer evidence digest
- readOnly: true
- executionAllowed: false
- receiptId: java-shard-readiness-v1-contract-consumer-evidence-digest-receipt-v220
- endpoint: /api/v1/ops/shard-readiness/v1-contract-consumer-evidence-digest
- fixtureEndpoint: /contracts/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.fixture.json
- verificationChecklistEndpoint: /api/v1/ops/shard-readiness/v1-contract-consumer-verification-checklist
- digestEvidenceCount: 5
- digestCheckCount: 7
- validationCount: 2
- boundaryRuntimeClosed: true

## Java v220 Consumer Evidence Digest Fixture

- project: advanced-order-platform
- version: Java v220
- contractName: shard-readiness.v1
- readOnly: true
- executionAllowed: false
- shardEnabled: false
- evidenceDigestEndpoint: /api/v1/ops/shard-readiness/v1-contract-consumer-evidence-digest
- evidenceDigestFixtureEndpoint: /contracts/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.fixture.json
- verificationChecklistEndpoint: /api/v1/ops/shard-readiness/v1-contract-consumer-verification-checklist
- verificationChecklistFixtureEndpoint: /contracts/java-shard-readiness-v1-contract-consumer-verification-checklist-v215.fixture.json
- checklistItemCount: 7
- requiredEvidenceCount: 5
- verificationCheckCount: 7
- digestEvidenceCount: 5
- digestCheckCount: 7
- blockedOperationCount: 7
- probesAreGetOnly: true
- upstreamActionsAllowed: false
- startsJavaService: false
- startsMiniKvService: false
- nodeMayStartOrStopJavaOrMiniKv: false
- status: passed

## Java v221-v224 Consumer Readiness Guards

- Java v221: v220 consumer evidence digest snapshot freeze
  - status: passed
  - guardCount: 5
  - boundaryRuntimeClosed: true
- Java v222: v220 consumer evidence digest historical compatibility
  - status: passed
  - guardCount: 4
  - boundaryRuntimeClosed: true
- Java v223: v1 contract consumer evidence digest integrity
  - status: passed
  - guardCount: 6
  - boundaryRuntimeClosed: true
- Java v224: v1 contract consumer readiness completion
  - status: passed
  - guardCount: 5
  - boundaryRuntimeClosed: true

## mini-kv v202-v209 Versioned Continuity

- v202: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v201
  - sourceFrozenReleaseVersion: v201
  - evidenceDigest: fnv1a64:cd0c634b2fc44eff
  - historicalFixtureCount: 58
- v203: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v202
  - sourceFrozenReleaseVersion: v202
  - evidenceDigest: fnv1a64:bed1ac036b8f548e
  - historicalFixtureCount: 59
- v204: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v203
  - sourceFrozenReleaseVersion: v203
  - evidenceDigest: fnv1a64:670b62f7c203b814
  - historicalFixtureCount: 60
- v205: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v204
  - sourceFrozenReleaseVersion: v204
  - evidenceDigest: fnv1a64:c00dd62f28564fed
  - historicalFixtureCount: 61
- v206: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v205
  - sourceFrozenReleaseVersion: v205
  - evidenceDigest: fnv1a64:1e5f3dc941b1a90e
  - historicalFixtureCount: 62
- v207: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v206
  - sourceFrozenReleaseVersion: v206
  - evidenceDigest: fnv1a64:16dd9ba05e5b3fe4
  - historicalFixtureCount: 63
- v208: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v207
  - sourceFrozenReleaseVersion: v207
  - evidenceDigest: fnv1a64:ef5973d3894665a6
  - historicalFixtureCount: 64
- v209: node-route-catalog-cleanup-post-closeout-continuity-read-only
  - previousConsumedReleaseVersion: v208
  - sourceFrozenReleaseVersion: v208
  - evidenceDigest: fnv1a64:6c283479e8bb1988
  - historicalFixtureCount: 65

## mini-kv v210 Audit Note

- releaseVersion: v210
- sourceVersionedRelease: v209
- rollingCurrentRejectedForBaseline: true
- noteFilePresent: true
- noteMentionsRollingFixture: true
- noteMentionsFallbackV209: true
- noteMentionsAllTestsPassed: true
- noteMentionsTcpSmoke: true

## Evidence Files

- java-v220-consumer-evidence-digest: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\220\evidence\java-shard-readiness-v1-contract-consumer-evidence-digest-v220.json
  - SHA-256: 55bdb8b1cb690673f51c53d2dba5ba2c0119014d84f47bf71994ba078ec866e0
- java-v220-consumer-evidence-digest-fixture: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\src\main\resources\static\contracts\java-shard-readiness-v1-contract-consumer-evidence-digest-v220.fixture.json
  - SHA-256: 13cdbcbbfa227cb15f0580f0dcbd49fc5cb9ad7a3d4521dc9f54920e7b5cc532
- java-v221-consumer-evidence-digest-snapshot-freeze: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\221\evidence\java-shard-readiness-v220-consumer-evidence-digest-snapshot-freeze-v221.json
  - SHA-256: af2e0edec6529111b753995cf0ae8487e8be644d0feeafc10daae5027d3336b6
- java-v222-consumer-evidence-digest-historical-compatibility: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\222\evidence\java-shard-readiness-v220-consumer-evidence-digest-historical-compatibility-v222.json
  - SHA-256: 3f155355bc59b7a3c77a0866a6225965b4bbf717eb399c306911904f25b51376
- java-v223-consumer-evidence-digest-integrity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\223\evidence\java-shard-readiness-v1-contract-consumer-evidence-digest-integrity-v223.json
  - SHA-256: a064d0372905194264c6b1cd6393b7f8f431edbfba718e214baa0e374db6a9bd
- java-v224-consumer-readiness-completion: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\e\224\evidence\java-shard-readiness-v1-contract-consumer-readiness-completion-v224.json
  - SHA-256: 2fcc4dcf8f73343c6a69230ff374bab5f234ab20bdc07841c72238829108bd76
- mini-kv-v210-route-catalog-cleanup-post-closeout-audit-note: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\e\210\解释\说明.md
  - SHA-256: c72bffcf0c5739bd0f2f08857872a6dbe26da25e494ef95be64d1e9170bd5e9b
- mini-kv-v202-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v202.json
  - SHA-256: 3beac2af1afa927981ea6b64fddaa65a9fc7c17c8fde5c0e97d987822d6c1f55
- mini-kv-v203-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v203.json
  - SHA-256: 1c9cd6f95135621a0e10afb595f786df9e12063660b67c8bf96c0b4c6ee47254
- mini-kv-v204-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v204.json
  - SHA-256: 27e7e596635f8870d490456b3b70b5e8de74e126cdd9ed61e6bf8b59bb244b52
- mini-kv-v205-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v205.json
  - SHA-256: 973db555474531947bb69fb922ba38fc522e077a3527a935a53a903191ae2334
- mini-kv-v206-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v206.json
  - SHA-256: c538d7880037bc4459881839d344bfb0496833b29db05b9c6721301ad0366b2c
- mini-kv-v207-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v207.json
  - SHA-256: e72d2aa0c880273a3f580600d0b86dec8b2a6cc461e8f06125174bdd7e9374d4
- mini-kv-v208-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v208.json
  - SHA-256: 21ac93ab159ab081e34f7367ba2bf2d7a39eceaa76b46a773d0a1fb9c844b193
- mini-kv-v209-post-closeout-continuity: present
  - Resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\shard-readiness-v209.json
  - SHA-256: 418a4d417c077ea84f1d806ccf82b95e57b050b81190ff5fb1d5d48a5b312950

## Evidence Endpoints

- reportJson: /api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence
- reportMarkdown: /api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence?format=markdown
- sourcePlan: docs/plans3/v491-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-roadmap.md
- nextPlan: docs/plans3/v492-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-roadmap.md
- nextNodeVersion: Node v493

## Next Actions

- Archive this consumer readiness evidence report before adding an archive verifier.
- Keep mini-kv v210 as an audit note until a versioned fixture is available.
- Let Java and mini-kv continue parallel work; Node does not require fresh sibling changes for v493.
