import type { MiniKvShardReadiness } from "../clients/miniKvClient.js";
import type { OrderPlatformShardReadiness } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import { isAppHttpError } from "../errors.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewChecks,
  ControlledReadOnlyShardPreviewMessage,
  ControlledReadOnlyShardPreviewObservation,
  ControlledReadOnlyShardPreviewSummary,
  PreviewMessageSource,
  PreviewProject,
  PreviewTransport,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1";
export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview";
export const JAVA_ENDPOINT = "GET /api/v1/ops/shard-readiness";
export const MINI_KV_COMMAND = "SHARDJSON";

const REQUIRED_FIELDS = Object.freeze([
  "project",
  "version",
  "readOnly",
  "executionAllowed",
  "shardEnabled",
  "shardCount",
  "slotCount",
  "routingMode",
  "status",
]);

export function assessObservation(
  project: PreviewProject,
  transport: PreviewTransport,
  endpoint: string,
  command: string | null,
  statusCode: number | null,
  latencyMs: number | null,
  evidenceValue: OrderPlatformShardReadiness | MiniKvShardReadiness,
): ControlledReadOnlyShardPreviewObservation {
  const evidence = recordOrNull(evidenceValue);
  const missingRequiredFields = REQUIRED_FIELDS.filter((field) => !fieldPresent(evidence, field));
  const preview = createObservationPreview(evidence);
  const readOnlySafe = evidence?.readOnly === true;
  const executionBlocked = evidence?.executionAllowed === false;
  const shardShapeValid =
    numberField(evidence, "shardCount") !== null
    && numberField(evidence, "slotCount") !== null
    && stringField(evidence, "routingMode") !== null;
  const statusAccepted = project === "advanced-order-platform"
    ? preview.status === "passed" || preview.status === "prototype-ready-read-only"
    : preview.status === "prototype-ready-read-only" || preview.status === "passed";
  const boundarySafe = project === "mini-kv" ? miniKvBoundarySafe(evidence) : readOnlySafe && executionBlocked;
  const readyForPreview =
    missingRequiredFields.length === 0
    && readOnlySafe
    && executionBlocked
    && shardShapeValid
    && statusAccepted
    && boundarySafe;

  return {
    project,
    attempted: true,
    status: readyForPreview ? "passed-read" : "failed-read",
    transport,
    endpoint,
    command,
    statusCode,
    latencyMs,
    errorCode: null,
    errorMessage: null,
    evidence,
    preview,
    requiredFieldCount: REQUIRED_FIELDS.length,
    presentRequiredFieldCount: REQUIRED_FIELDS.length - missingRequiredFields.length,
    missingRequiredFields,
    readOnlySafe,
    executionBlocked,
    shardShapeValid,
    statusAccepted,
    boundarySafe,
    readyForPreview,
  };
}

export function skippedObservation(
  project: PreviewProject,
  transport: PreviewTransport,
  endpoint: string,
  command: string | null,
): ControlledReadOnlyShardPreviewObservation {
  return {
    project,
    attempted: false,
    status: "skipped-probes-disabled",
    transport,
    endpoint,
    command,
    statusCode: null,
    latencyMs: null,
    errorCode: "UPSTREAM_PROBES_DISABLED",
    errorMessage: "UPSTREAM_PROBES_ENABLED must be true for controlled read-only shard preview.",
    evidence: null,
    preview: createObservationPreview(null),
    requiredFieldCount: REQUIRED_FIELDS.length,
    presentRequiredFieldCount: 0,
    missingRequiredFields: [...REQUIRED_FIELDS],
    readOnlySafe: false,
    executionBlocked: false,
    shardShapeValid: false,
    statusAccepted: false,
    boundarySafe: false,
    readyForPreview: false,
  };
}

export function failedObservation(
  project: PreviewProject,
  transport: PreviewTransport,
  endpoint: string,
  command: string | null,
  error: unknown,
): ControlledReadOnlyShardPreviewObservation {
  return {
    ...skippedObservation(project, transport, endpoint, command),
    attempted: true,
    status: "failed-read",
    errorCode: isAppHttpError(error) ? error.code : "SHARD_PREVIEW_READ_FAILED",
    errorMessage: error instanceof Error ? error.message : String(error),
  };
}

export function createChecks(
  config: AppConfig,
  java: ControlledReadOnlyShardPreviewObservation,
  miniKv: ControlledReadOnlyShardPreviewObservation,
  previewDigest: string,
): ControlledReadOnlyShardPreviewChecks {
  return {
    upstreamProbesEnabledForPreview: config.upstreamProbesEnabled,
    upstreamActionsDisabled: !config.upstreamActionsEnabled,
    javaPreviewAttempted: java.attempted,
    javaPreviewPassed: java.status === "passed-read",
    javaReadOnlySafe: java.readOnlySafe,
    javaExecutionBlocked: java.executionBlocked,
    miniKvPreviewAttempted: miniKv.attempted,
    miniKvPreviewPassed: miniKv.status === "passed-read",
    miniKvReadOnlySafe: miniKv.readOnlySafe,
    miniKvExecutionBlocked: miniKv.executionBlocked,
    miniKvBoundarySafe: miniKv.boundarySafe,
    bothPreviewsReady: java.readyForPreview && miniKv.readyForPreview,
    nodeDoesNotStartUpstreams: true,
    nodeDoesNotStopUpstreams: true,
    nodeDoesNotMutateSiblingState: true,
    noActiveShardRouter: true,
    noWriteRouting: true,
    noLoadRestoreCompact: true,
    noManagedAuditConnection: !config.upstreamActionsEnabled,
    noCredentialValueRead: true,
    previewDigestStable: /^[a-f0-9]{64}$/.test(previewDigest),
    productionWindowStillBlocked: true,
    readyForControlledReadOnlyShardPreview: false,
  };
}

