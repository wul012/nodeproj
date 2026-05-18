import type { FastifyInstance } from "fastify";

import { auditJsonMarkdownRoutes } from "./auditJsonMarkdownRoutes.js";
import { registerAuditJsonMarkdownRoutes } from "./auditJsonMarkdownRouteRegistrar.js";
import type { AuditRouteDeps } from "./auditRouteTypes.js";

interface EventsQuery {
  limit?: number;
}

export async function registerAuditRoutes(app: FastifyInstance, deps: AuditRouteDeps): Promise<void> {
  app.get<{ Querystring: EventsQuery }>("/api/v1/audit/events", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 200 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => ({
    events: deps.auditLog.list(request.query.limit ?? 50),
  }));

  app.get("/api/v1/audit/summary", async () => deps.auditLog.summary());

  registerAuditJsonMarkdownRoutes(app, deps, auditJsonMarkdownRoutes);
}
