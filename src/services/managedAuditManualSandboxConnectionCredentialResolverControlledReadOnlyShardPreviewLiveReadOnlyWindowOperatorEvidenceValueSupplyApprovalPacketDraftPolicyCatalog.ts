import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.js";

export interface ControlledReadOnlyShardPreviewValueSupplyApprovalPacketDraftPolicy {
  code: string;
  approvalPolicy: "signed-human-approval-required";
  packetPolicy: "draft-only-no-approval-grant";
  valueShapeRule: "explicit-typed-value-envelope";
  missingValuePolicy: "fail-closed";
  malformedValuePolicy: "reject";
  redactionPolicy: "redact-before-persist";
  provenancePolicy: "source-evidence-required";
  approvalFieldNames: string[];
  requiredReviewRecordFields: string[];
}

const COMMON_APPROVAL_FIELDS = Object.freeze([
  "approvalPacketId",
  "operatorIdentity",
  "approvalTimestamp",
  "sourceEvidenceVersion",
  "valueShape",
  "redactedValueDigest",
]);

const COMMON_REVIEW_FIELDS = Object.freeze([
  "sourceEvidenceFileId",
  "sourceEvidenceSnippetId",
  "sourceEnvelopeSlotCode",
  "missingValuePolicy",
  "malformedValuePolicy",
  "redactionPolicy",
  "provenancePolicy",
]);

const PROJECT_REVIEW_FIELDS: Record<
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
  readonly string[]
> = Object.freeze({
  java: Object.freeze(["javaCloseoutEndpoint", "javaCloseoutProfile", "javaExecutionLock"]),
  miniKv: Object.freeze(["miniKvCommand", "miniKvEnvelopeMode", "miniKvStoreUnchangedProof"]),
  node: Object.freeze(["nodeSourceEnvelopeDigest", "nodeSourceEnvelopeReadiness", "nodeCloseoutPlan"]),
});

export function createValueSupplyApprovalPacketDraftPolicy(
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
  code: string,
): ControlledReadOnlyShardPreviewValueSupplyApprovalPacketDraftPolicy {
  return {
    code,
    approvalPolicy: "signed-human-approval-required",
    packetPolicy: "draft-only-no-approval-grant",
    valueShapeRule: "explicit-typed-value-envelope",
    missingValuePolicy: "fail-closed",
    malformedValuePolicy: "reject",
    redactionPolicy: "redact-before-persist",
    provenancePolicy: "source-evidence-required",
    approvalFieldNames: [...COMMON_APPROVAL_FIELDS, `${project}ApprovalJustification`],
    requiredReviewRecordFields: [...COMMON_REVIEW_FIELDS, ...PROJECT_REVIEW_FIELDS[project]],
  };
}
