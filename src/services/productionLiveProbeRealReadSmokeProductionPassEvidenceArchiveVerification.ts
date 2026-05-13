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
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive,
} from "./productionLiveProbeRealReadSmokeProductionPassEvidenceArchive.js";

export interface ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive-verification.v1";
  verificationState: "verified-production-pass-archive" | "verified-non-pass-archive" | "blocked";
  readyForArchiveVerification: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    archiveDigest: string;
    expectedArchiveDigest: string;
    archiveProfileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1";
    archiveState: "production-pass-evidence-archived" | "not-production-pass-evidence-archived" | "blocked";
    captureMode: "pass" | "mixed" | "skipped" | "blocked";
    archivedAsProductionPassEvidence: boolean;
    upstreamEvidenceReady: boolean;
    upstreamEvidenceReferenceMode: "static-version-reference";
    runtimeFileRead: false;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    readOnlyWindowOpen: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
  };
  checks: {
    archiveDigestValid: boolean;
    archiveDigestMatches: boolean;
    archiveProfileVersionValid: boolean;
    archiveReadyForVerification: boolean;
    archiveChecksAllPassed: boolean;
    archiveProductionBlockersClear: boolean;
    skippedOrMixedRemainsNonPass: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    javaV49EvidenceReferenceReady: boolean;
    miniKvV58EvidenceReferenceReady: boolean;
    upstreamEvidenceReady: boolean;
    readyForArchiveVerification: boolean;
  };
  artifacts: {
    archive: {
      profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1";
      archiveDigest: string;
      archiveState: "production-pass-evidence-archived" | "not-production-pass-evidence-archived" | "blocked";
      readyForProductionPassEvidenceArchive: boolean;
      readyForProductionOperations: false;
    };
    javaEvidence: UpstreamEvidenceReference;
    miniKvEvidence: UpstreamEvidenceReference;
  };
  summary: {
    verificationCheckCount: number;
    passedVerificationCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionArchiveVerificationMessage[];
  warnings: ProductionArchiveVerificationMessage[];
  recommendations: ProductionArchiveVerificationMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationMarkdown: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationJson: string;
  };
  nextActions: string[];
}

export interface UpstreamEvidenceReference {
  project: "advanced-order-platform" | "mini-kv";
  plannedVersion: "Java v49" | "mini-kv v58";
  tag: string;
  commitRole: string;
  evidenceKind: "ops-read-only-evidence-sample" | "readonly-fixture-pack";
  samplePaths: string[];
  readOnly: true;
  executionAllowed: false;
  productionPassEvidence: false;
  runtimeFileRead: false;
}

export interface ProductionArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-pass-evidence-archive"
    | "archive-verification"
    | "java-v49-evidence"
    | "mini-kv-v58-evidence"
    | "runtime-config";
  message: string;
}

const JAVA_V49_EVIDENCE: UpstreamEvidenceReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v49",
  tag: "v49订单平台ops-read-only-evidence-sample",
  commitRole: "ops read-only evidence sample",
  evidenceKind: "ops-read-only-evidence-sample",
  samplePaths: [
    "/contracts/ops-read-only-evidence.sample.json",
    "/api/v1/ops/evidence",
    "/api/v1/failed-events/replay-evidence-index",
  ],
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
});

const MINI_KV_V58_EVIDENCE: UpstreamEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v58",
  tag: "第五十八版只读证据样本包",
  commitRole: "readonly evidence fixtures",
  evidenceKind: "readonly-fixture-pack",
  samplePaths: [
    "fixtures/readonly/index.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/readonly/statsjson-empty-inline.json",
    "fixtures/checkjson/get-orderops-read-contract.json",
  ],
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
});

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationMarkdown: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification?format=markdown",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive",
  productionLiveProbeRealReadSmokeProductionPassEvidenceVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification",
});

