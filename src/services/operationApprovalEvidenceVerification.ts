import { digestOperationApprovalDecision, type OperationApprovalDecision } from "./operationApprovalDecision.js";
import { digestOperationExecutionPreview } from "./operationApprovalRequest.js";
import { createOperationApprovalEvidenceReport } from "./operationApprovalEvidenceReport.js";
import {
  isFnv1a64Digest,
  isSha256Digest,
  readJavaApprovalDigest,
  readJavaApprovedForReplay,
  readJavaContractDigest,
  readJavaContractVersion,
  readJavaDigestVerificationMode,
  readJavaEvidenceVersion,
  readJavaReplayEligibilityDigest,
  readJavaReplayPreconditionsSatisfied,
  readMiniKvCheckDurability,
  readMiniKvCheckExecutionAllowed,
  readMiniKvCheckReadOnly,
  readMiniKvCommandDigest,
  readMiniKvSchemaVersion,
  readMiniKvSideEffectCount,
  readMiniKvSideEffects,
  readNumberFieldFromMiniKvContract,
  readStringArrayFromMiniKvContract,
  readStringFieldFromMiniKvContract,
  stableJson,
} from "./operationApprovalEvidenceReaders.js";
import type {
  OperationApprovalEvidenceReport,
  OperationApprovalEvidenceVerification,
  OperationApprovalUpstreamEvidence,
} from "./operationApprovalEvidenceTypes.js";
import type { EvidenceRecord } from "./operationPreflight.js";

export function createOperationApprovalEvidenceVerification(
  report: OperationApprovalEvidenceReport,
): OperationApprovalEvidenceVerification {
  const recomputed = createOperationApprovalEvidenceReport(report.request, report.decision, report.upstreamEvidence);
  const storedPreviewDigest = report.request.previewDigest;
  const recomputedPreviewDigest = digestOperationExecutionPreview(report.request.preview);
  const recomputedDecisionDigest = report.decision === undefined
    ? undefined
    : digestOperationApprovalDecision(stripDecisionDigest(report.decision));
  const checks = {
    digestValid: report.evidenceDigest.value === recomputed.evidenceDigest.value,
    requestMatches: report.requestId === report.request.requestId && report.intentId === report.request.intentId,
    decisionPresent: report.decision !== undefined,
    decisionMatchesRequest: report.decision === undefined
      ? false
      : report.decision.requestId === report.request.requestId
        && report.decision.intentId === report.request.intentId
        && report.decision.previewDigest.value === report.request.previewDigest.value
        && report.decision.requestStatusAfterDecision === report.request.status,
    requestPreviewDigestValid: storedPreviewDigest.value === recomputedPreviewDigest.value,
    decisionDigestValid: report.decision !== undefined
      && recomputedDecisionDigest !== undefined
      && report.decision.decisionDigest.value === recomputedDecisionDigest.value,
    summaryMatches: stableJson(report.summary) === stableJson(recomputed.summary),
    upstreamEvidenceMatchesSummary: summaryMatchesUpstreamEvidence(report.summary, report.upstreamEvidence),
    javaApprovalDigestEvidenceValid: javaApprovalDigestEvidenceValid(report.upstreamEvidence.javaApprovalStatus),
    javaExecutionContractEvidenceValid: javaExecutionContractEvidenceValid(report.upstreamEvidence.javaExecutionContract),
    miniKvCommandDigestEvidenceValid: miniKvCommandDigestEvidenceValid(report.upstreamEvidence.miniKvExplainCoverage),
    miniKvSideEffectCountMatches: miniKvSideEffectCountMatches(report.upstreamEvidence.miniKvExplainCoverage),
    miniKvExecutionContractEvidenceValid: miniKvExecutionContractEvidenceValid(report.upstreamEvidence.miniKvExecutionContract),
    nextActionsMatch: stableJson(report.nextActions) === stableJson(recomputed.nextActions),
    upstreamUntouched: report.decision?.upstreamTouched === false,
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    verifiedAt: new Date().toISOString(),
    valid,
    requestId: report.requestId,
    ...(report.decisionId === undefined ? {} : { decisionId: report.decisionId }),
    state: report.state,
    storedDigest: report.evidenceDigest,
    recomputedDigest: recomputed.evidenceDigest,
    checks,
    summary: recomputed.summary,
    nextActions: valid
      ? ["Approval evidence verification is complete; archive this report with the release evidence."]
      : ["Approval evidence is incomplete or inconsistent; regenerate request, decision, and evidence before handoff."],
  };
}

