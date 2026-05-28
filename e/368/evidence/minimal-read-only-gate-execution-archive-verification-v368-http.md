# Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution archive verification

- Service: orderops-node
- Generated at: 2026-05-28T12:04:07.193Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification.v1
- Archive verification state: minimal-read-only-integration-gate-execution-archive-verified
- Archive verification decision: archive-minimal-read-only-gate-execution-and-operator-ci-handoff
- Active Node version: Node v368
- Source Node version: Node v367
- Ready for v369 operator/CI regular gate handoff: true
- Archive verification only: true
- Operator/CI handoff check included: true
- Reruns live probe: false
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

## Source Node v367

- sourceVersion: Node v367
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1
- gateExecutionState: minimal-read-only-integration-gate-executed
- gateExecutionResult: all-read-passed
- gateExecutionDecision: archive-read-passed-gate-execution
- readyForMinimalReadOnlyIntegrationGateExecution: true
- consumesNodeV366ExplicitReadWindowGateExecutionDecision: true
- reusesNodeV349MinimalReadOnlySmokeLane: true
- sourceNodeVersion: Node v366
- sourceNodeV366Ready: true
- sourceDecisionDigest: 2e465e3c27fbdcc74c92f7e7d28323088d0f4ae56a703b47ed30740c47052e34
- reusedSmokeArchiveDigest: dd3e29d7c8b9a4d3e9325ea95b1121c746333fd5581a6e56db4ee0a97ebd4738
- gateExecutionDigest: 99fd219550b798f52d01e0185a9f57ed57a0a8fb5b4e7e265475ffc8a116efa9
- externalReadWindowConfirmed: true
- liveProbePerformedNow: true
- attemptedTargetCount: 5
- passedTargetCount: 5
- unavailableTargetCount: 0
- invalidContractTargetCount: 0
- checkCount: 20
- passedCheckCount: 20
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1
- startsJavaService: false
- startsMiniKvService: false
- mutatesJavaState: false
- mutatesMiniKvState: false
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
- requiresParallelJavaMiniKvReadContractFix: false

## Target Results

- java GET /actuator/health:
  - targetName: Java actuator health
  - status: read-passed
  - readOnly: true
  - mutatesState: false
  - attempted: true
  - latencyMs: 125
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
  - latencyMs: 32
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
  - latencyMs: 9
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
  - latencyMs: 4
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
  - latencyMs: 1
  - statusCode: n/a
  - responseShape: json-object
  - errorCode: n/a
  - errorMessage: n/a

## Archive Verification

