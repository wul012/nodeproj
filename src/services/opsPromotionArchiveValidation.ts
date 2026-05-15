import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveAttestationState,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveState,
  OpsPromotionArchiveVerification,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceVerification,
} from "./opsPromotionArchiveBundleTypes.js";

export function archiveHandoffCompletionReferenceChecksValid(
  closureVerification: OpsPromotionHandoffClosureVerification,
): boolean {
  return closureVerification.checks.receiptDigestMatches
    && closureVerification.checks.verifiedReceiptDigestMatches
    && closureVerification.checks.certificateDigestMatches
    && closureVerification.checks.verifiedCertificateDigestMatches
    && closureVerification.checks.packageDigestMatches
    && closureVerification.checks.verifiedPackageDigestMatches
    && closureVerification.checks.sealDigestMatches;
}



export function archiveVerificationNextActions(
  manifestDigestValid: boolean,
  artifactsValid: boolean,
  manifest: OpsPromotionArchiveManifest,
): string[] {
  if (!manifestDigestValid) {
    return ["Regenerate the archive manifest before trusting this archive fingerprint."];
  }

  if (!artifactsValid) {
    return ["Review archive manifest artifacts before attaching this archive to a handoff record."];
  }

  if (manifest.state === "ready") {
    return ["Archive manifest is verified; keep the manifest digest with the promotion handoff record."];
  }

  return manifest.nextActions;
}



export function archiveAttestationVerificationNextActions(
  checks: OpsPromotionArchiveAttestationVerification["checks"],
  attestation: OpsPromotionArchiveAttestation,
): string[] {
  if (!checks.sealDigestValid) {
    return ["Regenerate the archive attestation before trusting this seal digest."];
  }

  if (!checks.verificationDigestValid) {
    return ["Rebuild archive verification before trusting this attestation seal."];
  }

  if (!checks.manifestDigestMatches || !checks.decisionMatches || !checks.checksMatch || !checks.evidenceSourcesMatch) {
    return ["Recreate the archive attestation from the latest bundle, manifest, and verification objects."];
  }

  if (attestation.handoffReady) {
    return ["Attestation verification is complete; keep the verified seal digest with the promotion handoff record."];
  }

  return attestation.nextActions;
}



export function archiveHandoffPackageNextActions(
  attestation: OpsPromotionArchiveAttestation,
  attestationVerification: OpsPromotionArchiveAttestationVerification,
): string[] {
  if (!attestationVerification.valid) {
    return ["Resolve attestation verification failures before sharing the promotion handoff package."];
  }

  if (attestation.handoffReady) {
    return ["Handoff package is ready; share the package digest and verified seal digest with the promotion handoff record."];
  }

  return attestationVerification.nextActions;
}



export function archiveHandoffPackageVerificationNextActions(
  checks: OpsPromotionHandoffPackageVerification["checks"],
  handoffPackage: OpsPromotionHandoffPackage,
): string[] {
  if (!checks.packageDigestValid) {
    return ["Regenerate the handoff package before trusting this package digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff package attachments before sharing the promotion handoff package."];
  }

  if (!checks.summaryMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Recreate the handoff package from the latest verified archive chain."];
  }

  if (handoffPackage.handoffReady) {
    return ["Handoff package verification is complete; share the verified package digest with the promotion handoff record."];
  }

  return handoffPackage.nextActions;
}



export function archiveHandoffCertificateNextActions(
  handoffPackage: OpsPromotionHandoffPackage,
  handoffPackageVerification: OpsPromotionHandoffPackageVerification,
  valid: boolean,
): string[] {
  if (!handoffPackageVerification.valid) {
    return ["Resolve handoff package verification failures before issuing a promotion handoff certificate."];
  }

  if (!valid) {
    return ["Regenerate the handoff package before issuing a promotion handoff certificate."];
  }

  if (handoffPackage.handoffReady) {
    return ["Promotion handoff certificate is ready; share the certificate digest with the handoff record."];
  }

  return handoffPackageVerification.nextActions;
}



