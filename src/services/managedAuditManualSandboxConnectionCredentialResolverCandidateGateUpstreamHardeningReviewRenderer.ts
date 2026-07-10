import type {
  ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver candidate gate upstream hardening review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Upstream alignment decision", profile.upstreamAlignmentDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Java evidence export version", profile.sourceJavaEvidenceExportVersion],
      ["Java input-hardening echo version", profile.sourceJavaInputHardeningEchoVersion],
      ["mini-kv receipt version", profile.sourceMiniKvVersion],
      ["Ready for v330 review", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview],
      ["Ready for next Node design draft candidate review", profile.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate],
      ["Ready for disabled runtime shell design draft now", profile.readyForDisabledRuntimeShellDesignDraft],
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
      { heading: "Source Node v329", lines: renderSourceNodeLines(profile) },
      { heading: "Java Evidence", lines: renderJavaEvidenceLines(profile) },
      { heading: "mini-kv Evidence", lines: renderMiniKvEvidenceLines(profile) },
      { heading: "Hardening Review", lines: renderHardeningReviewLines(profile) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", lines: renderSummaryLines(profile) },
      { heading: "Production Blockers", lines: renderMessages(profile.productionBlockers, "No production blockers.") },
      { heading: "Warnings", lines: renderMessages(profile.warnings, "No warnings.") },
      { heading: "Recommendations", lines: renderMessages(profile.recommendations, "No recommendations.") },
      { heading: "Next Actions", lines: profile.nextActions.map((action) => `- ${action}`) },
    ],
  });
}

function renderSourceNodeLines(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
): string[] {
  return [
    `- Candidate gate state: ${profile.sourceNodeV329.candidateGateState}`,
    `- Ready for input-hardening decision: ${profile.sourceNodeV329.readyForInputHardeningDecision}`,
    `- Candidate gate decision: ${profile.sourceNodeV329.candidateGateDecision}`,
    `- Decision digest: ${profile.sourceNodeV329.decisionDigest}`,
    `- Input-hardening requirements: ${profile.sourceNodeV329.inputHardeningRequirementCount}`,
    `- No-go conditions: ${profile.sourceNodeV329.noGoConditionCount}`,
    `- Source checks: ${profile.sourceNodeV329.sourcePassedCheckCount}/${profile.sourceNodeV329.sourceCheckCount}`,
    `- Source production blockers: ${profile.sourceNodeV329.sourceProductionBlockerCount}`,
  ];
}

function renderJavaEvidenceLines(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
): string[] {
  return [
    `- Java v151 evidence path: ${profile.javaV151EvidenceExportHint.evidenceFile.path}`,
    `- Java v151 resolved path: ${profile.javaV151EvidenceExportHint.evidenceFile.resolvedPath}`,
    `- Java v151 present: ${profile.javaV151EvidenceExportHint.evidencePresent}`,
    `- Java v151 stable export ready: ${profile.javaV151EvidenceExportHint.readyForNodeConsumption}`,
    `- Java v152 evidence path: ${profile.javaV152InputHardeningDecisionEcho.evidenceFile.path}`,
    `- Java v152 resolved path: ${profile.javaV152InputHardeningDecisionEcho.evidenceFile.resolvedPath}`,
    `- Java v152 present: ${profile.javaV152InputHardeningDecisionEcho.evidencePresent}`,
    `- Java v152 consumes Node v329: ${profile.javaV152InputHardeningDecisionEcho.consumesNodeV329Decision}`,
    `- Java v152 confirms Java v151 export: ${profile.javaV152InputHardeningDecisionEcho.confirmsJavaV151StableEvidenceExport}`,
  ];
}

function renderMiniKvEvidenceLines(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
): string[] {
  return [
    `- Receipt path: ${profile.miniKvV143Receipt.evidenceFile.path}`,
    `- Resolved path: ${profile.miniKvV143Receipt.evidenceFile.resolvedPath}`,
    `- Receipt present: ${profile.miniKvV143Receipt.evidencePresent}`,
    `- Receipt version: ${profile.miniKvV143Receipt.receiptVersion}`,
    `- Project version: ${profile.miniKvV143Receipt.projectVersion}`,
    `- Release version: ${profile.miniKvV143Receipt.releaseVersion}`,
    `- Stable current receipt export ready: ${profile.miniKvV143Receipt.stableCurrentReceiptExportReady}`,
    `- Ready after Java v151: ${profile.miniKvV143Receipt.readyForNodeV330AfterJavaV151}`,
    `- Ready before Java v151: ${profile.miniKvV143Receipt.readyForNodeV330BeforeJavaV151}`,
    `- Ready for disabled design draft: ${profile.miniKvV143Receipt.readyForDisabledRuntimeShellDesignDraft}`,
    `- mini-kv LOAD allowed: ${profile.miniKvV143Receipt.miniKvLoadAllowed}`,
    `- mini-kv COMPACT allowed: ${profile.miniKvV143Receipt.miniKvCompactAllowed}`,
    `- mini-kv RESTORE allowed: ${profile.miniKvV143Receipt.miniKvRestoreAllowed}`,
    `- mini-kv SETNXEX allowed: ${profile.miniKvV143Receipt.miniKvSetnxexAllowed}`,
  ];
}

function renderHardeningReviewLines(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
): string[] {
  return [
    `- Review digest: ${profile.hardeningReview.reviewDigest}`,
    `- Record mode: ${profile.hardeningReview.recordMode}`,
    `- Decision: ${profile.hardeningReview.decision}`,
    `- Java export status: ${profile.hardeningReview.javaEvidenceExportStatus}`,
    `- Java echo status: ${profile.hardeningReview.javaInputHardeningEchoStatus}`,
    `- mini-kv receipt status: ${profile.hardeningReview.miniKvStableReceiptStatus}`,
    `- Allows design draft now: ${profile.hardeningReview.allowsDisabledRuntimeShellDesignDraftNow}`,
    `- Allows runtime implementation: ${profile.hardeningReview.allowsRuntimeShellImplementation}`,
    `- Allows credential value read: ${profile.hardeningReview.allowsCredentialValueRead}`,
    `- Allows raw endpoint URL parse: ${profile.hardeningReview.allowsRawEndpointUrlParse}`,
    `- Allows external request: ${profile.hardeningReview.allowsExternalRequest}`,
    `- Allows mini-kv write/admin command: ${profile.hardeningReview.allowsMiniKvWriteOrAdminCommand}`,
    `- Next Node version suggested: ${profile.hardeningReview.nextNodeVersionSuggested}`,
  ];
}

function renderSummaryLines(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile,
): string[] {
  return [
    `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
    `- Source Node v329 checks: ${profile.summary.sourceNodeV329PassedCheckCount}/${profile.summary.sourceNodeV329CheckCount}`,
    `- Java evidence files: ${profile.summary.javaEvidenceFileCount}`,
    `- Java snippets: ${profile.summary.javaMatchedSnippetCount}/${profile.summary.javaSnippetCount}`,
    `- mini-kv receipt files: ${profile.summary.miniKvReceiptFileCount}`,
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
