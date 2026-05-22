import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  HumanApprovalArtifactReviewPacket,
  HumanApprovalArtifactReviewPacketChecks,
  HumanApprovalArtifactReviewPacketSummary,
  SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1";
  verificationState: "human-approval-artifact-review-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  humanApprovalArtifactReviewUpstreamEchoVerificationOnly: true;
  consumesNodeV308HumanApprovalArtifactReviewPacket: true;
  consumesJavaV143HumanApprovalArtifactReviewPacketEcho: true;
  consumesMiniKvV136HumanApprovalArtifactReviewNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v309";
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
  sourceNodeV308: SourceNodeV308HumanApprovalArtifactReviewPacketReference;
  upstreamEvidence: {
    javaV143: JavaV143HumanApprovalArtifactReviewPacketEchoReference;
    miniKvV136: MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference;
  };
  echoVerification: HumanApprovalArtifactReviewUpstreamEchoVerification;
  checks: HumanApprovalArtifactReviewUpstreamEchoVerificationChecks;
  summary: HumanApprovalArtifactReviewUpstreamEchoVerificationSummary;
  productionBlockers: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[];
  warnings: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[];
  recommendations: HumanApprovalArtifactReviewUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    humanApprovalArtifactReviewUpstreamEchoVerificationJson: string;
    humanApprovalArtifactReviewUpstreamEchoVerificationMarkdown: string;
    sourceNodeV308Json: string;
    sourceNodeV308Markdown: string;
    javaV143Support: string;
    javaV143Test: string;
    javaV143Explanation: string;
    javaV143Walkthrough: string;
    miniKvV136Receipt: string;
    miniKvV136Explanation: string;
    miniKvV136Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV308HumanApprovalArtifactReviewPacketReference {
  sourceVersion: "Node v308";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1";
  reviewPacketState: "human-approval-artifact-review-packet-ready" | "blocked";
  readyForHumanApprovalArtifactReviewPacket: boolean;
  reviewPacketDigest: string;
  sourceNodeV307: SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference;
  reviewPacket: HumanApprovalArtifactReviewPacket;
  checks: HumanApprovalArtifactReviewPacketChecks;
  summary: HumanApprovalArtifactReviewPacketSummary;
  nextJavaVersion: "Java v143";
  nextMiniKvVersion: "mini-kv v136";
  nextNodeVerificationVersion: "Node v309";
  readyForParallelJavaV143MiniKvV136Echo: boolean;
  requiredFieldIds: string[];
  prohibitedFieldIds: string[];
  rejectionReasonCodes: string[];
  missingFieldCheckCodes: string[];
  noGoBoundaryIds: string[];
  upstreamEchoRequestVersions: string[];
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

export interface JavaV143HumanApprovalArtifactReviewPacketEchoReference {
  sourceVersion: "Java v143";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-human-approval-artifact-review-packet-echo-receipt.v1";
  echoMode: "java-v143-human-approval-artifact-review-packet-echo-only";
  sourceSpan: "Node v308";
  nextNodeVersion: "Node v309";
  expectedProfileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV308Packet: boolean;
  readyForNodeV309: boolean;
  reviewPacketContractEchoed: boolean;
  requiredFieldCountEchoed: boolean;
  prohibitedFieldCountEchoed: boolean;
  rejectionReasonCountEchoed: boolean;
  missingFieldCheckCountEchoed: boolean;
  noGoBoundaryCountEchoed: boolean;
  upstreamEchoRequestsEchoed: boolean;
  necessityProofEchoed: boolean;
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

export interface MiniKvV136HumanApprovalArtifactReviewNonParticipationReceiptReference {
  sourceVersion: "mini-kv v136";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV308Packet: boolean;
  readyForNodeV309: boolean;
  sourceNodeV308ProfileVersion: string | null;
  sourceNodeV308ReviewPacketState: string | null;
  sourceNodeV308PacketDigest: string | null;
  requiredFieldCount: number | null;
  prohibitedFieldCount: number | null;
  rejectionReasonCount: number | null;
  missingFieldCheckCount: number | null;
  noGoBoundaryCount: number | null;
  upstreamEchoRequestCount: number | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  nonParticipationReceiptOnly: boolean;
  humanApprovalArtifactReviewPacketOnly: boolean;
  readOnlyReviewPacketContract: boolean;
  consumesNodeV308HumanApprovalArtifactReviewPacket: boolean;
  consumesNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification: boolean;
  readyForNodeV309BeforeUpstreamEcho: boolean | null;
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

export interface HumanApprovalArtifactReviewUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "human-approval-artifact-review-upstream-echo-verification-only";
  sourceSpan: "Node v308 + Java v143 + mini-kv v136";
  sourceNodeV308Ready: boolean;
  javaV143EchoReady: boolean;
  miniKvV136ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  reviewPacketContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type HumanApprovalArtifactReviewUpstreamEchoVerificationChecks = {
  sourceNodeV308Ready: boolean;
  sourceNodeV308RequestsParallelEcho: boolean;
  sourceNodeV308ReviewPacketContractComplete: boolean;
  sourceNodeV308KeepsRuntimeBlocked: boolean;
  sourceNodeV308KeepsSideEffectsClosed: boolean;
  javaV143EvidencePresent: boolean;
  javaV143EchoesNodeV308Packet: boolean;
  javaV143ReadyForNodeV309: boolean;
  javaV143ReviewPacketContractEchoed: boolean;
  javaV143KeepsRuntimeBlocked: boolean;
  miniKvV136EvidencePresent: boolean;
  miniKvV136EchoesNodeV308Packet: boolean;
  miniKvV136ReadyForNodeV309: boolean;
  miniKvV136ReviewPacketContractEchoed: boolean;
  miniKvV136KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  reviewPacketContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification: boolean;
};

export interface HumanApprovalArtifactReviewUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV308CheckCount: number;
  sourceNodeV308PassedCheckCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  missingFieldCheckCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface HumanApprovalArtifactReviewUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification"
    | "node-v308-human-approval-artifact-review-packet"
    | "java-v143-human-approval-artifact-review-packet-echo"
    | "mini-kv-v136-human-approval-artifact-review-non-participation"
    | "runtime-config";
  message: string;
}
