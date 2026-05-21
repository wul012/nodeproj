import {
  renderEntries,
  renderList,
  renderMessages,
} from "./liveProbeReportUtils.js";
import type {
  FakeHarnessReadinessNoGoCondition,
  FakeHarnessReadinessRequirement,
  ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile,
): string {
  return [
    "# Managed audit manual sandbox connection credential resolver fake harness readiness decision record",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Decision record state: ${profile.decisionRecordState}`,
    `- Readiness decision: ${profile.readinessDecision}`,
    `- Ready for decision record: ${profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord}`,
    `- Ready for disabled runtime shell planning: ${profile.readyForDisabledRuntimeShellPlanning}`,
    `- Fake harness runtime enabled: ${profile.fakeHarnessRuntimeEnabled}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Node v291",
    "",
    ...renderEntries(profile.sourceNodeV291),
    "",
    "## Readiness Decision Record",
    "",
    ...renderEntries({
      decisionDigest: profile.readinessDecisionRecord.decisionDigest,
      recordMode: profile.readinessDecisionRecord.recordMode,
      decisionScope: profile.readinessDecisionRecord.decisionScope,
      sourceSpan: profile.readinessDecisionRecord.sourceSpan,
      decision: profile.readinessDecisionRecord.decision,
      decisionReason: profile.readinessDecisionRecord.decisionReason,
      allowsDisabledRuntimeShellPlanning:
        profile.readinessDecisionRecord.allowsDisabledRuntimeShellPlanning,
      allowsFakeHarnessRuntimeImplementation:
        profile.readinessDecisionRecord.allowsFakeHarnessRuntimeImplementation,
      allowsFakeHarnessRuntimeInvocation:
        profile.readinessDecisionRecord.allowsFakeHarnessRuntimeInvocation,
      allowsCredentialValueRead:
        profile.readinessDecisionRecord.allowsCredentialValueRead,
      allowsManagedAuditConnection:
        profile.readinessDecisionRecord.allowsManagedAuditConnection,
      requiredEvidenceCount: profile.readinessDecisionRecord.requiredEvidenceCount,
      noGoConditionCount: profile.readinessDecisionRecord.noGoConditionCount,
    }),
    "",
    "## Required Evidence",
    "",
    ...renderList(
      profile.readinessDecisionRecord.requiredEvidence.map(formatRequirement),
      "No required evidence.",
    ),
    "",
    "## Explicit No-Go Conditions",
    "",
    ...renderList(
      profile.readinessDecisionRecord.explicitNoGoConditions.map(formatNoGoCondition),
      "No no-go conditions.",
    ),
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
    ...renderMessages(profile.productionBlockers, "No fake harness readiness blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No fake harness readiness warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No fake harness readiness recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function formatRequirement(requirement: FakeHarnessReadinessRequirement): string {
  return `${requirement.id}: ${requirement.status} - ${requirement.label}; evidence=${requirement.currentEvidence}; requiredBeforeRuntimeShell=${requirement.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: FakeHarnessReadinessNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
