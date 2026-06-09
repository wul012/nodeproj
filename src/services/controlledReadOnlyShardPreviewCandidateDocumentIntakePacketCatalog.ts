import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardTemplate,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotTemplate,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_PACKET_VERSIONS = [
  "Node v1412",
  "Node v1413",
  "Node v1414",
  "Node v1415",
  "Node v1416",
  "Node v1417",
  "Node v1418",
  "Node v1419",
  "Node v1420",
  "Node v1421",
] as const satisfies readonly ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion[];

const INTAKE_SLOT_TEMPLATES = [
  [
    "source-precheck",
    "Source precheck",
    [
      "source-lineage-submission-checkpoint",
      "request-instruction-coverage-submission-checkpoint",
      "acceptance-criterion-coverage-submission-checkpoint",
    ],
    "Carry the v1411 submission precheck lineage into an intake packet without accepting document material.",
  ],
  [
    "reviewed-document-envelope",
    "Reviewed document envelope",
    [
      "artifact-shape-submission-checkpoint",
      "document-envelope-shape-submission-checkpoint",
    ],
    "Define the future reviewed real document envelope while leaving the document count at zero.",
  ],
  [
    "field-completeness",
    "Field completeness",
    [
      "comparison-result-submission-checkpoint",
      "identity-digest-submission-checkpoint",
    ],
    "Map requested candidate fields into the intake packet before any payload import occurs.",
  ],
  [
    "operator-review-attestation",
    "Operator review attestation",
    [
      "operator-provenance-submission-checkpoint",
      "operator-review-window-submission-checkpoint",
      "approval-separation-submission-checkpoint",
    ],
    "Require a future operator review attestation without granting approval or signed approval.",
  ],
  [
    "identity-signature",
    "Identity signature",
    [
      "identity-digest-submission-checkpoint",
      "signature-envelope-submission-checkpoint",
    ],
    "Preserve identity and signature envelope requirements while keeping signature material absent.",
  ],
  [
    "evidence-policy",
    "Evidence policy",
    [
      "evidence-handle-submission-checkpoint",
      "policy-lock-submission-checkpoint",
    ],
    "Bind evidence handles and policy locks without starting services or mutating sibling state.",
  ],
  [
    "redaction-secret-boundary",
    "Redaction secret boundary",
    [
      "redaction-boundary-submission-checkpoint",
      "secret-value-absence-submission-checkpoint",
    ],
    "Keep redaction and secret-value boundaries active before the reviewed document exists.",
  ],
  [
    "runtime-payload-freeze",
    "Runtime payload freeze",
    [
      "runtime-payload-absence-submission-checkpoint",
      "import-evaluation-freeze-submission-checkpoint",
    ],
    "Block runtime payload import and candidate evaluation during intake preparation.",
  ],
  [
    "execution-write-mutation-freeze",
    "Execution write mutation freeze",
    [
      "execution-write-mutation-freeze-submission-checkpoint",
      "disabled-probe-state-submission-checkpoint",
    ],
    "Keep execution, writes, sibling mutation, and disabled-probe assumptions frozen.",
  ],
  [
    "archive-handoff-closeout",
    "Archive handoff closeout",
    [
      "archive-closeout-submission-checkpoint",
      "missing-document-submission-checkpoint",
      "synthetic-document-submission-checkpoint",
      "unreviewed-document-submission-checkpoint",
      "archive-reference-handoff-submission-checkpoint",
      "submission-closeout-submission-checkpoint",
    ],
    "Close the intake packet with archive handoff and document rejection guards still active.",
  ],
] as const satisfies readonly [
  string,
  string,
  readonly ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind[],
  string,
][];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_SLOT_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotTemplate[] =
    INTAKE_SLOT_TEMPLATES.map((entry, index) => {
      const [key, label, sourceCheckpointKinds, instruction] = entry;
      const upper = key.toUpperCase().replaceAll("-", "_");

      return {
        nodeVersion: CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_PACKET_VERSIONS[index],
        code: `CANDIDATE_DOCUMENT_INTAKE_PACKET_${upper}`,
        slotName: `${label} intake slot`,
        kind: `${key}-intake-slot` as ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind,
        guardKind: `${key}-intake-guard` as ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind,
        sourceCheckpointKinds: [...sourceCheckpointKinds],
        intakeInstruction: instruction,
        guardCriterion:
          `${label} must stay read-only and block import, evaluation, approval, runtime, writes, and sibling mutation.`,
      };
    });

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_GUARD_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_SLOT_TEMPLATES.map((slot) => ({
      nodeVersion: slot.nodeVersion,
      code: `${slot.code}_GUARD`,
      kind: slot.guardKind,
      sourceSlotCode: slot.code,
      guardText:
        `Guard ${slot.slotName.toLowerCase()} until a reviewed real candidate document is supplied by a human reviewer.`,
    }));
