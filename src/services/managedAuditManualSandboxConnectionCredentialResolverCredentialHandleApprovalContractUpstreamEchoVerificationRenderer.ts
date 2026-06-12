import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaV146CredentialHandleApprovalContractIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationProfile,
  MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference,
  SourceNodeV317CredentialHandleApprovalContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver credential handle approval contract upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Credential value read", profile.credentialValueRead],
    ],
    sections: [
      { heading: "Source Node v317", lines: renderSourceNodeV317(profile.sourceNodeV317) },
      { heading: "Java v146 Echo", lines: renderJavaV146(profile.upstreamEvidence.javaV146) },
      { heading: "mini-kv v139 Receipt", lines: renderMiniKvV139(profile.upstreamEvidence.miniKvV139) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No credential handle approval contract upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No credential handle approval contract upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No credential handle approval contract upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV317(reference: SourceNodeV317CredentialHandleApprovalContractIntakeReference): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    contractState: reference.contractState,
    readyForCredentialHandleApprovalContractIntake: reference.readyForCredentialHandleApprovalContractIntake,
    contractDigest: reference.contractDigest,
    targetPrerequisiteId: reference.targetPrerequisiteId,
    nextJavaVersion: reference.nextJavaVersion,
    nextMiniKvVersion: reference.nextMiniKvVersion,
    nextNodeVerificationVersion: reference.nextNodeVerificationVersion,
    readyForParallelJavaV146MiniKvV139Echo: reference.readyForParallelJavaV146MiniKvV139Echo,
    requiredFieldIds: reference.requiredFieldIds,
    prohibitedFieldIds: reference.prohibitedFieldIds,
    rejectionReasonCodes: reference.rejectionReasonCodes,
    noGoBoundaryIds: reference.noGoBoundaryIds,
    upstreamEchoRequestVersions: reference.upstreamEchoRequestVersions,
    runtimeShellImplemented: reference.runtimeShellImplemented,
    executionAllowed: reference.executionAllowed,
    connectsManagedAudit: reference.connectsManagedAudit,
    credentialValueRead: reference.credentialValueRead,
    rawEndpointUrlParsed: reference.rawEndpointUrlParsed,
    externalRequestSent: reference.externalRequestSent,
  });
}

function renderJavaV146(reference: JavaV146CredentialHandleApprovalContractIntakeEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      expectedProfileVersion: reference.expectedProfileVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV317Plan: reference.echoesNodeV317Plan,
      readyForNodeV318: reference.readyForNodeV318,
      credentialHandleContractEchoed: reference.credentialHandleContractEchoed,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; digest=${file.digest}; resolved=${file.resolvedPath}`),
      "No Java v146 evidence files.",
    ),
  ];
}

function renderMiniKvV139(reference: MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      releaseVersion: reference.releaseVersion,
      consumerHint: reference.consumerHint,
      receiptDigest: reference.receiptDigest,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV317Plan: reference.echoesNodeV317Plan,
      readyForNodeV318: reference.readyForNodeV318,
      sourceNodeV317ProfileVersion: reference.sourceNodeV317ProfileVersion,
      sourceNodeV317ContractState: reference.sourceNodeV317ContractState,
      sourceNodeV317ContractDigest: reference.sourceNodeV317ContractDigest,
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
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; digest=${file.digest}; resolved=${file.resolvedPath}`),
      "No mini-kv v139 evidence files.",
    ),
  ];
}
