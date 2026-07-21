import { renderEntries, type LiveProbeReportMessage } from "../liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionPacketVerificationProfile,
} from "../managedAuditManualSandboxConnectionPacketVerification.js";
import type {
  ManagedAuditManualSandboxConnectionPreflightVerificationProfile,
} from "../managedAuditManualSandboxConnectionPreflightVerification.js";
import {
  renderVerificationReportMarkdown,
  type VerificationReportSection,
} from "../verificationReportBuilder.js";

// Design: one renderer owns the common manual-connection report grammar.
// Packet and preflight profiles provide data and domain wording explicitly.

type EvidenceFile = {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
};

type SnippetMatch = {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
};

type SharedProfile = {
  evidenceFiles: EvidenceFile[];
  snippetMatches: SnippetMatch[];
  checks: object;
  summary: object;
  productionBlockers: LiveProbeReportMessage[];
  warnings: LiveProbeReportMessage[];
  recommendations: LiveProbeReportMessage[];
  evidenceEndpoints: object;
  nextActions: string[];
};

export function renderPacketVerification(
  profile: ManagedAuditManualSandboxConnectionPacketVerificationProfile,
): string {
  return renderManualVerification({
    title: "Managed audit manual sandbox connection packet verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for packet verification", profile.readyForManagedAuditManualSandboxConnectionPacketVerification],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
      ["Ready for production audit", profile.readyForProductionAudit],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
    ],
    leadingSections: [
      { heading: "Source Node v228", entries: profile.sourceNodeV228 },
      { heading: "Java v87 Marker", entries: profile.upstreamMarkers.javaV87 },
      { heading: "mini-kv v96 Marker", entries: profile.upstreamMarkers.miniKvV96 },
      { heading: "Packet Verification", entries: profile.packetVerification },
    ],
    profile,
    emptyScope: "manual sandbox packet verification",
  });
}

export function renderPreflightVerification(
  profile: ManagedAuditManualSandboxConnectionPreflightVerificationProfile,
): string {
  return renderManualVerification({
    title: "Managed audit manual sandbox connection preflight verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for preflight verification", profile.readyForManagedAuditManualSandboxConnectionPreflightVerification],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
      ["Ready for production audit", profile.readyForProductionAudit],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
    ],
    leadingSections: [
      { heading: "Source Node v230", entries: profile.sourceNodeV230 },
      { heading: "Java v88 Preflight Echo Marker", entries: profile.upstreamMarkers.javaV88 },
      { heading: "mini-kv v97 No-Start Guard", entries: profile.upstreamMarkers.miniKvV97 },
      { heading: "Preflight Verification", entries: profile.preflightVerification },
    ],
    profile,
    emptyScope: "manual sandbox preflight verification",
  });
}

function renderManualVerification(input: {
  title: string;
  meta: ReadonlyArray<readonly [string, unknown]>;
  leadingSections: VerificationReportSection[];
  profile: SharedProfile;
  emptyScope: string;
}): string {
  const { profile } = input;
  return renderVerificationReportMarkdown({
    title: input.title,
    meta: input.meta,
    sections: [
      ...input.leadingSections,
      { heading: "Evidence Files", lines: profile.evidenceFiles.flatMap(renderEvidenceFile) },
      {
        heading: "Snippet Matches",
        headingLeadingBlankLine: false,
        lines: profile.snippetMatches.flatMap(renderSnippet),
      },
      { heading: "Checks", headingLeadingBlankLine: false, entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: `No ${input.emptyScope} blockers.`,
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: `No ${input.emptyScope} warnings.`,
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: `No ${input.emptyScope} recommendations.`,
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderEvidenceFile(file: EvidenceFile): string[] {
  return [`### ${file.id}`, "", ...renderEntries(file), ""];
}

function renderSnippet(snippet: SnippetMatch): string[] {
  return [
    `- ${snippet.id}: ${snippet.matched}`,
    `  - Path: ${snippet.path}`,
    `  - Expected: ${snippet.expectedText}`,
  ];
}
