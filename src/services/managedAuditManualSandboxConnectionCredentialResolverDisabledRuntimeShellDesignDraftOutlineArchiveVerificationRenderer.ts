import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft outline archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v334 archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification],
      ["Ready for Node v335 disabled design draft body intake", profile.readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake],
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
        heading: "Source Node v333",
        entries: {
          outlineIntakeState: profile.sourceNodeV333.outlineIntakeState,
          outlineIntakeDecision: profile.sourceNodeV333.outlineIntakeDecision,
          readyForOutlineIntake: profile.sourceNodeV333.readyForOutlineIntake,
          readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification:
            profile.sourceNodeV333.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification,
          outlineIntakeDigest: profile.sourceNodeV333.outlineIntakeDigest,
          sourceArchiveVerificationDigest: profile.sourceNodeV333.sourceArchiveVerificationDigest,
          sourceChecks: `${profile.sourceNodeV333.sourcePassedCheckCount}/${profile.sourceNodeV333.sourceCheckCount}`,
          sourceProductionBlockers: profile.sourceNodeV333.sourceProductionBlockerCount,
          sections: profile.sourceNodeV333.sectionCount,
          stopConditions: profile.sourceNodeV333.stopConditionCount,
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
          readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake:
            profile.archiveVerification.readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake,
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
          `- Source Node v333 checks: ${profile.summary.sourceNodeV333PassedCheckCount}/${profile.summary.sourceNodeV333CheckCount}`,
          `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
          `- Source sections: ${profile.summary.sourceSectionCount}`,
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
