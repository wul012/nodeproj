import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
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
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.js";
import type {
  JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationProfile,
  MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference,
  RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
  RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks,
  RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage,
  RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationSummary,
  SourceNodeV301PostDecisionPlanIntakeReference,
  SourceNodeV302PostDecisionCatalogQualityPassReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification";
const SOURCE_NODE_V301_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake";
const SOURCE_NODE_V302_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass";
const CLOSED_PLAN = "docs/plans2/v300-post-runtime-shell-decision-record-upstream-echo-roadmap.md";
const NEXT_PLAN = "docs/plans2/v303-post-decision-plan-intake-upstream-echo-roadmap.md";

const JAVA_V136_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoSupport.java";
const JAVA_V136_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoTests.java";
const JAVA_V136_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/138-version-136-runtime-shell-post-decision-plan-intake-echo.md";
const MINI_KV_V133_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-runtime-shell-post-decision-plan-intake-non-participation-receipt.json";
const MINI_KV_V133_EXPLANATION = "D:/C/mini-kv/d/133/解释/说明.md";
const MINI_KV_V133_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/189-version-133-credential-resolver-runtime-shell-post-decision-plan-intake-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationProfile {
  const sourceNodeV301 = createSourceNodeV301(input.config);
  const sourceNodeV302 = createSourceNodeV302(input.config);
  const javaV136 = createJavaV136Reference();
  const miniKvV133 = createMiniKvV133Reference();
  const checks = createChecks(input.config, sourceNodeV301, sourceNodeV302, javaV136, miniKvV133);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification
    ? "runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV301, sourceNodeV302, javaV136, miniKvV133, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV301, sourceNodeV302, javaV136, miniKvV133, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell post-decision plan intake upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationOnly: true,
    consumesNodeV301PostDecisionContinuationPlanIntake: true,
    consumesNodeV302PostDecisionContinuationCatalogQualityPass: true,
    consumesJavaV136PostDecisionPlanIntakeEcho: true,
    consumesMiniKvV133PostDecisionPlanIntakeNonParticipationReceipt: true,
    legacyNodeV302ConsumerMarkerAccepted: true,
    activeNodeVerificationVersion: "Node v303",
    readyForPostDecisionRuntimeShellChainStopDecision:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification,
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
    sourceNodeV301,
    sourceNodeV302,
    upstreamEvidence: { javaV136, miniKvV133 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationJson: ROUTE_PATH,
      runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV301Json: SOURCE_NODE_V301_ROUTE,
      sourceNodeV301Markdown: `${SOURCE_NODE_V301_ROUTE}?format=markdown`,
      sourceNodeV302Json: SOURCE_NODE_V302_ROUTE,
      sourceNodeV302Markdown: `${SOURCE_NODE_V302_ROUTE}?format=markdown`,
      javaV136Support: JAVA_V136_SUPPORT,
      javaV136Test: JAVA_V136_TEST,
      javaV136Walkthrough: JAVA_V136_WALKTHROUGH,
      miniKvV133Receipt: MINI_KV_V133_RECEIPT,
      miniKvV133Explanation: MINI_KV_V133_EXPLANATION,
      miniKvV133Walkthrough: MINI_KV_V133_WALKTHROUGH,
      closedPlan: CLOSED_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v303 as the read-only upstream echo verification for Java v136 and mini-kv v133.",
      "Close the v300-derived plan and continue with a new plan only if it names a real blocker, consumer, and stop condition.",
      "Keep runtime shell implementation, invocation, credential values, raw endpoint URL parsing, provider/client instantiation, external requests, ledger/schema writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV301(config: AppConfig): SourceNodeV301PostDecisionPlanIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake({
    config,
  });

  return {
    sourceVersion: "Node v301",
    profileVersion: source.profileVersion,
    planIntakeState: source.planIntakeState,
    readyForPlanIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
    readOnlyPlanIntake: source.readOnlyPlanIntake,
    intakeDigest: source.continuationPlanIntake.intakeDigest,
    selectedContinuationDecision: source.continuationPlanIntake.selectedContinuationDecision,
    legacyNextNodeVerificationVersion: source.continuationPlanIntake.legacyNextNodeVerificationVersion,
    nextNodeVerificationVersion: source.continuationPlanIntake.nextNodeVerificationVersion,
    nextJavaEchoVersion: source.continuationPlanIntake.nextJavaEchoVersion,
    nextMiniKvReceiptVersion: source.continuationPlanIntake.nextMiniKvReceiptVersion,
    proofComplete: source.necessityProof.proofComplete,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createSourceNodeV302(config: AppConfig): SourceNodeV302PostDecisionCatalogQualityPassReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass({
    config,
  });

  return {
    sourceVersion: "Node v302",
    profileVersion: source.profileVersion,
    qualityPassState: source.qualityPassState,
    readyForCatalogQualityPass:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass,
    activeNodeVerificationTarget: source.catalogScope.activeNodeVerificationTarget,
    consumesNodeV301PostDecisionContinuationPlanIntake: source.consumesNodeV301PostDecisionContinuationPlanIntake,
    consumesJavaV136PostDecisionPlanIntakeEcho: source.consumesJavaV136PostDecisionPlanIntakeEcho,
    consumesMiniKvV133PostDecisionPlanIntakeReceipt: source.consumesMiniKvV133PostDecisionPlanIntakeReceipt,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV136Reference(): JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v136-support", JAVA_V136_SUPPORT),
    evidenceFile("java-v136-test", JAVA_V136_TEST),
    evidenceFile("java-v136-walkthrough", JAVA_V136_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v136-version", JAVA_V136_SUPPORT, "java-v136-credential-resolver-runtime-shell-post-decision-plan-intake-echo-only"),
    snippet("java-v136-source-node", JAVA_V136_TEST, "sourceSpan()).isEqualTo(\"Node v301\")"),
    snippet("java-v136-profile", JAVA_V136_TEST, PROFILE_VERSION),
    snippet("java-v136-legacy-node-v302", JAVA_V136_TEST, "nextNodePostDecisionPlanIntakeUpstreamEchoVerificationVersion()"),
    snippet("java-v136-ready", JAVA_V136_TEST, "readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification()).isTrue()"),
    snippet("java-v136-selected", JAVA_V136_TEST, "\"continue-blocked-planning\""),
    snippet("java-v136-options", JAVA_V136_TEST, "decisionOptionCount()).isEqualTo(4)"),
    snippet("java-v136-proof", JAVA_V136_TEST, "necessityProof().proofComplete()).isTrue()"),
    snippet("java-v136-rejected", JAVA_V136_TEST, "runtimeImplementationOptionRejected()).isTrue()"),
    snippet("java-v136-no-runtime", JAVA_V136_TEST, "noRuntimeImplementationEchoed()).isTrue()"),
    snippet("java-v136-no-invocation", JAVA_V136_TEST, "noRuntimeInvocationEchoed()).isTrue()"),
    snippet("java-v136-no-credential", JAVA_V136_TEST, "noCredentialReadEchoed()).isTrue()"),
    snippet("java-v136-no-endpoint", JAVA_V136_TEST, "noRawEndpointParseEchoed()).isTrue()"),
    snippet("java-v136-no-provider", JAVA_V136_TEST, "noProviderClientInstantiationEchoed()).isTrue()"),
    snippet("java-v136-no-external", JAVA_V136_TEST, "noExternalRequestEchoed()).isTrue()"),
    snippet("java-v136-no-write", JAVA_V136_TEST, "noWriteOrMigrationEchoed()).isTrue()"),
    snippet("java-v136-no-autostart", JAVA_V136_TEST, "noAutoStartBoundaryEchoed()).isTrue()"),
    snippet("java-v136-walkthrough", JAVA_V136_WALKTHROUGH, "只读 echo"),
  ];

  return {
    sourceVersion: "Java v136",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-post-decision-plan-intake-echo-receipt.v1",
    echoMode: "java-v136-credential-resolver-runtime-shell-post-decision-plan-intake-echo-only",
    sourceSpan: "Node v301",
    legacyNextNodeVersion: "Node v302",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    legacyReadyForNodeV302: snippetMatched(expectedSnippets, "java-v136-ready"),
    echoesNodeV301PlanIntake:
      snippetMatched(expectedSnippets, "java-v136-source-node")
      && snippetMatched(expectedSnippets, "java-v136-profile"),
    selectedContinuationDecisionEchoed: snippetMatched(expectedSnippets, "java-v136-selected"),
    continuationOptionsEchoed: snippetMatched(expectedSnippets, "java-v136-options"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v136-proof"),
    runtimeImplementationRejectedEchoed: snippetMatched(expectedSnippets, "java-v136-rejected"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v136-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v136-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v136-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v136-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v136-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v136-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v136-no-write"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v136-no-autostart"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v136-no-runtime")
      && snippetMatched(expectedSnippets, "java-v136-no-invocation")
      && snippetMatched(expectedSnippets, "java-v136-no-credential")
      && snippetMatched(expectedSnippets, "java-v136-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v136-no-provider")
      && snippetMatched(expectedSnippets, "java-v136-no-external")
      && snippetMatched(expectedSnippets, "java-v136-no-write")
      && snippetMatched(expectedSnippets, "java-v136-no-autostart"),
  };
}

function createMiniKvV133Reference(): MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v133-receipt", MINI_KV_V133_RECEIPT),
    evidenceFile("mini-kv-v133-explanation", MINI_KV_V133_EXPLANATION),
    evidenceFile("mini-kv-v133-walkthrough", MINI_KV_V133_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v133-node-v302", MINI_KV_V133_RECEIPT, "Node v302 runtime shell post-decision plan intake upstream echo verification"),
    snippet("mini-kv-v133-node-v301", MINI_KV_V133_RECEIPT, "Node v301 credential resolver runtime shell post-decision continuation plan intake"),
    snippet("mini-kv-v133-version", MINI_KV_V133_RECEIPT, "\"release_version\":\"v133\""),
    snippet("mini-kv-v133-state", MINI_KV_V133_RECEIPT, "\"plan_intake_state\":\"runtime-shell-post-decision-continuation-plan-intake-ready\""),
    snippet("mini-kv-v133-selected", MINI_KV_V133_RECEIPT, "\"selected_continuation_decision\":\"continue-blocked-planning\""),
    snippet("mini-kv-v133-receipt-only", MINI_KV_V133_RECEIPT, "\"runtime_shell_post_decision_plan_intake_non_participation_receipt_only\":true"),
    snippet("mini-kv-v133-ready", MINI_KV_V133_RECEIPT, "\"ready_for_node_v302_post_decision_plan_intake_upstream_echo_verification\":true"),
    snippet("mini-kv-v133-no-runtime", MINI_KV_V133_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v133-no-invocation", MINI_KV_V133_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v133-no-credential", MINI_KV_V133_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v133-no-endpoint", MINI_KV_V133_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v133-no-external", MINI_KV_V133_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v133-no-ledger", MINI_KV_V133_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v133-no-restore", MINI_KV_V133_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v133-no-setnxex", MINI_KV_V133_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v133-explanation", MINI_KV_V133_EXPLANATION, "CHECKJSON SMOKEJSON"),
    snippet("mini-kv-v133-walkthrough", MINI_KV_V133_WALKTHROUGH, "Node v302"),
  ];
  const parsed = readJsonObject(MINI_KV_V133_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_runtime_shell_post_decision_plan_intake_non_participation_receipt");

  return {
    sourceVersion: "mini-kv v133",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    legacyReadyForNodeV302:
      booleanField(receipt, "ready_for_node_v302_post_decision_plan_intake_upstream_echo_verification") === true,
    echoesNodeV301PlanIntake:
      stringField(receipt, "source_plan_intake") === "Node v301 credential resolver runtime shell post-decision continuation plan intake",
    planIntakeState: stringField(receipt, "plan_intake_state"),
    selectedContinuationDecision: stringField(receipt, "selected_continuation_decision"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "runtime_shell_post_decision_plan_intake_non_participation_receipt_only") === true,
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented"),
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    sideEffectBoundariesClosed:
      booleanField(receipt, "runtime_shell_implemented") === false
      && booleanField(receipt, "runtime_shell_invocation_allowed") === false
      && booleanField(receipt, "execution_allowed") === false
      && booleanField(receipt, "connects_managed_audit") === false
      && booleanField(receipt, "credential_value_read") === false
      && booleanField(receipt, "raw_endpoint_url_parsed") === false
      && booleanField(receipt, "external_request_sent") === false
      && booleanField(receipt, "schema_migration_executed") === false
      && booleanField(receipt, "approval_ledger_written") === false
      && booleanField(receipt, "automatic_upstream_start") === false
      && booleanField(receipt, "load_restore_compact_executed") === false
      && booleanField(receipt, "setnxex_execution_allowed") === false
      && booleanField(receipt, "audit_authoritative") === false
      && booleanField(receipt, "order_authoritative") === false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV301: SourceNodeV301PostDecisionPlanIntakeReference,
  sourceNodeV302: SourceNodeV302PostDecisionCatalogQualityPassReference,
  javaV136: JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference,
  miniKvV133: MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference,
): RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks {
  return {
    sourceNodeV301Ready: sourceNodeV301.readyForPlanIntake,
    sourceNodeV301UsesActiveNodeV303Target:
      sourceNodeV301.nextNodeVerificationVersion === "Node v303"
      && sourceNodeV301.legacyNextNodeVerificationVersion === "Node v302",
    sourceNodeV301KeepsRuntimeBlocked:
      sourceNodeV301.runtimeShellImplemented === false
      && sourceNodeV301.runtimeShellInvocationAllowed === false,
    sourceNodeV301KeepsSideEffectsClosed:
      sourceNodeV301.executionAllowed === false
      && sourceNodeV301.connectsManagedAudit === false
      && sourceNodeV301.credentialValueRead === false
      && sourceNodeV301.rawEndpointUrlParsed === false
      && sourceNodeV301.externalRequestSent === false
      && sourceNodeV301.schemaMigrationExecuted === false
      && sourceNodeV301.approvalLedgerWritten === false
      && sourceNodeV301.automaticUpstreamStart === false,
    sourceNodeV302QualityPassReady: sourceNodeV302.readyForCatalogQualityPass,
    sourceNodeV302ConfirmsActiveNodeV303Target:
      sourceNodeV302.activeNodeVerificationTarget === "Node v303",
    sourceNodeV302DidNotConsumeUpstreamEchoes:
      sourceNodeV302.consumesJavaV136PostDecisionPlanIntakeEcho === false
      && sourceNodeV302.consumesMiniKvV133PostDecisionPlanIntakeReceipt === false,
    javaV136EvidencePresent: javaV136.evidencePresent && javaV136.verificationDocumented,
    javaV136LegacyReadyForNodeV302: javaV136.legacyReadyForNodeV302,
    javaV136EchoesNodeV301:
      javaV136.echoesNodeV301PlanIntake
      && javaV136.selectedContinuationDecisionEchoed
      && javaV136.continuationOptionsEchoed
      && javaV136.necessityProofEchoed,
    javaV136KeepsRuntimeBlocked:
      javaV136.runtimeImplementationRejectedEchoed
      && javaV136.noRuntimeImplementationEchoed
      && javaV136.noRuntimeInvocationEchoed
      && javaV136.sideEffectBoundariesClosed,
    miniKvV133EvidencePresent: miniKvV133.evidencePresent && miniKvV133.verificationDocumented,
    miniKvV133LegacyReadyForNodeV302: miniKvV133.legacyReadyForNodeV302,
    miniKvV133EchoesNodeV301:
      miniKvV133.echoesNodeV301PlanIntake
      && miniKvV133.planIntakeState === "runtime-shell-post-decision-continuation-plan-intake-ready"
      && miniKvV133.selectedContinuationDecision === "continue-blocked-planning"
      && miniKvV133.nonParticipationReceiptOnly,
    miniKvV133KeepsRuntimeBlocked:
      miniKvV133.nonParticipationReceiptOnly && miniKvV133.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV136.echoesNodeV301PlanIntake
      && javaV136.selectedContinuationDecisionEchoed
      && miniKvV133.echoesNodeV301PlanIntake
      && miniKvV133.selectedContinuationDecision === "continue-blocked-planning",
    legacyNodeV302ConsumerMarkersAccepted:
      javaV136.legacyReadyForNodeV302
      && miniKvV133.legacyReadyForNodeV302
      && sourceNodeV301.legacyNextNodeVerificationVersion === "Node v302",
    activeNodeV303VerificationTargetConfirmed:
      sourceNodeV301.nextNodeVerificationVersion === "Node v303"
      && sourceNodeV302.activeNodeVerificationTarget === "Node v303",
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV301: SourceNodeV301PostDecisionPlanIntakeReference,
  sourceNodeV302: SourceNodeV302PostDecisionCatalogQualityPassReference,
  javaV136: JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference,
  miniKvV133: MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference,
  checks: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks,
  verificationState: string,
): RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification {
  const record = {
    verificationMode: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-only" as const,
    sourceSpan: "Node v301 + Node v302 + Java v136 + mini-kv v133" as const,
    sourceNodeV301Ready: checks.sourceNodeV301Ready,
    sourceNodeV302QualityPassReady: checks.sourceNodeV302QualityPassReady,
    javaV136EchoReady: checks.javaV136EvidencePresent && checks.javaV136LegacyReadyForNodeV302,
    miniKvV133ReceiptReady: checks.miniKvV133EvidencePresent && checks.miniKvV133LegacyReadyForNodeV302,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    legacyNodeV302MarkersAccepted: checks.legacyNodeV302ConsumerMarkersAccepted,
    activeNodeV303TargetConfirmed: checks.activeNodeV303VerificationTargetConfirmed,
    sideEffectBoundariesAligned: checks.javaV136KeepsRuntimeBlocked && checks.miniKvV133KeepsRuntimeBlocked,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      nodeV301IntakeDigest: sourceNodeV301.intakeDigest,
      nodeV302QualityState: sourceNodeV302.qualityPassState,
      miniKvReceiptDigest: miniKvV133.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks,
): RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV301Ready && checks.sourceNodeV301UsesActiveNodeV303Target,
      code: "NODE_V301_PLAN_INTAKE_NOT_READY",
      source: "node-v301-post-decision-continuation-plan-intake",
      message: "Node v301 plan intake must be ready and identify Node v303 as the active verification target.",
    },
    {
      condition: checks.sourceNodeV302QualityPassReady && checks.sourceNodeV302ConfirmsActiveNodeV303Target,
      code: "NODE_V302_QUALITY_PASS_NOT_READY",
      source: "node-v302-post-decision-continuation-catalog-quality-pass",
      message: "Node v302 catalog quality pass must be ready before v303 consumes Java v136 and mini-kv v133.",
    },
    {
      condition: checks.javaV136EvidencePresent && checks.javaV136EchoesNodeV301 && checks.javaV136LegacyReadyForNodeV302,
      code: "JAVA_V136_ECHO_NOT_READY",
      source: "java-v136-runtime-shell-post-decision-plan-intake-echo",
      message: "Java v136 evidence must echo Node v301 and retain its legacy Node v302 consumer marker.",
    },
    {
      condition: checks.miniKvV133EvidencePresent && checks.miniKvV133EchoesNodeV301 && checks.miniKvV133LegacyReadyForNodeV302,
      code: "MINI_KV_V133_RECEIPT_NOT_READY",
      source: "mini-kv-v133-runtime-shell-post-decision-plan-intake-non-participation",
      message: "mini-kv v133 evidence must echo Node v301 and retain its legacy Node v302 consumer marker.",
    },
    {
      condition: checks.upstreamEchoesAligned && checks.legacyNodeV302ConsumerMarkersAccepted,
      code: "UPSTREAM_ECHOES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification",
      message: "Java v136 and mini-kv v133 must both echo the Node v301 post-decision plan intake.",
    },
    {
      condition:
        checks.sourceNodeV301KeepsSideEffectsClosed
        && checks.sourceNodeV301KeepsRuntimeBlocked
        && checks.sourceNodeV302DidNotConsumeUpstreamEchoes
        && checks.javaV136KeepsRuntimeBlocked
        && checks.miniKvV133KeepsRuntimeBlocked,
      code: "SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification",
      message: "Node, Java, and mini-kv evidence must keep runtime shell, credential, endpoint, network, ledger, schema, restore, and auto-start boundaries closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v303 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v303 upstream echo verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "LEGACY_NODE_V302_MARKER_ACCEPTED_FOR_V303",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification",
      message: "Java v136 and mini-kv v133 were originally written for Node v302, but Node v302 became a quality pass; v303 accepts those markers as historical compatibility evidence only.",
    },
    {
      code: "UPSTREAM_ECHO_READY_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification",
      message: "v303 aligns the post-decision plan intake echoes only; it does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "CLOSE_V300_DERIVED_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification",
      message: "Close the v300-derived plan after v303 because its planned versions have all been consumed.",
    },
    {
      code: "STOP_OR_NAME_NEW_BLOCKER_BEFORE_NEXT_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification",
      message: "Do not add another runtime-shell echo unless the next plan names a new blocker, consumer, and stop condition.",
    },
  ];
}

function createSummary(
  sourceNodeV301: SourceNodeV301PostDecisionPlanIntakeReference,
  sourceNodeV302: SourceNodeV302PostDecisionCatalogQualityPassReference,
  javaV136: JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference,
  miniKvV133: MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference,
  checks: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks,
  productionBlockers: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[],
  warnings: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[],
  recommendations: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[],
): RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV301CheckCount: sourceNodeV301.checkCount,
    sourceNodeV301PassedCheckCount: sourceNodeV301.passedCheckCount,
    sourceNodeV302CheckCount: sourceNodeV302.checkCount,
    sourceNodeV302PassedCheckCount: sourceNodeV302.passedCheckCount,
    javaEvidenceFileCount: javaV136.evidenceFiles.length,
    javaMatchedSnippetCount: javaV136.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV133.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV133.expectedSnippets.filter((expected) => expected.matched).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
