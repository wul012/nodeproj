import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import { loadProductionShardExecutionExternalEvidenceCloseout } from "./productionShardExecutionExternalEvidenceCloseout.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-external-artifact-intake-envelope";

const ARTIFACT_SLOTS = [
  "signed-production-approval",
  "managed-audit-store-owner-binding",
  "java-abort-rollback-cleanup-owner-receipt",
  "mini-kv-abort-rollback-cleanup-owner-receipt",
  "cross-project-cleanup-reconciliation-receipt",
] as const;

export function loadProductionShardExecutionExternalArtifactIntakeEnvelope(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionExternalEvidenceCloseout(input);
  const sources = [
    profileSource("node-v2088-external-evidence-closeout", source, "External evidence precondition closeout"),
  ];
  const controls = [
    satisfiedControl({
      id: "external-artifact-slots-named",
      title: "External artifact slots are named",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: ARTIFACT_SLOTS.join(","),
      nextAction: "Use these slots as the only dry-run intake envelope scope.",
    }),
    satisfiedControl({
      id: "f-folder-archive-layout-named",
      title: "f-folder archive layout is named for explanation and images",
      owner: "node",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: "e/<version>/evidence; f/<version>/解释; f/<version>/图片 only when image evidence exists",
      nextAction: "Write explanations under f/<version>/解释 and avoid mixing images into evidence folders.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2088Ready: source.readyForNextStage,
    sourceV2088DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveArtifactSlotsNamed: ARTIFACT_SLOTS.length === 5,
    signedApprovalSlotPresent: ARTIFACT_SLOTS.includes("signed-production-approval"),
    managedAuditStoreOwnerSlotPresent: ARTIFACT_SLOTS.includes("managed-audit-store-owner-binding"),
    javaOwnerReceiptSlotPresent: ARTIFACT_SLOTS.some((slot) => slot.startsWith("java-")),
    miniKvOwnerReceiptSlotPresent: ARTIFACT_SLOTS.some((slot) => slot.startsWith("mini-kv-")),
    cleanupReconciliationSlotPresent:
      ARTIFACT_SLOTS.includes("cross-project-cleanup-reconciliation-receipt"),
    fFolderExplanationLayoutReady: true,
    syntheticArtifactsMustBeMarkedNonAuthoritative: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution external artifact intake envelope",
    profileVersion: "production-shard-execution-external-artifact-intake-envelope.v1",
    stageId: "external-artifact-intake-envelope",
    activeNodeVersion: "Node v2089",
    sourceNodeVersion: "Node v2088",
    readyState: "external-artifact-intake-envelope-ready",
    readyDecision: "accept-external-artifact-intake-envelope",
    sources,
    controls,
    stagePayload: {
      externalArtifactIntakeEnvelope: {
        intakeMode: "dry-run-envelope-only",
        artifactSlots: ARTIFACT_SLOTS,
        acceptsSyntheticFixtures: true,
        syntheticFixturesAreAuthoritative: false,
        executionAuthority: false,
      },
      archiveLayout: {
        evidence: "e/<version>/evidence",
        explanation: "f/<version>/解释",
        images: "f/<version>/图片 only when screenshot or diagram evidence is generated",
      },
      growthStopCondition:
        "Do not expand artifact slots unless a real external provider adds a required artifact kind.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2089-production-shard-execution-external-artifact-intake-envelope-roadmap.md",
      "docs/plans3/v2090-production-shard-execution-signed-approval-fixture-validation-roadmap.md",
    ),
    nextActions: [
      "Use v2089 as the dry-run artifact intake envelope for synthetic validation only.",
      "Validate a non-authoritative signed approval fixture in v2090.",
      "Write explanations under f/<version>/解释 and create f/<version>/图片 only when image evidence exists.",
    ],
    warnings: [
      {
        code: "EXTERNAL_ARTIFACT_ENVELOPE_IS_DRY_RUN_ONLY",
        severity: "warning",
        source: "node-v2089",
        message: "v2089 names artifact slots and archive layout but accepts no real production authority.",
      },
    ],
    recommendations: [
      {
        code: "VALIDATE_SYNTHETIC_APPROVAL_FIXTURE_NEXT",
        severity: "recommendation",
        source: "node-v2089",
        message: "Move next to a synthetic signed approval fixture validation that cannot authorize execution.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionExternalArtifactIntakeEnvelopeMarkdown,
};
