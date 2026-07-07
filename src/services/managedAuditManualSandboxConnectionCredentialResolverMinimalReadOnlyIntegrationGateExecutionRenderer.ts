import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Gate execution state", profile.gateExecutionState],
      ["Gate execution result", profile.gateExecutionResult],
      ["Gate execution decision", profile.gateExecutionDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["External read window confirmed", profile.externalReadWindowConfirmed],
      ["Live probe performed now", profile.liveProbePerformedNow],
      ["Reuses Node v349 smoke lane", profile.reusesNodeV349MinimalReadOnlySmokeLane],
      ["Requires parallel Java/mini-kv read contract fix", profile.requiresParallelJavaMiniKvReadContractFix],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Mutates Java state", profile.mutatesJavaState],
      ["Mutates mini-kv state", profile.mutatesMiniKvState],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v366", entries: profile.sourceNodeV366 },
      profile.reusedNodeV349SmokeLane === null
        ? {
            heading: "Reused Node v349 Smoke Lane",
            lines: ["No smoke lane was executed because the explicit read window was not available."],
          }
        : { heading: "Reused Node v349 Smoke Lane", entries: profile.reusedNodeV349SmokeLane },
      { heading: "Gate Execution", entries: profile.gateExecution },
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
