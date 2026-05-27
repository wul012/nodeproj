# Managed audit manual sandbox connection credential resolver minimal read-only integration smoke archive verification

- Service: orderops-node
- Generated at: 2026-05-27T06:02:11.908Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification.v1
- Archive verification state: minimal-read-only-integration-smoke-archive-verified
- Archive result: read-window-unavailable
- Archive decision: wait-for-external-read-window-rerun
- Active Node version: Node v347
- Source Node version: Node v346
- Ready for archive verification: true
- Ready for Node v348 rerun decision: true
- Requires Java v153 + mini-kv v144 echo: false
- Reruns live probe: false
- Starts Java service: false
- Starts mini-kv service: false
- Connects managed audit: false
- Reads managed audit credential: false
- Raw endpoint URL parsed: false
- Execution allowed: false

## Source Node v346

- sourceVersion: Node v346
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1
- smokeState: read-window-unavailable
- smokeDecision: archive-read-window-unavailable-evidence
- readyForSmokeRehearsal: true
- readyForNodeV347ArchiveVerification: true
- sessionDigest: 208ef7be1a672f4b169055e19fe3243f2e449ad882552c023e7d200a41a6ec6f
- attemptedTargetCount: 5
- passedTargetCount: 0
- connectionRefusedTargetCount: 5
- timeoutTargetCount: 0
- invalidJsonTargetCount: 0
- unexpectedStatusTargetCount: 0
- productionBlockerCount: 0
- warningCount: 5
- recommendationCount: 1
- liveProbePerformedNow: true
- startsJavaService: false
- startsMiniKvService: false
- mutatesJavaState: false
- mutatesMiniKvState: false
- executionAllowed: false
- connectsManagedAudit: false
- readsManagedAuditCredential: false
- rawEndpointUrlParsed: false

## Archive Verification

- verificationDigest: e95d5310e309c843b05f70cb8b2c4783558e075c5db11eabb8617a2888105b43
- verificationMode: read-only-v346-smoke-archive-verification
- sourceSpan: Node v346 minimal read-only integration smoke rehearsal archive
- decision: wait-for-external-read-window-rerun
- archiveRoot: d/346
- archiveResult: read-window-unavailable
- verifiesJsonAndMarkdown: true
- verifiesSmokeSummary: true
- verifiesScreenshotAndExplanation: true
- verifiesCodeWalkthroughAndPlanIndex: true
- rerunsLiveProbe: false
- startsUpstreamServices: false
- requestsJavaMiniKvEcho: false
- nextNodeVersionSuggested: Node v348

## Archive References

- d/346/evidence/minimal-read-only-integration-smoke-rehearsal-v346-http.json: exists=true; bytes=8065; digest=58f49bc3e7f085b265be3362d78fc5b4d570b9ae57fe505c61598fa5f3a0476e
- d/346/evidence/minimal-read-only-integration-smoke-rehearsal-v346-http.md: exists=true; bytes=6506; digest=641ef6c9a6323ecb0cdb9135b527dcaf4785128d1405431ee7c6d018be001892
- d/346/evidence/minimal-read-only-integration-smoke-rehearsal-v346-smoke-summary.json: exists=true; bytes=760; digest=c9c7fbc8c92fefd08835d32ccbfbca28f3cebbdc3f01dab064ff240037d08757
- d/346/evidence/minimal-read-only-integration-smoke-rehearsal-v346-browser-snapshot.md: exists=true; bytes=588; digest=8029b39083668112d348951c86464f771b975f1f170e9c4567f74228c201e3c0
- d/346/minimal-read-only-integration-smoke-rehearsal-v346.html: exists=true; bytes=7067; digest=3997c69ed53b80e1b3290bfce90d427afd96f97270e9df47953d2fb43f8dda8d
- d/346/图片/minimal-read-only-integration-smoke-rehearsal-v346.png: exists=true; bytes=12075; digest=4304dfb20fa9e9ab98d10d960376fe941fa36a202705ab401242e9d6a28e8b4a
- d/346/解释/minimal-read-only-integration-smoke-rehearsal-v346.md: exists=true; bytes=2544; digest=b565eb0117b2a180d89529d4df0463fbb0ac615046c7e2acbbf964a969f937af
- 代码讲解记录_生产雏形阶段2/351-minimal-read-only-integration-smoke-rehearsal-v346.md: exists=true; bytes=3779; digest=968483e51f6865984e901fb9b8299b9f48c705ef3c59a1cf20da7656d722988d
- docs/plans2/v346-post-minimal-read-only-integration-smoke-rehearsal-roadmap.md: exists=true; bytes=4297; digest=9b55531db8383a6486dc5059b9f5b72aa3ba1ee4b51f37f1ad40f6be4cc667ef
- docs/plans2/README.md: exists=true; bytes=30850; digest=b94bc352e0f5aab47ef8a8901c633a7b11209abb0a760ba33b33f61d5c58605f

## Checks

- archiveFilesPresent: true
- jsonEvidenceReadable: true
- jsonEvidenceProfileVersionValid: true
- jsonEvidenceReadyForArchiveVerification: true
- jsonEvidenceKeepsRuntimeAndWritesClosed: true
- smokeSummaryMatchesJson: true
- markdownRecordsSmokeState: true
- screenshotAndHtmlPresent: true
- explanationRecordsReadWindowUnavailable: true
- codeWalkthroughPresent: true
- planIndexReferencesV346AndV347: true
- archiveVerificationDoesNotRerunProbe: true
- noUpstreamServiceStarted: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- readWindowUnavailableDoesNotRequestJavaMiniKvCodeChange: true
- invalidContractRequestsParallelEchoOnlyWhenNeeded: true
- archiveVerificationDigestStable: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification: true

## Summary

- checkCount: 22
- passedCheckCount: 22
- archiveFileCount: 10
- presentArchiveFileCount: 10
- attemptedTargetCount: 5
- passedTargetCount: 0
- unavailableTargetCount: 5
- invalidContractTargetCount: 0
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- ARCHIVE_RESULT_READ_WINDOW_UNAVAILABLE (warning, node-v346): v347 verified the v346 archive result as read-window-unavailable.

## Recommendations

- NEXT_RERUN_DECISION (recommendation, next-step): Wait for the user or external window to start Java and mini-kv, then rerun the read-only smoke lane.

## Next Actions

- Wait for the user or external window to start Java and mini-kv, then rerun the read-only smoke lane.
- Do not request Java v153 or mini-kv v144 for connection refused alone.
- Keep v348 as a rerun decision, not a production authorization.

