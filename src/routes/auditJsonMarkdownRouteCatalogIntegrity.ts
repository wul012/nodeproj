import type { AuditJsonMarkdownRouteRegistration } from "./auditJsonMarkdownRouteRegistrar.js";
import type { AuditJsonMarkdownRouteGroup } from "./auditJsonMarkdownRouteGroups.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
  flattenAuditJsonMarkdownRouteCatalog,
  summarizeAuditJsonMarkdownRouteCatalog,
  type AuditJsonMarkdownRouteCatalogSummary,
} from "./auditJsonMarkdownRouteCatalogSummary.js";

export type {
  AuditJsonMarkdownRouteCatalogSummary,
  AuditJsonMarkdownRouteDomain,
} from "./auditJsonMarkdownRouteCatalogSummary.js";

export interface AuditJsonMarkdownRouteCatalogIntegrityInput {
  groups: readonly AuditJsonMarkdownRouteGroup[];
  routes: readonly AuditJsonMarkdownRouteRegistration[];
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
  };
  summary: AuditJsonMarkdownRouteCatalogSummary & {
    emptyGroupIds: string[];
    duplicateGroupIds: string[];
    duplicateRoutePaths: string[];
  };
}

export function evaluateAuditJsonMarkdownRouteCatalogIntegrity(
  input: AuditJsonMarkdownRouteCatalogIntegrityInput,
): AuditJsonMarkdownRouteCatalogIntegrityResult {
  const flattenedRoutes = flattenAuditJsonMarkdownRouteCatalog(input.groups);
  const catalogSummary = summarizeAuditJsonMarkdownRouteCatalog(input.groups);
  const duplicateGroupIds = collectDuplicates(input.groups.map((group) => group.id));
  const duplicateRoutePaths = collectDuplicates(flattenedRoutes.map((route) => route.path));
  const emptyGroupIds = input.groups
    .filter((group) => group.routes.length === 0)
    .map((group) => group.id);

  const checks = {
    hasGroups: input.groups.length > 0,
    hasRoutes: flattenedRoutes.length > 0 && input.routes.length > 0,
    noEmptyGroups: emptyGroupIds.length === 0,
    uniqueGroupIds: duplicateGroupIds.length === 0,
    uniqueRoutePaths: duplicateRoutePaths.length === 0,
    routeTableMatchesCatalog: routesMatch(flattenedRoutes, input.routes),
  };

  return {
    ready: Object.values(checks).every(Boolean),
    checks,
    summary: {
      ...catalogSummary,
      emptyGroupIds,
      duplicateGroupIds,
      duplicateRoutePaths,
    },
  };
}

export function createExpectedAuditJsonMarkdownRouteCatalogIntegritySnapshot():
  AuditJsonMarkdownRouteCatalogIntegrityResult {
  return {
    ready: true,
    checks: {
      hasGroups: true,
      hasRoutes: true,
      noEmptyGroups: true,
      uniqueGroupIds: true,
      uniqueRoutePaths: true,
      routeTableMatchesCatalog: true,
    },
    summary: {
      ...EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
      emptyGroupIds: [],
      duplicateGroupIds: [],
      duplicateRoutePaths: [],
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
