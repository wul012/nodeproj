import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  evidenceById as fileById,
  evidenceFile,
  readEvidenceJson,
  snippet,
  snippetMatched,
  stringField,
} from "./manualConnectionSources.js";
import { operatorWindowAdvisories } from "./manualConnectionAdvisories.js";
import { mapOperatorReceipt } from "./manualConnectionReceiptMaps.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowChecklist,
  type ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile,
} from "./managedAuditManualSandboxConnectionOperatorWindowChecklist.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";
import {
  ENDPOINTS,
  FNV1A64,
  JAVA_V93_BUILDER,
  JAVA_V93_INTEGRATION_TEST,
  JAVA_V93_RUNBOOK,
  JAVA_V93_WALKTHROUGH,
  MINI_KV_RUNTIME_SMOKE,
  MINI_KV_V102_RECEIPT,
  MINI_KV_V102_TEST,
  MINI_KV_V102_WALKTHROUGH,
  SHA256_HEX,
  type JavaV93OperatorWindowChecklistEchoReference,
  type ManualSandboxOperatorWindowEvidenceVerificationChecks,
  type MiniKvOperatorWindowReceiptFixture,
  type MiniKvV102OperatorWindowNoStartNoWriteReference,
  type OperatorWindowEvidenceFile,
  type OperatorWindowEvidenceVerificationMessage,
  type OperatorWindowSnippetMatch,
} from "../evidence/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationEvidence.js";

export {
  renderOperatorWindowVerification as renderManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown,
} from "./verificationReports/manualConnection.js";

export interface ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile
  extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1";
  verificationState: "manual-sandbox-connection-operator-window-evidence-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification: boolean;
  readOnlyVerification: true;
  sourceNodeV238: {
    sourceVersion: "Node v238";
    profileVersion: ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile["profileVersion"];
    checklistState: ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile["checklistState"];
    checklistDigest: string;
    sourceReadinessGateDigest: string;
    readyForOperatorWindowChecklist: boolean;
    readyForJavaV93EchoReceipt: boolean;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    approvalItemCount: number;
    checklistStepCount: number;
    pauseConditionCount: number;
    forbiddenOperationCount: number;
    credentialValueRead: false;
    actualConnectionAttempted: false;
    schemaMigrationRequested: false;
    upstreamServiceAutoStartRequested: false;
  };
  upstreamEvidence: {
    javaV93: JavaV93OperatorWindowChecklistEchoReference;
    miniKvV102: MiniKvV102OperatorWindowNoStartNoWriteReference;
  };
  evidenceFiles: OperatorWindowEvidenceFile[];
  snippetMatches: OperatorWindowSnippetMatch[];
  operatorWindowEvidenceVerification: {
    verificationDigest: string;
    sourceChecklistDigest: string;
    markerSpan: "Node v238 + Java v93 + mini-kv v102";
    verificationMode: "manual-sandbox-connection-operator-window-evidence-verification-only";
    javaEchoAccepted: boolean;
    miniKvReceiptAccepted: boolean;
    checklistCountsAligned: boolean;
    boundaryFlagsAligned: boolean;
    connectionExecutionAllowed: false;
    credentialValueReadAllowed: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    automaticServiceStartAllowed: false;
    miniKvExecutionAllowed: false;
    nodeV239BlocksRealConnection: true;
  };
  checks: ManualSandboxOperatorWindowEvidenceVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: OperatorWindowEvidenceVerificationMessage[];
  warnings: OperatorWindowEvidenceVerificationMessage[];
  recommendations: OperatorWindowEvidenceVerificationMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionOperatorWindowEvidenceVerificationJson: string;
    manualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown: string;
    sourceNodeV238Json: string;
    javaV93Runbook: string;
    miniKvV102ReceiptFixture: string;
    activePlan: string;
  };
  nextActions: string[];
}

