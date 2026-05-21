import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver disabled runtime shell pre-plan intake",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Pre-plan intake state: ${profile.prePlanIntakeState}`,
    `- Ready for v294 pre-plan intake: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell enabled: ${profile.runtimeShellEnabled}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v293",
    "",
    ...renderEntries(profile.sourceNodeV293),
    "",
    "## Disabled Runtime Shell Pre-Plan",
    "",
    ...renderEntries({
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
    "",
    "## Boundaries",
    "",
    ...profile.disabledRuntimeShellPrePlan.boundaries.map((boundary) =>
      `- ${boundary.code}: ${boundary.status}; owner=${boundary.owner}; evidence=${boundary.verificationEvidence}`),
    "",
    "## Pre-Plan Intake",
    "",
    ...renderEntries(profile.prePlanIntake),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No disabled runtime shell pre-plan intake blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No disabled runtime shell pre-plan intake warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No disabled runtime shell pre-plan intake recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}
