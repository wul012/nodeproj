import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerification,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptMilestone,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseAuditTrailRecordItem,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidenceVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import { archiveAttestationVerificationDigestPayload, archiveBundleDigestPayload } from "./opsPromotionArchiveDigestPayloads.js";
import { archiveHandoffCompletionReferenceChecksValid } from "./opsPromotionArchiveValidation.js";
import { digestStable } from "./stableDigest.js";

export function archiveHandoffPackageAttachments(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackageAttachment[] {
  return [
    {
      name: "archive-bundle",
      valid: input.bundle.summary.integrityValid,
      source: "/api/v1/ops/promotion-archive",
      digest: {
        algorithm: "sha256",
        value: digestStable(archiveBundleDigestPayload(input.bundle)),
      },
    },
    {
      name: "archive-manifest",
      valid: input.verification.checks.manifestDigestValid,
      source: "/api/v1/ops/promotion-archive/manifest",
      digest: { ...input.manifest.manifestDigest },
    },
    {
      name: "archive-verification",
      valid: input.verification.valid,
      source: "/api/v1/ops/promotion-archive/verification",
      digest: {
        algorithm: "sha256",
        value: input.attestation.verificationDigest.value,
      },
    },
    {
      name: "archive-attestation",
      valid: input.attestationVerification.checks.sealDigestValid,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: input.attestation.sealDigest.value,
      },
    },
    {
      name: "attestation-verification",
      valid: input.attestationVerification.valid,
      source: "/api/v1/ops/promotion-archive/attestation/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable(archiveAttestationVerificationDigestPayload(input.attestationVerification)),
      },
    },
  ];
}



export function archiveHandoffReceiptMilestones(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
): OpsPromotionHandoffReceiptMilestone[] {
  return [
    {
      name: "handoff-package",
      valid: certificate.valid && certificateVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: certificate.packageDigest.value,
      },
    },
    {
      name: "verified-handoff-package",
      valid: certificate.verification.packageVerified && certificateVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: certificate.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: certificateVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: certificate.sealDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: certificate.valid && certificateVerification.checks.certificateDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: certificate.certificateDigest.value,
      },
    },
    {
      name: "certificate-verification",
      valid: certificateVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: certificateVerification.recomputedCertificateDigest.value,
      },
    },
  ];
}



export function archiveHandoffClosureItems(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
): OpsPromotionHandoffClosureItem[] {
  return [
    {
      name: "handoff-receipt",
      valid: receipt.valid && receiptVerification.checks.receiptDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt",
      digest: {
        algorithm: "sha256",
        value: receipt.receiptDigest.value,
      },
    },
    {
      name: "verified-handoff-receipt",
      valid: receiptVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: receiptVerification.recomputedReceiptDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: receiptVerification.checks.certificateDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: receipt.certificateDigest.value,
      },
    },
    {
      name: "verified-handoff-certificate",
      valid: receiptVerification.checks.verifiedCertificateDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedCertificateDigest.value,
      },
    },
    {
      name: "handoff-package",
      valid: receiptVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: receipt.packageDigest.value,
      },
    },
    {
      name: "verified-handoff-package",
      valid: receiptVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: receiptVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: receipt.sealDigest.value,
      },
    },
  ];
}



