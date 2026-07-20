import type { FastifyInstance } from "fastify";

import { createPromotionArchiveArtifacts } from "./promotionArchive/artifacts.js";
import {
  PROMOTION_ARCHIVE_ROUTES,
  type PromotionArchiveRoute,
} from "./promotionArchive/routeManifest.js";
import type { OpsSummaryRouteDeps } from "./opsSummaryRoutes.js";

interface OpsPromotionArchiveQuery {
  format?: "json" | "markdown";
}

const promotionArchiveQueryRouteOptions = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
} as const;

export function registerOpsPromotionArchiveRoutes(
  app: FastifyInstance,
  deps: OpsSummaryRouteDeps,
): void {
  for (const route of PROMOTION_ARCHIVE_ROUTES) {
    registerPromotionArchiveRoute(app, deps, route);
  }
}

function registerPromotionArchiveRoute(
  app: FastifyInstance,
  deps: OpsSummaryRouteDeps,
  route: PromotionArchiveRoute,
): void {
  app.get<{ Querystring: OpsPromotionArchiveQuery }>(
    route.path,
    promotionArchiveQueryRouteOptions,
    async (request, reply) => {
      const artifacts = createPromotionArchiveArtifacts(deps);

      if (request.query.format === "markdown") {
        reply.type("text/markdown; charset=utf-8");
        return route.renderMarkdown(artifacts);
      }

      return route.select(artifacts);
    },
  );
}
