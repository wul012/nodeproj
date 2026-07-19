import type { FastifyInstance, FastifyRequest } from "fastify";

import type { FixtureReportQuery } from "./statusRouteTypes.js";

export interface StatusJsonMarkdownRouteRegistration {
  path: string;
  register: (app: FastifyInstance) => void;
}

export const fixtureReportQuerySchema = {
  type: "object",
  properties: {
    format: { type: "string", enum: ["json", "markdown"] },
  },
  additionalProperties: false,
} as const;

export function registerJsonMarkdownReportRoute<TProfile>(
  app: FastifyInstance,
  path: string,
  loadProfile: () => Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  registerRequestReportRoute(app, path, () => loadProfile(), renderMarkdown);
}

export function registerHeaderJsonMarkdownRoute<TProfile>(
  app: FastifyInstance,
  path: string,
  loadProfile: (headers: FastifyRequest["headers"]) => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  registerRequestReportRoute(
    app,
    path,
    (request) => Promise.resolve(loadProfile(request.headers)),
    renderMarkdown,
  );
}

function registerRequestReportRoute<TProfile>(
  app: FastifyInstance,
  path: string,
  loadProfile: (
    request: FastifyRequest<{ Querystring: FixtureReportQuery }>,
  ) => Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  app.get<{ Querystring: FixtureReportQuery }>(path, {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadProfile(request);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(profile);
    }

    return profile;
  });
}

export function statusJsonMarkdownRoute<TProfile>(
  path: string,
  loadProfile: () => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): StatusJsonMarkdownRouteRegistration {
  return {
    path,
    register: (app) => registerJsonMarkdownReportRoute(
      app,
      path,
      () => Promise.resolve(loadProfile()),
      renderMarkdown,
    ),
  };
}

export function registerStatusJsonMarkdownRoutes(
  app: FastifyInstance,
  routes: readonly StatusJsonMarkdownRouteRegistration[],
): void {
  for (const route of routes) {
    route.register(app);
  }
}
