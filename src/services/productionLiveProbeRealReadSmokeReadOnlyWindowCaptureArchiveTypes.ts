import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.js";

export type JavaV50ReferenceTag = "v50订单平台ops-read-only-window-self-description";
export type MiniKvV59ReferenceTag = "第五十九版运行时只读自描述";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1";
  archiveState:
    | "read-only-pass-candidate-archived"
    | "read-only-skipped-capture-archived"
    | "read-only-mixed-capture-archived"
    | "blocked";
  readyForReadOnlyCaptureArchive: boolean;
  readyForProductionPassEvidenceArchive: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  archive: {
    captureArchiveDigest: string;
    liveCaptureDigest: string;
    readinessPacketDigest: string;
    liveCaptureProfileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["profileVersion"];
    readinessPacketProfileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["artifacts"]["readinessPacket"]["profileVersion"];
    captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"];
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    archivedAsProductionPassEvidence: boolean;
    skippedOrMixedEvidenceCannotPass: true;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    javaVersionTag: JavaV50ReferenceTag;
    miniKvVersionTag: MiniKvV59ReferenceTag;
  };
  checks: {
    liveCaptureDigestValid: boolean;
    readinessPacketDigestValid: boolean;
    liveCaptureProfileVersionValid: boolean;
    readinessPacketProfileVersionValid: boolean;
    liveCaptureReady: boolean;
    capturedRecordSetComplete: boolean;
    skippedOrMixedArchivedAsNonPass: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    javaV50ReferenceReady: boolean;
    miniKvV59ReferenceReady: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForReadOnlyCaptureArchive: boolean;
  };
  artifacts: {
    liveCapture: {
      profileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["profileVersion"];
      liveCaptureDigest: string;
      captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"];
      readyForReadOnlyLiveCapture: boolean;
      readyForProductionPassEvidenceCandidate: boolean;
      readyForProductionOperations: false;
      passRecordCount: number;
      skippedRecordCount: number;
      blockedRecordCount: number;
    };
    readinessPacket: {
      profileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["artifacts"]["readinessPacket"]["profileVersion"];
      readinessPacketDigest: string;
      packetState: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["artifacts"]["readinessPacket"]["packetState"];
      readyForReadOnlyWindowReview: boolean;
      readyForProductionOperations: false;
    };
    javaReference: UpstreamVersionReference;
    miniKvReference: UpstreamVersionReference;
  };
  summary: {
    archiveCheckCount: number;
    passedArchiveCheckCount: number;
    capturedRecordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadOnlyWindowCaptureArchiveMessage[];
  warnings: ReadOnlyWindowCaptureArchiveMessage[];
  recommendations: ReadOnlyWindowCaptureArchiveMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: string;
  };
  nextActions: string[];
}

export type UpstreamVersionReference = {
  project: "advanced-order-platform";
  plannedVersion: "Java v50";
  tag: JavaV50ReferenceTag;
  commitRole: string;
  evidenceKind: "ops-read-only-window-self-description";
  readOnly: true;
  executionAllowed: false;
  productionPassEvidence: false;
  runtimeFileRead: false;
} | {
  project: "mini-kv";
  plannedVersion: "mini-kv v59";
  tag: MiniKvV59ReferenceTag;
  commitRole: string;
  evidenceKind: "runtime-read-self-description";
  readOnly: true;
  executionAllowed: false;
  productionPassEvidence: false;
  runtimeFileRead: false;
};

export interface ReadOnlyWindowCaptureArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "read-only-window-capture-archive"
    | "read-only-window-live-capture"
    | "read-only-window-readiness-packet"
    | "java-v50-reference"
    | "mini-kv-v59-reference"
    | "runtime-config";
  message: string;
}
