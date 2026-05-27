# Managed audit manual sandbox connection credential resolver minimal read-only integration rerun decision

- Service: orderops-node
- Generated at: 2026-05-27T06:26:46.037Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision.v1
- Rerun decision state: minimal-read-only-integration-rerun-decision-ready
- Rerun decision: wait-for-external-read-window
- Active Node version: Node v348
- Source Node version: Node v347
- Source archive result: read-window-unavailable
- Source archive decision: wait-for-external-read-window-rerun
- Ready for rerun decision: true
- Ready for Node v349 rerun or pending archive: true
- External read window required: true
- Requires Java v153 + mini-kv v144 echo: false
- Reruns live probe: false
- Starts Java service: false
- Starts mini-kv service: false
- Connects managed audit: false
- Reads managed audit credential: false
- Raw endpoint URL parsed: false
- Execution allowed: false

## Source Node v347

- sourceVersion: Node v347
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification.v1
- archiveVerificationState: minimal-read-only-integration-smoke-archive-verified
- archiveResult: read-window-unavailable
- archiveDecision: wait-for-external-read-window-rerun
- readyForArchiveVerification: true
- readyForNodeV348RerunDecision: true
- verificationDigest: 420bf1e6c23accbbb020df6802039efb5fe6fba26ed6ec278160634b57325b27
- attemptedTargetCount: 5
- passedTargetCount: 0
- unavailableTargetCount: 5
- invalidContractTargetCount: 0
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1
- archiveVerificationOnly: true
- rerunsLiveProbe: false
- startsJavaService: false
- startsMiniKvService: false
- executionAllowed: false
- connectsManagedAudit: false
- readsManagedAuditCredential: false
- rawEndpointUrlParsed: false

## Rerun Decision Record

- decisionDigest: e3c34b09508a78e391bfeb8d9352b478b4a8e43a93e45a9cefd2c58436570577
- decisionMode: minimal-read-only-integration-rerun-decision
- sourceSpan: Node v347 minimal read-only integration smoke archive verification
- sourceArchiveResult: read-window-unavailable
- sourceArchiveDecision: wait-for-external-read-window-rerun
- rerunDecision: wait-for-external-read-window
- externalReadWindowRequired: true
- requestsJavaMiniKvEcho: false
- rerunsLiveProbe: false
- startsUpstreamServices: false
- nextNodeVersionSuggested: Node v349

## Checks

- sourceArchiveVerificationReady: true
- sourceArchiveVerificationDigestStable: true
- sourceArchiveDecisionRecognized: true
- readWindowUnavailableHandledAsExternalWindow: true
- invalidContractRequestsParallelEchoOnlyWhenNeeded: true
- allReadPassedCanAdvanceWithoutExtraEcho: true
- doesNotRerunLiveProbe: true
- noUpstreamServiceStarted: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- executionStillBlocked: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- decisionDigestStable: true
- readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: true

## Summary

- checkCount: 16
- passedCheckCount: 16
- sourceAttemptedTargetCount: 5
- sourcePassedTargetCount: 0
- sourceUnavailableTargetCount: 5
- sourceInvalidContractTargetCount: 0
- externalReadWindowRequired: true
- requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- EXTERNAL_READ_WINDOW_REQUIRED (warning, external-window): Java and mini-kv must be started by the user or an external window before the minimal read-only smoke lane can be rerun.

## Recommendations

- RERUN_ONLY_AFTER_USER_STARTS_UPSTREAMS (recommendation, next-step): When the user confirms Java and mini-kv are running, Node v349 can rerun the existing minimal read-only smoke lane.

## Next Actions

- Do not ask Java v153 or mini-kv v144 to change code for connection-refused evidence.
- Wait for the user or another terminal window to start Java and mini-kv.
- Use Node v349 to rerun or archive pending state without starting upstreams automatically.

