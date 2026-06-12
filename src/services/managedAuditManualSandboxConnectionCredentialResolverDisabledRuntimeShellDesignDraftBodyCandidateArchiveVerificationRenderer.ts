import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v338 body candidate archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification],
      ["Ready for Node v339 pre-draft decision", profile.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision],
      ["Ready for disabled runtime shell design draft", profile.readyForDisabledRuntimeShellDesignDraft],
      ["Ready for disabled runtime shell design draft outline", profile.readyForDisabledRuntimeShellDesignDraftOutline],
      ["Ready for runtime shell implementation", profile.readyForRuntimeShellImplementation],
      ["Execution allowed", profile.executionAllowed],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Java SQL execution allowed", profile.javaSqlExecutionAllowed],
      ["mini-kv write command allowed", profile.miniKvWriteCommandAllowed],
      ["Automatic upstream start", profile.automaticUpstreamStart],
    ],
    sections: [
      {
        heading: "Source Node v337",
        entries: {
          bodyCandidateReviewState: profile.sourceNodeV337.bodyCandidateReviewState,
          bodyCandidateReviewDecision: profile.sourceNodeV337.bodyCandidateReviewDecision,
          readyForBodyCandidateReview: profile.sourceNodeV337.readyForBodyCandidateReview,
          readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification:
            profile.sourceNodeV337.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification,
          reviewDigest: profile.sourceNodeV337.reviewDigest,
          sourceArchiveVerificationDigest: profile.sourceNodeV337.sourceArchiveVerificationDigest,
          sourceBodyIntakeDigest: profile.sourceNodeV337.sourceBodyIntakeDigest,
          sourceChecks: `${profile.sourceNodeV337.sourcePassedCheckCount}/${profile.sourceNodeV337.sourceCheckCount}`,
          sourceArchiveFiles:
            `${profile.sourceNodeV337.sourcePresentArchiveFileCount}/${profile.sourceNodeV337.sourceArchiveFileCount}`,
          sourceProductionBlockers: profile.sourceNodeV337.sourceProductionBlockerCount,
          bodySections: profile.sourceNodeV337.sourceBodySectionCount,
          evidenceItems: profile.sourceNodeV337.sourceEvidenceItemCount,
          stopConditions: profile.sourceNodeV337.sourceStopConditionCount,
          reviewQuestions:
            `${profile.sourceNodeV337.answeredReviewQuestionCount}/${profile.sourceNodeV337.reviewQuestionCount}`,
        },
      },
      {
        heading: "Archive Verification",
        entries: {
          verificationDigest: profile.archiveVerification.verificationDigest,
          verificationMode: profile.archiveVerification.verificationMode,
          sourceSpan: profile.archiveVerification.sourceSpan,
          decision: profile.archiveVerification.decision,
          archiveRoot: profile.archiveVerification.archiveRoot,
          verifiesRouteAndMarkdown: profile.archiveVerification.verifiesRouteAndMarkdown,
          verifiesSmokeSummary: profile.archiveVerification.verifiesSmokeSummary,
          verifiesScreenshotAndExplanation: profile.archiveVerification.verifiesScreenshotAndExplanation,
          verifiesCodeWalkthroughAndPlanIndex: profile.archiveVerification.verifiesCodeWalkthroughAndPlanIndex,
          verifiesHistoricalFallbackArchive: profile.archiveVerification.verifiesHistoricalFallbackArchive,
          rerunsSourceEndpoint: profile.archiveVerification.rerunsSourceEndpoint,
          opensDisabledDesignDraftBodyNow: profile.archiveVerification.opensDisabledDesignDraftBodyNow,
          implementsRuntimeShell: profile.archiveVerification.implementsRuntimeShell,
          invokesRuntimeShell: profile.archiveVerification.invokesRuntimeShell,
          requestsJavaMiniKvEcho: profile.archiveVerification.requestsJavaMiniKvEcho,
          readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision:
            profile.archiveVerification.readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision,
          nextNodeVersionSuggested: profile.archiveVerification.nextNodeVersionSuggested,
        },
      },
      {
        heading: "Archive References",
        lines: renderArchiveFileReferences([
          profile.archiveReferences.jsonEvidence,
          profile.archiveReferences.markdownEvidence,
          profile.archiveReferences.smokeSummary,
          profile.archiveReferences.routeSnapshot,
          profile.archiveReferences.browserSnapshot,
          profile.archiveReferences.htmlArchive,
          profile.archiveReferences.screenshot,
          profile.archiveReferences.explanation,
          profile.archiveReferences.codeWalkthrough,
          profile.archiveReferences.activePlan,
          profile.archiveReferences.plansIndex,
        ]),
      },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Summary",
        lines: [
          `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
          `- Source Node v337 checks: ${profile.summary.sourceNodeV337PassedCheckCount}/${profile.summary.sourceNodeV337CheckCount}`,
          `- Source archive files: ${profile.summary.sourcePresentArchiveFileCount}/${profile.summary.sourceArchiveFileCount}`,
          `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
          `- Source body sections: ${profile.summary.sourceBodySectionCount}`,
          `- Source evidence items: ${profile.summary.sourceEvidenceItemCount}`,
          `- Source stop conditions: ${profile.summary.sourceStopConditionCount}`,
          `- Review questions: ${profile.summary.answeredReviewQuestionCount}/${profile.summary.reviewQuestionCount}`,
          `- Archive files present: ${profile.summary.presentArchiveFileCount}/${profile.summary.archiveFileCount}`,
          `- Production blockers: ${profile.summary.productionBlockerCount}`,
          `- Warnings: ${profile.summary.warningCount}`,
          `- Recommendations: ${profile.summary.recommendationCount}`,
        ],
      },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No production blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No recommendations.",
      },
      {
        heading: "Next Actions",
        lines: profile.nextActions.map((item) => `- ${item}`),
      },
    ],
  });
}

function renderArchiveFileReferences(files: readonly ArchiveFileReference[]): string[] {
  return files.map((file) =>
    `- ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest ?? "missing"}`);
}
