import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification.js";
import type {
  ForbiddenIntegrationOperation,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile,
  MinimalReadOnlyIntegrationWindowReadinessCutChecks,
  MinimalReadOnlyIntegrationWindowReadinessCutMessage,
  MinimalReadOnlyIntegrationWindowReadinessCutRecord,
  MinimalReadOnlyIntegrationWindowReadinessCutSummary,
  ReadOnlyIntegrationEnvironmentHandle,
  ReadOnlyIntegrationRequirement,
  SourceNodeV344ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut";
const SOURCE_NODE_V344_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification";
const ACTIVE_PLAN = "docs/plans2/v344-post-disabled-design-draft-body-draft-candidate-archive-verification-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut(
  input: { config: AppConfig },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile {
  const sourceNodeV344 = createSourceNodeV344(input.config);
  const javaReadOnlyRequirements = createJavaReadOnlyRequirements();
  const miniKvReadOnlyRequirements = createMiniKvReadOnlyRequirements();
  const forbiddenOperations = createForbiddenOperations();
  const environmentHandles = createEnvironmentHandles(input.config);
  const draftReadinessCut = createReadinessCut(sourceNodeV344, javaReadOnlyRequirements, miniKvReadOnlyRequirements,
    false);
  const checks = createChecks(
    input.config,
    sourceNodeV344,
    javaReadOnlyRequirements,
    miniKvReadOnlyRequirements,
    forbiddenOperations,
    environmentHandles,
    draftReadinessCut,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut")
      .every(([, value]) => value);
  const ready =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut;
  const readinessCut = createReadinessCut(sourceNodeV344, javaReadOnlyRequirements, miniKvReadOnlyRequirements, ready);
  checks.readinessCutDigestStable = isDigest(readinessCut.readinessDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(readinessCut.requiresParallelJavaV153MiniKvV144ReadOnlyEcho);
  const summary = createSummary(
    checks,
    javaReadOnlyRequirements,
    miniKvReadOnlyRequirements,
    environmentHandles,
    forbiddenOperations,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration window readiness cut",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    readinessState: ready ? "minimal-read-only-integration-window-readiness-cut-ready" : "blocked",
    readinessDecision: ready ? "ready-for-manual-read-only-integration-window" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: ready,
    consumesNodeV344DisabledDesignDraftBodyDraftCandidateArchiveVerification: true,
    activeNodeVersion: "Node v345",
    sourceNodeVersion: "Node v344",
    readOnlyIntegrationWindowReadinessCut: true,
    readinessCutOnly: true,
    performsLiveProbeNow: false,
    startsJavaService: false,
    startsMiniKvService: false,
    sendsJavaHttpRequestNow: false,
    opensMiniKvTcpSocketNow: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: ready,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: readinessCut.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV344,
    readinessCut,
    javaReadOnlyRequirements,
    miniKvReadOnlyRequirements,
    forbiddenOperations,
    environmentHandles,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationWindowReadinessCutJson: ROUTE_PATH,
      minimalReadOnlyIntegrationWindowReadinessCutMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV344Json: SOURCE_NODE_V344_ROUTE,
      sourceNodeV344Markdown: `${SOURCE_NODE_V344_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v346",
    },
    nextActions: [
      "Use Node v346 only when the user or an external window has already started Java and mini-kv.",
      "Keep Node from starting, stopping, building, testing, or modifying Java and mini-kv during the smoke rehearsal.",
      "Allow only Java GET endpoints and mini-kv HEALTH/INFOJSON/STATSJSON commands in the first real read-only window.",
      "If the external services are not reachable in v346, record connection-refused or timeout evidence and fail closed.",
    ],
  };
}

function createSourceNodeV344(config: AppConfig): SourceNodeV344ArchiveVerificationReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification({
      config,
    });

  return {
    sourceVersion: "Node v344",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    archiveVerificationDecision: source.archiveVerificationDecision,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification,
    readyForNextDisabledDesignDraftStep: source.readyForNextDisabledDesignDraftStep,
    archiveVerificationDigest: source.archiveVerification.verificationDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    presentArchiveFileCount: source.summary.presentArchiveFileCount,
    archiveFileCount: source.summary.archiveFileCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    javaServiceStarted: source.javaServiceStarted,
    miniKvServiceStarted: source.miniKvServiceStarted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    miniKvWriteCommandAllowed: source.miniKvWriteCommandAllowed,
  };
}

function createJavaReadOnlyRequirements(): ReadOnlyIntegrationRequirement[] {
  return [
    readOnlyRequirement("java", "http-endpoint", "Java actuator health", "GET /actuator/health", "ORDER_PLATFORM_URL",
      "health JSON only; no business mutation", true),
    readOnlyRequirement("java", "http-endpoint", "Java ops overview", "GET /api/v1/ops/overview",
      "ORDER_PLATFORM_URL", "ops overview JSON only; no ledger/schema/SQL write", true),
  ];
}

function createMiniKvReadOnlyRequirements(): ReadOnlyIntegrationRequirement[] {
  return [
    readOnlyRequirement("mini-kv", "tcp-command", "mini-kv health", "HEALTH", "MINIKV_HOST + MINIKV_PORT",
      "server liveness string only; no store mutation", true),
    readOnlyRequirement("mini-kv", "tcp-command", "mini-kv info JSON", "INFOJSON", "MINIKV_HOST + MINIKV_PORT",
      "server/store/WAL metadata JSON only; no write/admin", true),
    readOnlyRequirement("mini-kv", "tcp-command", "mini-kv stats JSON", "STATSJSON", "MINIKV_HOST + MINIKV_PORT",
      "runtime counters JSON only; no write/admin", true),
  ];
}

function readOnlyRequirement(
  project: ReadOnlyIntegrationRequirement["project"],
  kind: ReadOnlyIntegrationRequirement["kind"],
  name: string,
  methodOrCommand: string,
  handle: string,
  expectedBoundary: string,
  existingNodeSupport: boolean,
): ReadOnlyIntegrationRequirement {
  return {
    project,
    kind,
    name,
    methodOrCommand,
    handle,
    expectedBoundary,
    existingNodeSupport,
    readOnly: true,
    mutatesState: false,
    startsService: false,
  };
}

function createForbiddenOperations(): ForbiddenIntegrationOperation[] {
  return [
    {
      project: "java",
      operation: "POST/PUT/PATCH/DELETE, approval ledger writes, SQL/schema migration, deployment, rollback",
      blockedReason: "v345 only prepares the first read-only integration window.",
    },
    {
      project: "mini-kv",
      operation: "SET/DEL/EXPIRE/SETNXEX/LOAD/COMPACT/RESTORE or any write/admin command",
      blockedReason: "mini-kv remains a read-only evidence provider for this window.",
    },
    {
      project: "node",
      operation: "auto-starting Java or mini-kv, reading credential values, parsing raw endpoint URLs, runtime shell invocation",
      blockedReason: "external services must be started by the user/window and secret boundaries stay closed.",
    },
  ];
}

function createEnvironmentHandles(config: AppConfig): ReadOnlyIntegrationEnvironmentHandle[] {
  return [
    envHandle("ORDER_PLATFORM_URL", "java", "base-url-handle", config.orderPlatformUrl.length > 0),
    envHandle("ORDER_PLATFORM_TIMEOUT_MS", "java", "timeout-ms-handle", config.orderPlatformTimeoutMs > 0),
    envHandle("MINIKV_HOST", "mini-kv", "host-handle", config.miniKvHost.length > 0),
    envHandle("MINIKV_PORT", "mini-kv", "port-handle", config.miniKvPort > 0),
    envHandle("MINIKV_TIMEOUT_MS", "mini-kv", "timeout-ms-handle", config.miniKvTimeoutMs > 0),
  ];
}

function envHandle(
  name: string,
  target: ReadOnlyIntegrationEnvironmentHandle["target"],
  valueKind: ReadOnlyIntegrationEnvironmentHandle["valueKind"],
  presentInConfig: boolean,
): ReadOnlyIntegrationEnvironmentHandle {
  return {
    name,
    target,
    valueKind,
    presentInConfig,
    secretValue: false,
    rawCredentialValue: false,
  };
}

function createReadinessCut(
  sourceNodeV344: SourceNodeV344ArchiveVerificationReference,
  javaReadOnlyRequirements: readonly ReadOnlyIntegrationRequirement[],
  miniKvReadOnlyRequirements: readonly ReadOnlyIntegrationRequirement[],
  ready: boolean,
): MinimalReadOnlyIntegrationWindowReadinessCutRecord {
  const requiresEcho =
    !javaReadOnlyRequirements.every((requirement) => requirement.existingNodeSupport)
    || !miniKvReadOnlyRequirements.every((requirement) => requirement.existingNodeSupport);

  return {
    readinessDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceArchiveVerificationDigest: sourceNodeV344.archiveVerificationDigest,
      javaReadOnlyRequirements,
      miniKvReadOnlyRequirements,
      requiresEcho,
      ready,
    }),
    cutMode: "node-v345-minimal-read-only-integration-window-readiness-cut",
    sourceSpan: "Node v344 archive verification plus existing Node upstream clients",
    decision: ready ? "ready-for-manual-read-only-integration-window" : "blocked",
    necessityProof:
      "v345 converts the disabled design draft boundary into a concrete, minimal read-only integration window so v346 can test live Java/mini-kv availability without widening runtime, credential, write, or auto-start scope.",
    consumesNodeV344ArchiveVerification: true,
    consumesJavaMiniKvRuntimeNow: false,
    performsLiveProbeNow: false,
    opensNetworkSocketNow: false,
    startsUpstreamServices: false,
    allowsOnlyJavaGetRequests: true,
    allowsOnlyMiniKvReadCommands: true,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: requiresEcho,
    nextNodeVersionSuggested: "Node v346",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV344: SourceNodeV344ArchiveVerificationReference,
  javaReadOnlyRequirements: readonly ReadOnlyIntegrationRequirement[],
  miniKvReadOnlyRequirements: readonly ReadOnlyIntegrationRequirement[],
  forbiddenOperations: readonly ForbiddenIntegrationOperation[],
  environmentHandles: readonly ReadOnlyIntegrationEnvironmentHandle[],
  readinessCut: MinimalReadOnlyIntegrationWindowReadinessCutRecord,
): MinimalReadOnlyIntegrationWindowReadinessCutChecks {
  return {
    sourceNodeV344Ready:
      sourceNodeV344.archiveVerificationState === "disabled-design-draft-body-draft-candidate-archive-verified"
      && sourceNodeV344.archiveVerificationDecision === "body-draft-candidate-archive-verified-before-next-design-step"
      && sourceNodeV344.readyForArchiveVerification
      && sourceNodeV344.readyForNextDisabledDesignDraftStep
      && sourceNodeV344.sourceProductionBlockerCount === 0
      && sourceNodeV344.presentArchiveFileCount === sourceNodeV344.archiveFileCount,
    sourceNodeV344KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV344.runtimeShellImplemented
      && !sourceNodeV344.runtimeShellInvocationAllowed
      && !sourceNodeV344.executionAllowed
      && !sourceNodeV344.connectsManagedAudit
      && !sourceNodeV344.credentialValueRead
      && !sourceNodeV344.rawEndpointUrlParsed
      && !sourceNodeV344.httpRequestSent
      && !sourceNodeV344.tcpConnectionAttempted
      && !sourceNodeV344.javaServiceStarted
      && !sourceNodeV344.miniKvServiceStarted
      && !sourceNodeV344.automaticUpstreamStart
      && !sourceNodeV344.miniKvWriteCommandAllowed,
    existingJavaClientReadEndpointsAvailable:
      javaReadOnlyRequirements.length === 2
      && javaReadOnlyRequirements.every((requirement) =>
        requirement.project === "java"
        && requirement.kind === "http-endpoint"
        && requirement.methodOrCommand.startsWith("GET ")
        && requirement.existingNodeSupport
        && requirement.readOnly
        && !requirement.mutatesState
        && !requirement.startsService),
    existingMiniKvClientReadCommandsAvailable:
      miniKvReadOnlyRequirements.map((requirement) => requirement.methodOrCommand).join(",")
        === "HEALTH,INFOJSON,STATSJSON"
      && miniKvReadOnlyRequirements.every((requirement) =>
        requirement.project === "mini-kv"
        && requirement.kind === "tcp-command"
        && requirement.existingNodeSupport
        && requirement.readOnly
        && !requirement.mutatesState
        && !requirement.startsService),
    environmentHandlesPresent:
      environmentHandles.length === 5
      && environmentHandles.every((handle) => handle.presentInConfig && !handle.secretValue && !handle.rawCredentialValue),
    onlyJavaGetRequestsAllowed: javaReadOnlyRequirements.every((requirement) =>
      requirement.methodOrCommand.startsWith("GET ")),
    onlyMiniKvReadCommandsAllowed: miniKvReadOnlyRequirements.every((requirement) =>
      ["HEALTH", "INFOJSON", "STATSJSON"].includes(requirement.methodOrCommand)),
    forbiddenOperationsDocumented: forbiddenOperations.length === 3,
    noLiveProbePerformedNow: !readinessCut.performsLiveProbeNow && !readinessCut.opensNetworkSocketNow,
    noUpstreamServiceStarted: !readinessCut.startsUpstreamServices,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    upstreamProbesStillDisabledForReadinessCut: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noParallelJavaMiniKvEchoNeeded: !readinessCut.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
    readinessCutDigestStable: isDigest(readinessCut.readinessDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: false,
  };
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationWindowReadinessCutChecks,
): MinimalReadOnlyIntegrationWindowReadinessCutMessage[] {
  const messages: MinimalReadOnlyIntegrationWindowReadinessCutMessage[] = [];
  addBlocker(messages, checks.sourceNodeV344Ready, "NODE_V344_ARCHIVE_NOT_READY", "node-v344",
    "Node v344 archive verification must be ready before opening the read-only integration window cut.");
  addBlocker(messages, checks.sourceNodeV344KeepsRuntimeAndSideEffectsClosed, "NODE_V344_BOUNDARY_OPEN",
    "runtime-boundary", "Node v344 must keep runtime, network, credential, and upstream-start boundaries closed.");
  addBlocker(messages, checks.existingJavaClientReadEndpointsAvailable, "JAVA_READ_ENDPOINTS_MISSING",
    "java-read-only-requirements", "Existing Node Java client must already support health and ops overview GET reads.");
  addBlocker(messages, checks.existingMiniKvClientReadCommandsAvailable, "MINI_KV_READ_COMMANDS_MISSING",
    "mini-kv-read-only-requirements", "Existing Node mini-kv client must already support HEALTH/INFOJSON/STATSJSON reads.");
  addBlocker(messages, checks.environmentHandlesPresent, "ENVIRONMENT_HANDLES_MISSING",
    "environment-handles", "Read-only integration handles must be present in AppConfig and must not be secret values.");
  addBlocker(messages, checks.noLiveProbePerformedNow, "LIVE_PROBE_PERFORMED_TOO_EARLY", "runtime-boundary",
    "v345 must not send Java HTTP requests or open mini-kv TCP sockets.");
  addBlocker(messages, checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
    "Node must not start Java or mini-kv during this readiness cut.");
  addBlocker(messages, checks.upstreamProbesStillDisabledForReadinessCut, "UPSTREAM_PROBES_ENABLED",
    "configuration", "UPSTREAM_PROBES_ENABLED must stay false for the v345 readiness cut.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED",
    "configuration", "UPSTREAM_ACTIONS_ENABLED must stay false for the v345 readiness cut.");
  addBlocker(messages, checks.noParallelJavaMiniKvEchoNeeded, "PARALLEL_ECHO_REQUIRED", "next-step",
    "If existing fields are insufficient, Java v153 + mini-kv v144 must be done before Node v346.");
  return messages;
}

function collectWarnings(): MinimalReadOnlyIntegrationWindowReadinessCutMessage[] {
  return [
    {
      code: "READINESS_CUT_IS_NOT_A_LIVE_SMOKE",
      severity: "warning",
      source: "next-step",
      message:
        "v345 prepares the manual read-only window; v346 is the first version allowed to classify connection-refused, timeout, or invalid JSON evidence.",
    },
  ];
}

function collectRecommendations(
  requiresParallelEcho: boolean,
): MinimalReadOnlyIntegrationWindowReadinessCutMessage[] {
  return [
    {
      code: requiresParallelEcho ? "RUN_PARALLEL_JAVA_V153_MINI_KV_V144" : "SKIP_PARALLEL_ECHO_AND_PREPARE_V346",
      severity: "recommendation",
      source: "next-step",
      message: requiresParallelEcho
        ? "Run Java v153 + mini-kv v144 to add missing read-only integration fields before Node v346."
        : "Existing Node client and config handles are sufficient; skip Java v153 + mini-kv v144 and prepare Node v346.",
    },
  ];
}

function createSummary(
  checks: MinimalReadOnlyIntegrationWindowReadinessCutChecks,
  javaReadOnlyRequirements: readonly ReadOnlyIntegrationRequirement[],
  miniKvReadOnlyRequirements: readonly ReadOnlyIntegrationRequirement[],
  environmentHandles: readonly ReadOnlyIntegrationEnvironmentHandle[],
  forbiddenOperations: readonly ForbiddenIntegrationOperation[],
  productionBlockers: readonly MinimalReadOnlyIntegrationWindowReadinessCutMessage[],
  warnings: readonly MinimalReadOnlyIntegrationWindowReadinessCutMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationWindowReadinessCutMessage[],
): MinimalReadOnlyIntegrationWindowReadinessCutSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    javaRequirementCount: javaReadOnlyRequirements.length,
    miniKvRequirementCount: miniKvReadOnlyRequirements.length,
    environmentHandleCount: environmentHandles.length,
    forbiddenOperationCount: forbiddenOperations.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: MinimalReadOnlyIntegrationWindowReadinessCutMessage[],
  condition: boolean,
  code: string,
  source: MinimalReadOnlyIntegrationWindowReadinessCutMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
