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
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake.js";
import type {
  SignedHumanApprovalArtifactContractUpstreamEchoVerification,
  SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks,
  SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage,
  SignedHumanApprovalArtifactContractUpstreamEchoVerificationSummary,
  JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile,
  MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference,
  SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification";
const SOURCE_NODE_V314_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake";
const ACTIVE_PLAN = "docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md";

const JAVA_V145_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoSupport.java";
const JAVA_V145_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceSignedHumanApprovalArtifactContractEchoTests.java";
const JAVA_V145_EXPLANATION = "D:/javaproj/advanced-order-platform/d/145/解释/说明.md";
const JAVA_V145_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/147-version-145-signed-human-approval-artifact-contract-echo.md";
const MINI_KV_V138_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-signed-human-approval-artifact-contract-non-participation-receipt.json";
const MINI_KV_V138_EXPLANATION = "D:/C/mini-kv/d/138/解释/说明.md";
const MINI_KV_V138_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/194-version-138-credential-resolver-signed-human-approval-artifact-contract-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile {
  const sourceNodeV314 = createSourceNodeV314(input.config);
  const javaV145 = createJavaV145Reference(sourceNodeV314);
  const miniKvV138 = createMiniKvV138Reference(sourceNodeV314);
  const checks = createChecks(input.config, sourceNodeV314, javaV145, miniKvV138);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification
    ? "signed-human-approval-artifact-contract-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV314, javaV145, miniKvV138, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV314, javaV145, miniKvV138, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver signed human approval artifact contract upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    signedHumanApprovalArtifactContractUpstreamEchoVerificationOnly: true,
    consumesNodeV314SignedHumanApprovalArtifactContractIntake: true,
    consumesJavaV145SignedHumanApprovalArtifactContractIntakeEcho: true,
    consumesMiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v315",
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
    sourceNodeV314,
    upstreamEvidence: { javaV145, miniKvV138 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      signedHumanApprovalArtifactContractUpstreamEchoVerificationJson: ROUTE_PATH,
      signedHumanApprovalArtifactContractUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV314Json: SOURCE_NODE_V314_ROUTE,
      sourceNodeV314Markdown: `${SOURCE_NODE_V314_ROUTE}?format=markdown`,
      javaV145Support: JAVA_V145_SUPPORT,
      javaV145Test: JAVA_V145_TEST,
      javaV145Explanation: JAVA_V145_EXPLANATION,
      javaV145Walkthrough: JAVA_V145_WALKTHROUGH,
      miniKvV138Receipt: MINI_KV_V138_RECEIPT,
      miniKvV138Explanation: MINI_KV_V138_EXPLANATION,
      miniKvV138Walkthrough: MINI_KV_V138_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v315 as the read-only verification that Java v145 and mini-kv v138 echoed the Node v314 signed human approval artifact contract.",
      "Keep disabled runtime shell implementation and invocation blocked after v315; this version only proves the artifact contract was echoed upstream.",
      "The next plan should review whether signed-human-approval-artifact can move from contract-intake-defined to upstream-echo-complete before any next prerequisite starts.",
    ],
  };
}

