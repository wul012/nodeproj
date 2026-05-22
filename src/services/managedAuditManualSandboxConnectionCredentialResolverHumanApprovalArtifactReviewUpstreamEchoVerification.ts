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
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.js";
import type {
  HumanApprovalArtifactReviewUpstreamEchoVerification,
  HumanApprovalArtifactReviewUpstreamEchoVerificationChecks,
  HumanApprovalArtifactReviewUpstreamEchoVerificationMessage,
  HumanApprovalArtifactReviewUpstreamEchoVerificationSummary,
  JavaV143HumanApprovalArtifactReviewPacketEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationProfile,
  MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference,
  SourceNodeV308HumanApprovalArtifactReviewPacketReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification";
const SOURCE_NODE_V308_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet";
const ACTIVE_PLAN = "docs/plans2/v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md";

const JAVA_V143_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoSupport.java";
const JAVA_V143_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceHumanApprovalArtifactReviewPacketEchoTests.java";
const JAVA_V143_EXPLANATION = "D:/javaproj/advanced-order-platform/d/143/解释/说明.md";
const JAVA_V143_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/145-version-143-human-approval-artifact-review-packet-echo.md";
const MINI_KV_V136_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-human-approval-artifact-review-non-participation-receipt.json";
const MINI_KV_V136_EXPLANATION = "D:/C/mini-kv/d/136/解释/说明.md";
const MINI_KV_V136_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/192-version-136-credential-resolver-human-approval-artifact-review-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationProfile {
  const sourceNodeV308 = createSourceNodeV308(input.config);
  const javaV143 = createJavaV143Reference(sourceNodeV308);
  const miniKvV136 = createMiniKvV136Reference(sourceNodeV308);
  const checks = createChecks(input.config, sourceNodeV308, javaV143, miniKvV136);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification
    ? "human-approval-artifact-review-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV308, javaV143, miniKvV136, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV308, javaV143, miniKvV136, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver human approval artifact review upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    humanApprovalArtifactReviewUpstreamEchoVerificationOnly: true,
    consumesNodeV308HumanApprovalArtifactReviewPacket: true,
    consumesJavaV143HumanApprovalArtifactReviewPacketEcho: true,
    consumesMiniKvV136HumanApprovalArtifactReviewNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v309",
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
    sourceNodeV308,
    upstreamEvidence: { javaV143, miniKvV136 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      humanApprovalArtifactReviewUpstreamEchoVerificationJson: ROUTE_PATH,
      humanApprovalArtifactReviewUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV308Json: SOURCE_NODE_V308_ROUTE,
      sourceNodeV308Markdown: `${SOURCE_NODE_V308_ROUTE}?format=markdown`,
      javaV143Support: JAVA_V143_SUPPORT,
      javaV143Test: JAVA_V143_TEST,
      javaV143Explanation: JAVA_V143_EXPLANATION,
      javaV143Walkthrough: JAVA_V143_WALKTHROUGH,
      miniKvV136Receipt: MINI_KV_V136_RECEIPT,
      miniKvV136Explanation: MINI_KV_V136_EXPLANATION,
      miniKvV136Walkthrough: MINI_KV_V136_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v309 as the human approval artifact review upstream echo verification that consumes Node v308, Java v143, and mini-kv v136.",
      "Keep disabled runtime shell implementation and invocation blocked after v309; this version only proves the packet contract was echoed upstream.",
      "The next plan may consider a future Node-only read-only preflight, but it must still reject credential values, raw endpoint URLs, provider/client config, HTTP/TCP calls, ledger writes, schema migration, mini-kv writes/admin commands, and automatic upstream start.",
    ],
  };
}

