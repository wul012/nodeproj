import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v332 archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification],
      ["Ready for Node v333 disabled design draft outline intake", profile.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake],
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
        heading: "Source Node v331",
        entries: {
          candidateReviewState: profile.sourceNodeV331.candidateReviewState,
          candidateReviewDecision: profile.sourceNodeV331.candidateReviewDecision,
          readyForCandidateReview: profile.sourceNodeV331.readyForCandidateReview,
          readyForNodeV332ArchiveVerification: profile.sourceNodeV331.readyForNodeV332ArchiveVerification,
          candidateReviewDigest: profile.sourceNodeV331.candidateReviewDigest,
          sourceNodeV330Digest: profile.sourceNodeV331.sourceNodeV330Digest,
          sourceChecks: `${profile.sourceNodeV331.sourcePassedCheckCount}/${profile.sourceNodeV331.sourceCheckCount}`,
          sourceProductionBlockers: profile.sourceNodeV331.sourceProductionBlockerCount,
          reviewQuestions: profile.sourceNodeV331.reviewQuestionCount,
          stopConditions: profile.sourceNodeV331.stopConditionCount,
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
          opensDisabledDesignDraftOutlineNow: profile.archiveVerification.opensDisabledDesignDraftOutlineNow,
          implementsRuntimeShell: profile.archiveVerification.implementsRuntimeShell,
          invokesRuntimeShell: profile.archiveVerification.invokesRuntimeShell,
          requestsJavaMiniKvEcho: profile.archiveVerification.requestsJavaMiniKvEcho,
          readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake:
            profile.archiveVerification.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake,
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
          `- Source Node v331 checks: ${profile.summary.sourceNodeV331PassedCheckCount}/${profile.summary.sourceNodeV331CheckCount}`,
          `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
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
