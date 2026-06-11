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
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-external-artifact-quarantine-envelope";

const QUARANTINE_STEPS = [
  "record-provenance-metadata",
  "attach-conflict-class",
  "seal-non-authoritative-digest",
  "notify-owning-reviewer",
  "block-production-authority",
] as const;

export function loadProductionShardExecutionExternalArtifactQuarantineEnvelope(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionExternalArtifactConflictTaxonomy(input);
  const sources = [
    profileSource("node-v2096-external-artifact-conflict-taxonomy", source, "Artifact conflict taxonomy"),
  ];
  const controls = [
    satisfiedControl({
      id: "quarantine-steps-named",
      title: "External artifact quarantine steps are named",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: QUARANTINE_STEPS.join(","),
      nextAction: "Use these steps as the closeout source for real artifact intake preflight.",
    }),
    satisfiedControl({
      id: "quarantine-blocks-authority",
      title: "Quarantine blocks production authority",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "block-production-authority",
      nextAction: "Do not let quarantined artifacts satisfy approval, store, or owner-receipt blockers.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2096Ready: source.readyForNextStage,
    sourceV2096DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveQuarantineStepsNamed: QUARANTINE_STEPS.length === 5,
    recordsProvenanceMetadata: QUARANTINE_STEPS.includes("record-provenance-metadata"),
    attachesConflictClass: QUARANTINE_STEPS.includes("attach-conflict-class"),
    sealsNonAuthoritativeDigest: QUARANTINE_STEPS.includes("seal-non-authoritative-digest"),
    notifiesOwningReviewer: QUARANTINE_STEPS.includes("notify-owning-reviewer"),
    blocksProductionAuthority: QUARANTINE_STEPS.includes("block-production-authority"),
    quarantineDoesNotAcceptProductionAuthority: true,
    quarantineDoesNotStartSiblingServices: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution external artifact quarantine envelope",
    profileVersion: "production-shard-execution-external-artifact-quarantine-envelope.v1",
    stageId: "external-artifact-quarantine-envelope",
    activeNodeVersion: "Node v2097",
    sourceNodeVersion: "Node v2096",
    readyState: "external-artifact-quarantine-envelope-ready",
    readyDecision: "accept-external-artifact-quarantine-envelope",
    sources,
    controls,
    stagePayload: {
      externalArtifactQuarantineEnvelope: {
        quarantineMode: "metadata-and-conflict-only",
        quarantineSteps: QUARANTINE_STEPS,
        quarantinedArtifactsCanAuthorizeExecution: false,
      },
      growthStopCondition:
        "Do not add another quarantine envelope unless a real artifact needs a new quarantine outcome.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2097-production-shard-execution-external-artifact-quarantine-envelope-roadmap.md",
      "docs/plans3/v2098-production-shard-execution-real-artifact-intake-preflight-closeout-roadmap.md",
    ),
    nextActions: [
      "Use v2097 as the quarantine envelope before closing the preflight batch.",
      "Close v2094-v2098 as a real-artifact intake preflight, not as production authorization.",
      "Keep f/<version>/解释 as the human explanation location.",
    ],
    warnings: [
      {
        code: "QUARANTINED_ARTIFACTS_CANNOT_AUTHORIZE_EXECUTION",
        severity: "warning",
        source: "node-v2097",
        message: "The quarantine envelope blocks production authority for any unverified or conflicting artifact.",
      },
    ],
    recommendations: [
      {
        code: "CLOSE_REAL_ARTIFACT_PREFLIGHT_NEXT",
        severity: "recommendation",
        source: "node-v2097",
        message: "Close the preflight batch and wait for a real verified artifact.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionExternalArtifactQuarantineEnvelopeMarkdown,
};
