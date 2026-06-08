import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion =
  | "Node v1322"
  | "Node v1323"
  | "Node v1324"
  | "Node v1325"
  | "Node v1326"
  | "Node v1327"
  | "Node v1328"
  | "Node v1329"
  | "Node v1330"
  | "Node v1331";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind =
  | "source-acceptance-precheck-evidence-slot"
  | "manual-submission-reference-evidence-slot"
  | "offline-comparison-result-evidence-slot"
  | "identity-binding-evidence-slot"
  | "digest-match-summary-evidence-slot"
  | "detached-signature-envelope-observation-evidence-slot"
  | "source-evidence-handle-evidence-slot"
  | "policy-execution-lock-evidence-slot"
  | "approval-grant-separation-evidence-slot"
  | "archive-closeout-evidence-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotMode =
  | "source-precheck-contract"
  | "manual-submission-reference"
  | "offline-comparison-result"
  | "identity-binding"
  | "digest-match-summary"
  | "signature-envelope-observation"
  | "source-evidence-handle"
  | "policy-execution-lock"
  | "approval-grant-separation"
  | "archive-closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardKind =
  | "source-acceptance-precheck-evidence-guard"
  | "manual-submission-reference-evidence-guard"
  | "offline-comparison-result-evidence-guard"
  | "identity-binding-evidence-guard"
  | "digest-match-summary-evidence-guard"
  | "detached-signature-envelope-observation-evidence-guard"
  | "source-evidence-handle-evidence-guard"
  | "policy-execution-lock-evidence-guard"
  | "approval-grant-separation-evidence-guard"
  | "archive-closeout-evidence-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion;
  code: string;
  slotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotMode;
  sourceCheckpointKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind[];
  sourceGuardKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind[];
  requiredRealEvidence: string;
  manualEvidenceField: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardKind;
  sourceSlotCode: string;
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion;
  code: string;
  slotName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind;
  slotMode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotMode;
  sourceCheckpointKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind[];
  sourceGuardKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind[];
  sourceAcceptanceCheckpointCount: number;
  sourceAcceptanceGuardCount: number;
  readySourceAcceptanceCheckpointCount: number;
  readySourceAcceptanceGuardCount: number;
  sourceAcceptancePrecheckReady: boolean;
  sourceAcceptancePrecheckReadOnly: boolean;
  sourceStillNoAcceptanceEvidence: boolean;
  requiredRealEvidence: string;
  manualEvidenceField: string;
  readyForManualComparedPackageEvidenceIntakeSlot: boolean;
  manualComparedPackageEvidenceMaterialized: false;
  realComparedPackageEvidencePresent: false;
  syntheticComparedPackageEvidencePresent: false;
  comparedPackageAccepted: false;
  approvalGrantPresent: false;
  realSignedApprovalPresent: false;
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardKind;
  sourceSlotCode: string;
  sourceSlotReady: boolean;
  guardCode: string;
  guardText: string;
  rejectsMissingRealComparedPackageEvidence: boolean;
  rejectsSyntheticComparedPackageEvidence: true;
  blocksComparedPackageAcceptance: true;
  blocksApprovalGrant: true;
  blocksSignedApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForManualComparedPackageEvidenceIntakeGuard: boolean;
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates {
  sourceComparisonAcceptancePrecheckReady: boolean;
  slotCountComplete: boolean;
  guardCountComplete: boolean;
  slotVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  allSlotsReady: boolean;
  allGuardsReady: boolean;
  allSlotRequirementsDeclared: boolean;
  allManualEvidenceFieldsDeclared: boolean;
  allGuardTextsDeclared: boolean;
  allSourceCheckpointsCovered: boolean;
  allSourceGuardsCovered: boolean;
  sourceCheckpointCountStillTen: boolean;
  sourceGuardCountStillTen: boolean;
  sourceReadyCheckpointCountStillTen: boolean;
  sourceReadyGuardCountStillTen: boolean;
  sourcePrecheckDigestPresent: boolean;
  sourceComparisonPreflightDigestPresent: boolean;
  sourcePrecheckStillNoAcceptanceEvidence: boolean;
  sourceStillNoComparedPackage: boolean;
  sourceStillNoAcceptedPackage: boolean;
  realComparedPackageEvidenceStillAbsent: boolean;
  manualComparedPackageEvidenceMaterializationStillAbsent: boolean;
  actualAcceptanceEvidenceStillZero: boolean;
  approvalGrantStillAbsent: boolean;
  signedApprovalStillAbsent: boolean;
  allSlotsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allGuardsRejectMissingRealEvidence: boolean;
  allGuardsRejectSyntheticEvidence: boolean;
  allGuardsBlockAcceptance: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockSignedApproval: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  signedApprovalDraftStillDisabled: boolean;
  signedApprovalCaptureStillDisabled: boolean;
  operatorValueSupplyStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresRealManualComparedPackageEvidence: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake {
  signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331";
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck[
      "signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion"
    ];
  artifactDraftTextPackageComparedPackageEvidenceIntakeState:
    "ready-for-manual-compared-package-evidence-intake-contract" | "blocked";
  readyForManualComparedPackageEvidenceIntakeContract: boolean;
  readyForRealComparedPackageEvidenceIntake: boolean;
  readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck[
      "readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck"
    ];
  readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck[
      "readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  slotCount: number;
  guardCount: number;
  sourceAcceptanceCheckpointCount: number;
  sourceAcceptanceGuardCount: number;
  readySlotCount: number;
  readyGuardCount: number;
  sourcePrecheckEvidenceSlotCount: number;
  manualSubmissionReferenceEvidenceSlotCount: number;
  offlineComparisonResultEvidenceSlotCount: number;
  identityBindingEvidenceSlotCount: number;
  digestMatchSummaryEvidenceSlotCount: number;
  signatureEnvelopeObservationEvidenceSlotCount: number;
  sourceEvidenceHandleEvidenceSlotCount: number;
  policyExecutionLockEvidenceSlotCount: number;
  approvalGrantSeparationEvidenceSlotCount: number;
  archiveCloseoutEvidenceSlotCount: number;
  expectedRealComparedPackageEvidenceSlotCount: number;
  realComparedPackageEvidenceCount: 0;
  manualComparedPackageEvidenceMaterializedCount: 0;
  syntheticComparedPackageEvidenceCount: 0;
  actualDraftTextPackageAcceptanceEvidenceCount: 0;
  submittedDraftTextPackageCount: 0;
  comparedDraftTextPackageCount: 0;
  acceptedDraftTextPackageCount: 0;
  rejectedDraftTextPackageCount: 0;
  signedDraftTextCount: 0;
  draftSignaturePayloadCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest: string;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest: string;
  slots:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuard[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