function createSourceNodeV308(config: AppConfig): SourceNodeV308HumanApprovalArtifactReviewPacketReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
    config,
  });

  return {
    sourceVersion: "Node v308",
    profileVersion: source.profileVersion,
    reviewPacketState: source.reviewPacketState,
    readyForHumanApprovalArtifactReviewPacket:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket,
    reviewPacketDigest: source.reviewPacket.packetDigest,
    sourceNodeV307: source.sourceNodeV307,
    reviewPacket: source.reviewPacket,
    checks: source.checks,
    summary: source.summary,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    readyForParallelJavaV143MiniKvV136Echo: source.readyForParallelJavaV143MiniKvV136Echo,
    requiredFieldIds: source.reviewPacket.requiredFields.map((field) => field.id),
    prohibitedFieldIds: source.reviewPacket.prohibitedFields.map((field) => field.id),
    rejectionReasonCodes: source.reviewPacket.rejectionReasons.map((reason) => reason.code),
    missingFieldCheckCodes: source.reviewPacket.missingFieldChecks.map((check) => check.rejectionCode),
    noGoBoundaryIds: source.reviewPacket.noGoBoundaries.map((boundary) => boundary.id),
    upstreamEchoRequestVersions: source.reviewPacket.upstreamEchoRequests.map((request) => request.version),
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

function createJavaV143Reference(
  sourceNodeV308: SourceNodeV308HumanApprovalArtifactReviewPacketReference,
): JavaV143HumanApprovalArtifactReviewPacketEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v143-support", JAVA_V143_SUPPORT),
    evidenceFile("java-v143-test", JAVA_V143_TEST),
    evidenceFile("java-v143-explanation", JAVA_V143_EXPLANATION),
    evidenceFile("java-v143-walkthrough", JAVA_V143_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v143-version", JAVA_V143_SUPPORT, "java-v143-human-approval-artifact-review-packet-echo-only"),
    snippet("java-v143-node-v308", JAVA_V143_TEST, ".isEqualTo(\"Node v308\")"),
    snippet("java-v143-node-v309", JAVA_V143_TEST, ".isEqualTo(\"Node v309\")"),
    snippet("java-v143-upstream-profile", JAVA_V143_TEST, PROFILE_VERSION),
    snippet("java-v143-source-profile", JAVA_V143_TEST, sourceNodeV308.profileVersion),
    snippet("java-v143-source-route", JAVA_V143_TEST, SOURCE_NODE_V308_ROUTE),
    snippet("java-v143-source-state", JAVA_V143_TEST, sourceNodeV308.reviewPacketState),
    snippet("java-v143-ready", JAVA_V143_TEST, "readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification()).isTrue()"),
    snippet("java-v143-source-span", JAVA_V143_TEST, "sourceSpan()).isEqualTo(\"Node v308\")"),
    snippet("java-v143-required-count", JAVA_V143_TEST, "reviewPacket().requiredFieldCount()).isEqualTo(9)"),
    snippet("java-v143-prohibited-count", JAVA_V143_TEST, "reviewPacket().prohibitedFieldCount()).isEqualTo(9)"),
    snippet("java-v143-rejection-count", JAVA_V143_TEST, "reviewPacket().rejectionReasonCount()).isEqualTo(13)"),
    snippet("java-v143-missing-count", JAVA_V143_TEST, "reviewPacket().missingFieldCheckCount()).isEqualTo(9)"),
    snippet("java-v143-no-go-count", JAVA_V143_TEST, "reviewPacket().noGoBoundaryCount()).isEqualTo(12)"),
    snippet("java-v143-parallel", JAVA_V143_TEST, "javaMiniKvEchoRequestExplicitlyParallel()).isTrue()"),
    snippet("java-v143-necessity", JAVA_V143_TEST, ".contains(\"missing-field checks\")"),
    snippet("java-v143-no-runtime", JAVA_V143_SUPPORT, "noRuntimeImplementationEchoed"),
    snippet("java-v143-no-invocation", JAVA_V143_SUPPORT, "noRuntimeInvocationEchoed"),
    snippet("java-v143-no-credential", JAVA_V143_SUPPORT, "noCredentialReadEchoed"),
    snippet("java-v143-no-endpoint", JAVA_V143_SUPPORT, "noRawEndpointParseEchoed"),
    snippet("java-v143-no-provider", JAVA_V143_SUPPORT, "noProviderClientInstantiationEchoed"),
    snippet("java-v143-no-external", JAVA_V143_SUPPORT, "noExternalRequestEchoed"),
    snippet("java-v143-no-write", JAVA_V143_SUPPORT, "noWriteOrMigrationEchoed"),
    snippet("java-v143-no-minikv", JAVA_V143_SUPPORT, "noMiniKvWriteOrAuthorityEchoed"),
    snippet("java-v143-no-autostart", JAVA_V143_SUPPORT, "noAutoStartBoundaryEchoed"),
    snippet("java-v143-explanation", JAVA_V143_EXPLANATION, "Java v143 adds the read-only echo for the Node v308 human approval artifact review packet."),
    snippet("java-v143-walkthrough", JAVA_V143_WALKTHROUGH, "It consumes the Node v308 human approval artifact review packet contract"),
  ];

  return {
    sourceVersion: "Java v143",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-human-approval-artifact-review-packet-echo-receipt.v1",
    echoMode: "java-v143-human-approval-artifact-review-packet-echo-only",
    sourceSpan: "Node v308",
    nextNodeVersion: "Node v309",
    expectedProfileVersion: PROFILE_VERSION,
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV308Packet:
      snippetMatched(expectedSnippets, "java-v143-node-v308")
      && snippetMatched(expectedSnippets, "java-v143-source-profile")
      && snippetMatched(expectedSnippets, "java-v143-source-route")
      && snippetMatched(expectedSnippets, "java-v143-source-state"),
    readyForNodeV309:
      snippetMatched(expectedSnippets, "java-v143-node-v309")
      && snippetMatched(expectedSnippets, "java-v143-upstream-profile")
      && snippetMatched(expectedSnippets, "java-v143-ready"),
    reviewPacketContractEchoed:
      snippetMatched(expectedSnippets, "java-v143-required-count")
      && snippetMatched(expectedSnippets, "java-v143-prohibited-count")
      && snippetMatched(expectedSnippets, "java-v143-rejection-count")
      && snippetMatched(expectedSnippets, "java-v143-missing-count")
      && snippetMatched(expectedSnippets, "java-v143-no-go-count"),
    requiredFieldCountEchoed: snippetMatched(expectedSnippets, "java-v143-required-count"),
    prohibitedFieldCountEchoed: snippetMatched(expectedSnippets, "java-v143-prohibited-count"),
    rejectionReasonCountEchoed: snippetMatched(expectedSnippets, "java-v143-rejection-count"),
    missingFieldCheckCountEchoed: snippetMatched(expectedSnippets, "java-v143-missing-count"),
    noGoBoundaryCountEchoed: snippetMatched(expectedSnippets, "java-v143-no-go-count"),
    upstreamEchoRequestsEchoed: snippetMatched(expectedSnippets, "java-v143-parallel"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v143-necessity"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v143-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v143-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v143-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v143-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v143-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v143-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v143-no-write"),
    noMiniKvWriteOrAuthorityEchoed: snippetMatched(expectedSnippets, "java-v143-no-minikv"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v143-no-autostart"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v143-no-runtime")
      && snippetMatched(expectedSnippets, "java-v143-no-invocation")
      && snippetMatched(expectedSnippets, "java-v143-no-credential")
      && snippetMatched(expectedSnippets, "java-v143-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v143-no-provider")
      && snippetMatched(expectedSnippets, "java-v143-no-external")
      && snippetMatched(expectedSnippets, "java-v143-no-write")
      && snippetMatched(expectedSnippets, "java-v143-no-minikv")
      && snippetMatched(expectedSnippets, "java-v143-no-autostart"),
  };
}

