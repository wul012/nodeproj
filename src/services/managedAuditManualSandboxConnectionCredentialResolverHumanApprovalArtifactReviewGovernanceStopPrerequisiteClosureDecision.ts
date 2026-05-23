import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
  type HumanApprovalArtifactReviewPostEchoPrerequisiteId,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.js";
import type {
  HumanApprovalArtifactReviewGovernanceStopPrerequisite,
  HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
  HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks,
  HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage,
  HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionProfile,
  SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision";
const SOURCE_NODE_V311_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification";
const ACTIVE_PLAN =
  "docs/plans2/v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionProfile {
  const sourceNodeV311 = createSourceNodeV311(input.config);
  const closureDecision = createClosureDecision(sourceNodeV311);
  const checks = createChecks(input.config, sourceNodeV311, closureDecision);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision")
      .every(([, value]) => value);
  const decisionState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision
    ? "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV311, closureDecision, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver human approval artifact review governance stop prerequisite closure decision",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionState,
    governanceChainDecision: "pause-governance-chain-until-concrete-prerequisite-artifacts-exist",
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
    readOnlyClosureDecision: true,
    humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionOnly: true,
    consumesNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification: true,
    activeNodeDecisionVersion: "Node v312",
    readyForNewJavaMiniKvEchoRequest: false,
    newJavaMiniKvEchoRequested: false,
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
    sourceNodeV311,
    closureDecision,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionJson: ROUTE_PATH,
      humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV311Json: SOURCE_NODE_V311_ROUTE,
      sourceNodeV311Markdown: `${SOURCE_NODE_V311_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v312 as the governance stop/prerequisite closure decision that consumes Node v311.",
      "Do not request another Java + mini-kv echo until a concrete prerequisite contract exists.",
      "Keep the runtime shell, credential value, raw endpoint URL, provider/client, network request, ledger, schema, and auto-start boundaries closed.",
    ],
  };
}

function createSourceNodeV311(
  config: AppConfig,
): SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v311",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForPostEchoDecisionUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    decisionGateContractAligned: source.echoVerification.decisionGateContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    originalPrerequisiteCount: source.summary.prerequisiteCount,
    originalMissingPrerequisiteCount: source.summary.missingPrerequisiteCount,
    noGoConditionCount: source.summary.noGoConditionCount,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
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

function createClosureDecision(
  sourceNodeV311: SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference,
): HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision {
  const javaMiniKvEcho = getHumanApprovalArtifactReviewPostEchoPrerequisite(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID);
  const completedPrerequisites: HumanApprovalArtifactReviewGovernanceStopPrerequisite[] = [
    {
      id: javaMiniKvEcho.id,
      label: javaMiniKvEcho.closureLabel,
      closureState: "completed-by-node-v311",
      evidence: "Node v311 verified Java v144 and mini-kv v137 echoed Node v310 decision gate.",
      requiredBeforeRuntimeShell: true,
      opensRuntimeShell: false,
    },
  ];
  const remainingPrerequisites = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG
    .filter((entry) => entry.id !== JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID)
    .map((entry) => missing(entry.id));
  const record = {
    decisionMode: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-only" as const,
    sourceSpan: "Node v311" as const,
    sourceVerificationDigest: sourceNodeV311.verificationDigest,
    completedPrerequisites,
    remainingPrerequisites,
    completedPrerequisiteCount: completedPrerequisites.length,
    remainingPrerequisiteCount: remainingPrerequisites.length,
    originalPrerequisiteCount: sourceNodeV311.originalPrerequisiteCount,
    noGoConditionCount: sourceNodeV311.noGoConditionCount,
    chainContinuationAllowed: false as const,
    nextConcretePrerequisiteContractRequired: true as const,
    nextJavaVersionRequested: null,
    nextMiniKvVersionRequested: null,
    nextNodeVersionSuggested: null,
    pauseReason:
      "Only java-mini-kv-decision-echo is closed; five human/non-secret approval prerequisites still do not exist.",
  };

  return {
    decisionDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function missing(
  id: Exclude<HumanApprovalArtifactReviewPostEchoPrerequisiteId, typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID>,
): HumanApprovalArtifactReviewGovernanceStopPrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "still-missing",
    evidence: entry.closureMissingEvidence,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV311: SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference,
  closureDecision: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
): HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks {
  return {
    sourceNodeV311Ready: sourceNodeV311.readyForPostEchoDecisionUpstreamEchoVerification,
    sourceNodeV311AlignedWithJavaMiniKv:
      sourceNodeV311.upstreamEchoAligned
      && sourceNodeV311.decisionGateContractAligned
      && sourceNodeV311.sideEffectBoundariesAligned,
    sourceNodeV311KeepsRuntimeBlocked:
      sourceNodeV311.implementationStillBlocked
      && sourceNodeV311.runtimeShellImplemented === false
      && sourceNodeV311.runtimeShellInvocationAllowed === false,
    sourceNodeV311KeepsSideEffectsClosed:
      sourceNodeV311.executionAllowed === false
      && sourceNodeV311.connectsManagedAudit === false
      && sourceNodeV311.credentialValueRead === false
      && sourceNodeV311.rawEndpointUrlParsed === false
      && sourceNodeV311.externalRequestSent === false
      && sourceNodeV311.schemaMigrationExecuted === false
      && sourceNodeV311.approvalLedgerWritten === false
      && sourceNodeV311.automaticUpstreamStart === false,
    javaMiniKvDecisionEchoClosed:
      closureDecision.completedPrerequisites.length === 1
      && closureDecision.completedPrerequisites[0]?.id === JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
    exactlyOnePrerequisiteClosed: closureDecision.completedPrerequisiteCount === 1,
    fivePrerequisitesRemainMissing:
      closureDecision.remainingPrerequisiteCount === 5
      && closureDecision.remainingPrerequisites.every((prerequisite) => prerequisite.closureState === "still-missing"),
    noNewJavaMiniKvEchoRequested:
      closureDecision.nextJavaVersionRequested === null
      && closureDecision.nextMiniKvVersionRequested === null,
    chainPausedWithoutConcretePrerequisite:
      closureDecision.chainContinuationAllowed === false
      && closureDecision.nextConcretePrerequisiteContractRequired === true
      && closureDecision.nextNodeVersionSuggested === null,
    closureDecisionStillReadOnly: true,
    runtimeShellStillBlocked: true,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision:
      false,
  };
}

function collectProductionBlockers(
  checks: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks,
): HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV311Ready
        && checks.sourceNodeV311AlignedWithJavaMiniKv
        && checks.sourceNodeV311KeepsRuntimeBlocked
        && checks.sourceNodeV311KeepsSideEffectsClosed,
      code: "NODE_V311_VERIFICATION_NOT_READY",
      source: "node-v311-human-approval-artifact-review-post-echo-decision-upstream-echo-verification",
      message: "Node v311 must be ready, aligned with Java/mini-kv, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.javaMiniKvDecisionEchoClosed
        && checks.exactlyOnePrerequisiteClosed
        && checks.fivePrerequisitesRemainMissing,
      code: "PREREQUISITE_CLOSURE_COUNTS_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
      message: "v312 must close only java-mini-kv-decision-echo and keep the remaining five prerequisites missing.",
    },
    {
      condition:
        checks.noNewJavaMiniKvEchoRequested
        && checks.chainPausedWithoutConcretePrerequisite
        && checks.closureDecisionStillReadOnly
        && checks.runtimeShellStillBlocked,
      code: "GOVERNANCE_CHAIN_NOT_PAUSED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
      message: "The governance chain must pause without requesting more upstream echo until a concrete prerequisite contract exists.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v312 closure decision.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v312 closure decision.",
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

function collectWarnings(): HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[] {
  return [
    {
      code: "GOVERNANCE_CHAIN_PAUSED_NOT_RUNTIME_APPROVED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
      message: "v312 closes the Java/mini-kv decision echo prerequisite only; it does not approve a runtime shell or managed audit connection.",
    },
  ];
}

function collectRecommendations(): HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[] {
  return [
    {
      code: "PROVIDE_SIGNED_HUMAN_APPROVAL_ARTIFACT_BEFORE_NEXT_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
      message: "The next meaningful step should produce a signed human approval artifact or another concrete prerequisite contract before asking Java/mini-kv for more echo.",
    },
    {
      code: "KEEP_CHAIN_PAUSED_UNTIL_CONCRETE_PREREQUISITE_EXISTS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
      message: "Do not create another governance echo version unless it resolves one of the five still-missing prerequisites.",
    },
  ];
}

function createSummary(
  sourceNodeV311: SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference,
  closureDecision: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
  checks: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks,
  productionBlockers: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[],
  warnings: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[],
  recommendations: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[],
): HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV311CheckCount: sourceNodeV311.sourceCheckCount,
    sourceNodeV311PassedCheckCount: sourceNodeV311.sourcePassedCheckCount,
    originalPrerequisiteCount: closureDecision.originalPrerequisiteCount,
    completedPrerequisiteCount: closureDecision.completedPrerequisiteCount,
    remainingPrerequisiteCount: closureDecision.remainingPrerequisiteCount,
    noGoConditionCount: closureDecision.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
