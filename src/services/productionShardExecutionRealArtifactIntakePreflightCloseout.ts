import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionExternalArtifactConflictTaxonomy } from "./productionShardExecutionExternalArtifactConflictTaxonomy.js";
import { loadProductionShardExecutionExternalArtifactProvenancePreflight } from "./productionShardExecutionExternalArtifactProvenancePreflight.js";
import { loadProductionShardExecutionExternalArtifactQuarantineEnvelope } from "./productionShardExecutionExternalArtifactQuarantineEnvelope.js";
import { loadProductionShardExecutionRealArtifactIntakeReadinessSwitch } from "./productionShardExecutionRealArtifactIntakeReadinessSwitch.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-real-artifact-intake-preflight-closeout";

export function loadProductionShardExecutionRealArtifactIntakePreflightCloseout(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const v2094 = loadProductionShardExecutionRealArtifactIntakeReadinessSwitch(input);
  const v2095 = loadProductionShardExecutionExternalArtifactProvenancePreflight(input);
  const v2096 = loadProductionShardExecutionExternalArtifactConflictTaxonomy(input);
  const v2097 = loadProductionShardExecutionExternalArtifactQuarantineEnvelope(input);
  const sourceProfiles = [v2094, v2095, v2096, v2097];
  const sources = [
    profileSource("node-v2094-real-artifact-intake-readiness-switch", v2094, "Real artifact intake readiness switch"),
    profileSource("node-v2095-external-artifact-provenance-preflight", v2095, "Artifact provenance preflight"),
    profileSource("node-v2096-external-artifact-conflict-taxonomy", v2096, "Artifact conflict taxonomy"),
    profileSource("node-v2097-external-artifact-quarantine-envelope", v2097, "Artifact quarantine envelope"),
  ];
  const controls = [
    satisfiedControl({
      id: "real-artifact-intake-preflight-batch-closed",
      title: "Real artifact intake preflight batch is closed",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: sources.map((source) => `${source.version}:${source.digest}`).join("|"),
      nextAction: "Wait for a real verified external artifact before opening any production intake path.",
    }),
    satisfiedControl({
      id: "real-artifact-next-step-named",
      title: "Real artifact next step is named",
      owner: "cross-project",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: "verified external artifact intake with provenance, conflict, and quarantine checks",
      nextAction: "Consume at least one real external artifact before adding another Node-only preflight batch.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    v2094Ready: v2094.readyForNextStage,
    v2095Ready: v2095.readyForNextStage,
    v2096Ready: v2096.readyForNextStage,
    v2097Ready: v2097.readyForNextStage,
    fourPreflightSourcesIncluded: sources.length === 4,
    allPreflightSourcesReady: sources.every((source) => source.ready),
    allSourceDigestsValid: sources.every((source) =>
      typeof source.digest === "string" && /^[a-f0-9]{64}$/.test(source.digest)),
    sourceOrderPreserved:
      sources.map((source) => source.version).join(">") === "Node v2094>Node v2095>Node v2096>Node v2097",
    allSourceChecksPassed: sources.every((source) => source.checkCount === source.passedCheckCount),
    productionAuthorityStillBlocked: sourceProfiles.every((profile) =>
      profile.readyForProductionShardExecution === false && profile.safety.executionAllowed === false),
    preflightStillRequiresRealArtifact: true,
    quarantineAndConflictPoliciesPresent: true,
    javaMiniKvParallelGuidancePreserved: sourceProfiles.every((profile) =>
      profile.javaMiniKvRecommendedParallel && !profile.nodeIsUpstreamPreApprovalBlocker),
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution real artifact intake preflight closeout",
    profileVersion: "production-shard-execution-real-artifact-intake-preflight-closeout.v1",
    stageId: "real-artifact-intake-preflight-closeout",
    activeNodeVersion: "Node v2098",
    sourceNodeVersion: "Node v2097",
    readyState: "real-artifact-intake-preflight-closeout-ready",
    readyDecision: "close-real-artifact-intake-preflight-batch",
    sources,
    controls,
    stagePayload: {
      realArtifactIntakePreflightCloseout: {
        closedSpan: "Node v2094 through Node v2098",
        preflightOnly: true,
        productionAuthority: false,
        nextRequiredEvent: "at least one real verified external artifact arrives",
      },
      archiveLayout: {
        evidence: "e/<version>/evidence",
        explanation: "f/<version>/解释",
        images: "f/<version>/图片 only when image evidence exists",
      },
      growthStopCondition:
        "Stop Node-only artifact-intake preflight growth until a real external artifact exists.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2098-production-shard-execution-real-artifact-intake-preflight-closeout-roadmap.md",
      "docs/plans3/v2099-production-shard-execution-verified-real-artifact-intake-roadmap.md",
    ),
    nextActions: [
      "Wait for a real external artifact before adding another Node-only preflight batch.",
      "Keep Java and mini-kv parallel on signed owner receipts.",
      "Use provenance, conflict, and quarantine policies as the real intake checklist.",
    ],
    warnings: [
      {
        code: "REAL_ARTIFACT_PREFLIGHT_STILL_BLOCKS_PRODUCTION",
        severity: "warning",
        source: "node-v2098",
        message: "v2098 closes preflight only; it still has no verified real external artifact.",
      },
    ],
    recommendations: [
      {
        code: "WAIT_FOR_VERIFIED_REAL_ARTIFACT",
        severity: "recommendation",
        source: "node-v2098",
        message: "The next version should consume a real verified external artifact or stop Node-only growth.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionRealArtifactIntakePreflightCloseoutMarkdown,
};
