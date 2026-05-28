import type { AppConfig } from "../config.js";
import { isAppHttpError } from "../errors.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
  ShardReadinessEvidenceAssessment,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile,
  MinimalShardReadinessLiveReadGate,
  MinimalShardReadinessLiveReadGateChecks,
  MinimalShardReadinessLiveReadGateMessage,
  MinimalShardReadinessLiveReadGateSummary,
  MinimalShardReadinessLiveReadObservation,
  SourceNodeV370ShardReadinessConsumerGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate";
const SOURCE_NODE_V370_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate";
const ACTIVE_PLAN = "docs/plans3/v370-post-shard-readiness-contract-consumer-gate-roadmap.md";
const NEXT_PLAN = "docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md";
const JAVA_LIVE_ENDPOINT = "GET /api/v1/ops/shard-readiness";
const MINI_KV_LIVE_COMMAND = "SHARDJSON";
const REQUIRED_SHARD_READINESS_FIELDS = Object.freeze([
  "project",
  "version",
  "readOnly",
  "executionAllowed",
  "shardEnabled",
  "shardCount",
  "slotCount",
  "routingMode",
  "evidencePath",
  "status",
]);

export async function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate(
  input: {
    config: AppConfig;
    orderPlatform: OrderPlatformClient;
    miniKv: MiniKvClient;
    archiveRoot?: string;
  },
): Promise<ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile> {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV370Profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
      config: input.config,
      archiveRoot: projectRoot,
    });
  const sourceNodeV370 = createSourceNodeV370(sourceNodeV370Profile);
  const [javaLiveRead, miniKvLiveRead] = await Promise.all([
    readJavaShardReadiness(input.config, input.orderPlatform, sourceNodeV370Profile.javaShardReadiness),
    readMiniKvShardReadiness(input.config, input.miniKv, sourceNodeV370Profile.miniKvShardReadiness),
  ]);
  const gate = createGate(sourceNodeV370, javaLiveRead, miniKvLiveRead);
  const checks = createChecks(input.config, sourceNodeV370, javaLiveRead, miniKvLiveRead, gate);
  checks.readyForMinimalShardReadinessLiveReadGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalShardReadinessLiveReadGate")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalShardReadinessLiveReadGate;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(javaLiveRead, miniKvLiveRead);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary([javaLiveRead, miniKvLiveRead], checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal shard readiness live-read gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    gateState: ready ? "minimal-shard-readiness-live-read-gate-ready" : "blocked",
    gateDecision: ready ? "archive-minimal-shard-readiness-live-read" : "blocked",
    readyForMinimalShardReadinessLiveReadGate: ready,
    readyForNodeV372LiveReadArchiveVerification: ready,
    activeNodeVersion: "Node v371",
    sourceNodeVersion: "Node v370",
    consumesNodeV370ShardReadinessContractConsumerGate: true,
    liveReadOnly: true,
    rerunsV370StaticConsumer: true,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV370,
    sourceStaticEvidence: {
      java: sourceNodeV370Profile.javaShardReadiness,
      miniKv: sourceNodeV370Profile.miniKvShardReadiness,
    },
    liveReads: {
      java: javaLiveRead,
      miniKv: miniKvLiveRead,
    },
    gate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalShardReadinessLiveReadGateJson: ROUTE_PATH,
      minimalShardReadinessLiveReadGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV370Json: SOURCE_NODE_V370_ROUTE,
      sourceNodeV370Markdown: `${SOURCE_NODE_V370_ROUTE}?format=markdown`,
      javaLiveEndpoint: JAVA_LIVE_ENDPOINT,
      miniKvLiveCommand: MINI_KV_LIVE_COMMAND,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v372",
    },
    nextActions: ready
      ? [
        "Archive Node v371 as the minimal shard readiness live-read gate.",
        "Use Node v372 to verify the v371 live-read archive instead of adding another prerequisite chain.",
        "Keep later shard work read-only until a separate plan explicitly authorizes stronger mini-kv shard behavior.",
      ]
      : [
        "Keep Node v371 blocked until Java and mini-kv live reads pass.",
        "Do not auto-start Java or mini-kv from Node to compensate for a failed live read.",
      ],
  };
}

