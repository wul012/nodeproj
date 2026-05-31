import type { AppConfig } from "../config.js";
import {
  booleanField,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CROSS_PROJECT_PACKET_TARGET,
  NODE_RUNTIME_WINDOW_TARGET,
  OPERATOR_APPROVAL_TARGET,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile,
  RuntimeExecutionLiveReadGateChecks,
  RuntimeExecutionLiveReadGateMessage,
  RuntimeExecutionLiveReadGateRecord,
  RuntimeExecutionLiveReadGateServiceTarget,
  RuntimeExecutionLiveReadGateSourceV405,
  RuntimeExecutionLiveReadGateSummary,
  RuntimeExecutionLiveReadGateTargetOwner,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate";
const SOURCE_NODE_V405_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation";
const ACTIVE_PLAN =
  "docs/plans3/v406-post-java-mini-kv-runtime-execution-live-read-gate-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v407-post-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile {
  const sourceNodeV405Profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation({
      config: input.config,
      archiveRoot: input.archiveRoot,
    });
  const sourceNodeV405 = createSourceNodeV405(sourceNodeV405Profile);
  const packet = readJsonObject(CROSS_PROJECT_PACKET_TARGET);
  const nodeWindow = readJsonObject(NODE_RUNTIME_WINDOW_TARGET);
  const operatorRecord = readJsonObject(OPERATOR_APPROVAL_TARGET);
  const serviceTargets = createServiceTargets(packet);
  const draftGate = createLiveReadGate(sourceNodeV405Profile, serviceTargets, packet, false);
  const checks = createChecks(sourceNodeV405, serviceTargets, draftGate, nodeWindow, operatorRecord, packet);
  checks.readyForRuntimeExecutionLiveReadGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionLiveReadGate")
    .every(([, value]) => value);
  const ready = checks.readyForRuntimeExecutionLiveReadGate;
  const liveReadGate = createLiveReadGate(sourceNodeV405Profile, serviceTargets, packet, ready);
  checks.gateDigestStable = isDigest(liveReadGate.gateDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV405, serviceTargets, liveReadGate, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution live-read gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    gateState: ready ? "runtime-execution-live-read-gate-ready" : "blocked",
    gateDecision: ready ? "accept-approved-local-loopback-get-only-live-read-gate-for-next-smoke" : "blocked",
    readyForRuntimeExecutionLiveReadGate: ready,
    readyForApprovedLocalLoopbackReadOnlySmoke: ready,
    readyForRuntimeExecutionPacket: ready,
    activeNodeVersion: "Node v406",
    sourceNodeVersion: "Node v405",
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
    gateOnly: true,
    runtimeGateRequiresSeparateSmokeRun: true,
    runtimeExecutionPacketPresent: sourceNodeV405Profile.runtimeExecutionPacketPresent,
    runtimeExecutionPacketExecutable: sourceNodeV405Profile.runtimeExecutionPacketExecutable,
    runtimeGateApprovalPresent: sourceNodeV405Profile.runtimeGateApprovalPresent,
    concreteLoopbackPortsAssigned: sourceNodeV405Profile.concreteLoopbackPortsAssigned,
    executionAttempted: false,
    runtimeSmokeAttempted: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
    sourceNodeV405,
    serviceTargets,
    liveReadGate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      liveReadGateJson: ROUTE_PATH,
      liveReadGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV405Json: SOURCE_NODE_V405_ROUTE,
      sourceNodeV405Markdown: `${SOURCE_NODE_V405_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v407",
    },
    nextActions: ready
      ? [
        "Use Node v406 as the final gate record before any approved local-loopback read-only smoke.",
        "If v407 starts Java or mini-kv for smoke, record owned PIDs/ports and stop only those owned processes.",
        "Keep smoke GET-only against 127.0.0.1:8080 and 127.0.0.1:6424; do not write Java/mini-kv state.",
        "Keep managed audit, credential values, raw endpoint parsing, and active shard routing closed.",
      ]
      : [
        "Repair the v405 canonical approval input value validation and packet fields before retrying v406.",
        "Do not start Java or mini-kv while the v406 live-read gate is blocked.",
      ],
  };
}

function createSourceNodeV405(
  profile: RuntimeExecutionLiveReadGateSourceV405,
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile["sourceNodeV405"] {
  return {
    sourceVersion: "Node v405",
    validationState: profile.validationState,
    validationDecision: profile.validationDecision,
    readyForRuntimeExecutionCanonicalApprovalInputValueValidation:
      profile.readyForRuntimeExecutionCanonicalApprovalInputValueValidation,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    targetInputCount: profile.summary.targetInputCount,
    presentTargetInputCount: profile.summary.presentTargetInputCount,
    validTargetInputCount: profile.summary.validTargetInputCount,
  };
}

function createServiceTargets(packet: Record<string, unknown>): RuntimeExecutionLiveReadGateServiceTarget[] {
  const smokeCommands = objectArrayField(packet, "smokeCommands");
  return [
    createServiceTarget("java", packet, findSmokeCommand(smokeCommands, "java")),
    createServiceTarget("mini-kv", packet, findSmokeCommand(smokeCommands, "mini-kv")),
  ];
}

function createServiceTarget(
  owner: RuntimeExecutionLiveReadGateTargetOwner,
  packet: Record<string, unknown>,
  smokeCommand: Record<string, unknown>,
): RuntimeExecutionLiveReadGateServiceTarget {
  const loopback = objectField(packet, "loopback");
  const endpoint = objectField(loopback, owner === "java" ? "java" : "miniKv");
  const serviceOwners = objectField(packet, "serviceOwners");
  const host = stringField(endpoint, "host");
  const port = numberField(endpoint, "port");
  const method = stringField(smokeCommand, "method");
  const path = stringField(smokeCommand, "path");
  const cleanupRule = findCleanupRule(stringArrayField(packet, "cleanupRules"), owner);
  const readyForNextSmoke =
    isLoopback(host)
    && port !== null
    && method === "GET"
    && path !== null
    && cleanupRule !== null
    && stringField(serviceOwners, owner === "java" ? "java" : "miniKv") !== null;
  return {
    owner,
    serviceOwner: stringField(serviceOwners, owner === "java" ? "java" : "miniKv"),
    host,
    port,
    method,
    path,
    cleanupRule,
    localLoopbackOnly: isLoopback(host),
    getOnly: method === "GET",
    concretePortAssigned: port !== null,
    nodeStartsService: false,
    nodeStopsService: false,
    readOnly: true,
    writeAllowed: false,
    credentialValueRequired: false,
    rawEndpointUrlRequired: false,
    managedAuditConnectionAllowed: false,
    activeShardRoutingAllowed: false,
    readyForNextSmoke,
  };
}

function createLiveReadGate(
  source: RuntimeExecutionLiveReadGateSourceV405,
  serviceTargets: RuntimeExecutionLiveReadGateServiceTarget[],
  packet: Record<string, unknown>,
  ready: boolean,
): RuntimeExecutionLiveReadGateRecord {
  const record = {
    gateMode: "runtime-execution-live-read-gate" as const,
    sourceSpan: "Node v405 canonical approval input value validation + approved e/398/input packet" as const,
    gateDecision: "accept-approved-local-loopback-get-only-live-read-gate-for-next-smoke" as const,
    approvalCorrelationId: source.valueValidation.sharedApprovalCorrelationId,
    approvalWindowId: source.valueValidation.approvalWindowId,
    packetId: source.valueValidation.packetId,
    targetCount: 2 as const,
    readyTargetCount: serviceTargets.filter((target) => target.readyForNextSmoke).length,
    packetExecutable: source.runtimeExecutionPacketExecutable,
    liveReadGateInputValidated: source.readyForRuntimeLiveReadGate,
    localLoopbackOnly: serviceTargets.every((target) => target.localLoopbackOnly),
    concreteLoopbackPortsAssigned: serviceTargets.every((target) => target.concretePortAssigned),
    serviceOwnersResolved: serviceTargets.every((target) => target.serviceOwner !== null),
    smokeTargetsGetOnly: serviceTargets.every((target) => target.getOnly),
    cleanupProofRequired: booleanField(packet, "cleanupProofRequiredAfterRun") === true,
    cleanupRuleCount: stringArrayField(packet, "cleanupRules").length,
    operatorOwnsServiceLifecycle: true as const,
    nodeMayStartServices: false as const,
    nodeMayStopServices: false as const,
    nodeMayMutateUpstream: false as const,
    runtimeSmokeAttempted: false as const,
    executionAttempted: false as const,
    managedAuditConnectionOpened: false as const,
    credentialValueRead: false as const,
    rawEndpointUrlParsed: false as const,
    activeShardRoutingEnabled: false as const,
    liveReadGateOpenForNextSmoke: ready,
    nextNodeVersionSuggested: "Node v407" as const,
  };
  return {
    gateDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  sourceNodeV405: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile["sourceNodeV405"],
  serviceTargets: RuntimeExecutionLiveReadGateServiceTarget[],
  liveReadGate: RuntimeExecutionLiveReadGateRecord,
  nodeWindow: Record<string, unknown>,
  operatorRecord: Record<string, unknown>,
  packet: Record<string, unknown>,
): RuntimeExecutionLiveReadGateChecks {
  const javaTarget = serviceTargets.find((target) => target.owner === "java");
  const miniKvTarget = serviceTargets.find((target) => target.owner === "mini-kv");
  return {
    sourceNodeV405Ready:
      sourceNodeV405.readyForRuntimeExecutionCanonicalApprovalInputValueValidation
      && sourceNodeV405.readyForRuntimeExecutionPacket
      && sourceNodeV405.readyForRuntimeLiveReadGate
      && sourceNodeV405.checkCount === sourceNodeV405.passedCheckCount,
    sourceNodeV405HasNoBlockers: sourceNodeV405.productionBlockerCount === 0,
    sourceNodeV405DidNotExecuteRuntime: true,
    canonicalInputsStillPresent:
      sourceNodeV405.targetInputCount === 3
      && sourceNodeV405.presentTargetInputCount === 3,
    canonicalInputsStillValid: sourceNodeV405.validTargetInputCount === 3,
    approvalCorrelationIdStable:
      liveReadGate.approvalCorrelationId !== null
      && liveReadGate.approvalCorrelationId === stringField(operatorRecord, "approvalCorrelationId")
      && liveReadGate.approvalCorrelationId === stringField(packet, "approvalCorrelationId"),
    approvalWindowStillValid:
      liveReadGate.approvalWindowId !== null
      && liveReadGate.approvalWindowId === stringField(operatorRecord, "approvedRuntimeWindowId"),
    runtimePacketExecutable: liveReadGate.packetExecutable,
    runtimeGateApprovalPresent: booleanField(packet, "runtimeExecutionPacketPresent") === true,
    loopbackHostsAreLocal: liveReadGate.localLoopbackOnly,
    loopbackPortsConcrete:
      numberField(nodeWindow, "javaLoopbackPort") === javaTarget?.port
      && numberField(nodeWindow, "miniKvLoopbackPort") === miniKvTarget?.port,
    serviceOwnersDeclared: liveReadGate.serviceOwnersResolved,
    javaSmokeTargetDeclared: javaTarget?.path !== null && javaTarget?.path !== undefined,
    miniKvSmokeTargetDeclared: miniKvTarget?.path !== null && miniKvTarget?.path !== undefined,
    smokeTargetsGetOnly: liveReadGate.smokeTargetsGetOnly,
    javaSmokeTargetHealthGet: javaTarget?.method === "GET" && javaTarget.path === "/actuator/health",
    miniKvSmokeTargetHealthGet: miniKvTarget?.method === "GET" && miniKvTarget.path === "/health",
    cleanupProofRequired: liveReadGate.cleanupProofRequired,
    cleanupRulesSafe:
      liveReadGate.cleanupRuleCount >= 3
      && stringArrayField(packet, "cleanupRules").includes("stop-only-owned-java-processes")
      && stringArrayField(packet, "cleanupRules").includes("stop-only-owned-mini-kv-processes"),
    upstreamProbesApproved: booleanField(nodeWindow, "upstreamProbesEnabled") === true,
    upstreamActionsDisabled:
      booleanField(nodeWindow, "upstreamActionsEnabled") === false
      && booleanField(packet, "writeOperationsAllowed") === false,
    operatorVerified: booleanField(operatorRecord, "operatorVerified") === true,
    operatorCleanupAcknowledged: booleanField(operatorRecord, "cleanupAcknowledged") === true,
    credentialValueReadDenied: booleanField(operatorRecord, "approvesCredentialValueRead") === false,
    rawEndpointParsingDenied:
      booleanField(operatorRecord, "approvesRawEndpointUrlParsing") === false
      && booleanField(packet, "rawEndpointUrlParsingAllowed") === false,
    managedAuditConnectionDenied: booleanField(packet, "managedAuditConnectionAllowed") === false,
    writeOperationsDenied: booleanField(packet, "writeOperationsAllowed") === false,
    noAutomaticUpstreamStartStop: !liveReadGate.nodeMayStartServices && !liveReadGate.nodeMayStopServices,
    noUpstreamMutation: !liveReadGate.nodeMayMutateUpstream,
    executionStillNotAttempted: !liveReadGate.executionAttempted && !liveReadGate.runtimeSmokeAttempted,
    activeShardPrototypeStillDisabled: !liveReadGate.activeShardRoutingEnabled,
    gateDigestStable: isDigest(liveReadGate.gateDigest),
    readyForRuntimeExecutionLiveReadGate: false,
  };
}

function createSummary(
  sourceNodeV405: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile["sourceNodeV405"],
  serviceTargets: RuntimeExecutionLiveReadGateServiceTarget[],
  liveReadGate: RuntimeExecutionLiveReadGateRecord,
  checks: RuntimeExecutionLiveReadGateChecks,
  productionBlockers: RuntimeExecutionLiveReadGateMessage[],
  warnings: RuntimeExecutionLiveReadGateMessage[],
  recommendations: RuntimeExecutionLiveReadGateMessage[],
): RuntimeExecutionLiveReadGateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV405.checkCount,
    sourcePassedCheckCount: sourceNodeV405.passedCheckCount,
    targetCount: 2,
    readyTargetCount: serviceTargets.filter((target) => target.readyForNextSmoke).length,
    cleanupRuleCount: liveReadGate.cleanupRuleCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
    readyForApprovedLocalLoopbackReadOnlySmoke: checks.readyForRuntimeExecutionLiveReadGate,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionLiveReadGateChecks,
): RuntimeExecutionLiveReadGateMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV405Ready, "SOURCE_NODE_V405_NOT_READY", "node-v405", "Node v405 value validation must be ready."],
    [checks.sourceNodeV405HasNoBlockers, "SOURCE_NODE_V405_HAS_BLOCKERS", "node-v405", "Node v405 must have no production blockers."],
    [checks.canonicalInputsStillPresent, "CANONICAL_INPUTS_MISSING", "e-398-input", "All three canonical approval inputs must remain present."],
    [checks.canonicalInputsStillValid, "CANONICAL_INPUTS_INVALID", "e-398-input", "All three canonical approval inputs must remain valid."],
    [checks.approvalCorrelationIdStable, "APPROVAL_CORRELATION_UNSTABLE", "approval-record", "The shared approval correlation id must remain stable."],
    [checks.runtimePacketExecutable, "RUNTIME_PACKET_NOT_EXECUTABLE", "runtime-packet", "The approved runtime execution packet must remain executable."],
    [checks.loopbackHostsAreLocal, "NON_LOOPBACK_HOST", "runtime-packet", "Live-read smoke targets must stay on loopback hosts."],
    [checks.loopbackPortsConcrete, "LOOPBACK_PORTS_NOT_CONCRETE", "runtime-packet", "Java and mini-kv loopback ports must be concrete."],
    [checks.serviceOwnersDeclared, "SERVICE_OWNERS_MISSING", "runtime-packet", "Java, mini-kv, and Node owners must be declared."],
    [checks.smokeTargetsGetOnly, "NON_GET_SMOKE_TARGET", "runtime-packet", "Smoke targets must be GET-only."],
    [checks.cleanupProofRequired, "CLEANUP_PROOF_NOT_REQUIRED", "runtime-packet", "Cleanup proof must be required after any runtime start."],
    [checks.upstreamActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-boundary", "Upstream writes/actions must remain disabled."],
    [checks.credentialValueReadDenied, "CREDENTIAL_READ_ALLOWED", "runtime-boundary", "Credential value read must remain denied."],
    [checks.managedAuditConnectionDenied, "MANAGED_AUDIT_CONNECTION_ALLOWED", "runtime-boundary", "Managed audit connection must remain denied."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_OWNED_BY_NODE", "runtime-boundary", "v406 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v406 must not mutate sibling state."],
    [checks.executionStillNotAttempted, "RUNTIME_ALREADY_ATTEMPTED", "runtime-boundary", "v406 must be a gate record, not a smoke run."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeExecutionLiveReadGateMessage[] {
  return [
    {
      code: "LIVE_READ_GATE_IS_NOT_RUNTIME_SMOKE",
      severity: "warning",
      source: "node-v406",
      message: "v406 accepts the live-read gate for the next smoke run; it still does not start Java or mini-kv.",
    },
  ];
}

function collectRecommendations(ready: boolean): RuntimeExecutionLiveReadGateMessage[] {
  return [
    {
      code: ready ? "RUN_APPROVED_LOOPBACK_SMOKE_NEXT" : "REPAIR_V406_BEFORE_SMOKE",
      severity: "recommendation",
      source: "node-v406",
      message: ready
        ? "Run Node v407 as an approved local-loopback, GET-only, read-only smoke with explicit owned-process cleanup proof."
        : "Repair the v406 gate inputs before attempting any local-loopback smoke.",
    },
  ];
}

function findSmokeCommand(
  commands: Record<string, unknown>[],
  owner: RuntimeExecutionLiveReadGateTargetOwner,
): Record<string, unknown> {
  return commands.find((command) => stringField(command, "owner") === owner) ?? {};
}

function findCleanupRule(
  cleanupRules: readonly string[],
  owner: RuntimeExecutionLiveReadGateTargetOwner,
): string | null {
  return cleanupRules.find((rule) => rule.includes(owner === "java" ? "java" : "mini-kv")) ?? null;
}

function isLoopback(host: string | null): boolean {
  return host === "127.0.0.1" || host === "localhost";
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
