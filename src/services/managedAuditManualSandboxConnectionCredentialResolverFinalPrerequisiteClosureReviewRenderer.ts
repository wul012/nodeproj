import type {
  ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver final prerequisite closure review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Active Node version", profile.activeNodeReviewVersion],
      ["Source readiness version", profile.sourceNodeReadinessVersion],
      ["Target prerequisite id", profile.targetPrerequisiteId],
      ["All prerequisites closed", profile.allPrerequisitesClosed],
      [
        "Ready for final prerequisite closure review",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
      ],
      ["Ready for implementation candidate gate", profile.readyForImplementationCandidateGate],
      ["Ready for runtime shell implementation", profile.readyForRuntimeShellImplementation],
      ["Execution allowed", profile.executionAllowed],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Java SQL execution allowed", profile.javaSqlExecutionAllowed],
      ["Rollback execution allowed", profile.rollbackExecutionAllowed],
      ["mini-kv write command allowed", profile.miniKvWriteCommandAllowed],
      ["Automatic upstream start", profile.automaticUpstreamStart],
      ["Closure digest", profile.closureDigest],
    ],
    sections: [
      { heading: "Source Node v327", lines: renderSourceNodeV327(profile) },
      { heading: "Closure Review", lines: renderClosureReview(profile) },
      {
        heading: "Completed Prerequisites",
        lines: profile.closureReview.completedPrerequisites.map((entry) =>
          `- ${entry.id}: ${entry.closureState}; opensRuntimeShell=${entry.opensRuntimeShell}; evidence=${entry.evidence}`),
      },
      {
        heading: "Checks",
        lines: Object.entries(profile.checks).map(([key, value]) => `- ${key}: ${value}`),
      },
      { heading: "Summary", lines: renderSummary(profile) },
      {
        heading: "Production Blockers",
        lines: renderMessages(profile.productionBlockers, "No production blockers."),
      },
      { heading: "Warnings", lines: renderMessages(profile.warnings, "No warnings.") },
      {
        heading: "Recommendations",
        lines: renderMessages(profile.recommendations, "No recommendations."),
      },
      { heading: "Next Actions", lines: profile.nextActions.map((action) => `- ${action}`) },
    ],
  });
}

function renderSourceNodeV327(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile,
): string[] {
  return [
    `- Runner state: ${profile.sourceNodeV327.runnerState}`,
    `- Ready for read-only report: ${profile.sourceNodeV327.readyForReadOnlyCrossProjectReadinessReport}`,
    `- Ready for final closure review: ${profile.sourceNodeV327.readyForFinalPrerequisiteClosureReview}`,
    `- Readiness digest: ${profile.sourceNodeV327.readinessDigest}`,
    `- Source Node contract: ${profile.sourceNodeV327.sourceNodeContractVersion}`,
    `- Java evidence: ${profile.sourceNodeV327.sourceJavaVersion}`,
    `- mini-kv receipt: ${profile.sourceNodeV327.sourceMiniKvVersion}`,
    `- Java ready for Node consumption: ${profile.sourceNodeV327.javaV150ReadyForNodeConsumption}`,
    `- mini-kv ready for Node consumption: ${profile.sourceNodeV327.miniKvV142ReadyForNodeConsumption}`,
    `- Side effect safety matrix closed: ${profile.sourceNodeV327.sideEffectSafetyMatrixClosed}`,
    `- Source checks: ${profile.sourceNodeV327.sourcePassedCheckCount}/${profile.sourceNodeV327.sourceCheckCount}`,
    `- Source production blockers: ${profile.sourceNodeV327.sourceProductionBlockerCount}`,
  ];
}

function renderClosureReview(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile,
): string[] {
  return [
    `- Review digest: ${profile.closureReview.reviewDigest}`,
    `- Review mode: ${profile.closureReview.reviewMode}`,
    `- Source span: ${profile.closureReview.sourceSpan}`,
    `- Moved prerequisite: ${profile.closureReview.movedPrerequisiteId}`,
    `- Moved from: ${profile.closureReview.movedFrom}`,
    `- Moved to: ${profile.closureReview.movedTo}`,
    `- Completed prerequisites: ${profile.closureReview.completedPrerequisiteCount}/${profile.closureReview.originalPrerequisiteCount}`,
    `- Remaining prerequisites: ${profile.closureReview.remainingPrerequisiteCount}`,
    `- Next Node version: ${profile.closureReview.nextNodeVersionSuggested}`,
    `- Next step mode: ${profile.closureReview.nextStepMode}`,
    `- Runtime shell still blocked: ${profile.closureReview.runtimeShellStillBlocked}`,
    `- Closure reason: ${profile.closureReview.closureReason}`,
  ];
}

function renderSummary(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile,
): string[] {
  return [
    `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
    `- Source Node v327 checks: ${profile.summary.sourceNodeV327PassedCheckCount}/${profile.summary.sourceNodeV327CheckCount}`,
    `- Prerequisites: ${profile.summary.completedPrerequisiteCount}/${profile.summary.originalPrerequisiteCount}`,
    `- Remaining prerequisites: ${profile.summary.remainingPrerequisiteCount}`,
    `- Production blockers: ${profile.summary.productionBlockerCount}`,
    `- Warnings: ${profile.summary.warningCount}`,
    `- Recommendations: ${profile.summary.recommendationCount}`,
  ];
}

function renderMessages(
  messages: readonly { code: string; severity: string; source: string; message: string }[],
  emptyMessage: string,
): string[] {
  if (messages.length === 0) {
    return [`- ${emptyMessage}`];
  }
  return messages.map((message) => `- [${message.severity}] ${message.code} (${message.source}): ${message.message}`);
}
