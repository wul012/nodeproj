import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled candidate upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for disabled candidate upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
      ],
      ["Read-only upstream echo verification", profile.readOnlyUpstreamEchoVerification],
      ["Disabled candidate echo verification only", profile.disabledCandidateEchoVerificationOnly],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v273", entries: profile.sourceNodeV273 },
      { heading: "Java v113 Echo Receipt", entries: profile.upstreamEchoes.javaV113 },
      { heading: "mini-kv v120 Non-Participation Receipt", entries: profile.upstreamEchoes.miniKvV120 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No disabled candidate upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No disabled candidate upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No disabled candidate upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
