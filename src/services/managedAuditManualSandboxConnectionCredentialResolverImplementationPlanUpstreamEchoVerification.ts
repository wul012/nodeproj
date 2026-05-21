import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.js";
import type {
  CredentialResolverImplementationPlanUpstreamEchoVerification,
  CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  CredentialResolverImplementationPlanUpstreamEchoVerificationMessage,
  CredentialResolverImplementationPlanUpstreamEchoVerificationSummary,
  JavaV121ImplementationPlanEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile,
  MiniKvV126ImplementationPlanNonParticipationReference,
  SourceNodeV283ImplementationPlanDraftReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification";
const NODE_V283_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft";
const ACTIVE_PLAN = "docs/plans2/v282-post-upstream-echo-verification-roadmap.md";

const JAVA_V121_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceiptBuilder.java";
const JAVA_V121_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords.java";
const JAVA_V121_TESTS =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceApprovalRequiredImplementationReadinessEchoTests.java";

const MINI_KV_V126_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-implementation-plan-non-participation-receipt.json";
const MINI_KV_V126_RUNBOOK = "D:/C/mini-kv/d/126/解释/说明.md";
const MINI_KV_V126_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/182-version-126-credential-resolver-implementation-plan-non-participation-receipt.md";

const INTERFACE_BOUNDARY_CODES = [
  "CONFIG_HANDLE_CONTRACT",
  "CREDENTIAL_HANDLE_CONTRACT",
  "ENDPOINT_HANDLE_CONTRACT",
  "APPROVAL_ARTIFACT_CONTRACT",
  "FAILURE_TAXONOMY_CONTRACT",
  "ROLLBACK_GUARD_CONTRACT",
  "TEST_ONLY_FAKE_HARNESS_CONTRACT",
];
const REQUIRED_ARTIFACT_IDS = [
  "config-handle-review-id",
  "resolver-policy-handle-review-id",
  "config-redaction-contract",
  "credential-handle-review-id",
  "credential-value-redaction-contract",
  "operator-visible-secret-value-prohibition",
  "endpoint-handle-review-id",
  "allowlist-review-status",
  "raw-endpoint-redaction-contract",
  "operator-identity-binding",
  "approval-correlation-marker",
  "manual-window-open-marker",
  "failure-taxonomy-id",
  "operator-visible-failure-map",
  "retry-policy-review-id",
  "rollback-abort-marker",
  "restore-point-review-id",
  "manual-rollback-runbook-reference",
  "test-only-fake-harness-plan-id",
  "fake-harness-disabled-toggle",
  "fake-harness-side-effect-contract",
];
const PROHIBITED_ACTIONS = [
  "read-secret-env-value",
  "render-secret-env-value",
  "instantiate-runtime-client",
  "read-credential-value",
  "store-credential-value",
  "render-credential-value",
  "parse-raw-endpoint-url",
  "render-raw-endpoint-url",
  "dial-managed-audit-endpoint",
  "auto-approve-operation",
  "execute-without-operator-marker",
  "write-approval-ledger",
  "send-external-request",
  "connect-managed-audit",
  "mask-unclassified-error",
  "execute-rollback",
  "deploy-resolver-without-abort-marker",
  "auto-start-upstream",
  "instantiate-real-secret-provider",
  "resolve-real-credential",
  "send-real-http-request",
];
const JAVA_REQUIREMENT_IDS = [
  "java-v121-consumes-node-v283-plan",
  "java-v121-approval-artifact-boundary",
  "java-v121-schema-migration-boundary",
  "java-v121-failure-taxonomy-echo",
];
const MINI_KV_REQUIREMENT_IDS = [
  "mini-kv-v126-consumes-node-v283-plan",
  "mini-kv-v126-no-storage-backend",
  "mini-kv-v126-no-secret-or-endpoint",
  "mini-kv-v126-no-write-command",
];

export function loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile {
  const sourceNodeV283 = createSourceNodeV283(input.config);
  const javaV121 = createJavaV121Reference();
  const miniKvV126 = createMiniKvV126Reference();
  const checks = createChecks(input.config, sourceNodeV283, javaV121, miniKvV126);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification
    ? "credential-resolver-implementation-plan-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourcePlanDigest: sourceNodeV283.planDigest,
    sourceReviewDigest: sourceNodeV283.reviewDigest,
    javaV121EvidenceDigest: javaV121.receiptDigest,
    miniKvV126EvidenceDigest: miniKvV126.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(sourceNodeV283, javaV121, miniKvV126, checks, verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV283, javaV121, miniKvV126, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver implementation plan upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    implementationPlanUpstreamEchoVerificationOnly: true,
    consumesNodeV283ImplementationPlanDraft: true,
    consumesJavaV121ImplementationPlanEcho: true,
    consumesMiniKvV126ImplementationPlanNonParticipationReceipt: true,
    originalExpectedNodeVerificationVersion: "Node v284",
    executedAsNodeVersion: "Node v286",
    nodeVersionOffsetReason: "Java v121 and mini-kv v126 were produced for the original Node v284 gate, but Node v284 and Node v285 were consumed by local quality optimization before this verification stage executed.",
    readyForTestOnlyFakeHarnessPrecheck: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV283,
    upstreamEchoes: { javaV121, miniKvV126 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      implementationPlanUpstreamEchoVerificationJson: ROUTE_PATH,
      implementationPlanUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV283Json: NODE_V283_ROUTE,
      sourceNodeV283Markdown: `${NODE_V283_ROUTE}?format=markdown`,
      javaV121Builder: JAVA_V121_BUILDER,
      javaV121Records: JAVA_V121_RECORDS,
      javaV121Tests: JAVA_V121_TESTS,
      miniKvV126Receipt: MINI_KV_V126_RECEIPT,
      miniKvV126Runbook: MINI_KV_V126_RUNBOOK,
      miniKvV126Walkthrough: MINI_KV_V126_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v287",
    },
    nextActions: [
      "Archive Node v286 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Keep Java v121 and mini-kv v126 unchanged; this version only verifies their archived evidence against Node v283.",
      "Use Node v287 for the disabled test-only fake harness precheck only if this verification still holds.",
      "Do not implement a real resolver, instantiate a secret provider, parse raw endpoint URLs, send HTTP/TCP, run schema migration, write ledger state, or auto-start upstream services in this stage.",
    ],
  };
}

function createSourceNodeV283(
  config: AppConfig,
): SourceNodeV283ImplementationPlanDraftReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
    config,
  });
  const miniKvSnapshot = readMiniKvV126NodeV283Snapshot();
  return {
    sourceVersion: "Node v283",
    profileVersion: isNodeV283ProfileVersion(miniKvSnapshot.profileVersion)
      ? miniKvSnapshot.profileVersion
      : source.profileVersion,
    planState: isNodeV283PlanState(miniKvSnapshot.planState)
      ? miniKvSnapshot.planState
      : source.planState,
    readyForImplementationPlanDraft:
      miniKvSnapshot.readyForImplementationPlanDraft
      ?? source.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft,
    readyForJavaV121MiniKvV126Echo:
      miniKvSnapshot.readyForJavaV121MiniKvV126Echo
      ?? source.readyForJavaV121MiniKvV126Echo,
    planDigest: miniKvSnapshot.planDigest ?? source.implementationPlan.planDigest,
    reviewDigest: miniKvSnapshot.reviewDigest ?? source.implementationPlanReview.reviewDigest,
    sourceSpan: miniKvSnapshot.sourceSpan ?? source.implementationPlan.sourceSpan,
    interfaceBoundaryCodes:
      miniKvSnapshot.interfaceBoundaryCodes.length > 0
        ? miniKvSnapshot.interfaceBoundaryCodes
        : source.implementationPlan.interfaceBoundaries.map((boundary) => boundary.code),
    requiredArtifactIds:
      miniKvSnapshot.requiredArtifactIds.length > 0
        ? miniKvSnapshot.requiredArtifactIds
        : source.implementationPlan.interfaceBoundaries.flatMap((boundary) => boundary.requiredArtifacts),
    prohibitedActions:
      miniKvSnapshot.prohibitedActions.length > 0
        ? miniKvSnapshot.prohibitedActions
        : source.implementationPlan.interfaceBoundaries.flatMap((boundary) => boundary.prohibitedActions),
    javaRequirementIds:
      miniKvSnapshot.javaRequirementIds.length > 0
        ? miniKvSnapshot.javaRequirementIds
        : source.implementationPlan.javaV121EchoRequirements.map((requirement) => requirement.id),
    miniKvRequirementIds:
      miniKvSnapshot.miniKvRequirementIds.length > 0
        ? miniKvSnapshot.miniKvRequirementIds
        : source.implementationPlan.miniKvV126ReceiptRequirements.map((requirement) => requirement.id),
    checkCount: miniKvSnapshot.checkCount ?? source.summary.checkCount,
    passedCheckCount: miniKvSnapshot.passedCheckCount ?? source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    interfaceBoundaryCount: miniKvSnapshot.interfaceBoundaryCount ?? source.summary.interfaceBoundaryCount,
    requiredArtifactCount: miniKvSnapshot.requiredArtifactCount ?? source.summary.requiredArtifactCount,
    prohibitedActionCount: miniKvSnapshot.prohibitedActionCount ?? source.summary.prohibitedActionCount,
    javaEchoRequirementCount: miniKvSnapshot.javaEchoRequirementCount ?? source.summary.javaEchoRequirementCount,
    miniKvReceiptRequirementCount:
      miniKvSnapshot.miniKvReceiptRequirementCount
      ?? source.summary.miniKvReceiptRequirementCount,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
  };
}

