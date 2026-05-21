import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.js";
import type {
  DisabledRuntimeShellDesignReview,
  DisabledRuntimeShellDesignReviewChecks,
  DisabledRuntimeShellDesignReviewMessage,
  DisabledRuntimeShellDesignReviewQuestion,
  DisabledRuntimeShellDesignReviewSummary,
  DisabledRuntimeShellRecommendedParallelWork,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewProfile,
  SourceNodeV294DisabledRuntimeShellPrePlanIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review";
const SOURCE_NODE_V294_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake";
const ACTIVE_PLAN = "docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md";
const NEXT_PLAN = "docs/plans2/v295-post-disabled-runtime-shell-design-review-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewProfile {
  const sourceNodeV294 = createSourceNodeV294(input.config);
  const designReview = createDesignReview(sourceNodeV294);
  const checks = createChecks(input.config, sourceNodeV294, designReview);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview")
      .every(([, value]) => value);
  const designReviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview
    ? "disabled-runtime-shell-design-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV294, designReview, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    designReviewState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
    disabledRuntimeShellDesignReviewOnly: true,
    readOnlyDesignReview: true,
    consumesNodeV294DisabledRuntimeShellPrePlanIntake: true,
    recommendsParallelUpstreamEchoBeforeRuntimeImplementation: true,
    readyForParallelUpstreamEchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
    readyForNodeV296RuntimeShellImplementation: false,
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
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
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
    sourceNodeV294,
    designReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignReviewJson: ROUTE_PATH,
      disabledRuntimeShellDesignReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV294Json: SOURCE_NODE_V294_ROUTE,
      sourceNodeV294Markdown: `${SOURCE_NODE_V294_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v295 as a design review only; do not treat it as runtime shell authorization.",
      "Recommended parallel next step: Java v132 + mini-kv v130, both read-only echo/non-participation records.",
      "After those two upstream records exist, let Node v296 consume them before deciding whether a disabled runtime shell candidate can be drafted.",
    ],
  };
}

function createSourceNodeV294(
  config: AppConfig,
): SourceNodeV294DisabledRuntimeShellPrePlanIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({
    config,
  });

  return {
    sourceVersion: "Node v294",
    profileVersion: source.profileVersion,
    prePlanIntakeState: source.prePlanIntakeState,
    readyForDisabledRuntimeShellPrePlanIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
    readyForDisabledRuntimeShellDesignReview: source.readyForDisabledRuntimeShellDesignReview,
    planDigest: source.disabledRuntimeShellPrePlan.planDigest,
    intakeDigest: source.prePlanIntake.intakeDigest,
    boundaryCount: source.disabledRuntimeShellPrePlan.boundaryCount,
    definedBoundaryCount: source.disabledRuntimeShellPrePlan.definedBoundaryCount,
    allRequiredBoundariesDefined: source.disabledRuntimeShellPrePlan.allRequiredBoundariesDefined,
    requiredBoundaryCount: source.prePlanIntake.requiredBoundaryCount,
    missingBoundaryCount: source.prePlanIntake.missingBoundaryCount,
    nextNodeReviewVersion: source.prePlanIntake.nextNodeReviewVersion,
    nextJavaEchoVersion: source.prePlanIntake.nextJavaEchoVersion,
    nextMiniKvReceiptVersion: source.prePlanIntake.nextMiniKvReceiptVersion,
    runtimeShellImplementationAllowed: source.disabledRuntimeShellPrePlan.runtimeShellImplementationAllowed,
    runtimeShellInvocationAllowed: source.disabledRuntimeShellPrePlan.runtimeShellInvocationAllowed,
    fakeHarnessRuntimeAllowed: source.disabledRuntimeShellPrePlan.fakeHarnessRuntimeAllowed,
    credentialValueReadAllowed: source.disabledRuntimeShellPrePlan.credentialValueReadAllowed,
    rawEndpointUrlParseAllowed: source.disabledRuntimeShellPrePlan.rawEndpointUrlParseAllowed,
    providerClientInstantiationAllowed: source.disabledRuntimeShellPrePlan.providerClientInstantiationAllowed,
    externalRequestAllowed: source.disabledRuntimeShellPrePlan.externalRequestAllowed,
    schemaMigrationAllowed: source.disabledRuntimeShellPrePlan.schemaMigrationAllowed,
    approvalLedgerWriteAllowed: source.disabledRuntimeShellPrePlan.approvalLedgerWriteAllowed,
    automaticUpstreamStartAllowed: source.disabledRuntimeShellPrePlan.automaticUpstreamStartAllowed,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellEnabled: source.runtimeShellEnabled,
    testOnlyFakeHarnessAllowed: source.testOnlyFakeHarnessAllowed,
    testOnlyFakeHarnessExecutionAllowed: source.testOnlyFakeHarnessExecutionAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    credentialValueProvided: source.credentialValueProvided,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    rawEndpointUrlRendered: source.rawEndpointUrlRendered,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    fakeSecretProviderInstantiated: source.fakeSecretProviderInstantiated,
    fakeResolverClientInstantiated: source.fakeResolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
  };
}

function createDesignReview(
  sourceNodeV294: SourceNodeV294DisabledRuntimeShellPrePlanIntakeReference,
): DisabledRuntimeShellDesignReview {
  const reviewQuestions = createReviewQuestions(sourceNodeV294);
  const recommendedParallelWork = createRecommendedParallelWork();
  const stopConditions = [
    "Stop if Java v132 or mini-kv v130 would need to read credential values, parse raw endpoint URLs, write ledgers, run migrations, or open external connections.",
    "Stop if Node v296 would instantiate a provider/client before consuming Java v132 and mini-kv v130.",
    "Stop if a future plan tries to reuse UPSTREAM_ACTIONS_ENABLED as runtime approval instead of a dedicated disabled-by-default gate.",
  ];
  const necessity = {
    blocker: "runtime-shell-implementation-has-no-upstream-design-echo" as const,
    consumer: "Node v296 disabled runtime shell implementation decision" as const,
    cannotReuseExistingReportReason:
      "Node v294 only defined shell boundaries; it did not ask Java to echo the disabled runtime shell handoff or mini-kv to confirm non-participation for that shell.",
    stopCondition:
      "Once Java v132 and mini-kv v130 are archived and Node v296 consumes them, this design review should not keep spawning parallel echo reports.",
  };
  const reviewBody = {
    reviewVersion: "node-v295-disabled-runtime-shell-design-review.v1" as const,
    reviewMode: "design-review-only" as const,
    sourceSpan: "Node v294" as const,
    decision: "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation" as const,
    necessity,
    reviewQuestions,
    recommendedParallelWork,
    stopConditions,
    runtimeShellImplementationAllowed: false as const,
    runtimeShellInvocationAllowed: false as const,
    credentialValueReadAllowed: false as const,
    rawEndpointUrlParseAllowed: false as const,
    providerClientInstantiationAllowed: false as const,
    externalRequestAllowed: false as const,
    schemaMigrationAllowed: false as const,
    approvalLedgerWriteAllowed: false as const,
    automaticUpstreamStartAllowed: false as const,
  };

  return {
    ...reviewBody,
    reviewDigest: sha256StableJson(reviewBody),
  };
}

function createReviewQuestions(
  sourceNodeV294: SourceNodeV294DisabledRuntimeShellPrePlanIntakeReference,
): DisabledRuntimeShellDesignReviewQuestion[] {
  return [
    {
      code: "SOURCE_PRE_PLAN_READY",
      answer: sourceNodeV294.readyForDisabledRuntimeShellPrePlanIntake ? "yes" : "no",
      evidence: "sourceNodeV294.readyForDisabledRuntimeShellPrePlanIntake",
    },
    {
      code: "SOURCE_BOUNDARIES_COMPLETE",
      answer: sourceNodeV294.allRequiredBoundariesDefined && sourceNodeV294.missingBoundaryCount === 0 ? "yes" : "no",
      evidence: "sourceNodeV294.boundaryCount=10 and missingBoundaryCount=0",
    },
    {
      code: "IMPLEMENTATION_STILL_FORBIDDEN",
      answer: sourceNodeV294.runtimeShellImplementationAllowed === false && sourceNodeV294.runtimeShellImplemented === false ? "yes" : "no",
      evidence: "runtimeShellImplementationAllowed=false and runtimeShellImplemented=false",
    },
    {
      code: "INVOCATION_STILL_FORBIDDEN",
      answer: sourceNodeV294.runtimeShellInvocationAllowed === false && sourceNodeV294.executionAllowed === false ? "yes" : "no",
      evidence: "runtimeShellInvocationAllowed=false and executionAllowed=false",
    },
    {
      code: "CREDENTIAL_VALUE_STILL_FORBIDDEN",
      answer: sourceNodeV294.credentialValueReadAllowed === false && sourceNodeV294.credentialValueRead === false ? "yes" : "no",
      evidence: "credentialValueReadAllowed=false and credentialValueRead=false",
    },
    {
      code: "RAW_ENDPOINT_STILL_FORBIDDEN",
      answer: sourceNodeV294.rawEndpointUrlParseAllowed === false && sourceNodeV294.rawEndpointUrlParsed === false ? "yes" : "no",
      evidence: "rawEndpointUrlParseAllowed=false and rawEndpointUrlParsed=false",
    },
    {
      code: "PROVIDER_CLIENT_STILL_FORBIDDEN",
      answer:
        sourceNodeV294.providerClientInstantiationAllowed === false
        && sourceNodeV294.secretProviderInstantiated === false
        && sourceNodeV294.resolverClientInstantiated === false
        ? "yes"
        : "no",
      evidence: "providerClientInstantiationAllowed=false and real provider/client instantiated=false",
    },
    {
      code: "NETWORK_STILL_FORBIDDEN",
      answer: sourceNodeV294.externalRequestAllowed === false && sourceNodeV294.externalRequestSent === false ? "yes" : "no",
      evidence: "externalRequestAllowed=false and externalRequestSent=false",
    },
    {
      code: "WRITE_STILL_FORBIDDEN",
      answer:
        sourceNodeV294.schemaMigrationAllowed === false
        && sourceNodeV294.approvalLedgerWriteAllowed === false
        && sourceNodeV294.schemaMigrationExecuted === false
        && sourceNodeV294.approvalLedgerWritten === false
        ? "yes"
        : "no",
      evidence: "schema/ledger write allowances and executions are false",
    },
    {
      code: "AUTO_START_STILL_FORBIDDEN",
      answer: sourceNodeV294.automaticUpstreamStartAllowed === false && sourceNodeV294.automaticUpstreamStart === false ? "yes" : "no",
      evidence: "automaticUpstreamStartAllowed=false and automaticUpstreamStart=false",
    },
    {
      code: "UPSTREAM_ECHO_NEEDED_BEFORE_IMPLEMENTATION",
      answer: "yes",
      evidence: "Node v294 planned Java v132 + mini-kv v130 handoff names but neither echo is consumed by Node yet",
    },
  ];
}

function createRecommendedParallelWork(): DisabledRuntimeShellRecommendedParallelWork[] {
  return [
    {
      project: "java",
      version: "Java v132",
      task: "Echo the disabled runtime shell handoff as read-only Java evidence; do not create resolver runtime, ledger writes, SQL migrations, or upstream calls.",
      mustRemainReadOnly: true,
      mustNotImplementRuntime: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v130",
      task: "Emit a non-participation receipt for the disabled runtime shell boundary; do not add LOAD/COMPACT/RESTORE/SETNXEX or audit/order authority.",
      mustRemainReadOnly: true,
      mustNotImplementRuntime: true,
    },
  ];
}

function createChecks(
  config: AppConfig,
  sourceNodeV294: SourceNodeV294DisabledRuntimeShellPrePlanIntakeReference,
  designReview: DisabledRuntimeShellDesignReview,
): DisabledRuntimeShellDesignReviewChecks {
  return {
    sourceNodeV294Ready:
      sourceNodeV294.prePlanIntakeState === "disabled-runtime-shell-pre-plan-intake-ready"
      && sourceNodeV294.readyForDisabledRuntimeShellPrePlanIntake
      && sourceNodeV294.sourceProductionBlockerCount === 0,
    sourceNodeV294DesignReviewReady: sourceNodeV294.readyForDisabledRuntimeShellDesignReview,
    sourceBoundariesComplete:
      sourceNodeV294.boundaryCount === 10
      && sourceNodeV294.definedBoundaryCount === 10
      && sourceNodeV294.allRequiredBoundariesDefined
      && sourceNodeV294.requiredBoundaryCount === 10
      && sourceNodeV294.missingBoundaryCount === 0,
    sourceRuntimeImplementationStillForbidden:
      sourceNodeV294.runtimeShellImplementationAllowed === false
      && sourceNodeV294.runtimeShellImplemented === false
      && sourceNodeV294.runtimeShellEnabled === false,
    sourceRuntimeInvocationStillForbidden:
      sourceNodeV294.runtimeShellInvocationAllowed === false
      && sourceNodeV294.testOnlyFakeHarnessExecutionAllowed === false
      && sourceNodeV294.executionAllowed === false,
    sourceCredentialBoundaryClosed:
      sourceNodeV294.credentialValueReadAllowed === false
      && sourceNodeV294.credentialValueRead === false
      && sourceNodeV294.credentialValueProvided === false
      && sourceNodeV294.readsManagedAuditCredential === false
      && sourceNodeV294.storesManagedAuditCredential === false,
    sourceEndpointBoundaryClosed:
      sourceNodeV294.rawEndpointUrlParseAllowed === false
      && sourceNodeV294.rawEndpointUrlParsed === false
      && sourceNodeV294.rawEndpointUrlRendered === false,
    sourceProviderClientBoundaryClosed:
      sourceNodeV294.providerClientInstantiationAllowed === false
      && sourceNodeV294.secretProviderInstantiated === false
      && sourceNodeV294.resolverClientInstantiated === false
      && sourceNodeV294.fakeSecretProviderInstantiated === false
      && sourceNodeV294.fakeResolverClientInstantiated === false,
    sourceNetworkBoundaryClosed:
      sourceNodeV294.externalRequestAllowed === false
      && sourceNodeV294.externalRequestSent === false
      && sourceNodeV294.connectsManagedAudit === false,
    sourceWriteBoundaryClosed:
      sourceNodeV294.schemaMigrationAllowed === false
      && sourceNodeV294.approvalLedgerWriteAllowed === false
      && sourceNodeV294.schemaMigrationExecuted === false
      && sourceNodeV294.approvalLedgerWritten === false,
    sourceAutoStartBoundaryClosed:
      sourceNodeV294.automaticUpstreamStartAllowed === false
      && sourceNodeV294.automaticUpstreamStart === false,
    designReviewOnly: designReview.reviewMode === "design-review-only",
    necessityDocumented:
      designReview.necessity.blocker.length > 0
      && designReview.necessity.consumer.length > 0
      && designReview.necessity.cannotReuseExistingReportReason.length > 0
      && designReview.necessity.stopCondition.length > 0,
    allReviewQuestionsAnswered:
      designReview.reviewQuestions.length === 11
      && designReview.reviewQuestions.every((question) => question.answer === "yes"),
    parallelUpstreamEchoRecommended:
      designReview.decision === "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation"
      && designReview.recommendedParallelWork.length === 2,
    noRuntimeImplementationCreated: designReview.runtimeShellImplementationAllowed === false,
    noRuntimeInvocationAllowed: designReview.runtimeShellInvocationAllowed === false,
    noCredentialValueRead: designReview.credentialValueReadAllowed === false,
    noRawEndpointUrlParsed: designReview.rawEndpointUrlParseAllowed === false,
    noProviderClientInstantiated: designReview.providerClientInstantiationAllowed === false,
    noExternalRequestSent: designReview.externalRequestAllowed === false,
    noWritesOrMigrations:
      designReview.schemaMigrationAllowed === false
      && designReview.approvalLedgerWriteAllowed === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview: false,
  };
}

function createSummary(
  sourceNodeV294: SourceNodeV294DisabledRuntimeShellPrePlanIntakeReference,
  designReview: DisabledRuntimeShellDesignReview,
  checks: DisabledRuntimeShellDesignReviewChecks,
  productionBlockers: DisabledRuntimeShellDesignReviewMessage[],
  warnings: DisabledRuntimeShellDesignReviewMessage[],
  recommendations: DisabledRuntimeShellDesignReviewMessage[],
): DisabledRuntimeShellDesignReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV294.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV294.sourcePassedCheckCount,
    sourceBoundaryCount: sourceNodeV294.boundaryCount,
    reviewQuestionCount: designReview.reviewQuestions.length,
    yesReviewQuestionCount: designReview.reviewQuestions.filter((question) => question.answer === "yes").length,
    recommendedParallelWorkCount: designReview.recommendedParallelWork.length,
    stopConditionCount: designReview.stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignReviewChecks,
): DisabledRuntimeShellDesignReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledRuntimeShellDesignReviewMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV294Ready,
      code: "SOURCE_NODE_V294_NOT_READY",
      source: "node-v294-disabled-runtime-shell-pre-plan-intake",
      message: "Node v295 must consume a ready Node v294 disabled runtime shell pre-plan intake.",
    },
    {
      condition: checks.sourceBoundariesComplete,
      code: "SOURCE_BOUNDARIES_INCOMPLETE",
      source: "node-v294-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 must define all ten shell boundaries before design review can be archived.",
    },
    {
      condition: checks.sourceRuntimeImplementationStillForbidden,
      code: "SOURCE_RUNTIME_IMPLEMENTATION_OPEN",
      source: "node-v294-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 must still forbid runtime shell implementation.",
    },
    {
      condition: checks.sourceCredentialBoundaryClosed,
      code: "SOURCE_CREDENTIAL_BOUNDARY_OPEN",
      source: "node-v294-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 must keep credential value reads closed.",
    },
    {
      condition: checks.sourceProviderClientBoundaryClosed,
      code: "SOURCE_PROVIDER_CLIENT_BOUNDARY_OPEN",
      source: "node-v294-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 must not instantiate providers or clients.",
    },
    {
      condition: checks.sourceNetworkBoundaryClosed,
      code: "SOURCE_NETWORK_BOUNDARY_OPEN",
      source: "node-v294-disabled-runtime-shell-pre-plan-intake",
      message: "Node v294 must keep external requests and managed audit connections closed.",
    },
    {
      condition: checks.necessityDocumented,
      code: "DESIGN_REVIEW_NECESSITY_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Node v295 must document blocker, consumer, non-reuse reason, and stop condition.",
    },
    {
      condition: checks.parallelUpstreamEchoRecommended,
      code: "PARALLEL_UPSTREAM_ECHO_NOT_RECOMMENDED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Node v295 should recommend Java v132 + mini-kv v130 before any runtime implementation version.",
    },
    {
      condition: checks.noRuntimeImplementationCreated,
      code: "RUNTIME_IMPLEMENTATION_CREATED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Node v295 cannot implement runtime shell behavior.",
    },
    {
      condition: checks.noExternalRequestSent,
      code: "EXTERNAL_REQUEST_ALLOWED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Node v295 cannot allow HTTP/TCP or managed audit external requests.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v295 design review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v295 design review.",
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

function collectWarnings(): DisabledRuntimeShellDesignReviewMessage[] {
  return [
    {
      code: "DESIGN_REVIEW_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Node v295 is a design-review packet only; it does not authorize runtime implementation or invocation.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_BEFORE_NODE_V296_RUNTIME_DECISION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Java v132 and mini-kv v130 should be produced in parallel before Node v296 makes any runtime-shell implementation decision.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignReviewMessage[] {
  return [
    {
      code: "RECOMMENDED_PARALLEL_JAVA_V132_MINI_KV_V130",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Recommended parallel next step: Java v132 read-only disabled-shell handoff echo plus mini-kv v130 non-participation receipt.",
    },
    {
      code: "NODE_V296_MUST_CONSUME_BOTH_UPSTREAM_ECHOES",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review",
      message: "Node v296 should only proceed after both upstream echoes exist and should remain blocked if either echo is missing.",
    },
  ];
}
