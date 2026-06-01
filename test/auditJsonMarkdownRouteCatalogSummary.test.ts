import { describe, expect, it } from "vitest";

import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
  flattenAuditJsonMarkdownRouteCatalog,
  summarizeAuditJsonMarkdownRouteCatalog,
} from "../src/routes/auditJsonMarkdownRouteCatalogSummary.js";
import { auditJsonMarkdownRouteGroups } from "../src/routes/auditJsonMarkdownRouteGroups.js";
import { auditJsonMarkdownRoutes } from "../src/routes/auditJsonMarkdownRoutes.js";

describe("audit JSON/Markdown route catalog summary", () => {
  it("summarizes route groups, routes, domains, and route-table order", () => {
    const flattenedRoutes = flattenAuditJsonMarkdownRouteCatalog(auditJsonMarkdownRouteGroups);
    const summary = summarizeAuditJsonMarkdownRouteCatalog(auditJsonMarkdownRouteGroups);

    expect(flattenedRoutes).toEqual(auditJsonMarkdownRoutes);
    expect(summary).toEqual(EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY);
  });
});
