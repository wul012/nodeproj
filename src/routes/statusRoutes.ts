import type { FastifyInstance } from "fastify";

import type {
  FixtureReportQuery,
  StatusRouteDeps,
} from "./statusRouteTypes.js";
import {
  fixtureReportQuerySchema,
  registerJsonMarkdownReportRoute,
} from "./statusJsonMarkdownRoute.js";
import { registerStatusUpstreamFixtureRoutes } from "./statusUpstreamFixtureRoutes.js";
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
  loadIdempotencyVerticalReadinessReview,
  renderIdempotencyVerticalReadinessReviewMarkdown,
} from "../services/idempotencyVerticalReadinessReview.js";
import {
  loadControlledIdempotencyDrillRunbook,
  renderControlledIdempotencyDrillRunbookMarkdown,
} from "../services/controlledIdempotencyDrillRunbook.js";
import {
  loadCrossProjectReleaseVerificationIntakeGate,
  renderCrossProjectReleaseVerificationIntakeGateMarkdown,
} from "../services/crossProjectReleaseVerificationIntakeGate.js";
import {
  loadCrossProjectReleaseBundleGate,
  renderCrossProjectReleaseBundleGateMarkdown,
} from "../services/crossProjectReleaseBundleGate.js";
import {
  loadProductionEnvironmentPreflightChecklist,
  renderProductionEnvironmentPreflightChecklistMarkdown,
} from "../services/productionEnvironmentPreflightChecklist.js";
import {
  loadPostV166ReadinessSummary,
  renderPostV166ReadinessSummaryMarkdown,
} from "../services/postV166ReadinessSummary.js";
import {
  loadDeploymentEvidenceIntakeGate,
  renderDeploymentEvidenceIntakeGateMarkdown,
} from "../services/deploymentEvidenceIntakeGate.js";
import {
  loadDeploymentEvidenceVerification,
  renderDeploymentEvidenceVerificationMarkdown,
} from "../services/deploymentEvidenceVerification.js";
import {
  loadReleaseWindowReadinessPacket,
  renderReleaseWindowReadinessPacketMarkdown,
} from "../services/releaseWindowReadinessPacket.js";
import {
  loadProductionReleaseDryRunEnvelope,
  renderProductionReleaseDryRunEnvelopeMarkdown,
} from "../services/productionReleaseDryRunEnvelope.js";
import {
  loadReleaseHandoffReadinessReview,
  renderReleaseHandoffReadinessReviewMarkdown,
} from "../services/releaseHandoffReadinessReview.js";
import {
  loadCrossProjectEvidenceRetentionGate,
  renderCrossProjectEvidenceRetentionGateMarkdown,
} from "../services/crossProjectEvidenceRetentionGate.js";
import {
  loadProductionReleasePreApprovalPacket,
  renderProductionReleasePreApprovalPacketMarkdown,
} from "../services/productionReleasePreApprovalPacket.js";
import {
  loadApprovalDecisionPrerequisiteGate,
  renderApprovalDecisionPrerequisiteGateMarkdown,
} from "../services/approvalDecisionPrerequisiteGate.js";
import {
  loadApprovalLedgerDryRunEnvelope,
  renderApprovalLedgerDryRunEnvelopeMarkdown,
} from "../services/approvalLedgerDryRunEnvelope.js";
import {
  loadReleaseApprovalDecisionRehearsalPacket,
  renderReleaseApprovalDecisionRehearsalPacketMarkdown,
} from "../services/releaseApprovalDecisionRehearsalPacket.js";
import {
  loadRealReadRehearsalIntake,
  renderRealReadRehearsalIntakeMarkdown,
} from "../services/realReadRehearsalIntake.js";
import {
  loadRealReadAdapterRehearsal,
  renderRealReadAdapterRehearsalMarkdown,
} from "../services/realReadAdapterRehearsal.js";
import {
  loadRealReadAdapterOperatorWindowRunbook,
  renderRealReadAdapterOperatorWindowRunbookMarkdown,
} from "../services/realReadAdapterOperatorWindowRunbook.js";
import {
  loadRealReadAdapterFailureTaxonomy,
  renderRealReadAdapterFailureTaxonomyMarkdown,
} from "../services/realReadAdapterFailureTaxonomy.js";
import {
  loadRealReadAdapterEvidenceArchive,
  renderRealReadAdapterEvidenceArchiveMarkdown,
} from "../services/realReadAdapterEvidenceArchive.js";
import {
  loadRealReadAdapterEvidenceArchiveVerification,
  renderRealReadAdapterEvidenceArchiveVerificationMarkdown,
} from "../services/realReadAdapterEvidenceArchiveVerification.js";
import {
  loadRealReadAdapterImportedWindowResultPacket,
  renderRealReadAdapterImportedWindowResultPacketMarkdown,
} from "../services/realReadAdapterImportedWindowResultPacket.js";
import {
  loadRealReadAdapterProductionReadinessCheckpoint,
  renderRealReadAdapterProductionReadinessCheckpointMarkdown,
} from "../services/realReadAdapterProductionReadinessCheckpoint.js";
import {
  loadRealReadWindowOperatorIdentityBinding,
  renderRealReadWindowOperatorIdentityBindingMarkdown,
} from "../services/realReadWindowOperatorIdentityBinding.js";
import {
  loadRealReadWindowAuditStoreHandoffContract,
  renderRealReadWindowAuditStoreHandoffContractMarkdown,
} from "../services/realReadWindowAuditStoreHandoffContract.js";
import {
  loadRealReadWindowCiArchiveArtifactManifest,
  renderRealReadWindowCiArchiveArtifactManifestMarkdown,
} from "../services/realReadWindowCiArchiveArtifactManifest.js";
import {
  loadRealReadWindowCiArtifactManifestVerification,
  renderRealReadWindowCiArtifactManifestVerificationMarkdown,
} from "../services/realReadWindowCiArtifactManifestVerification.js";
import {
  loadRealReadWindowCiArtifactUploadDryRunContract,
  renderRealReadWindowCiArtifactUploadDryRunContractMarkdown,
} from "../services/realReadWindowCiArtifactUploadDryRunContract.js";
import {
  loadCrossProjectCiArtifactRetentionGate,
  renderCrossProjectCiArtifactRetentionGateMarkdown,
} from "../services/crossProjectCiArtifactRetentionGate.js";
import {
  loadThreeProjectRealReadRuntimeSmokePreflight,
  renderThreeProjectRealReadRuntimeSmokePreflightMarkdown,
} from "../services/threeProjectRealReadRuntimeSmokePreflight.js";
import {
  loadThreeProjectRealReadRuntimeSmokeExecutionPacket,
  renderThreeProjectRealReadRuntimeSmokeExecutionPacketMarkdown,
} from "../services/threeProjectRealReadRuntimeSmokeExecutionPacket.js";
import {
  loadThreeProjectRealReadRuntimeSmokeArchiveVerification,
  renderThreeProjectRealReadRuntimeSmokeArchiveVerificationMarkdown,
} from "../services/threeProjectRealReadRuntimeSmokeArchiveVerification.js";
import {
  loadPostRealReadProductionHardeningTriage,
  renderPostRealReadProductionHardeningTriageMarkdown,
} from "../services/postRealReadProductionHardeningTriage.js";
import {
  loadWorkflowEvidenceVerification,
  renderWorkflowEvidenceVerificationMarkdown,
} from "../services/workflowEvidenceVerification.js";
import {
  loadStatusRoutesSplitQualityPass,
  renderStatusRoutesSplitQualityPassMarkdown,
} from "../services/statusRoutesSplitQualityPass.js";
import { createUpstreamOverview } from "../services/upstreamOverview.js";
import {
  registerStatusDeploymentRoutes,
  registerStatusProductionConnectionApprovalRoutes,
} from "./statusDeploymentRoutes.js";
import { registerStatusLiveProbeRoutes } from "./statusLiveProbeRoutes.js";
import { registerStatusReadinessSummaryRoutes } from "./statusReadinessSummaryRoutes.js";
import { registerStatusRollbackRoutes } from "./statusRollbackRoutes.js";
import { registerStatusSecurityRoutes } from "./statusSecurityRoutes.js";

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

  registerStatusUpstreamFixtureRoutes(app, deps);

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/status-routes/split-quality-pass",
    () => Promise.resolve(loadStatusRoutesSplitQualityPass()),
    renderStatusRoutesSplitQualityPassMarkdown,
  );

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

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/ci/evidence-hardening-packet",
    () => Promise.resolve(loadCiEvidenceHardeningPacket(deps.config)),
    renderCiEvidenceHardeningPacketMarkdown,
  );

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/ci/operator-identity-evidence-packet", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadCiOperatorIdentityEvidencePacket(deps.config, request.headers);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderCiOperatorIdentityEvidencePacketMarkdown(profile);
    }

    return profile;
  });

  registerStatusSecurityRoutes(app, deps);
  registerStatusDeploymentRoutes(app, deps);
  registerStatusReadinessSummaryRoutes(app, deps);
  registerStatusRollbackRoutes(app, deps);
  registerStatusLiveProbeRoutes(app, deps);

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

  registerStatusProductionConnectionApprovalRoutes(app, deps);

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-rehearsal",
    () => loadRealReadAdapterRehearsal({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    }),
    renderRealReadAdapterRehearsalMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-operator-window-runbook",
    () => Promise.resolve(loadRealReadAdapterOperatorWindowRunbook(deps.config)),
    renderRealReadAdapterOperatorWindowRunbookMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-failure-taxonomy",
    () => loadRealReadAdapterFailureTaxonomy({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    }),
    renderRealReadAdapterFailureTaxonomyMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-evidence-archive",
    () => loadRealReadAdapterEvidenceArchive({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    }),
    renderRealReadAdapterEvidenceArchiveMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-evidence-archive-verification",
    () => loadRealReadAdapterEvidenceArchiveVerification({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    }),
    renderRealReadAdapterEvidenceArchiveVerificationMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-imported-window-result-packet",
    () => loadRealReadAdapterImportedWindowResultPacket({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    }),
    renderRealReadAdapterImportedWindowResultPacketMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
    () => loadRealReadAdapterProductionReadinessCheckpoint({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
    }),
    renderRealReadAdapterProductionReadinessCheckpointMarkdown,
  );

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-window-operator-identity-binding", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadRealReadWindowOperatorIdentityBinding({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRealReadWindowOperatorIdentityBindingMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-window-audit-store-handoff-contract", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadRealReadWindowAuditStoreHandoffContract({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRealReadWindowAuditStoreHandoffContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-window-ci-archive-artifact-manifest", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadRealReadWindowCiArchiveArtifactManifest({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRealReadWindowCiArchiveArtifactManifestMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-window-ci-artifact-manifest-verification", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadRealReadWindowCiArtifactManifestVerification({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRealReadWindowCiArtifactManifestVerificationMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-window-ci-artifact-upload-dry-run-contract", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadRealReadWindowCiArtifactUploadDryRunContract({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRealReadWindowCiArtifactUploadDryRunContractMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/cross-project-ci-artifact-retention-gate", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadCrossProjectCiArtifactRetentionGate({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderCrossProjectCiArtifactRetentionGateMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/three-project-real-read-runtime-smoke-preflight", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadThreeProjectRealReadRuntimeSmokePreflight({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderThreeProjectRealReadRuntimeSmokePreflightMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/three-project-real-read-runtime-smoke-execution-packet", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeExecutionPacket({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderThreeProjectRealReadRuntimeSmokeExecutionPacketMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/three-project-real-read-runtime-smoke-archive-verification", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeArchiveVerification({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderThreeProjectRealReadRuntimeSmokeArchiveVerificationMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/post-real-read-production-hardening-triage", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadPostRealReadProductionHardeningTriage({
      config: deps.config,
      orderPlatform: deps.orderPlatform,
      miniKv: deps.miniKv,
      headers: request.headers,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderPostRealReadProductionHardeningTriageMarkdown(profile);
    }

    return profile;
  });

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/idempotency-vertical-readiness-review",
    () => Promise.resolve(loadIdempotencyVerticalReadinessReview(deps.config)),
    renderIdempotencyVerticalReadinessReviewMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/controlled-idempotency-drill-runbook",
    () => Promise.resolve(loadControlledIdempotencyDrillRunbook(deps.config)),
    renderControlledIdempotencyDrillRunbookMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/cross-project-release-verification-intake-gate",
    () => Promise.resolve(loadCrossProjectReleaseVerificationIntakeGate(deps.config)),
    renderCrossProjectReleaseVerificationIntakeGateMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/cross-project-release-bundle-gate",
    () => Promise.resolve(loadCrossProjectReleaseBundleGate(deps.config)),
    renderCrossProjectReleaseBundleGateMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/environment-preflight-checklist",
    () => Promise.resolve(loadProductionEnvironmentPreflightChecklist(deps.config)),
    renderProductionEnvironmentPreflightChecklistMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/post-v166-readiness-summary",
    () => Promise.resolve(loadPostV166ReadinessSummary(deps.config)),
    renderPostV166ReadinessSummaryMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/deployment-evidence-intake-gate",
    () => Promise.resolve(loadDeploymentEvidenceIntakeGate(deps.config)),
    renderDeploymentEvidenceIntakeGateMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/deployment-evidence-verification",
    () => Promise.resolve(loadDeploymentEvidenceVerification(deps.config)),
    renderDeploymentEvidenceVerificationMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/release-window-readiness-packet",
    () => Promise.resolve(loadReleaseWindowReadinessPacket(deps.config)),
    renderReleaseWindowReadinessPacketMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/release-dry-run-envelope",
    () => Promise.resolve(loadProductionReleaseDryRunEnvelope(deps.config)),
    renderProductionReleaseDryRunEnvelopeMarkdown,
  );

  registerJsonMarkdownReportRoute(
    app,
    "/api/v1/production/release-handoff-readiness-review",
    () => Promise.resolve(loadReleaseHandoffReadinessReview(deps.config)),
    renderReleaseHandoffReadinessReviewMarkdown,
  );

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/cross-project-evidence-retention-gate", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadCrossProjectEvidenceRetentionGate(deps.config, request.headers);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderCrossProjectEvidenceRetentionGateMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/release-pre-approval-packet", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadProductionReleasePreApprovalPacket(deps.config, request.headers);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderProductionReleasePreApprovalPacketMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/approval-decision-prerequisite-gate", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadApprovalDecisionPrerequisiteGate(deps.config, request.headers);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderApprovalDecisionPrerequisiteGateMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/approval-ledger-dry-run-envelope", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadApprovalLedgerDryRunEnvelope(deps.config, request.headers);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderApprovalLedgerDryRunEnvelopeMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/release-approval-decision-rehearsal-packet", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadReleaseApprovalDecisionRehearsalPacket(deps.config, request.headers);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderReleaseApprovalDecisionRehearsalPacketMarkdown(profile);
    }

    return profile;
  });

  app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/real-read-rehearsal-intake", {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = loadRealReadRehearsalIntake(deps.config);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderRealReadRehearsalIntakeMarkdown(profile);
    }

    return profile;
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
