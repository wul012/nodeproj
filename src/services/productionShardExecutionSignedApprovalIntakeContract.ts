import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionRouteCatalogForwardCompatibility } from "./productionShardExecutionRouteCatalogForwardCompatibility.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-signed-approval-intake-contract";

const SIGNED_APPROVAL_FIELDS = [
  "approvalId",
  "approvalWindowId",
  "operatorIdentity",
  "approvedScope",
  "sourceReadinessDigest",
  "approvalIssuedAt",
  "approvalExpiresAt",
  "signatureDigest",
] as const;

const APPROVAL_SCOPE_RULES = [
  "scope must bind to one source readiness digest",
  "scope cannot include write commands or migrations",
  "scope expires before any execution replay can be accepted",
  "operator identity must match the access-guard identity surface",
] as const;

export function loadProductionShardExecutionSignedApprovalIntakeContract(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionRouteCatalogForwardCompatibility(input);
  const sources = [
    profileSource("node-v2084-route-catalog-forward-compatibility", source, "Route catalog forward compatibility"),
  ];
  const controls = [
    satisfiedControl({
      id: "signed-approval-required-fields-named",
      title: "Signed approval required fields are named",
      owner: "operator",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: SIGNED_APPROVAL_FIELDS.join(","),
      nextAction: "Use these fields as the only accepted approval artifact shape for later real intake.",
    }),
    satisfiedControl({
      id: "signed-approval-schema-only",
      title: "Signed approval intake remains schema-only",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "No approval value, token, signature secret, or production window is accepted by this version.",
      nextAction: "Keep production execution blocked until an external approval artifact is supplied and verified.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2084Ready: source.readyForNextStage,
    sourceV2084DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    approvalHasEightRequiredFields: SIGNED_APPROVAL_FIELDS.length === 8,
    approvalBindsOperatorIdentity: SIGNED_APPROVAL_FIELDS.includes("operatorIdentity"),
    approvalBindsSourceDigest: SIGNED_APPROVAL_FIELDS.includes("sourceReadinessDigest"),
    approvalRequiresExpiry: SIGNED_APPROVAL_FIELDS.includes("approvalExpiresAt"),
    approvalRequiresSignatureDigest: SIGNED_APPROVAL_FIELDS.includes("signatureDigest"),
    scopeRulesForbidWrites: APPROVAL_SCOPE_RULES.some((rule) => rule.includes("write commands")),
    scopeRulesBindSingleDigest: APPROVAL_SCOPE_RULES.some((rule) => rule.includes("one source readiness digest")),
    schemaOnlyDoesNotClaimRealApproval: true,
    noApprovalCredentialValueRead: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution signed approval intake contract",
    profileVersion: "production-shard-execution-signed-approval-intake-contract.v1",
    stageId: "signed-approval-intake-contract",
    activeNodeVersion: "Node v2085",
    sourceNodeVersion: "Node v2084",
    readyState: "signed-approval-intake-contract-ready",
    readyDecision: "accept-signed-approval-intake-contract",
    sources,
    controls,
    stagePayload: {
      signedApprovalIntakeContract: {
        artifactMode: "schema-only-no-real-approval-present",
        requiredFields: SIGNED_APPROVAL_FIELDS,
        scopeRules: APPROVAL_SCOPE_RULES,
        acceptedExecutionAuthority: false,
      },
      growthStopCondition:
        "Do not add another approval-intake contract unless the real approval provider changes required fields.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2085-production-shard-execution-signed-approval-intake-contract-roadmap.md",
      "docs/plans3/v2086-production-shard-execution-managed-audit-store-binding-preflight-roadmap.md",
    ),
    nextActions: [
      "Use v2085 as the artifact contract for future signed production approval intake.",
      "Prepare v2086 around managed audit store binding preflight; keep it disconnected until credentials and store owners exist.",
      "Do not treat this schema-only stage as a real approval.",
    ],
    warnings: [
      {
        code: "SIGNED_APPROVAL_ARTIFACT_NOT_PRESENT",
        severity: "warning",
        source: "node-v2085",
        message: "v2085 names the artifact shape only; a real signed approval artifact is still absent.",
      },
    ],
    recommendations: [
      {
        code: "PREFLIGHT_MANAGED_AUDIT_STORE_NEXT",
        severity: "recommendation",
        source: "node-v2085",
        message: "Define the managed audit store binding preflight before accepting any real approval artifact.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionSignedApprovalIntakeContractMarkdown,
};
