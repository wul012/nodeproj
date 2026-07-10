import type {
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
  ReadinessGateEvidenceFile,
  ReadinessGateSnippetMatch,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionReadinessGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionReadinessGateProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection readiness gate",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Gate state", profile.gateState],
      ["Ready for readiness gate", profile.readyForManagedAuditManualSandboxConnectionReadinessGate],
      ["Ready for operator window checklist", profile.readyForOperatorWindowChecklist],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
    ],
    sections: [
      { heading: "Source Node v236", entries: profile.sourceNodeV236 },
      { heading: "Java v92 Echo Receipt", entries: profile.upstreamReadinessEvidence.javaV92 },
      { heading: "mini-kv v101 No-start / No-write Follow-up", entries: profile.upstreamReadinessEvidence.miniKvV101 },
      { heading: "Readiness Gate", entries: profile.readinessGate },
      { heading: "Evidence Files", lines: profile.evidenceFiles.flatMap(renderEvidenceFile) },
      { heading: "Snippet Matches", lines: profile.snippetMatches.flatMap(renderSnippet), headingLeadingBlankLine: false },
      { heading: "Checks", entries: profile.checks, headingLeadingBlankLine: false },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No readiness gate blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No readiness gate warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No readiness gate recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
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
