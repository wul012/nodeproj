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

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-persistence-boundary-candidate", {
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
    const profile = await loadManagedAuditPersistenceBoundaryCandidate({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditPersistenceBoundaryCandidateMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-persistence-dry-run-verification", {
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
    const profile = await loadManagedAuditPersistenceDryRunVerification({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditPersistenceDryRunVerificationMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-identity-approval-binding-contract", {
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
    const profile = await loadManagedAuditIdentityApprovalBindingContract({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditIdentityApprovalBindingContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-identity-approval-provenance-dry-run-packet", {
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
    const profile = await loadManagedAuditIdentityApprovalProvenanceDryRunPacket({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-adapter-compliance", {
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
    const profile = await createManagedAuditAdapterComplianceProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditAdapterComplianceMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: AuditStoreProfileQuery }>("/api/v1/audit/managed-adapter-runner", {
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
    const profile = await createManagedAuditAdapterRunnerProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderManagedAuditAdapterRunnerMarkdown(profile);
    }

    return profile;
  });
}
