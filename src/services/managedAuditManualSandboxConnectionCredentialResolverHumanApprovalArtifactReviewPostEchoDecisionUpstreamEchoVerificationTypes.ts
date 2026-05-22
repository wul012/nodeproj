import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  HumanApprovalArtifactReviewPostEchoDecisionGateChecks,
  HumanApprovalArtifactReviewPostEchoDecisionGateSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1";
  verificationState: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationOnly: true;
  consumesNodeV310HumanApprovalArtifactReviewPostEchoDecisionGate: true;
  consumesJavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEcho: true;
  consumesMiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v311";
  readyForDisabledRuntimeShellImplementation: false;
  readyForDisabledRuntimeShellInvocation: false;
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
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  credentialValueProvided: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV310: SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference;
  upstreamEvidence: {
    javaV144: JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference;
    miniKvV137: MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference;
  };
  echoVerification: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification;
  checks: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks;
  summary: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationSummary;
  productionBlockers: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[];
  warnings: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[];
  recommendations: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationJson: string;
    humanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown: string;
    sourceNodeV310Json: string;
    sourceNodeV310Markdown: string;
    javaV144Support: string;
    javaV144Test: string;
    javaV144Explanation: string;
    javaV144Walkthrough: string;
    miniKvV137Receipt: string;
    miniKvV137Explanation: string;
    miniKvV137Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV310HumanApprovalArtifactReviewPostEchoDecisionGateReference {
  sourceVersion: "Node v310";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1";
  decisionGateState: "human-approval-artifact-review-post-echo-decision-gate-ready" | "blocked";
  readyForHumanApprovalArtifactReviewPostEchoDecisionGate: boolean;
  readOnlyDecisionGate: true;
  decisionDigest: string;
  sourceSpan: "Node v308 + Java v143 + mini-kv v136 + Node v309";
  decision: "continue-only-as-blocked-post-echo-prerequisite-review";
  selectedPath: "request-read-only-upstream-decision-echo-before-any-runtime-shell";
  allowsParallelJavaV144MiniKvV137EchoRequest: boolean;
  allowsNodeV311BeforeUpstreamEcho: false;
  prerequisiteCount: number;
  missingPrerequisiteCount: number;
  noGoConditionCount: number;
  sourceChecks: HumanApprovalArtifactReviewPostEchoDecisionGateChecks;
  sourceSummary: HumanApprovalArtifactReviewPostEchoDecisionGateSummary;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface JavaV144HumanApprovalArtifactReviewPostEchoDecisionGateEchoReference {
  sourceVersion: "Java v144";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-human-approval-artifact-review-post-echo-decision-gate-echo-receipt.v1";
  echoMode: "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo-only";
  sourceSpan: "Node v310";
  nextNodeVersion: "Node v311";
  expectedProfileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV310DecisionGate: boolean;
  readyForNodeV311: boolean;
  decisionGateContractEchoed: boolean;
  prerequisiteCountEchoed: boolean;
  missingPrerequisiteCountEchoed: boolean;
  noGoConditionCountEchoed: boolean;
  necessityProofEchoed: boolean;
  parallelEchoRequestEchoed: boolean;
  noRuntimeImplementationEchoed: boolean;
  noRuntimeInvocationEchoed: boolean;
  noCredentialReadEchoed: boolean;
  noRawEndpointParseEchoed: boolean;
  noProviderClientInstantiationEchoed: boolean;
  noExternalRequestEchoed: boolean;
  noWriteOrMigrationEchoed: boolean;
  noMiniKvWriteOrAuthorityEchoed: boolean;
  noAutoStartBoundaryEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV137HumanApprovalArtifactReviewPostEchoDecisionGateNonParticipationReceiptReference {
  sourceVersion: "mini-kv v137";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV310DecisionGate: boolean;
  readyForNodeV311: boolean;
  sourceNodeV310ProfileVersion: string | null;
  sourceNodeV310DecisionGateState: string | null;
  sourceNodeV310DecisionDigest: string | null;
  prerequisiteCount: number | null;
  missingPrerequisiteCount: number | null;
  noGoConditionCount: number | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  readOnlyDecisionGate: boolean | null;
  consumesNodeV310HumanApprovalArtifactReviewPostEchoDecisionGate: boolean | null;
  consumesNodeV309HumanApprovalArtifactReviewUpstreamEchoVerification: boolean | null;
  readyForNodeV311BeforeUpstreamEcho: boolean | null;
  runtimeShellImplemented: boolean | null;
  runtimeShellInvocationAllowed: boolean | null;
  executionAllowed: boolean | null;
  connectsManagedAudit: boolean | null;
  credentialValueRead: boolean | null;
  credentialValueAccepted: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  rawEndpointUrlAccepted: boolean | null;
  externalRequestSent: boolean | null;
  secretProviderInstantiated: boolean | null;
  resolverClientInstantiated: boolean | null;
  fakeSecretProviderInstantiated: boolean | null;
  fakeResolverClientInstantiated: boolean | null;
  schemaMigrationExecuted: boolean | null;
  approvalLedgerWritten: boolean | null;
  automaticUpstreamStart: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  sideEffectBoundariesClosed: boolean;
}

export interface HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-only";
  sourceSpan: "Node v310 + Java v144 + mini-kv v137";
  sourceNodeV310Ready: boolean;
  javaV144EchoReady: boolean;
  miniKvV137ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  decisionGateContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks = {
  sourceNodeV310Ready: boolean;
  sourceNodeV310RequestsParallelEcho: boolean;
  sourceNodeV310DecisionGateComplete: boolean;
  sourceNodeV310KeepsRuntimeBlocked: boolean;
  sourceNodeV310KeepsSideEffectsClosed: boolean;
  javaV144EvidencePresent: boolean;
  javaV144EchoesNodeV310DecisionGate: boolean;
  javaV144ReadyForNodeV311: boolean;
  javaV144DecisionGateContractEchoed: boolean;
  javaV144KeepsRuntimeBlocked: boolean;
  miniKvV137EvidencePresent: boolean;
  miniKvV137EchoesNodeV310DecisionGate: boolean;
  miniKvV137ReadyForNodeV311: boolean;
  miniKvV137DecisionGateContractEchoed: boolean;
  miniKvV137KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  decisionGateContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification: boolean;
};

export interface HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV310CheckCount: number;
  sourceNodeV310PassedCheckCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  prerequisiteCount: number;
  missingPrerequisiteCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification"
    | "node-v310-human-approval-artifact-review-post-echo-decision-gate"
    | "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo"
    | "mini-kv-v137-human-approval-artifact-review-post-echo-decision-gate-non-participation"
    | "runtime-config";
  message: string;
}
