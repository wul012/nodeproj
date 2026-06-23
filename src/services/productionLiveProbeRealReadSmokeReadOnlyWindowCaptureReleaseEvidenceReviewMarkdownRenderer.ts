import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportEntriesSubsectionGroup,
  renderReleaseReportHeader,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Production live probe real-read smoke read-only window capture release evidence review",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Review state": profile.reviewState,
        "Ready for read-only capture release evidence review":
          profile.readyForReadOnlyCaptureReleaseEvidenceReview,
        "Ready for production pass evidence": profile.readyForProductionPassEvidence,
        "Ready for production operations": profile.readyForProductionOperations,
        "Read only": profile.readOnly,
        "Execution allowed": profile.executionAllowed,
      },
    ),
    ...renderReleaseReportEntriesSection("Review", profile.review),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSubsectionGroup("Artifacts", [
      { heading: "Archive Verification", entries: profile.artifacts.archiveVerification },
      { heading: "Java Field Guide", entries: profile.artifacts.javaFieldGuide },
      { heading: "mini-kv Field Guide", entries: profile.artifacts.miniKvFieldGuide },
    ]),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No read-only capture release evidence review blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No read-only capture release evidence review warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No read-only capture release evidence review recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}
