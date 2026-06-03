import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewExecutionGapMatrix,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessTypes.js";

export function renderControlledReadOnlyShardPreviewExecutionGapMatrixMarkdown(
  matrix: ControlledReadOnlyShardPreviewExecutionGapMatrix,
): string {
  return [
    "# Controlled read-only shard preview execution gap matrix",
    "",
    `- Matrix version: ${matrix.matrixVersion}`,
    `- Matrix state: ${matrix.matrixState}`,
    `- Ready for live read-only packet planning: ${matrix.readyForLiveReadOnlyPacketPlanning}`,
    `- Ready for live read-only execution: ${matrix.readyForLiveReadOnlyExecution}`,
    `- Ready for production execution: ${matrix.readyForProductionExecution}`,
    `- Gate count: ${matrix.gateCount}`,
    `- Ready gate count: ${matrix.readyGateCount}`,
    `- Action-required gate count: ${matrix.actionRequiredGateCount}`,
    `- Live read-only packet planning blockers: ${matrix.liveReadOnlyPacketPlanningBlockerCount}`,
    `- Production execution blockers: ${matrix.productionExecutionBlockerCount}`,
    "",
    "## Gates",
    ...matrix.gates.flatMap((gate) => [
      `### ${gate.code}`,
      `- Scope: ${gate.scope}`,
      `- State: ${gate.state}`,
      `- Severity: ${gate.severity}`,
      `- Evidence: ${gate.evidence}`,
      `- Next action: ${gate.nextAction}`,
      `- Blocks live read-only packet planning: ${gate.blocksLiveReadOnlyPacketPlanning}`,
      `- Blocks production execution: ${gate.blocksProductionExecution}`,
      "",
    ]),
  ].join("\n");
}

export function renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateMarkdown(
  candidate: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
): string {
  return [
    "# Controlled read-only shard preview live read-only packet candidate",
    "",
    `- Candidate version: ${candidate.candidateVersion}`,
    `- Candidate state: ${candidate.candidateState}`,
    `- Ready for manual live read-only window: ${candidate.readyForManualLiveReadOnlyWindow}`,
    `- Ready for production execution: ${candidate.readyForProductionExecution}`,
    `- Candidate digest: ${candidate.candidateDigest}`,
    `- Process step count: ${candidate.processStepCount}`,
    `- Read target count: ${candidate.readTargetCount}`,
    `- Passed gates: ${candidate.passedGateCount}/${candidate.gateCount}`,
    "",
    "## Checks",
    ...renderEntries(candidate.checks),
    "",
    "## Process Plan",
    ...candidate.processPlan.flatMap((step) => [
      `### ${step.id}`,
      `- Project: ${step.project}`,
      `- Owner: ${step.owner}`,
      `- Action: ${step.action}`,
      `- Automatic: ${step.automatic}`,
      `- Cleanup required: ${step.cleanupRequired}`,
      "",
    ]),
    "## Read Targets",
    ...candidate.readTargets.flatMap((target) => [
      `### ${target.id}`,
      `- Project: ${target.project}`,
      `- Protocol: ${target.protocol}`,
      `- Target: ${target.target}`,
      `- Read-only: ${target.readOnly}`,
      `- Writes allowed: ${target.writesAllowed}`,
      `- Required operator headers: ${target.requiredOperatorHeaders}`,
      "",
    ]),
  ].join("\n");
}

export function renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationMarkdown(
  verification: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
): string {
  return [
    "# Controlled read-only shard preview live read-only packet candidate verification",
    "",
    `- Verification version: ${verification.verificationVersion}`,
    `- Verification state: ${verification.verificationState}`,
    `- Ready for manual live read-only window: ${verification.readyForManualLiveReadOnlyWindow}`,
    `- Ready for production execution: ${verification.readyForProductionExecution}`,
    `- Candidate digest: ${verification.candidateDigestValue}`,
    `- Passed gates: ${verification.passedGateCount}/${verification.gateCount}`,
    `- Archived section count: ${verification.archivedSectionCount}`,
    `- Next action: ${verification.nextAction}`,
    "",
    "## Gates",
    ...renderEntries(verification.gates),
    "",
    "## Archived Sections",
    ...verification.archivedSections.map((section) => `- ${section}`),
    "",
    "## Blocked Reasons",
    ...(verification.blockedReasonCodes.length === 0
      ? ["- none"]
      : verification.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}
