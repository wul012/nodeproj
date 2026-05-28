import { renderEntries, renderList, renderMessages } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile,
  SandboxHandleReviewClosureItem,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile,
): string {
  const {
    completedClosureItems: _completedClosureItems,
    remainingClosureItems: _remainingClosureItems,
    ...closureReviewSummary
  } = profile.closureReview;

  return [
    "# Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Review state: ${profile.reviewState}`,
    `- Prerequisite closure decision: ${profile.prerequisiteClosureDecision}`,
    `- Active Node version: ${profile.activeNodeVersion}`,
    `- Source Node version: ${profile.sourceNodeVersion}`,
    `- Ready for v363 archive verification: ${profile.readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification}`,
    `- Closure review only: ${profile.closureReviewOnly}`,
    `- Read-only closure review: ${profile.readOnlyClosureReview}`,
    `- Reruns live probe: ${profile.rerunsLiveProbe}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Sends managed audit HTTP/TCP: ${profile.sendsManagedAuditHttpTcp}`,
    `- Credential value requested: ${profile.credentialValueRequested}`,
    `- Credential value read: ${profile.credentialValueRead}`,
    `- Raw endpoint URL requested: ${profile.rawEndpointUrlRequested}`,
    `- Raw endpoint URL parsed: ${profile.rawEndpointUrlParsed}`,
    `- Secret provider instantiated: ${profile.secretProviderInstantiated}`,
    `- Resolver client instantiated: ${profile.resolverClientInstantiated}`,
    `- Runtime shell implemented: ${profile.runtimeShellImplemented}`,
    `- Runtime shell invocation allowed: ${profile.runtimeShellInvocationAllowed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Node v361",
    "",
    ...renderEntries(profile.sourceNodeV361),
    "",
    "## Closure Review",
    "",
    ...renderEntries(closureReviewSummary),
    "",
    "## Completed Closure Items",
    "",
    ...renderClosureItems(profile.closureReview.completedClosureItems),
    "",
    "## Remaining Closure Items",
    "",
    ...renderClosureItems(profile.closureReview.remainingClosureItems),
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
    ...renderMessages(profile.productionBlockers, "No production blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No recommendations."),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
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