export function archiveHandoffCertificateVerificationNextActions(
  checks: OpsPromotionHandoffCertificateVerification["checks"],
  certificate: OpsPromotionHandoffCertificate,
): string[] {
  if (!checks.certificateDigestValid) {
    return ["Regenerate the handoff certificate before trusting this certificate digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff certificate attachments before sharing the promotion handoff certificate."];
  }

  if (!checks.packageDigestMatches || !checks.verifiedPackageDigestMatches || !checks.sealDigestMatches) {
    return ["Recreate the handoff certificate from the latest verified handoff package."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff certificate from the latest package verification result."];
  }

  if (certificate.handoffReady) {
    return ["Handoff certificate verification is complete; share the verified certificate digest with the handoff record."];
  }

  return certificate.nextActions;
}



export function archiveHandoffReceiptNextActions(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
  valid: boolean,
): string[] {
  if (!certificateVerification.valid) {
    return ["Resolve handoff certificate verification failures before issuing a promotion handoff receipt."];
  }

  if (!valid) {
    return ["Regenerate the handoff receipt from a verified certificate before storing it."];
  }

  if (certificate.handoffReady) {
    return ["Promotion handoff receipt is ready; store the receipt digest with the final handoff record."];
  }

  return certificateVerification.nextActions;
}



export function archiveHandoffReceiptVerificationNextActions(
  checks: OpsPromotionHandoffReceiptVerification["checks"],
  receipt: OpsPromotionHandoffReceipt,
): string[] {
  if (!checks.receiptDigestValid) {
    return ["Regenerate the handoff receipt before trusting this receipt digest."];
  }

  if (!checks.milestonesValid) {
    return ["Review handoff receipt milestones before storing the final handoff receipt."];
  }

  if (
    !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff receipt from the latest verified certificate chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff receipt from the latest receipt inputs."];
  }

  if (receipt.handoffReady) {
    return ["Handoff receipt verification is complete; store the verified receipt digest with the final handoff record."];
  }

  return receipt.nextActions;
}



export function archiveHandoffClosureNextActions(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
  valid: boolean,
): string[] {
  if (!receiptVerification.valid) {
    return ["Resolve handoff receipt verification failures before closing the promotion handoff."];
  }

  if (!valid) {
    return ["Regenerate the handoff closure from a verified receipt before marking the handoff closed."];
  }

  if (receipt.handoffReady) {
    return ["Promotion handoff closure is ready; record the closure digest and mark the handoff closed."];
  }

  return receiptVerification.nextActions;
}



export function archiveHandoffClosureVerificationNextActions(
  checks: OpsPromotionHandoffClosureVerification["checks"],
  closure: OpsPromotionHandoffClosure,
): string[] {
  if (!checks.closureDigestValid) {
    return ["Regenerate the handoff closure before trusting this closure digest."];
  }

  if (!checks.closureItemsValid) {
    return ["Review handoff closure items before marking the promotion handoff closed."];
  }

  if (
    !checks.receiptDigestMatches
    || !checks.verifiedReceiptDigestMatches
    || !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff closure from the latest verified receipt chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff closure from the latest closure inputs."];
  }

  if (closure.handoffReady) {
    return ["Handoff closure verification is complete; store the verified closure digest with the final handoff record."];
  }

  return closure.nextActions;
}



export function archiveHandoffCompletionNextActions(
  closureVerification: OpsPromotionHandoffClosureVerification,
  valid: boolean,
  handoffReady: boolean,
): string[] {
  if (!closureVerification.valid) {
    return ["Resolve handoff closure verification failures before issuing the completion record."];
  }

  if (!valid) {
    return ["Regenerate the completion record after the closure and verification agree."];
  }

  if (handoffReady) {
    return ["Promotion handoff completion is ready; archive the completion digest with the final release evidence."];
  }

  return closureVerification.nextActions;
}



export function archiveHandoffCompletionVerificationNextActions(
  checks: OpsPromotionHandoffCompletionVerification["checks"],
  completion: OpsPromotionHandoffCompletion,
): string[] {
  if (!checks.completionDigestValid) {
    return ["Regenerate the handoff completion record before trusting this completion digest."];
  }

  if (!checks.completionStepsValid) {
    return ["Review handoff completion steps before archiving final release evidence."];
  }

  if (!checks.closureDigestMatches || !checks.verifiedClosureDigestMatches) {
    return ["Recreate the handoff completion record from the latest verified closure chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff completion record from the latest completion inputs."];
  }

  if (completion.handoffReady) {
    return ["Handoff completion verification is complete; archive the verified completion digest with the final release evidence."];
  }

  return completion.nextActions;
}



export function archiveReleaseEvidenceNextActions(
  completionVerification: OpsPromotionHandoffCompletionVerification,
  valid: boolean,
  handoffReady: boolean,
): string[] {
  if (!completionVerification.valid) {
    return ["Resolve handoff completion verification failures before publishing release evidence."];
  }

  if (!valid) {
    return ["Regenerate release evidence after completion and verification agree."];
  }

  if (handoffReady) {
    return ["Release evidence is ready; store the evidence digest with the final release archive."];
  }

  return completionVerification.nextActions;
}



export function archiveReleaseEvidenceVerificationNextActions(
  checks: OpsPromotionReleaseEvidenceVerification["checks"],
  evidence: OpsPromotionReleaseEvidence,
): string[] {
  if (!checks.evidenceDigestValid) {
    return ["Regenerate release evidence before trusting this evidence digest."];
  }

  if (!checks.evidenceItemsValid) {
    return ["Review release evidence items before storing the final release archive."];
  }

  if (
    !checks.completionDigestMatches
    || !checks.verifiedCompletionDigestMatches
    || !checks.closureDigestMatches
    || !checks.verifiedClosureDigestMatches
  ) {
    return ["Recreate release evidence from the latest verified completion chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue release evidence from the latest evidence inputs."];
  }

  if (evidence.handoffReady) {
    return ["Release evidence verification is complete; store the verified evidence digest with the final release archive."];
  }

  return evidence.nextActions;
}



export function archiveReleaseArchiveNextActions(
  evidenceVerification: OpsPromotionReleaseEvidenceVerification,
  valid: boolean,
  handoffReady: boolean,
): string[] {
  if (!evidenceVerification.valid) {
    return ["Resolve release evidence verification failures before finalizing the release archive."];
  }

  if (!valid) {
    return ["Regenerate the final release archive after evidence and verification agree."];
  }

  if (handoffReady) {
    return ["Final release archive is ready; keep the release archive digest with deployment approval records."];
  }

  return evidenceVerification.nextActions;
}



export function archiveReleaseArchiveVerificationNextActions(
  checks: OpsPromotionReleaseArchiveVerification["checks"],
  releaseArchive: OpsPromotionReleaseArchive,
): string[] {
  if (!checks.releaseArchiveDigestValid) {
    return ["Regenerate the final release archive before trusting this archive digest."];
  }

  if (!checks.archiveItemsValid) {
    return ["Review final release archive items before attaching deployment approval records."];
  }

  if (
    !checks.evidenceDigestMatches
    || !checks.verifiedEvidenceDigestMatches
    || !checks.completionDigestMatches
    || !checks.closureDigestMatches
  ) {
    return ["Recreate the final release archive from the latest verified release evidence chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the final release archive from the latest archive inputs."];
  }

  if (releaseArchive.handoffReady) {
    return ["Final release archive verification is complete; attach the verified archive digest to deployment approval records."];
  }

  return releaseArchive.nextActions;
}



export function archiveDeploymentApprovalNextActions(
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification,
  valid: boolean,
  approvalReady: boolean,
): string[] {
  if (!releaseArchiveVerification.valid) {
    return ["Resolve final release archive verification failures before issuing deployment approval."];
  }

  if (!valid) {
    return ["Regenerate deployment approval after release archive and verification agree."];
  }

  if (approvalReady) {
    return ["Deployment approval is ready; attach the approval digest to the deployment change record."];
  }

  return releaseArchiveVerification.nextActions;
}



export function archiveDeploymentApprovalVerificationNextActions(
  checks: OpsPromotionDeploymentApprovalVerification["checks"],
  approval: OpsPromotionDeploymentApproval,
): string[] {
  if (!checks.approvalDigestValid) {
    return ["Regenerate deployment approval before trusting this approval digest."];
  }

  if (!checks.approvalItemsValid) {
    return ["Review deployment approval items before attaching the deployment change record."];
  }

  if (
    !checks.releaseArchiveDigestMatches
    || !checks.verifiedReleaseArchiveDigestMatches
    || !checks.evidenceDigestMatches
  ) {
    return ["Recreate deployment approval from the latest verified release archive chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue deployment approval from the latest approval inputs."];
  }

  if (approval.approvalReady) {
    return ["Deployment approval verification is complete; attach the verified approval digest to the deployment change record."];
  }

  return approval.nextActions;
}



export function archiveDeploymentChangeRecordNextActions(
  approvalVerification: OpsPromotionDeploymentApprovalVerification,
  valid: boolean,
  changeReady: boolean,
): string[] {
  if (!approvalVerification.valid) {
    return ["Resolve deployment approval verification failures before writing the deployment change record."];
  }

  if (!valid) {
    return ["Regenerate the deployment change record after deployment approval and verification agree."];
  }

  if (changeReady) {
    return ["Deployment change record is ready; attach the change digest to release execution logs."];
  }

  return approvalVerification.nextActions;
}



export function archiveDeploymentChangeRecordVerificationNextActions(
  checks: OpsPromotionDeploymentChangeRecordVerification["checks"],
  changeRecord: OpsPromotionDeploymentChangeRecord,
): string[] {
  if (!checks.changeDigestValid) {
    return ["Regenerate the deployment change record before attaching it to release execution logs."];
  }

  if (!checks.changeItemsValid) {
    return ["Review deployment change record items before trusting the change digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment change record from the verified approval chain."];
  }

  if (changeRecord.changeReady) {
    return ["Deployment change record is verified; attach the change digest to release execution logs."];
  }

  return changeRecord.nextActions;
}



export function archiveDeploymentExecutionRecordNextActions(
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification,
  valid: boolean,
  executionReady: boolean,
): string[] {
  if (!changeRecordVerification.valid) {
    return ["Resolve deployment change record verification failures before writing the deployment execution record."];
  }

  if (!valid) {
    return ["Regenerate the deployment execution record after change record and verification agree."];
  }

  if (executionReady) {
    return ["Deployment execution record is ready; use the execution digest as the release execution correlation id."];
  }

  return changeRecordVerification.nextActions;
}



export function archiveDeploymentExecutionRecordVerificationNextActions(
  checks: OpsPromotionDeploymentExecutionRecordVerification["checks"],
  executionRecord: OpsPromotionDeploymentExecutionRecord,
): string[] {
  if (!checks.executionDigestValid) {
    return ["Regenerate the deployment execution record before using it as a release execution correlation id."];
  }

  if (!checks.executionItemsValid) {
    return ["Review deployment execution record items before trusting the execution digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment execution record from the verified change record chain."];
  }

  if (executionRecord.executionReady) {
    return ["Deployment execution record is verified; use the execution digest as the release execution correlation id."];
  }

  return executionRecord.nextActions;
}



export function archiveDeploymentExecutionReceiptNextActions(
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification,
  valid: boolean,
  receiptReady: boolean,
): string[] {
  if (!executionRecordVerification.valid) {
    return ["Resolve deployment execution record verification failures before writing the deployment execution receipt."];
  }

  if (!valid) {
    return ["Regenerate the deployment execution receipt after execution record and verification agree."];
  }

  if (receiptReady) {
    return ["Deployment execution receipt is ready; attach the receipt digest to the release audit trail."];
  }

  return executionRecordVerification.nextActions;
}



export function archiveDeploymentExecutionReceiptVerificationNextActions(
  checks: OpsPromotionDeploymentExecutionReceiptVerification["checks"],
  receipt: OpsPromotionDeploymentExecutionReceipt,
): string[] {
  if (!checks.receiptDigestValid) {
    return ["Regenerate the deployment execution receipt before attaching it to the release audit trail."];
  }

  if (!checks.receiptItemsValid) {
    return ["Review deployment execution receipt items before trusting the receipt digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment execution receipt from the verified execution record chain."];
  }

  if (receipt.receiptReady) {
    return ["Deployment execution receipt is verified; attach the receipt digest to the release audit trail."];
  }

  return receipt.nextActions;
}



export function archiveReleaseAuditTrailNextActions(
  receiptVerification: OpsPromotionDeploymentExecutionReceiptVerification,
  valid: boolean,
  auditReady: boolean,
): string[] {
  if (!receiptVerification.valid) {
    return ["Resolve deployment execution receipt verification failures before writing the release audit trail record."];
  }

  if (!valid) {
    return ["Regenerate the release audit trail record after receipt and verification agree."];
  }

  if (auditReady) {
    return ["Release audit trail record is ready; attach the audit digest to final release reporting."];
  }

  return receiptVerification.nextActions;
}



export function archiveAttestationNextActions(
  state: OpsPromotionArchiveAttestationState,
  checks: OpsPromotionArchiveAttestation["checks"],
  bundle: OpsPromotionArchiveBundle,
  verification: OpsPromotionArchiveVerification,
): string[] {
  if (!verification.valid) {
    return ["Resolve archive verification failures before issuing a promotion archive attestation."];
  }

  if (bundle.summary.totalDecisions === 0 || state === "not-started") {
    return ["Record an approved promotion decision before issuing a promotion archive attestation."];
  }

  if (!checks.integrityVerified) {
    return ["Repair promotion decision ledger integrity before sealing the archive attestation."];
  }

  if (!checks.latestDecisionReady) {
    return ["Complete readiness, runbook, and baseline requirements before recording an approved promotion decision."];
  }

  if (!checks.archiveReady) {
    return bundle.nextActions;
  }

  return ["Archive attestation is ready; attach the seal digest to the promotion handoff record."];
}



export function archiveState(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): OpsPromotionArchiveState {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return "empty";
  }

  if (!integrity.valid || !latestEvidence.summary.digestValid) {
    return "attention-required";
  }

  return latestEvidence.summary.outcome === "approved" ? "ready" : "attention-required";
}



export function archiveNextActions(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): string[] {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return ["Record a promotion decision before building an archive bundle."];
  }

  if (!integrity.valid) {
    return ["Inspect promotion decision ledger integrity before trusting this archive bundle."];
  }

  if (!latestEvidence.summary.digestValid) {
    return ["Inspect the latest promotion decision digest before trusting this archive bundle."];
  }

  if (latestEvidence.summary.outcome === "approved") {
    return ["Archive bundle is internally consistent; keep it with the promotion handoff record."];
  }

  return latestEvidence.nextActions;
}

