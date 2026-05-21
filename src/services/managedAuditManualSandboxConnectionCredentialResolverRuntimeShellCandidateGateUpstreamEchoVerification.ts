import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.js";
import type {
  JavaV134RuntimeShellCandidateGateEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile,
  MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
  RuntimeShellCandidateGateUpstreamEchoVerification,
  RuntimeShellCandidateGateUpstreamEchoVerificationChecks,
  RuntimeShellCandidateGateUpstreamEchoVerificationMessage,
  RuntimeShellCandidateGateUpstreamEchoVerificationSummary,
  SourceNodeV297RuntimeShellCandidateGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification";
const SOURCE_NODE_V297_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate";
const ACTIVE_PLAN = "docs/plans2/v297-post-disabled-runtime-shell-implementation-candidate-gate-roadmap.md";
const GATE_DECISION = "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation";
const REQUIRED_GATE_COUNT = 5;

const JAVA_V134_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoSupport.java";
const JAVA_V134_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialResolverDisabledRuntimeShellCandidateGateEchoTests.java";
const JAVA_V134_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/136-version-134-runtime-shell-candidate-gate-echo.md";
const MINI_KV_V131_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-runtime-shell-candidate-gate-non-participation-receipt.json";
const MINI_KV_V131_RUNBOOK = "D:/C/mini-kv/d/131/解释/说明.md";
const MINI_KV_V131_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/187-version-131-credential-resolver-disabled-runtime-shell-candidate-gate-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile {
  const sourceNodeV297 = createSourceNodeV297(input.config);
  const javaV134 = createJavaV134Reference();
  const miniKvV131 = createMiniKvV131Reference();
  const checks = createChecks(input.config, sourceNodeV297, javaV134, miniKvV131);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification
    ? "runtime-shell-candidate-gate-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV297GateDigest: sourceNodeV297.gateDigest,
    javaV134Ready: javaV134.readyForNodeV298,
    miniKvV131ReceiptDigest: miniKvV131.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(
    sourceNodeV297,
    javaV134,
    miniKvV131,
    checks,
    verificationDigest,
  );
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV297, javaV134, miniKvV131, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell candidate gate upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    runtimeShellCandidateGateUpstreamEchoVerificationOnly: true,
    consumesNodeV297DisabledRuntimeShellImplementationCandidateGate: true,
    consumesJavaV134RuntimeShellCandidateGateEcho: true,
    consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: true,
    readyForNodeV299RuntimeShellCandidateGateDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
    readyForNodeV299RuntimeShellImplementation: false,
    readyForDisabledRuntimeShellImplementation: false,
    readyForDisabledRuntimeShellInvocation: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellEnabled: false,
    runtimeShellInvocationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV297,
    upstreamEvidence: { javaV134, miniKvV131 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellCandidateGateUpstreamEchoVerificationJson: ROUTE_PATH,
      runtimeShellCandidateGateUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV297Json: SOURCE_NODE_V297_ROUTE,
      sourceNodeV297Markdown: `${SOURCE_NODE_V297_ROUTE}?format=markdown`,
      javaV134Support: JAVA_V134_SUPPORT,
      javaV134Test: JAVA_V134_TEST,
      javaV134Walkthrough: JAVA_V134_WALKTHROUGH,
      miniKvV131Receipt: MINI_KV_V131_RECEIPT,
      miniKvV131Runbook: MINI_KV_V131_RUNBOOK,
      miniKvV131Walkthrough: MINI_KV_V131_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v298 as a read-only upstream echo verification for Java v134 and mini-kv v131.",
      "Use Node v299 only for a candidate gate decision record; keep runtime shell implementation blocked unless a later explicit approval changes the plan.",
      "Keep credential values, raw endpoint URLs, provider clients, HTTP/TCP, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV297(config: AppConfig): SourceNodeV297RuntimeShellCandidateGateReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate({
    config,
  });

  return {
    sourceVersion: "Node v297",
    profileVersion: source.profileVersion,
    candidateGateState: source.candidateGateState,
    readyForCandidateGate:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
    readOnlyCandidateGate: source.readOnlyCandidateGate,
    implementationCandidateGateOnly: source.implementationCandidateGateOnly,
    readyForParallelJavaV134MiniKvV131EchoRequest: source.readyForParallelJavaV134MiniKvV131EchoRequest,
    readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification:
      source.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification,
    readyForNodeV298RuntimeShellImplementation: source.readyForNodeV298RuntimeShellImplementation,
    gateVersion: source.candidateGate.gateVersion,
    gateMode: source.candidateGate.gateMode,
    gateDecision: source.candidateGate.gateDecision,
    gateDigest: source.candidateGate.gateDigest,
    requiredGateCount: source.candidateGate.requiredGateCount,
    documentedGateCount: source.candidateGate.documentedGateCount,
    reviewEvidenceSatisfiedCount: source.candidateGate.reviewEvidenceSatisfiedCount,
    runtimePrerequisiteSatisfiedCount: source.candidateGate.runtimePrerequisiteSatisfiedCount,
    implementationAllowedGateCount: source.candidateGate.implementationAllowedGateCount,
    requiredGateCodes: source.candidateGate.requiredGates.map((gate) => gate.code),
    necessityConsumer: source.candidateGate.necessity.consumer,
    stopConditionCount: source.summary.stopConditionCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV134Reference(): JavaV134RuntimeShellCandidateGateEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v134-support", JAVA_V134_SUPPORT),
    evidenceFile("java-v134-test", JAVA_V134_TEST),
    evidenceFile("java-v134-walkthrough", JAVA_V134_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v134-mode", JAVA_V134_SUPPORT, "java-v134-credential-resolver-disabled-runtime-shell-candidate-gate-echo-only"),
    snippet("java-v134-node-v297", JAVA_V134_TEST, "Node v297"),
    snippet("java-v134-node-v298", JAVA_V134_TEST, "Node v298"),
    snippet("java-v134-profile", JAVA_V134_TEST, PROFILE_VERSION),
    snippet("java-v134-ready", JAVA_V134_SUPPORT, "readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification=true"),
    snippet("java-v134-decision", JAVA_V134_SUPPORT, GATE_DECISION),
    snippet("java-v134-gate-count", JAVA_V134_TEST, "requiredGateCount()).isEqualTo(5)"),
    snippet("java-v134-implementation-count", JAVA_V134_TEST, "implementationAllowedGateCount()).isZero()"),
    snippet("java-v134-necessity", JAVA_V134_SUPPORT, "Java v134 and mini-kv v131, then Node v298"),
    snippet("java-v134-no-runtime", JAVA_V134_TEST, "readyForDisabledRuntimeShellImplementation()).isFalse()"),
    snippet("java-v134-no-invocation", JAVA_V134_TEST, "readyForDisabledRuntimeShellInvocation()).isFalse()"),
    snippet("java-v134-no-credential", JAVA_V134_SUPPORT, "credentialValueRead=false"),
    snippet("java-v134-no-endpoint", JAVA_V134_SUPPORT, "rawEndpointUrlParsed=false"),
    snippet("java-v134-no-provider-client", JAVA_V134_TEST, "noProviderClientInstantiationEchoed"),
    snippet("java-v134-no-connection", JAVA_V134_SUPPORT, "externalRequestSent=false"),
    snippet("java-v134-no-write", JAVA_V134_TEST, "writeBoundaryClosed()).isTrue()"),
    snippet("java-v134-no-autostart", JAVA_V134_SUPPORT, "automaticUpstreamStart"),
    snippet("java-v134-walkthrough", JAVA_V134_WALKTHROUGH, "Java v134"),
  ];
  const matched = (id: string) => snippetMatched(expectedSnippets, id);

  return {
    sourceVersion: "Java v134",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    candidateGateEchoPresent: matched("java-v134-mode"),
    readyForNodeV298: matched("java-v134-node-v298") && matched("java-v134-ready"),
    candidateGateEchoMode: matched("java-v134-mode")
      ? "java-v134-credential-resolver-disabled-runtime-shell-candidate-gate-echo-only"
      : "missing",
    consumedNodeV297: matched("java-v134-node-v297"),
    gateDecisionEchoed: matched("java-v134-decision"),
    fiveGateSetEchoed: matched("java-v134-gate-count") && matched("java-v134-implementation-count"),
    necessityEchoed: matched("java-v134-necessity"),
    noRuntimeImplementation: matched("java-v134-no-runtime"),
    noRuntimeInvocation: matched("java-v134-no-invocation"),
    credentialValueBoundaryClosed: matched("java-v134-no-credential"),
    rawEndpointBoundaryClosed: matched("java-v134-no-endpoint"),
    providerClientBoundaryClosed: matched("java-v134-no-provider-client"),
    connectionBoundaryClosed: matched("java-v134-no-connection"),
    ledgerSqlSchemaBoundaryClosed: matched("java-v134-no-write"),
    automaticUpstreamStartBlocked: matched("java-v134-no-autostart"),
  };
}

function createMiniKvV131Reference(): MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v131-receipt", MINI_KV_V131_RECEIPT),
    evidenceFile("mini-kv-v131-runbook", MINI_KV_V131_RUNBOOK),
    evidenceFile("mini-kv-v131-walkthrough", MINI_KV_V131_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v131-consumer", MINI_KV_V131_RECEIPT, "Node v298 runtime shell candidate gate upstream echo verification"),
    snippet("mini-kv-v131-release", MINI_KV_V131_RECEIPT, "\"release_version\":\"v131\""),
    snippet("mini-kv-v131-ready", MINI_KV_V131_RECEIPT, "\"ready_for_node_v298_runtime_shell_candidate_gate_upstream_echo_verification\":true"),
    snippet("mini-kv-v131-node-v297", MINI_KV_V131_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1"),
    snippet("mini-kv-v131-decision", MINI_KV_V131_RECEIPT, GATE_DECISION),
    snippet("mini-kv-v131-gate-digest", MINI_KV_V131_RECEIPT, "\"gate_digest\":\"651383bcd175bdaff2691c026135a1cebbcf30de91be7709cbc7843866684e22\""),
    snippet("mini-kv-v131-gate-count", MINI_KV_V131_RECEIPT, "\"required_gate_count\":5"),
    snippet("mini-kv-v131-implementation-count", MINI_KV_V131_RECEIPT, "\"implementation_allowed_gate_count\":0"),
    snippet("mini-kv-v131-no-runtime", MINI_KV_V131_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v131-no-credential", MINI_KV_V131_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v131-no-raw-endpoint", MINI_KV_V131_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v131-no-http", MINI_KV_V131_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v131-no-restore", MINI_KV_V131_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v131-walkthrough", MINI_KV_V131_WALKTHROUGH, "mini-kv v131 credential resolver disabled runtime shell candidate gate non-participation receipt"),
  ];
  const root = readJsonObject(MINI_KV_V131_RECEIPT);
  const receipt = objectField(root, "credential_resolver_disabled_runtime_shell_candidate_gate_non_participation_receipt");
  const sourceNodeV297 = objectField(receipt, "source_node_v297_reference");
  const sourceNodeV296 = objectField(receipt, "source_node_v296_reference");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v131",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    receiptVersion: stringField(root, "receipt_version") ?? stringField(receipt, "receipt_version"),
    releaseVersion: stringField(root, "release_version") ?? stringField(receipt, "current_release_version"),
    consumerHint: stringField(root, "consumer_hint") ?? stringField(receipt, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    nodeV297ProfileVersion: stringField(sourceNodeV297, "profile_version"),
    nodeV297GateDecision: stringField(sourceNodeV297, "gate_decision"),
    nodeV297GateDigest: stringField(sourceNodeV297, "gate_digest"),
    requiredGateCount: numberField(sourceNodeV297, "required_gate_count") ?? numberField(summary, "required_gate_count"),
    documentedGateCount: numberField(sourceNodeV297, "documented_gate_count") ?? numberField(summary, "documented_gate_count"),
    reviewEvidenceSatisfiedCount: numberField(sourceNodeV297, "review_evidence_satisfied_count")
      ?? numberField(summary, "review_evidence_satisfied_count"),
    runtimePrerequisiteSatisfiedCount: numberField(sourceNodeV297, "runtime_prerequisite_satisfied_count")
      ?? numberField(summary, "runtime_prerequisite_satisfied_count"),
    implementationAllowedGateCount: numberField(sourceNodeV297, "implementation_allowed_gate_count")
      ?? numberField(summary, "implementation_allowed_gate_count"),
    sourceNodeV296Ready: booleanField(sourceNodeV296, "ready_for_upstream_echo_verification"),
    readyForNodeV298: booleanField(receipt, "ready_for_node_v298_runtime_shell_candidate_gate_upstream_echo_verification"),
    readOnly: booleanField(root, "read_only") ?? booleanField(receipt, "read_only"),
    executionAllowed: booleanField(root, "execution_allowed") ?? booleanField(receipt, "execution_allowed"),
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented"),
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed"),
    disabledRuntimeShellParticipates: booleanField(receipt, "disabled_runtime_shell_participates"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    providerClientInstantiationAllowed: booleanField(receipt, "provider_client_instantiation_allowed"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(root, "order_authoritative") ?? booleanField(receipt, "order_authoritative"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV297: SourceNodeV297RuntimeShellCandidateGateReference,
  javaV134: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKvV131: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
): RuntimeShellCandidateGateUpstreamEchoVerificationChecks {
  return {
    sourceNodeV297Ready:
      sourceNodeV297.candidateGateState === "disabled-runtime-shell-implementation-candidate-gate-reviewed"
      && sourceNodeV297.readyForCandidateGate
      && sourceNodeV297.readyForParallelJavaV134MiniKvV131EchoRequest
      && sourceNodeV297.productionBlockerCount === 0,
    sourceNodeV297KeepsImplementationBlocked:
      sourceNodeV297.readyForNodeV298RuntimeShellImplementation === false
      && sourceNodeV297.runtimeShellImplemented === false
      && sourceNodeV297.runtimeShellInvocationAllowed === false
      && sourceNodeV297.executionAllowed === false,
    sourceNodeV297KeepsSideEffectsClosed:
      sourceNodeV297.credentialValueRead === false
      && sourceNodeV297.rawEndpointUrlParsed === false
      && sourceNodeV297.externalRequestSent === false
      && sourceNodeV297.connectsManagedAudit === false
      && sourceNodeV297.secretProviderInstantiated === false
      && sourceNodeV297.resolverClientInstantiated === false
      && sourceNodeV297.schemaMigrationExecuted === false
      && sourceNodeV297.approvalLedgerWritten === false
      && sourceNodeV297.automaticUpstreamStart === false,
    javaV134EvidencePresent: javaV134.evidencePresent && javaV134.verificationDocumented,
    javaV134CandidateGateEchoReady:
      javaV134.candidateGateEchoPresent
      && javaV134.readyForNodeV298
      && javaV134.consumedNodeV297
      && javaV134.gateDecisionEchoed
      && javaV134.fiveGateSetEchoed
      && javaV134.necessityEchoed,
    miniKvV131EvidencePresent: miniKvV131.evidencePresent && miniKvV131.verificationDocumented,
    miniKvV131NonParticipationReceiptReady:
      miniKvV131.releaseVersion === "v131"
      && miniKvV131.consumerHint === "Node v298 runtime shell candidate gate upstream echo verification"
      && miniKvV131.readyForNodeV298 === true
      && miniKvV131.productionBlockerCount === 0,
    upstreamEchoConsumerAligned:
      javaV134.readyForNodeV298
      && miniKvV131.consumerHint === "Node v298 runtime shell candidate gate upstream echo verification",
    nodeJavaMiniKvGateDecisionAligned:
      sourceNodeV297.gateDecision === GATE_DECISION
      && javaV134.gateDecisionEchoed
      && miniKvV131.nodeV297GateDecision === GATE_DECISION,
    candidateGateCountAligned:
      sourceNodeV297.requiredGateCount === REQUIRED_GATE_COUNT
      && sourceNodeV297.documentedGateCount === REQUIRED_GATE_COUNT
      && sourceNodeV297.reviewEvidenceSatisfiedCount === REQUIRED_GATE_COUNT
      && javaV134.fiveGateSetEchoed
      && miniKvV131.requiredGateCount === REQUIRED_GATE_COUNT
      && miniKvV131.documentedGateCount === REQUIRED_GATE_COUNT
      && miniKvV131.reviewEvidenceSatisfiedCount === REQUIRED_GATE_COUNT
      && miniKvV131.runtimePrerequisiteSatisfiedCount === 0
      && miniKvV131.implementationAllowedGateCount === 0,
    candidateGateDigestAnchored:
      miniKvV131.nodeV297GateDigest === sourceNodeV297.gateDigest
      && sourceNodeV297.gateDigest.length === 64,
    runtimeShellImplementationStillForbidden:
      !sourceNodeV297.runtimeShellImplemented
      && javaV134.noRuntimeImplementation
      && miniKvV131.runtimeShellImplemented === false
      && miniKvV131.disabledRuntimeShellParticipates === false,
    runtimeShellInvocationStillForbidden:
      !sourceNodeV297.runtimeShellInvocationAllowed
      && javaV134.noRuntimeInvocation
      && miniKvV131.runtimeShellInvocationAllowed === false
      && miniKvV131.executionAllowed === false,
    credentialBoundaryClosed:
      !sourceNodeV297.credentialValueRead
      && javaV134.credentialValueBoundaryClosed
      && miniKvV131.credentialValueRead === false,
    rawEndpointBoundaryClosed:
      !sourceNodeV297.rawEndpointUrlParsed
      && javaV134.rawEndpointBoundaryClosed
      && miniKvV131.rawEndpointUrlParsed === false,
    providerClientBoundaryClosed:
      !sourceNodeV297.secretProviderInstantiated
      && !sourceNodeV297.resolverClientInstantiated
      && javaV134.providerClientBoundaryClosed
      && miniKvV131.providerClientInstantiationAllowed === false,
    connectionBoundaryClosed:
      !sourceNodeV297.connectsManagedAudit
      && !sourceNodeV297.externalRequestSent
      && javaV134.connectionBoundaryClosed
      && miniKvV131.connectsManagedAudit === false
      && miniKvV131.externalRequestSent === false,
    writeBoundaryClosed:
      !sourceNodeV297.approvalLedgerWritten
      && !sourceNodeV297.schemaMigrationExecuted
      && javaV134.ledgerSqlSchemaBoundaryClosed
      && miniKvV131.storageWriteAllowed === false
      && miniKvV131.approvalLedgerWritten === false
      && miniKvV131.schemaMigrationExecuted === false,
    loadCompactRestoreSetnxexStillBlocked:
      miniKvV131.loadRestoreCompactExecuted === false
      && miniKvV131.setnxexExecutionAllowed === false,
    autoStartBoundaryClosed:
      !sourceNodeV297.automaticUpstreamStart
      && javaV134.automaticUpstreamStartBlocked
      && miniKvV131.automaticUpstreamStart === false,
    auditAndOrderAuthorityForbidden:
      miniKvV131.auditAuthoritative === false
      && miniKvV131.orderAuthoritative === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV297: SourceNodeV297RuntimeShellCandidateGateReference,
  javaV134: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKvV131: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
  checks: RuntimeShellCandidateGateUpstreamEchoVerificationChecks,
  verificationDigest: string,
): RuntimeShellCandidateGateUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode:
      "node-v297-plus-java-v134-plus-mini-kv-v131-runtime-shell-candidate-gate-upstream-echo-verification-only",
    sourceSpan: "Node v297 + Java v134 + mini-kv v131",
    sourceNodeV297Ready: checks.sourceNodeV297Ready,
    javaV134EchoReady: checks.javaV134CandidateGateEchoReady,
    miniKvV131ReceiptReady: checks.miniKvV131NonParticipationReceiptReady,
    upstreamEchoAligned: checks.upstreamEchoConsumerAligned && checks.nodeJavaMiniKvGateDecisionAligned,
    fiveGateSetAligned: checks.candidateGateCountAligned && checks.candidateGateDigestAnchored,
    sideEffectBoundariesAligned:
      checks.runtimeShellImplementationStillForbidden
      && checks.runtimeShellInvocationStillForbidden
      && checks.credentialBoundaryClosed
      && checks.rawEndpointBoundaryClosed
      && checks.providerClientBoundaryClosed
      && checks.connectionBoundaryClosed
      && checks.writeBoundaryClosed
      && checks.autoStartBoundaryClosed,
    implementationStillBlocked: true,
    readyForNodeV299RuntimeShellCandidateGateDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
    readyForRuntimeShellImplementation: false,
  };
}

function createSummary(
  sourceNodeV297: SourceNodeV297RuntimeShellCandidateGateReference,
  javaV134: JavaV134RuntimeShellCandidateGateEchoReference,
  miniKvV131: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference,
  checks: RuntimeShellCandidateGateUpstreamEchoVerificationChecks,
  productionBlockers: RuntimeShellCandidateGateUpstreamEchoVerificationMessage[],
  warnings: RuntimeShellCandidateGateUpstreamEchoVerificationMessage[],
  recommendations: RuntimeShellCandidateGateUpstreamEchoVerificationMessage[],
): RuntimeShellCandidateGateUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV134.evidenceFiles.filter((file) => file.exists).length
      + miniKvV131.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV134.expectedSnippets.filter((match) => match.matched).length
      + miniKvV131.expectedSnippets.filter((match) => match.matched).length,
    sourceCheckCount: sourceNodeV297.checkCount,
    sourcePassedCheckCount: sourceNodeV297.passedCheckCount,
    requiredGateCount: sourceNodeV297.requiredGateCount,
    documentedGateCount: sourceNodeV297.documentedGateCount,
    reviewEvidenceSatisfiedCount: sourceNodeV297.reviewEvidenceSatisfiedCount,
    runtimePrerequisiteSatisfiedCount: sourceNodeV297.runtimePrerequisiteSatisfiedCount,
    implementationAllowedGateCount: sourceNodeV297.implementationAllowedGateCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellCandidateGateUpstreamEchoVerificationChecks,
): RuntimeShellCandidateGateUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    passed: boolean;
    code: string;
    source: RuntimeShellCandidateGateUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      passed: checks.sourceNodeV297Ready,
      code: "SOURCE_NODE_V297_NOT_READY",
      source: "node-v297-disabled-runtime-shell-implementation-candidate-gate",
      message: "Node v298 must consume a ready Node v297 implementation candidate gate.",
    },
    {
      passed: checks.javaV134CandidateGateEchoReady,
      code: "JAVA_V134_CANDIDATE_GATE_ECHO_NOT_READY",
      source: "java-v134-runtime-shell-candidate-gate-echo",
      message: "Java v134 must echo the Node v297 candidate gate and mark itself ready for Node v298.",
    },
    {
      passed: checks.miniKvV131NonParticipationReceiptReady,
      code: "MINI_KV_V131_RECEIPT_NOT_READY",
      source: "mini-kv-v131-runtime-shell-candidate-gate-non-participation-receipt",
      message: "mini-kv v131 must provide the runtime shell candidate gate non-participation receipt for Node v298.",
    },
    {
      passed: checks.nodeJavaMiniKvGateDecisionAligned,
      code: "CANDIDATE_GATE_DECISION_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Node v297, Java v134, and mini-kv v131 must agree on the blocked candidate-gate decision.",
    },
    {
      passed: checks.candidateGateCountAligned && checks.candidateGateDigestAnchored,
      code: "CANDIDATE_GATE_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "The five candidate gates and Node v297 gate digest must be aligned before v299 records the decision.",
    },
    {
      passed: checks.runtimeShellImplementationStillForbidden,
      code: "RUNTIME_SHELL_IMPLEMENTATION_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "v298 cannot allow disabled runtime shell implementation.",
    },
    {
      passed: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Credential value boundaries must remain closed across Node, Java, and mini-kv.",
    },
    {
      passed: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Managed audit connection and HTTP/TCP boundaries must remain closed.",
    },
    {
      passed: checks.writeBoundaryClosed && checks.loadCompactRestoreSetnxexStillBlocked,
      code: "WRITE_OR_RESTORE_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Ledger, SQL, schema, storage, LOAD, COMPACT, RESTORE, and SETNXEX boundaries must remain closed.",
    },
    {
      passed: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during v298 verification.",
    },
    {
      passed: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during v298 verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.passed)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): RuntimeShellCandidateGateUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "v298 verifies Java v134 and mini-kv v131 echoes only; it does not authorize runtime implementation or invocation.",
    },
    {
      code: "CANDIDATE_GATE_REMAINS_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "The candidate gate remains blocked even after the two upstream echoes are verified.",
    },
  ];
}

function collectRecommendations(): RuntimeShellCandidateGateUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_V299_DECISION_RECORD_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Use Node v299 only to record the verified blocked decision; do not implement a runtime shell in v299.",
    },
    {
      code: "KEEP_RUNTIME_IMPLEMENTATION_BEHIND_EXPLICIT_APPROVAL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Any later runtime implementation needs a new explicit approval and a dedicated disabled-by-default runtime flag.",
    },
  ];
}
