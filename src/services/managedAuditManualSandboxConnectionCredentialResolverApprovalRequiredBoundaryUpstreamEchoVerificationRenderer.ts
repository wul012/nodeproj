import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver approval-required boundary upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for approval-required boundary upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
      ],
      ["Read-only upstream echo verification", profile.readOnlyUpstreamEchoVerification],
      ["Approval-required boundary echo verification only", profile.approvalRequiredBoundaryEchoVerificationOnly],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v274", entries: profile.sourceNodeV274 },
      { heading: "Java v115 Echo Refinement", entries: profile.upstreamEchoes.javaV115 },
      { heading: "mini-kv v121 Non-Participation Receipt", entries: profile.upstreamEchoes.miniKvV121 },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No approval-required boundary upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No approval-required boundary upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No approval-required boundary upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