export function loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile {
  const sourceChecklistConfig: AppConfig = {
    ...input.config,
    upstreamActionsEnabled: false,
  };
  const sourceChecklist = loadManagedAuditManualSandboxConnectionOperatorWindowChecklist({
    config: sourceChecklistConfig,
  });
  const sourceNodeV238 = createSourceNodeV238(sourceChecklist);
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const javaV93 = createJavaV93Reference(evidenceFiles, snippetMatches);
  const miniKvV102 = createMiniKvV102Reference(
    evidenceFiles,
    readEvidenceJson<MiniKvOperatorWindowReceiptFixture>(MINI_KV_V102_RECEIPT),
  );
  const operatorWindowEvidenceVerification = createOperatorWindowEvidenceVerification(
    sourceNodeV238,
    javaV93,
    miniKvV102,
  );
  const checks = createChecks(input.config, sourceNodeV238, javaV93, miniKvV102, operatorWindowEvidenceVerification);
  checks.readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification
    ? "manual-sandbox-connection-operator-window-evidence-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const { warnings, recommendations } = operatorWindowAdvisories();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection operator window evidence verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification:
      checks.readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyVerification: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV238,
    upstreamEvidence: {
      javaV93,
      miniKvV102,
    },
    evidenceFiles,
    snippetMatches,
    operatorWindowEvidenceVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: evidenceFiles.length,
      matchedSnippetCount: snippetMatches.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v239 as evidence verification only; do not open a managed audit sandbox connection.",
      "Use Node v240 to build a disabled dry-run command package only after this verification remains ready.",
      "Keep v239 dependencies pinned to Java v93 and mini-kv v102; later Java v94 / mini-kv v103 are optimization follow-ups, not new prerequisites.",
    ],
  };
}

function createSourceNodeV238(
  source: ManagedAuditManualSandboxConnectionOperatorWindowChecklistProfile,
): ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["sourceNodeV238"] {
  return {
    sourceVersion: "Node v238",
    profileVersion: source.profileVersion,
    checklistState: source.checklistState,
    checklistDigest: source.operatorWindowChecklist.checklistDigest,
    sourceReadinessGateDigest: source.operatorWindowChecklist.sourceReadinessGateDigest,
    readyForOperatorWindowChecklist: source.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist,
    readyForJavaV93EchoReceipt: source.operatorWindowChecklist.readyForJavaV93EchoReceipt,
    readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalItemCount: source.summary.approvalItemCount,
    checklistStepCount: source.summary.checklistStepCount,
    pauseConditionCount: source.summary.pauseConditionCount,
    forbiddenOperationCount: source.summary.forbiddenOperationCount,
    credentialValueRead: source.operatorWindowChecklist.credentialValueRead,
    actualConnectionAttempted: source.operatorWindowChecklist.actualConnectionAttempted,
    schemaMigrationRequested: source.operatorWindowChecklist.schemaMigrationRequested,
    upstreamServiceAutoStartRequested: source.operatorWindowChecklist.upstreamServiceAutoStartRequested,
  };
}

