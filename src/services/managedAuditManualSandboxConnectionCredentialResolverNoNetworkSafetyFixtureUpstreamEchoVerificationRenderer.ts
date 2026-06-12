import { renderEntries, renderList } from "./liveProbeReportUtils.js";
import type {
  JavaV149NoNetworkSafetyFixtureContractEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationProfile,
  MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference,
  SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver no-network safety fixture upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      ["Runtime shell chain decision", profile.runtimeShellChainDecision],
      [
        "Ready for verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification,
      ],
      ["Active Node verification version", profile.activeNodeVerificationVersion],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Network safety fixture executed", profile.networkSafetyFixtureExecuted],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v323", lines: renderSourceNodeV323(profile.sourceNodeV323) },
      { heading: "Java v149 Echo", lines: renderJavaV149(profile.upstreamEvidence.javaV149) },
      { heading: "mini-kv v141 Receipt", lines: renderMiniKvV141(profile.upstreamEvidence.miniKvV141) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No no-network safety fixture upstream echo blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No no-network safety fixture upstream echo warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No no-network safety fixture upstream echo recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderSourceNodeV323(reference: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference): string[] {
  return renderEntries({
    sourceVersion: reference.sourceVersion,
    profileVersion: reference.profileVersion,
    contractState: reference.contractState,
    readyForNoNetworkSafetyFixtureContractIntake: reference.readyForNoNetworkSafetyFixtureContractIntake,
    targetPrerequisiteId: reference.targetPrerequisiteId,
    contractDigest: reference.contractDigest,
    nextJavaVersion: reference.nextJavaVersion,
    nextMiniKvVersion: reference.nextMiniKvVersion,
    nextNodeVerificationVersion: reference.nextNodeVerificationVersion,
    readyForParallelJavaV149MiniKvV141Echo: reference.readyForParallelJavaV149MiniKvV141Echo,
    requiredFieldIds: reference.requiredFieldIds,
    prohibitedFieldIds: reference.prohibitedFieldIds,
    rejectionReasonCodes: reference.rejectionReasonCodes,
    noGoBoundaryIds: reference.noGoBoundaryIds,
    upstreamEchoRequestVersions: reference.upstreamEchoRequestVersions,
    networkSafetyFixtureExecuted: reference.networkSafetyFixtureExecuted,
    httpRequestSent: reference.httpRequestSent,
    tcpConnectionAttempted: reference.tcpConnectionAttempted,
    externalRequestSent: reference.externalRequestSent,
  });
}

function renderJavaV149(reference: JavaV149NoNetworkSafetyFixtureContractEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      echoesNodeV323Plan: reference.echoesNodeV323Plan,
      readyForNodeV324: reference.readyForNodeV324,
      noNetworkSafetyFixtureContractEchoed: reference.noNetworkSafetyFixtureContractEchoed,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; digest=${file.digest ?? "missing"}`),
      "No Java v149 evidence files.",
    ),
  ];
}

function renderMiniKvV141(reference: MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      releaseVersion: reference.releaseVersion,
      consumerHint: reference.consumerHint,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      sourceNodeV323ContractDigest: reference.sourceNodeV323ContractDigest,
      echoesNodeV323Plan: reference.echoesNodeV323Plan,
      readyForNodeV324: reference.readyForNodeV324,
      requiredFieldCount: reference.requiredFieldCount,
      prohibitedFieldCount: reference.prohibitedFieldCount,
      rejectionReasonCount: reference.rejectionReasonCount,
      noGoBoundaryCount: reference.noGoBoundaryCount,
      upstreamEchoRequestCount: reference.upstreamEchoRequestCount,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
      networkSafetyFixtureExecuted: reference.networkSafetyFixtureExecuted,
      networkSafetyAuthority: reference.networkSafetyAuthority,
      httpRequestSent: reference.httpRequestSent,
      tcpConnectionAttempted: reference.tcpConnectionAttempted,
      networkSocketOpened: reference.networkSocketOpened,
      auditAuthoritative: reference.auditAuthoritative,
      orderAuthoritative: reference.orderAuthoritative,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; digest=${file.digest ?? "missing"}`),
      "No mini-kv v141 evidence files.",
    ),
  ];
}
