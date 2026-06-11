import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionExternalArtifactDryRunCloseout } from "./productionShardExecutionExternalArtifactDryRunCloseout.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-real-artifact-intake-readiness-switch";

const REQUIRED_REAL_ARTIFACT_KINDS = [
  "signed-production-approval",
  "managed-audit-store-owner-binding",
  "java-owner-receipt",
  "mini-kv-owner-receipt",
  "cleanup-reconciliation-receipt",
] as const;

export function loadProductionShardExecutionRealArtifactIntakeReadinessSwitch(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionExternalArtifactDryRunCloseout(input);
  const sources = [
    profileSource("node-v2093-external-artifact-dry-run-closeout", source, "External artifact dry-run closeout"),
  ];
  const controls = [
    satisfiedControl({
      id: "real-artifact-intake-switch-default-closed",
      title: "Real artifact intake switch defaults closed",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "realArtifactIntakeEnabled=false until a trusted external source appears",
      nextAction: "Keep the switch closed while building provenance and conflict preflight stages.",
    }),
    satisfiedControl({
      id: "real-artifact-required-kinds-named",
      title: "Required real artifact kinds are named",
      owner: "cross-project",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: REQUIRED_REAL_ARTIFACT_KINDS.join(","),
      nextAction: "Use these kinds as the exact scope for provenance validation.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2093Ready: source.readyForNextStage,
    sourceV2093DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveRequiredRealArtifactKindsNamed: REQUIRED_REAL_ARTIFACT_KINDS.length === 5,
    signedApprovalKindRequired: REQUIRED_REAL_ARTIFACT_KINDS.includes("signed-production-approval"),
    storeOwnerBindingKindRequired: REQUIRED_REAL_ARTIFACT_KINDS.includes("managed-audit-store-owner-binding"),
    javaOwnerReceiptKindRequired: REQUIRED_REAL_ARTIFACT_KINDS.includes("java-owner-receipt"),
    miniKvOwnerReceiptKindRequired: REQUIRED_REAL_ARTIFACT_KINDS.includes("mini-kv-owner-receipt"),
    cleanupReceiptKindRequired: REQUIRED_REAL_ARTIFACT_KINDS.includes("cleanup-reconciliation-receipt"),
    realArtifactIntakeSwitchClosed: true,
    syntheticFixtureRejectedForProduction: true,
    fFolderArchiveLayoutPreserved: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution real artifact intake readiness switch",
    profileVersion: "production-shard-execution-real-artifact-intake-readiness-switch.v1",
    stageId: "real-artifact-intake-readiness-switch",
    activeNodeVersion: "Node v2094",
    sourceNodeVersion: "Node v2093",
    readyState: "real-artifact-intake-readiness-switch-ready",
    readyDecision: "accept-real-artifact-intake-readiness-switch",
    sources,
    controls,
    stagePayload: {
      realArtifactIntakeReadinessSwitch: {
        realArtifactIntakeEnabled: false,
        requiredRealArtifactKinds: REQUIRED_REAL_ARTIFACT_KINDS,
        syntheticFixturesAcceptedForProduction: false,
        productionAuthority: false,
      },
      archiveLayout: {
        evidence: "e/<version>/evidence",
        explanation: "f/<version>/解释",
        images: "f/<version>/图片 only when image evidence exists",
      },
      growthStopCondition:
        "Do not open real artifact intake until provenance and conflict preflights are both defined.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2094-production-shard-execution-real-artifact-intake-readiness-switch-roadmap.md",
      "docs/plans3/v2095-production-shard-execution-external-artifact-provenance-preflight-roadmap.md",
    ),
    nextActions: [
      "Use v2094 as the closed real-artifact intake switch.",
      "Define external artifact provenance preflight in v2095.",
      "Keep Java and mini-kv parallel on real owner receipt production.",
    ],
    warnings: [
      {
        code: "REAL_ARTIFACT_INTAKE_SWITCH_CLOSED",
        severity: "warning",
        source: "node-v2094",
        message: "v2094 prepares a real artifact intake switch but keeps it closed.",
      },
    ],
    recommendations: [
      {
        code: "DEFINE_PROVENANCE_PREFLIGHT_NEXT",
        severity: "recommendation",
        source: "node-v2094",
        message: "Define provenance fields before any real external artifact is accepted.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionRealArtifactIntakeReadinessSwitchMarkdown,
};
