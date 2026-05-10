import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { AuditLog } from "../services/auditLog.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { createOpsBaselineStatus, OpsBaselineStore } from "../services/opsBaseline.js";
import { OpsCheckpointLedger } from "../services/opsCheckpoint.js";
import { createOpsCheckpointDiff } from "../services/opsCheckpointDiff.js";
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
  opsCheckpoints: OpsCheckpointLedger;
  opsBaseline: OpsBaselineStore;
  snapshots: OpsSnapshotService;
}

interface OpsHandoffReportQuery {
  format?: "json" | "markdown";
  limit?: number;
}

interface OpsRunbookQuery {
  format?: "json" | "markdown";
}

interface CreateOpsCheckpointBody {
  actor?: string;
  note?: string;
}

interface ListOpsCheckpointQuery {
  limit?: number;
}

interface DiffOpsCheckpointQuery {
  baseId: string;
  targetId: string;
}

interface SetOpsBaselineBody {
  checkpointId: string;
  actor?: string;
  note?: string;
}

interface OpsCheckpointParams {
  checkpointId: string;
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
  app.get<{ Querystring: ListOpsCheckpointQuery }>("/api/v1/ops/checkpoints", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 100 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => ({
    checkpoints: deps.opsCheckpoints.list(request.query.limit ?? 20),
  }));
  app.get<{ Querystring: DiffOpsCheckpointQuery }>("/api/v1/ops/checkpoints/diff", {
    schema: {
      querystring: {
        type: "object",
        required: ["baseId", "targetId"],
        properties: {
          baseId: { type: "string", minLength: 1 },
          targetId: { type: "string", minLength: 1 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => createOpsCheckpointDiff(
    deps.opsCheckpoints.get(request.query.baseId),
    deps.opsCheckpoints.get(request.query.targetId),
  ));
  app.get("/api/v1/ops/baseline", async () => {
    const baseline = deps.opsBaseline.get();
    const latest = deps.opsCheckpoints.list(1)[0];
    return createOpsBaselineStatus({
      baseline,
      baselineCheckpoint: baseline === undefined ? undefined : deps.opsCheckpoints.get(baseline.checkpointId),
      latest,
    });
  });
  app.put<{ Body: SetOpsBaselineBody }>("/api/v1/ops/baseline", {
    schema: {
      body: {
        type: "object",
        required: ["checkpointId"],
        properties: {
          checkpointId: { type: "string", minLength: 1 },
          actor: { type: "string", minLength: 1, maxLength: 80 },
          note: { type: "string", minLength: 1, maxLength: 400 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    const baselineCheckpoint = deps.opsCheckpoints.get(request.body.checkpointId);
    const baseline = deps.opsBaseline.set(baselineCheckpoint, request.body);
    const latest = deps.opsCheckpoints.list(1)[0];

    return createOpsBaselineStatus({
      baseline,
      baselineCheckpoint,
      latest,
    });
  });
  app.delete("/api/v1/ops/baseline", async () => {
    const cleared = deps.opsBaseline.clear();
    const latest = deps.opsCheckpoints.list(1)[0];

    return {
      cleared,
      ...createOpsBaselineStatus({ latest }),
    };
  });
  app.get<{ Params: OpsCheckpointParams }>("/api/v1/ops/checkpoints/:checkpointId", async (request) =>
    deps.opsCheckpoints.get(request.params.checkpointId));
  app.post<{ Body: CreateOpsCheckpointBody }>("/api/v1/ops/checkpoints", {
    schema: {
      body: {
        type: "object",
        properties: {
          actor: { type: "string", minLength: 1, maxLength: 80 },
          note: { type: "string", minLength: 1, maxLength: 400 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const summary = createOpsSummary(deps);
    const readiness = createOpsReadiness(summary);
    const checkpoint = deps.opsCheckpoints.create({
      actor: request.body?.actor,
      note: request.body?.note,
      summary,
      readiness,
      runbook: createOpsRunbook(summary, readiness),
    });

    reply.code(201);
    return checkpoint;
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
