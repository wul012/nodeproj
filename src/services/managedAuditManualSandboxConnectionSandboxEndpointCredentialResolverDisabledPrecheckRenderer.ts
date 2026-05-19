import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  CredentialResolverEnvHandle,
  CredentialResolverFailureClass,
  CredentialResolverOptInGate,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
): string {
  return [
    "# Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Precheck state: ${profile.precheckState}`,
    `- Ready for disabled credential resolver precheck: ${profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v261",
    "",
    ...renderEntries(profile.sourceNodeV261),
    "",
    "## Disabled Credential Resolver Precheck",
    "",
    ...renderEntries({
      precheckDigest: profile.disabledCredentialResolverPrecheck.precheckDigest,
      precheckMode: profile.disabledCredentialResolverPrecheck.precheckMode,
      resolverImplementationStatus: profile.disabledCredentialResolverPrecheck.resolverImplementationStatus,
      secretProviderImplementationStatus: profile.disabledCredentialResolverPrecheck.secretProviderImplementationStatus,
      resolverClientMayBeInstantiated: profile.disabledCredentialResolverPrecheck.resolverClientMayBeInstantiated,
      secretProviderMayBeInstantiated: profile.disabledCredentialResolverPrecheck.secretProviderMayBeInstantiated,
      credentialValueMayBeLoaded: profile.disabledCredentialResolverPrecheck.credentialValueMayBeLoaded,
      rawEndpointUrlMayBeParsed: profile.disabledCredentialResolverPrecheck.rawEndpointUrlMayBeParsed,
      externalRequestMayBeSent: profile.disabledCredentialResolverPrecheck.externalRequestMayBeSent,
      optInGateRequired: profile.disabledCredentialResolverPrecheck.optInGateRequired,
    }),
    "",
    "## Required Env Handles",
    "",
    ...renderList(
      profile.disabledCredentialResolverPrecheck.requiredEnvHandles.map(formatEnvHandle),
      "No env handles.",
    ),
    "",
    "## Opt-In Gates",
    "",
    ...renderList(
      profile.disabledCredentialResolverPrecheck.optInGates.map(formatOptInGate),
      "No opt-in gates.",
    ),
    "",
    "## Failure Taxonomy",
    "",
    ...renderList(
      profile.disabledCredentialResolverPrecheck.failureTaxonomy.map(formatFailureClass),
      "No failure classes.",
    ),
    "",
    "## Dry-Run Response Shape",
    "",
    ...renderEntries(profile.disabledCredentialResolverPrecheck.dryRunResponseShape),
    "",
    "## Inherited No-Go Conditions",
    "",
    ...renderList([...profile.disabledCredentialResolverPrecheck.inheritedNoGoConditions], "No inherited no-go conditions."),
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
    ...renderMessages(profile.productionBlockers, "No credential resolver disabled precheck blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No credential resolver disabled precheck warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No credential resolver disabled precheck recommendations."),
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

function formatEnvHandle(handle: CredentialResolverEnvHandle): string {
  return `${handle.name}: ${handle.purpose}; valueRequiredForPrecheck=${handle.valueRequiredForPrecheck}; credentialValue=${handle.credentialValue}; rawEndpointValue=${handle.rawEndpointValue}`;
}

function formatOptInGate(gate: CredentialResolverOptInGate): string {
  return `${gate.gateName}: default=${gate.currentDefault}; futureValue=${gate.requiredValueForFutureResolver}; blockedInPrecheck=${gate.precheckTreatsEnabledAsBlocked}`;
}

function formatFailureClass(failure: CredentialResolverFailureClass): string {
  return `${failure.code}: source=${failure.source}; retryable=${failure.retryable}; action=${failure.action}`;
}
