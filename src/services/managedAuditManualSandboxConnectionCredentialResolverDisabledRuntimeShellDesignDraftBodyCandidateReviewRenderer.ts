import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate review",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Body candidate review state": profile.bodyCandidateReviewState,
        "Body candidate review decision": profile.bodyCandidateReviewDecision,
        "Active Node version": profile.activeNodeVersion,
        "Source Node version": profile.sourceNodeVersion,
        "Ready for v337 body candidate review":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview,
        "Ready for Node v338 body candidate archive verification":
          profile.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification,
        "Ready for disabled runtime shell design draft": profile.readyForDisabledRuntimeShellDesignDraft,
        "Ready for disabled runtime shell design draft outline": profile.readyForDisabledRuntimeShellDesignDraftOutline,
        "Ready for runtime shell implementation": profile.readyForRuntimeShellImplementation,
        "Execution allowed": profile.executionAllowed,
        "Credential value read": profile.credentialValueRead,
        "Raw endpoint URL parsed": profile.rawEndpointUrlParsed,
        "HTTP request sent": profile.httpRequestSent,
        "TCP connection attempted": profile.tcpConnectionAttempted,
        "Java SQL execution allowed": profile.javaSqlExecutionAllowed,
        "mini-kv write command allowed": profile.miniKvWriteCommandAllowed,
        "Automatic upstream start": profile.automaticUpstreamStart,
      },
    ),
    ...renderReleaseReportEntriesSection("Source Node v336", {
      archiveVerificationState: profile.sourceNodeV336.archiveVerificationState,
      archiveVerificationDecision: profile.sourceNodeV336.archiveVerificationDecision,
      readyForArchiveVerification: profile.sourceNodeV336.readyForArchiveVerification,
      readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview:
        profile.sourceNodeV336.readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview,
      archiveVerificationDigest: profile.sourceNodeV336.archiveVerificationDigest,
      sourceBodyIntakeDigest: profile.sourceNodeV336.sourceBodyIntakeDigest,
      sourceChecks: `${profile.sourceNodeV336.sourcePassedCheckCount}/${profile.sourceNodeV336.sourceCheckCount}`,
      archiveFiles: `${profile.sourceNodeV336.presentArchiveFileCount}/${profile.sourceNodeV336.archiveFileCount}`,
      sourceProductionBlockers: profile.sourceNodeV336.sourceProductionBlockerCount,
      sourceBodySections: profile.sourceNodeV336.sourceBodySectionCount,
      sourceEvidenceItems: profile.sourceNodeV336.sourceEvidenceItemCount,
      sourceStopConditions: profile.sourceNodeV336.sourceStopConditionCount,
    }),
    ...renderReleaseReportEntriesSection("Necessity Proof", profile.necessityProof),
    ...renderReleaseReportEntriesSection("Body Candidate Review", profile.bodyCandidateReview),
    ...renderReleaseReportLineSection(
      "Review Questions",
      profile.reviewQuestions.flatMap((entry) => [
      `- ${entry.id}: ${entry.question}`,
      `  - Answer: ${entry.answer}`,
      `  - Answered: ${entry.answered}`,
    ]),
    ),
    ...renderReleaseReportLineSection(
      "Stop Conditions",
      profile.stopConditions.map((entry) => `- ${entry.code}: ${entry.condition}; action=${entry.action}`),
    ),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", {
      Checks: `${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
      "Source Node v336 checks":
        `${profile.summary.sourceNodeV336PassedCheckCount}/${profile.summary.sourceNodeV336CheckCount}`,
      "Source archive files":
        `${profile.summary.sourcePresentArchiveFileCount}/${profile.summary.sourceArchiveFileCount}`,
      "Source body sections": profile.summary.sourceBodySectionCount,
      "Source evidence items": profile.summary.sourceEvidenceItemCount,
      "Source stop conditions": profile.summary.sourceStopConditionCount,
      "Review questions": `${profile.summary.answeredReviewQuestionCount}/${profile.summary.reviewQuestionCount}`,
      "Stop conditions": profile.summary.stopConditionCount,
      "Production blockers": profile.summary.productionBlockerCount,
      Warnings: profile.summary.warningCount,
      Recommendations: profile.summary.recommendationCount,
    }),
    ...renderReleaseReportMessagesSection("Production Blockers", profile.productionBlockers, "No production blockers."),
    ...renderReleaseReportMessagesSection("Warnings", profile.warnings, "No warnings."),
    ...renderReleaseReportMessagesSection("Recommendations", profile.recommendations, "No recommendations."),
    ...renderReleaseReportLineSection("Next Actions", profile.nextActions.map((item) => `- ${item}`)),
  ].join("\n");
}
