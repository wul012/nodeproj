import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { AuditLog } from "../services/auditLog.js";
import {
  createAuditStoreRuntimeProfile,
  renderAuditStoreRuntimeProfileMarkdown,
} from "../services/auditStoreRuntimeProfile.js";
import {
  createAuditStoreEnvConfigProfile,
  renderAuditStoreEnvConfigProfileMarkdown,
} from "../services/auditStoreEnvConfigProfile.js";
import {
  createFileAuditRestartEvidenceReport,
  renderFileAuditRestartEvidenceMarkdown,
} from "../services/fileAuditRestartEvidence.js";
import {
  createAuditRetentionIntegrityEvidence,
  renderAuditRetentionIntegrityEvidenceMarkdown,
} from "../services/auditRetentionIntegrityEvidence.js";
import {
  createManagedAuditStoreContractProfile,
  renderManagedAuditStoreContractMarkdown,
} from "../services/managedAuditStoreContract.js";
import {
  createManagedAuditReadinessSummary,
  renderManagedAuditReadinessSummaryMarkdown,
} from "../services/managedAuditReadinessSummary.js";
import {
  createManagedAuditAdapterBoundaryProfile,
  renderManagedAuditAdapterBoundaryMarkdown,
} from "../services/managedAuditAdapterBoundary.js";
import {
  createManagedAuditAdapterComplianceProfile,
  renderManagedAuditAdapterComplianceMarkdown,
} from "../services/managedAuditAdapterCompliance.js";
import {
  createManagedAuditAdapterRunnerProfile,
  renderManagedAuditAdapterRunnerMarkdown,
} from "../services/managedAuditAdapterRunner.js";
import {
  loadManagedAuditPersistenceBoundaryCandidate,
  renderManagedAuditPersistenceBoundaryCandidateMarkdown,
} from "../services/managedAuditPersistenceBoundaryCandidate.js";
import {
  loadManagedAuditPersistenceDryRunVerification,
  renderManagedAuditPersistenceDryRunVerificationMarkdown,
} from "../services/managedAuditPersistenceDryRunVerification.js";
import {
  loadManagedAuditIdentityApprovalBindingContract,
  renderManagedAuditIdentityApprovalBindingContractMarkdown,
} from "../services/managedAuditIdentityApprovalBindingContract.js";
import {
  loadManagedAuditIdentityApprovalProvenanceDryRunPacket,
  renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown,
} from "../services/managedAuditIdentityApprovalProvenanceDryRunPacket.js";
import {
  loadManagedAuditIdentityApprovalProvenancePacketVerificationReport,
  renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown,
} from "../services/managedAuditIdentityApprovalProvenancePacketVerificationReport.js";
import {
  loadManagedAuditPacketRestoreDrillPlan,
  renderManagedAuditPacketRestoreDrillPlanMarkdown,
} from "../services/managedAuditPacketRestoreDrillPlan.js";
import {
  loadManagedAuditRestoreDrillArchiveVerification,
  renderManagedAuditRestoreDrillArchiveVerificationMarkdown,
} from "../services/managedAuditRestoreDrillArchiveVerification.js";
import {
  loadManagedAuditDryRunAdapterCandidate,
  renderManagedAuditDryRunAdapterCandidateMarkdown,
} from "../services/managedAuditDryRunAdapterCandidate.js";
import {
  loadManagedAuditDryRunAdapterArchiveVerification,
  renderManagedAuditDryRunAdapterArchiveVerificationMarkdown,
} from "../services/managedAuditDryRunAdapterArchiveVerification.js";
import {
  loadManagedAuditAdapterProductionHardeningReadinessGate,
  renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown,
} from "../services/managedAuditAdapterProductionHardeningReadinessGate.js";
import {
  loadManagedAuditRouteHelperQualityPass,
  renderManagedAuditRouteHelperQualityPassMarkdown,
} from "../services/managedAuditRouteHelperQualityPass.js";
import {
  loadManagedAuditAdapterImplementationPrecheckPacket,
  renderManagedAuditAdapterImplementationPrecheckPacketMarkdown,
} from "../services/managedAuditAdapterImplementationPrecheckPacket.js";
import type { AuditStoreRuntimeDescription } from "../services/auditStoreFactory.js";

