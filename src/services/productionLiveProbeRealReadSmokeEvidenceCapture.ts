import {
  countPassedReportChecks,
  countReportChecks,
  formatValue,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeRealReadSmokeDryRunCommandPackage,
} from "./productionLiveProbeRealReadSmokeDryRunCommandPackage.js";
import {
  loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate,
} from "./productionLiveProbeRealReadSmokeReleaseEvidenceGate.js";
import {
  loadProductionLiveProbeRealReadSmokeResultImporter,
} from "./productionLiveProbeRealReadSmokeResultImporter.js";
import type { ProductionLiveProbeImportedResultRecord } from "./productionLiveProbeRealReadSmokeResultImporter.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1";
  captureState: "captured-pass" | "captured-mixed" | "captured-skipped" | "blocked";
  readyForEvidenceCapture: boolean;
  readyForProductionPassEvidenceCandidate: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  capture: {
    captureDigest: string;
    dryRunPackageDigest: string;
    archiveAdapterDigest: string;
    resultImportDigest: string;
    releaseEvidenceGateDigest: string;
    releaseGateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
    captureMode: "pass" | "mixed" | "skipped" | "blocked";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    readOnlyWindowOpen: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    importedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    rejectedRecordCount: number;
  };
  checks: {
    dryRunPackageDigestValid: boolean;
    archiveAdapterReady: boolean;
    resultImporterReady: boolean;
    releaseEvidenceGateReady: boolean;
    allExpectedRecordsCaptured: boolean;
    allCapturedRecordsAccepted: boolean;
    noWriteEvidenceCaptured: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    passRequiresProbeWindowOpen: boolean;
    skippedOrMixedNotProductionPass: boolean;
    readyForEvidenceCapture: boolean;
    readyForProductionPassEvidenceCandidate: boolean;
  };
  capturedRecords: ProductionLiveProbeCapturedRecord[];
  summary: {
    capturedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    rejectedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeEvidenceCaptureMessage[];
  warnings: ProductionLiveProbeEvidenceCaptureMessage[];
  recommendations: ProductionLiveProbeEvidenceCaptureMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeEvidenceCaptureJson: string;
    productionLiveProbeRealReadSmokeEvidenceCaptureMarkdown: string;
    productionLiveProbeRealReadSmokeDryRunCommandPackageJson: string;
    productionLiveProbeRealReadSmokeArchiveAdapterJson: string;
    productionLiveProbeRealReadSmokeResultImporterJson: string;
    productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeCapturedRecord {
  id: ProductionLiveProbeImportedResultRecord["id"];
  captureStatus: "captured-pass" | "captured-skipped" | "captured-rejected";
  sourceStatus: ProductionLiveProbeImportedResultRecord["sourceStatus"];
  importStatus: ProductionLiveProbeImportedResultRecord["importStatus"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  message: string;
  evidenceSummary?: unknown;
}

export interface ProductionLiveProbeEvidenceCaptureMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "evidence-capture"
    | "dry-run-command-package"
    | "archive-adapter"
    | "result-importer"
    | "release-evidence-gate"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeEvidenceCaptureJson: "/api/v1/production/live-probe-real-read-smoke-evidence-capture",
  productionLiveProbeRealReadSmokeEvidenceCaptureMarkdown: "/api/v1/production/live-probe-real-read-smoke-evidence-capture?format=markdown",
  productionLiveProbeRealReadSmokeDryRunCommandPackageJson: "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package",
  productionLiveProbeRealReadSmokeArchiveAdapterJson: "/api/v1/production/live-probe-real-read-smoke-archive-adapter",
  productionLiveProbeRealReadSmokeResultImporterJson: "/api/v1/production/live-probe-real-read-smoke-result-importer",
  productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
});

