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
import {
  createRealReadAdapterEvidenceArchiveDigestPayload,
  loadRealReadAdapterEvidenceArchive,
} from "./realReadAdapterEvidenceArchive.js";
import type { RealReadAdapterEvidenceArchiveProfile } from "./realReadAdapterEvidenceArchive.js";

export interface RealReadAdapterEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-evidence-archive-verification.v1";
  verificationState: "verified-closed-window-archive" | "verified-open-window-archive" | "blocked";
  readyForRealReadAdapterEvidenceArchiveVerification: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    storedArchiveDigest: string;
    recomputedArchiveDigest: string;
    sourceArchiveProfileVersion: RealReadAdapterEvidenceArchiveProfile["profileVersion"];
    sourceArchiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"];
    sourceAdapterDigest: string;
    sourceTaxonomyDigest: string;
    sourceOperatorWindowRunbookDigest: string;
    sourceRehearsalState: RealReadAdapterEvidenceArchiveProfile["archive"]["rehearsalState"];
    sourceTaxonomyState: RealReadAdapterEvidenceArchiveProfile["archive"]["taxonomyState"];
    archivedAsProductionPassEvidence: false;
    productionWriteAuthorized: false;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    classificationCoverageComplete: boolean;
    readOnlyWindowOpen: boolean;
    runtimeFileRead: false;
  };
  checks: {
    sourceArchiveReady: boolean;
    archiveDigestValid: boolean;
    archiveDigestMatches: boolean;
    sourceArchiveProfileVersionValid: boolean;
    adapterDigestValid: boolean;
    taxonomyDigestValid: boolean;
    operatorWindowRunbookDigestValid: boolean;
    classificationCoverageStillComplete: boolean;
    archiveChecksAllPassed: boolean;
    archiveProductionBlockersClear: boolean;
    closedWindowStillNonPass: boolean;
    productionPassStillFalse: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterEvidenceArchiveVerification: boolean;
  };
  artifacts: {
    archive: {
      profileVersion: RealReadAdapterEvidenceArchiveProfile["profileVersion"];
      archiveDigest: string;
      archiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"];
      readyForRealReadAdapterEvidenceArchive: boolean;
      readyForProductionOperations: false;
    };
    digestChain: {
      adapterDigest: string;
      taxonomyDigest: string;
      operatorWindowRunbookDigest: string;
      archiveDigest: string;
      verificationDigest: string;
    };
    classificationCoverage: {
      adapterRecordCount: number;
      taxonomyClassificationCount: number;
      distinctFailureClassCount: number;
      failureClasses: RealReadAdapterEvidenceArchiveProfile["artifacts"]["taxonomy"]["failureClasses"];
    };
  };
  summary: {
    verificationCheckCount: number;
    passedVerificationCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RealReadAdapterEvidenceArchiveVerificationMessage[];
  warnings: RealReadAdapterEvidenceArchiveVerificationMessage[];
  recommendations: RealReadAdapterEvidenceArchiveVerificationMessage[];
  evidenceEndpoints: {
    realReadAdapterEvidenceArchiveVerificationJson: string;
    realReadAdapterEvidenceArchiveVerificationMarkdown: string;
    realReadAdapterEvidenceArchiveJson: string;
    realReadAdapterRehearsalJson: string;
    realReadAdapterFailureTaxonomyJson: string;
  };
  nextActions: string[];
}

interface RealReadAdapterEvidenceArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-adapter-evidence-archive"
    | "real-read-adapter-evidence-archive-verification"
    | "real-read-adapter-rehearsal"
    | "real-read-adapter-failure-taxonomy"
    | "operator-window-runbook"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadAdapterEvidenceArchiveVerificationJson: "/api/v1/production/real-read-adapter-evidence-archive-verification",
  realReadAdapterEvidenceArchiveVerificationMarkdown: "/api/v1/production/real-read-adapter-evidence-archive-verification?format=markdown",
  realReadAdapterEvidenceArchiveJson: "/api/v1/production/real-read-adapter-evidence-archive",
  realReadAdapterRehearsalJson: "/api/v1/production/real-read-adapter-rehearsal",
  realReadAdapterFailureTaxonomyJson: "/api/v1/production/real-read-adapter-failure-taxonomy",
});