function createSourceNodeV314(config: AppConfig): SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake({
    config,
  });

  return {
    sourceVersion: "Node v314",
    profileVersion: source.profileVersion,
    contractState: source.contractState,
    readyForArtifactIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake,
    contractDigest: source.signedArtifactContract.contractDigest,
    signedArtifactContract: source.signedArtifactContract,
    prerequisiteTransition: source.prerequisiteTransition,
    checks: source.checks,
    summary: source.summary,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    readyForParallelJavaV145MiniKvV138Echo: source.readyForParallelJavaV145MiniKvV138Echo,
    requiredFieldIds: source.signedArtifactContract.requiredFields.map((field) => field.id),
    prohibitedFieldIds: source.signedArtifactContract.prohibitedFields.map((field) => field.id),
    rejectionReasonCodes: source.signedArtifactContract.rejectionReasons.map((reason) => reason.code),
    noGoBoundaryIds: source.signedArtifactContract.noGoBoundaries.map((boundary) => boundary.id),
    upstreamEchoRequestVersions: source.signedArtifactContract.upstreamEchoRequests.map((request) => request.version),
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

function createJavaV145Reference(
  sourceNodeV314: SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference,
): JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v145-support", JAVA_V145_SUPPORT),
    evidenceFile("java-v145-test", JAVA_V145_TEST),
    evidenceFile("java-v145-explanation", JAVA_V145_EXPLANATION),
    evidenceFile("java-v145-walkthrough", JAVA_V145_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v145-version", JAVA_V145_SUPPORT, "java-v145-signed-human-approval-artifact-contract-echo-only"),
    snippet("java-v145-node-v314", JAVA_V145_TEST, ".isEqualTo(\"Node v314\")"),
    snippet("java-v145-node-v315", JAVA_V145_TEST, ".isEqualTo(\"Node v315\")"),
    snippet("java-v145-upstream-profile", JAVA_V145_TEST, PROFILE_VERSION),
    snippet("java-v145-plan-profile", JAVA_V145_TEST, sourceNodeV314.profileVersion),
    snippet("java-v145-plan-route", JAVA_V145_TEST, SOURCE_NODE_V314_ROUTE),
    snippet("java-v145-plan-state", JAVA_V145_TEST, sourceNodeV314.contractState),
    snippet("java-v145-ready", JAVA_V145_TEST, "readyForNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification()).isTrue()"),
    snippet("java-v145-source-span", JAVA_V145_SUPPORT, "\"Node v314 + Java v144\""),
    snippet("java-v145-required-count", JAVA_V145_TEST, "summary().requiredFieldCount()).isEqualTo(11)"),
    snippet("java-v145-prohibited-count", JAVA_V145_TEST, "summary().prohibitedFieldCount()).isEqualTo(8)"),
    snippet("java-v145-rejection-count", JAVA_V145_TEST, "summary().rejectionReasonCount()).isEqualTo(5)"),
    snippet("java-v145-no-go-count", JAVA_V145_TEST, "summary().noGoBoundaryCount()).isEqualTo(8)"),
    snippet("java-v145-contract-digest", JAVA_V145_TEST, sourceNodeV314.contractDigest),
    snippet("java-v145-required-field", JAVA_V145_TEST, "\"artifact_id\""),
    snippet("java-v145-prohibited-field", JAVA_V145_TEST, "\"credential_value\""),
    snippet("java-v145-rejection-reason", JAVA_V145_TEST, "\"SIGNED_ARTIFACT_MISSING\""),
    snippet("java-v145-no-go-boundary", JAVA_V145_TEST, "\"automatic_upstream_start\""),
    snippet("java-v145-parallel", JAVA_V145_TEST, ".containsExactly(\"Java v145\", \"mini-kv v138\")"),
    snippet("java-v145-necessity", JAVA_V145_TEST, "Java v145 + mini-kv v138, then Node v315"),
    snippet("java-v145-no-runtime", JAVA_V145_SUPPORT, "noRuntimeImplementationEchoed"),
    snippet("java-v145-no-invocation", JAVA_V145_SUPPORT, "noRuntimeInvocationEchoed"),
    snippet("java-v145-no-credential", JAVA_V145_SUPPORT, "noCredentialReadEchoed"),
    snippet("java-v145-no-endpoint", JAVA_V145_SUPPORT, "noRawEndpointParseEchoed"),
    snippet("java-v145-no-provider", JAVA_V145_TEST, "\"provider_client_instantiation\""),
    snippet("java-v145-no-external", JAVA_V145_SUPPORT, "noExternalRequestEchoed"),
    snippet("java-v145-no-write", JAVA_V145_SUPPORT, "noLedgerSqlDeploymentRollbackEchoed"),
    snippet("java-v145-no-minikv", JAVA_V145_SUPPORT, "noSignedArtifactAuthorityEchoed"),
    snippet("java-v145-no-autostart", JAVA_V145_SUPPORT, "noAutoStartBoundaryEchoed"),
    snippet("java-v145-explanation", JAVA_V145_EXPLANATION, "Java v145 adds the read-only echo for the Node v314 signed human approval artifact contract intake."),
    snippet("java-v145-walkthrough", JAVA_V145_WALKTHROUGH, "It consumes the Node v314 signed human approval artifact contract intake"),
  ];

  return {
    sourceVersion: "Java v145",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-signed-human-approval-artifact-contract-echo-receipt.v1",
    echoMode: "java-v145-signed-human-approval-artifact-contract-echo-only",
    sourceSpan: "Node v314",
    nextNodeVersion: "Node v315",
    expectedProfileVersion: PROFILE_VERSION,
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV314Plan:
      snippetMatched(expectedSnippets, "java-v145-node-v314")
      && snippetMatched(expectedSnippets, "java-v145-plan-profile")
      && snippetMatched(expectedSnippets, "java-v145-plan-route")
      && snippetMatched(expectedSnippets, "java-v145-plan-state"),
    readyForNodeV315:
      snippetMatched(expectedSnippets, "java-v145-node-v315")
      && snippetMatched(expectedSnippets, "java-v145-upstream-profile")
      && snippetMatched(expectedSnippets, "java-v145-ready"),
    artifactContractEchoed:
      snippetMatched(expectedSnippets, "java-v145-required-field")
      && snippetMatched(expectedSnippets, "java-v145-prohibited-field")
      && snippetMatched(expectedSnippets, "java-v145-rejection-reason")
      && snippetMatched(expectedSnippets, "java-v145-no-go-boundary")
      && snippetMatched(expectedSnippets, "java-v145-contract-digest"),
    requiredFieldCountEchoed: snippetMatched(expectedSnippets, "java-v145-required-count"),
    prohibitedFieldCountEchoed: snippetMatched(expectedSnippets, "java-v145-prohibited-count"),
    rejectionReasonCountEchoed: snippetMatched(expectedSnippets, "java-v145-rejection-count"),
    noGoBoundaryCountEchoed: snippetMatched(expectedSnippets, "java-v145-no-go-count"),
    upstreamEchoRequestsEchoed: snippetMatched(expectedSnippets, "java-v145-parallel"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v145-necessity"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v145-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v145-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v145-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v145-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v145-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v145-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v145-no-write"),
    noMiniKvWriteOrAuthorityEchoed: snippetMatched(expectedSnippets, "java-v145-no-minikv"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v145-no-autostart"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v145-no-runtime")
      && snippetMatched(expectedSnippets, "java-v145-no-invocation")
      && snippetMatched(expectedSnippets, "java-v145-no-credential")
      && snippetMatched(expectedSnippets, "java-v145-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v145-no-provider")
      && snippetMatched(expectedSnippets, "java-v145-no-external")
      && snippetMatched(expectedSnippets, "java-v145-no-write")
      && snippetMatched(expectedSnippets, "java-v145-no-minikv")
      && snippetMatched(expectedSnippets, "java-v145-no-autostart"),
  };
}

