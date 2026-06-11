import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionExternalArtifactProvenancePreflight } from "./productionShardExecutionExternalArtifactProvenancePreflight.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-external-artifact-conflict-taxonomy";

const CONFLICT_CLASSES = [
  "duplicate-approval-artifact",
  "stale-source-readiness-digest",
  "owner-receipt-scope-mismatch",
  "managed-audit-store-owner-mismatch",
  "cleanup-reconciliation-missing",
] as const;

export function loadProductionShardExecutionExternalArtifactConflictTaxonomy(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionExternalArtifactProvenancePreflight(input);
  const sources = [
    profileSource("node-v2095-external-artifact-provenance-preflight", source, "Artifact provenance preflight"),
  ];
  const controls = [
    satisfiedControl({
      id: "conflict-classes-named",
      title: "External artifact conflict classes are named",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: CONFLICT_CLASSES.join(","),
      nextAction: "Use these classes as quarantine reasons in v2097.",
    }),
    satisfiedControl({
      id: "conflicts-block-production-by-default",
      title: "Artifact conflicts block production by default",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "any conflict routes the artifact to quarantine, not production execution",
      nextAction: "Keep production execution blocked when a conflict class matches.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2095Ready: source.readyForNextStage,
    sourceV2095DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveConflictClassesNamed: CONFLICT_CLASSES.length === 5,
    duplicateApprovalConflictPresent: CONFLICT_CLASSES.includes("duplicate-approval-artifact"),
    staleDigestConflictPresent: CONFLICT_CLASSES.includes("stale-source-readiness-digest"),
    ownerReceiptScopeConflictPresent: CONFLICT_CLASSES.includes("owner-receipt-scope-mismatch"),
    storeOwnerMismatchConflictPresent: CONFLICT_CLASSES.includes("managed-audit-store-owner-mismatch"),
    cleanupMissingConflictPresent: CONFLICT_CLASSES.includes("cleanup-reconciliation-missing"),
    conflictsDefaultToQuarantine: true,
    conflictTaxonomyDoesNotAcceptPayload: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution external artifact conflict taxonomy",
    profileVersion: "production-shard-execution-external-artifact-conflict-taxonomy.v1",
    stageId: "external-artifact-conflict-taxonomy",
    activeNodeVersion: "Node v2096",
    sourceNodeVersion: "Node v2095",
    readyState: "external-artifact-conflict-taxonomy-ready",
    readyDecision: "accept-external-artifact-conflict-taxonomy",
    sources,
    controls,
    stagePayload: {
      externalArtifactConflictTaxonomy: {
        conflictClasses: CONFLICT_CLASSES,
        defaultConflictAction: "quarantine-and-block-production",
        realArtifactPayloadAccepted: false,
      },
      growthStopCondition:
        "Do not add conflict classes unless a real provider introduces a new contradiction mode.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2096-production-shard-execution-external-artifact-conflict-taxonomy-roadmap.md",
      "docs/plans3/v2097-production-shard-execution-external-artifact-quarantine-envelope-roadmap.md",
    ),
    nextActions: [
      "Use v2096 as the quarantine reason taxonomy.",
      "Define the artifact quarantine envelope in v2097.",
      "Keep conflicting artifacts from producing production authority.",
    ],
    warnings: [
      {
        code: "CONFLICT_TAXONOMY_BLOCKS_PRODUCTION",
        severity: "warning",
        source: "node-v2096",
        message: "Any conflict class sends an artifact to quarantine and keeps production execution blocked.",
      },
    ],
    recommendations: [
      {
        code: "DEFINE_QUARANTINE_ENVELOPE_NEXT",
        severity: "recommendation",
        source: "node-v2096",
        message: "Define how conflicting or unverified artifacts are quarantined before closing the preflight batch.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionExternalArtifactConflictTaxonomyMarkdown,
};
