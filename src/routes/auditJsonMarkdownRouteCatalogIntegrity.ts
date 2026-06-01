import type { AuditJsonMarkdownRouteRegistration } from "./auditJsonMarkdownRouteRegistrar.js";
import type { AuditJsonMarkdownRouteGroup } from "./auditJsonMarkdownRouteGroups.js";

export type AuditJsonMarkdownRouteDomain = AuditJsonMarkdownRouteGroup["domain"];

export interface AuditJsonMarkdownRouteCatalogIntegrityInput {
  groups: readonly AuditJsonMarkdownRouteGroup[];
  routes: readonly AuditJsonMarkdownRouteRegistration[];
  sourceAnchors?: readonly string[];
}

export interface AuditJsonMarkdownRouteCatalogIntegrityResult {
  ready: boolean;
  checks: {
    hasGroups: boolean;
    hasRoutes: boolean;
    noEmptyGroups: boolean;
    uniqueGroupIds: boolean;
    uniqueRoutePaths: boolean;
    routeTableMatchesCatalog: boolean;
    sourceAnchorsMatchGroupCount: boolean;
  };
  summary: {
    groupCount: number;
    routeCount: number;
    sourceAnchorCount: number;
    domainGroupCounts: Record<AuditJsonMarkdownRouteDomain, number>;
    emptyGroupIds: string[];
    duplicateGroupIds: string[];
    duplicateRoutePaths: string[];
    firstRoutePath: string | null;
    lastRoutePath: string | null;
  };
}

const AUDIT_JSON_MARKDOWN_ROUTE_DOMAINS: readonly AuditJsonMarkdownRouteDomain[] = [
  "foundational",
  "managed-audit",
  "credential-resolver",
  "java-mini-kv",
  "minimal-integration",
  "sandbox",
];

export function evaluateAuditJsonMarkdownRouteCatalogIntegrity(
  input: AuditJsonMarkdownRouteCatalogIntegrityInput,
): AuditJsonMarkdownRouteCatalogIntegrityResult {
  const flattenedRoutes = input.groups.flatMap((group) => group.routes);
  const duplicateGroupIds = collectDuplicates(input.groups.map((group) => group.id));
  const duplicateRoutePaths = collectDuplicates(flattenedRoutes.map((route) => route.path));
  const emptyGroupIds = input.groups
    .filter((group) => group.routes.length === 0)
    .map((group) => group.id);
  const sourceAnchorCount = input.sourceAnchors?.length ?? 0;

  const checks = {
    hasGroups: input.groups.length > 0,
    hasRoutes: flattenedRoutes.length > 0 && input.routes.length > 0,
    noEmptyGroups: emptyGroupIds.length === 0,
    uniqueGroupIds: duplicateGroupIds.length === 0,
    uniqueRoutePaths: duplicateRoutePaths.length === 0,
    routeTableMatchesCatalog: routesMatch(flattenedRoutes, input.routes),
    sourceAnchorsMatchGroupCount: input.sourceAnchors === undefined
      || sourceAnchorCount === input.groups.length,
  };

  return {
    ready: Object.values(checks).every(Boolean),
    checks,
    summary: {
      groupCount: input.groups.length,
      routeCount: flattenedRoutes.length,
      sourceAnchorCount,
      domainGroupCounts: countGroupsByDomain(input.groups),
      emptyGroupIds,
      duplicateGroupIds,
      duplicateRoutePaths,
      firstRoutePath: flattenedRoutes[0]?.path ?? null,
      lastRoutePath: flattenedRoutes.at(-1)?.path ?? null,
    },
  };
}

function routesMatch(
  catalogRoutes: readonly AuditJsonMarkdownRouteRegistration[],
  routeTable: readonly AuditJsonMarkdownRouteRegistration[],
): boolean {
  return catalogRoutes.length === routeTable.length
    && catalogRoutes.every((route, index) => route === routeTable[index]);
}

function collectDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates].sort();
}

function countGroupsByDomain(
  groups: readonly AuditJsonMarkdownRouteGroup[],
): Record<AuditJsonMarkdownRouteDomain, number> {
  const counts = Object.fromEntries(
    AUDIT_JSON_MARKDOWN_ROUTE_DOMAINS.map((domain) => [domain, 0]),
  ) as Record<AuditJsonMarkdownRouteDomain, number>;

  for (const group of groups) {
    counts[group.domain] += 1;
  }

  return counts;
}
