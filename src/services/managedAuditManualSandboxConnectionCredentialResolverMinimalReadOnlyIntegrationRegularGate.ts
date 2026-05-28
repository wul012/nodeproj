import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile,
  MinimalReadOnlyIntegrationRegularGateArtifactExpectation,
  MinimalReadOnlyIntegrationRegularGateChecks,
  MinimalReadOnlyIntegrationRegularGateEnvRequirement,
  MinimalReadOnlyIntegrationRegularGateFailureClassification,
  MinimalReadOnlyIntegrationRegularGateHeaderRequirement,
  MinimalReadOnlyIntegrationRegularGateMessage,
  MinimalReadOnlyIntegrationRegularGateRecord,
  MinimalReadOnlyIntegrationRegularGateSummary,
  MinimalReadOnlyIntegrationRegularGateTarget,
  SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate";
const SOURCE_NODE_V350_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification";
const SOURCE_NODE_V349_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive";
const ACTIVE_PLAN =
  "docs/plans2/v363-post-sandbox-handle-review-prerequisite-closure-review-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v364-post-minimal-read-only-integration-regular-gate-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate(
  input: { config: AppConfig; sourceArchiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile {
  const sourceProfile =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification({
      config: input.config,
      archiveRoot: input.sourceArchiveRoot,
    });
  const sourceNodeV350 = createSourceNodeV350(sourceProfile);
  const draftGate = createRegularGate(sourceNodeV350, false);
  const checks = createChecks(input.config, sourceNodeV350, draftGate);
  checks.readyForMinimalReadOnlyIntegrationRegularGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationRegularGate")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalReadOnlyIntegrationRegularGate;
  const regularGate = createRegularGate(sourceNodeV350, ready);
  checks.gateDigestStable = isDigest(regularGate.gateDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(ready);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV350, regularGate, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration regular gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    gateState: ready ? "minimal-read-only-integration-regular-gate-ready" : "blocked",
    gateDecision: regularGate.gateDecision,
    readyForMinimalReadOnlyIntegrationRegularGate: ready,
    readyForNodeV365RegularGateArchiveVerification: ready,
    consumesNodeV350MinimalReadOnlyIntegrationPassedArchiveVerification: true,
    activeNodeVersion: "Node v364",
    sourceNodeVersion: "Node v350",
    regularGateOnly: true,
    gateDefinitionOnly: true,
    rerunsLiveProbe: false,
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
    sourceNodeV350,
    regularGate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationRegularGateJson: ROUTE_PATH,
      minimalReadOnlyIntegrationRegularGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV350Json: SOURCE_NODE_V350_ROUTE,
      sourceNodeV350Markdown: `${SOURCE_NODE_V350_ROUTE}?format=markdown`,
      sourceNodeV349Json: SOURCE_NODE_V349_ROUTE,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v365",
    },
    nextActions: ready
      ? [
        "Use Node v365 to archive this regular gate and then wire it into focused CI or operator smoke documentation.",
        "Run the actual read-only smoke only in an explicit read window with Java and mini-kv started by their own project owners.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
      ]
      : [
        "Fix Node v350 passed archive verification before defining the regular gate.",
        "Do not rerun Java or mini-kv probes from a blocked regular gate definition alone.",
      ],
  };
}

function createSourceNodeV350(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
): SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference {
  return {
    sourceVersion: "Node v350",
    profileVersion: profile.profileVersion,
    transitionState: profile.transitionState,
    transitionDecision: profile.transitionDecision,
    readyForPassedArchiveVerification: profile.readyForMinimalReadOnlyIntegrationPassedArchiveVerification,
    transitionDigest: profile.transitionRecord.transitionDigest,
    sourceArchiveDigest: profile.transitionRecord.sourceArchiveDigest,
    sourceNodeV349Result: profile.sourceNodeV349.rerunArchiveResult,
    sourceNodeV349Decision: profile.sourceNodeV349.rerunArchiveDecision,
    attemptedTargetCount: profile.summary.attemptedTargetCount,
    passedTargetCount: profile.summary.passedTargetCount,
    unavailableTargetCount: profile.summary.unavailableTargetCount,
    invalidContractTargetCount: profile.summary.invalidContractTargetCount,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    warningCount: profile.summary.warningCount,
    recommendationCount: profile.summary.recommendationCount,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    mutatesJavaState: profile.mutatesJavaState,
    mutatesMiniKvState: profile.mutatesMiniKvState,
    connectsManagedAudit: profile.connectsManagedAudit,
    readsManagedAuditCredential: profile.readsManagedAuditCredential,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    executionAllowed: profile.executionAllowed,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
  };
}

