import { expect } from "vitest";

import type { AuditJsonMarkdownRouteRegistration } from "../../src/routes/auditJsonMarkdownRouteRegistrar.js";
import {
  auditJsonMarkdownRouteGroupSourceAnchors,
  auditJsonMarkdownRouteGroups,
} from "../../src/routes/auditJsonMarkdownRouteGroups.js";
import { auditJsonMarkdownRoutes } from "../../src/routes/auditJsonMarkdownRoutes.js";

export function expectAuditRouteGroupRegisteredThroughCatalog(input: {
  routes: readonly AuditJsonMarkdownRouteRegistration[];
  sourceAnchor: string;
}): void {
  const matchingGroup = auditJsonMarkdownRouteGroups.find((group) => group.routes === input.routes);
  const firstRoute = input.routes[0];
  const startIndex = firstRoute === undefined
    ? -1
    : auditJsonMarkdownRoutes.findIndex((route) => route === firstRoute);

  expect(matchingGroup).toBeDefined();
  expect(matchingGroup?.routes).toBe(input.routes);
  expect(auditJsonMarkdownRouteGroupSourceAnchors).toContain(input.sourceAnchor);
  expect(auditJsonMarkdownRoutes).toEqual(auditJsonMarkdownRouteGroups.flatMap((group) => group.routes));
  expect(startIndex).toBeGreaterThanOrEqual(0);
  expect(auditJsonMarkdownRoutes.slice(startIndex, startIndex + input.routes.length)).toEqual(input.routes);
}
