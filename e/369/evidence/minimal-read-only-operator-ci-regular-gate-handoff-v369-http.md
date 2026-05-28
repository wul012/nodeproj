# Managed audit manual sandbox connection credential resolver minimal read-only integration operator/CI regular gate handoff

- Service: orderops-node
- Generated at: 2026-05-28T12:47:29.230Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff.v1
- Handoff state: operator-ci-regular-gate-handoff-ready
- Handoff decision: freeze-read-only-and-shard-readiness-contracts
- Active Node version: Node v369
- Source Node version: Node v368
- Ready for parallel mini-kv shard readiness prototype: true
- Ready for parallel Java shard readiness echo: true
- Ready for Node v370 shard readiness contract consumer gate: true
- Handoff only: true
- Contract freeze included: true
- Reruns live probe: false
- Starts Java service: false
- Starts mini-kv service: false
- Connects managed audit: false
- Sends managed audit HTTP/TCP: false
- Credential value requested: false
- Credential value read: false
- Raw endpoint URL requested: false
- Raw endpoint URL parsed: false
- Runtime shell implemented: false
- Execution allowed: false

## Source Node v368

- sourceVersion: Node v368
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification.v1
- archiveVerificationState: minimal-read-only-integration-gate-execution-archive-verified
- archiveVerificationDecision: archive-minimal-read-only-gate-execution-and-operator-ci-handoff
- readyForArchiveVerification: true
- readyForNodeV369OperatorCiRegularGateHandoff: true
- sourceNodeVersion: Node v367
- sourceNodeV367GateExecutionResult: all-read-passed
- sourceNodeV367GateExecutionDecision: archive-read-passed-gate-execution
- sourceNodeV367ExecutionDigest: 99fd219550b798f52d01e0185a9f57ed57a0a8fb5b4e7e265475ffc8a116efa9
- v368ArchiveVerificationDigest: 4a09e28bfd9ebfc0fd68dae7e9b760027f5da09120fd76ef321ee971d9026a7f
- v368OperatorCiCheckDigest: 53dab0a0b9d7bc5420a85539181180cdb5326cdbab1cddc32f2e3b311137520c
- sourceCheckCount: 20
- sourcePassedCheckCount: 20
- archiveCheckCount: 42
- archivePassedCheckCount: 42
- attemptedTargetCount: 5
- passedTargetCount: 5
- archiveFileCount: 11
- presentArchiveFileCount: 11
- productionBlockerCount: 0
- startsJavaService: false
- startsMiniKvService: false
- connectsManagedAudit: false
- sendsManagedAuditHttpTcp: false
- credentialValueRead: false
- rawEndpointUrlParsed: false
- runtimeShellImplemented: false
- executionAllowed: false

## Handoff

- handoffDigest: 822260c3e3416f9289bdf464fe1a0ee602140f62592b18abab12a1bea1df19a8
- handoffMode: operator-ci-regular-minimal-read-only-gate
- sourceSpan: Node v367 gate execution plus Node v368 archive verification
- freezesContracts: true
- readOnlyIntegrationContractVersion: read-only-integration.v1
- shardReadinessContractVersion: shard-readiness.v1
- focusedCommand: npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts
- groupedCommand: npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts test\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts
- buildCommand: npm.cmd run build
- smokeCommand: Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for operator/CI handoff route
- actualProbeRequiresExternalReadWindow: true
- largeTestBatchDefaultAllowed: false
- automaticUpstreamStart: false
- managedAuditConnectionAllowed: false
- nextNodeVersionSuggested: Node v370

## Frozen Contracts

- read-only-integration.v1:
  - contractState: frozen
  - path: fixtures/upstream-contracts/read-only-integration.v1.json
  - exists: true
  - digest: ca9f5c885703e8b893b458ebdbfca4c501c61e2751051fa3085863bd43866445
  - requiredFieldCount: 6
  - requiredFields: ["project","version","readOnly","executionAllowed","status","evidencePath"]
  - readOnlyRequired: true
  - executionAllowedRequired: true
  - automaticUpstreamStartAllowed: false
- shard-readiness.v1:
  - contractState: frozen
  - path: fixtures/upstream-contracts/shard-readiness.v1.json
  - exists: true
  - digest: 58f662cf918839d98e5a7d54f9f4a18230461784db06c0e7f4f08d4a8dfb9eb4
  - requiredFieldCount: 10
  - requiredFields: ["project","version","readOnly","executionAllowed","shardEnabled","shardCount","slotCount","routingMode","evidencePath","status"]
  - readOnlyRequired: true
  - executionAllowedRequired: true
  - automaticUpstreamStartAllowed: false

## Parallel Shard Readiness Plan

