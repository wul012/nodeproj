import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  CredentialResolverTestOnlyShellFailureMapping,
  CredentialResolverTestOnlyShellGuardCondition,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
): string {
  return [
    "# Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Shell contract state: ${profile.shellContractState}`,
    `- Ready for test-only shell contract: ${profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v263",
    "",
    ...renderEntries(profile.sourceNodeV263),
    "",
    "## Resolver Shell Contract",
    "",
    ...renderEntries({
      contractDigest: profile.resolverShellContract.contractDigest,
      shellName: profile.resolverShellContract.shellName,
      shellMode: profile.resolverShellContract.shellMode,
      resolverKind: profile.resolverShellContract.resolverKind,
      realResolverImplemented: profile.resolverShellContract.realResolverImplemented,
      realSecretProviderAllowed: profile.resolverShellContract.realSecretProviderAllowed,
      fakeResolverOnly: profile.resolverShellContract.fakeResolverOnly,
      resolverClientMayBeInstantiatedForProduction:
        profile.resolverShellContract.resolverClientMayBeInstantiatedForProduction,
      secretProviderMayBeInstantiated: profile.resolverShellContract.secretProviderMayBeInstantiated,
      credentialValueMayBeLoaded: profile.resolverShellContract.credentialValueMayBeLoaded,
      rawEndpointUrlMayBeParsed: profile.resolverShellContract.rawEndpointUrlMayBeParsed,
      externalRequestMayBeSent: profile.resolverShellContract.externalRequestMayBeSent,
    }),
    "",
    "## Request Shape",
    "",
    ...renderEntries(profile.resolverShellContract.requestShape),
    "",
    "## Response Shape",
    "",
    ...renderEntries(profile.resolverShellContract.responseShape),
    "",
    "## Failure Mapping",
    "",
    ...renderList(
      profile.resolverShellContract.failureMapping.map(formatFailureMapping),
      "No failure mappings.",
    ),
    "",
    "## Guard Conditions",
    "",
    ...renderList(
      profile.resolverShellContract.guardConditions.map(formatGuardCondition),
      "No guard conditions.",
    ),
    "",
    "## Fake Resolver Probe",
    "",
    ...renderEntries(profile.resolverShellContract.fakeResolverProbe),
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
    ...renderMessages(profile.productionBlockers, "No credential resolver test-only shell contract blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No credential resolver test-only shell contract warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No credential resolver test-only shell contract recommendations."),
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

function formatFailureMapping(mapping: CredentialResolverTestOnlyShellFailureMapping): string {
  return `${mapping.sourceFailureCode} -> ${mapping.shellFailureCode}; action=${mapping.mappedAction}; retryable=${mapping.retryable}`;
}

function formatGuardCondition(condition: CredentialResolverTestOnlyShellGuardCondition): string {
  return `${condition.code}: required=${condition.required}; value=${condition.value}; ${condition.message}`;
}
