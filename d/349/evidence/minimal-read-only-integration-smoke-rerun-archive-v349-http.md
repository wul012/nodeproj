# Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rerun archive

- Service: orderops-node
- Generated at: 2026-05-27T07:22:25.216Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1
- Rerun archive state: minimal-read-only-integration-smoke-rerun-archived
- Rerun archive result: all-read-passed
- Rerun archive decision: archive-read-passed-rerun-evidence
- Active Node version: Node v349
- Source Node version: Node v348
- External read window confirmed: true
- Live probe performed now: true
- Requires Java v153 + mini-kv v144 echo: false
- Starts Java service: false
- Starts mini-kv service: false
- Mutates Java state: false
- Mutates mini-kv state: false
- Connects managed audit: false
- Reads managed audit credential: false
- Raw endpoint URL parsed: false
- Execution allowed: false

## Source Node v348

- sourceVersion: Node v348
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision.v1
- rerunDecisionState: minimal-read-only-integration-rerun-decision-ready
- rerunDecision: wait-for-external-read-window
- sourceArchiveResult: read-window-unavailable
- readyForRerunDecision: true
- readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive: true
- decisionDigest: e3c34b09508a78e391bfeb8d9352b478b4a8e43a93e45a9cefd2c58436570577
- externalReadWindowRequired: true
- requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false
- rerunsLiveProbe: false
- startsJavaService: false
- startsMiniKvService: false
- executionAllowed: false
- connectsManagedAudit: false
- readsManagedAuditCredential: false
- rawEndpointUrlParsed: false

## Rerun Archive

- archiveDigest: dd3e29d7c8b9a4d3e9325ea95b1121c746333fd5581a6e56db4ee0a97ebd4738
- archiveMode: minimal-read-only-integration-smoke-rerun-or-pending-archive
- sourceSpan: Node v348 rerun decision plus optional Node v346 smoke lane rerun
- rerunArchiveResult: all-read-passed
- rerunArchiveDecision: archive-read-passed-rerun-evidence
- externalReadWindowConfirmed: true
- liveProbePerformedNow: true
- attemptedTargetCount: 5
- passedTargetCount: 5
- unavailableTargetCount: 0
- invalidContractTargetCount: 0
- startsUpstreamServices: false
- writesUpstreamState: false
- opensManagedAuditConnection: false
- sourceDecisionDigest: e3c34b09508a78e391bfeb8d9352b478b4a8e43a93e45a9cefd2c58436570577
- nextNodeVersionSuggested: Node v350

## Target Results

- java GET /actuator/health:
  - targetName: Java actuator health
  - status: read-passed
  - readOnly: true
  - mutatesState: false
  - attempted: true
  - latencyMs: 6
  - statusCode: 200
  - responseShape: json-object
  - errorCode: n/a
  - errorMessage: n/a
- java GET /api/v1/ops/overview:
  - targetName: Java ops overview
  - status: read-passed
  - readOnly: true
  - mutatesState: false
  - attempted: true
  - latencyMs: 10
  - statusCode: 200
  - responseShape: json-object
  - errorCode: n/a
  - errorMessage: n/a
- mini-kv HEALTH:
  - targetName: mini-kv health
  - status: read-passed
  - readOnly: true
  - mutatesState: false
  - attempted: true
  - latencyMs: 2
  - statusCode: n/a
  - responseShape: text
  - errorCode: n/a
  - errorMessage: n/a
- mini-kv INFOJSON:
  - targetName: mini-kv info JSON
  - status: read-passed
  - readOnly: true
  - mutatesState: false
  - attempted: true
  - latencyMs: 2
  - statusCode: n/a
  - responseShape: json-object
  - errorCode: n/a
  - errorMessage: n/a
- mini-kv STATSJSON:
  - targetName: mini-kv stats JSON
  - status: read-passed
  - readOnly: true
  - mutatesState: false
  - attempted: true
  - latencyMs: 2
  - statusCode: n/a
  - responseShape: json-object
  - errorCode: n/a
  - errorMessage: n/a

## Checks

- sourceNodeV348Ready: true
- sourceNodeV348DecisionDigestStable: true
- sourceNodeV348KeepsBoundariesClosed: true
- externalReadWindowConfirmedBeforeProbe: true
- pendingDoesNotProbe: true
- liveProbeOnlyWhenWindowConfirmed: true
- allReadTargetsAttemptedWhenProbing: true
- onlyAllowedJavaGetRequestsAttempted: true
- onlyAllowedMiniKvReadCommandsAttempted: true
- noUpstreamServiceStartedByNode: true
- noJavaMutationAttempted: true
- noMiniKvMutationAttempted: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- invalidContractRequestsParallelEchoOnlyWhenNeeded: true
- archiveDigestStable: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: true

## Summary

- checkCount: 20
- passedCheckCount: 20
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

- MINIMAL_READ_ONLY_RERUN_PASSED (warning, next-step): All Java and mini-kv minimal read-only targets passed in the confirmed external read window.

## Recommendations

- ADVANCE_TO_DISABLED_MANAGED_AUDIT_READ_ONLY_STAGE (recommendation, next-step): Archive v349 as a passed minimal read-only integration window and plan the next managed-audit-disabled read-only stage.

## Next Actions

- Archive this passed read-only integration window as Node v349 evidence.
- Plan Node v350 as a managed-audit-disabled read-only stage; do not open credential, raw endpoint, SQL, runtime shell, or mini-kv write scope.

