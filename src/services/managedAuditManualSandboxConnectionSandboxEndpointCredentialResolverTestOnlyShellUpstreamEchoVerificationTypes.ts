import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1";
  verificationState: "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  testOnlyResolverShellUpstreamEchoVerificationOnly: true;
  fakeResolverOnly: true;
  handleOnlyRequest: true;
  credentialResolverExecutionAllowed: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  credentialValueStored: false;
  credentialValueIncluded: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV264: SourceNodeV264CredentialResolverTestOnlyShellContractReference;
  upstreamEchoes: {
    javaV107: JavaV107CredentialResolverTestOnlyShellEchoMarkerReference;
    miniKvV116: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference;
  };
  optimizationContext: {
    javaV109: JavaV109RehearsalResponseRecordsSplitOptimizationContext;
  };
  echoVerification: CredentialResolverTestOnlyShellUpstreamEchoVerification;
  checks: CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    requestShapeFieldCount: number;
    responseShapeFieldCount: number;
    failureMappingCount: number;
    guardConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    sandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationJson: string;
    sandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown: string;
    sourceNodeV264Json: string;
    javaV107Runbook: string;
    javaV109OptimizationRunbook: string;
    miniKvV116Receipt: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV264CredentialResolverTestOnlyShellContractReference {
  sourceVersion: "Node v264";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile["profileVersion"];
  shellContractState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile["shellContractState"];
  readyForTestOnlyShellContract: boolean;
  contractDigest: string;
  shellName: "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell";
  shellMode: "test-only-fake-resolver-contract";
  resolverKind: "fake-in-memory";
  testOnlyShell: true;
  readOnlyContract: true;
  fakeResolverOnly: true;
  handleOnlyRequest: true;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  requestShapeFields: readonly string[];
  responseShapeFields: readonly string[];
  failureClassCodes: string[];
  guardConditionCodes: string[];
  sourceNodeV263Ready: boolean;
  sourceVerificationMode: string;
  sourceSpan: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  credentialResolverExecutionAllowed: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  credentialValueStored: false;
  credentialValueIncluded: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  fakeResolverProbeCovered: boolean;
  fakeResolverProbeNoCredentialRead: boolean;
  fakeResolverProbeNoExternalRequest: boolean;
  fakeResolverProbeNoProductionWrite: boolean;
  readyForNodeV265TestOnlyShellUpstreamEchoVerification: boolean;
}

export interface JavaV107CredentialResolverTestOnlyShellEchoMarkerReference {
  sourceVersion: "Java v107";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v29" | "missing";
  markerField: "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker" | "missing";
  consumedNodeVersion: "Node v264" | "missing";
  consumedNodeProfile: string;
  nextNodeConsumerVersion: "Node v265" | "missing";
  sourceSpan: string;
  shellMode: string;
  shellName: string;
  resolverKind: string;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  fakeResolverProbeCount: number;
  requestShapeEchoed: boolean;
  responseShapeEchoed: boolean;
  failureMappingEchoed: boolean;
  guardConditionsEchoed: boolean;
  fakeResolverProbeEchoed: boolean;
  fakeResolverOnlyEchoed: boolean;
  sideEffectBoundaryClosed: boolean;
  credentialResolverExecutionAllowed: boolean;
  connectsManagedAudit: boolean;
  credentialValueRead: boolean;
  credentialValueLoaded: boolean;
  credentialValueStored: boolean;
  credentialValueIncluded: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  externalRequestSent: boolean;
  secretProviderInstantiated: boolean;
  resolverClientInstantiated: boolean;
  schemaMigrationExecuted: boolean;
  automaticUpstreamStart: boolean;
  productionRecordWritten: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: boolean;
}

