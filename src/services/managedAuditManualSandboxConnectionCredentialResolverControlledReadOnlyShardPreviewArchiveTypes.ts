import type {
  ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot {
  snapshotVersion: "Node v603";
  inputReviewDigestVersion: ControlledReadOnlyShardPreviewSourceMatrixReviewDigest["digestVersion"];
  archiveState: "ready-for-controlled-review-archive" | "blocked";
  readyForControlledReviewArchive: boolean;
  digestValue: string;
  archivedSections: string[];
  archivedSectionCount: number;
  checklistState: ControlledReadOnlyShardPreviewSourceMatrixReviewDigest["checklistState"];
  itemCount: number;
  blockedItemCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport {
  exportVersion: "Node v605";
  inputArchiveSnapshotVersion: ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshot["snapshotVersion"];
  exportState: "ready-for-summary-export" | "blocked";
  readyForSummaryExport: boolean;
  digestValue: string;
  summaryDigest: {
    algorithm: "sha256";
    scope: "archive-snapshot-summary-lines";
    value: string;
    coveredLineCount: number;
  };
  summaryLines: string[];
  summaryLineCount: number;
  archivedSectionCount: number;
  blockedItemCount: number;
  includesRawCredential: false;
  includesRuntimePayload: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
