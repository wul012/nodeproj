import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { AuditLog } from "../services/auditLog.js";
import {
  createAuditStoreRuntimeProfile,
  renderAuditStoreRuntimeProfileMarkdown,
} from "../services/auditStoreRuntimeProfile.js";
import {
  createAuditStoreEnvConfigProfile,
  renderAuditStoreEnvConfigProfileMarkdown,
} from "../services/auditStoreEnvConfigProfile.js";
import type { AuditStoreRuntimeDescription } from "../services/auditStoreFactory.js";

interface AuditRouteDeps {
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">;
}

interface EventsQuery {
  limit?: number;
}

interface AuditStoreProfileQuery {
  format?: "json" | "markdown";
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

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/store-profile", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          format: { type: "string", enum: ["json", "markdown"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const profile = createAuditStoreRuntimeProfile({
      currentEventCount: deps.auditLog.summary().total,
      runtime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAuditStoreRuntimeProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/store-config-profile", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          format: { type: "string", enum: ["json", "markdown"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const profile = createAuditStoreEnvConfigProfile({
      auditStoreKind: deps.config.auditStoreKind,
      auditStorePath: deps.config.auditStorePath,
      auditStoreUrl: deps.config.auditStoreUrl,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAuditStoreEnvConfigProfileMarkdown(profile);
    }

    return profile;
  });
}
