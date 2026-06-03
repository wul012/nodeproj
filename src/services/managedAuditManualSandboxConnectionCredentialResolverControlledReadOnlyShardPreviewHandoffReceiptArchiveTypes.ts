import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffConsumerTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot {
  snapshotVersion: "Node v616";
  inputReceiptVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt["receiptVersion"];
  snapshotState: "ready-for-read-only-summary-consumer-receipt-archive" | "blocked";
  readyForReadOnlySummaryConsumerReceiptArchive: boolean;
  receiptDigestValue: string;
  snapshotDigest: {
    algorithm: "sha256";
    scope: "handoff-summary-consumer-receipt-archive-snapshot";
    value: string;
    coveredSectionCount: number;
  };
  archivedSections: string[];
  archivedSectionCount: number;
  receiptLineCount: number;
  blockedReasonCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationGates {
  snapshotReady: boolean;
  snapshotDigestPresent: boolean;
  archivedSectionsComplete: boolean;
  excludesRawCredential: boolean;
  excludesRuntimePayload: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification {
  verificationVersion: "Node v617";
  inputSnapshotVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot["snapshotVersion"];
  verificationState: "ready-for-read-only-summary-consumer-receipt-archive-verification" | "blocked";
  readyForReadOnlySummaryConsumerReceiptArchiveVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerificationGates;
  blockedReasonCodes: string[];
  snapshotDigestValue: string;
  archivedSectionCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
