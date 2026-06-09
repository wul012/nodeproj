import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
  ReadOnlyWindowCaptureArchiveMessage,
  UpstreamVersionReference,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.js";

export const PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive",
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive?format=markdown",
  productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
  productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
});

export const PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v50",
  tag: "v50订单平台ops-read-only-window-self-description",
  commitRole: "ops read-only window self description",
  evidenceKind: "ops-read-only-window-self-description",
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
} satisfies UpstreamVersionReference);

export const PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v59",
  tag: "第五十九版运行时只读自描述",
  commitRole: "runtime read self description",
  evidenceKind: "runtime-read-self-description",
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
} satisfies UpstreamVersionReference);

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveParts {
  archiveState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"];
  readyForProductionPassEvidenceArchive: boolean;
  captureArchiveDigest: string;
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["checks"];
  summary: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["summary"];
  productionBlockers: ReadOnlyWindowCaptureArchiveMessage[];
  warnings: ReadOnlyWindowCaptureArchiveMessage[];
  recommendations: ReadOnlyWindowCaptureArchiveMessage[];
}

export function buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveParts(
  liveCapture: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveParts {
  const readyForProductionPassEvidenceArchive = liveCapture.captureState === "captured-pass"
    && liveCapture.readyForProductionPassEvidenceCandidate;
  const checks = createChecks(liveCapture, readyForProductionPassEvidenceArchive);
  checks.readyForReadOnlyCaptureArchive = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyCaptureArchive")
    .every(([, value]) => value);
  const archiveState = determineArchiveState(liveCapture.captureState, checks.readyForReadOnlyCaptureArchive);
  const captureArchiveDigest = digestArchive({
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1",
    liveCaptureDigest: liveCapture.capture.liveCaptureDigest,
    readinessPacketDigest: liveCapture.capture.readinessPacketDigest,
    liveCaptureProfileVersion: liveCapture.profileVersion,
    readinessPacketProfileVersion: liveCapture.artifacts.readinessPacket.profileVersion,
    captureState: liveCapture.captureState,
    upstreamActionsEnabled: liveCapture.capture.upstreamActionsEnabled,
    archivedAsProductionPassEvidence: readyForProductionPassEvidenceArchive,
    javaVersionTag: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE.tag,
    miniKvVersionTag: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE.tag,
    readyForProductionOperations: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, liveCapture.productionBlockers.length);
  const warnings = collectWarnings(
    archiveState,
    liveCapture.captureState,
    readyForProductionPassEvidenceArchive,
  );
  const recommendations = collectRecommendations(archiveState);

  return {
    archiveState,
    readyForProductionPassEvidenceArchive,
    captureArchiveDigest,
    checks,
    summary: {
      archiveCheckCount: countReportChecks(checks),
      passedArchiveCheckCount: countPassedReportChecks(checks),
      capturedRecordCount: liveCapture.summary.capturedRecordCount,
      passRecordCount: liveCapture.capture.passRecordCount,
      skippedRecordCount: liveCapture.capture.skippedRecordCount,
      blockedRecordCount: liveCapture.capture.blockedRecordCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
  };
}

function createChecks(
  liveCapture: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
  archivedAsProductionPassEvidence: boolean,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["checks"] {
  return {
    liveCaptureDigestValid: /^[a-f0-9]{64}$/.test(liveCapture.capture.liveCaptureDigest),
    readinessPacketDigestValid: /^[a-f0-9]{64}$/.test(liveCapture.capture.readinessPacketDigest),
    liveCaptureProfileVersionValid: liveCapture.profileVersion === "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
    readinessPacketProfileVersionValid: liveCapture.artifacts.readinessPacket.profileVersion === "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
    liveCaptureReady: liveCapture.readyForReadOnlyLiveCapture,
    capturedRecordSetComplete: liveCapture.summary.capturedRecordCount === 5,
    skippedOrMixedArchivedAsNonPass: liveCapture.captureState === "captured-pass" || !archivedAsProductionPassEvidence,
    upstreamActionsStillDisabled: liveCapture.capture.upstreamActionsEnabled === false
      && liveCapture.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: liveCapture.capture.automaticUpstreamStart === false
      && liveCapture.checks.noAutomaticUpstreamStart,
    javaV50ReferenceReady: isUpstreamVersionReferenceReady(
      PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE,
    ),
    miniKvV59ReferenceReady: isUpstreamVersionReferenceReady(
      PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE,
    ),
    readyForProductionOperationsStillFalse: liveCapture.readyForProductionOperations === false,
    readyForReadOnlyCaptureArchive: false,
  };
}

function determineArchiveState(
  captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"],
  readyForReadOnlyCaptureArchive: boolean,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"] {
  if (!readyForReadOnlyCaptureArchive || captureState === "blocked") {
    return "blocked";
  }
  if (captureState === "captured-pass") {
    return "read-only-pass-candidate-archived";
  }
  if (captureState === "captured-skipped") {
    return "read-only-skipped-capture-archived";
  }
  return "read-only-mixed-capture-archived";
}

function isUpstreamVersionReferenceReady(reference: UpstreamVersionReference): boolean {
  return reference.tag.length > 0
    && reference.readOnly
    && !reference.executionAllowed
    && !reference.productionPassEvidence
    && !reference.runtimeFileRead;
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["checks"],
  liveCaptureBlockerCount: number,
): ReadOnlyWindowCaptureArchiveMessage[] {
  const blockers: ReadOnlyWindowCaptureArchiveMessage[] = [];
  addMessage(blockers, liveCaptureBlockerCount === 0, "LIVE_CAPTURE_HAS_BLOCKERS", "read-only-window-live-capture", "v156 live capture must not have blockers before archiving.");
  addMessage(blockers, checks.liveCaptureDigestValid, "LIVE_CAPTURE_DIGEST_INVALID", "read-only-window-live-capture", "v156 live capture digest must be a valid sha256 digest.");
  addMessage(blockers, checks.readinessPacketDigestValid, "READINESS_PACKET_DIGEST_INVALID", "read-only-window-readiness-packet", "v155 readiness packet digest must be a valid sha256 digest.");
  addMessage(blockers, checks.liveCaptureProfileVersionValid, "LIVE_CAPTURE_PROFILE_VERSION_INVALID", "read-only-window-live-capture", "Archive must reference v156 live capture profile version.");
  addMessage(blockers, checks.readinessPacketProfileVersionValid, "READINESS_PACKET_PROFILE_VERSION_INVALID", "read-only-window-readiness-packet", "Archive must reference v155 readiness packet profile version.");
  addMessage(blockers, checks.liveCaptureReady, "LIVE_CAPTURE_NOT_READY", "read-only-window-live-capture", "Live capture must be ready for archive.");
  addMessage(blockers, checks.capturedRecordSetComplete, "CAPTURE_RECORD_SET_INCOMPLETE", "read-only-window-live-capture", "Archive must preserve all five read-only capture records.");
  addMessage(blockers, checks.skippedOrMixedArchivedAsNonPass, "SKIPPED_OR_MIXED_ARCHIVED_AS_PASS", "read-only-window-capture-archive", "Skipped or mixed capture must not become production pass evidence.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "read-only-window-capture-archive", "Archive creation must not start Java or mini-kv.");
  addMessage(blockers, checks.javaV50ReferenceReady, "JAVA_V50_REFERENCE_NOT_READY", "java-v50-reference", "Java v50 tag reference must be present and read-only.");
  addMessage(blockers, checks.miniKvV59ReferenceReady, "MINI_KV_V59_REFERENCE_NOT_READY", "mini-kv-v59-reference", "mini-kv v59 tag reference must be present and read-only.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Capture archive must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  archiveState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"],
  captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"],
  archivedAsProductionPassEvidence: boolean,
): ReadOnlyWindowCaptureArchiveMessage[] {
  return [
    {
      code: archivedAsProductionPassEvidence
        ? "READ_ONLY_PASS_CANDIDATE_ARCHIVED"
        : "NON_PASS_CAPTURE_ARCHIVED",
      severity: "warning",
      source: "read-only-window-capture-archive",
      message: archivedAsProductionPassEvidence
        ? "All read-only probes passed, but production operations remain separately gated."
        : "Skipped or mixed capture is archived as traceability evidence only.",
    },
    {
      code: captureState === "captured-skipped"
        ? "SKIPPED_CAPTURE_NOT_PRODUCTION_PASS"
        : "CAPTURE_STATE_RECORDED",
      severity: "warning",
      source: "read-only-window-live-capture",
      message: captureState === "captured-skipped"
        ? "The archive records skipped capture and must not be promoted to production pass."
        : "The archive records the live capture state without changing upstreams.",
    },
    {
      code: archiveState === "blocked" ? "ARCHIVE_BLOCKED" : "ARCHIVE_DIGEST_CREATED",
      severity: "warning",
      source: "read-only-window-capture-archive",
      message: archiveState === "blocked"
        ? "Fix blockers before using this capture archive."
        : "Capture archive digest is ready for v158 verification.",
    },
  ];
}

function collectRecommendations(
  archiveState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"],
): ReadOnlyWindowCaptureArchiveMessage[] {
  return [
    {
      code: archiveState === "blocked"
        ? "FIX_CAPTURE_ARCHIVE_BLOCKERS"
        : "PROCEED_TO_CAPTURE_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "read-only-window-capture-archive",
      message: archiveState === "blocked"
        ? "Fix capture archive blockers before verification."
        : "Proceed to Node v158 to recompute and verify this capture archive digest.",
    },
  ];
}

function addMessage(
  messages: ReadOnlyWindowCaptureArchiveMessage[],
  condition: boolean,
  code: string,
  source: ReadOnlyWindowCaptureArchiveMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestArchive(value: unknown): string {
  return sha256StableJson(value);
}