function stripDecisionDigest(decision: OperationApprovalDecision): Omit<OperationApprovalDecision, "decisionDigest"> {
  const { decisionDigest: _decisionDigest, ...withoutDigest } = decision;
  return withoutDigest;
}

function summaryMatchesUpstreamEvidence(
  summary: OperationApprovalEvidenceReport["summary"],
  upstreamEvidence: OperationApprovalUpstreamEvidence,
): boolean {
  const javaApprovedForReplay = readJavaApprovedForReplay(upstreamEvidence.javaApprovalStatus.details);
  const javaEvidenceVersion = readJavaEvidenceVersion(upstreamEvidence.javaApprovalStatus.details);
  const javaApprovalDigest = readJavaApprovalDigest(upstreamEvidence.javaApprovalStatus.details);
  const javaReplayEligibilityDigest = readJavaReplayEligibilityDigest(upstreamEvidence.javaApprovalStatus.details);
  const javaContractVersion = readJavaContractVersion(upstreamEvidence.javaExecutionContract.details);
  const javaContractDigest = readJavaContractDigest(upstreamEvidence.javaExecutionContract.details);
  const javaReplayPreconditionsSatisfied = readJavaReplayPreconditionsSatisfied(upstreamEvidence.javaExecutionContract.details);
  const javaDigestVerificationMode = readJavaDigestVerificationMode(upstreamEvidence.javaExecutionContract.details);
  const miniKvSchemaVersion = readMiniKvSchemaVersion(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvCommandDigest = readMiniKvCommandDigest(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvSideEffectCount = readMiniKvSideEffectCount(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvCheckReadOnly = readMiniKvCheckReadOnly(upstreamEvidence.miniKvExecutionContract.details);
  const miniKvCheckExecutionAllowed = readMiniKvCheckExecutionAllowed(upstreamEvidence.miniKvExecutionContract.details);
  const miniKvCheckDurability = readMiniKvCheckDurability(upstreamEvidence.miniKvExecutionContract.details);
  return summary.javaApprovalStatus === upstreamEvidence.javaApprovalStatus.status
    && (javaApprovedForReplay === undefined
      ? summary.javaApprovedForReplay === undefined
      : summary.javaApprovedForReplay === javaApprovedForReplay)
    && (javaEvidenceVersion === undefined
      ? summary.javaEvidenceVersion === undefined
      : summary.javaEvidenceVersion === javaEvidenceVersion)
    && (javaApprovalDigest === undefined
      ? summary.javaApprovalDigest === undefined
      : summary.javaApprovalDigest === javaApprovalDigest)
    && (javaReplayEligibilityDigest === undefined
      ? summary.javaReplayEligibilityDigest === undefined
      : summary.javaReplayEligibilityDigest === javaReplayEligibilityDigest)
    && summary.javaExecutionContractStatus === upstreamEvidence.javaExecutionContract.status
    && (javaContractVersion === undefined
      ? summary.javaContractVersion === undefined
      : summary.javaContractVersion === javaContractVersion)
    && (javaContractDigest === undefined
      ? summary.javaContractDigest === undefined
      : summary.javaContractDigest === javaContractDigest)
    && (javaReplayPreconditionsSatisfied === undefined
      ? summary.javaReplayPreconditionsSatisfied === undefined
      : summary.javaReplayPreconditionsSatisfied === javaReplayPreconditionsSatisfied)
    && (javaDigestVerificationMode === undefined
      ? summary.javaDigestVerificationMode === undefined
      : summary.javaDigestVerificationMode === javaDigestVerificationMode)
    && summary.miniKvExplainCoverage === upstreamEvidence.miniKvExplainCoverage.status
    && stableJson(summary.miniKvSideEffects) === stableJson(readMiniKvSideEffects(upstreamEvidence.miniKvExplainCoverage.details))
    && (miniKvSchemaVersion === undefined
      ? summary.miniKvSchemaVersion === undefined
      : summary.miniKvSchemaVersion === miniKvSchemaVersion)
    && (miniKvCommandDigest === undefined
      ? summary.miniKvCommandDigest === undefined
      : summary.miniKvCommandDigest === miniKvCommandDigest)
    && (miniKvSideEffectCount === undefined
      ? summary.miniKvSideEffectCount === undefined
      : summary.miniKvSideEffectCount === miniKvSideEffectCount)
    && summary.miniKvExecutionContractStatus === upstreamEvidence.miniKvExecutionContract.status
    && (miniKvCheckReadOnly === undefined
      ? summary.miniKvCheckReadOnly === undefined
      : summary.miniKvCheckReadOnly === miniKvCheckReadOnly)
    && (miniKvCheckExecutionAllowed === undefined
      ? summary.miniKvCheckExecutionAllowed === undefined
      : summary.miniKvCheckExecutionAllowed === miniKvCheckExecutionAllowed)
    && (miniKvCheckDurability === undefined
      ? summary.miniKvCheckDurability === undefined
      : summary.miniKvCheckDurability === miniKvCheckDurability);
}

function javaApprovalDigestEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const evidenceVersion = readJavaEvidenceVersion(evidence.details);
  const approvalDigest = readJavaApprovalDigest(evidence.details);
  const replayEligibilityDigest = readJavaReplayEligibilityDigest(evidence.details);
  return evidenceVersion === "failed-event-approval-status.v1"
    && isSha256Digest(approvalDigest)
    && isSha256Digest(replayEligibilityDigest);
}

function javaExecutionContractEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const contractVersion = readJavaContractVersion(evidence.details);
  const contractDigest = readJavaContractDigest(evidence.details);
  const digestVerificationMode = readJavaDigestVerificationMode(evidence.details);
  return contractVersion === "failed-event-replay-execution-contract.v1"
    && isSha256Digest(contractDigest)
    && digestVerificationMode === "CLIENT_PRECHECK_ONLY";
}

function miniKvCommandDigestEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const schemaVersion = readMiniKvSchemaVersion(evidence.details);
  const commandDigest = readMiniKvCommandDigest(evidence.details);
  return Number.isInteger(schemaVersion)
    && schemaVersion !== undefined
    && schemaVersion > 0
    && isFnv1a64Digest(commandDigest);
}

function miniKvSideEffectCountMatches(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const count = readMiniKvSideEffectCount(evidence.details);
  return Number.isInteger(count) && count === readMiniKvSideEffects(evidence.details).length;
}

function miniKvExecutionContractEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const schemaVersion = readNumberFieldFromMiniKvContract(evidence.details, "schema_version");
  const commandDigest = readStringFieldFromMiniKvContract(evidence.details, "command_digest");
  const readOnly = readMiniKvCheckReadOnly(evidence.details);
  const executionAllowed = readMiniKvCheckExecutionAllowed(evidence.details);
  const sideEffectCount = readNumberFieldFromMiniKvContract(evidence.details, "side_effect_count");
  const sideEffects = readStringArrayFromMiniKvContract(evidence.details, "side_effects");
  return Number.isInteger(schemaVersion)
    && schemaVersion !== undefined
    && schemaVersion > 0
    && isFnv1a64Digest(commandDigest)
    && readOnly === true
    && executionAllowed === false
    && Number.isInteger(sideEffectCount)
    && sideEffectCount === sideEffects.length;
}
