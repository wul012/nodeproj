import type {
  CredentialResolverTestOnlyShellFailureMapping,
  CredentialResolverTestOnlyShellGuardCondition,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver test-only shell contract",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Shell contract state", profile.shellContractState],
      ["Ready for test-only shell contract", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v263", entries: profile.sourceNodeV263 },
      { heading: "Resolver Shell Contract", entries: {
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
      } },
      { heading: "Request Shape", entries: profile.resolverShellContract.requestShape },
      { heading: "Response Shape", entries: profile.resolverShellContract.responseShape },
      { heading: "Failure Mapping", list: profile.resolverShellContract.failureMapping.map(formatFailureMapping), emptyText: "No failure mappings." },
      { heading: "Guard Conditions", list: profile.resolverShellContract.guardConditions.map(formatGuardCondition), emptyText: "No guard conditions." },
      { heading: "Fake Resolver Probe", entries: profile.resolverShellContract.fakeResolverProbe },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No credential resolver test-only shell contract blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No credential resolver test-only shell contract warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No credential resolver test-only shell contract recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function formatFailureMapping(mapping: CredentialResolverTestOnlyShellFailureMapping): string {
  return `${mapping.sourceFailureCode} -> ${mapping.shellFailureCode}; action=${mapping.mappedAction}; retryable=${mapping.retryable}`;
}

function formatGuardCondition(condition: CredentialResolverTestOnlyShellGuardCondition): string {
  return `${condition.code}: required=${condition.required}; value=${condition.value}; ${condition.message}`;
}
