import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportEntriesSubsectionGroup,
  renderReleaseReportHeader,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile,
): string {
  return [
    ...renderReleaseReportHeader("Production live probe real-read smoke read-only window capture archive", {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Archive state": profile.archiveState,
      "Ready for read-only capture archive": profile.readyForReadOnlyCaptureArchive,
      "Ready for production pass evidence archive": profile.readyForProductionPassEvidenceArchive,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    }),
    ...renderReleaseReportEntriesSection("Archive", profile.archive),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSubsectionGroup("Artifacts", [
      { heading: "Live Capture", entries: profile.artifacts.liveCapture },
      { heading: "Readiness Packet", entries: profile.artifacts.readinessPacket },
      { heading: "Java Reference", entries: profile.artifacts.javaReference },
      { heading: "mini-kv Reference", entries: profile.artifacts.miniKvReference },
    ]),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No read-only window capture archive blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No read-only window capture archive warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No read-only window capture archive recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}
