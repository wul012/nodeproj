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
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.js";
import type {
  HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
  HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks,
  HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage,
  HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationSummary,
  JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationProfile,
  MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference,
  SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification";
const SOURCE_NODE_V310_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate";
const ACTIVE_PLAN = "docs/plans2/v309-post-human-approval-artifact-review-upstream-echo-roadmap.md";

const JAVA_V144_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoSupport.java";
const JAVA_V144_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceHumanApprovalArtifactReviewPostEchoDecisionGateEchoTests.java";
const JAVA_V144_EXPLANATION = "D:/javaproj/advanced-order-platform/d/144/解释/说明.md";
const JAVA_V144_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/146-version-144-human-approval-post-echo-decision-gate-echo.md";
const MINI_KV_V137_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-human-approval-artifact-review-post-echo-decision-gate-non-participation-receipt.json";
const MINI_KV_V137_EXPLANATION = "D:/C/mini-kv/d/137/解释/说明.md";
const MINI_KV_V137_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/193-version-137-credential-resolver-human-approval-post-echo-decision-gate-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationProfile {
  const sourceNodeV310 = createSourceNodeV310(input.config);
  const javaV144 = createJavaV144Reference(sourceNodeV310);
  const miniKvV137 = createMiniKvV137Reference(sourceNodeV310);
  const checks = createChecks(input.config, sourceNodeV310, javaV144, miniKvV137);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification
    ? "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV310, javaV144, miniKvV137, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV310, javaV144, miniKvV137, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationOnly: true,
    consumesNodeV310HumanApprovalArtifactReviewPostEchoDecisionGate: true,
    consumesJavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEcho: true,
    consumesMiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v311",
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
    sourceNodeV310,
    upstreamEvidence: { javaV144, miniKvV137 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationJson: ROUTE_PATH,
      humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV310Json: SOURCE_NODE_V310_ROUTE,
      sourceNodeV310Markdown: `${SOURCE_NODE_V310_ROUTE}?format=markdown`,
      javaV144Support: JAVA_V144_SUPPORT,
      javaV144Test: JAVA_V144_TEST,
      javaV144Explanation: JAVA_V144_EXPLANATION,
      javaV144Walkthrough: JAVA_V144_WALKTHROUGH,
      miniKvV137Receipt: MINI_KV_V137_RECEIPT,
      miniKvV137Explanation: MINI_KV_V137_EXPLANATION,
      miniKvV137Walkthrough: MINI_KV_V137_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v311 as the post-echo decision upstream echo verification that consumes Node v310, Java v144, and mini-kv v137.",
      "Keep disabled runtime shell implementation and invocation blocked after v311; this version only proves the post-echo decision gate was echoed upstream.",
      "The next plan must decide whether to stop this governance chain or name a new concrete missing prerequisite before any further Node-only step.",
    ],
  };
}

