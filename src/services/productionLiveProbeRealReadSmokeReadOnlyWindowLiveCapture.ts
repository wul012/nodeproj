import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  buildProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureParts,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_LIVE_CAPTURE_ENDPOINTS,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureBuilder.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.js";
import {
  loadProductionLiveProbeSmokeHarness,
} from "./productionLiveProbeSmokeHarness.js";

export type {
  ProductionLiveProbeCapturedWindowRecord,
  ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
  ReadOnlyWindowLiveCaptureMessage,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.js";
export {
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdownRenderer.js";

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile> {
  const readinessPacket = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(input);
  const smokeHarness = await loadProductionLiveProbeSmokeHarness({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const liveCapture = buildProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureParts(
    input.config,
    readinessPacket,
    smokeHarness,
  );

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window live capture",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
    captureState: liveCapture.captureState,
    readyForReadOnlyLiveCapture: liveCapture.checks.readyForReadOnlyLiveCapture,
    readyForProductionPassEvidenceCandidate: liveCapture.checks.readyForProductionPassEvidenceCandidate,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    capture: {
      liveCaptureDigest: liveCapture.liveCaptureDigest,
      readinessPacketDigest: readinessPacket.packet.readinessPacketDigest,
      smokeHarnessProfileVersion: smokeHarness.profileVersion,
      probeWindowOpen: input.config.upstreamProbesEnabled,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      manualJavaStartRequired: true,
      manualMiniKvStartRequired: true,
      skippedWithoutUpstreamsOnly: true,
      skippedOrMixedEvidenceCannotPass: true,
      passRecordCount: liveCapture.summary.passRecordCount,
      skippedRecordCount: liveCapture.summary.skippedRecordCount,
      blockedRecordCount: liveCapture.summary.blockedRecordCount,
    },
    checks: liveCapture.checks,
    artifacts: {
      readinessPacket: {
        profileVersion: readinessPacket.profileVersion,
        readinessPacketDigest: readinessPacket.packet.readinessPacketDigest,
        packetState: readinessPacket.packetState,
        readyForReadOnlyWindowReview: readinessPacket.readyForReadOnlyWindowReview,
        readyForProductionOperations: readinessPacket.readyForProductionOperations,
      },
      smokeHarness: {
        profileVersion: smokeHarness.profileVersion,
        readyForLiveProbeEvidence: smokeHarness.readyForLiveProbeEvidence,
        probesEnabled: smokeHarness.probesEnabled,
        readyForProductionConnections: smokeHarness.readyForProductionConnections,
      },
    },
    capturedRecords: liveCapture.capturedRecords,
    summary: liveCapture.summary,
    productionBlockers: liveCapture.productionBlockers,
    warnings: liveCapture.warnings,
    recommendations: liveCapture.recommendations,
    evidenceEndpoints: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_LIVE_CAPTURE_ENDPOINTS },
    nextActions: [
      "Keep skipped live capture as local evidence only.",
      "If Java and mini-kv are manually started, rerun with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
      "Do not promote pass capture to production operations; production execution remains separately gated.",
    ],
  };
}
