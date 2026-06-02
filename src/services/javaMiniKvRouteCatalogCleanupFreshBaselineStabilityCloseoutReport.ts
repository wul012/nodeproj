import type { AppConfig } from "../config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout,
  type JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout.js";

export {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutMarkdown as renderJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutReportMarkdown,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout";

export type JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutReport =
  JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout;

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutReport(
  input: { config: AppConfig },
): JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutReport {
  return loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout({
    config: input.config,
  });
}
