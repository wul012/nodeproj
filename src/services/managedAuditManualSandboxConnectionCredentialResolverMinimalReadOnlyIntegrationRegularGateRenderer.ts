import { renderEntries, renderList, renderMessages } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile,
  MinimalReadOnlyIntegrationRegularGateArtifactExpectation,
  MinimalReadOnlyIntegrationRegularGateEnvRequirement,
  MinimalReadOnlyIntegrationRegularGateFailureClassification,
  MinimalReadOnlyIntegrationRegularGateHeaderRequirement,
  MinimalReadOnlyIntegrationRegularGateTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile,
): string {
  const {
    requiredEnv: _requiredEnv,
    requiredHeaders: _requiredHeaders,
    readOnlyTargets: _readOnlyTargets,
    failureClassifications: _failureClassifications,
    artifactExpectations: _artifactExpectations,
    ...gateSummary
  } = profile.regularGate;

  return [
    "# Managed audit manual sandbox connection credential resolver minimal read-only integration regular gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Gate decision: ${profile.gateDecision}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Ready for v365 archive verification: ${profile.readyForNodeV365RegularGateArchiveVerification}`,
    `- Regular gate only: ${profile.regularGateOnly}`,
    `- Gate definition only: ${profile.gateDefinitionOnly}`,
    `- Reruns live probe: ${profile.rerunsLiveProbe}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Sends managed audit HTTP/TCP: ${profile.sendsManagedAuditHttpTcp}`,
    `- Credential value requested: ${profile.credentialValueRequested}`,
    `- Credential value read: ${profile.credentialValueRead}`,
    `- Raw endpoint URL requested: ${profile.rawEndpointUrlRequested}`,
    `- Raw endpoint URL parsed: ${profile.rawEndpointUrlParsed}`,
    `- Secret provider instantiated: ${profile.secretProviderInstantiated}`,
    `- Resolver client instantiated: ${profile.resolverClientInstantiated}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell invocation allowed: ${profile.runtimeShellInvocationAllowed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Node v350",
    "",
    ...renderEntries(profile.sourceNodeV350),
    "",
    "## Regular Gate",
    "",
    ...renderEntries(gateSummary),
    "",
    "## Required Env",
    "",
    ...renderEnv(profile.regularGate.requiredEnv),
    "",
    "## Required Headers",
    "",
    ...renderHeaders(profile.regularGate.requiredHeaders),
    "",
    "## Read-Only Targets",
    "",
    ...renderTargets(profile.regularGate.readOnlyTargets),
    "",
    "## Failure Classifications",
    "",
    ...renderFailures(profile.regularGate.failureClassifications),
    "",
    "## Artifact Expectations",
    "",
    ...renderArtifacts(profile.regularGate.artifactExpectations),
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

function renderEnv(items: readonly MinimalReadOnlyIntegrationRegularGateEnvRequirement[]): string[] {
  return items.map((item) => `- ${item.key}=${item.requiredValue}; scope=${item.scope}; reason=${item.reason}`);
}

function renderHeaders(items: readonly MinimalReadOnlyIntegrationRegularGateHeaderRequirement[]): string[] {
  return items.map((item) => `- ${item.header}: required=${item.required}; secret=${item.secret}; reason=${item.reason}`);
}

function renderTargets(items: readonly MinimalReadOnlyIntegrationRegularGateTarget[]): string[] {
  return items.map((item) =>
    `- ${item.project} ${item.targetName}: ${item.methodOrCommand}; readOnly=${item.readOnly}; mutatesState=${item.mutatesState}; expected=${item.expectedStatus}`);
}

function renderFailures(items: readonly MinimalReadOnlyIntegrationRegularGateFailureClassification[]): string[] {
  return items.map((item) =>
    `- ${item.code}: ${item.condition}; action=${item.action}; requestsJavaMiniKvEcho=${item.requestsJavaMiniKvEcho}; opensCredentialOrEndpoint=${item.opensCredentialOrEndpoint}`);
}

function renderArtifacts(items: readonly MinimalReadOnlyIntegrationRegularGateArtifactExpectation[]): string[] {
  return items.map((item) => `- ${item.artifact}: required=${item.required}; source=${item.sourceVersion}`);
}
