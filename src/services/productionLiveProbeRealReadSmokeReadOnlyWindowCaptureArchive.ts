import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveParts,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_ENDPOINTS,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveBuilder.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.js";

export type {
  JavaV50ReferenceTag,
  MiniKvV59ReferenceTag,
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
  ReadOnlyWindowCaptureArchiveMessage,
  UpstreamVersionReference,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.js";
export {
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdownRenderer.js";

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile> {
  const liveCapture = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture(input);
  const archiveParts = buildProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveParts(liveCapture);

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window capture archive",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1",
    archiveState: archiveParts.archiveState,
    readyForReadOnlyCaptureArchive: archiveParts.checks.readyForReadOnlyCaptureArchive,
    readyForProductionPassEvidenceArchive: archiveParts.readyForProductionPassEvidenceArchive,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    archive: {
      captureArchiveDigest: archiveParts.captureArchiveDigest,
      liveCaptureDigest: liveCapture.capture.liveCaptureDigest,
      readinessPacketDigest: liveCapture.capture.readinessPacketDigest,
      liveCaptureProfileVersion: liveCapture.profileVersion,
      readinessPacketProfileVersion: liveCapture.artifacts.readinessPacket.profileVersion,
      captureState: liveCapture.captureState,
      upstreamProbesEnabled: liveCapture.capture.upstreamProbesEnabled,
      upstreamActionsEnabled: liveCapture.capture.upstreamActionsEnabled,
      archivedAsProductionPassEvidence: archiveParts.readyForProductionPassEvidenceArchive,
      skippedOrMixedEvidenceCannotPass: true,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      javaVersionTag: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE.tag,
      miniKvVersionTag: PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE.tag,
    },
    checks: archiveParts.checks,
    artifacts: {
      liveCapture: {
        profileVersion: liveCapture.profileVersion,
        liveCaptureDigest: liveCapture.capture.liveCaptureDigest,
        captureState: liveCapture.captureState,
        readyForReadOnlyLiveCapture: liveCapture.readyForReadOnlyLiveCapture,
        readyForProductionPassEvidenceCandidate: liveCapture.readyForProductionPassEvidenceCandidate,
        readyForProductionOperations: liveCapture.readyForProductionOperations,
        passRecordCount: liveCapture.capture.passRecordCount,
        skippedRecordCount: liveCapture.capture.skippedRecordCount,
        blockedRecordCount: liveCapture.capture.blockedRecordCount,
      },
      readinessPacket: {
        ...liveCapture.artifacts.readinessPacket,
      },
      javaReference: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_JAVA_V50_REFERENCE },
      miniKvReference: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_MINI_KV_V59_REFERENCE },
    },
    summary: archiveParts.summary,
    productionBlockers: archiveParts.productionBlockers,
    warnings: archiveParts.warnings,
    recommendations: archiveParts.recommendations,
    evidenceEndpoints: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_CAPTURE_ARCHIVE_ENDPOINTS },
    nextActions: [
      "Use this archive as the stable input for v158 archive verification.",
      "Keep skipped or mixed capture evidence out of production pass evidence.",
      "Do not start Java or mini-kv from Node; a real pass window remains operator-owned.",
    ],
  };
}
