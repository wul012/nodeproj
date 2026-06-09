import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckTemplate,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemTemplate,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_VERSIONS = [
  "Node v1422",
  "Node v1423",
  "Node v1424",
  "Node v1425",
  "Node v1426",
  "Node v1427",
  "Node v1428",
  "Node v1429",
  "Node v1430",
  "Node v1431",
  "Node v1432",
  "Node v1433",
  "Node v1434",
  "Node v1435",
  "Node v1436",
  "Node v1437",
  "Node v1438",
  "Node v1439",
  "Node v1440",
  "Node v1441",
  "Node v1442",
  "Node v1443",
  "Node v1444",
  "Node v1445",
  "Node v1446",
] as const satisfies readonly ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestVersion[];

const ALL_INTAKE_GUARD_KINDS: ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind[] = [
  "source-precheck-intake-guard",
  "reviewed-document-envelope-intake-guard",
  "field-completeness-intake-guard",
  "operator-review-attestation-intake-guard",
  "identity-signature-intake-guard",
  "evidence-policy-intake-guard",
  "redaction-secret-boundary-intake-guard",
  "runtime-payload-freeze-intake-guard",
  "execution-write-mutation-freeze-intake-guard",
  "archive-handoff-closeout-intake-guard",
];

const SLOT_BACKED_MATERIAL_REQUESTS = [
  ["source-precheck", "Source precheck", "source-precheck-intake-slot", "source-precheck-intake-guard"],
  ["reviewed-document-envelope", "Reviewed document envelope", "reviewed-document-envelope-intake-slot", "reviewed-document-envelope-intake-guard"],
  ["field-completeness", "Field completeness", "field-completeness-intake-slot", "field-completeness-intake-guard"],
  ["operator-review-attestation", "Operator review attestation", "operator-review-attestation-intake-slot", "operator-review-attestation-intake-guard"],
  ["identity-signature", "Identity signature", "identity-signature-intake-slot", "identity-signature-intake-guard"],
  ["evidence-policy", "Evidence policy", "evidence-policy-intake-slot", "evidence-policy-intake-guard"],
  ["redaction-secret-boundary", "Redaction secret boundary", "redaction-secret-boundary-intake-slot", "redaction-secret-boundary-intake-guard"],
  ["runtime-payload-freeze", "Runtime payload freeze", "runtime-payload-freeze-intake-slot", "runtime-payload-freeze-intake-guard"],
  ["execution-write-mutation-freeze", "Execution write mutation freeze", "execution-write-mutation-freeze-intake-slot", "execution-write-mutation-freeze-intake-guard"],
  ["archive-handoff-closeout", "Archive handoff closeout", "archive-handoff-closeout-intake-slot", "archive-handoff-closeout-intake-guard"],
] as const;

const CROSS_CUTTING_MATERIAL_REQUESTS = [
  ["human-reviewer-identity", "Human reviewer identity", "Request the human reviewer identity and review timestamp for later material submission."],
  ["document-source-uri", "Document source URI", "Request a stable source URI or archive handle for the reviewed real document."],
  ["document-sha256-digest", "Document SHA-256 digest", "Request a SHA-256 digest for the reviewed real document before it is accepted."],
  ["canonical-markdown-body", "Canonical Markdown body", "Request canonical Markdown body text without importing it into runtime payloads."],
  ["field-value-table", "Field value table", "Request a table for all candidate fields while leaving field values absent in Node."],
  ["comparison-binding-table", "Comparison binding table", "Request binding rows that connect submitted fields to compared package evidence."],
  ["signature-attestation", "Signature attestation", "Request reviewer signature attestation without accepting signed approval."],
  ["approval-separation-attestation", "Approval separation attestation", "Request proof that document review is separate from approval grant."],
  ["redaction-log", "Redaction log", "Request redaction notes that prove secret values remain outside the package."],
  ["secret-absence-attestation", "Secret absence attestation", "Request an attestation that the material contains no secret value."],
  ["runtime-payload-absence-attestation", "Runtime payload absence attestation", "Request an attestation that no runtime payload is included."],
  ["import-freeze-attestation", "Import freeze attestation", "Request proof that material is not imported during the request stage."],
  ["evaluation-freeze-attestation", "Evaluation freeze attestation", "Request proof that material is not evaluated during the request stage."],
  ["archive-reference-index", "Archive reference index", "Request a future archive reference index without writing archive state."],
  ["submission-closeout-note", "Submission closeout note", "Request a closeout note that tells the next stage material must be externally supplied."],
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEM_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemTemplate[] = [
    ...SLOT_BACKED_MATERIAL_REQUESTS.map((entry, index) => {
      const [key, label, slotKind, guardKind] = entry;
      const upper = key.toUpperCase().replaceAll("-", "_");

      return {
        nodeVersion: CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_VERSIONS[index],
        code: `CANDIDATE_DOCUMENT_MATERIAL_REQUEST_${upper}`,
        itemName: `${label} material request`,
        kind: `${key}-material-request` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind,
        checkKind: `${key}-material-request-check` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind,
        sourceIntakeSlotKinds: [slotKind] as ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind[],
        sourceIntakeGuardKinds: [guardKind] as ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind[],
        materialInstruction:
          `Request reviewed real candidate document material for ${label.toLowerCase()} without accepting it.`,
        acceptanceCriterion:
          `The ${label.toLowerCase()} material request must keep intake, import, evaluation, approval, runtime, writes, and sibling mutation blocked.`,
      };
    }),
    ...CROSS_CUTTING_MATERIAL_REQUESTS.map((entry, crossIndex) => {
      const [key, label, instruction] = entry;
      const index = SLOT_BACKED_MATERIAL_REQUESTS.length + crossIndex;
      const upper = key.toUpperCase().replaceAll("-", "_");

      return {
        nodeVersion: CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_VERSIONS[index],
        code: `CANDIDATE_DOCUMENT_MATERIAL_REQUEST_${upper}`,
        itemName: `${label} material request`,
        kind: `${key}-material-request` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemKind,
        checkKind: `${key}-material-request-check` as ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckKind,
        sourceIntakeSlotKinds: [] as ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind[],
        sourceIntakeGuardKinds: ALL_INTAKE_GUARD_KINDS,
        materialInstruction: instruction,
        acceptanceCriterion:
          `${label} must be requested without accepting real material or enabling side effects.`,
      };
    }),
  ] satisfies ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItemTemplate[];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECK_TEMPLATES:
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheckTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEM_TEMPLATES.map((item) => ({
      nodeVersion: item.nodeVersion,
      code: `${item.code}_CHECK`,
      kind: item.checkKind,
      sourceRequestItemCode: item.code,
      checkText:
        `Check ${item.itemName.toLowerCase()} still requires external reviewed real material and keeps all side effects blocked.`,
    }));
