import type {
  ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver fake shell archive upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
      ],
      ["Read-only upstream echo verification", profile.readOnlyUpstreamEchoVerification],
      ["Archive verification only", profile.archiveVerificationOnly],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v266", entries: profile.sourceNodeV266 },
      { heading: "Java v110 Echo Receipt", entries: profile.upstreamEchoes.javaV110 },
      { heading: "mini-kv v117 Non-Participation Receipt", entries: profile.upstreamEchoes.miniKvV117 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver fake shell archive upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver fake shell archive upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver fake shell archive upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
