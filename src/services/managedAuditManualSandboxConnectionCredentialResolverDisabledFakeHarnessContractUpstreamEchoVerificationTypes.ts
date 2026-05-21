import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification.v1";
  verificationState: "disabled-fake-harness-contract-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  disabledFakeHarnessContractUpstreamEchoVerificationOnly: true;
  consumesNodeV288DisabledFakeHarnessContract: true;
  consumesJavaV122V126QualityAndEchoEvidence: true;
  consumesMiniKvV127DisabledFakeHarnessNonParticipationReceipt: true;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
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
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference;
  upstreamEchoes: {
    javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference;
    miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference;
  };
  echoVerification: DisabledFakeHarnessContractUpstreamEchoVerification;
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks;
  summary: DisabledFakeHarnessContractUpstreamEchoVerificationSummary;
  productionBlockers: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[];
  warnings: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[];
  recommendations: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    disabledFakeHarnessContractUpstreamEchoVerificationJson: string;
    disabledFakeHarnessContractUpstreamEchoVerificationMarkdown: string;
    sourceNodeV288Json: string;
    sourceNodeV288Markdown: string;
    javaV122Runbook: string;
    javaV123Runbook: string;
    javaV124Runbook: string;
    javaV125Runbook: string;
    javaV126Runbook: string;
    javaV126BoundaryCatalog: string;
    miniKvV127Receipt: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV288DisabledFakeHarnessContractReference {
  sourceVersion: "Node v288";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile["profileVersion"];
  contractState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile["contractState"];
  readyForDisabledFakeHarnessContract: boolean;
  readyForJavaV122MiniKvV127ParallelEcho: boolean;
  contractDigest: string;
  contractName: string;
  contractMode: string;
  runtimeToggleName: string;
  defaultRuntimeToggleValue: false;
  invocationState: "disabled";
  requiredInputCount: number;
  allowedOutputCount: number;
  prohibitedInputCount: number;
  requiredArtifactCount: number;
  contractAssertionCount: number;
  prohibitedActionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  javaEchoRequiredNow: true;
  miniKvEchoRequiredNow: true;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
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
}

export interface JavaV122V126DisabledFakeHarnessEvidenceReference {
  sourceVersion: "Java v122-v126";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  evidenceDigest: string | null;
  completedVersions: string[];
  integrationTestSplitVersions: string[];
  qualityCatalogVersion: "Java v126";
  integrationTestSplitComplete: boolean;
  evidenceServiceCatalogStopgapApplied: boolean;
  boundaryCatalogPresent: boolean;
  noFakeHarnessRuntimeDocumented: boolean;
  credentialValueBoundaryDocumented: boolean;
  rawEndpointBoundaryDocumented: boolean;
  managedAuditConnectionBoundaryDocumented: boolean;
  ledgerAndSqlBoundaryDocumented: boolean;
  didNotModifyProductionCodeDuringV122V125: boolean;
  v126RefactorOnly: boolean;
  javaStillReadOnlyEvidenceInput: boolean;
}