function createRegularGate(
  source: SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference,
  ready: boolean,
): MinimalReadOnlyIntegrationRegularGateRecord {
  const requiredEnv = createRequiredEnv();
  const requiredHeaders = createRequiredHeaders();
  const readOnlyTargets = createReadOnlyTargets();
  const failureClassifications = createFailureClassifications();
  const artifactExpectations = createArtifactExpectations();
  const record = {
    gateMode: "minimal-read-only-integration-regular-gate" as const,
    sourceSpan: "Node v349 passed smoke + Node v350 passed archive verification" as const,
    sourceTransitionDigest: source.transitionDigest,
    sourceArchiveDigest: source.sourceArchiveDigest,
    gateDecision: ready
      ? "standardize-v349-read-only-smoke-as-regular-gate" as const
      : "blocked" as const,
    requiredEnvCount: requiredEnv.length,
    requiredHeaderCount: requiredHeaders.length,
    readOnlyTargetCount: readOnlyTargets.length,
    failureClassificationCount: failureClassifications.length,
    artifactExpectationCount: artifactExpectations.length,
    nextNodeVersionSuggested: "Node v365" as const,
    rerunsLiveProbeNow: false as const,
    automaticUpstreamStart: false as const,
    opensManagedAuditConnection: false as const,
    readsCredentialValue: false as const,
    parsesRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    invokesRuntimeShell: false as const,
    mutatesUpstreamState: false as const,
    requiredEnv,
    requiredHeaders,
    readOnlyTargets,
    failureClassifications,
    artifactExpectations,
  };

  return {
    gateDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function createRequiredEnv(): MinimalReadOnlyIntegrationRegularGateEnvRequirement[] {
  return [
    env("UPSTREAM_PROBES_ENABLED", "true", "gate-execution-window", "Enable only the read-only Java/mini-kv probes during an approved read window."),
    env("UPSTREAM_ACTIONS_ENABLED", "false", "gate-execution-window", "Keep all upstream writes and managed audit actions disabled."),
    env("ACCESS_GUARD_ENFORCEMENT_ENABLED", "true", "gate-definition-runtime", "Require audit identity headers on the Node route."),
    env("ORDEROPS_AUTH_TOKEN_SECRET", "configured", "gate-definition-runtime", "Keep authenticated route behavior deterministic in smoke runs."),
  ];
}

function env(
  key: string,
  requiredValue: string,
  scope: MinimalReadOnlyIntegrationRegularGateEnvRequirement["scope"],
  reason: string,
): MinimalReadOnlyIntegrationRegularGateEnvRequirement {
  return { key, requiredValue, scope, reason };
}

function createRequiredHeaders(): MinimalReadOnlyIntegrationRegularGateHeaderRequirement[] {
  return [
    header("x-orderops-operator-id", "Identify the operator running or reviewing the gate."),
    header("x-orderops-roles", "Require admin/auditor/operator/viewer review scope."),
    header("x-orderops-operator-verified", "Confirm the operator identity was externally verified."),
    header("x-orderops-approval-correlation-id", "Bind the smoke window to an approval/audit correlation id."),
  ];
}

function header(headerName: string, reason: string): MinimalReadOnlyIntegrationRegularGateHeaderRequirement {
  return { header: headerName, required: true, secret: false, reason };
}

function createReadOnlyTargets(): MinimalReadOnlyIntegrationRegularGateTarget[] {
  return [
    target("java", "Java actuator health", "GET /actuator/health"),
    target("java", "Java ops overview", "GET /api/v1/ops/overview"),
    target("mini-kv", "mini-kv health", "HEALTH"),
    target("mini-kv", "mini-kv info JSON", "INFOJSON"),
    target("mini-kv", "mini-kv stats JSON", "STATSJSON"),
  ];
}

function target(
  project: MinimalReadOnlyIntegrationRegularGateTarget["project"],
  targetName: string,
  methodOrCommand: string,
): MinimalReadOnlyIntegrationRegularGateTarget {
  return {
    project,
    targetName,
    methodOrCommand,
    readOnly: true,
    mutatesState: false,
    expectedStatus: "read-passed",
    failureClass: project === "java" ? "read-window-unavailable" : "invalid-read-contract",
  };
}

function createFailureClassifications(): MinimalReadOnlyIntegrationRegularGateFailureClassification[] {
  return [
    failure("READ_WINDOW_UNAVAILABLE", "Java or mini-kv is not reachable in the approved read window.",
      "Keep Node gate blocked; ask the owning project window to start the service and rerun."),
    failure("INVALID_READ_CONTRACT", "A target responds but does not match the expected read-only shape.",
      "Request Java/mini-kv read-contract evidence before another gate pass."),
    failure("RUNTIME_BOUNDARY_BLOCKED", "Any probe would need write scope, credential value, raw endpoint URL, provider/client, or runtime shell.",
      "Pause immediately and do not run the gate."),
  ];
}

function failure(
  code: string,
  condition: string,
  action: string,
): MinimalReadOnlyIntegrationRegularGateFailureClassification {
  return {
    code,
    condition,
    action,
    requestsJavaMiniKvEcho: code === "INVALID_READ_CONTRACT",
    opensCredentialOrEndpoint: false,
  };
}

function createArtifactExpectations(): MinimalReadOnlyIntegrationRegularGateArtifactExpectation[] {
  return [
    artifact("v349 passed smoke JSON/Markdown evidence", "Node v349"),
    artifact("v350 passed archive verification JSON/Markdown evidence", "Node v350"),
    artifact("regular gate JSON/Markdown evidence", "Node v364"),
    artifact("regular gate summary JSON", "Node v364"),
    artifact("regular gate screenshot", "Node v364"),
    artifact("regular gate explanation and code walkthrough", "Node v364"),
  ];
}

function artifact(
  artifactName: string,
  sourceVersion: MinimalReadOnlyIntegrationRegularGateArtifactExpectation["sourceVersion"],
): MinimalReadOnlyIntegrationRegularGateArtifactExpectation {
  return { artifact: artifactName, required: true, sourceVersion };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference,
  gate: MinimalReadOnlyIntegrationRegularGateRecord,
): MinimalReadOnlyIntegrationRegularGateChecks {
  const javaTargets = gate.readOnlyTargets.filter((targetEntry) => targetEntry.project === "java");
  const miniKvTargets = gate.readOnlyTargets.filter((targetEntry) => targetEntry.project === "mini-kv");
  return {
    sourceNodeV350Ready:
      source.transitionState === "minimal-read-only-integration-passed-archive-verified"
      && source.readyForPassedArchiveVerification,
    sourceNodeV350VerifiedPassedArchive:
      source.transitionDecision === "advance-to-managed-audit-disabled-read-only-integration-intake",
    sourceNodeV349AllReadPassed:
      source.sourceNodeV349Result === "all-read-passed"
      && source.sourceNodeV349Decision === "archive-read-passed-rerun-evidence",
    sourceTargetCountsAllPassed:
      source.attemptedTargetCount === 5
      && source.passedTargetCount === 5
      && source.unavailableTargetCount === 0
      && source.invalidContractTargetCount === 0,
    sourceTransitionDigestStable: isDigest(source.transitionDigest),
    sourceArchiveDigestStable: isDigest(source.sourceArchiveDigest),
    sourceKeepsRuntimeBoundaryClosed:
      !source.rerunsLiveProbe
      && !source.startsJavaService
      && !source.startsMiniKvService
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.rawEndpointUrlParsed
      && !source.executionAllowed
      && !source.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
    gateDoesNotRerunProbeNow: !gate.rerunsLiveProbeNow,
    safeEnvDocumentsProbeEnablement: hasEnv(gate, "UPSTREAM_PROBES_ENABLED", "true"),
    safeEnvKeepsActionsDisabled: hasEnv(gate, "UPSTREAM_ACTIONS_ENABLED", "false") && !config.upstreamActionsEnabled,
    safeEnvRequiresAccessGuard: hasEnv(gate, "ACCESS_GUARD_ENFORCEMENT_ENABLED", "true"),
    requiredHeadersDocumentOperatorIdentity:
      hasHeader(gate, "x-orderops-operator-id")
      && hasHeader(gate, "x-orderops-roles")
      && hasHeader(gate, "x-orderops-operator-verified")
      && hasHeader(gate, "x-orderops-approval-correlation-id"),
    requiredHeadersContainNoSecrets: gate.requiredHeaders.every((item) => !item.secret),
    javaTargetsAreGetOnly:
      javaTargets.length === 2
      && javaTargets.every((item) => item.methodOrCommand.startsWith("GET ") && item.readOnly && !item.mutatesState),
    miniKvTargetsAreReadOnlyCommands:
      miniKvTargets.length === 3
      && miniKvTargets.every((item) => ["HEALTH", "INFOJSON", "STATSJSON"].includes(item.methodOrCommand)
        && item.readOnly && !item.mutatesState),
    targetCountMatchesV349: gate.readOnlyTargetCount === source.attemptedTargetCount,
    failureClassificationCoversUnavailableWindow: hasFailure(gate, "READ_WINDOW_UNAVAILABLE", false),
    failureClassificationCoversInvalidContract: hasFailure(gate, "INVALID_READ_CONTRACT", true),
    failureClassificationCoversBoundaryBlocks: hasFailure(gate, "RUNTIME_BOUNDARY_BLOCKED", false),
    artifactExpectationsCoverEvidenceAndScreenshot:
      hasArtifact(gate, "v349 passed smoke JSON/Markdown evidence")
      && hasArtifact(gate, "v350 passed archive verification JSON/Markdown evidence")
      && hasArtifact(gate, "regular gate screenshot"),
    artifactExpectationsCoverPlanAndWalkthrough:
      hasArtifact(gate, "regular gate summary JSON")
      && hasArtifact(gate, "regular gate explanation and code walkthrough"),
    noCredentialValueRequestedOrRead: !gate.readsCredentialValue,
    noRawEndpointUrlRequestedOrParsed: !gate.parsesRawEndpointUrl,
    noProviderClientInstantiated: !gate.instantiatesProviderClient,
    noRuntimeShellImplementedOrInvoked: !gate.invokesRuntimeShell,
    noManagedAuditHttpTcp: !gate.opensManagedAuditConnection,
    noUpstreamServiceStarted: !gate.automaticUpstreamStart,
    noUpstreamMutation: !gate.mutatesUpstreamState,
    noJavaMiniKvEchoRequiredForPassedEvidence:
      gate.failureClassifications.find((item) => item.code === "INVALID_READ_CONTRACT")?.requestsJavaMiniKvEcho === true
      && source.requiresParallelJavaV153MiniKvV144ReadOnlyEcho === false,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    gateDigestStable: isDigest(gate.gateDigest),
    readyForMinimalReadOnlyIntegrationRegularGate: false,
  };
}

function hasEnv(gate: MinimalReadOnlyIntegrationRegularGateRecord, key: string, requiredValue: string): boolean {
  return gate.requiredEnv.some((item) => item.key === key && item.requiredValue === requiredValue);
}

function hasHeader(gate: MinimalReadOnlyIntegrationRegularGateRecord, headerName: string): boolean {
  return gate.requiredHeaders.some((item) => item.header === headerName && item.required && !item.secret);
}

function hasFailure(
  gate: MinimalReadOnlyIntegrationRegularGateRecord,
  code: string,
  requestsJavaMiniKvEcho: boolean,
): boolean {
  return gate.failureClassifications.some((item) =>
    item.code === code
    && item.requestsJavaMiniKvEcho === requestsJavaMiniKvEcho
    && item.opensCredentialOrEndpoint === false);
}

function hasArtifact(gate: MinimalReadOnlyIntegrationRegularGateRecord, artifactName: string): boolean {
  return gate.artifactExpectations.some((item) => item.artifact === artifactName && item.required);
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationRegularGateChecks,
): MinimalReadOnlyIntegrationRegularGateMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationRegularGateMessage["source"], string]> = [
    [checks.sourceNodeV350Ready, "NODE_V350_NOT_READY", "node-v350",
      "Node v350 passed archive verification must be ready before standardizing the regular gate."],
    [checks.sourceNodeV349AllReadPassed, "NODE_V349_NOT_ALL_READ_PASSED", "node-v350",
      "The regular gate can only inherit the v349 all-read-passed evidence."],
    [checks.safeEnvKeepsActionsDisabled, "UPSTREAM_ACTIONS_NOT_DISABLED", "runtime-config",
      "UPSTREAM_ACTIONS_ENABLED must remain false for the regular gate."],
    [checks.requiredHeadersDocumentOperatorIdentity, "OPERATOR_HEADERS_INCOMPLETE", "regular-gate",
      "The gate must require operator identity, roles, verified flag, and approval correlation headers."],
    [checks.javaTargetsAreGetOnly, "JAVA_TARGETS_NOT_GET_ONLY", "regular-gate",
      "Java targets must be GET-only read endpoints."],
    [checks.miniKvTargetsAreReadOnlyCommands, "MINI_KV_TARGETS_NOT_READ_ONLY", "regular-gate",
      "mini-kv targets must be read-only commands."],
    [checks.failureClassificationCoversInvalidContract, "INVALID_CONTRACT_FAILURE_MISSING", "regular-gate",
      "The gate must classify invalid read contracts and request upstream read-only evidence."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "The regular gate must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "The regular gate must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "The regular gate must not instantiate provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and not invoked."],
    [checks.noManagedAuditHttpTcp, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit HTTP/TCP must remain closed."],
    [checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "Node must not auto-start Java or mini-kv from the gate definition."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "The gate must not mutate Java or mini-kv state."],
    [checks.gateDigestStable, "GATE_DIGEST_UNSTABLE", "regular-gate",
      "The regular gate digest must be stable."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(ready: boolean): MinimalReadOnlyIntegrationRegularGateMessage[] {
  return [{
    code: "REGULAR_GATE_DEFINITION_ONLY",
    severity: "warning",
    source: "next-step",
    message: ready
      ? "v364 defines the regular gate from v349/v350 passed evidence; it does not rerun Java or mini-kv now."
      : "The regular gate remains blocked until v350 passed evidence is valid.",
  }];
}

function collectRecommendations(ready: boolean): MinimalReadOnlyIntegrationRegularGateMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V365_REGULAR_GATE_ARCHIVE" : "FIX_SOURCE_PASSED_EVIDENCE_BEFORE_GATE",
    severity: "recommendation",
    source: "next-step",
    message: ready
      ? "Archive the v364 regular gate, then wire the minimal read-only smoke into focused CI/operator checks."
      : "Fix v349/v350 passed evidence before defining a reusable regular gate.",
  }];
}

function createSummary(
  source: SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference,
  gate: MinimalReadOnlyIntegrationRegularGateRecord,
  checks: MinimalReadOnlyIntegrationRegularGateChecks,
  productionBlockers: readonly MinimalReadOnlyIntegrationRegularGateMessage[],
  warnings: readonly MinimalReadOnlyIntegrationRegularGateMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationRegularGateMessage[],
): MinimalReadOnlyIntegrationRegularGateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    attemptedTargetCount: source.attemptedTargetCount,
    passedTargetCount: source.passedTargetCount,
    readOnlyTargetCount: gate.readOnlyTargetCount,
    requiredEnvCount: gate.requiredEnvCount,
    requiredHeaderCount: gate.requiredHeaderCount,
    failureClassificationCount: gate.failureClassificationCount,
    artifactExpectationCount: gate.artifactExpectationCount,
    sourceCheckCount: source.sourceCheckCount,
    sourcePassedCheckCount: source.sourcePassedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
