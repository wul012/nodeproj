import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionExternalArtifactIntakeEnvelope } from "./productionShardExecutionExternalArtifactIntakeEnvelope.js";
import { loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest } from "./productionShardExecutionManagedAuditStoreOwnerBindingRequest.js";
import { loadProductionShardExecutionOwnerReceiptDryRunReconciliation } from "./productionShardExecutionOwnerReceiptDryRunReconciliation.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import { loadProductionShardExecutionSignedApprovalFixtureValidation } from "./productionShardExecutionSignedApprovalFixtureValidation.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-external-artifact-dry-run-closeout";

export function loadProductionShardExecutionExternalArtifactDryRunCloseout(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const v2089 = loadProductionShardExecutionExternalArtifactIntakeEnvelope(input);
  const v2090 = loadProductionShardExecutionSignedApprovalFixtureValidation(input);
  const v2091 = loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest(input);
  const v2092 = loadProductionShardExecutionOwnerReceiptDryRunReconciliation(input);
  const sourceProfiles = [v2089, v2090, v2091, v2092];
  const sources = [
    profileSource("node-v2089-external-artifact-intake-envelope", v2089, "External artifact intake envelope"),
    profileSource("node-v2090-signed-approval-fixture-validation", v2090, "Signed approval fixture validation"),
    profileSource("node-v2091-managed-audit-store-owner-binding-request", v2091, "Store owner binding request"),
    profileSource("node-v2092-owner-receipt-dry-run-reconciliation", v2092, "Owner receipt dry-run reconciliation"),
  ];
  const controls = [
    satisfiedControl({
      id: "dry-run-artifact-intake-batch-closed",
      title: "Dry-run artifact intake batch is closed",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: sources.map((source) => `${source.version}:${source.digest}`).join("|"),
      nextAction: "Wait for real external artifacts before adding another Node-only intake layer.",
    }),
    satisfiedControl({
      id: "f-folder-layout-applied",
      title: "f-folder explanation and image layout is applied",
      owner: "node",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: "f/<version>/解释 for explanations; f/<version>/图片 only when image evidence exists",
      nextAction: "Keep future explanations and images outside e/<version>/evidence.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    v2089Ready: v2089.readyForNextStage,
    v2090Ready: v2090.readyForNextStage,
    v2091Ready: v2091.readyForNextStage,
    v2092Ready: v2092.readyForNextStage,
    fourDryRunSourcesIncluded: sources.length === 4,
    allDryRunSourcesReady: sources.every((source) => source.ready),
    allSourceDigestsValid: sources.every((source) =>
      typeof source.digest === "string" && /^[a-f0-9]{64}$/.test(source.digest)),
    sourceOrderPreserved:
      sources.map((source) => source.version).join(">") === "Node v2089>Node v2090>Node v2091>Node v2092",
    allSourceChecksPassed: sources.every((source) => source.checkCount === source.passedCheckCount),
    productionAuthorityStillBlocked: sourceProfiles.every((profile) =>
      profile.readyForProductionShardExecution === false && profile.safety.executionAllowed === false),
    dryRunArtifactsRemainNonAuthoritative: true,
    fFolderLayoutAppliedForExplanations: true,
    javaMiniKvParallelGuidancePreserved: sourceProfiles.every((profile) =>
      profile.javaMiniKvRecommendedParallel && !profile.nodeIsUpstreamPreApprovalBlocker),
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution external artifact dry-run closeout",
    profileVersion: "production-shard-execution-external-artifact-dry-run-closeout.v1",
    stageId: "external-artifact-dry-run-closeout",
    activeNodeVersion: "Node v2093",
    sourceNodeVersion: "Node v2092",
    readyState: "external-artifact-dry-run-closeout-ready",
    readyDecision: "close-external-artifact-dry-run-batch",
    sources,
    controls,
    stagePayload: {
      externalArtifactDryRunCloseout: {
        closedSpan: "Node v2089 through Node v2093",
        dryRunOnly: true,
        productionAuthority: false,
        realArtifactsRequiredNext: [
          "real signed production approval",
          "real managed audit store owner binding",
          "real Java owner receipt",
          "real mini-kv owner receipt",
          "real cleanup reconciliation receipt",
        ],
      },
      archiveLayout: {
        evidence: "e/<version>/evidence",
        explanation: "f/<version>/解释",
        images: "f/<version>/图片 only when image evidence exists",
      },
      growthStopCondition:
        "Stop Node-only dry-run growth until at least one required real external artifact is received.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2093-production-shard-execution-external-artifact-dry-run-closeout-roadmap.md",
      "docs/plans3/v2094-production-shard-execution-real-artifact-intake-roadmap.md",
    ),
    nextActions: [
      "Hold further Node-only artifact intake work until a real external artifact appears.",
      "Keep Java and mini-kv parallel on signed owner receipt production.",
      "Preserve f/<version>/解释 and f/<version>/图片 as the explanation/image archive layout.",
    ],
    warnings: [
      {
        code: "DRY_RUN_CLOSEOUT_STILL_BLOCKS_PRODUCTION",
        severity: "warning",
        source: "node-v2093",
        message: "v2093 closes dry-run artifact intake only; production execution remains blocked.",
      },
    ],
    recommendations: [
      {
        code: "WAIT_FOR_REAL_ARTIFACT_INTAKE",
        severity: "recommendation",
        source: "node-v2093",
        message: "The next meaningful version should consume at least one real external artifact.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionExternalArtifactDryRunCloseoutMarkdown,
};
