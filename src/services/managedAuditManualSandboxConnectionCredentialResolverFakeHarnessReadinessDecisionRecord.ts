import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.js";
import type {
  FakeHarnessReadinessDecisionRecord,
  FakeHarnessReadinessDecisionRecordChecks,
  FakeHarnessReadinessDecisionRecordMessage,
  FakeHarnessReadinessDecisionRecordSummary,
  FakeHarnessReadinessNoGoCondition,
  FakeHarnessReadinessRequirement,
  ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile,
  SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record";
const NODE_V291_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md";
const NEXT_PLAN = "docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile {
  const sourceNodeV291 = createSourceNodeV291(input.config);
  const readinessDecisionRecord = createReadinessDecisionRecord(sourceNodeV291);
  const checks = createChecks(input.config, sourceNodeV291, readinessDecisionRecord);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord")
      .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV291, readinessDecisionRecord, checks, productionBlockers, warnings, recommendations);
  const decisionRecordState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord
    ? "fake-harness-readiness-decision-record-ready"
    : "blocked";

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver fake harness readiness decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionRecordState,
    readinessDecision: "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord,
    readOnlyDecisionRecord: true,
    fakeHarnessReadinessDecisionOnly: true,
    consumesNodeV291ExecutionDeniedUpstreamEchoVerification: true,
    readyForDisabledRuntimeShellPlanning: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
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
    sourceNodeV291,
    readinessDecisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      fakeHarnessReadinessDecisionRecordJson: ROUTE_PATH,
      fakeHarnessReadinessDecisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV291Json: NODE_V291_ROUTE,
      sourceNodeV291Markdown: `${NODE_V291_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v292 as a blocked fake harness readiness decision record.",
      "Open a successor plan before any further fake harness runtime shell work.",
      "Prefer a direct Java execution-denied echo before Node designs any disabled runtime shell.",
      "Keep credential values, raw endpoint URLs, resolver clients, external requests, managed audit connections, schema migration, ledger writes, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV291(config: AppConfig): SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v291",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForExecutionDeniedUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV290Ready: source.echoVerification.sourceNodeV290Ready,
    javaV127V130QualityEvidenceReady: source.echoVerification.javaV127V130QualityEvidenceReady,
    javaExecutionDeniedEchoMissing: source.echoVerification.javaExecutionDeniedEchoMissing,
    javaExecutionDeniedEchoPresent: source.checks.javaExecutionDeniedEchoPresent,
    miniKvV128NonParticipationReady: source.echoVerification.miniKvV128NonParticipationReady,
    miniKvPreflightDigestAligned: source.echoVerification.miniKvPreflightDigestAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    executionDeniedUpstreamEchoVerificationOnly: source.executionDeniedUpstreamEchoVerificationOnly,
    readyForManagedAuditResolverImplementation: source.readyForManagedAuditResolverImplementation,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    readyForProductionAudit: source.readyForProductionAudit,
    readyForProductionWindow: source.readyForProductionWindow,
    readyForProductionOperations: source.readyForProductionOperations,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    testOnlyFakeHarnessAllowed: source.testOnlyFakeHarnessAllowed,
    testOnlyFakeHarnessExecutionAllowed: source.testOnlyFakeHarnessExecutionAllowed,
    fakeHarnessRuntimeEnabled: source.fakeHarnessRuntimeEnabled,
    fakeHarnessInvocationAllowed: source.fakeHarnessInvocationAllowed,
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

function createReadinessDecisionRecord(
  sourceNodeV291: SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference,
): FakeHarnessReadinessDecisionRecord {
  const requiredEvidence = createRequiredEvidence(sourceNodeV291);
  const explicitNoGoConditions = createNoGoConditions();
  const record = {
    recordMode: "credential-resolver-fake-harness-readiness-decision-record-only" as const,
    decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness" as const,
    sourceSpan: "Node v287-v291" as const,
    decision: "blocked" as const,
    decisionReason:
      "Node v291 consumed Node v290, Java v127-v130, and mini-kv v128, but Java still lacks a direct execution-denied echo; Node must not enter disabled runtime shell planning from quality evidence alone.",
    allowsDisabledRuntimeShellPlanning: false as const,
    allowsFakeHarnessRuntimeImplementation: false as const,
    allowsFakeHarnessRuntimeInvocation: false as const,
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
    requiredEvidenceCount: requiredEvidence.length,
    noGoConditionCount: explicitNoGoConditions.length,
    requiredEvidence,
    explicitNoGoConditions,
  };

  return {
    decisionDigest: sha256StableJson(record),
    ...record,
  };
}

function createRequiredEvidence(
  sourceNodeV291: SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference,
): FakeHarnessReadinessRequirement[] {
  return [
    requirement(
      "node-v290-execution-denied-route-preflight",
      "Node v290 execution-denied route preflight",
      sourceNodeV291.sourceNodeV290Ready ? "present" : "missing",
      "Node v291 sourceNodeV290Ready",
    ),
    requirement(
      "java-v127-v130-quality-evidence",
      "Java v127-v130 quality evidence",
      sourceNodeV291.javaV127V130QualityEvidenceReady ? "present" : "missing",
      "Java quality queue documented by Node v291",
    ),
    requirement(
      "mini-kv-v128-execution-denied-receipt",
      "mini-kv v128 execution-denied non-participation receipt",
      sourceNodeV291.miniKvV128NonParticipationReady && sourceNodeV291.miniKvPreflightDigestAligned
        ? "present"
        : "missing",
      "mini-kv v128 receipt consumed by Node v291",
    ),
    requirement(
      "java-direct-execution-denied-echo",
      "Java direct execution-denied echo",
      sourceNodeV291.javaExecutionDeniedEchoPresent ? "present" : "missing",
      "missing in Node v291; Java quality evidence is not a runtime echo",
    ),
  ];
}

function requirement(
  id: string,
  label: string,
  status: FakeHarnessReadinessRequirement["status"],
  currentEvidence: string,
): FakeHarnessReadinessRequirement {
  return {
    id,
    label,
    currentEvidence,
    status,
    requiredBeforeRuntimeShell: true,
  };
}

function createNoGoConditions(): FakeHarnessReadinessNoGoCondition[] {
  return [
    noGo("JAVA_EXECUTION_DENIED_ECHO_MISSING", "Java has not produced a direct execution-denied echo for this fake harness stage."),
    noGo("CREDENTIAL_VALUE_REQUIRED", "The next step requires reading, storing, rendering, or testing with credential values."),
    noGo("RAW_ENDPOINT_URL_REQUIRED", "The next step requires parsing or rendering a raw managed audit endpoint URL."),
    noGo("FAKE_HARNESS_RUNTIME_REQUIRED", "The next step implements or invokes a fake harness runtime before a successor plan approves it."),
    noGo("PROVIDER_CLIENT_REQUIRED", "The next step instantiates a real or fake secret provider or resolver client."),
    noGo("HTTP_TCP_REQUIRED", "The next step sends HTTP/TCP or any external request."),
    noGo("LEDGER_SCHEMA_WRITE_REQUIRED", "The next step writes approval ledger state or executes schema migration SQL."),
    noGo("AUTOMATIC_UPSTREAM_START_REQUIRED", "The next step auto-starts Java, mini-kv, or managed audit services."),
  ];
}

function noGo(code: string, condition: string): FakeHarnessReadinessNoGoCondition {
  return {
    code,
    condition,
    action: "pause-and-do-not-plan-runtime-shell",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV291: SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference,
  decisionRecord: FakeHarnessReadinessDecisionRecord,
): FakeHarnessReadinessDecisionRecordChecks {
  return {
    sourceNodeV291Loaded: sourceNodeV291.profileVersion === "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification.v1",
    sourceNodeV291BlockedAsExpected:
      sourceNodeV291.verificationState === "blocked"
      && sourceNodeV291.javaExecutionDeniedEchoMissing
      && !sourceNodeV291.readyForExecutionDeniedUpstreamEchoVerification,
    sourceNodeV291StillBlocksRuntime:
      sourceNodeV291.implementationStillBlocked
      && !sourceNodeV291.realResolverImplementationAllowed
      && !sourceNodeV291.testOnlyFakeHarnessAllowed
      && !sourceNodeV291.testOnlyFakeHarnessExecutionAllowed
      && !sourceNodeV291.fakeHarnessRuntimeEnabled
      && !sourceNodeV291.fakeHarnessInvocationAllowed
      && !sourceNodeV291.executionAllowed,
    sourceNodeV291StillBlocksCredentialEndpoint:
      !sourceNodeV291.credentialValueRead
      && !sourceNodeV291.credentialValueProvided
      && !sourceNodeV291.rawEndpointUrlParsed
      && !sourceNodeV291.rawEndpointUrlRendered,
    sourceNodeV291StillBlocksConnectionWritesAndAutoStart:
      !sourceNodeV291.connectsManagedAudit
      && !sourceNodeV291.externalRequestSent
      && !sourceNodeV291.secretProviderInstantiated
      && !sourceNodeV291.resolverClientInstantiated
      && !sourceNodeV291.fakeSecretProviderInstantiated
      && !sourceNodeV291.fakeResolverClientInstantiated
      && !sourceNodeV291.schemaMigrationExecuted
      && !sourceNodeV291.approvalLedgerWritten
      && !sourceNodeV291.automaticUpstreamStart,
    nodeV290PreflightReady: sourceNodeV291.sourceNodeV290Ready,
    javaQualityEvidencePresent: sourceNodeV291.javaV127V130QualityEvidenceReady,
    javaDirectExecutionDeniedEchoMissing: sourceNodeV291.javaExecutionDeniedEchoMissing,
    miniKvV128ReceiptReady: sourceNodeV291.miniKvV128NonParticipationReady,
    miniKvV128PreflightDigestAligned: sourceNodeV291.miniKvPreflightDigestAligned,
    sideEffectBoundariesClosed: sourceNodeV291.sideEffectBoundariesAligned,
    readinessDecisionBlocksRuntimeShell:
      decisionRecord.decision === "blocked"
      && !decisionRecord.allowsDisabledRuntimeShellPlanning
      && !decisionRecord.allowsFakeHarnessRuntimeImplementation
      && !decisionRecord.allowsFakeHarnessRuntimeInvocation,
    decisionRecordStillReadOnly:
      !decisionRecord.allowsRealResolverImplementation
      && !decisionRecord.allowsSecretProviderInstantiation
      && !decisionRecord.allowsResolverClientInstantiation
      && !decisionRecord.allowsCredentialValueRead
      && !decisionRecord.allowsRawEndpointUrlParse
      && !decisionRecord.allowsExternalRequest
      && !decisionRecord.allowsManagedAuditConnection
      && !decisionRecord.allowsSchemaMigration
      && !decisionRecord.allowsApprovalLedgerWrite
      && !decisionRecord.allowsAutomaticUpstreamStart,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord: false,
  };
}

function createSummary(
  sourceNodeV291: SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference,
  decisionRecord: FakeHarnessReadinessDecisionRecord,
  checks: FakeHarnessReadinessDecisionRecordChecks,
  productionBlockers: FakeHarnessReadinessDecisionRecordMessage[],
  warnings: FakeHarnessReadinessDecisionRecordMessage[],
  recommendations: FakeHarnessReadinessDecisionRecordMessage[],
): FakeHarnessReadinessDecisionRecordSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredEvidenceCount: decisionRecord.requiredEvidenceCount,
    missingRequiredEvidenceCount:
      decisionRecord.requiredEvidence.filter((evidence) => evidence.status === "missing").length,
    noGoConditionCount: decisionRecord.noGoConditionCount,
    sourceCheckCount: sourceNodeV291.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV291.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV291.sourceProductionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: FakeHarnessReadinessDecisionRecordChecks,
): FakeHarnessReadinessDecisionRecordMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: FakeHarnessReadinessDecisionRecordMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV291Loaded,
      code: "SOURCE_NODE_V291_NOT_LOADED",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Node v291 execution-denied upstream echo verification must be loadable before v292 can decide readiness.",
    },
    {
      condition: checks.sourceNodeV291BlockedAsExpected,
      code: "SOURCE_NODE_V291_NOT_BLOCKED_AS_EXPECTED",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Node v291 must remain blocked because Java direct execution-denied echo is missing.",
    },
    {
      condition: checks.sourceNodeV291StillBlocksRuntime,
      code: "SOURCE_NODE_V291_RUNTIME_UNLOCKED",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Node v291 must keep real resolver and fake harness runtime execution blocked.",
    },
    {
      condition: checks.sourceNodeV291StillBlocksCredentialEndpoint,
      code: "SOURCE_NODE_V291_CREDENTIAL_OR_ENDPOINT_OPENED",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Node v291 must keep credential value and raw endpoint URL boundaries closed.",
    },
    {
      condition: checks.sourceNodeV291StillBlocksConnectionWritesAndAutoStart,
      code: "SOURCE_NODE_V291_CONNECTION_WRITE_OR_AUTOSTART_OPENED",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Node v291 must keep connections, writes, providers, clients, schema migration, and auto-start blocked.",
    },
    {
      condition: checks.nodeV290PreflightReady,
      code: "NODE_V290_PREFLIGHT_NOT_READY",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Node v290 execution-denied preflight must be ready before v292.",
    },
    {
      condition: checks.javaQualityEvidencePresent,
      code: "JAVA_QUALITY_EVIDENCE_MISSING",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "Java v127-v130 quality evidence must remain present.",
    },
    {
      condition: !checks.javaDirectExecutionDeniedEchoMissing,
      code: "JAVA_EXECUTION_DENIED_ECHO_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "Java direct execution-denied echo is still missing; v292 must block disabled runtime shell planning.",
    },
    {
      condition: checks.miniKvV128ReceiptReady && checks.miniKvV128PreflightDigestAligned,
      code: "MINI_KV_V128_RECEIPT_NOT_READY",
      source: "node-v291-execution-denied-upstream-echo-verification",
      message: "mini-kv v128 receipt must remain ready and aligned with Node v290 preflight digest.",
    },
    {
      condition: checks.sideEffectBoundariesClosed,
      code: "SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "Side-effect boundaries must remain closed while readiness is blocked.",
    },
    {
      condition: checks.readinessDecisionBlocksRuntimeShell,
      code: "READINESS_DECISION_UNLOCKED_RUNTIME_SHELL",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "v292 readiness decision must block disabled runtime shell planning.",
    },
    {
      condition: checks.decisionRecordStillReadOnly,
      code: "DECISION_RECORD_NOT_READ_ONLY",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "v292 decision record must remain read-only and must not allow resolver, credential, endpoint, network, schema, ledger, or auto-start work.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during v292.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during v292.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker",
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): FakeHarnessReadinessDecisionRecordMessage[] {
  return [
    {
      code: "DECISION_RECORD_READY_DOES_NOT_MEAN_RUNTIME_READY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "The decision record can be archived, but the decision remains blocked and does not authorize fake harness runtime shell planning.",
    },
  ];
}

function collectRecommendations(): FakeHarnessReadinessDecisionRecordMessage[] {
  return [
    {
      code: "WRITE_SUCCESSOR_PLAN_BEFORE_NEXT_STAGE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "Create a successor plan before adding any more fake harness runtime shell artifacts.",
    },
    {
      code: "REQUEST_JAVA_DIRECT_EXECUTION_DENIED_ECHO",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record",
      message: "Ask Java to provide a direct execution-denied echo if the next stage still needs upstream Java participation.",
    },
  ];
}
