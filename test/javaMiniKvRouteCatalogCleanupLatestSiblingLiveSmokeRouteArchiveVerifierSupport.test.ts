import { describe, expect, it } from "vitest";

import {
  javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
} from "../src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../src/routes/auditJsonMarkdownRouteCatalogSummary.js";
import {
  currentLatestSiblingLiveSmokeRouteCatalogCounts,
  routeCatalogCountsCover,
  routeCatalogCountsMatch,
  type LatestSiblingLiveSmokeRouteCatalogCounts,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.js";

describe("latest sibling live smoke route archive verifier support", () => {
  it("builds current route catalog counts from the shared route catalog authorities", () => {
    expect(currentLatestSiblingLiveSmokeRouteCatalogCounts()).toEqual({
      routeCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount,
      javaMiniKvDomainRouteCount:
        EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"],
      cleanupHandoffRouteGroupRouteCount: javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes.length,
    });
  });

  it("distinguishes exact count matches from current-catalog coverage", () => {
    const current = currentLatestSiblingLiveSmokeRouteCatalogCounts();
    const archived: LatestSiblingLiveSmokeRouteCatalogCounts = {
      routeCount: current.routeCount - 1,
      javaMiniKvDomainRouteCount: current.javaMiniKvDomainRouteCount - 1,
      cleanupHandoffRouteGroupRouteCount: current.cleanupHandoffRouteGroupRouteCount - 1,
    };
    const future: LatestSiblingLiveSmokeRouteCatalogCounts = {
      routeCount: current.routeCount + 1,
      javaMiniKvDomainRouteCount: current.javaMiniKvDomainRouteCount,
      cleanupHandoffRouteGroupRouteCount: current.cleanupHandoffRouteGroupRouteCount,
    };

    expect(routeCatalogCountsMatch(current, current)).toBe(true);
    expect(routeCatalogCountsMatch(current, archived)).toBe(false);
    expect(routeCatalogCountsCover(current, archived)).toBe(true);
    expect(routeCatalogCountsCover(current, future)).toBe(false);
  });
});