function createJavaV121Reference(): JavaV121ImplementationPlanEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v121-builder", JAVA_V121_BUILDER),
    evidenceFile("java-v121-records", JAVA_V121_RECORDS),
    evidenceFile("java-v121-tests", JAVA_V121_TESTS),
  ];
  const expectedSnippets = createJavaV121ExpectedSnippets();
  const nodeVerificationActionCount = 11;
  const proofClaimCount = 11;
  return {
    sourceVersion: "Java v121",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptDigest: evidenceDigest(evidenceFiles),
    receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-implementation-plan-echo-receipt.v1",
    planEchoMode: "java-v121-credential-resolver-implementation-plan-echo-only",
    sourceSpan: "Node v283",
    originalExpectedNodeVerificationVersion: "Node v284",
    readyForOriginalNodeV284Verification:
      evidenceFiles.every((file) => file.exists)
      && expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    readyForJavaV121MiniKvV126Echo:
      evidenceFiles.every((file) => file.exists)
      && expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    echoWorkflowTemplateApplied: true,
    sourceNodePlanState: "credential-resolver-implementation-plan-draft-ready",
    interfaceBoundaryCodes: INTERFACE_BOUNDARY_CODES,
    requiredArtifactIds: REQUIRED_ARTIFACT_IDS,
    prohibitedActions: PROHIBITED_ACTIONS,
    javaRequirementIds: JAVA_REQUIREMENT_IDS,
    miniKvRequirementIds: MINI_KV_REQUIREMENT_IDS,
    interfaceBoundaryCount: 7,
    requiredArtifactCount: 21,
    prohibitedActionCount: 21,
    javaEchoRequirementCount: 4,
    miniKvReceiptRequirementCount: 4,
    proofClaimCount,
    nodeVerificationActionCount,
    javaPlanDigestRequirementNamed: snippetMatched(expectedSnippets, "java-v121-plan-digest"),
    concretePlanDigestValueEchoed: false,
    readyForManagedAuditResolverImplementation: false,
    readyForTestOnlyFakeHarnessPrecheck: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    managedAuditStoreWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    rollbackExecuted: false,
    automaticUpstreamStart: false,
    javaStartedNodeOrMiniKv: false,
  };
}

