import type {
  ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver pre-implementation plan intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Plan intake state", profile.planIntakeState],
      [
        "Ready for pre-implementation plan intake",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake,
      ],
      ["Plan intake only", profile.planIntakeOnly],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v269", entries: profile.sourceNodeV269 },
      {
        heading: "Pre-Implementation Plan",
        entries: {
          planVersion: profile.preImplementationPlan.planVersion,
          planMode: profile.preImplementationPlan.planMode,
          sourceSpan: profile.preImplementationPlan.sourceSpan,
          planDigest: profile.preImplementationPlan.planDigest,
          boundaryCount: profile.preImplementationPlan.boundaryCount,
          definedBoundaryCount: profile.preImplementationPlan.definedBoundaryCount,
          allRequiredBoundariesDefined: profile.preImplementationPlan.allRequiredBoundariesDefined,
          realResolverImplementationAllowed: profile.preImplementationPlan.realResolverImplementationAllowed,
          secretProviderRuntimeAllowed: profile.preImplementationPlan.secretProviderRuntimeAllowed,
          credentialValueReadAllowed: profile.preImplementationPlan.credentialValueReadAllowed,
          rawEndpointUrlParseAllowed: profile.preImplementationPlan.rawEndpointUrlParseAllowed,
          externalRequestAllowed: profile.preImplementationPlan.externalRequestAllowed,
          schemaMigrationAllowed: profile.preImplementationPlan.schemaMigrationAllowed,
          approvalLedgerWriteAllowed: profile.preImplementationPlan.approvalLedgerWriteAllowed,
          automaticUpstreamStartAllowed: profile.preImplementationPlan.automaticUpstreamStartAllowed,
        },
      },
      {
        heading: "Boundaries",
        lines: profile.preImplementationPlan.boundaries.map((boundary) =>
          `- ${boundary.code}: ${boundary.status}; requirement=${boundary.requirementFromV268}; owner=${boundary.owner}; evidence=${boundary.verificationEvidence}`),
      },
      { heading: "Plan Intake", entries: profile.planIntake },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver pre-implementation plan intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver pre-implementation plan intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver pre-implementation plan intake recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
