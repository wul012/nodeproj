import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import type {
  ProductionLiveProbeResult,
  ProductionLiveProbeSmokeHarnessProfile,
} from "./productionLiveProbeSmokeHarness.js";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1";
  captureState: "captured-pass" | "captured-skipped" | "captured-mixed" | "blocked";
  readyForReadOnlyLiveCapture: boolean;
  readyForProductionPassEvidenceCandidate: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  capture: {
    liveCaptureDigest: string;
    readinessPacketDigest: string;
    smokeHarnessProfileVersion: ProductionLiveProbeSmokeHarnessProfile["profileVersion"];
    probeWindowOpen: boolean;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    manualJavaStartRequired: true;
    manualMiniKvStartRequired: true;
    skippedWithoutUpstreamsOnly: true;
    skippedOrMixedEvidenceCannotPass: true;
    passRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
  };
  checks: {
    readinessPacketReady: boolean;
    readinessPacketDigestValid: boolean;
    smokeHarnessReady: boolean;
    smokeProbeSetComplete: boolean;
    allProbeResultsReadOnly: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    skippedAllowedWhenWindowClosed: boolean;
    passRequiresProbeWindowOpen: boolean;
    skippedOrMixedNotProductionPass: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForReadOnlyLiveCapture: boolean;
    readyForProductionPassEvidenceCandidate: boolean;
  };
  artifacts: {
    readinessPacket: {
      profileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["profileVersion"];
      readinessPacketDigest: string;
      packetState: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["packetState"];
      readyForReadOnlyWindowReview: boolean;
      readyForProductionOperations: false;
    };
    smokeHarness: {
      profileVersion: ProductionLiveProbeSmokeHarnessProfile["profileVersion"];
      readyForLiveProbeEvidence: boolean;
      probesEnabled: boolean;
      readyForProductionConnections: false;
    };
  };
  capturedRecords: ProductionLiveProbeCapturedWindowRecord[];
  summary: {
    capturedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadOnlyWindowLiveCaptureMessage[];
  warnings: ReadOnlyWindowLiveCaptureMessage[];
  recommendations: ReadOnlyWindowLiveCaptureMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: string;
    productionLiveProbeSmokeHarnessJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeCapturedWindowRecord {
  id: ProductionLiveProbeResult["id"];
  captureStatus: "captured-pass" | "captured-skipped" | "captured-blocked";
  sourceStatus: ProductionLiveProbeResult["status"];
  target: string;
  protocol: ProductionLiveProbeResult["protocol"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  message: string;
  evidenceSummary?: unknown;
}

export interface ReadOnlyWindowLiveCaptureMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "readiness-packet"
    | "smoke-harness"
    | "read-only-window-live-capture"
    | "runtime-config";
  message: string;
}
