import type {
  DisabledFakeHarnessDeniedRouteAttempt,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver disabled fake harness execution-denied route preflight",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Preflight state", profile.preflightState],
      ["Ready for execution-denied route preflight", profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight],
      ["Ready for Java v127 + mini-kv v128 evidence", profile.readyForJavaV127MiniKvV128ParallelEvidence],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Fake harness invocation allowed", profile.fakeHarnessInvocationAllowed],
    ],
    sections: [
      { heading: "Source Node v289", entries: profile.sourceNodeV289 },
      { heading: "Execution-Denied Route Preflight", entries: {
      preflightDigest: profile.executionDeniedRoutePreflight.preflightDigest,
      preflightMode: profile.executionDeniedRoutePreflight.preflightMode,
      sourceSpan: profile.executionDeniedRoutePreflight.sourceSpan,
      routeSurface: profile.executionDeniedRoutePreflight.routeSurface,
      routePath: profile.executionDeniedRoutePreflight.routePath,
      httpMethod: profile.executionDeniedRoutePreflight.httpMethod,
      formatModes: profile.executionDeniedRoutePreflight.formatModes,
      routeRegistered: profile.executionDeniedRoutePreflight.routeRegistered,
      routeReadOnly: profile.executionDeniedRoutePreflight.routeReadOnly,
      routeExecutionDenied: profile.executionDeniedRoutePreflight.routeExecutionDenied,
      approvalGateRequired: profile.executionDeniedRoutePreflight.approvalGateRequired,
      approvalGateSatisfied: profile.executionDeniedRoutePreflight.approvalGateSatisfied,
      fakeHarnessRuntimeImplementationAllowed:
        profile.executionDeniedRoutePreflight.fakeHarnessRuntimeImplementationAllowed,
      fakeHarnessRuntimeInvocationAllowed:
        profile.executionDeniedRoutePreflight.fakeHarnessRuntimeInvocationAllowed,
      } },
      { heading: "Denial Reasons", list: profile.executionDeniedRoutePreflight.denialReasons, emptyText: "No denial reasons." },
      { heading: "Simulated Denied Route Attempts", lines: profile.simulatedRouteAttempts.flatMap(renderAttempt) },
      { heading: "Checks", entries: profile.checks, headingLeadingBlankLine: false },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No execution-denied route preflight blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No execution-denied route preflight warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No execution-denied route preflight recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderAttempt(attempt: DisabledFakeHarnessDeniedRouteAttempt): string[] {
  return [
    `- ${attempt.id}`,
    `  - surface: ${attempt.surface}`,
    `  - requestedOperation: ${attempt.requestedOperation}`,
    `  - simulatedOnly: ${attempt.simulatedOnly}`,
    `  - actualExecutionAttempted: ${attempt.actualExecutionAttempted}`,
    `  - denied: ${attempt.denied}`,
    `  - executionAllowed: ${attempt.executionAllowed}`,
    `  - deniedBy: ${attempt.deniedBy}`,
    `  - sourceEvidence: ${attempt.sourceEvidence}`,
  ];
}
