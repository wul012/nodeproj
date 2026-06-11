import type {
  ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile,
} from "./managedAuditManualSandboxConnectionDryRunRequestEnvelope.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionReadinessGateProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1";
  gateState: "manual-sandbox-connection-readiness-gate-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionReadinessGate: boolean;
  readyForOperatorWindowChecklist: boolean;
  readOnlyReview: true;
  sourceNodeV236: {
    sourceVersion: "Node v236";
    profileVersion: ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile["profileVersion"];
    envelopeState: ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile["envelopeState"];
    envelopeDigest: string;
    readyForDryRunRequestEnvelope: boolean;
    readyForOperatorReview: boolean;
    operatorReviewFieldCount: number;
    credentialHandleOnly: true;
    credentialValueIncluded: false;
    actualConnectionAttempted: false;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
  };
  upstreamReadinessEvidence: {
    javaV92: JavaV92DryRunEnvelopeEchoReceiptReference;
    miniKvV101: MiniKvV101RuntimeNoStartNoWriteFollowUpReference;
  };
  readinessGate: {
    gateDigest: string;
    markerSpan: "Node v236 + Java v92 + mini-kv v101";
    gateMode: "manual-sandbox-connection-readiness-gate-only";
    sourceEnvelopeAccepted: boolean;
    javaEchoReceiptAccepted: boolean;
    miniKvNoStartNoWriteAccepted: boolean;
    readyForOperatorWindowChecklist: boolean;
    readyForManagedAuditSandboxAdapterConnection: false;
    actualConnectionAttempted: false;
    credentialValueRead: false;
    schemaMigrationRequested: false;
    managedAuditStateWriteRequested: false;
    upstreamServiceAutoStartRequested: false;
    miniKvExecutionPermissionInferred: false;
    productionWindowOpened: false;
  };
  evidenceFiles: ReadinessGateEvidenceFile[];
  snippetMatches: ReadinessGateSnippetMatch[];
  checks: ManualSandboxConnectionReadinessGateChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    javaEchoedFieldCount: number;
    miniKvHistoricalAnchorCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxConnectionReadinessGateMessage[];
  warnings: ManualSandboxConnectionReadinessGateMessage[];
  recommendations: ManualSandboxConnectionReadinessGateMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionReadinessGateJson: string;
    manualSandboxConnectionReadinessGateMarkdown: string;
    sourceNodeV236Json: string;
    javaV92Runbook: string;
    javaV92Walkthrough: string;
    javaV92BuilderSource: string;
    miniKvV101Runbook: string;
    miniKvV101Walkthrough: string;
    miniKvV101FollowUp: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface JavaV92DryRunEnvelopeEchoReceiptReference {
  sourceVersion: "Java v92";
  headTag: "v92订单平台release-approval-sandbox-connection-dry-run-envelope-echo-receipt";
  runbookPath: string;
  walkthroughPath: string;
  builderSourcePath: string;
  evidencePresent: boolean;
  consumedNodeV236DryRunRequestEnvelope: boolean;
  consumedProfileMatched: boolean;
  nextNodeReadinessGateVersionMatched: boolean;
  echoedEnvelopeFieldCount: number;
  allEnvelopeFieldsEchoed: boolean;
  credentialHandleOnly: boolean;
  credentialValueIncludedInEnvelope: boolean;
  credentialValueReadByJava: boolean;
  actualConnectionAttemptedByJava: boolean;
  schemaMigrationSqlExecutedByJava: boolean;
  approvalLedgerWrittenByJava: boolean;
  managedAuditStoreWrittenByJava: boolean;
  readyForNodeV237ManualSandboxConnectionReadinessGate: boolean;
  readyForManagedAuditSandboxAdapterConnection: boolean;
  readyForNodeV237Gate: boolean;
}

export interface MiniKvV101RuntimeNoStartNoWriteFollowUpReference {
  sourceVersion: "mini-kv v101";
  headTag: "第一百零一版不自启不写入证据跟进";
  runbookPath: string;
  walkthroughPath: string;
  followUpPath: string;
  evidencePresent: boolean;
  followUpVersion: string;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  sourceEnvelopeProducer: string;
  operatorReviewFieldCount: number;
  credentialHandleOnly: boolean;
  credentialValueIncluded: boolean;
  actualConnectionAttempted: boolean;
  schemaMigrationRequested: boolean;
  managedAuditStateWriteRequested: boolean;
  upstreamServiceAutoStartRequested: boolean;
  miniKvPermissionRequested: boolean;
  readyForOperatorReview: boolean;
  readyForManagedAuditSandboxAdapterConnection: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  writeCommandsExecuted: boolean;
  adminCommandsExecuted: boolean;
  runtimeWriteObserved: boolean;
  managedAuditStore: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  sandboxManagedAuditStateWriteAllowed: boolean;
  credentialValueReadAllowed: boolean;
  schemaRehearsalExecutionAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  orderAuthoritative: boolean;
  historicalReceiptAnchorCount: number;
  historicalReceiptAnchorsStable: boolean;
  readyForNodeV237Gate: boolean;
}

export interface ReadinessGateEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface ReadinessGateSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

export type ManualSandboxConnectionReadinessGateChecks = {
  sourceNodeV236DryRunEnvelopeReady: boolean;
  sourceEnvelopeDigestPresent: boolean;
  sourceStillHandleOnlyAndNonExecuting: boolean;
  javaV92EvidencePresent: boolean;
  javaV92EchoReceiptAccepted: boolean;
  javaV92BoundaryAccepted: boolean;
  miniKvV101EvidencePresent: boolean;
  miniKvV101FollowUpAccepted: boolean;
  miniKvV101BoundaryAccepted: boolean;
  readinessGateDigestPresent: boolean;
  readyForOperatorWindowChecklist: boolean;
  noCredentialValueRead: boolean;
  noConnectionAttempted: boolean;
  noSchemaMigrationRequested: boolean;
  noManagedAuditStateWriteRequested: boolean;
  noUpstreamServiceAutoStartRequested: boolean;
  noMiniKvExecutionPermissionInferred: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionReadinessGate: boolean;
};

export interface ManualSandboxConnectionReadinessGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-readiness-gate"
    | "node-v236-dry-run-request-envelope"
    | "java-v92-dry-run-envelope-echo-receipt"
    | "mini-kv-v101-runtime-no-start-no-write-follow-up"
    | "runtime-config";
  message: string;
}

export type JsonObject = Record<string, unknown>;
