import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner.v1";
  runnerState: "read-only-cross-project-readiness-ready" | "blocked";
  activeNodeVersion: "Node v327";
  sourceNodeContractVersion: "Node v326";
  sourceJavaVersion: "Java v150";
  sourceMiniKvVersion: "mini-kv v142";
  targetPrerequisiteId: "abort-rollback-semantics";
  consumesNodeV326AbortRollbackSemanticsContractIntake: true;
  consumesJavaV150LocalEvidence: true;
  consumesMiniKvV142LocalReceipt: true;
  readsSiblingWorkspaceEvidence: true;
  usesHistoricalFixtureFallback: true;
  readOnlyCrossProjectReadinessRunner: true;
  readyForReadOnlyCrossProjectReadinessReport: boolean;
  readyForFinalPrerequisiteClosureReview: boolean;
  readyForRuntimeShellImplementation: false;
  readyForRuntimeShellInvocation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
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
  sourceNodeV326: SourceNodeV326AbortRollbackSemanticsContractReference;
  javaV150Evidence: JavaV150AbortRollbackSemanticsEvidenceReference;
  miniKvV142Receipt: MiniKvV142AbortRollbackSemanticsReceiptReference;
  sideEffectSafetyMatrix: ReadOnlyCrossProjectSideEffectSafetyMatrix;
  readinessDigest: string;
  checks: ReadOnlyCrossProjectReadinessChecks;
  summary: ReadOnlyCrossProjectReadinessSummary;
  productionBlockers: ReadOnlyCrossProjectReadinessMessage[];
  warnings: ReadOnlyCrossProjectReadinessMessage[];
  recommendations: ReadOnlyCrossProjectReadinessMessage[];
  evidenceEndpoints: {
    readOnlyCrossProjectReadinessJson: string;
    readOnlyCrossProjectReadinessMarkdown: string;
    sourceNodeV326Json: string;
    sourceNodeV326Markdown: string;
    javaV150EvidencePath: string;
    miniKvV142ReceiptPath: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV326AbortRollbackSemanticsContractReference {
  sourceVersion: "Node v326";
  profileVersion: string;
  contractState: string;
  readyForContractIntake: boolean;
  targetPrerequisiteId: string;
  nextJavaVersion: string;
  nextMiniKvVersion: string;
  nextNodeVerificationVersion: string;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  noGoBoundaryCount: number;
  implementationStillBlocked: boolean;
  abortRollbackExecutionAllowed: boolean;
  runtimeShellImplemented: boolean;
  runtimeShellInvocationAllowed: boolean;
  executionAllowed: boolean;
  connectsManagedAudit: boolean;
  credentialValueRead: boolean;
  rawEndpointUrlParsed: boolean;
  externalRequestSent: boolean;
  javaSqlExecutionAllowed: boolean;
  miniKvWriteCommandAllowed: boolean;
  approvalLedgerWritten: boolean;
  schemaMigrationExecuted: boolean;
  automaticUpstreamStart: boolean;
}

export interface JavaV150AbortRollbackSemanticsEvidenceReference {
  project: "advanced-order-platform";
  sourceVersion: "Java v150";
  tagLabel: "v150-order-platform-abort-rollback-semantics-contract-echo";
  evidenceFile: HistoricalEvidenceFile;
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  readOnlyEchoDocumented: boolean;
  sqlRollbackLedgerNetworkDenied: boolean;
  noRuntimeProviderClientDocumented: boolean;
  noAutomaticUpstreamStartDocumented: boolean;
  readyForNodeConsumption: boolean;
}

export interface MiniKvV142AbortRollbackSemanticsReceiptReference {
  project: "mini-kv";
  sourceVersion: "mini-kv v142";
  tagLabel: "第一百四十二版中止回滚语义合同非参与回执";
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
  consumesNodeV326: boolean | null;
  readyForNodeV327: boolean | null;
  rollbackExecutionAllowed: boolean | null;
  deploymentActionAllowed: boolean | null;
  javaSqlExecutionAllowed: boolean | null;
  miniKvWriteCommandAllowed: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  credentialValueRead: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  externalRequestSent: boolean | null;
  httpRequestSent: boolean | null;
  tcpConnectionAttempted: boolean | null;
  automaticUpstreamStart: boolean | null;
  abortRollbackAuthority: boolean | null;
  readyForNodeConsumption: boolean;
}

export interface ReadOnlyCrossProjectSideEffectSafetyMatrix {
  nodeStartsJavaService: false;
  nodeStartsMiniKvService: false;
  nodeReadsCredentialValue: false;
  nodeParsesRawEndpointUrl: false;
  nodeSendsHttpRequest: false;
  nodeOpensTcpConnection: false;
  nodeWritesJavaLedger: false;
  nodeExecutesJavaSql: false;
  nodeCallsRollback: false;
  nodeRunsSchemaMigration: false;
  nodeRunsDeployment: false;
  nodeRunsMiniKvLoad: false;
  nodeRunsMiniKvCompact: false;
  nodeRunsMiniKvRestore: false;
  nodeRunsMiniKvSetnxex: false;
  nodeRunsMiniKvWriteCommand: false;
  allSideEffectsClosed: boolean;
}

export type ReadOnlyCrossProjectReadinessChecks = {
  nodeV326ContractReady: boolean;
  nodeV326TargetsAbortRollbackSemantics: boolean;
  nodeV326KeepsRuntimeBlocked: boolean;
  nodeV326KeepsSideEffectsClosed: boolean;
  javaV150EvidencePresent: boolean;
  javaV150ReadOnlyEchoDocumented: boolean;
  javaV150SqlRollbackLedgerNetworkDenied: boolean;
  javaV150NoRuntimeProviderClientDocumented: boolean;
  javaV150NoAutomaticUpstreamStartDocumented: boolean;
  miniKvV142ReceiptPresent: boolean;
  miniKvV142ReleaseVersionMatches: boolean;
  miniKvV142ReadOnlyReceipt: boolean;
  miniKvV142ExecutionDenied: boolean;
  miniKvV142RestoreDenied: boolean;
  miniKvV142WriteCommandsDenied: boolean;
  miniKvV142DoesNotBecomeAuthority: boolean;
  miniKvV142ConsumesNodeV326: boolean;
  miniKvV142ReadyForNodeV327: boolean;
  sideEffectSafetyMatrixClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  readyForReadOnlyCrossProjectReadinessReport: boolean;
};

export interface ReadOnlyCrossProjectReadinessSummary {
  checkCount: number;
  passedCheckCount: number;
  javaEvidenceFileCount: number;
  javaSnippetCount: number;
  javaMatchedSnippetCount: number;
  miniKvReceiptFileCount: number;
  sideEffectClosedCount: number;
  sideEffectTotalCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ReadOnlyCrossProjectReadinessMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "node-v326" | "java-v150" | "mini-kv-v142" | "side-effect-safety" | "configuration" | "next-step";
  message: string;
}
