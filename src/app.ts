import type { FastifyInstance } from "fastify";

import { createAppShell } from "./app/createAppShell.js";
import { registerAppRoutes } from "./app/registerRoutes.js";
import { installAccessHooks, installAuditHooks } from "./app/requestHooks.js";
import { createRuntimeDeps } from "./app/runtimeDeps.js";
import type { AppConfig } from "./config.js";

export async function buildApp(config: AppConfig): Promise<FastifyInstance> {
  const app = createAppShell(config);
  const requestContexts = installAccessHooks(app, config);
  const deps = createRuntimeDeps(config);

  installAuditHooks(app, deps.auditLog, requestContexts);
  await registerAppRoutes(app, config, deps);

  return app;
}
