import type { AppConfig } from "../config.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AuditLog } from "../services/auditLog.js";
import type { AuditStoreRuntimeDescription } from "../services/auditStoreFactory.js";

export interface AuditRouteDeps {
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  config: AppConfig;
}

export interface AuditStoreProfileQuery {
  format?: "json" | "markdown";
}
