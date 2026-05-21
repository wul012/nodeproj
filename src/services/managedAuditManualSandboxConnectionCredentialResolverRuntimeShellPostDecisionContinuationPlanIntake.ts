import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
} from "./liveProbeReportUtils.js";
import {
  createRuntimeShellPostDecisionContinuationNecessityProof,
  createRuntimeShellPostDecisionContinuationPlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile,
  RuntimeShellPostDecisionContinuationNecessityProof,
  RuntimeShellPostDecisionContinuationPlanIntake,
  RuntimeShellPostDecisionContinuationPlanIntakeChecks,
  RuntimeShellPostDecisionContinuationPlanIntakeMessage,
  RuntimeShellPostDecisionContinuationPlanIntakeSummary,
  SourceNodeV300RuntimeShellDecisionRecordUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake";
const SOURCE_NODE_V300_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v300-post-runtime-shell-decision-record-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeProfile {
  const sourceNodeV300 = createSourceNodeV300(input.config);
  const continuationPlanIntake = createContinuationPlanIntake();
  const necessityProof = createRuntimeShellPostDecisionContinuationNecessityProof({
    profileVersion: PROFILE_VERSION,
    intakeDigest: continuationPlanIntake.intakeDigest,
  });
  const checks = createChecks(input.config, sourceNodeV300, continuationPlanIntake, necessityProof);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake")
      .every(([, value]) => value);
  const planIntakeState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake
    ? "runtime-shell-post-decision-continuation-plan-intake-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV300,
    continuationPlanIntake,
    necessityProof,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell post-decision continuation plan intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    planIntakeState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
    runtimeShellPostDecisionContinuationPlanIntakeOnly: true,
    readOnlyPlanIntake: true,
    consumesNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: true,
    readyForParallelJavaV136MiniKvV133EchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake,
    readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification: false,
    readyForNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: false,
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
    sourceNodeV300,
    continuationPlanIntake,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellPostDecisionContinuationPlanIntakeJson: ROUTE_PATH,
      runtimeShellPostDecisionContinuationPlanIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV300Json: SOURCE_NODE_V300_ROUTE,
      sourceNodeV300Markdown: `${SOURCE_NODE_V300_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v301 as the post-decision continuation plan intake, not a runtime shell implementation.",
      "Ask Java v136 and mini-kv v133 to echo this intake in parallel before Node v303 verifies upstream alignment.",
      "Keep credential values, raw endpoint URLs, provider clients, external requests, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV300(
  config: AppConfig,
): SourceNodeV300RuntimeShellDecisionRecordUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v300",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForRuntimeShellDecisionRecordUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    runtimeShellDecisionRecordUpstreamEchoVerificationOnly:
      source.runtimeShellDecisionRecordUpstreamEchoVerificationOnly,
    consumesNodeV299RuntimeShellCandidateGateDecisionRecord:
      source.consumesNodeV299RuntimeShellCandidateGateDecisionRecord,
    consumesJavaV135RuntimeShellDecisionRecordEcho:
      source.consumesJavaV135RuntimeShellDecisionRecordEcho,
    consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt:
      source.consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt,
    readyForPostRuntimeShellDecisionPlan: source.readyForPostRuntimeShellDecisionPlan,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    blockedDecisionAligned: source.echoVerification.blockedDecisionAligned,
    requiredEvidenceAligned: source.echoVerification.requiredEvidenceAligned,
    noGoConditionsAligned: source.echoVerification.noGoConditionsAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    sourceNodeV299Ready: source.echoVerification.sourceNodeV299Ready,
    javaV135EchoReady: source.echoVerification.javaV135EchoReady,
    miniKvV132ReceiptReady: source.echoVerification.miniKvV132ReceiptReady,
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
  };
}

function createContinuationPlanIntake(): RuntimeShellPostDecisionContinuationPlanIntake {
  return createRuntimeShellPostDecisionContinuationPlanIntake(PROFILE_VERSION);
}

function createChecks(
  config: AppConfig,
  sourceNodeV300: SourceNodeV300RuntimeShellDecisionRecordUpstreamEchoVerificationReference,
  continuationPlanIntake: RuntimeShellPostDecisionContinuationPlanIntake,
  necessityProof: RuntimeShellPostDecisionContinuationNecessityProof,
): RuntimeShellPostDecisionContinuationPlanIntakeChecks {
  return {
    sourceNodeV300Loaded:
      sourceNodeV300.profileVersion ===
        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1",
    sourceNodeV300Ready: sourceNodeV300.readyForRuntimeShellDecisionRecordUpstreamEchoVerification,
    sourceNodeV300ReadyForPostDecisionPlan: sourceNodeV300.readyForPostRuntimeShellDecisionPlan,
    sourceNodeV300KeepsRuntimeBlocked:
      sourceNodeV300.runtimeShellImplemented === false
      && sourceNodeV300.runtimeShellInvocationAllowed === false
      && sourceNodeV300.implementationStillBlocked,
    sourceNodeV300KeepsCredentialBoundaryClosed:
      sourceNodeV300.readsManagedAuditCredential === false
      && sourceNodeV300.storesManagedAuditCredential === false
      && sourceNodeV300.credentialValueRead === false
      && sourceNodeV300.credentialValueProvided === false,
    sourceNodeV300KeepsEndpointBoundaryClosed:
      sourceNodeV300.rawEndpointUrlParsed === false
      && sourceNodeV300.rawEndpointUrlRendered === false,
    sourceNodeV300KeepsConnectionBoundaryClosed:
      sourceNodeV300.connectsManagedAudit === false
      && sourceNodeV300.externalRequestSent === false
      && sourceNodeV300.secretProviderInstantiated === false
      && sourceNodeV300.resolverClientInstantiated === false
      && sourceNodeV300.fakeSecretProviderInstantiated === false
      && sourceNodeV300.fakeResolverClientInstantiated === false,
    sourceNodeV300KeepsWriteBoundaryClosed:
      sourceNodeV300.executionAllowed === false
      && sourceNodeV300.schemaMigrationExecuted === false
      && sourceNodeV300.approvalLedgerWritten === false
      && sourceNodeV300.automaticUpstreamStart === false,
    continuationDecisionSelected:
      continuationPlanIntake.selectedContinuationDecision === "continue-blocked-planning"
      && continuationPlanIntake.selectedDecisionOptionCount === 1,
    decisionOptionsDocumented: continuationPlanIntake.decisionOptionCount === 4,
    runtimeImplementationOptionRejected:
      continuationPlanIntake.rejectedRuntimeImplementationOptionCount === 1
      && continuationPlanIntake.runtimeShellImplementationAllowed === false
      && continuationPlanIntake.runtimeShellInvocationAllowed === false,
    necessityProofHasBlocker: necessityProof.blockerResolved.includes("v300"),
    necessityProofHasConsumer:
      necessityProof.consumer.includes("Java v136")
      && necessityProof.consumer.includes("mini-kv v133")
      && necessityProof.consumer.includes("Node v303"),
    necessityProofExplainsV300ReuseBoundary: necessityProof.whyV300CannotBeReused.includes("v300"),
    necessityProofDefinesStopCondition: necessityProof.stopCondition.includes("credential values"),
    necessityProofComplete: necessityProof.proofComplete,
    runtimeShellImplementationStillForbidden:
      continuationPlanIntake.runtimeShellImplementationAllowed === false,
    runtimeShellInvocationStillForbidden:
      continuationPlanIntake.runtimeShellInvocationAllowed === false,
    providerClientInstantiationStillForbidden:
      continuationPlanIntake.providerClientInstantiationAllowed === false,
    externalRequestStillForbidden: continuationPlanIntake.externalRequestAllowed === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake: false,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellPostDecisionContinuationPlanIntakeChecks,
): RuntimeShellPostDecisionContinuationPlanIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RuntimeShellPostDecisionContinuationPlanIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV300Ready,
      code: "NODE_V300_UPSTREAM_ECHO_NOT_READY",
      source: "node-v300-runtime-shell-decision-record-upstream-echo-verification",
      message: "Node v300 upstream echo verification must be ready before v301 can choose a post-decision continuation path.",
    },
    {
      condition: checks.sourceNodeV300KeepsRuntimeBlocked,
      code: "NODE_V300_RUNTIME_BOUNDARY_OPEN",
      source: "node-v300-runtime-shell-decision-record-upstream-echo-verification",
      message: "Node v300 must keep runtime shell implementation and invocation blocked.",
    },
    {
      condition: checks.sourceNodeV300KeepsCredentialBoundaryClosed,
      code: "NODE_V300_CREDENTIAL_BOUNDARY_OPEN",
      source: "node-v300-runtime-shell-decision-record-upstream-echo-verification",
      message: "Node v300 must not read, store, or provide credential values.",
    },
    {
      condition: checks.sourceNodeV300KeepsEndpointBoundaryClosed,
      code: "NODE_V300_ENDPOINT_BOUNDARY_OPEN",
      source: "node-v300-runtime-shell-decision-record-upstream-echo-verification",
      message: "Node v300 must not parse or render raw endpoint URLs.",
    },
    {
      condition: checks.sourceNodeV300KeepsConnectionBoundaryClosed,
      code: "NODE_V300_CONNECTION_BOUNDARY_OPEN",
      source: "node-v300-runtime-shell-decision-record-upstream-echo-verification",
      message: "Node v300 must not instantiate providers, clients, fake clients, or external connections.",
    },
    {
      condition: checks.continuationDecisionSelected && checks.decisionOptionsDocumented,
      code: "CONTINUATION_DECISION_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake",
      message: "v301 must document continuation, pause, explicit-prerequisite, and rejected runtime implementation options.",
    },
    {
      condition: checks.necessityProofComplete,
      code: "NECESSITY_PROOF_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake",
      message: "v301 must state blocker, consumer, v300 reuse boundary, and stop condition.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v301 post-decision plan intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v301 post-decision plan intake.",
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

function collectWarnings(): RuntimeShellPostDecisionContinuationPlanIntakeMessage[] {
  return [
    {
      code: "CONTINUATION_PLAN_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake",
      message: "v301 selects continued blocked planning only; it does not approve runtime shell implementation or invocation.",
    },
  ];
}

function collectRecommendations(): RuntimeShellPostDecisionContinuationPlanIntakeMessage[] {
  return [
    {
      code: "REQUEST_PARALLEL_JAVA_MINI_KV_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake",
      message: "After v301, ask Java v136 and mini-kv v133 to echo this intake in parallel before Node v303.",
    },
    {
      code: "STOP_CHAIN_AFTER_V303_WITHOUT_NEW_BLOCKER",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake",
      message: "After Node v303, do not add another echo stage unless a new blocker and consumer are named.",
    },
  ];
}

function createSummary(
  sourceNodeV300: SourceNodeV300RuntimeShellDecisionRecordUpstreamEchoVerificationReference,
  continuationPlanIntake: RuntimeShellPostDecisionContinuationPlanIntake,
  necessityProof: RuntimeShellPostDecisionContinuationNecessityProof,
  checks: RuntimeShellPostDecisionContinuationPlanIntakeChecks,
  productionBlockers: RuntimeShellPostDecisionContinuationPlanIntakeMessage[],
  warnings: RuntimeShellPostDecisionContinuationPlanIntakeMessage[],
  recommendations: RuntimeShellPostDecisionContinuationPlanIntakeMessage[],
): RuntimeShellPostDecisionContinuationPlanIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV300.checkCount,
    sourcePassedCheckCount: sourceNodeV300.passedCheckCount,
    sourceProductionBlockerCount: sourceNodeV300.productionBlockerCount,
    continuationOptionCount: continuationPlanIntake.decisionOptionCount,
    selectedContinuationOptionCount: continuationPlanIntake.selectedDecisionOptionCount,
    rejectedRuntimeImplementationOptionCount:
      continuationPlanIntake.rejectedRuntimeImplementationOptionCount,
    proofComplete: necessityProof.proofComplete,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
