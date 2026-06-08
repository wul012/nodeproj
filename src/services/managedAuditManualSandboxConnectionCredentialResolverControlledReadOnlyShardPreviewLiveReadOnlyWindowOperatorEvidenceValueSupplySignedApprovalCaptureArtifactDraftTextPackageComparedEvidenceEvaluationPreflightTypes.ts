import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion =
  | "Node v1332"
  | "Node v1333"
  | "Node v1334"
  | "Node v1335"
  | "Node v1336"
  | "Node v1337"
  | "Node v1338"
  | "Node v1339"
  | "Node v1340"
  | "Node v1341"
  | "Node v1342"
  | "Node v1343"
  | "Node v1344"
  | "Node v1345"
  | "Node v1346"
  | "Node v1347"
  | "Node v1348"
  | "Node v1349"
  | "Node v1350"
  | "Node v1351";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleKind =
  | "source-intake-readiness-evaluation-rule"
  | "evidence-artifact-shape-evaluation-rule"
  | "operator-provenance-evaluation-rule"
  | "manual-submission-reference-evaluation-rule"
  | "offline-comparison-result-evaluation-rule"
  | "identity-binding-evaluation-rule"
  | "digest-lineage-evaluation-rule"
  | "signature-envelope-metadata-evaluation-rule"
  | "source-evidence-handle-evaluation-rule"
  | "operator-value-handle-evaluation-rule"
  | "policy-assertion-evaluation-rule"
  | "execution-lock-evaluation-rule"
  | "approval-grant-separation-evaluation-rule"
  | "archive-reference-evaluation-rule"
  | "secret-value-exclusion-evaluation-rule"
  | "synthetic-evidence-exclusion-evaluation-rule"
  | "runtime-payload-exclusion-evaluation-rule"
  | "write-and-sibling-mutation-exclusion-evaluation-rule"
  | "reviewer-traceability-evaluation-rule"
  | "evaluation-closeout-evaluation-rule";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuardKind =
  | "source-intake-readiness-evaluation-guard"
  | "evidence-artifact-shape-evaluation-guard"
  | "operator-provenance-evaluation-guard"
  | "manual-submission-reference-evaluation-guard"
  | "offline-comparison-result-evaluation-guard"
  | "identity-binding-evaluation-guard"
  | "digest-lineage-evaluation-guard"
  | "signature-envelope-metadata-evaluation-guard"
  | "source-evidence-handle-evaluation-guard"
  | "operator-value-handle-evaluation-guard"
  | "policy-assertion-evaluation-guard"
  | "execution-lock-evaluation-guard"
  | "approval-grant-separation-evaluation-guard"
  | "archive-reference-evaluation-guard"
  | "secret-value-exclusion-evaluation-guard"
  | "synthetic-evidence-exclusion-evaluation-guard"
  | "runtime-payload-exclusion-evaluation-guard"
  | "write-and-sibling-mutation-exclusion-evaluation-guard"
  | "reviewer-traceability-evaluation-guard"
  | "evaluation-closeout-evaluation-guard";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion;
  code: string;
  ruleName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleKind;
  sourceSlotKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind[];
  sourceGuardKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardKind[];
  expectedCandidateField: string;
  evaluationQuestion: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuardTemplate {
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuardKind;
  sourceRuleCode: string;
  guardCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRule {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion;
  code: string;
  ruleName: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRuleKind;
  sourceSlotKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind[];
  sourceGuardKinds:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuardKind[];
  sourceIntakeSlotCount: number;
  sourceIntakeGuardCount: number;
  readySourceIntakeSlotCount: number;
  readySourceIntakeGuardCount: number;
  sourceIntakeReady: boolean;
  sourceIntakeReadOnly: boolean;
  sourceRealEvidenceStillAbsent: boolean;
  expectedCandidateField: string;
  evaluationQuestion: string;
  readyForComparedEvidenceEvaluationRule: boolean;
  realEvidenceCandidateSatisfied: false;
  candidateValuePresent: false;
  candidateMaterialized: false;
  candidateAccepted: false;
  candidateRejected: false;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuard {
  order: number;
  nodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion;
  code: string;
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuardKind;
  sourceRuleCode: string;
  sourceRuleReady: boolean;
  guardCode: string;
  guardText: string;
  rejectsMissingCandidate: boolean;
  rejectsSyntheticCandidate: true;
  blocksCandidateAcceptance: true;
  blocksApprovalGrant: true;
  blocksSignedApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForComparedEvidenceEvaluationGuard: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates {
  sourceComparedPackageEvidenceIntakeReady: boolean;
  ruleCountComplete: boolean;
  guardCountComplete: boolean;
  ruleVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  allRulesReady: boolean;
  allGuardsReady: boolean;
  allEvaluationQuestionsDeclared: boolean;
  allExpectedCandidateFieldsDeclared: boolean;
  allGuardTextsDeclared: boolean;
  allSourceIntakeSlotsCovered: boolean;
  allSourceIntakeGuardsCovered: boolean;
  sourceIntakeSlotCountStillTen: boolean;
  sourceIntakeGuardCountStillTen: boolean;
  sourceReadyIntakeSlotCountStillTen: boolean;
  sourceReadyIntakeGuardCountStillTen: boolean;
  sourceIntakeDigestPresent: boolean;
  sourceAcceptancePrecheckDigestPresent: boolean;
  sourceRealEvidenceStillAbsent: boolean;
  sourceSyntheticEvidenceStillAbsent: boolean;
  realCandidateStillAbsent: boolean;
  candidateMaterializationStillAbsent: boolean;
  candidateSatisfiedCountStillZero: boolean;
  candidateAcceptanceStillBlocked: boolean;
  allRulesReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allGuardsRejectMissingCandidate: boolean;
  allGuardsRejectSyntheticCandidate: boolean;
  allGuardsBlockCandidateAcceptance: boolean;
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
  nextStepRequiresRealComparedPackageEvidenceCandidate: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight {
  signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: "Node v1351";
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake[
      "signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion"
    ];
  artifactDraftTextPackageComparedEvidenceEvaluationPreflightState:
    "waiting-for-real-compared-package-evidence" | "blocked";
  readyForComparedEvidenceEvaluationPreflightContract: boolean;
  readyForRealComparedPackageEvidenceEvaluation: false;
  readyForManualComparedPackageEvidenceIntakeContract:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake[
      "readyForManualComparedPackageEvidenceIntakeContract"
    ];
  readyForSignedApprovalArtifactDraft: false;
  readyForSignedApprovalCapture: false;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  evaluationRuleCount: number;
  evaluationGuardCount: number;
  sourceIntakeSlotCount: number;
  sourceIntakeGuardCount: number;
  readyEvaluationRuleCount: number;
  readyEvaluationGuardCount: number;
  satisfiedEvaluationRuleCount: 0;
  expectedRealComparedPackageEvidenceCandidateFieldCount: number;
  realComparedPackageEvidenceCandidateCount: 0;
  syntheticComparedPackageEvidenceCandidateCount: 0;
  candidateMaterializedCount: 0;
  candidateAcceptedCount: 0;
  candidateRejectedCount: 0;
  acceptedComparedPackageEvidenceCount: 0;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest: string;
  sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest: string;
  rules:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRule[];
  guards:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuard[];
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest: string;
  evaluationAllowed: false;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
