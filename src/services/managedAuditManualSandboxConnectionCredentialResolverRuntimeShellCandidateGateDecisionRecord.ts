import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  evidenceFile,
  snippet,
  snippetMatched,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
  RuntimeShellCandidateGateDecisionNoGoCondition,
  RuntimeShellCandidateGateDecisionRecord,
  RuntimeShellCandidateGateDecisionRecordChecks,
  RuntimeShellCandidateGateDecisionRecordMessage,
  RuntimeShellCandidateGateDecisionRecordSummary,
  RuntimeShellCandidateGateDecisionRequirement,
  SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record";
const SOURCE_NODE_V298_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v299-post-runtime-shell-candidate-gate-decision-roadmap.md";
const RECOMMENDED_PARALLEL_JAVA_V135 = "Java v135 runtime shell decision record echo";
const RECOMMENDED_PARALLEL_MINI_KV_V132 = "mini-kv v132 runtime shell decision record non-participation receipt";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile {
  const sourceNodeV298 = createSourceNodeV298(input.config);
  const decisionRecord = createDecisionRecord(sourceNodeV298);
  const checks = createChecks(input.config, sourceNodeV298, decisionRecord);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord")
      .every(([, value]) => value);
  const decisionRecordState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord
    ? "runtime-shell-candidate-gate-decision-record-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV298, decisionRecord, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell candidate gate decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionRecordState,
    runtimeShellDecision: "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
    readOnlyDecisionRecord: true,
    runtimeShellCandidateGateDecisionRecordOnly: true,
    consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: true,
    readyForParallelJavaV135MiniKvV132EchoRequest:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
    readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false,
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
    sourceNodeV298,
    decisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellCandidateGateDecisionRecordJson: ROUTE_PATH,
      runtimeShellCandidateGateDecisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV298Json: SOURCE_NODE_V298_ROUTE,
      sourceNodeV298Markdown: `${SOURCE_NODE_V298_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV135: RECOMMENDED_PARALLEL_JAVA_V135,
      recommendedParallelMiniKvV132: RECOMMENDED_PARALLEL_MINI_KV_V132,
    },
    nextActions: [
      "Archive Node v299 as a blocked decision record, not a runtime implementation.",
      "Use Node v300 only after Java v135 and mini-kv v132 finish their echo work.",
      "Keep credential values, raw endpoint URLs, provider clients, external requests, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV298(config: AppConfig): SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v298",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    runtimeShellCandidateGateUpstreamEchoVerificationOnly: source.runtimeShellCandidateGateUpstreamEchoVerificationOnly,
    consumesJavaV134RuntimeShellCandidateGateEcho: source.consumesJavaV134RuntimeShellCandidateGateEcho,
    consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: source.consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt,
    readyForNodeV299RuntimeShellCandidateGateDecisionRecord: source.readyForNodeV299RuntimeShellCandidateGateDecisionRecord,
    readyForNodeV299RuntimeShellImplementation: source.readyForNodeV299RuntimeShellImplementation,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV297Ready: source.echoVerification.sourceNodeV297Ready,
    javaV134EchoReady: source.echoVerification.javaV134EchoReady,
    miniKvV131ReceiptReady: source.echoVerification.miniKvV131ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    fiveGateSetAligned: source.echoVerification.fiveGateSetAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    javaV134EvidencePresent: source.upstreamEvidence.javaV134.evidencePresent,
    javaV134VerificationDocumented: source.upstreamEvidence.javaV134.verificationDocumented,
    javaV134FirstEvidenceResolvedPath: source.upstreamEvidence.javaV134.evidenceFiles[0]?.resolvedPath ?? null,
    miniKvV131EvidencePresent: source.upstreamEvidence.miniKvV131.evidencePresent,
    miniKvV131VerificationDocumented: source.upstreamEvidence.miniKvV131.verificationDocumented,
    miniKvV131FirstEvidenceResolvedPath: source.upstreamEvidence.miniKvV131.evidenceFiles[0]?.resolvedPath ?? null,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    requiredGateCount: source.summary.requiredGateCount,
    documentedGateCount: source.summary.documentedGateCount,
    reviewEvidenceSatisfiedCount: source.summary.reviewEvidenceSatisfiedCount,
    runtimePrerequisiteSatisfiedCount: source.summary.runtimePrerequisiteSatisfiedCount,
    implementationAllowedGateCount: source.summary.implementationAllowedGateCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellEnabled: source.runtimeShellEnabled,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
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

function createDecisionRecord(
  sourceNodeV298: SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference,
): RuntimeShellCandidateGateDecisionRecord {
  const requiredEvidence = createRequiredEvidence(sourceNodeV298);
  const explicitNoGoConditions = createNoGoConditions();
  const record = {
    recordMode: "runtime-shell-candidate-gate-decision-record-only" as const,
    decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell" as const,
    sourceSpan: "Node v297-v298 + Java v134 + mini-kv v131" as const,
    decision: "blocked" as const,
    decisionReason:
      "Node v298 verified the runtime shell candidate gate echoes, but runtime shell implementation remains blocked until a separate successor plan with explicit approval is produced.",
    upstreamEchoVerified: sourceNodeV298.readyForUpstreamEchoVerification,
    allowsParallelJavaV135MiniKvV132EchoRequest: true as const,
    allowsNodeV300BeforeUpstreamEcho: false as const,
    allowsDisabledRuntimeShellImplementation: false as const,
    allowsDisabledRuntimeShellInvocation: false as const,
    allowsRealResolverImplementation: false as const,
    allowsFakeHarnessRuntimeImplementation: false as const,
    allowsSecretProviderInstantiation: false as const,
    allowsResolverClientInstantiation: false as const,
    allowsCredentialValueRead: false as const,
    allowsRawEndpointUrlParse: false as const,
    allowsExternalRequest: false as const,
    allowsManagedAuditConnection: false as const,
    allowsSchemaMigration: false as const,
    allowsApprovalLedgerWrite: false as const,
    allowsAutomaticUpstreamStart: false as const,
    requiredEvidenceCount: requiredEvidence.length,
    noGoConditionCount: explicitNoGoConditions.length,
    requiredEvidence,
    explicitNoGoConditions,
  } satisfies Omit<RuntimeShellCandidateGateDecisionRecord, "decisionDigest">;

  return {
    decisionDigest: sha256StableJson(record),
    ...record,
  };
}

function createRequiredEvidence(
  sourceNodeV298: SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference,
): RuntimeShellCandidateGateDecisionRequirement[] {
  return [
    requirement(
      "node-v298-upstream-echo-ready",
      "Node v298 upstream echo verification",
      sourceNodeV298.readyForUpstreamEchoVerification ? "present" : "missing",
      "Node v298 readyForUpstreamEchoVerification",
    ),
    requirement(
      "java-v134-echo-ready",
      "Java v134 runtime shell candidate gate echo",
      sourceNodeV298.javaV134EchoReady ? "present" : "missing",
      sourceNodeV298.javaV134EvidencePresent ? "present evidence and documented" : "missing",
    ),
    requirement(
      "mini-kv-v131-receipt-ready",
      "mini-kv v131 runtime shell candidate gate non-participation receipt",
      sourceNodeV298.miniKvV131ReceiptReady ? "present" : "missing",
      sourceNodeV298.miniKvV131EvidencePresent ? "present evidence and documented" : "missing",
    ),
    requirement(
      "runtime-shell-still-blocked",
      "Runtime shell remains blocked",
      sourceNodeV298.implementationStillBlocked ? "present" : "missing",
      "Node v298 still keeps runtime shell blocked",
    ),
  ];
}

function requirement(
  id: string,
  label: string,
  status: RuntimeShellCandidateGateDecisionRequirement["status"],
  currentEvidence: string,
): RuntimeShellCandidateGateDecisionRequirement {
  return {
    id,
    label,
    currentEvidence,
    status,
    requiredBeforeRuntimeShell: true,
  };
}

function createNoGoConditions(): RuntimeShellCandidateGateDecisionNoGoCondition[] {
  return [
    noGo("RUNTIME_SHELL_IMPLEMENTATION_REQUIRED", "The next step would have to implement or invoke a runtime shell."),
    noGo("CREDENTIAL_VALUE_REQUIRED", "The next step would have to read, store, render, or test credential values."),
    noGo("RAW_ENDPOINT_URL_REQUIRED", "The next step would have to parse or render a raw endpoint URL."),
    noGo("MANAGED_AUDIT_CONNECTION_REQUIRED", "The next step would have to open managed audit connectivity."),
    noGo("LEDGER_SCHEMA_WRITE_REQUIRED", "The next step would have to write ledger state or execute schema migration SQL."),
    noGo("AUTOSTART_REQUIRED", "The next step would have to auto-start Java, mini-kv, or managed audit services."),
  ];
}

function noGo(code: string, condition: string): RuntimeShellCandidateGateDecisionNoGoCondition {
  return {
    code,
    condition,
    action: "pause-and-do-not-implement-runtime-shell",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV298: SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference,
  decisionRecord: RuntimeShellCandidateGateDecisionRecord,
): RuntimeShellCandidateGateDecisionRecordChecks {
  return {
    sourceNodeV298Loaded: sourceNodeV298.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification.v1",
    sourceNodeV298Ready: sourceNodeV298.readyForUpstreamEchoVerification,
    sourceNodeV298VerifiedUpstreamEchoes:
      sourceNodeV298.javaV134EchoReady
      && sourceNodeV298.miniKvV131ReceiptReady
      && sourceNodeV298.upstreamEchoAligned
      && sourceNodeV298.fiveGateSetAligned,
    sourceNodeV298KeepsRuntimeBlocked:
      !sourceNodeV298.runtimeShellImplemented
      && !sourceNodeV298.runtimeShellEnabled
      && !sourceNodeV298.runtimeShellInvocationAllowed
      && !sourceNodeV298.executionAllowed
      && !sourceNodeV298.connectsManagedAudit,
    sourceNodeV298KeepsSideEffectsClosed:
      !sourceNodeV298.credentialValueRead
      && !sourceNodeV298.credentialValueProvided
      && !sourceNodeV298.rawEndpointUrlParsed
      && !sourceNodeV298.rawEndpointUrlRendered
      && !sourceNodeV298.externalRequestSent
      && !sourceNodeV298.secretProviderInstantiated
      && !sourceNodeV298.resolverClientInstantiated
      && !sourceNodeV298.fakeSecretProviderInstantiated
      && !sourceNodeV298.fakeResolverClientInstantiated
      && !sourceNodeV298.schemaMigrationExecuted
      && !sourceNodeV298.approvalLedgerWritten
      && !sourceNodeV298.automaticUpstreamStart,
    candidateGateDecisionBlocked: decisionRecord.decision === "blocked" && !decisionRecord.allowsDisabledRuntimeShellImplementation,
    decisionRecordBlocksRuntimeShell:
      decisionRecord.decision === "blocked"
      && !decisionRecord.allowsDisabledRuntimeShellImplementation
      && !decisionRecord.allowsDisabledRuntimeShellInvocation
      && !decisionRecord.allowsRealResolverImplementation
      && !decisionRecord.allowsFakeHarnessRuntimeImplementation,
    decisionRecordStillReadOnly:
      !decisionRecord.allowsSecretProviderInstantiation
      && !decisionRecord.allowsResolverClientInstantiation
      && !decisionRecord.allowsCredentialValueRead
      && !decisionRecord.allowsRawEndpointUrlParse
      && !decisionRecord.allowsExternalRequest
      && !decisionRecord.allowsManagedAuditConnection
      && !decisionRecord.allowsSchemaMigration
      && !decisionRecord.allowsApprovalLedgerWrite
      && !decisionRecord.allowsAutomaticUpstreamStart,
    parallelJavaV135MiniKvV132EchoRecommended: true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord: false,
  };
}

function createSummary(
  sourceNodeV298: SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference,
  decisionRecord: RuntimeShellCandidateGateDecisionRecord,
  checks: RuntimeShellCandidateGateDecisionRecordChecks,
  productionBlockers: RuntimeShellCandidateGateDecisionRecordMessage[],
  warnings: RuntimeShellCandidateGateDecisionRecordMessage[],
  recommendations: RuntimeShellCandidateGateDecisionRecordMessage[],
): RuntimeShellCandidateGateDecisionRecordSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredEvidenceCount: decisionRecord.requiredEvidenceCount,
    missingRequiredEvidenceCount: decisionRecord.requiredEvidence.filter((item) => item.status === "missing").length,
    noGoConditionCount: decisionRecord.noGoConditionCount,
    sourceCheckCount: sourceNodeV298.checkCount,
    sourcePassedCheckCount: sourceNodeV298.passedCheckCount,
    sourceProductionBlockerCount: sourceNodeV298.productionBlockerCount,
    sourceWarningCount: sourceNodeV298.warningCount,
    sourceRecommendationCount: sourceNodeV298.recommendationCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellCandidateGateDecisionRecordChecks,
): RuntimeShellCandidateGateDecisionRecordMessage[] {
  const rules: Array<{
    passed: boolean;
    code: string;
    source: RuntimeShellCandidateGateDecisionRecordMessage["source"];
    message: string;
  }> = [
    {
      passed: checks.sourceNodeV298Loaded,
      code: "SOURCE_NODE_V298_NOT_LOADED",
      source: "node-v298-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Node v299 must consume the Node v298 upstream echo verification.",
    },
    {
      passed: checks.sourceNodeV298Ready,
      code: "SOURCE_NODE_V298_NOT_READY",
      source: "node-v298-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Node v298 must be ready before v299 records the blocked decision.",
    },
    {
      passed: checks.sourceNodeV298VerifiedUpstreamEchoes,
      code: "SOURCE_NODE_V298_ECHOES_NOT_VERIFIED",
      source: "node-v298-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Node v298 must have Java v134 and mini-kv v131 echoes verified.",
    },
    {
      passed: checks.sourceNodeV298KeepsRuntimeBlocked,
      code: "SOURCE_NODE_V298_RUNTIME_OPEN",
      source: "node-v298-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Node v298 must keep runtime shell execution blocked.",
    },
    {
      passed: checks.sourceNodeV298KeepsSideEffectsClosed,
      code: "SOURCE_NODE_V298_SIDE_EFFECTS_OPEN",
      source: "node-v298-runtime-shell-candidate-gate-upstream-echo-verification",
      message: "Node v298 must keep credential, endpoint, network, write, and auto-start boundaries closed.",
    },
    {
      passed: checks.candidateGateDecisionBlocked,
      code: "DECISION_RECORD_NOT_BLOCKED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record",
      message: "v299 must record a blocked runtime shell decision.",
    },
    {
      passed: checks.decisionRecordBlocksRuntimeShell,
      code: "DECISION_RECORD_OPENS_RUNTIME_SHELL",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record",
      message: "The decision record must not allow runtime shell implementation or invocation.",
    },
    {
      passed: checks.decisionRecordStillReadOnly,
      code: "DECISION_RECORD_NOT_READ_ONLY",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record",
      message: "The decision record must remain read-only and must not enable resolver, credential, endpoint, network, write, or auto-start work.",
    },
    {
      passed: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during v299.",
    },
    {
      passed: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during v299.",
    },
  ];

  return rules
    .filter((rule) => !rule.passed)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): RuntimeShellCandidateGateDecisionRecordMessage[] {
  return [
    {
      code: "DECISION_RECORD_ONLY_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record",
      message: "v299 only records the blocked decision; it does not authorize runtime shell implementation or invocation.",
    },
  ];
}

function collectRecommendations(): RuntimeShellCandidateGateDecisionRecordMessage[] {
  return [
    {
      code: "RUN_JAVA_V135_AND_MINIKV_V132_IN_PARALLEL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record",
      message: "Use Node v299 as the boundary and let Java v135 + mini-kv v132 run in parallel as the next echo pair.",
    },
    {
      code: "KEEP_NODE_V300_BEHIND_PARALLEL_EVIDENCE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record",
      message: "Do not start Node v300 until Java v135 and mini-kv v132 are complete.",
    },
  ];
}
