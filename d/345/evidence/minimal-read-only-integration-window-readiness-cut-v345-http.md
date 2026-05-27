# Managed audit manual sandbox connection credential resolver minimal read-only integration window readiness cut

- Service: orderops-node
- Generated at: 2026-05-27T04:59:54.673Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut.v1
- Readiness state: minimal-read-only-integration-window-readiness-cut-ready
- Readiness decision: ready-for-manual-read-only-integration-window
- Active Node version: Node v345
- Source Node version: Node v344
- Ready for v345 readiness cut: true
- Ready for Node v346 smoke rehearsal: true
- Requires Java v153 + mini-kv v144 echo: false
- Performs live probe now: false
- Starts Java service: false
- Starts mini-kv service: false
- Sends Java HTTP request now: false
- Opens mini-kv TCP socket now: false
- Execution allowed: false
- Connects managed audit: false
- Reads managed audit credential: false
- Raw endpoint URL parsed: false

## Source Node v344

- sourceVersion: Node v344
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification.v1
- archiveVerificationState: disabled-design-draft-body-draft-candidate-archive-verified
- archiveVerificationDecision: body-draft-candidate-archive-verified-before-next-design-step
- readyForArchiveVerification: true
- readyForNextDisabledDesignDraftStep: true
- archiveVerificationDigest: 9be747765ebf629a43824b52d6fe591c257d679672a00e62d6323172a0b3b612
- sourceCheckCount: 28
- sourcePassedCheckCount: 28
- sourceProductionBlockerCount: 0
- presentArchiveFileCount: 10
- archiveFileCount: 10
- runtimeShellImplemented: false
- runtimeShellInvocationAllowed: false
- executionAllowed: false
- connectsManagedAudit: false
- credentialValueRead: false
- rawEndpointUrlParsed: false
- httpRequestSent: false
- tcpConnectionAttempted: false
- javaServiceStarted: false
- miniKvServiceStarted: false
- automaticUpstreamStart: false
- miniKvWriteCommandAllowed: false

## Readiness Cut

- readinessDigest: 68c68a3d7af7950030711358ca59164ccf36ac6e9e91851c1c790d6e88bf8f48
- cutMode: node-v345-minimal-read-only-integration-window-readiness-cut
- sourceSpan: Node v344 archive verification plus existing Node upstream clients
- decision: ready-for-manual-read-only-integration-window
- necessityProof: v345 converts the disabled design draft boundary into a concrete, minimal read-only integration window so v346 can test live Java/mini-kv availability without widening runtime, credential, write, or auto-start scope.
- consumesNodeV344ArchiveVerification: true
- consumesJavaMiniKvRuntimeNow: false
- performsLiveProbeNow: false
- opensNetworkSocketNow: false
- startsUpstreamServices: false
- allowsOnlyJavaGetRequests: true
- allowsOnlyMiniKvReadCommands: true
- requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false
- nextNodeVersionSuggested: Node v346

## Java Read-Only Requirements

- java http-endpoint GET /actuator/health: Java actuator health; handle=ORDER_PLATFORM_URL; readOnly=true; mutatesState=false; existingNodeSupport=true; boundary=health JSON only; no business mutation
- java http-endpoint GET /api/v1/ops/overview: Java ops overview; handle=ORDER_PLATFORM_URL; readOnly=true; mutatesState=false; existingNodeSupport=true; boundary=ops overview JSON only; no ledger/schema/SQL write

## mini-kv Read-Only Requirements

- mini-kv tcp-command HEALTH: mini-kv health; handle=MINIKV_HOST + MINIKV_PORT; readOnly=true; mutatesState=false; existingNodeSupport=true; boundary=server liveness string only; no store mutation
- mini-kv tcp-command INFOJSON: mini-kv info JSON; handle=MINIKV_HOST + MINIKV_PORT; readOnly=true; mutatesState=false; existingNodeSupport=true; boundary=server/store/WAL metadata JSON only; no write/admin
- mini-kv tcp-command STATSJSON: mini-kv stats JSON; handle=MINIKV_HOST + MINIKV_PORT; readOnly=true; mutatesState=false; existingNodeSupport=true; boundary=runtime counters JSON only; no write/admin

## Environment Handles

- ORDER_PLATFORM_URL: target=java; kind=base-url-handle; presentInConfig=true; secretValue=false; rawCredentialValue=false
- ORDER_PLATFORM_TIMEOUT_MS: target=java; kind=timeout-ms-handle; presentInConfig=true; secretValue=false; rawCredentialValue=false
- MINIKV_HOST: target=mini-kv; kind=host-handle; presentInConfig=true; secretValue=false; rawCredentialValue=false
- MINIKV_PORT: target=mini-kv; kind=port-handle; presentInConfig=true; secretValue=false; rawCredentialValue=false
- MINIKV_TIMEOUT_MS: target=mini-kv; kind=timeout-ms-handle; presentInConfig=true; secretValue=false; rawCredentialValue=false

## Forbidden Operations

- java: POST/PUT/PATCH/DELETE, approval ledger writes, SQL/schema migration, deployment, rollback; blockedReason=v345 only prepares the first read-only integration window.
- mini-kv: SET/DEL/EXPIRE/SETNXEX/LOAD/COMPACT/RESTORE or any write/admin command; blockedReason=mini-kv remains a read-only evidence provider for this window.
- node: auto-starting Java or mini-kv, reading credential values, parsing raw endpoint URLs, runtime shell invocation; blockedReason=external services must be started by the user/window and secret boundaries stay closed.

## Checks

- sourceNodeV344Ready: true
- sourceNodeV344KeepsRuntimeAndSideEffectsClosed: true
- existingJavaClientReadEndpointsAvailable: true
- existingMiniKvClientReadCommandsAvailable: true
- environmentHandlesPresent: true
- onlyJavaGetRequestsAllowed: true
- onlyMiniKvReadCommandsAllowed: true
- forbiddenOperationsDocumented: true
- noLiveProbePerformedNow: true
- noUpstreamServiceStarted: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- upstreamProbesStillDisabledForReadinessCut: true
- upstreamActionsStillDisabled: true
- noParallelJavaMiniKvEchoNeeded: true
- readinessCutDigestStable: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: true

## Summary

- Checks: 20/20
- Java requirements: 2
- mini-kv requirements: 3
- Environment handles: 5
- Forbidden operations: 3
- Production blockers: 0
- Warnings: 1
- Recommendations: 1

## Production Blockers

- No production blockers.

## Warnings

- READINESS_CUT_IS_NOT_A_LIVE_SMOKE (warning, next-step): v345 prepares the manual read-only window; v346 is the first version allowed to classify connection-refused, timeout, or invalid JSON evidence.

## Recommendations

- SKIP_PARALLEL_ECHO_AND_PREPARE_V346 (recommendation, next-step): Existing Node client and config handles are sufficient; skip Java v153 + mini-kv v144 and prepare Node v346.

## Next Actions

- Use Node v346 only when the user or an external window has already started Java and mini-kv.
- Keep Node from starting, stopping, building, testing, or modifying Java and mini-kv during the smoke rehearsal.
- Allow only Java GET endpoints and mini-kv HEALTH/INFOJSON/STATSJSON commands in the first real read-only window.
- If the external services are not reachable in v346, record connection-refused or timeout evidence and fail closed.