function createJavaV93Reference(
  evidenceFiles: OperatorWindowEvidenceFile[],
  snippets: OperatorWindowSnippetMatch[],
): JavaV93OperatorWindowChecklistEchoReference {
  const reference: JavaV93OperatorWindowChecklistEchoReference = {
    sourceVersion: "Java v93",
    headTag: "v93",
    runbookPath: JAVA_V93_RUNBOOK,
    walkthroughPath: JAVA_V93_WALKTHROUGH,
    builderPath: JAVA_V93_BUILDER,
    integrationTestPath: JAVA_V93_INTEGRATION_TEST,
    evidencePresent: fileById(evidenceFiles, "java-v93-runbook").exists
      && fileById(evidenceFiles, "java-v93-walkthrough").exists
      && fileById(evidenceFiles, "java-v93-builder").exists
      && fileById(evidenceFiles, "java-v93-integration-test").exists,
    receiptVersionDocumented: snippetMatched(snippets, "java-v93-receipt-version"),
    sourceNodeV238ProfileDocumented: snippetMatched(snippets, "java-v93-source-node-v238-profile"),
    nextNodeV239ProfileDocumented: snippetMatched(snippets, "java-v93-next-node-v239-profile"),
    readyForNodeV239EvidenceVerification: snippetMatched(snippets, "java-v93-ready-v239-true"),
    checklistCountsDocumented: snippetMatched(snippets, "java-v93-required-approval-count")
      && snippetMatched(snippets, "java-v93-checklist-step-count")
      && snippetMatched(snippets, "java-v93-pause-count")
      && snippetMatched(snippets, "java-v93-forbidden-count"),
    checklistFieldNamesEchoed: snippetMatched(snippets, "java-v93-owner-field")
      && snippetMatched(snippets, "java-v93-credential-field")
      && snippetMatched(snippets, "java-v93-schema-field")
      && snippetMatched(snippets, "java-v93-rollback-field")
      && snippetMatched(snippets, "java-v93-abort-field"),
    approvalItemsEchoed: snippetMatched(snippets, "java-v93-release-owner")
      && snippetMatched(snippets, "java-v93-security-reviewer")
      && snippetMatched(snippets, "java-v93-operations-owner"),
    pauseCodesEchoed: snippetMatched(snippets, "java-v93-source-gate-pause")
      && snippetMatched(snippets, "java-v93-credential-pause")
      && snippetMatched(snippets, "java-v93-schema-pause"),
    credentialHandleOnly: snippetMatched(snippets, "java-v93-credential-handle-only"),
    credentialValueReadByJava: !snippetMatched(snippets, "java-v93-no-credential-read"),
    schemaMigrationSqlExecutedByJava: !snippetMatched(snippets, "java-v93-no-sql"),
    approvalLedgerWrittenByJava: !snippetMatched(snippets, "java-v93-no-ledger"),
    actualConnectionAttemptedByJava: !snippetMatched(snippets, "java-v93-no-connection"),
    javaAutoStartForbidden: snippetMatched(snippets, "java-v93-no-autostart"),
    builderRecordSplitApplied: snippetMatched(snippets, "java-v93-builder-record-split")
      && snippetMatched(snippets, "java-v93-envelope-record-split"),
    receiptDigestDocumented: snippetMatched(snippets, "java-v93-receipt-digest"),
  };
  return reference;
}

function createMiniKvV102Reference(
  evidenceFiles: OperatorWindowEvidenceFile[],
  fixture: MiniKvOperatorWindowReceiptFixture,
): MiniKvV102OperatorWindowNoStartNoWriteReference {
  const receipt = fixture.operator_window_no_start_no_write_receipt ?? {};
  const reference: MiniKvV102OperatorWindowNoStartNoWriteReference = {
    sourceVersion: "mini-kv v102",
    headTag: "第102版",
    receiptFixturePath: MINI_KV_V102_RECEIPT,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    walkthroughPath: MINI_KV_V102_WALKTHROUGH,
    testPath: MINI_KV_V102_TEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v102-receipt").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-v102-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-v102-test").exists,
    ...mapOperatorReceipt(receipt),
    currentDigestSetPresent: [
      "binary_provenance_digest",
      "retention_check_digest",
      "retention_replay_marker_digest",
      "restore_boundary_receipt_digest",
      "non_authoritative_storage_receipt_digest",
      "command_dispatch_receipt_digest",
      "adapter_shell_receipt_digest",
      "external_adapter_receipt_digest",
      "sandbox_adapter_receipt_digest",
      "sandbox_connection_echo_marker_digest",
      "sandbox_no_start_receipt_digest",
      "failure_taxonomy_digest",
      "read_command_list_digest",
    ].every((key) => digestFieldPresent(receipt, key)),
    readyForNodeV239EvidenceVerification: false,
  };
  return {
    ...reference,
    readyForNodeV239EvidenceVerification: operatorReceiptReady(reference),
  };
}

