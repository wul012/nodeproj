import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationProfile,
  MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver approval prerequisite artifact upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      {
        heading: "Source Node v306",
        entries: {
          sourceVersion: profile.sourceNodeV306.sourceVersion,
          profileVersion: profile.sourceNodeV306.profileVersion,
          planState: profile.sourceNodeV306.planState,
          readyForArtifactIntakePlan: profile.sourceNodeV306.readyForArtifactIntakePlan,
          artifactDigest: profile.sourceNodeV306.artifactDigest,
          sourceNodeVerificationVersion: profile.sourceNodeV306.sourceNodeVerificationVersion,
          nextJavaVersion: profile.sourceNodeV306.nextJavaVersion,
          nextMiniKvVersion: profile.sourceNodeV306.nextMiniKvVersion,
          nextNodeVerificationVersion: profile.sourceNodeV306.nextNodeVerificationVersion,
          readyForParallelJavaV142MiniKvV135Echo: profile.sourceNodeV306.readyForParallelJavaV142MiniKvV135Echo,
        },
      },
      { heading: "Java v142 Echo", lines: renderJavaReference(profile.upstreamEvidence.javaV142) },
      { heading: "mini-kv v135 Receipt", lines: renderMiniKvReference(profile.upstreamEvidence.miniKvV135) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No approval prerequisite artifact upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No approval prerequisite artifact upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No approval prerequisite artifact upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderJavaReference(reference: JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV306Plan: reference.echoesNodeV306Plan,
      readyForNodeV307: reference.readyForNodeV307,
      artifactContractEchoed: reference.artifactContractEchoed,
      requiredFieldCountEchoed: reference.requiredFieldCountEchoed,
      prohibitedFieldCountEchoed: reference.prohibitedFieldCountEchoed,
      rejectionReasonCountEchoed: reference.rejectionReasonCountEchoed,
      noGoBoundaryCountEchoed: reference.noGoBoundaryCountEchoed,
      upstreamEchoRequestsEchoed: reference.upstreamEchoRequestsEchoed,
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

function renderMiniKvReference(
  reference: MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference,
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
      echoesNodeV306Plan: reference.echoesNodeV306Plan,
      readyForNodeV307: reference.readyForNodeV307,
      sourceNodeV306ProfileVersion: reference.sourceNodeV306ProfileVersion,
      sourceNodeV306PlanState: reference.sourceNodeV306PlanState,
      sourceNodeV306ArtifactDigest: reference.sourceNodeV306ArtifactDigest,
      requiredFieldCount: reference.requiredFieldCount,
      prohibitedFieldCount: reference.prohibitedFieldCount,
      rejectionReasonCount: reference.rejectionReasonCount,
      noGoBoundaryCount: reference.noGoBoundaryCount,
      upstreamEchoRequestCount: reference.upstreamEchoRequestCount,
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
