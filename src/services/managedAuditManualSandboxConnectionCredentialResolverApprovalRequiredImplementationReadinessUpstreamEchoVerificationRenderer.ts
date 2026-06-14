import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver approval-required implementation readiness upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Ready for upstream echo verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification],
      ["Ready for managed audit resolver implementation", profile.readyForManagedAuditResolverImplementation],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v281", entries: profile.sourceNodeV281 },
      { heading: "Java v116 Echo", entries: omitEvidenceArrays(profile.upstreamEchoes.javaV116) },
      { heading: "mini-kv v122 Receipt", entries: omitEvidenceArrays(profile.upstreamEchoes.miniKvV122) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No approval-required implementation readiness upstream echo blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No approval-required implementation readiness upstream echo warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No approval-required implementation readiness upstream echo recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function omitEvidenceArrays<T extends { evidenceFiles: unknown; expectedSnippets: unknown }>(
  value: T,
): Omit<T, "evidenceFiles" | "expectedSnippets"> {
  const { evidenceFiles: _evidenceFiles, expectedSnippets: _expectedSnippets, ...rest } = value;
  return rest;
}
