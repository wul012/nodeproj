import {
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection disabled adapter client upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
      ],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v252", entries: profile.sourceNodeV252 },
      { heading: "Source Node v253", entries: profile.sourceNodeV253 },
      { heading: "Java v102 Echo", entries: profile.upstreamEchoes.javaV102 },
      { heading: "mini-kv v111 Non-Participation", entries: profile.upstreamEchoes.miniKvV111 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No disabled adapter client upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No disabled adapter client upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No disabled adapter client upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
