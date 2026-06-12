import type {
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver implementation plan draft",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Plan state", profile.planState],
      ["Ready for implementation plan draft", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft],
      ["Ready for Java v121 + mini-kv v126 echo", profile.readyForJavaV121MiniKvV126Echo],
      ["Ready for real resolver implementation", profile.readyForManagedAuditResolverImplementation],
      ["Real resolver implementation allowed", profile.realResolverImplementationAllowed],
      ["Test-only fake harness allowed", profile.testOnlyFakeHarnessAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v282", entries: profile.sourceNodeV282 },
      {
        heading: "Implementation Plan",
        entries: {
          planVersion: profile.implementationPlan.planVersion,
          planMode: profile.implementationPlan.planMode,
          sourceSpan: profile.implementationPlan.sourceSpan,
          planDigest: profile.implementationPlan.planDigest,
          interfaceBoundaryCount: profile.implementationPlan.interfaceBoundaryCount,
          requiredArtifactCount: profile.implementationPlan.requiredArtifactCount,
          prohibitedActionCount: profile.implementationPlan.prohibitedActionCount,
          allInterfaceBoundariesDefined: profile.implementationPlan.allInterfaceBoundariesDefined,
          allRequiredArtifactsNamed: profile.implementationPlan.allRequiredArtifactsNamed,
          realResolverImplementationAllowed: profile.implementationPlan.realResolverImplementationAllowed,
          testOnlyFakeHarnessAllowed: profile.implementationPlan.testOnlyFakeHarnessAllowed,
          secretProviderRuntimeAllowed: profile.implementationPlan.secretProviderRuntimeAllowed,
          credentialValueReadAllowed: profile.implementationPlan.credentialValueReadAllowed,
          rawEndpointUrlParseAllowed: profile.implementationPlan.rawEndpointUrlParseAllowed,
          rawEndpointUrlRenderAllowed: profile.implementationPlan.rawEndpointUrlRenderAllowed,
          externalRequestAllowed: profile.implementationPlan.externalRequestAllowed,
          schemaMigrationAllowed: profile.implementationPlan.schemaMigrationAllowed,
          approvalLedgerWriteAllowed: profile.implementationPlan.approvalLedgerWriteAllowed,
          automaticUpstreamStartAllowed: profile.implementationPlan.automaticUpstreamStartAllowed,
        },
      },
      {
        heading: "Interface Boundaries",
        lines: profile.implementationPlan.interfaceBoundaries.map((boundary) =>
          `- ${boundary.code}: ${boundary.status}; source=${boundary.sourceBoundary}; owner=${boundary.owner}; requiredArtifacts=${boundary.requiredArtifacts.join(",")}`),
      },
      {
        heading: "Java v121 Echo Requirements",
        lines: profile.implementationPlan.javaV121EchoRequirements.map((requirement) =>
          `- ${requirement.id}: ${requirement.requirement}`),
      },
      {
        heading: "mini-kv v126 Receipt Requirements",
        lines: profile.implementationPlan.miniKvV126ReceiptRequirements.map((requirement) =>
          `- ${requirement.id}: ${requirement.requirement}`),
      },
      { heading: "Implementation Plan Review", entries: profile.implementationPlanReview },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential resolver implementation plan draft blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential resolver implementation plan draft warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential resolver implementation plan draft recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
