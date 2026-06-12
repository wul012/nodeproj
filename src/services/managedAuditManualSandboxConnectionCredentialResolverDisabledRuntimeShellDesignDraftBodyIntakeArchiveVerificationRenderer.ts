import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body intake archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v336 body intake archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification],
      ["Ready for Node v337 disabled design draft body candidate review", profile.readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview],
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
        heading: "Source Node v335",
        entries: {
          bodyIntakeState: profile.sourceNodeV335.bodyIntakeState,
          bodyIntakeDecision: profile.sourceNodeV335.bodyIntakeDecision,
          readyForBodyIntake: profile.sourceNodeV335.readyForBodyIntake,
          readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification:
            profile.sourceNodeV335.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification,
          bodyIntakeDigest: profile.sourceNodeV335.bodyIntakeDigest,
          sourceArchiveVerificationDigest: profile.sourceNodeV335.sourceArchiveVerificationDigest,
          sourceChecks: `${profile.sourceNodeV335.sourcePassedCheckCount}/${profile.sourceNodeV335.sourceCheckCount}`,
          sourceProductionBlockers: profile.sourceNodeV335.sourceProductionBlockerCount,
          bodySections: profile.sourceNodeV335.bodySectionCount,
          evidenceItems: profile.sourceNodeV335.evidenceItemCount,
          stopConditions: profile.sourceNodeV335.stopConditionCount,
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
          readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview:
            profile.archiveVerification.readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview,
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
          `- Source Node v335 checks: ${profile.summary.sourceNodeV335PassedCheckCount}/${profile.summary.sourceNodeV335CheckCount}`,
          `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
          `- Source body sections: ${profile.summary.sourceBodySectionCount}`,
          `- Source evidence items: ${profile.summary.sourceEvidenceItemCount}`,
          `- Source stop conditions: ${profile.summary.sourceStopConditionCount}`,
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
