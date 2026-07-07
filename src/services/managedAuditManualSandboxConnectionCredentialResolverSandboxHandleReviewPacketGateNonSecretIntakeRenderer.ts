import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeProfile,
  SandboxHandleReviewGateOutput,
  SandboxHandleReviewPacketInput,
  SandboxHandleReviewStopCondition,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate non-secret intake",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Intake state", profile.intakeState],
      ["Intake decision", profile.intakeDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v359 archive verification", profile.readyForNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification],
      ["Packet/gate intake only", profile.packetGateIntakeOnly],
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
      { heading: "Source Node v357", entries: profile.sourceNodeV357 },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Packet Inputs", lines: profile.packetInputs.flatMap(renderPacketInput) },
      { heading: "Gate Outputs", lines: profile.gateOutputs.flatMap(renderGateOutput) },
      { heading: "Stop Conditions", lines: profile.stopConditions.flatMap(renderStopCondition) },
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

function renderPacketInput(input: SandboxHandleReviewPacketInput): string[] {
  return [
    `- ${input.id}: ${input.label}`,
    `  - category: ${input.category}`,
    `  - sourceContractInputId: ${input.sourceContractInputId}`,
    `  - packetRequirement: ${input.packetRequirement}`,
    `  - containsSecretValue: ${input.containsSecretValue}`,
    `  - containsRawEndpointUrl: ${input.containsRawEndpointUrl}`,
    `  - allowsNetworkConnection: ${input.allowsNetworkConnection}`,
    `  - allowsRuntimeInvocation: ${input.allowsRuntimeInvocation}`,
    `  - status: ${input.status}`,
  ];
}

function renderGateOutput(output: SandboxHandleReviewGateOutput): string[] {
  return [
    `- ${output.id}: ${output.title}`,
    `  - decisionRule: ${output.decisionRule}`,
    `  - emitsSecretValue: ${output.emitsSecretValue}`,
    `  - emitsRawEndpointUrl: ${output.emitsRawEndpointUrl}`,
    `  - opensManagedAuditConnection: ${output.opensManagedAuditConnection}`,
    `  - invokesRuntimeShell: ${output.invokesRuntimeShell}`,
    `  - mutatesUpstreamState: ${output.mutatesUpstreamState}`,
    `  - status: ${output.status}`,
  ];
}

function renderStopCondition(condition: SandboxHandleReviewStopCondition): string[] {
  return [
    `- ${condition.id}: ${condition.trigger}`,
    `  - effect: ${condition.effect}`,
    `  - credentialValueRead: ${condition.credentialValueRead}`,
    `  - rawEndpointUrlParsed: ${condition.rawEndpointUrlParsed}`,
    `  - managedAuditHttpTcpAllowed: ${condition.managedAuditHttpTcpAllowed}`,
    `  - runtimeShellInvocationAllowed: ${condition.runtimeShellInvocationAllowed}`,
    `  - upstreamMutationAllowed: ${condition.upstreamMutationAllowed}`,
  ];
}
