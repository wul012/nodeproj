export type HumanApprovalArtifactReviewPostEchoPrerequisiteId =
  | "signed-human-approval-artifact"
  | "credential-handle-approval"
  | "endpoint-handle-allowlist-approval"
  | "no-network-safety-fixture"
  | "abort-rollback-semantics"
  | "java-mini-kv-decision-echo";

export interface HumanApprovalArtifactReviewPostEchoPrerequisiteCatalogEntry {
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
  decisionGateLabel: string;
  closureLabel: string;
  documentedMissingEvidence: string;
  closureMissingEvidence: string;
}

export const JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID =
  "java-mini-kv-decision-echo" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;

export const HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG = [
  {
    id: "signed-human-approval-artifact",
    decisionGateLabel: "Signed human approval artifact instance",
    closureLabel: "Signed human approval artifact",
    documentedMissingEvidence: "missing: v308 defined the review packet shape, but no signed artifact instance is present",
    closureMissingEvidence: "No committed artifact, approval record, safety fixture, or semantics contract exists yet.",
  },
  {
    id: "credential-handle-approval",
    decisionGateLabel: "Credential handle approval attestation",
    closureLabel: "Credential handle approval",
    documentedMissingEvidence: "missing: credential handle review status is contract-only; no approval attestation is present",
    closureMissingEvidence: "No committed artifact, approval record, safety fixture, or semantics contract exists yet.",
  },
  {
    id: "endpoint-handle-allowlist-approval",
    decisionGateLabel: "Endpoint handle allowlist approval",
    closureLabel: "Endpoint handle allowlist approval",
    documentedMissingEvidence: "missing: endpoint handle allowlist review remains a required artifact field",
    closureMissingEvidence: "No committed artifact, approval record, safety fixture, or semantics contract exists yet.",
  },
  {
    id: "no-network-safety-fixture",
    decisionGateLabel: "No-network safety fixture",
    closureLabel: "No-network safety fixture",
    documentedMissingEvidence: "missing: no fixture proves the future runtime path refuses HTTP/TCP before approval",
    closureMissingEvidence: "No committed artifact, approval record, safety fixture, or semantics contract exists yet.",
  },
  {
    id: "abort-rollback-semantics",
    decisionGateLabel: "Manual abort and rollback semantics",
    closureLabel: "Abort and rollback semantics",
    documentedMissingEvidence: "missing: abort and rollback semantics have not been rehearsed for a runtime shell path",
    closureMissingEvidence: "No committed artifact, approval record, safety fixture, or semantics contract exists yet.",
  },
  {
    id: JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
    decisionGateLabel: "Java v144 + mini-kv v137 decision echo",
    closureLabel: "Java v144 + mini-kv v137 decision echo",
    documentedMissingEvidence: "missing: upstreams have not echoed the v310 post-echo decision gate yet",
    closureMissingEvidence: "No committed Java/mini-kv decision echo has been verified yet.",
  },
] as const satisfies readonly HumanApprovalArtifactReviewPostEchoPrerequisiteCatalogEntry[];

export function getHumanApprovalArtifactReviewPostEchoPrerequisite(
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId,
): HumanApprovalArtifactReviewPostEchoPrerequisiteCatalogEntry {
  const entry = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.find((candidate) => candidate.id === id);
  if (!entry) {
    throw new Error(`Unknown human approval artifact review post-echo prerequisite: ${id}`);
  }
  return entry;
}
