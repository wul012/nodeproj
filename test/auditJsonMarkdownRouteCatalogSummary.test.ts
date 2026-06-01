import { describe, expect, it } from "vitest";

import {
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
    expect(summary).toEqual({
      groupCount: 49,
      routeCount: 198,
      domainGroupCounts: {
        foundational: 1,
        "managed-audit": 16,
        "credential-resolver": 24,
        "java-mini-kv": 4,
        "minimal-integration": 2,
        sandbox: 2,
      },
      domainRouteCounts: {
        foundational: 6,
        "managed-audit": 52,
        "credential-resolver": 70,
        "java-mini-kv": 34,
        "minimal-integration": 18,
        sandbox: 18,
      },
      firstRoutePath: "/api/v1/audit/store-profile",
      lastRoutePath:
        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification",
    });
  });
});
