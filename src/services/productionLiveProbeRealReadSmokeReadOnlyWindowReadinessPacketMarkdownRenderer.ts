import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
} from "./productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketTypes.js";

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
): string {
  return [
    "# Production live probe real-read smoke read-only window readiness packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Packet state: ${profile.packetState}`,
    `- Ready for read-only window review: ${profile.readyForReadOnlyWindowReview}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Packet",
    "",
    ...renderEntries(profile.packet),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Evidence Chain",
    "",
    ...renderEvidenceChain(profile.evidenceChain),
    "",
    "## Operator Window Requirements",
    "",
    ...renderRequirements(profile.operatorWindowRequirements),
    "",
    "## Review Steps",
    "",
    ...renderReviewSteps(profile.reviewSteps),
    "",
    "## Artifacts",
    "",
    "### Archive Verification",
    "",
    ...renderEntries(profile.artifacts.archiveVerification),
    "",
    "### Operator Runbook",
    "",
    ...renderEntries(profile.artifacts.operatorRunbook),
    "",
    "### Operator Runbook Verification",
    "",
    ...renderEntries(profile.artifacts.operatorRunbookVerification),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No read-only window readiness packet blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No read-only window readiness packet warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No read-only window readiness packet recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
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
