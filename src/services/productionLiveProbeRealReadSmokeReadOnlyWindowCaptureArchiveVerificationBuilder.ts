import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveBuilder.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
  ReadOnlyWindowCaptureArchiveVerificationMessage,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationTypes.js";

export const PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_VERIFICATION_ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification",
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification?format=markdown",
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive",
  productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
});

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationParts {
  expectedCaptureArchiveDigest: string;
  verificationDigest: string;
  verificationState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"];
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["checks"];
  summary: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["summary"];
  productionBlockers: ReadOnlyWindowCaptureArchiveVerificationMessage[];
  warnings: ReadOnlyWindowCaptureArchiveVerificationMessage[];
  recommendations: ReadOnlyWindowCaptureArchiveVerificationMessage[];
}

export function buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationParts(
  archive: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationParts {
  const expectedCaptureArchiveDigest = digestArchive({
    profileVersion: archive.profileVersion,
    liveCaptureDigest: archive.archive.liveCaptureDigest,
    readinessPacketDigest: archive.archive.readinessPacketDigest,
    liveCaptureProfileVersion: archive.archive.liveCaptureProfileVersion,
    readinessPacketProfileVersion: archive.archive.readinessPacketProfileVersion,
    captureState: archive.archive.captureState,
    upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
    archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
    javaVersionTag: archive.archive.javaVersionTag,
    miniKvVersionTag: archive.archive.miniKvVersionTag,
    readyForProductionOperations: false,
    checks: archive.checks,
  });
  const checks = createChecks(archive, expectedCaptureArchiveDigest);
  checks.readyForReadOnlyCaptureArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyCaptureArchiveVerification")
    .every(([, value]) => value);
  const verificationState = determineVerificationState(
    archive,
    checks.readyForReadOnlyCaptureArchiveVerification,
  );
  const verificationDigest = digestVerification({
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
    captureArchiveDigest: archive.archive.captureArchiveDigest,
    expectedCaptureArchiveDigest,
    archiveState: archive.archiveState,
    verificationState,
    captureState: archive.archive.captureState,
    archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
    javaVersionTag: archive.archive.javaVersionTag,
    miniKvVersionTag: archive.archive.miniKvVersionTag,
    readyForProductionOperations: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, archive.archiveState);
  const warnings = collectWarnings(
    verificationState,
    archive.archive.captureState,
    archive.archive.archivedAsProductionPassEvidence,
  );
  const recommendations = collectRecommendations(verificationState);

  return {
    expectedCaptureArchiveDigest,
    verificationDigest,
    verificationState,
    checks,
    summary: {
      verificationCheckCount: countReportChecks(checks),
      passedVerificationCheckCount: countPassedReportChecks(checks),
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
  archive: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
  expectedCaptureArchiveDigest: string,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["checks"] {
  return {
    captureArchiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.captureArchiveDigest),
    captureArchiveDigestMatches: archive.archive.captureArchiveDigest === expectedCaptureArchiveDigest,
    archiveProfileVersionValid: archive.profileVersion === "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1",
    archiveReadyForVerification: archive.readyForReadOnlyCaptureArchive,
    archiveChecksAllPassed: archive.summary.archiveCheckCount === archive.summary.passedArchiveCheckCount,
    archiveProductionBlockersClear: archive.summary.productionBlockerCount === 0,
    liveCaptureProfileVersionValid: archive.archive.liveCaptureProfileVersion === "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
    readinessPacketProfileVersionValid: archive.archive.readinessPacketProfileVersion === "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
    javaV50ReferenceReady: archive.artifacts.javaReference.tag === PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE.tag
      && archive.artifacts.javaReference.readOnly
      && !archive.artifacts.javaReference.executionAllowed,
    miniKvV59ReferenceReady: archive.artifacts.miniKvReference.tag === PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE.tag
      && archive.artifacts.miniKvReference.readOnly
      && !archive.artifacts.miniKvReference.executionAllowed,
    skippedOrMixedNotProductionPass: archive.archive.captureState === "captured-pass"
      || archive.archive.archivedAsProductionPassEvidence === false,
    upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
      && archive.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: archive.archive.automaticUpstreamStart === false
      && archive.checks.noAutomaticUpstreamStart,
    readyForProductionOperationsStillFalse: archive.readyForProductionOperations === false,
    readyForReadOnlyCaptureArchiveVerification: false,
  };
}

function determineVerificationState(
  archive: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
  readyForVerification: boolean,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"] {
  if (!readyForVerification || archive.archiveState === "blocked") {
    return "blocked";
  }
  if (archive.archiveState === "read-only-pass-candidate-archived") {
    return "verified-read-only-pass-candidate-archive";
  }
  if (archive.archiveState === "read-only-skipped-capture-archived") {
    return "verified-read-only-skipped-capture-archive";
  }
  return "verified-read-only-mixed-capture-archive";
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["checks"],
  archiveState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"],
): ReadOnlyWindowCaptureArchiveVerificationMessage[] {
  const blockers: ReadOnlyWindowCaptureArchiveVerificationMessage[] = [];
  addMessage(blockers, archiveState !== "blocked", "ARCHIVE_STATE_BLOCKED", "read-only-window-capture-archive", "The source archive must not be blocked.");
  addMessage(blockers, checks.captureArchiveDigestValid, "CAPTURE_ARCHIVE_DIGEST_INVALID", "read-only-window-capture-archive", "Capture archive digest must be a valid sha256 digest.");
  addMessage(blockers, checks.captureArchiveDigestMatches, "CAPTURE_ARCHIVE_DIGEST_MISMATCH", "read-only-window-capture-archive-verification", "Recomputed capture archive digest must match the archive digest.");
  addMessage(blockers, checks.archiveProfileVersionValid, "ARCHIVE_PROFILE_VERSION_INVALID", "read-only-window-capture-archive", "Archive profile version must match v157.");
  addMessage(blockers, checks.archiveReadyForVerification, "ARCHIVE_NOT_READY", "read-only-window-capture-archive", "Archive must be ready before verification.");
  addMessage(blockers, checks.archiveChecksAllPassed, "ARCHIVE_CHECKS_NOT_ALL_PASSED", "read-only-window-capture-archive", "All archive checks must pass.");
  addMessage(blockers, checks.archiveProductionBlockersClear, "ARCHIVE_HAS_BLOCKERS", "read-only-window-capture-archive", "Archive blockers must be clear.");
  addMessage(blockers, checks.liveCaptureProfileVersionValid, "LIVE_CAPTURE_PROFILE_VERSION_INVALID", "read-only-window-live-capture", "Verification must reference v156 live capture profile.");
  addMessage(blockers, checks.readinessPacketProfileVersionValid, "READINESS_PACKET_PROFILE_VERSION_INVALID", "read-only-window-readiness-packet", "Verification must reference v155 readiness packet profile.");
  addMessage(blockers, checks.javaV50ReferenceReady, "JAVA_V50_REFERENCE_NOT_READY", "java-v50-reference", "Java v50 reference must be present and read-only.");
  addMessage(blockers, checks.miniKvV59ReferenceReady, "MINI_KV_V59_REFERENCE_NOT_READY", "mini-kv-v59-reference", "mini-kv v59 reference must be present and read-only.");
  addMessage(blockers, checks.skippedOrMixedNotProductionPass, "SKIPPED_OR_MIXED_PROMOTED", "read-only-window-capture-archive-verification", "Skipped or mixed capture must remain non-pass.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "read-only-window-capture-archive-verification", "Verification must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Verification must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  verificationState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"],
  captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archive"]["captureState"],
  archivedAsProductionPassEvidence: boolean,
): ReadOnlyWindowCaptureArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked"
        ? "CAPTURE_ARCHIVE_VERIFICATION_BLOCKED"
        : "CAPTURE_ARCHIVE_DIGEST_VERIFIED",
      severity: "warning",
      source: "read-only-window-capture-archive-verification",
      message: verificationState === "blocked"
        ? "Capture archive verification has blockers."
        : "Capture archive digest matches the recomputed digest.",
    },
    {
      code: captureState === "captured-skipped"
        ? "SKIPPED_CAPTURE_REMAINS_NON_PASS"
        : "CAPTURE_PASS_OR_MIXED_POLICY_RECHECKED",
      severity: "warning",
      source: "read-only-window-live-capture",
      message: captureState === "captured-skipped"
        ? "Skipped capture remains non-pass evidence after verification."
        : "Capture pass or mixed policy was rechecked during verification.",
    },
    {
      code: archivedAsProductionPassEvidence
        ? "PASS_CANDIDATE_ARCHIVE_REMAINS_GATED"
        : "NON_PASS_ARCHIVE_REMAINS_GATED",
      severity: "warning",
      source: "read-only-window-capture-archive",
      message: archivedAsProductionPassEvidence
        ? "Pass candidate archive remains separate from production operations."
        : "Non-pass archive remains separate from production operations.",
    },
  ];
}

function collectRecommendations(
  verificationState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"],
): ReadOnlyWindowCaptureArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked"
        ? "FIX_CAPTURE_ARCHIVE_VERIFICATION_BLOCKERS"
        : "PROCEED_TO_UPSTREAM_EVIDENCE_EXPLANATION",
      severity: "recommendation",
      source: "read-only-window-capture-archive-verification",
      message: verificationState === "blocked"
        ? "Fix archive verification blockers before the next plan step."
        : "Proceed to Java v51 and mini-kv v60 read-only evidence explanation work.",
    },
  ];
}

function addMessage(
  messages: ReadOnlyWindowCaptureArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: ReadOnlyWindowCaptureArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestArchive(value: unknown): string {
  return sha256StableJson(value);
}

function digestVerification(value: unknown): string {
  return sha256StableJson(value);
}
