import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
  ShardReadinessEvidenceAssessment,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver shard readiness contract consumer gate",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Gate state", profile.gateState],
      ["Gate decision", profile.gateDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for shard readiness contract consumer gate", profile.readyForShardReadinessContractConsumerGate],
      ["Ready for Node v371 minimal shard readiness live-read gate", profile.readyForNodeV371MinimalShardReadinessLiveReadGate],
      ["Contract consumer only", profile.contractConsumerOnly],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Mutates Java state", profile.mutatesJavaState],
      ["Mutates mini-kv state", profile.mutatesMiniKvState],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Credential value requested", profile.credentialValueRequested],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v369", entries: profile.sourceNodeV369 },
      { heading: "Gate", entries: profile.gate },
      { heading: "Java Shard Readiness", lines: renderShardReadiness(profile.javaShardReadiness) },
      { heading: "mini-kv Shard Readiness", lines: renderShardReadiness(profile.miniKvShardReadiness) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderShardReadiness(assessment: ShardReadinessEvidenceAssessment): string[] {
  return [
    `- Project: ${assessment.project}`,
    `- Source version: ${assessment.sourceVersion}`,
    `- Ready for Node consumption: ${assessment.readyForNodeConsumption}`,
    `- Required fields: ${assessment.presentRequiredFieldCount}/${assessment.requiredFieldCount}`,
    `- Missing fields: ${assessment.missingRequiredFields.length === 0 ? "none" : assessment.missingRequiredFields.join(", ")}`,
    `- Read only safe: ${assessment.readOnlySafe}`,
    `- Execution blocked: ${assessment.executionBlocked}`,
    `- Routing mode present: ${assessment.routingModePresent}`,
    `- Status accepted: ${assessment.statusAccepted}`,
    `- Source-specific prototype value accepted: ${assessment.sourceSpecificPrototypeValueAccepted}`,
    `- Boundary safe: ${assessment.boundarySafe}`,
    `- Evidence file: ${assessment.evidenceFile.configuredPath}`,
    `- Resolved path: ${assessment.evidenceFile.resolvedPath}`,
    `- Used historical fallback: ${assessment.evidenceFile.usedHistoricalFallback}`,
    `- Historical fallback available: ${assessment.evidenceFile.historicalFallbackAvailable}`,
    `- Digest: ${assessment.evidenceFile.digest ?? "missing"}`,
    "- Evidence:",
    ...renderEntries(assessment.evidence).map((line) => `  ${line}`),
  ];
}
