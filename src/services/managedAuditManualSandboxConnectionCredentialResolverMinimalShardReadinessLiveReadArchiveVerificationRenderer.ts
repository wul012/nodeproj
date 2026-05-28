import { renderEntries, renderList, renderMessages } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
  MinimalShardReadinessLiveReadArchiveFileReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationTypes.js";
import type {
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver minimal shard readiness live-read archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive verification state: ${profile.archiveVerificationState}`,
    `- Archive verification decision: ${profile.archiveVerificationDecision}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Ready for Node v373 shard readiness compatibility report: ${profile.readyForNodeV373ShardReadinessCompatibilityReport}`,
    `- Archive verification only: ${profile.archiveVerificationOnly}`,
    `- Reruns live read: ${profile.rerunsLiveRead}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    `- Stops Java service: ${profile.stopsJavaService}`,
    `- Stops mini-kv service: ${profile.stopsMiniKvService}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Sends managed audit HTTP/TCP: ${profile.sendsManagedAuditHttpTcp}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Node v371",
    "",
    ...renderEntries(profile.sourceNodeV371),
    "",
    "## Archived Java Live Read",
    "",
    ...renderLiveRead(profile.liveReads.java),
    "",
    "## Archived mini-kv Live Read",
    "",
    ...renderLiveRead(profile.liveReads.miniKv),
    "",
    "## Archive Verification",
    "",
    ...renderEntries(profile.archiveVerification),
    "",
    "## Archive References",
    "",
    ...renderArchiveFileReferences([
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
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No production blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No recommendations."),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
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

function renderArchiveFileReferences(
  files: readonly MinimalShardReadinessLiveReadArchiveFileReference[],
): string[] {
  return files.map((file) =>
    `- ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest ?? "missing"}`);
}
