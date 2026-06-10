import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationParts,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_VERIFICATION_ENDPOINTS,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationBuilder.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationTypes.js";

export type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
  ReadOnlyWindowCaptureArchiveVerificationMessage,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationTypes.js";
export {
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdownRenderer.js";

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile> {
  const archive = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive(input);
  const verificationParts = buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationParts(archive);

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window capture archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
    verificationState: verificationParts.verificationState,
    readyForReadOnlyCaptureArchiveVerification: verificationParts.checks.readyForReadOnlyCaptureArchiveVerification,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest: verificationParts.verificationDigest,
      captureArchiveDigest: archive.archive.captureArchiveDigest,
      expectedCaptureArchiveDigest: verificationParts.expectedCaptureArchiveDigest,
      archiveProfileVersion: archive.profileVersion,
      archiveState: archive.archiveState,
      liveCaptureProfileVersion: archive.archive.liveCaptureProfileVersion,
      readinessPacketProfileVersion: archive.archive.readinessPacketProfileVersion,
      captureState: archive.archive.captureState,
      archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
      skippedOrMixedEvidenceCannotPass: true,
      upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      javaVersionTag: archive.archive.javaVersionTag,
      miniKvVersionTag: archive.archive.miniKvVersionTag,
    },
    checks: verificationParts.checks,
    artifacts: {
      archive: {
        profileVersion: archive.profileVersion,
        captureArchiveDigest: archive.archive.captureArchiveDigest,
        archiveState: archive.archiveState,
        readyForReadOnlyCaptureArchive: archive.readyForReadOnlyCaptureArchive,
        readyForProductionPassEvidenceArchive: archive.readyForProductionPassEvidenceArchive,
        readyForProductionOperations: archive.readyForProductionOperations,
      },
      liveCapture: { ...archive.artifacts.liveCapture },
      readinessPacket: { ...archive.artifacts.readinessPacket },
      javaReference: { ...archive.artifacts.javaReference },
      miniKvReference: { ...archive.artifacts.miniKvReference },
    },
    summary: verificationParts.summary,
    productionBlockers: verificationParts.productionBlockers,
    warnings: verificationParts.warnings,
    recommendations: verificationParts.recommendations,
    evidenceEndpoints: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_VERIFICATION_ENDPOINTS },
    nextActions: [
      "Use this verification as the Node-side closeout before Java v51 and mini-kv v60 evidence explanations.",
      "Keep skipped or mixed capture evidence out of production pass evidence.",
      "Only open a real pass window with operator-started upstreams and UPSTREAM_ACTIONS_ENABLED=false.",
    ],
  };
}
