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
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.js";
import type {
  ApprovalPrerequisiteArtifactUpstreamEchoVerification,
  ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks,
  ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage,
  ApprovalPrerequisiteArtifactUpstreamEchoVerificationSummary,
  JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationProfile,
  MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference,
  SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification";
const SOURCE_NODE_V306_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan";
const ACTIVE_PLAN = "docs/plans2/v305-post-stop-prerequisite-upstream-echo-roadmap.md";

const JAVA_V142_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoSupport.java";
const JAVA_V142_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceApprovalPrerequisiteArtifactIntakeEchoTests.java";
const JAVA_V142_EXPLANATION = "D:/javaproj/advanced-order-platform/d/142/解释/说明.md";
const JAVA_V142_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/144-version-142-approval-prerequisite-artifact-intake-echo.md";
const MINI_KV_V135_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-approval-prerequisite-artifact-intake-non-participation-receipt.json";
const MINI_KV_V135_EXPLANATION = "D:/C/mini-kv/d/135/解释/说明.md";
const MINI_KV_V135_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/191-version-135-credential-resolver-approval-prerequisite-artifact-intake-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationProfile {
  const sourceNodeV306 = createSourceNodeV306(input.config);
  const javaV142 = createJavaV142Reference(sourceNodeV306);
  const miniKvV135 = createMiniKvV135Reference(sourceNodeV306);
  const checks = createChecks(input.config, sourceNodeV306, javaV142, miniKvV135);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification
    ? "approval-prerequisite-artifact-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV306, javaV142, miniKvV135, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV306, javaV142, miniKvV135, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval prerequisite artifact upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    approvalPrerequisiteArtifactUpstreamEchoVerificationOnly: true,
    consumesNodeV306ApprovalPrerequisiteArtifactIntakePlan: true,
    consumesJavaV142ApprovalPrerequisiteArtifactIntakeEcho: true,
    consumesMiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v307",
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
    sourceNodeV306,
    upstreamEvidence: { javaV142, miniKvV135 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalPrerequisiteArtifactUpstreamEchoVerificationJson: ROUTE_PATH,
      approvalPrerequisiteArtifactUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV306Json: SOURCE_NODE_V306_ROUTE,
      sourceNodeV306Markdown: `${SOURCE_NODE_V306_ROUTE}?format=markdown`,
      javaV142Support: JAVA_V142_SUPPORT,
      javaV142Test: JAVA_V142_TEST,
      javaV142Explanation: JAVA_V142_EXPLANATION,
      javaV142Walkthrough: JAVA_V142_WALKTHROUGH,
      miniKvV135Receipt: MINI_KV_V135_RECEIPT,
      miniKvV135Explanation: MINI_KV_V135_EXPLANATION,
      miniKvV135Walkthrough: MINI_KV_V135_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v307 as the read-only verification that Java v142 and mini-kv v135 echoed the Node v306 approval prerequisite artifact contract.",
      "Keep disabled runtime shell implementation and invocation blocked after v307; this version only proves the artifact contract was echoed upstream.",
      "The next plan may define a human-supplied approval artifact review packet, but it must still reject credential values, raw endpoint URLs, provider/client config, HTTP/TCP calls, ledger writes, schema migration, mini-kv writes/admin commands, and automatic upstream start.",
    ],
  };
}

