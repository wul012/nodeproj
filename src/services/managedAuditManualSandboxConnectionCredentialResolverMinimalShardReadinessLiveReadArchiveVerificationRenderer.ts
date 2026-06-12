import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationTypes.js";
import type {
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title:
      "Managed audit manual sandbox connection credential resolver minimal shard readiness live-read archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for Node v373 shard readiness compatibility report", profile.readyForNodeV373ShardReadinessCompatibilityReport],
      ["Archive verification only", profile.archiveVerificationOnly],
      ["Reruns live read", profile.rerunsLiveRead],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Stops Java service", profile.stopsJavaService],
      ["Stops mini-kv service", profile.stopsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v371", entries: profile.sourceNodeV371 },
      { heading: "Archived Java Live Read", lines: renderLiveRead(profile.liveReads.java) },
      { heading: "Archived mini-kv Live Read", lines: renderLiveRead(profile.liveReads.miniKv) },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      {
        heading: "Archive References",
        lines: renderVerificationArchiveFileReferenceLines([
          profile.archiveReferences.jsonEvidence,
          profile.archiveReferences.markdownEvidence,
          profile.archiveReferences.summaryEvidence,
          profile.archiveReferences.browserSnapshot,
          profile.archiveReferences.htmlArchive,
          profile.archiveReferences.screenshot,
          profile.archiveReferences.explanation,
          profile.archiveReferences.codeWalkthrough,
          profile.archiveReferences.sourcePlan,
          profile.archiveReferences.plansIndex,
          profile.archiveReferences.archiveIndex,
        ]),
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderLiveRead(read: MinimalShardReadinessLiveReadObservation | null): string[] {
  if (read === null) {
    return ["- missing"];
  }

  return [
    `- Project: ${read.project}`,
    `- Source version: ${read.sourceVersion}`,
    `- Status: ${read.status}`,
    `- Attempted: ${read.attempted}`,
    `- Transport: ${read.transport}`,
    `- Endpoint: ${read.endpoint}`,
    `- Command: ${read.command ?? "none"}`,
    `- Required fields: ${read.presentRequiredFieldCount}/${read.requiredFieldCount}`,
    `- Read only safe: ${read.readOnlySafe}`,
    `- Execution blocked: ${read.executionBlocked}`,
    `- Compatible with v370 evidence: ${read.compatibleWithV370Evidence}`,
    `- Boundary safe: ${read.boundarySafe}`,
    `- Ready for gate: ${read.readyForGate}`,
  ];
}
