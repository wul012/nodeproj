# Managed audit manual sandbox connection credential resolver controlled read-only shard preview

- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1
- Preview state: controlled-read-only-shard-preview-ready
- Preview decision: preview-java-and-mini-kv-shard-readiness
- Ready: true
- Active Node version: Node v581
- Source Node version: Node v580
- Preview only: true
- Live read only: true
- Execution allowed: false
- Starts Java service: false
- Starts mini-kv service: false
- Stops Java service: false
- Stops mini-kv service: false
- Active shard router allowed: false
- Write routing allowed: false
- LOAD/RESTORE/COMPACT allowed: false
- Preview digest: e02de904f8bd83da212ebd1cb1f2b4d7c10ebc0ba18fee81342cb453c24c68b9

## Java Preview
- version: Java v289
- releaseVersion: null
- shardEnabled: false
- shardCount: 0
- slotCount: 0
- routingMode: read-only-preview
- status: passed
- shardMapCount: null
- keyRoutingSampleCount: null
- Read status: passed-read
- Endpoint: GET /api/v1/ops/shard-readiness
- Latency ms: 3

## mini-kv Preview
- version: 0.262.0
- releaseVersion: v262
- shardEnabled: false
- shardCount: 1
- slotCount: 16
- routingMode: single-shard-readiness-prototype
- status: prototype-ready-read-only
- shardMapCount: 1
- keyRoutingSampleCount: 2
- Read status: passed-read
- Command: SHARDJSON
- Latency ms: 2

## Combined Preview
- Combined shard count: 1
- Combined slot count: 16
- Both read-only: true
- Both execution blocked: true

## Checks
- upstreamProbesEnabledForPreview: true
- upstreamActionsDisabled: true
- javaPreviewAttempted: true
- javaPreviewPassed: true
- javaReadOnlySafe: true
- javaExecutionBlocked: true
- miniKvPreviewAttempted: true
- miniKvPreviewPassed: true
- miniKvReadOnlySafe: true
- miniKvExecutionBlocked: true
- miniKvBoundarySafe: true
- bothPreviewsReady: true
- nodeDoesNotStartUpstreams: true
- nodeDoesNotStopUpstreams: true
- nodeDoesNotMutateSiblingState: true
- noActiveShardRouter: true
- noWriteRouting: true
- noLoadRestoreCompact: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- previewDigestStable: true
- productionWindowStillBlocked: true
- readyForControlledReadOnlyShardPreview: true

## Summary
- checkCount: 23
- passedCheckCount: 23
- attemptedReadCount: 2
- passedReadCount: 2
- failedReadCount: 0
- skippedReadCount: 0
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers
- No production blockers.

## Warnings
- PREVIEW_CONFIRMS_READINESS_NOT_ACTIVE_ROUTING (warning, runtime-boundary): Both sources are read-only readiness previews; this is still not active shard routing.

## Recommendations
- ARCHIVE_STABLE_PREVIEW_OUTPUT (recommendation, next-plan): Archive the preview output only after a stable local read-only window.

## Evidence Endpoints
- controlledReadOnlyShardPreviewJson: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview
- controlledReadOnlyShardPreviewMarkdown: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview?format=markdown
- javaShardReadinessEndpoint: GET /api/v1/ops/shard-readiness
- miniKvShardJsonCommand: SHARDJSON
- sourceNodeV580ArchiveIndex: e/README.md
- nextNodeVersion: Node v582
