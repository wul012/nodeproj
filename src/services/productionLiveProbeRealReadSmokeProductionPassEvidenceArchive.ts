import { createHash } from "node:crypto";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification,
} from "./productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.js";

export interface ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1";
  archiveState: "production-pass-evidence-archived" | "not-production-pass-evidence-archived" | "blocked";
  readyForProductionPassEvidenceArchive: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  archive: {
    archiveDigest: string;
    verificationDigest: string;
    captureDigest: string;
    releaseEvidenceGateDigest: string;
    verificationProfileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1";
    captureProfileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1";
    releaseEvidenceGateProfileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1";
    verificationState: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
    captureMode: "pass" | "mixed" | "skipped" | "blocked";
    releaseGateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    readOnlyWindowOpen: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    archivedAsProductionPassEvidence: boolean;
  };
  checks: {
    verificationDigestValid: boolean;
    captureDigestValid: boolean;
    releaseEvidenceGateDigestValid: boolean;
    verificationProfileVersionValid: boolean;
    captureProfileVersionValid: boolean;
    releaseEvidenceGateProfileVersionValid: boolean;
    verificationStateMatchesArchive: boolean;
    skippedOrMixedArchivedAsNonPass: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForProductionPassEvidenceArchive: boolean;
  };
  artifacts: {
    verification: {
      profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1";
      verificationDigest: string;
      verificationState: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
      readyForProductionPassEvidenceVerification: boolean;
      readyForProductionOperations: false;
    };
    capture: {
      profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1";
      captureDigest: string;
      captureMode: "pass" | "mixed" | "skipped" | "blocked";
      captureState: "captured-pass" | "captured-mixed" | "captured-skipped" | "blocked";
      importedRecordCount: number;
      passRecordCount: number;
      skippedRecordCount: number;
      rejectedRecordCount: number;
    };
    releaseEvidenceGate: {
      profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1";
      gateDigest: string;
      gateDecision: "production-pass-evidence-ready" | "not-production-pass-evidence" | "blocked";
      readyForProductionPassEvidence: boolean;
    };
  };
  summary: {
    archiveCheckCount: number;
    passedArchiveCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionPassEvidenceArchiveMessage[];
  warnings: ProductionPassEvidenceArchiveMessage[];
  recommendations: ProductionPassEvidenceArchiveMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationJson: string;
    productionLiveProbeRealReadSmokeEvidenceCaptureJson: string;
    productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: string;
  };
  nextActions: string[];
}

export interface ProductionPassEvidenceArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-pass-evidence-archive"
    | "production-pass-evidence-verification"
    | "evidence-capture"
    | "release-evidence-gate"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive?format=markdown",
  productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification",
  productionLiveProbeRealReadSmokeEvidenceCaptureJson: "/api/v1/production/live-probe-real-read-smoke-evidence-capture",
  productionLiveProbeRealReadSmokeReleaseEvidenceGateJson: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
});

