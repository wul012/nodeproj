import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";

type CandidateSectionKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionTemplate["kind"];
type CandidateBlockerKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerTemplate["kind"];

const CANDIDATE_BLOCKER_KIND_BY_SECTION_KIND: Record<CandidateSectionKind, CandidateBlockerKind> = {
  "source-lineage-candidate-section": "source-lineage-candidate-blocker",
  "artifact-shape-candidate-section": "artifact-shape-candidate-blocker",
  "operator-provenance-candidate-section": "operator-provenance-candidate-blocker",
  "comparison-result-candidate-section": "comparison-result-candidate-blocker",
  "identity-digest-candidate-section": "identity-digest-candidate-blocker",
  "signature-envelope-candidate-section": "signature-envelope-candidate-blocker",
  "evidence-handle-candidate-section": "evidence-handle-candidate-blocker",
  "policy-lock-candidate-section": "policy-lock-candidate-blocker",
  "approval-separation-candidate-section": "approval-separation-candidate-blocker",
  "archive-closeout-candidate-section": "archive-closeout-candidate-blocker",
};

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_VERSIONS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion[] = [
    "Node v1352",
    "Node v1353",
    "Node v1354",
    "Node v1355",
    "Node v1356",
    "Node v1357",
    "Node v1358",
    "Node v1359",
    "Node v1360",
    "Node v1361",
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SECTIONS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSectionTemplate[] = [
    {
      nodeVersion: "Node v1352",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SOURCE_LINEAGE_SECTION",
      sectionName: "Source lineage candidate section",
      kind: "source-lineage-candidate-section",
      sourceRuleKinds: [
        "source-intake-readiness-evaluation-rule",
        "digest-lineage-evaluation-rule",
      ],
      candidateFields: ["sourceIntakeDigest", "digestLineage"],
      candidateQuestion: "Can a real candidate bind the source intake and digest lineage without importing payloads?",
    },
    {
      nodeVersion: "Node v1353",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_ARTIFACT_SHAPE_SECTION",
      sectionName: "Artifact shape candidate section",
      kind: "artifact-shape-candidate-section",
      sourceRuleKinds: [
        "evidence-artifact-shape-evaluation-rule",
        "secret-value-exclusion-evaluation-rule",
      ],
      candidateFields: ["artifactShape", "secretValueExclusion"],
      candidateQuestion: "Can a real candidate describe immutable shape and secret exclusion without revealing values?",
    },
    {
      nodeVersion: "Node v1354",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_OPERATOR_PROVENANCE_SECTION",
      sectionName: "Operator provenance candidate section",
      kind: "operator-provenance-candidate-section",
      sourceRuleKinds: [
        "operator-provenance-evaluation-rule",
        "manual-submission-reference-evaluation-rule",
      ],
      candidateFields: ["operatorProvenance", "manualSubmissionReference"],
      candidateQuestion: "Can a real candidate bind operator provenance and manual submission references?",
    },
    {
      nodeVersion: "Node v1355",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_COMPARISON_RESULT_SECTION",
      sectionName: "Comparison result candidate section",
      kind: "comparison-result-candidate-section",
      sourceRuleKinds: [
        "offline-comparison-result-evaluation-rule",
        "synthetic-evidence-exclusion-evaluation-rule",
      ],
      candidateFields: ["offlineComparisonResult", "syntheticEvidenceExclusion"],
      candidateQuestion: "Can a real candidate state the offline result and prove it is not synthetic evidence?",
    },
    {
      nodeVersion: "Node v1356",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_IDENTITY_DIGEST_SECTION",
      sectionName: "Identity digest candidate section",
      kind: "identity-digest-candidate-section",
      sourceRuleKinds: [
        "identity-binding-evaluation-rule",
        "reviewer-traceability-evaluation-rule",
      ],
      candidateFields: ["identityBinding", "reviewerTraceability"],
      candidateQuestion: "Can a real candidate tie identity binding to reviewer traceability?",
    },
    {
      nodeVersion: "Node v1357",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SIGNATURE_ENVELOPE_SECTION",
      sectionName: "Signature envelope candidate section",
      kind: "signature-envelope-candidate-section",
      sourceRuleKinds: [
        "signature-envelope-metadata-evaluation-rule",
        "runtime-payload-exclusion-evaluation-rule",
      ],
      candidateFields: ["signatureEnvelopeMetadata", "runtimePayloadExclusion"],
      candidateQuestion: "Can a real candidate describe signature metadata while keeping runtime payloads excluded?",
    },
    {
      nodeVersion: "Node v1358",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_EVIDENCE_HANDLE_SECTION",
      sectionName: "Evidence handle candidate section",
      kind: "evidence-handle-candidate-section",
      sourceRuleKinds: [
        "source-evidence-handle-evaluation-rule",
        "operator-value-handle-evaluation-rule",
      ],
      candidateFields: ["sourceEvidenceHandles", "operatorValueHandles"],
      candidateQuestion: "Can a real candidate cite source and operator value handles without reading raw values?",
    },
    {
      nodeVersion: "Node v1359",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_POLICY_LOCK_SECTION",
      sectionName: "Policy lock candidate section",
      kind: "policy-lock-candidate-section",
      sourceRuleKinds: [
        "policy-assertion-evaluation-rule",
        "execution-lock-evaluation-rule",
        "write-and-sibling-mutation-exclusion-evaluation-rule",
      ],
      candidateFields: ["policyAssertions", "executionLocks", "writeAndSiblingMutationExclusion"],
      candidateQuestion: "Can a real candidate keep policy, execution, write, and sibling mutation locks intact?",
    },
    {
      nodeVersion: "Node v1360",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_APPROVAL_SEPARATION_SECTION",
      sectionName: "Approval separation candidate section",
      kind: "approval-separation-candidate-section",
      sourceRuleKinds: ["approval-grant-separation-evaluation-rule"],
      candidateFields: ["approvalGrantSeparation"],
      candidateQuestion: "Can a real candidate prove comparison is still not approval?",
    },
    {
      nodeVersion: "Node v1361",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_ARCHIVE_CLOSEOUT_SECTION",
      sectionName: "Archive closeout candidate section",
      kind: "archive-closeout-candidate-section",
      sourceRuleKinds: [
        "archive-reference-evaluation-rule",
        "evaluation-closeout-evaluation-rule",
      ],
      candidateFields: ["archiveReferences", "evaluationCloseout"],
      candidateQuestion: "Can a real candidate close archive references without accepting, signing, or executing?",
    },
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_BLOCKERS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockerTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SECTIONS
      .map((section) => ({
        nodeVersion: section.nodeVersion,
        code: `${section.code}_BLOCKER`,
        kind: CANDIDATE_BLOCKER_KIND_BY_SECTION_KIND[section.kind],
        sourceSectionCode: section.code,
        blockerText:
          "Block candidate materialization, acceptance, approval capture, runtime payloads, writes, and sibling mutation until a real compared evidence candidate is supplied.",
      }));
