import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordProfile,
  SandboxHandleReviewPacketGateDecisionInput,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate decision record",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision state", profile.decisionState],
      ["Decision", profile.decision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v361 archive verification", profile.readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification],
      ["Decision record only", profile.decisionRecordOnly],
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
      { heading: "Source Node v359", entries: profile.sourceNodeV359 },
      { heading: "Necessity Proof", entries: profile.necessityProof },
      { heading: "Decision Inputs", lines: profile.decisionInputs.flatMap(renderDecisionInput) },
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

function renderDecisionInput(input: SandboxHandleReviewPacketGateDecisionInput): string[] {
  return [
    `- ${input.id}: ${input.label}`,
    `  - source: ${input.source}`,
    `  - requiredForDecision: ${input.requiredForDecision}`,
    `  - status: ${input.status}`,
    `  - notes: ${input.notes}`,
  ];
}
