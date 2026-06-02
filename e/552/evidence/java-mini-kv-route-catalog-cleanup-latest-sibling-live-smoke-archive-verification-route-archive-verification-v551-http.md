# Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification

- Service: orderops-node
- Generated at: 2026-06-02T08:47:52.899Z
- Profile version: java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification.v1
- Archive verification state: ready
- Ready: true
- Active Node version: Node v549
- Source Node version: Node v548
- Execution allowed: false

## Source Route Archive

- ready: true
- archiveVerificationState: ready
- statusCodeJson: 200
- statusCodeMarkdown: 200
- activeNodeVersion: Node v546
- sourceNodeVersion: Node v545
- checkCount: 24
- passedCheckCount: 24
- routeCount: 226
- javaMiniKvDomainRouteCount: 62
- cleanupHandoffRouteGroupRouteCount: 28

## Source Verifier

- profileVersion: java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1
- activeNodeVersion: Node v546
- sourceNodeVersion: Node v545
- ready: true
- archiveVerificationState: ready
- checkCount: 24
- passedCheckCount: 24
- sourceRecordCount: 9
- sourcePassedRecordCount: 9
- sourceCleanupPassed: true
- sourceAfterListeningSocketCount: 0
- localHttpProxyBypass: --noproxy *

## Summary

- archiveFileCount: 3
- presentArchiveFileCount: 3
- checkCount: 18
- passedCheckCount: 18
- sourceCheckCount: 24
- sourcePassedCheckCount: 24

## Checks

- archiveFilesPresent: true
- jsonReadable: true
- markdownReadable: true
- summaryReadable: true
- summaryDigestsMatchFiles: true
- jsonProfileVersionValid: true
- jsonSourceVersionsMatch: true
- jsonVerifierReady: true
- jsonChecksAllPassed: true
- jsonSourceLiveSmokeStillReady: true
- summaryStatusCodesPassed: true
- summaryMatchesJson: true
- summaryRouteCatalogCountsMatchSourceArchive: true
- currentRouteCatalogCoversSourceArchive: true
- markdownRecordsRouteArchive: true
- markdownRecordsProxyAndCleanupChecks: true
- noRuntimeAuthorityOpened: true
- readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: true

## Archive Files

- json: present
  - Path: e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.json
  - Size bytes: 5287
  - SHA-256: 0a9fb309d43e2e1a182820eceefcf0f0a4cfde55905b4375e877dcc6f717a2ab
- markdown: present
  - Path: e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.md
  - Size bytes: 4057
  - SHA-256: b7fbb86a95aa4a9b8a382223233aa0f8006ff798a082a31d78375091a0459154
- summary: present
  - Path: e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v548-archive-summary.json
  - Size bytes: 2455
  - SHA-256: a539d145c578e3537302443258b6b80f8c056f2d49aff9b983e7fa38d76dbef3

## Next Actions

- Archive this public verifier route output before building a follow-up route archive verifier.
- Use the verified v548 route archive baseline before any later live-smoke closeout.
