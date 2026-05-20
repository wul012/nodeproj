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
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks,
  CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage,
  JavaV113DisabledImplementationCandidateEchoReceiptReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile,
  MiniKvV120DisabledImplementationCandidateNonParticipationReference,
  SourceNodeV273DisabledImplementationCandidateReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification";
const NODE_V273_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review";
const ACTIVE_PLAN = "docs/plans/v272-post-plan-intake-echo-roadmap.md";

const JAVA_V113_RUNBOOK = "D:/javaproj/advanced-order-platform/c/113/解释/说明.md";
const JAVA_V113_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/116-version-113-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.md";
const JAVA_V113_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptBuilder.java";
const JAVA_V113_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.java";
const JAVA_V113_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords.java";
const JAVA_V113_ECHO_MARKER_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalEchoMarkerSupport.java";
const JAVA_V113_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsEvidenceService.java";

const MINI_KV_V120_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-implementation-candidate-non-participation-receipt.json";
const MINI_KV_V120_RUNBOOK = "D:/C/mini-kv/c/120/解释/说明.md";
const MINI_KV_V120_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/176-version-120-credential-resolver-disabled-implementation-candidate-non-participation-receipt.md";
const MINI_KV_V120_RUNTIME_RECEIPT =
  "D:/C/mini-kv/src/runtime_credential_resolver_disabled_candidate_receipts.cpp";

