import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointTemplate,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorTemplate,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VERSIONS = [
  "Node v1387",
  "Node v1388",
  "Node v1389",
  "Node v1390",
  "Node v1391",
  "Node v1392",
  "Node v1393",
  "Node v1394",
  "Node v1395",
  "Node v1396",
  "Node v1397",
  "Node v1398",
  "Node v1399",
  "Node v1400",
  "Node v1401",
  "Node v1402",
  "Node v1403",
  "Node v1404",
  "Node v1405",
  "Node v1406",
  "Node v1407",
  "Node v1408",
  "Node v1409",
  "Node v1410",
  "Node v1411",
] as const satisfies readonly ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckVersion[];

const ALL_REQUEST_CHECK_KINDS: ControlledReadOnlyShardPreviewCandidateDocumentRequestCheckKind[] = [
  "source-lineage-document-request-check",
  "artifact-shape-document-request-check",
  "operator-provenance-document-request-check",
  "comparison-result-document-request-check",
  "identity-digest-document-request-check",
  "signature-envelope-document-request-check",
  "evidence-handle-document-request-check",
  "policy-lock-document-request-check",
  "approval-separation-document-request-check",
  "archive-closeout-document-request-check",
  "missing-document-rejection-request-check",
  "synthetic-document-rejection-request-check",
  "unreviewed-document-quarantine-request-check",
  "import-evaluation-freeze-request-check",
  "execution-write-mutation-freeze-request-check",
];

const SLOT_BACKED_CHECKPOINTS = [
  ["source-lineage", "Source lineage", "source-lineage-document-request", "source-lineage-document-request-check"],
  ["artifact-shape", "Artifact shape", "artifact-shape-document-request", "artifact-shape-document-request-check"],
  ["operator-provenance", "Operator provenance", "operator-provenance-document-request", "operator-provenance-document-request-check"],
  ["comparison-result", "Comparison result", "comparison-result-document-request", "comparison-result-document-request-check"],
  ["identity-digest", "Identity digest", "identity-digest-document-request", "identity-digest-document-request-check"],
  ["signature-envelope", "Signature envelope", "signature-envelope-document-request", "signature-envelope-document-request-check"],
  ["evidence-handle", "Evidence handle", "evidence-handle-document-request", "evidence-handle-document-request-check"],
  ["policy-lock", "Policy lock", "policy-lock-document-request", "policy-lock-document-request-check"],
  ["approval-separation", "Approval separation", "approval-separation-document-request", "approval-separation-document-request-check"],
  ["archive-closeout", "Archive closeout", "archive-closeout-document-request", "archive-closeout-document-request-check"],
  ["missing-document", "Missing document", "missing-document-rejection-request", "missing-document-rejection-request-check"],
  ["synthetic-document", "Synthetic document", "synthetic-document-rejection-request", "synthetic-document-rejection-request-check"],
  ["unreviewed-document", "Unreviewed document", "unreviewed-document-quarantine-request", "unreviewed-document-quarantine-request-check"],
  ["import-evaluation-freeze", "Import evaluation freeze", "import-evaluation-freeze-request", "import-evaluation-freeze-request-check"],
  ["execution-write-mutation-freeze", "Execution write mutation freeze", "execution-write-mutation-freeze-request", "execution-write-mutation-freeze-request-check"],
] as const;

const CROSS_CUTTING_CHECKPOINTS = [
  ["request-instruction-coverage", "Request instruction coverage", "Verify every request item has a submission instruction before a real document is accepted."],
  ["acceptance-criterion-coverage", "Acceptance criterion coverage", "Verify every request item has an acceptance criterion before a real document is accepted."],
  ["document-envelope-shape", "Document envelope shape", "Verify the future document envelope can carry all requested fields without carrying runtime payloads."],
  ["operator-review-window", "Operator review window", "Verify the future submission has a review window and does not bypass manual review."],
  ["redaction-boundary", "Redaction boundary", "Verify redaction rules keep secret values out of the submission precheck."],
  ["secret-value-absence", "Secret value absence", "Verify no secret value is present in the submission precheck package."],
  ["runtime-payload-absence", "Runtime payload absence", "Verify no runtime payload is present before reviewed document intake."],
  ["disabled-probe-state", "Disabled probe state", "Verify disabled-probe smoke checks do not assume the package state is ready."],
  ["archive-reference-handoff", "Archive reference handoff", "Verify archive references can be handed off without starting services."],
  ["submission-closeout", "Submission closeout", "Verify the submission precheck is closed out while waiting for reviewed real material."],
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINT_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointTemplate[] = [
    ...SLOT_BACKED_CHECKPOINTS.map((entry, index) => {
      const [key, label, itemKind, checkKind] = entry;
      const upper = key.toUpperCase().replaceAll("-", "_");

      return {
        nodeVersion: CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VERSIONS[index],
        code: `CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_${upper}`,
        checkpointName: `${label} submission checkpoint`,
        kind: `${key}-submission-checkpoint` as ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind,
        validatorKind: `${key}-submission-validator` as ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind,
        sourceRequestItemKinds: [itemKind],
        sourceRequestCheckKinds: [checkKind],
        submissionInstruction:
          `Precheck the reviewed real candidate document submission for ${label.toLowerCase()} before intake.`,
        validationCriterion:
          `The ${label.toLowerCase()} submission checkpoint must stay read-only and block import, evaluation, approval, runtime, writes, and sibling mutation.`,
      };
    }),
    ...CROSS_CUTTING_CHECKPOINTS.map((entry, crossIndex) => {
      const [key, label, instruction] = entry;
      const index = SLOT_BACKED_CHECKPOINTS.length + crossIndex;
      const upper = key.toUpperCase().replaceAll("-", "_");

      return {
        nodeVersion: CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VERSIONS[index],
        code: `CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_${upper}`,
        checkpointName: `${label} submission checkpoint`,
        kind: `${key}-submission-checkpoint` as ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind,
        validatorKind: `${key}-submission-validator` as ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorKind,
        sourceRequestItemKinds: [] as ControlledReadOnlyShardPreviewCandidateDocumentRequestItemKind[],
        sourceRequestCheckKinds: ALL_REQUEST_CHECK_KINDS,
        submissionInstruction: instruction,
        validationCriterion:
          `${label} must be satisfied without accepting a real document, importing a payload, or enabling execution.`,
      };
    }),
  ] satisfies ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointTemplate[];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATOR_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidatorTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINT_TEMPLATES.map((checkpoint) => ({
      nodeVersion: checkpoint.nodeVersion,
      code: `${checkpoint.code}_VALIDATOR`,
      kind: checkpoint.validatorKind,
      sourceCheckpointCode: checkpoint.code,
      validatorText:
        `Validate ${checkpoint.checkpointName.toLowerCase()} requires reviewed real material and keeps all side effects blocked.`,
    }));
