import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveSummaryTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot {
  snapshotVersion: "Node v626";
  inputReceiptVersion:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt["receiptVersion"];
  snapshotState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchive: boolean;
  receiptDigestValue: string;
  snapshotDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-summary-receipt-archive-snapshot";
    value: string;
    coveredSectionCount: number;
  };
  archivedSections: string[];
  archivedSectionCount: number;
  receiptLineCount: number;
  summaryLineCount: number;
  blockedReasonCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerificationGates {
  snapshotReady: boolean;
  snapshotDigestPresent: boolean;
  archivedSectionsComplete: boolean;
  excludesRawCredential: boolean;
  excludesRuntimePayload: boolean;
  noRoutingActivationRequired: boolean;
  noFreshSiblingEvidenceRequired: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification {
  verificationVersion: "Node v627";
  inputSnapshotVersion:
    ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot["snapshotVersion"];
  verificationState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerificationGates;
  blockedReasonCodes: string[];
  snapshotDigestValue: string;
  archivedSectionCount: number;
  receiptLineCount: number;
  summaryLineCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