function digestFieldPresent(receipt: Record<string, unknown>, key: string): boolean {
  return FNV1A64.test(stringField(receipt, key) ?? "");
}

function operatorReceiptReady(reference: MiniKvV102OperatorWindowNoStartNoWriteReference): boolean {
  return [
    operatorReceiptIdentityAccepted(reference),
    miniKvBoundaryAccepted(reference),
  ].every(Boolean);
}

function operatorReceiptIdentityAccepted(
  reference: MiniKvV102OperatorWindowNoStartNoWriteReference,
): boolean {
  return [
    reference.evidencePresent,
    reference.receiptVersion === "mini-kv-operator-window-no-start-no-write-receipt.v1",
    reference.projectVersion === "0.102.0",
    reference.releaseVersion === "v102",
    reference.consumerHint === "Node v239 manual sandbox connection operator window evidence verification",
    reference.sourceChecklist === "Node v238 manual sandbox connection operator window checklist",
    reference.sourceChecklistState === "manual-sandbox-connection-operator-window-checklist-ready",
    reference.currentArtifactPathHint === "c/102/",
    reference.currentLiveReadSessionEcho === "mini-kv-live-read-v102",
    reference.approvalItemCount === 3,
    reference.checklistStepCount === 8,
    reference.pauseConditionCount === 8,
    reference.forbiddenOperationCount === 6,
    reference.readyForJavaV93EchoReceipt,
    !reference.readyForManagedAuditSandboxAdapterConnection,
    reference.currentDigestSetPresent,
  ].every(Boolean);
}

function createOperatorWindowEvidenceVerification(
  source: ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["sourceNodeV238"],
  javaV93: JavaV93OperatorWindowChecklistEchoReference,
  miniKvV102: MiniKvV102OperatorWindowNoStartNoWriteReference,
): ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["operatorWindowEvidenceVerification"] {
  const checklistCountsAligned = [
    source.approvalItemCount === 3,
    source.checklistStepCount === 8,
    source.pauseConditionCount === 8,
    source.forbiddenOperationCount === 6,
    javaV93.checklistCountsDocumented,
    miniKvV102.approvalItemCount === source.approvalItemCount,
    miniKvV102.checklistStepCount === source.checklistStepCount,
    miniKvV102.pauseConditionCount === source.pauseConditionCount,
    miniKvV102.forbiddenOperationCount === source.forbiddenOperationCount,
  ].every(Boolean);
  const boundaryFlagsAligned = [
    !source.readyForSandboxAdapterConnectionFromSource,
    !source.connectsManagedAudit,
    !source.readsManagedAuditCredential,
    !source.schemaMigrationExecuted,
    !source.credentialValueRead,
    !source.actualConnectionAttempted,
    !source.schemaMigrationRequested,
    !source.upstreamServiceAutoStartRequested,
    javaOperatorBoundaryAccepted(javaV93),
    miniKvBoundaryAccepted(miniKvV102),
  ].every(Boolean);

  return {
    verificationDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1",
      sourceChecklistDigest: source.checklistDigest,
      javaV93,
      miniKvV102,
      checklistCountsAligned,
      boundaryFlagsAligned,
    }),
    sourceChecklistDigest: source.checklistDigest,
    markerSpan: "Node v238 + Java v93 + mini-kv v102",
    verificationMode: "manual-sandbox-connection-operator-window-evidence-verification-only",
    javaEchoAccepted: javaOperatorEchoAccepted(javaV93),
    miniKvReceiptAccepted: miniKvV102.readyForNodeV239EvidenceVerification,
    checklistCountsAligned,
    boundaryFlagsAligned,
    connectionExecutionAllowed: false,
    credentialValueReadAllowed: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    automaticServiceStartAllowed: false,
    miniKvExecutionAllowed: false,
    nodeV239BlocksRealConnection: true,
  };
}

