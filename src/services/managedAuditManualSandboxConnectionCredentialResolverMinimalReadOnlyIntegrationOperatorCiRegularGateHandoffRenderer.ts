import type {
  FrozenContractReference,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile,
  OperatorCiRegularGateHandoffFileReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration operator/CI regular gate handoff",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Handoff state", profile.handoffState],
      ["Handoff decision", profile.handoffDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for parallel mini-kv shard readiness prototype", profile.readyForParallelMiniKvShardReadinessPrototype],
      ["Ready for parallel Java shard readiness echo", profile.readyForParallelJavaShardReadinessEcho],
      ["Ready for Node v370 shard readiness contract consumer gate", profile.readyForNodeV370ShardReadinessContractConsumerGate],
      ["Handoff only", profile.handoffOnly],
      ["Contract freeze included", profile.contractFreezeIncluded],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Credential value requested", profile.credentialValueRequested],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL requested", profile.rawEndpointUrlRequested],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v368", entries: profile.sourceNodeV368 },
      { heading: "Handoff", entries: profile.handoff },
      { heading: "Frozen Contracts", lines: profile.frozenContracts.flatMap(renderContract) },
      { heading: "Parallel Shard Readiness Plan", entries: profile.parallelShardReadinessPlan },
      { heading: "Source Archive References", lines: renderArchiveFileReferences(Object.values(profile.archiveReferences)) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderContract(contract: FrozenContractReference): string[] {
  return [
    `- ${contract.contractVersion}:`,
    `  - contractState: ${contract.contractState}`,
    `  - path: ${contract.path}`,
    `  - exists: ${contract.exists}`,
    `  - digest: ${contract.digest ?? "missing"}`,
    `  - requiredFieldCount: ${contract.requiredFieldCount}`,
    `  - requiredFields: ${JSON.stringify(contract.requiredFields)}`,
    `  - readOnlyRequired: ${contract.readOnlyRequired}`,
    `  - executionAllowedRequired: ${contract.executionAllowedRequired}`,
    `  - automaticUpstreamStartAllowed: ${contract.automaticUpstreamStartAllowed}`,
  ];
}

function renderArchiveFileReferences(files: readonly OperatorCiRegularGateHandoffFileReference[]): string[] {
  return files.map((file) =>
    `- ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest ?? "missing"}`);
}
