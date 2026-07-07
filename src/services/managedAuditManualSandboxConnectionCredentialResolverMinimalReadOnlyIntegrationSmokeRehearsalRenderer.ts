import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile,
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rehearsal",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Smoke state", profile.smokeState],
      ["Smoke decision", profile.smokeDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      [
        "Ready for v346 smoke rehearsal",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
      ],
      ["Ready for v347 archive verification", profile.readyForNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification],
      ["Requires Java v153 + mini-kv v144 echo", profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho],
      ["Live probe performed now", profile.liveProbePerformedNow],
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
      { heading: "Source Node v345", entries: profile.sourceNodeV345 },
      { heading: "Smoke Session", entries: profile.smokeSession },
      { heading: "Target Results", lines: profile.targetResults.flatMap(renderTargetResult) },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Summary",
        lines: [
          `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
          `- Attempted targets: ${profile.summary.attemptedTargetCount}`,
          `- Passed targets: ${profile.summary.passedTargetCount}`,
          `- Connection refused targets: ${profile.summary.connectionRefusedTargetCount}`,
          `- Timeout targets: ${profile.summary.timeoutTargetCount}`,
          `- Invalid JSON targets: ${profile.summary.invalidJsonTargetCount}`,
          `- Unexpected status targets: ${profile.summary.unexpectedStatusTargetCount}`,
          `- Production blockers: ${profile.summary.productionBlockerCount}`,
          `- Warnings: ${profile.summary.warningCount}`,
          `- Recommendations: ${profile.summary.recommendationCount}`,
        ],
      },
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