function createChecks(
  config: AppConfig,
  source: ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["sourceNodeV238"],
  javaV93: JavaV93OperatorWindowChecklistEchoReference,
  miniKvV102: MiniKvV102OperatorWindowNoStartNoWriteReference,
  verification: ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["operatorWindowEvidenceVerification"],
): ManualSandboxOperatorWindowEvidenceVerificationChecks {
  return {
    sourceNodeV238ChecklistReady: source.readyForOperatorWindowChecklist
      && source.checklistState === "manual-sandbox-connection-operator-window-checklist-ready",
    sourceNodeV238StillConnectionBlocked: !source.readyForSandboxAdapterConnectionFromSource
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.schemaMigrationExecuted
      && !source.actualConnectionAttempted
      && !source.credentialValueRead,
    sourceNodeV238ChecklistDigestPresent: SHA256_HEX.test(source.checklistDigest)
      && SHA256_HEX.test(source.sourceReadinessGateDigest),
    javaV93EvidencePresent: javaV93.evidencePresent,
    javaV93EchoAccepted: verification.javaEchoAccepted,
    javaV93NoWriteNoSqlNoCredentialBoundaryAccepted: !javaV93.credentialValueReadByJava
      && !javaV93.schemaMigrationSqlExecutedByJava
      && !javaV93.approvalLedgerWrittenByJava
      && !javaV93.actualConnectionAttemptedByJava
      && javaV93.javaAutoStartForbidden,
    miniKvV102EvidencePresent: miniKvV102.evidencePresent,
    miniKvV102NoStartNoWriteReceiptAccepted: verification.miniKvReceiptAccepted,
    miniKvV102BoundaryAccepted: miniKvBoundaryAccepted(miniKvV102),
    checklistCountsAlignedAcrossSources: verification.checklistCountsAligned,
    operatorChecklistSourceAligned: javaV93.sourceNodeV238ProfileDocumented
      && miniKvV102.sourceChecklist === "Node v238 manual sandbox connection operator window checklist"
      && miniKvV102.sourceChecklistState === source.checklistState,
    credentialValueStillForbidden: !verification.credentialValueReadAllowed,
    schemaMigrationStillBlocked: !verification.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !verification.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !verification.managedAuditWriteAllowed,
    automaticServiceStartStillBlocked: !verification.automaticServiceStartAllowed,
    miniKvExecutionStillBlocked: !verification.miniKvExecutionAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification: false,
  };
}

function javaOperatorEchoAccepted(reference: JavaV93OperatorWindowChecklistEchoReference): boolean {
  return [
    reference.evidencePresent,
    reference.receiptVersionDocumented,
    reference.sourceNodeV238ProfileDocumented,
    reference.nextNodeV239ProfileDocumented,
    reference.readyForNodeV239EvidenceVerification,
    reference.checklistCountsDocumented,
    reference.checklistFieldNamesEchoed,
    reference.approvalItemsEchoed,
    reference.pauseCodesEchoed,
    reference.credentialHandleOnly,
    javaOperatorBoundaryAccepted(reference),
  ].every(Boolean);
}

function javaOperatorBoundaryAccepted(
  reference: JavaV93OperatorWindowChecklistEchoReference,
): boolean {
  return [
    !reference.credentialValueReadByJava,
    !reference.schemaMigrationSqlExecutedByJava,
    !reference.approvalLedgerWrittenByJava,
    !reference.actualConnectionAttemptedByJava,
    reference.javaAutoStartForbidden,
  ].every(Boolean);
}