function createSourceNodeV310(config: AppConfig): SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
    config,
  });

  return {
    sourceVersion: "Node v310",
    profileVersion: source.profileVersion,
    decisionGateState: source.decisionGateState,
    readyForHumanApprovalArtifactReviewPostEchoDecisionGate:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
    readOnlyDecisionGate: source.readOnlyDecisionGate,
    decisionDigest: source.decisionGate.decisionDigest,
    sourceSpan: source.decisionGate.sourceSpan,
    decision: source.decisionGate.decision,
    selectedPath: source.decisionGate.selectedPath,
    allowsParallelJavaV144MiniKvV137EchoRequest:
      source.decisionGate.allowsParallelJavaV144MiniKvV137EchoRequest,
    allowsNodeV311BeforeUpstreamEcho: source.decisionGate.allowsNodeV311BeforeUpstreamEcho,
    prerequisiteCount: source.decisionGate.prerequisiteCount,
    missingPrerequisiteCount: source.decisionGate.missingPrerequisiteCount,
    noGoConditionCount: source.decisionGate.noGoConditionCount,
    sourceChecks: source.checks,
    sourceSummary: source.summary,
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

function createJavaV144Reference(
  sourceNodeV310: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
): JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v144-support", JAVA_V144_SUPPORT),
    evidenceFile("java-v144-test", JAVA_V144_TEST),
    evidenceFile("java-v144-explanation", JAVA_V144_EXPLANATION),
    evidenceFile("java-v144-walkthrough", JAVA_V144_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v144-version", JAVA_V144_SUPPORT, "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo-only"),
    snippet("java-v144-node-v310", JAVA_V144_TEST, ".isEqualTo(\"Node v310\")"),
    snippet("java-v144-node-v311", JAVA_V144_TEST, ".isEqualTo(\"Node v311\")"),
    snippet("java-v144-upstream-profile", JAVA_V144_TEST, PROFILE_VERSION),
    snippet("java-v144-source-profile", JAVA_V144_TEST, sourceNodeV310.profileVersion),
    snippet("java-v144-source-route", JAVA_V144_TEST, SOURCE_NODE_V310_ROUTE),
    snippet("java-v144-source-state", JAVA_V144_TEST, sourceNodeV310.decisionGateState),
    snippet("java-v144-ready", JAVA_V144_TEST, "readyForNodeV311PostEchoDecisionUpstreamEchoVerification()).isTrue()"),
    snippet("java-v144-source-span", JAVA_V144_SUPPORT, "\"Node v308 + Java v143 + mini-kv v136 + Node v309\""),
    snippet("java-v144-prerequisite-count", JAVA_V144_TEST, "prerequisiteCount()).isEqualTo(6)"),
    snippet("java-v144-missing-count", JAVA_V144_TEST, "missingPrerequisiteCount()).isEqualTo(6)"),
    snippet("java-v144-no-go-count", JAVA_V144_TEST, "noGoConditionCount()).isEqualTo(9)"),
    snippet("java-v144-parallel", JAVA_V144_TEST, "allowsParallelJavaV144MiniKvV137EchoRequest()).isTrue()"),
    snippet("java-v144-consumer", JAVA_V144_TEST, ".isEqualTo(\"Java v144 and mini-kv v137, then Node v311\")"),
    snippet("java-v144-no-runtime", JAVA_V144_SUPPORT, "noRuntimeImplementationEchoed"),
    snippet("java-v144-no-invocation", JAVA_V144_SUPPORT, "noRuntimeInvocationEchoed"),
    snippet("java-v144-no-credential", JAVA_V144_SUPPORT, "noCredentialReadEchoed"),
    snippet("java-v144-no-endpoint", JAVA_V144_SUPPORT, "noRawEndpointParseEchoed"),
    snippet("java-v144-no-provider", JAVA_V144_SUPPORT, "noProviderClientInstantiationEchoed"),
    snippet("java-v144-no-external", JAVA_V144_SUPPORT, "noExternalRequestEchoed"),
    snippet("java-v144-no-write", JAVA_V144_SUPPORT, "noWriteOrMigrationEchoed"),
    snippet("java-v144-no-minikv", JAVA_V144_SUPPORT, "noMiniKvWriteOrAuthorityEchoed"),
    snippet("java-v144-no-autostart", JAVA_V144_SUPPORT, "noAutoStartBoundaryEchoed"),
    snippet("java-v144-explanation", JAVA_V144_EXPLANATION, "Java v144 adds the read-only echo for the Node v310 human approval artifact review post-echo decision gate."),
    snippet("java-v144-walkthrough", JAVA_V144_WALKTHROUGH, "It consumes the Node v310 human approval artifact review post-echo decision gate"),
  ];

  const sideEffectBoundariesClosed =
    snippetMatched(expectedSnippets, "java-v144-no-runtime")
    && snippetMatched(expectedSnippets, "java-v144-no-invocation")
    && snippetMatched(expectedSnippets, "java-v144-no-credential")
    && snippetMatched(expectedSnippets, "java-v144-no-endpoint")
    && snippetMatched(expectedSnippets, "java-v144-no-provider")
    && snippetMatched(expectedSnippets, "java-v144-no-external")
    && snippetMatched(expectedSnippets, "java-v144-no-write")
    && snippetMatched(expectedSnippets, "java-v144-no-minikv")
    && snippetMatched(expectedSnippets, "java-v144-no-autostart");

  return {
    sourceVersion: "Java v144",
    receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-human-approval-artifact-review-post-echo-decision-gate-echo-receipt.v1",
    echoMode: "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo-only",
    sourceSpan: "Node v310",
    nextNodeVersion: "Node v311",
    expectedProfileVersion: PROFILE_VERSION,
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented:
      snippetMatched(expectedSnippets, "java-v144-explanation")
      && snippetMatched(expectedSnippets, "java-v144-walkthrough"),
    echoesNodeV310DecisionGate:
      snippetMatched(expectedSnippets, "java-v144-node-v310")
      && snippetMatched(expectedSnippets, "java-v144-source-profile")
      && snippetMatched(expectedSnippets, "java-v144-source-route")
      && snippetMatched(expectedSnippets, "java-v144-source-state"),
    readyForNodeV311:
      snippetMatched(expectedSnippets, "java-v144-node-v311")
      && snippetMatched(expectedSnippets, "java-v144-upstream-profile")
      && snippetMatched(expectedSnippets, "java-v144-ready"),
    decisionGateContractEchoed:
      snippetMatched(expectedSnippets, "java-v144-source-span")
      && snippetMatched(expectedSnippets, "java-v144-prerequisite-count")
      && snippetMatched(expectedSnippets, "java-v144-missing-count")
      && snippetMatched(expectedSnippets, "java-v144-no-go-count"),
    prerequisiteCountEchoed: snippetMatched(expectedSnippets, "java-v144-prerequisite-count"),
    missingPrerequisiteCountEchoed: snippetMatched(expectedSnippets, "java-v144-missing-count"),
    noGoConditionCountEchoed: snippetMatched(expectedSnippets, "java-v144-no-go-count"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v144-consumer"),
    parallelEchoRequestEchoed: snippetMatched(expectedSnippets, "java-v144-parallel"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v144-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v144-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v144-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v144-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v144-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v144-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v144-no-write"),
    noMiniKvWriteOrAuthorityEchoed: snippetMatched(expectedSnippets, "java-v144-no-minikv"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v144-no-autostart"),
    sideEffectBoundariesClosed,
  };
}

function createMiniKvV137Reference(
  sourceNodeV310: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
): MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v137-receipt", MINI_KV_V137_RECEIPT),
    evidenceFile("mini-kv-v137-explanation", MINI_KV_V137_EXPLANATION),
    evidenceFile("mini-kv-v137-walkthrough", MINI_KV_V137_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v137-version", MINI_KV_V137_RECEIPT, "\"release_version\":\"v137\""),
    snippet("mini-kv-v137-node-v310", MINI_KV_V137_RECEIPT, "\"source_version\":\"Node v310\""),
    snippet("mini-kv-v137-node-v311", MINI_KV_V137_RECEIPT, "Node v311 human approval artifact review post-echo decision upstream echo verification"),
    snippet("mini-kv-v137-source-profile", MINI_KV_V137_RECEIPT, sourceNodeV310.profileVersion),
    snippet("mini-kv-v137-source-state", MINI_KV_V137_RECEIPT, sourceNodeV310.decisionGateState),
    snippet("mini-kv-v137-source-digest", MINI_KV_V137_RECEIPT, sourceNodeV310.decisionDigest),
    snippet("mini-kv-v137-ready", MINI_KV_V137_RECEIPT, "\"ready_for_node_v311_human_approval_artifact_review_post_echo_decision_upstream_echo_verification\":true"),
    snippet("mini-kv-v137-before-upstream", MINI_KV_V137_RECEIPT, "\"ready_for_node_v311_before_upstream_echo\":false"),
    snippet("mini-kv-v137-prerequisite-count", MINI_KV_V137_RECEIPT, "\"prerequisite_count\":6"),
    snippet("mini-kv-v137-missing-count", MINI_KV_V137_RECEIPT, "\"missing_prerequisite_count\":6"),
    snippet("mini-kv-v137-no-go-count", MINI_KV_V137_RECEIPT, "\"no_go_condition_count\":9"),
    snippet("mini-kv-v137-read-only", MINI_KV_V137_RECEIPT, "\"read_only\":true"),
    snippet("mini-kv-v137-execution", MINI_KV_V137_RECEIPT, "\"execution_allowed\":false"),
    snippet("mini-kv-v137-no-credential", MINI_KV_V137_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v137-no-endpoint", MINI_KV_V137_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v137-no-external", MINI_KV_V137_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v137-no-ledger", MINI_KV_V137_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v137-no-schema", MINI_KV_V137_RECEIPT, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v137-no-admin", MINI_KV_V137_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v137-no-setnxex", MINI_KV_V137_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v137-no-authority", MINI_KV_V137_RECEIPT, "\"audit_authoritative\":false"),
    snippet("mini-kv-v137-no-autostart", MINI_KV_V137_RECEIPT, "\"automatic_upstream_start\":false"),
    snippet("mini-kv-v137-explanation", MINI_KV_V137_EXPLANATION, "SMOKEJSON` 暴露 `credential_resolver_human_approval_artifact_review_post_echo_decision_gate_non_participation_receipt"),
    snippet("mini-kv-v137-walkthrough", MINI_KV_V137_WALKTHROUGH, "ready_for_node_v311_human_approval_artifact_review_post_echo_decision_upstream_echo_verification=true"),
  ];
  const root = readJsonObject(MINI_KV_V137_RECEIPT);
  const receipt = objectField(root, "credential_resolver_human_approval_artifact_review_post_echo_decision_gate_non_participation_receipt");
  const sourceNodeV310Reference = objectField(receipt, "source_node_v310_reference");
  const decisionGate = objectField(sourceNodeV310Reference, "decision_gate");
  const checks = objectField(receipt, "checks");
  const sideEffectBoundariesClosed =
    booleanField(receipt, "runtime_shell_implemented") === false
    && booleanField(receipt, "runtime_shell_invocation_allowed") === false
    && booleanField(receipt, "execution_allowed") === false
    && booleanField(receipt, "connects_managed_audit") === false
    && booleanField(receipt, "credential_value_read") === false
    && booleanField(receipt, "raw_endpoint_url_parsed") === false
    && booleanField(receipt, "external_request_sent") === false
    && booleanField(receipt, "approval_ledger_written") === false
    && booleanField(receipt, "schema_migration_executed") === false
    && booleanField(receipt, "automatic_upstream_start") === false
    && booleanField(receipt, "load_restore_compact_executed") === false
    && booleanField(receipt, "setnxex_execution_allowed") === false
    && booleanField(receipt, "audit_authoritative") === false
    && booleanField(receipt, "order_authoritative") === false;

  return {
    sourceVersion: "mini-kv v137",
    receiptVersion: stringField(receipt, "receipt_version"),
    releaseVersion: stringField(receipt, "current_release_version") ?? stringField(root, "release_version"),
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented:
      snippetMatched(expectedSnippets, "mini-kv-v137-explanation")
      && snippetMatched(expectedSnippets, "mini-kv-v137-walkthrough"),
    echoesNodeV310DecisionGate:
      booleanField(receipt, "consumes_node_v310_human_approval_artifact_review_post_echo_decision_gate") === true
      && stringField(sourceNodeV310Reference, "profile_version") === sourceNodeV310.profileVersion
      && stringField(sourceNodeV310Reference, "decision_gate_state") === sourceNodeV310.decisionGateState,
    readyForNodeV311:
      booleanField(receipt, "ready_for_node_v311_human_approval_artifact_review_post_echo_decision_upstream_echo_verification") === true,
    sourceNodeV310ProfileVersion: stringField(sourceNodeV310Reference, "profile_version"),
    sourceNodeV310DecisionGateState: stringField(sourceNodeV310Reference, "decision_gate_state"),
    sourceNodeV310DecisionDigest: stringField(decisionGate, "decision_digest"),
    prerequisiteCount: numberField(decisionGate, "prerequisite_count"),
    missingPrerequisiteCount: numberField(decisionGate, "missing_prerequisite_count"),
    noGoConditionCount: numberField(decisionGate, "no_go_condition_count"),
    checkCount: numberField(objectField(receipt, "summary"), "check_count") ?? numberField(checks, "check_count"),
    passedCheckCount: numberField(objectField(receipt, "summary"), "passed_check_count"),
    readOnlyDecisionGate: booleanField(receipt, "read_only_decision_gate"),
    consumesNodeV310HumanApprovalArtifactReviewPostEchoDecisionGate:
      booleanField(receipt, "consumes_node_v310_human_approval_artifact_review_post_echo_decision_gate"),
    consumesNodeV309HumanApprovalArtifactReviewUpstreamEchoVerification:
      booleanField(receipt, "consumes_node_v309_human_approval_artifact_review_upstream_echo_verification"),
    readyForNodeV311BeforeUpstreamEcho: booleanField(receipt, "ready_for_node_v311_before_upstream_echo"),
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented"),
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    credentialValueAccepted: booleanField(receipt, "credential_value_accepted"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    rawEndpointUrlAccepted: booleanField(receipt, "raw_endpoint_url_accepted"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    fakeSecretProviderInstantiated: booleanField(receipt, "fake_secret_provider_instantiated"),
    fakeResolverClientInstantiated: booleanField(receipt, "fake_resolver_client_instantiated"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    sideEffectBoundariesClosed,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV310: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
  javaV144: JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference,
  miniKvV137: MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference,
): HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks {
  return {
    sourceNodeV310Ready: sourceNodeV310.readyForHumanApprovalArtifactReviewPostEchoDecisionGate,
    sourceNodeV310RequestsParallelEcho:
      sourceNodeV310.allowsParallelJavaV144MiniKvV137EchoRequest
      && sourceNodeV310.allowsNodeV311BeforeUpstreamEcho === false,
    sourceNodeV310DecisionGateComplete:
      sourceNodeV310.prerequisiteCount === 6
      && sourceNodeV310.missingPrerequisiteCount === 6
      && sourceNodeV310.noGoConditionCount === 9,
    sourceNodeV310KeepsRuntimeBlocked:
      sourceNodeV310.runtimeShellImplemented === false
      && sourceNodeV310.runtimeShellInvocationAllowed === false,
    sourceNodeV310KeepsSideEffectsClosed:
      sourceNodeV310.executionAllowed === false
      && sourceNodeV310.connectsManagedAudit === false
      && sourceNodeV310.credentialValueRead === false
      && sourceNodeV310.rawEndpointUrlParsed === false
      && sourceNodeV310.externalRequestSent === false
      && sourceNodeV310.schemaMigrationExecuted === false
      && sourceNodeV310.approvalLedgerWritten === false
      && sourceNodeV310.automaticUpstreamStart === false,
    javaV144EvidencePresent: javaV144.evidencePresent && javaV144.verificationDocumented,
    javaV144EchoesNodeV310DecisionGate: javaV144.echoesNodeV310DecisionGate,
    javaV144ReadyForNodeV311: javaV144.readyForNodeV311,
    javaV144DecisionGateContractEchoed:
      javaV144.decisionGateContractEchoed
      && javaV144.prerequisiteCountEchoed
      && javaV144.missingPrerequisiteCountEchoed
      && javaV144.noGoConditionCountEchoed
      && javaV144.necessityProofEchoed
      && javaV144.parallelEchoRequestEchoed,
    javaV144KeepsRuntimeBlocked: javaV144.sideEffectBoundariesClosed,
    miniKvV137EvidencePresent: miniKvV137.evidencePresent && miniKvV137.verificationDocumented,
    miniKvV137EchoesNodeV310DecisionGate: miniKvV137.echoesNodeV310DecisionGate,
    miniKvV137ReadyForNodeV311: miniKvV137.readyForNodeV311,
    miniKvV137DecisionGateContractEchoed:
      miniKvV137.sourceNodeV310DecisionDigest === sourceNodeV310.decisionDigest
      && miniKvV137.prerequisiteCount === sourceNodeV310.prerequisiteCount
      && miniKvV137.missingPrerequisiteCount === sourceNodeV310.missingPrerequisiteCount
      && miniKvV137.noGoConditionCount === sourceNodeV310.noGoConditionCount
      && miniKvV137.readyForNodeV311BeforeUpstreamEcho === false,
    miniKvV137KeepsRuntimeBlocked: miniKvV137.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV144.echoesNodeV310DecisionGate
      && javaV144.readyForNodeV311
      && miniKvV137.echoesNodeV310DecisionGate
      && miniKvV137.readyForNodeV311,
    decisionGateContractAligned:
      javaV144.decisionGateContractEchoed
      && miniKvV137.sourceNodeV310DecisionDigest === sourceNodeV310.decisionDigest
      && miniKvV137.prerequisiteCount === sourceNodeV310.prerequisiteCount
      && miniKvV137.missingPrerequisiteCount === sourceNodeV310.missingPrerequisiteCount
      && miniKvV137.noGoConditionCount === sourceNodeV310.noGoConditionCount,
    sideEffectBoundariesAligned:
      sourceNodeV310.executionAllowed === false
      && javaV144.sideEffectBoundariesClosed
      && miniKvV137.sideEffectBoundariesClosed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV310: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
  javaV144: JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference,
  miniKvV137: MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference,
  checks: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks,
  verificationState: string,
): HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification {
  const record = {
    verificationMode: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-only" as const,
    sourceSpan: "Node v310 + Java v144 + mini-kv v137" as const,
    sourceNodeV310Ready: checks.sourceNodeV310Ready,
    javaV144EchoReady: checks.javaV144EvidencePresent && checks.javaV144ReadyForNodeV311,
    miniKvV137ReceiptReady: checks.miniKvV137EvidencePresent && checks.miniKvV137ReadyForNodeV311,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    decisionGateContractAligned: checks.decisionGateContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceNodeV310DecisionDigest: sourceNodeV310.decisionDigest,
      javaEvidenceDigest: javaV144.evidenceFiles.map((file) => file.digest),
      miniKvReceiptDigest: miniKvV137.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks,
): HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV310Ready
        && checks.sourceNodeV310RequestsParallelEcho
        && checks.sourceNodeV310DecisionGateComplete,
      code: "NODE_V310_DECISION_GATE_NOT_READY",
      source: "node-v310-human-approval-artifact-review-post-echo-decision-gate",
      message: "Node v310 must publish the complete post-echo decision gate before v311 can verify upstream echoes.",
    },
    {
      condition:
        checks.javaV144EvidencePresent
        && checks.javaV144EchoesNodeV310DecisionGate
        && checks.javaV144ReadyForNodeV311
        && checks.javaV144DecisionGateContractEchoed,
      code: "JAVA_V144_ECHO_NOT_READY",
      source: "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo",
      message: "Java v144 evidence must echo Node v310's post-echo decision gate and mark itself ready for Node v311.",
    },
    {
      condition:
        checks.miniKvV137EvidencePresent
        && checks.miniKvV137EchoesNodeV310DecisionGate
        && checks.miniKvV137ReadyForNodeV311
        && checks.miniKvV137DecisionGateContractEchoed,
      code: "MINI_KV_V137_RECEIPT_NOT_READY",
      source: "mini-kv-v137-human-approval-artifact-review-post-echo-decision-gate-non-participation",
      message: "mini-kv v137 evidence must echo Node v310's post-echo decision gate and mark itself ready for Node v311.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.decisionGateContractAligned
        && checks.sideEffectBoundariesAligned
        && checks.javaV144KeepsRuntimeBlocked
        && checks.miniKvV137KeepsRuntimeBlocked,
      code: "POST_ECHO_DECISION_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification",
      message: "Java v144 and mini-kv v137 must both echo Node v310 without opening runtime or side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v311 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v311 upstream echo verification.",
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

function collectWarnings(): HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "POST_ECHO_DECISION_ECHO_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification",
      message: "v311 proves Java v144 and mini-kv v137 echoed the Node v310 decision gate; it still does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_NEXT_STEP_AS_STOP_OR_NEW_PREREQUISITE_DECISION",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification",
      message: "The next Node plan should either stop this governance chain or name a new concrete missing prerequisite before adding another echo.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED_AFTER_V311",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification",
      message: "Do not convert upstream echo alignment into implementation permission; keep credential, endpoint, provider/client, network, ledger, schema, mini-kv write/admin, and auto-start boundaries closed.",
    },
  ];
}

function createSummary(
  sourceNodeV310: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
  javaV144: JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference,
  miniKvV137: MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference,
  checks: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks,
  productionBlockers: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[],
  warnings: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[],
  recommendations: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[],
): HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV310CheckCount: sourceNodeV310.sourceSummary.checkCount,
    sourceNodeV310PassedCheckCount: sourceNodeV310.sourceSummary.passedCheckCount,
    javaEvidenceFileCount: javaV144.evidenceFiles.length,
    javaMatchedSnippetCount: javaV144.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV137.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV137.expectedSnippets.filter((expected) => expected.matched).length,
    prerequisiteCount: sourceNodeV310.prerequisiteCount,
    missingPrerequisiteCount: sourceNodeV310.missingPrerequisiteCount,
    noGoConditionCount: sourceNodeV310.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
