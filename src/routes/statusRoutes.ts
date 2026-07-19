import type { FastifyInstance } from "fastify";

import {
  createCiEvidenceCommandProfile,
  renderCiEvidenceCommandProfileMarkdown,
} from "../services/ciEvidenceCommandProfile.js";
import {
  loadCiEvidenceHardeningPacket,
  renderCiEvidenceHardeningPacketMarkdown,
} from "../services/ciEvidenceHardeningPacket.js";
import {
  loadCiOperatorIdentityEvidencePacket,
  renderCiOperatorIdentityEvidencePacketMarkdown,
} from "../services/ciOperatorIdentityEvidencePacket.js";
import {
  loadStatusRoutesSplitQualityPass,
  renderStatusRoutesSplitQualityPassMarkdown,
} from "../services/statusRoutesSplitQualityPass.js";
import { createUpstreamOverview } from "../services/upstreamOverview.js";
import {
  loadWorkflowEvidenceVerification,
  renderWorkflowEvidenceVerificationMarkdown,
} from "../services/workflowEvidenceVerification.js";
import { dashboardHtml } from "../ui/dashboard.js";
import {
  registerHeaderJsonMarkdownRoute,
  registerJsonMarkdownReportRoute,
} from "./statusJsonMarkdownRoute.js";
import {
  registerStatusDeploymentRoutes,
  registerStatusProductionConnectionApprovalRoutes,
} from "./statusDeploymentRoutes.js";
import { registerStatusLiveProbeRoutes } from "./statusLiveProbeRoutes.js";
import { registerStatusReadinessSummaryRoutes } from "./statusReadinessSummaryRoutes.js";
import {
  registerStatusRealReadRoutes,
  registerStatusReleaseGateRoutes,
} from "./statusReportRoutes.js";
import { registerStatusRollbackRoutes } from "./statusRollbackRoutes.js";
import { registerStatusSecurityRoutes } from "./statusSecurityRoutes.js";
import type { StatusRouteDeps } from "./statusRouteTypes.js";
import { registerStatusUpstreamFixtureRoutes } from "./statusUpstreamFixtureRoutes.js";

export async function registerDashboardRoutes(app: FastifyInstance): Promise<void> {
  app.get("/", async (_request, reply) => {
    reply.type("text/html; charset=utf-8");
    return dashboardHtml();
  });
}

export async function registerStatusRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): Promise<void> {
  registerStatusCoreRoutes(app, deps);
  registerStatusUpstreamFixtureRoutes(app, deps);
  registerStatusCiRoutes(app, deps);

  registerStatusSecurityRoutes(app, deps);
  registerStatusDeploymentRoutes(app, deps);
  registerStatusReadinessSummaryRoutes(app, deps);
  registerStatusRollbackRoutes(app, deps);
  registerStatusLiveProbeRoutes(app, deps);
  registerWorkflowEvidenceRoute(app);

  registerStatusProductionConnectionApprovalRoutes(app, deps);
  registerStatusRealReadRoutes(app, deps);
  registerStatusReleaseGateRoutes(app, deps);
  registerStatusRuntimeRoutes(app, deps);
}

function registerStatusCoreRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
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
}

function registerStatusCiRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/status-routes/split-quality-pass",
    () => Promise.resolve(loadStatusRoutesSplitQualityPass()),
    renderStatusRoutesSplitQualityPassMarkdown,
  );
  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/ci/evidence-command-profile",
    () => Promise.resolve(createCiEvidenceCommandProfile(deps.config)),
    renderCiEvidenceCommandProfileMarkdown,
  );
  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/ci/evidence-hardening-packet",
    () => Promise.resolve(loadCiEvidenceHardeningPacket(deps.config)),
    renderCiEvidenceHardeningPacketMarkdown,
  );
  registerHeaderJsonMarkdownRoute(
    app,
    "/api/v1/ci/operator-identity-evidence-packet",
    (headers) => loadCiOperatorIdentityEvidencePacket(deps.config, headers),
    renderCiOperatorIdentityEvidencePacketMarkdown,
  );
}

function registerWorkflowEvidenceRoute(app: FastifyInstance): void {
  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/ci/workflow-evidence-verification",
    loadWorkflowEvidenceVerification,
    renderWorkflowEvidenceVerificationMarkdown,
  );
}

function registerStatusRuntimeRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  app.get("/api/v1/runtime/config", async () => ({
    service: "orderops-node",
    safety: {
      upstreamProbesEnabled: deps.config.upstreamProbesEnabled,
      upstreamActionsEnabled: deps.config.upstreamActionsEnabled,
      orderopsAuthMode: deps.config.orderopsAuthMode,
      accessGuardEnforcementEnabled: deps.config.accessGuardEnforcementEnabled,
      authTokenIssuer: deps.config.authTokenIssuer,
      authTokenSecretConfigured: deps.config.authTokenSecret.length > 0,
      idpIssuerConfigured: deps.config.idpIssuer.length > 0,
      idpAudienceConfigured: deps.config.idpAudience.length > 0,
      idpJwksUrlConfigured: deps.config.idpJwksUrl.length > 0,
      idpClockSkewSeconds: deps.config.idpClockSkewSeconds,
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
      javaOpsEvidenceFixturePath: deps.config.javaOpsEvidenceFixturePath,
      miniKvStorageEvidenceFixturePath: deps.config.miniKvStorageEvidenceFixturePath,
      javaReplayAuditApprovedFixturePath: deps.config.javaReplayAuditApprovedFixturePath,
      javaReplayAuditBlockedFixturePath: deps.config.javaReplayAuditBlockedFixturePath,
      javaReplayEvidenceIndexFixturePath: deps.config.javaReplayEvidenceIndexFixturePath,
      miniKvRestartRecoveryEvidenceFixturePath: deps.config.miniKvRestartRecoveryEvidenceFixturePath,
      miniKvRecoveryFixtureIndexPath: deps.config.miniKvRecoveryFixtureIndexPath,
    },
    mutationRateLimit: {
      windowMs: deps.config.mutationRateLimitWindowMs,
      maxRequests: deps.config.mutationRateLimitMax,
    },
    auditRetention: {
      retentionDays: deps.config.auditRetentionDays,
      maxFileBytes: deps.config.auditMaxFileBytes,
      rotationEnabled: deps.config.auditRotationEnabled,
      backupEnabled: deps.config.auditBackupEnabled,
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
