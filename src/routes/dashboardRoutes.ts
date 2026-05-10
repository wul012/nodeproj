import type { FastifyInstance } from "fastify";

import { dashboardHtml } from "../ui/dashboard.js";

export async function registerDashboardRoutes(app: FastifyInstance): Promise<void> {
  app.get("/", async (_request, reply) => {
    reply.type("text/html; charset=utf-8");
    return dashboardHtml();
  });
}
