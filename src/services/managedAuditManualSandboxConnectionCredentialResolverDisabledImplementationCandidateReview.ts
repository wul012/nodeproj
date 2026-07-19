import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  CredentialResolverDisabledCandidateBoundaryDecision,
  CredentialResolverDisabledCandidateInterfaceShape,
  CredentialResolverDisabledFakeWiringReview,
  CredentialResolverDisabledImplementationCandidateReview,
  CredentialResolverDisabledImplementationCandidateReviewChecks,
  CredentialResolverDisabledImplementationCandidateReviewMessage,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile,
  SourceNodeV272PlanIntakeUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review";
const NODE_V272_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v272-post-plan-intake-echo-roadmap.md";

const CANDIDATE_READY_BOUNDARIES = new Set<CredentialResolverPreImplementationBoundaryCode>([
  "PLAN_DOCUMENT",
  "DISABLED_SECRET_PROVIDER_STUB",
  "EXTERNAL_REQUEST_SIMULATION",
  "REDACTION_POLICY",
]);

const REQUIRED_BOUNDARY_CODES: readonly CredentialResolverPreImplementationBoundaryCode[] = [
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
] as const;

const REQUEST_FIELDS = [
  "credentialHandle",
  "endpointHandle",
  "resolverPolicyHandle",
  "operatorIdentity",
  "approvalCorrelationId",
  "manualWindowMarker",
] as const;

const RESPONSE_FIELDS = [
  "resolverState",
  "resolvedCredentialValue",
  "rawEndpointUrl",
  "redactionApplied",
  "externalRequestSent",
  "failureClass",
  "auditDigest",
] as const;

