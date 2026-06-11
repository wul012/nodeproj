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
import { loadProductionShardExecutionOwnerReceiptRequestPacket } from "./productionShardExecutionOwnerReceiptRequestPacket.js";
import { loadProductionShardExecutionRouteCatalogForwardCompatibility } from "./productionShardExecutionRouteCatalogForwardCompatibility.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import { loadProductionShardExecutionSignedApprovalIntakeContract } from "./productionShardExecutionSignedApprovalIntakeContract.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-external-evidence-closeout";

export function loadProductionShardExecutionExternalEvidenceCloseout(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const v2084 = loadProductionShardExecutionRouteCatalogForwardCompatibility(input);
  const v2085 = loadProductionShardExecutionSignedApprovalIntakeContract(input);
  const v2086 = loadProductionShardExecutionManagedAuditStoreBindingPreflight(input);
  const v2087 = loadProductionShardExecutionOwnerReceiptRequestPacket(input);
  const sourceProfiles = [v2084, v2085, v2086, v2087];
  const sources = [
    profileSource("node-v2084-route-catalog-forward-compatibility", v2084, "Route catalog forward compatibility"),
    profileSource("node-v2085-signed-approval-intake-contract", v2085, "Signed approval intake contract"),
    profileSource("node-v2086-managed-audit-store-binding-preflight", v2086, "Managed audit store binding preflight"),
    profileSource("node-v2087-owner-receipt-request-packet", v2087, "Owner receipt request packet"),
  ];
  const controls = [
    satisfiedControl({
      id: "external-evidence-precondition-batch-closed",
      title: "External-evidence precondition batch is closed",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: sources.map((source) => `${source.version}:${source.digest}`).join("|"),
      nextAction: "Use this closeout as the Node-side packet while waiting for real signed external artifacts.",
    }),
    satisfiedControl({
      id: "remaining-external-evidence-gap-named",
      title: "Remaining external evidence gap is named",
      owner: "cross-project",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: "signed approval artifact + managed audit store owner + Java/mini-kv owner receipts",
      nextAction: "Do not open production execution until these external artifacts are present and verified.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    v2084Ready: v2084.readyForNextStage,
    v2085Ready: v2085.readyForNextStage,
    v2086Ready: v2086.readyForNextStage,
    v2087Ready: v2087.readyForNextStage,
    fourExternalPreconditionSourcesIncluded: sources.length === 4,
    allExternalPreconditionSourcesReady: sources.every((source) => source.ready),
    allSourceDigestsValid: sources.every((source) =>
      typeof source.digest === "string" && /^[a-f0-9]{64}$/.test(source.digest)),
    sourceOrderPreserved:
      sources.map((source) => source.version).join(">") === "Node v2084>Node v2085>Node v2086>Node v2087",
    allSourceChecksPassed: sources.every((source) => source.checkCount === source.passedCheckCount),
    productionAuthorityStillBlocked: sourceProfiles.every((profile) =>
      profile.readyForProductionShardExecution === false && profile.safety.executionAllowed === false),
    externalEvidenceStillMissingByDesign: true,
    javaMiniKvParallelGuidancePreserved: sourceProfiles.every((profile) =>
      profile.javaMiniKvRecommendedParallel && !profile.nodeIsUpstreamPreApprovalBlocker),
    artifactLayoutSeparatedByVersion: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution external evidence closeout",
    profileVersion: "production-shard-execution-external-evidence-closeout.v1",
    stageId: "external-evidence-closeout",
    activeNodeVersion: "Node v2088",
    sourceNodeVersion: "Node v2087",
    readyState: "external-evidence-closeout-ready",
    readyDecision: "close-external-evidence-precondition-batch",
    sources,
    controls,
    stagePayload: {
      externalEvidenceCloseout: {
        closedSpan: "Node v2084 through Node v2088",
        nodeSidePreconditionsReady: true,
        productionAuthority: false,
        requiredExternalArtifactsBeforeRealExecution: [
          "real signed production execution approval artifact",
          "managed audit production store owner binding",
          "Java abort / rollback / cleanup owner receipt",
          "mini-kv abort / rollback / cleanup owner receipt",
          "cross-project cleanup reconciliation receipt",
        ],
      },
      growthStopCondition:
        "Stop adding Node-only precondition versions until at least one required external artifact is actually received.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2088-production-shard-execution-external-evidence-closeout-roadmap.md",
      "docs/plans3/v2089-production-shard-execution-real-external-artifact-intake-roadmap.md",
    ),
    nextActions: [
      "Hold further Node-only feature growth until real external signed approval or owner receipt evidence arrives.",
      "Let Java and mini-kv continue in parallel using the v2087 receipt request slots.",
      "Keep production execution disabled; this closeout is a precondition packet, not execution authority.",
    ],
    warnings: [
      {
        code: "EXTERNAL_EVIDENCE_CLOSEOUT_STILL_BLOCKS_PRODUCTION",
        severity: "warning",
        source: "node-v2088",
        message: "v2088 closes the Node precondition batch but still lacks real external approval and owner receipts.",
      },
    ],
    recommendations: [
      {
        code: "WAIT_FOR_REAL_EXTERNAL_ARTIFACTS",
        severity: "recommendation",
        source: "node-v2088",
        message: "The next meaningful step is real external artifact intake, not another internal readiness layer.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionExternalEvidenceCloseoutMarkdown,
};