export async function loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile> {
  const archive = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive(input);
  const expectedArchiveDigest = digestArchive({
    profileVersion: archive.profileVersion,
    verificationDigest: archive.archive.verificationDigest,
    captureDigest: archive.archive.captureDigest,
    releaseEvidenceGateDigest: archive.archive.releaseEvidenceGateDigest,
    archiveState: archive.archiveState,
    archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
    verificationState: archive.archive.verificationState,
    captureMode: archive.archive.captureMode,
    releaseGateDecision: archive.archive.releaseGateDecision,
    upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
    readyForProductionOperations: archive.readyForProductionOperations,
    checks: archive.checks,
  });
  const checks = {
    archiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.archiveDigest),
    archiveDigestMatches: archive.archive.archiveDigest === expectedArchiveDigest,
    archiveProfileVersionValid: archive.profileVersion === "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1",
    archiveReadyForVerification: archive.readyForProductionPassEvidenceArchive,
    archiveChecksAllPassed: archive.summary.archiveCheckCount === archive.summary.passedArchiveCheckCount,
    archiveProductionBlockersClear: archive.summary.productionBlockerCount === 0,
    skippedOrMixedRemainsNonPass: archive.archive.captureMode === "pass"
      || archive.archive.archivedAsProductionPassEvidence === false,
    upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
      && archive.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: archive.archive.automaticUpstreamStart === false
      && archive.checks.noAutomaticUpstreamStart,
    readyForProductionOperationsStillFalse: archive.readyForProductionOperations === false,
    javaV49EvidenceReferenceReady: isUpstreamEvidenceReferenceReady(JAVA_V49_EVIDENCE),
    miniKvV58EvidenceReferenceReady: isUpstreamEvidenceReferenceReady(MINI_KV_V58_EVIDENCE),
    upstreamEvidenceReady: false,
    readyForArchiveVerification: false,
  };
  checks.upstreamEvidenceReady = checks.javaV49EvidenceReferenceReady
    && checks.miniKvV58EvidenceReferenceReady;
  checks.readyForArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForArchiveVerification")
    .every(([, value]) => value);
  const verificationState = !checks.readyForArchiveVerification || archive.archiveState === "blocked"
    ? "blocked"
    : archive.archive.archivedAsProductionPassEvidence
      ? "verified-production-pass-archive"
      : "verified-non-pass-archive";
  const verificationDigest = digestVerification({
    profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive-verification.v1",
    archiveDigest: archive.archive.archiveDigest,
    expectedArchiveDigest,
    verificationState,
    archiveState: archive.archiveState,
    archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
    javaTag: JAVA_V49_EVIDENCE.tag,
    miniKvTag: MINI_KV_V58_EVIDENCE.tag,
    upstreamEvidenceReady: checks.upstreamEvidenceReady,
    readyForProductionOperations: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, archive.archiveState);
  const warnings = collectWarnings(verificationState, archive.archive.captureMode);
  const recommendations = collectRecommendations(checks.upstreamEvidenceReady);

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke production pass evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive-verification.v1",
    verificationState,
    readyForArchiveVerification: checks.readyForArchiveVerification,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      archiveDigest: archive.archive.archiveDigest,
      expectedArchiveDigest,
      archiveProfileVersion: archive.profileVersion,
      archiveState: archive.archiveState,
      captureMode: archive.archive.captureMode,
      archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
      upstreamEvidenceReady: checks.upstreamEvidenceReady,
      upstreamEvidenceReferenceMode: "static-version-reference",
      runtimeFileRead: false,
      upstreamProbesEnabled: archive.archive.upstreamProbesEnabled,
      upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
      readOnlyWindowOpen: archive.archive.readOnlyWindowOpen,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
    },
    checks,
    artifacts: {
      archive: {
        profileVersion: archive.profileVersion,
        archiveDigest: archive.archive.archiveDigest,
        archiveState: archive.archiveState,
        readyForProductionPassEvidenceArchive: archive.readyForProductionPassEvidenceArchive,
        readyForProductionOperations: archive.readyForProductionOperations,
      },
      javaEvidence: { ...JAVA_V49_EVIDENCE },
      miniKvEvidence: { ...MINI_KV_V58_EVIDENCE },
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
      "Use Java v49 and mini-kv v58 references as versioned evidence inputs for Node v153 runbook planning.",
      "Keep archive verification separate from production operations; this profile never enables writes.",
      "If live upstream capture is needed, open a deliberate read-only window and keep UPSTREAM_ACTIONS_ENABLED=false.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationMarkdown(
  profile: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
): string {
  return [
    "# Production live probe real-read smoke production pass evidence archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
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
    "### Archive",
    "",
    ...renderEntries(profile.artifacts.archive),
    "",
    "### Java evidence",
    "",
    ...renderEntries(profile.artifacts.javaEvidence),
    "",
    "### mini-kv evidence",
    "",
    ...renderEntries(profile.artifacts.miniKvEvidence),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No production pass evidence archive verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No production pass evidence archive verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No production pass evidence archive verification recommendations."),
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

function isUpstreamEvidenceReferenceReady(reference: UpstreamEvidenceReference): boolean {
  return reference.readOnly === true
    && reference.executionAllowed === false
    && reference.productionPassEvidence === false
    && reference.runtimeFileRead === false
    && reference.samplePaths.length > 0
    && reference.tag.length > 0;
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["checks"],
  archiveState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verification"]["archiveState"],
): ProductionArchiveVerificationMessage[] {
  const blockers: ProductionArchiveVerificationMessage[] = [];
  addMessage(blockers, archiveState !== "blocked", "ARCHIVE_STATE_BLOCKED", "production-pass-evidence-archive", "The source archive must not be blocked.");
  addMessage(blockers, checks.archiveDigestValid, "ARCHIVE_DIGEST_INVALID", "production-pass-evidence-archive", "Archive digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.archiveDigestMatches, "ARCHIVE_DIGEST_MISMATCH", "archive-verification", "Recomputed archive digest must match the archived digest.");
  addMessage(blockers, checks.archiveProfileVersionValid, "ARCHIVE_PROFILE_VERSION_INVALID", "production-pass-evidence-archive", "Archive profile version must match v150.");
  addMessage(blockers, checks.archiveReadyForVerification, "ARCHIVE_NOT_READY", "production-pass-evidence-archive", "Archive must be ready before verification can pass.");
  addMessage(blockers, checks.archiveChecksAllPassed, "ARCHIVE_CHECKS_NOT_ALL_PASSED", "production-pass-evidence-archive", "All source archive checks must pass.");
  addMessage(blockers, checks.archiveProductionBlockersClear, "ARCHIVE_HAS_BLOCKERS", "production-pass-evidence-archive", "Source archive blockers must be clear.");
  addMessage(blockers, checks.skippedOrMixedRemainsNonPass, "SKIPPED_OR_MIXED_ARCHIVE_PROMOTED", "archive-verification", "Skipped or mixed evidence must remain non-pass.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "archive-verification", "Verification must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Verification must not unlock production operations.");
  addMessage(blockers, checks.javaV49EvidenceReferenceReady, "JAVA_V49_EVIDENCE_REFERENCE_NOT_READY", "java-v49-evidence", "Java v49 evidence reference must be present and read-only.");
  addMessage(blockers, checks.miniKvV58EvidenceReferenceReady, "MINI_KV_V58_EVIDENCE_REFERENCE_NOT_READY", "mini-kv-v58-evidence", "mini-kv v58 evidence reference must be present and read-only.");
  return blockers;
}

function collectWarnings(
  verificationState: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verificationState"],
  captureMode: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile["verification"]["captureMode"],
): ProductionArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "verified-production-pass-archive"
        ? "PASS_ARCHIVE_VERIFIED"
        : "NON_PASS_ARCHIVE_VERIFIED",
      severity: "warning",
      source: "archive-verification",
      message: verificationState === "verified-production-pass-archive"
        ? "The archive verifies as pass evidence, but production operations remain separately gated."
        : "The archive verifies as non-pass evidence and must not be promoted.",
    },
    {
      code: captureMode === "pass"
        ? "CAPTURE_MODE_PASS"
        : "CAPTURE_MODE_NOT_PASS",
      severity: "warning",
      source: "production-pass-evidence-archive",
      message: captureMode === "pass"
        ? "Capture mode is pass; keep operation gates independent."
        : "Capture mode is not pass; this remains local traceability evidence.",
    },
    {
      code: "UPSTREAM_REFERENCES_STATIC",
      severity: "warning",
      source: "archive-verification",
      message: "Java and mini-kv evidence are version references captured by development-time read-only checks, not runtime filesystem reads.",
    },
  ];
}

function collectRecommendations(upstreamEvidenceReady: boolean): ProductionArchiveVerificationMessage[] {
  return [
    {
      code: upstreamEvidenceReady
        ? "PROCEED_TO_OPERATOR_RUNBOOK"
        : "WAIT_FOR_UPSTREAM_EVIDENCE_TAGS",
      severity: "recommendation",
      source: "archive-verification",
      message: upstreamEvidenceReady
        ? "Proceed to Node v153 operator runbook planning with Java v49 and mini-kv v58 references."
        : "Wait for Java v49 and mini-kv v58 evidence references before runbook planning.",
    },
  ];
}

function addMessage(
  messages: ProductionArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: ProductionArchiveVerificationMessage["source"],
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
