import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout,
  type JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.js";

export {
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReportRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout";

export type JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport =
  JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout;

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutReport {
  void input.config;
  return loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout();
}
