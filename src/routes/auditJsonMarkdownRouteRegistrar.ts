import type { FastifyInstance } from "fastify";

import type { AuditRouteDeps, AuditStoreProfileQuery } from "./auditRouteTypes.js";

export interface AuditJsonMarkdownRouteRegistration {
  path: string;
  register: (app: FastifyInstance, deps: AuditRouteDeps) => void;
}

const auditStoreProfileRouteSchema = {
  querystring: {
    type: "object",
    properties: {
      format: { type: "string", enum: ["json", "markdown"] },
    },
    additionalProperties: false,
  },
};

export function registerAuditJsonMarkdownRoute<TProfile>(
  app: FastifyInstance,
  routePath: string,
  loadProfile: () => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  app.get<{ Querystring: AuditStoreProfileQuery }>(routePath, {
    schema: auditStoreProfileRouteSchema,
  }, async (request, reply) => {
    const profile = await loadProfile();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(profile);
    }

    return profile;
  });
}

export function auditJsonMarkdownRoute<TProfile>(
  path: string,
  loadProfile: (deps: AuditRouteDeps) => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): AuditJsonMarkdownRouteRegistration {
  return {
    path,
    register: (app, deps) => registerAuditJsonMarkdownRoute(
      app,
      path,
      () => loadProfile(deps),
      renderMarkdown,
    ),
  };
}

export function registerAuditJsonMarkdownRoutes(
  app: FastifyInstance,
  deps: AuditRouteDeps,
  routes: readonly AuditJsonMarkdownRouteRegistration[],
): void {
  for (const route of routes) {
    route.register(app, deps);
  }
}
