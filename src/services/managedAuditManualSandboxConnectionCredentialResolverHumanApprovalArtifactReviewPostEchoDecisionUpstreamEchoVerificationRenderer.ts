import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationProfile,
  MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference,
  SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver human approval artifact review post-echo decision upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v310", lines: renderSourceNodeV310(profile.sourceNodeV310) },
      { heading: "Java v144 Echo", lines: renderJavaReference(profile.upstreamEvidence.javaV144) },
      { heading: "mini-kv v137 Receipt", lines: renderMiniKvReference(profile.upstreamEvidence.miniKvV137) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No human approval artifact review post-echo decision upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No human approval artifact review post-echo decision upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No human approval artifact review post-echo decision upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV310(reference: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    decisionGateState: reference.decisionGateState,
    readyForHumanApprovalArtifactReviewPostEchoDecisionGate:
      reference.readyForHumanApprovalArtifactReviewPostEchoDecisionGate,
    readOnlyDecisionGate: reference.readOnlyDecisionGate,
    decisionDigest: reference.decisionDigest,
    sourceSpan: reference.sourceSpan,
    decision: reference.decision,
    selectedPath: reference.selectedPath,
    allowsParallelJavaV144MiniKvV137EchoRequest: reference.allowsParallelJavaV144MiniKvV137EchoRequest,
    allowsNodeV311BeforeUpstreamEcho: reference.allowsNodeV311BeforeUpstreamEcho,
    prerequisiteCount: reference.prerequisiteCount,
    missingPrerequisiteCount: reference.missingPrerequisiteCount,
    noGoConditionCount: reference.noGoConditionCount,
  });
}

function renderJavaReference(reference: JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV310DecisionGate: reference.echoesNodeV310DecisionGate,
      readyForNodeV311: reference.readyForNodeV311,
      decisionGateContractEchoed: reference.decisionGateContractEchoed,
      prerequisiteCountEchoed: reference.prerequisiteCountEchoed,
      missingPrerequisiteCountEchoed: reference.missingPrerequisiteCountEchoed,
      noGoConditionCountEchoed: reference.noGoConditionCountEchoed,
      necessityProofEchoed: reference.necessityProofEchoed,
      parallelEchoRequestEchoed: reference.parallelEchoRequestEchoed,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; size=${file.sizeBytes}; resolved=${file.resolvedPath}`),
      "No Java evidence files.",
    ),
    "",
    "### Expected Snippets",
    "",
    ...renderList(
      reference.expectedSnippets.map((snippet) => `${snippet.id}: matched=${snippet.matched}; resolved=${snippet.resolvedPath}`),
      "No Java expected snippets.",
    ),
  ];
}

function renderMiniKvReference(
  reference: MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference,
): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      releaseVersion: reference.releaseVersion,
      consumerHint: reference.consumerHint,
      receiptDigest: reference.receiptDigest,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV310DecisionGate: reference.echoesNodeV310DecisionGate,
      readyForNodeV311: reference.readyForNodeV311,
      sourceNodeV310ProfileVersion: reference.sourceNodeV310ProfileVersion,
      sourceNodeV310DecisionGateState: reference.sourceNodeV310DecisionGateState,
      sourceNodeV310DecisionDigest: reference.sourceNodeV310DecisionDigest,
      prerequisiteCount: reference.prerequisiteCount,
      missingPrerequisiteCount: reference.missingPrerequisiteCount,
      noGoConditionCount: reference.noGoConditionCount,
      readOnlyDecisionGate: reference.readOnlyDecisionGate,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; size=${file.sizeBytes}; resolved=${file.resolvedPath}`),
      "No mini-kv evidence files.",
    ),
    "",
    "### Expected Snippets",
    "",
    ...renderList(
      reference.expectedSnippets.map((snippet) => `${snippet.id}: matched=${snippet.matched}; resolved=${snippet.resolvedPath}`),
      "No mini-kv expected snippets.",
    ),
  ];
}
