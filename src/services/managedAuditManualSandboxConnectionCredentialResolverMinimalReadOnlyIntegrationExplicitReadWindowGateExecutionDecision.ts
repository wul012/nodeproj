import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile,
  MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision,
  MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionChecks,
  MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage,
  MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord,
  MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionSummary,
  SourceNodeV365RegularGateArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision";
const SOURCE_NODE_V365_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v365-post-minimal-read-only-integration-regular-gate-archive-roadmap.md";
const NEXT_PLAN = "docs/plans2/v366-post-explicit-read-window-gate-execution-decision-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision(
  input: { config: AppConfig; explicitReadWindowProvided?: boolean },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification({
      config: input.config,
    });
  const sourceNodeV365 = createSourceNodeV365(sourceProfile);
  const explicitReadWindowProvided = input.explicitReadWindowProvided === true;
  const gateExecutionDecision = determineGateExecutionDecision(sourceNodeV365, explicitReadWindowProvided);
  const draftRecord = createDecisionRecord(sourceNodeV365, gateExecutionDecision, explicitReadWindowProvided, true);
  const checks = createChecks(input.config, sourceNodeV365, draftRecord);
  checks.readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision;
  const decisionRecord = createDecisionRecord(sourceNodeV365, gateExecutionDecision, explicitReadWindowProvided, ready);
  checks.decisionDigestStable = isDigest(decisionRecord.decisionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(decisionRecord);
  const recommendations = collectRecommendations(decisionRecord);
  const summary = createSummary(sourceNodeV365, decisionRecord, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal read-only integration explicit read-window gate execution decision",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionState: ready ? "explicit-read-window-gate-execution-decision-ready" : "blocked",
    gateExecutionDecision: ready ? gateExecutionDecision : "blocked",
    readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: ready,
    consumesNodeV365RegularGateArchiveVerification: true,
    activeNodeVersion: "Node v366",
    sourceNodeVersion: "Node v365",
    decisionOnly: true,
    rerunsLiveProbe: false,
    actualProbeExecutedNow: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV365,
    decisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      explicitReadWindowGateExecutionDecisionJson: ROUTE_PATH,
      explicitReadWindowGateExecutionDecisionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV365Json: SOURCE_NODE_V365_ROUTE,
      sourceNodeV365Markdown: `${SOURCE_NODE_V365_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: decisionRecord.nextNodeVersionSuggested,
    },
    nextActions: createNextActions(decisionRecord),
  };
}

function createSourceNodeV365(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile,
): SourceNodeV365RegularGateArchiveVerificationReference {
  return {
    sourceVersion: "Node v365",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification: profile.readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification,
    readyForNodeV366ExplicitReadWindowGateExecutionDecision:
      profile.readyForNodeV366ExplicitReadWindowGateExecutionDecision,
    sourceNodeV364GateDigest: profile.sourceNodeV364.gateDigest,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    ciOperatorCheckDigest: profile.ciOperatorFriendlyCheck.checkDigest,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    readOnlyTargetCount: profile.summary.readOnlyTargetCount,
    requiredHeaderCount: profile.summary.requiredHeaderCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    avoidsFullTestBatchByDefault: profile.ciOperatorFriendlyCheck.avoidsFullTestBatchByDefault,
    requiresExplicitReadWindowForActualProbe:
      profile.ciOperatorFriendlyCheck.requiresExplicitReadWindowForActualProbe,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    connectsManagedAudit: profile.connectsManagedAudit,
    sendsManagedAuditHttpTcp: profile.sendsManagedAuditHttpTcp,
    credentialValueRequested: profile.credentialValueRequested,
    credentialValueRead: profile.credentialValueRead,
    rawEndpointUrlRequested: profile.rawEndpointUrlRequested,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    secretProviderInstantiated: profile.secretProviderInstantiated,
    resolverClientInstantiated: profile.resolverClientInstantiated,
    runtimeShellImplemented: profile.runtimeShellImplemented,
    runtimeShellInvocationAllowed: profile.runtimeShellInvocationAllowed,
    executionAllowed: profile.executionAllowed,
  };
}

function determineGateExecutionDecision(
  source: SourceNodeV365RegularGateArchiveVerificationReference,
  explicitReadWindowProvided: boolean,
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision {
  if (!source.readyForArchiveVerification || !source.readyForNodeV366ExplicitReadWindowGateExecutionDecision) {
    return "blocked";
  }
  return explicitReadWindowProvided
    ? "ready-for-explicit-read-window-gate-execution"
    : "wait-for-external-read-window";
}

function createDecisionRecord(
  source: SourceNodeV365RegularGateArchiveVerificationReference,
  decision: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision,
  explicitReadWindowProvided: boolean,
  ready: boolean,
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord {
  const recordWithoutDigest = {
    decisionMode: "minimal-read-only-integration-explicit-read-window-gate-execution-decision" as const,
    sourceSpan: "Node v365 minimal read-only integration regular gate archive verification" as const,
    gateExecutionDecision: ready ? decision : "blocked" as const,
    externalReadWindowRequired: ready && decision === "wait-for-external-read-window",
    explicitReadWindowProvided,
    focusedCiOperatorCheckReady: source.avoidsFullTestBatchByDefault && source.readOnlyTargetCount === 5,
    actualProbeExecutedNow: false as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    mutatesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    readsCredentialValue: false as const,
    parsesRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    invokesRuntimeShell: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: decision === "ready-for-explicit-read-window-gate-execution"
      ? "Node v367" as const
      : "wait-for-external-read-window" as const,
  };
  return {
    decisionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV365RegularGateArchiveVerificationReference,
  record: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord,
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionChecks {
  return {
    sourceNodeV365Ready: source.readyForArchiveVerification && source.readyForNodeV366ExplicitReadWindowGateExecutionDecision,
    sourceArchiveVerificationDigestStable: isDigest(source.archiveVerificationDigest),
    sourceGateDigestStable: isDigest(source.sourceNodeV364GateDigest),
    sourceCiOperatorCheckDigestStable: isDigest(source.ciOperatorCheckDigest),
    focusedCiOperatorCheckReady: record.focusedCiOperatorCheckReady && source.archiveFileCount === source.presentArchiveFileCount,
    sourceAvoidsFullTestBatchByDefault: source.avoidsFullTestBatchByDefault,
    explicitReadWindowHandledAsDecisionInput:
      record.gateExecutionDecision === "wait-for-external-read-window"
      || record.gateExecutionDecision === "ready-for-explicit-read-window-gate-execution",
    missingWindowClassifiedAsExternalWait:
      record.explicitReadWindowProvided || record.gateExecutionDecision === "wait-for-external-read-window",
    noProbeExecutedWithoutExplicitWindow: record.explicitReadWindowProvided || !record.actualProbeExecutedNow,
    noUpstreamServiceStarted: !source.startsJavaService && !source.startsMiniKvService && !record.startsUpstreamServices,
    noUpstreamMutation: !record.mutatesUpstreamState,
    noManagedAuditConnection: !source.connectsManagedAudit && !record.opensManagedAuditConnection && !config.upstreamActionsEnabled,
    noCredentialValueRequestedOrRead:
      !source.credentialValueRequested && !source.credentialValueRead && !record.readsCredentialValue,
    noRawEndpointUrlRequestedOrParsed:
      !source.rawEndpointUrlRequested && !source.rawEndpointUrlParsed && !record.parsesRawEndpointUrl,
    noProviderClientInstantiated:
      !source.secretProviderInstantiated && !source.resolverClientInstantiated && !record.instantiatesProviderClient,
    noRuntimeShellImplementedOrInvoked:
      !source.runtimeShellImplemented && !source.runtimeShellInvocationAllowed && !record.invokesRuntimeShell,
    noJavaMiniKvEchoRequired: !record.requestsJavaMiniKvEcho,
    executionStillBlocked: !source.executionAllowed,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    decisionDigestStable: isDigest(record.decisionDigest),
    readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: false,
  };
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionChecks,
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage["source"], string]> = [
    [checks.sourceNodeV365Ready, "SOURCE_NODE_V365_NOT_READY", "node-v365", "Node v365 regular gate archive verification must be ready."],
    [checks.focusedCiOperatorCheckReady, "CI_OPERATOR_CHECK_NOT_READY", "ci-operator-check", "v365 focused CI/operator check must be ready before a read-window decision."],
    [checks.explicitReadWindowHandledAsDecisionInput, "READ_WINDOW_DECISION_UNKNOWN", "read-window", "v366 must either wait for an external window or prepare an explicitly authorized run."],
    [checks.missingWindowClassifiedAsExternalWait, "MISSING_WINDOW_NOT_CLASSIFIED", "read-window", "Missing Java/mini-kv window must become wait-for-external-read-window."],
    [checks.noProbeExecutedWithoutExplicitWindow, "PROBE_EXECUTED_WITHOUT_WINDOW", "runtime-boundary", "v366 must not execute probes without an explicit read window."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary", "v366 must not start Java or mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTED", "runtime-boundary", "v366 must not connect to managed audit."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary", "v366 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_URL_OPENED", "runtime-boundary", "v366 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary", "v366 must not instantiate provider/client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary", "v366 must not implement or invoke runtime shell."],
    [checks.decisionDigestStable, "DECISION_DIGEST_UNSTABLE", "execution-decision", "Decision digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  record: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord,
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[] {
  if (!record.externalReadWindowRequired) {
    return [];
  }
  return [{
    code: "EXTERNAL_READ_WINDOW_REQUIRED",
    severity: "warning",
    source: "read-window",
    message: "No explicit Java/mini-kv read window was provided for v366; the gate must stop without starting upstream services.",
  }];
}

function collectRecommendations(
  record: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord,
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[] {
  return [{
    code: record.externalReadWindowRequired ? "WAIT_FOR_EXTERNAL_READ_WINDOW" : "PROCEED_TO_NODE_V367_GATE_EXECUTION",
    severity: "recommendation",
    source: "next-step",
    message: record.externalReadWindowRequired
      ? "Ask the Java and mini-kv owners to open a read-only window, or explicitly authorize Node to start them in a later version."
      : "Run the minimal read-only gate in the explicitly approved window using the focused CI/operator sequence.",
  }];
}

function createSummary(
  source: SourceNodeV365RegularGateArchiveVerificationReference,
  record: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord,
  checks: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionChecks,
  productionBlockers: readonly MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[],
  warnings: readonly MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[],
): MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    readOnlyTargetCount: source.readOnlyTargetCount,
    requiredHeaderCount: source.requiredHeaderCount,
    externalReadWindowRequired: record.externalReadWindowRequired,
    explicitReadWindowProvided: record.explicitReadWindowProvided,
    actualProbeExecutedNow: record.actualProbeExecutedNow,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function createNextActions(record: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord): string[] {
  if (record.externalReadWindowRequired) {
    return [
      "Stop here until Java and mini-kv have an explicit read-only window, or the user explicitly authorizes Node to start both services in a later version.",
      "Do not create another archive/closure-only version while the read window is unavailable.",
      "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
    ];
  }
  return [
    "Proceed to Node v367 minimal read-only gate execution in the approved read window.",
    "Use the v365 focused/grouped/build/smoke sequence and stop on invalid-read-contract.",
  ];
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