export function archiveHandoffCompletionSteps(
  closure: OpsPromotionHandoffClosure,
  closureVerification: OpsPromotionHandoffClosureVerification,
): OpsPromotionHandoffCompletionStep[] {
  const referenceChecksValid = archiveHandoffCompletionReferenceChecksValid(closureVerification);

  return [
    {
      name: "closure-created",
      valid: closure.valid && closure.closureDigest.value === closureVerification.closureDigest.value,
      ready: closure.valid,
      source: "/api/v1/ops/promotion-archive/handoff-closure",
      digest: {
        algorithm: "sha256",
        value: closure.closureDigest.value,
      },
      detail: "Handoff closure exists and exposes the same closure digest used by verification.",
    },
    {
      name: "closure-verified",
      valid: closureVerification.valid && closureVerification.checks.closureDigestValid,
      ready: closureVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: closureVerification.recomputedClosureDigest.value,
      },
      detail: "Closure digest, covered fields, and closeout metadata match the recomputed closure.",
    },
    {
      name: "closure-items-verified",
      valid: closureVerification.checks.closureItemsValid,
      ready: closureVerification.checks.closureItemsValid,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable(closureVerification.closureItems.map((item) => ({
          name: item.name,
          valid: item.valid,
          digestMatches: item.digestMatches,
          source: item.source,
          digest: item.recomputedDigest.value,
        }))),
      },
      detail: "All handoff receipt, certificate, package, and seal closeout references are valid.",
    },
    {
      name: "receipt-chain-verified",
      valid: referenceChecksValid,
      ready: referenceChecksValid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          receiptDigest: closure.verifiedReceiptDigest.value,
          certificateDigest: closure.verifiedCertificateDigest.value,
          packageDigest: closure.verifiedPackageDigest.value,
          sealDigest: closure.sealDigest.value,
        }),
      },
      detail: "Receipt, certificate, package, and archive seal references all match the verified chain.",
    },
    {
      name: "handoff-readiness-recorded",
      valid: closure.handoffReady === closureVerification.handoffReady
        && closure.state === closureVerification.state,
      ready: closure.handoffReady && closureVerification.handoffReady,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: closure.state,
          handoffReady: closure.handoffReady,
          verifiedHandoffReady: closureVerification.handoffReady,
          latestDecisionId: closure.decision.latestDecisionId ?? null,
        }),
      },
      detail: "Completion records whether the verified handoff chain is ready for final archive closeout.",
    },
  ];
}



export function archiveReleaseEvidenceItems(
  completion: OpsPromotionHandoffCompletion,
  completionVerification: OpsPromotionHandoffCompletionVerification,
): OpsPromotionReleaseEvidenceItem[] {
  return [
    {
      name: "handoff-completion",
      valid: completion.valid && completionVerification.checks.completionDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-completion",
      digest: {
        algorithm: "sha256",
        value: completion.completionDigest.value,
      },
      detail: "Final handoff completion record is present and its digest is covered by verification.",
    },
    {
      name: "verified-handoff-completion",
      valid: completionVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      digest: {
        algorithm: "sha256",
        value: completionVerification.recomputedCompletionDigest.value,
      },
      detail: "Completion record has been recomputed from the verified closure chain.",
    },
    {
      name: "handoff-closure",
      valid: completionVerification.checks.closureDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-closure",
      digest: {
        algorithm: "sha256",
        value: completion.closureDigest.value,
      },
      detail: "Completion still references the same handoff closure digest.",
    },
    {
      name: "verified-handoff-closure",
      valid: completionVerification.checks.verifiedClosureDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: completion.verifiedClosureDigest.value,
      },
      detail: "Completion still references the verified closure digest.",
    },
    {
      name: "final-closeout-state",
      valid: completionVerification.valid
        && completionVerification.checks.handoffReadyMatches
        && completion.verification.closeoutReady === completionVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: completion.state,
          handoffReady: completion.handoffReady,
          closeoutReady: completion.verification.closeoutReady,
          verifiedCloseoutReady: completionVerification.summary.closeoutReady,
          latestDecisionId: completion.decision.latestDecisionId ?? null,
        }),
      },
      detail: "Release evidence records the final handoff readiness and closeout state.",
    },
  ];
}



