import { createHash } from "node:crypto";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeRealReadSmokeResultImporter,
} from "./productionLiveProbeRealReadSmokeResultImporter.js";
import type {
  ProductionLiveProbeImportedResultRecord,
  ProductionLiveProbeRealReadSmokeResultImporterProfile,
} from "./productionLiveProbeRealReadSmokeResultImporter.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1";
  gateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
  readyForReleaseEvidenceGate: boolean;
  readyForProductionPassEvidence: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  gate: {
    gateDigest: string;
    sourceImportDigest: string;
    sourceImportSchemaVersion: "real-read-smoke-result-import.v1";
    sourceAdapterMode: ProductionLiveProbeRealReadSmokeResultImporterProfile["importEnvelope"]["sourceAdapterMode"];
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    importedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    rejectedRecordCount: number;
    productionPassRequiresAllPass: true;
    productionPassRequiresProbeWindowOpen: true;
    productionPassRequiresActionsDisabled: true;
  };
  checks: {
    resultImporterReady: boolean;
    importDigestValid: boolean;
    allExpectedRecordsImported: boolean;
    allImportedRecordsAccepted: boolean;
    allImportedRecordsPass: boolean;
    noSkippedRecords: boolean;
    noRejectedRecords: boolean;
    noWriteEvidenceImported: boolean;
    probeWindowWasOpen: boolean;
    upstreamActionsStillDisabled: boolean;
    readyForReleaseEvidenceGate: boolean;
    readyForProductionPassEvidence: boolean;
  };
  evaluatedRecords: ProductionLiveProbeReleaseEvidenceRecord[];
  summary: {
    evaluatedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    rejectedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeReleaseEvidenceGateMessage[];
  warnings: ProductionLiveProbeReleaseEvidenceGateMessage[];
  recommendations: ProductionLiveProbeReleaseEvidenceGateMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: string;
    productionLiveProbeRealReadSmokeReleaseEvidenceGateMarkdown: string;
    productionLiveProbeRealReadSmokeResultImporterJson: string;
    productionLiveProbeRealReadSmokeExecutionRequestJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeReleaseEvidenceRecord {
  id: ProductionLiveProbeImportedResultRecord["id"];
  gateStatus: "pass-ready" | "not-pass-skipped" | "not-pass-rejected";
  importStatus: ProductionLiveProbeImportedResultRecord["importStatus"];
  sourceStatus: ProductionLiveProbeImportedResultRecord["sourceStatus"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  reason: string;
}

export interface ProductionLiveProbeReleaseEvidenceGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "release-evidence-gate" | "result-importer" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
  productionLiveProbeRealReadSmokeReleaseEvidenceGateMarkdown: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate?format=markdown",
  productionLiveProbeRealReadSmokeResultImporterJson: "/api/v1/production/live-probe-real-read-smoke-result-importer",
  productionLiveProbeRealReadSmokeExecutionRequestJson: "/api/v1/production/live-probe-real-read-smoke-execution-request",
});