const BOUNDARY_CODES = [
  "PLAN_DOCUMENT",
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "DISABLED_SECRET_PROVIDER_STUB",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "REDACTION_POLICY",
  "EXTERNAL_REQUEST_SIMULATION",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

const REQUIREMENT_CODES = [
  "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
  "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  "SECRET_PROVIDER_STUB_MISSING",
  "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  "ROLLBACK_BOUNDARY_MISSING",
  "REDACTION_POLICY_MISSING",
  "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
  "SCHEMA_MIGRATION_POLICY_MISSING",
  "AUDIT_LEDGER_WRITE_POLICY_MISSING",
] as const satisfies readonly CredentialResolverPreImplementationRequirementCode[];

const CANDIDATE_READY_BOUNDARY_CODES = [
  "PLAN_DOCUMENT",
  "DISABLED_SECRET_PROVIDER_STUB",
  "REDACTION_POLICY",
  "EXTERNAL_REQUEST_SIMULATION",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile {
  const sourceNodeV273 = createSourceNodeV273(input.config);
  const javaV113 = createJavaV113Reference();
  const miniKvV120 = createMiniKvV120Reference();
  const checks = createChecks(input.config, sourceNodeV273, javaV113, miniKvV120);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification
    ? "credential-resolver-disabled-candidate-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV273CandidateDigest: sourceNodeV273.candidateDigest,
    javaV113ReceiptVersion: javaV113.receiptVersion,
    miniKvV120ReceiptDigest: miniKvV120.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled candidate upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledCandidateEchoVerificationOnly: true,
    readyForDisabledResolverInterfaceCandidate:
      sourceNodeV273.readyForDisabledResolverInterfaceCandidate
      && checks.javaV113EchoReady
      && checks.miniKvV120NonParticipationReady,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV273,
    upstreamEchoes: { javaV113, miniKvV120 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v113-plus-mini-kv-v120-disabled-candidate-upstream-echo-verification-only",
      sourceSpan: "Node v273 + Java v113 + mini-kv v120",
      sourceNodeV273Ready: checks.sourceNodeV273Ready,
      javaV113EchoReady: checks.javaV113EchoReady,
      miniKvV120NonParticipationReady: checks.miniKvV120NonParticipationReady,
      candidateCountsAligned: checks.candidateCountsAligned,
      boundaryScopesAligned:
        checks.boundaryCodesAligned
        && checks.candidateReadyBoundaryCodesAligned
        && checks.approvalRequiredBoundaryCodesAligned,
      interfaceShapeAligned: checks.interfaceShapeAligned,
      fakeWiringAligned: checks.fakeWiringAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      resolverBoundaryAligned: checks.resolverBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      javaEchoWorkflowTemplateApplied: checks.javaEchoWorkflowTemplateApplied,
      nodeV274KeepsRealResolverBlocked: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV113.evidenceFiles.filter((file) => file.exists).length
        + miniKvV120.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV113.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV120.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      sourceCheckCount: sourceNodeV273.checkCount,
      sourcePassedCheckCount: sourceNodeV273.passedCheckCount,
      candidateDecisionCount: sourceNodeV273.candidateDecisionCount,
      candidateReadyDecisionCount: sourceNodeV273.candidateReadyDecisionCount,
      approvalRequiredDecisionCount: sourceNodeV273.approvalRequiredDecisionCount,
      requestFieldCount: sourceNodeV273.requestFields.length,
      responseFieldCount: sourceNodeV273.responseFields.length,
      failureClassCount: sourceNodeV273.failureClasses.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledCandidateUpstreamEchoVerificationJson: ROUTE_PATH,
      disabledCandidateUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV273Json: NODE_V273_ROUTE,
      sourceNodeV273Markdown: `${NODE_V273_ROUTE}?format=markdown`,
      javaV113Runbook: JAVA_V113_RUNBOOK,
      javaV113Walkthrough: JAVA_V113_WALKTHROUGH,
      javaV113Builder: JAVA_V113_BUILDER,
      javaV113Support: JAVA_V113_SUPPORT,
      javaV113Records: JAVA_V113_RECORDS,
      miniKvV120Receipt: MINI_KV_V120_RECEIPT,
      miniKvV120Runbook: MINI_KV_V120_RUNBOOK,
      miniKvV120Walkthrough: MINI_KV_V120_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v274 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Close the v272-derived plan after v274 because Node v273, Java v113, mini-kv v120, and Node v274 complete the sequence.",
      "Write a successor plan before introducing any real credential resolver implementation, credential value reads, raw endpoint parsing, external requests, schema migration, approval ledger writes, or upstream auto-start.",
      "Carry Java v114 as quality context only; it is not a runtime approval signal for Node.",
    ],
  };
}

function createSourceNodeV273(config: AppConfig): SourceNodeV273DisabledImplementationCandidateReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({ config });
  const candidateReadyBoundaryCodes = source.disabledImplementationCandidate.decisions
    .filter((decision) => decision.disposition === "disabled-candidate-ready")
    .map((decision) => decision.code);
  const approvalRequiredBoundaryCodes = source.disabledImplementationCandidate.decisions
    .filter((decision) => decision.disposition === "approval-required")
    .map((decision) => decision.code);

  return {
    sourceVersion: "Node v273",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForDisabledImplementationCandidateReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
    disabledImplementationCandidateReviewOnly: source.disabledImplementationCandidateReviewOnly,
    readOnlyCandidateReview: source.readOnlyCandidateReview,
    readyForDisabledResolverInterfaceCandidate: source.readyForDisabledResolverInterfaceCandidate,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    readyForProductionAudit: source.readyForProductionAudit,
    readyForProductionWindow: source.readyForProductionWindow,
    readyForProductionOperations: source.readyForProductionOperations,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
    sourceNodeV272Ready: source.checks.sourceNodeV272Ready,
    sourceNodeV272KeepsReadOnlyEchoOnly: source.checks.sourceNodeV272KeepsReadOnlyEchoOnly,
    sourceNodeV272KeepsRealResolverBlocked: source.checks.sourceNodeV272KeepsRealResolverBlocked,
    sourceNodeV272KeepsBoundaryAlignment: source.checks.sourceNodeV272KeepsBoundaryAlignment,
    candidateVersion: source.disabledImplementationCandidate.candidateVersion,
    candidateMode: source.disabledImplementationCandidate.candidateMode,
    candidateDigest: source.disabledImplementationCandidate.candidateDigest,
    candidateDecisionCount: source.disabledImplementationCandidate.candidateDecisionCount,
    candidateReadyDecisionCount: source.disabledImplementationCandidate.candidateReadyDecisionCount,
    approvalRequiredDecisionCount: source.disabledImplementationCandidate.approvalRequiredDecisionCount,
    candidateReadyBoundaryCodes,
    approvalRequiredBoundaryCodes,
    boundaryCodes: source.disabledImplementationCandidate.decisions.map((decision) => decision.code),
    requirementCodes: source.disabledImplementationCandidate.decisions.map((decision) => decision.requirementFromV268),
    requestFields: source.disabledImplementationCandidate.interfaceShape.requestFields,
    responseFields: source.disabledImplementationCandidate.interfaceShape.responseFields,
    failureClasses: source.disabledImplementationCandidate.interfaceShape.failureClasses,
    handleOnlyRequest: source.disabledImplementationCandidate.interfaceShape.handleOnlyRequest,
    includesCredentialValue: source.disabledImplementationCandidate.interfaceShape.includesCredentialValue,
    includesRawEndpointUrl: source.disabledImplementationCandidate.interfaceShape.includesRawEndpointUrl,
    fakeWiringReviewOnly: source.disabledImplementationCandidate.fakeWiringReview.fakeWiringReviewOnly,
    fakeRuntimeInstantiated: source.disabledImplementationCandidate.fakeWiringReview.fakeRuntimeInstantiated,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
  };
}