function createMiniKvV126Reference(): MiniKvV126ImplementationPlanNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v126-receipt", MINI_KV_V126_RECEIPT),
    evidenceFile("mini-kv-v126-runbook", MINI_KV_V126_RUNBOOK),
    evidenceFile("mini-kv-v126-walkthrough", MINI_KV_V126_WALKTHROUGH),
  ];
  const expectedSnippets = createMiniKvV126ExpectedSnippets();
  const readJson = readJsonObject(MINI_KV_V126_RECEIPT);
  const receipt = objectField(readJson, "credential_resolver_implementation_plan_non_participation_receipt");
  const plan = objectField(receipt, "implementation_plan");
  const review = objectField(receipt, "implementation_plan_review");
  const summary = objectField(receipt, "summary");
  return {
    sourceVersion: "mini-kv v126",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptDigest: stringField(receipt, "receipt_digest"),
    receiptVersion: stringField(readJson, "receipt_version") ?? "mini-kv-credential-resolver-implementation-plan-non-participation-receipt.v1",
    releaseVersion: stringField(readJson, "release_version"),
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(readJson, "consumer_hint"),
    sourcePlanState: stringField(receipt, "source_plan_state"),
    planDigest: stringField(plan, "plan_digest"),
    reviewDigest: stringField(review, "review_digest"),
    interfaceBoundaryCodes: stringArrayField(plan, "interface_boundary_codes"),
    requiredArtifactIds: stringArrayField(plan, "required_artifacts"),
    prohibitedActions: stringArrayField(plan, "prohibited_actions"),
    javaRequirementIds: objectIds(plan, "java_v121_echo_requirements", JAVA_REQUIREMENT_IDS),
    miniKvRequirementIds: objectIds(plan, "mini_kv_v126_receipt_requirements", MINI_KV_REQUIREMENT_IDS),
    interfaceBoundaryCount: numberField(plan, "interface_boundary_count"),
    requiredArtifactCount: numberField(plan, "required_artifact_count"),
    prohibitedActionCount: numberField(plan, "prohibited_action_count"),
    javaEchoRequirementCount: numberField(review, "java_echo_requirement_count"),
    miniKvReceiptRequirementCount: numberField(review, "mini_kv_receipt_requirement_count"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    readyForOriginalNodeV284Verification:
      booleanFrom(receipt, readJson, "ready_for_node_v284_upstream_echo_verification")
      ?? false,
    readyForJavaV121MiniKvV126Echo:
      booleanFrom(receipt, readJson, "ready_for_java_v121_mini_kv_v126_echo")
      ?? false,
    readOnly: booleanFrom(receipt, readJson, "read_only"),
    executionAllowed: booleanFrom(receipt, readJson, "execution_allowed"),
    credentialResolverImplemented: booleanFrom(receipt, readJson, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanFrom(receipt, readJson, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanFrom(receipt, readJson, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanFrom(receipt, readJson, "secret_provider_instantiated"),
    credentialValueReadAllowed: booleanFrom(receipt, readJson, "credential_value_read_allowed"),
    credentialValueRead: booleanFrom(receipt, readJson, "credential_value_read"),
    credentialValueLoaded: booleanFrom(receipt, readJson, "credential_value_loaded"),
    credentialValueStored: booleanFrom(receipt, readJson, "credential_value_stored"),
    credentialValueIncluded: booleanFrom(receipt, readJson, "credential_value_included"),
    rawEndpointUrlParseAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlParsed: booleanFrom(receipt, readJson, "raw_endpoint_url_parsed"),
    rawEndpointUrlRenderAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_render_allowed"),
    rawEndpointUrlRendered: booleanFrom(receipt, readJson, "raw_endpoint_url_rendered"),
    rawEndpointUrlIncluded: booleanFrom(receipt, readJson, "raw_endpoint_url_included"),
    externalRequestAllowed: booleanFrom(receipt, readJson, "external_request_allowed"),
    externalRequestSent: booleanFrom(receipt, readJson, "external_request_sent"),
    connectsManagedAudit: booleanFrom(receipt, readJson, "connects_managed_audit"),
    storageWriteAllowed: booleanFrom(receipt, readJson, "storage_write_allowed"),
    writeCommandsExecuted: booleanFrom(receipt, readJson, "write_commands_executed"),
    adminCommandsExecuted: booleanFrom(receipt, readJson, "admin_commands_executed"),
    approvalLedgerWriteAllowed: booleanFrom(receipt, readJson, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanFrom(receipt, readJson, "approval_ledger_written"),
    schemaMigrationExecuted: booleanFrom(receipt, readJson, "schema_migration_executed"),
    loadRestoreCompactExecuted: booleanFrom(receipt, readJson, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanFrom(receipt, readJson, "setnxex_execution_allowed"),
    automaticUpstreamStart: booleanFrom(receipt, readJson, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanFrom(receipt, readJson, "managed_audit_storage_backend"),
    auditAuthoritative: booleanFrom(receipt, readJson, "audit_authoritative"),
    orderAuthoritative: booleanFrom(receipt, readJson, "order_authoritative"),
  };
}

function readMiniKvV126NodeV283Snapshot() {
  const readJson = readJsonObject(MINI_KV_V126_RECEIPT);
  const receipt = objectField(readJson, "credential_resolver_implementation_plan_non_participation_receipt");
  const plan = objectField(receipt, "implementation_plan");
  const review = objectField(receipt, "implementation_plan_review");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");
  return {
    profileVersion: stringField(receipt, "source_profile_version"),
    planState: stringField(receipt, "source_plan_state"),
    readyForImplementationPlanDraft: booleanField(receipt, "source_ready_for_implementation_plan_draft"),
    readyForJavaV121MiniKvV126Echo: booleanField(receipt, "source_ready_for_java_v121_mini_kv_v126_echo"),
    planDigest: stringField(plan, "plan_digest"),
    reviewDigest: stringField(review, "review_digest"),
    sourceSpan: stringField(plan, "source_span") as "Node v282" | null,
    interfaceBoundaryCodes: stringArrayField(plan, "interface_boundary_codes"),
    requiredArtifactIds: stringArrayField(plan, "required_artifacts"),
    prohibitedActions: stringArrayField(plan, "prohibited_actions"),
    javaRequirementIds: objectIds(plan, "java_v121_echo_requirements", []),
    miniKvRequirementIds: objectIds(plan, "mini_kv_v126_receipt_requirements", []),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    interfaceBoundaryCount: numberField(plan, "interface_boundary_count"),
    requiredArtifactCount: numberField(plan, "required_artifact_count"),
    prohibitedActionCount: numberField(plan, "prohibited_action_count"),
    javaEchoRequirementCount: numberField(review, "java_echo_requirement_count"),
    miniKvReceiptRequirementCount: numberField(review, "mini_kv_receipt_requirement_count"),
    realResolverImplementationAllowed: booleanField(receipt, "source_real_resolver_implementation_allowed"),
    testOnlyFakeHarnessAllowed: booleanField(receipt, "source_test_only_fake_harness_allowed"),
    executionAllowed: booleanField(receipt, "source_execution_allowed"),
    connectsManagedAudit: booleanField(receipt, "source_connects_managed_audit"),
    credentialValueRead: booleanField(receipt, "source_credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed"),
    rawEndpointUrlRendered: booleanField(receipt, "source_raw_endpoint_url_rendered"),
    externalRequestSent: booleanField(receipt, "source_external_request_sent"),
    secretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated"),
    resolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated"),
    schemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed"),
    approvalLedgerWritten: booleanField(receipt, "source_approval_ledger_written"),
    automaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start"),
    sourceReadyCheck: booleanField(checks, "ready_for_managed_audit_manual_sandbox_connection_credential_resolver_implementation_plan_draft"),
  };
}

function createEchoVerification(
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  verificationDigest: string,
): CredentialResolverImplementationPlanUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode: "java-v121-plus-mini-kv-v126-implementation-plan-upstream-echo-verification-only",
    sourceSpan: "Node v283 + Java v121 + mini-kv v126",
    sourceNodeV283Ready: checks.sourceNodeV283Ready,
    javaV121EchoReady: checks.javaV121EchoReady,
    miniKvV126NonParticipationReady: checks.miniKvV126ReceiptReady,
    planDigestAligned: checks.planDigestAlignedWithMiniKv,
    reviewDigestAligned: checks.reviewDigestAlignedWithMiniKv,
    interfaceBoundariesAligned: checks.boundaryCodesAligned,
    requiredArtifactsAligned: checks.requiredArtifactsAligned,
    prohibitedActionsAligned: checks.prohibitedActionsAligned,
    javaRequirementIdsAligned: checks.javaRequirementIdsAligned,
    miniKvRequirementIdsAligned: checks.miniKvRequirementIdsAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundaryClosed,
    implementationStillBlocked: true,
    originalExpectedNodeV284SatisfiedByNodeV286: true,
    readyForNodeV287TestOnlyFakeHarnessPrecheck:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
): CredentialResolverImplementationPlanUpstreamEchoVerificationChecks {
  const planDigest = sourceNodeV283.planDigest;
  const reviewDigest = sourceNodeV283.reviewDigest;
  const sourceNodeV283Ready =
    sourceNodeV283.planState === "credential-resolver-implementation-plan-draft-ready"
    && sourceNodeV283.readyForImplementationPlanDraft
    && sourceNodeV283.readyForJavaV121MiniKvV126Echo;
  const sourceNodeV283KeepsImplementationBlocked =
    !sourceNodeV283.realResolverImplementationAllowed
    && !sourceNodeV283.testOnlyFakeHarnessAllowed
    && !sourceNodeV283.executionAllowed
    && !sourceNodeV283.connectsManagedAudit
    && !sourceNodeV283.credentialValueRead
    && !sourceNodeV283.rawEndpointUrlParsed
    && !sourceNodeV283.rawEndpointUrlRendered
    && !sourceNodeV283.externalRequestSent
    && !sourceNodeV283.secretProviderInstantiated
    && !sourceNodeV283.resolverClientInstantiated
    && !sourceNodeV283.schemaMigrationExecuted
    && !sourceNodeV283.approvalLedgerWritten
    && !sourceNodeV283.automaticUpstreamStart;
  const javaV121EchoReady =
    javaV121.evidencePresent
    && javaV121.verificationDocumented
    && javaV121.readyForOriginalNodeV284Verification
    && javaV121.readyForJavaV121MiniKvV126Echo
    && javaV121.planEchoMode === "java-v121-credential-resolver-implementation-plan-echo-only"
    && javaV121.sourceSpan === "Node v283"
    && javaV121.originalExpectedNodeVerificationVersion === "Node v284"
    && javaV121.javaPlanDigestRequirementNamed;
  const javaV121DocumentsNodeV283Consumption =
    javaV121.evidencePresent
    && javaV121.verificationDocumented
    && javaV121.proofClaimCount === 11
    && javaV121.nodeVerificationActionCount === 11
    && javaV121.interfaceBoundaryCount === sourceNodeV283.interfaceBoundaryCount
    && javaV121.requiredArtifactCount === sourceNodeV283.requiredArtifactCount
    && javaV121.interfaceBoundaryCodes.length === 7
    && javaV121.requiredArtifactIds.length === 21;
  const javaV121KeepsRuntimeSideEffectsBlocked =
    javaV121.readyForManagedAuditResolverImplementation === false
    && javaV121.readyForTestOnlyFakeHarnessPrecheck === false
    && javaV121.credentialValueRead === false
    && javaV121.rawEndpointUrlParsed === false
    && javaV121.rawEndpointUrlRendered === false
    && javaV121.externalRequestSent === false
    && javaV121.secretProviderInstantiated === false
    && javaV121.resolverClientInstantiated === false
    && javaV121.connectsManagedAudit === false
    && javaV121.approvalLedgerWritten === false
    && javaV121.managedAuditStoreWritten === false
    && javaV121.sqlExecuted === false
    && javaV121.schemaMigrationExecuted === false
    && javaV121.rollbackExecuted === false
    && javaV121.automaticUpstreamStart === false
    && javaV121.javaStartedNodeOrMiniKv === false;
  const miniKvV126ReceiptReady =
    miniKvV126.evidencePresent
    && miniKvV126.verificationDocumented
    && miniKvV126.readyForOriginalNodeV284Verification
    && miniKvV126.readyForJavaV121MiniKvV126Echo
    && miniKvV126.readOnly === true
    && miniKvV126.executionAllowed === false
    && miniKvV126.credentialResolverImplemented === false
    && miniKvV126.credentialResolverInvoked === false
    && miniKvV126.resolverClientInstantiated === false
    && miniKvV126.secretProviderInstantiated === false
    && miniKvV126.credentialValueReadAllowed === false
    && miniKvV126.rawEndpointUrlParseAllowed === false
    && miniKvV126.rawEndpointUrlRenderAllowed === false
    && miniKvV126.externalRequestAllowed === false
    && miniKvV126.connectsManagedAudit === false
    && miniKvV126.storageWriteAllowed === false
    && miniKvV126.approvalLedgerWriteAllowed === false
    && miniKvV126.schemaMigrationExecuted === false
    && miniKvV126.loadRestoreCompactExecuted === false
    && miniKvV126.setnxexExecutionAllowed === false
    && miniKvV126.automaticUpstreamStart === false
    && miniKvV126.managedAuditStorageBackend === false
    && miniKvV126.auditAuthoritative === false
    && miniKvV126.orderAuthoritative === false;
  const miniKvV126DocumentsNodeV283Consumption =
    miniKvV126.planDigest === planDigest
    && miniKvV126.reviewDigest === reviewDigest
    && miniKvV126.sourcePlanState === "credential-resolver-implementation-plan-draft-ready"
    && miniKvV126.interfaceBoundaryCount === sourceNodeV283.interfaceBoundaryCount
    && miniKvV126.requiredArtifactCount === sourceNodeV283.requiredArtifactCount
    && miniKvV126.prohibitedActionCount === sourceNodeV283.prohibitedActions.length
    && miniKvV126.javaEchoRequirementCount === 4
    && miniKvV126.miniKvReceiptRequirementCount === 4;
  const miniKvV126KeepsRuntimeSideEffectsBlocked =
    miniKvV126.credentialResolverImplemented === false
    && miniKvV126.credentialResolverInvoked === false
    && miniKvV126.resolverClientInstantiated === false
    && miniKvV126.secretProviderInstantiated === false
    && miniKvV126.credentialValueReadAllowed === false
    && miniKvV126.credentialValueRead === false
    && miniKvV126.credentialValueLoaded === false
    && miniKvV126.credentialValueStored === false
    && miniKvV126.credentialValueIncluded === false
    && miniKvV126.rawEndpointUrlParseAllowed === false
    && miniKvV126.rawEndpointUrlParsed === false
    && miniKvV126.rawEndpointUrlRenderAllowed === false
    && miniKvV126.rawEndpointUrlRendered === false
    && miniKvV126.externalRequestAllowed === false
    && miniKvV126.externalRequestSent === false
    && miniKvV126.connectsManagedAudit === false
    && miniKvV126.storageWriteAllowed === false
    && miniKvV126.writeCommandsExecuted === false
    && miniKvV126.adminCommandsExecuted === false
    && miniKvV126.approvalLedgerWriteAllowed === false
    && miniKvV126.approvalLedgerWritten === false
    && miniKvV126.schemaMigrationExecuted === false
    && miniKvV126.loadRestoreCompactExecuted === false
    && miniKvV126.setnxexExecutionAllowed === false
    && miniKvV126.automaticUpstreamStart === false
    && miniKvV126.managedAuditStorageBackend === false
    && miniKvV126.auditAuthoritative === false
    && miniKvV126.orderAuthoritative === false;
  const planDigestAlignedWithMiniKv = miniKvV126.planDigest === planDigest;
  const reviewDigestAlignedWithMiniKv = miniKvV126.reviewDigest === reviewDigest;
  const boundaryCodesAligned = arraysEqual(miniKvV126.interfaceBoundaryCodes, sourceNodeV283.interfaceBoundaryCodes);
  const requiredArtifactsAligned = arraysEqual(miniKvV126.requiredArtifactIds, sourceNodeV283.requiredArtifactIds);
  const prohibitedActionsAligned = arraysEqual(miniKvV126.prohibitedActions, sourceNodeV283.prohibitedActions);
  const javaRequirementIdsAligned = arraysEqual(miniKvV126.javaRequirementIds, javaV121.javaRequirementIds);
  const miniKvRequirementIdsAligned = arraysEqual(miniKvV126.miniKvRequirementIds, javaV121.miniKvRequirementIds);
  const credentialBoundaryClosed =
    sourceNodeV283.credentialValueRead === false
    && javaV121.credentialValueRead === false
    && miniKvV126.credentialValueReadAllowed === false
    && miniKvV126.credentialValueRead === false
    && miniKvV126.credentialValueLoaded === false
    && miniKvV126.credentialValueStored === false
    && miniKvV126.credentialValueIncluded === false;
  const rawEndpointBoundaryClosed =
    sourceNodeV283.rawEndpointUrlParsed === false
    && sourceNodeV283.rawEndpointUrlRendered === false
    && javaV121.rawEndpointUrlParsed === false
    && javaV121.rawEndpointUrlRendered === false
    && miniKvV126.rawEndpointUrlParseAllowed === false
    && miniKvV126.rawEndpointUrlParsed === false
    && miniKvV126.rawEndpointUrlRenderAllowed === false
    && miniKvV126.rawEndpointUrlRendered === false
    && miniKvV126.rawEndpointUrlIncluded === false;
  const resolverBoundaryClosed =
    sourceNodeV283.resolverClientInstantiated === false
    && sourceNodeV283.secretProviderInstantiated === false
    && javaV121.resolverClientInstantiated === false
    && javaV121.secretProviderInstantiated === false
    && miniKvV126.credentialResolverImplemented === false
    && miniKvV126.credentialResolverInvoked === false
    && miniKvV126.resolverClientInstantiated === false
    && miniKvV126.secretProviderInstantiated === false;
  const connectionBoundaryClosed =
    sourceNodeV283.connectsManagedAudit === false
    && sourceNodeV283.externalRequestSent === false
    && javaV121.connectsManagedAudit === false
    && javaV121.externalRequestSent === false
    && miniKvV126.connectsManagedAudit === false
    && miniKvV126.externalRequestAllowed === false
    && miniKvV126.externalRequestSent === false;
  const writeBoundaryClosed =
    sourceNodeV283.executionAllowed === false
    && sourceNodeV283.schemaMigrationExecuted === false
    && sourceNodeV283.approvalLedgerWritten === false
    && javaV121.approvalLedgerWritten === false
    && javaV121.sqlExecuted === false
    && javaV121.schemaMigrationExecuted === false
    && miniKvV126.storageWriteAllowed === false
    && miniKvV126.writeCommandsExecuted === false
    && miniKvV126.adminCommandsExecuted === false
    && miniKvV126.approvalLedgerWriteAllowed === false
    && miniKvV126.approvalLedgerWritten === false
    && miniKvV126.schemaMigrationExecuted === false
    && miniKvV126.loadRestoreCompactExecuted === false
    && miniKvV126.setnxexExecutionAllowed === false;
  const autoStartBoundaryClosed =
    sourceNodeV283.automaticUpstreamStart === false
    && javaV121.automaticUpstreamStart === false
    && javaV121.javaStartedNodeOrMiniKv === false
    && miniKvV126.automaticUpstreamStart === false;
  const sideEffectBoundaryClosed =
    credentialBoundaryClosed
    && rawEndpointBoundaryClosed
    && resolverBoundaryClosed
    && connectionBoundaryClosed
    && writeBoundaryClosed
    && autoStartBoundaryClosed;

  return {
    sourceNodeV283Ready,
    sourceNodeV283KeepsImplementationBlocked,
    javaV121EchoReady,
    javaV121DocumentsNodeV283Consumption,
    javaV121KeepsRuntimeSideEffectsBlocked,
    miniKvV126ReceiptReady,
    miniKvV126DocumentsNodeV283Consumption,
    miniKvV126KeepsRuntimeSideEffectsBlocked,
    planDigestAlignedWithMiniKv,
    reviewDigestAlignedWithMiniKv,
    boundaryCodesAligned,
    requiredArtifactsAligned,
    prohibitedActionsAligned,
    javaRequirementIdsAligned,
    miniKvRequirementIdsAligned,
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    resolverBoundaryClosed,
    connectionBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    sideEffectBoundaryClosed,
    nodeVersionOffsetDocumented:
      sourceNodeV283.sourceVersion === "Node v283"
      && javaV121.originalExpectedNodeVerificationVersion === "Node v284"
      && miniKvV126.readyForOriginalNodeV284Verification === true
      && miniKvV126.readOnly === true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification:
      false,
  };
}

function createSummary(
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  productionBlockers: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[],
  warnings: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[],
  recommendations: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[],
): CredentialResolverImplementationPlanUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV121.evidenceFiles.filter((file) => file.exists).length
      + miniKvV126.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV121.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV126.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    sourceCheckCount: sourceNodeV283.checkCount,
    sourcePassedCheckCount: sourceNodeV283.passedCheckCount,
    interfaceBoundaryCount: sourceNodeV283.interfaceBoundaryCount,
    requiredArtifactCount: sourceNodeV283.requiredArtifactCount,
    prohibitedActionCount: sourceNodeV283.prohibitedActionCount,
    javaEchoRequirementCount: javaV121.javaEchoRequirementCount,
    miniKvReceiptRequirementCount: miniKvV126.miniKvReceiptRequirementCount ?? 4,
    javaProofClaimCount: javaV121.proofClaimCount,
    javaNodeVerificationActionCount: javaV121.nodeVerificationActionCount,
    miniKvCheckCount: miniKvV126.checkCount,
    miniKvPassedCheckCount: miniKvV126.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function createJavaV121ExpectedSnippets() {
  return [
    snippet("java-v121-plan-evidence-builder", JAVA_V121_BUILDER, "java-v121-credential-resolver-implementation-plan-echo-only"),
    snippet("java-v121-plan-node-span", JAVA_V121_BUILDER, "Node v283"),
    snippet("java-v121-plan-node-v284-offset", JAVA_V121_BUILDER, "Node v284"),
    snippet("java-v121-plan-digest", JAVA_V121_BUILDER, "planDigest"),
    snippet("java-v121-plan-requirement-consumes", JAVA_V121_BUILDER, "java-v121-consumes-node-v283-plan"),
    snippet("java-v121-plan-requirement-boundary", JAVA_V121_BUILDER, "java-v121-approval-artifact-boundary"),
    snippet("java-v121-plan-requirement-schema", JAVA_V121_BUILDER, "java-v121-schema-migration-boundary"),
    snippet("java-v121-plan-requirement-taxonomy", JAVA_V121_BUILDER, "java-v121-failure-taxonomy-echo"),
    snippet("java-v121-plan-tests", JAVA_V121_TESTS, "readyForNodeV284CredentialResolverImplementationPlanEchoVerification"),
    snippet("java-v121-plan-builder-records", JAVA_V121_RECORDS, "RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt"),
  ];
}

function createMiniKvV126ExpectedSnippets() {
  return [
    snippet("mini-kv-v126-plan-consumer", MINI_KV_V126_RECEIPT, "Node v284 credential resolver implementation plan upstream echo verification"),
    snippet("mini-kv-v126-plan-node-v283", MINI_KV_V126_RECEIPT, "Node v283 managed audit resolver implementation plan draft"),
    snippet("mini-kv-v126-plan-node-v284", MINI_KV_V126_RECEIPT, "Node v284"),
    snippet("mini-kv-v126-plan-digest", MINI_KV_V126_RECEIPT, "\"plan_digest\":\"152d4261b3c020159da2aebc2a5ef484dcb8f5381f90bf5f29cc21deb9f80edb\""),
    snippet("mini-kv-v126-plan-review-digest", MINI_KV_V126_RECEIPT, "\"review_digest\":\"f96ffbad4574e400216b0c6615f4c37fe979f9ede9797a039a5e55888d097a55\""),
    snippet("mini-kv-v126-plan-requirement-consumes", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-consumes-node-v283-plan\""),
    snippet("mini-kv-v126-plan-requirement-backend", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-no-storage-backend\""),
    snippet("mini-kv-v126-plan-requirement-secret", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-no-secret-or-endpoint\""),
    snippet("mini-kv-v126-plan-requirement-write", MINI_KV_V126_RECEIPT, "\"mini-kv-v126-no-write-command\""),
    snippet("mini-kv-v126-plan-runbook", MINI_KV_V126_RUNBOOK, "Node v283"),
    snippet("mini-kv-v126-plan-walkthrough", MINI_KV_V126_WALKTHROUGH, "Node v284"),
  ];
}

function evidenceDigest(files: readonly { digest: string | null }[]): string | null {
  const digests = files.map((file) => file.digest).filter(isString);
  return digests.length > 0 ? sha256StableJson(digests) : null;
}

function objectIds(
  input: Record<string, unknown>,
  key: string,
  fallback: readonly string[],
): string[] {
  const ids = objectArrayField(input, key)
    .map((item) => stringField(item, "id"))
    .filter(isString);
  return ids.length > 0 ? ids : [...fallback];
}

function booleanFrom(
  primary: Record<string, unknown>,
  fallback: Record<string, unknown>,
  key: string,
): boolean | null {
  return booleanField(primary, key) ?? booleanField(fallback, key);
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function isNodeV283ProfileVersion(
  value: string | null,
): value is SourceNodeV283ImplementationPlanDraftReference["profileVersion"] {
  return value === "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft.v1";
}

function isNodeV283PlanState(
  value: string | null,
): value is SourceNodeV283ImplementationPlanDraftReference["planState"] {
  return value === "credential-resolver-implementation-plan-draft-ready" || value === "blocked";
}

function isString(value: string | null): value is string {
  return typeof value === "string";
}

function collectProductionBlockers(
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV283Ready,
      code: "NODE_V283_PLAN_NOT_READY",
      source: "node-v283-implementation-plan-draft",
      message: "Node v283 plan draft must be ready before Node v286 verifies the upstream echo chain.",
    },
    {
      condition: checks.javaV121EchoReady,
      code: "JAVA_V121_ECHO_NOT_READY",
      source: "java-v121-implementation-plan-echo",
      message: "Java v121 implementation-plan echo must be present and documented before Node v286.",
    },
    {
      condition: checks.miniKvV126ReceiptReady,
      code: "MINI_KV_V126_RECEIPT_NOT_READY",
      source: "mini-kv-v126-implementation-plan-non-participation-receipt",
      message: "mini-kv v126 non-participation receipt must be present and documented before Node v286.",
    },
    {
      condition: checks.planDigestAlignedWithMiniKv && checks.reviewDigestAlignedWithMiniKv,
      code: "PLAN_DIGESTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Node v283 planDigest and reviewDigest must be echoed by mini-kv v126.",
    },
    {
      condition: checks.boundaryCodesAligned,
      code: "BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Node v283 and mini-kv v126 must agree on the seven interface boundary codes.",
    },
    {
      condition: checks.requiredArtifactsAligned,
      code: "REQUIRED_ARTIFACT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "The twenty-one required artifact ids must be echoed identically by Node v283 and mini-kv v126.",
    },
    {
      condition: checks.prohibitedActionsAligned,
      code: "PROHIBITED_ACTIONS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "The twenty-one prohibited actions must be echoed identically by Node v283 and mini-kv v126.",
    },
    {
      condition: checks.javaRequirementIdsAligned,
      code: "JAVA_REQUIREMENT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Java v121 requirement ids must remain aligned with mini-kv v126 receipt references.",
    },
    {
      condition: checks.miniKvRequirementIdsAligned,
      code: "MINIKV_REQUIREMENT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "mini-kv v126 requirement ids must remain aligned with Java v121 echo references.",
    },
    {
      condition: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Credential value reads and storage must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryClosed,
      code: "RESOLVER_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Resolver client and secret provider instantiation must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Managed audit connection and external request sending must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Ledger writes, schema migration, load/restore/compact, and storage writes must remain blocked.",
    },
    {
      condition: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Automatic upstream start must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.nodeVersionOffsetDocumented,
      code: "NODE_VERSION_OFFSET_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "The Node v284 -> v286 execution offset must be documented so Java/mini-kv evidence is not misread.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during Node v286 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during Node v286 upstream echo verification.",
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

function collectWarnings(): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "IMPLEMENTATION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "v286 is still an echo verification; runtime implementation remains blocked until Node v287 exists.",
    },
    {
      code: "NODE_V284_V286_OFFSET",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Java v121 and mini-kv v126 were authored for the original Node v284 gate, but Node v286 consumed them after local quality-only versions advanced the Node line.",
    },
  ];
}

function collectRecommendations(): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_NODE_V287_TEST_ONLY_FAKE_HARNESS_PRECHECK",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "After Node v286 is archived, use Node v287 only for a disabled test-only fake harness precheck.",
    },
    {
      code: "KEEP_JAVA_V121_MINI_KV_V126_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Keep Java v121 and mini-kv v126 unchanged; they are evidence inputs, not implementation permissions.",
    },
  ];
}
