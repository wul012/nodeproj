import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile,
  SandboxHandleReviewClosureItem,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile,
): string {
  const {
    completedClosureItems: _completedClosureItems,
    remainingClosureItems: _remainingClosureItems,
    ...closureReviewSummary
  } = profile.closureReview;

  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Review state", profile.reviewState],
      ["Prerequisite closure decision", profile.prerequisiteClosureDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Ready for v363 archive verification", profile.readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification],
      ["Closure review only", profile.closureReviewOnly],
      ["Read-only closure review", profile.readOnlyClosureReview],
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
      { heading: "Source Node v361", entries: profile.sourceNodeV361 },
      { heading: "Closure Review", entries: closureReviewSummary },
      { heading: "Completed Closure Items", lines: renderClosureItems(profile.closureReview.completedClosureItems) },
      { heading: "Remaining Closure Items", lines: renderClosureItems(profile.closureReview.remainingClosureItems) },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderClosureItems(items: readonly SandboxHandleReviewClosureItem[]): string[] {
  if (items.length === 0) {
    return ["- none"];
  }

  return items.flatMap((item) => [
    `- ${item.id}: ${item.label}`,
    `  - closureState: ${item.closureState}`,
    `  - evidence: ${item.evidence}`,
    `  - requiredBeforeSandboxHandleReview: ${item.requiredBeforeSandboxHandleReview}`,
    `  - opensCredentialValue: ${item.opensCredentialValue}`,
    `  - opensRawEndpointUrl: ${item.opensRawEndpointUrl}`,
    `  - opensProviderClient: ${item.opensProviderClient}`,
    `  - opensRuntimeShell: ${item.opensRuntimeShell}`,
    `  - opensManagedAuditConnection: ${item.opensManagedAuditConnection}`,
    `  - mutatesUpstreamState: ${item.mutatesUpstreamState}`,
  ]);
}
