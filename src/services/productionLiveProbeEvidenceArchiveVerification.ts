import { createHash } from "node:crypto";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeEvidenceArchive,
} from "./productionLiveProbeEvidenceArchive.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-evidence-archive-verification.v1";
  readyForArchiveVerification: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    archiveDigest: string;
    archiveProfileVersion: "production-live-probe-evidence-archive.v1";
    liveProbeEvidenceMode: "pass" | "skipped" | "mixed";
    plannedProbeCount: number;
    passedProbeCount: number;
    skippedProbeCount: number;
    blockedProbeCount: number;
    writeProbeAttempted: false;
    upstreamActionsEnabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
  };
  checks: {
    archiveRecordReady: boolean;
    archiveDigestValid: boolean;
    contractVersionMatchesArchive: boolean;
    smokeHarnessVersionMatchesArchive: boolean;
    summaryV13VersionMatchesArchive: boolean;
    probeCountMatchesArtifacts: boolean;
    passOrSkippedOnly: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
    verificationDigestValid: boolean;
    readyForArchiveVerification: boolean;
  };
  artifacts: {
    archiveRecord: {
      profileVersion: "production-live-probe-evidence-archive.v1";
      readyForArchiveRecord: boolean;
      archiveDigest: string;
      liveProbeEvidenceMode: "pass" | "skipped" | "mixed";
    };
    versionReferences: {
      contractProfileVersion: string;
      smokeHarnessProfileVersion: string;
      summaryVersion: string;
    };
    evidenceState: {
      plannedProbeCount: number;
      smokeProbeCount: number;
      skippedProbeCount: number;
      blockedProbeCount: number;
      readyForProductionOperations: false;
    };
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeEvidenceArchiveVerificationMessage[];
  warnings: ProductionLiveProbeEvidenceArchiveVerificationMessage[];
  recommendations: ProductionLiveProbeEvidenceArchiveVerificationMessage[];
  evidenceEndpoints: {
    productionLiveProbeEvidenceArchiveVerificationJson: string;
    productionLiveProbeEvidenceArchiveVerificationMarkdown: string;
    productionLiveProbeEvidenceArchiveJson: string;
    productionLiveProbeReadinessContractJson: string;
    productionLiveProbeSmokeHarnessJson: string;
    productionReadinessSummaryV13Json: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeEvidenceArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "live-probe-evidence-archive"
    | "live-probe-archive-verification"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-evidence-archive/verification",
  productionLiveProbeEvidenceArchiveVerificationMarkdown: "/api/v1/production/live-probe-evidence-archive/verification?format=markdown",
  productionLiveProbeEvidenceArchiveJson: "/api/v1/production/live-probe-evidence-archive",
  productionLiveProbeReadinessContractJson: "/api/v1/production/live-probe-readiness-contract",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
  productionReadinessSummaryV13Json: "/api/v1/production/readiness-summary-v13",
});

export async function loadProductionLiveProbeEvidenceArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeEvidenceArchiveVerificationProfile> {
  const archive = await loadProductionLiveProbeEvidenceArchive(input);
  const checks = {
    archiveRecordReady: archive.readyForArchiveRecord,
    archiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.archiveDigest),
    contractVersionMatchesArchive: archive.archive.contractProfileVersion === archive.artifacts.liveProbeReadinessContract.profileVersion
      && archive.archive.contractProfileVersion === "production-live-probe-readiness-contract.v1",
    smokeHarnessVersionMatchesArchive: archive.archive.smokeHarnessProfileVersion === archive.artifacts.liveProbeSmokeHarness.profileVersion
      && archive.archive.smokeHarnessProfileVersion === "production-live-probe-smoke-harness.v1",
    summaryV13VersionMatchesArchive: archive.archive.summaryVersion === archive.artifacts.productionReadinessSummaryV13.summaryVersion
      && archive.archive.summaryVersion === "production-readiness-summary.v13",
    probeCountMatchesArtifacts: archive.archive.plannedProbeCount === archive.artifacts.liveProbeReadinessContract.plannedProbeCount
      && archive.archive.plannedProbeCount === archive.artifacts.liveProbeSmokeHarness.probeCount,
    passOrSkippedOnly: archive.archive.blockedProbeCount === 0
      && archive.checks.smokePassOrSkippedOnly,
    noWriteProbeAttempted: archive.archive.writeProbeAttempted === false
      && archive.artifacts.liveProbeReadinessContract.writeProbeCount === 0
      && archive.artifacts.liveProbeSmokeHarness.writeProbeAttempted === false
      && archive.checks.liveProbeWritesAttempted === false,
    upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
      && archive.checks.upstreamActionsStillDisabled,
    skippedEvidenceNotProductionPass: archive.checks.skippedEvidenceNotProductionPass
      && (archive.archive.skippedProbeCount === 0 || archive.readyForProductionOperations === false)
      && (archive.archive.skippedProbeCount === 0 || archive.artifacts.productionReadinessSummaryV13.readyForProductionOperations === false),
    verificationDigestValid: false,
    readyForArchiveVerification: false,
  };
  checks.readyForArchiveVerification = checks.archiveRecordReady
    && checks.archiveDigestValid
    && checks.contractVersionMatchesArchive
    && checks.smokeHarnessVersionMatchesArchive
    && checks.summaryV13VersionMatchesArchive
    && checks.probeCountMatchesArtifacts
    && checks.passOrSkippedOnly
    && checks.noWriteProbeAttempted
    && checks.upstreamActionsStillDisabled
    && checks.skippedEvidenceNotProductionPass;
  const verificationDigest = digestVerification({
    profileVersion: "production-live-probe-evidence-archive-verification.v1",
    archiveDigest: archive.archive.archiveDigest,
    liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
    plannedProbeCount: archive.archive.plannedProbeCount,
    passedProbeCount: archive.archive.passedProbeCount,
    skippedProbeCount: archive.archive.skippedProbeCount,
    blockedProbeCount: archive.archive.blockedProbeCount,
    writeProbeAttempted: archive.archive.writeProbeAttempted,
    upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
    skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
    checks: {
      ...checks,
      verificationDigestValid: undefined,
      readyForArchiveVerification: checks.readyForArchiveVerification,
    },
  });
  checks.verificationDigestValid = /^[a-f0-9]{64}$/.test(verificationDigest);
  checks.readyForArchiveVerification = checks.readyForArchiveVerification && checks.verificationDigestValid;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(archive.archive.liveProbeEvidenceMode);
  const recommendations = collectRecommendations();
  const checkValues = Object.entries(checks)
    .filter(([key]) => key !== "readyForArchiveVerification")
    .map(([, value]) => value);

  return {
    service: "orderops-node",
    title: "Production live probe evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-evidence-archive-verification.v1",
    readyForArchiveVerification: checks.readyForArchiveVerification,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      archiveDigest: archive.archive.archiveDigest,
      archiveProfileVersion: archive.profileVersion,
      liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
      plannedProbeCount: archive.archive.plannedProbeCount,
      passedProbeCount: archive.archive.passedProbeCount,
      skippedProbeCount: archive.archive.skippedProbeCount,
      blockedProbeCount: archive.archive.blockedProbeCount,
      writeProbeAttempted: false,
      upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
      skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
    },
    checks,
    artifacts: {
      archiveRecord: {
        profileVersion: archive.profileVersion,
        readyForArchiveRecord: archive.readyForArchiveRecord,
        archiveDigest: archive.archive.archiveDigest,
        liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
      },
      versionReferences: {
        contractProfileVersion: archive.archive.contractProfileVersion,
        smokeHarnessProfileVersion: archive.archive.smokeHarnessProfileVersion,
        summaryVersion: archive.archive.summaryVersion,
      },
      evidenceState: {
        plannedProbeCount: archive.archive.plannedProbeCount,
        smokeProbeCount: archive.artifacts.liveProbeSmokeHarness.probeCount,
        skippedProbeCount: archive.archive.skippedProbeCount,
        blockedProbeCount: archive.archive.blockedProbeCount,
        readyForProductionOperations: archive.readyForProductionOperations,
      },
    },
    summary: {
      checkCount: checkValues.length,
      passedCheckCount: checkValues.filter(Boolean).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this verification profile as the checked input to the live probe evidence archive bundle.",
      "Keep skipped probe verification separate from production pass evidence.",
      "Do not add write probes or enable upstream actions while live probe evidence is still being archived.",
    ],
  };
}

