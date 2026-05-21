import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification.v1";
  verificationState: "credential-resolver-implementation-plan-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  implementationPlanUpstreamEchoVerificationOnly: true;
  consumesNodeV283ImplementationPlanDraft: true;
  consumesJavaV121ImplementationPlanEcho: true;
  consumesMiniKvV126ImplementationPlanNonParticipationReceipt: true;
  originalExpectedNodeVerificationVersion: "Node v284";
  executedAsNodeVersion: "Node v286";
  nodeVersionOffsetReason: string;
  readyForTestOnlyFakeHarnessPrecheck: boolean;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference;
  upstreamEchoes: {
    javaV121: JavaV121ImplementationPlanEchoReference;
    miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference;
  };
  echoVerification: CredentialResolverImplementationPlanUpstreamEchoVerification;
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks;
  summary: CredentialResolverImplementationPlanUpstreamEchoVerificationSummary;
  productionBlockers: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    implementationPlanUpstreamEchoVerificationJson: string;
    implementationPlanUpstreamEchoVerificationMarkdown: string;
    sourceNodeV283Json: string;
    sourceNodeV283Markdown: string;
    javaV121Builder: string;
    javaV121Records: string;
    javaV121Tests: string;
    miniKvV126Receipt: string;
    miniKvV126Runbook: string;
    miniKvV126Walkthrough: string;
    activePlan: string;
    nextNodeVersion: "Node v287";
  };
  nextActions: string[];
}

export interface SourceNodeV283ImplementationPlanDraftReference {
  sourceVersion: "Node v283";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile["profileVersion"];
  planState: ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftProfile["planState"];
  readyForImplementationPlanDraft: boolean;
  readyForJavaV121MiniKvV126Echo: boolean;
  planDigest: string;
  reviewDigest: string;
  sourceSpan: "Node v282";
  interfaceBoundaryCodes: string[];
  requiredArtifactIds: string[];
  prohibitedActions: string[];
  javaRequirementIds: string[];
  miniKvRequirementIds: string[];
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  interfaceBoundaryCount: number;
  requiredArtifactCount: number;
  prohibitedActionCount: number;
  javaEchoRequirementCount: number;
  miniKvReceiptRequirementCount: number;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface JavaV121ImplementationPlanEchoReference {
  sourceVersion: "Java v121";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptDigest: string | null;
  receiptVersion: string;
  planEchoMode: string;
  sourceSpan: "Node v283" | "missing";
  originalExpectedNodeVerificationVersion: "Node v284" | "missing";
  readyForOriginalNodeV284Verification: boolean;
  readyForJavaV121MiniKvV126Echo: boolean;
  echoWorkflowTemplateApplied: boolean;
  sourceNodePlanState: string;
  interfaceBoundaryCodes: string[];
  requiredArtifactIds: string[];
  prohibitedActions: string[];
  javaRequirementIds: string[];
  miniKvRequirementIds: string[];
  interfaceBoundaryCount: number;
  requiredArtifactCount: number;
  prohibitedActionCount: number;
  javaEchoRequirementCount: number;
  miniKvReceiptRequirementCount: number;
  proofClaimCount: number;
  nodeVerificationActionCount: number;
  javaPlanDigestRequirementNamed: boolean;
  concretePlanDigestValueEchoed: false;
  readyForManagedAuditResolverImplementation: false;
  readyForTestOnlyFakeHarnessPrecheck: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  approvalLedgerWritten: false;
  managedAuditStoreWritten: false;
  sqlExecuted: false;
  schemaMigrationExecuted: false;
  rollbackExecuted: false;
  automaticUpstreamStart: false;
  javaStartedNodeOrMiniKv: false;
}

export interface MiniKvV126ImplementationPlanNonParticipationReference {
  sourceVersion: "mini-kv v126";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptDigest: string | null;
  receiptVersion: string;
  releaseVersion: string | null;
  consumerHint: string | null;
  sourcePlanState: string | null;
  planDigest: string | null;
  reviewDigest: string | null;
  interfaceBoundaryCodes: string[];
  requiredArtifactIds: string[];
  prohibitedActions: string[];
  javaRequirementIds: string[];
  miniKvRequirementIds: string[];
  interfaceBoundaryCount: number | null;
  requiredArtifactCount: number | null;
  prohibitedActionCount: number | null;
  javaEchoRequirementCount: number | null;
  miniKvReceiptRequirementCount: number | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  readyForOriginalNodeV284Verification: boolean;
  readyForJavaV121MiniKvV126Echo: boolean;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  credentialResolverImplemented: boolean | null;
  credentialResolverInvoked: boolean | null;
  resolverClientInstantiated: boolean | null;
  secretProviderInstantiated: boolean | null;
  credentialValueReadAllowed: boolean | null;
  credentialValueRead: boolean | null;
  credentialValueLoaded: boolean | null;
  credentialValueStored: boolean | null;
  credentialValueIncluded: boolean | null;
  rawEndpointUrlParseAllowed: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  rawEndpointUrlRenderAllowed: boolean | null;
  rawEndpointUrlRendered: boolean | null;
  rawEndpointUrlIncluded: boolean | null;
  externalRequestAllowed: boolean | null;
  externalRequestSent: boolean | null;
  connectsManagedAudit: boolean | null;
  storageWriteAllowed: boolean | null;
  writeCommandsExecuted: boolean | null;
  adminCommandsExecuted: boolean | null;
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  schemaMigrationExecuted: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  managedAuditStorageBackend: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
}

export interface CredentialResolverImplementationPlanUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v121-plus-mini-kv-v126-implementation-plan-upstream-echo-verification-only";
  sourceSpan: "Node v283 + Java v121 + mini-kv v126";
  sourceNodeV283Ready: boolean;
  javaV121EchoReady: boolean;
  miniKvV126NonParticipationReady: boolean;
  planDigestAligned: boolean;
  reviewDigestAligned: boolean;
  interfaceBoundariesAligned: boolean;
  requiredArtifactsAligned: boolean;
  prohibitedActionsAligned: boolean;
  javaRequirementIdsAligned: boolean;
  miniKvRequirementIdsAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  originalExpectedNodeV284SatisfiedByNodeV286: true;
  readyForNodeV287TestOnlyFakeHarnessPrecheck: boolean;
}

