import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_VERSIONS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion[] = [
    "Node v1312",
    "Node v1313",
    "Node v1314",
    "Node v1315",
    "Node v1316",
    "Node v1317",
    "Node v1318",
    "Node v1319",
    "Node v1320",
    "Node v1321",
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CHECKPOINTS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointTemplate[] = [
    {
      nodeVersion: "Node v1312",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_SOURCE_PREFLIGHT_CHECKPOINT",
      checkpointName: "Source comparison preflight readiness",
      kind: "source-comparison-preflight-acceptance-checkpoint",
      checkpointMode: "source-preflight-readiness",
      sourceLaneKinds: [
        "identity-comparison-lane",
        "digest-binding-comparison-lane",
        "signature-envelope-comparison-lane",
        "source-evidence-comparison-lane",
        "value-binding-comparison-lane",
        "policy-comparison-lane",
        "execution-lock-comparison-lane",
        "archive-closeout-comparison-lane",
      ],
      sourceLaneModes: [
        "metadata-comparison-lane",
        "digest-recheck-lane",
        "signature-envelope-comparison-lane",
        "policy-comparison-lane",
        "execution-lock-comparison-lane",
        "comparison-closeout",
      ],
      sourceAcceptanceControlKinds: [
        "identity-acceptance-control",
        "digest-binding-acceptance-control",
        "signature-envelope-acceptance-control",
        "source-evidence-acceptance-control",
        "value-binding-acceptance-control",
        "policy-acceptance-control",
        "execution-lock-acceptance-control",
        "archive-closeout-acceptance-control",
      ],
      acceptancePrecheckQuestion:
        "Is the v1311 comparison preflight complete, ready, read-only, and still blocking real package acceptance?",
      requiredAcceptanceEvidence:
        "The v1311 comparison preflight digest, twenty-five ready lanes, and twenty-five ready acceptance controls.",
    },
    {
      nodeVersion: "Node v1313",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_IDENTITY_CHECKPOINT",
      checkpointName: "Identity and request metadata acceptance precheck",
      kind: "identity-acceptance-checkpoint",
      checkpointMode: "metadata-acceptance-precheck",
      sourceLaneKinds: ["identity-comparison-lane"],
      sourceLaneModes: [],
      sourceAcceptanceControlKinds: ["identity-acceptance-control"],
      acceptancePrecheckQuestion:
        "Are request identity, operator identity, correlation id, and artifact identity lanes ready before acceptance review?",
      requiredAcceptanceEvidence:
        "A compared package must later bind request, operator, correlation, and artifact identity metadata to the v1311 lanes.",
    },
    {
      nodeVersion: "Node v1314",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_DIGEST_BINDING_CHECKPOINT",
      checkpointName: "Digest binding acceptance precheck",
      kind: "digest-binding-acceptance-checkpoint",
      checkpointMode: "digest-acceptance-precheck",
      sourceLaneKinds: ["digest-binding-comparison-lane"],
      sourceLaneModes: ["digest-recheck-lane"],
      sourceAcceptanceControlKinds: ["digest-binding-acceptance-control"],
      acceptancePrecheckQuestion:
        "Are all digest binding and digest recheck lanes ready before a compared package can be considered?",
      requiredAcceptanceEvidence:
        "A compared package must later provide digest matches for template, review, preflight, and submission lineage.",
    },
    {
      nodeVersion: "Node v1315",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_SIGNATURE_ENVELOPE_CHECKPOINT",
      checkpointName: "Detached signature envelope acceptance precheck",
      kind: "signature-envelope-acceptance-checkpoint",
      checkpointMode: "signature-acceptance-precheck",
      sourceLaneKinds: ["signature-envelope-comparison-lane"],
      sourceLaneModes: ["signature-envelope-comparison-lane"],
      sourceAcceptanceControlKinds: ["signature-envelope-acceptance-control"],
      acceptancePrecheckQuestion:
        "Are detached signature envelope lanes ready while signature payload ingestion remains disabled?",
      requiredAcceptanceEvidence:
        "A compared package must later prove signature envelope metadata without importing or executing a signature payload.",
    },
    {
      nodeVersion: "Node v1316",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_SOURCE_EVIDENCE_CHECKPOINT",
      checkpointName: "Source evidence handle acceptance precheck",
      kind: "source-evidence-acceptance-checkpoint",
      checkpointMode: "source-evidence-acceptance-precheck",
      sourceLaneKinds: ["source-evidence-comparison-lane"],
      sourceLaneModes: [],
      sourceAcceptanceControlKinds: ["source-evidence-acceptance-control"],
      acceptancePrecheckQuestion:
        "Are source evidence handle lanes ready without importing fresh Java or mini-kv runtime payloads?",
      requiredAcceptanceEvidence:
        "A compared package must later reference existing source evidence handles and must not mutate sibling state.",
    },
    {
      nodeVersion: "Node v1317",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_OPERATOR_VALUE_CHECKPOINT",
      checkpointName: "Operator value handle acceptance precheck",
      kind: "operator-value-acceptance-checkpoint",
      checkpointMode: "value-binding-acceptance-precheck",
      sourceLaneKinds: ["value-binding-comparison-lane"],
      sourceLaneModes: [],
      sourceAcceptanceControlKinds: ["value-binding-acceptance-control"],
      acceptancePrecheckQuestion:
        "Are operator value handle lanes ready while operator value supply and evidence import remain blocked?",
      requiredAcceptanceEvidence:
        "A compared package must later bind non-secret value handles without enabling value import or runtime payload routing.",
    },
    {
      nodeVersion: "Node v1318",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_POLICY_CHECKPOINT",
      checkpointName: "Policy and review state acceptance precheck",
      kind: "policy-acceptance-checkpoint",
      checkpointMode: "policy-acceptance-precheck",
      sourceLaneKinds: ["policy-comparison-lane"],
      sourceLaneModes: ["policy-comparison-lane"],
      sourceAcceptanceControlKinds: ["policy-acceptance-control"],
      acceptancePrecheckQuestion:
        "Are policy assertion and review-state lanes ready before any acceptance evidence can be evaluated?",
      requiredAcceptanceEvidence:
        "A compared package must later prove policy assertion alignment and review-state lineage without approving execution.",
    },
    {
      nodeVersion: "Node v1319",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_EXECUTION_LOCK_CHECKPOINT",
      checkpointName: "Execution lock acceptance precheck",
      kind: "execution-lock-acceptance-checkpoint",
      checkpointMode: "execution-lock-acceptance-precheck",
      sourceLaneKinds: ["execution-lock-comparison-lane"],
      sourceLaneModes: ["execution-lock-comparison-lane"],
      sourceAcceptanceControlKinds: ["execution-lock-acceptance-control"],
      acceptancePrecheckQuestion:
        "Do execution lock lanes still block runtime payloads, writes, sibling mutation, live execution, and production execution?",
      requiredAcceptanceEvidence:
        "A compared package must later preserve no-runtime, no-write, no-sibling-mutation, no-live, and no-production locks.",
    },
    {
      nodeVersion: "Node v1320",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_APPROVAL_GRANT_REVIEW_CHECKPOINT",
      checkpointName: "Approval grant review acceptance precheck",
      kind: "approval-grant-review-acceptance-checkpoint",
      checkpointMode: "approval-grant-review-precheck",
      sourceLaneKinds: [
        "signature-envelope-comparison-lane",
        "policy-comparison-lane",
        "execution-lock-comparison-lane",
      ],
      sourceLaneModes: [
        "signature-envelope-comparison-lane",
        "policy-comparison-lane",
        "execution-lock-comparison-lane",
      ],
      sourceAcceptanceControlKinds: [
        "signature-envelope-acceptance-control",
        "policy-acceptance-control",
        "execution-lock-acceptance-control",
      ],
      acceptancePrecheckQuestion:
        "Is approval grant review still separate from package comparison and blocked until a later explicit review?",
      requiredAcceptanceEvidence:
        "A compared package must later show approval-grant review evidence without treating comparison as an approval grant.",
    },
    {
      nodeVersion: "Node v1321",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CLOSEOUT_CHECKPOINT",
      checkpointName: "Archive closeout acceptance precheck",
      kind: "archive-closeout-acceptance-checkpoint",
      checkpointMode: "acceptance-closeout",
      sourceLaneKinds: ["archive-closeout-comparison-lane"],
      sourceLaneModes: ["comparison-closeout"],
      sourceAcceptanceControlKinds: ["archive-closeout-acceptance-control"],
      acceptancePrecheckQuestion:
        "Is the comparison acceptance precheck closed with archive evidence and no accepted package material?",
      requiredAcceptanceEvidence:
        "A later archive must show no submitted, compared, accepted, rejected, signed, or approval-grant payload material.",
    },
  ];
