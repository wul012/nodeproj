import { describe, expect, it } from "vitest";

import type { AuditJsonMarkdownRouteRegistration } from "../src/routes/auditJsonMarkdownRouteRegistrar.js";
import type { AuditJsonMarkdownRouteGroup } from "../src/routes/auditJsonMarkdownRouteGroups.js";
import {
  createExpectedAuditJsonMarkdownRouteCatalogIntegritySnapshot,
  evaluateAuditJsonMarkdownRouteCatalogIntegrity,
} from "../src/routes/auditJsonMarkdownRouteCatalogIntegrity.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../src/routes/auditJsonMarkdownRouteCatalogSummary.js";
import { auditJsonMarkdownRouteGroups } from "../src/routes/auditJsonMarkdownRouteGroups.js";
import {
  auditJsonMarkdownRoutes,
} from "../src/routes/auditJsonMarkdownRoutes.js";

describe("audit JSON/Markdown route catalog integrity", () => {
  it("reports the live catalog as ready and keeps route-table flattening aligned", () => {
    const result = evaluateAuditJsonMarkdownRouteCatalogIntegrity({
      groups: auditJsonMarkdownRouteGroups,
      routes: auditJsonMarkdownRoutes,
    });

    expect(result.ready).toBe(true);
    expect(result.checks).toEqual({
      hasGroups: true,
      hasRoutes: true,
      noEmptyGroups: true,
      uniqueGroupIds: true,
      uniqueRoutePaths: true,
      routeTableMatchesCatalog: true,
    });
    expect(result.summary).toMatchObject(EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY);
    expect(createExpectedAuditJsonMarkdownRouteCatalogIntegritySnapshot()).toEqual(result);
  });

  it("surfaces duplicate groups, duplicate paths, empty groups, and stale flat tables", () => {
    const duplicateRoute = makeRoute("/api/v1/audit/duplicate");
    const staleRouteTable = [makeRoute("/api/v1/audit/stale")];
    const groups: readonly AuditJsonMarkdownRouteGroup[] = [
      {
        id: "duplicate-group",
        domain: "managed-audit",
        routes: [duplicateRoute, makeRoute("/api/v1/audit/duplicate")],
      },
      {
        id: "duplicate-group",
        domain: "sandbox",
        routes: [makeRoute("/api/v1/audit/sandbox")],
      },
      {
        id: "empty-group",
        domain: "foundational",
        routes: [],
      },
    ];

    const result = evaluateAuditJsonMarkdownRouteCatalogIntegrity({
      groups,
      routes: staleRouteTable,
    });

    expect(result.ready).toBe(false);
    expect(result.checks).toMatchObject({
      noEmptyGroups: false,
      uniqueGroupIds: false,
      uniqueRoutePaths: false,
      routeTableMatchesCatalog: false,
    });
    expect(result.summary.emptyGroupIds).toEqual(["empty-group"]);
    expect(result.summary.duplicateGroupIds).toEqual(["duplicate-group"]);
    expect(result.summary.duplicateRoutePaths).toEqual(["/api/v1/audit/duplicate"]);
  });
});

function makeRoute(path: string): AuditJsonMarkdownRouteRegistration {
  return {
    path,
    register: () => undefined,
  };
}
