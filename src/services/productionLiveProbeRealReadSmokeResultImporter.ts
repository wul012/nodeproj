import { createHash } from "node:crypto";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeRealReadSmokeArchiveAdapter,
} from "./productionLiveProbeRealReadSmokeArchiveAdapter.js";
import type {
  ProductionLiveProbeRealReadSmokeArchiveAdapterProfile,
  ProductionLiveProbeRealReadSmokeArchiveRecord,
} from "./productionLiveProbeRealReadSmokeArchiveAdapter.js";
import {
  loadProductionLiveProbeRealReadSmokeExecutionRequest,
} from "./productionLiveProbeRealReadSmokeExecutionRequest.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

type ImportedSourceStatus = "pass" | "skipped";

export interface ProductionLiveProbeRealReadSmokeResultImporterProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-result-importer.v1";
  readyForResultImport: boolean;
  readyForProductionPassEvidence: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  importEnvelope: {
    importDigest: string;
    resultSchemaVersion: "real-read-smoke-result-import.v1";
    sourceExecutionRequestDigest: string;
    sourceArchiveAdapterDigest: string;
    sourceAdapterMode: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["adapter"]["adapterMode"];
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    importedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    rejectedRecordCount: number;
    skippedEvidenceNotProductionPass: boolean;
  };
  importSchema: {
    schemaVersion: "real-read-smoke-result-import.v1";
    requiredFields: string[];
    acceptedSourceStatuses: ImportedSourceStatus[];
    rejectedSourceStatuses: ["blocked"];
    requiredReadOnly: true;
    requiredMutatesState: false;
    supportedProbeIds: string[];
  };
  importedRecords: ProductionLiveProbeImportedResultRecord[];
  checks: {
    executionRequestReviewReady: boolean;
    sourceArchiveAdapterReady: boolean;
    sourceArchiveAdapterDigestValid: boolean;
    sourceRecordsPresent: boolean;
    recordSetMatchesSchema: boolean;
    noBlockedRecordsImported: boolean;
    noWriteEvidenceImported: boolean;
    upstreamActionsStillDisabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
    readyForResultImport: boolean;
  };
  summary: {
    importedRecordCount: number;
    acceptedPassRecordCount: number;
    acceptedSkippedRecordCount: number;
    rejectedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeResultImporterMessage[];
  warnings: ProductionLiveProbeResultImporterMessage[];
  recommendations: ProductionLiveProbeResultImporterMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeResultImporterJson: string;
    productionLiveProbeRealReadSmokeResultImporterMarkdown: string;
    productionLiveProbeRealReadSmokeExecutionRequestJson: string;
    productionLiveProbeRealReadSmokeArchiveAdapterJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeImportedResultRecord {
  id: ProductionLiveProbeRealReadSmokeArchiveRecord["id"];
  importStatus: "accepted-pass" | "accepted-skipped" | "rejected-blocked";
  sourceStatus: ProductionLiveProbeRealReadSmokeArchiveRecord["sourceStatus"];
  archiveStatus: ProductionLiveProbeRealReadSmokeArchiveRecord["archiveStatus"];
  target: string;
  protocol: ProductionLiveProbeRealReadSmokeArchiveRecord["protocol"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  message: string;
  evidenceSummary?: unknown;
}

export interface ProductionLiveProbeResultImporterMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "result-importer" | "execution-request" | "archive-adapter" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeResultImporterJson: "/api/v1/production/live-probe-real-read-smoke-result-importer",
  productionLiveProbeRealReadSmokeResultImporterMarkdown: "/api/v1/production/live-probe-real-read-smoke-result-importer?format=markdown",
  productionLiveProbeRealReadSmokeExecutionRequestJson: "/api/v1/production/live-probe-real-read-smoke-execution-request",
  productionLiveProbeRealReadSmokeArchiveAdapterJson: "/api/v1/production/live-probe-real-read-smoke-archive-adapter",
});

const SUPPORTED_PROBE_IDS = Object.freeze([
  "java-actuator-health",
  "java-ops-overview",
  "mini-kv-health",
  "mini-kv-infojson",
  "mini-kv-statsjson",
]);

