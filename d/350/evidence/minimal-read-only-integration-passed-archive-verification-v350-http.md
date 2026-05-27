# Managed audit manual sandbox connection credential resolver minimal read-only integration passed archive verification

- Service: orderops-node
- Generated at: 2026-05-27T07:58:29.240Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification.v1
- Transition state: minimal-read-only-integration-passed-archive-verified
- Transition decision: advance-to-managed-audit-disabled-read-only-integration-intake
- Active Node version: Node v350
- Source Node version: Node v349
- Ready for v351 intake: true
- Reruns live probe: false
- Starts Java service: false
- Starts mini-kv service: false
- Mutates Java state: false
- Mutates mini-kv state: false
- Connects managed audit: false
- Reads managed audit credential: false
- Raw endpoint URL parsed: false
- Execution allowed: false
- Requires Java v153 + mini-kv v144 echo: false

## Source Node v349

- sourceVersion: Node v349
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1
- rerunArchiveState: minimal-read-only-integration-smoke-rerun-archived
- rerunArchiveResult: all-read-passed
- rerunArchiveDecision: archive-read-passed-rerun-evidence
- readyForRerunArchive: true
- archiveDigest: dd3e29d7c8b9a4d3e9325ea95b1121c746333fd5581a6e56db4ee0a97ebd4738
- externalReadWindowConfirmed: true
- liveProbePerformedNow: true
- attemptedTargetCount: 5
- passedTargetCount: 5
- unavailableTargetCount: 0
- invalidContractTargetCount: 0
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1
- startsJavaService: false
- startsMiniKvService: false
- mutatesJavaState: false
- mutatesMiniKvState: false
- executionAllowed: false
- connectsManagedAudit: false
- readsManagedAuditCredential: false
- rawEndpointUrlParsed: false

## Transition Record

- transitionDigest: 3f2409f5f5a49b75c3544ee9c0f2534915c82f7bdc68d49839d77ded2db02f2f
- transitionMode: minimal-read-only-integration-passed-archive-verification
- sourceSpan: Node v349 minimal read-only integration smoke rerun archive
- archiveRoot: d/349
- sourceArchiveDigest: dd3e29d7c8b9a4d3e9325ea95b1121c746333fd5581a6e56db4ee0a97ebd4738
- transitionDecision: advance-to-managed-audit-disabled-read-only-integration-intake
- verifiesJsonMarkdownAndSummary: true
- verifiesScreenshotExplanationAndWalkthrough: true
- rerunsLiveProbe: false
- startsUpstreamServices: false
- writesUpstreamState: false
- opensManagedAuditConnection: false
- requestsJavaMiniKvEcho: false
- nextNodeVersionSuggested: Node v351
- archiveFileDigests: [{"path":"d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-http.json","digest":"611f55b44567e36aa505be802f2b711362f561e2ff9da97adb39a630f0c946fd","byteLength":7075},{"path":"d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-http.md","digest":"7e471eb9387a436426d9d070e58a33afd79280209a6d9284610bb5a8cd3853e2","byteLength":5543},{"path":"d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-summary.json","digest":"fdb0e7536839a63cc7b73a0f99fca988a4105cc8f8b39251cc511b2936412ffc","byteLength":702},{"path":"d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-browser-snapshot.md","digest":"f6df5a593e58865693829d4af5f24ba8f496f7eabcf25898bceb24b12de6cac5","byteLength":1043},{"path":"d/349/minimal-read-only-integration-smoke-rerun-archive-v349.html","digest":"3a9d06f4e75db2d237bdd5281dd12cd3a0627236b16461530ce47dcc4526d363","byteLength":2573},{"path":"d/349/图片/minimal-read-only-integration-smoke-rerun-archive-v349.png","digest":"cd55d6ad68c09a6972d2b68d127710dbb6d9cb7169be76f1dcd1292a95205faa","byteLength":13657},{"path":"d/349/解释/minimal-read-only-integration-smoke-rerun-archive-v349.md","digest":"45f149c56b01b6f51c6c332d5ffb7b88f3b50918534cc58d750f78c4e6eb7a6c","byteLength":2615},{"path":"代码讲解记录_生产雏形阶段2/354-minimal-read-only-integration-smoke-rerun-archive-v349.md","digest":"bec43a0561f2ebb283a972b864e5f2e03e89f91a6507b2e68dfffd7ca9bd2f85","byteLength":4528},{"path":"docs/plans2/v349-post-minimal-read-only-integration-smoke-rerun-archive-roadmap.md","digest":"9ffee82a550a5a26112f22e7069e9cf63a83027ee781b6d05f0072c4efc31675","byteLength":4191},{"path":"docs/plans2/README.md","digest":"b5897b6224b5e6d99260ea8ba5925cd577840b60df7d2a4ef9a0a8e656080f90","byteLength":31406}]