export interface MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference {
  sourceVersion: "mini-kv v116";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourceContractProfileVersion: string;
  sourceContractRoutePath: string;
  sourceContractState: string;
  sourceShellMode: string;
  sourceShellName: string;
  sourceResolverKind: string;
  sourceReadyForTestOnlyResolverShellContract: boolean;
  sourceTestOnlyShell: boolean;
  sourceReadOnlyContract: boolean;
  sourceFakeResolverOnly: boolean;
  sourceHandleOnlyRequest: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceReadyForProductionAudit: boolean;
  sourceReadyForProductionWindow: boolean;
  sourceCredentialResolverExecutionAllowed: boolean;
  sourceExecutionAllowed: boolean;
  sourceConnectsManagedAudit: boolean;
  sourceReadsManagedAuditCredential: boolean;
  sourceStoresManagedAuditCredential: boolean;
  sourceCredentialValueRead: boolean;
  sourceCredentialValueLoaded: boolean;
  sourceCredentialValueStored: boolean;
  sourceCredentialValueIncluded: boolean;
  sourceRawEndpointUrlParsed: boolean;
  sourceRawEndpointUrlIncluded: boolean;
  sourceExternalRequestSent: boolean;
  sourceSecretProviderInstantiated: boolean;
  sourceResolverClientInstantiated: boolean;
  sourceSchemaMigrationExecuted: boolean;
  sourceAutomaticUpstreamStart: boolean;
  sourceProductionRecordWritten: boolean;
  sourceRequestShapeFieldCount: number;
  sourceResponseShapeFieldCount: number;
  sourceFailureMappingCount: number;
  sourceGuardConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceNodeV263Ready: boolean;
  sourceNodeV263VerificationMode: string;
  sourceNodeV263Span: string;
  sourceNodeV263CheckCount: number;
  sourceNodeV263PassedCheckCount: number;
  sourceNodeV263ProductionBlockerCount: number;
  requestShapeFields: string[];
  responseShapeFields: string[];
  failureClassCodes: string[];
  guardConditionCodes: string[];
  fakeResolverProbeRequestId: string;
  fakeResolverProbeAcceptedByFakeResolver: boolean;
  fakeResolverProbeNoCredentialRead: boolean;
  fakeResolverProbeNoExternalRequest: boolean;
  fakeResolverProbeNoProductionWrite: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  dryRunOnly: boolean;
  testOnlyResolverShellContractOnly: boolean;
  testOnlyShell: boolean;
  fakeResolverOnly: boolean;
  handleOnlyRequest: boolean;
  credentialResolverImplemented: boolean;
  credentialResolverInvoked: boolean;
  secretProviderInstantiated: boolean;
  resolverClientInstantiated: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  externalAuditServiceAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  approvalLedgerWriteAllowed: boolean;
  approvalLedgerWriteExecuted: boolean;
  sandboxManagedAuditStateWriteAllowed: boolean;
  credentialValueRequired: boolean;
  credentialValueReadAllowed: boolean;
  credentialValueLoaded: boolean;
  credentialValueStored: boolean;
  credentialValueIncluded: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  externalRequestSent: boolean;
  schemaRehearsalExecutionAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStore: boolean;
  managedAuditStorageBackend: boolean;
  sandboxAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
  fakeResolverProbeExecuted: boolean;
  readyForNodeV265Alignment: boolean;
}

export interface JavaV109RehearsalResponseRecordsSplitOptimizationContext {
  sourceVersion: "Java v109";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  optimizationDocumented: boolean;
  optimizationOnly: true;
  hardPrerequisiteForNodeV265: false;
  businessMarkerAdded: false;
  managedAuditBoundaryChanged: false;
  responseRecordsSplit: boolean;
  releaseApprovalRehearsalResponseRecordsPresent: boolean;
  mainResponseShellLineCount: number;
  alignedWithNodeV265: boolean;
}

export interface CredentialResolverTestOnlyShellUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v107-plus-mini-kv-v116-test-only-resolver-shell-upstream-echo-verification-only";
  sourceSpan: "Node v264 + Java v107 + mini-kv v116";
  testOnlyShellContractAligned: boolean;
  requestShapeAligned: boolean;
  responseShapeAligned: boolean;
  failureMappingAligned: boolean;
  guardConditionsAligned: boolean;
  fakeResolverProbeAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  miniKvNonParticipationAligned: boolean;
  javaV109OptimizationContextAligned: boolean;
  nodeV265KeepsRealResolverOutOfScope: true;
}

export type CredentialResolverTestOnlyShellUpstreamEchoVerificationChecks = {
  sourceNodeV264Ready: boolean;
  javaV107EchoReady: boolean;
  miniKvV116NonParticipationReady: boolean;
  javaV109OptimizationContextReady: boolean;
  testOnlyShellContractAligned: boolean;
  requestShapeAligned: boolean;
  responseShapeAligned: boolean;
  failureMappingAligned: boolean;
  guardConditionsAligned: boolean;
  fakeResolverProbeAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  miniKvNonParticipationAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification: boolean;
};

export interface CredentialResolverTestOnlyShellUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification"
    | "node-v264-sandbox-endpoint-credential-resolver-test-only-shell-contract"
    | "java-v107-sandbox-endpoint-credential-resolver-test-only-shell-echo-marker"
    | "java-v109-release-approval-rehearsal-response-records-split"
    | "mini-kv-v116-test-only-resolver-shell-non-participation-receipt"
    | "runtime-config";
  message: string;
}
