import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import type { AuditLog } from "../services/auditLog.js";
import type { AuditStoreRuntimeDescription } from "../services/auditStoreFactory.js";
import { OpsSnapshotService } from "../services/opsSnapshotService.js";
import {
  createCiEvidenceCommandProfile,
  renderCiEvidenceCommandProfileMarkdown,
} from "../services/ciEvidenceCommandProfile.js";
import {
  createAccessControlReadinessProfile,
  renderAccessControlReadinessProfileMarkdown,
} from "../services/accessControlReadinessProfile.js";
import {
  createAccessGuardReadinessProfile,
  renderAccessGuardReadinessProfileMarkdown,
} from "../services/accessGuard.js";
import {
  createAuthEnforcementRehearsalProfile,
  renderAuthEnforcementRehearsalMarkdown,
} from "../services/authEnforcementRehearsal.js";
import {
  createAccessPolicyProfile,
  renderAccessPolicyProfileMarkdown,
} from "../services/accessPolicyProfile.js";
import {
  createOperatorIdentityContractProfile,
  renderOperatorIdentityContractMarkdown,
} from "../services/operatorIdentityContract.js";
import {
  createSignedAuthTokenContractProfile,
  renderSignedAuthTokenContractMarkdown,
} from "../services/signedAuthTokenContract.js";
import {
  createVerifiedIdentityAuditBindingProfile,
  renderVerifiedIdentityAuditBindingMarkdown,
} from "../services/verifiedIdentityAuditBinding.js";
import {
  createIdpVerifierBoundaryProfile,
  renderIdpVerifierBoundaryMarkdown,
} from "../services/idpVerifierBoundary.js";
import {
  createJwksVerifierFixtureRehearsalProfile,
  renderJwksVerifierFixtureRehearsalMarkdown,
} from "../services/jwksVerifierFixtureRehearsal.js";
import {
  createJwksCacheContractProfile,
  renderJwksCacheContractMarkdown,
} from "../services/jwksCacheContract.js";
import {
  createDeploymentSafetyProfile,
  renderDeploymentSafetyProfileMarkdown,
} from "../services/deploymentSafetyProfile.js";
import {
  createDeploymentEnvironmentReadinessGate,
  renderDeploymentEnvironmentReadinessMarkdown,
} from "../services/deploymentEnvironmentReadiness.js";
import {
  createProductionConnectionConfigContractProfile,
  renderProductionConnectionConfigContractMarkdown,
} from "../services/productionConnectionConfigContract.js";
import {
  loadRollbackEvidenceRunbook,
  renderRollbackEvidenceRunbookMarkdown,
} from "../services/rollbackEvidenceRunbook.js";
import {
  loadProductionReadinessSummaryIndex,
  renderProductionReadinessSummaryIndexMarkdown,
} from "../services/productionReadinessSummaryIndex.js";
import {
  loadProductionReadinessSummaryV2,
  renderProductionReadinessSummaryV2Markdown,
} from "../services/productionReadinessSummaryV2.js";
import {
  loadProductionReadinessSummaryV3,
  renderProductionReadinessSummaryV3Markdown,
} from "../services/productionReadinessSummaryV3.js";
import {
  loadProductionReadinessSummaryV4,
  renderProductionReadinessSummaryV4Markdown,
} from "../services/productionReadinessSummaryV4.js";
import {
  loadProductionReadinessSummaryV5,
  renderProductionReadinessSummaryV5Markdown,
} from "../services/productionReadinessSummaryV5.js";
import {
  loadProductionReadinessSummaryV6,
  renderProductionReadinessSummaryV6Markdown,
} from "../services/productionReadinessSummaryV6.js";
import {
  loadProductionReadinessSummaryV7,
  renderProductionReadinessSummaryV7Markdown,
} from "../services/productionReadinessSummaryV7.js";
import {
  loadProductionReadinessSummaryV8,
  renderProductionReadinessSummaryV8Markdown,
} from "../services/productionReadinessSummaryV8.js";
import {
  loadProductionReadinessSummaryV9,
  renderProductionReadinessSummaryV9Markdown,
} from "../services/productionReadinessSummaryV9.js";
import {
  loadWorkflowEvidenceVerification,
  renderWorkflowEvidenceVerificationMarkdown,
} from "../services/workflowEvidenceVerification.js";
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
import {
  loadUpstreamProductionEvidenceIntake,
  renderUpstreamProductionEvidenceIntakeMarkdown,
} from "../services/upstreamProductionEvidenceIntake.js";