function createSourceNodeV370(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
): SourceNodeV370ShardReadinessConsumerGateReference {
  return {
    sourceVersion: "Node v370",
    profileVersion: profile.profileVersion,
    gateState: profile.gateState,
    gateDecision: profile.gateDecision,
    readyForShardReadinessContractConsumerGate: profile.readyForShardReadinessContractConsumerGate,
    readyForNodeV371MinimalShardReadinessLiveReadGate: profile.readyForNodeV371MinimalShardReadinessLiveReadGate,
    sourceGateDigest: profile.gate.gateDigest,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    evidenceSourceCount: profile.summary.evidenceSourceCount,
    readyEvidenceSourceCount: profile.summary.readyEvidenceSourceCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    executionAllowed: false,
  };
}

async function readJavaShardReadiness(
  config: AppConfig,
  orderPlatform: OrderPlatformClient,
  sourceEvidence: ShardReadinessEvidenceAssessment,
): Promise<MinimalShardReadinessLiveReadObservation> {
  if (!config.upstreamProbesEnabled) {
    return skippedObservation("advanced-order-platform", "Java v153 live", "http-json", JAVA_LIVE_ENDPOINT, null);
  }

  try {
    const response = await orderPlatform.shardReadiness();
    return assessLiveRead({
      project: "advanced-order-platform",
      sourceVersion: "Java v153 live",
      transport: "http-json",
      endpoint: JAVA_LIVE_ENDPOINT,
      command: null,
      statusCode: response.statusCode,
      latencyMs: response.latencyMs,
      evidence: recordOrNull(response.data),
      sourceEvidence,
    });
  } catch (error) {
    return failedObservation("advanced-order-platform", "Java v153 live", "http-json", JAVA_LIVE_ENDPOINT, null, error);
  }
}

async function readMiniKvShardReadiness(
  config: AppConfig,
  miniKv: MiniKvClient,
  sourceEvidence: ShardReadinessEvidenceAssessment,
): Promise<MinimalShardReadinessLiveReadObservation> {
  if (!config.upstreamProbesEnabled) {
    return skippedObservation("mini-kv", "mini-kv v144 live", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_LIVE_COMMAND);
  }

  try {
    const response = await miniKv.shardJson();
    return assessLiveRead({
      project: "mini-kv",
      sourceVersion: "mini-kv v144 live",
      transport: "tcp-command",
      endpoint: "127.0.0.1 mini-kv TCP",
      command: MINI_KV_LIVE_COMMAND,
      statusCode: null,
      latencyMs: response.latencyMs,
      evidence: recordOrNull(response.readiness),
      sourceEvidence,
    });
  } catch (error) {
    return failedObservation("mini-kv", "mini-kv v144 live", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_LIVE_COMMAND,
      error);
  }
}

function assessLiveRead(input: {
  project: MinimalShardReadinessLiveReadObservation["project"];
  sourceVersion: MinimalShardReadinessLiveReadObservation["sourceVersion"];
  transport: MinimalShardReadinessLiveReadObservation["transport"];
  endpoint: string;
  command: string | null;
  statusCode: number | null;
  latencyMs: number | null;
  evidence: Record<string, unknown> | null;
  sourceEvidence: ShardReadinessEvidenceAssessment;
}): MinimalShardReadinessLiveReadObservation {
  const missingRequiredFields = REQUIRED_SHARD_READINESS_FIELDS.filter((field) => !fieldPresent(input.evidence, field));
  const readOnlySafe = input.evidence?.readOnly === true;
  const executionBlocked = input.evidence?.executionAllowed === false;
  const shardCount = input.evidence?.shardCount;
  const slotCount = input.evidence?.slotCount;
  const routingMode = input.evidence?.routingMode;
  const status = input.evidence?.status;
  const shardCountValid = typeof shardCount === "number" && Number.isInteger(shardCount) && shardCount >= 0;
  const slotCountValid = typeof slotCount === "number" && Number.isInteger(slotCount) && slotCount >= 0;
  const routingModePresent = typeof routingMode === "string" && routingMode.length > 0;
  const statusAccepted = input.project === "advanced-order-platform"
    ? status === "passed"
    : status === "prototype-ready-read-only" || status === "passed";
  const compatibleWithV370Evidence = evidenceCompatibleWithSource(input.evidence, input.sourceEvidence);
  const boundarySafe = input.project === "mini-kv" ? miniKvBoundarySafe(input.evidence) : readOnlySafe && executionBlocked;
  const readyForGate =
    missingRequiredFields.length === 0
    && readOnlySafe
    && executionBlocked
    && shardCountValid
    && slotCountValid
    && routingModePresent
    && statusAccepted
    && compatibleWithV370Evidence
    && boundarySafe;

  return {
    project: input.project,
    sourceVersion: input.sourceVersion,
    attempted: true,
    status: readyForGate ? "passed-read" : "failed-read",
    transport: input.transport,
    endpoint: input.endpoint,
    command: input.command,
    statusCode: input.statusCode,
    latencyMs: input.latencyMs,
    errorCode: null,
    errorMessage: null,
    evidence: input.evidence,
    requiredFieldCount: REQUIRED_SHARD_READINESS_FIELDS.length,
    presentRequiredFieldCount: REQUIRED_SHARD_READINESS_FIELDS.length - missingRequiredFields.length,
    missingRequiredFields,
    readOnlySafe,
    executionBlocked,
    shardCountValid,
    slotCountValid,
    routingModePresent,
    statusAccepted,
    compatibleWithV370Evidence,
    boundarySafe,
    readyForGate,
  };
}

