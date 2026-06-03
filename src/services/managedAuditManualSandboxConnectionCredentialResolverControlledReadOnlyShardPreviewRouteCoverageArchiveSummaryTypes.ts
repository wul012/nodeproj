import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary {
  summaryVersion: "Node v624";
  inputVerificationVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification["verificationVersion"];
  summaryState: "ready-for-read-only-handoff-route-coverage-archive-summary" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummary: boolean;
  verificationState:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification["verificationState"];
  snapshotDigestValue: string;
  summaryDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-summary-lines";
    value: string;
    coveredLineCount: number;
  };
  summaryLines: string[];
  summaryLineCount: number;
  gateCount: number;
  passedGateCount: number;
  archivedSectionCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt {
  receiptVersion: "Node v625";
  inputSummaryVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary["summaryVersion"];
  receiptState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt: boolean;
  summaryState: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummary["summaryState"];
  summaryDigestValue: string;
  receiptDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-summary-receipt";
    value: string;
    coveredSummaryLineCount: number;
    coveredBlockedReasonCount: number;
  };
  receiptLines: string[];
  receiptLineCount: number;
  summaryLineCount: number;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