export async function loadRealReadAdapterEvidenceArchiveVerification(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<RealReadAdapterEvidenceArchiveVerificationProfile> {
  const archive = await loadRealReadAdapterEvidenceArchive(input);
  const recomputedArchiveDigest = sha256StableJson(createRealReadAdapterEvidenceArchiveDigestPayload({
    archiveState: archive.archiveState,
    adapterDigest: archive.archive.adapterDigest,
    taxonomyDigest: archive.archive.taxonomyDigest,
    operatorWindowRunbookDigest: archive.archive.operatorWindowRunbookDigest,
    rehearsalState: archive.archive.rehearsalState,
    taxonomyState: archive.archive.taxonomyState,
    failureClasses: archive.artifacts.taxonomy.failureClasses,
    checks: archive.checks,
  }));
  const checks = createChecks(archive, recomputedArchiveDigest);
  checks.readyForRealReadAdapterEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterEvidenceArchiveVerification")
    .every(([, value]) => value);
  const verificationState = determineVerificationState(archive, checks.readyForRealReadAdapterEvidenceArchiveVerification);
  const verificationDigest = sha256StableJson({
    profileVersion: "real-read-adapter-evidence-archive-verification.v1",
    verificationState,
    storedArchiveDigest: archive.archive.archiveDigest,
    recomputedArchiveDigest,
    sourceArchiveState: archive.archiveState,
    adapterDigest: archive.archive.adapterDigest,
    taxonomyDigest: archive.archive.taxonomyDigest,
    operatorWindowRunbookDigest: archive.archive.operatorWindowRunbookDigest,
    archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
    readyForProductionOperations: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, archive.archiveState);
  const warnings = collectWarnings(verificationState, archive.archive.readOnlyWindowOpen);
  const recommendations = collectRecommendations(verificationState);

  return {
    service: "orderops-node",
    title: "Real-read adapter evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-evidence-archive-verification.v1",
    verificationState,
    readyForRealReadAdapterEvidenceArchiveVerification: checks.readyForRealReadAdapterEvidenceArchiveVerification,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      storedArchiveDigest: archive.archive.archiveDigest,
      recomputedArchiveDigest,
      sourceArchiveProfileVersion: archive.profileVersion,
      sourceArchiveState: archive.archiveState,
      sourceAdapterDigest: archive.archive.adapterDigest,
      sourceTaxonomyDigest: archive.archive.taxonomyDigest,
      sourceOperatorWindowRunbookDigest: archive.archive.operatorWindowRunbookDigest,
      sourceRehearsalState: archive.archive.rehearsalState,
      sourceTaxonomyState: archive.archive.taxonomyState,
      archivedAsProductionPassEvidence: false,
      productionWriteAuthorized: false,
      upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      classificationCoverageComplete: archive.checks.classificationCoverageComplete,
      readOnlyWindowOpen: archive.archive.readOnlyWindowOpen,
      runtimeFileRead: false,
    },
    checks,
    artifacts: {
      archive: {
        profileVersion: archive.profileVersion,
        archiveDigest: archive.archive.archiveDigest,
        archiveState: archive.archiveState,
        readyForRealReadAdapterEvidenceArchive: archive.readyForRealReadAdapterEvidenceArchive,
        readyForProductionOperations: archive.readyForProductionOperations,
      },
      digestChain: {
        adapterDigest: archive.archive.adapterDigest,
        taxonomyDigest: archive.archive.taxonomyDigest,
        operatorWindowRunbookDigest: archive.archive.operatorWindowRunbookDigest,
        archiveDigest: archive.archive.archiveDigest,
        verificationDigest,
      },
      classificationCoverage: {
        adapterRecordCount: archive.summary.adapterRecordCount,
        taxonomyClassificationCount: archive.summary.taxonomyClassificationCount,
        distinctFailureClassCount: archive.summary.distinctFailureClassCount,
        failureClasses: [...archive.artifacts.taxonomy.failureClasses],
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
      "Keep v195 as archive verification evidence only; it does not authorize production operations.",
      "Proceed to the recommended parallel Java v69 and mini-kv v78 read-only evidence hints before Node v196.",
      "Use this verification digest when importing a later manual operator-window result packet.",
    ],
  };
}

export function renderRealReadAdapterEvidenceArchiveVerificationMarkdown(
  profile: RealReadAdapterEvidenceArchiveVerificationProfile,
): string {
  return [
    "# Real-read adapter evidence archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for real-read adapter evidence archive verification: ${profile.readyForRealReadAdapterEvidenceArchiveVerification}`,
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
    "### Digest Chain",
    "",
    ...renderEntries(profile.artifacts.digestChain),
    "",
    "### Classification Coverage",
    "",
    ...renderEntries(profile.artifacts.classificationCoverage),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read adapter evidence archive verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read adapter evidence archive verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read adapter evidence archive verification recommendations."),
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

function createChecks(
  archive: RealReadAdapterEvidenceArchiveProfile,
  recomputedArchiveDigest: string,
): RealReadAdapterEvidenceArchiveVerificationProfile["checks"] {
  return {
    sourceArchiveReady: archive.readyForRealReadAdapterEvidenceArchive && archive.archiveState !== "blocked",
    archiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.archiveDigest),
    archiveDigestMatches: archive.archive.archiveDigest === recomputedArchiveDigest,
    sourceArchiveProfileVersionValid: archive.profileVersion === "real-read-adapter-evidence-archive.v1",
    adapterDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.adapterDigest),
    taxonomyDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.taxonomyDigest),
    operatorWindowRunbookDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.operatorWindowRunbookDigest),
    classificationCoverageStillComplete: archive.checks.classificationCoverageComplete
      && archive.summary.adapterRecordCount === archive.summary.taxonomyClassificationCount
      && archive.summary.adapterRecordCount > 0,
    archiveChecksAllPassed: archive.summary.archiveCheckCount === archive.summary.passedArchiveCheckCount,
    archiveProductionBlockersClear: archive.summary.productionBlockerCount === 0,
    closedWindowStillNonPass: archive.archive.readOnlyWindowOpen
      || (archive.archive.archivedAsProductionPassEvidence === false && archive.archiveState === "closed-window-evidence-archived"),
    productionPassStillFalse: archive.archive.archivedAsProductionPassEvidence === false
      && archive.archive.productionWriteAuthorized === false,
    upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
      && archive.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: archive.archive.automaticUpstreamStart === false
      && archive.checks.noAutomaticUpstreamStart,
    readyForProductionOperationsStillFalse: archive.readyForProductionOperations === false
      && archive.checks.readyForProductionOperationsStillFalse,
    readyForRealReadAdapterEvidenceArchiveVerification: false,
  };
}

