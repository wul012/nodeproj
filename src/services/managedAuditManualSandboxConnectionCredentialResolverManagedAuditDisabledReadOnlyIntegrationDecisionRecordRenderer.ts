import type {
  ManagedAuditDisabledReadOnlyIntegrationDecisionInput,
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration decision record",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision state", profile.decisionState],
      ["Decision", profile.decision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v354 sandbox handle review prerequisite intake", profile.readyForNodeV354SandboxHandleReviewPrerequisiteIntake],
      ["Reruns live probe", profile.rerunsLiveProbe],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Sends managed audit HTTP/TCP", profile.sendsManagedAuditHttpTcp],
      ["Reads managed audit credential", profile.readsManagedAuditCredential],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["Secret provider instantiated", profile.secretProviderInstantiated],
      ["Resolver client instantiated", profile.resolverClientInstantiated],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v352", entries: profile.sourceNodeV352 },
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

function renderDecisionInput(input: ManagedAuditDisabledReadOnlyIntegrationDecisionInput): string[] {
  return [
    `- ${input.id}: ${input.label}`,
    `  - source: ${input.source}`,
    `  - requiredForDecision: ${input.requiredForDecision}`,
    `  - status: ${input.status}`,
    `  - notes: ${input.notes}`,
  ];
}
