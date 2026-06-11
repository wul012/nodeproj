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
import { loadProductionShardExecutionSignedApprovalIntakeContract } from "./productionShardExecutionSignedApprovalIntakeContract.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-managed-audit-store-binding-preflight";

const STORE_PREFLIGHTS = [
  {
    id: "immutable-execution-record",
    owner: "node",
    requiredEvidence: "record schema has request id, approval id, source digest, outcome, and cleanup digest",
  },
  {
    id: "idempotent-archive-write",
    owner: "node",
    requiredEvidence: "same approval id and source digest produce one immutable archive key",
  },
  {
    id: "retention-class-bound",
    owner: "operator",
    requiredEvidence: "production retention class is named before any store connection can open",
  },
  {
    id: "credential-redaction-proof",
    owner: "node",
    requiredEvidence: "store binding proof never renders credential values or raw endpoint URLs",
  },
  {
    id: "cleanup-proof-lookup",
    owner: "cross-project",
    requiredEvidence: "cleanup proof digest can be linked without starting Java or mini-kv",
  },
] as const;

export function loadProductionShardExecutionManagedAuditStoreBindingPreflight(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionSignedApprovalIntakeContract(input);
  const sources = [
    profileSource("node-v2085-signed-approval-intake-contract", source, "Signed approval intake contract"),
  ];
  const controls = [
    satisfiedControl({
      id: "managed-audit-store-preflight-items-named",
      title: "Managed audit store preflight items are named",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: STORE_PREFLIGHTS.map((item) => item.id).join(","),
      nextAction: "Use these items as the store-binding checklist before any production store connection.",
    }),
    satisfiedControl({
      id: "managed-audit-store-not-connected",
      title: "Managed audit store remains disconnected",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: "connectsManagedAudit=false and rawEndpointUrlParsed=false",
      nextAction: "Require real store owner evidence before flipping from preflight to binding.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2085Ready: source.readyForNextStage,
    sourceV2085DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveStorePreflightsNamed: STORE_PREFLIGHTS.length === 5,
    immutableExecutionRecordRequired: STORE_PREFLIGHTS.some((item) => item.id === "immutable-execution-record"),
    idempotentArchiveWriteRequired: STORE_PREFLIGHTS.some((item) => item.id === "idempotent-archive-write"),
    retentionClassBoundBeforeConnection: STORE_PREFLIGHTS.some((item) => item.id === "retention-class-bound"),
    credentialRedactionProofRequired: STORE_PREFLIGHTS.some((item) => item.id === "credential-redaction-proof"),
    cleanupProofLookupStaysCrossProject: STORE_PREFLIGHTS.some((item) =>
      item.id === "cleanup-proof-lookup" && item.owner === "cross-project"),
    preflightDoesNotConnectManagedAuditStore: true,
    preflightDoesNotStartSiblingServices: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution managed audit store binding preflight",
    profileVersion: "production-shard-execution-managed-audit-store-binding-preflight.v1",
    stageId: "managed-audit-store-binding-preflight",
    activeNodeVersion: "Node v2086",
    sourceNodeVersion: "Node v2085",
    readyState: "managed-audit-store-binding-preflight-ready",
    readyDecision: "accept-managed-audit-store-binding-preflight",
    sources,
    controls,
    stagePayload: {
      managedAuditStorePreflight: {
        bindingMode: "preflight-only-disconnected",
        preflights: STORE_PREFLIGHTS,
        credentialValuesAccepted: false,
        rawEndpointUrlAccepted: false,
      },
      growthStopCondition:
        "Do not add another store preflight unless production storage ownership or retention rules change.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2086-production-shard-execution-managed-audit-store-binding-preflight-roadmap.md",
      "docs/plans3/v2087-production-shard-execution-owner-receipt-request-packet-roadmap.md",
    ),
    nextActions: [
      "Use v2086 as the disconnected managed-audit-store checklist.",
      "Ask Java and mini-kv next for owner receipts that bind abort, rollback, and cleanup responsibilities.",
      "Keep production storage disconnected until a real store owner and approval artifact exist.",
    ],
    warnings: [
      {
        code: "MANAGED_AUDIT_STORE_NOT_CONNECTED",
        severity: "warning",
        source: "node-v2086",
        message: "v2086 defines store binding preflight only; it does not connect to production managed audit storage.",
      },
    ],
    recommendations: [
      {
        code: "REQUEST_OWNER_RECEIPTS_NEXT",
        severity: "recommendation",
        source: "node-v2086",
        message: "Move next to precise Java and mini-kv owner receipt requests instead of broad new sibling work.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown
    as renderProductionShardExecutionManagedAuditStoreBindingPreflightMarkdown,
};
