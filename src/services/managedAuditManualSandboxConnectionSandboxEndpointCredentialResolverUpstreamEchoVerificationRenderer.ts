import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for credential resolver upstream echo verification", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v260", entries: profile.sourceNodeV260 },
      { heading: "Java v105 Echo", entries: profile.upstreamEchoes.javaV105 },
      { heading: "mini-kv v114 Non-Participation", entries: profile.upstreamEchoes.miniKvV114 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No credential resolver upstream echo verification blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No credential resolver upstream echo verification warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No credential resolver upstream echo verification recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