export async function loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile> {
  const verification = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification(input);
  const archivedAsProductionPassEvidence = verification.readyForProductionPassEvidenceVerification
    && verification.verificationState === "production-pass-evidence-ready";
  const checks = {
    verificationDigestValid: /^[a-f0-9]{64}$/.test(verification.verification.verificationDigest),
    captureDigestValid: /^[a-f0-9]{64}$/.test(verification.verification.captureDigest),
    releaseEvidenceGateDigestValid: /^[a-f0-9]{64}$/.test(verification.verification.releaseEvidenceGateDigest),
    verificationProfileVersionValid: verification.profileVersion === "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1",
    captureProfileVersionValid: verification.verification.captureProfileVersion === "production-live-probe-real-read-smoke-evidence-capture.v1",
    releaseEvidenceGateProfileVersionValid: verification.verification.releaseEvidenceGateProfileVersion === "production-live-probe-real-read-smoke-release-evidence-gate.v1",
    verificationStateMatchesArchive: archivedAsProductionPassEvidence
      ? verification.verificationState === "production-pass-evidence-ready"
      : verification.verificationState !== "production-pass-evidence-ready",
    skippedOrMixedArchivedAsNonPass: verification.verification.captureMode === "pass"
      || archivedAsProductionPassEvidence === false,
    upstreamActionsStillDisabled: verification.verification.upstreamActionsEnabled === false
      && verification.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: verification.verification.automaticUpstreamStart === false
      && verification.checks.noAutomaticUpstreamStart,
    readyForProductionOperationsStillFalse: verification.readyForProductionOperations === false,
    readyForProductionPassEvidenceArchive: false,
  };
  checks.readyForProductionPassEvidenceArchive = Object.entries(checks)
    .filter(([key]) => key !== "readyForProductionPassEvidenceArchive")
    .every(([, value]) => value);
  const archiveState = verification.verificationState === "blocked"
    || verification.productionBlockers.length > 0
    || !checks.readyForProductionPassEvidenceArchive
    ? "blocked"
    : archivedAsProductionPassEvidence
      ? "production-pass-evidence-archived"
      : "not-production-pass-evidence-archived";
  const archiveDigest = digestArchive({
    profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1",
    verificationDigest: verification.verification.verificationDigest,
    captureDigest: verification.verification.captureDigest,
    releaseEvidenceGateDigest: verification.verification.releaseEvidenceGateDigest,
    archiveState,
    archivedAsProductionPassEvidence,
    verificationState: verification.verificationState,
    captureMode: verification.verification.captureMode,
    releaseGateDecision: verification.verification.releaseGateDecision,
    upstreamActionsEnabled: verification.verification.upstreamActionsEnabled,
    readyForProductionOperations: verification.readyForProductionOperations,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, verification.productionBlockers.length);
  const warnings = collectWarnings(archiveState, verification.verification.captureMode, archivedAsProductionPassEvidence);
  const recommendations = collectRecommendations(archiveState);

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke production pass evidence archive",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1",
    archiveState,
    readyForProductionPassEvidenceArchive: checks.readyForProductionPassEvidenceArchive,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    archive: {
      archiveDigest,
      verificationDigest: verification.verification.verificationDigest,
      captureDigest: verification.verification.captureDigest,
      releaseEvidenceGateDigest: verification.verification.releaseEvidenceGateDigest,
      verificationProfileVersion: verification.profileVersion,
      captureProfileVersion: verification.verification.captureProfileVersion,
      releaseEvidenceGateProfileVersion: verification.verification.releaseEvidenceGateProfileVersion,
      verificationState: verification.verificationState,
      captureMode: verification.verification.captureMode,
      releaseGateDecision: verification.verification.releaseGateDecision,
      upstreamProbesEnabled: verification.verification.upstreamProbesEnabled,
      upstreamActionsEnabled: verification.verification.upstreamActionsEnabled,
      readOnlyWindowOpen: verification.verification.readOnlyWindowOpen,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      archivedAsProductionPassEvidence,
    },
    checks,
    artifacts: {
      verification: {
        profileVersion: verification.profileVersion,
        verificationDigest: verification.verification.verificationDigest,
        verificationState: verification.verificationState,
        readyForProductionPassEvidenceVerification: verification.readyForProductionPassEvidenceVerification,
        readyForProductionOperations: verification.readyForProductionOperations,
      },
      capture: {
        profileVersion: verification.verification.captureProfileVersion,
        captureDigest: verification.verification.captureDigest,
        captureMode: verification.verification.captureMode,
        captureState: verification.verification.captureState,
        importedRecordCount: verification.artifacts.capture.importedRecordCount,
        passRecordCount: verification.artifacts.capture.passRecordCount,
        skippedRecordCount: verification.artifacts.capture.skippedRecordCount,
        rejectedRecordCount: verification.artifacts.capture.rejectedRecordCount,
      },
      releaseEvidenceGate: {
        profileVersion: verification.verification.releaseEvidenceGateProfileVersion,
        gateDigest: verification.verification.releaseEvidenceGateDigest,
        gateDecision: verification.verification.releaseGateDecision,
        readyForProductionPassEvidence: verification.artifacts.releaseEvidenceGate.readyForProductionPassEvidence,
      },
    },
    summary: {
      archiveCheckCount: countArchiveChecks(checks),
      passedArchiveCheckCount: countPassedArchiveChecks(checks),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this archive as the stable digest chain before Java v49 and mini-kv v50 add fresh read-only evidence.",
      "Keep not-production-pass evidence archived as local evidence only.",
      "Do not enable production operations from this archive; production operations remain separately gated.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveMarkdown(
  profile: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile,
): string {
  return [
    "# Production live probe real-read smoke production pass evidence archive",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive state: ${profile.archiveState}`,
    `- Ready for production pass evidence archive: ${profile.readyForProductionPassEvidenceArchive}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Archive",
    "",
    ...renderEntries(profile.archive),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Verification",
    "",
    ...renderEntries(profile.artifacts.verification),
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
    ...renderMessages(profile.productionBlockers, "No production pass evidence archive blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No production pass evidence archive warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No production pass evidence archive recommendations."),
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
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile["checks"],
  upstreamBlockerCount: number,
): ProductionPassEvidenceArchiveMessage[] {
  const blockers: ProductionPassEvidenceArchiveMessage[] = [];
  addMessage(blockers, upstreamBlockerCount === 0, "VERIFICATION_HAS_BLOCKERS", "production-pass-evidence-verification", "v149 verification blockers must be cleared before archiving.");
  addMessage(blockers, checks.verificationDigestValid, "VERIFICATION_DIGEST_INVALID", "production-pass-evidence-verification", "Verification digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.captureDigestValid, "CAPTURE_DIGEST_INVALID", "evidence-capture", "Capture digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.releaseEvidenceGateDigestValid, "RELEASE_GATE_DIGEST_INVALID", "release-evidence-gate", "Release evidence gate digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.verificationProfileVersionValid, "VERIFICATION_PROFILE_VERSION_INVALID", "production-pass-evidence-verification", "Archive must reference v149 verification profile version.");
  addMessage(blockers, checks.captureProfileVersionValid, "CAPTURE_PROFILE_VERSION_INVALID", "evidence-capture", "Archive must reference v148 capture profile version.");
  addMessage(blockers, checks.releaseEvidenceGateProfileVersionValid, "RELEASE_GATE_PROFILE_VERSION_INVALID", "release-evidence-gate", "Archive must reference v146 release evidence gate profile version.");
  addMessage(blockers, checks.verificationStateMatchesArchive, "VERIFICATION_STATE_ARCHIVE_MISMATCH", "production-pass-evidence-archive", "Archive state must match v149 verification state.");
  addMessage(blockers, checks.skippedOrMixedArchivedAsNonPass, "SKIPPED_OR_MIXED_ARCHIVED_AS_PASS", "evidence-capture", "Skipped or mixed evidence must remain non-pass archive evidence.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "production-pass-evidence-archive", "Archive creation must not start Java or mini-kv automatically.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Archive must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  archiveState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile["archiveState"],
  captureMode: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile["archive"]["captureMode"],
  archivedAsProductionPassEvidence: boolean,
): ProductionPassEvidenceArchiveMessage[] {
  return [
    {
      code: archivedAsProductionPassEvidence
        ? "PRODUCTION_PASS_EVIDENCE_ARCHIVED"
        : "NON_PASS_EVIDENCE_ARCHIVED",
      severity: "warning",
      source: "production-pass-evidence-archive",
      message: archivedAsProductionPassEvidence
        ? "The archive records pass evidence, but production operations remain separately gated."
        : "The archive records local non-pass evidence and must not be promoted.",
    },
    {
      code: captureMode === "pass"
        ? "CAPTURE_MODE_PASS"
        : "CAPTURE_MODE_NOT_PASS",
      severity: "warning",
      source: "evidence-capture",
      message: captureMode === "pass"
        ? "Capture mode is pass; keep production operation gates independent."
        : "Capture mode is not pass; this archive is useful for traceability, not production pass evidence.",
    },
    {
      code: archiveState === "blocked"
        ? "ARCHIVE_BLOCKED"
        : "ARCHIVE_DIGEST_CHAIN_STABLE",
      severity: "warning",
      source: "production-pass-evidence-archive",
      message: archiveState === "blocked"
        ? "Archive blockers must be addressed before using this as evidence."
        : "Archive digest chain is stable for the next global plan step.",
    },
  ];
}

function collectRecommendations(
  archiveState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile["archiveState"],
): ProductionPassEvidenceArchiveMessage[] {
  return [
    {
      code: archiveState === "not-production-pass-evidence-archived"
        ? "PROCEED_TO_JAVA_V49_AND_MINI_KV_V50_READ_ONLY_EVIDENCE"
        : "VERIFY_ARCHIVE_BEFORE_REAL_READ_WINDOW",
      severity: "recommendation",
      source: "production-pass-evidence-archive",
      message: archiveState === "not-production-pass-evidence-archived"
        ? "Use this stable archive as the Node-side handoff, then let Java v49 and mini-kv v50 add fresh read-only evidence."
        : "Verify the archive before using it in any real read-only probe window.",
    },
  ];
}

function addMessage(
  messages: ProductionPassEvidenceArchiveMessage[],
  condition: boolean,
  code: string,
  source: ProductionPassEvidenceArchiveMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function countArchiveChecks(
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile["checks"],
): number {
  return Object.keys(checks).length;
}

function countPassedArchiveChecks(
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveProfile["checks"],
): number {
  return Object.values(checks).filter(Boolean).length;
}

function digestArchive(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderMessages(
  messages: ProductionPassEvidenceArchiveMessage[],
  emptyText: string,
): string[] {
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
