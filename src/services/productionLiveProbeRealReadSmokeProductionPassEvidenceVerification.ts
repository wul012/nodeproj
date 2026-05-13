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
  loadProductionLiveProbeRealReadSmokeEvidenceCapture,
} from "./productionLiveProbeRealReadSmokeEvidenceCapture.js";
import {
  loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate,
} from "./productionLiveProbeRealReadSmokeReleaseEvidenceGate.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1";
  verificationState: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
  readyForProductionPassEvidenceVerification: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    captureDigest: string;
    releaseEvidenceGateDigest: string;
    captureProfileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1";
    releaseEvidenceGateProfileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1";
    captureState: "captured-pass" | "captured-mixed" | "captured-skipped" | "blocked";
    captureMode: "pass" | "mixed" | "skipped" | "blocked";
    releaseGateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    readOnlyWindowOpen: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    allCapturedRecordsPass: boolean;
    skippedOrMixedRemainsBlocked: boolean;
  };
  checks: {
    captureReadyForEvidenceCapture: boolean;
    captureDigestValid: boolean;
    captureRecordCountMatches: boolean;
    captureAllCapturedRecordsAccepted: boolean;
    captureAllCapturedRecordsPass: boolean;
    captureNoSkippedRecords: boolean;
    captureNoRejectedRecords: boolean;
    captureNoWriteEvidenceCaptured: boolean;
    captureReadOnlyWindowOpen: boolean;
    releaseGateReadyForReleaseEvidenceGate: boolean;
    releaseGateDigestValid: boolean;
    releaseGateReadyForProductionPassEvidence: boolean;
    releaseGateDecisionMatchesCapture: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    skippedOrMixedRemainsBlocked: boolean;
    readyForProductionPassEvidenceVerification: boolean;
  };
  artifacts: {
    capture: {
      profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1";
      captureState: "captured-pass" | "captured-mixed" | "captured-skipped" | "blocked";
      captureDigest: string;
      releaseGateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
      readyForEvidenceCapture: boolean;
      readyForProductionPassEvidenceCandidate: boolean;
      importedRecordCount: number;
      passRecordCount: number;
      skippedRecordCount: number;
      rejectedRecordCount: number;
    };
    releaseEvidenceGate: {
      profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1";
      gateDigest: string;
      gateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
      readyForReleaseEvidenceGate: boolean;
      readyForProductionPassEvidence: boolean;
    };
  };
  summary: {
    verificationCheckCount: number;
    passedVerificationCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[];
  warnings: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[];
  recommendations: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMarkdown: string;
    productionLiveProbeRealReadSmokeEvidenceCaptureJson: string;
    productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: string;
    productionLiveProbeRealReadSmokeDryRunCommandPackageJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "evidence-capture"
    | "release-evidence-gate"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification",
  productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMarkdown: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification?format=markdown",
  productionLiveProbeRealReadSmokeEvidenceCaptureJson: "/api/v1/production/live-probe-real-read-smoke-evidence-capture",
  productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
  productionLiveProbeRealReadSmokeDryRunCommandPackageJson: "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package",
});

