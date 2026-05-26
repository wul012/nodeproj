import type {
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionTypes.js";
import type { HistoricalEvidenceFile, HistoricalSnippetMatch } from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review.v1";
  reviewState: "candidate-gate-upstream-hardening-review-ready" | "blocked";
  upstreamAlignmentDecision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview: boolean;
  readOnlyReview: true;
  activeNodeVersion: "Node v330";
  sourceNodeVersion: "Node v329";
  sourceJavaEvidenceExportVersion: "Java v151";
  sourceJavaInputHardeningEchoVersion: "Java v152";
  sourceMiniKvVersion: "mini-kv v143";
  consumesNodeV329ImplementationCandidateGateInputHardeningDecision: true;
  consumesJavaV151StableEvidenceExportHint: true;
  consumesJavaV152InputHardeningDecisionEcho: true;
  consumesMiniKvV143StableCurrentReceiptExport: true;
  readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: boolean;
  readyForDisabledRuntimeShellDesignDraft: false;
  readyForRuntimeShellImplementation: false;
  readyForRuntimeShellInvocation: false;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  runtimeShellImplemented: false;
  runtimeShellEnabled: false;
  runtimeShellInvocationAllowed: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  networkSocketOpened: false;
  javaServiceStarted: false;
  miniKvServiceStarted: false;
  javaSqlExecutionAllowed: false;
  approvalLedgerWritten: false;
  schemaMigrationExecuted: false;
  rollbackExecutionAllowed: false;
  deploymentActionAllowed: false;
  miniKvWriteCommandAllowed: false;
  miniKvLoadAllowed: false;
  miniKvCompactAllowed: false;
  miniKvRestoreAllowed: false;
  miniKvSetnxexAllowed: false;
  automaticUpstreamStart: false;
  sourceNodeV329: SourceNodeV329InputHardeningDecisionReference;
  javaV151EvidenceExportHint: JavaV151EvidenceExportHintReference;
  javaV152InputHardeningDecisionEcho: JavaV152InputHardeningDecisionEchoReference;
  miniKvV143Receipt: MiniKvV143InputHardeningReceiptReference;
  hardeningReview: CandidateGateUpstreamHardeningReviewRecord;
  checks: CandidateGateUpstreamHardeningReviewChecks;
  summary: CandidateGateUpstreamHardeningReviewSummary;
  productionBlockers: CandidateGateUpstreamHardeningReviewMessage[];
  warnings: CandidateGateUpstreamHardeningReviewMessage[];
  recommendations: CandidateGateUpstreamHardeningReviewMessage[];
  evidenceEndpoints: {
    candidateGateUpstreamHardeningReviewJson: string;
    candidateGateUpstreamHardeningReviewMarkdown: string;
    sourceNodeV329Json: string;
    sourceNodeV329Markdown: string;
    javaV151EvidencePath: string;
    javaV152EvidencePath: string;
    miniKvV143ReceiptPath: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}

export interface SourceNodeV329InputHardeningDecisionReference {
  sourceVersion: "Node v329";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile["profileVersion"];
  candidateGateState: ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile["candidateGateState"];
  readyForInputHardeningDecision: boolean;
  candidateGateDecision: ManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionProfile["candidateGateDecision"];
  decisionDigest: string;
  inputHardeningRequirementCount: number;
  noGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  automaticUpstreamStart: false;
  readyForNodeV330CandidateGateUpstreamAlignment: false;
  readyForDisabledRuntimeShellDesignDraft: false;
}

export interface JavaV151EvidenceExportHintReference {
  project: "advanced-order-platform";
  sourceVersion: "Java v151";
  evidenceFile: HistoricalEvidenceFile;
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  evidenceExportHintDocumented: boolean;
  stableReadOnlyJsonExportDocumented: boolean;
  endpointEvidenceExportDocumented: boolean;
  credentialAndEndpointBoundariesDocumented: boolean;
  networkWriteRollbackSchemaBoundariesDocumented: boolean;
  automaticUpstreamStartDenied: boolean;
  readyForNodeConsumption: boolean;
}

export interface JavaV152InputHardeningDecisionEchoReference {
  project: "advanced-order-platform";
  sourceVersion: "Java v152";
  evidenceFile: HistoricalEvidenceFile;
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  inputHardeningDecisionEchoDocumented: boolean;
  consumesNodeV329Decision: boolean;
  confirmsJavaV151StableEvidenceExport: boolean;
  nodeV330WaitDocumented: boolean;
  providerClientNetworkBoundariesDocumented: boolean;
  javaWriteBoundariesDocumented: boolean;
  automaticUpstreamStartDenied: boolean;
  readyForNodeConsumption: boolean;
}

export interface MiniKvV143InputHardeningReceiptReference {
  project: "mini-kv";
  sourceVersion: "mini-kv v143";
  evidenceFile: HistoricalEvidenceFile;
  evidencePresent: boolean;
  receiptVersion: string | null;
  projectVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  restoreExecutionAllowed: boolean | null;
  orderAuthoritative: boolean | null;
  stableCurrentReceiptExportReady: boolean | null;
  stableCurrentReceiptPathRequired: boolean | null;
  readyForNodeV330AfterJavaV151: boolean | null;
  readyForNodeV330BeforeJavaV151: boolean | null;
  readyForDisabledRuntimeShellDesignDraft: boolean | null;
  runtimeShellImplemented: boolean | null;
  runtimeShellInvocationAllowed: boolean | null;
  realResolverImplementationAllowed: boolean | null;
  credentialValueRead: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  externalRequestSent: boolean | null;
  httpRequestSent: boolean | null;
  tcpConnectionAttempted: boolean | null;
  javaSqlExecutionAllowed: boolean | null;
  rollbackExecutionAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  schemaMigrationExecuted: boolean | null;
  miniKvWriteCommandAllowed: boolean | null;
  miniKvLoadAllowed: boolean | null;
  miniKvCompactAllowed: boolean | null;
  miniKvRestoreAllowed: boolean | null;
  miniKvSetnxexAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  readyForNodeConsumption: boolean;
}

export interface CandidateGateUpstreamHardeningReviewRecord {
  reviewDigest: string;
  recordMode: "candidate-gate-upstream-hardening-review-only";
  decision:
    | "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review"
    | "blocked";
  sourceSpan: "Node v329 + Java v151/v152 + mini-kv v143";
  javaEvidenceExportStatus: "stable-read-only-export-hint-present" | "missing-or-blocked";
  javaInputHardeningEchoStatus: "input-hardening-decision-echo-present" | "missing-or-blocked";
  miniKvStableReceiptStatus: "stable-current-receipt-ready" | "missing-or-blocked";
  readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: boolean;
  allowsDisabledRuntimeShellDesignDraftNow: false;
  allowsRuntimeShellImplementation: false;
  allowsRuntimeShellInvocation: false;
  allowsRealResolverImplementation: false;
  allowsSecretProviderInstantiation: false;
  allowsResolverClientInstantiation: false;
  allowsCredentialValueRead: false;
  allowsRawEndpointUrlParse: false;
  allowsExternalRequest: false;
  allowsManagedAuditConnection: false;
  allowsSchemaMigration: false;
  allowsApprovalLedgerWrite: false;
  allowsRollbackExecution: false;
  allowsMiniKvWriteOrAdminCommand: false;
  allowsAutomaticUpstreamStart: false;
  nextNodeVersionSuggested: "Node v331";
}

export type CandidateGateUpstreamHardeningReviewChecks = {
  sourceNodeV329Ready: boolean;
  sourceNodeV329RequiresInputHardening: boolean;
  sourceNodeV329KeepsRuntimeBlocked: boolean;
  javaV151EvidencePresent: boolean;
  javaV151StableEvidenceExportReady: boolean;
  javaV151BoundariesDocumented: boolean;
  javaV152EvidencePresent: boolean;
  javaV152ConsumesNodeV329: boolean;
  javaV152ConfirmsJavaStableEvidenceExport: boolean;
  javaV152BoundariesDocumented: boolean;
  miniKvV143ReceiptPresent: boolean;
  miniKvV143ReleaseVersionMatches: boolean;
  miniKvV143StableCurrentReceiptReady: boolean;
  miniKvV143ReadyAfterJavaV151: boolean;
  miniKvV143BlocksBeforeJavaV151: boolean;
  miniKvV143KeepsRuntimeAndWriteBoundariesClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview: boolean;
};

export interface CandidateGateUpstreamHardeningReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV329CheckCount: number;
  sourceNodeV329PassedCheckCount: number;
  javaEvidenceFileCount: number;
  javaSnippetCount: number;
  javaMatchedSnippetCount: number;
  miniKvReceiptFileCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface CandidateGateUpstreamHardeningReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v329"
    | "java-v151"
    | "java-v152"
    | "mini-kv-v143"
    | "configuration"
    | "runtime-boundary"
    | "next-step";
  message: string;
}
