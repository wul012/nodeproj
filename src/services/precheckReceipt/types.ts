import type {
  ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
} from "../managedAuditManualSandboxConnectionPrecheckPacket.js";
import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "../historicalEvidenceReportUtils.js";

export interface PrecheckReceiptProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1";
  verificationState: "manual-sandbox-precheck-upstream-receipt-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification: boolean;
  readOnlyUpstreamReceiptVerification: true;
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
  sourceNodeV245: {
    sourceVersion: "Node v245";
    profileVersion: ManagedAuditManualSandboxConnectionPrecheckPacketProfile["profileVersion"];
    precheckState: ManagedAuditManualSandboxConnectionPrecheckPacketProfile["precheckState"];
    precheckDigest: string;
    readyForPrecheckPacket: boolean;
    precheckItemCount: number;
    requiredOperatorFieldCount: number;
    timeoutBudgetMs: 15000;
    readOnlyPrecheckPacket: true;
    executionAllowed: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    automaticUpstreamStart: false;
    actualConnectionAttempted: false;
    managedAuditStateWriteRequested: false;
    approvalLedgerWriteRequested: false;
    javaSqlExecutionRequested: false;
    miniKvWritePermissionRequested: false;
  };
  upstreamReceipts: {
    javaV99: JavaV99Echo;
    miniKvV108: MiniKvV108Receipt;
  };
  receiptVerification: {
    verificationDigest: string;
    verificationMode: "java-v99-plus-mini-kv-v108-precheck-upstream-receipt-verification-only";
    sourceSpan: "Node v245 + Java v99 + mini-kv v108";
    precheckItemCountAligned: boolean;
    operatorFieldCountAligned: boolean;
    operatorFieldNamesAligned: boolean;
    timeoutPolicyAligned: boolean;
    credentialBoundaryAligned: boolean;
    connectionBoundaryAligned: boolean;
    writeBoundaryAligned: boolean;
    autoStartBoundaryAligned: boolean;
    consumerHintShiftAccepted: boolean;
    routeRegistrationAccepted: boolean;
    nodeV247BlocksRealConnection: true;
  };
  checks: PrecheckReceiptChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: PrecheckReceiptMessage[];
  warnings: PrecheckReceiptMessage[];
  recommendations: PrecheckReceiptMessage[];
  evidenceEndpoints: {
    precheckUpstreamReceiptVerificationJson: string;
    precheckUpstreamReceiptVerificationMarkdown: string;
    sourceNodeV245Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface JavaV99Echo {
  sourceVersion: "Java v99";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v23" | "missing";
  receiptField: "managedAuditSandboxConnectionPrecheckPacketEchoReceipt" | "missing";
  precheckItemCount: number;
  timeoutBudgetMs: number;
  readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification: boolean;
  fieldEchoComplete: boolean;
  javaUsesReviewSpecificFieldNames: boolean;
  credentialValueEchoed: false;
  credentialValueReadByJava: false;
  actualConnectionAttemptedByJava: false;
  externalManagedAuditConnectionOpenedByJava: false;
  schemaMigrationSqlExecutedByJava: false;
  approvalLedgerWrittenByJava: false;
  managedAuditStateWriteRequestedByJava: false;
  upstreamServiceAutoStartRequestedByJava: false;
  miniKvWritePermissionRequestedByJava: false;
  readyForNodeV247Alignment: boolean;
}

export interface MiniKvV108Receipt {
  sourceVersion: "mini-kv v108";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  consumerHintAcceptedForCurrentPlan: boolean;
  receiptDigest: string;
  sourcePrecheckProfileVersion: string;
  sourcePrecheckState: string;
  sourcePrecheckItemCount: number;
  sourceRequiredOperatorFieldCount: number;
  sourceTimeoutBudgetMs: number;
  sourceReadyForPrecheckPacket: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceReadOnlyPrecheckPacket: boolean;
  sourceExecutionAllowed: boolean;
  sourceConnectsManagedAudit: boolean;
  sourceReadsManagedAuditCredential: boolean;
  sourceSchemaMigrationExecuted: boolean;
  sourceAutomaticUpstreamStart: boolean;
  operatorReviewFields: readonly string[];
  operatorFieldsMatchNodeV245: boolean;
  precheckItems: readonly string[];
  precheckItemsMatchNodeV245: boolean;
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
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
  readyForNodeV247Alignment: boolean;
}

export type VerificationEvidenceFile = HistoricalEvidenceFile;

export type VerificationSnippetMatch = HistoricalSnippetMatch;

export interface PrecheckReceiptMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification"
    | "node-v245-precheck-packet"
    | "java-v99-precheck-echo-receipt"
    | "mini-kv-v108-precheck-non-participation-receipt"
    | "runtime-config";
  message: string;
}

export type PrecheckReceiptChecks = {
  sourceNodeV245Ready: boolean;
  sourceNodeV245StillReadOnly: boolean;
  javaV99EchoReady: boolean;
  miniKvV108NonParticipationReady: boolean;
  consumerHintAcceptedForCurrentPlan: boolean;
  precheckItemCountAligned: boolean;
  operatorFieldCountAligned: boolean;
  operatorFieldNamesAligned: boolean;
  timeoutPolicyAligned: boolean;
  credentialBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  routeRegistrationAccepted: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification: boolean;
};
