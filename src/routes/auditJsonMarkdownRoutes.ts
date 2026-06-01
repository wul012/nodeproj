import type { AuditJsonMarkdownRouteRegistration } from "./auditJsonMarkdownRouteRegistrar.js";
import { auditJsonMarkdownRouteGroups } from "./auditJsonMarkdownRouteGroups.js";

export const auditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = auditJsonMarkdownRouteGroups
  .flatMap((group) => group.routes);
