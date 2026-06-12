import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationProfile,
  MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver runtime shell chain stop/prerequisite upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v304", entries: profile.sourceNodeV304 },
      { heading: "Java v141 Echo", lines: renderJavaReference(profile.upstreamEvidence.javaV141) },
      { heading: "mini-kv v134 Receipt", lines: renderMiniKvReference(profile.upstreamEvidence.miniKvV134) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No runtime shell chain stop/prerequisite upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No runtime shell chain stop/prerequisite upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No runtime shell chain stop/prerequisite upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderJavaReference(reference: JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV304Decision: reference.echoesNodeV304Decision,
      readyForNodeV305: reference.readyForNodeV305,
      prerequisiteCountEchoed: reference.prerequisiteCountEchoed,
      noGoConditionCountEchoed: reference.noGoConditionCountEchoed,
      necessityProofEchoed: reference.necessityProofEchoed,
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

function renderMiniKvReference(reference: MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      releaseVersion: reference.releaseVersion,
      consumerHint: reference.consumerHint,
      receiptDigest: reference.receiptDigest,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV304Decision: reference.echoesNodeV304Decision,
      readyForNodeV305: reference.readyForNodeV305,
      decisionRecordState: reference.decisionRecordState,
      runtimeShellChainDecision: reference.runtimeShellChainDecision,
      selectedPath: reference.selectedPath,
      prerequisiteCount: reference.prerequisiteCount,
      missingRuntimePrerequisiteCount: reference.missingRuntimePrerequisiteCount,
      noGoConditionCount: reference.noGoConditionCount,
      nonParticipationReceiptOnly: reference.nonParticipationReceiptOnly,
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
