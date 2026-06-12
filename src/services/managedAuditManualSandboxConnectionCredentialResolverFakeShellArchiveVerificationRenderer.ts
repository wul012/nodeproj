import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver fake shell archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Ready for archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification],
      ["Read-only archive verification", profile.readOnlyArchiveVerification],
      ["Reruns fake shell behavior", profile.archiveVerificationRerunsFakeShellBehavior],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v264", entries: profile.sourceNodeV264 },
      { heading: "Source Node v265", entries: profile.sourceNodeV265 },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      {
        heading: "Archive Files",
        lines: profile.archivedEvidence.files.map(
          (file) => `- ${file.id}: ${file.workspacePath} exists=${file.exists} sizeBytes=${file.sizeBytes} digest=${file.digest ?? "missing"}`,
        ),
      },
      {
        heading: "Snippet Matches",
        lines: profile.archivedEvidence.snippetMatches.map(
          (snippet) => `- ${snippet.id}: ${snippet.workspacePath} matched=${snippet.matched}`,
        ),
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver fake shell archive verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver fake shell archive verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver fake shell archive verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
