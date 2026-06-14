import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection fake transport packet upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
      ],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v255", entries: profile.sourceNodeV255 },
      { heading: "Source Node v256", entries: profile.sourceNodeV256 },
      { heading: "Java v103 Echo", entries: profile.upstreamEchoes.javaV103 },
      { heading: "mini-kv v112 Non-Participation", entries: profile.upstreamEchoes.miniKvV112 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No fake transport packet upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No fake transport packet upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No fake transport packet upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
