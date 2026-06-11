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
import { loadProductionShardExecutionSignedApprovalFixtureValidation } from "./productionShardExecutionSignedApprovalFixtureValidation.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-managed-audit-store-owner-binding-request";

const STORE_BINDING_REQUEST = [
  "store-owner-identity",
  "retention-class",
  "immutable-record-schema",
  "idempotency-key-policy",
  "credential-redaction-proof",
] as const;

export function loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionSignedApprovalFixtureValidation(input);
  const sources = [
    profileSource("node-v2090-signed-approval-fixture-validation", source, "Signed approval fixture validation"),
  ];
  const controls = [
    satisfiedControl({
      id: "store-owner-binding-request-fields-named",
      title: "Managed audit store owner binding request fields are named",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: STORE_BINDING_REQUEST.join(","),
      nextAction: "Send these fields to the managed audit store owner before any production binding.",
    }),
    satisfiedControl({
      id: "store-owner-binding-request-disconnected",
      title: "Store owner binding request stays disconnected",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "No production store connection, credential value, or raw endpoint URL is accepted.",
      nextAction: "Wait for real store owner binding evidence before connecting storage.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2090Ready: source.readyForNextStage,
    sourceV2090DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveStoreBindingFieldsNamed: STORE_BINDING_REQUEST.length === 5,
    ownerIdentityRequired: STORE_BINDING_REQUEST.includes("store-owner-identity"),
    retentionClassRequired: STORE_BINDING_REQUEST.includes("retention-class"),
    immutableRecordSchemaRequired: STORE_BINDING_REQUEST.includes("immutable-record-schema"),
    idempotencyKeyPolicyRequired: STORE_BINDING_REQUEST.includes("idempotency-key-policy"),
    credentialRedactionProofRequired: STORE_BINDING_REQUEST.includes("credential-redaction-proof"),
    storeOwnerBindingNotClaimedPresent: true,
    storeConnectionStillClosed: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution managed audit store owner binding request",
    profileVersion: "production-shard-execution-managed-audit-store-owner-binding-request.v1",
    stageId: "managed-audit-store-owner-binding-request",
    activeNodeVersion: "Node v2091",
    sourceNodeVersion: "Node v2090",
    readyState: "managed-audit-store-owner-binding-request-ready",
    readyDecision: "accept-managed-audit-store-owner-binding-request",
    sources,
    controls,
    stagePayload: {
      managedAuditStoreOwnerBindingRequest: {
        requestMode: "owner-binding-request-only",
        requiredFields: STORE_BINDING_REQUEST,
        storeOwnerBindingPresent: false,
        productionStoreConnected: false,
      },
      growthStopCondition:
        "Do not add another store owner request unless the managed audit owner changes binding requirements.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2091-production-shard-execution-managed-audit-store-owner-binding-request-roadmap.md",
      "docs/plans3/v2092-production-shard-execution-owner-receipt-dry-run-reconciliation-roadmap.md",
    ),
    nextActions: [
      "Use v2091 as the managed audit store owner binding request packet.",
      "Dry-run reconcile Java and mini-kv owner receipt slots in v2092 without claiming signed receipts exist.",
      "Keep managed audit production storage disconnected.",
    ],
    warnings: [
      {
        code: "STORE_OWNER_BINDING_REQUEST_NOT_BINDING",
        severity: "warning",
        source: "node-v2091",
        message: "v2091 names the store owner binding request only; no production store binding is present.",
      },
    ],
    recommendations: [
      {
        code: "DRY_RUN_OWNER_RECEIPT_RECONCILIATION_NEXT",
        severity: "recommendation",
        source: "node-v2091",
        message: "Reconcile the Java and mini-kv owner receipt slots next without marking them signed.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionManagedAuditStoreOwnerBindingRequestMarkdown,
};
