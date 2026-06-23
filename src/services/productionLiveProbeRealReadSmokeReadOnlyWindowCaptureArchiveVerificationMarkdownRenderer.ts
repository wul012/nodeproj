import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportEntriesSubsectionGroup,
  renderReleaseReportHeader,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Production live probe real-read smoke read-only window capture archive verification",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Verification state": profile.verificationState,
        "Ready for read-only capture archive verification": profile.readyForReadOnlyCaptureArchiveVerification,
        "Ready for production operations": profile.readyForProductionOperations,
        "Read only": profile.readOnly,
        "Execution allowed": profile.executionAllowed,
      },
    ),
    ...renderReleaseReportEntriesSection("Verification", profile.verification),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSubsectionGroup("Artifacts", [
      { heading: "Archive", entries: profile.artifacts.archive },
      { heading: "Live Capture", entries: profile.artifacts.liveCapture },
      { heading: "Readiness Packet", entries: profile.artifacts.readinessPacket },
      { heading: "Java Reference", entries: profile.artifacts.javaReference },
      { heading: "mini-kv Reference", entries: profile.artifacts.miniKvReference },
    ]),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No read-only window capture archive verification blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No read-only window capture archive verification warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No read-only window capture archive verification recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}
