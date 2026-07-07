import type { MinimalReadOnlyIntegrationSmokeTargetResult } from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rerun archive",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Rerun archive state", profile.rerunArchiveState],
      ["Rerun archive result", profile.rerunArchiveResult],
      ["Rerun archive decision", profile.rerunArchiveDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["External read window confirmed", profile.externalReadWindowConfirmed],
      ["Live probe performed now", profile.liveProbePerformedNow],
      ["Requires Java v153 + mini-kv v144 echo", profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Mutates Java state", profile.mutatesJavaState],
      ["Mutates mini-kv state", profile.mutatesMiniKvState],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v348", entries: profile.sourceNodeV348 },
      { heading: "Rerun Archive", entries: profile.rerunArchive },
      { heading: "Target Results", lines: profile.targetResults.flatMap(renderTargetResult) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderTargetResult(target: MinimalReadOnlyIntegrationSmokeTargetResult): string[] {
  return [
    `- ${target.project} ${target.methodOrCommand}:`,
    `  - targetName: ${target.targetName}`,
    `  - status: ${target.status}`,
    `  - readOnly: ${target.readOnly}`,
    `  - mutatesState: ${target.mutatesState}`,
    `  - attempted: ${target.attempted}`,
    `  - latencyMs: ${target.latencyMs ?? "n/a"}`,
    `  - statusCode: ${target.statusCode ?? "n/a"}`,
    `  - responseShape: ${target.responseShape}`,
    `  - errorCode: ${target.errorCode ?? "n/a"}`,
    `  - errorMessage: ${target.errorMessage ?? "n/a"}`,
  ];
}
