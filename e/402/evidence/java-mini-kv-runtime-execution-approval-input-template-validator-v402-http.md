# Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approval input template validator

- Service: orderops-node
- Generated at: 2026-05-30T23:50:54.218Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator.v1
- Template validator state: runtime-execution-approval-input-templates-published-runtime-blocked
- Template validator decision: publish-machine-checkable-input-templates-and-keep-runtime-blocked
- Active Node version: Node v402
- Source Node version: Node v401
- Java source version: Java v165
- mini-kv source version: mini-kv v156
- Ready for runtime execution approval input template validator: true
- Ready for runtime execution packet: false
- Ready for runtime live-read gate: false
- Runtime execution packet executable: false
- Runtime gate approval present: false
- Execution attempted: false
- Starts Java service: false
- Starts mini-kv service: false
- Connects managed audit: false
- Execution allowed: false

## Source Node v401

- sourceVersion: Node v401
- intakeState: runtime-execution-approval-input-completion-intake-blocked
- readyForRuntimeExecutionApprovalInputCompletionIntake: true
- readyForRuntimeExecutionPacket: false
- readyForRuntimeLiveReadGate: false
- checkCount: 27
- passedCheckCount: 27
- productionBlockerCount: 3

## Template Bundle

- bundleDigest: 5ecb75552bf844c85038958a57c4832e24cf2772cfe8148d78839026ba4e1580
- bundleMode: template-only-no-runtime-approval
- sourceSpan: Node v401 completion intake + Java v165 + mini-kv v156
- templateCount: 3
- targetInputCount: 3
- presentTargetInputCount: 0
- validTargetInputCount: 0
- missingTargetInputCount: 3
- runtimeGateStillClosed: true
- nextNodeVersionSuggested: Node v403

## Input Templates

- nodeApprovedRuntimeWindow
  - owner: node
  - targetPath: e/398/input/node-approved-runtime-window-v398.json
  - templateArchivePath: e/402/input-templates/node-approved-runtime-window-v402.template.json
  - schemaVersion: node-runtime-execution-approval-input.v1
  - inputKind: node-approved-runtime-window
  - requiredFields: ["schemaVersion","inputKind","activeNodeVersion","sourceNodeVersion","javaSourceVersion","miniKvSourceVersion","approvalWindowId","approvalCorrelationId","windowMode","notBeforeIso","notAfterIso","javaLoopbackHost","javaLoopbackPort","miniKvLoopbackHost","miniKvLoopbackPort","allowedHttpMethods","cleanupRequired"]
  - expectedConstants: {"schemaVersion":"node-runtime-execution-approval-input.v1","inputKind":"node-approved-runtime-window","activeNodeVersion":"Node v402","sourceNodeVersion":"Node v401","javaSourceVersion":"Java v165","miniKvSourceVersion":"mini-kv v156","upstreamActionsEnabled":false,"cleanupRequired":true}
  - semanticRules: ["allowedHttpMethods must contain only GET","notBeforeIso and notAfterIso must be explicit ISO strings supplied by the approver","loopback ports must bind Java and mini-kv in the same runtime window"]
  - templateDigest: 258c81c2680b82ae43293e06f8265fa9ec54dd3b676bb66c3e3192f3e10dfec8
