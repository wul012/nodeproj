import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffReceiptArchiveTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage {
  coverageVersion: "Node v620";
  inputVerificationVersion:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification["verificationVersion"];
  coverageState: "ready-for-read-only-handoff-route-coverage" | "blocked";
  readyForReadOnlyHandoffRouteCoverage: boolean;
  routeSurface: "controlled-read-only-shard-preview";
  verificationState:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification["verificationState"];
  coveredSections: string[];
  coveredSectionCount: number;
  coverageDigest: {
    algorithm: "sha256";
    scope: "handoff-route-markdown-sections";
    value: string;
    coveredSectionCount: number;
  };
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerificationGates {
  coverageReady: boolean;
  coverageDigestPresent: boolean;
  sectionCountCovered: boolean;
  noRoutingActivationRequired: boolean;
  noFreshSiblingEvidenceRequired: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification {
  verificationVersion: "Node v621";
  inputCoverageVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverage["coverageVersion"];
  verificationState: "ready-for-read-only-handoff-route-coverage-verification" | "blocked";
  readyForReadOnlyHandoffRouteCoverageVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerificationGates;
  blockedReasonCodes: string[];
  coverageDigestValue: string;
  coveredSectionCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
