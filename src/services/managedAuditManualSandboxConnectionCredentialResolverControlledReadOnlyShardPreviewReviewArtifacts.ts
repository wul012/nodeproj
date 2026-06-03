import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewSource,
  ControlledReadOnlyShardPreviewSourceMatrix,
  ControlledReadOnlyShardPreviewSourceMatrixConsumer,
  ControlledReadOnlyShardPreviewSourceMatrixDriftFinding,
  ControlledReadOnlyShardPreviewSourceMatrixDriftSummary,
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist,
  ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem,
  ControlledReadOnlyShardPreviewSourceMatrixReviewDigest,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export {
  createSourceMatrixArchiveSnapshot,
  createSourceMatrixArchiveSnapshotSummaryExport,
  createSourceMatrixHandoffNotes,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveHandoffArtifacts.js";

export {
  createSourceMatrixHandoffSummary,
  createSourceMatrixHandoffSummaryConsumer,
  createSourceMatrixHandoffSummaryConsumerExport,
  createSourceMatrixHandoffSummaryConsumerReceipt,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot,
  createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification,
  createSourceMatrixHandoffRouteCoverage,
  createSourceMatrixHandoffRouteCoverageArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummary,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot,
  createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification,
  createSourceMatrixHandoffRouteCoverageArchiveVerification,
  createSourceMatrixHandoffRouteCoverageVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.js";

const REQUIRED_MATRIX_SOURCES: readonly ControlledReadOnlyShardPreviewSource[] = Object.freeze(["java", "miniKv"]);
const REVIEW_DIGEST_COVERED_FIELDS = Object.freeze([
  "checklistVersion",
  "checklistState",
  "readyForOperatorReview",
  "itemCounts",
  "items",
  "safetyBoundaries",
]);

export function createSourceMatrixConsumer(
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix,
): ControlledReadOnlyShardPreviewSourceMatrixConsumer {
  const observedSources = uniqueSources(sourceMatrix.sources.map((source) => source.source));
  const missingSources = REQUIRED_MATRIX_SOURCES.filter((source) => !observedSources.includes(source));
  const gates = {
    observedRequiredSources: missingSources.length === 0 && observedSources.length === REQUIRED_MATRIX_SOURCES.length,
    allSourcesReady: sourceMatrix.allSourcesReady,
    shardCountsComparable: sourceMatrix.shardCountsComparable,
    slotCountsComparable: sourceMatrix.slotCountsComparable,
    routingModesDeclared: sourceMatrix.routingModes.length > 0,
    readOnlyConsumerOnly: true as const,
  };
  const gateValues = Object.values(gates);
  const readyForControlledReadOnlyConsumption = gateValues.every(Boolean);

  return {
    consumerVersion: "Node v599",
    inputSourceVersion: "Node v598",
    decision: readyForControlledReadOnlyConsumption ? "ready-for-controlled-read-only-consumption" : "blocked",
    readyForControlledReadOnlyConsumption,
    requiredSources: [...REQUIRED_MATRIX_SOURCES],
    observedSources,
    missingSources,
    gateCount: gateValues.length,
    passedGateCount: gateValues.filter(Boolean).length,
    gates,
    comparison: {
      routingModes: sourceMatrix.routingModes,
      routingModeCount: sourceMatrix.routingModes.length,
      javaShardCount: sourceMatrix.sources.find((source) => source.source === "java")?.shardCount ?? null,
      miniKvShardCount: sourceMatrix.sources.find((source) => source.source === "miniKv")?.shardCount ?? null,
      shardCountDelta: sourceMatrix.shardCountDelta,
      javaSlotCount: sourceMatrix.sources.find((source) => source.source === "java")?.slotCount ?? null,
      miniKvSlotCount: sourceMatrix.sources.find((source) => source.source === "miniKv")?.slotCount ?? null,
      slotCountDelta: sourceMatrix.slotCountDelta,
    },
    blockedReasonCodes: createSourceMatrixConsumerBlockedReasons(gates),
    activatesRouting: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

export function createSourceMatrixDriftSummary(
  sourceMatrix: ControlledReadOnlyShardPreviewSourceMatrix,
  sourceMatrixConsumer: ControlledReadOnlyShardPreviewSourceMatrixConsumer,
): ControlledReadOnlyShardPreviewSourceMatrixDriftSummary {
  const java = sourceMatrix.sources.find((source) => source.source === "java") ?? null;
  const miniKv = sourceMatrix.sources.find((source) => source.source === "miniKv") ?? null;
  const findings: ControlledReadOnlyShardPreviewSourceMatrixDriftFinding[] = [
    createComparableDriftFinding("routingMode", java?.routingMode ?? null, miniKv?.routingMode ?? null,
      "Routing modes differ across read-only shard readiness sources."),
    createComparableDriftFinding("shardCount", java?.shardCount ?? null, miniKv?.shardCount ?? null,
      "Shard counts differ across read-only shard readiness sources."),
    createComparableDriftFinding("slotCount", java?.slotCount ?? null, miniKv?.slotCount ?? null,
      "Slot counts differ across read-only shard readiness sources."),
  ];

  if (!sourceMatrixConsumer.readyForControlledReadOnlyConsumption) {
    findings.unshift({
      dimension: "consumerReadiness",
      status: "blocked",
      severity: "blocker",
      javaValue: null,
      miniKvValue: null,
      message: `Source matrix consumer is blocked: ${sourceMatrixConsumer.blockedReasonCodes.join(", ") || "unknown"}.`,
    });
  }

  const driftFindingCount = findings.filter((finding) => finding.status === "drift-detected").length;
  const blockingFindingCount = findings.filter((finding) => finding.severity === "blocker").length;
  const readyForControlledDriftReview =
    sourceMatrixConsumer.readyForControlledReadOnlyConsumption && blockingFindingCount === 0;

  return {
    summaryVersion: "Node v600",
    inputConsumerVersion: "Node v599",
    driftState: readyForControlledDriftReview
      ? driftFindingCount > 0 ? "controlled-drift-detected" : "aligned"
      : "blocked",
    readyForControlledDriftReview,
    findingCount: findings.length,
    driftFindingCount,
    blockingFindingCount,
    comparableFindingCount: findings.filter((finding) =>
      finding.status === "aligned" || finding.status === "drift-detected").length,
    findings,
    requiresRoutingActivation: false,
    requiresFreshSiblingEvidence: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

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

function createSourceMatrixConsumerBlockedReasons(
  gates: ControlledReadOnlyShardPreviewSourceMatrixConsumer["gates"],
): string[] {
  return [
    gates.observedRequiredSources ? null : "MISSING_REQUIRED_SOURCE",
    gates.allSourcesReady ? null : "SOURCE_NOT_READY",
    gates.shardCountsComparable ? null : "SHARD_COUNTS_NOT_COMPARABLE",
    gates.slotCountsComparable ? null : "SLOT_COUNTS_NOT_COMPARABLE",
    gates.routingModesDeclared ? null : "ROUTING_MODE_NOT_DECLARED",
  ].filter((reason): reason is string => reason !== null);
}

function createComparableDriftFinding(
  dimension: Exclude<ControlledReadOnlyShardPreviewSourceMatrixDriftFinding["dimension"], "consumerReadiness">,
  javaValue: string | number | null,
  miniKvValue: string | number | null,
  driftMessage: string,
): ControlledReadOnlyShardPreviewSourceMatrixDriftFinding {
  if (javaValue === null || miniKvValue === null) {
    return {
      dimension,
      status: "not-comparable",
      severity: "blocker",
      javaValue,
      miniKvValue,
      message: "Source values are not both present, so controlled drift review is blocked.",
    };
  }

  if (javaValue === miniKvValue) {
    return {
      dimension,
      status: "aligned",
      severity: "info",
      javaValue,
      miniKvValue,
      message: "Source values are aligned.",
    };
  }

  return {
    dimension,
    status: "drift-detected",
    severity: "warning",
    javaValue,
    miniKvValue,
    message: driftMessage,
  };
}

function uniqueSources(
  sources: ControlledReadOnlyShardPreviewSource[],
): ControlledReadOnlyShardPreviewSource[] {
  return REQUIRED_MATRIX_SOURCES.filter((source) => sources.includes(source));
}