const FAILURE_CLASSES = [
  "disabled-by-config",
  "missing-credential-handle",
  "missing-endpoint-handle",
  "operator-approval-required",
  "manual-window-required",
  "real-runtime-forbidden",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile {
  const sourceNodeV272 = createSourceNodeV272(input.config);
  const disabledImplementationCandidate = createDisabledImplementationCandidate(sourceNodeV272);
  const checks = createChecks(input.config, sourceNodeV272, disabledImplementationCandidate);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview")
      .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview
    ? "credential-resolver-disabled-implementation-candidate-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled implementation candidate review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
    disabledImplementationCandidateReviewOnly: true,
    readOnlyCandidateReview: true,
    readyForDisabledResolverInterfaceCandidate: checks.candidateReadyBoundariesLimited,
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
    sourceNodeV272,
    disabledImplementationCandidate,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceNodeV272.checkCount,
      sourcePassedCheckCount: sourceNodeV272.passedCheckCount,
      candidateDecisionCount: disabledImplementationCandidate.candidateDecisionCount,
      candidateReadyDecisionCount: disabledImplementationCandidate.candidateReadyDecisionCount,
      approvalRequiredDecisionCount: disabledImplementationCandidate.approvalRequiredDecisionCount,
      requestFieldCount: disabledImplementationCandidate.interfaceShape.requestFields.length,
      responseFieldCount: disabledImplementationCandidate.interfaceShape.responseFields.length,
      failureClassCount: disabledImplementationCandidate.interfaceShape.failureClasses.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledImplementationCandidateReviewJson: ROUTE_PATH,
      disabledImplementationCandidateReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV272Json: NODE_V272_ROUTE,
      sourceNodeV272Markdown: `${NODE_V272_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV113: "Java v113 read-only echo for Node v273 disabled implementation candidate review",
      recommendedParallelMiniKvV120: "mini-kv v120 non-participation receipt for Node v273 disabled implementation candidate review",
    },
    nextActions: [
      "Archive Node v273 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Ask Java v113 and mini-kv v120 to echo this disabled candidate review in parallel before Node v274.",
      "Keep credential value reads, raw endpoint parsing, real resolver clients, real secret providers, external requests, schema migration, approval ledger writes, storage writes, and auto-start blocked.",
      "Do not turn the disabled interface candidate into runtime resolver code until a later explicit approval plan exists.",
    ],
  };
}

function createSourceNodeV272(config: AppConfig): SourceNodeV272PlanIntakeUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v272",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForPlanIntakeUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    planIntakeEchoVerificationOnly: source.planIntakeEchoVerificationOnly,
    sourceSpan: source.echoVerification.sourceSpan,
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
    planVersion: source.sourceNodeV270.planVersion,
    planMode: source.sourceNodeV270.planMode,
    planDigest: source.sourceNodeV270.planDigest,
    intakeDigest: source.sourceNodeV270.intakeDigest,
    boundaryCount: source.sourceNodeV270.boundaryCount,
    definedBoundaryCount: source.sourceNodeV270.definedBoundaryCount,
    missingBoundaryCount: source.sourceNodeV270.missingBoundaryCount,
    boundaryCodes: source.sourceNodeV270.boundaryCodes,
    requirementCodes: source.sourceNodeV270.requirementCodes,
    sourceNodeV270Ready: source.echoVerification.sourceNodeV270Ready,
    javaV112EchoReady: source.echoVerification.javaV112EchoReady,
    miniKvV119NonParticipationReady: source.echoVerification.miniKvV119NonParticipationReady,
    planIntakeStateAligned: source.echoVerification.planIntakeStateAligned,
    planCountsAligned: source.echoVerification.planCountsAligned,
    boundaryCodesAligned: source.echoVerification.boundaryCodesAligned,
    requirementCodesAligned: source.echoVerification.requirementCodesAligned,
    planIntakeVersionsAligned: source.echoVerification.planIntakeVersionsAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    resolverBoundaryAligned: source.echoVerification.resolverBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    verificationDigest: source.echoVerification.verificationDigest,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
  };
}

function createDisabledImplementationCandidate(
  sourceNodeV272: SourceNodeV272PlanIntakeUpstreamEchoVerificationReference,
): CredentialResolverDisabledImplementationCandidateReview {
  const decisions = createCandidateDecisions(sourceNodeV272);
  const interfaceShape = createInterfaceShape();
  const fakeWiringReview = createFakeWiringReview();
  const candidateBody = {
    candidateVersion: "node-v273-credential-resolver-disabled-implementation-candidate-review.v1",
    candidateMode: "disabled-interface-and-fake-wiring-review-only",
    sourceSpan: "Node v272",
    decisions,
    interfaceShape,
    fakeWiringReview,
    disabledInterfaceCandidateAllowed: true,
    fakeWiringReviewAllowed: true,
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
    ...candidateBody,
    candidateDigest: sha256StableJson(candidateBody),
    candidateDecisionCount: decisions.length,
    candidateReadyDecisionCount: decisions.filter((decision) => decision.disposition === "disabled-candidate-ready").length,
    approvalRequiredDecisionCount: decisions.filter((decision) => decision.disposition === "approval-required").length,
  };
}

function createCandidateDecisions(
  sourceNodeV272: SourceNodeV272PlanIntakeUpstreamEchoVerificationReference,
): CredentialResolverDisabledCandidateBoundaryDecision[] {
  return sourceNodeV272.boundaryCodes.map((code, index) => {
    const disposition = CANDIDATE_READY_BOUNDARIES.has(code)
      ? "disabled-candidate-ready"
      : "approval-required";
    return {
      code,
      requirementFromV268: sourceNodeV272.requirementCodes[index] ?? "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
      disposition,
      owner: ownerForBoundary(code),
      candidateRule: candidateRuleForBoundary(code, disposition),
      prohibitedRuntimeActions: prohibitedRuntimeActionsForBoundary(code),
    };
  });
}

function createInterfaceShape(): CredentialResolverDisabledCandidateInterfaceShape {
  return {
    interfaceVersion: "disabled-credential-resolver-interface-candidate.v1",
    requestFields: REQUEST_FIELDS,
    responseFields: RESPONSE_FIELDS,
    failureClasses: FAILURE_CLASSES,
    handleOnlyRequest: true,
    includesCredentialValue: false,
    includesRawEndpointUrl: false,
    sendsExternalRequest: false,
    instantiatesSecretProvider: false,
    instantiatesResolverClient: false,
  };
}

function createFakeWiringReview(): CredentialResolverDisabledFakeWiringReview {
  return {
    reviewVersion: "disabled-credential-resolver-fake-wiring-review.v1",
    fakeWiringReviewOnly: true,
    fakeRuntimeInstantiated: false,
    realSecretProviderAllowed: false,
    realManagedAuditTransportAllowed: false,
    externalRequestAllowed: false,
    cleanupArtifactCount: 0,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV272: SourceNodeV272PlanIntakeUpstreamEchoVerificationReference,
  candidate: CredentialResolverDisabledImplementationCandidateReview,
): CredentialResolverDisabledImplementationCandidateReviewChecks {
  const candidateReadyCodes = candidate.decisions
    .filter((decision) => decision.disposition === "disabled-candidate-ready")
    .map((decision) => decision.code);
  const approvalRequiredCodes = candidate.decisions
    .filter((decision) => decision.disposition === "approval-required")
    .map((decision) => decision.code);

  return {
    sourceNodeV272Ready:
      sourceNodeV272.verificationState === "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready"
      && sourceNodeV272.readyForPlanIntakeUpstreamEchoVerification
      && sourceNodeV272.sourceNodeV270Ready
      && sourceNodeV272.javaV112EchoReady
      && sourceNodeV272.miniKvV119NonParticipationReady,
    sourceNodeV272KeepsReadOnlyEchoOnly:
      sourceNodeV272.readOnlyUpstreamEchoVerification
      && sourceNodeV272.planIntakeEchoVerificationOnly,
    sourceNodeV272KeepsRealResolverBlocked:
      !sourceNodeV272.realResolverImplementationAllowed
      && !sourceNodeV272.connectsManagedAudit
      && !sourceNodeV272.externalRequestSent
      && !sourceNodeV272.resolverClientInstantiated
      && !sourceNodeV272.secretProviderInstantiated,
    sourceNodeV272KeepsBoundaryAlignment:
      sourceNodeV272.planCountsAligned
      && sourceNodeV272.boundaryCodesAligned
      && sourceNodeV272.requirementCodesAligned
      && sourceNodeV272.credentialBoundaryAligned
      && sourceNodeV272.rawEndpointBoundaryAligned
      && sourceNodeV272.resolverBoundaryAligned
      && sourceNodeV272.connectionBoundaryAligned
      && sourceNodeV272.writeBoundaryAligned
      && sourceNodeV272.autoStartBoundaryAligned,
    allCandidateDecisionsCovered:
      candidate.candidateDecisionCount === REQUIRED_BOUNDARY_CODES.length
      && arrayEquals(candidate.decisions.map((decision) => decision.code), REQUIRED_BOUNDARY_CODES),
    candidateReadyBoundariesLimited:
      candidate.candidateReadyDecisionCount === CANDIDATE_READY_BOUNDARIES.size
      && candidateReadyCodes.every((code) => CANDIDATE_READY_BOUNDARIES.has(code)),
    approvalRequiredBoundariesPreserved:
      candidate.approvalRequiredDecisionCount === REQUIRED_BOUNDARY_CODES.length - CANDIDATE_READY_BOUNDARIES.size
      && approvalRequiredCodes.every((code) => !CANDIDATE_READY_BOUNDARIES.has(code)),
    interfaceShapeHandleOnly:
      candidate.interfaceShape.handleOnlyRequest
      && candidate.interfaceShape.requestFields.length === 6
      && candidate.interfaceShape.responseFields.length === 7
      && candidate.interfaceShape.failureClasses.length === 6
      && !candidate.interfaceShape.includesCredentialValue
      && !candidate.interfaceShape.includesRawEndpointUrl,
    fakeWiringReviewOnly:
      candidate.fakeWiringReview.fakeWiringReviewOnly
      && !candidate.fakeWiringReview.fakeRuntimeInstantiated
      && !candidate.fakeWiringReview.realSecretProviderAllowed
      && !candidate.fakeWiringReview.realManagedAuditTransportAllowed
      && !candidate.fakeWiringReview.externalRequestAllowed
      && candidate.fakeWiringReview.cleanupArtifactCount === 0,
    credentialValueStillForbidden:
      !candidate.credentialValueReadAllowed
      && !sourceNodeV272.credentialValueRead
      && !sourceNodeV272.readsManagedAuditCredential
      && !sourceNodeV272.storesManagedAuditCredential,
    rawEndpointStillForbidden:
      !candidate.rawEndpointUrlParseAllowed
      && !sourceNodeV272.rawEndpointUrlParsed,
    secretProviderRuntimeStillDisabled:
      !candidate.secretProviderRuntimeAllowed
      && !sourceNodeV272.secretProviderInstantiated,
    resolverClientStillDisabled:
      !candidate.realResolverImplementationAllowed
      && !sourceNodeV272.resolverClientInstantiated,
    externalRequestStillBlocked:
      !candidate.externalRequestAllowed
      && !sourceNodeV272.externalRequestSent
      && !sourceNodeV272.connectsManagedAudit,
    schemaMigrationStillBlocked:
      !candidate.schemaMigrationAllowed
      && !sourceNodeV272.schemaMigrationExecuted,
    ledgerWriteStillBlocked:
      !candidate.approvalLedgerWriteAllowed
      && !sourceNodeV272.approvalLedgerWritten,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverDisabledImplementationCandidateReviewChecks,
): CredentialResolverDisabledImplementationCandidateReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverDisabledImplementationCandidateReviewMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV272Ready,
      code: "SOURCE_NODE_V272_NOT_READY",
      source: "node-v272-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Node v273 must consume a ready Node v272 plan-intake upstream echo verification.",
    },
    {
      condition: checks.sourceNodeV272KeepsReadOnlyEchoOnly,
      code: "SOURCE_NODE_V272_NOT_READ_ONLY_ECHO_ONLY",
      source: "node-v272-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Node v272 must remain read-only upstream echo verification only.",
    },
    {
      condition: checks.sourceNodeV272KeepsRealResolverBlocked,
      code: "SOURCE_REAL_RESOLVER_NOT_BLOCKED",
      source: "node-v272-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Node v272 must keep the real credential resolver and managed audit connection blocked.",
    },
    {
      condition: checks.sourceNodeV272KeepsBoundaryAlignment,
      code: "SOURCE_BOUNDARIES_NOT_ALIGNED",
      source: "node-v272-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Node v272 must prove Java and mini-kv aligned on plan counts, boundary codes, and no-side-effect boundaries.",
    },
    {
      condition: checks.allCandidateDecisionsCovered,
      code: "CANDIDATE_DECISIONS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Node v273 must classify all ten pre-implementation boundaries before it can be archived.",
    },
    {
      condition: checks.candidateReadyBoundariesLimited,
      code: "CANDIDATE_READY_SCOPE_TOO_WIDE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Only plan document, disabled stub, redaction, and external simulation boundaries may become disabled-candidate-ready in v273.",
    },
    {
      condition: checks.approvalRequiredBoundariesPreserved,
      code: "APPROVAL_REQUIRED_BOUNDARIES_NOT_PRESERVED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Credential handle, endpoint handle, operator approval, rollback, schema migration, and ledger write policies must remain approval-required.",
    },
    {
      condition: checks.interfaceShapeHandleOnly,
      code: "INTERFACE_SHAPE_NOT_HANDLE_ONLY",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "The disabled resolver interface candidate must carry handles only and must not include credential values or raw endpoint URLs.",
    },
    {
      condition: checks.fakeWiringReviewOnly,
      code: "FAKE_WIRING_NOT_REVIEW_ONLY",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "v273 fake wiring must stay review-only and must not instantiate runtime components.",
    },
    {
      condition: checks.credentialValueStillForbidden,
      code: "CREDENTIAL_VALUE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Credential value reads, stores, and rendering must remain forbidden.",
    },
    {
      condition: checks.rawEndpointStillForbidden,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Raw endpoint parsing or rendering must remain forbidden.",
    },
    {
      condition: checks.externalRequestStillBlocked,
      code: "EXTERNAL_REQUEST_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Managed audit external requests must remain blocked.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v273 disabled candidate review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v273 disabled candidate review.",
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

function collectWarnings(): CredentialResolverDisabledImplementationCandidateReviewMessage[] {
  return [
    {
      code: "DISABLED_CANDIDATE_REVIEW_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Node v273 only reviews a disabled interface and fake wiring candidate; it does not implement or instantiate a resolver.",
    },
    {
      code: "APPROVAL_BOUNDARIES_REMAIN",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Six boundaries remain approval-required before any future runtime implementation can be considered.",
    },
  ];
}

function collectRecommendations(): CredentialResolverDisabledImplementationCandidateReviewMessage[] {
  return [
    {
      code: "RUN_PARALLEL_JAVA_V113_MINI_KV_V120",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "After v273 is archived, Java v113 and mini-kv v120 can be developed in parallel because both only consume Node v273 evidence.",
    },
    {
      code: "VERIFY_WITH_NODE_V274_AFTER_UPSTREAM_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review",
      message: "Use Node v274 to verify Java v113 and mini-kv v120 understanding before adding any new resolver shell behavior.",
    },
  ];
}

function ownerForBoundary(
  code: CredentialResolverPreImplementationBoundaryCode,
): CredentialResolverDisabledCandidateBoundaryDecision["owner"] {
  switch (code) {
    case "PLAN_DOCUMENT":
    case "ROLLBACK_BOUNDARY":
    case "SCHEMA_MIGRATION_POLICY":
    case "AUDIT_LEDGER_WRITE_POLICY":
      return "release-manager";
    case "CREDENTIAL_HANDLE":
    case "ENDPOINT_HANDLE":
    case "REDACTION_POLICY":
      return "security";
    case "OPERATOR_APPROVAL":
      return "operator";
    case "DISABLED_SECRET_PROVIDER_STUB":
    case "EXTERNAL_REQUEST_SIMULATION":
      return "node";
  }
}

function candidateRuleForBoundary(
  code: CredentialResolverPreImplementationBoundaryCode,
  disposition: CredentialResolverDisabledCandidateBoundaryDecision["disposition"],
): string {
  if (disposition === "disabled-candidate-ready") {
    return `${code} may be represented in the disabled interface or fake wiring review, but it cannot trigger runtime credential resolution.`;
  }
  return `${code} remains approval-required and cannot move into runtime behavior in v273.`;
}

function prohibitedRuntimeActionsForBoundary(code: CredentialResolverPreImplementationBoundaryCode): string[] {
  switch (code) {
    case "CREDENTIAL_HANDLE":
      return ["read-credential-value", "store-credential-value"];
    case "ENDPOINT_HANDLE":
      return ["parse-raw-endpoint-url", "render-raw-endpoint-url"];
    case "DISABLED_SECRET_PROVIDER_STUB":
      return ["instantiate-secret-provider-runtime", "load-secret-value"];
    case "EXTERNAL_REQUEST_SIMULATION":
      return ["send-external-request", "connect-managed-audit"];
    case "SCHEMA_MIGRATION_POLICY":
      return ["execute-schema-migration", "execute-sql"];
    case "AUDIT_LEDGER_WRITE_POLICY":
      return ["write-approval-ledger", "write-managed-audit-state"];
    case "OPERATOR_APPROVAL":
      return ["execute-without-operator-marker", "auto-approve-operation"];
    case "ROLLBACK_BOUNDARY":
      return ["execute-rollback", "deploy-resolver-without-abort-marker"];
    case "PLAN_DOCUMENT":
      return ["implement-real-resolver", "open-managed-audit-connection"];
    case "REDACTION_POLICY":
      return ["log-secret-material", "log-raw-endpoint"];
  }
}

function arrayEquals<T>(left: readonly T[], right: readonly T[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
