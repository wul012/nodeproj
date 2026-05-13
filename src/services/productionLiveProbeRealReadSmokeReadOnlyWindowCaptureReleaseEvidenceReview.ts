import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.js";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.v1";
  reviewState:
    | "reviewed-read-only-pass-candidate"
    | "reviewed-read-only-skipped-capture"
    | "reviewed-read-only-mixed-capture"
    | "blocked";
  readyForReadOnlyCaptureReleaseEvidenceReview: boolean;
  readyForProductionPassEvidence: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  review: {
    releaseReviewDigest: string;
    archiveVerificationDigest: string;
    captureArchiveDigest: string;
    archiveVerificationProfileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["profileVersion"];
    archiveVerificationState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"];
    captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verification"]["captureState"];
    archivedAsProductionPassEvidence: boolean;
    releaseSemantics: "pass-candidate-gated" | "non-pass-local-evidence";
    javaFieldGuideTag: typeof JAVA_V51_FIELD_GUIDE.tag;
    javaFieldGuideVersion: typeof JAVA_V51_FIELD_GUIDE.guideVersion;
    miniKvFieldGuideTag: typeof MINI_KV_V60_FIELD_GUIDE.tag;
    miniKvFieldGuideVersion: typeof MINI_KV_V60_FIELD_GUIDE.guideVersion;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
  };
  checks: {
    archiveVerificationReady: boolean;
    archiveVerificationDigestValid: boolean;
    captureArchiveDigestValid: boolean;
    archiveVerificationProfileVersionValid: boolean;
    archiveVerificationChecksAllPassed: boolean;
    javaV51FieldGuideReady: boolean;
    miniKvV60FieldGuideReady: boolean;
    javaFieldGuideExplainsNonPassOnly: boolean;
    miniKvFieldGuideExplainsNonPassOnly: boolean;
    skippedOrMixedNotProductionPass: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    releaseReviewDoesNotAuthorizeExecution: boolean;
    readyForReadOnlyCaptureReleaseEvidenceReview: boolean;
  };
  artifacts: {
    archiveVerification: {
      profileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["profileVersion"];
      verificationDigest: string;
      verificationState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"];
      captureArchiveDigest: string;
      readyForReadOnlyCaptureArchiveVerification: boolean;
      readyForProductionOperations: false;
    };
    javaFieldGuide: FieldGuideReference;
    miniKvFieldGuide: FieldGuideReference;
  };
  summary: {
    reviewCheckCount: number;
    passedReviewCheckCount: number;
    upstreamFieldGuideCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[];
  warnings: ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[];
  recommendations: ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveJson: string;
  };
  nextActions: string[];
}

interface FieldGuideReference {
  project: "advanced-order-platform" | "mini-kv";
  plannedVersion: "Java v51" | "mini-kv v60";
  tag: "v51订单平台ops-evidence-field-guide" | "第六十版运行时只读字段说明";
  guideVersion: "java-ops-evidence-field-guide.v1" | "mini-kv-runtime-read-field-guide.v1";
  guidePath: "/contracts/ops-evidence-field-guide.sample.json" | "fixtures/readonly/runtime-read-field-guide.json";
  intendedConsumer: "Node read-only capture release evidence review" | "Node v159 read-only capture release evidence review";
  mayBeUsedForProductionPass: false;
  readOnly: true;
  executionAllowed: false;
  runtimeFileRead: false;
}

interface ReadOnlyWindowCaptureReleaseEvidenceReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "read-only-window-capture-release-evidence-review"
    | "read-only-window-capture-archive-verification"
    | "java-v51-field-guide"
    | "mini-kv-v60-field-guide"
    | "runtime-config";
  message: string;
}

const JAVA_V51_FIELD_GUIDE: FieldGuideReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v51",
  tag: "v51订单平台ops-evidence-field-guide",
  guideVersion: "java-ops-evidence-field-guide.v1",
  guidePath: "/contracts/ops-evidence-field-guide.sample.json",
  intendedConsumer: "Node read-only capture release evidence review",
  mayBeUsedForProductionPass: false,
  readOnly: true,
  executionAllowed: false,
  runtimeFileRead: false,
});

