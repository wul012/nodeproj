import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.js";
import type {
  CredentialResolverPreImplementationBoundary,
  CredentialResolverPreImplementationPlan,
  CredentialResolverPreImplementationPlanIntake,
  CredentialResolverPreImplementationPlanIntakeChecks,
  CredentialResolverPreImplementationPlanIntakeMessage,
  ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile,
  SourceNodeV269BlockedDecisionUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake";
const NODE_V269_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v269-post-blocked-decision-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile {
  const sourceNodeV269 = createSourceNodeV269(input.config);
  const boundaries = createPreImplementationBoundaries();
  const plan = createPreImplementationPlan(boundaries);
  const planIntake = createPlanIntake(plan);
  const checks = createChecks(input.config, sourceNodeV269, planIntake, plan);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake")
      .every(([, value]) => value);
  const planIntakeState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake
    ? "credential-resolver-pre-implementation-plan-intake-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver pre-implementation plan intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    planIntakeState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
    planIntakeOnly: true,
    readOnlyPlanIntake: true,
    readyForCredentialResolverPreImplementationPlan: checks.allTenBoundariesDefined,
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
    sourceNodeV269,
    preImplementationPlan: plan,
    planIntake,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceNodeV269.checkCount,
      sourcePassedCheckCount: sourceNodeV269.passedCheckCount,
      boundaryCount: plan.boundaryCount,
      definedBoundaryCount: plan.definedBoundaryCount,
      prohibitedActionCount: plan.boundaries.reduce((total, boundary) => total + boundary.prohibitedActions.length, 0),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      preImplementationPlanIntakeJson: ROUTE_PATH,
      preImplementationPlanIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV269Json: NODE_V269_ROUTE,
      sourceNodeV269Markdown: `${NODE_V269_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextQualityBranch: "Node v271 statusRoutes split pre-quality branch",
      recommendedParallelJavaV112: "Java v112 read-only echo for Node v270 plan intake",
      recommendedParallelMiniKvV119: "mini-kv v119 non-participation receipt for Node v270 plan intake",
    },
    nextActions: [
      "Archive Node v270 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Run Node v271 as the statusRoutes split quality branch before adding any new real resolver behavior.",
      "After v270 is archived, ask Java v112 and mini-kv v119 to echo the plan intake in parallel before Node v272.",
      "Keep real secret provider runtime, real resolver client, credential value reads, raw endpoint parsing, external requests, schema migration, ledger writes, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV269(config: AppConfig): SourceNodeV269BlockedDecisionUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v269",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForBlockedDecisionUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV268Ready: source.echoVerification.sourceNodeV268Ready,
    javaV111EchoReady: source.echoVerification.javaV111EchoReady,
    miniKvV118NonParticipationReady: source.echoVerification.miniKvV118NonParticipationReady,
    blockedDecisionAligned: source.echoVerification.blockedDecisionAligned,
    missingRequirementBlockersAligned: source.echoVerification.missingRequirementBlockersAligned,
    readOnlyDecisionGateAligned: source.echoVerification.readOnlyDecisionGateAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    resolverBoundaryAligned: source.echoVerification.resolverBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    missingPreImplementationRequirementCount: source.summary.missingPreImplementationRequirementCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
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
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createPreImplementationBoundaries(): CredentialResolverPreImplementationBoundary[] {
  return [
    {
      code: "PLAN_DOCUMENT",
      requirementFromV268: "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
      title: "Pre-implementation plan document",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "The resolver cannot move to implementation until this plan is echoed by Java v112, mini-kv v119, and verified by Node v272.",
      prohibitedActions: ["implement-real-resolver", "open-managed-audit-connection"],
      verificationEvidence: "Node v270 profile + v269 source digest",
    },
    {
      code: "CREDENTIAL_HANDLE",
      requirementFromV268: "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
      title: "Credential handle boundary",
      status: "defined-for-review",
      owner: "security",
      implementationRule: "Only credential handles and review status may be stored or rendered; credential values remain unavailable to Node, Java, and mini-kv.",
      prohibitedActions: ["read-credential-value", "store-credential-value", "render-credential-value"],
      verificationEvidence: "credentialValueRead=false and readsManagedAuditCredential=false",
    },
    {
      code: "ENDPOINT_HANDLE",
      requirementFromV268: "ENDPOINT_HANDLE_BOUNDARY_MISSING",
      title: "Endpoint handle boundary",
      status: "defined-for-review",
      owner: "security",
      implementationRule: "Only endpoint handles, allowlist review status, and policy names may be rendered; raw endpoint URLs stay out of profiles and logs.",
      prohibitedActions: ["parse-raw-endpoint-url", "render-raw-endpoint-url"],
      verificationEvidence: "rawEndpointUrlParsed=false",
    },
    {
      code: "DISABLED_SECRET_PROVIDER_STUB",
      requirementFromV268: "SECRET_PROVIDER_STUB_MISSING",
      title: "Disabled secret-provider stub",
      status: "defined-for-review",
      owner: "node",
      implementationRule: "Future code may define a disabled interface shell, but runtime secret-provider instantiation remains false until a separate approval gate exists.",
      prohibitedActions: ["instantiate-secret-provider-runtime", "load-secret-value"],
      verificationEvidence: "secretProviderInstantiated=false",
    },
    {
      code: "OPERATOR_APPROVAL",
      requirementFromV268: "OPERATOR_APPROVAL_BOUNDARY_MISSING",
      title: "Operator approval boundary",
      status: "defined-for-review",
      owner: "operator",
      implementationRule: "Any future resolver dry-run must bind operator identity, approval correlation, and explicit manual window marker before execution gates can be reviewed.",
      prohibitedActions: ["auto-approve-operation", "execute-without-operator-marker"],
      verificationEvidence: "executionAllowed=false and productionWindowStillBlocked=true",
    },
    {
      code: "ROLLBACK_BOUNDARY",
      requirementFromV268: "ROLLBACK_BOUNDARY_MISSING",
      title: "Rollback boundary",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "A rollback path and abort marker must exist before future resolver runtime code can be enabled; v270 does not execute rollback.",
      prohibitedActions: ["execute-rollback", "deploy-resolver-without-abort-marker"],
      verificationEvidence: "realResolverImplementationAllowed=false",
    },
    {
      code: "REDACTION_POLICY",
      requirementFromV268: "REDACTION_POLICY_MISSING",
      title: "Redaction policy",
      status: "defined-for-review",
      owner: "security",
      implementationRule: "All resolver evidence must keep secret and endpoint material redacted by construction; digest inputs may include handles but not raw values.",
      prohibitedActions: ["log-secret-material", "log-raw-endpoint"],
      verificationEvidence: "credentialValueRead=false and rawEndpointUrlParsed=false",
    },
    {
      code: "EXTERNAL_REQUEST_SIMULATION",
      requirementFromV268: "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
      title: "External request simulation",
      status: "defined-for-review",
      owner: "node",
      implementationRule: "Future resolver behavior must first use fake or dry-run request simulation; v270 sends no HTTP/TCP request to managed audit.",
      prohibitedActions: ["send-external-request", "connect-managed-audit"],
      verificationEvidence: "externalRequestSent=false and connectsManagedAudit=false",
    },
    {
      code: "SCHEMA_MIGRATION_POLICY",
      requirementFromV268: "SCHEMA_MIGRATION_POLICY_MISSING",
      title: "Schema migration policy",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "Schema migration remains review-only until a dedicated migration approval artifact exists; v270 cannot execute SQL.",
      prohibitedActions: ["execute-schema-migration", "execute-sql"],
      verificationEvidence: "schemaMigrationExecuted=false",
    },
    {
      code: "AUDIT_LEDGER_WRITE_POLICY",
      requirementFromV268: "AUDIT_LEDGER_WRITE_POLICY_MISSING",
      title: "Audit ledger write policy",
      status: "defined-for-review",
      owner: "release-manager",
      implementationRule: "Approval ledger writes require a later explicit write gate; v270 is plan intake only and writes no ledger.",
      prohibitedActions: ["write-approval-ledger", "write-managed-audit-state"],
      verificationEvidence: "approvalLedgerWritten=false and executionAllowed=false",
    },
  ];
}

function createPreImplementationPlan(
  boundaries: CredentialResolverPreImplementationBoundary[],
): CredentialResolverPreImplementationPlan {
  const planBody = {
    planVersion: "node-v270-credential-resolver-pre-implementation-plan-intake.v1",
    planMode: "plan-intake-only",
    sourceSpan: "Node v269",
    boundaries,
    realResolverImplementationAllowed: false,
    secretProviderRuntimeAllowed: false,
    credentialValueReadAllowed: false,
    rawEndpointUrlParseAllowed: false,
    externalRequestAllowed: false,
    schemaMigrationAllowed: false,
    approvalLedgerWriteAllowed: false,
    automaticUpstreamStartAllowed: false,
  } as const;

  return {
    ...planBody,
    planDigest: sha256StableJson(planBody),
    boundaryCount: boundaries.length,
    definedBoundaryCount: boundaries.filter((boundary) => boundary.status === "defined-for-review").length,
    allRequiredBoundariesDefined: boundaries.length === 10 && boundaries.every((boundary) => boundary.status === "defined-for-review"),
  };
}

function createPlanIntake(plan: CredentialResolverPreImplementationPlan): CredentialResolverPreImplementationPlanIntake {
  const hasBoundary = (code: string) => plan.boundaries.some((boundary) => boundary.code === code && boundary.status === "defined-for-review");
  const intakeBody = {
    intakeMode: "node-v270-plan-intake-only",
    consumedNodeVersion: "Node v269",
    requiredBoundaryCount: 10,
    definedBoundaryCount: plan.definedBoundaryCount,
    missingBoundaryCount: 10 - plan.definedBoundaryCount,
    planDocumentPresent: hasBoundary("PLAN_DOCUMENT"),
    credentialHandleBoundaryDefined: hasBoundary("CREDENTIAL_HANDLE"),
    endpointHandleBoundaryDefined: hasBoundary("ENDPOINT_HANDLE"),
    secretProviderStubDefined: hasBoundary("DISABLED_SECRET_PROVIDER_STUB"),
    operatorApprovalBoundaryDefined: hasBoundary("OPERATOR_APPROVAL"),
    rollbackBoundaryDefined: hasBoundary("ROLLBACK_BOUNDARY"),
    redactionPolicyDefined: hasBoundary("REDACTION_POLICY"),
    externalRequestSimulationDefined: hasBoundary("EXTERNAL_REQUEST_SIMULATION"),
    schemaMigrationPolicyDefined: hasBoundary("SCHEMA_MIGRATION_POLICY"),
    auditLedgerWritePolicyDefined: hasBoundary("AUDIT_LEDGER_WRITE_POLICY"),
    nextJavaEchoVersion: "Java v112",
    nextMiniKvReceiptVersion: "mini-kv v119",
    nextNodeVerificationVersion: "Node v272",
  } as const;

  return {
    ...intakeBody,
    intakeDigest: sha256StableJson(intakeBody),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV269: SourceNodeV269BlockedDecisionUpstreamEchoVerificationReference,
  planIntake: CredentialResolverPreImplementationPlanIntake,
  plan: CredentialResolverPreImplementationPlan,
): CredentialResolverPreImplementationPlanIntakeChecks {
  return {
    sourceNodeV269Ready:
      sourceNodeV269.verificationState === "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready"
      && sourceNodeV269.readyForBlockedDecisionUpstreamEchoVerification
      && sourceNodeV269.sourceNodeV268Ready
      && sourceNodeV269.javaV111EchoReady
      && sourceNodeV269.miniKvV118NonParticipationReady,
    sourceNodeV269KeepsBlockedDecision:
      sourceNodeV269.blockedDecisionAligned
      && sourceNodeV269.missingRequirementBlockersAligned
      && sourceNodeV269.missingPreImplementationRequirementCount === 10,
    sourceNodeV269KeepsRealResolverBlocked:
      !sourceNodeV269.readyForCredentialResolverPreImplementationPlan
      && !sourceNodeV269.realResolverImplementationAllowed
      && !sourceNodeV269.connectsManagedAudit,
    planDocumentPresent: planIntake.planDocumentPresent,
    credentialHandleBoundaryDefined: planIntake.credentialHandleBoundaryDefined,
    endpointHandleBoundaryDefined: planIntake.endpointHandleBoundaryDefined,
    secretProviderStubDefined: planIntake.secretProviderStubDefined,
    operatorApprovalBoundaryDefined: planIntake.operatorApprovalBoundaryDefined,
    rollbackBoundaryDefined: planIntake.rollbackBoundaryDefined,
    redactionPolicyDefined: planIntake.redactionPolicyDefined,
    externalRequestSimulationDefined: planIntake.externalRequestSimulationDefined,
    schemaMigrationPolicyDefined: planIntake.schemaMigrationPolicyDefined,
    auditLedgerWritePolicyDefined: planIntake.auditLedgerWritePolicyDefined,
    allTenBoundariesDefined:
      plan.boundaryCount === 10
      && plan.definedBoundaryCount === 10
      && plan.allRequiredBoundariesDefined
      && planIntake.missingBoundaryCount === 0,
    credentialValueStillForbidden:
      !plan.credentialValueReadAllowed
      && !sourceNodeV269.credentialValueRead
      && !sourceNodeV269.readsManagedAuditCredential
      && !sourceNodeV269.storesManagedAuditCredential,
    rawEndpointStillForbidden:
      !plan.rawEndpointUrlParseAllowed
      && !sourceNodeV269.rawEndpointUrlParsed,
    secretProviderRuntimeStillDisabled:
      !plan.secretProviderRuntimeAllowed
      && !sourceNodeV269.secretProviderInstantiated,
    realResolverClientStillDisabled:
      !plan.realResolverImplementationAllowed
      && !sourceNodeV269.resolverClientInstantiated,
    externalRequestStillSimulationOnly:
      !plan.externalRequestAllowed
      && !sourceNodeV269.externalRequestSent
      && !sourceNodeV269.connectsManagedAudit,
    schemaMigrationStillReviewOnly:
      !plan.schemaMigrationAllowed
      && !sourceNodeV269.schemaMigrationExecuted,
    auditLedgerWriteStillReviewOnly:
      !plan.approvalLedgerWriteAllowed,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverPreImplementationPlanIntakeChecks,
): CredentialResolverPreImplementationPlanIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverPreImplementationPlanIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV269Ready,
      code: "SOURCE_NODE_V269_NOT_READY",
      source: "node-v269-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v270 must consume a ready Node v269 blocked-decision upstream echo verification.",
    },
    {
      condition: checks.sourceNodeV269KeepsBlockedDecision,
      code: "SOURCE_BLOCKED_DECISION_NOT_PRESERVED",
      source: "node-v269-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v269 must still prove the production readiness decision was blocked by ten missing pre-implementation requirements.",
    },
    {
      condition: checks.sourceNodeV269KeepsRealResolverBlocked,
      code: "SOURCE_REAL_RESOLVER_NOT_BLOCKED",
      source: "node-v269-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v269 must keep the real credential resolver and managed audit connection blocked.",
    },
    {
      condition: checks.allTenBoundariesDefined,
      code: "PRE_IMPLEMENTATION_BOUNDARIES_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "Node v270 must define all ten pre-implementation boundaries before it can be archived.",
    },
    {
      condition: checks.credentialValueStillForbidden,
      code: "CREDENTIAL_VALUE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "Credential value reads, stores, and rendering must remain forbidden.",
    },
    {
      condition: checks.rawEndpointStillForbidden,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "Raw endpoint URL parsing or rendering must remain forbidden.",
    },
    {
      condition: checks.externalRequestStillSimulationOnly,
      code: "EXTERNAL_REQUEST_NOT_SIMULATION_ONLY",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "External requests must remain simulation-only for this plan intake.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v270 plan intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v270 plan intake.",
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

function collectWarnings(): CredentialResolverPreImplementationPlanIntakeMessage[] {
  return [
    {
      code: "PLAN_INTAKE_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "Node v270 only defines implementation boundaries; it does not implement a real credential resolver.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_BEFORE_V272",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "Java v112 and mini-kv v119 must echo this plan intake before Node v272 can verify cross-project understanding.",
    },
  ];
}

function collectRecommendations(): CredentialResolverPreImplementationPlanIntakeMessage[] {
  return [
    {
      code: "RUN_V271_STATUS_ROUTES_QUALITY_BRANCH",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "Run Node v271 as a contract-preserving statusRoutes split before adding more resolver evidence endpoints.",
    },
    {
      code: "RUN_PARALLEL_JAVA_V112_MINI_KV_V119",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake",
      message: "After v270 is archived, Java v112 and mini-kv v119 can be developed in parallel because both only consume Node v270 evidence.",
    },
  ];
}