function skippedObservation(
  project: MinimalShardReadinessLiveReadObservation["project"],
  sourceVersion: MinimalShardReadinessLiveReadObservation["sourceVersion"],
  transport: MinimalShardReadinessLiveReadObservation["transport"],
  endpoint: string,
  command: string | null,
): MinimalShardReadinessLiveReadObservation {
  return {
    project,
    sourceVersion,
    attempted: false,
    status: "skipped-probes-disabled",
    transport,
    endpoint,
    command,
    statusCode: null,
    latencyMs: null,
    errorCode: "UPSTREAM_PROBES_DISABLED",
    errorMessage: "UPSTREAM_PROBES_ENABLED must be true for the v371 live-read gate.",
    evidence: null,
    requiredFieldCount: REQUIRED_SHARD_READINESS_FIELDS.length,
    presentRequiredFieldCount: 0,
    missingRequiredFields: [...REQUIRED_SHARD_READINESS_FIELDS],
    readOnlySafe: false,
    executionBlocked: false,
    shardCountValid: false,
    slotCountValid: false,
    routingModePresent: false,
    statusAccepted: false,
    compatibleWithV370Evidence: false,
    boundarySafe: false,
    readyForGate: false,
  };
}

function failedObservation(
  project: MinimalShardReadinessLiveReadObservation["project"],
  sourceVersion: MinimalShardReadinessLiveReadObservation["sourceVersion"],
  transport: MinimalShardReadinessLiveReadObservation["transport"],
  endpoint: string,
  command: string | null,
  error: unknown,
): MinimalShardReadinessLiveReadObservation {
  return {
    ...skippedObservation(project, sourceVersion, transport, endpoint, command),
    attempted: true,
    status: "failed-read",
    errorCode: isAppHttpError(error) ? error.code : "LIVE_READ_FAILED",
    errorMessage: error instanceof Error ? error.message : String(error),
  };
}

