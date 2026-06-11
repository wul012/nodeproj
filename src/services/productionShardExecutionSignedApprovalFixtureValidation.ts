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
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-signed-approval-fixture-validation";

const SYNTHETIC_APPROVAL_FIXTURE = {
  fixtureId: "synthetic-approval-fixture-node-v2090",
  approvalId: "synthetic-approval-not-production",
  approvalWindowId: "dry-run-window-only",
  operatorIdentity: "synthetic-operator",
  sourceReadinessDigestBound: true,
  approvalExpiresBeforeExecution: true,
  signatureDigestShape: "sha256:synthetic",
  synthetic: true,
  authoritative: false,
  executionAuthority: false,
} as const;

export function loadProductionShardExecutionSignedApprovalFixtureValidation(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionExternalArtifactIntakeEnvelope(input);
  const sources = [
    profileSource("node-v2089-external-artifact-intake-envelope", source, "External artifact intake envelope"),
  ];
  const controls = [
    satisfiedControl({
      id: "synthetic-approval-fixture-validates-schema",
      title: "Synthetic approval fixture validates schema",
      owner: "operator",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: SYNTHETIC_APPROVAL_FIXTURE.fixtureId,
      nextAction: "Use this fixture to validate parsing only; reject it for production authority.",
    }),
    satisfiedControl({
      id: "synthetic-approval-non-authoritative",
      title: "Synthetic approval is explicitly non-authoritative",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "authoritative=false; executionAuthority=false",
      nextAction: "Require a real external signature before any production execution window.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2089Ready: source.readyForNextStage,
    sourceV2089DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fixtureIdPresent: SYNTHETIC_APPROVAL_FIXTURE.fixtureId.length > 0,
    fixtureApprovalIdPresent: SYNTHETIC_APPROVAL_FIXTURE.approvalId.length > 0,
    fixtureWindowIdPresent: SYNTHETIC_APPROVAL_FIXTURE.approvalWindowId.length > 0,
    fixtureOperatorIdentityPresent: SYNTHETIC_APPROVAL_FIXTURE.operatorIdentity.length > 0,
    fixtureBindsSourceDigest: SYNTHETIC_APPROVAL_FIXTURE.sourceReadinessDigestBound,
    fixtureExpiresBeforeExecution: SYNTHETIC_APPROVAL_FIXTURE.approvalExpiresBeforeExecution,
    fixtureSignatureDigestShapeNamed: SYNTHETIC_APPROVAL_FIXTURE.signatureDigestShape.startsWith("sha256:"),
    fixtureMarkedSynthetic: SYNTHETIC_APPROVAL_FIXTURE.synthetic,
    fixtureNotAuthoritative: !SYNTHETIC_APPROVAL_FIXTURE.authoritative,
    fixtureCannotAuthorizeExecution: !SYNTHETIC_APPROVAL_FIXTURE.executionAuthority,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution signed approval fixture validation",
    profileVersion: "production-shard-execution-signed-approval-fixture-validation.v1",
    stageId: "signed-approval-fixture-validation",
    activeNodeVersion: "Node v2090",
    sourceNodeVersion: "Node v2089",
    readyState: "signed-approval-fixture-validation-ready",
    readyDecision: "accept-signed-approval-fixture-validation",
    sources,
    controls,
    stagePayload: {
      signedApprovalFixtureValidation: {
        fixture: SYNTHETIC_APPROVAL_FIXTURE,
        validationMode: "schema-shape-only",
        realApprovalPresent: false,
      },
      growthStopCondition:
        "Do not add another synthetic approval fixture unless the real approval schema changes.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2090-production-shard-execution-signed-approval-fixture-validation-roadmap.md",
      "docs/plans3/v2091-production-shard-execution-managed-audit-store-owner-binding-request-roadmap.md",
    ),
    nextActions: [
      "Use v2090 only to prove approval fixture validation shape.",
      "Move next to managed audit store owner binding request, still without connecting production storage.",
      "Keep production blockers visible until a real signed approval artifact exists.",
    ],
    warnings: [
      {
        code: "SYNTHETIC_APPROVAL_CANNOT_AUTHORIZE_EXECUTION",
        severity: "warning",
        source: "node-v2090",
        message: "The approval fixture is deliberately synthetic and cannot authorize production execution.",
      },
    ],
    recommendations: [
      {
        code: "REQUEST_STORE_OWNER_BINDING_NEXT",
        severity: "recommendation",
        source: "node-v2090",
        message: "Define the managed audit store owner binding request before accepting real approval evidence.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionSignedApprovalFixtureValidationMarkdown,
};
