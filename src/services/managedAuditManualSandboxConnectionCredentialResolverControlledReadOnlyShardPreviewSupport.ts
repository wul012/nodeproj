import type { MiniKvShardReadiness } from "../clients/miniKvClient.js";
import type { OrderPlatformShardReadiness } from "../clients/orderPlatformClient.js";
import { isAppHttpError } from "../errors.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewChecks,
  ControlledReadOnlyShardPreviewMessage,
  ControlledReadOnlyShardPreviewObservation,
  ControlledReadOnlyShardPreviewSource,
  ControlledReadOnlyShardPreviewSourceMatrix,
  ControlledReadOnlyShardPreviewSourceMatrixEntry,
  ControlledReadOnlyShardPreviewSummary,
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

export function createSourceMatrix(
  java: ControlledReadOnlyShardPreviewObservation,
  miniKv: ControlledReadOnlyShardPreviewObservation,
): ControlledReadOnlyShardPreviewSourceMatrix {
  const sources = [
    createSourceMatrixEntry("java", java),
    createSourceMatrixEntry("miniKv", miniKv),
  ];
  const javaShardCount = java.preview.shardCount;
  const miniKvShardCount = miniKv.preview.shardCount;
  const javaSlotCount = java.preview.slotCount;
  const miniKvSlotCount = miniKv.preview.slotCount;

  return {
    sources,
    sourceCount: sources.length,
    readySourceCount: sources.filter((source) => source.readyForPreview).length,
    failedSourceCount: sources.filter((source) => source.status === "failed-read").length,
    skippedSourceCount: sources.filter((source) => source.status === "skipped-probes-disabled").length,
    routingModes: Array.from(
      new Set(sources.map((source) => source.routingMode).filter((mode): mode is string => mode !== null)),
    ),
    shardCountDelta: javaShardCount === null || miniKvShardCount === null ? null : miniKvShardCount - javaShardCount,
    slotCountDelta: javaSlotCount === null || miniKvSlotCount === null ? null : miniKvSlotCount - javaSlotCount,
    shardCountsComparable: javaShardCount !== null && miniKvShardCount !== null,
    slotCountsComparable: javaSlotCount !== null && miniKvSlotCount !== null,
    allSourcesReady: sources.every((source) => source.readyForPreview),
  };
}

export function sumNullable(left: number | null, right: number | null): number | null {
  return left === null || right === null ? null : left + right;
}

function createSourceMatrixEntry(
  source: ControlledReadOnlyShardPreviewSource,
  observation: ControlledReadOnlyShardPreviewObservation,
): ControlledReadOnlyShardPreviewSourceMatrixEntry {
  return {
    source,
    project: observation.project,
    version: observation.preview.version,
    releaseVersion: observation.preview.releaseVersion,
    status: observation.status,
    readyForPreview: observation.readyForPreview,
    readOnlySafe: observation.readOnlySafe,
    executionBlocked: observation.executionBlocked,
    shardEnabled: observation.preview.shardEnabled,
    shardCount: observation.preview.shardCount,
    slotCount: observation.preview.slotCount,
    routingMode: observation.preview.routingMode,
    endpoint: observation.endpoint,
    command: observation.command,
    latencyMs: observation.latencyMs,
  };
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
