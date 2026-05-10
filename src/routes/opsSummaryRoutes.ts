import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { AuditLog } from "../services/auditLog.js";
import { OperationDispatchLedger } from "../services/operationDispatch.js";
import { OperationIntentStore } from "../services/operationIntent.js";
import { createOpsBaselineStatus, OpsBaselineStore } from "../services/opsBaseline.js";
import { OpsCheckpointLedger } from "../services/opsCheckpoint.js";
import { createOpsCheckpointDiff } from "../services/opsCheckpointDiff.js";
import { createOpsHandoffReport, renderOpsHandoffMarkdown } from "../services/opsHandoffReport.js";
import {
  createOpsPromotionArchiveAttestation,
  createOpsPromotionArchiveAttestationVerification,
  createOpsPromotionArchiveBundle,
  createOpsPromotionArchiveManifest,
  createOpsPromotionArchiveVerification,
  createOpsPromotionHandoffCertificate,
  createOpsPromotionHandoffPackage,
  createOpsPromotionHandoffPackageVerification,
  renderOpsPromotionArchiveAttestationMarkdown,
  renderOpsPromotionArchiveAttestationVerificationMarkdown,
  renderOpsPromotionArchiveManifestMarkdown,
  renderOpsPromotionArchiveMarkdown,
  renderOpsPromotionArchiveVerificationMarkdown,
  renderOpsPromotionHandoffCertificateMarkdown,
  renderOpsPromotionHandoffPackageMarkdown,
  renderOpsPromotionHandoffPackageVerificationMarkdown,
} from "../services/opsPromotionArchiveBundle.js";
import { OpsPromotionDecisionLedger, renderOpsPromotionDecisionLedgerIntegrityMarkdown } from "../services/opsPromotionDecision.js";
import { createOpsPromotionEvidenceReport, renderOpsPromotionEvidenceMarkdown } from "../services/opsPromotionEvidenceReport.js";
import { createOpsPromotionReview } from "../services/opsPromotionReview.js";
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
  opsPromotionDecisions: OpsPromotionDecisionLedger;
  snapshots: OpsSnapshotService;
}

interface OpsHandoffReportQuery {
  format?: "json" | "markdown";
  limit?: number;
}

interface OpsRunbookQuery {
  format?: "json" | "markdown";
}

interface OpsPromotionArchiveQuery {
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

interface CreatePromotionDecisionBody {
  reviewer?: string;
  note?: string;
}

interface ListPromotionDecisionQuery {
  limit?: number;
}

interface PromotionDecisionIntegrityQuery {
  format?: "json" | "markdown";
}

interface PromotionDecisionEvidenceQuery {
  format?: "json" | "markdown";
}

interface PromotionDecisionParams {
  decisionId: string;
}

interface OpsCheckpointParams {
  checkpointId: string;
}

export async function registerOpsSummaryRoutes(app: FastifyInstance, deps: OpsSummaryRouteDeps): Promise<void> {
  app.get("/api/v1/ops/summary", async () => createOpsSummary(deps));
  app.get("/api/v1/ops/readiness", async () => createOpsReadiness(createOpsSummary(deps)));
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive", {
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
    const bundle = createPromotionArchiveBundle(deps);

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionArchiveMarkdown(bundle);
    }