interface StatusRouteDeps {
  config: AppConfig;
  snapshots: OpsSnapshotService;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
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

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/upstreams/production-evidence-intake", {
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
    const intake = await loadUpstreamProductionEvidenceIntake(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderUpstreamProductionEvidenceIntakeMarkdown(intake);
    }

    return intake;
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

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/access-control-readiness", {
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
    const profile = createAccessControlReadinessProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAccessControlReadinessProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/access-policy", {
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
    const profile = createAccessPolicyProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAccessPolicyProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/access-guard-readiness", {
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
    const profile = createAccessGuardReadinessProfile();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAccessGuardReadinessProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/auth-enforcement-rehearsal", {
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
    const profile = createAuthEnforcementRehearsalProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderAuthEnforcementRehearsalMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/operator-identity-contract", {
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
    const profile = createOperatorIdentityContractProfile();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOperatorIdentityContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/signed-auth-token-contract", {
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
    const profile = createSignedAuthTokenContractProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderSignedAuthTokenContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/verified-identity-audit-binding", {
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
    const profile = createVerifiedIdentityAuditBindingProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderVerifiedIdentityAuditBindingMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/idp-verifier-boundary", {
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
    const profile = createIdpVerifierBoundaryProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderIdpVerifierBoundaryMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/jwks-verifier-fixture-rehearsal", {
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
    const profile = createJwksVerifierFixtureRehearsalProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderJwksVerifierFixtureRehearsalMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/jwks-cache-contract", {
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
    const profile = createJwksCacheContractProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderJwksCacheContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/ci/workflow-evidence-verification", {
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
    const verification = await loadWorkflowEvidenceVerification();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderWorkflowEvidenceVerificationMarkdown(verification);
    }

    return verification;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/deployment/safety-profile", {
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
    const profile = createDeploymentSafetyProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderDeploymentSafetyProfileMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/deployment/environment-readiness", {
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
    const gate = createDeploymentEnvironmentReadinessGate(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderDeploymentEnvironmentReadinessMarkdown(gate);
    }

    return gate;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/connection-config-contract", {
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
    const profile = createProductionConnectionConfigContractProfile(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionConnectionConfigContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/deployment/rollback-runbook", {
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
    const runbook = await loadRollbackEvidenceRunbook(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRollbackEvidenceRunbookMarkdown(runbook);
    }

    return runbook;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary", {
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
    const summary = await loadProductionReadinessSummaryIndex(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryIndexMarkdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v2", {
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
    const summary = await loadProductionReadinessSummaryV2(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV2Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v3", {
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
    const summary = await loadProductionReadinessSummaryV3(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV3Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v4", {
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
    const summary = await loadProductionReadinessSummaryV4(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV4Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v5", {
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
    const summary = await loadProductionReadinessSummaryV5({
      config: deps.config,
      auditLog: deps.auditLog,
      auditStoreRuntime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV5Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v6", {
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
    const summary = loadProductionReadinessSummaryV6({
      config: deps.config,
      auditLog: deps.auditLog,
      auditStoreRuntime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV6Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v7", {
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
    const summary = loadProductionReadinessSummaryV7({
      config: deps.config,
      auditLog: deps.auditLog,
      auditStoreRuntime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV7Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v8", {
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
    const summary = await loadProductionReadinessSummaryV8({
      config: deps.config,
      auditLog: deps.auditLog,
      auditStoreRuntime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV8Markdown(summary);
    }

    return summary;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary-v9", {
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
    const summary = await loadProductionReadinessSummaryV9({
      config: deps.config,
      auditLog: deps.auditLog,
      auditStoreRuntime: deps.auditStoreRuntime,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReadinessSummaryV9Markdown(summary);
    }

    return summary;
  });

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
