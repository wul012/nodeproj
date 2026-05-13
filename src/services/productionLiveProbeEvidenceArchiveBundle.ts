import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeEvidenceArchive,
} from "./productionLiveProbeEvidenceArchive.js";
import {
  loadProductionLiveProbeEvidenceArchiveVerification,
} from "./productionLiveProbeEvidenceArchiveVerification.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeEvidenceArchiveBundleProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-evidence-archive-bundle.v1";
  readyForArchiveBundle: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  bundle: {
    bundleDigest: string;
    archiveDigest: string;
    verificationDigest: string;
    liveProbeEvidenceMode: "pass" | "skipped" | "mixed";
    plannedProbeCount: number;
    skippedProbeCount: number;
    sourceArtifactCount: number;
    referencedPathCount: number;
    skippedEvidenceNotProductionPass: boolean;
    readyForProductionOperations: false;
  };
  checks: {
    archiveRecordReady: boolean;
    archiveVerificationReady: boolean;
    archiveDigestValid: boolean;
    verificationDigestValid: boolean;
    archiveDigestMatchesVerification: boolean;
    sourceArtifactRefsPresent: boolean;
    sourceArtifactFilesExist: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
    bundleDigestValid: boolean;
    readyForArchiveBundle: boolean;
  };
  artifacts: {
    archiveRecord: {
      profileVersion: "production-live-probe-evidence-archive.v1";
      endpoint: string;
      archiveDigest: string;
      readyForArchiveRecord: boolean;
    };
    archiveVerification: {
      profileVersion: "production-live-probe-evidence-archive-verification.v1";
      endpoint: string;
      verificationDigest: string;
      readyForArchiveVerification: boolean;
    };
    referencedFiles: ProductionLiveProbeArchiveBundleFileRef[];
  };
  summary: {
    sourceArtifactCount: number;
    referencedFileCount: number;
    existingReferencedFileCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeEvidenceArchiveBundleMessage[];
  warnings: ProductionLiveProbeEvidenceArchiveBundleMessage[];
  recommendations: ProductionLiveProbeEvidenceArchiveBundleMessage[];
  evidenceEndpoints: {
    productionLiveProbeEvidenceArchiveBundleJson: string;
    productionLiveProbeEvidenceArchiveBundleMarkdown: string;
    productionLiveProbeEvidenceArchiveJson: string;
    productionLiveProbeEvidenceArchiveVerificationJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeArchiveBundleFileRef {
  id:
    | "v138-screenshot"
    | "v138-runbook"
    | "v139-screenshot"
    | "v139-runbook"
    | "v140-screenshot-planned"
    | "v140-runbook-planned";
  role: "source-evidence" | "bundle-output";
  path: string;
  requiredNow: boolean;
  exists: boolean;
}

export interface ProductionLiveProbeEvidenceArchiveBundleMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "live-probe-evidence-archive"
    | "live-probe-archive-verification"
    | "live-probe-archive-bundle"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeEvidenceArchiveBundleJson: "/api/v1/production/live-probe-evidence-archive/bundle",
  productionLiveProbeEvidenceArchiveBundleMarkdown: "/api/v1/production/live-probe-evidence-archive/bundle?format=markdown",
  productionLiveProbeEvidenceArchiveJson: "/api/v1/production/live-probe-evidence-archive",
  productionLiveProbeEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-evidence-archive/verification",
});

