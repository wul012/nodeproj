import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
  MinimalReadOnlyIntegrationSmokeArchiveResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile,
  MinimalReadOnlyIntegrationRerunDecision,
  MinimalReadOnlyIntegrationRerunDecisionChecks,
  MinimalReadOnlyIntegrationRerunDecisionMessage,
  MinimalReadOnlyIntegrationRerunDecisionRecord,
  MinimalReadOnlyIntegrationRerunDecisionSummary,
  SourceNodeV347SmokeArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision";
const SOURCE_NODE_V347_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v347-post-minimal-read-only-integration-smoke-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v348-post-minimal-read-only-integration-rerun-decision-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile {
  const sourceArchiveVerification =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification({
      config: input.config,
      archiveRoot: input.archiveRoot,
    });
  const sourceNodeV347 = createSourceNodeV347(sourceArchiveVerification);
  const rerunDecision = determineRerunDecision(sourceArchiveVerification);
  const draftRecord = createRerunDecisionRecord(sourceNodeV347, sourceArchiveVerification, rerunDecision, false);
  const checks = createChecks(sourceNodeV347, sourceArchiveVerification, rerunDecision, draftRecord);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision =
    Object.entries(checks)
      .filter(([key]) =>
        key
          !== "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision")
      .every(([, value]) => value);
  const ready = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision;
  const rerunDecisionRecord = createRerunDecisionRecord(sourceNodeV347, sourceArchiveVerification, rerunDecision, ready);
  checks.decisionDigestStable = isDigest(rerunDecisionRecord.decisionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(rerunDecision);
  const recommendations = collectRecommendations(rerunDecision);
  const summary = createSummary(sourceNodeV347, checks, productionBlockers, warnings, recommendations,
    rerunDecisionRecord);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration rerun decision",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    rerunDecisionState: ready ? "minimal-read-only-integration-rerun-decision-ready" : "blocked",
    rerunDecision: ready ? rerunDecision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: ready,
    consumesNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification: true,
    activeNodeVersion: "Node v348",
    sourceNodeVersion: "Node v347",
    sourceArchiveResult: sourceNodeV347.archiveResult,
    sourceArchiveDecision: sourceNodeV347.archiveDecision,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    externalReadWindowRequired: rerunDecisionRecord.externalReadWindowRequired,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: rerunDecisionRecord.requestsJavaMiniKvEcho,
    readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV347,
    rerunDecisionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationRerunDecisionJson: ROUTE_PATH,
      minimalReadOnlyIntegrationRerunDecisionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV347Json: SOURCE_NODE_V347_ROUTE,
      sourceNodeV347Markdown: `${SOURCE_NODE_V347_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v349",
    },
    nextActions: createNextActions(rerunDecision),
  };
}

function createSourceNodeV347(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
): SourceNodeV347SmokeArchiveVerificationReference {
  return {
    sourceVersion: "Node v347",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveResult: profile.archiveResult,
    archiveDecision: profile.archiveDecision,
    readyForArchiveVerification:
      profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification,
    readyForNodeV348RerunDecision: profile.readyForNodeV348MinimalReadOnlyIntegrationRerunDecision,
    verificationDigest: profile.archiveVerification.verificationDigest,
    attemptedTargetCount: profile.summary.attemptedTargetCount,
    passedTargetCount: profile.summary.passedTargetCount,
    unavailableTargetCount: profile.summary.unavailableTargetCount,
    invalidContractTargetCount: profile.summary.invalidContractTargetCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    warningCount: profile.summary.warningCount,
    recommendationCount: profile.summary.recommendationCount,
    archiveVerificationOnly: true,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    executionAllowed: profile.executionAllowed,
    connectsManagedAudit: profile.connectsManagedAudit,
    readsManagedAuditCredential: profile.readsManagedAuditCredential,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
  };
}

function determineRerunDecision(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
): MinimalReadOnlyIntegrationRerunDecision {
  if (!profile.readyForNodeV348MinimalReadOnlyIntegrationRerunDecision) {
    return "blocked";
  }

  if (profile.archiveResult === "all-read-passed") {
    return "advance-to-next-managed-audit-disabled-read-only-stage";
  }
  if (profile.archiveResult === "read-window-unavailable") {
    return "wait-for-external-read-window";
  }
  if (profile.archiveResult === "invalid-read-contract") {
    return "wait-for-java-mini-kv-read-contract-fix";
  }
  return "blocked";
}

function createRerunDecisionRecord(
  source: SourceNodeV347SmokeArchiveVerificationReference,
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
  decision: MinimalReadOnlyIntegrationRerunDecision,
  ready: boolean,
): MinimalReadOnlyIntegrationRerunDecisionRecord {
  const recordWithoutDigest = {
    decisionMode: "minimal-read-only-integration-rerun-decision" as const,
    sourceSpan: "Node v347 minimal read-only integration smoke archive verification" as const,
    sourceArchiveResult: source.archiveResult,
    sourceArchiveDecision: source.archiveDecision,
    rerunDecision: ready ? decision : "blocked" as const,
    externalReadWindowRequired: ready && decision === "wait-for-external-read-window",
    requestsJavaMiniKvEcho: ready && profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    nextNodeVersionSuggested: "Node v349" as const,
  };

  return {
    decisionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  source: SourceNodeV347SmokeArchiveVerificationReference,
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
  decision: MinimalReadOnlyIntegrationRerunDecision,
  record: MinimalReadOnlyIntegrationRerunDecisionRecord,
): MinimalReadOnlyIntegrationRerunDecisionChecks {
  return {
    sourceArchiveVerificationReady: source.readyForArchiveVerification && source.readyForNodeV348RerunDecision,
    sourceArchiveVerificationDigestStable: isDigest(source.verificationDigest),
    sourceArchiveDecisionRecognized: decision !== "blocked",
    readWindowUnavailableHandledAsExternalWindow: source.archiveResult !== "read-window-unavailable"
      || (decision === "wait-for-external-read-window"
        && !profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho),
    invalidContractRequestsParallelEchoOnlyWhenNeeded: source.archiveResult !== "invalid-read-contract"
      || (decision === "wait-for-java-mini-kv-read-contract-fix"
        && profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho),
    allReadPassedCanAdvanceWithoutExtraEcho: source.archiveResult !== "all-read-passed"
      || (decision === "advance-to-next-managed-audit-disabled-read-only-stage"
        && !profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho),
    doesNotRerunLiveProbe: record.rerunsLiveProbe === false,
    noUpstreamServiceStarted: !source.startsJavaService && !source.startsMiniKvService && !record.startsUpstreamServices,
    noManagedAuditConnection: !source.connectsManagedAudit,
    noCredentialValueRead: !source.readsManagedAuditCredential,
    noRawEndpointUrlParsed: !source.rawEndpointUrlParsed,
    executionStillBlocked: !source.executionAllowed,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    decisionDigestStable: isDigest(record.decisionDigest),
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: false,
  };
}

function createSummary(
  source: SourceNodeV347SmokeArchiveVerificationReference,
  checks: MinimalReadOnlyIntegrationRerunDecisionChecks,
  productionBlockers: MinimalReadOnlyIntegrationRerunDecisionMessage[],
  warnings: MinimalReadOnlyIntegrationRerunDecisionMessage[],
  recommendations: MinimalReadOnlyIntegrationRerunDecisionMessage[],
  record: MinimalReadOnlyIntegrationRerunDecisionRecord,
): MinimalReadOnlyIntegrationRerunDecisionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceAttemptedTargetCount: source.attemptedTargetCount,
    sourcePassedTargetCount: source.passedTargetCount,
    sourceUnavailableTargetCount: source.unavailableTargetCount,
    sourceInvalidContractTargetCount: source.invalidContractTargetCount,
    externalReadWindowRequired: record.externalReadWindowRequired,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: record.requestsJavaMiniKvEcho,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationRerunDecisionChecks,
): MinimalReadOnlyIntegrationRerunDecisionMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationRerunDecisionMessage["source"], string]> = [
    [checks.sourceArchiveVerificationReady, "SOURCE_ARCHIVE_VERIFICATION_NOT_READY", "node-v347",
      "Node v347 archive verification must be ready before v348 can decide whether to rerun."],
    [checks.sourceArchiveVerificationDigestStable, "SOURCE_ARCHIVE_DIGEST_UNSTABLE", "node-v347",
      "Node v347 archive verification digest must be stable."],
    [checks.sourceArchiveDecisionRecognized, "SOURCE_ARCHIVE_DECISION_UNKNOWN", "rerun-decision",
      "Node v348 must recognize the archive result before choosing the next lane."],
    [checks.readWindowUnavailableHandledAsExternalWindow, "READ_WINDOW_UNAVAILABLE_MISCLASSIFIED", "external-window",
      "read-window-unavailable must wait for an external service window, not request Java/mini-kv code changes."],
    [checks.invalidContractRequestsParallelEchoOnlyWhenNeeded, "INVALID_CONTRACT_ECHO_DECISION_MISSING", "next-step",
      "invalid-read-contract is the only path that may request Java v153 + mini-kv v144 read-only echo."],
    [checks.allReadPassedCanAdvanceWithoutExtraEcho, "ALL_READ_PASSED_ADVANCE_BLOCKED", "next-step",
      "all-read-passed should advance without asking Java/mini-kv for extra echo."],
    [checks.doesNotRerunLiveProbe, "LIVE_PROBE_RERUN_IN_DECISION_RECORD", "runtime-boundary",
      "v348 is a decision record and must not rerun the live probe."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
      "v348 must not start Java or mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTED", "runtime-boundary",
      "v348 must not connect to managed audit."],
    [checks.noCredentialValueRead, "CREDENTIAL_VALUE_READ", "runtime-boundary",
      "v348 must not read managed audit credential values."],
    [checks.noRawEndpointUrlParsed, "RAW_ENDPOINT_URL_PARSED", "runtime-boundary",
      "v348 must not parse raw endpoint URLs."],
    [checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-boundary",
      "v348 must keep execution blocked."],
    [checks.decisionDigestStable, "DECISION_DIGEST_UNSTABLE", "rerun-decision",
      "Rerun decision digest must be a stable sha256."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(decision: MinimalReadOnlyIntegrationRerunDecision): MinimalReadOnlyIntegrationRerunDecisionMessage[] {
  if (decision !== "wait-for-external-read-window") {
    return [];
  }

  return [
    {
      code: "EXTERNAL_READ_WINDOW_REQUIRED",
      severity: "warning",
      source: "external-window",
      message: "Java and mini-kv must be started by the user or an external window before the minimal read-only smoke lane can be rerun.",
    },
  ];
}

function collectRecommendations(
  decision: MinimalReadOnlyIntegrationRerunDecision,
): MinimalReadOnlyIntegrationRerunDecisionMessage[] {
  if (decision === "wait-for-external-read-window") {
    return [
      {
        code: "RERUN_ONLY_AFTER_USER_STARTS_UPSTREAMS",
        severity: "recommendation",
        source: "next-step",
        message: "When the user confirms Java and mini-kv are running, Node v349 can rerun the existing minimal read-only smoke lane.",
      },
    ];
  }
  if (decision === "wait-for-java-mini-kv-read-contract-fix") {
    return [
      {
        code: "REQUEST_PARALLEL_READ_CONTRACT_FIX",
        severity: "recommendation",
        source: "next-step",
        message: "Only invalid-read-contract should request parallel Java v153 and mini-kv v144 read-only field fixes.",
      },
    ];
  }
  if (decision === "advance-to-next-managed-audit-disabled-read-only-stage") {
    return [
      {
        code: "ADVANCE_TO_NEXT_DISABLED_READ_ONLY_STAGE",
        severity: "recommendation",
        source: "next-step",
        message: "All minimal read-only targets passed, so the next stage can remain managed-audit-disabled and read-only.",
      },
    ];
  }
  return [];
}

function createNextActions(decision: MinimalReadOnlyIntegrationRerunDecision): string[] {
  if (decision === "wait-for-external-read-window") {
    return [
      "Do not ask Java v153 or mini-kv v144 to change code for connection-refused evidence.",
      "Wait for the user or another terminal window to start Java and mini-kv.",
      "Use Node v349 to rerun or archive pending state without starting upstreams automatically.",
    ];
  }
  if (decision === "wait-for-java-mini-kv-read-contract-fix") {
    return [
      "Recommend parallel Java v153 + mini-kv v144 read-only contract fixes.",
      "After both upstream fixes are complete, rerun the minimal read-only smoke lane.",
    ];
  }
  if (decision === "advance-to-next-managed-audit-disabled-read-only-stage") {
    return [
      "Advance to the next managed-audit-disabled read-only integration stage.",
      "Keep credential value, raw endpoint URL, runtime shell, SQL, and mini-kv writes disabled.",
    ];
  }
  return ["Fix Node v347 archive verification before choosing a rerun path."];
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
