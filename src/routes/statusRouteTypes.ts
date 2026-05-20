import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "../services/auditLog.js";
import type { AuditStoreRuntimeDescription } from "../services/auditStoreFactory.js";
import type { OpsSnapshotService } from "../services/opsSnapshotService.js";
import type {
  ProductionConnectionDryRunApprovalDecision,
  ProductionConnectionDryRunApprovalLedger,
} from "../services/productionConnectionDryRunApprovalLedger.js";

export interface StatusRouteDeps {
  config: AppConfig;
  snapshots: OpsSnapshotService;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
}

export interface FixtureReportQuery {
  format?: "json" | "markdown";
}

export interface ProductionConnectionApprovalQuery {
  format?: "json" | "markdown";
  limit?: number;
}

export interface ProductionConnectionApprovalParams {
  approvalId: string;
}

export interface CreateProductionConnectionApprovalBody {
  decision: ProductionConnectionDryRunApprovalDecision;
  reviewer: string;
  reason?: string;
  changeRequestDigest: string;
}