export function archiveReleaseArchiveItems(
  evidence: OpsPromotionReleaseEvidence,
  evidenceVerification: OpsPromotionReleaseEvidenceVerification,
): OpsPromotionReleaseArchiveItem[] {
  return [
    {
      name: "release-evidence",
      valid: evidence.valid && evidenceVerification.checks.evidenceDigestValid,
      source: "/api/v1/ops/promotion-archive/release-evidence",
      digest: {
        algorithm: "sha256",
        value: evidence.evidenceDigest.value,
      },
      detail: "Release evidence is present and its digest is covered by verification.",
    },
    {
      name: "verified-release-evidence",
      valid: evidenceVerification.valid,
      source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      digest: {
        algorithm: "sha256",
        value: evidenceVerification.recomputedEvidenceDigest.value,
      },
      detail: "Release evidence has been recomputed from the verified completion chain.",
    },
    {
      name: "handoff-completion",
      valid: evidence.verification.completionVerified
        && evidence.verification.completionDigestValid
        && evidenceVerification.checks.completionDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-completion",
      digest: {
        algorithm: "sha256",
        value: evidence.completionDigest.value,
      },
      detail: "Final release archive still references the same handoff completion digest.",
    },
    {
      name: "final-archive-state",
      valid: evidenceVerification.valid
        && evidenceVerification.checks.stateMatches
        && evidenceVerification.checks.handoffReadyMatches
        && evidence.verification.closeoutReady === evidenceVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: evidence.state,
          handoffReady: evidence.handoffReady,
          closeoutReady: evidence.verification.closeoutReady,
          verifiedCloseoutReady: evidenceVerification.summary.closeoutReady,
          latestDecisionId: evidence.decision.latestDecisionId ?? null,
          nextActions: evidence.nextActions,
        }),
      },
      detail: "Final archive records the verified release state, closeout status, and remaining next actions.",
    },
  ];
}



export function archiveDeploymentApprovalItems(
  releaseArchive: OpsPromotionReleaseArchive,
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification,
): OpsPromotionDeploymentApprovalItem[] {
  return [
    {
      name: "release-archive",
      valid: releaseArchive.valid && releaseArchiveVerification.checks.releaseArchiveDigestValid,
      source: "/api/v1/ops/promotion-archive/release-archive",
      digest: {
        algorithm: "sha256",
        value: releaseArchive.releaseArchiveDigest.value,
      },
      detail: "Final release archive is present and its digest is covered by verification.",
    },
    {
      name: "verified-release-archive",
      valid: releaseArchiveVerification.valid,
      source: "/api/v1/ops/promotion-archive/release-archive/verification",
      digest: {
        algorithm: "sha256",
        value: releaseArchiveVerification.recomputedReleaseArchiveDigest.value,
      },
      detail: "Final release archive has been recomputed from the verified release evidence chain.",
    },
    {
      name: "verified-release-evidence",
      valid: releaseArchiveVerification.checks.evidenceDigestMatches
        && releaseArchiveVerification.checks.verifiedEvidenceDigestMatches,
      source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      digest: {
        algorithm: "sha256",
        value: releaseArchive.verifiedEvidenceDigest.value,
      },
      detail: "Deployment approval still references the verified release evidence digest.",
    },
    {
      name: "deployment-approval-state",
      valid: releaseArchiveVerification.valid
        && releaseArchiveVerification.checks.stateMatches
        && releaseArchiveVerification.checks.handoffReadyMatches
        && releaseArchive.verification.closeoutReady === releaseArchiveVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/release-archive/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: releaseArchive.state,
          handoffReady: releaseArchive.handoffReady,
          closeoutReady: releaseArchive.verification.closeoutReady,
          verifiedCloseoutReady: releaseArchiveVerification.summary.closeoutReady,
          latestDecisionId: releaseArchive.decision.latestDecisionId ?? null,
          nextActions: releaseArchive.nextActions,
        }),
      },
      detail: "Deployment approval records the verified final archive state and remaining release actions.",
    },
  ];
}



