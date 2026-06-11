import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest } from "./productionShardExecutionManagedAuditStoreOwnerBindingRequest.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-owner-receipt-dry-run-reconciliation";

const OWNER_RECEIPT_RECONCILIATION = [
  { owner: "java", slot: "java-abort-rollback-cleanup-owner-receipt", signed: false },
  { owner: "mini-kv", slot: "mini-kv-abort-rollback-cleanup-owner-receipt", signed: false },
  { owner: "cross-project", slot: "cross-project-cleanup-reconciliation-receipt", signed: false },
] as const;

export function loadProductionShardExecutionOwnerReceiptDryRunReconciliation(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest(input);
  const sources = [
    profileSource("node-v2091-managed-audit-store-owner-binding-request", source, "Store owner binding request"),
  ];
  const controls = [
    satisfiedControl({
      id: "owner-receipt-slots-reconciled",
      title: "Owner receipt slots are dry-run reconciled",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: OWNER_RECEIPT_RECONCILIATION.map((item) => `${item.owner}:${item.slot}`).join(","),
      nextAction: "Use this reconciliation to close the dry-run batch while waiting for signed receipts.",
    }),
    satisfiedControl({
      id: "owner-receipts-remain-unsigned",
      title: "Owner receipts remain unsigned",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "signed=false for every dry-run reconciliation row",
      nextAction: "Require real Java, mini-kv, and cross-project signatures before production execution.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2091Ready: source.readyForNextStage,
    sourceV2091DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    threeReceiptRowsPresent: OWNER_RECEIPT_RECONCILIATION.length === 3,
    javaReceiptRowPresent: OWNER_RECEIPT_RECONCILIATION.some((item) => item.owner === "java"),
    miniKvReceiptRowPresent: OWNER_RECEIPT_RECONCILIATION.some((item) => item.owner === "mini-kv"),
    crossProjectReceiptRowPresent:
      OWNER_RECEIPT_RECONCILIATION.some((item) => item.owner === "cross-project"),
    everyReceiptRowUnsigned: OWNER_RECEIPT_RECONCILIATION.every((item) => item.signed === false),
    noReceiptClaimedAuthoritative: true,
    javaMiniKvParallelGuidancePreserved: source.javaMiniKvRecommendedParallel,
    nodeStillDoesNotBlockSiblingProgress: !source.nodeIsUpstreamPreApprovalBlocker,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution owner receipt dry-run reconciliation",
    profileVersion: "production-shard-execution-owner-receipt-dry-run-reconciliation.v1",
    stageId: "owner-receipt-dry-run-reconciliation",
    activeNodeVersion: "Node v2092",
    sourceNodeVersion: "Node v2091",
    readyState: "owner-receipt-dry-run-reconciliation-ready",
    readyDecision: "accept-owner-receipt-dry-run-reconciliation",
    sources,
    controls,
    stagePayload: {
      ownerReceiptDryRunReconciliation: {
        reconciliationMode: "dry-run-unsigned",
        rows: OWNER_RECEIPT_RECONCILIATION,
        signedOwnerReceiptPresent: false,
      },
      growthStopCondition:
        "Do not add another receipt reconciliation unless a real owner signs or rejects one row.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2092-production-shard-execution-owner-receipt-dry-run-reconciliation-roadmap.md",
      "docs/plans3/v2093-production-shard-execution-external-artifact-dry-run-closeout-roadmap.md",
    ),
    nextActions: [
      "Use v2092 to close the receipt-slot dry run without claiming signatures.",
      "Close v2089-v2093 as a dry-run artifact intake batch.",
      "Keep Java and mini-kv parallel so they can produce real owner receipts against these rows.",
    ],
    warnings: [
      {
        code: "OWNER_RECEIPT_RECONCILIATION_IS_UNSIGNED",
        severity: "warning",
        source: "node-v2092",
        message: "v2092 reconciles receipt slots but every row remains unsigned and non-authoritative.",
      },
    ],
    recommendations: [
      {
        code: "CLOSE_DRY_RUN_ARTIFACT_BATCH_NEXT",
        severity: "recommendation",
        source: "node-v2092",
        message: "Close the dry-run artifact intake batch and wait for real external signatures.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionOwnerReceiptDryRunReconciliationMarkdown,
};
