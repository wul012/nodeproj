import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  buildProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketParts,
  PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_READINESS_PACKET_ENDPOINTS,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketBuilder.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification,
} from "./productionLiveProbeRealReadSmokeOperatorRunbookVerification.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketTypes.js";

export type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
  ReadinessPacketEvidence,
  ReadinessPacketMessage,
  ReadinessPacketRequirement,
  ReadinessPacketReviewStep,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketTypes.js";
export {
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdownRenderer.js";

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile> {
  const runbookVerification = await loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification(input);
  const readinessPacket = buildProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketParts(
    runbookVerification,
  );

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window readiness packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
    packetState: readinessPacket.packetState,
    readyForReadOnlyWindowReview: readinessPacket.checks.readyForReadOnlyWindowReview,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    packet: {
      readinessPacketDigest: readinessPacket.readinessPacketDigest,
      archiveVerificationDigest: runbookVerification.artifacts.sourceArchiveVerification.verificationDigest,
      runbookDigest: runbookVerification.verification.runbookDigest,
      runbookVerificationDigest: runbookVerification.verification.verificationDigest,
      runbookVerificationState: runbookVerification.verificationState,
      sourceArchiveVerificationState: runbookVerification.artifacts.sourceArchiveVerification.verificationState,
      requiredManualJavaStart: true,
      requiredManualMiniKvStart: true,
      requiredUpstreamProbesEnabled: true,
      requiredUpstreamActionsEnabled: false,
      automaticUpstreamStart: false,
      skippedWithoutUpstreamsOnly: true,
      skippedOrMixedEvidenceCannotPass: true,
      runtimeFileRead: false,
    },
    checks: readinessPacket.checks,
    artifacts: {
      archiveVerification: {
        ...runbookVerification.artifacts.sourceArchiveVerification,
      },
      operatorRunbook: {
        ...runbookVerification.artifacts.operatorRunbook,
      },
      operatorRunbookVerification: {
        profileVersion: runbookVerification.profileVersion,
        verificationDigest: runbookVerification.verification.verificationDigest,
        verificationState: runbookVerification.verificationState,
        readyForOperatorRunbookVerification: runbookVerification.readyForOperatorRunbookVerification,
        readyForProductionOperations: runbookVerification.readyForProductionOperations,
      },
    },
    evidenceChain: readinessPacket.evidenceChain,
    operatorWindowRequirements: readinessPacket.operatorWindowRequirements,
    reviewSteps: readinessPacket.reviewSteps,
    summary: readinessPacket.summary,
    productionBlockers: readinessPacket.productionBlockers,
    warnings: readinessPacket.warnings,
    recommendations: readinessPacket.recommendations,
    evidenceEndpoints: { ...PRODUCTION_LIVE_PROBE_REAL_READ_SMOKE_READ_ONLY_WINDOW_READINESS_PACKET_ENDPOINTS },
    nextActions: [
      "Use this packet as the pre-review input before any Java or mini-kv startup.",
      "Complete Java v50 and mini-kv v59 read-only self-description upgrades before real live capture.",
      "If upstreams are not manually started, record skipped evidence only and keep production pass false.",
    ],
  };
}
