import type {
  ProductionLiveProbeCapturedWindowRecord,
  ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportEntriesSubsectionGroup,
  renderReleaseReportHeader,
  renderReleaseReportItemSection,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile,
): string {
  return [
    ...renderReleaseReportHeader("Production live probe real-read smoke read-only window live capture", {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Capture state": profile.captureState,
      "Ready for read-only live capture": profile.readyForReadOnlyLiveCapture,
      "Ready for production pass evidence candidate": profile.readyForProductionPassEvidenceCandidate,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    }),
    ...renderReleaseReportEntriesSection("Capture", profile.capture),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportItemSection("Captured Records", profile.capturedRecords, renderCapturedRecord),
    ...renderReleaseReportEntriesSubsectionGroup("Artifacts", [
      { heading: "Readiness Packet", entries: profile.artifacts.readinessPacket },
      { heading: "Smoke Harness", entries: profile.artifacts.smokeHarness },
    ]),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No read-only window live capture blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No read-only window live capture warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No read-only window live capture recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}

function renderCapturedRecord(record: ProductionLiveProbeCapturedWindowRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Capture status: ${record.captureStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Target: ${record.target}`,
    `- Protocol: ${record.protocol}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Message: ${record.message}`,
    `- Evidence summary: ${JSON.stringify(record.evidenceSummary)}`,
    "",
  ];
}
