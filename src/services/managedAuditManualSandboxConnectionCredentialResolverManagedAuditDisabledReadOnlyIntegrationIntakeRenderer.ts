import type {
  DisabledReadOnlyIntegrationClosedScope,
  DisabledReadOnlyIntegrationInput,
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Intake state", profile.intakeState],
      ["Intake decision", profile.intakeDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Managed audit disabled", profile.managedAuditDisabled],
      ["Read-only integration only", profile.readOnlyIntegrationOnly],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v350", entries: profile.sourceNodeV350 },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Intake Inputs", lines: profile.intakeInputs.flatMap(renderInput) },
      { heading: "Closed Scopes", lines: profile.closedScopes.flatMap(renderClosedScope) },
      { heading: "Intake Record", entries: profile.intakeRecord },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderInput(input: DisabledReadOnlyIntegrationInput): string[] {
  return [
    `- ${input.id}: ${input.label}`,
    `  - source: ${input.source}`,
    `  - requiredBeforeNextLiveWindow: ${input.requiredBeforeNextLiveWindow}`,
    `  - status: ${input.status}`,
    `  - notes: ${input.notes}`,
  ];
}

function renderClosedScope(scope: DisabledReadOnlyIntegrationClosedScope): string[] {
  return [
    `- ${scope.id}:`,
    `  - status: ${scope.status}`,
    `  - reason: ${scope.reason}`,
  ];
}
