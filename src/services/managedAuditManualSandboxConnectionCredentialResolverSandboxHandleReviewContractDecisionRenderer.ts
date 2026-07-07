import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionProfile,
  SandboxHandleReviewContractInput,
  SandboxHandleReviewContractSection,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver sandbox handle review contract decision",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision state", profile.decisionState],
      ["Decision", profile.decision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v357 archive verification", profile.readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification],
      ["Contract decision only", profile.contractDecisionOnly],
      ["Sandbox handle review only", profile.sandboxHandleReviewOnly],
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
      { heading: "Source Node v355", entries: profile.sourceNodeV355 },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Contract Inputs", lines: profile.contractInputs.flatMap(renderContractInput) },
      { heading: "Contract Sections", lines: profile.contractSections.flatMap(renderContractSection) },
      { heading: "Decision Record", entries: profile.decisionRecord },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderContractInput(input: SandboxHandleReviewContractInput): string[] {
  return [
    `- ${input.id}: ${input.label}`,
    `  - category: ${input.category}`,
    `  - sourcePrerequisiteId: ${input.sourcePrerequisiteId}`,
    `  - contractRequirement: ${input.contractRequirement}`,
    `  - containsSecretValue: ${input.containsSecretValue}`,
    `  - containsRawEndpointUrl: ${input.containsRawEndpointUrl}`,
    `  - allowsNetworkConnection: ${input.allowsNetworkConnection}`,
    `  - allowsRuntimeInvocation: ${input.allowsRuntimeInvocation}`,
    `  - status: ${input.status}`,
  ];
}

function renderContractSection(section: SandboxHandleReviewContractSection): string[] {
  return [
    `- ${section.id}: ${section.title}`,
    `  - decisionRule: ${section.decisionRule}`,
    `  - acceptsOnlyOpaqueReference: ${section.acceptsOnlyOpaqueReference}`,
    `  - containsSecretValue: ${section.containsSecretValue}`,
    `  - containsRawEndpointUrl: ${section.containsRawEndpointUrl}`,
    `  - opensManagedAuditConnection: ${section.opensManagedAuditConnection}`,
    `  - invokesRuntimeShell: ${section.invokesRuntimeShell}`,
    `  - mutatesUpstreamState: ${section.mutatesUpstreamState}`,
  ];
}