export function collectProductionBlockers(
  checks: ControlledReadOnlyShardPreviewChecks,
): ControlledReadOnlyShardPreviewMessage[] {
  const rules: Array<[boolean, string, PreviewMessageSource, string]> = [
    [checks.upstreamProbesEnabledForPreview, "UPSTREAM_PROBES_DISABLED", "runtime-boundary", "Enable only the read-only probe flag for this preview window."],
    [checks.upstreamActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-boundary", "UPSTREAM_ACTIONS_ENABLED must stay false for shard preview."],
    [checks.javaPreviewAttempted, "JAVA_PREVIEW_NOT_ATTEMPTED", "java-shard-preview", "Java shard readiness must be read through GET only."],
    [checks.javaPreviewPassed, "JAVA_PREVIEW_FAILED", "java-shard-preview", "Java shard readiness preview must pass read-only checks."],
    [checks.miniKvPreviewAttempted, "MINI_KV_PREVIEW_NOT_ATTEMPTED", "mini-kv-shard-preview", "mini-kv SHARDJSON must be read exactly once."],
    [checks.miniKvPreviewPassed, "MINI_KV_PREVIEW_FAILED", "mini-kv-shard-preview", "mini-kv SHARDJSON preview must pass read-only checks."],
    [checks.miniKvBoundarySafe, "MINI_KV_BOUNDARY_UNSAFE", "mini-kv-shard-preview", "mini-kv must keep write/admin/load/restore/compact boundaries closed."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

export function collectWarnings(
  java: ControlledReadOnlyShardPreviewObservation,
  miniKv: ControlledReadOnlyShardPreviewObservation,
): ControlledReadOnlyShardPreviewMessage[] {
  if (java.preview.shardEnabled === false && miniKv.preview.shardEnabled === false) {
    return [{
      code: "PREVIEW_CONFIRMS_READINESS_NOT_ACTIVE_ROUTING",
      severity: "warning",
      source: "runtime-boundary",
      message: "Both sources are read-only readiness previews; this is still not active shard routing.",
    }];
  }
  return [];
}

export function collectRecommendations(ready: boolean): ControlledReadOnlyShardPreviewMessage[] {
  return [{
    code: ready ? "ARCHIVE_STABLE_PREVIEW_OUTPUT" : "OPEN_READ_ONLY_PREVIEW_WINDOW",
    severity: "recommendation",
    source: "next-plan",
    message: ready
      ? "Archive the preview output only after a stable local read-only window."
      : "Bring Java and mini-kv up independently, then rerun the preview with probes enabled and actions disabled.",
  }];
}

export function createSummary(
  reads: readonly ControlledReadOnlyShardPreviewObservation[],
  checks: ControlledReadOnlyShardPreviewChecks,
  productionBlockers: readonly ControlledReadOnlyShardPreviewMessage[],
  warnings: readonly ControlledReadOnlyShardPreviewMessage[],
  recommendations: readonly ControlledReadOnlyShardPreviewMessage[],
): ControlledReadOnlyShardPreviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    attemptedReadCount: reads.filter((read) => read.attempted).length,
    passedReadCount: reads.filter((read) => read.status === "passed-read").length,
    failedReadCount: reads.filter((read) => read.status === "failed-read").length,
    skippedReadCount: reads.filter((read) => read.status === "skipped-probes-disabled").length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

export function createPreviewDigest(
  java: ControlledReadOnlyShardPreviewObservation,
  miniKv: ControlledReadOnlyShardPreviewObservation,
): string {
  return sha256StableJson({
    profileVersion: PROFILE_VERSION,
    previewOnly: true,
    java: java.preview,
    miniKv: miniKv.preview,
    javaStatus: java.status,
    miniKvStatus: miniKv.status,
    executionAllowed: false,
  });
}

export function sumNullable(left: number | null, right: number | null): number | null {
  return left === null || right === null ? null : left + right;
}

function createObservationPreview(evidence: Record<string, unknown> | null) {
  return {
    version: stringField(evidence, "version"),
    releaseVersion: stringField(evidence, "releaseVersion"),
    shardEnabled: booleanField(evidence, "shardEnabled"),
    shardCount: numberField(evidence, "shardCount"),
    slotCount: numberField(evidence, "slotCount"),
    routingMode: stringField(evidence, "routingMode"),
    status: stringField(evidence, "status"),
    shardMapCount: arrayField(evidence, "shardMap")?.length ?? null,
    keyRoutingSampleCount: arrayField(evidence, "keyRoutingSamples")?.length ?? null,
  };
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
    && diagnostics?.writeCommandsExecuted === false
    && diagnostics.adminCommandsExecuted === false
    && diagnostics.loadRestoreCompactExecuted === false;
}

function fieldPresent(evidence: Record<string, unknown> | null, field: string): boolean {
  return evidence !== null && Object.prototype.hasOwnProperty.call(evidence, field);
}

function stringField(evidence: Record<string, unknown> | null, field: string): string | null {
  const value = evidence?.[field];
  return typeof value === "string" ? value : null;
}

function numberField(evidence: Record<string, unknown> | null, field: string): number | null {
  const value = evidence?.[field];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function booleanField(evidence: Record<string, unknown> | null, field: string): boolean | null {
  const value = evidence?.[field];
  return typeof value === "boolean" ? value : null;
}

function arrayField(evidence: Record<string, unknown> | null, field: string): unknown[] | null {
  const value = evidence?.[field];
  return Array.isArray(value) ? value : null;
}

function recordOrNull(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}
