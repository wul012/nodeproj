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
} from "../../services/opsPromotionArchiveBundle.js";
import { createOpsPromotionEvidenceReport } from "../../services/opsPromotionEvidenceReport.js";
import type { OpsSummaryRouteDeps } from "../opsSummaryRoutes.js";

export function createPromotionArchiveArtifacts(deps: OpsSummaryRouteDeps) {
  const core = createArchiveCore(deps);
  const handoff = createHandoffArtifacts(core);
  const release = createReleaseArtifacts(handoff);
  const deployment = createDeploymentArtifacts(release);

  return { ...core, ...handoff, ...release, ...deployment };
}

export type PromotionArchiveArtifacts = ReturnType<typeof createPromotionArchiveArtifacts>;

export const PROMOTION_ARCHIVE_ARTIFACT_KEYS = Object.freeze([
  "bundle",
  "manifest",
  "archiveVerification",
  "attestation",
  "attestationVerification",
  "handoffPackage",
  "handoffPackageVerification",
  "certificate",
  "certificateVerification",
  "receipt",
  "receiptVerification",
  "closure",
  "closureVerification",
  "completion",
  "completionVerification",
  "releaseEvidence",
  "releaseEvidenceVerification",
  "releaseArchive",
  "releaseArchiveVerification",
  "deploymentApproval",
  "deploymentApprovalVerification",
  "deploymentChangeRecord",
  "deploymentChangeRecordVerification",
  "deploymentExecutionRecord",
  "deploymentExecutionRecordVerification",
  "deploymentExecutionReceipt",
  "deploymentExecutionReceiptVerification",
  "releaseAuditTrailRecord",
] as const satisfies readonly (keyof PromotionArchiveArtifacts)[]);

type DeclaredArtifactKey = (typeof PROMOTION_ARCHIVE_ARTIFACT_KEYS)[number];
type MissingArtifactKey = Exclude<keyof PromotionArchiveArtifacts, DeclaredArtifactKey>;

export const PROMOTION_ARCHIVE_ARTIFACT_COUNT:
  [MissingArtifactKey] extends [never] ? 28 : never = PROMOTION_ARCHIVE_ARTIFACT_KEYS.length;

function createArchiveCore(deps: OpsSummaryRouteDeps) {
  const bundle = createArchiveBundle(deps);
  const manifest = createOpsPromotionArchiveManifest(bundle);
  const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
  const attestation = createOpsPromotionArchiveAttestation({
    bundle,
    manifest,
    verification: archiveVerification,
  });
  const attestationVerification = createOpsPromotionArchiveAttestationVerification({
    bundle,
    manifest,
    verification: archiveVerification,
    attestation,
  });

  return { bundle, manifest, archiveVerification, attestation, attestationVerification };
}

type ArchiveCore = ReturnType<typeof createArchiveCore>;

function createHandoffArtifacts(core: ArchiveCore) {
  const {
    bundle,
    manifest,
    archiveVerification,
    attestation,
    attestationVerification,
  } = core;
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
  const receipt = createOpsPromotionHandoffReceipt({ certificate, certificateVerification });
  const receiptVerification = createOpsPromotionHandoffReceiptVerification({
    certificate,
    certificateVerification,
    receipt,
  });
  const closure = createOpsPromotionHandoffClosure({ receipt, receiptVerification });
  const closureVerification = createOpsPromotionHandoffClosureVerification({
    receipt,
    receiptVerification,
    closure,
  });
  const completion = createOpsPromotionHandoffCompletion({ closure, closureVerification });
  const completionVerification = createOpsPromotionHandoffCompletionVerification({
    closure,
    closureVerification,
    completion,
  });

  return {
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
  };
}

type HandoffArtifacts = ReturnType<typeof createHandoffArtifacts>;

function createReleaseArtifacts(handoff: HandoffArtifacts) {
  const releaseEvidence = createOpsPromotionReleaseEvidence({
    completion: handoff.completion,
    completionVerification: handoff.completionVerification,
  });
  const releaseEvidenceVerification = createOpsPromotionReleaseEvidenceVerification({
    completion: handoff.completion,
    completionVerification: handoff.completionVerification,
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

  return {
    releaseEvidence,
    releaseEvidenceVerification,
    releaseArchive,
    releaseArchiveVerification,
  };
}

type ReleaseArtifacts = ReturnType<typeof createReleaseArtifacts>;

function createDeploymentArtifacts(release: ReleaseArtifacts) {
  const deploymentApproval = createOpsPromotionDeploymentApproval({
    releaseArchive: release.releaseArchive,
    releaseArchiveVerification: release.releaseArchiveVerification,
  });
  const deploymentApprovalVerification = createOpsPromotionDeploymentApprovalVerification({
    releaseArchive: release.releaseArchive,
    releaseArchiveVerification: release.releaseArchiveVerification,
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

function createArchiveBundle(deps: OpsSummaryRouteDeps) {
  const integrity = deps.opsPromotionDecisions.integrity();
  const latestDecision = deps.opsPromotionDecisions.list(1)[0];
  const latestEvidence = latestDecision === undefined
    ? undefined
    : createOpsPromotionEvidenceReport({
      decision: deps.opsPromotionDecisions.get(latestDecision.id),
      verification: deps.opsPromotionDecisions.verify(latestDecision.id),
    });

  return createOpsPromotionArchiveBundle({ integrity, latestEvidence });
}
