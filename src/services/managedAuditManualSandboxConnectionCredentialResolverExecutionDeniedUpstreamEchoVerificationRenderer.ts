import {
  renderEntries,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver execution-denied upstream echo verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for upstream echo verification: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification}`,
    `- Java execution-denied echo missing: ${profile.javaExecutionDeniedEchoMissing}`,
    `- mini-kv execution-denied receipt ready: ${profile.miniKvExecutionDeniedReceiptReady}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Node v290",
    "",
    ...renderEntries(profile.sourceNodeV290),
    "",
    "## Java v127-v130 Quality Evidence",
    "",
    ...renderEntries({
      evidencePresent: profile.upstreamEvidence.javaV127V130.evidencePresent,
      verificationDocumented: profile.upstreamEvidence.javaV127V130.verificationDocumented,
      evidenceDigest: profile.upstreamEvidence.javaV127V130.evidenceDigest,
      completedVersions: profile.upstreamEvidence.javaV127V130.completedVersions,
      liveAggregationSecondSplitDocumented:
        profile.upstreamEvidence.javaV127V130.liveAggregationSecondSplitDocumented,
      responseRecordsSecondSplitDocumented:
        profile.upstreamEvidence.javaV127V130.responseRecordsSecondSplitDocumented,
      overviewTestsSecondSplitDocumented:
        profile.upstreamEvidence.javaV127V130.overviewTestsSecondSplitDocumented,
      echoCatalogExtensionDocumented:
        profile.upstreamEvidence.javaV127V130.echoCatalogExtensionDocumented,
      noFakeHarnessRuntimeDocumented:
        profile.upstreamEvidence.javaV127V130.noFakeHarnessRuntimeDocumented,
      javaQualityEvidenceReady:
        profile.upstreamEvidence.javaV127V130.javaQualityEvidenceReady,
      javaExecutionDeniedEchoPresent:
        profile.upstreamEvidence.javaV127V130.javaExecutionDeniedEchoPresent,
    }),
    "",
    "## mini-kv v128 Receipt",
    "",
    ...renderEntries({
      evidencePresent: profile.upstreamEvidence.miniKvV128.evidencePresent,
      verificationDocumented: profile.upstreamEvidence.miniKvV128.verificationDocumented,
      receiptDigest: profile.upstreamEvidence.miniKvV128.receiptDigest,
      receiptVersion: profile.upstreamEvidence.miniKvV128.receiptVersion,
      releaseVersion: profile.upstreamEvidence.miniKvV128.releaseVersion,
      consumerHint: profile.upstreamEvidence.miniKvV128.consumerHint,
      sourcePreflight: profile.upstreamEvidence.miniKvV128.sourcePreflight,
      sourcePreflightState: profile.upstreamEvidence.miniKvV128.sourcePreflightState,
      preflightDigest: profile.upstreamEvidence.miniKvV128.preflightDigest,
      readyForNodeV291UpstreamEchoVerification:
        profile.upstreamEvidence.miniKvV128.readyForNodeV291UpstreamEchoVerification,
      readOnly: profile.upstreamEvidence.miniKvV128.readOnly,
      executionAllowed: profile.upstreamEvidence.miniKvV128.executionAllowed,
      actualExecutionAttemptCount:
        profile.upstreamEvidence.miniKvV128.actualExecutionAttemptCount,
      fakeHarnessRuntimeImplemented:
        profile.upstreamEvidence.miniKvV128.fakeHarnessRuntimeImplemented,
      credentialValueRead: profile.upstreamEvidence.miniKvV128.credentialValueRead,
      rawEndpointUrlParsed: profile.upstreamEvidence.miniKvV128.rawEndpointUrlParsed,
      externalRequestSent: profile.upstreamEvidence.miniKvV128.externalRequestSent,
      connectsManagedAudit: profile.upstreamEvidence.miniKvV128.connectsManagedAudit,
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
    ...renderMessages(profile.productionBlockers, "No execution-denied upstream echo blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No execution-denied upstream echo warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No execution-denied upstream echo recommendations."),
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
