import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile,
  MinimalReadOnlyIntegrationRegularGateArtifactExpectation,
  MinimalReadOnlyIntegrationRegularGateEnvRequirement,
  MinimalReadOnlyIntegrationRegularGateFailureClassification,
  MinimalReadOnlyIntegrationRegularGateHeaderRequirement,
  MinimalReadOnlyIntegrationRegularGateTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

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

  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration regular gate",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Gate state", profile.gateState],
      ["Gate decision", profile.gateDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v365 archive verification", profile.readyForNodeV365RegularGateArchiveVerification],
      ["Regular gate only", profile.regularGateOnly],
      ["Gate definition only", profile.gateDefinitionOnly],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Credential value requested", profile.credentialValueRequested],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL requested", profile.rawEndpointUrlRequested],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v350", entries: profile.sourceNodeV350 },
      { heading: "Regular Gate", entries: gateSummary },
      { heading: "Required Env", lines: renderEnv(profile.regularGate.requiredEnv) },
      { heading: "Required Headers", lines: renderHeaders(profile.regularGate.requiredHeaders) },
      { heading: "Read-Only Targets", lines: renderTargets(profile.regularGate.readOnlyTargets) },
      { heading: "Failure Classifications", lines: renderFailures(profile.regularGate.failureClassifications) },
      { heading: "Artifact Expectations", lines: renderArtifacts(profile.regularGate.artifactExpectations) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
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
