import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution archive verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Archive verification state", profile.archiveVerificationState],
      ["Archive verification decision", profile.archiveVerificationDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v369 operator/CI regular gate handoff", profile.readyForNodeV369OperatorCiRegularGateHandoff],
      ["Archive verification only", profile.archiveVerificationOnly],
      ["Operator/CI handoff check included", profile.operatorCiHandoffCheckIncluded],
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
      { heading: "Source Node v367", entries: profile.sourceNodeV367 },
      { heading: "Target Results", lines: profile.targetResults.flatMap(renderTargetResult) },
      { heading: "Archive Verification", entries: profile.archiveVerification },
      { heading: "Operator / CI Handoff Check", entries: profile.operatorCiHandoffCheck },
      {
        heading: "Archive References",
        lines: renderVerificationArchiveFileReferenceLines([
          profile.archiveReferences.jsonEvidence,
          profile.archiveReferences.markdownEvidence,
          profile.archiveReferences.summaryEvidence,
          profile.archiveReferences.browserSnapshot,
          profile.archiveReferences.htmlArchive,
          profile.archiveReferences.screenshot,
          profile.archiveReferences.explanation,
          profile.archiveReferences.codeWalkthrough,
          profile.archiveReferences.sourcePlan,
          profile.archiveReferences.plansIndex,
          profile.archiveReferences.archiveIndex,
        ]),
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderTargetResult(target: MinimalReadOnlyIntegrationSmokeTargetResult): string[] {
  return [
    `- ${target.project} ${target.methodOrCommand}:`,
    `  - targetName: ${target.targetName}`,
    `  - status: ${target.status}`,
    `  - readOnly: ${target.readOnly}`,
    `  - mutatesState: ${target.mutatesState}`,
    `  - attempted: ${target.attempted}`,
    `  - latencyMs: ${target.latencyMs ?? "n/a"}`,
    `  - statusCode: ${target.statusCode ?? "n/a"}`,
    `  - responseShape: ${target.responseShape}`,
    `  - errorCode: ${target.errorCode ?? "n/a"}`,
    `  - errorMessage: ${target.errorMessage ?? "n/a"}`,
  ];
}