function createSourceNodeV306(config: AppConfig): SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
    config,
  });

  return {
    sourceVersion: "Node v306",
    profileVersion: source.profileVersion,
    planState: source.planState,
    readyForArtifactIntakePlan:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan,
    artifactDigest: source.artifactIntakePlan.artifactDigest,
    artifactIntakePlan: source.artifactIntakePlan,
    checks: source.checks,
    summary: source.summary,
    sourceNodeVerificationVersion: source.sourceNodeVerificationVersion,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    readyForParallelJavaV142MiniKvV135Echo: source.readyForParallelJavaV142MiniKvV135Echo,
    requiredFieldIds: source.artifactIntakePlan.requiredFields.map((field) => field.id),
    prohibitedFieldIds: source.artifactIntakePlan.prohibitedFields.map((field) => field.id),
    rejectionReasonCodes: source.artifactIntakePlan.rejectionReasons.map((reason) => reason.code),
    noGoBoundaryIds: source.artifactIntakePlan.noGoBoundaries.map((boundary) => boundary.id),
    upstreamEchoRequestVersions: source.artifactIntakePlan.upstreamEchoRequests.map((request) => request.version),
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

function createJavaV142Reference(
  sourceNodeV306: SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference,
): JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v142-support", JAVA_V142_SUPPORT),
    evidenceFile("java-v142-test", JAVA_V142_TEST),
    evidenceFile("java-v142-explanation", JAVA_V142_EXPLANATION),
    evidenceFile("java-v142-walkthrough", JAVA_V142_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v142-version", JAVA_V142_SUPPORT, "java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only"),
    snippet("java-v142-node-v306", JAVA_V142_TEST, ".isEqualTo(\"Node v306\")"),
    snippet("java-v142-node-v307", JAVA_V142_TEST, ".isEqualTo(\"Node v307\")"),
    snippet("java-v142-upstream-profile", JAVA_V142_TEST, PROFILE_VERSION),
    snippet("java-v142-plan-profile", JAVA_V142_TEST, sourceNodeV306.profileVersion),
    snippet("java-v142-plan-route", JAVA_V142_TEST, SOURCE_NODE_V306_ROUTE),
    snippet("java-v142-plan-state", JAVA_V142_TEST, sourceNodeV306.planState),
    snippet("java-v142-ready", JAVA_V142_TEST, "readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification()).isTrue()"),
    snippet("java-v142-source-span", JAVA_V142_TEST, "sourceSpan()).isEqualTo(\"Node v306\")"),
    snippet("java-v142-required-count", JAVA_V142_TEST, "artifactIntakePlan().requiredFieldCount()).isEqualTo(12)"),
    snippet("java-v142-prohibited-count", JAVA_V142_TEST, "artifactIntakePlan().prohibitedFieldCount()).isEqualTo(8)"),
    snippet("java-v142-rejection-count", JAVA_V142_TEST, "artifactIntakePlan().rejectionReasonCount()).isEqualTo(9)"),
    snippet("java-v142-no-go-count", JAVA_V142_TEST, "artifactIntakePlan().noGoBoundaryCount()).isEqualTo(12)"),
    snippet("java-v142-required-field", JAVA_V142_TEST, "\"operator_approval_reference\""),
    snippet("java-v142-prohibited-field", JAVA_V142_TEST, "\"credential_value\""),
    snippet("java-v142-rejection-reason", JAVA_V142_TEST, "\"JAVA_OR_MINIKV_ECHO_MISSING\""),
    snippet("java-v142-no-go-boundary", JAVA_V142_TEST, "\"mini_kv_write_or_authority\""),
    snippet("java-v142-parallel", JAVA_V142_TEST, "javaMiniKvEchoCanRunInParallel()).isTrue()"),
    snippet("java-v142-necessity", JAVA_V142_TEST, "does not define required artifact fields"),
    snippet("java-v142-no-runtime", JAVA_V142_SUPPORT, "noRuntimeImplementationEchoed"),
    snippet("java-v142-no-invocation", JAVA_V142_SUPPORT, "noRuntimeInvocationEchoed"),
    snippet("java-v142-no-credential", JAVA_V142_SUPPORT, "noCredentialReadEchoed"),
    snippet("java-v142-no-endpoint", JAVA_V142_SUPPORT, "noRawEndpointParseEchoed"),
    snippet("java-v142-no-provider", JAVA_V142_SUPPORT, "noProviderClientInstantiationEchoed"),
    snippet("java-v142-no-external", JAVA_V142_SUPPORT, "noExternalRequestEchoed"),
    snippet("java-v142-no-write", JAVA_V142_SUPPORT, "noWriteOrMigrationEchoed"),
    snippet("java-v142-no-minikv", JAVA_V142_SUPPORT, "noMiniKvWriteOrAuthorityEchoed"),
    snippet("java-v142-no-autostart", JAVA_V142_SUPPORT, "noAutoStartBoundaryEchoed"),
    snippet("java-v142-explanation", JAVA_V142_EXPLANATION, "Java v142 消费 Node v306 的 approval prerequisite artifact intake plan"),
    snippet("java-v142-walkthrough", JAVA_V142_WALKTHROUGH, "Java v142 已完成 Node v306 要求的只读 artifact intake echo"),
  ];

  return {
    sourceVersion: "Java v142",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-prerequisite-artifact-intake-echo-receipt.v1",
    echoMode: "java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only",
    sourceSpan: "Node v306",
    nextNodeVersion: "Node v307",
    expectedProfileVersion: PROFILE_VERSION,
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV306Plan:
      snippetMatched(expectedSnippets, "java-v142-node-v306")
      && snippetMatched(expectedSnippets, "java-v142-plan-profile")
      && snippetMatched(expectedSnippets, "java-v142-plan-route")
      && snippetMatched(expectedSnippets, "java-v142-plan-state"),
    readyForNodeV307:
      snippetMatched(expectedSnippets, "java-v142-node-v307")
      && snippetMatched(expectedSnippets, "java-v142-upstream-profile")
      && snippetMatched(expectedSnippets, "java-v142-ready"),
    artifactContractEchoed:
      snippetMatched(expectedSnippets, "java-v142-required-field")
      && snippetMatched(expectedSnippets, "java-v142-prohibited-field")
      && snippetMatched(expectedSnippets, "java-v142-rejection-reason")
      && snippetMatched(expectedSnippets, "java-v142-no-go-boundary"),
    requiredFieldCountEchoed: snippetMatched(expectedSnippets, "java-v142-required-count"),
    prohibitedFieldCountEchoed: snippetMatched(expectedSnippets, "java-v142-prohibited-count"),
    rejectionReasonCountEchoed: snippetMatched(expectedSnippets, "java-v142-rejection-count"),
    noGoBoundaryCountEchoed: snippetMatched(expectedSnippets, "java-v142-no-go-count"),
    upstreamEchoRequestsEchoed: snippetMatched(expectedSnippets, "java-v142-parallel"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v142-necessity"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v142-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v142-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v142-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v142-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v142-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v142-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v142-no-write"),
    noMiniKvWriteOrAuthorityEchoed: snippetMatched(expectedSnippets, "java-v142-no-minikv"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v142-no-autostart"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v142-no-runtime")
      && snippetMatched(expectedSnippets, "java-v142-no-invocation")
      && snippetMatched(expectedSnippets, "java-v142-no-credential")
      && snippetMatched(expectedSnippets, "java-v142-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v142-no-provider")
      && snippetMatched(expectedSnippets, "java-v142-no-external")
      && snippetMatched(expectedSnippets, "java-v142-no-write")
      && snippetMatched(expectedSnippets, "java-v142-no-minikv")
      && snippetMatched(expectedSnippets, "java-v142-no-autostart"),
  };
}

