import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointTemplate,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorTemplate,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VERSIONS = [
  "Node v1447",
  "Node v1448",
  "Node v1449",
  "Node v1450",
  "Node v1451",
  "Node v1452",
  "Node v1453",
  "Node v1454",
  "Node v1455",
  "Node v1456",
] as const satisfies readonly ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckVersion[];

const MATERIAL_SUBMISSION_PRECHECKS = [
  [
    "material-source-package",
    "Material source package",
    [
      "source-precheck-material-request",
      "reviewed-document-envelope-material-request",
      "field-completeness-material-request",
    ],
    "Require the source request package, reviewed document envelope, and field-completeness material before any submission can be considered.",
  ],
  [
    "reviewer-identity",
    "Reviewer identity",
    [
      "human-reviewer-identity-material-request",
      "operator-review-attestation-material-request",
      "identity-signature-material-request",
    ],
    "Require reviewer identity, operator review attestation, and signature identity material without granting approval.",
  ],
  [
    "document-origin",
    "Document origin",
    [
      "document-source-uri-material-request",
      "document-sha256-digest-material-request",
    ],
    "Require stable source URI and digest material before any reviewed document can be submitted.",
  ],
  [
    "digest-canonical-body",
    "Digest and canonical body",
    [
      "canonical-markdown-body-material-request",
      "field-value-table-material-request",
    ],
    "Require canonical body and field table material while keeping the body outside runtime payload import.",
  ],
  [
    "field-table",
    "Field table",
    [
      "field-value-table-material-request",
      "comparison-binding-table-material-request",
    ],
    "Require field values and comparison bindings to cover the same candidate material fields.",
  ],
  [
    "comparison-binding",
    "Comparison binding",
    [
      "comparison-binding-table-material-request",
      "evidence-policy-material-request",
    ],
    "Require evidence-policy binding rows that connect the candidate material back to compared evidence.",
  ],
  [
    "signature-attestation",
    "Signature attestation",
    [
      "signature-attestation-material-request",
      "approval-separation-attestation-material-request",
    ],
    "Require signature and approval-separation attestations without converting them into signed approval.",
  ],
  [
    "redaction-secret",
    "Redaction and secret boundary",
    [
      "redaction-log-material-request",
      "secret-absence-attestation-material-request",
      "redaction-secret-boundary-material-request",
    ],
    "Require redaction log and secret-absence proof so submitted material can stay non-secret.",
  ],
  [
    "runtime-import-freeze",
    "Runtime and import freeze",
    [
      "runtime-payload-absence-attestation-material-request",
      "runtime-payload-freeze-material-request",
      "import-freeze-attestation-material-request",
      "evaluation-freeze-attestation-material-request",
      "execution-write-mutation-freeze-material-request",
    ],
    "Require runtime, import, evaluation, execution, write, and sibling mutation freeze attestations.",
  ],
  [
    "closeout-archive",
    "Closeout archive",
    [
      "archive-reference-index-material-request",
      "archive-handoff-closeout-material-request",
      "submission-closeout-note-material-request",
    ],
    "Require archive references and closeout notes before any later material intake stage starts.",
  ],
] as const;

function checkKindFor(
  kind: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind,
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind {
  return `${kind}-check` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind;
}

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_CHECKPOINT_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointTemplate[] =
    MATERIAL_SUBMISSION_PRECHECKS.map((entry, index) => {
      const [key, label, itemKinds, instruction] = entry;
      const upper = key.toUpperCase().replaceAll("-", "_");
      const sourceItemKinds =
        [...itemKinds] as ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind[];
      const checkpointKind =
        `${key}-submission-checkpoint` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpointKind;
      const validatorKind =
        `${key}-submission-validator` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorKind;

      return {
        nodeVersion:
          CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_VERSIONS[index],
        code: `CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_${upper}`,
        checkpointName: `${label} material submission checkpoint`,
        kind: checkpointKind,
        validatorKind,
        sourceMaterialRequestItemKinds: sourceItemKinds,
        sourceMaterialRequestCheckKinds: sourceItemKinds.map(checkKindFor),
        submissionInstruction: instruction,
        validationRule:
          `${label} submission precheck must remain read-only and reject missing, synthetic, unreviewed, imported, or evaluated material.`,
      };
    });

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_VALIDATOR_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidatorTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_CHECKPOINT_TEMPLATES.map(
      (checkpoint) => ({
        nodeVersion: checkpoint.nodeVersion,
        code: `${checkpoint.code}_VALIDATOR`,
        kind: checkpoint.validatorKind,
        sourceCheckpointCode: checkpoint.code,
        validatorText:
          `Validate ${checkpoint.checkpointName.toLowerCase()} before any reviewed real material submission is accepted.`,
      }),
    );
