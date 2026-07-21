import type {
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import {
  releaseArchiveCheckSpec,
  releaseArchiveSpec,
  releaseEvidenceCheckSpec,
  releaseEvidenceSpec,
} from "./promotionMarkdown/release.js";
import { renderMarkdownSpec } from "./promotionMarkdownEngine.js";

export function renderOpsPromotionReleaseEvidenceMarkdown(
  evidence: OpsPromotionReleaseEvidence,
): string {
  return renderMarkdownSpec(releaseEvidenceSpec(evidence));
}

export function renderOpsPromotionReleaseEvidenceVerificationMarkdown(
  verification: OpsPromotionReleaseEvidenceVerification,
): string {
  return renderMarkdownSpec(releaseEvidenceCheckSpec(verification));
}

export function renderOpsPromotionReleaseArchiveMarkdown(
  archive: OpsPromotionReleaseArchive,
): string {
  return renderMarkdownSpec(releaseArchiveSpec(archive));
}

export function renderOpsPromotionReleaseArchiveVerificationMarkdown(
  verification: OpsPromotionReleaseArchiveVerification,
): string {
  return renderMarkdownSpec(releaseArchiveCheckSpec(verification));
}
