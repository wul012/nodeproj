import type {
  ControlledReadOnlyShardPreviewObservationPreview,
  PreviewProject,
  PreviewStatus,
  PreviewTransport,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixTypes.js";

export type PreviewMessageSource = "java-shard-preview" | "mini-kv-shard-preview" | "runtime-boundary" | "next-plan";

export interface ControlledReadOnlyShardPreviewObservation {
  project: PreviewProject;
  attempted: boolean;
  status: PreviewStatus;
  transport: PreviewTransport;
  endpoint: string;
  command: string | null;
  statusCode: number | null;
  latencyMs: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  evidence: Record<string, unknown> | null;
  preview: ControlledReadOnlyShardPreviewObservationPreview;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFields: string[];
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardShapeValid: boolean;
  statusAccepted: boolean;
  boundarySafe: boolean;
  readyForPreview: boolean;
}

export interface ControlledReadOnlyShardPreviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: PreviewMessageSource;
  message: string;
}

export interface ControlledReadOnlyShardPreviewChecks {
  upstreamProbesEnabledForPreview: boolean;
  upstreamActionsDisabled: boolean;
  javaPreviewAttempted: boolean;
  javaPreviewPassed: boolean;
  javaReadOnlySafe: boolean;
  javaExecutionBlocked: boolean;
  miniKvPreviewAttempted: boolean;
  miniKvPreviewPassed: boolean;
  miniKvReadOnlySafe: boolean;
  miniKvExecutionBlocked: boolean;
  miniKvBoundarySafe: boolean;
  bothPreviewsReady: boolean;
  nodeDoesNotStartUpstreams: boolean;
  nodeDoesNotStopUpstreams: boolean;
  nodeDoesNotMutateSiblingState: boolean;
  noActiveShardRouter: boolean;
  noWriteRouting: boolean;
  noLoadRestoreCompact: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  previewDigestStable: boolean;
  sourceMatrixConsumptionPlanReady: boolean;
  sourceMatrixConsumptionPlanHasNoBlockedSteps: boolean;
  sourceMatrixConsumptionPlanHasNoUnsafeSteps: boolean;
  sourceMatrixConsumptionPlanRiskAccepted: boolean;
  sourceMatrixConsumptionPlanPromotionHoldSafe: boolean;
  sourceMatrixConsumptionPlanPromotionHoldClosureReady: boolean;
  sourceMatrixConsumptionPlanReadOnlyReviewScopeSafe: boolean;
  sourceMatrixConsumptionPlanReadOnlyReviewScopeDigestStable: boolean;
  productionWindowStillBlocked: boolean;
  readyForControlledReadOnlyShardPreview: boolean;
}

export interface ControlledReadOnlyShardPreviewSummary {
  checkCount: number;
  passedCheckCount: number;
  attemptedReadCount: number;
  passedReadCount: number;
  failedReadCount: number;
  skippedReadCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}
