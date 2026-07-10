import type {
  CredentialResolverEnvHandle,
  CredentialResolverFailureClass,
  CredentialResolverOptInGate,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown(
  profile: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver disabled precheck",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Precheck state", profile.precheckState],
      ["Ready for disabled credential resolver precheck", profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck],
      ["Ready for sandbox adapter connection", profile.readyForManagedAuditSandboxAdapterConnection],
    ],
    sections: [
      { heading: "Source Node v261", entries: profile.sourceNodeV261 },
      { heading: "Disabled Credential Resolver Precheck", entries: {
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
      } },
      { heading: "Required Env Handles", list: profile.disabledCredentialResolverPrecheck.requiredEnvHandles.map(formatEnvHandle), emptyText: "No env handles." },
      { heading: "Opt-In Gates", list: profile.disabledCredentialResolverPrecheck.optInGates.map(formatOptInGate), emptyText: "No opt-in gates." },
      { heading: "Failure Taxonomy", list: profile.disabledCredentialResolverPrecheck.failureTaxonomy.map(formatFailureClass), emptyText: "No failure classes." },
      { heading: "Dry-Run Response Shape", entries: profile.disabledCredentialResolverPrecheck.dryRunResponseShape },
      { heading: "Inherited No-Go Conditions", list: [...profile.disabledCredentialResolverPrecheck.inheritedNoGoConditions], emptyText: "No inherited no-go conditions." },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No credential resolver disabled precheck blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No credential resolver disabled precheck warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No credential resolver disabled precheck recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
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
