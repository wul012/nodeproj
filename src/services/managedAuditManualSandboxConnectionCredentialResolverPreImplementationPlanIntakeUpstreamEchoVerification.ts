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
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationChecks,
  CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage,
  JavaV112PreImplementationPlanIntakeEchoReceiptReference,
  ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationProfile,
  MiniKvV119PreImplementationPlanIntakeNonParticipationReference,
  SourceNodeV270PreImplementationPlanIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification";
const NODE_V270_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake";
const ACTIVE_PLAN = "docs/plans/v269-post-blocked-decision-upstream-echo-roadmap.md";

const JAVA_V112_RUNBOOK = "D:/javaproj/advanced-order-platform/c/112/解释/说明.md";
const JAVA_V112_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/115-version-112-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.md";
const JAVA_V112_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptBuilder.java";
const JAVA_V112_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.java";
const JAVA_V112_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords.java";
const JAVA_V112_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsEvidenceService.java";

const MINI_KV_V119_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-pre-implementation-plan-intake-non-participation-receipt.json";
const MINI_KV_V119_RUNBOOK = "D:/C/mini-kv/c/119/解释/说明.md";
const MINI_KV_V119_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/175-version-119-credential-resolver-pre-implementation-plan-intake-non-participation-receipt.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationProfile {
  const sourceNodeV270 = createSourceNodeV270(input.config);
  const javaV112 = createJavaV112Reference();
  const miniKvV119 = createMiniKvV119Reference();
  const checks = createChecks(input.config, sourceNodeV270, javaV112, miniKvV119);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification
    ? "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV270PlanDigest: sourceNodeV270.planDigest,
    nodeV270IntakeDigest: sourceNodeV270.intakeDigest,
    javaV112ReceiptVersion: javaV112.receiptVersion,
    miniKvV119ReceiptDigest: miniKvV119.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver pre-implementation plan intake upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    planIntakeEchoVerificationOnly: true,
    readyForCredentialResolverPreImplementationPlan: sourceNodeV270.readyForCredentialResolverPreImplementationPlan,
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
    sourceNodeV270,
    upstreamEchoes: { javaV112, miniKvV119 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v112-plus-mini-kv-v119-plan-intake-upstream-echo-verification-only",
      sourceSpan: "Node v270 + Java v112 + mini-kv v119",
      sourceNodeV270Ready: checks.sourceNodeV270Ready,
      javaV112EchoReady: checks.javaV112EchoReady,
      miniKvV119NonParticipationReady: checks.miniKvV119NonParticipationReady,
      planIntakeStateAligned: checks.planIntakeStateAligned,
      planCountsAligned: checks.planCountsAligned,
      boundaryCodesAligned: checks.boundaryCodesAligned,
      requirementCodesAligned: checks.requirementCodesAligned,
      planIntakeVersionsAligned: checks.planIntakeVersionsAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      resolverBoundaryAligned: checks.resolverBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      nodeV272KeepsRealResolverBlocked: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV112.evidenceFiles.filter((file) => file.exists).length
        + miniKvV119.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV112.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV119.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      sourceCheckCount: sourceNodeV270.checkCount,
      sourcePassedCheckCount: sourceNodeV270.passedCheckCount,
      boundaryCount: sourceNodeV270.boundaryCount,
      definedBoundaryCount: sourceNodeV270.definedBoundaryCount,
      missingBoundaryCount: sourceNodeV270.missingBoundaryCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      planIntakeUpstreamEchoVerificationJson: ROUTE_PATH,
      planIntakeUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV270Json: NODE_V270_ROUTE,
      sourceNodeV270Markdown: `${NODE_V270_ROUTE}?format=markdown`,
      javaV112Runbook: JAVA_V112_RUNBOOK,
      javaV112Walkthrough: JAVA_V112_WALKTHROUGH,
      javaV112Builder: JAVA_V112_BUILDER,
      javaV112Support: JAVA_V112_SUPPORT,
      javaV112Records: JAVA_V112_RECORDS,
      miniKvV119Receipt: MINI_KV_V119_RECEIPT,
      miniKvV119Runbook: MINI_KV_V119_RUNBOOK,
      miniKvV119Walkthrough: MINI_KV_V119_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v272 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Treat v272 as upstream echo verification only; do not implement a real credential resolver from this profile.",
      "Write the next plan before moving toward any disabled secret-provider stub or resolver interface candidate.",
      "Keep credential value reads, raw endpoint parsing, real resolver clients, real secret providers, external requests, schema migration, approval ledger writes, storage writes, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV270(config: AppConfig): SourceNodeV270PreImplementationPlanIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake({ config });
  return {
    sourceVersion: "Node v270",
    profileVersion: source.profileVersion,
    planIntakeState: source.planIntakeState,
    readyForPlanIntake: source.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
    planIntakeOnly: source.planIntakeOnly,
    readOnlyPlanIntake: source.readOnlyPlanIntake,
    readyForCredentialResolverPreImplementationPlan: source.readyForCredentialResolverPreImplementationPlan,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
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
    sourceNodeV269Ready: source.checks.sourceNodeV269Ready,
    sourceNodeV269KeepsBlockedDecision: source.checks.sourceNodeV269KeepsBlockedDecision,
    sourceNodeV269KeepsRealResolverBlocked: source.checks.sourceNodeV269KeepsRealResolverBlocked,
    planVersion: source.preImplementationPlan.planVersion,
    planMode: source.preImplementationPlan.planMode,
    planDigest: source.preImplementationPlan.planDigest,
    intakeDigest: source.planIntake.intakeDigest,
    boundaryCount: source.preImplementationPlan.boundaryCount,
    definedBoundaryCount: source.preImplementationPlan.definedBoundaryCount,
    missingBoundaryCount: source.planIntake.missingBoundaryCount,
    boundaryCodes: source.preImplementationPlan.boundaries.map((boundary) => boundary.code),
    requirementCodes: source.preImplementationPlan.boundaries.map((boundary) => boundary.requirementFromV268),
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
  };
}

function createJavaV112Reference(): JavaV112PreImplementationPlanIntakeEchoReceiptReference {
  const evidenceFiles = [
    evidenceFile("java-v112-runbook", JAVA_V112_RUNBOOK),
    evidenceFile("java-v112-walkthrough", JAVA_V112_WALKTHROUGH),
    evidenceFile("java-v112-builder", JAVA_V112_BUILDER),
    evidenceFile("java-v112-support", JAVA_V112_SUPPORT),
    evidenceFile("java-v112-records", JAVA_V112_RECORDS),
  ];
  const expectedSnippets = [
    snippet("java-v112-plan", JAVA_V112_RUNBOOK, "Node v270 pre-implementation plan intake"),
    snippet("java-v112-node-v270", JAVA_V112_SUPPORT, "Node v270 credential resolver pre-implementation plan intake"),
    snippet("java-v112-node-v272", JAVA_V112_SUPPORT, "Node v272"),
    snippet("java-v112-receipt-version", JAVA_V112_EVIDENCE_SERVICE, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.v1"),
    snippet("java-v112-echo-mode", JAVA_V112_SUPPORT, "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt-only"),
    snippet("java-v112-profile", JAVA_V112_EVIDENCE_SERVICE, "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1"),
    snippet("java-v112-state", JAVA_V112_EVIDENCE_SERVICE, "credential-resolver-pre-implementation-plan-intake-ready"),
    snippet("java-v112-check-count", JAVA_V112_SUPPORT, "static final int CHECK_COUNT = 26"),
    snippet("java-v112-passed-count", JAVA_V112_SUPPORT, "static final int PASSED_CHECK_COUNT = 26"),
    snippet("java-v112-source-count", JAVA_V112_SUPPORT, "static final int SOURCE_CHECK_COUNT = 22"),
    snippet("java-v112-boundary-count", JAVA_V112_SUPPORT, "static final int REQUIRED_BOUNDARY_COUNT = 10"),
    snippet("java-v112-production-blockers", JAVA_V112_SUPPORT, "static final int PRODUCTION_BLOCKER_COUNT = 0"),
    snippet("java-v112-plan-document", JAVA_V112_SUPPORT, "PLAN_DOCUMENT"),
    snippet("java-v112-credential-handle", JAVA_V112_SUPPORT, "CREDENTIAL_HANDLE"),
    snippet("java-v112-endpoint-handle", JAVA_V112_SUPPORT, "ENDPOINT_HANDLE"),
    snippet("java-v112-secret-provider", JAVA_V112_SUPPORT, "DISABLED_SECRET_PROVIDER_STUB"),
    snippet("java-v112-operator-approval", JAVA_V112_SUPPORT, "OPERATOR_APPROVAL"),
    snippet("java-v112-rollback", JAVA_V112_SUPPORT, "ROLLBACK_BOUNDARY"),
    snippet("java-v112-redaction", JAVA_V112_SUPPORT, "REDACTION_POLICY"),
    snippet("java-v112-external-request", JAVA_V112_SUPPORT, "EXTERNAL_REQUEST_SIMULATION"),
    snippet("java-v112-schema-migration", JAVA_V112_SUPPORT, "SCHEMA_MIGRATION_POLICY"),
    snippet("java-v112-audit-ledger-policy", JAVA_V112_SUPPORT, "AUDIT_LEDGER_WRITE_POLICY"),
    snippet("java-v112-req-plan", JAVA_V112_SUPPORT, "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING"),
    snippet("java-v112-req-credential", JAVA_V112_SUPPORT, "CREDENTIAL_HANDLE_BOUNDARY_MISSING"),
    snippet("java-v112-req-endpoint", JAVA_V112_SUPPORT, "ENDPOINT_HANDLE_BOUNDARY_MISSING"),
    snippet("java-v112-req-secret", JAVA_V112_SUPPORT, "SECRET_PROVIDER_STUB_MISSING"),
    snippet("java-v112-req-operator", JAVA_V112_SUPPORT, "OPERATOR_APPROVAL_BOUNDARY_MISSING"),
    snippet("java-v112-req-rollback", JAVA_V112_SUPPORT, "ROLLBACK_BOUNDARY_MISSING"),
    snippet("java-v112-req-redaction", JAVA_V112_SUPPORT, "REDACTION_POLICY_MISSING"),
    snippet("java-v112-req-external", JAVA_V112_SUPPORT, "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING"),
    snippet("java-v112-req-schema", JAVA_V112_SUPPORT, "SCHEMA_MIGRATION_POLICY_MISSING"),
    snippet("java-v112-req-ledger", JAVA_V112_SUPPORT, "AUDIT_LEDGER_WRITE_POLICY_MISSING"),
    snippet("java-v112-no-credential", JAVA_V112_BUILDER, "credentialValueStillForbidden"),
    snippet("java-v112-no-raw", JAVA_V112_BUILDER, "rawEndpointStillForbidden"),
    snippet("java-v112-no-secret", JAVA_V112_BUILDER, "secretProviderRuntimeStillDisabled"),
    snippet("java-v112-no-client", JAVA_V112_BUILDER, "realResolverClientStillDisabled"),
    snippet("java-v112-no-connection", JAVA_V112_BUILDER, "externalRequestStillSimulationOnly"),
    snippet("java-v112-no-ledger", JAVA_V112_BUILDER, "approvalLedgerWritten=false"),
    snippet("java-v112-no-sql", JAVA_V112_BUILDER, "sqlExecuted"),
    snippet("java-v112-no-auto", JAVA_V112_BUILDER, "automaticUpstreamStart=false"),
    snippet("java-v112-ready", JAVA_V112_BUILDER, "readyForNodeV272CredentialResolverPreImplementationPlanVerification"),
    snippet("java-v112-proof-claims", JAVA_V112_WALKTHROUGH, "proofClaims"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);

  const reference: JavaV112PreImplementationPlanIntakeEchoReceiptReference = {
    sourceVersion: "Java v112",
    tagLabel: "v112订单平台plan-intake回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.v1",
    echoMode: snippetMatched(expectedSnippets, "java-v112-echo-mode")
      ? "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt-only"
      : "missing",
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v112-node-v270") ? "Node v270" : "missing",
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v112-profile")
      ? "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v112-node-v272") ? "Node v272" : "missing",
    planIntakeState: snippetMatched(expectedSnippets, "java-v112-state")
      ? "credential-resolver-pre-implementation-plan-intake-ready"
      : "missing",
    checkCount: snippetMatched(expectedSnippets, "java-v112-check-count") ? 26 : 0,
    passedCheckCount: snippetMatched(expectedSnippets, "java-v112-passed-count") ? 26 : 0,
    sourceCheckCount: snippetMatched(expectedSnippets, "java-v112-source-count") ? 22 : 0,
    sourcePassedCheckCount: snippetMatched(expectedSnippets, "java-v112-source-count") ? 22 : 0,
    boundaryCount: snippetMatched(expectedSnippets, "java-v112-boundary-count") ? 10 : 0,
    definedBoundaryCount: snippetMatched(expectedSnippets, "java-v112-boundary-count") ? 10 : 0,
    missingBoundaryCount: 0,
    productionBlockerCount: snippetMatched(expectedSnippets, "java-v112-production-blockers") ? 0 : 1,
    warningCount: 2,
    recommendationCount: 2,
    boundaryCodesEchoed: BOUNDARY_CODES.every((code) => snippetMatched(expectedSnippets, `java-v112-${codeToSnippetId(code)}`)),
    requirementCodesEchoed: REQUIREMENT_CODES.every((code) => snippetMatched(expectedSnippets, requirementToSnippetId(code))),
    planIntakeEchoed:
      snippetMatched(expectedSnippets, "java-v112-node-v270")
      && snippetMatched(expectedSnippets, "java-v112-state")
      && snippetMatched(expectedSnippets, "java-v112-ready"),
    sideEffectBoundaryEchoed:
      snippetMatched(expectedSnippets, "java-v112-no-credential")
      && snippetMatched(expectedSnippets, "java-v112-no-raw")
      && snippetMatched(expectedSnippets, "java-v112-no-secret")
      && snippetMatched(expectedSnippets, "java-v112-no-client")
      && snippetMatched(expectedSnippets, "java-v112-no-connection")
      && snippetMatched(expectedSnippets, "java-v112-no-ledger")
      && snippetMatched(expectedSnippets, "java-v112-no-sql")
      && snippetMatched(expectedSnippets, "java-v112-no-auto"),
    readyForNodeV272Alignment: false,
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
  reference.readyForNodeV272Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.consumedNodeVersion === "Node v270"
    && reference.nextNodeConsumerVersion === "Node v272"
    && reference.planIntakeState === "credential-resolver-pre-implementation-plan-intake-ready"
    && reference.boundaryCodesEchoed
    && reference.requirementCodesEchoed
    && reference.planIntakeEchoed
    && reference.sideEffectBoundaryEchoed;

  return reference;
}

function createMiniKvV119Reference(): MiniKvV119PreImplementationPlanIntakeNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v119-receipt", MINI_KV_V119_RECEIPT),
    evidenceFile("mini-kv-v119-runbook", MINI_KV_V119_RUNBOOK),
    evidenceFile("mini-kv-v119-walkthrough", MINI_KV_V119_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v119-consumer", MINI_KV_V119_RECEIPT, "Node v272 credential resolver pre-implementation intake upstream echo verification"),
    snippet("mini-kv-v119-release", MINI_KV_V119_RECEIPT, "\"release_version\":\"v119\""),
    snippet("mini-kv-v119-profile", MINI_KV_V119_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1"),
    snippet("mini-kv-v119-state", MINI_KV_V119_RECEIPT, "\"source_plan_intake_state\":\"credential-resolver-pre-implementation-plan-intake-ready\""),
    snippet("mini-kv-v119-plan-mode", MINI_KV_V119_RECEIPT, "\"plan_mode\":\"plan-intake-only\""),
    snippet("mini-kv-v119-boundary-count", MINI_KV_V119_RECEIPT, "\"boundary_count\":10"),
    snippet("mini-kv-v119-defined-boundary", MINI_KV_V119_RECEIPT, "\"defined_boundary_count\":10"),
    snippet("mini-kv-v119-missing-boundary", MINI_KV_V119_RECEIPT, "\"missing_boundary_count\":0"),
    snippet("mini-kv-v119-check-count", MINI_KV_V119_RECEIPT, "\"check_count\":26"),
    snippet("mini-kv-v119-passed-count", MINI_KV_V119_RECEIPT, "\"passed_check_count\":26"),
    snippet("mini-kv-v119-plan-document", MINI_KV_V119_RECEIPT, "PLAN_DOCUMENT"),
    snippet("mini-kv-v119-credential-handle", MINI_KV_V119_RECEIPT, "CREDENTIAL_HANDLE"),
    snippet("mini-kv-v119-audit-ledger-policy", MINI_KV_V119_RECEIPT, "AUDIT_LEDGER_WRITE_POLICY"),
    snippet("mini-kv-v119-requirement", MINI_KV_V119_RECEIPT, "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING"),
    snippet("mini-kv-v119-no-resolver", MINI_KV_V119_RECEIPT, "\"credential_resolver_implemented\":false"),
    snippet("mini-kv-v119-no-client", MINI_KV_V119_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v119-no-secret", MINI_KV_V119_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v119-no-credential", MINI_KV_V119_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v119-no-raw", MINI_KV_V119_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v119-no-external", MINI_KV_V119_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v119-no-write", MINI_KV_V119_RECEIPT, "\"storage_write_allowed\":false"),
    snippet("mini-kv-v119-no-ledger", MINI_KV_V119_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v119-no-schema", MINI_KV_V119_RECEIPT, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v119-no-restore", MINI_KV_V119_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v119-no-setnxex", MINI_KV_V119_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v119-walkthrough", MINI_KV_V119_WALKTHROUGH, "供 Node v272"),
  ];
  const root = readJsonObject(MINI_KV_V119_RECEIPT);
  const receipt = objectField(root, "credential_resolver_pre_implementation_plan_intake_non_participation_receipt");
  const preImplementationPlan = objectField(receipt, "pre_implementation_plan");
  const planIntake = objectField(receipt, "plan_intake");
  const summary = objectField(receipt, "summary");

  const reference: MiniKvV119PreImplementationPlanIntakeNonParticipationReference = {
    sourceVersion: "mini-kv v119",
    tagLabel: "第一百一十九版credential-resolver-plan-intake回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourcePlanIntakeState: stringField(receipt, "source_plan_intake_state"),
    sourceReadyForPlanIntake: booleanField(receipt, "source_ready_for_plan_intake"),
    sourcePlanIntakeOnly: booleanField(receipt, "source_plan_intake_only"),
    sourceReadOnlyPlanIntake: booleanField(receipt, "source_read_only_plan_intake"),
    sourceReadyForCredentialResolverPreImplementationPlan:
      booleanField(receipt, "source_ready_for_credential_resolver_pre_implementation_plan"),
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection"),
    sourceRealResolverImplementationAllowed: booleanField(receipt, "source_real_resolver_implementation_allowed"),
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed"),
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit"),
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read"),
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed"),
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent"),
    sourceSecretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated"),
    sourceResolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated"),
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed"),
    sourceApprovalLedgerWritten: booleanField(receipt, "source_approval_ledger_written"),
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start"),
    planVersion: stringField(preImplementationPlan, "plan_version"),
    planMode: stringField(preImplementationPlan, "plan_mode"),
    planDigest: stringField(preImplementationPlan, "plan_digest"),
    intakeDigest: stringField(planIntake, "intake_digest"),
    boundaryCount: numberField(preImplementationPlan, "boundary_count"),
    definedBoundaryCount: numberField(preImplementationPlan, "defined_boundary_count"),
    missingBoundaryCount: numberField(planIntake, "missing_boundary_count"),
    boundaryCodes: stringArrayField(preImplementationPlan, "boundary_codes"),
    requirementCodes: stringArrayField(preImplementationPlan, "requirement_codes"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    sourceCheckCount: numberField(summary, "source_check_count"),
    sourcePassedCheckCount: numberField(summary, "source_passed_check_count"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
    warningCount: numberField(summary, "warning_count"),
    recommendationCount: numberField(summary, "recommendation_count"),
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    planIntakeOnly: booleanField(receipt, "plan_intake_only"),
    readOnlyPlanIntake: booleanField(receipt, "read_only_plan_intake"),
    receiptOnly: booleanField(receipt, "credential_resolver_pre_implementation_plan_intake_non_participation_receipt_only"),
    readyForCredentialResolverPreImplementationPlan: booleanField(receipt, "ready_for_credential_resolver_pre_implementation_plan"),
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
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed"),
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed"),
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed"),
    automaticUpstreamStartAllowed: booleanField(receipt, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    readyForNodeV272Alignment: false,
  };
  reference.readyForNodeV272Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v119"
    && reference.consumerHint === "Node v272 credential resolver pre-implementation intake upstream echo verification";

  return reference;
}

function createChecks(
  config: AppConfig,
  sourceNodeV270: SourceNodeV270PreImplementationPlanIntakeReference,
  javaV112: JavaV112PreImplementationPlanIntakeEchoReceiptReference,
  miniKvV119: MiniKvV119PreImplementationPlanIntakeNonParticipationReference,
): CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationChecks {
  return {
    sourceNodeV270Ready:
      sourceNodeV270.planIntakeState === "credential-resolver-pre-implementation-plan-intake-ready"
      && sourceNodeV270.readyForPlanIntake
      && sourceNodeV270.sourceNodeV269Ready
      && sourceNodeV270.sourceNodeV269KeepsBlockedDecision
      && sourceNodeV270.sourceNodeV269KeepsRealResolverBlocked,
    sourceNodeV270KeepsPlanIntakeOnly:
      sourceNodeV270.planIntakeOnly
      && sourceNodeV270.readOnlyPlanIntake
      && sourceNodeV270.planMode === "plan-intake-only",
    sourceNodeV270KeepsRealResolverBlocked:
      !sourceNodeV270.realResolverImplementationAllowed
      && !sourceNodeV270.connectsManagedAudit
      && !sourceNodeV270.externalRequestSent
      && !sourceNodeV270.resolverClientInstantiated
      && !sourceNodeV270.secretProviderInstantiated,
    javaV112EchoReady: javaV112.readyForNodeV272Alignment,
    miniKvV119NonParticipationReady: miniKvV119.readyForNodeV272Alignment,
    planIntakeStateAligned:
      javaV112.planIntakeState === sourceNodeV270.planIntakeState
      && miniKvV119.sourcePlanIntakeState === sourceNodeV270.planIntakeState,
    planCountsAligned:
      javaV112.checkCount === sourceNodeV270.checkCount
      && miniKvV119.checkCount === sourceNodeV270.checkCount
      && javaV112.passedCheckCount === sourceNodeV270.passedCheckCount
      && miniKvV119.passedCheckCount === sourceNodeV270.passedCheckCount
      && javaV112.sourceCheckCount === sourceNodeV270.sourceCheckCount
      && miniKvV119.sourceCheckCount === sourceNodeV270.sourceCheckCount
      && javaV112.boundaryCount === sourceNodeV270.boundaryCount
      && miniKvV119.boundaryCount === sourceNodeV270.boundaryCount
      && javaV112.definedBoundaryCount === sourceNodeV270.definedBoundaryCount
      && miniKvV119.definedBoundaryCount === sourceNodeV270.definedBoundaryCount
      && javaV112.missingBoundaryCount === sourceNodeV270.missingBoundaryCount
      && miniKvV119.missingBoundaryCount === sourceNodeV270.missingBoundaryCount
      && javaV112.productionBlockerCount === sourceNodeV270.productionBlockerCount
      && miniKvV119.productionBlockerCount === sourceNodeV270.productionBlockerCount,
    boundaryCodesAligned:
      javaV112.boundaryCodesEchoed
      && arrayEquals(sourceNodeV270.boundaryCodes, [...BOUNDARY_CODES])
      && arrayEquals(miniKvV119.boundaryCodes, [...BOUNDARY_CODES]),
    requirementCodesAligned:
      javaV112.requirementCodesEchoed
      && arrayEquals(sourceNodeV270.requirementCodes, [...REQUIREMENT_CODES])
      && arrayEquals(miniKvV119.requirementCodes, [...REQUIREMENT_CODES]),
    planIntakeVersionsAligned:
      javaV112.consumedNodeVersion === "Node v270"
      && javaV112.nextNodeConsumerVersion === "Node v272"
      && miniKvV119.planVersion === sourceNodeV270.planVersion
      && miniKvV119.planMode === sourceNodeV270.planMode
      && miniKvV119.planDigest === sourceNodeV270.planDigest
      && miniKvV119.intakeDigest === sourceNodeV270.intakeDigest,
    credentialBoundaryAligned:
      !sourceNodeV270.readsManagedAuditCredential
      && !sourceNodeV270.storesManagedAuditCredential
      && !sourceNodeV270.credentialValueRead
      && !javaV112.credentialValueRead
      && miniKvV119.credentialValueReadAllowed === false
      && miniKvV119.credentialValueLoaded === false
      && miniKvV119.credentialValueStored === false
      && miniKvV119.credentialValueIncluded === false,
    rawEndpointBoundaryAligned:
      !sourceNodeV270.rawEndpointUrlParsed
      && !javaV112.rawEndpointUrlParsed
      && miniKvV119.rawEndpointUrlParseAllowed === false
      && miniKvV119.rawEndpointUrlParsed === false
      && miniKvV119.rawEndpointUrlIncluded === false,
    resolverBoundaryAligned:
      !sourceNodeV270.resolverClientInstantiated
      && !sourceNodeV270.secretProviderInstantiated
      && !javaV112.resolverClientInstantiated
      && !javaV112.secretProviderInstantiated
      && miniKvV119.credentialResolverImplemented === false
      && miniKvV119.credentialResolverInvoked === false
      && miniKvV119.resolverClientInstantiated === false
      && miniKvV119.secretProviderInstantiated === false
      && miniKvV119.secretProviderRuntimeAllowed === false,
    connectionBoundaryAligned:
      !sourceNodeV270.connectsManagedAudit
      && !sourceNodeV270.externalRequestSent
      && !javaV112.connectsManagedAudit
      && !javaV112.externalRequestSent
      && miniKvV119.connectsManagedAudit === false
      && miniKvV119.externalRequestAllowed === false
      && miniKvV119.externalRequestSent === false
      && miniKvV119.readyForManagedAuditSandboxAdapterConnection === false,
    writeBoundaryAligned:
      !sourceNodeV270.executionAllowed
      && !sourceNodeV270.schemaMigrationExecuted
      && !sourceNodeV270.approvalLedgerWritten
      && !javaV112.approvalLedgerWritten
      && !javaV112.sqlExecuted
      && !javaV112.schemaMigrationExecuted
      && miniKvV119.executionAllowed === false
      && miniKvV119.storageWriteAllowed === false
      && miniKvV119.writeCommandsExecuted === false
      && miniKvV119.adminCommandsExecuted === false
      && miniKvV119.approvalLedgerWriteAllowed === false
      && miniKvV119.approvalLedgerWritten === false
      && miniKvV119.managedAuditWriteExecuted === false
      && miniKvV119.schemaMigrationAllowed === false
      && miniKvV119.schemaMigrationExecuted === false
      && miniKvV119.restoreExecutionAllowed === false
      && miniKvV119.loadRestoreCompactExecuted === false
      && miniKvV119.setnxexExecutionAllowed === false
      && miniKvV119.managedAuditStorageBackend === false
      && miniKvV119.auditAuthoritative === false
      && miniKvV119.orderAuthoritative === false,
    autoStartBoundaryAligned:
      !sourceNodeV270.automaticUpstreamStart
      && !javaV112.automaticUpstreamStart
      && miniKvV119.nodeAutoStartAllowed === false
      && miniKvV119.javaAutoStartAllowed === false
      && miniKvV119.miniKvAutoStartAllowed === false
      && miniKvV119.automaticUpstreamStartAllowed === false
      && miniKvV119.automaticUpstreamStart === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationChecks,
): CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV270Ready,
      code: "SOURCE_NODE_V270_NOT_READY",
      source: "node-v270-credential-resolver-pre-implementation-plan-intake",
      message: "Node v270 plan intake must be ready before v272 can verify upstream echoes.",
    },
    {
      condition: checks.sourceNodeV270KeepsPlanIntakeOnly,
      code: "SOURCE_NODE_V270_NOT_PLAN_INTAKE_ONLY",
      source: "node-v270-credential-resolver-pre-implementation-plan-intake",
      message: "Node v270 must remain plan-intake-only and read-only.",
    },
    {
      condition: checks.javaV112EchoReady,
      code: "JAVA_V112_ECHO_NOT_READY",
      source: "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt",
      message: "Java v112 must echo Node v270 plan intake before v272 can proceed.",
    },
    {
      condition: checks.miniKvV119NonParticipationReady,
      code: "MINI_KV_V119_RECEIPT_NOT_READY",
      source: "mini-kv-v119-credential-resolver-pre-implementation-plan-intake-non-participation-receipt",
      message: "mini-kv v119 must prove plan-intake non-participation before v272 can proceed.",
    },
    {
      condition: checks.planCountsAligned,
      code: "PLAN_COUNTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Node v270, Java v112, and mini-kv v119 must agree on 26/26 checks, 10 defined boundaries, and 0 blockers.",
    },
    {
      condition: checks.boundaryCodesAligned,
      code: "BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "All ten pre-implementation boundary codes must align across Node, Java, and mini-kv.",
    },
    {
      condition: checks.requirementCodesAligned,
      code: "REQUIREMENT_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "All ten requirement codes from v268 must align across Node, Java, and mini-kv.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Credential value read/load/store/include must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryAligned,
      code: "RAW_ENDPOINT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryAligned,
      code: "RESOLVER_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Real resolver client and secret provider boundaries must remain closed.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Managed audit connection and external request boundaries must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v272 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v272 upstream echo verification.",
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

function collectWarnings(): CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_INTAKE_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "This profile verifies Java v112 and mini-kv v119 understanding of Node v270 plan intake; it does not implement a real credential resolver.",
    },
    {
      code: "IMPLEMENTATION_REQUIRES_SUCCESSOR_PLAN",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "A successor plan is required before adding any disabled secret-provider stub or resolver interface candidate.",
    },
  ];
}

function collectRecommendations(): CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_V272_AND_CLOSE_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Archive v272 and close the v269-derived plan because Node v270, Java v112, mini-kv v119, and Node v272 complete the planned sequence.",
    },
    {
      code: "WRITE_NEXT_PLAN_BEFORE_RESOLVER_WORK",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Write the next plan before moving from plan-intake echo verification toward any disabled resolver implementation candidate.",
    },
  ];
}

function arrayEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function codeToSnippetId(code: CredentialResolverPreImplementationBoundaryCode): string {
  switch (code) {
    case "PLAN_DOCUMENT":
      return "plan-document";
    case "CREDENTIAL_HANDLE":
      return "credential-handle";
    case "ENDPOINT_HANDLE":
      return "endpoint-handle";
    case "DISABLED_SECRET_PROVIDER_STUB":
      return "secret-provider";
    case "OPERATOR_APPROVAL":
      return "operator-approval";
    case "ROLLBACK_BOUNDARY":
      return "rollback";
    case "REDACTION_POLICY":
      return "redaction";
    case "EXTERNAL_REQUEST_SIMULATION":
      return "external-request";
    case "SCHEMA_MIGRATION_POLICY":
      return "schema-migration";
    case "AUDIT_LEDGER_WRITE_POLICY":
      return "audit-ledger-policy";
  }
}

function requirementToSnippetId(code: CredentialResolverPreImplementationRequirementCode): string {
  switch (code) {
    case "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING":
      return "java-v112-req-plan";
    case "CREDENTIAL_HANDLE_BOUNDARY_MISSING":
      return "java-v112-req-credential";
    case "ENDPOINT_HANDLE_BOUNDARY_MISSING":
      return "java-v112-req-endpoint";
    case "SECRET_PROVIDER_STUB_MISSING":
      return "java-v112-req-secret";
    case "OPERATOR_APPROVAL_BOUNDARY_MISSING":
      return "java-v112-req-operator";
    case "ROLLBACK_BOUNDARY_MISSING":
      return "java-v112-req-rollback";
    case "REDACTION_POLICY_MISSING":
      return "java-v112-req-redaction";
    case "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING":
      return "java-v112-req-external";
    case "SCHEMA_MIGRATION_POLICY_MISSING":
      return "java-v112-req-schema";
    case "AUDIT_LEDGER_WRITE_POLICY_MISSING":
      return "java-v112-req-ledger";
  }
}
