import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled implementation candidate review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      [
        "Ready for disabled implementation candidate review",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview,
      ],
      ["Ready for disabled resolver interface candidate", profile.readyForDisabledResolverInterfaceCandidate],
      ["Disabled implementation candidate review only", profile.disabledImplementationCandidateReviewOnly],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v272", entries: profile.sourceNodeV272 },
      {
        heading: "Candidate Review",
        entries: {
          candidateVersion: profile.disabledImplementationCandidate.candidateVersion,
          candidateMode: profile.disabledImplementationCandidate.candidateMode,
          sourceSpan: profile.disabledImplementationCandidate.sourceSpan,
          candidateDigest: profile.disabledImplementationCandidate.candidateDigest,
          candidateDecisionCount: profile.disabledImplementationCandidate.candidateDecisionCount,
          candidateReadyDecisionCount: profile.disabledImplementationCandidate.candidateReadyDecisionCount,
          approvalRequiredDecisionCount: profile.disabledImplementationCandidate.approvalRequiredDecisionCount,
          disabledInterfaceCandidateAllowed: profile.disabledImplementationCandidate.disabledInterfaceCandidateAllowed,
          fakeWiringReviewAllowed: profile.disabledImplementationCandidate.fakeWiringReviewAllowed,
          realResolverImplementationAllowed: profile.disabledImplementationCandidate.realResolverImplementationAllowed,
          secretProviderRuntimeAllowed: profile.disabledImplementationCandidate.secretProviderRuntimeAllowed,
          credentialValueReadAllowed: profile.disabledImplementationCandidate.credentialValueReadAllowed,
          rawEndpointUrlParseAllowed: profile.disabledImplementationCandidate.rawEndpointUrlParseAllowed,
          externalRequestAllowed: profile.disabledImplementationCandidate.externalRequestAllowed,
          schemaMigrationAllowed: profile.disabledImplementationCandidate.schemaMigrationAllowed,
          approvalLedgerWriteAllowed: profile.disabledImplementationCandidate.approvalLedgerWriteAllowed,
          automaticUpstreamStartAllowed: profile.disabledImplementationCandidate.automaticUpstreamStartAllowed,
        },
      },
      {
        heading: "Boundary Decisions",
        lines: profile.disabledImplementationCandidate.decisions.map(
          (decision) =>
            `- ${decision.code}: ${decision.disposition}; requirement=${decision.requirementFromV268}; owner=${decision.owner}; rule=${decision.candidateRule}`,
        ),
      },
      { heading: "Interface Shape", entries: profile.disabledImplementationCandidate.interfaceShape },
      { heading: "Fake Wiring Review", entries: profile.disabledImplementationCandidate.fakeWiringReview },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No disabled implementation candidate review blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No disabled implementation candidate review warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No disabled implementation candidate review recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
