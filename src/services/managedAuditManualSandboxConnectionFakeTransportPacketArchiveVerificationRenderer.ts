import type {
  FakeTransportPacketArchiveFileEvidence,
  FakeTransportPacketArchiveSnippetEvidence,
  ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationTypes.js";
import {
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection fake transport packet archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      [
        "Ready for archive verification",
        profile.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification,
      ],
      ["Read-only archive verification", profile.readOnlyArchiveVerification],
      ["Reruns fake transport behavior", profile.archiveVerificationRerunsFakeTransportBehavior],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v255", entries: profile.sourceNodeV255 },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      { heading: "Archive Files", lines: profile.archivedEvidence.files.map(renderArchiveFile) },
      { heading: "Snippet Matches", lines: profile.archivedEvidence.snippetMatches.map(renderSnippetMatch) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No fake transport packet archive verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No fake transport packet archive verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No fake transport packet archive verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderArchiveFile(file: FakeTransportPacketArchiveFileEvidence): string {
  return `- ${file.id}: ${file.workspacePath} exists=${file.exists} sizeBytes=${file.sizeBytes} digest=${file.digest ?? "missing"}`;
}

function renderSnippetMatch(snippet: FakeTransportPacketArchiveSnippetEvidence): string {
  return `- ${snippet.id}: ${snippet.workspacePath} matched=${snippet.matched}`;
}
