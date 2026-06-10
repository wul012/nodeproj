import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationTypes.js";

export type JavaV51FieldGuideTag = "v51订单平台ops-evidence-field-guide";
export type MiniKvV60FieldGuideTag = "第六十版运行时只读字段说明";

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
    javaFieldGuideTag: JavaV51FieldGuideTag;
    javaFieldGuideVersion: "java-ops-evidence-field-guide.v1";
    miniKvFieldGuideTag: MiniKvV60FieldGuideTag;
    miniKvFieldGuideVersion: "mini-kv-runtime-read-field-guide.v1";
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

export type FieldGuideReference = {
  project: "advanced-order-platform";
  plannedVersion: "Java v51";
  tag: JavaV51FieldGuideTag;
  guideVersion: "java-ops-evidence-field-guide.v1";
  guidePath: "/contracts/ops-evidence-field-guide.sample.json";
  intendedConsumer: "Node read-only capture release evidence review";
  mayBeUsedForProductionPass: false;
  readOnly: true;
  executionAllowed: false;
  runtimeFileRead: false;
} | {
  project: "mini-kv";
  plannedVersion: "mini-kv v60";
  tag: MiniKvV60FieldGuideTag;
  guideVersion: "mini-kv-runtime-read-field-guide.v1";
  guidePath: "fixtures/readonly/runtime-read-field-guide.json";
  intendedConsumer: "Node v159 read-only capture release evidence review";
  mayBeUsedForProductionPass: false;
  readOnly: true;
  executionAllowed: false;
  runtimeFileRead: false;
};

export interface ReadOnlyWindowCaptureReleaseEvidenceReviewMessage {
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