interface AuditRouteDeps {
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  config: AppConfig;
}

interface EventsQuery {
  limit?: number;
}

interface AuditStoreProfileQuery {
  format?: "json" | "markdown";
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

function registerAuditJsonMarkdownRoute<TProfile>(
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

export async function registerAuditRoutes(app: FastifyInstance, deps: AuditRouteDeps): Promise<void> {
  app.get<{ Querystring: EventsQuery }>("/api/v1/audit/events", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 200 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => ({
    events: deps.auditLog.list(request.query.limit ?? 50),
  }));

  app.get("/api/v1/audit/summary", async () => deps.auditLog.summary());

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/store-profile", {
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
    const profile = createAuditStoreRuntimeProfile({
      currentEventCount: deps.auditLog.summary().total,
      runtime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAuditStoreRuntimeProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/store-config-profile", {
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
    const profile = createAuditStoreEnvConfigProfile({
      auditStoreKind: deps.config.auditStoreKind,
      auditStorePath: deps.config.auditStorePath,
      auditStoreUrl: deps.config.auditStoreUrl,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAuditStoreEnvConfigProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/file-restart-evidence", {
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
    const report = createFileAuditRestartEvidenceReport({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderFileAuditRestartEvidenceMarkdown(report);
    }

    return report;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/retention-integrity-evidence", {
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
    const report = createAuditRetentionIntegrityEvidence({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAuditRetentionIntegrityEvidenceMarkdown(report);
    }

    return report;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-store-contract", {
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
    const profile = createManagedAuditStoreContractProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditStoreContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-readiness-summary", {
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
    const summary = createManagedAuditReadinessSummary({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditReadinessSummaryMarkdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-adapter-boundary", {
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
    const profile = createManagedAuditAdapterBoundaryProfile({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditAdapterBoundaryMarkdown(profile);
    }

    return profile;
  });

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-persistence-boundary-candidate", () => loadManagedAuditPersistenceBoundaryCandidate({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceBoundaryCandidateMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-persistence-dry-run-verification", () => loadManagedAuditPersistenceDryRunVerification({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceDryRunVerificationMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-identity-approval-binding-contract", () => loadManagedAuditIdentityApprovalBindingContract({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalBindingContractMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet", () => loadManagedAuditIdentityApprovalProvenanceDryRunPacket({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report", () => loadManagedAuditIdentityApprovalProvenancePacketVerificationReport({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-packet-restore-drill-plan", () => loadManagedAuditPacketRestoreDrillPlan({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPacketRestoreDrillPlanMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-restore-drill-archive-verification", () => loadManagedAuditRestoreDrillArchiveVerification({
    config: deps.config,
  }), renderManagedAuditRestoreDrillArchiveVerificationMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-dry-run-adapter-candidate", () => loadManagedAuditDryRunAdapterCandidate({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterCandidateMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification", () => loadManagedAuditDryRunAdapterArchiveVerification({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterArchiveVerificationMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate", () => loadManagedAuditAdapterProductionHardeningReadinessGate({
    config: deps.config,
  }), renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-route-helper-quality-pass", () => loadManagedAuditRouteHelperQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteHelperQualityPassMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet", () => loadManagedAuditAdapterImplementationPrecheckPacket({
    config: deps.config,
  }), renderManagedAuditAdapterImplementationPrecheckPacketMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-adapter-compliance", () => createManagedAuditAdapterComplianceProfile(deps.config), renderManagedAuditAdapterComplianceMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-adapter-runner", () => createManagedAuditAdapterRunnerProfile(deps.config), renderManagedAuditAdapterRunnerMarkdown);
}
