import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint handle upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for upstream echo verification", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v258", entries: profile.sourceNodeV258 },
      { heading: "Java v104 Echo", entries: profile.upstreamEchoes.javaV104 },
      { heading: "mini-kv v113 Non-Participation", entries: profile.upstreamEchoes.miniKvV113 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No sandbox endpoint handle upstream echo verification blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No sandbox endpoint handle upstream echo verification warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No sandbox endpoint handle upstream echo verification recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
