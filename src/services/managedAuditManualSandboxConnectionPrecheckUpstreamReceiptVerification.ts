import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionPrecheckPacket,
  type ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
} from "./managedAuditManualSandboxConnectionPrecheckPacket.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  type ManagedAuditRouteRegistrationTableQualityPassProfile,
} from "./managedAuditRouteRegistrationTableQualityPass.js";

export interface ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile {
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
    javaV99: JavaV99PrecheckEchoReference;
    miniKvV108: MiniKvV108PrecheckNonParticipationReference;
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
  checks: PrecheckUpstreamReceiptVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: PrecheckUpstreamReceiptVerificationMessage[];
  warnings: PrecheckUpstreamReceiptVerificationMessage[];
  recommendations: PrecheckUpstreamReceiptVerificationMessage[];
  evidenceEndpoints: {
    precheckUpstreamReceiptVerificationJson: string;
    precheckUpstreamReceiptVerificationMarkdown: string;
    sourceNodeV245Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV99PrecheckEchoReference {
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

interface MiniKvV108PrecheckNonParticipationReference {
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

interface VerificationEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface VerificationSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

interface PrecheckUpstreamReceiptVerificationMessage {
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

type PrecheckUpstreamReceiptVerificationChecks = {
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

const JAVA_V99_RUNBOOK = "D:/javaproj/advanced-order-platform/c/99/解释/说明.md";
const JAVA_V99_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/102-version-99-release-approval-sandbox-precheck-packet-echo-receipt.md";
const JAVA_V99_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionPrecheckPacketEchoReceiptBuilder.java";

const MINI_KV_V108_RECEIPT = "D:/C/mini-kv/fixtures/release/manual-sandbox-connection-precheck-non-participation-receipt.json";
const MINI_KV_V108_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/164-version-108-manual-sandbox-precheck-non-participation-receipt.md";
const MINI_KV_V108_RUNBOOK = "D:/C/mini-kv/c/108/解释/说明.md";

const NODE_V245_OPERATOR_FIELDS = Object.freeze([
  "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
  "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
  "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
  "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
]);

const NODE_V245_PRECHECK_ITEMS = Object.freeze([
  "owner approval artifact",
  "credential handle review",
  "schema migration rehearsal id",
  "operator window",
  "rollback path",
  "manual abort marker",
  "timeout policy",
]);

const ENDPOINTS = Object.freeze({
  precheckUpstreamReceiptVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
  precheckUpstreamReceiptVerificationMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification?format=markdown",
  sourceNodeV245Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
  activePlan: "docs/plans/v245-post-sandbox-precheck-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile {
  const sourceV245 = loadManagedAuditManualSandboxConnectionPrecheckPacket({ config: input.config });
  const routeQuality = loadManagedAuditRouteRegistrationTableQualityPass({ config: input.config });
  const sourceNodeV245 = createSourceNodeV245(sourceV245);
  const javaV99 = createJavaV99PrecheckEchoReference();
  const miniKvV108 = createMiniKvV108PrecheckNonParticipationReference();
  const checks = createChecks(input.config, sourceNodeV245, javaV99, miniKvV108, routeQuality);
  checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification
    ? "manual-sandbox-precheck-upstream-receipt-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(javaV99, miniKvV108);
  const recommendations = collectRecommendations();
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1",
    verificationState,
    nodeV245PrecheckDigest: sourceNodeV245.precheckDigest,
    javaV99Ready: javaV99.readyForNodeV247Alignment,
    miniKvV108ReceiptDigest: miniKvV108.receiptDigest,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection precheck upstream receipt verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification:
      checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
    readOnlyUpstreamReceiptVerification: true,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV245,
    upstreamReceipts: { javaV99, miniKvV108 },
    receiptVerification: {
      verificationDigest,
      verificationMode: "java-v99-plus-mini-kv-v108-precheck-upstream-receipt-verification-only",
      sourceSpan: "Node v245 + Java v99 + mini-kv v108",
      precheckItemCountAligned: checks.precheckItemCountAligned,
      operatorFieldCountAligned: checks.operatorFieldCountAligned,
      operatorFieldNamesAligned: checks.operatorFieldNamesAligned,
      timeoutPolicyAligned: checks.timeoutPolicyAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      consumerHintShiftAccepted: checks.consumerHintAcceptedForCurrentPlan,
      routeRegistrationAccepted: checks.routeRegistrationAccepted,
      nodeV247BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV99.evidenceFiles.filter((file) => file.exists).length
        + miniKvV108.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV99.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV108.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to Node v248 only as a manual sandbox connection rehearsal guard.",
      "Keep Java and mini-kv as read-only evidence providers until a real credential review and manual window are explicitly approved.",
      "Pause if Java, mini-kv, or Node changes the seven precheck items, six operator fields, timeout policy, or no-write/no-start boundaries.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
): string {
  return [
    "# Managed audit manual sandbox connection precheck upstream receipt verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for upstream receipt verification: ${profile.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v245",
    "",
    ...renderEntries(profile.sourceNodeV245),
    "",
    "## Java v99 Precheck Echo",
    "",
    ...renderEntries(profile.upstreamReceipts.javaV99),
    "",
    "## mini-kv v108 Non-Participation",
    "",
    ...renderEntries(profile.upstreamReceipts.miniKvV108),
    "",
    "## Receipt Verification",
    "",
    ...renderEntries(profile.receiptVerification),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No precheck upstream receipt verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No precheck upstream receipt verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No precheck upstream receipt verification recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createSourceNodeV245(
  source: ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
): ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile["sourceNodeV245"] {
  return {
    sourceVersion: "Node v245",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    precheckDigest: source.precheckPacket.precheckDigest,
    readyForPrecheckPacket: source.readyForManagedAuditManualSandboxConnectionPrecheckPacket,
    precheckItemCount: source.summary.precheckItemCount,
    requiredOperatorFieldCount: source.summary.requiredOperatorFieldCount,
    timeoutBudgetMs: source.precheckPacket.timeoutPolicy.timeoutBudgetMs,
    readOnlyPrecheckPacket: source.readOnlyPrecheckPacket,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    actualConnectionAttempted: source.precheckPacket.boundary.actualConnectionAttempted,
    managedAuditStateWriteRequested: source.precheckPacket.boundary.managedAuditStateWriteRequested,
    approvalLedgerWriteRequested: source.precheckPacket.boundary.approvalLedgerWriteRequested,
    javaSqlExecutionRequested: source.precheckPacket.boundary.javaSqlExecutionRequested,
    miniKvWritePermissionRequested: source.precheckPacket.boundary.miniKvWritePermissionRequested,
  };
}

function createJavaV99PrecheckEchoReference(): JavaV99PrecheckEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v99-runbook", JAVA_V99_RUNBOOK),
    evidenceFile("java-v99-walkthrough", JAVA_V99_WALKTHROUGH),
    evidenceFile("java-v99-builder", JAVA_V99_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v99-receipt-field", JAVA_V99_WALKTHROUGH, "managedAuditSandboxConnectionPrecheckPacketEchoReceipt"),
    snippet("java-v99-ready-for-node-v246", JAVA_V99_WALKTHROUGH, "readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification=true"),
    snippet("java-v99-schema", JAVA_V99_WALKTHROUGH, "java-release-approval-rehearsal-response-schema.v23"),
    snippet("java-v99-item-count", JAVA_V99_WALKTHROUGH, "precheckItemCount=7"),
    snippet("java-v99-timeout", JAVA_V99_WALKTHROUGH, "timeoutBudgetMs=15000"),
    snippet("java-v99-no-credential-echo", JAVA_V99_WALKTHROUGH, "credentialValueEchoed=false"),
    snippet("java-v99-no-credential-read", JAVA_V99_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("java-v99-no-connection", JAVA_V99_WALKTHROUGH, "actualConnectionAttemptedByJava=false"),
    snippet("java-v99-no-sql", JAVA_V99_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v99-no-ledger", JAVA_V99_WALKTHROUGH, "approvalLedgerWrittenByJava=false"),
    snippet("java-v99-no-mini-kv-write", JAVA_V99_WALKTHROUGH, "miniKvWritePermissionRequestedByJava=false"),
    snippet("java-v99-builder-review-field", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE_REVIEW"),
    snippet("java-v99-builder-rehearsal-field", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_SCHEMA_MIGRATION_REHEARSAL_ID"),
    snippet("java-v99-builder-operator-window", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_OPERATOR_WINDOW"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v99" as const,
    tagLabel: "v99订单平台release-approval-sandbox-precheck-packet-echo-receipt",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v99-schema")
      ? "java-release-approval-rehearsal-response-schema.v23" as const
      : "missing" as const,
    receiptField: snippetMatched(expectedSnippets, "java-v99-receipt-field")
      ? "managedAuditSandboxConnectionPrecheckPacketEchoReceipt" as const
      : "missing" as const,
    precheckItemCount: snippetMatched(expectedSnippets, "java-v99-item-count") ? 7 : 0,
    timeoutBudgetMs: snippetMatched(expectedSnippets, "java-v99-timeout") ? 15000 : 0,
    readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification:
      snippetMatched(expectedSnippets, "java-v99-ready-for-node-v246"),
    fieldEchoComplete: [
      "java-v99-builder-review-field",
      "java-v99-builder-rehearsal-field",
      "java-v99-builder-operator-window",
    ].every((id) => snippetMatched(expectedSnippets, id)),
    javaUsesReviewSpecificFieldNames: true,
    credentialValueEchoed: false as const,
    credentialValueReadByJava: false as const,
    actualConnectionAttemptedByJava: false as const,
    externalManagedAuditConnectionOpenedByJava: false as const,
    schemaMigrationSqlExecutedByJava: false as const,
    approvalLedgerWrittenByJava: false as const,
    managedAuditStateWriteRequestedByJava: false as const,
    upstreamServiceAutoStartRequestedByJava: false as const,
    miniKvWritePermissionRequestedByJava: false as const,
    readyForNodeV247Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV247Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v23"
      && reference.receiptField === "managedAuditSandboxConnectionPrecheckPacketEchoReceipt"
      && reference.precheckItemCount === 7
      && reference.timeoutBudgetMs === 15000
      && reference.readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification
      && reference.fieldEchoComplete
      && !reference.credentialValueEchoed
      && !reference.credentialValueReadByJava
      && !reference.actualConnectionAttemptedByJava
      && !reference.externalManagedAuditConnectionOpenedByJava
      && !reference.schemaMigrationSqlExecutedByJava
      && !reference.approvalLedgerWrittenByJava
      && !reference.managedAuditStateWriteRequestedByJava
      && !reference.upstreamServiceAutoStartRequestedByJava
      && !reference.miniKvWritePermissionRequestedByJava,
  };
}

function createMiniKvV108PrecheckNonParticipationReference(): MiniKvV108PrecheckNonParticipationReference {
  const receiptPath = MINI_KV_V108_RECEIPT;
  const receipt = readJsonObject(receiptPath);
  const sourcePacket = objectField(receipt, "source_precheck_packet");
  const nestedReceipt = objectField(receipt, "manual_sandbox_connection_precheck_non_participation_receipt");
  const operatorReviewFields = stringArrayField(sourcePacket, "operator_review_fields")
    ?? stringArrayField(nestedReceipt, "operator_review_fields")
    ?? [];
  const precheckItems = stringArrayField(sourcePacket, "precheck_items")
    ?? stringArrayField(nestedReceipt, "precheck_items")
    ?? [];
  const evidenceFiles = [
    evidenceFile("mini-kv-v108-receipt", receiptPath),
    evidenceFile("mini-kv-v108-walkthrough", MINI_KV_V108_WALKTHROUGH),
    evidenceFile("mini-kv-v108-runbook", MINI_KV_V108_RUNBOOK),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v108-title", MINI_KV_V108_WALKTHROUGH, "manual_sandbox_connection_precheck_non_participation_receipt"),
    snippet("mini-kv-v108-consumer-hint", MINI_KV_V108_WALKTHROUGH, "Node v246"),
    snippet("mini-kv-v108-item-count", MINI_KV_V108_WALKTHROUGH, "source_precheck_item_count=7"),
    snippet("mini-kv-v108-field-count", MINI_KV_V108_WALKTHROUGH, "source_required_operator_field_count=6"),
    snippet("mini-kv-v108-timeout", MINI_KV_V108_WALKTHROUGH, "source_timeout_budget_ms=15000"),
    snippet("mini-kv-v108-no-auto-start", MINI_KV_V108_WALKTHROUGH, "mini_kv_auto_start_allowed=false"),
    snippet("mini-kv-v108-no-storage-write", MINI_KV_V108_WALKTHROUGH, "storage_write_allowed=false"),
    snippet("mini-kv-v108-no-credential-read", MINI_KV_V108_WALKTHROUGH, "credential_value_read_allowed=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const consumerHint = stringField(receipt, "consumer_hint")
    ?? stringField(nestedReceipt, "consumer_hint")
    ?? "missing";
  const reference = {
    sourceVersion: "mini-kv v108" as const,
    tagLabel: "第一百零八版手动沙箱预检非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? stringField(nestedReceipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "release_version") ?? stringField(nestedReceipt, "current_release_version") ?? "missing",
    consumerHint,
    consumerHintAcceptedForCurrentPlan:
      consumerHint === "Node v246 manual sandbox connection precheck upstream receipt verification"
      || consumerHint === "Node v247 manual sandbox connection precheck upstream receipt verification",
    receiptDigest: stringField(nestedReceipt, "receipt_digest") ?? "missing",
    sourcePrecheckProfileVersion:
      stringField(sourcePacket, "profile_version") ?? stringField(nestedReceipt, "source_precheck_profile_version") ?? "missing",
    sourcePrecheckState:
      stringField(sourcePacket, "precheck_state") ?? stringField(nestedReceipt, "source_precheck_state") ?? "missing",
    sourcePrecheckItemCount:
      numberField(sourcePacket, "precheck_item_count") ?? numberField(nestedReceipt, "source_precheck_item_count") ?? 0,
    sourceRequiredOperatorFieldCount:
      numberField(sourcePacket, "required_operator_field_count")
      ?? numberField(nestedReceipt, "source_required_operator_field_count")
      ?? 0,
    sourceTimeoutBudgetMs:
      numberField(sourcePacket, "timeout_budget_ms") ?? numberField(nestedReceipt, "source_timeout_budget_ms") ?? 0,
    sourceReadyForPrecheckPacket:
      booleanField(sourcePacket, "ready_for_precheck_packet")
      ?? booleanField(nestedReceipt, "source_ready_for_precheck_packet")
      ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(sourcePacket, "ready_for_managed_audit_sandbox_adapter_connection")
      ?? booleanField(nestedReceipt, "source_ready_for_managed_audit_sandbox_adapter_connection")
      ?? true,
    sourceReadOnlyPrecheckPacket:
      booleanField(sourcePacket, "read_only_precheck_packet")
      ?? booleanField(nestedReceipt, "source_read_only_precheck_packet")
      ?? false,
    sourceExecutionAllowed:
      booleanField(sourcePacket, "execution_allowed") ?? booleanField(nestedReceipt, "source_execution_allowed") ?? true,
    sourceConnectsManagedAudit:
      booleanField(sourcePacket, "connects_managed_audit")
      ?? booleanField(nestedReceipt, "source_connects_managed_audit")
      ?? true,
    sourceReadsManagedAuditCredential:
      booleanField(sourcePacket, "reads_managed_audit_credential")
      ?? booleanField(nestedReceipt, "source_reads_managed_audit_credential")
      ?? true,
    sourceSchemaMigrationExecuted:
      booleanField(sourcePacket, "schema_migration_executed")
      ?? booleanField(nestedReceipt, "source_schema_migration_executed")
      ?? true,
    sourceAutomaticUpstreamStart:
      booleanField(sourcePacket, "automatic_upstream_start")
      ?? booleanField(nestedReceipt, "source_automatic_upstream_start")
      ?? true,
    operatorReviewFields,
    operatorFieldsMatchNodeV245: arraysEqual(operatorReviewFields, NODE_V245_OPERATOR_FIELDS),
    precheckItems,
    precheckItemsMatchNodeV245: arraysEqual(precheckItems, NODE_V245_PRECHECK_ITEMS),
    readOnly: booleanField(receipt, "read_only") ?? booleanField(nestedReceipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? booleanField(nestedReceipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(nestedReceipt, "dry_run_only") ?? false,
    nodeAutoStartAllowed: booleanField(nestedReceipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(nestedReceipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(nestedReceipt, "mini_kv_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(nestedReceipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(nestedReceipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(nestedReceipt, "managed_audit_write_executed") ?? true,
    credentialValueReadAllowed: booleanField(nestedReceipt, "credential_value_read_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(nestedReceipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed:
      booleanField(receipt, "restore_execution_allowed") ?? booleanField(nestedReceipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(nestedReceipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(nestedReceipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(nestedReceipt, "managed_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? booleanField(nestedReceipt, "order_authoritative") ?? true,
    readyForNodeV247Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV247Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-manual-sandbox-connection-precheck-non-participation-receipt.v1"
      && reference.releaseVersion === "v108"
      && reference.consumerHintAcceptedForCurrentPlan
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePrecheckProfileVersion === "managed-audit-manual-sandbox-connection-precheck-packet.v1"
      && reference.sourcePrecheckState === "manual-sandbox-connection-precheck-packet-ready"
      && reference.sourcePrecheckItemCount === 7
      && reference.sourceRequiredOperatorFieldCount === 6
      && reference.sourceTimeoutBudgetMs === 15000
      && reference.sourceReadyForPrecheckPacket
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceReadOnlyPrecheckPacket
      && !reference.sourceExecutionAllowed
      && !reference.sourceConnectsManagedAudit
      && !reference.sourceReadsManagedAuditCredential
      && !reference.sourceSchemaMigrationExecuted
      && !reference.sourceAutomaticUpstreamStart
      && reference.operatorFieldsMatchNodeV245
      && reference.precheckItemsMatchNodeV245
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.credentialValueReadAllowed
      && !reference.schemaMigrationExecutionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStorageBackend
      && !reference.orderAuthoritative,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV245: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile["sourceNodeV245"],
  javaV99: JavaV99PrecheckEchoReference,
  miniKvV108: MiniKvV108PrecheckNonParticipationReference,
  routeQuality: ManagedAuditRouteRegistrationTableQualityPassProfile,
): PrecheckUpstreamReceiptVerificationChecks {
  return {
    sourceNodeV245Ready: sourceNodeV245.readyForPrecheckPacket,
    sourceNodeV245StillReadOnly:
      sourceNodeV245.readOnlyPrecheckPacket
      && !sourceNodeV245.executionAllowed
      && !sourceNodeV245.connectsManagedAudit
      && !sourceNodeV245.readsManagedAuditCredential
      && !sourceNodeV245.schemaMigrationExecuted
      && !sourceNodeV245.automaticUpstreamStart,
    javaV99EchoReady: javaV99.readyForNodeV247Alignment,
    miniKvV108NonParticipationReady: miniKvV108.readyForNodeV247Alignment,
    consumerHintAcceptedForCurrentPlan: miniKvV108.consumerHintAcceptedForCurrentPlan,
    precheckItemCountAligned:
      sourceNodeV245.precheckItemCount === 7
      && javaV99.precheckItemCount === 7
      && miniKvV108.sourcePrecheckItemCount === 7
      && miniKvV108.precheckItemsMatchNodeV245,
    operatorFieldCountAligned:
      sourceNodeV245.requiredOperatorFieldCount === 6
      && miniKvV108.sourceRequiredOperatorFieldCount === 6
      && miniKvV108.operatorReviewFields.length === 6,
    operatorFieldNamesAligned: javaV99.fieldEchoComplete && miniKvV108.operatorFieldsMatchNodeV245,
    timeoutPolicyAligned:
      sourceNodeV245.timeoutBudgetMs === 15000
      && javaV99.timeoutBudgetMs === 15000
      && miniKvV108.sourceTimeoutBudgetMs === 15000,
    credentialBoundaryAligned:
      !sourceNodeV245.readsManagedAuditCredential
      && !javaV99.credentialValueEchoed
      && !javaV99.credentialValueReadByJava
      && !miniKvV108.sourceReadsManagedAuditCredential
      && !miniKvV108.credentialValueReadAllowed,
    connectionBoundaryAligned:
      !sourceNodeV245.connectsManagedAudit
      && !sourceNodeV245.actualConnectionAttempted
      && !javaV99.actualConnectionAttemptedByJava
      && !javaV99.externalManagedAuditConnectionOpenedByJava
      && !miniKvV108.sourceConnectsManagedAudit
      && !miniKvV108.connectionExecutionAllowed,
    writeBoundaryAligned:
      !sourceNodeV245.managedAuditStateWriteRequested
      && !sourceNodeV245.approvalLedgerWriteRequested
      && !sourceNodeV245.javaSqlExecutionRequested
      && !sourceNodeV245.miniKvWritePermissionRequested
      && !javaV99.schemaMigrationSqlExecutedByJava
      && !javaV99.approvalLedgerWrittenByJava
      && !javaV99.managedAuditStateWriteRequestedByJava
      && !javaV99.miniKvWritePermissionRequestedByJava
      && !miniKvV108.storageWriteAllowed
      && !miniKvV108.managedAuditWriteExecuted
      && !miniKvV108.managedAuditStorageBackend,
    autoStartBoundaryAligned:
      !sourceNodeV245.automaticUpstreamStart
      && !javaV99.upstreamServiceAutoStartRequestedByJava
      && !miniKvV108.sourceAutomaticUpstreamStart
      && !miniKvV108.nodeAutoStartAllowed
      && !miniKvV108.javaAutoStartAllowed
      && !miniKvV108.miniKvAutoStartAllowed,
    routeRegistrationAccepted: routeQuality.readyForManagedAuditRouteRegistrationTableQualityPass,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification: false,
  };
}

function collectProductionBlockers(
  checks: PrecheckUpstreamReceiptVerificationChecks,
): PrecheckUpstreamReceiptVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: PrecheckUpstreamReceiptVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV245Ready && checks.sourceNodeV245StillReadOnly,
      code: "NODE_V245_PRECHECK_PACKET_NOT_READY",
      source: "node-v245-precheck-packet",
      message: "Node v245 precheck packet must be ready and still read-only before upstream receipt verification.",
    },
    {
      condition: checks.javaV99EchoReady,
      code: "JAVA_V99_PRECHECK_ECHO_RECEIPT_NOT_READY",
      source: "java-v99-precheck-echo-receipt",
      message: "Java v99 must provide the read-only precheck packet echo receipt.",
    },
    {
      condition: checks.miniKvV108NonParticipationReady,
      code: "MINI_KV_V108_NON_PARTICIPATION_RECEIPT_NOT_READY",
      source: "mini-kv-v108-precheck-non-participation-receipt",
      message: "mini-kv v108 must prove no-start, no-write, no-credential, and non-storage backend boundaries.",
    },
    {
      condition: checks.consumerHintAcceptedForCurrentPlan,
      code: "CONSUMER_HINT_NOT_ACCEPTED",
      source: "mini-kv-v108-precheck-non-participation-receipt",
      message: "The mini-kv consumer hint must name the planned precheck upstream receipt verification step.",
    },
    {
      condition: checks.precheckItemCountAligned
        && checks.operatorFieldCountAligned
        && checks.operatorFieldNamesAligned
        && checks.timeoutPolicyAligned,
      code: "PRECHECK_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "Node, Java, and mini-kv must align on seven precheck items, six operator fields, and the timeout policy.",
    },
    {
      condition: checks.credentialBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "PRECHECK_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "The upstream receipts must keep credential, connection, write, and auto-start boundaries closed.",
    },
    {
      condition: checks.routeRegistrationAccepted,
      code: "ROUTE_REGISTRATION_QUALITY_PASS_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "The audit route registration table quality pass must remain ready after adding the v247 route.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during precheck upstream receipt verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(
  javaV99: JavaV99PrecheckEchoReference,
  miniKvV108: MiniKvV108PrecheckNonParticipationReference,
): PrecheckUpstreamReceiptVerificationMessage[] {
  const warnings: PrecheckUpstreamReceiptVerificationMessage[] = [
    {
      code: "VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "This version verifies upstream receipts only; it does not open a managed audit sandbox connection.",
    },
  ];
  if (javaV99.javaUsesReviewSpecificFieldNames) {
    warnings.push({
      code: "JAVA_REVIEW_FIELD_NAMES_ARE_SEMANTIC_ECHO",
      severity: "warning",
      source: "java-v99-precheck-echo-receipt",
      message: "Java v99 uses review/rehearsal field names in its echo receipt; Node accepts this as semantic evidence while mini-kv preserves the exact Node v245 operator fields.",
    });
  }
  if (miniKvV108.consumerHint === "Node v246 manual sandbox connection precheck upstream receipt verification") {
    warnings.push({
      code: "CONSUMER_HINT_SHIFTED_AFTER_CI_REPAIR",
      severity: "warning",
      source: "mini-kv-v108-precheck-non-participation-receipt",
      message: "mini-kv v108 names Node v246 as the consumer because v246 was planned before the CI fallback repair; Node v247 accepts this as the same precheck verification slot.",
    });
  }
  return warnings;
}

function collectRecommendations(): PrecheckUpstreamReceiptVerificationMessage[] {
  return [
    {
      code: "CREATE_REHEARSAL_GUARD_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "After this verification is ready, Node v248 can create a rehearsal guard without connecting to managed audit.",
    },
    {
      code: "KEEP_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "Do not treat Java v99 or mini-kv v108 receipts as authorization to read credential values, start services, or write state.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): VerificationEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  if (!historicalEvidenceExists(filePath)) {
    return { id, path: filePath, resolvedPath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readHistoricalEvidenceFile(filePath);
  return {
    id,
    path: filePath,
    resolvedPath,
    exists: true,
    sizeBytes: statHistoricalEvidence(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): VerificationSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  const content = historicalEvidenceExists(filePath) ? readHistoricalEvidenceFile(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function readJsonObject(filePath: string): Record<string, unknown> {
  if (!historicalEvidenceExists(filePath)) {
    return {};
  }
  const parsed: unknown = JSON.parse(readHistoricalEvidenceFile(filePath, "utf8"));
  return isRecord(parsed) ? parsed : {};
}

function objectField(input: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = input[key];
  return isRecord(value) ? value : {};
}

function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

function booleanField(input: Record<string, unknown>, key: string): boolean | null {
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

function stringArrayField(input: Record<string, unknown>, key: string): readonly string[] | null {
  const value = input[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
