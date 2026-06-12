import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v342 body preparation plan archive verification", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification],
      ["Ready for Node v343 body draft candidate", profile.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate],
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
        heading: "Source Node v341",
        entries: {
          preparationPlanState: profile.sourceNodeV341.preparationPlanState,
          preparationPlanDecision: profile.sourceNodeV341.preparationPlanDecision,
          readyForPreparationPlan: profile.sourceNodeV341.readyForPreparationPlan,
          readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification:
            profile.sourceNodeV341.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification,
          planDigest: profile.sourceNodeV341.planDigest,
          sourceArchiveVerificationDigest: profile.sourceNodeV341.sourceArchiveVerificationDigest,
          sourceDecisionDigest: profile.sourceNodeV341.sourceDecisionDigest,
          sourceChecks: `${profile.sourceNodeV341.sourcePassedCheckCount}/${profile.sourceNodeV341.sourceCheckCount}`,
          sourceArchiveFiles:
            `${profile.sourceNodeV341.sourcePresentArchiveFileCount}/${profile.sourceNodeV341.sourceArchiveFileCount}`,
          sourceProductionBlockers: profile.sourceNodeV341.sourceProductionBlockerCount,
          sourceSectionPlans: `${profile.sourceNodeV341.sourcePlannedSectionCount}/${profile.sourceNodeV341.sourceSectionPlanCount}`,
          sourceEvidenceMappings: profile.sourceNodeV341.sourceEvidenceMappingCount,
          sourceDraftGuards:
            `${profile.sourceNodeV341.sourceEnforcedDraftGuardCount}/${profile.sourceNodeV341.sourceDraftGuardCount}`,
          sourceStopConditions: profile.sourceNodeV341.sourceStopConditionCount,
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
          writesBodyDraftNow: profile.archiveVerification.writesBodyDraftNow,
          opensDisabledDesignDraftBodyNow: profile.archiveVerification.opensDisabledDesignDraftBodyNow,
          implementsRuntimeShell: profile.archiveVerification.implementsRuntimeShell,
          invokesRuntimeShell: profile.archiveVerification.invokesRuntimeShell,
          requestsJavaMiniKvEcho: profile.archiveVerification.requestsJavaMiniKvEcho,
          readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate:
            profile.archiveVerification.readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate,
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
          `- Source Node v341 checks: ${profile.summary.sourceNodeV341PassedCheckCount}/${profile.summary.sourceNodeV341CheckCount}`,
          `- Source archive files: ${profile.summary.sourcePresentArchiveFileCount}/${profile.summary.sourceArchiveFileCount}`,
          `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
          `- Source section plans: ${profile.summary.sourcePlannedSectionCount}/${profile.summary.sourceSectionPlanCount}`,
          `- Source evidence mappings: ${profile.summary.sourceEvidenceMappingCount}`,
          `- Source draft guards: ${profile.summary.sourceEnforcedDraftGuardCount}/${profile.summary.sourceDraftGuardCount}`,
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