## Archive References

- d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-http.json: exists=true; bytes=7075; digest=611f55b44567e36aa505be802f2b711362f561e2ff9da97adb39a630f0c946fd
- d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-http.md: exists=true; bytes=5543; digest=7e471eb9387a436426d9d070e58a33afd79280209a6d9284610bb5a8cd3853e2
- d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-summary.json: exists=true; bytes=702; digest=fdb0e7536839a63cc7b73a0f99fca988a4105cc8f8b39251cc511b2936412ffc
- d/349/evidence/minimal-read-only-integration-smoke-rerun-archive-v349-browser-snapshot.md: exists=true; bytes=1043; digest=f6df5a593e58865693829d4af5f24ba8f496f7eabcf25898bceb24b12de6cac5
- d/349/minimal-read-only-integration-smoke-rerun-archive-v349.html: exists=true; bytes=2573; digest=3a9d06f4e75db2d237bdd5281dd12cd3a0627236b16461530ce47dcc4526d363
- d/349/图片/minimal-read-only-integration-smoke-rerun-archive-v349.png: exists=true; bytes=13657; digest=cd55d6ad68c09a6972d2b68d127710dbb6d9cb7169be76f1dcd1292a95205faa
- d/349/解释/minimal-read-only-integration-smoke-rerun-archive-v349.md: exists=true; bytes=2615; digest=45f149c56b01b6f51c6c332d5ffb7b88f3b50918534cc58d750f78c4e6eb7a6c
- 代码讲解记录_生产雏形阶段2/354-minimal-read-only-integration-smoke-rerun-archive-v349.md: exists=true; bytes=4528; digest=bec43a0561f2ebb283a972b864e5f2e03e89f91a6507b2e68dfffd7ca9bd2f85
- docs/plans2/v349-post-minimal-read-only-integration-smoke-rerun-archive-roadmap.md: exists=true; bytes=4191; digest=9ffee82a550a5a26112f22e7069e9cf63a83027ee781b6d05f0072c4efc31675
- docs/plans2/README.md: exists=true; bytes=31406; digest=b5897b6224b5e6d99260ea8ba5925cd577840b60df7d2a4ef9a0a8e656080f90

## Checks

- archiveFilesPresent: true
- jsonEvidenceReadable: true
- jsonProfileVersionValid: true
- jsonReadyForV350Verification: true
- jsonArchiveAllReadPassed: true
- targetCountsConfirmAllPassed: true
- targetResultsAllReadOnlyAndAllowed: true
- summaryMatchesJson: true
- markdownRecordsPassedArchive: true
- screenshotAndHtmlPresent: true
- explanationRecordsPassedWindow: true
- codeWalkthroughPresent: true
- planIndexReferencesV349AndV350: true
- transitionDoesNotRerunProbe: true
- noUpstreamServiceStartedByNode: true
- noUpstreamMutation: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- noJavaMiniKvEchoRequired: true
- transitionDecisionLimitedToDisabledReadOnlyStage: true
- transitionDigestStable: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForMinimalReadOnlyIntegrationPassedArchiveVerification: true

## Summary

- checkCount: 25
- passedCheckCount: 25
- archiveFileCount: 10
- presentArchiveFileCount: 10
- attemptedTargetCount: 5
- passedTargetCount: 5
- unavailableTargetCount: 0
- invalidContractTargetCount: 0
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- V349_PASSED_ARCHIVE_VERIFIED (warning, node-v349): v350 verified v349 as all-read-passed with 5/5 read targets passed.

## Recommendations

- PROCEED_TO_NODE_V351_DISABLED_READ_ONLY_INTAKE (recommendation, transition-decision): Proceed to Node v351 as managed-audit-disabled read-only integration intake; do not open credential, endpoint, provider/client, runtime, or write scopes.

## Next Actions

- Proceed to Node v351 managed-audit-disabled read-only integration intake.
- Keep credential value, raw endpoint URL parsing, provider/client instantiation, runtime shell, Java writes, and mini-kv write/admin commands closed.
- For the next true integration window, have Java and mini-kv start in their own project windows and only report read-only readiness.