function createGate(
  source: SourceNodeV370ShardReadinessConsumerGateReference,
  javaRead: MinimalShardReadinessLiveReadObservation,
  miniKvRead: MinimalShardReadinessLiveReadObservation,
): MinimalShardReadinessLiveReadGate {
  const record = {
    gateMode: "minimal-shard-readiness-live-read" as const,
    sourceSpan: "Node v370 consumer gate plus Java and mini-kv live shard readiness reads" as const,
    sourceGateDigest: source.sourceGateDigest,
    javaStatus: javaRead.status,
    javaLatencyMs: javaRead.latencyMs,
    miniKvStatus: miniKvRead.status,
    miniKvLatencyMs: miniKvRead.latencyMs,
    focusedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts",
    groupedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGate.test.ts",
    buildCommand: "npm.cmd run build",
    smokeCommand: "Node HTTP smoke with UPSTREAM_PROBES_ENABLED=true for minimal shard readiness live-read gate route",
  };
  return {
    gateDigest: sha256StableJson(record),
    gateMode: record.gateMode,
    sourceSpan: record.sourceSpan,
    liveReadOnly: true,
    javaEndpoint: JAVA_LIVE_ENDPOINT,
    miniKvCommand: MINI_KV_LIVE_COMMAND,
    focusedCommand: record.focusedCommand,
    groupedCommand: record.groupedCommand,
    buildCommand: record.buildCommand,
    smokeCommand: record.smokeCommand,
    automaticUpstreamStart: false,
    automaticUpstreamStop: false,
    writeCommandsAllowed: false,
    nextNodeVersionSuggested: "Node v372",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV370ShardReadinessConsumerGateReference,
  javaRead: MinimalShardReadinessLiveReadObservation,
  miniKvRead: MinimalShardReadinessLiveReadObservation,
  gate: MinimalShardReadinessLiveReadGate,
): MinimalShardReadinessLiveReadGateChecks {
  return {
    sourceNodeV370Ready:
      source.gateState === "shard-readiness-contract-consumer-gate-ready"
      && source.gateDecision === "consume-java-and-mini-kv-shard-readiness-evidence"
      && source.readyForNodeV371MinimalShardReadinessLiveReadGate
      && source.productionBlockerCount === 0,
    sourceNodeV370EvidenceSourcesReady:
      source.evidenceSourceCount === 2
      && source.readyEvidenceSourceCount === 2,
    upstreamProbesEnabledForLiveRead: config.upstreamProbesEnabled,
    javaLiveReadAttempted: javaRead.attempted,
    javaLiveReadPassed: javaRead.status === "passed-read",
    javaRequiredFieldsComplete: javaRead.missingRequiredFields.length === 0,
    javaReadOnlySafe: javaRead.readOnlySafe,
    javaExecutionBlocked: javaRead.executionBlocked,
    javaCompatibleWithV370Evidence: javaRead.compatibleWithV370Evidence,
    miniKvLiveReadAttempted: miniKvRead.attempted,
    miniKvLiveReadPassed: miniKvRead.status === "passed-read",
    miniKvRequiredFieldsComplete: miniKvRead.missingRequiredFields.length === 0,
    miniKvReadOnlySafe: miniKvRead.readOnlySafe,
    miniKvExecutionBlocked: miniKvRead.executionBlocked,
    miniKvCompatibleWithV370Evidence: miniKvRead.compatibleWithV370Evidence,
    miniKvBoundarySafe: miniKvRead.boundarySafe,
    bothLiveReadsReady: javaRead.readyForGate && miniKvRead.readyForGate,
    digestStable: isDigest(gate.gateDigest) && isDigest(source.sourceGateDigest),
    nodeDoesNotStartUpstreams: !gate.automaticUpstreamStart,
    nodeDoesNotStopUpstreams: !gate.automaticUpstreamStop,
    nodeDoesNotMutateSiblingState: !gate.writeCommandsAllowed,
    noManagedAuditConnection: !config.upstreamActionsEnabled,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForMinimalShardReadinessLiveReadGate: false,
  };
}

function collectProductionBlockers(
  checks: MinimalShardReadinessLiveReadGateChecks,
): MinimalShardReadinessLiveReadGateMessage[] {
  const rules: Array<[boolean, string, MinimalShardReadinessLiveReadGateMessage["source"], string]> = [
    [checks.sourceNodeV370Ready, "SOURCE_NODE_V370_NOT_READY", "node-v370", "Node v370 consumer gate must be ready."],
    [checks.upstreamProbesEnabledForLiveRead, "UPSTREAM_PROBES_DISABLED", "runtime-boundary", "UPSTREAM_PROBES_ENABLED must be true for live-read gate."],
    [checks.javaLiveReadAttempted, "JAVA_LIVE_READ_NOT_ATTEMPTED", "java-live-read", "Java shard readiness live read must be attempted."],
    [checks.javaLiveReadPassed, "JAVA_LIVE_READ_FAILED", "java-live-read", "Java shard readiness live read must pass."],
    [checks.javaCompatibleWithV370Evidence, "JAVA_LIVE_READ_DRIFTED", "java-live-read", "Java live read must remain compatible with v370 evidence."],
    [checks.miniKvLiveReadAttempted, "MINI_KV_LIVE_READ_NOT_ATTEMPTED", "mini-kv-live-read", "mini-kv SHARDJSON live read must be attempted."],
    [checks.miniKvLiveReadPassed, "MINI_KV_LIVE_READ_FAILED", "mini-kv-live-read", "mini-kv SHARDJSON live read must pass."],
    [checks.miniKvCompatibleWithV370Evidence, "MINI_KV_LIVE_READ_DRIFTED", "mini-kv-live-read", "mini-kv live read must remain compatible with v370 evidence."],
    [checks.miniKvBoundarySafe, "MINI_KV_BOUNDARY_UNSAFE", "mini-kv-live-read", "mini-kv live read must keep write/admin/authority boundaries closed."],
    [checks.nodeDoesNotStartUpstreams, "NODE_STARTS_UPSTREAMS", "runtime-boundary", "Node must not start Java or mini-kv."],
    [checks.nodeDoesNotStopUpstreams, "NODE_STOPS_UPSTREAMS", "runtime-boundary", "Node must not stop Java or mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  javaRead: MinimalShardReadinessLiveReadObservation,
  miniKvRead: MinimalShardReadinessLiveReadObservation,
): MinimalShardReadinessLiveReadGateMessage[] {
  const warnings: MinimalShardReadinessLiveReadGateMessage[] = [];
  if (javaRead.evidence?.shardEnabled === false && miniKvRead.evidence?.shardEnabled === false) {
    warnings.push({
      code: "LIVE_READ_CONFIRMS_READINESS_NOT_ACTIVE_SHARDING",
      severity: "warning",
      source: "runtime-boundary",
      message: "Both live reads report shardEnabled=false; v371 proves read-only readiness, not active sharding.",
    });
  }
  return warnings;
}

function collectRecommendations(ready: boolean): MinimalShardReadinessLiveReadGateMessage[] {
  return [{
    code: ready ? "ARCHIVE_V371_AND_VERIFY_IN_V372" : "FIX_LIVE_READ_WINDOW",
    severity: "recommendation",
    source: "next-plan",
    message: ready
      ? "Proceed to Node v372 archive verification for this live-read gate."
      : "Fix the Java/mini-kv live-read window before archiving v371.",
  }];
}

function createSummary(
  reads: readonly MinimalShardReadinessLiveReadObservation[],
  checks: MinimalShardReadinessLiveReadGateChecks,
  productionBlockers: readonly MinimalShardReadinessLiveReadGateMessage[],
  warnings: readonly MinimalShardReadinessLiveReadGateMessage[],
  recommendations: readonly MinimalShardReadinessLiveReadGateMessage[],
): MinimalShardReadinessLiveReadGateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    attemptedReadCount: reads.filter((read) => read.attempted).length,
    passedReadCount: reads.filter((read) => read.status === "passed-read").length,
    failedReadCount: reads.filter((read) => read.status === "failed-read").length,
    skippedReadCount: reads.filter((read) => read.status === "skipped-probes-disabled").length,
    requiredFieldCount: reads.reduce((total, read) => total + read.requiredFieldCount, 0),
    presentRequiredFieldCount: reads.reduce((total, read) => total + read.presentRequiredFieldCount, 0),
    missingRequiredFieldCount: reads.reduce((total, read) => total + read.missingRequiredFields.length, 0),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function evidenceCompatibleWithSource(
  evidence: Record<string, unknown> | null,
  source: ShardReadinessEvidenceAssessment,
): boolean {
  return evidence?.project === source.evidence.project
    && evidence.version === source.evidence.version
    && evidence.readOnly === source.evidence.readOnly
    && evidence.executionAllowed === source.evidence.executionAllowed
    && evidence.shardEnabled === source.evidence.shardEnabled
    && evidence.shardCount === source.evidence.shardCount
    && evidence.slotCount === source.evidence.slotCount
    && evidence.routingMode === source.evidence.routingMode
    && evidence.status === source.evidence.status;
}

function miniKvBoundarySafe(evidence: Record<string, unknown> | null): boolean {
  const boundaries = recordOrNull(evidence?.boundaries);
  const diagnostics = recordOrNull(evidence?.diagnostics);
  return evidence?.readOnly === true
    && evidence.executionAllowed === false
    && boundaries?.orderAuthoritative === false
    && boundaries.auditAuthoritative === false
    && boundaries.writeCommandsAllowed === false
    && boundaries.adminCommandsAllowed === false
    && boundaries.loadRestoreCompactAllowed === false
    && boundaries.setnxexExecutionAllowed === false
    && boundaries.multiProcessStarted === false
    && boundaries.storageDirectoriesCreated === false
    && diagnostics?.writeCommandsExecuted === false
    && diagnostics.adminCommandsExecuted === false
    && diagnostics.loadRestoreCompactExecuted === false;
}

function fieldPresent(evidence: Record<string, unknown> | null, field: string): boolean {
  return evidence !== null && Object.prototype.hasOwnProperty.call(evidence, field);
}

function recordOrNull(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