export async function loadProductionLiveProbeRealReadSmokeResultImporter(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeResultImporterProfile> {
  const executionRequest = await loadProductionLiveProbeRealReadSmokeExecutionRequest(input);
  const sourceAdapter = await loadProductionLiveProbeRealReadSmokeArchiveAdapter(input);
  const importSchema = createImportSchema();
  const importedRecords = sourceAdapter.records.map(createImportedRecord);
  const checks = {
    executionRequestReviewReady: executionRequest.readyForOperatorReview,
    sourceArchiveAdapterReady: sourceAdapter.readyForArchiveAdapter,
    sourceArchiveAdapterDigestValid: /^[a-f0-9]{64}$/.test(sourceAdapter.adapter.adapterDigest),
    sourceRecordsPresent: sourceAdapter.records.length > 0,
    recordSetMatchesSchema: sourceAdapter.records.length === importSchema.supportedProbeIds.length
      && importSchema.supportedProbeIds.every((id) => sourceAdapter.records.some((record) => record.id === id)),
    noBlockedRecordsImported: importedRecords.every((record) => record.importStatus !== "rejected-blocked"),
    noWriteEvidenceImported: importedRecords.every((record) => record.readOnly && !record.mutatesState),
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
      && sourceAdapter.checks.upstreamActionsStillDisabled,
    skippedEvidenceNotProductionPass: sourceAdapter.adapter.adapterMode === "pass"
      || importedRecords.some((record) => record.importStatus === "accepted-skipped"),
    readyForResultImport: false,
  };
  checks.readyForResultImport = checks.executionRequestReviewReady
    && checks.sourceArchiveAdapterReady
    && checks.sourceArchiveAdapterDigestValid
    && checks.sourceRecordsPresent
    && checks.recordSetMatchesSchema
    && checks.noBlockedRecordsImported
    && checks.noWriteEvidenceImported
    && checks.upstreamActionsStillDisabled
    && checks.skippedEvidenceNotProductionPass;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceAdapter, input.config.upstreamProbesEnabled);
  const recommendations = collectRecommendations();
  const importDigest = digestImport({
    profileVersion: "production-live-probe-real-read-smoke-result-importer.v1",
    resultSchemaVersion: importSchema.schemaVersion,
    sourceExecutionRequestDigest: executionRequest.request.requestDigest,
    sourceArchiveAdapterDigest: sourceAdapter.adapter.adapterDigest,
    sourceAdapterMode: sourceAdapter.adapter.adapterMode,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    importedRecords: importedRecords.map((record) => ({
      id: record.id,
      importStatus: record.importStatus,
      sourceStatus: record.sourceStatus,
      attempted: record.attempted,
    })),
    checks: {
      ...checks,
      readyForResultImport: checks.readyForResultImport,
    },
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke result importer",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-result-importer.v1",
    readyForResultImport: checks.readyForResultImport,
    readyForProductionPassEvidence: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    importEnvelope: {
      importDigest,
      resultSchemaVersion: importSchema.schemaVersion,
      sourceExecutionRequestDigest: executionRequest.request.requestDigest,
      sourceArchiveAdapterDigest: sourceAdapter.adapter.adapterDigest,
      sourceAdapterMode: sourceAdapter.adapter.adapterMode,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      importedRecordCount: importedRecords.length,
      passRecordCount: importedRecords.filter((record) => record.importStatus === "accepted-pass").length,
      skippedRecordCount: importedRecords.filter((record) => record.importStatus === "accepted-skipped").length,
      rejectedRecordCount: importedRecords.filter((record) => record.importStatus === "rejected-blocked").length,
      skippedEvidenceNotProductionPass: sourceAdapter.adapter.adapterMode !== "pass",
    },
    importSchema,
    importedRecords,
    checks,
    summary: {
      importedRecordCount: importedRecords.length,
      acceptedPassRecordCount: importedRecords.filter((record) => record.importStatus === "accepted-pass").length,
      acceptedSkippedRecordCount: importedRecords.filter((record) => record.importStatus === "accepted-skipped").length,
      rejectedRecordCount: importedRecords.filter((record) => record.importStatus === "rejected-blocked").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this importer output as the normalized input for the release evidence gate.",
      "Keep skipped imported records as local development evidence only, not production pass evidence.",
      "Only a later gate may promote all-pass imported records after the read-only probe window is proven open.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeResultImporterMarkdown(
  profile: ProductionLiveProbeRealReadSmokeResultImporterProfile,
): string {
  return [
    "# Production live probe real-read smoke result importer",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for result import: ${profile.readyForResultImport}`,
    `- Ready for production pass evidence: ${profile.readyForProductionPassEvidence}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Import Envelope",
    "",
    ...renderEntries(profile.importEnvelope),
    "",
    "## Import Schema",
    "",
    ...renderEntries(profile.importSchema),
    "",
    "## Imported Records",
    "",
    ...profile.importedRecords.flatMap(renderImportedRecord),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read smoke result importer blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read smoke result importer warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read smoke result importer recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createImportSchema(): ProductionLiveProbeRealReadSmokeResultImporterProfile["importSchema"] {
  return {
    schemaVersion: "real-read-smoke-result-import.v1",
    requiredFields: [
      "id",
      "sourceStatus",
      "archiveStatus",
      "target",
      "protocol",
      "readOnly",
      "mutatesState",
      "attempted",
      "message",
    ],
    acceptedSourceStatuses: ["pass", "skipped"],
    rejectedSourceStatuses: ["blocked"],
    requiredReadOnly: true,
    requiredMutatesState: false,
    supportedProbeIds: [...SUPPORTED_PROBE_IDS],
  };
}

function createImportedRecord(
  record: ProductionLiveProbeRealReadSmokeArchiveRecord,
): ProductionLiveProbeImportedResultRecord {
  return {
    id: record.id,
    importStatus: record.sourceStatus === "pass"
      ? "accepted-pass"
      : record.sourceStatus === "skipped"
        ? "accepted-skipped"
        : "rejected-blocked",
    sourceStatus: record.sourceStatus,
    archiveStatus: record.archiveStatus,
    target: record.target,
    protocol: record.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: record.attempted,
    message: record.message,
    evidenceSummary: record.evidenceSummary,
  };
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeResultImporterProfile["checks"],
): ProductionLiveProbeResultImporterMessage[] {
  const blockers: ProductionLiveProbeResultImporterMessage[] = [];
  addMessage(blockers, checks.executionRequestReviewReady, "EXECUTION_REQUEST_NOT_READY", "execution-request", "v144 execution request must be ready for operator review before importing results.");
  addMessage(blockers, checks.sourceArchiveAdapterReady, "SOURCE_ARCHIVE_ADAPTER_NOT_READY", "archive-adapter", "Source archive adapter must be ready before importing smoke results.");
  addMessage(blockers, checks.sourceArchiveAdapterDigestValid, "SOURCE_ARCHIVE_ADAPTER_DIGEST_INVALID", "archive-adapter", "Source adapter digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.sourceRecordsPresent, "SOURCE_RECORDS_MISSING", "archive-adapter", "Source adapter must contain smoke result records.");
  addMessage(blockers, checks.recordSetMatchesSchema, "SOURCE_RECORD_SET_MISMATCH", "result-importer", "Imported records must match the supported live probe schema.");
  addMessage(blockers, checks.noBlockedRecordsImported, "BLOCKED_RECORD_IMPORTED", "result-importer", "Blocked probe records are rejected and must not enter release evidence.");
  addMessage(blockers, checks.noWriteEvidenceImported, "WRITE_EVIDENCE_IMPORTED", "result-importer", "Imported smoke records must remain read-only.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "result-importer", "Skipped imported records must not be treated as production pass evidence.");
  return blockers;
}

function collectWarnings(
  sourceAdapter: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile,
  probesEnabled: boolean,
): ProductionLiveProbeResultImporterMessage[] {
  return [
    {
      code: sourceAdapter.adapter.adapterMode === "pass"
        ? "PASS_RESULTS_IMPORTED_STILL_GATED"
        : "SKIPPED_RESULTS_IMPORTED",
      severity: "warning",
      source: "result-importer",
      message: sourceAdapter.adapter.adapterMode === "pass"
        ? "Imported records contain pass results, but release promotion is left to the evidence gate."
        : "Imported records contain skipped or mixed results and are not production pass evidence.",
    },
    {
      code: probesEnabled ? "PROBE_WINDOW_WAS_OPEN" : "PROBE_WINDOW_REMAINED_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: probesEnabled
        ? "UPSTREAM_PROBES_ENABLED=true; verify imported pass records are still read-only."
        : "UPSTREAM_PROBES_ENABLED=false; imported records are skipped local evidence.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeResultImporterMessage[] {
  return [
    {
      code: "ADD_REAL_READ_SMOKE_RELEASE_EVIDENCE_GATE_NEXT",
      severity: "recommendation",
      source: "result-importer",
      message: "Add the release evidence gate next to decide whether imported records can become production pass evidence.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeResultImporterMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeResultImporterMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestImport(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderImportedRecord(record: ProductionLiveProbeImportedResultRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Import status: ${record.importStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Archive status: ${record.archiveStatus}`,
    `- Target: ${record.target}`,
    `- Protocol: ${record.protocol}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Message: ${record.message}`,
    `- Evidence summary: ${formatValue(record.evidenceSummary)}`,
    "",
  ];
}

function renderMessages(messages: ProductionLiveProbeResultImporterMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
