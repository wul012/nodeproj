import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell pre-plan intake",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Pre-plan intake state": profile.prePlanIntakeState,
        "Ready for v294 pre-plan intake":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake,
        "Runtime shell implemented": profile.runtimeShellImplemented,
        "Runtime shell enabled": profile.runtimeShellEnabled,
        "Execution allowed": profile.executionAllowed,
        "Connects managed audit": profile.connectsManagedAudit,
      },
    ),
    ...renderReleaseReportEntriesSection("Source Node v293", profile.sourceNodeV293),
    ...renderReleaseReportEntriesSection("Disabled Runtime Shell Pre-Plan", {
      planVersion: profile.disabledRuntimeShellPrePlan.planVersion,
      planMode: profile.disabledRuntimeShellPrePlan.planMode,
      sourceSpan: profile.disabledRuntimeShellPrePlan.sourceSpan,
      shellName: profile.disabledRuntimeShellPrePlan.shellName,
      planDigest: profile.disabledRuntimeShellPrePlan.planDigest,
      boundaryCount: profile.disabledRuntimeShellPrePlan.boundaryCount,
      definedBoundaryCount: profile.disabledRuntimeShellPrePlan.definedBoundaryCount,
      allRequiredBoundariesDefined:
        profile.disabledRuntimeShellPrePlan.allRequiredBoundariesDefined,
      runtimeShellImplementationAllowed:
        profile.disabledRuntimeShellPrePlan.runtimeShellImplementationAllowed,
      runtimeShellInvocationAllowed:
        profile.disabledRuntimeShellPrePlan.runtimeShellInvocationAllowed,
      fakeHarnessRuntimeAllowed:
        profile.disabledRuntimeShellPrePlan.fakeHarnessRuntimeAllowed,
      credentialValueReadAllowed:
        profile.disabledRuntimeShellPrePlan.credentialValueReadAllowed,
      rawEndpointUrlParseAllowed:
        profile.disabledRuntimeShellPrePlan.rawEndpointUrlParseAllowed,
      providerClientInstantiationAllowed:
        profile.disabledRuntimeShellPrePlan.providerClientInstantiationAllowed,
      externalRequestAllowed:
        profile.disabledRuntimeShellPrePlan.externalRequestAllowed,
      schemaMigrationAllowed:
        profile.disabledRuntimeShellPrePlan.schemaMigrationAllowed,
      approvalLedgerWriteAllowed:
        profile.disabledRuntimeShellPrePlan.approvalLedgerWriteAllowed,
      automaticUpstreamStartAllowed:
        profile.disabledRuntimeShellPrePlan.automaticUpstreamStartAllowed,
    }),
    ...renderReleaseReportLineSection(
      "Boundaries",
      profile.disabledRuntimeShellPrePlan.boundaries.map((boundary) =>
      `- ${boundary.code}: ${boundary.status}; owner=${boundary.owner}; evidence=${boundary.verificationEvidence}`),
    ),
    ...renderReleaseReportEntriesSection("Pre-Plan Intake", profile.prePlanIntake),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No disabled runtime shell pre-plan intake blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No disabled runtime shell pre-plan intake warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No disabled runtime shell pre-plan intake recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}
