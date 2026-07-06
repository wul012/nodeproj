import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeTypes.js";
import {
  renderReleaseReportEntriesSection,
  renderReleaseReportHeader,
  renderReleaseReportLineSection,
  renderReleaseReportMessagesSection,
} from "./releaseReportShared.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeProfile,
): string {
  return [
    ...renderReleaseReportHeader(
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft outline intake",
      {
        Service: profile.service,
        "Generated at": profile.generatedAt,
        "Profile version": profile.profileVersion,
        "Outline intake state": profile.outlineIntakeState,
        "Outline intake decision": profile.outlineIntakeDecision,
        "Active Node version": profile.activeNodeVersion,
        "Source Node version": profile.sourceNodeVersion,
        "Ready for v333 outline intake":
          profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake,
        "Ready for Node v334 archive verification":
          profile.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification,
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
    ...renderReleaseReportEntriesSection("Source Node v332", {
      archiveVerificationState: profile.sourceNodeV332.archiveVerificationState,
      archiveVerificationDecision: profile.sourceNodeV332.archiveVerificationDecision,
      readyForArchiveVerification: profile.sourceNodeV332.readyForArchiveVerification,
      readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake:
        profile.sourceNodeV332.readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake,
      archiveVerificationDigest: profile.sourceNodeV332.archiveVerificationDigest,
      sourceCandidateReviewDigest: profile.sourceNodeV332.sourceCandidateReviewDigest,
      sourceChecks: `${profile.sourceNodeV332.sourcePassedCheckCount}/${profile.sourceNodeV332.sourceCheckCount}`,
      archiveFiles: `${profile.sourceNodeV332.presentArchiveFileCount}/${profile.sourceNodeV332.archiveFileCount}`,
      sourceProductionBlockers: profile.sourceNodeV332.sourceProductionBlockerCount,
    }),
    ...renderReleaseReportEntriesSection("Necessity Proof", profile.necessityProof),
    ...renderReleaseReportEntriesSection("Outline Intake", profile.outlineIntake),
    ...renderReleaseReportLineSection(
      "Outline Section Catalog",
      profile.outlineSections.flatMap((section) => [
      `- ${section.id}: ${section.title}`,
      `  - Question: ${section.intakeQuestion}`,
      `  - Allowed: ${section.allowedContent}`,
      `  - Forbidden: ${section.forbiddenContent}`,
      `  - Requires future archive verification: ${section.requiresFutureArchiveVerification}`,
    ]),
    ),
    ...renderReleaseReportLineSection(
      "Stop Conditions",
      profile.stopConditions.map((entry) => `- ${entry.code}: ${entry.condition}; action=${entry.action}`),
    ),
    ...renderReleaseReportEntriesSection("Checks", profile.checks),
    ...renderReleaseReportEntriesSection("Summary", {
      Checks: `${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
      "Source Node v332 checks":
        `${profile.summary.sourceNodeV332PassedCheckCount}/${profile.summary.sourceNodeV332CheckCount}`,
      "Source archive files":
        `${profile.summary.sourcePresentArchiveFileCount}/${profile.summary.sourceArchiveFileCount}`,
      "Outline sections": profile.summary.sectionCount,
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
