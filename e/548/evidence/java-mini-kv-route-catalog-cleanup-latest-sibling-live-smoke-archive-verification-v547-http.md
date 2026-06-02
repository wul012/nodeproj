# Java / mini-kv route catalog cleanup latest sibling live smoke archive verification

- Service: orderops-node
- Generated at: 2026-06-02T08:23:05.683Z
- Profile version: java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1
- Archive verification state: ready
- Ready: true
- Active Node version: Node v546
- Source Node version: Node v545
- Execution allowed: false

## Source Live Smoke

- profileVersion: java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke.v1
- activeNodeVersion: Node v545
- sourceNodeVersion: Node v544
- smokeState: ready
- ready: true
- startsJavaService: true
- startsMiniKvService: true
- mutatesJavaState: false
- mutatesMiniKvState: false
- connectsManagedAudit: false
- credentialValueRead: false
- rawEndpointUrlParsed: false
- executionAllowed: false
- localHttpProxyBypass: --noproxy *
- mingwRuntimePathAddedForMiniKv: true
- recordCount: 9
- passedRecordCount: 9
- failedRecordCount: 0
- checkCount: 14
- passedCheckCount: 14
- cleanupPassed: true
- afterListeningSocketCount: 0

## Record Summary

- nodeRecordCount: 3
- javaRecordCount: 2
- miniKvRecordCount: 4
- httpRecordCount: 5
- tcpInlineRecordCount: 4
- passedRecordIds: ["node-health","node-latest-sibling-archive-verifier-json","node-latest-sibling-archive-verifier-markdown","java-health","java-ops-evidence","mini-kv-health","mini-kv-command-catalog","mini-kv-shard-readiness","mini-kv-quit"]
- readOnlyRecordCount: 9
- mutatingRecordCount: 0
- proxyBypassHttpRecordCount: 5
- miniKvCommands: ["HEALTH","COMMANDSJSON","SHARDJSON","QUIT"]

## Cleanup Proof

- profileVersion: java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-cleanup-proof.v1
- startedProcessCount: 4
- startedProjects: ["mini-kv","java-maven","java-runtime","node"]
- startedPorts: [6524,8080,8080,4190]
- beforeListeningSocketCount: 0
- afterListeningSocketCount: 0
- distRemoved: true
- cleanupPassed: true

## Summary

- archiveFileCount: 4
- presentArchiveFileCount: 4
- sourceRecordCount: 9
- sourcePassedRecordCount: 9
- sourceCheckCount: 14
- sourcePassedCheckCount: 14
- checkCount: 24
- passedCheckCount: 24

## Checks

- archiveFilesPresent: true
- jsonReadable: true
- markdownReadable: true
- summaryReadable: true
- cleanupProofReadable: true
- jsonProfileVersionValid: true
- jsonSourceVersionsMatch: true
- jsonLiveSmokeReady: true
- jsonChecksAllPassed: true
- jsonRecordsAllPassed: true
- summaryMatchesJson: true
- markdownRecordsLiveSmoke: true
- readTargetCompositionValid: true
- nodeArchiveVerifierReadPassed: true
- javaReadOnlyEvidencePassed: true
- miniKvReadCommandsPassed: true
- localProxyBypassRecorded: true
- sourceStartedExpectedLocalServices: true
- cleanupProofMatchesJson: true
- cleanupProofPassed: true
- noProductionExecutionApproved: true
- noUpstreamMutationOrSensitiveAccess: true
- archiveVerifierDoesNotStartServices: true
- readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: true

## Archive Files

- json: present
  - Path: e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.json
  - Size bytes: 24962
  - SHA-256: 1e097e5cea4e7ce7826006aed5e8da90499fb44a5c2de01d0f502fc5c5eb4f52
- markdown: present
  - Path: e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.md
  - Size bytes: 3051
  - SHA-256: 6b4ef87a90e9579afe02a250cdbc3a50ddd3de5b4589d6b390b68aad0eac7a3c
- summary: present
  - Path: e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-summary.json
  - Size bytes: 286
  - SHA-256: 526062e85111b0ba2138539d115c0a15cc856c46d06c20a1f10d78f4e98c1234
- cleanupProof: present
  - Path: e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-cleanup-proof.json
  - Size bytes: 1704
  - SHA-256: 72cf019f8268e9628e7b46255e0c6b11d0688809820716e7f4cf2a2beb7ec738

## Next Actions

- Expose this archive verification through the cleanup route group in Node v547.
- Keep future live-smoke scripts on local no-proxy HTTP reads and explicit cleanup proof.