function createEvidenceFiles(): OperatorWindowEvidenceFile[] {
  return [
    evidenceFile("java-v93-runbook", JAVA_V93_RUNBOOK),
    evidenceFile("java-v93-walkthrough", JAVA_V93_WALKTHROUGH),
    evidenceFile("java-v93-builder", JAVA_V93_BUILDER),
    evidenceFile("java-v93-integration-test", JAVA_V93_INTEGRATION_TEST),
    evidenceFile("mini-kv-v102-receipt", MINI_KV_V102_RECEIPT),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-v102-walkthrough", MINI_KV_V102_WALKTHROUGH),
    evidenceFile("mini-kv-v102-test", MINI_KV_V102_TEST),
  ];
}

function createSnippetMatches(): OperatorWindowSnippetMatch[] {
  return [
    snippet("java-v93-receipt-version", JAVA_V93_WALKTHROUGH, "java-release-approval-rehearsal-managed-audit-sandbox-connection-operator-window-checklist-echo-receipt.v1"),
    snippet("java-v93-source-node-v238-profile", JAVA_V93_WALKTHROUGH, "managed-audit-manual-sandbox-connection-operator-window-checklist.v1"),
    snippet("java-v93-next-node-v239-profile", JAVA_V93_WALKTHROUGH, "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1"),
    snippet("java-v93-ready-v239-true", JAVA_V93_WALKTHROUGH, "readyForNodeV239ManualSandboxConnectionEvidenceVerification=true"),
    snippet("java-v93-required-approval-count", JAVA_V93_WALKTHROUGH, "requiredApprovalCount=3"),
    snippet("java-v93-checklist-step-count", JAVA_V93_WALKTHROUGH, "checklistStepCount=8"),
    snippet("java-v93-pause-count", JAVA_V93_WALKTHROUGH, "pauseConditionCount=8"),
    snippet("java-v93-forbidden-count", JAVA_V93_WALKTHROUGH, "forbiddenOperationCount=6"),
    snippet("java-v93-owner-field", JAVA_V93_WALKTHROUGH, "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"),
    snippet("java-v93-credential-field", JAVA_V93_WALKTHROUGH, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("java-v93-schema-field", JAVA_V93_WALKTHROUGH, "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"),
    snippet("java-v93-rollback-field", JAVA_V93_WALKTHROUGH, "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"),
    snippet("java-v93-abort-field", JAVA_V93_WALKTHROUGH, "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"),
    snippet("java-v93-release-owner", JAVA_V93_WALKTHROUGH, "release-owner"),
    snippet("java-v93-security-reviewer", JAVA_V93_WALKTHROUGH, "security-reviewer"),
    snippet("java-v93-operations-owner", JAVA_V93_WALKTHROUGH, "operations-owner"),
    snippet("java-v93-source-gate-pause", JAVA_V93_BUILDER, "SOURCE_GATE_NOT_READY"),
    snippet("java-v93-credential-pause", JAVA_V93_BUILDER, "CREDENTIAL_VALUE_REQUESTED"),
    snippet("java-v93-schema-pause", JAVA_V93_RUNBOOK, "SCHEMA_SQL_REQUESTED"),
    snippet("java-v93-credential-handle-only", JAVA_V93_WALKTHROUGH, "credentialHandleOnly=true"),
    snippet("java-v93-no-credential-read", JAVA_V93_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("java-v93-no-sql", JAVA_V93_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v93-no-ledger", JAVA_V93_WALKTHROUGH, "approvalLedgerWrittenByJava=false"),
    snippet("java-v93-no-connection", JAVA_V93_WALKTHROUGH, "不打开 managed audit sandbox connection"),
    snippet("java-v93-no-autostart", JAVA_V93_WALKTHROUGH, "不启动 Java / mini-kv / external audit service"),
    snippet("java-v93-builder-record-split", JAVA_V93_WALKTHROUGH, "ChecklistFieldBoundaryFields.nodeV238OperatorWindow()"),
    snippet("java-v93-envelope-record-split", JAVA_V93_WALKTHROUGH, "EnvelopeFieldBoundaryFields.nodeV236EnvelopeFields()"),
    snippet("java-v93-receipt-digest", JAVA_V93_BUILDER, "receiptDigest"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxOperatorWindowEvidenceVerificationChecks,
): OperatorWindowEvidenceVerificationMessage[] {
  const blockers: OperatorWindowEvidenceVerificationMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV238ChecklistReady, "NODE_V238_OPERATOR_WINDOW_CHECKLIST_NOT_READY", "node-v238-operator-window-checklist", "Node v238 operator window checklist must be ready before v239 verification.");
  addBlocker(blockers, checks.sourceNodeV238StillConnectionBlocked, "NODE_V238_UNLOCKED_CONNECTION", "node-v238-operator-window-checklist", "Node v238 source checklist must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.javaV93EvidencePresent, "JAVA_V93_EVIDENCE_MISSING", "java-v93-operator-window-echo", "Java v93 runbook, walkthrough, builder, and integration test must be present.");
  addBlocker(blockers, checks.javaV93EchoAccepted, "JAVA_V93_OPERATOR_WINDOW_ECHO_NOT_ACCEPTED", "java-v93-operator-window-echo", "Java v93 echo receipt must document Node v238 fields and Node v239 readiness without side effects.");
  addBlocker(blockers, checks.miniKvV102EvidencePresent, "MINIKV_V102_EVIDENCE_MISSING", "mini-kv-v102-no-start-no-write-receipt", "mini-kv v102 receipt, runtime smoke, walkthrough, and test must be present.");
  addBlocker(blockers, checks.miniKvV102NoStartNoWriteReceiptAccepted, "MINIKV_V102_NO_START_NO_WRITE_RECEIPT_NOT_ACCEPTED", "mini-kv-v102-no-start-no-write-receipt", "mini-kv v102 receipt must match Node v238 checklist and keep no-start/no-write boundaries.");
  addBlocker(blockers, checks.checklistCountsAlignedAcrossSources, "OPERATOR_WINDOW_COUNTS_NOT_ALIGNED", "managed-audit-manual-sandbox-connection-operator-window-evidence-verification", "Node v238, Java v93, and mini-kv v102 must agree on 3/8/8/6 checklist counts.");
  addBlocker(blockers, checks.operatorChecklistSourceAligned, "OPERATOR_WINDOW_SOURCE_NOT_ALIGNED", "managed-audit-manual-sandbox-connection-operator-window-evidence-verification", "Java v93 and mini-kv v102 must explicitly consume Node v238 operator window checklist.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-operator-window-evidence-verification", "v239 must not unlock production audit.");
  return blockers;
}

function miniKvBoundaryAccepted(reference: MiniKvV102OperatorWindowNoStartNoWriteReference): boolean {
  return [
    reference.readOnly,
    !reference.executionAllowed,
    !reference.restoreExecutionAllowed,
    !reference.orderAuthoritative,
    !reference.nodeAutoStartAllowed,
    !reference.javaAutoStartAllowed,
    !reference.miniKvAutoStartAllowed,
    !reference.connectionExecutionAllowed,
    !reference.writeCommandsExecuted,
    !reference.adminCommandsExecuted,
    !reference.runtimeWriteObserved,
    !reference.managedAuditStore,
    !reference.storageWriteAllowed,
    !reference.managedAuditWriteExecuted,
    !reference.sandboxManagedAuditStateWriteAllowed,
    !reference.credentialValueRequired,
    !reference.credentialValueReadAllowed,
    !reference.schemaRehearsalExecutionAllowed,
    !reference.schemaMigrationExecutionAllowed,
    !reference.loadRestoreCompactExecuted,
    !reference.setnxexExecutionAllowed,
    !reference.operatorWindowWriteAllowed,
  ].every(Boolean);
}

function addBlocker(
  messages: OperatorWindowEvidenceVerificationMessage[],
  condition: boolean,
  code: string,
  source: OperatorWindowEvidenceVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
