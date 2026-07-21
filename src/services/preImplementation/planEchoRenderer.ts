import type {
  PlanEchoProfile,
} from "./types.js";
import { renderVerificationReportMarkdown } from "../verificationReportBuilder.js";

export function renderPlanEchoMarkdown(
  profile: PlanEchoProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver pre-implementation plan intake upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for plan-intake upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
      ],
      ["Read-only upstream echo verification", profile.readOnlyUpstreamEchoVerification],
      ["Plan intake echo verification only", profile.planIntakeEchoVerificationOnly],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v270", entries: profile.sourceNodeV270 },
      { heading: "Java v112 Echo Receipt", entries: profile.upstreamEchoes.javaV112 },
      { heading: "mini-kv v119 Non-Participation Receipt", entries: profile.upstreamEchoes.miniKvV119 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver plan-intake upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver plan-intake upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver plan-intake upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