function createMiniKvV136Reference(
  sourceNodeV308: SourceNodeV308HumanApprovalArtifactReviewPacketReference,
): MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v136-receipt", MINI_KV_V136_RECEIPT),
    evidenceFile("mini-kv-v136-explanation", MINI_KV_V136_EXPLANATION),
    evidenceFile("mini-kv-v136-walkthrough", MINI_KV_V136_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v136-consumer", MINI_KV_V136_RECEIPT, "Node v309 human approval artifact review upstream echo verification"),
    snippet("mini-kv-v136-source-node-v308", MINI_KV_V136_RECEIPT, "\"source_version\":\"Node v308\""),
    snippet("mini-kv-v136-plan-profile", MINI_KV_V136_RECEIPT, sourceNodeV308.profileVersion),
    snippet("mini-kv-v136-plan-state", MINI_KV_V136_RECEIPT, sourceNodeV308.reviewPacketState),
    snippet("mini-kv-v136-packet-digest", MINI_KV_V136_RECEIPT, sourceNodeV308.reviewPacketDigest),
    snippet("mini-kv-v136-ready", MINI_KV_V136_RECEIPT, "\"ready_for_node_v309_human_approval_artifact_review_upstream_echo_verification\":true"),
    snippet("mini-kv-v136-counts", MINI_KV_V136_RECEIPT, "\"required_field_count\":9"),
    snippet("mini-kv-v136-prohibited", MINI_KV_V136_RECEIPT, "\"prohibited_field_count\":9"),
    snippet("mini-kv-v136-rejections", MINI_KV_V136_RECEIPT, "\"rejection_reason_count\":13"),
    snippet("mini-kv-v136-missing", MINI_KV_V136_RECEIPT, "\"missing_field_check_count\":9"),
    snippet("mini-kv-v136-no-go", MINI_KV_V136_RECEIPT, "\"no_go_boundary_count\":12"),
    snippet("mini-kv-v136-receipt-only", MINI_KV_V136_RECEIPT, "\"human_approval_artifact_review_non_participation_receipt_only\":true"),
    snippet("mini-kv-v136-read-only", MINI_KV_V136_RECEIPT, "\"read_only_review_packet_contract\":true"),
    snippet("mini-kv-v136-no-runtime", MINI_KV_V136_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v136-no-invocation", MINI_KV_V136_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v136-no-credential", MINI_KV_V136_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v136-no-endpoint", MINI_KV_V136_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v136-no-provider", MINI_KV_V136_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v136-no-external", MINI_KV_V136_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v136-no-ledger", MINI_KV_V136_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v136-no-restore", MINI_KV_V136_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v136-no-setnxex", MINI_KV_V136_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v136-not-authority", MINI_KV_V136_RECEIPT, "\"order_authoritative\":false"),
    snippet("mini-kv-v136-explanation", MINI_KV_V136_EXPLANATION, "mini-kv v136 运行截图说明"),
    snippet("mini-kv-v136-walkthrough", MINI_KV_V136_WALKTHROUGH, "ready_for_node_v309_human_approval_artifact_review_upstream_echo_verification=true"),
  ];
  const parsed = readJsonObject(MINI_KV_V136_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_human_approval_artifact_review_non_participation_receipt");
  const sourceNodeV308Reference = objectField(receipt, "source_node_v308_reference");
  const reviewPacket = objectField(sourceNodeV308Reference, "review_packet");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v136",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV308Packet:
      stringField(sourceNodeV308Reference, "source_version") === "Node v308"
      && stringField(sourceNodeV308Reference, "profile_version") === sourceNodeV308.profileVersion
      && stringField(sourceNodeV308Reference, "review_packet_state") === sourceNodeV308.reviewPacketState
      && stringField(reviewPacket, "packet_digest") === sourceNodeV308.reviewPacketDigest,
    readyForNodeV309: booleanField(receipt, "ready_for_node_v309_human_approval_artifact_review_upstream_echo_verification") === true,
    sourceNodeV308ProfileVersion: stringField(sourceNodeV308Reference, "profile_version"),
    sourceNodeV308ReviewPacketState: stringField(sourceNodeV308Reference, "review_packet_state"),
    sourceNodeV308PacketDigest: stringField(reviewPacket, "packet_digest"),
    requiredFieldCount: numberField(reviewPacket, "required_field_count"),
    prohibitedFieldCount: numberField(reviewPacket, "prohibited_field_count"),
    rejectionReasonCount: numberField(reviewPacket, "rejection_reason_count"),
    missingFieldCheckCount: numberField(reviewPacket, "missing_field_check_count"),
    noGoBoundaryCount: numberField(reviewPacket, "no_go_boundary_count"),
    upstreamEchoRequestCount: numberField(reviewPacket, "upstream_echo_request_count"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "human_approval_artifact_review_non_participation_receipt_only") === true,
    humanApprovalArtifactReviewPacketOnly:
      booleanField(receipt, "human_approval_artifact_review_packet_only") === true,
    readOnlyReviewPacketContract: booleanField(receipt, "read_only_review_packet_contract") === true,
    consumesNodeV308HumanApprovalArtifactReviewPacket:
      booleanField(receipt, "consumes_node_v308_human_approval_artifact_review_packet") === true,
    consumesNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification:
      booleanField(receipt, "consumes_node_v307_approval_prerequisite_artifact_upstream_echo_verification") === true,
    readyForNodeV309BeforeUpstreamEcho: booleanField(receipt, "ready_for_node_v309_before_upstream_echo"),
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
  sourceNodeV308: SourceNodeV308HumanApprovalArtifactReviewPacketReference,
  javaV143: JavaV143HumanApprovalArtifactReviewPacketEchoReference,
  miniKvV136: MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference,
): HumanApprovalArtifactReviewUpstreamEchoVerificationChecks {
  return {
    sourceNodeV308Ready: sourceNodeV308.readyForHumanApprovalArtifactReviewPacket,
    sourceNodeV308RequestsParallelEcho:
      sourceNodeV308.readyForParallelJavaV143MiniKvV136Echo
      && sourceNodeV308.nextJavaVersion === "Java v143"
      && sourceNodeV308.nextMiniKvVersion === "mini-kv v136"
      && sourceNodeV308.nextNodeVerificationVersion === "Node v309",
    sourceNodeV308ReviewPacketContractComplete:
      sourceNodeV308.reviewPacket.requiredFieldCount === 9
      && sourceNodeV308.reviewPacket.prohibitedFieldCount === 9
      && sourceNodeV308.reviewPacket.rejectionReasonCount === 13
      && sourceNodeV308.reviewPacket.noGoBoundaryCount === 12
      && sourceNodeV308.upstreamEchoRequestVersions.includes("Java v143")
      && sourceNodeV308.upstreamEchoRequestVersions.includes("mini-kv v136"),
    sourceNodeV308KeepsRuntimeBlocked:
      sourceNodeV308.runtimeShellImplemented === false
      && sourceNodeV308.runtimeShellInvocationAllowed === false
      && sourceNodeV308.executionAllowed === false,
    sourceNodeV308KeepsSideEffectsClosed:
      sourceNodeV308.connectsManagedAudit === false
      && sourceNodeV308.credentialValueRead === false
      && sourceNodeV308.rawEndpointUrlParsed === false
      && sourceNodeV308.externalRequestSent === false
      && sourceNodeV308.schemaMigrationExecuted === false
      && sourceNodeV308.approvalLedgerWritten === false
      && sourceNodeV308.automaticUpstreamStart === false,
    javaV143EvidencePresent: javaV143.evidencePresent && javaV143.verificationDocumented,
    javaV143EchoesNodeV308Packet: javaV143.echoesNodeV308Packet,
    javaV143ReadyForNodeV309: javaV143.readyForNodeV309,
    javaV143ReviewPacketContractEchoed:
      javaV143.reviewPacketContractEchoed
      && javaV143.requiredFieldCountEchoed
      && javaV143.prohibitedFieldCountEchoed
      && javaV143.rejectionReasonCountEchoed
      && javaV143.missingFieldCheckCountEchoed
      && javaV143.noGoBoundaryCountEchoed
      && javaV143.upstreamEchoRequestsEchoed
      && javaV143.necessityProofEchoed,
    javaV143KeepsRuntimeBlocked: javaV143.sideEffectBoundariesClosed,
    miniKvV136EvidencePresent: miniKvV136.evidencePresent && miniKvV136.verificationDocumented,
    miniKvV136EchoesNodeV308Packet: miniKvV136.echoesNodeV308Packet,
    miniKvV136ReadyForNodeV309: miniKvV136.readyForNodeV309,
    miniKvV136ReviewPacketContractEchoed:
      miniKvV136.requiredFieldCount === sourceNodeV308.reviewPacket.requiredFieldCount
      && miniKvV136.prohibitedFieldCount === sourceNodeV308.reviewPacket.prohibitedFieldCount
      && miniKvV136.rejectionReasonCount === sourceNodeV308.reviewPacket.rejectionReasonCount
      && miniKvV136.missingFieldCheckCount === sourceNodeV308.reviewPacket.missingFieldChecks.length
      && miniKvV136.noGoBoundaryCount === sourceNodeV308.reviewPacket.noGoBoundaries.length
      && miniKvV136.upstreamEchoRequestCount === sourceNodeV308.reviewPacket.upstreamEchoRequests.length
      && miniKvV136.humanApprovalArtifactReviewPacketOnly
      && miniKvV136.readOnlyReviewPacketContract,
    miniKvV136KeepsRuntimeBlocked:
      miniKvV136.nonParticipationReceiptOnly
      && miniKvV136.readyForNodeV309BeforeUpstreamEcho === false
      && miniKvV136.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV143.echoesNodeV308Packet
      && javaV143.readyForNodeV309
      && miniKvV136.echoesNodeV308Packet
      && miniKvV136.readyForNodeV309,
    reviewPacketContractAligned:
      javaV143.reviewPacketContractEchoed
      && miniKvV136.sourceNodeV308PacketDigest === sourceNodeV308.reviewPacketDigest
      && miniKvV136.requiredFieldCount === sourceNodeV308.reviewPacket.requiredFieldCount
      && miniKvV136.prohibitedFieldCount === sourceNodeV308.reviewPacket.prohibitedFieldCount
      && miniKvV136.rejectionReasonCount === sourceNodeV308.reviewPacket.rejectionReasonCount
      && miniKvV136.missingFieldCheckCount === sourceNodeV308.reviewPacket.missingFieldChecks.length
      && miniKvV136.noGoBoundaryCount === sourceNodeV308.reviewPacket.noGoBoundaries.length,
    sideEffectBoundariesAligned:
      sourceNodeV308.executionAllowed === false
      && javaV143.sideEffectBoundariesClosed
      && miniKvV136.sideEffectBoundariesClosed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV308: SourceNodeV308HumanApprovalArtifactReviewPacketReference,
  javaV143: JavaV143HumanApprovalArtifactReviewPacketEchoReference,
  miniKvV136: MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference,
  checks: HumanApprovalArtifactReviewUpstreamEchoVerificationChecks,
  verificationState: string,
): HumanApprovalArtifactReviewUpstreamEchoVerification {
  const record = {
    verificationMode: "human-approval-artifact-review-upstream-echo-verification-only" as const,
    sourceSpan: "Node v308 + Java v143 + mini-kv v136" as const,
    sourceNodeV308Ready: checks.sourceNodeV308Ready,
    javaV143EchoReady: checks.javaV143EvidencePresent && checks.javaV143ReadyForNodeV309,
    miniKvV136ReceiptReady: checks.miniKvV136EvidencePresent && checks.miniKvV136ReadyForNodeV309,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    reviewPacketContractAligned: checks.reviewPacketContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceNodeV308PacketDigest: sourceNodeV308.reviewPacketDigest,
      javaEvidenceDigest: javaV143.evidenceFiles.map((file) => file.digest),
      miniKvReceiptDigest: miniKvV136.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: HumanApprovalArtifactReviewUpstreamEchoVerificationChecks,
): HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV308Ready
        && checks.sourceNodeV308RequestsParallelEcho
        && checks.sourceNodeV308ReviewPacketContractComplete,
      code: "NODE_V308_REVIEW_PACKET_NOT_READY",
      source: "node-v308-human-approval-artifact-review-packet",
      message: "Node v308 must define the complete human approval artifact review packet before v309 can verify the upstream echoes.",
    },
    {
      condition:
        checks.javaV143EvidencePresent
        && checks.javaV143EchoesNodeV308Packet
        && checks.javaV143ReadyForNodeV309
        && checks.javaV143ReviewPacketContractEchoed,
      code: "JAVA_V143_ECHO_NOT_READY",
      source: "java-v143-human-approval-artifact-review-packet-echo",
      message: "Java v143 evidence must echo Node v308's human approval artifact review packet and mark itself ready for Node v309 verification.",
    },
    {
      condition:
        checks.miniKvV136EvidencePresent
        && checks.miniKvV136EchoesNodeV308Packet
        && checks.miniKvV136ReadyForNodeV309
        && checks.miniKvV136ReviewPacketContractEchoed,
      code: "MINI_KV_V136_RECEIPT_NOT_READY",
      source: "mini-kv-v136-human-approval-artifact-review-non-participation",
      message: "mini-kv v136 evidence must echo Node v308's human approval artifact review packet and mark itself ready for Node v309 verification.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.reviewPacketContractAligned
        && checks.sideEffectBoundariesAligned
        && checks.javaV143KeepsRuntimeBlocked
        && checks.miniKvV136KeepsRuntimeBlocked,
      code: "HUMAN_APPROVAL_ARTIFACT_REVIEW_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification",
      message: "Java v143 and mini-kv v136 must both echo the Node v308 human approval artifact review packet without opening runtime or side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v309 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v309 upstream echo verification.",
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

function collectWarnings(): HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "HUMAN_APPROVAL_REVIEW_ECHO_DOES_NOT_AUTHORIZE_RUNTIME_SHELL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification",
      message: "v309 proves Java v143 and mini-kv v136 echoed the Node v308 packet; it still does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_NEXT_NODE_ONLY_VERIFICATION_AFTER_V309",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification",
      message: "The next Node step may consume the v309 receipt, but it must still reject credential values, raw endpoint URLs, provider/client config, HTTP/TCP calls, ledger writes, schema migration, mini-kv writes/admin commands, and automatic upstream start.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED_AFTER_V309",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification",
      message: "Do not convert upstream echo alignment into implementation permission; require a separate future packet and explicit approval gates.",
    },
  ];
}

function createSummary(
  sourceNodeV308: SourceNodeV308HumanApprovalArtifactReviewPacketReference,
  javaV143: JavaV143HumanApprovalArtifactReviewPacketEchoReference,
  miniKvV136: MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference,
  checks: HumanApprovalArtifactReviewUpstreamEchoVerificationChecks,
  productionBlockers: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[],
  warnings: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[],
  recommendations: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[],
): HumanApprovalArtifactReviewUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV308CheckCount: sourceNodeV308.summary.checkCount,
    sourceNodeV308PassedCheckCount: sourceNodeV308.summary.passedCheckCount,
    javaEvidenceFileCount: javaV143.evidenceFiles.length,
    javaMatchedSnippetCount: javaV143.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV136.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV136.expectedSnippets.filter((expected) => expected.matched).length,
    requiredFieldCount: sourceNodeV308.reviewPacket.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV308.reviewPacket.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV308.reviewPacket.rejectionReasonCount,
    missingFieldCheckCount: sourceNodeV308.reviewPacket.missingFieldCheckCount,
    noGoBoundaryCount: sourceNodeV308.reviewPacket.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV308.reviewPacket.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
