import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile,
  ShardReadinessEvidenceAssessment,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Evidence consumption state", profile.evidenceConsumptionState],
      ["Evidence consumption decision", profile.evidenceConsumptionDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for Node v377 archive verification", profile.readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Mutates Java state", profile.mutatesJavaState],
      ["Mutates mini-kv state", profile.mutatesMiniKvState],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v375", entries: profile.sourceNodeV375 },
      { heading: "Java v154 Shard Readiness", lines: renderShardReadiness(profile.javaShardReadiness) },
      { heading: "mini-kv v145 Shard Readiness", lines: renderShardReadiness(profile.miniKvShardReadiness) },
      { heading: "Evidence Consumption", entries: profile.evidenceConsumption },
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
    `- Status accepted: ${assessment.statusAccepted}`,
    `- Hardening explains fields: ${assessment.hardeningExplainsFields}`,
    `- Source core linked: ${assessment.sourceCoreLinked}`,
    `- Boundary safe: ${assessment.boundarySafe}`,
    `- Preserves archived Node evidence: ${assessment.preservesArchivedNodeEvidence}`,
    `- Hardening file: ${assessment.hardeningFile.configuredPath}`,
    `- Resolved hardening path: ${assessment.hardeningFile.resolvedPath}`,
    `- Used historical fallback: ${assessment.hardeningFile.usedHistoricalFallback}`,
    `- Source core file: ${assessment.sourceCoreFile?.configuredPath ?? "not-applicable"}`,
    "- Evidence:",
    ...renderEntries(assessment.evidence).map((line) => `  ${line}`),
  ];
}
