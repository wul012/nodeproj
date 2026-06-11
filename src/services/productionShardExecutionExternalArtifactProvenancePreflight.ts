import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionRealArtifactIntakeReadinessSwitch } from "./productionShardExecutionRealArtifactIntakeReadinessSwitch.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-external-artifact-provenance-preflight";

const PROVENANCE_FIELDS = [
  "artifact-kind",
  "external-provider-id",
  "received-at",
  "source-readiness-digest",
  "signature-or-owner-digest",
  "retention-class",
  "quarantine-policy",
] as const;

export function loadProductionShardExecutionExternalArtifactProvenancePreflight(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionRealArtifactIntakeReadinessSwitch(input);
  const sources = [
    profileSource("node-v2094-real-artifact-intake-readiness-switch", source, "Real artifact intake readiness switch"),
  ];
  const controls = [
    satisfiedControl({
      id: "provenance-fields-named",
      title: "External artifact provenance fields are named",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: PROVENANCE_FIELDS.join(","),
      nextAction: "Use these provenance fields before conflict taxonomy is evaluated.",
    }),
    satisfiedControl({
      id: "provenance-preflight-does-not-accept-artifacts",
      title: "Provenance preflight accepts no artifact payload",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "preflight-only; no artifact payload persisted",
      nextAction: "Keep real artifact payloads out until quarantine and conflict policies are defined.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2094Ready: source.readyForNextStage,
    sourceV2094DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    sevenProvenanceFieldsNamed: PROVENANCE_FIELDS.length === 7,
    artifactKindRequired: PROVENANCE_FIELDS.includes("artifact-kind"),
    providerIdRequired: PROVENANCE_FIELDS.includes("external-provider-id"),
    receivedAtRequired: PROVENANCE_FIELDS.includes("received-at"),
    sourceDigestRequired: PROVENANCE_FIELDS.includes("source-readiness-digest"),
    signatureOrOwnerDigestRequired: PROVENANCE_FIELDS.includes("signature-or-owner-digest"),
    retentionClassRequired: PROVENANCE_FIELDS.includes("retention-class"),
    quarantinePolicyRequired: PROVENANCE_FIELDS.includes("quarantine-policy"),
    provenancePreflightDoesNotPersistPayload: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution external artifact provenance preflight",
    profileVersion: "production-shard-execution-external-artifact-provenance-preflight.v1",
    stageId: "external-artifact-provenance-preflight",
    activeNodeVersion: "Node v2095",
    sourceNodeVersion: "Node v2094",
    readyState: "external-artifact-provenance-preflight-ready",
    readyDecision: "accept-external-artifact-provenance-preflight",
    sources,
    controls,
    stagePayload: {
      externalArtifactProvenancePreflight: {
        preflightMode: "metadata-only-no-payload-persistence",
        provenanceFields: PROVENANCE_FIELDS,
        realArtifactPayloadAccepted: false,
      },
      growthStopCondition:
        "Do not accept artifact payloads until conflict taxonomy and quarantine are both defined.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2095-production-shard-execution-external-artifact-provenance-preflight-roadmap.md",
      "docs/plans3/v2096-production-shard-execution-external-artifact-conflict-taxonomy-roadmap.md",
    ),
    nextActions: [
      "Use v2095 as the provenance metadata checklist.",
      "Define conflict taxonomy in v2096 before any payload intake.",
      "Keep all real artifacts outside Node until provenance can be verified.",
    ],
    warnings: [
      {
        code: "PROVENANCE_PREFLIGHT_HAS_NO_REAL_PAYLOAD",
        severity: "warning",
        source: "node-v2095",
        message: "v2095 names provenance metadata but does not ingest real artifact payloads.",
      },
    ],
    recommendations: [
      {
        code: "DEFINE_CONFLICT_TAXONOMY_NEXT",
        severity: "recommendation",
        source: "node-v2095",
        message: "Define the conflict taxonomy before artifact quarantine is designed.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionExternalArtifactProvenancePreflightMarkdown,
};
