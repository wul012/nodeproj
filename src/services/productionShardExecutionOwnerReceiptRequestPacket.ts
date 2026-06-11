import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionManagedAuditStoreBindingPreflight } from "./productionShardExecutionManagedAuditStoreBindingPreflight.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-owner-receipt-request-packet";

const OWNER_RECEIPT_REQUESTS = [
  {
    id: "java-abort-rollback-owner-receipt",
    owner: "java",
    requestedEvidence:
      "Java owner signs abort owner, rollback action, lifecycle ownership, and read-only cleanup proof fields.",
  },
  {
    id: "mini-kv-abort-rollback-owner-receipt",
    owner: "mini-kv",
    requestedEvidence:
      "mini-kv owner signs abort owner, rollback action, lifecycle ownership, and read-only cleanup proof fields.",
  },
  {
    id: "cross-project-cleanup-reconciliation-receipt",
    owner: "cross-project",
    requestedEvidence:
      "Node, Java, and mini-kv agree how no-start proof or cleanup proof is archived after a failed window.",
  },
] as const;

export function loadProductionShardExecutionOwnerReceiptRequestPacket(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionManagedAuditStoreBindingPreflight(input);
  const sources = [
    profileSource("node-v2086-managed-audit-store-binding-preflight", source, "Managed audit store binding preflight"),
  ];
  const controls = [
    satisfiedControl({
      id: "owner-receipt-requests-are-specific",
      title: "Owner receipt requests are specific",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: OWNER_RECEIPT_REQUESTS.map((request) => request.id).join(","),
      nextAction: "Send only these receipt slots to Java and mini-kv; do not ask for broad new work.",
    }),
    satisfiedControl({
      id: "owner-receipts-not-yet-claimed",
      title: "Owner receipts are requested, not fabricated",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "The packet defines required receipt slots but records no signed Java or mini-kv owner receipt.",
      nextAction: "Wait for real owner-signed receipt artifacts before moving toward execution authority.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2086Ready: source.readyForNextStage,
    sourceV2086DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    threeOwnerReceiptRequestsNamed: OWNER_RECEIPT_REQUESTS.length === 3,
    javaOwnerReceiptRequested: OWNER_RECEIPT_REQUESTS.some((request) => request.owner === "java"),
    miniKvOwnerReceiptRequested: OWNER_RECEIPT_REQUESTS.some((request) => request.owner === "mini-kv"),
    crossProjectCleanupReceiptRequested: OWNER_RECEIPT_REQUESTS.some((request) => request.owner === "cross-project"),
    everyReceiptMentionsCleanupOrRollback: OWNER_RECEIPT_REQUESTS.every((request) =>
      /cleanup|rollback/.test(request.requestedEvidence)),
    noReceiptIsRecordedAsSigned: true,
    javaMiniKvCanContinueParallel: source.javaMiniKvRecommendedParallel,
    nodeDoesNotBlockSiblingProgress: !source.nodeIsUpstreamPreApprovalBlocker,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution owner receipt request packet",
    profileVersion: "production-shard-execution-owner-receipt-request-packet.v1",
    stageId: "owner-receipt-request-packet",
    activeNodeVersion: "Node v2087",
    sourceNodeVersion: "Node v2086",
    readyState: "owner-receipt-request-packet-ready",
    readyDecision: "accept-owner-receipt-request-packet",
    sources,
    controls,
    stagePayload: {
      ownerReceiptRequestPacket: {
        packetMode: "request-only-no-signed-owner-receipts-present",
        receiptRequests: OWNER_RECEIPT_REQUESTS,
        nodeWaitsForFreshSiblingEvidence: false,
      },
      growthStopCondition:
        "Do not add more receipt request packets unless Java or mini-kv rejects one of these exact receipt slots.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2087-production-shard-execution-owner-receipt-request-packet-roadmap.md",
      "docs/plans3/v2088-production-shard-execution-external-evidence-closeout-roadmap.md",
    ),
    nextActions: [
      "Use v2087 as the concise request packet for Java and mini-kv owner receipts.",
      "Close this Node-only precondition batch in v2088 without pretending the external receipts already exist.",
      "Let Java and mini-kv continue in parallel using these receipt slots as their target.",
    ],
    warnings: [
      {
        code: "OWNER_RECEIPTS_REQUESTED_NOT_RECEIVED",
        severity: "warning",
        source: "node-v2087",
        message: "v2087 defines precise owner receipt requests but does not contain real signed sibling receipts.",
      },
    ],
    recommendations: [
      {
        code: "CLOSE_EXTERNAL_EVIDENCE_PRECONDITIONS_NEXT",
        severity: "recommendation",
        source: "node-v2087",
        message: "Close the Node precondition batch next and make the remaining external evidence gap explicit.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionOwnerReceiptRequestPacketMarkdown,
};