function createJavaV113Reference(): JavaV113DisabledImplementationCandidateEchoReceiptReference {
  const evidenceFiles = [
    evidenceFile("java-v113-runbook", JAVA_V113_RUNBOOK),
    evidenceFile("java-v113-walkthrough", JAVA_V113_WALKTHROUGH),
    evidenceFile("java-v113-builder", JAVA_V113_BUILDER),
    evidenceFile("java-v113-support", JAVA_V113_SUPPORT),
    evidenceFile("java-v113-records", JAVA_V113_RECORDS),
    evidenceFile("java-v113-echo-marker-support", JAVA_V113_ECHO_MARKER_SUPPORT),
    evidenceFile("java-v113-ops-evidence-service", JAVA_V113_EVIDENCE_SERVICE),
  ];
  const expectedSnippets = [
    snippet("java-v113-runbook-node-v273", JAVA_V113_RUNBOOK, "Node v273 disabled implementation candidate review"),
    snippet("java-v113-runbook-node-v274", JAVA_V113_RUNBOOK, "Node v274"),
    snippet("java-v113-receipt-version", JAVA_V113_EVIDENCE_SERVICE, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.v1"),
    snippet("java-v113-profile", JAVA_V113_EVIDENCE_SERVICE, "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1"),
    snippet("java-v113-echo-mode", JAVA_V113_SUPPORT, "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt-only"),
    snippet("java-v113-review-state", JAVA_V113_SUPPORT, "credential-resolver-disabled-implementation-candidate-review-ready"),
    snippet("java-v113-check-count", JAVA_V113_SUPPORT, "static final int CHECK_COUNT = 21"),
    snippet("java-v113-passed-count", JAVA_V113_SUPPORT, "static final int PASSED_CHECK_COUNT = 21"),
    snippet("java-v113-source-count", JAVA_V113_SUPPORT, "static final int SOURCE_CHECK_COUNT = 22"),
    snippet("java-v113-candidate-count", JAVA_V113_SUPPORT, "static final int REQUIRED_BOUNDARY_COUNT = 10"),
    snippet("java-v113-candidate-ready-count", JAVA_V113_SUPPORT, "static final int CANDIDATE_READY_DECISION_COUNT = 4"),
    snippet("java-v113-approval-required-count", JAVA_V113_SUPPORT, "static final int APPROVAL_REQUIRED_DECISION_COUNT = 6"),
    ...BOUNDARY_CODES.map((code) => snippet(`java-v113-boundary-${code}`, JAVA_V113_SUPPORT, code)),
    ...REQUIREMENT_CODES.map((code) => snippet(`java-v113-requirement-${code}`, JAVA_V113_SUPPORT, code)),
    ...CANDIDATE_READY_BOUNDARY_CODES.map((code) => snippet(`java-v113-ready-boundary-${code}`, JAVA_V113_SUPPORT, code)),
    ...APPROVAL_REQUIRED_BOUNDARY_CODES.map((code) => snippet(`java-v113-approval-boundary-${code}`, JAVA_V113_SUPPORT, code)),
    snippet("java-v113-request-fields", JAVA_V113_RECORDS, "List<String> requestFields"),
    snippet("java-v113-response-fields", JAVA_V113_RECORDS, "List<String> responseFields"),
    snippet("java-v113-failure-classes", JAVA_V113_RECORDS, "List<String> failureClasses"),
    snippet("java-v113-handle-only", JAVA_V113_SUPPORT, "candidate.interfaceShape().handleOnlyRequest()"),
    snippet("java-v113-no-credential-value", JAVA_V113_SUPPORT, "!candidate.interfaceShape().includesCredentialValue()"),
    snippet("java-v113-no-raw-endpoint", JAVA_V113_SUPPORT, "!candidate.interfaceShape().includesRawEndpointUrl()"),
    snippet("java-v113-fake-wiring", JAVA_V113_SUPPORT, "fakeWiringReviewOnly"),
    snippet("java-v113-no-fake-runtime", JAVA_V113_SUPPORT, "!candidate.fakeWiringReview().fakeRuntimeInstantiated()"),
    snippet("java-v113-no-connection", JAVA_V113_SUPPORT, "!candidate.externalRequestAllowed()"),
    snippet("java-v113-no-schema", JAVA_V113_SUPPORT, "!candidate.schemaMigrationAllowed()"),
    snippet("java-v113-no-ledger", JAVA_V113_BUILDER, "approvalLedgerWritten=false"),
    snippet("java-v113-no-sql", JAVA_V113_BUILDER, "sqlExecuted"),
    snippet("java-v113-no-auto-start", JAVA_V113_BUILDER, "automaticUpstreamStart=false"),
    snippet("java-v113-ready-for-node-v274", JAVA_V113_RECORDS, "readyForNodeV274CredentialResolverDisabledCandidateVerification"),
    snippet("java-v113-workflow-readiness", JAVA_V113_BUILDER, "workflowReadiness("),
    snippet("java-v113-workflow-step", JAVA_V113_BUILDER, "workflowStep(\"sourceNodeV273Echoed\""),
    snippet("java-v113-workflow-support", JAVA_V113_ECHO_MARKER_SUPPORT, "static EchoWorkflowReadiness workflowReadiness"),
    snippet("java-v113-workflow-template-doc", JAVA_V113_WALKTHROUGH, "echo workflow template"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);

  const reference: JavaV113DisabledImplementationCandidateEchoReceiptReference = {
    sourceVersion: "Java v113",
    tagLabel: "v113订单平台disabled-candidate回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.v1",
    echoMode: snippetMatched(expectedSnippets, "java-v113-echo-mode")
      ? "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt-only"
      : "missing",
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v113-runbook-node-v273") ? "Node v273" : "missing",
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v113-profile")
      ? "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v113-ready-for-node-v274") ? "Node v274" : "missing",
    reviewState: snippetMatched(expectedSnippets, "java-v113-review-state")
      ? "credential-resolver-disabled-implementation-candidate-review-ready"
      : "missing",
    checkCount: snippetMatched(expectedSnippets, "java-v113-check-count") ? 21 : 0,
    passedCheckCount: snippetMatched(expectedSnippets, "java-v113-passed-count") ? 21 : 0,
    sourceCheckCount: snippetMatched(expectedSnippets, "java-v113-source-count") ? 22 : 0,
    sourcePassedCheckCount: snippetMatched(expectedSnippets, "java-v113-source-count") ? 22 : 0,
    candidateDecisionCount: snippetMatched(expectedSnippets, "java-v113-candidate-count") ? 10 : 0,
    candidateReadyDecisionCount: snippetMatched(expectedSnippets, "java-v113-candidate-ready-count") ? 4 : 0,
    approvalRequiredDecisionCount: snippetMatched(expectedSnippets, "java-v113-approval-required-count") ? 6 : 0,
    requestFieldCount: snippetMatched(expectedSnippets, "java-v113-request-fields") ? 6 : 0,
    responseFieldCount: snippetMatched(expectedSnippets, "java-v113-response-fields") ? 7 : 0,
    failureClassCount: snippetMatched(expectedSnippets, "java-v113-failure-classes") ? 6 : 0,
    boundaryCodesEchoed: BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-boundary-${code}`)),
    requirementCodesEchoed: REQUIREMENT_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-requirement-${code}`)),
    candidateReadyBoundaryCodesEchoed:
      CANDIDATE_READY_BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-ready-boundary-${code}`)),
    approvalRequiredBoundaryCodesEchoed:
      APPROVAL_REQUIRED_BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v113-approval-boundary-${code}`)),
    interfaceShapeEchoed:
      snippetMatched(expectedSnippets, "java-v113-handle-only")
      && snippetMatched(expectedSnippets, "java-v113-no-credential-value")
      && snippetMatched(expectedSnippets, "java-v113-no-raw-endpoint"),
    fakeWiringEchoed:
      snippetMatched(expectedSnippets, "java-v113-fake-wiring")
      && snippetMatched(expectedSnippets, "java-v113-no-fake-runtime"),
    sideEffectBoundaryEchoed:
      snippetMatched(expectedSnippets, "java-v113-no-connection")
      && snippetMatched(expectedSnippets, "java-v113-no-schema")
      && snippetMatched(expectedSnippets, "java-v113-no-ledger")
      && snippetMatched(expectedSnippets, "java-v113-no-sql")
      && snippetMatched(expectedSnippets, "java-v113-no-auto-start"),
    echoWorkflowTemplateApplied:
      snippetMatched(expectedSnippets, "java-v113-workflow-readiness")
      && snippetMatched(expectedSnippets, "java-v113-workflow-step")
      && snippetMatched(expectedSnippets, "java-v113-workflow-support")
      && snippetMatched(expectedSnippets, "java-v113-workflow-template-doc"),
    readyForNodeV274Alignment: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    readyForManagedAuditSandboxAdapterConnection: false,
  };
  reference.readyForNodeV274Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.consumedNodeVersion === "Node v273"
    && reference.nextNodeConsumerVersion === "Node v274"
    && reference.reviewState === "credential-resolver-disabled-implementation-candidate-review-ready"
    && reference.boundaryCodesEchoed
    && reference.requirementCodesEchoed
    && reference.candidateReadyBoundaryCodesEchoed
    && reference.approvalRequiredBoundaryCodesEchoed
    && reference.interfaceShapeEchoed
    && reference.fakeWiringEchoed
    && reference.sideEffectBoundaryEchoed
    && reference.echoWorkflowTemplateApplied;

  return reference;
}

