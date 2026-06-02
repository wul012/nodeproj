import {
  javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
} from "../routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import type {
  LatestSiblingLiveSmokeArchiveFileReference,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationSupport.js";
import {
  stringValue,
  valueAt,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationSupport.js";

export interface LatestSiblingLiveSmokeRouteCatalogCounts {
  routeCount: number;
  javaMiniKvDomainRouteCount: number;
  cleanupHandoffRouteGroupRouteCount: number;
}

export function archiveFileDigestsMatchSummary(
  archiveFiles: {
    json: LatestSiblingLiveSmokeArchiveFileReference;
    markdown: LatestSiblingLiveSmokeArchiveFileReference;
  },
  summaryJson: Record<string, unknown> | null,
): boolean {
  return archiveFiles.json.sha256 === stringValue(valueAt(summaryJson, "files", "json", "sha256"))
    && archiveFiles.markdown.sha256 === stringValue(valueAt(summaryJson, "files", "markdown", "sha256"));
}

export function routeCatalogCountsMatch(
  actual: LatestSiblingLiveSmokeRouteCatalogCounts,
  expected: LatestSiblingLiveSmokeRouteCatalogCounts,
): boolean {
  return actual.routeCount === expected.routeCount
    && actual.javaMiniKvDomainRouteCount === expected.javaMiniKvDomainRouteCount
    && actual.cleanupHandoffRouteGroupRouteCount === expected.cleanupHandoffRouteGroupRouteCount;
}

export function routeCatalogCountsCover(
  current: LatestSiblingLiveSmokeRouteCatalogCounts,
  archived: LatestSiblingLiveSmokeRouteCatalogCounts,
): boolean {
  return current.routeCount >= archived.routeCount
    && current.javaMiniKvDomainRouteCount >= archived.javaMiniKvDomainRouteCount
    && current.cleanupHandoffRouteGroupRouteCount >= archived.cleanupHandoffRouteGroupRouteCount;
}

export function currentLatestSiblingLiveSmokeRouteCatalogCounts(): LatestSiblingLiveSmokeRouteCatalogCounts {
  return {
    routeCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount,
    javaMiniKvDomainRouteCount:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"],
    cleanupHandoffRouteGroupRouteCount: javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes.length,
  };
}