function determineVerificationState(
  archive: RealReadAdapterEvidenceArchiveProfile,
  readyForVerification: boolean,
): RealReadAdapterEvidenceArchiveVerificationProfile["verificationState"] {
  if (!readyForVerification || archive.archiveState === "blocked") {
    return "blocked";
  }
  return archive.archiveState === "closed-window-evidence-archived"
    ? "verified-closed-window-archive"
    : "verified-open-window-archive";
}

function collectProductionBlockers(
  checks: RealReadAdapterEvidenceArchiveVerificationProfile["checks"],
  archiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"],
): RealReadAdapterEvidenceArchiveVerificationMessage[] {
  const blockers: RealReadAdapterEvidenceArchiveVerificationMessage[] = [];
  addMessage(blockers, archiveState !== "blocked", "ARCHIVE_STATE_BLOCKED", "real-read-adapter-evidence-archive", "The source archive must not be blocked.");
  addMessage(blockers, checks.sourceArchiveReady, "SOURCE_ARCHIVE_NOT_READY", "real-read-adapter-evidence-archive", "The source archive must be ready before verification.");
  addMessage(blockers, checks.archiveDigestValid, "ARCHIVE_DIGEST_INVALID", "real-read-adapter-evidence-archive", "Archive digest must be a sha256 hex digest.");
  addMessage(blockers, checks.archiveDigestMatches, "ARCHIVE_DIGEST_MISMATCH", "real-read-adapter-evidence-archive-verification", "Recomputed archive digest must match the stored archive digest.");
  addMessage(blockers, checks.sourceArchiveProfileVersionValid, "ARCHIVE_PROFILE_VERSION_INVALID", "real-read-adapter-evidence-archive", "Source archive profile version must match v194.");
  addMessage(blockers, checks.adapterDigestValid, "ADAPTER_DIGEST_INVALID", "real-read-adapter-rehearsal", "Adapter digest must be valid.");
  addMessage(blockers, checks.taxonomyDigestValid, "TAXONOMY_DIGEST_INVALID", "real-read-adapter-failure-taxonomy", "Taxonomy digest must be valid.");
  addMessage(blockers, checks.operatorWindowRunbookDigestValid, "OPERATOR_WINDOW_DIGEST_INVALID", "operator-window-runbook", "Operator window runbook digest must be valid.");
  addMessage(blockers, checks.classificationCoverageStillComplete, "CLASSIFICATION_COVERAGE_INCOMPLETE", "real-read-adapter-failure-taxonomy", "Archive verification requires one classification for every adapter record.");
  addMessage(blockers, checks.archiveChecksAllPassed, "ARCHIVE_CHECKS_NOT_ALL_PASSED", "real-read-adapter-evidence-archive", "All source archive checks must still pass.");
  addMessage(blockers, checks.archiveProductionBlockersClear, "ARCHIVE_HAS_BLOCKERS", "real-read-adapter-evidence-archive", "Source archive blockers must be clear.");
  addMessage(blockers, checks.closedWindowStillNonPass, "CLOSED_WINDOW_PROMOTED", "real-read-adapter-evidence-archive-verification", "Closed-window evidence must remain non-pass.");
  addMessage(blockers, checks.productionPassStillFalse, "PRODUCTION_PASS_UNLOCKED", "runtime-config", "Archive verification must not mark production pass evidence.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "real-read-adapter-evidence-archive-verification", "Verification must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Verification must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  verificationState: RealReadAdapterEvidenceArchiveVerificationProfile["verificationState"],
  readOnlyWindowOpen: boolean,
): RealReadAdapterEvidenceArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked"
        ? "ARCHIVE_VERIFICATION_BLOCKED"
        : "ARCHIVE_DIGEST_VERIFIED",
      severity: "warning",
      source: "real-read-adapter-evidence-archive-verification",
      message: verificationState === "blocked"
        ? "Archive verification has blockers and cannot feed the next import packet."
        : "The stored archive digest matches the independently recomputed digest.",
    },
    {
      code: readOnlyWindowOpen
        ? "OPEN_WINDOW_ARCHIVE_RECHECKED"
        : "CLOSED_WINDOW_ARCHIVE_RECHECKED",
      severity: "warning",
      source: "real-read-adapter-evidence-archive",
      message: readOnlyWindowOpen
        ? "Open-window archive evidence was rechecked, but production operations remain disabled."
        : "Closed-window archive evidence was rechecked without contacting Java or mini-kv.",
    },
  ];
}

function collectRecommendations(
  verificationState: RealReadAdapterEvidenceArchiveVerificationProfile["verificationState"],
): RealReadAdapterEvidenceArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked"
        ? "FIX_ARCHIVE_VERIFICATION_BLOCKERS"
        : "WAIT_FOR_UPSTREAM_VERIFICATION_HINTS",
      severity: "recommendation",
      source: "real-read-adapter-evidence-archive-verification",
      message: verificationState === "blocked"
        ? "Fix verification blockers before importing manual window results."
        : "Proceed with recommended parallel Java v69 and mini-kv v78 before Node v196 imports a window result packet.",
    },
  ];
}

function addMessage(
  messages: RealReadAdapterEvidenceArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: RealReadAdapterEvidenceArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