export interface MiniKvV127DisabledFakeHarnessNonParticipationReference {
  sourceVersion: "mini-kv v127";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptDigest: string | null;
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  sourceContract: string | null;
  sourceProfileVersion: string | null;
  sourceContractState: string | null;
  sourceReadyForDisabledFakeHarnessContract: boolean | null;
  sourceReadOnlyContract: boolean | null;
  sourceDisabledFakeHarnessContractOnly: boolean | null;
  readyForNodeV289UpstreamEchoVerification: boolean | null;
  readyForJavaV122MiniKvV127ParallelEcho: boolean | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  disabledFakeHarnessNonParticipationReceiptOnly: boolean | null;
  disabledFakeHarnessContractOnly: boolean | null;
  consumesNodeV288DisabledFakeHarnessContract: boolean | null;
  contractDigest: string | null;
  contractName: string | null;
  requiredInputs: string[];
  allowedOutputs: string[];
  prohibitedInputs: string[];
  requiredArtifacts: string[];
  contractAssertions: string[];
  prohibitedActions: string[];
  fakeHarnessRuntimeEnabled: boolean | null;
  fakeHarnessInvocationAllowed: boolean | null;
  fakeHarnessRuntimeImplemented: boolean | null;
  fakeHarnessRuntimeInvoked: boolean | null;
  credentialResolverImplemented: boolean | null;
  credentialResolverInvoked: boolean | null;
  resolverClientInstantiated: boolean | null;
  secretProviderInstantiated: boolean | null;
  fakeSecretProviderInstantiated: boolean | null;
  fakeResolverClientInstantiated: boolean | null;
  credentialValueReadAllowed: boolean | null;
  credentialValueRead: boolean | null;
  credentialValueProvided: boolean | null;
  credentialValueLoaded: boolean | null;
  credentialValueStored: boolean | null;
  credentialValueIncluded: boolean | null;
  credentialValueRendered: boolean | null;
  rawEndpointUrlParseAllowed: boolean | null;
  rawEndpointUrlRenderAllowed: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  rawEndpointUrlRendered: boolean | null;
  rawEndpointUrlProvided: boolean | null;
  rawEndpointUrlIncluded: boolean | null;
  externalRequestAllowed: boolean | null;
  externalRequestSent: boolean | null;
  httpTcpDialAllowed: boolean | null;
  connectsManagedAudit: boolean | null;
  readsManagedAuditCredential: boolean | null;
  storesManagedAuditCredential: boolean | null;
  managedAuditStore: boolean | null;
  managedAuditStorageBackend: boolean | null;
  sandboxAuditStorageBackend: boolean | null;
  storageWriteAllowed: boolean | null;
  writeCommandsExecuted: boolean | null;
  adminCommandsExecuted: boolean | null;
  runtimeWriteObserved: boolean | null;
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  approvalLedgerWriteExecuted: boolean | null;
  managedAuditWriteExecuted: boolean | null;
  productionRecordWritten: boolean | null;
  schemaMigrationAllowed: boolean | null;
  schemaMigrationExecuted: boolean | null;
  restoreExecutionAllowed: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  automaticUpstreamStartAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  checkCount: number | null;
  passedCheckCount: number | null;
}

export interface DisabledFakeHarnessContractUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v122-v126-plus-mini-kv-v127-disabled-fake-harness-contract-upstream-echo-verification-only";
  sourceSpan: "Node v288 + Java v122-v126 + mini-kv v127";
  sourceNodeV288Ready: boolean;
  javaV122V126EvidenceReady: boolean;
  miniKvV127NonParticipationReady: boolean;
  contractDigestAlignedWithMiniKv: boolean;
  javaQualityStopgapApplied: boolean;
  integrationTestSplitComplete: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  readyForNextDisabledFakeHarnessPlanning: boolean;
}

export type DisabledFakeHarnessContractUpstreamEchoVerificationChecks = {
  sourceNodeV288Ready: boolean;
  sourceNodeV288ContractStillDisabled: boolean;
  javaV122V126EvidenceReady: boolean;
  javaIntegrationTestSplitsComplete: boolean;
  javaCatalogStopgapApplied: boolean;
  javaDocumentsRuntimeBoundaries: boolean;
  miniKvV127ReceiptReady: boolean;
  miniKvV127EchoesNodeV288Contract: boolean;
  miniKvV127KeepsRuntimeSideEffectsBlocked: boolean;
  contractDigestAlignedWithMiniKv: boolean;
  requiredInputsAlignedWithMiniKv: boolean;
  allowedOutputsAlignedWithMiniKv: boolean;
  prohibitedInputsAlignedWithMiniKv: boolean;
  requiredArtifactsAlignedWithMiniKv: boolean;
  contractAssertionsAlignedWithMiniKv: boolean;
  prohibitedActionsAlignedWithMiniKv: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  providerClientBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  authorityBoundaryClosed: boolean;
  sideEffectBoundaryClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification: boolean;
};

export interface DisabledFakeHarnessContractUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  evidenceFileCount: number;
  matchedSnippetCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  javaCompletedVersionCount: number;
  javaIntegrationTestSplitVersionCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  miniKvCheckCount: number | null;
  miniKvPassedCheckCount: number | null;
  requiredInputCount: number;
  allowedOutputCount: number;
  prohibitedInputCount: number;
  requiredArtifactCount: number;
  contractAssertionCount: number;
  prohibitedActionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface DisabledFakeHarnessContractUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification"
    | "node-v288-disabled-fake-harness-contract"
    | "java-v122-v126-quality-and-echo-evidence"
    | "mini-kv-v127-disabled-fake-harness-non-participation-receipt"
    | "runtime-config";
  message: string;
}
