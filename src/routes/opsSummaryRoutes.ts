import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { AuditLog } from "../services/auditLog.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { createOpsReadiness } from "../services/opsReadiness.js";
import { createOpsSummary } from "../services/opsSummary.js";

interface OpsSummaryRouteDeps {
  config: AppConfig;
  auditLog: AuditLog;
  operationIntents: OperationIntentStore;
  operationDispatches: OperationDispatchLedger;
}

export async function registerOpsSummaryRoutes(app: FastifyInstance, deps: OpsSummaryRouteDeps): Promise<void> {
  app.get("/api/v1/ops/summary", async () => createOpsSummary(deps));
  app.get("/api/v1/ops/readiness", async () => createOpsReadiness(createOpsSummary(deps)));
}