- archiveVerificationDigest: 4a09e28bfd9ebfc0fd68dae7e9b760027f5da09120fd76ef321ee971d9026a7f
- verificationMode: minimal-read-only-integration-gate-execution-archive-verification
- sourceSpan: Node v367 minimal read-only integration gate execution
- archiveRoot: d/367
- archiveVerificationDecision: archive-minimal-read-only-gate-execution-and-operator-ci-handoff
- sourceGateExecutionDigest: 99fd219550b798f52d01e0185a9f57ed57a0a8fb5b4e7e265475ffc8a116efa9
- sourceDecisionDigest: 2e465e3c27fbdcc74c92f7e7d28323088d0f4ae56a703b47ed30740c47052e34
- reusedSmokeArchiveDigest: dd3e29d7c8b9a4d3e9325ea95b1121c746333fd5581a6e56db4ee0a97ebd4738
- verifiesJsonMarkdownAndSummary: true
- verifiesScreenshotExplanationAndWalkthrough: true
- verifiesPlanAndArchiveIndexes: true
- verifiesOperatorCiHandoffReadiness: true
- rerunsLiveProbe: false
- startsUpstreamServices: false
- writesUpstreamState: false
- opensManagedAuditConnection: false
- requestsJavaMiniKvEcho: false
- nextNodeVersionSuggested: Node v369
- archiveFileDigests: [{"path":"d/367/evidence/minimal-read-only-integration-gate-execution-v367-http.json","digest":"f19f1124b43f36284caf9ffb920447e4861b88fc3f39d9fd95a0d3744eef6810","byteLength":8471},{"path":"d/367/evidence/minimal-read-only-integration-gate-execution-v367-http.md","digest":"db01e9fe07191da633984c04e9782f455b7b47687154fdd7700ba9c6f49a5830","byteLength":6976},{"path":"d/367/evidence/minimal-read-only-integration-gate-execution-v367-summary.json","digest":"7bc155587b3935ecf7d57dc891aa07aca5e63f7a95f0de27edd7d6a70331bcfc","byteLength":704},{"path":"d/367/evidence/minimal-read-only-integration-gate-execution-v367-browser-snapshot.md","digest":"07337a225b900b2b3c3ba7e13f9b3690679ccbd0271ae86c5ced960432721c06","byteLength":6966},{"path":"d/367/minimal-read-only-integration-gate-execution-v367.html","digest":"2a4ac59f292e12753482b53aa7fa064116e2c28640719b8fa954c3bfa0b976b0","byteLength":7633},{"path":"d/367/图片/minimal-read-only-integration-gate-execution-v367.png","digest":"7d1db38c279f00c9d5f98a0e9e90fec2d0e191c3310879dead7db39aa760b47a","byteLength":122466},{"path":"d/367/解释/minimal-read-only-integration-gate-execution-v367.md","digest":"5a6baef1a61107d79f2b9a1a8755cd402afbebe76b8e929a3721b02d50ace0b4","byteLength":3053},{"path":"代码讲解记录_生产雏形阶段2/372-minimal-read-only-integration-gate-execution-v367.md","digest":"8fa3f1e2b8a8a3b986154e56b0fb261d4dff7673f8f12b38f955563095ddb4f9","byteLength":6360},{"path":"docs/plans2/v367-post-minimal-read-only-integration-gate-execution-roadmap.md","digest":"e3d1483838f997138cc949315cbc85c4d9c24927355fecc5ef717aca7f6701fe","byteLength":4315},{"path":"docs/plans2/README.md","digest":"76dfee4ec1d98c1a909448dad2e59e3ebe2e634ffa59684cd6a85c216d7e0559","byteLength":40045},{"path":"d/README.md","digest":"9415d3f762f1cb9b53af509ca7eace49c5f5ef19a5e64ac812027e98830a0965","byteLength":5462}]

## Operator / CI Handoff Check

- checkDigest: 53dab0a0b9d7bc5420a85539181180cdb5326cdbab1cddc32f2e3b311137520c
- checkMode: operator-ci-regular-minimal-read-only-gate-execution
- sourceRoute: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution
- sourceMarkdownRoute: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution?format=markdown
- archiveVerificationRoute: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification
- focusedTestCommand: npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts
- groupedTestCommand: npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts
- buildCommand: npm.cmd run build
- smokeCommand: Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for archive verification route
- readOnlyTargetCount: 5
- expectedPassedTargetCount: 5
- expectedPassedCheckCount: 20
- avoidsFullTestBatchByDefault: true
- splitsVerificationIntoFocusedSteps: true
- requiresExternalReadWindowForActualProbe: true
- automaticUpstreamStart: false
- rerunsJavaMiniKvNow: false
- opensManagedAuditConnection: false
- readsCredentialValue: false
- parsesRawEndpointUrl: false
- invokesRuntimeShell: false

## Archive References

