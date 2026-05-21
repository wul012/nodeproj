import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.js";
import type {
  DisabledRuntimeShellImplementationCandidateGate,
  DisabledRuntimeShellImplementationCandidateGateChecks,
  DisabledRuntimeShellImplementationCandidateGateCode,
  DisabledRuntimeShellImplementationCandidateGateItem,
  DisabledRuntimeShellImplementationCandidateGateMessage,
  DisabledRuntimeShellImplementationCandidateGateSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile,
  SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate";
const SOURCE_NODE_V296_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v296-post-disabled-runtime-shell-upstream-echo-roadmap.md";
const REQUIRED_GATE_CODES: readonly DisabledRuntimeShellImplementationCandidateGateCode[] = [
  "DEDICATED_DISABLED_BY_DEFAULT_FLAG",
  "OPERATOR_APPROVAL",
  "ABORT_SEMANTICS",
  "NO_NETWORK_TESTS",
  "HISTORICAL_FALLBACK_EVIDENCE",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile {
  const sourceNodeV296 = createSourceNodeV296(input.config);
  const candidateGate = createCandidateGate(sourceNodeV296);
  const checks = createChecks(input.config, sourceNodeV296, candidateGate);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate")
      .every(([, value]) => value);
  const candidateGateState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate
    ? "disabled-runtime-shell-implementation-candidate-gate-reviewed"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV296, candidateGate, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell implementation candidate gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    candidateGateState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
    readOnlyCandidateGate: true,
    implementationCandidateGateOnly: true,
    consumesNodeV296DisabledRuntimeShellUpstreamEchoVerification: true,
    readyForParallelJavaV134MiniKvV131EchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate,
    readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: false,
    readyForNodeV298RuntimeShellImplementation: false,
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
    sourceNodeV296,
    candidateGate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellImplementationCandidateGateJson: ROUTE_PATH,
      disabledRuntimeShellImplementationCandidateGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV296Json: SOURCE_NODE_V296_ROUTE,
      sourceNodeV296Markdown: `${SOURCE_NODE_V296_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV134:
        "Java v134 runtime shell candidate gate echo; read-only blocked decision only",
      recommendedParallelMiniKvV131:
        "mini-kv v131 runtime shell candidate gate non-participation receipt",
    },
    nextActions: [
      "Archive Node v297 as an implementation candidate gate review, not a runtime implementation.",
      "Develop Java v134 and mini-kv v131 in parallel after v297; both only echo the blocked candidate gate decision.",
      "Use Node v298 only to verify Java v134 and mini-kv v131 echoes; keep runtime implementation, provider/client instantiation, credential reads, raw endpoint parsing, HTTP/TCP, ledger writes, schema migration, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV296(config: AppConfig): SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v296",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    disabledRuntimeShellUpstreamEchoVerificationOnly: source.disabledRuntimeShellUpstreamEchoVerificationOnly,
    consumesJavaV133: source.consumesJavaV133DisabledRuntimeShellHandoffEcho,
    consumesMiniKvV130: source.consumesMiniKvV130DisabledRuntimeShellNonParticipationReceipt,
    planVersionCorrectionApplied: source.planVersionCorrectionApplied,
    plannedJavaVersion: source.plannedJavaVersion,
    actualJavaEchoVersion: source.actualJavaEchoVersion,
    readyForNodeV297CandidateGate: source.readyForNodeV297RuntimeShellImplementationCandidateGate,
    readyForNodeV297RuntimeShellImplementation: source.readyForNodeV297RuntimeShellImplementation,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellEnabled: source.runtimeShellEnabled,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createCandidateGate(
  sourceNodeV296: SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference,
): DisabledRuntimeShellImplementationCandidateGate {
  const requiredGates = createRequiredGates(sourceNodeV296);
  const gateBody = {
    gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1",
    gateMode: "candidate-gate-only-default-blocked",
    sourceSpan: "Node v296",
    gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation",
    decisionRationale:
      "Node v296 proves the three-project upstream echo is aligned, but a runtime shell still needs a dedicated disabled-by-default flag, operator approval, abort semantics, no-network tests, and fallback evidence echoed by Java and mini-kv before any later implementation decision.",
    necessity: {
      blocker: "candidate-gate-lacks-upstream-echo-and-runtime-prerequisite-proof",
      consumer: "Java v134 and mini-kv v131, then Node v298",
      cannotReuseExistingReportReason:
        "Node v296 verified upstream echo evidence only; it did not enumerate the runtime-shell candidate prerequisites or publish a blocked decision that Java v134 and mini-kv v131 can echo.",
      stopCondition:
        "Stop extending the candidate gate once Java v134 and mini-kv v131 echo the blocked decision and Node v298 verifies both echoes.",
    },
    requiredGates,
    stopConditions: [
      "Any candidate asks Node to implement, enable, or invoke a runtime shell.",
      "Any candidate asks Node to instantiate a provider or resolver client.",
      "Any candidate asks Node, Java, or mini-kv to read credential values or parse raw endpoint URLs.",
      "Any candidate asks Node to send HTTP/TCP to managed audit.",
      "Any candidate asks Java to write approval ledger records, execute SQL, deploy, or roll back.",
      "Any candidate asks mini-kv to execute LOAD/COMPACT/RESTORE/SETNXEX or become audit/order authority.",
    ],
  } as const;

  return {
    ...gateBody,
    gateDigest: sha256StableJson(gateBody),
    requiredGateCount: requiredGates.length,
    documentedGateCount: requiredGates.filter((gate) => gate.documentedForGateReview).length,
    reviewEvidenceSatisfiedCount: requiredGates.filter((gate) => gate.reviewEvidenceSatisfied).length,
    runtimePrerequisiteSatisfiedCount: requiredGates.filter((gate) => gate.runtimePrerequisiteSatisfied).length,
    implementationAllowedGateCount: requiredGates.filter((gate) => gate.implementationAllowed).length,
  };
}

function createRequiredGates(
  sourceNodeV296: SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference,
): DisabledRuntimeShellImplementationCandidateGateItem[] {
  return [
    gate(
      "DEDICATED_DISABLED_BY_DEFAULT_FLAG",
      "Dedicated disabled-by-default flag",
      "node",
      "A later runtime shell must have its own disabled-by-default flag, separate from upstream probes/actions.",
      sourceNodeV296.readyForUpstreamEchoVerification ? "Node v296 upstream echo verification ready" : "missing Node v296 verification",
      sourceNodeV296.readyForUpstreamEchoVerification,
      "missing-disabled-runtime-shell-flag",
    ),
    gate(
      "OPERATOR_APPROVAL",
      "Operator approval marker",
      "operator",
      "Runtime shell candidate work must require an explicit operator approval marker before any future execution window.",
      sourceNodeV296.planVersionCorrectionApplied ? "Node v296 plan correction and handoff evidence archived" : "missing plan correction evidence",
      sourceNodeV296.planVersionCorrectionApplied,
      "operator-approval-required",
    ),
    gate(
      "ABORT_SEMANTICS",
      "Abort semantics",
      "release",
      "A future runtime shell must document abort, rollback, and no-write semantics before any implementation can be discussed.",
      sourceNodeV296.readyForNodeV297CandidateGate ? "Node v296 allows candidate gate review only" : "missing v297 candidate gate signal",
      sourceNodeV296.readyForNodeV297CandidateGate,
      "abort-semantics-required",
    ),
    gate(
      "NO_NETWORK_TESTS",
      "No-network tests",
      "test",
      "Candidate tests must prove no HTTP/TCP is sent and no provider/client is instantiated.",
      !sourceNodeV296.externalRequestSent
        && !sourceNodeV296.connectsManagedAudit
        && !sourceNodeV296.secretProviderInstantiated
        && !sourceNodeV296.resolverClientInstantiated
        ? "Node v296 side-effect boundaries are closed"
        : "source side-effect boundary opened",
      !sourceNodeV296.externalRequestSent
        && !sourceNodeV296.connectsManagedAudit
        && !sourceNodeV296.secretProviderInstantiated
        && !sourceNodeV296.resolverClientInstantiated,
      "no-network-tests-required",
    ),
    gate(
      "HISTORICAL_FALLBACK_EVIDENCE",
      "Historical fallback evidence",
      "release",
      "Candidate gate evidence must be reproducible from committed historical fixtures, not only local sibling workspaces.",
      sourceNodeV296.passedCheckCount === sourceNodeV296.checkCount ? "Node v296 historical fallback path verified" : "missing historical fallback evidence",
      sourceNodeV296.passedCheckCount === sourceNodeV296.checkCount,
      "historical-fallback-required",
    ),
  ];
}

function gate(
  code: DisabledRuntimeShellImplementationCandidateGateCode,
  title: string,
  owner: DisabledRuntimeShellImplementationCandidateGateItem["owner"],
  requirement: string,
  sourceEvidence: string,
  reviewEvidenceSatisfied: boolean,
  failureClass: string,
): DisabledRuntimeShellImplementationCandidateGateItem {
  return {
    code,
    title,
    owner,
    requirement,
    sourceEvidence,
    documentedForGateReview: true,
    reviewEvidenceSatisfied,
    runtimePrerequisiteSatisfied: false,
    implementationAllowed: false,
    failureClass,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV296: SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference,
  candidateGate: DisabledRuntimeShellImplementationCandidateGate,
): DisabledRuntimeShellImplementationCandidateGateChecks {
  const gateCodes = candidateGate.requiredGates.map((gate) => gate.code);
  return {
    sourceNodeV296Ready:
      sourceNodeV296.verificationState === "disabled-runtime-shell-upstream-echo-verification-ready"
      && sourceNodeV296.readyForUpstreamEchoVerification
      && sourceNodeV296.consumesJavaV133
      && sourceNodeV296.consumesMiniKvV130
      && sourceNodeV296.productionBlockerCount === 0,
    sourceNodeV296KeepsImplementationBlocked:
      sourceNodeV296.readyForNodeV297RuntimeShellImplementation === false
      && sourceNodeV296.runtimeShellImplemented === false
      && sourceNodeV296.runtimeShellInvocationAllowed === false
      && sourceNodeV296.executionAllowed === false,
    sourceNodeV296KeepsSideEffectsClosed:
      sourceNodeV296.credentialValueRead === false
      && sourceNodeV296.rawEndpointUrlParsed === false
      && sourceNodeV296.externalRequestSent === false
      && sourceNodeV296.connectsManagedAudit === false
      && sourceNodeV296.secretProviderInstantiated === false
      && sourceNodeV296.resolverClientInstantiated === false
      && sourceNodeV296.schemaMigrationExecuted === false
      && sourceNodeV296.approvalLedgerWritten === false
      && sourceNodeV296.automaticUpstreamStart === false,
    candidateGateCountStable:
      candidateGate.requiredGateCount === REQUIRED_GATE_CODES.length
      && arrayEquals(gateCodes, REQUIRED_GATE_CODES),
    allCandidateGatesDocumented:
      candidateGate.documentedGateCount === REQUIRED_GATE_CODES.length,
    allCandidateGatesReviewEvidenceSatisfied:
      candidateGate.reviewEvidenceSatisfiedCount === REQUIRED_GATE_CODES.length,
    candidateGateKeepsRuntimeBlocked:
      candidateGate.runtimePrerequisiteSatisfiedCount === 0
      && candidateGate.implementationAllowedGateCount === 0
      && candidateGate.requiredGates.every((gateItem) =>
        gateItem.runtimePrerequisiteSatisfied === false && gateItem.implementationAllowed === false),
    dedicatedDisabledByDefaultFlagRequired: hasGate(candidateGate, "DEDICATED_DISABLED_BY_DEFAULT_FLAG"),
    operatorApprovalRequired: hasGate(candidateGate, "OPERATOR_APPROVAL"),
    abortSemanticsRequired: hasGate(candidateGate, "ABORT_SEMANTICS"),
    noNetworkTestsRequired: hasGate(candidateGate, "NO_NETWORK_TESTS"),
    historicalFallbackEvidenceRequired: hasGate(candidateGate, "HISTORICAL_FALLBACK_EVIDENCE"),
    necessityDocumented:
      candidateGate.necessity.blocker === "candidate-gate-lacks-upstream-echo-and-runtime-prerequisite-proof"
      && candidateGate.necessity.consumer.includes("Node v298")
      && candidateGate.necessity.cannotReuseExistingReportReason.includes("Node v296")
      && candidateGate.necessity.stopCondition.includes("Java v134"),
    parallelUpstreamEchoRecommended:
      candidateGate.gateDecision === "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation",
    noRuntimeImplementationCreated: true,
    noRuntimeInvocationAllowed: true,
    credentialBoundaryClosed: true,
    rawEndpointBoundaryClosed: true,
    providerClientBoundaryClosed: true,
    connectionBoundaryClosed: true,
    writeBoundaryClosed: true,
    autoStartBoundaryClosed: true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate: false,
  };
}

function createSummary(
  sourceNodeV296: SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference,
  candidateGate: DisabledRuntimeShellImplementationCandidateGate,
  checks: DisabledRuntimeShellImplementationCandidateGateChecks,
  productionBlockers: DisabledRuntimeShellImplementationCandidateGateMessage[],
  warnings: DisabledRuntimeShellImplementationCandidateGateMessage[],
  recommendations: DisabledRuntimeShellImplementationCandidateGateMessage[],
): DisabledRuntimeShellImplementationCandidateGateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV296.checkCount,
    sourcePassedCheckCount: sourceNodeV296.passedCheckCount,
    requiredGateCount: candidateGate.requiredGateCount,
    documentedGateCount: candidateGate.documentedGateCount,
    reviewEvidenceSatisfiedCount: candidateGate.reviewEvidenceSatisfiedCount,
    runtimePrerequisiteSatisfiedCount: candidateGate.runtimePrerequisiteSatisfiedCount,
    implementationAllowedGateCount: candidateGate.implementationAllowedGateCount,
    stopConditionCount: candidateGate.stopConditions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellImplementationCandidateGateChecks,
): DisabledRuntimeShellImplementationCandidateGateMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledRuntimeShellImplementationCandidateGateMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV296Ready,
      code: "SOURCE_NODE_V296_NOT_READY",
      source: "node-v296-disabled-runtime-shell-upstream-echo-verification",
      message: "Node v297 must consume a ready Node v296 upstream echo verification.",
    },
    {
      condition: checks.sourceNodeV296KeepsImplementationBlocked,
      code: "SOURCE_NODE_V296_IMPLEMENTATION_NOT_BLOCKED",
      source: "node-v296-disabled-runtime-shell-upstream-echo-verification",
      message: "Node v296 must keep runtime shell implementation and invocation blocked.",
    },
    {
      condition: checks.sourceNodeV296KeepsSideEffectsClosed,
      code: "SOURCE_NODE_V296_SIDE_EFFECT_BOUNDARY_OPENED",
      source: "node-v296-disabled-runtime-shell-upstream-echo-verification",
      message: "Node v296 must keep credential, endpoint, provider/client, network, write, and auto-start boundaries closed.",
    },
    {
      condition: checks.candidateGateCountStable,
      code: "CANDIDATE_GATE_COUNT_UNSTABLE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Node v297 must evaluate exactly five runtime-shell candidate gates.",
    },
    {
      condition: checks.allCandidateGatesReviewEvidenceSatisfied,
      code: "CANDIDATE_GATE_REVIEW_EVIDENCE_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Every runtime-shell candidate gate must have review evidence before Java v134 and mini-kv v131 echo it.",
    },
    {
      condition: checks.candidateGateKeepsRuntimeBlocked,
      code: "CANDIDATE_GATE_OPENED_RUNTIME",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Node v297 must not satisfy runtime prerequisites or allow implementation.",
    },
    {
      condition: checks.necessityDocumented,
      code: "NECESSITY_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Node v297 must document blocker, consumer, cannot-reuse reason, and stop condition.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v297 candidate gate review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v297 candidate gate review.",
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

function collectWarnings(): DisabledRuntimeShellImplementationCandidateGateMessage[] {
  return [
    {
      code: "CANDIDATE_GATE_ONLY_DEFAULT_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Node v297 reviews candidate prerequisites but keeps runtime shell implementation blocked.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_BEFORE_NODE_V298",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Node v298 must wait for Java v134 and mini-kv v131 echoes before verifying this candidate gate.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellImplementationCandidateGateMessage[] {
  return [
    {
      code: "RUN_PARALLEL_JAVA_V134_MINI_KV_V131",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "After v297 is archived, Java v134 and mini-kv v131 can run in parallel because both only consume Node v297 evidence.",
    },
    {
      code: "VERIFY_WITH_NODE_V298_AFTER_UPSTREAM_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate",
      message: "Use Node v298 to verify Java v134 and mini-kv v131 echo receipts; do not implement a runtime shell in v298.",
    },
  ];
}

function hasGate(
  candidateGate: DisabledRuntimeShellImplementationCandidateGate,
  code: DisabledRuntimeShellImplementationCandidateGateCode,
): boolean {
  return candidateGate.requiredGates.some((gateItem) =>
    gateItem.code === code
    && gateItem.documentedForGateReview
    && gateItem.reviewEvidenceSatisfied
    && gateItem.runtimePrerequisiteSatisfied === false
    && gateItem.implementationAllowed === false);
}

function arrayEquals<T>(left: readonly T[], right: readonly T[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
