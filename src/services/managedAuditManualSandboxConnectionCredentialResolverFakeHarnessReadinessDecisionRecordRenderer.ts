import type {
  FakeHarnessReadinessNoGoCondition,
  FakeHarnessReadinessRequirement,
  ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver fake harness readiness decision record",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Decision record state", profile.decisionRecordState],
      ["Readiness decision", profile.readinessDecision],
      [
        "Ready for decision record",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord,
      ],
      ["Ready for disabled runtime shell planning", profile.readyForDisabledRuntimeShellPlanning],
      ["Fake harness runtime enabled", profile.fakeHarnessRuntimeEnabled],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v291", entries: profile.sourceNodeV291 },
      {
        heading: "Readiness Decision Record",
        entries: {
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
        },
      },
      {
        heading: "Required Evidence",
        list: profile.readinessDecisionRecord.requiredEvidence.map(formatRequirement),
        emptyText: "No required evidence.",
      },
      {
        heading: "Explicit No-Go Conditions",
        list: profile.readinessDecisionRecord.explicitNoGoConditions.map(formatNoGoCondition),
        emptyText: "No no-go conditions.",
      },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No fake harness readiness blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No fake harness readiness warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No fake harness readiness recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function formatRequirement(requirement: FakeHarnessReadinessRequirement): string {
  return `${requirement.id}: ${requirement.status} - ${requirement.label}; evidence=${requirement.currentEvidence}; requiredBeforeRuntimeShell=${requirement.requiredBeforeRuntimeShell}`;
}

function formatNoGoCondition(condition: FakeHarnessReadinessNoGoCondition): string {
  return `${condition.code}: ${condition.condition} -> ${condition.action}`;
}
