import crypto from "node:crypto";

import { EVIDENCE_DIGEST_COVERED_FIELDS } from "./operationApprovalEvidenceConstants.js";
import { stableJson } from "./operationApprovalEvidenceReaders.js";
import {
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
} from "./operationApprovalEvidenceReaders.js";
import type {
  OperationApprovalEvidenceDigest,
  OperationApprovalEvidenceReport,
  OperationApprovalEvidenceState,
  OperationApprovalUpstreamEvidence,
} from "./operationApprovalEvidenceTypes.js";
import type { OperationApprovalDecision } from "./operationApprovalDecision.js";
import type { OperationApprovalRequest } from "./operationApprovalRequest.js";

export function createOperationApprovalEvidenceReport(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
  upstreamEvidence: OperationApprovalUpstreamEvidence = defaultUpstreamEvidence(),
): OperationApprovalEvidenceReport {
  const state = resolveEvidenceState(decision);
  const summary = summarizeEvidence(request, decision, upstreamEvidence);
  const nextActions = collectNextActions(state, request, decision);
  const reportWithoutDigest = {
    service: "orderops-node" as const,
    title: `Operation approval evidence for ${request.action}`,
    generatedAt: new Date().toISOString(),
    requestId: request.requestId,
    ...(decision === undefined ? {} : { decisionId: decision.decisionId }),
    intentId: request.intentId,
    state,
    summary,
    request,
    ...(decision === undefined ? {} : { decision }),
    upstreamEvidence,
    nextActions,
  };

  return {
    ...reportWithoutDigest,
    evidenceDigest: digestOperationApprovalEvidence(reportWithoutDigest),
  };
}
export function digestOperationApprovalEvidence(
  report: Omit<OperationApprovalEvidenceReport, "evidenceDigest">,
): OperationApprovalEvidenceDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: report.service,
        requestId: report.requestId,
        decisionId: report.decisionId ?? null,
        intentId: report.intentId,
        state: report.state,
        summary: report.summary,
        request: report.request,
        decision: report.decision ?? null,
        upstreamEvidence: report.upstreamEvidence,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...EVIDENCE_DIGEST_COVERED_FIELDS],
  };
}

function summarizeEvidence(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
  upstreamEvidence: OperationApprovalUpstreamEvidence,
): OperationApprovalEvidenceReport["summary"] {
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
  return {
    action: request.action,
    target: request.target,
    requestStatus: request.status,
    decision: decision?.decision ?? "missing",
    reviewer: decision?.reviewer ?? request.reviewer,
    upstreamTouched: decision?.upstreamTouched ?? false,
    readyForApprovalRequest: request.readyForApprovalRequest,
    preflightDigest: structuredClone(request.preflightDigest),
    previewDigest: structuredClone(request.previewDigest),
    ...(decision === undefined ? {} : { decisionDigest: structuredClone(decision.decisionDigest) }),
    expectedSideEffectCount: request.expectedSideEffects.length,
    hardBlockerCount: request.hardBlockers.length,
    warningCount: request.warnings.length,
    javaApprovalStatus: upstreamEvidence.javaApprovalStatus.status,
    ...(javaApprovedForReplay === undefined ? {} : { javaApprovedForReplay }),
    ...(javaEvidenceVersion === undefined ? {} : { javaEvidenceVersion }),
    ...(javaApprovalDigest === undefined ? {} : { javaApprovalDigest }),
    ...(javaReplayEligibilityDigest === undefined ? {} : { javaReplayEligibilityDigest }),
    javaExecutionContractStatus: upstreamEvidence.javaExecutionContract.status,
    ...(javaContractVersion === undefined ? {} : { javaContractVersion }),
    ...(javaContractDigest === undefined ? {} : { javaContractDigest }),
    ...(javaReplayPreconditionsSatisfied === undefined ? {} : { javaReplayPreconditionsSatisfied }),
    ...(javaDigestVerificationMode === undefined ? {} : { javaDigestVerificationMode }),
    miniKvExplainCoverage: upstreamEvidence.miniKvExplainCoverage.status,
    miniKvSideEffects: readMiniKvSideEffects(upstreamEvidence.miniKvExplainCoverage.details),
    ...(miniKvSchemaVersion === undefined ? {} : { miniKvSchemaVersion }),
    ...(miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest }),
    ...(miniKvSideEffectCount === undefined ? {} : { miniKvSideEffectCount }),
    miniKvExecutionContractStatus: upstreamEvidence.miniKvExecutionContract.status,
    ...(miniKvCheckReadOnly === undefined ? {} : { miniKvCheckReadOnly }),
    ...(miniKvCheckExecutionAllowed === undefined ? {} : { miniKvCheckExecutionAllowed }),
    ...(miniKvCheckDurability === undefined ? {} : { miniKvCheckDurability }),
  };
}

function defaultUpstreamEvidence(): OperationApprovalUpstreamEvidence {
  return {
    javaApprovalStatus: {
      status: "not_applicable",
      message: "No Java approval-status evidence was attached.",
    },
    miniKvExplainCoverage: {
      status: "not_applicable",
      message: "No mini-kv EXPLAINJSON coverage evidence was attached.",
    },
    javaExecutionContract: {
      status: "not_applicable",
      message: "No Java execution contract evidence was attached.",
    },
    miniKvExecutionContract: {
      status: "not_applicable",
      message: "No mini-kv CHECKJSON execution contract evidence was attached.",
    },
  };
}

function resolveEvidenceState(decision: OperationApprovalDecision | undefined): OperationApprovalEvidenceState {
  return decision?.decision ?? "missing-decision";
}

function collectNextActions(
  state: OperationApprovalEvidenceState,
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): string[] {
  if (decision === undefined) {
    return ["Record an approval decision before using this evidence report for handoff."];
  }
  if (state === "approved") {
    return [
      "Approval evidence is complete for archival review.",
      "Keep this report as proof that Node did not touch upstream execution.",
    ];
  }

  return [
    `Approval was rejected for request ${request.requestId}; keep this evidence with the blocked operation record.`,
    "Do not promote this operation unless a new request and decision are created.",
  ];
}