export type CredentialResolverImplementationPlanUpstreamEchoVerificationChecks = {
  sourceNodeV283Ready: boolean;
  sourceNodeV283KeepsImplementationBlocked: boolean;
  javaV121EchoReady: boolean;
  javaV121DocumentsNodeV283Consumption: boolean;
  javaV121KeepsRuntimeSideEffectsBlocked: boolean;
  miniKvV126ReceiptReady: boolean;
  miniKvV126DocumentsNodeV283Consumption: boolean;
  miniKvV126KeepsRuntimeSideEffectsBlocked: boolean;
  planDigestAlignedWithMiniKv: boolean;
  reviewDigestAlignedWithMiniKv: boolean;
  boundaryCodesAligned: boolean;
  requiredArtifactsAligned: boolean;
  prohibitedActionsAligned: boolean;
  javaRequirementIdsAligned: boolean;
  miniKvRequirementIdsAligned: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  resolverBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  sideEffectBoundaryClosed: boolean;
  nodeVersionOffsetDocumented: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification: boolean;
};

export interface CredentialResolverImplementationPlanUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  evidenceFileCount: number;
  matchedSnippetCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  interfaceBoundaryCount: number;
  requiredArtifactCount: number;
  prohibitedActionCount: number;
  javaEchoRequirementCount: number;
  miniKvReceiptRequirementCount: number;
  javaProofClaimCount: number;
  javaNodeVerificationActionCount: number;
  miniKvCheckCount: number | null;
  miniKvPassedCheckCount: number | null;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface CredentialResolverImplementationPlanUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification"
    | "node-v283-implementation-plan-draft"
    | "java-v121-implementation-plan-echo"
    | "mini-kv-v126-implementation-plan-non-participation-receipt"
    | "runtime-config";
  message: string;
}