export function archiveDeploymentChangeRecordItems(
  approval: OpsPromotionDeploymentApproval,
  approvalVerification: OpsPromotionDeploymentApprovalVerification,
): OpsPromotionDeploymentChangeRecordItem[] {
  return [
    {
      name: "deployment-approval",
      valid: approval.valid && approvalVerification.checks.approvalDigestValid,
      source: "/api/v1/ops/promotion-archive/deployment-approval",
      digest: {
        algorithm: "sha256",
        value: approval.approvalDigest.value,
      },
      detail: "Deployment approval exists and its digest is covered by verification.",
    },
    {
      name: "verified-deployment-approval",
      valid: approvalVerification.valid,
      source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      digest: {
        algorithm: "sha256",
        value: approvalVerification.recomputedApprovalDigest.value,
      },
      detail: "Deployment approval has been recomputed from the verified release archive chain.",
    },
    {
      name: "verified-release-archive",
      valid: approvalVerification.checks.releaseArchiveDigestMatches
        && approvalVerification.checks.verifiedReleaseArchiveDigestMatches,
      source: "/api/v1/ops/promotion-archive/release-archive/verification",
      digest: {
        algorithm: "sha256",
        value: approval.verifiedReleaseArchiveDigest.value,
      },
      detail: "Deployment change record still references the verified release archive digest.",
    },
    {
      name: "deployment-change-state",
      valid: approvalVerification.valid
        && approvalVerification.checks.approvalReadyMatches
        && approval.verification.closeoutReady === approvalVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: approval.state,
          handoffReady: approval.handoffReady,
          approvalReady: approval.approvalReady,
          closeoutReady: approval.verification.closeoutReady,
          verifiedCloseoutReady: approvalVerification.summary.closeoutReady,
          latestDecisionId: approval.decision.latestDecisionId ?? null,
          nextActions: approval.nextActions,
        }),
      },
      detail: "Deployment change record stores the verified approval readiness and remaining actions.",
    },
  ];
}



export function archiveDeploymentExecutionRecordItems(
  changeRecord: OpsPromotionDeploymentChangeRecord,
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification,
): OpsPromotionDeploymentExecutionRecordItem[] {
  return [
    {
      name: "deployment-change-record",
      valid: changeRecord.valid && changeRecordVerification.checks.changeDigestValid,
      source: "/api/v1/ops/promotion-archive/deployment-change-record",
      digest: {
        algorithm: "sha256",
        value: changeRecord.changeDigest.value,
      },
      detail: "Deployment change record exists and its digest is covered by verification.",
    },
    {
      name: "verified-deployment-change-record",
      valid: changeRecordVerification.valid,
      source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      digest: {
        algorithm: "sha256",
        value: changeRecordVerification.recomputedChangeDigest.value,
      },
      detail: "Deployment change record has been recomputed from the verified approval chain.",
    },
    {
      name: "deployment-approval",
      valid: changeRecordVerification.checks.approvalDigestMatches
        && changeRecordVerification.checks.verifiedApprovalDigestMatches,
      source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      digest: {
        algorithm: "sha256",
        value: changeRecord.verifiedApprovalDigest.value,
      },
      detail: "Deployment execution record still references the verified deployment approval digest.",
    },
    {
      name: "deployment-execution-state",
      valid: changeRecordVerification.valid
        && changeRecordVerification.checks.changeReadyMatches
        && changeRecord.verification.closeoutReady === changeRecordVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: changeRecord.state,
          handoffReady: changeRecord.handoffReady,
          approvalReady: changeRecord.approvalReady,
          changeReady: changeRecord.changeReady,
          closeoutReady: changeRecord.verification.closeoutReady,
          verifiedCloseoutReady: changeRecordVerification.summary.closeoutReady,
          latestDecisionId: changeRecord.decision.latestDecisionId ?? null,
          nextActions: changeRecord.nextActions,
        }),
      },
      detail: "Deployment execution record stores the verified change readiness and remaining actions.",
    },
  ];
}