export async function loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile> {
  const importer = await loadProductionLiveProbeRealReadSmokeResultImporter(input);
  const evaluatedRecords = importer.importedRecords.map(createEvaluatedRecord);
  const checks = {
    resultImporterReady: importer.readyForResultImport,
    importDigestValid: /^[a-f0-9]{64}$/.test(importer.importEnvelope.importDigest),
    allExpectedRecordsImported: importer.summary.importedRecordCount === 5,
    allImportedRecordsAccepted: importer.summary.rejectedRecordCount === 0,
    allImportedRecordsPass: importer.summary.acceptedPassRecordCount === importer.summary.importedRecordCount
      && importer.summary.importedRecordCount > 0,
    noSkippedRecords: importer.summary.acceptedSkippedRecordCount === 0,
    noRejectedRecords: importer.summary.rejectedRecordCount === 0,
    noWriteEvidenceImported: importer.checks.noWriteEvidenceImported,
    probeWindowWasOpen: input.config.upstreamProbesEnabled === true
      && importer.importEnvelope.upstreamProbesEnabled === true,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
      && importer.checks.upstreamActionsStillDisabled,
    readyForReleaseEvidenceGate: false,
    readyForProductionPassEvidence: false,
  };
  checks.readyForReleaseEvidenceGate = checks.resultImporterReady
    && checks.importDigestValid
    && checks.allExpectedRecordsImported
    && checks.allImportedRecordsAccepted
    && checks.noRejectedRecords
    && checks.noWriteEvidenceImported
    && checks.upstreamActionsStillDisabled;
  checks.readyForProductionPassEvidence = checks.readyForReleaseEvidenceGate
    && checks.allImportedRecordsPass
    && checks.noSkippedRecords
    && checks.probeWindowWasOpen;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checks, importer);
  const recommendations = collectRecommendations(checks);
  const gateDecision = productionBlockers.length > 0
    ? "blocked"
    : checks.readyForProductionPassEvidence
      ? "production-pass-evidence-ready"
      : "not-production-pass-evidence";
  const gateDigest = digestGate({
    profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1",
    gateDecision,
    sourceImportDigest: importer.importEnvelope.importDigest,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    evaluatedRecords: evaluatedRecords.map((record) => ({
      id: record.id,
      gateStatus: record.gateStatus,
      importStatus: record.importStatus,
      attempted: record.attempted,
    })),
    checks: {
      ...checks,
      readyForReleaseEvidenceGate: checks.readyForReleaseEvidenceGate,
      readyForProductionPassEvidence: checks.readyForProductionPassEvidence,
    },
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke release evidence gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1",
    gateDecision,
    readyForReleaseEvidenceGate: checks.readyForReleaseEvidenceGate,
    readyForProductionPassEvidence: checks.readyForProductionPassEvidence,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    gate: {
      gateDigest,
      sourceImportDigest: importer.importEnvelope.importDigest,
      sourceImportSchemaVersion: importer.importEnvelope.resultSchemaVersion,
      sourceAdapterMode: importer.importEnvelope.sourceAdapterMode,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      importedRecordCount: importer.summary.importedRecordCount,
      passRecordCount: importer.summary.acceptedPassRecordCount,
      skippedRecordCount: importer.summary.acceptedSkippedRecordCount,
      rejectedRecordCount: importer.summary.rejectedRecordCount,
      productionPassRequiresAllPass: true,
      productionPassRequiresProbeWindowOpen: true,
      productionPassRequiresActionsDisabled: true,
    },
    checks,
    evaluatedRecords,
    summary: {
      evaluatedRecordCount: evaluatedRecords.length,
      passRecordCount: evaluatedRecords.filter((record) => record.gateStatus === "pass-ready").length,
      skippedRecordCount: evaluatedRecords.filter((record) => record.gateStatus === "not-pass-skipped").length,
      rejectedRecordCount: evaluatedRecords.filter((record) => record.gateStatus === "not-pass-rejected").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this gate as the only promotion path from imported smoke records to production pass evidence.",
      "Skipped or mixed imported evidence must remain non-production-pass evidence.",
      "If all records pass in a real read-only window, keep production operations gated until separate deployment and approval gates also pass.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeReleaseEvidenceGateMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile,
): string {
  return [
    "# Production live probe real-read smoke release evidence gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate decision: ${profile.gateDecision}`,
    `- Ready for release evidence gate: ${profile.readyForReleaseEvidenceGate}`,
    `- Ready for production pass evidence: ${profile.readyForProductionPassEvidence}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Gate",
    "",
    ...renderEntries(profile.gate),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Evaluated Records",
    "",
    ...profile.evaluatedRecords.flatMap(renderEvaluatedRecord),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read smoke release evidence gate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read smoke release evidence gate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read smoke release evidence gate recommendations."),
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

function createEvaluatedRecord(record: ProductionLiveProbeImportedResultRecord): ProductionLiveProbeReleaseEvidenceRecord {
  return {
    id: record.id,
    gateStatus: record.importStatus === "accepted-pass"
      ? "pass-ready"
      : record.importStatus === "accepted-skipped"
        ? "not-pass-skipped"
        : "not-pass-rejected",
    importStatus: record.importStatus,
    sourceStatus: record.sourceStatus,
    readOnly: true,
    mutatesState: false,
    attempted: record.attempted,
    reason: record.importStatus === "accepted-pass"
      ? "Imported record is pass evidence; final promotion still requires all records pass and probe window open."
      : record.importStatus === "accepted-skipped"
        ? "Skipped imported record prevents production pass evidence."
        : "Rejected imported record blocks release evidence promotion.",
  };
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile["checks"],
): ProductionLiveProbeReleaseEvidenceGateMessage[] {
  const blockers: ProductionLiveProbeReleaseEvidenceGateMessage[] = [];
  addMessage(blockers, checks.resultImporterReady, "RESULT_IMPORTER_NOT_READY", "result-importer", "v145 result importer must be ready before release evidence gate evaluation.");
  addMessage(blockers, checks.importDigestValid, "IMPORT_DIGEST_INVALID", "result-importer", "Import digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.allExpectedRecordsImported, "IMPORTED_RECORD_COUNT_MISMATCH", "release-evidence-gate", "Release gate requires all five read-only smoke records.");
  addMessage(blockers, checks.allImportedRecordsAccepted, "IMPORTED_RECORD_REJECTED", "result-importer", "Rejected imported records cannot be promoted.");
  addMessage(blockers, checks.noRejectedRecords, "REJECTED_RECORD_PRESENT", "release-evidence-gate", "Rejected records block release evidence promotion.");
  addMessage(blockers, checks.noWriteEvidenceImported, "WRITE_EVIDENCE_IMPORTED", "release-evidence-gate", "Release gate only accepts read-only imported records.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

function collectWarnings(
  checks: ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile["checks"],
  importer: ProductionLiveProbeRealReadSmokeResultImporterProfile,
): ProductionLiveProbeReleaseEvidenceGateMessage[] {
  return [
    {
      code: checks.readyForProductionPassEvidence
        ? "REAL_READ_SMOKE_PRODUCTION_PASS_EVIDENCE_READY"
        : "REAL_READ_SMOKE_NOT_PRODUCTION_PASS_EVIDENCE",
      severity: "warning",
      source: "release-evidence-gate",
      message: checks.readyForProductionPassEvidence
        ? "All imported records passed in an explicit read-only probe window, but production operations remain gated."
        : "Imported records are skipped, mixed, rejected, or from a closed probe window; they are not production pass evidence.",
    },
    {
      code: importer.importEnvelope.upstreamProbesEnabled ? "PROBE_WINDOW_IMPORTED_OPEN" : "PROBE_WINDOW_IMPORTED_CLOSED",
      severity: "warning",
      source: "result-importer",
      message: importer.importEnvelope.upstreamProbesEnabled
        ? "Importer evidence claims the probe window was open."
        : "Importer evidence was produced with UPSTREAM_PROBES_ENABLED=false.",
    },
  ];
}

function collectRecommendations(
  checks: ProductionLiveProbeRealReadSmokeReleaseEvidenceGateProfile["checks"],
): ProductionLiveProbeReleaseEvidenceGateMessage[] {
  return [
    {
      code: checks.readyForProductionPassEvidence
        ? "KEEP_RELEASE_GATE_WITH_DEPLOYMENT_APPROVALS"
        : "RUN_REAL_READ_SMOKE_WITH_UPSTREAMS_STARTED",
      severity: "recommendation",
      source: "release-evidence-gate",
      message: checks.readyForProductionPassEvidence
        ? "Keep this gate output with deployment approvals and production readiness evidence."
        : "To produce production pass evidence, start Java and mini-kv intentionally, open the read-only probe window, and import all-pass records.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeReleaseEvidenceGateMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeReleaseEvidenceGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestGate(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderEvaluatedRecord(record: ProductionLiveProbeReleaseEvidenceRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Gate status: ${record.gateStatus}`,
    `- Import status: ${record.importStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Reason: ${record.reason}`,
    "",
  ];
}

function renderMessages(messages: ProductionLiveProbeReleaseEvidenceGateMessage[], emptyText: string): string[] {
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