- planDigest: 2a06d49bed2c2313358c3a963d8a803dbff7c77ae4fc466a92103b9e1b064b3c
- miniKvTrack: {"recommendedVersion":"mini-kv shard-readiness prototype","canRunInParallelWithJava":true,"consumesContract":"shard-readiness.v1","expectedOutput":"read-only JSON/CLI evidence","allowedScope":["shard-map","slot-table","key-routing","multi-dir-or-multi-process-smoke"],"forbiddenScope":["order-authoritative-storage","audit-authoritative-storage","write-admin-in-node-gate"]}
- javaTrack: {"recommendedVersion":"Java shard-readiness echo","canRunInParallelWithMiniKv":true,"consumesContract":"shard-readiness.v1","expectedOutput":"fixture-first read-only echo, then live echo","allowedScope":["read-only-endpoint-or-fixture","shard-count-echo","routing-mode-echo"],"forbiddenScope":["order-transaction-change","payment-or-inventory-route-change","ledger-write"]}
- nodeTrack: {"nextVersion":"Node v370","waitsForJavaAndMiniKvShardEvidence":true,"consumesContracts":["read-only-integration.v1","shard-readiness.v1"],"role":"contract-consumer-and-integration-gate"}

## Source Archive References

- e/368/evidence/minimal-read-only-gate-execution-archive-verification-v368-http.json: exists=true; bytes=14832; digest=d156bfb9c9a763ea9a841e08bca16ec33a32dbbc8446e0993a886d58dfe110bb
- e/368/evidence/minimal-read-only-gate-execution-archive-verification-v368-http.md: exists=true; bytes=13196; digest=82677959e492f153a6e430e2374c0cce8fd01f737c7b085bfebd19f5de232294
- e/368/evidence/minimal-read-only-gate-execution-archive-verification-v368-summary.json: exists=true; bytes=1055; digest=9dd02a77a7ab6f142fa5195a9a42b8362f1e4ee54ff797fdd44cb1ff51e4903c
- e/368/evidence/minimal-read-only-gate-execution-archive-verification-v368-browser-snapshot.md: exists=true; bytes=13221; digest=d84899af9e59d4c002f3ac68592862f2d06c47d67527370ae3f2b817ed218966
- e/368/minimal-read-only-gate-execution-archive-verification-v368.html: exists=true; bytes=14311; digest=ea002d52bcff4d5bb5796a5b17d4f2800a0b60f7a1c18aeca36b7312ded284b1
- e/368/图片/minimal-read-only-gate-execution-archive-verification-v368.png: exists=true; bytes=210305; digest=521610bf750688ed64b422b4d751d77b7186ea488eed1326ec11b50adebce3ac
- e/368/解释/minimal-read-only-gate-execution-archive-verification-v368.md: exists=true; bytes=4056; digest=fdc2a3cbe4a824248a9553443bd01677a0edb43320e7f632ffc17ddb5c43e08e
- 代码讲解记录_生产雏形阶段3/373-minimal-read-only-gate-execution-archive-verification-v368.md: exists=true; bytes=9365; digest=e0c0ceda905ccdca9ddd65d87a936ef9254f61b1b4cb9de783169202a2f18988
- docs/plans3/v368-post-minimal-read-only-integration-gate-execution-archive-verification-roadmap.md: exists=true; bytes=5694; digest=12236014baba61d5708e6f06d473b25ca9249c6a485a083eb4eabbfc4e7e7f37

## Checks

- sourceNodeV368Ready: true
- sourceNodeV367GatePassed: true
- sourceNodeV368ArchiveFilesComplete: true
- sourceNodeV368ChecksAllPassed: true
- sourceNodeV368DoesNotRerunProbe: true
- sourceNodeV368KeepsRuntimeBoundaryClosed: true
- sourceNodeV368EvidenceFilesPresent: true
- readOnlyIntegrationContractPresent: true
- readOnlyIntegrationContractFrozen: true
- readOnlyIntegrationRequiredFieldsComplete: true
- readOnlyIntegrationRulesSafe: true
- shardReadinessContractPresent: true
- shardReadinessContractFrozen: true
- shardReadinessRequiredFieldsComplete: true
- shardReadinessRulesSafe: true
- handoffDigestStable: true
- handoffUsesFocusedCommands: true
- handoffAvoidsLargeTestBatch: true
- handoffRequiresExternalReadWindowForProbe: true
- handoffDoesNotStartUpstreams: true
- parallelShardPlanExplicit: true
- parallelJavaMiniKvAllowed: true
- nodeNoLongerBlocksParallelProgress: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- noRuntimeShellImplementedOrInvoked: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForOperatorCiRegularGateHandoff: true

## Summary

- checkCount: 30
- passedCheckCount: 30
- sourceArchiveCheckCount: 42
- sourceArchivePassedCheckCount: 42
- sourceGateTargetCount: 5
- sourceGatePassedTargetCount: 5
- sourceArchiveFileCount: 9
- sourcePresentArchiveFileCount: 9
- frozenContractCount: 2
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- NODE_ROLE_REDUCED_TO_CONTRACT_CONSUMER (warning, parallel-shard-plan): Node now gates risk and consumes contracts; Java and mini-kv can produce shard-readiness evidence in parallel.

## Recommendations

- START_PARALLEL_SHARD_READINESS_WORK (recommendation, parallel-shard-plan): Start mini-kv shard readiness prototype and Java shard readiness echo in parallel; return to Node v370 when both publish read-only evidence.

## Next Actions

- Let mini-kv start the shard readiness prototype and Java start the shard readiness echo in parallel under shard-readiness.v1.
- Use Node v370 only after both projects publish read-only shard readiness evidence.
- Keep Node as the contract consumer and integration gate; do not resume Node-fronted prerequisite chains for shard work.
