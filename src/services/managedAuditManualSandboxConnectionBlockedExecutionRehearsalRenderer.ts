import type {
  BlockedExecutionAttempt,
  BlockedExecutionEvidenceFile,
  BlockedExecutionSnippetMatch,
  ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown(
  profile: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection blocked execution rehearsal",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Rehearsal state", profile.rehearsalState],
      ["Ready for blocked execution rehearsal", profile.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
      ["Ready for production audit", profile.readyForProductionAudit],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
    ],
    sections: [
      { heading: "Source Node v233", entries: profile.sourceNodeV233 },
      { heading: "Java v90 Context Normalization Evidence", entries: profile.upstreamOptimizationEvidence.javaV90 },
      { heading: "mini-kv v99 WAL Regression Evidence", entries: profile.upstreamOptimizationEvidence.miniKvV99 },
      { heading: "Blocked Execution Rehearsal", entries: profile.blockedExecutionRehearsal },
      { heading: "Simulated Blocked Attempts", lines: profile.simulatedBlockedAttempts.flatMap(renderAttempt) },
      { heading: "Evidence Files", lines: profile.evidenceFiles.flatMap(renderEvidenceFile), headingLeadingBlankLine: false },
      { heading: "Snippet Matches", lines: profile.snippetMatches.flatMap(renderSnippet), headingLeadingBlankLine: false },
      { heading: "Checks", entries: profile.checks, headingLeadingBlankLine: false },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No manual sandbox blocked execution rehearsal blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No manual sandbox blocked execution rehearsal warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No manual sandbox blocked execution rehearsal recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
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
