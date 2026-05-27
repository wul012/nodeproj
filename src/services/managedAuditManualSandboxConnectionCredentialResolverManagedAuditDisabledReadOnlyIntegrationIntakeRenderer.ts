import { renderEntries, renderList, renderMessages } from "./liveProbeReportUtils.js";
import type {
  DisabledReadOnlyIntegrationClosedScope,
  DisabledReadOnlyIntegrationInput,
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Intake state: ${profile.intakeState}`,
    `- Intake decision: ${profile.intakeDecision}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Managed audit disabled: ${profile.managedAuditDisabled}`,
    `- Read-only integration only: ${profile.readOnlyIntegrationOnly}`,
    `- Reruns live probe: ${profile.rerunsLiveProbe}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Sends managed audit HTTP/TCP: ${profile.sendsManagedAuditHttpTcp}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    `- Raw endpoint URL parsed: ${profile.rawEndpointUrlParsed}`,
    `- Secret provider instantiated: ${profile.secretProviderInstantiated}`,
    `- Resolver client instantiated: ${profile.resolverClientInstantiated}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Node v350",
    "",
    ...renderEntries(profile.sourceNodeV350),
    "",
    "## Necessity Proof",
    "",
    ...renderEntries(profile.necessityProof),
    "",
    "## Intake Inputs",
    "",
    ...profile.intakeInputs.flatMap(renderInput),
    "",
    "## Closed Scopes",
    "",
    ...profile.closedScopes.flatMap(renderClosedScope),
    "",
    "## Intake Record",
    "",
    ...renderEntries(profile.intakeRecord),
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