- correlatedOperatorApprovalRecord
  - owner: operator
  - targetPath: e/398/input/correlated-operator-approval-record-v398.json
  - templateArchivePath: e/402/input-templates/correlated-operator-approval-record-v402.template.json
  - schemaVersion: correlated-operator-approval-record.v1
  - inputKind: correlated-operator-approval-record
  - requiredFields: ["schemaVersion","inputKind","approvalCorrelationId","approvedRuntimeWindowId","operatorId","operatorVerified","bindsNodeVersion","bindsSourceNodeVersion","bindsJavaVersion","bindsMiniKvVersion","approvalScope","allowedHttpMethods","issuedAtIso","cleanupAcknowledged"]
  - expectedConstants: {"schemaVersion":"correlated-operator-approval-record.v1","inputKind":"correlated-operator-approval-record","operatorVerified":true,"bindsNodeVersion":"Node v402","bindsSourceNodeVersion":"Node v401","bindsJavaVersion":"Java v165","bindsMiniKvVersion":"mini-kv v156","approvesCredentialValueRead":false,"approvesRawEndpointUrlParsing":false,"cleanupAcknowledged":true}
  - semanticRules: ["approvalCorrelationId must match the Node runtime window and packet","operatorVerified must be true","allowedHttpMethods must contain only GET"]
  - templateDigest: 94fe9195220890c21ef4917dcac909a7d861895046eb940bdcc275ed595dae03
- crossProjectRuntimeExecutionPacket
  - owner: cross-project
  - targetPath: e/398/input/cross-project-runtime-execution-packet-v398.json
  - templateArchivePath: e/402/input-templates/cross-project-runtime-execution-packet-v402.template.json
  - schemaVersion: cross-project-runtime-execution-packet.v1
  - inputKind: complete-cross-project-runtime-execution-packet
  - requiredFields: ["schemaVersion","inputKind","packetId","approvalCorrelationId","nodeApprovedRuntimeWindowInput","correlatedOperatorApprovalRecordInput","sourceNodeV401Archive","javaApprovalInputEvidence","miniKvFinalApprovalInputEvidence","nodeVersion","javaVersion","miniKvVersion","runtimeExecutionPacketPresent","runtimeExecutionPacketExecutable","readyForRuntimeLiveReadGate","allowedHttpMethods","writeOperationsAllowed","cleanupProofRequiredAfterRun"]
  - expectedConstants: {"schemaVersion":"cross-project-runtime-execution-packet.v1","inputKind":"complete-cross-project-runtime-execution-packet","nodeApprovedRuntimeWindowInput":"e/398/input/node-approved-runtime-window-v398.json","correlatedOperatorApprovalRecordInput":"e/398/input/correlated-operator-approval-record-v398.json","nodeVersion":"Node v402","javaVersion":"Java v165","miniKvVersion":"mini-kv v156","runtimeExecutionPacketPresent":true,"runtimeExecutionPacketExecutable":true,"readyForRuntimeLiveReadGate":true,"writeOperationsAllowed":false,"cleanupProofRequiredAfterRun":true}
  - semanticRules: ["approvalCorrelationId must match the Node window and operator record","allowedHttpMethods must contain only GET","packet must include service owners, loopback ports, smoke commands, and cleanup rules"]
  - templateDigest: 5d244abb08e9ccfc383ee88e4e5de0f5b55a2bded07a0589d928d0f501db0ad7
## Target Input Validations

- nodeApprovedRuntimeWindow
  - owner: node
  - file: {"id":"nodeApprovedRuntimeWindow","path":"e/398/input/node-approved-runtime-window-v398.json","resolvedPath":"e/398/input/node-approved-runtime-window-v398.json","exists":false,"sizeBytes":0,"digest":null}
  - present: false
  - valid: false
  - requiredFieldCount: 17
  - missingRequiredFieldCount: 17
  - expectedConstantCount: 8
  - passedExpectedConstantCount: 0
  - semanticRuleCount: 3
  - passedSemanticRuleCount: 0
  - canUnlockRuntimeAlone: false
- correlatedOperatorApprovalRecord
  - owner: operator
  - file: {"id":"correlatedOperatorApprovalRecord","path":"e/398/input/correlated-operator-approval-record-v398.json","resolvedPath":"e/398/input/correlated-operator-approval-record-v398.json","exists":false,"sizeBytes":0,"digest":null}
  - present: false
  - valid: false
  - requiredFieldCount: 14
  - missingRequiredFieldCount: 14
  - expectedConstantCount: 10
  - passedExpectedConstantCount: 0
  - semanticRuleCount: 3
  - passedSemanticRuleCount: 0
  - canUnlockRuntimeAlone: false
