import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewParts,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_ENDPOINTS,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_JAVA_V51_FIELD_GUIDE,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_MINI_KV_V60_FIELD_GUIDE,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewBuilder.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewTypes.js";

export type {
  FieldGuideReference,
  JavaV51FieldGuideTag,
  MiniKvV60FieldGuideTag,
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile,
  ReadOnlyWindowCaptureReleaseEvidenceReviewMessage,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewTypes.js";
export {
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdownRenderer.js";

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile> {
  const archiveVerification = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification(input);
  const reviewParts = buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewParts(
    archiveVerification,
  );

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window capture release evidence review",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.v1",
    reviewState: reviewParts.reviewState,
    readyForReadOnlyCaptureReleaseEvidenceReview: reviewParts.checks.readyForReadOnlyCaptureReleaseEvidenceReview,
    readyForProductionPassEvidence: archiveVerification.verification.archivedAsProductionPassEvidence,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    review: {
      releaseReviewDigest: reviewParts.releaseReviewDigest,
      archiveVerificationDigest: archiveVerification.verification.verificationDigest,
      captureArchiveDigest: archiveVerification.verification.captureArchiveDigest,
      archiveVerificationProfileVersion: archiveVerification.profileVersion,
      archiveVerificationState: archiveVerification.verificationState,
      captureState: archiveVerification.verification.captureState,
      archivedAsProductionPassEvidence: archiveVerification.verification.archivedAsProductionPassEvidence,
      releaseSemantics: reviewParts.releaseSemantics,
      javaFieldGuideTag: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_JAVA_V51_FIELD_GUIDE.tag,
      javaFieldGuideVersion: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_JAVA_V51_FIELD_GUIDE.guideVersion,
      miniKvFieldGuideTag: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_MINI_KV_V60_FIELD_GUIDE.tag,
      miniKvFieldGuideVersion: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_MINI_KV_V60_FIELD_GUIDE.guideVersion,
      upstreamActionsEnabled: archiveVerification.verification.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
    },
    checks: reviewParts.checks,
    artifacts: {
      archiveVerification: {
        profileVersion: archiveVerification.profileVersion,
        verificationDigest: archiveVerification.verification.verificationDigest,
        verificationState: archiveVerification.verificationState,
        captureArchiveDigest: archiveVerification.verification.captureArchiveDigest,
        readyForReadOnlyCaptureArchiveVerification: archiveVerification.readyForReadOnlyCaptureArchiveVerification,
        readyForProductionOperations: archiveVerification.readyForProductionOperations,
      },
      javaFieldGuide: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_JAVA_V51_FIELD_GUIDE },
      miniKvFieldGuide: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_MINI_KV_V60_FIELD_GUIDE },
    },
    summary: reviewParts.summary,
    productionBlockers: reviewParts.productionBlockers,
    warnings: reviewParts.warnings,
    recommendations: reviewParts.recommendations,
    evidenceEndpoints: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_RELEASE_EVIDENCE_REVIEW_ENDPOINTS },
    nextActions: [
      "Use this review as the Node v159 closeout for the read-only capture phase.",
      "Start deeper Java and mini-kv vertical work only after choosing a concrete production-hardening slice.",
      "Keep production operations disabled until a separate audited execution workflow is implemented.",
    ],
  };
}
