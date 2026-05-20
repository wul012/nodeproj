import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver approval-required implementation readiness upstream echo verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for upstream echo verification: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification}`,
    `- Ready for managed audit resolver implementation: ${profile.readyForManagedAuditResolverImplementation}`,
    `- Real resolver implementation allowed: ${profile.realResolverImplementationAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v281",
    "",
    ...renderEntries(profile.sourceNodeV281),
    "",
    "## Java v116 Echo",
    "",
    ...renderEntries(omitEvidenceArrays(profile.upstreamEchoes.javaV116)),
    "",
    "## mini-kv v122 Receipt",
    "",
    ...renderEntries(omitEvidenceArrays(profile.upstreamEchoes.miniKvV122)),
    "",
    "## Echo Verification",
    "",
    ...renderEntries(profile.echoVerification),
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
    ...renderMessages(profile.productionBlockers, "No approval-required implementation readiness upstream echo blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No approval-required implementation readiness upstream echo warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No approval-required implementation readiness upstream echo recommendations."),
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

function omitEvidenceArrays<T extends { evidenceFiles: unknown; expectedSnippets: unknown }>(
  value: T,
): Omit<T, "evidenceFiles" | "expectedSnippets"> {
  const { evidenceFiles: _evidenceFiles, expectedSnippets: _expectedSnippets, ...rest } = value;
  return rest;
}
