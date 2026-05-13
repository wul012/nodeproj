import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import {
  loadProductionLiveProbeSmokeHarness,
} from "./productionLiveProbeSmokeHarness.js";
import type {
  ProductionLiveProbeResult,
  ProductionLiveProbeSmokeHarnessProfile,
} from "./productionLiveProbeSmokeHarness.js";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1";
  captureState: "captured-pass" | "captured-skipped" | "captured-mixed" | "blocked";
  readyForReadOnlyLiveCapture: boolean;
  readyForProductionPassEvidenceCandidate: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  capture: {
    liveCaptureDigest: string;
    readinessPacketDigest: string;
    smokeHarnessProfileVersion: ProductionLiveProbeSmokeHarnessProfile["profileVersion"];
    probeWindowOpen: boolean;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    manualJavaStartRequired: true;
    manualMiniKvStartRequired: true;
    skippedWithoutUpstreamsOnly: true;
    skippedOrMixedEvidenceCannotPass: true;
    passRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
  };
  checks: {
    readinessPacketReady: boolean;
    readinessPacketDigestValid: boolean;
    smokeHarnessReady: boolean;
    smokeProbeSetComplete: boolean;
    allProbeResultsReadOnly: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    skippedAllowedWhenWindowClosed: boolean;
    passRequiresProbeWindowOpen: boolean;
    skippedOrMixedNotProductionPass: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForReadOnlyLiveCapture: boolean;
    readyForProductionPassEvidenceCandidate: boolean;
  };
  artifacts: {
    readinessPacket: {
      profileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["profileVersion"];
      readinessPacketDigest: string;
      packetState: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["packetState"];
      readyForReadOnlyWindowReview: boolean;
      readyForProductionOperations: false;
    };
    smokeHarness: {
      profileVersion: ProductionLiveProbeSmokeHarnessProfile["profileVersion"];
      readyForLiveProbeEvidence: boolean;
      probesEnabled: boolean;
      readyForProductionConnections: false;
    };
  };
  capturedRecords: ProductionLiveProbeCapturedWindowRecord[];
  summary: {
    capturedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadOnlyWindowLiveCaptureMessage[];
  warnings: ReadOnlyWindowLiveCaptureMessage[];
  recommendations: ReadOnlyWindowLiveCaptureMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: string;
    productionLiveProbeSmokeHarnessJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeCapturedWindowRecord {
  id: ProductionLiveProbeResult["id"];
  captureStatus: "captured-pass" | "captured-skipped" | "captured-blocked";
  sourceStatus: ProductionLiveProbeResult["status"];
  target: string;
  protocol: ProductionLiveProbeResult["protocol"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  message: string;
  evidenceSummary?: unknown;
}

interface ReadOnlyWindowLiveCaptureMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "readiness-packet"
    | "smoke-harness"
    | "read-only-window-live-capture"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
  productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture?format=markdown",
  productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
});

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile> {
  const readinessPacket = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(input);
  const smokeHarness = await loadProductionLiveProbeSmokeHarness({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const capturedRecords = smokeHarness.results.map(createCapturedRecord);
  const checks = createChecks(input.config, readinessPacket, smokeHarness, capturedRecords);
  checks.readyForReadOnlyLiveCapture = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyLiveCapture" && key !== "readyForProductionPassEvidenceCandidate")
    .every(([, value]) => value);
  checks.readyForProductionPassEvidenceCandidate = checks.readyForReadOnlyLiveCapture
    && input.config.upstreamProbesEnabled
    && capturedRecords.length > 0
    && capturedRecords.every((record) => record.captureStatus === "captured-pass");
  const captureState = determineCaptureState(capturedRecords, checks);
  const productionBlockers = collectProductionBlockers(checks, capturedRecords);
  const warnings = collectWarnings(input.config.upstreamProbesEnabled, captureState);
  const recommendations = collectRecommendations(captureState);
  const liveCaptureDigest = digestCapture({
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
    readinessPacketDigest: readinessPacket.packet.readinessPacketDigest,
    smokeHarnessProfileVersion: smokeHarness.profileVersion,
    captureState,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    capturedRecords: capturedRecords.map((record) => ({
      id: record.id,
      captureStatus: record.captureStatus,
      attempted: record.attempted,
    })),
    checks,
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window live capture",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
    captureState,
    readyForReadOnlyLiveCapture: checks.readyForReadOnlyLiveCapture,
    readyForProductionPassEvidenceCandidate: checks.readyForProductionPassEvidenceCandidate,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    capture: {
      liveCaptureDigest,
      readinessPacketDigest: readinessPacket.packet.readinessPacketDigest,
      smokeHarnessProfileVersion: smokeHarness.profileVersion,
      probeWindowOpen: input.config.upstreamProbesEnabled,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      manualJavaStartRequired: true,
      manualMiniKvStartRequired: true,
      skippedWithoutUpstreamsOnly: true,
      skippedOrMixedEvidenceCannotPass: true,
      passRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-pass").length,
      skippedRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-skipped").length,
      blockedRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-blocked").length,
    },
    checks,
    artifacts: {
      readinessPacket: {
        profileVersion: readinessPacket.profileVersion,
        readinessPacketDigest: readinessPacket.packet.readinessPacketDigest,
        packetState: readinessPacket.packetState,
        readyForReadOnlyWindowReview: readinessPacket.readyForReadOnlyWindowReview,
        readyForProductionOperations: readinessPacket.readyForProductionOperations,
      },
      smokeHarness: {
        profileVersion: smokeHarness.profileVersion,
        readyForLiveProbeEvidence: smokeHarness.readyForLiveProbeEvidence,
        probesEnabled: smokeHarness.probesEnabled,
        readyForProductionConnections: smokeHarness.readyForProductionConnections,
      },
    },
    capturedRecords,
    summary: {
      capturedRecordCount: capturedRecords.length,
      passRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-pass").length,
      skippedRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-skipped").length,
      blockedRecordCount: capturedRecords.filter((record) => record.captureStatus === "captured-blocked").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep skipped live capture as local evidence only.",
      "If Java and mini-kv are manually started, rerun with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
      "Do not promote pass capture to production operations; production execution remains separately gated.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
): string {
  return [
    "# Production live probe real-read smoke read-only window live capture",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Capture state: ${profile.captureState}`,
    `- Ready for read-only live capture: ${profile.readyForReadOnlyLiveCapture}`,
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
    "## Artifacts",
    "",
    "### Readiness Packet",
    "",
    ...renderEntries(profile.artifacts.readinessPacket),
    "",
    "### Smoke Harness",
    "",
    ...renderEntries(profile.artifacts.smokeHarness),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No read-only window live capture blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No read-only window live capture warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No read-only window live capture recommendations."),
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

function createCapturedRecord(result: ProductionLiveProbeResult): ProductionLiveProbeCapturedWindowRecord {
  return {
    id: result.id,
    captureStatus: result.status === "pass"
      ? "captured-pass"
      : result.status === "skipped"
        ? "captured-skipped"
        : "captured-blocked",
    sourceStatus: result.status,
    target: result.target,
    protocol: result.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: result.attempted,
    message: result.message,
    evidenceSummary: result.evidence,
  };
}

function createChecks(
  config: AppConfig,
  readinessPacket: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
  smokeHarness: ProductionLiveProbeSmokeHarnessProfile,
  records: ProductionLiveProbeCapturedWindowRecord[],
): ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["checks"] {
  return {
    readinessPacketReady: readinessPacket.readyForReadOnlyWindowReview,
    readinessPacketDigestValid: /^[a-f0-9]{64}$/.test(readinessPacket.packet.readinessPacketDigest),
    smokeHarnessReady: smokeHarness.readyForLiveProbeEvidence,
    smokeProbeSetComplete: records.length === 5,
    allProbeResultsReadOnly: records.every((record) => record.readOnly && !record.mutatesState),
    noWriteProbeAttempted: smokeHarness.checks.writeProbeAttempted === false
      && smokeHarness.checks.javaWritesAttempted === false
      && smokeHarness.checks.miniKvWritesAttempted === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false
      && smokeHarness.checks.upstreamActionsStillDisabled
      && readinessPacket.checks.upstreamActionsStayDisabled,
    noAutomaticUpstreamStart: readinessPacket.checks.noAutomaticUpstreamStart,
    skippedAllowedWhenWindowClosed: config.upstreamProbesEnabled
      || records.every((record) => record.captureStatus === "captured-skipped" && record.attempted === false),
    passRequiresProbeWindowOpen: records.every((record) => record.captureStatus !== "captured-pass")
      || config.upstreamProbesEnabled,
    skippedOrMixedNotProductionPass: records.some((record) => record.captureStatus === "captured-skipped")
      || records.every((record) => record.captureStatus === "captured-pass"),
    readyForProductionOperationsStillFalse: true,
    readyForReadOnlyLiveCapture: false,
    readyForProductionPassEvidenceCandidate: false,
  };
}

function determineCaptureState(
  records: ProductionLiveProbeCapturedWindowRecord[],
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["checks"],
): ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"] {
  if (!checks.readyForReadOnlyLiveCapture
    || records.some((record) => record.captureStatus === "captured-blocked")) {
    return "blocked";
  }
  if (records.length > 0 && records.every((record) => record.captureStatus === "captured-pass")) {
    return "captured-pass";
  }
  if (records.length > 0 && records.every((record) => record.captureStatus === "captured-skipped")) {
    return "captured-skipped";
  }
  return "captured-mixed";
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["checks"],
  records: ProductionLiveProbeCapturedWindowRecord[],
): ReadOnlyWindowLiveCaptureMessage[] {
  const blockers: ReadOnlyWindowLiveCaptureMessage[] = [];
  addMessage(blockers, checks.readinessPacketReady, "READINESS_PACKET_NOT_READY", "readiness-packet", "v155 readiness packet must be ready before live capture.");
  addMessage(blockers, checks.readinessPacketDigestValid, "READINESS_PACKET_DIGEST_INVALID", "readiness-packet", "Readiness packet digest must be valid.");
  addMessage(blockers, checks.smokeHarnessReady, "SMOKE_HARNESS_NOT_READY", "smoke-harness", "Smoke harness must be ready before capture.");
  addMessage(blockers, checks.smokeProbeSetComplete, "SMOKE_PROBE_SET_INCOMPLETE", "smoke-harness", "Capture must include all five read-only smoke probes.");
  addMessage(blockers, checks.allProbeResultsReadOnly, "NON_READ_ONLY_RESULT_CAPTURED", "read-only-window-live-capture", "All captured results must be read-only.");
  addMessage(blockers, checks.noWriteProbeAttempted, "WRITE_PROBE_ATTEMPTED", "smoke-harness", "No write probes may be attempted.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_ALLOWED", "read-only-window-live-capture", "Node must not automatically start Java or mini-kv.");
  addMessage(blockers, checks.skippedAllowedWhenWindowClosed, "WINDOW_CLOSED_WITH_NON_SKIPPED_RESULTS", "read-only-window-live-capture", "When the probe window is closed, records must be skipped only.");
  addMessage(blockers, checks.passRequiresProbeWindowOpen, "PASS_CAPTURE_WITH_WINDOW_CLOSED", "read-only-window-live-capture", "Pass capture requires UPSTREAM_PROBES_ENABLED=true.");
  addMessage(blockers, checks.skippedOrMixedNotProductionPass, "SKIPPED_OR_MIXED_PROMOTED", "read-only-window-live-capture", "Skipped or mixed capture cannot become production pass evidence.");
  addMessage(blockers, records.every((record) => record.captureStatus !== "captured-blocked"), "BLOCKED_RECORD_CAPTURED", "read-only-window-live-capture", "Blocked records cannot enter live capture evidence.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Live capture must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  probesEnabled: boolean,
  captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"],
): ReadOnlyWindowLiveCaptureMessage[] {
  return [
    {
      code: probesEnabled ? "READ_ONLY_WINDOW_OPEN" : "READ_ONLY_WINDOW_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: probesEnabled
        ? "UPSTREAM_PROBES_ENABLED=true; Node attempted read-only upstream probes only."
        : "UPSTREAM_PROBES_ENABLED=false; Node recorded skipped evidence without touching upstreams.",
    },
    {
      code: captureState === "captured-pass"
        ? "LIVE_CAPTURE_PASS"
        : captureState === "captured-skipped"
          ? "LIVE_CAPTURE_SKIPPED"
          : "LIVE_CAPTURE_NOT_PASS",
      severity: "warning",
      source: "read-only-window-live-capture",
      message: captureState === "captured-pass"
        ? "All read-only probes passed, but production operations remain disabled."
        : captureState === "captured-skipped"
          ? "All probes were skipped; this is not production pass evidence."
          : "Capture is mixed or blocked; it is not production pass evidence.",
    },
  ];
}

function collectRecommendations(
  captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"],
): ReadOnlyWindowLiveCaptureMessage[] {
  return [
    {
      code: captureState === "captured-pass"
        ? "ARCHIVE_PASS_CAPTURE_BEFORE_ANY_PRODUCTION_GATE"
        : "KEEP_CAPTURE_AS_LOCAL_EVIDENCE",
      severity: "recommendation",
      source: "read-only-window-live-capture",
      message: captureState === "captured-pass"
        ? "Archive pass capture separately and keep production operations gated."
        : "Keep skipped or mixed capture as local evidence until a deliberate pass window exists.",
    },
  ];
}

function addMessage(
  messages: ReadOnlyWindowLiveCaptureMessage[],
  condition: boolean,
  code: string,
  source: ReadOnlyWindowLiveCaptureMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestCapture(value: unknown): string {
  return sha256StableJson(value);
}

function renderCapturedRecord(record: ProductionLiveProbeCapturedWindowRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Capture status: ${record.captureStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Target: ${record.target}`,
    `- Protocol: ${record.protocol}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Message: ${record.message}`,
    `- Evidence summary: ${JSON.stringify(record.evidenceSummary)}`,
    "",
  ];
}
