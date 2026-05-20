import type { FastifyInstance } from "fastify";

import {
  createOpsPromotionArchiveAttestation,
  createOpsPromotionArchiveAttestationVerification,
  createOpsPromotionArchiveBundle,
  createOpsPromotionArchiveManifest,
  createOpsPromotionArchiveVerification,
  createOpsPromotionDeploymentApproval,
  createOpsPromotionDeploymentApprovalVerification,
  createOpsPromotionDeploymentChangeRecord,
  createOpsPromotionDeploymentChangeRecordVerification,
  createOpsPromotionDeploymentExecutionReceipt,
  createOpsPromotionDeploymentExecutionReceiptVerification,
  createOpsPromotionDeploymentExecutionRecord,
  createOpsPromotionDeploymentExecutionRecordVerification,
  createOpsPromotionHandoffCertificate,
  createOpsPromotionHandoffCertificateVerification,
  createOpsPromotionHandoffClosure,
  createOpsPromotionHandoffClosureVerification,
  createOpsPromotionHandoffCompletion,
  createOpsPromotionHandoffCompletionVerification,
  createOpsPromotionHandoffPackage,
  createOpsPromotionHandoffPackageVerification,
  createOpsPromotionHandoffReceipt,
  createOpsPromotionHandoffReceiptVerification,
  createOpsPromotionReleaseArchive,
  createOpsPromotionReleaseArchiveVerification,
  createOpsPromotionReleaseAuditTrailRecord,
  createOpsPromotionReleaseEvidence,
  createOpsPromotionReleaseEvidenceVerification,
  renderOpsPromotionArchiveAttestationMarkdown,
  renderOpsPromotionArchiveAttestationVerificationMarkdown,
  renderOpsPromotionArchiveManifestMarkdown,
  renderOpsPromotionArchiveMarkdown,
  renderOpsPromotionArchiveVerificationMarkdown,
  renderOpsPromotionDeploymentApprovalMarkdown,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  renderOpsPromotionDeploymentChangeRecordMarkdown,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionRecordMarkdown,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  renderOpsPromotionHandoffCertificateMarkdown,
  renderOpsPromotionHandoffCertificateVerificationMarkdown,
  renderOpsPromotionHandoffClosureMarkdown,
  renderOpsPromotionHandoffClosureVerificationMarkdown,
  renderOpsPromotionHandoffCompletionMarkdown,
  renderOpsPromotionHandoffCompletionVerificationMarkdown,
  renderOpsPromotionHandoffPackageMarkdown,
  renderOpsPromotionHandoffPackageVerificationMarkdown,
  renderOpsPromotionHandoffReceiptMarkdown,
  renderOpsPromotionHandoffReceiptVerificationMarkdown,
  renderOpsPromotionReleaseArchiveMarkdown,
  renderOpsPromotionReleaseArchiveVerificationMarkdown,
  renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  renderOpsPromotionReleaseEvidenceMarkdown,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown,
} from "../services/opsPromotionArchiveBundle.js";
import { createOpsPromotionEvidenceReport } from "../services/opsPromotionEvidenceReport.js";
import type { OpsSummaryRouteDeps } from "./opsSummaryRoutes.js";

interface OpsPromotionArchiveQuery {
  format?: "json" | "markdown";
}

const promotionArchiveQueryRouteOptions = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
} as const;