export function archiveDeploymentExecutionReceiptItems(
  executionRecord: OpsPromotionDeploymentExecutionRecord,
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification,
): OpsPromotionDeploymentExecutionReceiptItem[] {
  return [
    {
      name: "deployment-execution-record",
      valid: executionRecord.valid && executionRecordVerification.checks.executionDigestValid,
      source: "/api/v1/ops/promotion-archive/deployment-execution-record",
      digest: {
        algorithm: "sha256",
        value: executionRecord.executionDigest.value,
      },
      detail: "Deployment execution record exists and its digest is covered by verification.",
    },
    {
      name: "verified-deployment-execution-record",
      valid: executionRecordVerification.valid,
      source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      digest: {
        algorithm: "sha256",
        value: executionRecordVerification.recomputedExecutionDigest.value,
      },
      detail: "Deployment execution record has been recomputed from the verified change record chain.",
    },
    {
      name: "deployment-change-record",
      valid: executionRecordVerification.checks.changeDigestMatches
        && executionRecordVerification.checks.verifiedChangeDigestMatches,
      source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      digest: {
        algorithm: "sha256",
        value: executionRecord.verifiedChangeDigest.value,
      },
      detail: "Deployment execution receipt still references the verified deployment change digest.",
    },
    {
      name: "deployment-receipt-state",
      valid: executionRecordVerification.valid
        && executionRecordVerification.checks.executionReadyMatches
        && executionRecord.verification.closeoutReady === executionRecordVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: executionRecord.state,
          handoffReady: executionRecord.handoffReady,
          approvalReady: executionRecord.approvalReady,
          changeReady: executionRecord.changeReady,
          executionReady: executionRecord.executionReady,
          closeoutReady: executionRecord.verification.closeoutReady,
          verifiedCloseoutReady: executionRecordVerification.summary.closeoutReady,
          latestDecisionId: executionRecord.decision.latestDecisionId ?? null,
          nextActions: executionRecord.nextActions,
        }),
      },
      detail: "Deployment execution receipt stores the verified execution readiness and remaining actions.",
    },
  ];
}



export function archiveReleaseAuditTrailItems(
  receipt: OpsPromotionDeploymentExecutionReceipt,
  receiptVerification: OpsPromotionDeploymentExecutionReceiptVerification,
): OpsPromotionReleaseAuditTrailRecordItem[] {
  return [
    {
      name: "deployment-execution-receipt",
      valid: receipt.valid && receiptVerification.checks.receiptDigestValid,
      source: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      digest: {
        algorithm: "sha256",
        value: receipt.receiptDigest.value,
      },
      detail: "Deployment execution receipt exists and its digest is covered by verification.",
    },
    {
      name: "verified-deployment-execution-receipt",
      valid: receiptVerification.valid,
      source: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: receiptVerification.recomputedReceiptDigest.value,
      },
      detail: "Deployment execution receipt has been recomputed from the verified execution record chain.",
    },
    {
      name: "deployment-execution-record",
      valid: receiptVerification.checks.executionDigestMatches
        && receiptVerification.checks.verifiedExecutionDigestMatches,
      source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedExecutionDigest.value,
      },
      detail: "Release audit trail still references the verified deployment execution digest.",
    },
    {
      name: "release-audit-state",
      valid: receiptVerification.valid
        && receiptVerification.checks.receiptReadyMatches
        && receipt.verification.closeoutReady === receiptVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: receipt.state,
          handoffReady: receipt.handoffReady,
          approvalReady: receipt.approvalReady,
          changeReady: receipt.changeReady,
          executionReady: receipt.executionReady,
          receiptReady: receipt.receiptReady,
          closeoutReady: receipt.verification.closeoutReady,
          verifiedCloseoutReady: receiptVerification.summary.closeoutReady,
          latestDecisionId: receipt.decision.latestDecisionId ?? null,
          nextActions: receipt.nextActions,
        }),
      },
      detail: "Release audit trail records the verified receipt readiness and remaining actions.",
    },
  ];
}