const MINI_KV_V60_FIELD_GUIDE: FieldGuideReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v60",
  tag: "第六十版运行时只读字段说明",
  guideVersion: "mini-kv-runtime-read-field-guide.v1",
  guidePath: "fixtures/readonly/runtime-read-field-guide.json",
  intendedConsumer: "Node v159 read-only capture release evidence review",
  mayBeUsedForProductionPass: false,
  readOnly: true,
  executionAllowed: false,
  runtimeFileRead: false,
});

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review",
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review?format=markdown",
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification",
  productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive",
});

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile> {
  const archiveVerification = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification(input);
  const releaseSemantics = archiveVerification.verification.archivedAsProductionPassEvidence
    ? "pass-candidate-gated"
    : "non-pass-local-evidence";
  const checks = createChecks(archiveVerification);
  checks.readyForReadOnlyCaptureReleaseEvidenceReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyCaptureReleaseEvidenceReview")
    .every(([, value]) => value);
  const reviewState = determineReviewState(archiveVerification, checks.readyForReadOnlyCaptureReleaseEvidenceReview);
  const releaseReviewDigest = digestReview({
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.v1",
    archiveVerificationDigest: archiveVerification.verification.verificationDigest,
    captureArchiveDigest: archiveVerification.verification.captureArchiveDigest,
    archiveVerificationState: archiveVerification.verificationState,
    captureState: archiveVerification.verification.captureState,
    archivedAsProductionPassEvidence: archiveVerification.verification.archivedAsProductionPassEvidence,
    releaseSemantics,
    javaFieldGuideTag: JAVA_V51_FIELD_GUIDE.tag,
    javaFieldGuideVersion: JAVA_V51_FIELD_GUIDE.guideVersion,
    miniKvFieldGuideTag: MINI_KV_V60_FIELD_GUIDE.tag,
    miniKvFieldGuideVersion: MINI_KV_V60_FIELD_GUIDE.guideVersion,
    upstreamActionsEnabled: archiveVerification.verification.upstreamActionsEnabled,
    readyForProductionOperations: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, archiveVerification.verificationState);
  const warnings = collectWarnings(reviewState, releaseSemantics);
  const recommendations = collectRecommendations(reviewState);

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window capture release evidence review",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.v1",
    reviewState,
    readyForReadOnlyCaptureReleaseEvidenceReview: checks.readyForReadOnlyCaptureReleaseEvidenceReview,
    readyForProductionPassEvidence: archiveVerification.verification.archivedAsProductionPassEvidence,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    review: {
      releaseReviewDigest,
      archiveVerificationDigest: archiveVerification.verification.verificationDigest,
      captureArchiveDigest: archiveVerification.verification.captureArchiveDigest,
      archiveVerificationProfileVersion: archiveVerification.profileVersion,
      archiveVerificationState: archiveVerification.verificationState,
      captureState: archiveVerification.verification.captureState,
      archivedAsProductionPassEvidence: archiveVerification.verification.archivedAsProductionPassEvidence,
      releaseSemantics,
      javaFieldGuideTag: JAVA_V51_FIELD_GUIDE.tag,
      javaFieldGuideVersion: JAVA_V51_FIELD_GUIDE.guideVersion,
      miniKvFieldGuideTag: MINI_KV_V60_FIELD_GUIDE.tag,
      miniKvFieldGuideVersion: MINI_KV_V60_FIELD_GUIDE.guideVersion,
      upstreamActionsEnabled: archiveVerification.verification.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
    },
    checks,
    artifacts: {
      archiveVerification: {
        profileVersion: archiveVerification.profileVersion,
        verificationDigest: archiveVerification.verification.verificationDigest,
        verificationState: archiveVerification.verificationState,
        captureArchiveDigest: archiveVerification.verification.captureArchiveDigest,
        readyForReadOnlyCaptureArchiveVerification: archiveVerification.readyForReadOnlyCaptureArchiveVerification,
        readyForProductionOperations: archiveVerification.readyForProductionOperations,
      },
      javaFieldGuide: { ...JAVA_V51_FIELD_GUIDE },
      miniKvFieldGuide: { ...MINI_KV_V60_FIELD_GUIDE },
    },
    summary: {
      reviewCheckCount: countReportChecks(checks),
      passedReviewCheckCount: countPassedReportChecks(checks),
      upstreamFieldGuideCount: 2,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this review as the Node v159 closeout for the read-only capture phase.",
      "Start deeper Java and mini-kv vertical work only after choosing a concrete production-hardening slice.",
      "Keep production operations disabled until a separate audited execution workflow is implemented.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile,
): string {
  return [
    "# Production live probe real-read smoke read-only window capture release evidence review",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Review state: ${profile.reviewState}`,
    `- Ready for read-only capture release evidence review: ${profile.readyForReadOnlyCaptureReleaseEvidenceReview}`,
    `- Ready for production pass evidence: ${profile.readyForProductionPassEvidence}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Review",
    "",
    ...renderEntries(profile.review),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Archive Verification",
    "",
    ...renderEntries(profile.artifacts.archiveVerification),
    "",
    "### Java Field Guide",
    "",
    ...renderEntries(profile.artifacts.javaFieldGuide),
    "",
    "### mini-kv Field Guide",
    "",
    ...renderEntries(profile.artifacts.miniKvFieldGuide),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No read-only capture release evidence review blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No read-only capture release evidence review warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No read-only capture release evidence review recommendations."),
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
  archiveVerification: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile["checks"] {
  return {
    archiveVerificationReady: archiveVerification.readyForReadOnlyCaptureArchiveVerification,
    archiveVerificationDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.verificationDigest),
    captureArchiveDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.captureArchiveDigest),
    archiveVerificationProfileVersionValid: archiveVerification.profileVersion === "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
    archiveVerificationChecksAllPassed: archiveVerification.summary.verificationCheckCount === archiveVerification.summary.passedVerificationCheckCount,
    javaV51FieldGuideReady: isFieldGuideReferenceReady(JAVA_V51_FIELD_GUIDE),
    miniKvV60FieldGuideReady: isFieldGuideReferenceReady(MINI_KV_V60_FIELD_GUIDE),
    javaFieldGuideExplainsNonPassOnly: !JAVA_V51_FIELD_GUIDE.mayBeUsedForProductionPass
      && JAVA_V51_FIELD_GUIDE.executionAllowed === false,
    miniKvFieldGuideExplainsNonPassOnly: !MINI_KV_V60_FIELD_GUIDE.mayBeUsedForProductionPass
      && MINI_KV_V60_FIELD_GUIDE.executionAllowed === false,
    skippedOrMixedNotProductionPass: archiveVerification.verification.captureState === "captured-pass"
      || archiveVerification.verification.archivedAsProductionPassEvidence === false,
    upstreamActionsStillDisabled: archiveVerification.verification.upstreamActionsEnabled === false
      && archiveVerification.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: archiveVerification.verification.automaticUpstreamStart === false
      && archiveVerification.checks.noAutomaticUpstreamStart,
    readyForProductionOperationsStillFalse: archiveVerification.readyForProductionOperations === false,
    releaseReviewDoesNotAuthorizeExecution: true,
    readyForReadOnlyCaptureReleaseEvidenceReview: false,
  };
}

function determineReviewState(
  archiveVerification: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
  readyForReview: boolean,
): ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile["reviewState"] {
  if (!readyForReview || archiveVerification.verificationState === "blocked") {
    return "blocked";
  }
  if (archiveVerification.verificationState === "verified-read-only-pass-candidate-archive") {
    return "reviewed-read-only-pass-candidate";
  }
  if (archiveVerification.verificationState === "verified-read-only-skipped-capture-archive") {
    return "reviewed-read-only-skipped-capture";
  }
  return "reviewed-read-only-mixed-capture";
}

function isFieldGuideReferenceReady(reference: FieldGuideReference): boolean {
  return reference.tag.length > 0
    && reference.guideVersion.length > 0
    && reference.guidePath.length > 0
    && reference.readOnly
    && !reference.executionAllowed
    && !reference.mayBeUsedForProductionPass
    && !reference.runtimeFileRead;
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile["checks"],
  archiveVerificationState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile["verificationState"],
): ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[] {
  const blockers: ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[] = [];
  addMessage(blockers, archiveVerificationState !== "blocked", "ARCHIVE_VERIFICATION_BLOCKED", "read-only-window-capture-archive-verification", "v158 archive verification must not be blocked.");
  addMessage(blockers, checks.archiveVerificationReady, "ARCHIVE_VERIFICATION_NOT_READY", "read-only-window-capture-archive-verification", "v158 archive verification must be ready.");
  addMessage(blockers, checks.archiveVerificationDigestValid, "ARCHIVE_VERIFICATION_DIGEST_INVALID", "read-only-window-capture-archive-verification", "v158 verification digest must be valid.");
  addMessage(blockers, checks.captureArchiveDigestValid, "CAPTURE_ARCHIVE_DIGEST_INVALID", "read-only-window-capture-archive-verification", "v157 capture archive digest must be valid.");
  addMessage(blockers, checks.archiveVerificationProfileVersionValid, "ARCHIVE_VERIFICATION_PROFILE_VERSION_INVALID", "read-only-window-capture-archive-verification", "Review must reference v158 verification profile.");
  addMessage(blockers, checks.archiveVerificationChecksAllPassed, "ARCHIVE_VERIFICATION_CHECKS_NOT_ALL_PASSED", "read-only-window-capture-archive-verification", "All v158 verification checks must pass.");
  addMessage(blockers, checks.javaV51FieldGuideReady, "JAVA_V51_FIELD_GUIDE_NOT_READY", "java-v51-field-guide", "Java v51 field guide reference must be present and read-only.");
  addMessage(blockers, checks.miniKvV60FieldGuideReady, "MINI_KV_V60_FIELD_GUIDE_NOT_READY", "mini-kv-v60-field-guide", "mini-kv v60 field guide reference must be present and read-only.");
  addMessage(blockers, checks.javaFieldGuideExplainsNonPassOnly, "JAVA_FIELD_GUIDE_AUTHORIZES_PASS", "java-v51-field-guide", "Java field guide must explain fields only and must not authorize production pass.");
  addMessage(blockers, checks.miniKvFieldGuideExplainsNonPassOnly, "MINI_KV_FIELD_GUIDE_AUTHORIZES_PASS", "mini-kv-v60-field-guide", "mini-kv field guide must explain fields only and must not authorize production pass.");
  addMessage(blockers, checks.skippedOrMixedNotProductionPass, "SKIPPED_OR_MIXED_PROMOTED", "read-only-window-capture-release-evidence-review", "Skipped or mixed capture must not become production pass.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "read-only-window-capture-release-evidence-review", "Review must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Release evidence review must not unlock production operations.");
  addMessage(blockers, checks.releaseReviewDoesNotAuthorizeExecution, "RELEASE_REVIEW_AUTHORIZES_EXECUTION", "read-only-window-capture-release-evidence-review", "Release evidence review must remain read-only.");
  return blockers;
}

function collectWarnings(
  reviewState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile["reviewState"],
  releaseSemantics: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile["review"]["releaseSemantics"],
): ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[] {
  return [
    {
      code: reviewState === "blocked"
        ? "RELEASE_REVIEW_BLOCKED"
        : "RELEASE_REVIEW_READY",
      severity: "warning",
      source: "read-only-window-capture-release-evidence-review",
      message: reviewState === "blocked"
        ? "Release evidence review has blockers."
        : "Release evidence review is ready and remains read-only.",
    },
    {
      code: releaseSemantics === "pass-candidate-gated"
        ? "PASS_CANDIDATE_REMAINS_GATED"
        : "NON_PASS_LOCAL_EVIDENCE",
      severity: "warning",
      source: "read-only-window-capture-release-evidence-review",
      message: releaseSemantics === "pass-candidate-gated"
        ? "Pass candidate evidence remains separate from production operations."
        : "Skipped or mixed evidence remains local release-review evidence only.",
    },
    {
      code: "UPSTREAM_FIELD_GUIDES_STATIC",
      severity: "warning",
      source: "read-only-window-capture-release-evidence-review",
      message: "Java v51 and mini-kv v60 field guides are static version references, not live execution authority.",
    },
  ];
}

function collectRecommendations(
  reviewState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile["reviewState"],
): ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[] {
  return [
    {
      code: reviewState === "blocked"
        ? "FIX_RELEASE_REVIEW_BLOCKERS"
        : "START_VERTICAL_PRODUCTION_HARDENING_SLICE",
      severity: "recommendation",
      source: "read-only-window-capture-release-evidence-review",
      message: reviewState === "blocked"
        ? "Fix release review blockers before planning deeper Java or mini-kv work."
        : "Pick the next deeper vertical slice across Java, mini-kv, and Node instead of adding another shallow evidence-only version.",
    },
  ];
}

function addMessage(
  messages: ReadOnlyWindowCaptureReleaseEvidenceReviewMessage[],
  condition: boolean,
  code: string,
  source: ReadOnlyWindowCaptureReleaseEvidenceReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestReview(value: unknown): string {
  return sha256StableJson(value);
}
