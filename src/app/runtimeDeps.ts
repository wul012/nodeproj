import { MiniKvClient } from "../clients/miniKvClient.js";
import { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { UpstreamMetricsRegistry } from "../clients/upstreamMetrics.js";
import type { AppConfig } from "../config.js";
import { createAuditStoreRuntime } from "../services/auditStoreFactory.js";
import { MutationRateLimiter } from "../services/mutationRateLimiter.js";
import { OperationApprovalDecisionLedger } from "../services/operationApprovalDecision.js";
import { OperationApprovalExecutionGateArchiveLedger } from "../services/operationApprovalExecutionGateArchive.js";
import { OperationApprovalRequestLedger } from "../services/operationApprovalRequest.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { OpsBaselineStore } from "../services/opsBaseline.js";
import { OpsCheckpointLedger } from "../services/opsCheckpoint.js";
import { OpsPromotionDecisionLedger } from "../services/opsPromotionDecision.js";
import { OpsSnapshotService } from "../services/opsSnapshotService.js";
import { ProductionConnectionDryRunApprovalLedger } from "../services/productionConnectionDryRunApprovalLedger.js";

export function createRuntimeDeps(config: AppConfig) {
  const upstreamMetrics = new UpstreamMetricsRegistry();
  const orderPlatform = new OrderPlatformClient(
    config.orderPlatformUrl,
    config.orderPlatformTimeoutMs,
    upstreamMetrics,
  );
  const miniKv = new MiniKvClient(
    config.miniKvHost,
    config.miniKvPort,
    config.miniKvTimeoutMs,
    upstreamMetrics,
  );
  const snapshots = new OpsSnapshotService(orderPlatform, miniKv, config.upstreamProbesEnabled);
  const auditStoreRuntime = createAuditStoreRuntime(config);
  const mutationRateLimiter = new MutationRateLimiter({
    windowMs: config.mutationRateLimitWindowMs,
    maxRequests: config.mutationRateLimitMax,
  });
  const opsCheckpoints = new OpsCheckpointLedger();
  const opsBaseline = new OpsBaselineStore();
  const opsPromotionDecisions = new OpsPromotionDecisionLedger();
  const productionConnectionDryRunApprovals = new ProductionConnectionDryRunApprovalLedger();
  const operationIntents = new OperationIntentStore(config);
  const operationDispatches = new OperationDispatchLedger(operationIntents);
  const operationApprovalRequests = new OperationApprovalRequestLedger();
  const operationApprovalDecisions = new OperationApprovalDecisionLedger(operationApprovalRequests);
  const operationApprovalExecutionGateArchives = new OperationApprovalExecutionGateArchiveLedger();

  return {
    upstreamMetrics,
    orderPlatform,
    miniKv,
    snapshots,
    auditStoreRuntime,
    auditLog: auditStoreRuntime.auditLog,
    mutationRateLimiter,
    opsCheckpoints,
    opsBaseline,
    opsPromotionDecisions,
    productionConnectionDryRunApprovals,
    operationIntents,
    operationDispatches,
    operationApprovalRequests,
    operationApprovalDecisions,
    operationApprovalExecutionGateArchives,
  };
}

export type AppRuntimeDeps = ReturnType<typeof createRuntimeDeps>;