export async function loadProductionLiveProbeEvidenceArchiveBundle(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeEvidenceArchiveBundleProfile> {
  const archive = await loadProductionLiveProbeEvidenceArchive(input);
  const verification = await loadProductionLiveProbeEvidenceArchiveVerification(input);
  const referencedFiles = createReferencedFiles();
  const requiredFiles = referencedFiles.filter((file) => file.requiredNow);
  const checks = {
    archiveRecordReady: archive.readyForArchiveRecord,
    archiveVerificationReady: verification.readyForArchiveVerification,
    archiveDigestValid: archive.checks.archiveDigestValid,
    verificationDigestValid: verification.checks.verificationDigestValid,
    archiveDigestMatchesVerification: archive.archive.archiveDigest === verification.verification.archiveDigest,
    sourceArtifactRefsPresent: requiredFiles.length === 4,
    sourceArtifactFilesExist: requiredFiles.every((file) => file.exists),
    noWriteProbeAttempted: archive.archive.writeProbeAttempted === false
      && verification.verification.writeProbeAttempted === false
      && verification.checks.noWriteProbeAttempted,
    upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
      && verification.checks.upstreamActionsStillDisabled,
    skippedEvidenceNotProductionPass: archive.checks.skippedEvidenceNotProductionPass
      && verification.checks.skippedEvidenceNotProductionPass
      && archive.readyForProductionOperations === false
      && verification.readyForProductionOperations === false,
    bundleDigestValid: false,
    readyForArchiveBundle: false,
  };
  checks.readyForArchiveBundle = checks.archiveRecordReady
    && checks.archiveVerificationReady
    && checks.archiveDigestValid
    && checks.verificationDigestValid
    && checks.archiveDigestMatchesVerification
    && checks.sourceArtifactRefsPresent
    && checks.sourceArtifactFilesExist
    && checks.noWriteProbeAttempted
    && checks.upstreamActionsStillDisabled
    && checks.skippedEvidenceNotProductionPass;
  const bundleDigest = digestBundle({
    profileVersion: "production-live-probe-evidence-archive-bundle.v1",
    archiveDigest: archive.archive.archiveDigest,
    verificationDigest: verification.verification.verificationDigest,
    liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
    plannedProbeCount: archive.archive.plannedProbeCount,
    skippedProbeCount: archive.archive.skippedProbeCount,
    sourceArtifacts: [
      archive.profileVersion,
      verification.profileVersion,
    ],
    referencedFiles: requiredFiles.map((file) => ({
      id: file.id,
      path: file.path,
      requiredNow: file.requiredNow,
      exists: file.exists,
    })),
    skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
    readyForProductionOperations: false,
    checks: {
      ...checks,
      bundleDigestValid: undefined,
      readyForArchiveBundle: checks.readyForArchiveBundle,
    },
  });
  checks.bundleDigestValid = /^[a-f0-9]{64}$/.test(bundleDigest);
  checks.readyForArchiveBundle = checks.readyForArchiveBundle && checks.bundleDigestValid;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(archive.archive.liveProbeEvidenceMode);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production live probe evidence archive bundle",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-evidence-archive-bundle.v1",
    readyForArchiveBundle: checks.readyForArchiveBundle,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    bundle: {
      bundleDigest,
      archiveDigest: archive.archive.archiveDigest,
      verificationDigest: verification.verification.verificationDigest,
      liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
      plannedProbeCount: archive.archive.plannedProbeCount,
      skippedProbeCount: archive.archive.skippedProbeCount,
      sourceArtifactCount: 2,
      referencedPathCount: referencedFiles.length,
      skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
      readyForProductionOperations: false,
    },
    checks,
    artifacts: {
      archiveRecord: {
        profileVersion: archive.profileVersion,
        endpoint: ENDPOINTS.productionLiveProbeEvidenceArchiveJson,
        archiveDigest: archive.archive.archiveDigest,
        readyForArchiveRecord: archive.readyForArchiveRecord,
      },
      archiveVerification: {
        profileVersion: verification.profileVersion,
        endpoint: ENDPOINTS.productionLiveProbeEvidenceArchiveVerificationJson,
        verificationDigest: verification.verification.verificationDigest,
        readyForArchiveVerification: verification.readyForArchiveVerification,
      },
      referencedFiles,
    },
    summary: {
      sourceArtifactCount: 2,
      referencedFileCount: referencedFiles.length,
      existingReferencedFileCount: referencedFiles.filter((file) => file.exists).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this bundle as the closeout artifact for the live probe evidence archive stage.",
      "Do not add another production readiness summary until a broader stage needs a true aggregate summary.",
      "Move toward explicit user-started read-only live smoke only when Java and mini-kv are intentionally running.",
    ],
  };
}

