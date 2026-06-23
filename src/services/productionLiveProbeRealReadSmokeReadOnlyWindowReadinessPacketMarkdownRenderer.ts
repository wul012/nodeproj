import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportEntriesSubsectionGroup,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
): string {
  return [
    ...renderReleaseReportHeader("Production live probe real-read smoke read-only window readiness packet", {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Packet state": profile.packetState,
      "Ready for read-only window review": profile.readyForReadOnlyWindowReview,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    }),
    ...renderReleaseReportEntriesSection("Packet", profile.packet),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportLineSection("Evidence Chain", renderEvidenceChain(profile.evidenceChain)),
    ...renderReleaseReportLineSection("Operator Window Requirements", renderRequirements(profile.operatorWindowRequirements)),
    ...renderReleaseReportLineSection("Review Steps", renderReviewSteps(profile.reviewSteps)),
    ...renderReleaseReportEntriesSubsectionGroup("Artifacts", [
      { heading: "Archive Verification", entries: profile.artifacts.archiveVerification },
      { heading: "Operator Runbook", entries: profile.artifacts.operatorRunbook },
      { heading: "Operator Runbook Verification", entries: profile.artifacts.operatorRunbookVerification },
    ]),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No read-only window readiness packet blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No read-only window readiness packet warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No read-only window readiness packet recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}

function renderEvidenceChain(
  items: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["evidenceChain"],
): string[] {
  return items.map((item) => `- ${item.name}: ${item.profileVersion}; digest=${item.digest}; role=${item.role}`);
}

function renderRequirements(
  items: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["operatorWindowRequirements"],
): string[] {
  return items.map((item) => `- ${item.code}: required=${item.required}; evidence=${item.evidence}`);
}

function renderReviewSteps(
  items: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["reviewSteps"],
): string[] {
  return items.map((item) => [
    `- ${item.order}. ${item.title}`,
    `  - Action: ${item.action}`,
    `  - Blocks production pass if missing: ${item.blocksProductionPassIfMissing}`,
  ].join("\n"));
}
