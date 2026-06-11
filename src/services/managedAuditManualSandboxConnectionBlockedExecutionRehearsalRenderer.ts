import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  BlockedExecutionAttempt,
  BlockedExecutionEvidenceFile,
  BlockedExecutionSnippetMatch,
  ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";

export function renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown(
  profile: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
): string {
  return [
    "# Managed audit manual sandbox connection blocked execution rehearsal",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Rehearsal state: ${profile.rehearsalState}`,
    `- Ready for blocked execution rehearsal: ${profile.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v233",
    "",
    ...renderEntries(profile.sourceNodeV233),
    "",
    "## Java v90 Context Normalization Evidence",
    "",
    ...renderEntries(profile.upstreamOptimizationEvidence.javaV90),
    "",
    "## mini-kv v99 WAL Regression Evidence",
    "",
    ...renderEntries(profile.upstreamOptimizationEvidence.miniKvV99),
    "",
    "## Blocked Execution Rehearsal",
    "",
    ...renderEntries(profile.blockedExecutionRehearsal),
    "",
    "## Simulated Blocked Attempts",
    "",
    ...profile.simulatedBlockedAttempts.flatMap(renderAttempt),
    "## Evidence Files",
    "",
    ...profile.evidenceFiles.flatMap(renderEvidenceFile),
    "## Snippet Matches",
    "",
    ...profile.snippetMatches.flatMap(renderSnippet),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox blocked execution rehearsal blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox blocked execution rehearsal warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox blocked execution rehearsal recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function renderAttempt(attemptEntry: BlockedExecutionAttempt): string[] {
  return [
    `- ${attemptEntry.id}`,
    `  - surface: ${attemptEntry.surface}`,
    `  - requestedOperation: ${attemptEntry.requestedOperation}`,
    `  - simulatedOnly: ${attemptEntry.simulatedOnly}`,
    `  - actualExecutionAttempted: ${attemptEntry.actualExecutionAttempted}`,
    `  - blocked: ${attemptEntry.blocked}`,
    `  - blockedBy: ${attemptEntry.blockedBy}`,
    `  - executionAllowed: ${attemptEntry.executionAllowed}`,
    `  - evidenceSource: ${attemptEntry.evidenceSource}`,
  ];
}

function renderEvidenceFile(file: BlockedExecutionEvidenceFile): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: BlockedExecutionSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}
