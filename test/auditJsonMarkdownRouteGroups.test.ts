import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { auditJsonMarkdownRoutes } from "../src/routes/auditJsonMarkdownRoutes.js";
import { auditJsonMarkdownRouteGroups } from "../src/routes/auditJsonMarkdownRouteGroups.js";

describe("audit JSON/Markdown route group catalog", () => {
  it("keeps the central route table as a flat catalog consumer with unique groups and paths", () => {
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");
    const catalogSource = readFileSync("src/routes/auditJsonMarkdownRouteGroups.ts", "utf8");
    const groupIds = auditJsonMarkdownRouteGroups.map((group) => group.id);
    const paths = auditJsonMarkdownRoutes.map((route) => route.path);

    expect(auditJsonMarkdownRouteGroups).toHaveLength(50);
    expect(new Set(groupIds).size).toBe(groupIds.length);
    expect(paths).toHaveLength(203);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths[0]).toBe("/api/v1/audit/store-profile");
    expect(paths.at(-1)).toBe("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification");
    expect(auditJsonMarkdownRoutes).toEqual(auditJsonMarkdownRouteGroups.flatMap((group) => group.routes));

    expect(routeTableSource).toContain("auditJsonMarkdownRouteGroups");
    expect(routeTableSource).toContain(".flatMap((group) => group.routes)");
    expect(routeTableSource).not.toContain("auditJsonMarkdownRoute(");
    expect(routeTableSource).not.toContain("auditJsonMarkdownRouteGroupSourceAnchors");

    expect(catalogSource).toContain("export const auditJsonMarkdownRouteGroups");
    expect(catalogSource).not.toContain("auditJsonMarkdownRouteGroupSourceAnchors");
    expect(catalogSource).toContain("id: \"foundational\"");
    expect(catalogSource).toContain("id: \"java-mini-kv-route-catalog-cleanup-handoff\"");
    expect(catalogSource).toContain("id: \"sandbox-handle-review\"");
  });
});
