import type { AuditJsonMarkdownRouteRegistration } from "./auditJsonMarkdownRouteRegistrar.js";
import type { AuditJsonMarkdownRouteGroup } from "./auditJsonMarkdownRouteGroups.js";

export type AuditJsonMarkdownRouteDomain = AuditJsonMarkdownRouteGroup["domain"];

export interface AuditJsonMarkdownRouteCatalogSummary {
  groupCount: number;
  routeCount: number;
  domainGroupCounts: Record<AuditJsonMarkdownRouteDomain, number>;
  domainRouteCounts: Record<AuditJsonMarkdownRouteDomain, number>;
  firstRoutePath: string | null;
  lastRoutePath: string | null;
}

export const AUDIT_JSON_MARKDOWN_ROUTE_DOMAINS: readonly AuditJsonMarkdownRouteDomain[] = [
  "foundational",
  "managed-audit",
  "credential-resolver",
  "java-mini-kv",
  "minimal-integration",
  "sandbox",
];

export const EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY: AuditJsonMarkdownRouteCatalogSummary = {
  groupCount: 51,
  routeCount: 252,
  domainGroupCounts: {
    foundational: 1,
    "managed-audit": 16,
    "credential-resolver": 24,
    "java-mini-kv": 6,
    "minimal-integration": 2,
    sandbox: 2,
  },
  domainRouteCounts: {
    foundational: 6,
    "managed-audit": 54,
    "credential-resolver": 70,
    "java-mini-kv": 85,
    "minimal-integration": 19,
    sandbox: 18,
  },
  firstRoutePath: "/api/v1/audit/store-profile",
  lastRoutePath:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification",
};

export function flattenAuditJsonMarkdownRouteCatalog(
  groups: readonly AuditJsonMarkdownRouteGroup[],
): AuditJsonMarkdownRouteRegistration[] {
  return groups.flatMap((group) => group.routes);
}

export function summarizeAuditJsonMarkdownRouteCatalog(
  groups: readonly AuditJsonMarkdownRouteGroup[],
): AuditJsonMarkdownRouteCatalogSummary {
  const flattenedRoutes = flattenAuditJsonMarkdownRouteCatalog(groups);

  return {
    groupCount: groups.length,
    routeCount: flattenedRoutes.length,
    domainGroupCounts: countByDomain(groups, () => 1),
    domainRouteCounts: countByDomain(groups, (group) => group.routes.length),
    firstRoutePath: flattenedRoutes[0]?.path ?? null,
    lastRoutePath: flattenedRoutes.at(-1)?.path ?? null,
  };
}

function countByDomain(
  groups: readonly AuditJsonMarkdownRouteGroup[],
  valueForGroup: (group: AuditJsonMarkdownRouteGroup) => number,
): Record<AuditJsonMarkdownRouteDomain, number> {
  const counts = Object.fromEntries(
    AUDIT_JSON_MARKDOWN_ROUTE_DOMAINS.map((domain) => [domain, 0]),
  ) as Record<AuditJsonMarkdownRouteDomain, number>;

  for (const group of groups) {
    counts[group.domain] += valueForGroup(group);
  }

  return counts;
}
