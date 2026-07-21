import { renderEntries } from "../liveProbeReportUtils.js";
import type {
  ProductionConnectionArchiveVerificationProfile,
} from "../productionConnectionArchiveVerification.js";
import type {
  ProductionLiveProbeEvidenceArchiveVerificationProfile,
} from "../productionLiveProbeEvidenceArchiveVerification.js";
import { renderVerificationReportMarkdown } from "../verificationReportBuilder.js";

export function renderConnectionArchive(
  profile: ProductionConnectionArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Production connection archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Ready for archive verification", profile.readyForArchiveVerification],
      ["Ready for production connections", profile.readyForProductionConnections],
      ["Read only", profile.readOnly],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Archive", lines: connectionEntryLines(profile.archive) },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Artifacts",
        lines: [
          ...renderEntries(profile.artifacts.implementationPrecheck),
          "",
          ...renderEntries(profile.artifacts.dryRunChangeRequest),
          "",
          ...latestApprovalLines(profile.artifacts.latestApproval),
        ],
      },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No archive verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No archive verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No archive verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

export function renderLiveProbeArchive(
  profile: ProductionLiveProbeEvidenceArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Production live probe evidence archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Ready for archive verification", profile.readyForArchiveVerification],
      ["Ready for production operations", profile.readyForProductionOperations],
      ["Read only", profile.readOnly],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Verification", entries: profile.verification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Artifacts", lines: liveProbeArtifactLines(profile) },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No live probe archive verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No live probe archive verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No live probe archive verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function connectionEntryLines(record: object): string[] {
  return Object.entries(record).map(([key, value]) =>
    `- ${key}: ${value === undefined ? "missing" : entryValue(value)}`);
}

function latestApprovalLines(
  approval: ProductionConnectionArchiveVerificationProfile["artifacts"]["latestApproval"],
): string[] {
  if (approval === undefined) {
    return ["- Latest approval: missing"];
  }
  return [
    `- Latest approval id: ${approval.approvalId}`,
    `- Latest approval sequence: ${approval.sequence}`,
    `- Latest approval decision: ${approval.decision}`,
    `- Latest approval reviewer: ${approval.reviewer}`,
    `- Latest approval digest: ${approval.approvalDigest}`,
    `- Latest approval change request digest: ${approval.changeRequestDigest}`,
    `- Latest approval real connection attempted: ${approval.realConnectionAttempted}`,
  ];
}

function liveProbeArtifactLines(
  profile: ProductionLiveProbeEvidenceArchiveVerificationProfile,
): string[] {
  return [
    "### Archive record",
    "",
    ...renderEntries(profile.artifacts.archiveRecord),
    "",
    "### Version references",
    "",
    ...renderEntries(profile.artifacts.versionReferences),
    "",
    "### Evidence state",
    "",
    ...renderEntries(profile.artifacts.evidenceState),
  ];
}

function entryValue(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}