    return bundle;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/manifest", {
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
    const manifest = createOpsPromotionArchiveManifest(createPromotionArchiveBundle(deps));

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionArchiveManifestMarkdown(manifest);
    }

    return manifest;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/verification", {
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
    const bundle = createPromotionArchiveBundle(deps);
    const verification = createOpsPromotionArchiveVerification({
      bundle,
      manifest: createOpsPromotionArchiveManifest(bundle),
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionArchiveVerificationMarkdown(verification);
    }

    return verification;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/attestation", {
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
    const bundle = createPromotionArchiveBundle(deps);
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const verification = createOpsPromotionArchiveVerification({ bundle, manifest });
    const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionArchiveAttestationMarkdown(attestation);
    }

    return attestation;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/attestation/verification", {
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
    const bundle = createPromotionArchiveBundle(deps);
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
    const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification: archiveVerification });
    const attestationVerification = createOpsPromotionArchiveAttestationVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionArchiveAttestationVerificationMarkdown(attestationVerification);
    }

    return attestationVerification;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-package", {
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
    const bundle = createPromotionArchiveBundle(deps);
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
    const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification: archiveVerification });
    const attestationVerification = createOpsPromotionArchiveAttestationVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
    });
    const handoffPackage = createOpsPromotionHandoffPackage({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffPackageMarkdown(handoffPackage);
    }

    return handoffPackage;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-package/verification", {
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
    const bundle = createPromotionArchiveBundle(deps);
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
    const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification: archiveVerification });
    const attestationVerification = createOpsPromotionArchiveAttestationVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
    });
    const handoffPackage = createOpsPromotionHandoffPackage({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
    });
    const handoffPackageVerification = createOpsPromotionHandoffPackageVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
      handoffPackage,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffPackageVerificationMarkdown(handoffPackageVerification);
    }

    return handoffPackageVerification;
  });
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-certificate", {
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
    const bundle = createPromotionArchiveBundle(deps);
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
    const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification: archiveVerification });
    const attestationVerification = createOpsPromotionArchiveAttestationVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
    });
    const handoffPackage = createOpsPromotionHandoffPackage({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
    });
    const handoffPackageVerification = createOpsPromotionHandoffPackageVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
      handoffPackage,
    });
    const certificate = createOpsPromotionHandoffCertificate({
      handoffPackage,
      handoffPackageVerification,
    });

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffCertificateMarkdown(certificate);
    }

    return certificate;
  });
  app.get("/api/v1/ops/promotion-review", async () => {
    return createPromotionReview(deps);
  });
  app.get<{ Querystring: ListPromotionDecisionQuery }>("/api/v1/ops/promotion-decisions", {
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
    decisions: deps.opsPromotionDecisions.list(request.query.limit ?? 20),
  }));
  app.get<{ Querystring: PromotionDecisionIntegrityQuery }>("/api/v1/ops/promotion-decisions/integrity", {
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
    const integrity = deps.opsPromotionDecisions.integrity();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionDecisionLedgerIntegrityMarkdown(integrity);
    }

    return integrity;
  });
  app.get<{ Params: PromotionDecisionParams }>("/api/v1/ops/promotion-decisions/:decisionId/verification", async (request) =>
    deps.opsPromotionDecisions.verify(request.params.decisionId));
  app.get<{ Params: PromotionDecisionParams; Querystring: PromotionDecisionEvidenceQuery }>(
    "/api/v1/ops/promotion-decisions/:decisionId/evidence",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            format: { type: "string", enum: ["json", "markdown"] },
          },
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const report = createOpsPromotionEvidenceReport({
        decision: deps.opsPromotionDecisions.get(request.params.decisionId),
        verification: deps.opsPromotionDecisions.verify(request.params.decisionId),
      });

      if (request.query.format === "markdown") {
        reply.type("text/markdown; charset=utf-8");
        return renderOpsPromotionEvidenceMarkdown(report);
      }

      return report;
    },
  );
  app.get<{ Params: PromotionDecisionParams }>("/api/v1/ops/promotion-decisions/:decisionId", async (request) =>
    deps.opsPromotionDecisions.get(request.params.decisionId));
  app.post<{ Body: CreatePromotionDecisionBody }>("/api/v1/ops/promotion-decisions", {
    schema: {
      body: {
        type: "object",
        properties: {
          reviewer: { type: "string", minLength: 1, maxLength: 80 },
          note: { type: "string", minLength: 1, maxLength: 400 },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const decision = deps.opsPromotionDecisions.create({
      reviewer: request.body?.reviewer,
      note: request.body?.note,
      review: createPromotionReview(deps),
    });

    reply.code(201);
    return decision;
  });
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
    return createBaselineStatus(deps);
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

function createBaselineStatus(deps: OpsSummaryRouteDeps) {
  const baseline = deps.opsBaseline.get();
  const latest = deps.opsCheckpoints.list(1)[0];
  return createOpsBaselineStatus({
    baseline,
    baselineCheckpoint: baseline === undefined ? undefined : deps.opsCheckpoints.get(baseline.checkpointId),
    latest,
  });
}

function createPromotionReview(deps: OpsSummaryRouteDeps) {
  const summary = createOpsSummary(deps);
  const readiness = createOpsReadiness(summary);
  return createOpsPromotionReview({
    summary,
    readiness,
    runbook: createOpsRunbook(summary, readiness),
    baseline: createBaselineStatus(deps),
  });
}

function createPromotionArchiveBundle(deps: OpsSummaryRouteDeps) {
  const integrity = deps.opsPromotionDecisions.integrity();
  const latestDecision = deps.opsPromotionDecisions.list(1)[0];
  const latestEvidence = latestDecision === undefined
    ? undefined
    : createOpsPromotionEvidenceReport({
      decision: deps.opsPromotionDecisions.get(latestDecision.id),
      verification: deps.opsPromotionDecisions.verify(latestDecision.id),
    });

  return createOpsPromotionArchiveBundle({
    integrity,
    latestEvidence,
  });
}