function createMiniKvV120Reference(): MiniKvV120DisabledImplementationCandidateNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v120-receipt", MINI_KV_V120_RECEIPT),
    evidenceFile("mini-kv-v120-runbook", MINI_KV_V120_RUNBOOK),
    evidenceFile("mini-kv-v120-walkthrough", MINI_KV_V120_WALKTHROUGH),
    evidenceFile("mini-kv-v120-runtime-receipt", MINI_KV_V120_RUNTIME_RECEIPT),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v120-consumer", MINI_KV_V120_RECEIPT, "Node v274 credential resolver disabled candidate upstream echo verification"),
    snippet("mini-kv-v120-release", MINI_KV_V120_RECEIPT, "\"release_version\":\"v120\""),
    snippet("mini-kv-v120-profile", MINI_KV_V120_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1"),
    snippet("mini-kv-v120-review-state", MINI_KV_V120_RECEIPT, "credential-resolver-disabled-implementation-candidate-review-ready"),
    snippet("mini-kv-v120-candidate-count", MINI_KV_V120_RECEIPT, "\"candidate_decision_count\":10"),
    snippet("mini-kv-v120-candidate-ready-count", MINI_KV_V120_RECEIPT, "\"candidate_ready_decision_count\":4"),
    snippet("mini-kv-v120-approval-count", MINI_KV_V120_RECEIPT, "\"approval_required_decision_count\":6"),
    snippet("mini-kv-v120-handle-only", MINI_KV_V120_RECEIPT, "\"handle_only_request\":true"),
    snippet("mini-kv-v120-no-credential", MINI_KV_V120_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v120-no-raw", MINI_KV_V120_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v120-no-resolver", MINI_KV_V120_RECEIPT, "\"credential_resolver_implemented\":false"),
    snippet("mini-kv-v120-no-client", MINI_KV_V120_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v120-no-secret", MINI_KV_V120_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v120-no-external", MINI_KV_V120_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v120-no-write", MINI_KV_V120_RECEIPT, "\"storage_write_allowed\":false"),
    snippet("mini-kv-v120-no-ledger", MINI_KV_V120_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v120-no-schema", MINI_KV_V120_RECEIPT, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v120-no-restore", MINI_KV_V120_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v120-no-setnxex", MINI_KV_V120_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v120-walkthrough", MINI_KV_V120_WALKTHROUGH, "后续 Node v274 能确认"),
    snippet("mini-kv-v120-runtime-function", MINI_KV_V120_RUNTIME_RECEIPT, "credential_resolver_disabled_implementation_candidate_non_participation_receipt"),
  ];
  const root = readJsonObject(MINI_KV_V120_RECEIPT);
  const receipt = objectField(root, "credential_resolver_disabled_implementation_candidate_non_participation_receipt");
  const sourceNodeV272 = objectField(receipt, "source_node_v272_reference");
  const candidate = objectField(receipt, "disabled_implementation_candidate");
  const interfaceShape = objectField(candidate, "interface_shape");
  const fakeWiring = objectField(candidate, "fake_wiring_review");
  const summary = objectField(receipt, "summary");

  const reference: MiniKvV120DisabledImplementationCandidateNonParticipationReference = {
    sourceVersion: "mini-kv v120",
    tagLabel: "第一百二十版禁用候选非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourceReviewState: stringField(receipt, "source_review_state"),
    sourceReadyForDisabledImplementationCandidateReview:
      booleanField(receipt, "source_ready_for_disabled_implementation_candidate_review"),
    sourceDisabledImplementationCandidateReviewOnly:
      booleanField(receipt, "source_disabled_implementation_candidate_review_only"),
    sourceReadOnlyCandidateReview: booleanField(receipt, "source_read_only_candidate_review"),
    sourceReadyForDisabledResolverInterfaceCandidate:
      booleanField(receipt, "source_ready_for_disabled_resolver_interface_candidate"),
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection"),
    sourceRealResolverImplementationAllowed: booleanField(receipt, "source_real_resolver_implementation_allowed"),
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed"),
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit"),
    sourceReadsManagedAuditCredential: booleanField(receipt, "source_reads_managed_audit_credential"),
    sourceStoresManagedAuditCredential: booleanField(receipt, "source_stores_managed_audit_credential"),
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read"),
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed"),
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent"),
    sourceSecretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated"),
    sourceResolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated"),
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed"),
    sourceApprovalLedgerWritten: booleanField(receipt, "source_approval_ledger_written"),
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start"),
    sourceNodeV272Ready: booleanField(sourceNodeV272, "ready_for_plan_intake_upstream_echo_verification"),
    sourceNodeV272Digest: stringField(sourceNodeV272, "verification_digest"),
    sourceNodeV272BoundaryCodes: stringArrayField(sourceNodeV272, "boundary_codes"),
    sourceNodeV272RequirementCodes: stringArrayField(sourceNodeV272, "requirement_codes"),
    candidateVersion: stringField(candidate, "candidate_version"),
    candidateMode: stringField(candidate, "candidate_mode"),
    candidateDigest: stringField(candidate, "candidate_digest"),
    candidateDecisionCount: numberField(candidate, "candidate_decision_count"),
    candidateReadyDecisionCount: numberField(candidate, "candidate_ready_decision_count"),
    approvalRequiredDecisionCount: numberField(candidate, "approval_required_decision_count"),
    candidateReadyBoundaryCodes: stringArrayField(candidate, "candidate_ready_boundary_codes"),
    approvalRequiredBoundaryCodes: stringArrayField(candidate, "approval_required_boundary_codes"),
    requestFieldCount: numberField(interfaceShape, "request_field_count"),
    responseFieldCount: numberField(interfaceShape, "response_field_count"),
    failureClassCount: numberField(interfaceShape, "failure_class_count"),
    handleOnlyRequest: booleanField(interfaceShape, "handle_only_request"),
    includesCredentialValue: booleanField(interfaceShape, "includes_credential_value"),
    includesRawEndpointUrl: booleanField(interfaceShape, "includes_raw_endpoint_url"),
    sendsExternalRequest: booleanField(interfaceShape, "sends_external_request"),
    instantiatesSecretProvider: booleanField(interfaceShape, "instantiates_secret_provider"),
    instantiatesResolverClient: booleanField(interfaceShape, "instantiates_resolver_client"),
    fakeWiringReviewOnly: booleanField(fakeWiring, "fake_wiring_review_only"),
    fakeRuntimeInstantiated: booleanField(fakeWiring, "fake_runtime_instantiated"),
    realSecretProviderAllowed: booleanField(fakeWiring, "real_secret_provider_allowed"),
    realManagedAuditTransportAllowed: booleanField(fakeWiring, "real_managed_audit_transport_allowed"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    sourceCheckCount: numberField(summary, "source_check_count"),
    sourcePassedCheckCount: numberField(summary, "source_passed_check_count"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
    warningCount: numberField(summary, "warning_count"),
    recommendationCount: numberField(summary, "recommendation_count"),
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    disabledImplementationCandidateReviewOnly: booleanField(receipt, "disabled_implementation_candidate_review_only"),
    readOnlyCandidateReview: booleanField(receipt, "read_only_candidate_review"),
    receiptOnly: booleanField(receipt, "credential_resolver_disabled_implementation_candidate_non_participation_receipt_only"),
    readyForDisabledResolverInterfaceCandidate: booleanField(receipt, "ready_for_disabled_resolver_interface_candidate"),
    readyForManagedAuditSandboxAdapterConnection: booleanField(receipt, "ready_for_managed_audit_sandbox_adapter_connection"),
    realResolverImplementationAllowed: booleanField(receipt, "real_resolver_implementation_allowed"),
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
    secretProviderRuntimeAllowed: booleanField(receipt, "secret_provider_runtime_allowed"),
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed"),
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded"),
    credentialValueStored: booleanField(receipt, "credential_value_stored"),
    credentialValueIncluded: booleanField(receipt, "credential_value_included"),
    rawEndpointUrlParseAllowed: booleanField(receipt, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included"),
    externalRequestAllowed: booleanField(receipt, "external_request_allowed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    readsManagedAuditCredential: booleanField(receipt, "reads_managed_audit_credential"),
    storesManagedAuditCredential: booleanField(receipt, "stores_managed_audit_credential"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    writeCommandsExecuted: booleanField(receipt, "write_commands_executed"),
    adminCommandsExecuted: booleanField(receipt, "admin_commands_executed"),
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed"),
    schemaMigrationAllowed: booleanField(receipt, "schema_migration_allowed"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    automaticUpstreamStartAllowed: booleanField(receipt, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    readyForNodeV274Alignment: false,
  };
  reference.readyForNodeV274Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v120"
    && reference.consumerHint === "Node v274 credential resolver disabled candidate upstream echo verification";

  return reference;
}

function createChecks(
  config: AppConfig,
  sourceNodeV273: SourceNodeV273DisabledImplementationCandidateReviewReference,
  javaV113: JavaV113DisabledImplementationCandidateEchoReceiptReference,
  miniKvV120: MiniKvV120DisabledImplementationCandidateNonParticipationReference,
): CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks {
  return {
    sourceNodeV273Ready:
      sourceNodeV273.reviewState === "credential-resolver-disabled-implementation-candidate-review-ready"
      && sourceNodeV273.readyForDisabledImplementationCandidateReview
      && sourceNodeV273.sourceNodeV272Ready
      && sourceNodeV273.sourceNodeV272KeepsReadOnlyEchoOnly
      && sourceNodeV273.sourceNodeV272KeepsRealResolverBlocked
      && sourceNodeV273.sourceNodeV272KeepsBoundaryAlignment,
    sourceNodeV273KeepsReviewOnly:
      sourceNodeV273.disabledImplementationCandidateReviewOnly
      && sourceNodeV273.readOnlyCandidateReview,
    sourceNodeV273KeepsRealResolverBlocked:
      !sourceNodeV273.realResolverImplementationAllowed
      && !sourceNodeV273.connectsManagedAudit
      && !sourceNodeV273.externalRequestSent
      && !sourceNodeV273.resolverClientInstantiated
      && !sourceNodeV273.secretProviderInstantiated,
    sourceNodeV273KeepsBoundaryAlignment:
      sourceNodeV273.candidateDecisionCount === BOUNDARY_CODES.length
      && sourceNodeV273.candidateReadyDecisionCount === CANDIDATE_READY_BOUNDARY_CODES.length
      && sourceNodeV273.approvalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && arrayEquals(sourceNodeV273.boundaryCodes, [...BOUNDARY_CODES])
      && arrayEquals(sourceNodeV273.requirementCodes, [...REQUIREMENT_CODES]),
    javaV113EchoReady: javaV113.readyForNodeV274Alignment,
    miniKvV120NonParticipationReady: miniKvV120.readyForNodeV274Alignment,
    candidateCountsAligned:
      javaV113.checkCount === sourceNodeV273.checkCount
      && miniKvV120.checkCount === sourceNodeV273.checkCount
      && javaV113.passedCheckCount === sourceNodeV273.passedCheckCount
      && miniKvV120.passedCheckCount === sourceNodeV273.passedCheckCount
      && javaV113.sourceCheckCount === sourceNodeV273.sourceCheckCount
      && miniKvV120.sourceCheckCount === sourceNodeV273.sourceCheckCount
      && javaV113.candidateDecisionCount === sourceNodeV273.candidateDecisionCount
      && miniKvV120.candidateDecisionCount === sourceNodeV273.candidateDecisionCount
      && javaV113.candidateReadyDecisionCount === sourceNodeV273.candidateReadyDecisionCount
      && miniKvV120.candidateReadyDecisionCount === sourceNodeV273.candidateReadyDecisionCount
      && javaV113.approvalRequiredDecisionCount === sourceNodeV273.approvalRequiredDecisionCount
      && miniKvV120.approvalRequiredDecisionCount === sourceNodeV273.approvalRequiredDecisionCount,
    boundaryCodesAligned:
      javaV113.boundaryCodesEchoed
      && arrayEquals(sourceNodeV273.boundaryCodes, [...BOUNDARY_CODES])
      && arrayEquals(miniKvV120.sourceNodeV272BoundaryCodes, [...BOUNDARY_CODES]),
    candidateReadyBoundaryCodesAligned:
      javaV113.candidateReadyBoundaryCodesEchoed
      && arrayEquals(sourceNodeV273.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES])
      && arrayEquals(miniKvV120.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES]),
    approvalRequiredBoundaryCodesAligned:
      javaV113.approvalRequiredBoundaryCodesEchoed
      && arrayEquals(sourceNodeV273.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES])
      && arrayEquals(miniKvV120.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES]),
    interfaceShapeAligned:
      javaV113.interfaceShapeEchoed
      && miniKvV120.requestFieldCount === sourceNodeV273.requestFields.length
      && miniKvV120.responseFieldCount === sourceNodeV273.responseFields.length
      && miniKvV120.failureClassCount === sourceNodeV273.failureClasses.length
      && miniKvV120.handleOnlyRequest === true
      && miniKvV120.includesCredentialValue === false
      && miniKvV120.includesRawEndpointUrl === false
      && miniKvV120.sendsExternalRequest === false
      && miniKvV120.instantiatesSecretProvider === false
      && miniKvV120.instantiatesResolverClient === false,
    fakeWiringAligned:
      javaV113.fakeWiringEchoed
      && sourceNodeV273.fakeWiringReviewOnly
      && !sourceNodeV273.fakeRuntimeInstantiated
      && miniKvV120.fakeWiringReviewOnly === true
      && miniKvV120.fakeRuntimeInstantiated === false
      && miniKvV120.realSecretProviderAllowed === false
      && miniKvV120.realManagedAuditTransportAllowed === false,
    credentialBoundaryAligned:
      !sourceNodeV273.readsManagedAuditCredential
      && !sourceNodeV273.storesManagedAuditCredential
      && !sourceNodeV273.credentialValueRead
      && !javaV113.credentialValueRead
      && miniKvV120.sourceReadsManagedAuditCredential === false
      && miniKvV120.sourceStoresManagedAuditCredential === false
      && miniKvV120.sourceCredentialValueRead === false
      && miniKvV120.credentialValueReadAllowed === false
      && miniKvV120.credentialValueLoaded === false
      && miniKvV120.credentialValueStored === false
      && miniKvV120.credentialValueIncluded === false,
    rawEndpointBoundaryAligned:
      !sourceNodeV273.rawEndpointUrlParsed
      && !javaV113.rawEndpointUrlParsed
      && miniKvV120.sourceRawEndpointUrlParsed === false
      && miniKvV120.rawEndpointUrlParseAllowed === false
      && miniKvV120.rawEndpointUrlParsed === false
      && miniKvV120.rawEndpointUrlIncluded === false,
    resolverBoundaryAligned:
      !sourceNodeV273.resolverClientInstantiated
      && !sourceNodeV273.secretProviderInstantiated
      && !javaV113.resolverClientInstantiated
      && !javaV113.secretProviderInstantiated
      && miniKvV120.credentialResolverImplemented === false
      && miniKvV120.credentialResolverInvoked === false
      && miniKvV120.resolverClientInstantiated === false
      && miniKvV120.secretProviderInstantiated === false
      && miniKvV120.secretProviderRuntimeAllowed === false,
    connectionBoundaryAligned:
      !sourceNodeV273.connectsManagedAudit
      && !sourceNodeV273.externalRequestSent
      && !javaV113.connectsManagedAudit
      && !javaV113.externalRequestSent
      && miniKvV120.connectsManagedAudit === false
      && miniKvV120.externalRequestAllowed === false
      && miniKvV120.externalRequestSent === false
      && miniKvV120.readyForManagedAuditSandboxAdapterConnection === false,
    writeBoundaryAligned:
      !sourceNodeV273.executionAllowed
      && !sourceNodeV273.schemaMigrationExecuted
      && !sourceNodeV273.approvalLedgerWritten
      && !javaV113.approvalLedgerWritten
      && !javaV113.sqlExecuted
      && !javaV113.schemaMigrationExecuted
      && miniKvV120.executionAllowed === false
      && miniKvV120.storageWriteAllowed === false
      && miniKvV120.writeCommandsExecuted === false
      && miniKvV120.adminCommandsExecuted === false
      && miniKvV120.approvalLedgerWriteAllowed === false
      && miniKvV120.approvalLedgerWritten === false
      && miniKvV120.managedAuditWriteExecuted === false
      && miniKvV120.schemaMigrationAllowed === false
      && miniKvV120.schemaMigrationExecuted === false
      && miniKvV120.restoreExecutionAllowed === false
      && miniKvV120.loadRestoreCompactExecuted === false
      && miniKvV120.setnxexExecutionAllowed === false
      && miniKvV120.managedAuditStorageBackend === false
      && miniKvV120.auditAuthoritative === false
      && miniKvV120.orderAuthoritative === false,
    autoStartBoundaryAligned:
      !sourceNodeV273.automaticUpstreamStart
      && !javaV113.automaticUpstreamStart
      && miniKvV120.automaticUpstreamStartAllowed === false
      && miniKvV120.automaticUpstreamStart === false,
    javaEchoWorkflowTemplateApplied: javaV113.echoWorkflowTemplateApplied,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks,
): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV273Ready,
      code: "SOURCE_NODE_V273_NOT_READY",
      source: "node-v273-credential-resolver-disabled-implementation-candidate-review",
      message: "Node v273 disabled implementation candidate review must be ready before v274 verifies upstream echoes.",
    },
    {
      condition: checks.javaV113EchoReady,
      code: "JAVA_V113_ECHO_NOT_READY",
      source: "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt",
      message: "Java v113 must echo Node v273 disabled candidate boundaries before v274 can proceed.",
    },
    {
      condition: checks.miniKvV120NonParticipationReady,
      code: "MINI_KV_V120_RECEIPT_NOT_READY",
      source: "mini-kv-v120-credential-resolver-disabled-implementation-candidate-non-participation-receipt",
      message: "mini-kv v120 must prove disabled-candidate non-participation before v274 can proceed.",
    },
    {
      condition: checks.candidateCountsAligned,
      code: "CANDIDATE_COUNTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Node v273, Java v113, and mini-kv v120 must agree on 21/21 checks, 10 decisions, 4 disabled-ready, and 6 approval-required boundaries.",
    },
    {
      condition: checks.candidateReadyBoundaryCodesAligned && checks.approvalRequiredBoundaryCodesAligned,
      code: "CANDIDATE_SCOPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "The four disabled-ready and six approval-required boundary scopes must align across Node, Java, and mini-kv.",
    },
    {
      condition: checks.interfaceShapeAligned,
      code: "INTERFACE_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "The disabled resolver candidate interface must remain handle-only and exclude credential values and raw endpoint URLs.",
    },
    {
      condition: checks.fakeWiringAligned,
      code: "FAKE_WIRING_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Fake wiring must remain review-only and must not instantiate runtime resolver, secret provider, or transport components.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Credential value reads, loads, stores, and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryAligned,
      code: "RAW_ENDPOINT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Managed audit connections and external requests must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.javaEchoWorkflowTemplateApplied,
      code: "JAVA_ECHO_WORKFLOW_TEMPLATE_MISSING",
      source: "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt",
      message: "Java v113 should show the echo workflow template optimization so later echo receipts do not keep copying 600-800 lines.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v274 disabled candidate upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v274 disabled candidate upstream echo verification.",
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

function collectWarnings(): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "DISABLED_CANDIDATE_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Node v274 verifies Java v113 and mini-kv v120 understanding of Node v273; it does not implement a real credential resolver.",
    },
    {
      code: "JAVA_V114_IS_QUALITY_CONTEXT_ONLY",
      severity: "warning",
      source: "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt",
      message: "Java v114 verification-hint catalog split is useful quality context, but it is not a runtime approval signal for Node.",
    },
  ];
}

function collectRecommendations(): CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_V274_AND_CLOSE_V272_DERIVED_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Archive v274 and close the v272-derived plan because Node v273, Java v113, mini-kv v120, and Node v274 complete the sequence.",
    },
    {
      code: "WRITE_SUCCESSOR_PLAN_BEFORE_RUNTIME_RESOLVER",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Write a successor plan before moving from disabled candidate echo verification toward any real resolver shell or adapter behavior.",
    },
  ];
}

function arrayEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
