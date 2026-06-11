import type { OperationApprovalDecision, OperationApprovalDecisionDigest } from "./operationApprovalDecision.js";
import type { OperationApprovalDigest, OperationApprovalRequest } from "./operationApprovalRequest.js";
import type { EvidenceRecord } from "./operationPreflight.js";

export type OperationApprovalEvidenceState = "missing-decision" | "approved" | "rejected";

export interface OperationApprovalEvidenceDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalUpstreamEvidence {
  javaApprovalStatus: EvidenceRecord;
  miniKvExplainCoverage: EvidenceRecord;
  javaExecutionContract: EvidenceRecord;
  miniKvExecutionContract: EvidenceRecord;
}

export interface OperationApprovalEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalEvidenceState;
  evidenceDigest: OperationApprovalEvidenceDigest;
  summary: {
    action: string;
    target: string;
    requestStatus: OperationApprovalRequest["status"];
    decision: OperationApprovalDecision["decision"] | "missing";
    reviewer: string;
    upstreamTouched: boolean;
    readyForApprovalRequest: boolean;
    preflightDigest: OperationApprovalDigest;
    previewDigest: OperationApprovalDigest;
    decisionDigest?: OperationApprovalDecisionDigest;
    expectedSideEffectCount: number;
    hardBlockerCount: number;
    warningCount: number;
    javaApprovalStatus: EvidenceRecord["status"];
    javaApprovedForReplay?: boolean;
    javaEvidenceVersion?: string;
    javaApprovalDigest?: string;
    javaReplayEligibilityDigest?: string;
    javaExecutionContractStatus: EvidenceRecord["status"];
    javaContractVersion?: string;
    javaContractDigest?: string;
    javaReplayPreconditionsSatisfied?: boolean;
    javaDigestVerificationMode?: string;
    miniKvExplainCoverage: EvidenceRecord["status"];
    miniKvSideEffects: string[];
    miniKvSchemaVersion?: number;
    miniKvCommandDigest?: string;
    miniKvSideEffectCount?: number;
    miniKvExecutionContractStatus: EvidenceRecord["status"];
    miniKvCheckReadOnly?: boolean;
    miniKvCheckExecutionAllowed?: boolean;
    miniKvCheckDurability?: string;
  };
  request: OperationApprovalRequest;
  decision?: OperationApprovalDecision;
  upstreamEvidence: OperationApprovalUpstreamEvidence;
  nextActions: string[];
}

export interface OperationApprovalEvidenceVerification {
  service: "orderops-node";
  verifiedAt: string;
  valid: boolean;
  requestId: string;
  decisionId?: string;
  state: OperationApprovalEvidenceState;
  storedDigest: OperationApprovalEvidenceDigest;
  recomputedDigest: OperationApprovalEvidenceDigest;
  checks: {
    digestValid: boolean;
    requestMatches: boolean;
    decisionPresent: boolean;
    decisionMatchesRequest: boolean;
    requestPreviewDigestValid: boolean;
    decisionDigestValid: boolean;
    summaryMatches: boolean;
    upstreamEvidenceMatchesSummary: boolean;
    javaApprovalDigestEvidenceValid: boolean;
    javaExecutionContractEvidenceValid: boolean;
    miniKvCommandDigestEvidenceValid: boolean;
    miniKvSideEffectCountMatches: boolean;
    miniKvExecutionContractEvidenceValid: boolean;
    nextActionsMatch: boolean;
    upstreamUntouched: boolean;
  };
  summary: OperationApprovalEvidenceReport["summary"];
  nextActions: string[];
}
