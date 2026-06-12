import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaV147EndpointHandleAllowlistApprovalContractEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationProfile,
  MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference,
  SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v320", lines: renderSourceNodeV320(profile.sourceNodeV320) },
      { heading: "Java v147 Echo", lines: renderJavaV147(profile.upstreamEvidence.javaV147) },
      { heading: "mini-kv v140 Receipt", lines: renderMiniKvV140(profile.upstreamEvidence.miniKvV140) },
      { heading: "Java v148 Quality Split", entries: profile.upstreamEvidence.javaV148QualitySplit },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No endpoint handle allowlist upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No endpoint handle allowlist upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No endpoint handle allowlist upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV320(
  reference: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    contractState: reference.contractState,
    readyForEndpointHandleAllowlistApprovalContractIntake:
      reference.readyForEndpointHandleAllowlistApprovalContractIntake,
    targetPrerequisiteId: reference.targetPrerequisiteId,
    contractDigest: reference.contractDigest,
    nextJavaVersion: reference.nextJavaVersion,
    nextMiniKvVersion: reference.nextMiniKvVersion,
    nextNodeVerificationVersion: reference.nextNodeVerificationVersion,
    readyForParallelJavaV147MiniKvV140Echo: reference.readyForParallelJavaV147MiniKvV140Echo,
    requiredFieldIds: reference.requiredFieldIds,
    prohibitedFieldIds: reference.prohibitedFieldIds,
    rejectionReasonCodes: reference.rejectionReasonCodes,
    noGoBoundaryIds: reference.noGoBoundaryIds,
    upstreamEchoRequestVersions: reference.upstreamEchoRequestVersions,
    executionAllowed: reference.executionAllowed,
    connectsManagedAudit: reference.connectsManagedAudit,
    credentialValueRead: reference.credentialValueRead,
    rawEndpointUrlParsed: reference.rawEndpointUrlParsed,
    externalRequestSent: reference.externalRequestSent,
  });
}

function renderJavaV147(reference: JavaV147EndpointHandleAllowlistApprovalContractEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV320Plan: reference.echoesNodeV320Plan,
      readyForNodeV321: reference.readyForNodeV321,
      endpointHandleAllowlistContractEchoed: reference.endpointHandleAllowlistContractEchoed,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; digest=${file.digest ?? "missing"}`),
      "No Java v147 evidence files.",
    ),
  ];
}

function renderMiniKvV140(
  reference: MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference,
): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      releaseVersion: reference.releaseVersion,
      consumerHint: reference.consumerHint,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      sourceNodeV320ContractDigest: reference.sourceNodeV320ContractDigest,
      echoesNodeV320Plan: reference.echoesNodeV320Plan,
      readyForNodeV321: reference.readyForNodeV321,
      requiredFieldCount: reference.requiredFieldCount,
      prohibitedFieldCount: reference.prohibitedFieldCount,
      rejectionReasonCount: reference.rejectionReasonCount,
      noGoBoundaryCount: reference.noGoBoundaryCount,
      upstreamEchoRequestCount: reference.upstreamEchoRequestCount,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
      endpointAuthorityClaimed: reference.endpointAuthorityClaimed,
      endpointAllowlistAuthority: reference.endpointAllowlistAuthority,
      auditAuthoritative: reference.auditAuthoritative,
      orderAuthoritative: reference.orderAuthoritative,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; digest=${file.digest ?? "missing"}`),
      "No mini-kv v140 evidence files.",
    ),
  ];
}