- d/367/evidence/minimal-read-only-integration-gate-execution-v367-http.json: exists=true; bytes=8471; digest=f19f1124b43f36284caf9ffb920447e4861b88fc3f39d9fd95a0d3744eef6810
- d/367/evidence/minimal-read-only-integration-gate-execution-v367-http.md: exists=true; bytes=6976; digest=db01e9fe07191da633984c04e9782f455b7b47687154fdd7700ba9c6f49a5830
- d/367/evidence/minimal-read-only-integration-gate-execution-v367-summary.json: exists=true; bytes=704; digest=7bc155587b3935ecf7d57dc891aa07aca5e63f7a95f0de27edd7d6a70331bcfc
- d/367/evidence/minimal-read-only-integration-gate-execution-v367-browser-snapshot.md: exists=true; bytes=6966; digest=07337a225b900b2b3c3ba7e13f9b3690679ccbd0271ae86c5ced960432721c06
- d/367/minimal-read-only-integration-gate-execution-v367.html: exists=true; bytes=7633; digest=2a4ac59f292e12753482b53aa7fa064116e2c28640719b8fa954c3bfa0b976b0
- d/367/图片/minimal-read-only-integration-gate-execution-v367.png: exists=true; bytes=122466; digest=7d1db38c279f00c9d5f98a0e9e90fec2d0e191c3310879dead7db39aa760b47a
- d/367/解释/minimal-read-only-integration-gate-execution-v367.md: exists=true; bytes=3053; digest=5a6baef1a61107d79f2b9a1a8755cd402afbebe76b8e929a3721b02d50ace0b4
- 代码讲解记录_生产雏形阶段2/372-minimal-read-only-integration-gate-execution-v367.md: exists=true; bytes=6360; digest=8fa3f1e2b8a8a3b986154e56b0fb261d4dff7673f8f12b38f955563095ddb4f9
- docs/plans2/v367-post-minimal-read-only-integration-gate-execution-roadmap.md: exists=true; bytes=4315; digest=e3d1483838f997138cc949315cbc85c4d9c24927355fecc5ef717aca7f6701fe
- docs/plans2/README.md: exists=true; bytes=40045; digest=76dfee4ec1d98c1a909448dad2e59e3ebe2e634ffa59684cd6a85c216d7e0559
- d/README.md: exists=true; bytes=5462; digest=9415d3f762f1cb9b53af509ca7eace49c5f5ef19a5e64ac812027e98830a0965

## Checks

- archiveFilesPresent: true
- jsonEvidenceReadable: true
- jsonProfileVersionValid: true
- jsonGateExecutionPassed: true
- jsonSourceNodeV366Ready: true
- jsonReusedSmokeLaneReady: true
- jsonGateExecutionRecorded: true
- jsonTargetResultsComplete: true
- jsonTargetResultsAllPassed: true
- jsonTargetResultsReadOnlyNoMutation: true
- jsonJavaTargetsGetOnly: true
- jsonMiniKvTargetsReadOnlyCommandsOnly: true
- jsonCountsMatchTargetResults: true
- jsonChecksAllPassed: true
- summaryMatchesJson: true
- markdownRecordsPassedExecution: true
- markdownRecordsSourceAndSmokeLane: true
- browserSnapshotPresent: true
- screenshotAndHtmlPresent: true
- explanationRecordsExecutionAndBoundary: true
- codeWalkthroughPresent: true
- sourcePlanPointsToV368: true
- planIndexReferencesV367AndV368: true
- archiveIndexReferencesV367: true
- routeRecordedInArchive: true
- archiveVerificationDoesNotRerunProbe: true
- operatorCiCheckUsesFocusedCommands: true
- operatorCiCheckKeepsReadWindowExplicit: true
- operatorCiCheckAvoidsLargeTestBatch: true
- noAutomaticUpstreamStart: true
- noUpstreamMutation: true
- noManagedAuditConnection: true
- noCredentialValueRequestedOrRead: true
- noRawEndpointUrlRequestedOrParsed: true
- noProviderClientInstantiated: true
- noRuntimeShellImplementedOrInvoked: true
- noJavaMiniKvFixRequired: true
- archiveVerificationDigestStable: true
- operatorCiCheckDigestStable: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: true

## Summary

- checkCount: 42
- passedCheckCount: 42
- archiveFileCount: 11
- presentArchiveFileCount: 11
- sourceCheckCount: 20
- sourcePassedCheckCount: 20
- attemptedTargetCount: 5
- passedTargetCount: 5
- readOnlyTargetCount: 5
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- V367_GATE_EXECUTION_ARCHIVE_VERIFIED (warning, node-v367): v368 verified v367 as archive-read-passed-gate-execution with 5/5 read targets passed.

## Recommendations

- PROCEED_TO_NODE_V369_OPERATOR_CI_HANDOFF (recommendation, archive-verification): Proceed to operator/CI regular gate handoff, then let Java and mini-kv advance shard-readiness outputs in parallel.

## Next Actions

- Use Node v369 to turn the v367 gate execution into an operator/CI regular gate handoff.
- Keep future actual probe runs behind an explicit Java/mini-kv read window; Node must not auto-start upstream services.
- Switch the next roadmap from Node-fronted approvals to contract-consumer mode so Java and mini-kv can progress shard-readiness work in parallel.