export function registerOpsPromotionArchiveRoutes(app: FastifyInstance, deps: OpsSummaryRouteDeps): void {
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive",
    (artifacts) => artifacts.bundle,
    renderOpsPromotionArchiveMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/manifest",
    (artifacts) => artifacts.manifest,
    renderOpsPromotionArchiveManifestMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/verification",
    (artifacts) => artifacts.archiveVerification,
    renderOpsPromotionArchiveVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/attestation",
    (artifacts) => artifacts.attestation,
    renderOpsPromotionArchiveAttestationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/attestation/verification",
    (artifacts) => artifacts.attestationVerification,
    renderOpsPromotionArchiveAttestationVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-package",
    (artifacts) => artifacts.handoffPackage,
    renderOpsPromotionHandoffPackageMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-package/verification",
    (artifacts) => artifacts.handoffPackageVerification,
    renderOpsPromotionHandoffPackageVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-certificate",
    (artifacts) => artifacts.certificate,
    renderOpsPromotionHandoffCertificateMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-certificate/verification",
    (artifacts) => artifacts.certificateVerification,
    renderOpsPromotionHandoffCertificateVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-receipt",
    (artifacts) => artifacts.receipt,
    renderOpsPromotionHandoffReceiptMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-receipt/verification",
    (artifacts) => artifacts.receiptVerification,
    renderOpsPromotionHandoffReceiptVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-closure",
    (artifacts) => artifacts.closure,
    renderOpsPromotionHandoffClosureMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-closure/verification",
    (artifacts) => artifacts.closureVerification,
    renderOpsPromotionHandoffClosureVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-completion",
    (artifacts) => artifacts.completion,
    renderOpsPromotionHandoffCompletionMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/handoff-completion/verification",
    (artifacts) => artifacts.completionVerification,
    renderOpsPromotionHandoffCompletionVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/release-evidence",
    (artifacts) => artifacts.releaseEvidence,
    renderOpsPromotionReleaseEvidenceMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/release-evidence/verification",
    (artifacts) => artifacts.releaseEvidenceVerification,
    renderOpsPromotionReleaseEvidenceVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/release-archive",
    (artifacts) => artifacts.releaseArchive,
    renderOpsPromotionReleaseArchiveMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/release-archive/verification",
    (artifacts) => artifacts.releaseArchiveVerification,
    renderOpsPromotionReleaseArchiveVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-approval",
    (artifacts) => artifacts.deploymentApproval,
    renderOpsPromotionDeploymentApprovalMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-approval/verification",
    (artifacts) => artifacts.deploymentApprovalVerification,
    renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-change-record",
    (artifacts) => artifacts.deploymentChangeRecord,
    renderOpsPromotionDeploymentChangeRecordMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-change-record/verification",
    (artifacts) => artifacts.deploymentChangeRecordVerification,
    renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-execution-record",
    (artifacts) => artifacts.deploymentExecutionRecord,
    renderOpsPromotionDeploymentExecutionRecordMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
    (artifacts) => artifacts.deploymentExecutionRecordVerification,
    renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-execution-receipt",
    (artifacts) => artifacts.deploymentExecutionReceipt,
    renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
    (artifacts) => artifacts.deploymentExecutionReceiptVerification,
    renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  );
  registerPromotionArchiveRoute(
    app,
    deps,
    "/api/v1/ops/promotion-archive/release-audit-trail-record",
    (artifacts) => artifacts.releaseAuditTrailRecord,
    renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  );
}

function registerPromotionArchiveRoute<T>(
  app: FastifyInstance,
  deps: OpsSummaryRouteDeps,
  path: string,
  select: (artifacts: OpsPromotionArchiveRouteArtifacts) => T,
  renderMarkdown: (artifact: T) => string,
): void {
  app.get<{ Querystring: OpsPromotionArchiveQuery }>(path, promotionArchiveQueryRouteOptions, async (request, reply) => {
    const artifact = select(createPromotionArchiveRouteArtifacts(deps));

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(artifact);
    }

    return artifact;
  });
}