export function renderProductionLiveProbeEvidenceArchiveVerificationMarkdown(
  profile: ProductionLiveProbeEvidenceArchiveVerificationProfile,
): string {
  return [
    "# Production live probe evidence archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for archive verification: ${profile.readyForArchiveVerification}`,
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
    "### Archive record",
    "",
    ...renderEntries(profile.artifacts.archiveRecord),
    "",
    "### Version references",
    "",
    ...renderEntries(profile.artifacts.versionReferences),
    "",
    "### Evidence state",
    "",
    ...renderEntries(profile.artifacts.evidenceState),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No live probe archive verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No live probe archive verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No live probe archive verification recommendations."),
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
  checks: ProductionLiveProbeEvidenceArchiveVerificationProfile["checks"],
): ProductionLiveProbeEvidenceArchiveVerificationMessage[] {
  const blockers: ProductionLiveProbeEvidenceArchiveVerificationMessage[] = [];
  addMessage(blockers, checks.archiveRecordReady, "LIVE_PROBE_ARCHIVE_RECORD_NOT_READY", "live-probe-evidence-archive", "Live probe archive record must be ready before verification can pass.");
  addMessage(blockers, checks.archiveDigestValid, "LIVE_PROBE_ARCHIVE_DIGEST_INVALID", "live-probe-evidence-archive", "Archive digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.contractVersionMatchesArchive, "LIVE_PROBE_CONTRACT_VERSION_MISMATCH", "live-probe-archive-verification", "Contract profileVersion must match the archive record and v135 contract.");
  addMessage(blockers, checks.smokeHarnessVersionMatchesArchive, "LIVE_PROBE_SMOKE_VERSION_MISMATCH", "live-probe-archive-verification", "Smoke harness profileVersion must match the archive record and v136 harness.");
  addMessage(blockers, checks.summaryV13VersionMatchesArchive, "SUMMARY_V13_VERSION_MISMATCH", "live-probe-archive-verification", "Summary version must match the archive record and v13 summary.");
  addMessage(blockers, checks.probeCountMatchesArtifacts, "LIVE_PROBE_COUNT_MISMATCH", "live-probe-archive-verification", "Archive planned probe count must match contract and smoke artifacts.");
  addMessage(blockers, checks.passOrSkippedOnly, "LIVE_PROBE_BLOCKED_RESULT_PRESENT", "live-probe-evidence-archive", "Archive verification accepts only pass or skipped live probe results.");
  addMessage(blockers, checks.noWriteProbeAttempted, "LIVE_PROBE_WRITE_ATTEMPTED", "live-probe-archive-verification", "Live probe archive verification must prove no write probe was attempted.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for archive verification.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "live-probe-archive-verification", "Skipped live probe evidence must not be treated as production pass evidence.");
  addMessage(blockers, checks.verificationDigestValid, "LIVE_PROBE_VERIFICATION_DIGEST_INVALID", "live-probe-archive-verification", "Verification digest must be a valid sha256 hex digest.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeEvidenceArchiveVerificationProfile["verification"]["liveProbeEvidenceMode"],
): ProductionLiveProbeEvidenceArchiveVerificationMessage[] {
  return [
    {
      code: mode === "pass"
        ? "LIVE_PROBE_ARCHIVE_PASS_VERIFIED_CONNECTIONS_STILL_GATED"
        : "LIVE_PROBE_ARCHIVE_SKIPPED_VERIFIED_NOT_PRODUCTION_PASS",
      severity: "warning",
      source: "live-probe-archive-verification",
      message: mode === "pass"
        ? "Read-only live probe pass archive is verified while production operations remain gated."
        : "Skipped live probe archive is verified for local evidence, but it is not production pass evidence.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeEvidenceArchiveVerificationMessage[] {
  return [
    {
      code: "BUNDLE_VERIFIED_LIVE_PROBE_ARCHIVE_NEXT",
      severity: "recommendation",
      source: "live-probe-archive-verification",
      message: "Package the archive record and verification into a live probe evidence archive bundle next.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeEvidenceArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeEvidenceArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestVerification(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderMessages(messages: ProductionLiveProbeEvidenceArchiveVerificationMessage[], emptyText: string): string[] {
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
