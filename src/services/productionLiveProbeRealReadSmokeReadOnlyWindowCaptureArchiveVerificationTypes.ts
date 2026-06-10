import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.js";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1";
  verificationState:
    | "verified-read-only-pass-candidate-archive"
    | "verified-read-only-skipped-capture-archive"
    | "verified-read-only-mixed-capture-archive"
    | "blocked";
  readyForReadOnlyCaptureArchiveVerification: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    captureArchiveDigest: string;
    expectedCaptureArchiveDigest: string;
    archiveProfileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["profileVersion"];
    archiveState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"];
    liveCaptureProfileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archive"]["liveCaptureProfileVersion"];
    readinessPacketProfileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archive"]["readinessPacketProfileVersion"];
    captureState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archive"]["captureState"];
    archivedAsProductionPassEvidence: boolean;
    skippedOrMixedEvidenceCannotPass: true;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    javaVersionTag: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archive"]["javaVersionTag"];
    miniKvVersionTag: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archive"]["miniKvVersionTag"];
  };
  checks: {
    captureArchiveDigestValid: boolean;
    captureArchiveDigestMatches: boolean;
    archiveProfileVersionValid: boolean;
    archiveReadyForVerification: boolean;
    archiveChecksAllPassed: boolean;
    archiveProductionBlockersClear: boolean;
    liveCaptureProfileVersionValid: boolean;
    readinessPacketProfileVersionValid: boolean;
    javaV50ReferenceReady: boolean;
    miniKvV59ReferenceReady: boolean;
    skippedOrMixedNotProductionPass: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForReadOnlyCaptureArchiveVerification: boolean;
  };
  artifacts: {
    archive: {
      profileVersion: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["profileVersion"];
      captureArchiveDigest: string;
      archiveState: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["archiveState"];
      readyForReadOnlyCaptureArchive: boolean;
      readyForProductionPassEvidenceArchive: boolean;
      readyForProductionOperations: false;
    };
    liveCapture: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["artifacts"]["liveCapture"];
    readinessPacket: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["artifacts"]["readinessPacket"];
    javaReference: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["artifacts"]["javaReference"];
    miniKvReference: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile["artifacts"]["miniKvReference"];
  };
  summary: {
    verificationCheckCount: number;
    passedVerificationCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadOnlyWindowCaptureArchiveVerificationMessage[];
  warnings: ReadOnlyWindowCaptureArchiveVerificationMessage[];
  recommendations: ReadOnlyWindowCaptureArchiveVerificationMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureJson: string;
  };
  nextActions: string[];
}

export interface ReadOnlyWindowCaptureArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "read-only-window-capture-archive"
    | "read-only-window-capture-archive-verification"
    | "read-only-window-live-capture"
    | "read-only-window-readiness-packet"
    | "java-v50-reference"
    | "mini-kv-v59-reference"
    | "runtime-config";
  message: string;
}
