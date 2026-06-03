import type {
  ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem {
  order: number;
  check:
    | "confirm-source-matrix-consumer"
    | "review-controlled-drift-findings"
    | "confirm-routing-remains-disabled"
    | "confirm-sibling-projects-can-continue";
  status: "ready" | "needs-review" | "blocked";
  severity: "info" | "warning" | "blocker";
  evidence: string;
  operatorAction: string;
  routingActivationAllowed: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist {
  checklistVersion: "Node v601";
  inputDriftSummaryVersion: ControlledReadOnlyShardPreviewSourceMatrixDriftSummary["summaryVersion"];
  checklistState: "ready-for-controlled-review" | "blocked";
  readyForOperatorReview: boolean;
  itemCount: number;
  readyItemCount: number;
  reviewItemCount: number;
  blockedItemCount: number;
  items: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem[];
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixReviewDigest {
  digestVersion: "Node v602";
  inputChecklistVersion: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist["checklistVersion"];
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
  readyForControlledReviewArchive: boolean;
  checklistState: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist["checklistState"];
  itemCount: number;
  blockedItemCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
