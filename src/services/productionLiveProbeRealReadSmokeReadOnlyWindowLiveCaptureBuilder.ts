import type { AppConfig } from "../config.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import type {
  ProductionLiveProbeCapturedWindowRecord,
  ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
  ReadOnlyWindowLiveCaptureMessage,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.js";
import type {
  ProductionLiveProbeResult,
  ProductionLiveProbeSmokeHarnessProfile,
} from "./productionLiveProbeSmokeHarness.js";

export const PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_LIVE_CAPTURE_ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
  productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture?format=markdown",
  productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
});

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureParts {
  capturedRecords: ProductionLiveProbeCapturedWindowRecord[];
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["checks"];
  captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"];
  liveCaptureDigest: string;
  summary: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["summary"];
  productionBlockers: ReadOnlyWindowLiveCaptureMessage[];
  warnings: ReadOnlyWindowLiveCaptureMessage[];
  recommendations: ReadOnlyWindowLiveCaptureMessage[];
}

export function buildProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureParts(
  config: AppConfig,
  readinessPacket: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
  smokeHarness: ProductionLiveProbeSmokeHarnessProfile,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureParts {
  const capturedRecords = smokeHarness.results.map(createCapturedRecord);
  const checks = createChecks(config, readinessPacket, smokeHarness, capturedRecords);
  checks.readyForReadOnlyLiveCapture = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyLiveCapture" && key !== "readyForProductionPassEvidenceCandidate")
    .every(([, value]) => value);
  checks.readyForProductionPassEvidenceCandidate = checks.readyForReadOnlyLiveCapture
    && config.upstreamProbesEnabled
    && capturedRecords.length > 0
    && capturedRecords.every((record) => record.captureStatus === "captured-pass");
  const captureState = determineCaptureState(capturedRecords, checks);
  const productionBlockers = collectProductionBlockers(checks, capturedRecords);
  const warnings = collectWarnings(config.upstreamProbesEnabled, captureState);
  const recommendations = collectRecommendations(captureState);
  const recordCounts = countCapturedRecords(capturedRecords);
  const liveCaptureDigest = digestCapture({
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
    readinessPacketDigest: readinessPacket.packet.readinessPacketDigest,
    smokeHarnessProfileVersion: smokeHarness.profileVersion,
    captureState,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    capturedRecords: capturedRecords.map((record) => ({
      id: record.id,
      captureStatus: record.captureStatus,
      attempted: record.attempted,
    })),
    checks,
  });

  return {
    capturedRecords,
    checks,
    captureState,
    liveCaptureDigest,
    summary: {
      capturedRecordCount: capturedRecords.length,
      passRecordCount: recordCounts.passRecordCount,
      skippedRecordCount: recordCounts.skippedRecordCount,
      blockedRecordCount: recordCounts.blockedRecordCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
  };
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

function countCapturedRecords(records: ProductionLiveProbeCapturedWindowRecord[]): {
  passRecordCount: number;
  skippedRecordCount: number;
  blockedRecordCount: number;
} {
  return {
    passRecordCount: records.filter((record) => record.captureStatus === "captured-pass").length,
    skippedRecordCount: records.filter((record) => record.captureStatus === "captured-skipped").length,
    blockedRecordCount: records.filter((record) => record.captureStatus === "captured-blocked").length,
  };
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
