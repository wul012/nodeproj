export interface JavaV93OperatorWindowChecklistEchoReference {
  sourceVersion: "Java v93";
  headTag: "v93";
  runbookPath: string;
  walkthroughPath: string;
  builderPath: string;
  integrationTestPath: string;
  evidencePresent: boolean;
  receiptVersionDocumented: boolean;
  sourceNodeV238ProfileDocumented: boolean;
  nextNodeV239ProfileDocumented: boolean;
  readyForNodeV239EvidenceVerification: boolean;
  checklistCountsDocumented: boolean;
  checklistFieldNamesEchoed: boolean;
  approvalItemsEchoed: boolean;
  pauseCodesEchoed: boolean;
  credentialHandleOnly: boolean;
  credentialValueReadByJava: boolean;
  schemaMigrationSqlExecutedByJava: boolean;
  approvalLedgerWrittenByJava: boolean;
  actualConnectionAttemptedByJava: boolean;
  javaAutoStartForbidden: boolean;
  builderRecordSplitApplied: boolean;
  receiptDigestDocumented: boolean;
}

export interface MiniKvV102OperatorWindowNoStartNoWriteReference {
  sourceVersion: "mini-kv v102";
  headTag: "第102版";
  receiptFixturePath: string;
  runtimeSmokePath: string;
  walkthroughPath: string;
  testPath: string;
  evidencePresent: boolean;
  receiptVersion: string;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  sourceChecklist: string;
  sourceChecklistState: string;
  approvalItemCount: number;
  checklistStepCount: number;
  pauseConditionCount: number;
  forbiddenOperationCount: number;
  readyForJavaV93EchoReceipt: boolean;
  readyForManagedAuditSandboxAdapterConnection: boolean;
  currentArtifactPathHint: string;
  currentLiveReadSessionEcho: string;
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
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
  credentialValueRequired: boolean;
  credentialValueReadAllowed: boolean;
  schemaRehearsalExecutionAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  operatorWindowWriteAllowed: boolean;
  currentDigestSetPresent: boolean;
  readyForNodeV239EvidenceVerification: boolean;
}

export interface OperatorWindowEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface OperatorWindowSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

export type ManualSandboxOperatorWindowEvidenceVerificationChecks = {
  sourceNodeV238ChecklistReady: boolean;
  sourceNodeV238StillConnectionBlocked: boolean;
  sourceNodeV238ChecklistDigestPresent: boolean;
  javaV93EvidencePresent: boolean;
  javaV93EchoAccepted: boolean;
  javaV93NoWriteNoSqlNoCredentialBoundaryAccepted: boolean;
  miniKvV102EvidencePresent: boolean;
  miniKvV102NoStartNoWriteReceiptAccepted: boolean;
  miniKvV102BoundaryAccepted: boolean;
  checklistCountsAlignedAcrossSources: boolean;
  operatorChecklistSourceAligned: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  miniKvExecutionStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification: boolean;
};

export interface OperatorWindowEvidenceVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-operator-window-evidence-verification"
    | "node-v238-operator-window-checklist"
    | "java-v93-operator-window-echo"
    | "mini-kv-v102-no-start-no-write-receipt"
    | "runtime-config";
  message: string;
}

export interface MiniKvOperatorWindowReceiptFixture extends Record<string, unknown> {
  operator_window_no_start_no_write_receipt?: Record<string, unknown>;
}

export const JAVA_V93_RUNBOOK = "D:/javaproj/advanced-order-platform/c/93/\u89e3\u91ca/\u8bf4\u660e.md";

export const JAVA_V93_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/96-version-93-release-approval-sandbox-connection-operator-window-checklist-echo-receipt.md";

export const JAVA_V93_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptBuilder.java";

export const JAVA_V93_INTEGRATION_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/OpsOverviewIntegrationTests.java";

export const MINI_KV_V102_RECEIPT = "D:/C/mini-kv/fixtures/release/operator-window-no-start-no-write-receipt.json";

export const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";

export const MINI_KV_V102_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/158-version-102-operator-window-no-start-no-write-receipt.md";

export const MINI_KV_V102_TEST = "D:/C/mini-kv/tests/operator_window_no_start_no_write_receipt_tests.cpp";

export const ENDPOINTS = Object.freeze({
  manualSandboxConnectionOperatorWindowEvidenceVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
  manualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification?format=markdown",
  sourceNodeV238Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist",
  javaV93Runbook: JAVA_V93_RUNBOOK,
  miniKvV102ReceiptFixture: MINI_KV_V102_RECEIPT,
  activePlan: "docs/plans/v237-post-readiness-gate-roadmap.md",
});

export const SHA256_HEX = /^[a-f0-9]{64}$/;

export const FNV1A64 = /^fnv1a64:[a-f0-9]{16}$/;