function createPromotionArchiveBundleForRoute(deps: OpsSummaryRouteDeps) {
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

function createPromotionArchiveRouteArtifacts(deps: OpsSummaryRouteDeps) {
  const bundle = createPromotionArchiveBundleForRoute(deps);
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
  const certificateVerification = createOpsPromotionHandoffCertificateVerification({
    handoffPackage,
    handoffPackageVerification,
    certificate,
  });
  const receipt = createOpsPromotionHandoffReceipt({
    certificate,
    certificateVerification,
  });
  const receiptVerification = createOpsPromotionHandoffReceiptVerification({
    certificate,
    certificateVerification,
    receipt,
  });
  const closure = createOpsPromotionHandoffClosure({
    receipt,
    receiptVerification,
  });
  const closureVerification = createOpsPromotionHandoffClosureVerification({
    receipt,
    receiptVerification,
    closure,
  });
  const completion = createOpsPromotionHandoffCompletion({
    closure,
    closureVerification,
  });
  const completionVerification = createOpsPromotionHandoffCompletionVerification({
    closure,
    closureVerification,
    completion,
  });
  const releaseEvidence = createOpsPromotionReleaseEvidence({
    completion,
    completionVerification,
  });
  const releaseEvidenceVerification = createOpsPromotionReleaseEvidenceVerification({
    completion,
    completionVerification,
    evidence: releaseEvidence,
  });
  const releaseArchive = createOpsPromotionReleaseArchive({
    evidence: releaseEvidence,
    evidenceVerification: releaseEvidenceVerification,
  });
  const releaseArchiveVerification = createOpsPromotionReleaseArchiveVerification({
    evidence: releaseEvidence,
    evidenceVerification: releaseEvidenceVerification,
    releaseArchive,
  });
  const deploymentApproval = createOpsPromotionDeploymentApproval({
    releaseArchive,
    releaseArchiveVerification,
  });
  const deploymentApprovalVerification = createOpsPromotionDeploymentApprovalVerification({
    releaseArchive,
    releaseArchiveVerification,
    approval: deploymentApproval,
  });
  const deploymentChangeRecord = createOpsPromotionDeploymentChangeRecord({
    approval: deploymentApproval,
    approvalVerification: deploymentApprovalVerification,
  });
  const deploymentChangeRecordVerification = createOpsPromotionDeploymentChangeRecordVerification({
    approval: deploymentApproval,
    approvalVerification: deploymentApprovalVerification,
    changeRecord: deploymentChangeRecord,
  });
  const deploymentExecutionRecord = createOpsPromotionDeploymentExecutionRecord({
    changeRecord: deploymentChangeRecord,
    changeRecordVerification: deploymentChangeRecordVerification,
  });
  const deploymentExecutionRecordVerification = createOpsPromotionDeploymentExecutionRecordVerification({
    changeRecord: deploymentChangeRecord,
    changeRecordVerification: deploymentChangeRecordVerification,
    executionRecord: deploymentExecutionRecord,
  });
  const deploymentExecutionReceipt = createOpsPromotionDeploymentExecutionReceipt({
    executionRecord: deploymentExecutionRecord,
    executionRecordVerification: deploymentExecutionRecordVerification,
  });
  const deploymentExecutionReceiptVerification = createOpsPromotionDeploymentExecutionReceiptVerification({
    executionRecord: deploymentExecutionRecord,
    executionRecordVerification: deploymentExecutionRecordVerification,
    receipt: deploymentExecutionReceipt,
  });
  const releaseAuditTrailRecord = createOpsPromotionReleaseAuditTrailRecord({
    receipt: deploymentExecutionReceipt,
    receiptVerification: deploymentExecutionReceiptVerification,
  });

  return {
    bundle,
    manifest,
    archiveVerification,
    attestation,
    attestationVerification,
    handoffPackage,
    handoffPackageVerification,
    certificate,
    certificateVerification,
    receipt,
    receiptVerification,
    closure,
    closureVerification,
    completion,
    completionVerification,
    releaseEvidence,
    releaseEvidenceVerification,
    releaseArchive,
    releaseArchiveVerification,
    deploymentApproval,
    deploymentApprovalVerification,
    deploymentChangeRecord,
    deploymentChangeRecordVerification,
    deploymentExecutionRecord,
    deploymentExecutionRecordVerification,
    deploymentExecutionReceipt,
    deploymentExecutionReceiptVerification,
    releaseAuditTrailRecord,
  };
}

type OpsPromotionArchiveRouteArtifacts = ReturnType<typeof createPromotionArchiveRouteArtifacts>;