function createMiniKvV138Reference(
  sourceNodeV314: SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference,
): MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v138-receipt", MINI_KV_V138_RECEIPT),
    evidenceFile("mini-kv-v138-explanation", MINI_KV_V138_EXPLANATION),
    evidenceFile("mini-kv-v138-walkthrough", MINI_KV_V138_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v138-consumer", MINI_KV_V138_RECEIPT, "Node v315 signed human approval artifact contract upstream echo verification"),
    snippet("mini-kv-v138-source-node-v314", MINI_KV_V138_RECEIPT, "\"source_version\":\"Node v314\""),
    snippet("mini-kv-v138-plan-profile", MINI_KV_V138_RECEIPT, sourceNodeV314.profileVersion),
    snippet("mini-kv-v138-contract-state", MINI_KV_V138_RECEIPT, sourceNodeV314.contractState),
    snippet("mini-kv-v138-contract-digest", MINI_KV_V138_RECEIPT, sourceNodeV314.contractDigest),
    snippet("mini-kv-v138-ready", MINI_KV_V138_RECEIPT, "\"ready_for_node_v315_signed_human_approval_artifact_contract_upstream_echo_verification\":true"),
    snippet("mini-kv-v138-counts", MINI_KV_V138_RECEIPT, "\"required_field_count\":11"),
    snippet("mini-kv-v138-prohibited", MINI_KV_V138_RECEIPT, "\"prohibited_field_count\":8"),
    snippet("mini-kv-v138-rejections", MINI_KV_V138_RECEIPT, "\"rejection_reason_count\":5"),
    snippet("mini-kv-v138-no-go", MINI_KV_V138_RECEIPT, "\"no_go_boundary_count\":8"),
    snippet("mini-kv-v138-receipt-only", MINI_KV_V138_RECEIPT, "\"signed_human_approval_artifact_contract_non_participation_receipt_only\":true"),
    snippet("mini-kv-v138-read-only", MINI_KV_V138_RECEIPT, "\"read_only_artifact_contract\":true"),
    snippet("mini-kv-v138-no-runtime", MINI_KV_V138_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v138-no-invocation", MINI_KV_V138_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v138-no-credential", MINI_KV_V138_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v138-no-endpoint", MINI_KV_V138_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v138-no-provider", MINI_KV_V138_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v138-no-external", MINI_KV_V138_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v138-no-ledger", MINI_KV_V138_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v138-no-restore", MINI_KV_V138_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v138-no-setnxex", MINI_KV_V138_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v138-not-authority", MINI_KV_V138_RECEIPT, "\"order_authoritative\":false"),
    snippet("mini-kv-v138-explanation", MINI_KV_V138_EXPLANATION, "v138"),
    snippet("mini-kv-v138-walkthrough", MINI_KV_V138_WALKTHROUGH, "Node v315"),
  ];
  const parsed = readJsonObject(MINI_KV_V138_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_signed_human_approval_artifact_contract_non_participation_receipt");
  const sourceNodeV314Reference = objectField(receipt, "source_node_v314_reference");
  const signedArtifactContract = objectField(sourceNodeV314Reference, "signed_artifact_contract");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v138",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV314Plan:
      stringField(sourceNodeV314Reference, "source_version") === "Node v314"
      && stringField(sourceNodeV314Reference, "profile_version") === sourceNodeV314.profileVersion
      && stringField(sourceNodeV314Reference, "contract_state") === sourceNodeV314.contractState
      && stringField(signedArtifactContract, "contract_digest") === sourceNodeV314.contractDigest,
    readyForNodeV315:
      booleanField(receipt, "ready_for_node_v315_signed_human_approval_artifact_contract_upstream_echo_verification") === true,
    sourceNodeV314ProfileVersion: stringField(sourceNodeV314Reference, "profile_version"),
    sourceNodeV314ContractState: stringField(sourceNodeV314Reference, "contract_state"),
    sourceNodeV314ContractDigest: stringField(signedArtifactContract, "contract_digest"),
    requiredFieldCount: numberField(signedArtifactContract, "required_field_count"),
    prohibitedFieldCount: numberField(signedArtifactContract, "prohibited_field_count"),
    rejectionReasonCount: numberField(signedArtifactContract, "rejection_reason_count"),
    noGoBoundaryCount: numberField(signedArtifactContract, "no_go_boundary_count"),
    upstreamEchoRequestCount: numberField(signedArtifactContract, "upstream_echo_request_count"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "signed_human_approval_artifact_contract_non_participation_receipt_only") === true,
    signedHumanApprovalArtifactContractIntakeOnly:
      booleanField(receipt, "signed_human_approval_artifact_contract_intake_only") === true,
    readOnlyArtifactContract: booleanField(receipt, "read_only_artifact_contract") === true,
    consumesNodeV314SignedHumanApprovalArtifactContractIntake:
      booleanField(receipt, "consumes_node_v314_signed_human_approval_artifact_contract_intake") === true,
    consumesNodeV312GovernanceStopPrerequisiteClosureDecision:
      booleanField(receipt, "consumes_node_v312_governance_stop_prerequisite_closure_decision") === true,
    consumesNodeV313PrerequisiteCatalog:
      booleanField(receipt, "consumes_node_v313_prerequisite_catalog") === true,
    readyForNodeV315BeforeUpstreamEcho: booleanField(receipt, "ready_for_node_v315_before_upstream_echo"),
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
  sourceNodeV314: SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference,
  javaV145: JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference,
  miniKvV138: MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference,
): SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks {
  return {
    sourceNodeV314Ready: sourceNodeV314.readyForArtifactIntake,
    sourceNodeV314RequestsParallelEcho:
      sourceNodeV314.readyForParallelJavaV145MiniKvV138Echo
      && sourceNodeV314.nextJavaVersion === "Java v145"
      && sourceNodeV314.nextMiniKvVersion === "mini-kv v138"
      && sourceNodeV314.nextNodeVerificationVersion === "Node v315",
    sourceNodeV314ArtifactContractComplete:
      sourceNodeV314.signedArtifactContract.requiredFieldCount === 11
      && sourceNodeV314.signedArtifactContract.prohibitedFieldCount === 8
      && sourceNodeV314.signedArtifactContract.rejectionReasonCount === 5
      && sourceNodeV314.signedArtifactContract.noGoBoundaryCount === 8
      && sourceNodeV314.upstreamEchoRequestVersions.includes("Java v145")
      && sourceNodeV314.upstreamEchoRequestVersions.includes("mini-kv v138"),
    sourceNodeV314KeepsRuntimeBlocked:
      sourceNodeV314.runtimeShellImplemented === false
      && sourceNodeV314.runtimeShellInvocationAllowed === false
      && sourceNodeV314.executionAllowed === false,
    sourceNodeV314KeepsSideEffectsClosed:
      sourceNodeV314.connectsManagedAudit === false
      && sourceNodeV314.credentialValueRead === false
      && sourceNodeV314.rawEndpointUrlParsed === false
      && sourceNodeV314.externalRequestSent === false
      && sourceNodeV314.schemaMigrationExecuted === false
      && sourceNodeV314.approvalLedgerWritten === false
      && sourceNodeV314.automaticUpstreamStart === false,
    javaV145EvidencePresent: javaV145.evidencePresent && javaV145.verificationDocumented,
    javaV145EchoesNodeV314Plan: javaV145.echoesNodeV314Plan,
    javaV145ReadyForNodeV315: javaV145.readyForNodeV315,
    javaV145ArtifactContractEchoed:
      javaV145.artifactContractEchoed
      && javaV145.requiredFieldCountEchoed
      && javaV145.prohibitedFieldCountEchoed
      && javaV145.rejectionReasonCountEchoed
      && javaV145.noGoBoundaryCountEchoed
      && javaV145.upstreamEchoRequestsEchoed
      && javaV145.necessityProofEchoed,
    javaV145KeepsRuntimeBlocked: javaV145.sideEffectBoundariesClosed,
    miniKvV138EvidencePresent: miniKvV138.evidencePresent && miniKvV138.verificationDocumented,
    miniKvV138EchoesNodeV314Plan: miniKvV138.echoesNodeV314Plan,
    miniKvV138ReadyForNodeV315: miniKvV138.readyForNodeV315,
    miniKvV138ArtifactContractEchoed:
      miniKvV138.requiredFieldCount === sourceNodeV314.signedArtifactContract.requiredFieldCount
      && miniKvV138.prohibitedFieldCount === sourceNodeV314.signedArtifactContract.prohibitedFieldCount
      && miniKvV138.rejectionReasonCount === sourceNodeV314.signedArtifactContract.rejectionReasonCount
      && miniKvV138.noGoBoundaryCount === sourceNodeV314.signedArtifactContract.noGoBoundaryCount
      && miniKvV138.upstreamEchoRequestCount === sourceNodeV314.signedArtifactContract.upstreamEchoRequests.length
      && miniKvV138.signedHumanApprovalArtifactContractIntakeOnly
      && miniKvV138.readOnlyArtifactContract,
    miniKvV138KeepsRuntimeBlocked:
      miniKvV138.nonParticipationReceiptOnly
      && miniKvV138.readyForNodeV315BeforeUpstreamEcho === false
      && miniKvV138.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV145.echoesNodeV314Plan
      && javaV145.readyForNodeV315
      && miniKvV138.echoesNodeV314Plan
      && miniKvV138.readyForNodeV315,
    artifactContractAligned:
      javaV145.artifactContractEchoed
      && miniKvV138.sourceNodeV314ContractDigest === sourceNodeV314.contractDigest
      && miniKvV138.requiredFieldCount === sourceNodeV314.signedArtifactContract.requiredFieldCount
      && miniKvV138.prohibitedFieldCount === sourceNodeV314.signedArtifactContract.prohibitedFieldCount
      && miniKvV138.rejectionReasonCount === sourceNodeV314.signedArtifactContract.rejectionReasonCount
      && miniKvV138.noGoBoundaryCount === sourceNodeV314.signedArtifactContract.noGoBoundaryCount,
    sideEffectBoundariesAligned:
      sourceNodeV314.executionAllowed === false
      && javaV145.sideEffectBoundariesClosed
      && miniKvV138.sideEffectBoundariesClosed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV314: SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference,
  javaV145: JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference,
  miniKvV138: MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference,
  checks: SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks,
  verificationState: string,
): SignedHumanApprovalArtifactContractUpstreamEchoVerification {
  const record = {
    verificationMode: "signed-human-approval-artifact-contract-upstream-echo-verification-only" as const,
    sourceSpan: "Node v314 + Java v145 + mini-kv v138" as const,
    sourceNodeV314Ready: checks.sourceNodeV314Ready,
    javaV145EchoReady: checks.javaV145EvidencePresent && checks.javaV145ReadyForNodeV315,
    miniKvV138ReceiptReady: checks.miniKvV138EvidencePresent && checks.miniKvV138ReadyForNodeV315,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    artifactContractAligned: checks.artifactContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceNodeV314ContractDigest: sourceNodeV314.contractDigest,
      javaEvidenceDigest: javaV145.evidenceFiles.map((file) => file.digest),
      miniKvReceiptDigest: miniKvV138.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks,
): SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV314Ready
        && checks.sourceNodeV314RequestsParallelEcho
        && checks.sourceNodeV314ArtifactContractComplete,
      code: "NODE_V314_CONTRACT_INTAKE_NOT_READY",
      source: "node-v314-signed-human-approval-artifact-contract-intake",
      message: "Node v314 must define the complete artifact contract and explicitly request Java v145 + mini-kv v138 echo before v315.",
    },
    {
      condition: checks.sourceNodeV314KeepsRuntimeBlocked && checks.sourceNodeV314KeepsSideEffectsClosed,
      code: "NODE_V314_BOUNDARY_OPEN",
      source: "node-v314-signed-human-approval-artifact-contract-intake",
      message: "Node v314 must keep runtime shell, credential, endpoint, network, write, schema, and auto-start boundaries closed.",
    },
    {
      condition:
        checks.javaV145EvidencePresent
        && checks.javaV145EchoesNodeV314Plan
        && checks.javaV145ReadyForNodeV315
        && checks.javaV145ArtifactContractEchoed,
      code: "JAVA_V145_ECHO_NOT_READY",
      source: "java-v145-signed-human-approval-artifact-contract-echo",
      message: "Java v145 evidence must echo Node v314's artifact contract and mark itself ready for Node v315 verification.",
    },
    {
      condition:
        checks.miniKvV138EvidencePresent
        && checks.miniKvV138EchoesNodeV314Plan
        && checks.miniKvV138ReadyForNodeV315
        && checks.miniKvV138ArtifactContractEchoed,
      code: "MINI_KV_V138_RECEIPT_NOT_READY",
      source: "mini-kv-v138-signed-human-approval-artifact-contract-non-participation",
      message: "mini-kv v138 evidence must echo Node v314's artifact contract and mark itself ready for Node v315 verification.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.artifactContractAligned
        && checks.sideEffectBoundariesAligned
        && checks.javaV145KeepsRuntimeBlocked
        && checks.miniKvV138KeepsRuntimeBlocked,
      code: "APPROVAL_PREREQUISITE_ARTIFACT_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification",
      message: "Java v145 and mini-kv v138 must both echo the Node v314 signed human approval artifact contract without opening runtime or side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v315 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v315 upstream echo verification.",
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

function collectWarnings(): SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_VERIFICATION_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification",
      message: "v315 proves Java v145 and mini-kv v138 echoed the Node v314 artifact contract; it does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_NEXT_HUMAN_SUPPLIED_APPROVAL_ARTIFACT_REVIEW_PACKET",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification",
      message: "The next Node step may define how a human-supplied approval artifact is reviewed, but must still reject credential values and raw endpoint URLs.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED_AFTER_ECHO_ALIGNMENT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification",
      message: "Do not convert upstream echo alignment into implementation permission; require a separate artifact review packet and explicit approval gates.",
    },
  ];
}

function createSummary(
  sourceNodeV314: SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference,
  javaV145: JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference,
  miniKvV138: MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference,
  checks: SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks,
  productionBlockers: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[],
  warnings: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[],
  recommendations: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[],
): SignedHumanApprovalArtifactContractUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV314CheckCount: sourceNodeV314.summary.checkCount,
    sourceNodeV314PassedCheckCount: sourceNodeV314.summary.passedCheckCount,
    javaEvidenceFileCount: javaV145.evidenceFiles.length,
    javaMatchedSnippetCount: javaV145.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV138.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV138.expectedSnippets.filter((expected) => expected.matched).length,
    requiredFieldCount: sourceNodeV314.signedArtifactContract.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV314.signedArtifactContract.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV314.signedArtifactContract.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV314.signedArtifactContract.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV314.signedArtifactContract.upstreamEchoRequests.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}



