import { renderEntries, renderList, renderMessages } from "./liveProbeReportUtils.js";
import type {
  ForbiddenIntegrationOperation,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile,
  ReadOnlyIntegrationEnvironmentHandle,
  ReadOnlyIntegrationRequirement,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver minimal read-only integration window readiness cut",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Readiness state: ${profile.readinessState}`,
    `- Readiness decision: ${profile.readinessDecision}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Ready for v345 readiness cut: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut}`,
    `- Ready for Node v346 smoke rehearsal: ${profile.readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal}`,
    `- Requires Java v153 + mini-kv v144 echo: ${profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho}`,
    `- Performs live probe now: ${profile.performsLiveProbeNow}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    `- Sends Java HTTP request now: ${profile.sendsJavaHttpRequestNow}`,
    `- Opens mini-kv TCP socket now: ${profile.opensMiniKvTcpSocketNow}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    `- Raw endpoint URL parsed: ${profile.rawEndpointUrlParsed}`,
    "",
    "## Source Node v344",
    "",
    ...renderEntries(profile.sourceNodeV344),
    "",
    "## Readiness Cut",
    "",
    ...renderEntries(profile.readinessCut),
    "",
    "## Java Read-Only Requirements",
    "",
    ...renderRequirements(profile.javaReadOnlyRequirements),
    "",
    "## mini-kv Read-Only Requirements",
    "",
    ...renderRequirements(profile.miniKvReadOnlyRequirements),
    "",
    "## Environment Handles",
    "",
    ...renderEnvironmentHandles(profile.environmentHandles),
    "",
    "## Forbidden Operations",
    "",
    ...renderForbiddenOperations(profile.forbiddenOperations),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
    `- Java requirements: ${profile.summary.javaRequirementCount}`,
    `- mini-kv requirements: ${profile.summary.miniKvRequirementCount}`,
    `- Environment handles: ${profile.summary.environmentHandleCount}`,
    `- Forbidden operations: ${profile.summary.forbiddenOperationCount}`,
    `- Production blockers: ${profile.summary.productionBlockerCount}`,
    `- Warnings: ${profile.summary.warningCount}`,
    `- Recommendations: ${profile.summary.recommendationCount}`,
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

function renderRequirements(requirements: readonly ReadOnlyIntegrationRequirement[]): string[] {
  return requirements.map((requirement) =>
    `- ${requirement.project} ${requirement.kind} ${requirement.methodOrCommand}: ${requirement.name}; handle=${requirement.handle}; readOnly=${requirement.readOnly}; mutatesState=${requirement.mutatesState}; existingNodeSupport=${requirement.existingNodeSupport}; boundary=${requirement.expectedBoundary}`);
}

function renderEnvironmentHandles(handles: readonly ReadOnlyIntegrationEnvironmentHandle[]): string[] {
  return handles.map((handle) =>
    `- ${handle.name}: target=${handle.target}; kind=${handle.valueKind}; presentInConfig=${handle.presentInConfig}; secretValue=${handle.secretValue}; rawCredentialValue=${handle.rawCredentialValue}`);
}

function renderForbiddenOperations(operations: readonly ForbiddenIntegrationOperation[]): string[] {
  return operations.map((operation) =>
    `- ${operation.project}: ${operation.operation}; blockedReason=${operation.blockedReason}`);
}
