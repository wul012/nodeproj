import type {
  ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
} from "./productionLiveProbeRealReadSmokeOperatorRunbookVerification.js";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1";
  packetState: "ready-for-manual-read-only-window-review" | "blocked";
  readyForReadOnlyWindowReview: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  packet: {
    readinessPacketDigest: string;
    archiveVerificationDigest: string;
    runbookDigest: string;
    runbookVerificationDigest: string;
    runbookVerificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["verificationState"];
    sourceArchiveVerificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["sourceArchiveVerification"]["verificationState"];
    requiredManualJavaStart: true;
    requiredManualMiniKvStart: true;
    requiredUpstreamProbesEnabled: true;
    requiredUpstreamActionsEnabled: false;
    automaticUpstreamStart: false;
    skippedWithoutUpstreamsOnly: true;
    skippedOrMixedEvidenceCannotPass: true;
    runtimeFileRead: false;
  };
  checks: {
    runbookVerificationReady: boolean;
    runbookVerificationDigestValid: boolean;
    runbookDigestValid: boolean;
    archiveVerificationDigestValid: boolean;
    digestChainComplete: boolean;
    sourceArchiveVerificationReady: boolean;
    sourceRunbookReady: boolean;
    manualJavaStartRequired: boolean;
    manualMiniKvStartRequired: boolean;
    upstreamProbesRequirementDocumented: boolean;
    upstreamActionsStayDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    skippedWithoutUpstreamsOnly: boolean;
    skippedOrMixedNotProductionPass: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForReadOnlyWindowReview: boolean;
  };
  artifacts: {
    archiveVerification: {
      profileVersion: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["sourceArchiveVerification"]["profileVersion"];
      verificationDigest: string;
      verificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["sourceArchiveVerification"]["verificationState"];
      readyForArchiveVerification: boolean;
      readyForProductionOperations: false;
    };
    operatorRunbook: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["operatorRunbook"];
    operatorRunbookVerification: {
      profileVersion: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["profileVersion"];
      verificationDigest: string;
      verificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["verificationState"];
      readyForOperatorRunbookVerification: boolean;
      readyForProductionOperations: false;
    };
  };
  evidenceChain: ReadinessPacketEvidence[];
  operatorWindowRequirements: ReadinessPacketRequirement[];
  reviewSteps: ReadinessPacketReviewStep[];
  summary: {
    packetCheckCount: number;
    passedPacketCheckCount: number;
    evidenceDigestCount: number;
    operatorRequirementCount: number;
    reviewStepCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadinessPacketMessage[];
  warnings: ReadinessPacketMessage[];
  recommendations: ReadinessPacketMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown: string;
    productionLiveProbeRealReadSmokeOperatorRunbookVerificationJson: string;
    productionLiveProbeRealReadSmokeOperatorRunbookJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: string;
  };
  nextActions: string[];
}

export interface ReadinessPacketEvidence {
  name: string;
  profileVersion: string;
  digest: string;
  role: string;
}

export interface ReadinessPacketRequirement {
  code: string;
  required: boolean;
  evidence: string;
}

export interface ReadinessPacketReviewStep {
  order: number;
  title: string;
  action: string;
  blocksProductionPassIfMissing: true;
}

export interface ReadinessPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-verification"
    | "operator-runbook"
    | "runbook-verification"
    | "readiness-packet"
    | "runtime-config";
  message: string;
}
