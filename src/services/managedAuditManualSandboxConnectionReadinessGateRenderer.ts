import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
  ReadinessGateEvidenceFile,
  ReadinessGateSnippetMatch,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";

export function renderManagedAuditManualSandboxConnectionReadinessGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionReadinessGateProfile,
): string {
  return [
    "# Managed audit manual sandbox connection readiness gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Ready for readiness gate: ${profile.readyForManagedAuditManualSandboxConnectionReadinessGate}`,
    `- Ready for operator window checklist: ${profile.readyForOperatorWindowChecklist}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v236",
    "",
    ...renderEntries(profile.sourceNodeV236),
    "",
    "## Java v92 Echo Receipt",
    "",
    ...renderEntries(profile.upstreamReadinessEvidence.javaV92),
    "",
    "## mini-kv v101 No-start / No-write Follow-up",
    "",
    ...renderEntries(profile.upstreamReadinessEvidence.miniKvV101),
    "",
    "## Readiness Gate",
    "",
    ...renderEntries(profile.readinessGate),
    "",
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
    ...renderMessages(profile.productionBlockers, "No readiness gate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No readiness gate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No readiness gate recommendations."),
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

function renderEvidenceFile(file: ReadinessGateEvidenceFile): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: ReadinessGateSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}
