import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout,
  type JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout.js";

export {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutMarkdown as renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout";

export type JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutReport =
  JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout;

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutReport {
  return loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout({
    config: input.config,
  });
}
