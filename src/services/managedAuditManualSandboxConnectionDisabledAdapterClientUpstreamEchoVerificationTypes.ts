import type {
  ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.js";
import type {
  ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
} from "./managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";

export interface ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1";
  verificationState: "disabled-adapter-client-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV252: SourceNodeV252DisabledAdapterClientPrecheckReference;
  sourceNodeV253: SourceNodeV253TestOnlyAdapterShellReference;
  upstreamEchoes: {
    javaV102: JavaV102DisabledAdapterClientEchoReference;
    miniKvV111: MiniKvV111DisabledAdapterClientNonParticipationReference;
  };
  echoVerification: {
    verificationDigest: string;
    verificationMode: "java-v102-plus-mini-kv-v111-disabled-adapter-client-upstream-echo-verification-only";
    sourceSpan: "Node v252 + Node v253 + Java v102 + mini-kv v111";
    envHandleCountAligned: boolean;
    failureClassCountAligned: boolean;
    dryRunResponseShapeAligned: boolean;
    fakeTransportShapeAligned: boolean;
    credentialBoundaryAligned: boolean;
    connectionBoundaryAligned: boolean;
    writeBoundaryAligned: boolean;
    autoStartBoundaryAligned: boolean;
    nodeV254BlocksRealConnection: true;
  };
  checks: DisabledAdapterClientUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: DisabledAdapterClientUpstreamEchoVerificationMessage[];
  warnings: DisabledAdapterClientUpstreamEchoVerificationMessage[];
  recommendations: DisabledAdapterClientUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    disabledAdapterClientUpstreamEchoVerificationJson: string;
    disabledAdapterClientUpstreamEchoVerificationMarkdown: string;
    sourceNodeV252Json: string;
    sourceNodeV253Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV252DisabledAdapterClientPrecheckReference {
  sourceVersion: "Node v252";
  profileVersion: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["profileVersion"];
  precheckState: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["precheckState"];
  precheckDigest: string;
  readyForDisabledAdapterClientPrecheck: boolean;
  requiredEnvHandleCount: number;
  failureClassCount: number;
  dryRunResponseFieldCount: number;
  reusedNoGoConditionCount: number;
  readyForSandboxAdapterConnection: false;
  externalRequestStillBlocked: true;
  credentialValueStillBlocked: true;
}

export interface SourceNodeV253TestOnlyAdapterShellReference {
  sourceVersion: "Node v253";
  profileVersion: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["profileVersion"];
  shellContractState: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["shellContractState"];
  contractDigest: string;
  readyForTestOnlyAdapterShellContract: boolean;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  fakeTransportOnly: true;
  realClientImplemented: false;
  realTransportAllowed: false;
  externalRequestSent: false;
  credentialValueRead: false;
  productionRecordWritten: false;
}

export interface JavaV102DisabledAdapterClientEchoReference {
  sourceVersion: "Java v102";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v24" | "missing";
  receiptField: "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt" | "missing";
  consumedByNodeDisabledAdapterClientPrecheckProfile:
    | ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile["profileVersion"]
    | "missing";
  consumedByNodeTestOnlyAdapterShellProfile:
    | ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["profileVersion"]
    | "missing";
  nextNodeConsumerVersion: "Node v254" | "missing";
  requiredEnvHandleCount: number;
  failureClassCount: number;
  dryRunResponseFieldCount: number;
  reusedNoGoConditionCount: number;
  readyForNodeV254DisabledAdapterClientUpstreamEchoVerification: boolean;
  clientMayBeInstantiated: false;
  externalRequestMayBeSent: false;
  credentialValueMayBeLoaded: false;
  actualConnectionAttemptedByJava: false;
  externalRequestSentByJava: false;
  schemaMigrationSqlExecutedByJava: false;
  approvalLedgerWrittenByJava: false;
  upstreamServiceAutoStartRequestedByJava: false;
  miniKvWritePermissionRequestedByJava: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV254Alignment: boolean;
}

export interface MiniKvV111DisabledAdapterClientNonParticipationReference {
  sourceVersion: "mini-kv v111";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourcePrecheckProfileVersion: string;
  sourcePrecheckState: string;
  sourceRequiredEnvHandleCount: number;
  sourceFailureClassCount: number;
  sourceDryRunResponseFieldCount: number;
  sourceReusedNoGoConditionCount: number;
  sourceReadyForDisabledAdapterClientPrecheck: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceExternalRequestMayBeSent: boolean;
  sourceCredentialValueMayBeLoaded: boolean;
  sourceShellProfileVersion: string;
  sourceShellState: string;
  sourceTransportKind: string;
  sourceRequestShapeFieldCount: number;
  sourceResponseShapeFieldCount: number;
  sourceFailureMappingCount: number;
  sourceGuardConditionCount: number;
  sourceFakeTransportOnly: boolean;
  sourceRealClientImplemented: boolean;
  sourceRealTransportAllowed: boolean;
  sourceFakeTransportProbeNoExternalRequest: boolean;
  sourceFakeTransportProbeNoCredentialRead: boolean;
  sourceFakeTransportProbeNoProductionWrite: boolean;
  requestCredentialHandleOnly: boolean;
  requestCredentialValueAccepted: boolean;
  responseExternalRequestSent: boolean;
  responseCredentialValueRead: boolean;
  responseProductionRecordWritten: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  dryRunOnly: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  credentialValueReadAllowed: boolean;
  credentialValueLoaded: boolean;
  externalRequestSent: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
  readyForNodeV254Alignment: boolean;
}

export interface VerificationEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface VerificationSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

export interface DisabledAdapterClientUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification"
    | "node-v252-disabled-adapter-client-precheck"
    | "node-v253-test-only-adapter-shell-contract"
    | "java-v102-disabled-adapter-client-precheck-echo-receipt"
    | "mini-kv-v111-disabled-adapter-client-non-participation-receipt"
    | "runtime-config";
  message: string;
}

export type DisabledAdapterClientUpstreamEchoVerificationChecks = {
  sourceNodeV252Ready: boolean;
  sourceNodeV253Ready: boolean;
  sourceNodeBoundariesStillClosed: boolean;
  javaV102EchoReady: boolean;
  miniKvV111NonParticipationReady: boolean;
  envHandleCountAligned: boolean;
  failureClassCountAligned: boolean;
  dryRunResponseShapeAligned: boolean;
  fakeTransportShapeAligned: boolean;
  credentialBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification: boolean;
};
