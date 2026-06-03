import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist,
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem,
  ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const REVIEW_DIGEST_COVERED_FIELDS = Object.freeze([
  "checklistVersion",
  "checklistState",
  "readyForOperatorReview",
  "itemCounts",
  "items",
  "safetyBoundaries",
]);

export function createSourceMatrixReviewChecklist(
  driftSummary: ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
): ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist {
  const items: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem[] = [
    {
      order: 1,
      check: "confirm-source-matrix-consumer",
      status: driftSummary.readyForControlledDriftReview ? "ready" : "blocked",
      severity: driftSummary.readyForControlledDriftReview ? "info" : "blocker",
      evidence: `input=${driftSummary.inputConsumerVersion}; blockers=${driftSummary.blockingFindingCount}`,
      operatorAction: driftSummary.readyForControlledDriftReview
        ? "Confirm the source-matrix consumer is ready for read-only review."
        : "Resolve blocked source-matrix consumer findings before review.",
      routingActivationAllowed: false,
    },
    {
      order: 2,
      check: "review-controlled-drift-findings",
      status: driftSummary.readyForControlledDriftReview
        ? driftSummary.driftFindingCount > 0 ? "needs-review" : "ready"
        : "blocked",
      severity: driftSummary.readyForControlledDriftReview
        ? driftSummary.driftFindingCount > 0 ? "warning" : "info"
        : "blocker",
      evidence: `drift=${driftSummary.driftFindingCount}; comparable=${driftSummary.comparableFindingCount}`,
      operatorAction: driftSummary.driftFindingCount > 0
        ? "Review each controlled drift finding and keep routing disabled."
        : "Confirm there are no controlled drift findings to review.",
      routingActivationAllowed: false,
    },
    {
      order: 3,
      check: "confirm-routing-remains-disabled",
      status: "ready",
      severity: "info",
      evidence: `requiresRoutingActivation=${driftSummary.requiresRoutingActivation}`,
      operatorAction: "Confirm this checklist does not authorize active shard routing.",
      routingActivationAllowed: false,
    },
    {
      order: 4,
      check: "confirm-sibling-projects-can-continue",
      status: "ready",
      severity: "info",
      evidence: `requiresFreshSiblingEvidence=${driftSummary.requiresFreshSiblingEvidence}`,
      operatorAction: "Confirm Java and mini-kv can continue in parallel without waiting for Node.",
      routingActivationAllowed: false,
    },
  ];
  const blockedItemCount = items.filter((item) => item.status === "blocked").length;

  return {
    checklistVersion: "Node v601",
    inputDriftSummaryVersion: "Node v600",
    checklistState: blockedItemCount === 0 ? "ready-for-controlled-review" : "blocked",
    readyForOperatorReview: blockedItemCount === 0,
    itemCount: items.length,
    readyItemCount: items.filter((item) => item.status === "ready").length,
    reviewItemCount: items.filter((item) => item.status === "needs-review").length,
    blockedItemCount,
    items,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixReviewDigest(
  checklist: ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist,
): ControlledReadOnlyShardPreviewSourceMatrixReviewDigest {
  const material = {
    checklistVersion: checklist.checklistVersion,
    checklistState: checklist.checklistState,
    readyForOperatorReview: checklist.readyForOperatorReview,
    itemCounts: {
      itemCount: checklist.itemCount,
      readyItemCount: checklist.readyItemCount,
      reviewItemCount: checklist.reviewItemCount,
      blockedItemCount: checklist.blockedItemCount,
    },
    items: checklist.items.map((item) => ({
      order: item.order,
      check: item.check,
      status: item.status,
      severity: item.severity,
      evidence: item.evidence,
      routingActivationAllowed: item.routingActivationAllowed,
    })),
    safetyBoundaries: {
      requiresApproval: checklist.requiresApproval,
      requiresRoutingActivation: checklist.requiresRoutingActivation,
      requiresFreshSiblingEvidence: checklist.requiresFreshSiblingEvidence,
      startsServices: checklist.startsServices,
      mutatesSiblingState: checklist.mutatesSiblingState,
    },
  };

  return {
    digestVersion: "Node v602",
    inputChecklistVersion: "Node v601",
    algorithm: "sha256",
    value: sha256StableJson(material),
    coveredFields: [...REVIEW_DIGEST_COVERED_FIELDS],
    readyForControlledReviewArchive: checklist.readyForOperatorReview && checklist.blockedItemCount === 0,
    checklistState: checklist.checklistState,
    itemCount: checklist.itemCount,
    blockedItemCount: checklist.blockedItemCount,
    requiresApproval: false,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}
