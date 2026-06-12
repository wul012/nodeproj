import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v344 body draft candidate archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification],
      ["Ready for next disabled design draft step", profile.readyForNextDisabledDesignDraftStep],
      ["Ready for disabled runtime shell design draft", profile.readyForDisabledRuntimeShellDesignDraft],
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
        heading: "Source Node v343",
        entries: {
          draftCandidateState: profile.sourceNodeV343.draftCandidateState,
          draftCandidateDecision: profile.sourceNodeV343.draftCandidateDecision,
          readyForDraftCandidate: profile.sourceNodeV343.readyForDraftCandidate,
          readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification:
            profile.sourceNodeV343.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification,
          candidateDigest: profile.sourceNodeV343.candidateDigest,
          sourceArchiveVerificationDigest: profile.sourceNodeV343.sourceArchiveVerificationDigest,
          sourcePlanDigest: profile.sourceNodeV343.sourcePlanDigest,
          sourceChecks: `${profile.sourceNodeV343.sourcePassedCheckCount}/${profile.sourceNodeV343.sourceCheckCount}`,
          sourceProductionBlockers: profile.sourceNodeV343.sourceProductionBlockerCount,
          sourceSections: profile.sourceNodeV343.sourceSectionCount,
          sourceEvidenceCitations: profile.sourceNodeV343.sourceEvidenceCitationCount,
          sourceSafetyGuards: profile.sourceNodeV343.sourceSafetyGuardCount,
          sourceStopConditions: profile.sourceNodeV343.sourceStopConditionCount,
          writesDesignBodyText: profile.sourceNodeV343.writesDesignBodyText,
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
          verifiesCandidateDigest: profile.archiveVerification.verifiesCandidateDigest,
          rerunsSourceEndpoint: profile.archiveVerification.rerunsSourceEndpoint,
          writesDesignDraftNow: profile.archiveVerification.writesDesignDraftNow,
          implementsRuntimeShell: profile.archiveVerification.implementsRuntimeShell,
          invokesRuntimeShell: profile.archiveVerification.invokesRuntimeShell,
          requestsJavaMiniKvEcho: profile.archiveVerification.requestsJavaMiniKvEcho,
          readyForNextDisabledDesignDraftStep: profile.archiveVerification.readyForNextDisabledDesignDraftStep,
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
          `- Source Node v343 checks: ${profile.summary.sourceNodeV343PassedCheckCount}/${profile.summary.sourceNodeV343CheckCount}`,
          `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
          `- Source sections: ${profile.summary.sourceSectionCount}`,
          `- Source evidence citations: ${profile.summary.sourceEvidenceCitationCount}`,
          `- Source safety guards: ${profile.summary.sourceSafetyGuardCount}`,
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