function createMiniKvV135Reference(
  sourceNodeV306: SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference,
): MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v135-receipt", MINI_KV_V135_RECEIPT),
    evidenceFile("mini-kv-v135-explanation", MINI_KV_V135_EXPLANATION),
    evidenceFile("mini-kv-v135-walkthrough", MINI_KV_V135_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v135-consumer", MINI_KV_V135_RECEIPT, "Node v307 approval prerequisite artifact upstream echo verification"),
    snippet("mini-kv-v135-source-node-v306", MINI_KV_V135_RECEIPT, "\"source_version\":\"Node v306\""),
    snippet("mini-kv-v135-plan-profile", MINI_KV_V135_RECEIPT, sourceNodeV306.profileVersion),
    snippet("mini-kv-v135-plan-state", MINI_KV_V135_RECEIPT, sourceNodeV306.planState),
    snippet("mini-kv-v135-artifact-digest", MINI_KV_V135_RECEIPT, sourceNodeV306.artifactDigest),
    snippet("mini-kv-v135-ready", MINI_KV_V135_RECEIPT, "\"ready_for_node_v307_approval_prerequisite_artifact_upstream_echo_verification\":true"),
    snippet("mini-kv-v135-counts", MINI_KV_V135_RECEIPT, "\"required_field_count\":12"),
    snippet("mini-kv-v135-prohibited", MINI_KV_V135_RECEIPT, "\"prohibited_field_count\":8"),
    snippet("mini-kv-v135-rejections", MINI_KV_V135_RECEIPT, "\"rejection_reason_count\":9"),
    snippet("mini-kv-v135-no-go", MINI_KV_V135_RECEIPT, "\"no_go_boundary_count\":12"),
    snippet("mini-kv-v135-receipt-only", MINI_KV_V135_RECEIPT, "\"approval_prerequisite_artifact_intake_non_participation_receipt_only\":true"),
    snippet("mini-kv-v135-read-only", MINI_KV_V135_RECEIPT, "\"read_only_artifact_contract\":true"),
    snippet("mini-kv-v135-no-runtime", MINI_KV_V135_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v135-no-invocation", MINI_KV_V135_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v135-no-credential", MINI_KV_V135_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v135-no-endpoint", MINI_KV_V135_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v135-no-provider", MINI_KV_V135_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v135-no-external", MINI_KV_V135_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v135-no-ledger", MINI_KV_V135_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v135-no-restore", MINI_KV_V135_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v135-no-setnxex", MINI_KV_V135_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v135-not-authority", MINI_KV_V135_RECEIPT, "\"order_authoritative\":false"),
    snippet("mini-kv-v135-explanation", MINI_KV_V135_EXPLANATION, "mini-kv v135 运行截图说明"),
    snippet("mini-kv-v135-walkthrough", MINI_KV_V135_WALKTHROUGH, "ready_for_node_v307_approval_prerequisite_artifact_upstream_echo_verification=true"),
  ];
  const parsed = readJsonObject(MINI_KV_V135_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_approval_prerequisite_artifact_intake_non_participation_receipt");
  const sourceNodeV306Reference = objectField(receipt, "source_node_v306_reference");
  const sourceArtifactIntakePlan = objectField(sourceNodeV306Reference, "artifact_intake_plan");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v135",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV306Plan:
      stringField(sourceNodeV306Reference, "source_version") === "Node v306"
      && stringField(sourceNodeV306Reference, "profile_version") === sourceNodeV306.profileVersion
      && stringField(sourceNodeV306Reference, "plan_state") === sourceNodeV306.planState
      && stringField(sourceArtifactIntakePlan, "artifact_digest") === sourceNodeV306.artifactDigest,
    readyForNodeV307:
      booleanField(receipt, "ready_for_node_v307_approval_prerequisite_artifact_upstream_echo_verification") === true,
    sourceNodeV306ProfileVersion: stringField(sourceNodeV306Reference, "profile_version"),
    sourceNodeV306PlanState: stringField(sourceNodeV306Reference, "plan_state"),
    sourceNodeV306ArtifactDigest: stringField(sourceArtifactIntakePlan, "artifact_digest"),
    requiredFieldCount: numberField(sourceArtifactIntakePlan, "required_field_count"),
    prohibitedFieldCount: numberField(sourceArtifactIntakePlan, "prohibited_field_count"),
    rejectionReasonCount: numberField(sourceArtifactIntakePlan, "rejection_reason_count"),
    noGoBoundaryCount: numberField(sourceArtifactIntakePlan, "no_go_boundary_count"),
    upstreamEchoRequestCount: numberField(sourceArtifactIntakePlan, "upstream_echo_request_count"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "approval_prerequisite_artifact_intake_non_participation_receipt_only") === true,
    approvalPrerequisiteArtifactIntakePlanOnly:
      booleanField(receipt, "approval_prerequisite_artifact_intake_plan_only") === true,
    readOnlyArtifactContract: booleanField(receipt, "read_only_artifact_contract") === true,
    consumesNodeV306ApprovalPrerequisiteArtifactIntakePlan:
      booleanField(receipt, "consumes_node_v306_approval_prerequisite_artifact_intake_plan") === true,
    consumesNodeV305StopPrerequisiteUpstreamEchoVerification:
      booleanField(receipt, "consumes_node_v305_stop_prerequisite_upstream_echo_verification") === true,
    readyForNodeV307BeforeUpstreamEcho: booleanField(receipt, "ready_for_node_v307_before_upstream_echo"),
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
    sideEffectBoundariesClosed:
      booleanField(checks, "runtime_shell_implementation_still_blocked") === true
      && booleanField(checks, "production_audit_still_blocked") === true
      && booleanField(checks, "production_window_still_blocked") === true
      && booleanField(receipt, "runtime_shell_implemented") === false
      && booleanField(receipt, "runtime_shell_invocation_allowed") === false
      && booleanField(receipt, "execution_allowed") === false
      && booleanField(receipt, "connects_managed_audit") === false
      && booleanField(receipt, "credential_value_read") === false
      && booleanField(receipt, "credential_value_accepted") === false
      && booleanField(receipt, "raw_endpoint_url_parsed") === false
      && booleanField(receipt, "raw_endpoint_url_accepted") === false
      && booleanField(receipt, "external_request_sent") === false
      && booleanField(receipt, "secret_provider_instantiated") === false
      && booleanField(receipt, "resolver_client_instantiated") === false
      && booleanField(receipt, "fake_secret_provider_instantiated") === false
      && booleanField(receipt, "fake_resolver_client_instantiated") === false
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
  sourceNodeV306: SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference,
  javaV142: JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference,
  miniKvV135: MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference,
): ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks {
  return {
    sourceNodeV306Ready: sourceNodeV306.readyForArtifactIntakePlan,
    sourceNodeV306RequestsParallelEcho:
      sourceNodeV306.readyForParallelJavaV142MiniKvV135Echo
      && sourceNodeV306.nextJavaVersion === "Java v142"
      && sourceNodeV306.nextMiniKvVersion === "mini-kv v135"
      && sourceNodeV306.nextNodeVerificationVersion === "Node v307",
    sourceNodeV306ArtifactContractComplete:
      sourceNodeV306.artifactIntakePlan.requiredFieldCount === 12
      && sourceNodeV306.artifactIntakePlan.prohibitedFieldCount === 8
      && sourceNodeV306.artifactIntakePlan.rejectionReasonCount === 9
      && sourceNodeV306.artifactIntakePlan.noGoBoundaryCount === 12
      && sourceNodeV306.upstreamEchoRequestVersions.includes("Java v142")
      && sourceNodeV306.upstreamEchoRequestVersions.includes("mini-kv v135"),
    sourceNodeV306KeepsRuntimeBlocked:
      sourceNodeV306.runtimeShellImplemented === false
      && sourceNodeV306.runtimeShellInvocationAllowed === false
      && sourceNodeV306.executionAllowed === false,
    sourceNodeV306KeepsSideEffectsClosed:
      sourceNodeV306.connectsManagedAudit === false
      && sourceNodeV306.credentialValueRead === false
      && sourceNodeV306.rawEndpointUrlParsed === false
      && sourceNodeV306.externalRequestSent === false
      && sourceNodeV306.schemaMigrationExecuted === false
      && sourceNodeV306.approvalLedgerWritten === false
      && sourceNodeV306.automaticUpstreamStart === false,
    javaV142EvidencePresent: javaV142.evidencePresent && javaV142.verificationDocumented,
    javaV142EchoesNodeV306Plan: javaV142.echoesNodeV306Plan,
    javaV142ReadyForNodeV307: javaV142.readyForNodeV307,
    javaV142ArtifactContractEchoed:
      javaV142.artifactContractEchoed
      && javaV142.requiredFieldCountEchoed
      && javaV142.prohibitedFieldCountEchoed
      && javaV142.rejectionReasonCountEchoed
      && javaV142.noGoBoundaryCountEchoed
      && javaV142.upstreamEchoRequestsEchoed
      && javaV142.necessityProofEchoed,
    javaV142KeepsRuntimeBlocked: javaV142.sideEffectBoundariesClosed,
    miniKvV135EvidencePresent: miniKvV135.evidencePresent && miniKvV135.verificationDocumented,
    miniKvV135EchoesNodeV306Plan: miniKvV135.echoesNodeV306Plan,
    miniKvV135ReadyForNodeV307: miniKvV135.readyForNodeV307,
    miniKvV135ArtifactContractEchoed:
      miniKvV135.requiredFieldCount === sourceNodeV306.artifactIntakePlan.requiredFieldCount
      && miniKvV135.prohibitedFieldCount === sourceNodeV306.artifactIntakePlan.prohibitedFieldCount
      && miniKvV135.rejectionReasonCount === sourceNodeV306.artifactIntakePlan.rejectionReasonCount
      && miniKvV135.noGoBoundaryCount === sourceNodeV306.artifactIntakePlan.noGoBoundaryCount
      && miniKvV135.upstreamEchoRequestCount === sourceNodeV306.artifactIntakePlan.upstreamEchoRequests.length
      && miniKvV135.approvalPrerequisiteArtifactIntakePlanOnly
      && miniKvV135.readOnlyArtifactContract,
    miniKvV135KeepsRuntimeBlocked:
      miniKvV135.nonParticipationReceiptOnly
      && miniKvV135.readyForNodeV307BeforeUpstreamEcho === false
      && miniKvV135.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV142.echoesNodeV306Plan
      && javaV142.readyForNodeV307
      && miniKvV135.echoesNodeV306Plan
      && miniKvV135.readyForNodeV307,
    artifactContractAligned:
      javaV142.artifactContractEchoed
      && miniKvV135.sourceNodeV306ArtifactDigest === sourceNodeV306.artifactDigest
      && miniKvV135.requiredFieldCount === sourceNodeV306.artifactIntakePlan.requiredFieldCount
      && miniKvV135.prohibitedFieldCount === sourceNodeV306.artifactIntakePlan.prohibitedFieldCount
      && miniKvV135.rejectionReasonCount === sourceNodeV306.artifactIntakePlan.rejectionReasonCount
      && miniKvV135.noGoBoundaryCount === sourceNodeV306.artifactIntakePlan.noGoBoundaryCount,
    sideEffectBoundariesAligned:
      sourceNodeV306.executionAllowed === false
      && javaV142.sideEffectBoundariesClosed
      && miniKvV135.sideEffectBoundariesClosed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV306: SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference,
  javaV142: JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference,
  miniKvV135: MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference,
  checks: ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks,
  verificationState: string,
): ApprovalPrerequisiteArtifactUpstreamEchoVerification {
  const record = {
    verificationMode: "approval-prerequisite-artifact-upstream-echo-verification-only" as const,
    sourceSpan: "Node v306 + Java v142 + mini-kv v135" as const,
    sourceNodeV306Ready: checks.sourceNodeV306Ready,
    javaV142EchoReady: checks.javaV142EvidencePresent && checks.javaV142ReadyForNodeV307,
    miniKvV135ReceiptReady: checks.miniKvV135EvidencePresent && checks.miniKvV135ReadyForNodeV307,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    artifactContractAligned: checks.artifactContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceNodeV306ArtifactDigest: sourceNodeV306.artifactDigest,
      javaEvidenceDigest: javaV142.evidenceFiles.map((file) => file.digest),
      miniKvReceiptDigest: miniKvV135.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks,
): ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV306Ready
        && checks.sourceNodeV306RequestsParallelEcho
        && checks.sourceNodeV306ArtifactContractComplete,
      code: "NODE_V306_ARTIFACT_PLAN_NOT_READY",
      source: "node-v306-approval-prerequisite-artifact-intake-plan",
      message: "Node v306 must define the complete artifact contract and explicitly request Java v142 + mini-kv v135 echo before v307.",
    },
    {
      condition: checks.sourceNodeV306KeepsRuntimeBlocked && checks.sourceNodeV306KeepsSideEffectsClosed,
      code: "NODE_V306_BOUNDARY_OPEN",
      source: "node-v306-approval-prerequisite-artifact-intake-plan",
      message: "Node v306 must keep runtime shell, credential, endpoint, network, write, schema, and auto-start boundaries closed.",
    },
    {
      condition:
        checks.javaV142EvidencePresent
        && checks.javaV142EchoesNodeV306Plan
        && checks.javaV142ReadyForNodeV307
        && checks.javaV142ArtifactContractEchoed,
      code: "JAVA_V142_ECHO_NOT_READY",
      source: "java-v142-approval-prerequisite-artifact-intake-echo",
      message: "Java v142 evidence must echo Node v306's artifact contract and mark itself ready for Node v307 verification.",
    },
    {
      condition:
        checks.miniKvV135EvidencePresent
        && checks.miniKvV135EchoesNodeV306Plan
        && checks.miniKvV135ReadyForNodeV307
        && checks.miniKvV135ArtifactContractEchoed,
      code: "MINI_KV_V135_RECEIPT_NOT_READY",
      source: "mini-kv-v135-approval-prerequisite-artifact-intake-non-participation",
      message: "mini-kv v135 evidence must echo Node v306's artifact contract and mark itself ready for Node v307 verification.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.artifactContractAligned
        && checks.sideEffectBoundariesAligned
        && checks.javaV142KeepsRuntimeBlocked
        && checks.miniKvV135KeepsRuntimeBlocked,
      code: "APPROVAL_PREREQUISITE_ARTIFACT_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification",
      message: "Java v142 and mini-kv v135 must both echo the Node v306 approval prerequisite artifact contract without opening runtime or side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v307 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v307 upstream echo verification.",
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

function collectWarnings(): ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_VERIFICATION_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification",
      message: "v307 proves Java v142 and mini-kv v135 echoed the Node v306 artifact contract; it does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_NEXT_HUMAN_SUPPLIED_APPROVAL_ARTIFACT_REVIEW_PACKET",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification",
      message: "The next Node step may define how a human-supplied approval artifact is reviewed, but must still reject credential values and raw endpoint URLs.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED_AFTER_ECHO_ALIGNMENT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification",
      message: "Do not convert upstream echo alignment into implementation permission; require a separate artifact review packet and explicit approval gates.",
    },
  ];
}

function createSummary(
  sourceNodeV306: SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference,
  javaV142: JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference,
  miniKvV135: MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference,
  checks: ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks,
  productionBlockers: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[],
  warnings: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[],
  recommendations: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[],
): ApprovalPrerequisiteArtifactUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV306CheckCount: sourceNodeV306.summary.checkCount,
    sourceNodeV306PassedCheckCount: sourceNodeV306.summary.passedCheckCount,
    javaEvidenceFileCount: javaV142.evidenceFiles.length,
    javaMatchedSnippetCount: javaV142.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV135.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV135.expectedSnippets.filter((expected) => expected.matched).length,
    requiredFieldCount: sourceNodeV306.artifactIntakePlan.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV306.artifactIntakePlan.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV306.artifactIntakePlan.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV306.artifactIntakePlan.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV306.artifactIntakePlan.upstreamEchoRequests.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
