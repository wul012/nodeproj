import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { AuditLog } from "../services/auditLog.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { createOpsHandoffReport, renderOpsHandoffMarkdown } from "../services/opsHandoffReport.js";
import { createOpsReadiness } from "../services/opsReadiness.js";
import { createOpsRunbook, renderOpsRunbookMarkdown } from "../services/opsRunbook.js";
import { OpsSnapshotService } from "../services/opsSnapshotService.js";
import { createOpsSummary } from "../services/opsSummary.js";

interface OpsSummaryRouteDeps {
  config: AppConfig;
  auditLog: AuditLog;
  operationIntents: OperationIntentStore;
  operationDispatches: OperationDispatchLedger;
  snapshots: OpsSnapshotService;
}

interface OpsHandoffReportQuery {
  format?: "json" | "markdown";
  limit?: number;
}

interface OpsRunbookQuery {
  format?: "json" | "markdown";
}

export async function registerOpsSummaryRoutes(app: FastifyInstance, deps: OpsSummaryRouteDeps): Promise<void> {
  app.get("/api/v1/ops/summary", async () => createOpsSummary(deps));
  app.get("/api/v1/ops/readiness", async () => createOpsReadiness(createOpsSummary(deps)));
  app.get<{ Querystring: OpsRunbookQuery }>("/api/v1/ops/runbook", {
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
    const summary = createOpsSummary(deps);
    const runbook = createOpsRunbook(summary, createOpsReadiness(summary));

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsRunbookMarkdown(runbook);
    }

    return runbook;
  });
  app.get<{ Querystring: OpsHandoffReportQuery }>("/api/v1/ops/handoff-report", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          format: { type: "string", enum: ["json", "markdown"] },
          limit: { type: "integer", minimum: 1, maximum: 100 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const limit = request.query.limit ?? 10;
    const summary = createOpsSummary(deps);
    const readiness = createOpsReadiness(summary);
    const report = createOpsHandoffReport({
      sources: await deps.snapshots.sample(),
      summary,
      readiness,
      auditEvents: deps.auditLog.list(limit),
      intents: deps.operationIntents.list(limit),
      dispatches: deps.operationDispatches.list(limit),
      intentEvents: deps.operationIntents.listEvents({ limit }),
      limit,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsHandoffMarkdown(report);
    }

    return report;
  });
}