export function renderProductionLiveProbeEvidenceArchiveBundleMarkdown(
  profile: ProductionLiveProbeEvidenceArchiveBundleProfile,
): string {
  return [
    "# Production live probe evidence archive bundle",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for archive bundle: ${profile.readyForArchiveBundle}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Bundle",
    "",
    ...renderEntries(profile.bundle),
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
    "### Archive verification",
    "",
    ...renderEntries(profile.artifacts.archiveVerification),
    "",
    "### Referenced files",
    "",
    ...profile.artifacts.referencedFiles.map(renderFileRef),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No live probe archive bundle blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No live probe archive bundle warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No live probe archive bundle recommendations."),
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

function createReferencedFiles(): ProductionLiveProbeArchiveBundleFileRef[] {
  const refs: Array<Omit<ProductionLiveProbeArchiveBundleFileRef, "exists">> = [
    {
      id: "v138-screenshot",
      role: "source-evidence",
      path: "b/138/图片/production-live-probe-evidence-archive.png",
      requiredNow: true,
    },
    {
      id: "v138-runbook",
      role: "source-evidence",
      path: "b/138/解释/运行调试说明.md",
      requiredNow: true,
    },
    {
      id: "v139-screenshot",
      role: "source-evidence",
      path: "b/139/图片/production-live-probe-evidence-archive-verification.png",
      requiredNow: true,
    },
    {
      id: "v139-runbook",
      role: "source-evidence",
      path: "b/139/解释/运行调试说明.md",
      requiredNow: true,
    },
    {
      id: "v140-screenshot-planned",
      role: "bundle-output",
      path: "b/140/图片/production-live-probe-evidence-archive-bundle.png",
      requiredNow: false,
    },
    {
      id: "v140-runbook-planned",
      role: "bundle-output",
      path: "b/140/解释/运行调试说明.md",
      requiredNow: false,
    },
  ];

  return refs.map((ref) => ({
    ...ref,
    exists: existsSync(path.join(process.cwd(), ref.path)),
  }));
}

function collectProductionBlockers(
  checks: ProductionLiveProbeEvidenceArchiveBundleProfile["checks"],
): ProductionLiveProbeEvidenceArchiveBundleMessage[] {
  const blockers: ProductionLiveProbeEvidenceArchiveBundleMessage[] = [];
  addMessage(blockers, checks.archiveRecordReady, "LIVE_PROBE_ARCHIVE_RECORD_NOT_READY", "live-probe-evidence-archive", "Archive record must be ready before bundling.");
  addMessage(blockers, checks.archiveVerificationReady, "LIVE_PROBE_ARCHIVE_VERIFICATION_NOT_READY", "live-probe-archive-verification", "Archive verification must be ready before bundling.");
  addMessage(blockers, checks.archiveDigestValid, "LIVE_PROBE_ARCHIVE_DIGEST_INVALID", "live-probe-evidence-archive", "Archive digest must be valid before bundling.");
  addMessage(blockers, checks.verificationDigestValid, "LIVE_PROBE_VERIFICATION_DIGEST_INVALID", "live-probe-archive-verification", "Verification digest must be valid before bundling.");
  addMessage(blockers, checks.archiveDigestMatchesVerification, "LIVE_PROBE_ARCHIVE_DIGEST_MISMATCH", "live-probe-archive-bundle", "Archive digest must match the digest referenced by verification.");
  addMessage(blockers, checks.sourceArtifactRefsPresent, "LIVE_PROBE_SOURCE_REFS_MISSING", "live-probe-archive-bundle", "Bundle must reference v138 and v139 screenshots and runbooks.");
  addMessage(blockers, checks.sourceArtifactFilesExist, "LIVE_PROBE_SOURCE_FILES_MISSING", "live-probe-archive-bundle", "Referenced v138 and v139 source files must exist.");
  addMessage(blockers, checks.noWriteProbeAttempted, "LIVE_PROBE_WRITE_ATTEMPTED", "live-probe-archive-bundle", "Bundle must prove no write probe was attempted.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for the bundle.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "live-probe-archive-bundle", "Skipped live probe evidence must not be treated as production pass evidence.");
  addMessage(blockers, checks.bundleDigestValid, "LIVE_PROBE_BUNDLE_DIGEST_INVALID", "live-probe-archive-bundle", "Bundle digest must be a valid sha256 hex digest.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeEvidenceArchiveBundleProfile["bundle"]["liveProbeEvidenceMode"],
): ProductionLiveProbeEvidenceArchiveBundleMessage[] {
  return [
    {
      code: mode === "pass"
        ? "LIVE_PROBE_BUNDLE_PASS_CONNECTIONS_STILL_GATED"
        : "LIVE_PROBE_BUNDLE_SKIPPED_NOT_PRODUCTION_PASS",
      severity: "warning",
      source: "live-probe-archive-bundle",
      message: mode === "pass"
        ? "Bundle contains read-only live probe pass evidence while production operations remain gated."
        : "Bundle contains skipped live probe evidence for local archive closeout, not production pass evidence.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeEvidenceArchiveBundleMessage[] {
  return [
    {
      code: "PLAN_REAL_READ_ONLY_LIVE_SMOKE_SEPARATELY",
      severity: "recommendation",
      source: "live-probe-archive-bundle",
      message: "Plan real read-only live smoke separately and only when Java and mini-kv are intentionally running.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeEvidenceArchiveBundleMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeEvidenceArchiveBundleMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestBundle(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderFileRef(file: ProductionLiveProbeArchiveBundleFileRef): string {
  return `- ${file.id}: role=${file.role}, requiredNow=${file.requiredNow}, exists=${file.exists}, path=${file.path}`;
}

function renderMessages(messages: ProductionLiveProbeEvidenceArchiveBundleMessage[], emptyText: string): string[] {
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
