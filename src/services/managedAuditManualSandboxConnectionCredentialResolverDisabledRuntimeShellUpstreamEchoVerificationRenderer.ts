import {
  renderEntries,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver disabled runtime shell upstream echo verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for v296 upstream echo verification: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification}`,
    `- Planned Java version: ${profile.plannedJavaVersion}`,
    `- Actual Java echo version: ${profile.actualJavaEchoVersion}`,
    `- Ready for Node v297 candidate gate: ${profile.readyForNodeV297RuntimeShellImplementationCandidateGate}`,
    `- Ready for Node v297 runtime implementation: ${profile.readyForNodeV297RuntimeShellImplementation}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v295",
    "",
    ...renderEntries(profile.sourceNodeV295),
    "",
    "## Java v133 Handoff Echo",
    "",
    ...renderEntries({
      sourceVersion: profile.upstreamEvidence.javaV133.sourceVersion,
      plannedVersionCorrection: profile.upstreamEvidence.javaV133.plannedVersionCorrection,
      evidencePresent: profile.upstreamEvidence.javaV133.evidencePresent,
      verificationDocumented: profile.upstreamEvidence.javaV133.verificationDocumented,
      handoffEchoPresent: profile.upstreamEvidence.javaV133.handoffEchoPresent,
      readyForNodeV296: profile.upstreamEvidence.javaV133.readyForNodeV296,
      handoffEchoMode: profile.upstreamEvidence.javaV133.handoffEchoMode,
      designReviewEchoed: profile.upstreamEvidence.javaV133.designReviewEchoed,
      parallelUpstreamEchoRequestEchoed:
        profile.upstreamEvidence.javaV133.parallelUpstreamEchoRequestEchoed,
      noRuntimeImplementation:
        profile.upstreamEvidence.javaV133.noRuntimeImplementation,
      noRuntimeInvocation: profile.upstreamEvidence.javaV133.noRuntimeInvocation,
      credentialValueBoundaryClosed:
        profile.upstreamEvidence.javaV133.credentialValueBoundaryClosed,
      rawEndpointBoundaryClosed:
        profile.upstreamEvidence.javaV133.rawEndpointBoundaryClosed,
      providerClientBoundaryClosed:
        profile.upstreamEvidence.javaV133.providerClientBoundaryClosed,
      connectionBoundaryClosed:
        profile.upstreamEvidence.javaV133.connectionBoundaryClosed,
      ledgerSqlSchemaBoundaryClosed:
        profile.upstreamEvidence.javaV133.ledgerSqlSchemaBoundaryClosed,
      automaticUpstreamStartBlocked:
        profile.upstreamEvidence.javaV133.automaticUpstreamStartBlocked,
    }),
    "",
    "## mini-kv v130 Receipt",
    "",
    ...renderEntries({
      sourceVersion: profile.upstreamEvidence.miniKvV130.sourceVersion,
      evidencePresent: profile.upstreamEvidence.miniKvV130.evidencePresent,
      verificationDocumented: profile.upstreamEvidence.miniKvV130.verificationDocumented,
      receiptVersion: profile.upstreamEvidence.miniKvV130.receiptVersion,
      releaseVersion: profile.upstreamEvidence.miniKvV130.releaseVersion,
      consumerHint: profile.upstreamEvidence.miniKvV130.consumerHint,
      receiptDigest: profile.upstreamEvidence.miniKvV130.receiptDigest,
      sourceNodeV295Ready: profile.upstreamEvidence.miniKvV130.sourceNodeV295Ready,
      miniKvNonParticipationRecorded:
        profile.upstreamEvidence.miniKvV130.miniKvNonParticipationRecorded,
      readyForNodeV296: profile.upstreamEvidence.miniKvV130.readyForNodeV296,
      readOnly: profile.upstreamEvidence.miniKvV130.readOnly,
      executionAllowed: profile.upstreamEvidence.miniKvV130.executionAllowed,
      runtimeShellImplemented:
        profile.upstreamEvidence.miniKvV130.runtimeShellImplemented,
      runtimeShellInvocationAllowed:
        profile.upstreamEvidence.miniKvV130.runtimeShellInvocationAllowed,
      disabledRuntimeShellParticipates:
        profile.upstreamEvidence.miniKvV130.disabledRuntimeShellParticipates,
      credentialValueRead: profile.upstreamEvidence.miniKvV130.credentialValueRead,
      rawEndpointUrlParsed: profile.upstreamEvidence.miniKvV130.rawEndpointUrlParsed,
      externalRequestSent: profile.upstreamEvidence.miniKvV130.externalRequestSent,
      loadRestoreCompactExecuted:
        profile.upstreamEvidence.miniKvV130.loadRestoreCompactExecuted,
      setnxexExecutionAllowed:
        profile.upstreamEvidence.miniKvV130.setnxexExecutionAllowed,
      auditAuthoritative: profile.upstreamEvidence.miniKvV130.auditAuthoritative,
      orderAuthoritative: profile.upstreamEvidence.miniKvV130.orderAuthoritative,
    }),
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
    ...renderMessages(profile.productionBlockers, "No disabled runtime shell upstream echo verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No disabled runtime shell upstream echo verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No disabled runtime shell upstream echo verification recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...profile.nextActions.map((action) => `- ${action}`),
    "",
  ].join("\n");
}
