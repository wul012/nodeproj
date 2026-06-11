export type ProductionShardExecutionStageId =
  | "handoff-readiness"
  | "candidate-contract"
  | "failure-matrix"
  | "operator-window-worksheet"
  | "candidate-archive-verification"
  | "closeout"
  | "route-catalog-forward-compatibility"
  | "signed-approval-intake-contract"
  | "managed-audit-store-binding-preflight"
  | "owner-receipt-request-packet"
  | "external-evidence-closeout"
  | "external-artifact-intake-envelope"
  | "signed-approval-fixture-validation"
  | "managed-audit-store-owner-binding-request"
  | "owner-receipt-dry-run-reconciliation"
  | "external-artifact-dry-run-closeout";

export type ProductionShardExecutionProfileVersion =
  | "production-shard-execution-handoff-readiness.v1"
  | "production-shard-execution-candidate-contract.v1"
  | "production-shard-execution-failure-matrix.v1"
  | "production-shard-execution-operator-window-worksheet.v1"
  | "production-shard-execution-candidate-archive-verification.v1"
  | "production-shard-execution-closeout.v1"
  | "production-shard-execution-route-catalog-forward-compatibility.v1"
  | "production-shard-execution-signed-approval-intake-contract.v1"
  | "production-shard-execution-managed-audit-store-binding-preflight.v1"
  | "production-shard-execution-owner-receipt-request-packet.v1"
  | "production-shard-execution-external-evidence-closeout.v1"
  | "production-shard-execution-external-artifact-intake-envelope.v1"
  | "production-shard-execution-signed-approval-fixture-validation.v1"
  | "production-shard-execution-managed-audit-store-owner-binding-request.v1"
  | "production-shard-execution-owner-receipt-dry-run-reconciliation.v1"
  | "production-shard-execution-external-artifact-dry-run-closeout.v1";

export type ProductionShardExecutionNodeVersion =
  | "Node v409"
  | "Node v2078"
  | "Node v2079"
  | "Node v2080"
  | "Node v2081"
  | "Node v2082"
  | "Node v2083"
  | "Node v2084"
  | "Node v2085"
  | "Node v2086"
  | "Node v2087"
  | "Node v2088"
  | "Node v2089"
  | "Node v2090"
  | "Node v2091"
  | "Node v2092"
  | "Node v2093";

export type ProductionShardExecutionReadinessState =
  | "handoff-readiness-ready"
  | "candidate-contract-ready"
  | "failure-matrix-ready"
  | "operator-window-worksheet-ready"
  | "candidate-archive-verification-ready"
  | "closeout-ready"
  | "route-catalog-forward-compatibility-ready"
  | "signed-approval-intake-contract-ready"
  | "managed-audit-store-binding-preflight-ready"
  | "owner-receipt-request-packet-ready"
  | "external-evidence-closeout-ready"
  | "external-artifact-intake-envelope-ready"
  | "signed-approval-fixture-validation-ready"
  | "managed-audit-store-owner-binding-request-ready"
  | "owner-receipt-dry-run-reconciliation-ready"
  | "external-artifact-dry-run-closeout-ready"
  | "blocked";

export type ProductionShardExecutionDecision =
  | "accept-runtime-pass-evidence-handoff"
  | "accept-disabled-shard-execution-candidate-contract"
  | "accept-failure-abort-rollback-matrix"
  | "accept-operator-window-worksheet"
  | "verify-candidate-archive"
  | "close-production-shard-execution-readiness-batch"
  | "accept-route-catalog-forward-compatibility"
  | "accept-signed-approval-intake-contract"
  | "accept-managed-audit-store-binding-preflight"
  | "accept-owner-receipt-request-packet"
  | "close-external-evidence-precondition-batch"
  | "accept-external-artifact-intake-envelope"
  | "accept-signed-approval-fixture-validation"
  | "accept-managed-audit-store-owner-binding-request"
  | "accept-owner-receipt-dry-run-reconciliation"
  | "close-external-artifact-dry-run-batch"
  | "blocked";

export interface ProductionShardExecutionSourceReference {
  id: string;
  version: ProductionShardExecutionNodeVersion | "Java v167" | "mini-kv v158";
  evidenceRole: string;
  routeOrArtifact: string;
  ready: boolean;
  digest: string | null;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
}

export interface ProductionShardExecutionControl {
  id: string;
  title: string;
  status: "satisfied" | "pending";
  owner: "node" | "java" | "mini-kv" | "operator" | "cross-project";
  blocksNextStage: boolean;
  blocksProductionExecution: boolean;
  evidence: string;
  nextAction: string;
}

export interface ProductionShardExecutionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ProductionShardExecutionStageRecord {
  stageId: ProductionShardExecutionStageId;
  activeNodeVersion: ProductionShardExecutionNodeVersion;
  sourceNodeVersion: ProductionShardExecutionNodeVersion;
  state: ProductionShardExecutionReadinessState;
  decision: ProductionShardExecutionDecision;
  readinessDigest: string;
  readyForNextStage: boolean;
}

export interface ProductionShardExecutionSafetyBoundary {
  readOnly: true;
  executionAllowed: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  activeShardPrototypeEnabled: false;
}

export interface ProductionShardExecutionSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCount: number;
  readySourceCount: number;
  controlCount: number;
  nextStageBlockingControlCount: number;
  productionBlockingControlCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ProductionShardExecutionReadinessProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: ProductionShardExecutionProfileVersion;
  stage: ProductionShardExecutionStageRecord;
  sourceVersions: ProductionShardExecutionNodeVersion[];
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
  readyForNextStage: boolean;
  readyForProductionShardExecution: false;
  candidateOnly: true;
  javaMiniKvRecommendedParallel: true;
  nodeIsUpstreamPreApprovalBlocker: false;
  safety: ProductionShardExecutionSafetyBoundary;
  sources: ProductionShardExecutionSourceReference[];
  controls: ProductionShardExecutionControl[];
  stagePayload: Record<string, unknown>;
  checks: Record<string, boolean>;
  summary: ProductionShardExecutionSummary;
  productionBlockers: ProductionShardExecutionMessage[];
  warnings: ProductionShardExecutionMessage[];
  recommendations: ProductionShardExecutionMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}
