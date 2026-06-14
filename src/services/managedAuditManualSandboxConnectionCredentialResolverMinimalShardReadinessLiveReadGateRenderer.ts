import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile,
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal shard readiness live-read gate",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Gate state", profile.gateState],
      ["Gate decision", profile.gateDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for minimal shard readiness live-read gate", profile.readyForMinimalShardReadinessLiveReadGate],
      ["Ready for Node v372 archive verification", profile.readyForNodeV372LiveReadArchiveVerification],
      ["Live read only", profile.liveReadOnly],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Mutates Java state", profile.mutatesJavaState],
      ["Mutates mini-kv state", profile.mutatesMiniKvState],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v370", entries: profile.sourceNodeV370 },
      { heading: "Gate", entries: profile.gate },
      { heading: "Java Live Read", lines: renderLiveRead(profile.liveReads.java) },
      { heading: "mini-kv Live Read", lines: renderLiveRead(profile.liveReads.miniKv) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderLiveRead(read: MinimalShardReadinessLiveReadObservation): string[] {
  return [
    `- Project: ${read.project}`,
    `- Source version: ${read.sourceVersion}`,
    `- Status: ${read.status}`,
    `- Attempted: ${read.attempted}`,
    `- Transport: ${read.transport}`,
    `- Endpoint: ${read.endpoint}`,
    `- Command: ${read.command ?? "none"}`,
    `- Status code: ${read.statusCode ?? "none"}`,
    `- Latency ms: ${read.latencyMs ?? "none"}`,
    `- Error code: ${read.errorCode ?? "none"}`,
    `- Error message: ${read.errorMessage ?? "none"}`,
    `- Required fields: ${read.presentRequiredFieldCount}/${read.requiredFieldCount}`,
    `- Missing fields: ${read.missingRequiredFields.length === 0 ? "none" : read.missingRequiredFields.join(", ")}`,
    `- Read only safe: ${read.readOnlySafe}`,
    `- Execution blocked: ${read.executionBlocked}`,
    `- Compatible with v370 evidence: ${read.compatibleWithV370Evidence}`,
    `- Boundary safe: ${read.boundarySafe}`,
    `- Ready for gate: ${read.readyForGate}`,
  ];
}
