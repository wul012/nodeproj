import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Pre-draft decision state": profile.preDraftDecisionState,
        "Pre-draft decision": profile.preDraftDecision,
        "Active Node version": profile.activeNodeVersion,
        "Source Node version": profile.sourceNodeVersion,
        "Ready for v339 pre-draft decision":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision,
        "Ready for Node v340 pre-draft decision archive verification":
          profile.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification,
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
    ...renderReleaseReportEntriesSection("Source Node v338", {
      archiveVerificationState: profile.sourceNodeV338.archiveVerificationState,
      archiveVerificationDecision: profile.sourceNodeV338.archiveVerificationDecision,
      readyForArchiveVerification: profile.sourceNodeV338.readyForArchiveVerification,
      readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision:
        profile.sourceNodeV338.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision,
      archiveVerificationDigest: profile.sourceNodeV338.archiveVerificationDigest,
      sourceReviewDigest: profile.sourceNodeV338.sourceReviewDigest,
      sourceChecks: `${profile.sourceNodeV338.sourcePassedCheckCount}/${profile.sourceNodeV338.sourceCheckCount}`,
      sourceArchiveFiles:
        `${profile.sourceNodeV338.sourcePresentArchiveFileCount}/${profile.sourceNodeV338.sourceArchiveFileCount}`,
      sourceProductionBlockers: profile.sourceNodeV338.sourceProductionBlockerCount,
      sourceBodySections: profile.sourceNodeV338.sourceBodySectionCount,
      sourceEvidenceItems: profile.sourceNodeV338.sourceEvidenceItemCount,
      sourceStopConditions: profile.sourceNodeV338.sourceStopConditionCount,
      sourceReviewQuestions:
        `${profile.sourceNodeV338.sourceAnsweredReviewQuestionCount}/${profile.sourceNodeV338.sourceReviewQuestionCount}`,
    }),
    ...renderReleaseReportEntriesSection("Necessity Proof", profile.necessityProof),
    ...renderReleaseReportEntriesSection("Pre-Draft Decision", profile.preDraftDecisionRecord),
    ...renderReleaseReportLineSection(
      "Decision Questions",
      profile.decisionQuestions.flatMap((entry) => [
      `- ${entry.id}: ${entry.question}`,
      `  - Answer: ${entry.answer}`,
      `  - Answered: ${entry.answered}`,
    ]),
    ),
    ...renderReleaseReportLineSection(
      "Preparation Controls",
      profile.preparationControls.map((entry) =>
      `- ${entry.id}: ${entry.control}; enforced=${entry.enforced}`),
    ),
    ...renderReleaseReportLineSection(
      "Stop Conditions",
      profile.stopConditions.map((entry) => `- ${entry.code}: ${entry.condition}; action=${entry.action}`),
    ),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", {
      Checks: `${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
      "Source Node v338 checks":
        `${profile.summary.sourceNodeV338PassedCheckCount}/${profile.summary.sourceNodeV338CheckCount}`,
      "Source archive files":
        `${profile.summary.sourcePresentArchiveFileCount}/${profile.summary.sourceArchiveFileCount}`,
      "Source body sections": profile.summary.sourceBodySectionCount,
      "Source evidence items": profile.summary.sourceEvidenceItemCount,
      "Source stop conditions": profile.summary.sourceStopConditionCount,
      "Source review questions":
        `${profile.summary.sourceAnsweredReviewQuestionCount}/${profile.summary.sourceReviewQuestionCount}`,
      "Decision questions": `${profile.summary.answeredDecisionQuestionCount}/${profile.summary.decisionQuestionCount}`,
      "Preparation controls":
        `${profile.summary.enforcedPreparationControlCount}/${profile.summary.preparationControlCount}`,
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
