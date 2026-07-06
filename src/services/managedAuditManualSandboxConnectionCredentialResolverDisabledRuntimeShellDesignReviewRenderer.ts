import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
  renderReleaseReportTail,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design review",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Design review state": profile.designReviewState,
        "Ready for v295 design review":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
        "Recommends parallel upstream echo before runtime implementation":
          profile.recommendsParallelUpstreamEchoBeforeRuntimeImplementation,
        "Ready for Node v296 runtime shell implementation": profile.readyForNodeV296RuntimeShellImplementation,
        "Runtime shell implemented": profile.runtimeShellImplemented,
        "Runtime shell enabled": profile.runtimeShellEnabled,
        "Execution allowed": profile.executionAllowed,
        "Connects managed audit": profile.connectsManagedAudit,
      },
    ),
    ...renderReleaseReportEntriesSection("Source Node v294", profile.sourceNodeV294),
    ...renderReleaseReportEntriesSection("Design Review", {
      reviewVersion: profile.designReview.reviewVersion,
      reviewMode: profile.designReview.reviewMode,
      sourceSpan: profile.designReview.sourceSpan,
      reviewDigest: profile.designReview.reviewDigest,
      decision: profile.designReview.decision,
      runtimeShellImplementationAllowed:
        profile.designReview.runtimeShellImplementationAllowed,
      runtimeShellInvocationAllowed:
        profile.designReview.runtimeShellInvocationAllowed,
      credentialValueReadAllowed:
        profile.designReview.credentialValueReadAllowed,
      rawEndpointUrlParseAllowed:
        profile.designReview.rawEndpointUrlParseAllowed,
      providerClientInstantiationAllowed:
        profile.designReview.providerClientInstantiationAllowed,
      externalRequestAllowed: profile.designReview.externalRequestAllowed,
      schemaMigrationAllowed: profile.designReview.schemaMigrationAllowed,
      approvalLedgerWriteAllowed: profile.designReview.approvalLedgerWriteAllowed,
      automaticUpstreamStartAllowed:
        profile.designReview.automaticUpstreamStartAllowed,
    }),
    ...renderReleaseReportEntriesSection("Necessity", profile.designReview.necessity),
    ...renderReleaseReportLineSection(
      "Review Questions",
      profile.designReview.reviewQuestions.map((question) =>
      `- ${question.code}: ${question.answer}; evidence=${question.evidence}`),
    ),
    ...renderReleaseReportLineSection(
      "Recommended Parallel Work",
      profile.designReview.recommendedParallelWork.map((work) =>
      `- ${work.version} (${work.project}): ${work.task}; readOnly=${work.mustRemainReadOnly}; noRuntime=${work.mustNotImplementRuntime}`),
    ),
    ...renderReleaseReportLineSection(
      "Stop Conditions",
      profile.designReview.stopConditions.length === 0
        ? ["- No disabled runtime shell design review stop conditions."]
        : profile.designReview.stopConditions.map((condition) => `- ${condition}`),
    ),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", profile.summary),
    ...renderReleaseReportMessagesSection(
      "Production Blockers",
      profile.productionBlockers,
      "No disabled runtime shell design review blockers.",
    ),
    ...renderReleaseReportMessagesSection(
      "Warnings",
      profile.warnings,
      "No disabled runtime shell design review warnings.",
    ),
    ...renderReleaseReportMessagesSection(
      "Recommendations",
      profile.recommendations,
      "No disabled runtime shell design review recommendations.",
    ),
    ...renderReleaseReportTail(profile.evidenceEndpoints, profile.nextActions),
  ].join("\n");
}
