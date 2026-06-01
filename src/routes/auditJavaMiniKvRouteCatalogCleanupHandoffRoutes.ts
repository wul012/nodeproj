import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupHandoffEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupHandoffEvidenceReport.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupLatestEvidenceReport,
  renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown,
} from "../services/javaMiniKvRouteCatalogCleanupLatestEvidenceReport.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_HANDOFF_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupHandoffEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupHandoffEvidenceReportMarkdown,
  ),
  auditJsonMarkdownRoute(
    JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_EVIDENCE_ROUTE_PATH,
    (deps) => loadJavaMiniKvRouteCatalogCleanupLatestEvidenceReport({
      config: deps.config,
    }),
    renderJavaMiniKvRouteCatalogCleanupLatestEvidenceReportMarkdown,
  ),
];
