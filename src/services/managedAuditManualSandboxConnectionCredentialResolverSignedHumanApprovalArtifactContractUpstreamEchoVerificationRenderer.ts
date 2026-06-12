import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile,
  MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver signed human approval artifact contract upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v314", lines: renderSourceNodeV314(profile.sourceNodeV314) },
      { heading: "Java v145 Echo", lines: renderJavaReference(profile.upstreamEvidence.javaV145) },
      { heading: "mini-kv v138 Receipt", lines: renderMiniKvReference(profile.upstreamEvidence.miniKvV138) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No signed human approval artifact contract upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No signed human approval artifact contract upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No signed human approval artifact contract upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV314(
  reference: ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile[
    "sourceNodeV314"
  ],
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    contractState: reference.contractState,
    readyForArtifactIntake: reference.readyForArtifactIntake,
    contractDigest: reference.contractDigest,
    nextJavaVersion: reference.nextJavaVersion,
    nextMiniKvVersion: reference.nextMiniKvVersion,
    nextNodeVerificationVersion: reference.nextNodeVerificationVersion,
    readyForParallelJavaV145MiniKvV138Echo: reference.readyForParallelJavaV145MiniKvV138Echo,
  });
}

function renderJavaReference(reference: JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV314Plan: reference.echoesNodeV314Plan,
      readyForNodeV315: reference.readyForNodeV315,
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
  reference: MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference,
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
      echoesNodeV314Plan: reference.echoesNodeV314Plan,
      readyForNodeV315: reference.readyForNodeV315,
      sourceNodeV314ProfileVersion: reference.sourceNodeV314ProfileVersion,
      sourceNodeV314ContractState: reference.sourceNodeV314ContractState,
      sourceNodeV314ContractDigest: reference.sourceNodeV314ContractDigest,
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