export async function loadProductionLiveProbeRealReadSmokeEvidenceCapture(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile> {
  const dryRunPackage = await loadProductionLiveProbeRealReadSmokeDryRunCommandPackage(input);
  const resultImporter = await loadProductionLiveProbeRealReadSmokeResultImporter(input);
  const releaseGate = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input);
  const capturedRecords = resultImporter.importedRecords.map(createCapturedRecord);
  const checks = {
    dryRunPackageDigestValid: /^[a-f0-9]{64}$/.test(dryRunPackage.package.packageDigest),
    archiveAdapterReady: resultImporter.checks.sourceArchiveAdapterReady,
    resultImporterReady: resultImporter.readyForResultImport,
    releaseEvidenceGateReady: releaseGate.readyForReleaseEvidenceGate,
    allExpectedRecordsCaptured: capturedRecords.length === 5,
    allCapturedRecordsAccepted: capturedRecords.every((record) => record.captureStatus !== "captured-rejected"),
    noWriteEvidenceCaptured: capturedRecords.every((record) => record.readOnly && !record.mutatesState),
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
      && resultImporter.checks.upstreamActionsStillDisabled
      && releaseGate.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: true,
    passRequiresProbeWindowOpen: resultImporter.summary.acceptedPassRecordCount !== resultImporter.summary.importedRecordCount
      || input.config.upstreamProbesEnabled === true,
    skippedOrMixedNotProductionPass: releaseGate.readyForProductionPassEvidence
      || resultImporter.summary.acceptedSkippedRecordCount > 0
      || resultImporter.summary.rejectedRecordCount > 0,
    readyForEvidenceCapture: false,
    readyForProductionPassEvidenceCandidate: false,
  };
  checks.readyForEvidenceCapture = checks.dryRunPackageDigestValid
    && checks.archiveAdapterReady
    && checks.resultImporterReady
    && checks.releaseEvidenceGateReady
    && checks.allExpectedRecordsCaptured
    && checks.allCapturedRecordsAccepted
    && checks.noWriteEvidenceCaptured
    && checks.upstreamActionsStillDisabled
    && checks.noAutomaticUpstreamStart
    && checks.passRequiresProbeWindowOpen
    && checks.skippedOrMixedNotProductionPass;
  checks.readyForProductionPassEvidenceCandidate = checks.readyForEvidenceCapture
    && releaseGate.readyForProductionPassEvidence
    && releaseGate.gateDecision === "production-pass-evidence-ready";
  const captureMode = determineCaptureMode(resultImporter);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(captureMode, input.config.upstreamProbesEnabled, releaseGate.gateDecision);
  const recommendations = collectRecommendations(captureMode);
  const captureDigest = digestCapture({
    profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1",
    dryRunPackageDigest: dryRunPackage.package.packageDigest,
    archiveAdapterDigest: resultImporter.importEnvelope.sourceArchiveAdapterDigest,
    resultImportDigest: resultImporter.importEnvelope.importDigest,
    releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
    releaseGateDecision: releaseGate.gateDecision,
    captureMode,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    capturedRecords: capturedRecords.map((record) => ({
      id: record.id,
      captureStatus: record.captureStatus,
      attempted: record.attempted,
    })),
    checks: {
      ...checks,
      readyForEvidenceCapture: checks.readyForEvidenceCapture,
      readyForProductionPassEvidenceCandidate: checks.readyForProductionPassEvidenceCandidate,
    },
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke evidence capture",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1",
    captureState: productionBlockers.length > 0
      ? "blocked"
      : captureMode === "pass"
        ? "captured-pass"
        : captureMode === "mixed"
          ? "captured-mixed"
          : "captured-skipped",
    readyForEvidenceCapture: checks.readyForEvidenceCapture,
    readyForProductionPassEvidenceCandidate: checks.readyForProductionPassEvidenceCandidate,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    capture: {
      captureDigest,
      dryRunPackageDigest: dryRunPackage.package.packageDigest,
      archiveAdapterDigest: resultImporter.importEnvelope.sourceArchiveAdapterDigest,
      resultImportDigest: resultImporter.importEnvelope.importDigest,
      releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
      releaseGateDecision: releaseGate.gateDecision,
      captureMode,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      readOnlyWindowOpen: input.config.upstreamProbesEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      importedRecordCount: resultImporter.summary.importedRecordCount,
      passRecordCount: resultImporter.summary.acceptedPassRecordCount,
      skippedRecordCount: resultImporter.summary.acceptedSkippedRecordCount,
      rejectedRecordCount: resultImporter.summary.rejectedRecordCount,
    },
    checks,
    capturedRecords,
    summary: {
      capturedRecordCount: capturedRecords.length,
      passRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-pass").length,
      skippedRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-skipped").length,
      rejectedRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-rejected").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this capture profile as the v148 evidence boundary before release verification.",
      "Keep skipped or mixed capture out of production pass evidence.",
      "If capture is all-pass, feed it to the v149 production pass evidence verification while production operations remain gated.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeEvidenceCaptureMarkdown(
  profile: ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile,
): string {
  return [
    "# Production live probe real-read smoke evidence capture",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Capture state: ${profile.captureState}`,
    `- Ready for evidence capture: ${profile.readyForEvidenceCapture}`,
    `- Ready for production pass evidence candidate: ${profile.readyForProductionPassEvidenceCandidate}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Capture",
    "",
    ...renderEntries(profile.capture),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Captured Records",
    "",
    ...profile.capturedRecords.flatMap(renderCapturedRecord),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read smoke evidence capture blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read smoke evidence capture warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read smoke evidence capture recommendations."),
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

function createCapturedRecord(record: ProductionLiveProbeImportedResultRecord): ProductionLiveProbeCapturedRecord {
  return {
    id: record.id,
    captureStatus: record.importStatus === "accepted-pass"
      ? "captured-pass"
      : record.importStatus === "accepted-skipped"
        ? "captured-skipped"
        : "captured-rejected",
    sourceStatus: record.sourceStatus,
    importStatus: record.importStatus,
    readOnly: true,
    mutatesState: false,
    attempted: record.attempted,
    message: record.message,
    evidenceSummary: record.evidenceSummary,
  };
}

function determineCaptureMode(
  resultImporter: Awaited<ReturnType<typeof loadProductionLiveProbeRealReadSmokeResultImporter>>,
): ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile["capture"]["captureMode"] {
  if (resultImporter.summary.rejectedRecordCount > 0) {
    return "blocked";
  }
  if (resultImporter.summary.importedRecordCount > 0
    && resultImporter.summary.acceptedPassRecordCount === resultImporter.summary.importedRecordCount) {
    return "pass";
  }
  if (resultImporter.summary.acceptedSkippedRecordCount === resultImporter.summary.importedRecordCount) {
    return "skipped";
  }
  return "mixed";
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile["checks"],
): ProductionLiveProbeEvidenceCaptureMessage[] {
  const blockers: ProductionLiveProbeEvidenceCaptureMessage[] = [];
  addMessage(blockers, checks.dryRunPackageDigestValid, "DRY_RUN_PACKAGE_DIGEST_INVALID", "dry-run-command-package", "Dry-run command package digest must be valid before capture.");
  addMessage(blockers, checks.archiveAdapterReady, "ARCHIVE_ADAPTER_NOT_READY", "archive-adapter", "Archive adapter must be ready before evidence capture.");
  addMessage(blockers, checks.resultImporterReady, "RESULT_IMPORTER_NOT_READY", "result-importer", "Result importer must be ready before evidence capture.");
  addMessage(blockers, checks.releaseEvidenceGateReady, "RELEASE_EVIDENCE_GATE_NOT_READY", "release-evidence-gate", "Release evidence gate must be ready before capture.");
  addMessage(blockers, checks.allExpectedRecordsCaptured, "CAPTURE_RECORD_COUNT_MISMATCH", "evidence-capture", "Capture must include all five read-only smoke records.");
  addMessage(blockers, checks.allCapturedRecordsAccepted, "CAPTURED_RECORD_REJECTED", "evidence-capture", "Rejected capture records cannot enter release evidence.");
  addMessage(blockers, checks.noWriteEvidenceCaptured, "WRITE_EVIDENCE_CAPTURED", "evidence-capture", "Capture must contain read-only evidence only.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "evidence-capture", "Node evidence capture must not start Java or mini-kv automatically.");
  addMessage(blockers, checks.passRequiresProbeWindowOpen, "PASS_CAPTURE_WITH_PROBE_WINDOW_CLOSED", "evidence-capture", "Pass capture requires UPSTREAM_PROBES_ENABLED=true.");
  addMessage(blockers, checks.skippedOrMixedNotProductionPass, "SKIPPED_OR_MIXED_MARKED_PRODUCTION_PASS", "release-evidence-gate", "Skipped or mixed capture must not become production pass evidence.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile["capture"]["captureMode"],
  probesEnabled: boolean,
  gateDecision: ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile["capture"]["releaseGateDecision"],
): ProductionLiveProbeEvidenceCaptureMessage[] {
  return [
    {
      code: mode === "pass"
        ? "REAL_READ_SMOKE_PASS_CAPTURED"
        : mode === "mixed"
          ? "REAL_READ_SMOKE_MIXED_CAPTURED"
          : "REAL_READ_SMOKE_SKIPPED_CAPTURED",
      severity: "warning",
      source: "evidence-capture",
      message: mode === "pass"
        ? "All read-only smoke records were captured as pass evidence; production operations remain gated."
        : mode === "mixed"
          ? "Capture contains both pass and skipped records and is not production pass evidence."
          : "Capture contains skipped records and is not production pass evidence.",
    },
    {
      code: probesEnabled ? "READ_ONLY_PROBE_WINDOW_OPEN" : "READ_ONLY_PROBE_WINDOW_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: probesEnabled
        ? "UPSTREAM_PROBES_ENABLED=true; capture may include attempted read-only upstream probes."
        : "UPSTREAM_PROBES_ENABLED=false; capture records skipped evidence without touching upstreams.",
    },
    {
      code: gateDecision === "production-pass-evidence-ready"
        ? "RELEASE_GATE_ACCEPTS_CAPTURE_AS_PASS_CANDIDATE"
        : "RELEASE_GATE_REJECTS_CAPTURE_AS_PASS",
      severity: "warning",
      source: "release-evidence-gate",
      message: gateDecision === "production-pass-evidence-ready"
        ? "Release gate accepts this capture as a pass candidate, but production operations are still disabled."
        : "Release gate keeps this capture out of production pass evidence.",
    },
  ];
}

function collectRecommendations(
  mode: ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile["capture"]["captureMode"],
): ProductionLiveProbeEvidenceCaptureMessage[] {
  return [
    {
      code: mode === "pass"
        ? "VERIFY_PASS_CAPTURE_WITH_V149"
        : "KEEP_SKIPPED_OR_MIXED_CAPTURE_AS_LOCAL_EVIDENCE",
      severity: "recommendation",
      source: "evidence-capture",
      message: mode === "pass"
        ? "Run v149 verification before treating this as production pass evidence."
        : "Keep this capture as local evidence and run real read-only smoke when upstreams are intentionally available.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeEvidenceCaptureMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeEvidenceCaptureMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestCapture(value: unknown): string {
  return sha256StableJson(value);
}

function renderCapturedRecord(record: ProductionLiveProbeCapturedRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Capture status: ${record.captureStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Import status: ${record.importStatus}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Message: ${record.message}`,
    `- Evidence summary: ${formatValue(record.evidenceSummary)}`,
    "",
  ];
}


