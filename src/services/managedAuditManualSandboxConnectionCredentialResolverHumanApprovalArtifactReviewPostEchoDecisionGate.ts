import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import { HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.js";
import type {
  HumanApprovalArtifactReviewPostEchoDecisionGate,
  HumanApprovalArtifactReviewPostEchoDecisionGateChecks,
  HumanApprovalArtifactReviewPostEchoDecisionGateMessage,
  HumanApprovalArtifactReviewPostEchoDecisionGateSummary,
  HumanApprovalArtifactReviewPostEchoDecisionNecessityProof,
  HumanApprovalArtifactReviewPostEchoNoGoCondition,
  HumanApprovalArtifactReviewPostEchoPrerequisite,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile,
  SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate";
const SOURCE_NODE_V309_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v309-post-human-approval-artifact-review-upstream-echo-roadmap.md";
const RECOMMENDED_PARALLEL_JAVA_V144 = "Java v144 human approval artifact review post-echo decision gate echo";
const RECOMMENDED_PARALLEL_MINI_KV_V137 =
  "mini-kv v137 human approval artifact review post-echo decision gate non-participation receipt";

export function loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile {
  const sourceNodeV309 = createSourceNodeV309(input.config);
  const decisionGate = createDecisionGate(sourceNodeV309);
  const checks = createChecks(input.config, sourceNodeV309, decisionGate);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate")
      .every(([, value]) => value);
  const decisionGateState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate
    ? "human-approval-artifact-review-post-echo-decision-gate-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV309, decisionGate, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionGateState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
    readOnlyDecisionGate: true,
    humanApprovalArtifactReviewPostEchoDecisionGateOnly: true,
    consumesNodeV309HumanApprovalArtifactReviewUpstreamEchoVerification: true,
    readyForParallelJavaV144MiniKvV137EchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
    readyForNodeV311PostEchoDecisionUpstreamEchoVerification: false,
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
    sourceNodeV309,
    decisionGate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      humanApprovalArtifactReviewPostEchoDecisionGateJson: ROUTE_PATH,
      humanApprovalArtifactReviewPostEchoDecisionGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV309Json: SOURCE_NODE_V309_ROUTE,
      sourceNodeV309Markdown: `${SOURCE_NODE_V309_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV144: RECOMMENDED_PARALLEL_JAVA_V144,
      recommendedParallelMiniKvV137: RECOMMENDED_PARALLEL_MINI_KV_V137,
    },
    nextActions: [
      "Archive Node v310 as a post-echo decision gate, not as runtime shell approval.",
      "If the chain continues, run Java v144 and mini-kv v137 in parallel as read-only echoes of this decision gate before Node v311.",
      "Keep credential values, raw endpoint URLs, provider clients, HTTP/TCP, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, authority state, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV309(
  config: AppConfig,
): SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v309",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForHumanApprovalArtifactReviewUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    activeNodeVerificationVersion: source.activeNodeVerificationVersion,
    verificationDigest: source.echoVerification.verificationDigest,
    verificationMode: source.echoVerification.verificationMode,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV308Ready: source.echoVerification.sourceNodeV308Ready,
    javaV143EchoReady: source.echoVerification.javaV143EchoReady,
    miniKvV136ReceiptReady: source.echoVerification.miniKvV136ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    reviewPacketContractAligned: source.echoVerification.reviewPacketContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    sourceNodeV308ReviewPacketDigest: source.sourceNodeV308.reviewPacketDigest,
    sourceNodeV308RequiredFieldCount: source.sourceNodeV308.reviewPacket.requiredFieldCount,
    sourceNodeV308ProhibitedFieldCount: source.sourceNodeV308.reviewPacket.prohibitedFieldCount,
    sourceNodeV308RejectionReasonCount: source.sourceNodeV308.reviewPacket.rejectionReasonCount,
    sourceNodeV308MissingFieldCheckCount: source.sourceNodeV308.reviewPacket.missingFieldCheckCount,
    sourceNodeV308NoGoBoundaryCount: source.sourceNodeV308.reviewPacket.noGoBoundaryCount,
    sourceNodeV308UpstreamEchoRequestCount: source.sourceNodeV308.reviewPacket.upstreamEchoRequestCount,
    sourceChecks: source.checks,
    sourceSummary: source.summary,
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

function createDecisionGate(
  sourceNodeV309: SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference,
): HumanApprovalArtifactReviewPostEchoDecisionGate {
  const requiredPrerequisites = createRequiredPrerequisites();
  const explicitNoGoConditions = createNoGoConditions();
  const necessityProof = createNecessityProof();
  const record = {
    gateMode: "human-approval-artifact-review-post-echo-decision-gate-only" as const,
    decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review" as const,
    sourceSpan: "Node v308 + Java v143 + mini-kv v136 + Node v309" as const,
    decision: "continue-only-as-blocked-post-echo-prerequisite-review" as const,
    decisionReason:
      "Node v309 aligned Java v143 and mini-kv v136 with the Node v308 review packet, but it did not provide a signed artifact instance, credential-handle approval, endpoint allowlist approval, no-network safety evidence, abort semantics, or upstream echo of this decision gate.",
    selectedPath: "request-read-only-upstream-decision-echo-before-any-runtime-shell" as const,
    allowsParallelJavaV144MiniKvV137EchoRequest:
      sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification,
    allowsNodeV311BeforeUpstreamEcho: false as const,
    allowsDisabledRuntimeShellImplementation: false as const,
    allowsDisabledRuntimeShellInvocation: false as const,
    allowsRealResolverImplementation: false as const,
    allowsSecretProviderInstantiation: false as const,
    allowsResolverClientInstantiation: false as const,
    allowsCredentialValueRead: false as const,
    allowsRawEndpointUrlParse: false as const,
    allowsExternalRequest: false as const,
    allowsManagedAuditConnection: false as const,
    allowsSchemaMigration: false as const,
    allowsApprovalLedgerWrite: false as const,
    allowsAutomaticUpstreamStart: false as const,
    prerequisiteCount: requiredPrerequisites.length,
    missingPrerequisiteCount: requiredPrerequisites.length,
    noGoConditionCount: explicitNoGoConditions.length,
    requiredPrerequisites,
    explicitNoGoConditions,
    necessityProof,
  } satisfies Omit<HumanApprovalArtifactReviewPostEchoDecisionGate, "decisionDigest">;

  return {
    decisionDigest: sha256StableJson(record),
    ...record,
  };
}

function createRequiredPrerequisites(): HumanApprovalArtifactReviewPostEchoPrerequisite[] {
  return HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.map((entry) => ({
    id: entry.id,
    label: entry.decisionGateLabel,
    currentEvidence: entry.documentedMissingEvidence,
    status: "documented-missing",
    requiredBeforeRuntimeShell: true,
  }));
}

function createNoGoConditions(): HumanApprovalArtifactReviewPostEchoNoGoCondition[] {
  return [
    noGo("RUNTIME_SHELL_IMPLEMENTATION_REQUESTED", "Any next step asks Node to implement runtime shell code."),
    noGo("RUNTIME_SHELL_INVOCATION_REQUESTED", "Any next step asks Node to invoke a runtime shell."),
    noGo("CREDENTIAL_VALUE_READ_REQUESTED", "Any next step asks Node, Java, or mini-kv to read credential values."),
    noGo("RAW_ENDPOINT_URL_PARSE_REQUESTED", "Any next step asks Node to parse or render a raw endpoint URL."),
    noGo("PROVIDER_CLIENT_INSTANTIATION_REQUESTED", "Any next step asks Node to instantiate providers or resolver clients."),
    noGo("EXTERNAL_REQUEST_REQUESTED", "Any next step asks Node to send HTTP/TCP to managed audit."),
    noGo("LEDGER_OR_SCHEMA_WRITE_REQUESTED", "Any next step asks Java or Node to write ledger/schema state."),
    noGo("MINIKV_WRITE_OR_AUTHORITY_REQUESTED", "Any next step asks mini-kv to run LOAD/COMPACT/RESTORE/SETNXEX or become authority."),
    noGo("AUTOMATIC_UPSTREAM_START_REQUESTED", "Any next step asks Node to automatically start Java, mini-kv, or external audit services."),
  ];
}

function noGo(code: string, condition: string): HumanApprovalArtifactReviewPostEchoNoGoCondition {
  return { code, condition, action: "pause-and-do-not-implement-runtime-shell" };
}

function createNecessityProof(): HumanApprovalArtifactReviewPostEchoDecisionNecessityProof {
  return {
    blockerResolved:
      "v309 aligned the Java v143 and mini-kv v136 echoes, but it did not decide whether post-echo work may continue or which approval prerequisites remain missing.",
    consumer: "Java v144 and mini-kv v137, then Node v311",
    whyV309CannotBeReused:
      "v309 is an upstream echo verification only; it proves alignment but does not publish a decision gate that upstreams can echo before any later runtime-shell discussion.",
    existingReportReuseDecision:
      "Reuse v309 as source evidence, but create v310 as the minimal decision layer that names the still-missing post-echo prerequisites.",
    stopCondition:
      "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, mini-kv write/admin commands, authority state, or automatic upstream start.",
    proofComplete: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV309: SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference,
  decisionGate: HumanApprovalArtifactReviewPostEchoDecisionGate,
): HumanApprovalArtifactReviewPostEchoDecisionGateChecks {
  return {
    sourceNodeV309Loaded:
      sourceNodeV309.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1",
    sourceNodeV309Ready: sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification,
    sourceNodeV309UpstreamEchoAligned:
      sourceNodeV309.upstreamEchoAligned
      && sourceNodeV309.reviewPacketContractAligned
      && sourceNodeV309.sideEffectBoundariesAligned
      && sourceNodeV309.sourceNodeV308Ready
      && sourceNodeV309.javaV143EchoReady
      && sourceNodeV309.miniKvV136ReceiptReady,
    sourceNodeV309KeepsRuntimeBlocked:
      sourceNodeV309.runtimeShellImplemented === false
      && sourceNodeV309.runtimeShellInvocationAllowed === false
      && sourceNodeV309.implementationStillBlocked,
    sourceNodeV309KeepsSideEffectsClosed:
      sourceNodeV309.executionAllowed === false
      && sourceNodeV309.connectsManagedAudit === false
      && sourceNodeV309.credentialValueRead === false
      && sourceNodeV309.rawEndpointUrlParsed === false
      && sourceNodeV309.externalRequestSent === false
      && sourceNodeV309.schemaMigrationExecuted === false
      && sourceNodeV309.approvalLedgerWritten === false
      && sourceNodeV309.automaticUpstreamStart === false,
    decisionSelectsPostEchoPrerequisiteGate:
      decisionGate.decision === "continue-only-as-blocked-post-echo-prerequisite-review"
      && decisionGate.selectedPath === "request-read-only-upstream-decision-echo-before-any-runtime-shell",
    decisionGateBlocksRuntimeShell:
      decisionGate.allowsDisabledRuntimeShellImplementation === false
      && decisionGate.allowsDisabledRuntimeShellInvocation === false
      && decisionGate.allowsCredentialValueRead === false
      && decisionGate.allowsRawEndpointUrlParse === false
      && decisionGate.allowsExternalRequest === false
      && decisionGate.allowsManagedAuditConnection === false,
    decisionGateStillReadOnly:
      decisionGate.allowsSchemaMigration === false
      && decisionGate.allowsApprovalLedgerWrite === false
      && decisionGate.allowsAutomaticUpstreamStart === false,
    postEchoPrerequisitesDocumented:
      decisionGate.prerequisiteCount === 6
      && decisionGate.requiredPrerequisites.every((item) => item.requiredBeforeRuntimeShell),
    missingPrerequisitesBlockImplementation:
      decisionGate.missingPrerequisiteCount === decisionGate.prerequisiteCount,
    necessityProofComplete: decisionGate.necessityProof.proofComplete,
    parallelJavaV144MiniKvV137EchoRecommended:
      decisionGate.allowsParallelJavaV144MiniKvV137EchoRequest
      && decisionGate.allowsNodeV311BeforeUpstreamEcho === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate: false,
  };
}

function collectProductionBlockers(
  checks: HumanApprovalArtifactReviewPostEchoDecisionGateChecks,
): HumanApprovalArtifactReviewPostEchoDecisionGateMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: HumanApprovalArtifactReviewPostEchoDecisionGateMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV309Ready && checks.sourceNodeV309UpstreamEchoAligned,
      code: "NODE_V309_NOT_READY",
      source: "node-v309-human-approval-artifact-review-upstream-echo-verification",
      message: "Node v309 upstream echo verification must be ready before v310 can publish the post-echo decision gate.",
    },
    {
      condition: checks.sourceNodeV309KeepsRuntimeBlocked && checks.sourceNodeV309KeepsSideEffectsClosed,
      code: "NODE_V309_BOUNDARY_OPEN",
      source: "node-v309-human-approval-artifact-review-upstream-echo-verification",
      message: "Node v309 must keep runtime shell and side-effect boundaries closed.",
    },
    {
      condition:
        checks.decisionSelectsPostEchoPrerequisiteGate
        && checks.decisionGateBlocksRuntimeShell
        && checks.decisionGateStillReadOnly
        && checks.postEchoPrerequisitesDocumented
        && checks.missingPrerequisitesBlockImplementation,
      code: "POST_ECHO_DECISION_GATE_NOT_BLOCKING_RUNTIME",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate",
      message: "v310 must remain a blocked post-echo prerequisite gate, not a runtime implementation approval.",
    },
    {
      condition: checks.necessityProofComplete && checks.parallelJavaV144MiniKvV137EchoRecommended,
      code: "NECESSITY_OR_CONSUMER_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate",
      message: "v310 must name its blocker, consumer, stop condition, and parallel Java/mini-kv echo lane.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v310 decision gate.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v310 decision gate.",
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

function collectWarnings(): HumanApprovalArtifactReviewPostEchoDecisionGateMessage[] {
  return [
    {
      code: "POST_ECHO_DECISION_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate",
      message: "v310 documents missing post-echo prerequisites and recommends upstream echo only; it does not approve runtime shell implementation.",
    },
  ];
}

function collectRecommendations(): HumanApprovalArtifactReviewPostEchoDecisionGateMessage[] {
  return [
    {
      code: "RUN_JAVA_V144_AND_MINIKV_V137_IN_PARALLEL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate",
      message: "If the chain continues, run Java v144 and mini-kv v137 in parallel as read-only echoes of this decision gate.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate",
      message: "Keep runtime shell implementation blocked until a signed artifact instance and no-network safety evidence exist.",
    },
  ];
}

function createSummary(
  sourceNodeV309: SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference,
  decisionGate: HumanApprovalArtifactReviewPostEchoDecisionGate,
  checks: HumanApprovalArtifactReviewPostEchoDecisionGateChecks,
  productionBlockers: HumanApprovalArtifactReviewPostEchoDecisionGateMessage[],
  warnings: HumanApprovalArtifactReviewPostEchoDecisionGateMessage[],
  recommendations: HumanApprovalArtifactReviewPostEchoDecisionGateMessage[],
): HumanApprovalArtifactReviewPostEchoDecisionGateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV309.sourceSummary.checkCount,
    sourcePassedCheckCount: sourceNodeV309.sourceSummary.passedCheckCount,
    sourceProductionBlockerCount: sourceNodeV309.sourceSummary.productionBlockerCount,
    sourceWarningCount: sourceNodeV309.sourceSummary.warningCount,
    sourceRecommendationCount: sourceNodeV309.sourceSummary.recommendationCount,
    requiredFieldCount: sourceNodeV309.sourceNodeV308RequiredFieldCount,
    prohibitedFieldCount: sourceNodeV309.sourceNodeV308ProhibitedFieldCount,
    rejectionReasonCount: sourceNodeV309.sourceNodeV308RejectionReasonCount,
    missingFieldCheckCount: sourceNodeV309.sourceNodeV308MissingFieldCheckCount,
    noGoBoundaryCount: sourceNodeV309.sourceNodeV308NoGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV309.sourceNodeV308UpstreamEchoRequestCount,
    prerequisiteCount: decisionGate.prerequisiteCount,
    missingPrerequisiteCount: decisionGate.missingPrerequisiteCount,
    noGoConditionCount: decisionGate.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
