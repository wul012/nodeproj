import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

type CandidateIntakeSlotKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotTemplate["kind"];
type CandidateIntakeGuardKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardTemplate["kind"];

const CANDIDATE_INTAKE_GUARD_KIND_BY_SLOT_KIND: Record<CandidateIntakeSlotKind, CandidateIntakeGuardKind> = {
  "source-lineage-candidate-intake-slot": "source-lineage-candidate-intake-guard",
  "artifact-shape-candidate-intake-slot": "artifact-shape-candidate-intake-guard",
  "operator-provenance-candidate-intake-slot": "operator-provenance-candidate-intake-guard",
  "comparison-result-candidate-intake-slot": "comparison-result-candidate-intake-guard",
  "identity-digest-candidate-intake-slot": "identity-digest-candidate-intake-guard",
  "signature-envelope-candidate-intake-slot": "signature-envelope-candidate-intake-guard",
  "evidence-handle-candidate-intake-slot": "evidence-handle-candidate-intake-guard",
  "policy-lock-candidate-intake-slot": "policy-lock-candidate-intake-guard",
  "approval-separation-candidate-intake-slot": "approval-separation-candidate-intake-guard",
  "archive-closeout-candidate-intake-slot": "archive-closeout-candidate-intake-guard",
};

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_VERSIONS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion[] = [
    "Node v1362",
    "Node v1363",
    "Node v1364",
    "Node v1365",
    "Node v1366",
    "Node v1367",
    "Node v1368",
    "Node v1369",
    "Node v1370",
    "Node v1371",
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlotTemplate[] = [
    {
      nodeVersion: "Node v1362",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_LINEAGE_SLOT",
      slotName: "Source lineage candidate intake slot",
      kind: "source-lineage-candidate-intake-slot",
      sourceSectionKind: "source-lineage-candidate-section",
      intakeQuestion: "Is a real candidate document ready to populate source intake digest and digest lineage?",
    },
    {
      nodeVersion: "Node v1363",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_ARTIFACT_SHAPE_SLOT",
      slotName: "Artifact shape candidate intake slot",
      kind: "artifact-shape-candidate-intake-slot",
      sourceSectionKind: "artifact-shape-candidate-section",
      intakeQuestion: "Is a real candidate document ready to prove immutable shape and secret exclusion?",
    },
    {
      nodeVersion: "Node v1364",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_OPERATOR_PROVENANCE_SLOT",
      slotName: "Operator provenance candidate intake slot",
      kind: "operator-provenance-candidate-intake-slot",
      sourceSectionKind: "operator-provenance-candidate-section",
      intakeQuestion: "Is a real candidate document ready to bind operator provenance and manual submission references?",
    },
    {
      nodeVersion: "Node v1365",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_COMPARISON_RESULT_SLOT",
      slotName: "Comparison result candidate intake slot",
      kind: "comparison-result-candidate-intake-slot",
      sourceSectionKind: "comparison-result-candidate-section",
      intakeQuestion: "Is a real candidate document ready to state comparison result and non-synthetic provenance?",
    },
    {
      nodeVersion: "Node v1366",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_IDENTITY_DIGEST_SLOT",
      slotName: "Identity digest candidate intake slot",
      kind: "identity-digest-candidate-intake-slot",
      sourceSectionKind: "identity-digest-candidate-section",
      intakeQuestion: "Is a real candidate document ready to tie identity binding to reviewer traceability?",
    },
    {
      nodeVersion: "Node v1367",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SIGNATURE_ENVELOPE_SLOT",
      slotName: "Signature envelope candidate intake slot",
      kind: "signature-envelope-candidate-intake-slot",
      sourceSectionKind: "signature-envelope-candidate-section",
      intakeQuestion: "Is a real candidate document ready to describe signature metadata without payload import?",
    },
    {
      nodeVersion: "Node v1368",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_EVIDENCE_HANDLE_SLOT",
      slotName: "Evidence handle candidate intake slot",
      kind: "evidence-handle-candidate-intake-slot",
      sourceSectionKind: "evidence-handle-candidate-section",
      intakeQuestion: "Is a real candidate document ready to cite evidence handles without reading raw values?",
    },
    {
      nodeVersion: "Node v1369",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_POLICY_LOCK_SLOT",
      slotName: "Policy lock candidate intake slot",
      kind: "policy-lock-candidate-intake-slot",
      sourceSectionKind: "policy-lock-candidate-section",
      intakeQuestion: "Is a real candidate document ready to preserve policy, execution, write, and sibling mutation locks?",
    },
    {
      nodeVersion: "Node v1370",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_APPROVAL_SEPARATION_SLOT",
      slotName: "Approval separation candidate intake slot",
      kind: "approval-separation-candidate-intake-slot",
      sourceSectionKind: "approval-separation-candidate-section",
      intakeQuestion: "Is a real candidate document ready to prove comparison still is not approval?",
    },
    {
      nodeVersion: "Node v1371",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_ARCHIVE_CLOSEOUT_SLOT",
      slotName: "Archive closeout candidate intake slot",
      kind: "archive-closeout-candidate-intake-slot",
      sourceSectionKind: "archive-closeout-candidate-section",
      intakeQuestion: "Is a real candidate document ready to close archive references without signing or executing?",
    },
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuardTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS
      .map((slot) => ({
        nodeVersion: slot.nodeVersion,
        code: `${slot.code}_GUARD`,
        kind: CANDIDATE_INTAKE_GUARD_KIND_BY_SLOT_KIND[slot.kind],
        sourceSlotCode: slot.code,
        guardText:
          "Reject missing or synthetic candidate documents and keep unreviewed candidate material quarantined until a real compared evidence candidate is supplied.",
      }));
