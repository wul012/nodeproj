import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { OpsSnapshotService } from "../services/opsSnapshotService.js";
import {
  createCiEvidenceCommandProfile,
  renderCiEvidenceCommandProfileMarkdown,
} from "../services/ciEvidenceCommandProfile.js";
import { createUpstreamOverview } from "../services/upstreamOverview.js";
import {
  loadUpstreamContractFixtureReport,
  renderUpstreamContractFixtureReportMarkdown,
} from "../services/upstreamContractFixtures.js";
import {
  loadUpstreamContractFixtureDriftDiagnostics,
  renderUpstreamContractFixtureDriftDiagnosticsMarkdown,
} from "../services/upstreamContractFixtureDrift.js";
import {
  loadUpstreamContractFixtureArchiveSnapshot,
  renderUpstreamContractFixtureArchiveSnapshotMarkdown,
} from "../services/upstreamContractFixtureArchive.js";
import {
  loadUpstreamContractFixtureScenarioMatrix,
  renderUpstreamContractFixtureScenarioMatrixMarkdown,
} from "../services/upstreamContractFixtureScenarioMatrix.js";
import {
  loadUpstreamContractFixtureScenarioMatrixVerification,
  renderUpstreamContractFixtureScenarioMatrixVerificationMarkdown,
} from "../services/upstreamContractFixtureScenarioMatrixVerification.js";
import {
  loadUpstreamContractFixtureScenarioVerificationArchiveBundle,
  renderUpstreamContractFixtureScenarioVerificationArchiveBundleMarkdown,
} from "../services/upstreamContractFixtureScenarioVerificationArchiveBundle.js";
import {
  loadUpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
  renderUpstreamContractFixtureScenarioVerificationArchiveBundleVerificationMarkdown,
} from "../services/upstreamContractFixtureScenarioVerificationArchiveBundleVerification.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceIndex,
  renderUpstreamContractFixtureScenarioReleaseEvidenceIndexMarkdown,
} from "../services/upstreamContractFixtureScenarioReleaseEvidenceIndex.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
  renderUpstreamContractFixtureScenarioReleaseEvidenceReadinessGateMarkdown,
} from "../services/upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.js";

interface StatusRouteDeps {
  config: AppConfig;
  snapshots: OpsSnapshotService;
}

interface FixtureReportQuery {
  format?: "json" | "markdown";
}

export async function registerStatusRoutes(app: FastifyInstance, deps: StatusRouteDeps): Promise<void> {
  app.get("/health", async () => ({
    service: "orderops-node",
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    pid: process.pid,
    version: process.version,
  }));

  app.get("/api/v1/sources/status", async () => deps.snapshots.sample());

  app.get("/api/v1/upstreams/overview", async () => {
    const snapshot = await deps.snapshots.sample();
    return createUpstreamOverview(deps.config, snapshot);
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures", {
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
    const report = await loadUpstreamContractFixtureReport(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureReportMarkdown(report);
    }

    return report;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/drift-diagnostics", {
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
    const diagnostics = await loadUpstreamContractFixtureDriftDiagnostics(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureDriftDiagnosticsMarkdown(diagnostics);
    }

    return diagnostics;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/archive-snapshot", {
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
    const snapshot = await loadUpstreamContractFixtureArchiveSnapshot(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureArchiveSnapshotMarkdown(snapshot);
    }

    return snapshot;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/scenario-matrix", {
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
    const matrix = await loadUpstreamContractFixtureScenarioMatrix(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureScenarioMatrixMarkdown(matrix);
    }

    return matrix;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/scenario-matrix/verification", {
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
    const verification = await loadUpstreamContractFixtureScenarioMatrixVerification(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureScenarioMatrixVerificationMarkdown(verification);
    }

    return verification;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle", {
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
    const bundle = await loadUpstreamContractFixtureScenarioVerificationArchiveBundle(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureScenarioVerificationArchiveBundleMarkdown(bundle);
    }

    return bundle;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification", {
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
    const verification = await loadUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureScenarioVerificationArchiveBundleVerificationMarkdown(verification);
    }

    return verification;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index", {
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
    const index = await loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureScenarioReleaseEvidenceIndexMarkdown(index);
    }

    return index;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate", {
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
    const gate = await loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamContractFixtureScenarioReleaseEvidenceReadinessGateMarkdown(gate);
    }

    return gate;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/ci/evidence-command-profile", {
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
    const profile = createCiEvidenceCommandProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderCiEvidenceCommandProfileMarkdown(profile);
    }

    return profile;
  });

  app.get("/api/v1/runtime/config", async () => ({
    service: "orderops-node",
    safety: {
      upstreamProbesEnabled: deps.config.upstreamProbesEnabled,
      upstreamActionsEnabled: deps.config.upstreamActionsEnabled,
    },
    upstreams: {
      orderPlatformUrl: deps.config.orderPlatformUrl,
      miniKv: `${deps.config.miniKvHost}:${deps.config.miniKvPort}`,
    },
    fixtures: {
      javaExecutionContractFixturePath: deps.config.javaExecutionContractFixturePath,
      javaExecutionContractBlockedFixturePath: deps.config.javaExecutionContractBlockedFixturePath,
      miniKvCheckJsonFixturePath: deps.config.miniKvCheckJsonFixturePath,
      miniKvCheckJsonReadFixturePath: deps.config.miniKvCheckJsonReadFixturePath,
    },
    mutationRateLimit: {
      windowMs: deps.config.mutationRateLimitWindowMs,
      maxRequests: deps.config.mutationRateLimitMax,
    },
    opsSampleIntervalMs: deps.config.opsSampleIntervalMs,
  }));

  app.get("/api/v1/events/ops", (request, reply) => {
    reply.hijack();
    reply.raw.writeHead(200, {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    });

    let closed = false;

    const send = async () => {
      if (closed) {
        return;
      }

      try {
        const snapshot = await deps.snapshots.sample();
        reply.raw.write(`event: snapshot\ndata: ${JSON.stringify(snapshot)}\n\n`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        reply.raw.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
      }
    };

    const interval = setInterval(() => {
      void send();
    }, deps.config.opsSampleIntervalMs);

    request.raw.on("close", () => {
      closed = true;
      clearInterval(interval);
    });

    void send();
  });
}