export async function loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile> {
  const capture = await loadProductionLiveProbeRealReadSmokeEvidenceCapture(input);
  const releaseGate = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input);
  const checks = {
    captureReadyForEvidenceCapture: capture.readyForEvidenceCapture,
    captureDigestValid: /^[a-f0-9]{64}$/.test(capture.capture.captureDigest),
    captureRecordCountMatches: capture.summary.capturedRecordCount === 5
      && capture.capture.importedRecordCount === 5,
    captureAllCapturedRecordsAccepted: capture.capturedRecords.every((record) => record.captureStatus !== "captured-rejected"),
    captureAllCapturedRecordsPass: capture.capture.captureMode === "pass"
      && capture.capture.passRecordCount === capture.capture.importedRecordCount
      && capture.capture.importedRecordCount === 5,
    captureNoSkippedRecords: capture.capture.skippedRecordCount === 0,
    captureNoRejectedRecords: capture.capture.rejectedRecordCount === 0,
    captureNoWriteEvidenceCaptured: capture.checks.noWriteEvidenceCaptured,
    captureReadOnlyWindowOpen: capture.capture.readOnlyWindowOpen,
    releaseGateReadyForReleaseEvidenceGate: releaseGate.readyForReleaseEvidenceGate,
    releaseGateDigestValid: /^[a-f0-9]{64}$/.test(releaseGate.gate.gateDigest),
    releaseGateReadyForProductionPassEvidence: releaseGate.readyForProductionPassEvidence
      && releaseGate.gateDecision === "production-pass-evidence-ready",
    releaseGateDecisionMatchesCapture: capture.capture.releaseGateDecision === releaseGate.gateDecision,
    upstreamActionsStillDisabled: capture.capture.upstreamActionsEnabled === false
      && releaseGate.gate.upstreamActionsEnabled === false
      && capture.checks.upstreamActionsStillDisabled
      && releaseGate.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: capture.capture.automaticUpstreamStart === false
      && capture.checks.noAutomaticUpstreamStart,
    skippedOrMixedRemainsBlocked: capture.capture.captureMode !== "pass",
    readyForProductionPassEvidenceVerification: false,
  };
  checks.readyForProductionPassEvidenceVerification = checks.captureReadyForEvidenceCapture
    && checks.captureDigestValid
    && checks.captureRecordCountMatches
    && checks.captureAllCapturedRecordsAccepted
    && checks.captureAllCapturedRecordsPass
    && checks.captureNoSkippedRecords
    && checks.captureNoRejectedRecords
    && checks.captureNoWriteEvidenceCaptured
    && checks.captureReadOnlyWindowOpen
    && checks.releaseGateReadyForReleaseEvidenceGate
    && checks.releaseGateDigestValid
    && checks.releaseGateReadyForProductionPassEvidence
    && checks.releaseGateDecisionMatchesCapture
    && checks.upstreamActionsStillDisabled
    && checks.noAutomaticUpstreamStart
    && !checks.skippedOrMixedRemainsBlocked;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(capture.capture.captureMode, releaseGate.gateDecision, capture.capture.readOnlyWindowOpen);
  const recommendations = collectRecommendations(capture.capture.captureMode);
  const verificationDigest = digestVerification({
    profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1",
    captureDigest: capture.capture.captureDigest,
    releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
    verificationState: productionBlockers.length > 0
      ? "blocked"
      : checks.readyForProductionPassEvidenceVerification
        ? "production-pass-evidence-ready"
        : "not-production-pass-evidence",
    captureMode: capture.capture.captureMode,
    releaseGateDecision: releaseGate.gateDecision,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    checks: {
      ...checks,
      readyForProductionPassEvidenceVerification: checks.readyForProductionPassEvidenceVerification,
    },
  });
  const verificationState = productionBlockers.length > 0
    ? "blocked"
    : checks.readyForProductionPassEvidenceVerification
      ? "production-pass-evidence-ready"
      : "not-production-pass-evidence";

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke production pass evidence verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1",
    verificationState,
    readyForProductionPassEvidenceVerification: checks.readyForProductionPassEvidenceVerification,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      captureDigest: capture.capture.captureDigest,
      releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
      captureProfileVersion: capture.profileVersion,
      releaseEvidenceGateProfileVersion: releaseGate.profileVersion,
      captureState: capture.captureState,
      captureMode: capture.capture.captureMode,
      releaseGateDecision: releaseGate.gateDecision,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      readOnlyWindowOpen: capture.capture.readOnlyWindowOpen,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      allCapturedRecordsPass: checks.captureAllCapturedRecordsPass,
      skippedOrMixedRemainsBlocked: checks.skippedOrMixedRemainsBlocked,
    },
    checks,
    artifacts: {
      capture: {
        profileVersion: capture.profileVersion,
        captureState: capture.captureState,
        captureDigest: capture.capture.captureDigest,
        releaseGateDecision: capture.capture.releaseGateDecision,
        readyForEvidenceCapture: capture.readyForEvidenceCapture,
        readyForProductionPassEvidenceCandidate: capture.readyForProductionPassEvidenceCandidate,
        importedRecordCount: capture.capture.importedRecordCount,
        passRecordCount: capture.capture.passRecordCount,
        skippedRecordCount: capture.capture.skippedRecordCount,
        rejectedRecordCount: capture.capture.rejectedRecordCount,
      },
      releaseEvidenceGate: {
        profileVersion: releaseGate.profileVersion,
        gateDigest: releaseGate.gate.gateDigest,
        gateDecision: releaseGate.gateDecision,
        readyForReleaseEvidenceGate: releaseGate.readyForReleaseEvidenceGate,
        readyForProductionPassEvidence: releaseGate.readyForProductionPassEvidence,
      },
    },
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
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this verification layer only after v148 capture exists.",
      "Keep skipped or mixed capture blocked from production pass evidence.",
      "Treat a pass verdict as evidence verification only; production operations remain gated separately.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMarkdown(
  profile: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile,
): string {
  return [
    "# Production live probe real-read smoke production pass evidence verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for production pass evidence verification: ${profile.readyForProductionPassEvidenceVerification}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Capture",
    "",
    ...renderEntries(profile.artifacts.capture),
    "",
    "### Release evidence gate",
    "",
    ...renderEntries(profile.artifacts.releaseEvidenceGate),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No production pass evidence verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No production pass evidence verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No production pass evidence verification recommendations."),
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

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile["checks"],
): ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[] {
  const blockers: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[] = [];
  addMessage(blockers, checks.captureReadyForEvidenceCapture, "CAPTURE_NOT_READY_FOR_EVIDENCE_CAPTURE", "evidence-capture", "v148 capture must be ready before verification can pass.");
  addMessage(blockers, checks.captureDigestValid, "CAPTURE_DIGEST_INVALID", "evidence-capture", "Capture digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.captureRecordCountMatches, "CAPTURE_RECORD_COUNT_MISMATCH", "evidence-capture", "Capture must include exactly five read-only smoke records.");
  addMessage(blockers, checks.captureAllCapturedRecordsAccepted, "CAPTURED_RECORD_REJECTED", "evidence-capture", "Rejected capture records cannot be promoted.");
  addMessage(blockers, checks.captureNoRejectedRecords, "CAPTURE_REJECTED_RECORD_PRESENT", "evidence-capture", "Rejected capture records block production pass evidence.");
  addMessage(blockers, checks.captureNoWriteEvidenceCaptured, "WRITE_EVIDENCE_CAPTURED", "evidence-capture", "Capture must remain read-only.");
  addMessage(blockers, checks.releaseGateReadyForReleaseEvidenceGate, "RELEASE_GATE_NOT_READY", "release-evidence-gate", "Release evidence gate must be ready before pass verification can succeed.");
  addMessage(blockers, checks.releaseGateDigestValid, "RELEASE_GATE_DIGEST_INVALID", "release-evidence-gate", "Release gate digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.releaseGateDecisionMatchesCapture, "RELEASE_GATE_DECISION_MISMATCH", "release-evidence-gate", "Capture and release gate decisions must match.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "evidence-capture", "Verification must not start Java or mini-kv automatically.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile["verification"]["captureMode"],
  releaseGateDecision: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile["verification"]["releaseGateDecision"],
  readOnlyWindowOpen: boolean,
): ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[] {
  return [
    {
      code: mode === "pass"
        ? "PASS_CAPTURE_VERIFIED"
        : "SKIPPED_OR_MIXED_CAPTURE_REMAINS_BLOCKED",
      severity: "warning",
      source: "evidence-capture",
      message: mode === "pass"
        ? "The capture is pass evidence only after verification; production operations remain separately gated."
        : "Skipped or mixed capture remains local evidence and must not be promoted.",
    },
    {
      code: readOnlyWindowOpen ? "READ_ONLY_WINDOW_OPEN" : "READ_ONLY_WINDOW_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: readOnlyWindowOpen
        ? "UPSTREAM_PROBES_ENABLED=true and the read-only window is open."
        : "UPSTREAM_PROBES_ENABLED=false; pass evidence verification should remain blocked.",
    },
    {
      code: releaseGateDecision === "production-pass-evidence-ready"
        ? "RELEASE_GATE_ACCEPTS_CAPTURE"
        : "RELEASE_GATE_REJECTS_CAPTURE",
      severity: "warning",
      source: "release-evidence-gate",
      message: releaseGateDecision === "production-pass-evidence-ready"
        ? "The release gate accepts this capture as pass evidence, but production operations are still gated."
        : "The release gate keeps this capture out of production pass evidence.",
    },
  ];
}

function collectRecommendations(
  mode: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile["verification"]["captureMode"],
): ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[] {
  return [
    {
      code: mode === "pass"
        ? "ARCHIVE_PASS_VERIFICATION_WITH_CAPTURE_AND_GATE"
        : "KEEP_CAPTURE_OUT_OF_PRODUCTION_PASS_ARCHIVES",
      severity: "recommendation",
      source: "evidence-capture",
      message: mode === "pass"
        ? "Archive the verified pass evidence together with v148 capture and keep production operations gated separately."
        : "Keep this capture as local evidence until a deliberate read-only pass window is available.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function countVerificationChecks(
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile["checks"],
): number {
  return Object.keys(checks).length;
}

function countPassedVerificationChecks(
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile["checks"],
): number {
  return Object.values(checks).filter(Boolean).length;
}

function digestVerification(value: unknown): string {
  return sha256StableJson(value);
}



