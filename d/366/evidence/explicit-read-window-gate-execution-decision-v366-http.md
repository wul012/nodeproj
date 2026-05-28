# Managed audit manual sandbox connection credential resolver minimal read-only integration explicit read-window gate execution decision

- Service: orderops-node
- Generated at: 2026-05-28T08:20:32.146Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision.v1
- Decision state: explicit-read-window-gate-execution-decision-ready
- Gate execution decision: wait-for-external-read-window
- Active Node version: Node v366
- Source Node version: Node v365
- Decision only: true
- Reruns live probe: false
- Actual probe executed now: false
- Starts Java service: false
- Starts mini-kv service: false
- Connects managed audit: false
- Sends managed audit HTTP/TCP: false
- Credential value requested: false
- Credential value read: false
- Raw endpoint URL requested: false
- Raw endpoint URL parsed: false
- Secret provider instantiated: false
- Resolver client instantiated: false
- Runtime shell implemented: false
- Runtime shell invocation allowed: false
- Execution allowed: false

## Source Node v365

- sourceVersion: Node v365
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification.v1
- archiveVerificationState: minimal-read-only-integration-regular-gate-archive-verified
- archiveVerificationDecision: archive-minimal-read-only-integration-regular-gate-and-ci-operator-check
- readyForArchiveVerification: true
- readyForNodeV366ExplicitReadWindowGateExecutionDecision: true
- sourceNodeV364GateDigest: 0c8e87b28c0132776d0efcc68aafca7ebb14c24f2dfd3004becaf95006bef36f
- archiveVerificationDigest: e1a21b41278642b6f52745496a973d9b00581772af287688ad8de331668c4ccd
- ciOperatorCheckDigest: 17d0cdb8fbd7f7f87a9a0892adcc161f889f3bcdb2636a720e64623af51ee083
- checkCount: 40
- passedCheckCount: 40
- archiveFileCount: 11
- presentArchiveFileCount: 11
- readOnlyTargetCount: 5
- requiredHeaderCount: 4
- productionBlockerCount: 0
- avoidsFullTestBatchByDefault: true
- requiresExplicitReadWindowForActualProbe: true
- rerunsLiveProbe: false
- startsJavaService: false
- startsMiniKvService: false
- connectsManagedAudit: false
- sendsManagedAuditHttpTcp: false
- credentialValueRequested: false
- credentialValueRead: false
- rawEndpointUrlRequested: false
- rawEndpointUrlParsed: false
- secretProviderInstantiated: false
- resolverClientInstantiated: false
- runtimeShellImplemented: false
- runtimeShellInvocationAllowed: false
- executionAllowed: false

## Decision Record

- decisionDigest: 65f92ae3db61c6babcb9da4d9f842ccb799743cae4f60bdc6120fb2a9d995dc6
- decisionMode: minimal-read-only-integration-explicit-read-window-gate-execution-decision
- sourceSpan: Node v365 minimal read-only integration regular gate archive verification
- gateExecutionDecision: wait-for-external-read-window
- externalReadWindowRequired: true
- explicitReadWindowProvided: false
- focusedCiOperatorCheckReady: true
- actualProbeExecutedNow: false
- rerunsLiveProbe: false
- startsUpstreamServices: false
- mutatesUpstreamState: false
- opensManagedAuditConnection: false
- readsCredentialValue: false
- parsesRawEndpointUrl: false
- instantiatesProviderClient: false
- invokesRuntimeShell: false
- requestsJavaMiniKvEcho: false
- nextNodeVersionSuggested: wait-for-external-read-window

## Checks

- sourceNodeV365Ready: true
- sourceArchiveVerificationDigestStable: true
- sourceGateDigestStable: true
- sourceCiOperatorCheckDigestStable: true
- focusedCiOperatorCheckReady: true
- sourceAvoidsFullTestBatchByDefault: true
- explicitReadWindowHandledAsDecisionInput: true
- missingWindowClassifiedAsExternalWait: true
- noProbeExecutedWithoutExplicitWindow: true
- noUpstreamServiceStarted: true
- noUpstreamMutation: true
- noManagedAuditConnection: true
- noCredentialValueRequestedOrRead: true
- noRawEndpointUrlRequestedOrParsed: true
- noProviderClientInstantiated: true
- noRuntimeShellImplementedOrInvoked: true
- noJavaMiniKvEchoRequired: true
- executionStillBlocked: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- decisionDigestStable: true
- readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: true

## Summary

- checkCount: 22
- passedCheckCount: 22
- sourceCheckCount: 40
- sourcePassedCheckCount: 40
- readOnlyTargetCount: 5
- requiredHeaderCount: 4
- externalReadWindowRequired: true
- explicitReadWindowProvided: false
- actualProbeExecutedNow: false
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- EXTERNAL_READ_WINDOW_REQUIRED (warning, read-window): No explicit Java/mini-kv read window was provided for v366; the gate must stop without starting upstream services.

## Recommendations

- WAIT_FOR_EXTERNAL_READ_WINDOW (recommendation, next-step): Ask the Java and mini-kv owners to open a read-only window, or explicitly authorize Node to start them in a later version.

## Next Actions

- Stop here until Java and mini-kv have an explicit read-only window, or the user explicitly authorizes Node to start both services in a later version.
- Do not create another archive/closure-only version while the read window is unavailable.
- Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.
