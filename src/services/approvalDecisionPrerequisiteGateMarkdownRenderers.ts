import {
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
} from "./releaseReportShared.js";
import type {
  ApprovalDecisionPrerequisiteGateProfile,
  PrerequisiteSignal,
  RemainingApprovalBlocker,
} from "./approvalDecisionPrerequisiteGateTypes.js";

export function renderPrerequisiteSignal(signal: PrerequisiteSignal): string[] {
  return [
    `### ${signal.id}`,
    "",
    `- Source: ${signal.source}`,
    `- Status: ${signal.status}`,
    `- Evidence target: ${signal.evidenceTarget}`,
    `- Node may infer: ${signal.nodeMayInfer}`,
    `- Node may create approval decision: ${signal.nodeMayCreateApprovalDecision}`,
    "",
  ];
}

export function renderRemainingApprovalBlocker(blocker: RemainingApprovalBlocker): string[] {
  return [
    `### ${blocker.id}`,
    "",
    `- Required before: ${blocker.requiredBefore}`,
    `- Reason: ${blocker.reason}`,
    `- Blocks real approval decision: ${blocker.blocksRealApprovalDecision}`,
    `- Blocks dry-run envelope: ${blocker.blocksDryRunEnvelope}`,
    "",
  ];
}

export function renderApprovalDecisionPrerequisiteGateMarkdown(
  profile: ApprovalDecisionPrerequisiteGateProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Approval decision prerequisite gate",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Gate state": profile.gateState,
      "Ready for approval decision prerequisite gate": profile.readyForApprovalDecisionPrerequisiteGate,
      "Ready for approval ledger dry-run envelope": profile.readyForApprovalLedgerDryRunEnvelope,
      "Ready for approval decision": profile.readyForApprovalDecision,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production restore": profile.readyForProductionRestore,
      "Read only": profile.readOnly,
      "Prerequisite review only": profile.prerequisiteReviewOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Gate", entries: profile.gate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Production Release Pre-approval Packet", entries: profile.artifacts.sourceProductionReleasePreApprovalPacket },
      { heading: "Java Release Operator Signoff Fixture", entries: profile.artifacts.javaReleaseOperatorSignoffFixture },
      { heading: "mini-kv Retained Restore Artifact Digest", entries: profile.artifacts.miniKvRetainedRestoreArtifactDigest },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Prerequisite Signals",
        items: profile.prerequisiteSignals,
        renderItem: renderPrerequisiteSignal,
      },
      {
        heading: "Remaining Approval Blockers",
        items: profile.remainingApprovalBlockers,
        renderItem: renderRemainingApprovalBlocker,
      },
      {
        heading: "Prerequisite Steps",
        items: profile.prerequisiteSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Creates approval decision", "createsApprovalDecision"],
            ["Writes approval ledger", "writesApprovalLedger"],
            ["Executes release", "executesRelease"],
            ["Executes deployment", "executesDeployment"],
            ["Executes rollback", "executesRollback"],
            ["Executes restore", "executesRestore"],
            ["Reads secret values", "readsSecretValues"],
            ["Connects production database", "connectsProductionDatabase"],
          ],
        }),
      },
      {
        heading: "Forbidden Operations",
        items: profile.forbiddenOperations,
        renderItem: renderReleaseForbiddenOperation,
      },
      {
        heading: "Pause Conditions",
        items: profile.pauseConditions,
        renderItem: (condition) => [`- ${condition}`],
      },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No approval decision prerequisite gate blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No approval decision prerequisite gate warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No approval decision prerequisite gate recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}
