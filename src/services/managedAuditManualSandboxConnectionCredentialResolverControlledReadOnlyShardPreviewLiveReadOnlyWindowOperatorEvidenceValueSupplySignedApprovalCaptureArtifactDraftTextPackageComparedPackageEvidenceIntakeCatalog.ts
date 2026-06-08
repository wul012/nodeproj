import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";

const ALL_SOURCE_CHECKPOINT_KINDS = [
  "source-comparison-preflight-acceptance-checkpoint",
  "identity-acceptance-checkpoint",
  "digest-binding-acceptance-checkpoint",
  "signature-envelope-acceptance-checkpoint",
  "source-evidence-acceptance-checkpoint",
  "operator-value-acceptance-checkpoint",
  "policy-acceptance-checkpoint",
  "execution-lock-acceptance-checkpoint",
  "approval-grant-review-acceptance-checkpoint",
  "archive-closeout-acceptance-checkpoint",
] as const;

const ALL_SOURCE_GUARD_KINDS = [
  "source-comparison-preflight-acceptance-guard",
  "identity-acceptance-guard",
  "digest-binding-acceptance-guard",
  "signature-envelope-acceptance-guard",
  "source-evidence-acceptance-guard",
  "operator-value-acceptance-guard",
  "policy-acceptance-guard",
  "execution-lock-acceptance-guard",
  "approval-grant-review-acceptance-guard",
  "archive-closeout-acceptance-guard",
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_VERSIONS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion[] = [
    "Node v1322",
    "Node v1323",
    "Node v1324",
    "Node v1325",
    "Node v1326",
    "Node v1327",
    "Node v1328",
    "Node v1329",
    "Node v1330",
    "Node v1331",
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotTemplate[] = [
    {
      nodeVersion: "Node v1322",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_PRECHECK_SLOT",
      slotName: "Source acceptance precheck evidence contract",
      kind: "source-acceptance-precheck-evidence-slot",
      slotMode: "source-precheck-contract",
      sourceCheckpointKinds: [...ALL_SOURCE_CHECKPOINT_KINDS],
      sourceGuardKinds: [...ALL_SOURCE_GUARD_KINDS],
      requiredRealEvidence:
        "A real manually compared package evidence artifact must cite the v1321 acceptance precheck digest and all ten source checkpoints.",
      manualEvidenceField: "sourceAcceptancePrecheckDigest",
    },
    {
      nodeVersion: "Node v1323",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_MANUAL_SUBMISSION_REFERENCE_SLOT",
      slotName: "Manual submission reference evidence",
      kind: "manual-submission-reference-evidence-slot",
      slotMode: "manual-submission-reference",
      sourceCheckpointKinds: ["source-comparison-preflight-acceptance-checkpoint"],
      sourceGuardKinds: ["source-comparison-preflight-acceptance-guard"],
      requiredRealEvidence:
        "A future evidence artifact must reference the operator-submitted draft text package source without creating a package inside Node.",
      manualEvidenceField: "manualSubmissionReference",
    },
    {
      nodeVersion: "Node v1324",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_OFFLINE_COMPARISON_RESULT_SLOT",
      slotName: "Offline comparison result evidence",
      kind: "offline-comparison-result-evidence-slot",
      slotMode: "offline-comparison-result",
      sourceCheckpointKinds: [
        "source-comparison-preflight-acceptance-checkpoint",
        "digest-binding-acceptance-checkpoint",
      ],
      sourceGuardKinds: [
        "source-comparison-preflight-acceptance-guard",
        "digest-binding-acceptance-guard",
      ],
      requiredRealEvidence:
        "A future evidence artifact must show the offline comparison result and bind it to digest-recheck lanes.",
      manualEvidenceField: "offlineComparisonResult",
    },
    {
      nodeVersion: "Node v1325",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_IDENTITY_BINDING_SLOT",
      slotName: "Identity binding evidence",
      kind: "identity-binding-evidence-slot",
      slotMode: "identity-binding",
      sourceCheckpointKinds: ["identity-acceptance-checkpoint"],
      sourceGuardKinds: ["identity-acceptance-guard"],
      requiredRealEvidence:
        "A future evidence artifact must bind request, operator, correlation, and artifact identity to the compared package.",
      manualEvidenceField: "identityBinding",
    },
    {
      nodeVersion: "Node v1326",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_DIGEST_MATCH_SUMMARY_SLOT",
      slotName: "Digest match summary evidence",
      kind: "digest-match-summary-evidence-slot",
      slotMode: "digest-match-summary",
      sourceCheckpointKinds: ["digest-binding-acceptance-checkpoint"],
      sourceGuardKinds: ["digest-binding-acceptance-guard"],
      requiredRealEvidence:
        "A future evidence artifact must summarize digest matches for review, submission, comparison, and acceptance precheck lineage.",
      manualEvidenceField: "digestMatchSummary",
    },
    {
      nodeVersion: "Node v1327",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SIGNATURE_ENVELOPE_OBSERVATION_SLOT",
      slotName: "Detached signature envelope observation evidence",
      kind: "detached-signature-envelope-observation-evidence-slot",
      slotMode: "signature-envelope-observation",
      sourceCheckpointKinds: ["signature-envelope-acceptance-checkpoint"],
      sourceGuardKinds: ["signature-envelope-acceptance-guard"],
      requiredRealEvidence:
        "A future evidence artifact may describe detached signature envelope metadata but must not import a signature payload.",
      manualEvidenceField: "signatureEnvelopeObservation",
    },
    {
      nodeVersion: "Node v1328",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_EVIDENCE_HANDLE_SLOT",
      slotName: "Source evidence handle evidence",
      kind: "source-evidence-handle-evidence-slot",
      slotMode: "source-evidence-handle",
      sourceCheckpointKinds: [
        "source-evidence-acceptance-checkpoint",
        "operator-value-acceptance-checkpoint",
      ],
      sourceGuardKinds: [
        "source-evidence-acceptance-guard",
        "operator-value-acceptance-guard",
      ],
      requiredRealEvidence:
        "A future evidence artifact must cite existing source evidence and operator value handles without importing runtime payloads.",
      manualEvidenceField: "sourceEvidenceHandles",
    },
    {
      nodeVersion: "Node v1329",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_POLICY_EXECUTION_LOCK_SLOT",
      slotName: "Policy and execution lock evidence",
      kind: "policy-execution-lock-evidence-slot",
      slotMode: "policy-execution-lock",
      sourceCheckpointKinds: [
        "policy-acceptance-checkpoint",
        "execution-lock-acceptance-checkpoint",
      ],
      sourceGuardKinds: [
        "policy-acceptance-guard",
        "execution-lock-acceptance-guard",
      ],
      requiredRealEvidence:
        "A future evidence artifact must preserve no-runtime, no-write, no-sibling-mutation, no-live, and no-production locks.",
      manualEvidenceField: "policyExecutionLocks",
    },
    {
      nodeVersion: "Node v1330",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_APPROVAL_GRANT_SEPARATION_SLOT",
      slotName: "Approval grant separation evidence",
      kind: "approval-grant-separation-evidence-slot",
      slotMode: "approval-grant-separation",
      sourceCheckpointKinds: ["approval-grant-review-acceptance-checkpoint"],
      sourceGuardKinds: ["approval-grant-review-acceptance-guard"],
      requiredRealEvidence:
        "A future evidence artifact must prove that package comparison is not being treated as an approval grant.",
      manualEvidenceField: "approvalGrantSeparation",
    },
    {
      nodeVersion: "Node v1331",
      code: "SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_CLOSEOUT_SLOT",
      slotName: "Archive closeout evidence",
      kind: "archive-closeout-evidence-slot",
      slotMode: "archive-closeout",
      sourceCheckpointKinds: ["archive-closeout-acceptance-checkpoint"],
      sourceGuardKinds: ["archive-closeout-acceptance-guard"],
      requiredRealEvidence:
        "A future evidence artifact must close with archive references and still avoid accepted package, signed approval, and runtime material.",
      manualEvidenceField: "archiveCloseout",
    },
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS.map((slot) => ({
      nodeVersion: slot.nodeVersion,
      code: `${slot.code}_GUARD`,
      kind: slot.kind.replace("-slot", "-guard") as
        ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardTemplate["kind"],
      sourceSlotCode: slot.code,
      guardCode: `${slot.manualEvidenceField}.missing-or-synthetic-blocked`,
      guardText:
        `Require real manual compared package evidence for ${slot.manualEvidenceField}; keep acceptance, approval grant, signed approval, runtime payload, writes, and sibling mutation blocked.`,
    }));
