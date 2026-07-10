import type {
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

type InputHardeningDecisionProfile =
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile;

export function renderManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionMarkdown(
  profile: InputHardeningDecisionProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver implementation candidate gate input-hardening decision",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Candidate gate state", profile.candidateGateState],
      ["Candidate gate decision", profile.candidateGateDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source closure version", profile.sourceNodeClosureVersion],
      ["Ready for candidate gate decision", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision],
      ["Ready for parallel Java v151 + mini-kv v143", profile.readyForParallelJavaV151MiniKvV143EchoRequest],
      ["Ready for Node v330 before upstream echo", profile.readyForNodeV330CandidateGateUpstreamAlignment],
      ["Ready for disabled runtime shell design draft", profile.readyForDisabledRuntimeShellDesignDraft],
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
    ],
    sections: [
      { heading: "Source Node v328", lines: renderSourceNodeLines(profile) },
      { heading: "Necessity Proof", lines: renderNecessityProofLines(profile) },
      { heading: "Decision Record", lines: renderDecisionRecordLines(profile) },
      {
        heading: "Input Hardening Requirements",
        lines: profile.decisionRecord.inputHardeningRequirements.map((entry) =>
          `- ${entry.id} [${entry.owner}] -> ${entry.requestedVersion}: ${entry.label}; status=${entry.status}; evidence=${entry.currentEvidence}`),
      },
      {
        heading: "No-Go Conditions",
        lines: profile.decisionRecord.explicitNoGoConditions.map((condition) =>
          `- ${condition.code}: ${condition.condition}; action=${condition.action}`),
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", lines: renderSummaryLines(profile) },
      { heading: "Production Blockers", lines: renderMessages(profile.productionBlockers, "No production blockers.") },
      { heading: "Warnings", lines: renderMessages(profile.warnings, "No warnings.") },
      { heading: "Recommendations", lines: renderMessages(profile.recommendations, "No recommendations.") },
      { heading: "Next Actions", lines: profile.nextActions.map((action) => `- ${action}`) },
    ],
  });
}

function renderSourceNodeLines(profile: InputHardeningDecisionProfile): string[] {
  return [
    `- Review state: ${profile.sourceNodeV328.reviewState}`,
    `- Ready for final closure review: ${profile.sourceNodeV328.readyForFinalPrerequisiteClosureReview}`,
    `- All prerequisites closed: ${profile.sourceNodeV328.allPrerequisitesClosed}`,
    `- Ready for implementation candidate gate: ${profile.sourceNodeV328.readyForImplementationCandidateGate}`,
    `- Closure digest: ${profile.sourceNodeV328.closureDigest}`,
    `- Source checks: ${profile.sourceNodeV328.sourcePassedCheckCount}/${profile.sourceNodeV328.sourceCheckCount}`,
    `- Source production blockers: ${profile.sourceNodeV328.sourceProductionBlockerCount}`,
  ];
}

function renderNecessityProofLines(profile: InputHardeningDecisionProfile): string[] {
  return [
    `- Blocker resolved: ${profile.necessityProof.blockerResolved}`,
    `- Consumer: ${profile.necessityProof.consumer}`,
    `- Why v328 cannot be reused: ${profile.necessityProof.whyV328CannotBeReused}`,
    `- Existing report reuse decision: ${profile.necessityProof.existingReportReuseDecision}`,
    `- Stop condition: ${profile.necessityProof.stopCondition}`,
    `- Proof complete: ${profile.necessityProof.proofComplete}`,
  ];
}

function renderDecisionRecordLines(profile: InputHardeningDecisionProfile): string[] {
  return [
    `- Decision digest: ${profile.decisionRecord.decisionDigest}`,
    `- Record mode: ${profile.decisionRecord.recordMode}`,
    `- Decision scope: ${profile.decisionRecord.decisionScope}`,
    `- Decision: ${profile.decisionRecord.decision}`,
    `- Candidate gate entered: ${profile.decisionRecord.candidateGateEntered}`,
    `- Allows parallel Java v151 + mini-kv v143: ${profile.decisionRecord.allowsParallelJavaV151MiniKvV143EchoRequest}`,
    `- Allows Node v330 before upstream echo: ${profile.decisionRecord.allowsNodeV330BeforeUpstreamEcho}`,
    `- Allows disabled runtime design draft: ${profile.decisionRecord.allowsDisabledRuntimeShellDesignDraft}`,
    `- Allows disabled runtime implementation: ${profile.decisionRecord.allowsDisabledRuntimeShellImplementation}`,
    `- Allows managed audit connection: ${profile.decisionRecord.allowsManagedAuditConnection}`,
    `- Allows mini-kv write/admin command: ${profile.decisionRecord.allowsMiniKvWriteOrAdminCommand}`,
    `- Decision reason: ${profile.decisionRecord.decisionReason}`,
  ];
}

function renderSummaryLines(profile: InputHardeningDecisionProfile): string[] {
  return [
    `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
    `- Source Node v328 checks: ${profile.summary.sourceNodeV328PassedCheckCount}/${profile.summary.sourceNodeV328CheckCount}`,
    `- Source production blockers: ${profile.summary.sourceProductionBlockerCount}`,
    `- Input hardening requirements: ${profile.summary.inputHardeningRequirementCount}`,
    `- No-go conditions: ${profile.summary.noGoConditionCount}`,
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