- crossProjectRuntimeExecutionPacket
  - owner: cross-project
  - file: {"id":"crossProjectRuntimeExecutionPacket","path":"e/398/input/cross-project-runtime-execution-packet-v398.json","resolvedPath":"e/398/input/cross-project-runtime-execution-packet-v398.json","exists":false,"sizeBytes":0,"digest":null}
  - present: false
  - valid: false
  - requiredFieldCount: 18
  - missingRequiredFieldCount: 18
  - expectedConstantCount: 12
  - passedExpectedConstantCount: 0
  - semanticRuleCount: 3
  - passedSemanticRuleCount: 0
  - canUnlockRuntimeAlone: false
## Checks

- sourceNodeV401Ready: true
- sourceNodeV401StillBlocksRuntime: true
- templateCountStable: true
- targetInputCountStable: true
- templateDigestsStable: true
- nodeWindowTemplateComplete: true
- operatorApprovalTemplateComplete: true
- crossProjectPacketTemplateComplete: true
- targetPathsCanonical: true
- templateArchivePathsSeparateFromCanonicalInputs: true
- noConcreteApprovalInputsPresent: true
- noConcreteApprovalInputsValid: true
- runtimePacketStillAbsent: true
- runtimeGateStillClosed: true
- executionStillDenied: true
- noAutomaticUpstreamStartStop: true
- noUpstreamMutation: true
- noManagedAuditConnection: true
- noCredentialValueRead: true
- noRawEndpointUrlParsed: true
- activeShardPrototypeStillDisabled: true
- readyForRuntimeExecutionApprovalInputTemplateValidator: true

## Summary

- checkCount: 22
- passedCheckCount: 22
- sourceCheckCount: 27
- sourcePassedCheckCount: 27
- templateCount: 3
- targetInputCount: 3
- presentTargetInputCount: 0
- validTargetInputCount: 0
- missingTargetInputCount: 3
- productionBlockerCount: 3
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- NODE_APPROVED_RUNTIME_WINDOW_INPUT_NOT_PRESENT (blocker, e/398/input/node-approved-runtime-window-v398.json): The canonical Node-approved runtime window input is still absent.
- CORRELATED_OPERATOR_APPROVAL_RECORD_INPUT_NOT_PRESENT (blocker, e/398/input/correlated-operator-approval-record-v398.json): The canonical correlated operator approval record input is still absent.
- CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_INPUT_NOT_PRESENT (blocker, e/398/input/cross-project-runtime-execution-packet-v398.json): The canonical complete cross-project runtime execution packet input is still absent.

## Warnings

- TEMPLATES_ARE_NOT_RUNTIME_APPROVAL (warning, node-v402): Template files document required shape only; they must not be copied into canonical input paths without real approval values.

## Recommendations

- FILL_CANONICAL_INPUTS_WITH_SHARED_CORRELATION_ID (recommendation, node-v402): Use one approvalCorrelationId across the Node runtime window, operator approval record, and cross-project packet.

## Evidence Endpoints

- templateValidatorJson: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator
- templateValidatorMarkdown: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator?format=markdown
- sourceNodeV401Json: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake
- sourceNodeV401Markdown: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake?format=markdown
- activePlan: docs/plans3/v402-post-runtime-execution-approval-input-template-validator-roadmap.md
- nextPlan: docs/plans3/v403-post-runtime-execution-approval-input-validation-roadmap.md
- nextNodeVersion: Node v403

## Next Actions

- Write real approval inputs only to the canonical e/398/input target paths, not to the v402 template archive paths.
- Keep the Node-approved runtime window, correlated operator approval record, and cross-project packet correlated by one approvalCorrelationId.
- Require GET-only smoke commands and explicit cleanup rules before any Java or mini-kv startup.
- Do not treat these templates as runtime approval; they are validation contracts only.
- Run the v403 validator only after the three canonical input files are present.
