import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerification,
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
} from "./opsPromotionArchiveBundleTypes.js";
import {
  archiveCheckSpec,
  archiveSpec,
  attestationCheckSpec,
  attestationSpec,
  manifestSpec,
} from "./promotionMarkdown/core.js";
import {
  certificateCheckSpec,
  certificateSpec,
  closureCheckSpec,
  closureSpec,
  completionCheckSpec,
  completionSpec,
  packageCheckSpec,
  packageSpec,
  receiptCheckSpec,
  receiptSpec,
} from "./promotionMarkdown/handoff.js";
import { renderMarkdownSpec } from "./promotionMarkdownEngine.js";

export function renderOpsPromotionArchiveMarkdown(bundle: OpsPromotionArchiveBundle): string {
  return renderMarkdownSpec(archiveSpec(bundle));
}

export function renderOpsPromotionArchiveAttestationVerificationMarkdown(
  verification: OpsPromotionArchiveAttestationVerification,
): string {
  return renderMarkdownSpec(attestationCheckSpec(verification));
}

export function renderOpsPromotionArchiveAttestationMarkdown(
  attestation: OpsPromotionArchiveAttestation,
): string {
  return renderMarkdownSpec(attestationSpec(attestation));
}

export function renderOpsPromotionArchiveVerificationMarkdown(
  verification: OpsPromotionArchiveVerification,
): string {
  return renderMarkdownSpec(archiveCheckSpec(verification));
}

export function renderOpsPromotionArchiveManifestMarkdown(
  manifest: OpsPromotionArchiveManifest,
): string {
  return renderMarkdownSpec(manifestSpec(manifest));
}

export function renderOpsPromotionHandoffCertificateMarkdown(
  certificate: OpsPromotionHandoffCertificate,
): string {
  return renderMarkdownSpec(certificateSpec(certificate));
}

export function renderOpsPromotionHandoffCertificateVerificationMarkdown(
  verification: OpsPromotionHandoffCertificateVerification,
): string {
  return renderMarkdownSpec(certificateCheckSpec(verification));
}

export function renderOpsPromotionHandoffReceiptMarkdown(
  receipt: OpsPromotionHandoffReceipt,
): string {
  return renderMarkdownSpec(receiptSpec(receipt));
}

export function renderOpsPromotionHandoffReceiptVerificationMarkdown(
  verification: OpsPromotionHandoffReceiptVerification,
): string {
  return renderMarkdownSpec(receiptCheckSpec(verification));
}

export function renderOpsPromotionHandoffClosureMarkdown(
  closure: OpsPromotionHandoffClosure,
): string {
  return renderMarkdownSpec(closureSpec(closure));
}

export function renderOpsPromotionHandoffClosureVerificationMarkdown(
  verification: OpsPromotionHandoffClosureVerification,
): string {
  return renderMarkdownSpec(closureCheckSpec(verification));
}

export function renderOpsPromotionHandoffCompletionMarkdown(
  completion: OpsPromotionHandoffCompletion,
): string {
  return renderMarkdownSpec(completionSpec(completion));
}

export function renderOpsPromotionHandoffCompletionVerificationMarkdown(
  verification: OpsPromotionHandoffCompletionVerification,
): string {
  return renderMarkdownSpec(completionCheckSpec(verification));
}

export function renderOpsPromotionHandoffPackageVerificationMarkdown(
  verification: OpsPromotionHandoffPackageVerification,
): string {
  return renderMarkdownSpec(packageCheckSpec(verification));
}

export function renderOpsPromotionHandoffPackageMarkdown(
  pkg: OpsPromotionHandoffPackage,
): string {
  return renderMarkdownSpec(packageSpec(pkg));
}

export {
  renderOpsPromotionDeploymentApprovalMarkdown,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  renderOpsPromotionDeploymentChangeRecordMarkdown,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionRecordMarkdown,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  renderOpsPromotionReleaseArchiveMarkdown,
  renderOpsPromotionReleaseArchiveVerificationMarkdown,
  renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  renderOpsPromotionReleaseEvidenceMarkdown,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown,
} from "./opsPromotionArchiveReleaseDeploymentRenderers.js";
