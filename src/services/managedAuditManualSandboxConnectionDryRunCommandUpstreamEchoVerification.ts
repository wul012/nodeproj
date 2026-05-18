import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport,
  type ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile,
} from "./managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  type ManagedAuditRouteRegistrationTableQualityPassProfile,
} from "./managedAuditRouteRegistrationTableQualityPass.js";

export interface ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1";
  verificationState: "manual-sandbox-dry-run-command-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification: boolean;
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
  sourceNodeV243: {
    sourceVersion: "Node v243";
    profileVersion: ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile["profileVersion"];
    reportState: ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile["reportState"];
    reportDigest: string;
    readyForVerificationReport: boolean;
    commandCount: number;
    disabledByDefault: true;
    dryRunOnly: true;
    carriesCredentialValue: false;
    actualConnectionAttempted: false;
    managedAuditStateWriteRequested: false;
    schemaMigrationRequested: false;
  };
  upstreamEcho: {
    javaV98: JavaV98EchoReference;
    miniKvV107: MiniKvV107NonParticipationReference;
  };
  echoVerification: {
    verificationDigest: string;
    verificationMode: "java-v98-plus-mini-kv-v107-upstream-echo-verification-only";
    sourceSpan: "Node v243 + Java v98 + mini-kv v107";
    commandCountAligned: boolean;
    disabledByDefaultAligned: boolean;
    dryRunOnlyAligned: boolean;
    credentialBoundaryAligned: boolean;
    connectionBoundaryAligned: boolean;
    writeBoundaryAligned: boolean;
    autoStartBoundaryAligned: boolean;
    routeRegistrationAccepted: boolean;
    nodeV244BlocksRealConnection: true;
  };
  checks: UpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: UpstreamEchoVerificationMessage[];
  warnings: UpstreamEchoVerificationMessage[];
  recommendations: UpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    upstreamEchoVerificationJson: string;
    upstreamEchoVerificationMarkdown: string;
    sourceNodeV243Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV98EchoReference {
  sourceVersion: "Java v98";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v22" | "missing";
  receiptField: "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt" | "missing";
  commandCount: number;
  readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification: boolean;
  credentialValueReadByJava: false;
  actualConnectionAttemptedByJava: false;
  schemaMigrationSqlExecutedByJava: false;
  approvalLedgerWrittenByJava: false;
  managedAuditStateWriteRequestedByJava: false;
  upstreamServiceAutoStartRequestedByJava: false;
  miniKvWritePermissionRequestedByJava: false;
  readyForNodeV244Alignment: boolean;
}

interface MiniKvV107NonParticipationReference {
  sourceVersion: "mini-kv v107";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourcePackageCommandCount: number;
  sourcePackageDisabledByDefault: boolean;
  sourcePackageDryRunOnly: boolean;
  sourcePackageCarriesCredentialValue: boolean;
  sourcePackageActualConnectionAttempted: boolean;
  sourcePackageManagedAuditStateWriteRequested: boolean;
  sourcePackageSchemaMigrationRequested: boolean;
  sourcePackageMiniKvWritePermissionRequested: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  credentialValueReadAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStore: boolean;
  orderAuthoritative: boolean;
  readyForNodeV244Alignment: boolean;
}

interface VerificationEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface VerificationSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

interface UpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification"
    | "node-v243-command-package-verification-report"
    | "java-v98-command-echo-receipt"
    | "mini-kv-v107-non-participation-receipt"
    | "runtime-config";
  message: string;
}

type UpstreamEchoVerificationChecks = {
  sourceNodeV243Ready: boolean;
  sourceNodeV243StillDisabledDryRun: boolean;
  javaV98EchoReady: boolean;
  miniKvV107NonParticipationReady: boolean;
  commandCountAligned: boolean;
  disabledByDefaultAligned: boolean;
  dryRunOnlyAligned: boolean;
  credentialBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  routeRegistrationAccepted: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification: boolean;
};

const FIXTURE_ROOT = "fixtures/historical/managed-audit-command-upstream-echo-verification";

const JAVA_V98_RUNBOOK = "D:/javaproj/advanced-order-platform/c/98/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V98_RUNBOOK_FALLBACK = `${FIXTURE_ROOT}/java-v98-runbook.md`;
const JAVA_V98_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/101-version-98-release-approval-sandbox-dry-run-command-package-echo-receipt.md";
const JAVA_V98_WALKTHROUGH_FALLBACK = `${FIXTURE_ROOT}/java-v98-walkthrough.md`;
const JAVA_V98_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceiptBuilder.java";
const JAVA_V98_BUILDER_FALLBACK = `${FIXTURE_ROOT}/java-v98-builder.java`;

const MINI_KV_V107_RECEIPT = "D:/C/mini-kv/fixtures/release/manual-sandbox-dry-run-command-non-participation-receipt.json";
const MINI_KV_V107_RECEIPT_FALLBACK = `${FIXTURE_ROOT}/mini-kv-v107-non-participation-receipt.json`;
const MINI_KV_V107_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/163-version-107-manual-sandbox-command-non-participation-receipt.md";
const MINI_KV_V107_WALKTHROUGH_FALLBACK = `${FIXTURE_ROOT}/mini-kv-v107-walkthrough.md`;

const ENDPOINTS = Object.freeze({
  upstreamEchoVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
  upstreamEchoVerificationMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification?format=markdown",
  sourceNodeV243Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
  activePlan: "docs/plans/v242-post-historical-evidence-fallback-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile {
  const sourceV243 = loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport({
    config: input.config,
  });
  const sourceRouteQuality = loadManagedAuditRouteRegistrationTableQualityPass({ config: input.config });
  const sourceNodeV243 = createSourceNodeV243(sourceV243);
  const javaV98 = createJavaV98EchoReference();
  const miniKvV107 = createMiniKvV107NonParticipationReference();
  const checks = createChecks(input.config, sourceNodeV243, javaV98, miniKvV107, sourceRouteQuality);
  checks.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification
    ? "manual-sandbox-dry-run-command-upstream-echo-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1",
    verificationState,
    nodeV243Digest: sourceNodeV243.reportDigest,
    javaV98Ready: javaV98.readyForNodeV244Alignment,
    miniKvV107ReceiptDigest: miniKvV107.receiptDigest,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection dry-run command upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
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
    sourceNodeV243,
    upstreamEcho: { javaV98, miniKvV107 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v98-plus-mini-kv-v107-upstream-echo-verification-only",
      sourceSpan: "Node v243 + Java v98 + mini-kv v107",
      commandCountAligned: checks.commandCountAligned,
      disabledByDefaultAligned: checks.disabledByDefaultAligned,
      dryRunOnlyAligned: checks.dryRunOnlyAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      routeRegistrationAccepted: checks.routeRegistrationAccepted,
      nodeV244BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV98.evidenceFiles.filter((file) => file.exists).length
        + miniKvV107.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV98.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV107.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this verification as the final read-only alignment before creating a sandbox connection precheck packet.",
      "Proceed to Node v245 only as a precheck packet; do not open the managed audit sandbox connection yet.",
      "Pause if any upstream echo changes command count, credential boundaries, write boundaries, or auto-start boundaries.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile,
): string {
  return [
    "# Managed audit manual sandbox connection dry-run command upstream echo verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for upstream echo verification: ${profile.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v243",
    "",
    ...renderEntries(profile.sourceNodeV243),
    "",
    "## Java v98 Echo",
    "",
    ...renderEntries(profile.upstreamEcho.javaV98),
    "",
    "## mini-kv v107 Non-Participation",
    "",
    ...renderEntries(profile.upstreamEcho.miniKvV107),
    "",
    "## Echo Verification",
    "",
    ...renderEntries(profile.echoVerification),
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
    ...renderMessages(profile.productionBlockers, "No upstream echo verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No upstream echo verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No upstream echo verification recommendations."),
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

function createSourceNodeV243(
  source: ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile,
): ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile["sourceNodeV243"] {
  return {
    sourceVersion: "Node v243",
    profileVersion: source.profileVersion,
    reportState: source.reportState,
    reportDigest: source.verification.verificationDigest,
    readyForVerificationReport: source.readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport,
    commandCount: source.sourceNodeV241.commandCount,
    disabledByDefault: source.sourceNodeV241.disabledByDefault,
    dryRunOnly: source.sourceNodeV241.dryRunOnly,
    carriesCredentialValue: source.sourceNodeV241.carriesCredentialValue,
    actualConnectionAttempted: source.sourceNodeV241.actualConnectionAttempted,
    managedAuditStateWriteRequested: source.sourceNodeV241.managedAuditStateWriteRequested,
    schemaMigrationRequested: source.sourceNodeV241.schemaMigrationRequested,
  };
}

function createJavaV98EchoReference(): JavaV98EchoReference {
  const runbookPath = firstExistingPath(JAVA_V98_RUNBOOK, JAVA_V98_RUNBOOK_FALLBACK);
  const walkthroughPath = firstExistingPath(JAVA_V98_WALKTHROUGH, JAVA_V98_WALKTHROUGH_FALLBACK);
  const builderPath = firstExistingPath(JAVA_V98_BUILDER, JAVA_V98_BUILDER_FALLBACK);
  const evidenceFiles = [
    evidenceFile("java-v98-runbook", runbookPath),
    evidenceFile("java-v98-walkthrough", walkthroughPath),
    evidenceFile("java-v98-builder", builderPath),
  ];
  const expectedSnippets = [
    snippet("java-v98-receipt-field", walkthroughPath, "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt"),
    snippet("java-v98-ready-for-node-v244", walkthroughPath, "readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification=true"),
    snippet("java-v98-command-count", walkthroughPath, "commandCount=6"),
    snippet("java-v98-timeout", walkthroughPath, "timeoutBudgetMs=15000"),
    snippet("java-v98-no-credential", walkthroughPath, "credentialValueReadByJava=false"),
    snippet("java-v98-no-sql", walkthroughPath, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v98-schema", walkthroughPath, "java-release-approval-rehearsal-response-schema.v22"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v98" as const,
    tagLabel: "v98订单平台release-approval-sandbox-dry-run-command-package-echo-receipt",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v98-schema")
      ? "java-release-approval-rehearsal-response-schema.v22" as const
      : "missing" as const,
    receiptField: snippetMatched(expectedSnippets, "java-v98-receipt-field")
      ? "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt" as const
      : "missing" as const,
    commandCount: snippetMatched(expectedSnippets, "java-v98-command-count") ? 6 : 0,
    readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification:
      snippetMatched(expectedSnippets, "java-v98-ready-for-node-v244"),
    credentialValueReadByJava: false as const,
    actualConnectionAttemptedByJava: false as const,
    schemaMigrationSqlExecutedByJava: false as const,
    approvalLedgerWrittenByJava: false as const,
    managedAuditStateWriteRequestedByJava: false as const,
    upstreamServiceAutoStartRequestedByJava: false as const,
    miniKvWritePermissionRequestedByJava: false as const,
    readyForNodeV244Alignment: false,
  };
  return {
    ...reference,
    readyForNodeV244Alignment: reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v22"
      && reference.receiptField === "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt"
      && reference.commandCount === 6
      && reference.readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification
      && !reference.credentialValueReadByJava
      && !reference.actualConnectionAttemptedByJava
      && !reference.schemaMigrationSqlExecutedByJava
      && !reference.approvalLedgerWrittenByJava
      && !reference.managedAuditStateWriteRequestedByJava
      && !reference.upstreamServiceAutoStartRequestedByJava
      && !reference.miniKvWritePermissionRequestedByJava,
  };
}

function createMiniKvV107NonParticipationReference(): MiniKvV107NonParticipationReference {
  const receiptPath = firstExistingPath(MINI_KV_V107_RECEIPT, MINI_KV_V107_RECEIPT_FALLBACK);
  const walkthroughPath = firstExistingPath(MINI_KV_V107_WALKTHROUGH, MINI_KV_V107_WALKTHROUGH_FALLBACK);
  const receipt = readJsonObject(receiptPath);
  const nestedReceipt = objectField(receipt, "manual_sandbox_dry_run_command_non_participation_receipt");
  const sourcePackage = objectField(receipt, "source_command_package");
  const evidenceFiles = [
    evidenceFile("mini-kv-v107-receipt", receiptPath),
    evidenceFile("mini-kv-v107-walkthrough", walkthroughPath),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v107-title", walkthroughPath, "manual_sandbox_dry_run_command_non_participation_receipt"),
    snippet("mini-kv-v107-node-v244", walkthroughPath, "Node v244"),
    snippet("mini-kv-v107-command-count", walkthroughPath, "source_package_command_count=6"),
    snippet("mini-kv-v107-disabled", walkthroughPath, "source_package_disabled_by_default=true"),
    snippet("mini-kv-v107-no-auto-start", walkthroughPath, "mini_kv_auto_start_allowed=false"),
    snippet("mini-kv-v107-no-storage-write", walkthroughPath, "storage_write_allowed=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "mini-kv v107" as const,
    tagLabel: "第一百零七版手动沙箱命令非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "release_version") ?? stringField(nestedReceipt, "current_release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(nestedReceipt, "consumer_hint") ?? "missing",
    receiptDigest: stringField(nestedReceipt, "receipt_digest") ?? "missing",
    sourcePackageCommandCount: numberField(sourcePackage, "command_count")
      ?? numberField(nestedReceipt, "source_package_command_count")
      ?? 0,
    sourcePackageDisabledByDefault: booleanField(sourcePackage, "disabled_by_default")
      ?? booleanField(nestedReceipt, "source_package_disabled_by_default")
      ?? false,
    sourcePackageDryRunOnly: booleanField(sourcePackage, "dry_run_only")
      ?? booleanField(nestedReceipt, "source_package_dry_run_only")
      ?? false,
    sourcePackageCarriesCredentialValue: booleanField(sourcePackage, "carries_credential_value")
      ?? booleanField(nestedReceipt, "source_package_carries_credential_value")
      ?? true,
    sourcePackageActualConnectionAttempted: booleanField(sourcePackage, "actual_connection_attempted")
      ?? booleanField(nestedReceipt, "source_package_actual_connection_attempted")
      ?? true,
    sourcePackageManagedAuditStateWriteRequested: booleanField(sourcePackage, "managed_audit_state_write_requested")
      ?? booleanField(nestedReceipt, "source_package_managed_audit_state_write_requested")
      ?? true,
    sourcePackageSchemaMigrationRequested: booleanField(sourcePackage, "schema_migration_requested")
      ?? booleanField(nestedReceipt, "source_package_schema_migration_requested")
      ?? true,
    sourcePackageMiniKvWritePermissionRequested: booleanField(sourcePackage, "mini_kv_write_permission_requested")
      ?? booleanField(nestedReceipt, "source_package_mini_kv_write_permission_requested")
      ?? true,
    readOnly: booleanField(receipt, "read_only") ?? booleanField(nestedReceipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? booleanField(nestedReceipt, "execution_allowed") ?? true,
    nodeAutoStartAllowed: booleanField(nestedReceipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(nestedReceipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(nestedReceipt, "mini_kv_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(nestedReceipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(nestedReceipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(nestedReceipt, "managed_audit_write_executed") ?? true,
    credentialValueReadAllowed: booleanField(nestedReceipt, "credential_value_read_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(nestedReceipt, "schema_migration_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(nestedReceipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(nestedReceipt, "setnxex_execution_allowed") ?? true,
    managedAuditStore: booleanField(nestedReceipt, "managed_audit_store") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? booleanField(nestedReceipt, "order_authoritative") ?? true,
    readyForNodeV244Alignment: false,
  };
  return {
    ...reference,
    readyForNodeV244Alignment: reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-manual-sandbox-dry-run-command-non-participation-receipt.v1"
      && reference.releaseVersion === "v107"
      && reference.consumerHint === "Node v244 manual sandbox dry-run command upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePackageCommandCount === 6
      && reference.sourcePackageDisabledByDefault
      && reference.sourcePackageDryRunOnly
      && !reference.sourcePackageCarriesCredentialValue
      && !reference.sourcePackageActualConnectionAttempted
      && !reference.sourcePackageManagedAuditStateWriteRequested
      && !reference.sourcePackageSchemaMigrationRequested
      && !reference.sourcePackageMiniKvWritePermissionRequested
      && reference.readOnly
      && !reference.executionAllowed
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.credentialValueReadAllowed
      && !reference.schemaMigrationExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStore
      && !reference.orderAuthoritative,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV243: ManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerificationProfile["sourceNodeV243"],
  javaV98: JavaV98EchoReference,
  miniKvV107: MiniKvV107NonParticipationReference,
  routeQuality: ManagedAuditRouteRegistrationTableQualityPassProfile,
): UpstreamEchoVerificationChecks {
  return {
    sourceNodeV243Ready: sourceNodeV243.readyForVerificationReport,
    sourceNodeV243StillDisabledDryRun:
      sourceNodeV243.disabledByDefault && sourceNodeV243.dryRunOnly && sourceNodeV243.commandCount === 6,
    javaV98EchoReady: javaV98.readyForNodeV244Alignment,
    miniKvV107NonParticipationReady: miniKvV107.readyForNodeV244Alignment,
    commandCountAligned:
      sourceNodeV243.commandCount === 6
      && javaV98.commandCount === 6
      && miniKvV107.sourcePackageCommandCount === 6,
    disabledByDefaultAligned: sourceNodeV243.disabledByDefault && miniKvV107.sourcePackageDisabledByDefault,
    dryRunOnlyAligned: sourceNodeV243.dryRunOnly && miniKvV107.sourcePackageDryRunOnly,
    credentialBoundaryAligned:
      !sourceNodeV243.carriesCredentialValue
      && !javaV98.credentialValueReadByJava
      && !miniKvV107.sourcePackageCarriesCredentialValue
      && !miniKvV107.credentialValueReadAllowed,
    connectionBoundaryAligned:
      !sourceNodeV243.actualConnectionAttempted
      && !javaV98.actualConnectionAttemptedByJava
      && !miniKvV107.sourcePackageActualConnectionAttempted
      && !miniKvV107.connectionExecutionAllowed,
    writeBoundaryAligned:
      !sourceNodeV243.managedAuditStateWriteRequested
      && !sourceNodeV243.schemaMigrationRequested
      && !javaV98.approvalLedgerWrittenByJava
      && !javaV98.schemaMigrationSqlExecutedByJava
      && !javaV98.managedAuditStateWriteRequestedByJava
      && !javaV98.miniKvWritePermissionRequestedByJava
      && !miniKvV107.sourcePackageManagedAuditStateWriteRequested
      && !miniKvV107.sourcePackageSchemaMigrationRequested
      && !miniKvV107.sourcePackageMiniKvWritePermissionRequested
      && !miniKvV107.storageWriteAllowed
      && !miniKvV107.managedAuditWriteExecuted,
    autoStartBoundaryAligned:
      !javaV98.upstreamServiceAutoStartRequestedByJava
      && !miniKvV107.nodeAutoStartAllowed
      && !miniKvV107.javaAutoStartAllowed
      && !miniKvV107.miniKvAutoStartAllowed,
    routeRegistrationAccepted: routeQuality.readyForManagedAuditRouteRegistrationTableQualityPass,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(checks: UpstreamEchoVerificationChecks): UpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: UpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV243Ready,
      code: "NODE_V243_VERIFICATION_REPORT_NOT_READY",
      source: "node-v243-command-package-verification-report",
      message: "Node v243 command package verification report must be ready before upstream echo verification.",
    },
    {
      condition: checks.javaV98EchoReady,
      code: "JAVA_V98_ECHO_RECEIPT_NOT_READY",
      source: "java-v98-command-echo-receipt",
      message: "Java v98 must provide a read-only command echo receipt for Node v244.",
    },
    {
      condition: checks.miniKvV107NonParticipationReady,
      code: "MINI_KV_V107_NON_PARTICIPATION_RECEIPT_NOT_READY",
      source: "mini-kv-v107-non-participation-receipt",
      message: "mini-kv v107 must prove no-start, no-write, no-credential, and non-storage backend boundaries.",
    },
    {
      condition: checks.commandCountAligned && checks.disabledByDefaultAligned && checks.dryRunOnlyAligned,
      code: "COMMAND_PACKAGE_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "Node, Java, and mini-kv must agree on the six-command disabled dry-run package shape.",
    },
    {
      condition: checks.credentialBoundaryAligned && checks.connectionBoundaryAligned && checks.writeBoundaryAligned,
      code: "UPSTREAM_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "The upstream echo verification must preserve credential, connection, and write boundaries.",
    },
    {
      condition: checks.autoStartBoundaryAligned,
      code: "AUTO_START_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "Node, Java, and mini-kv must all keep automatic upstream start disabled.",
    },
    {
      condition: checks.routeRegistrationAccepted,
      code: "ROUTE_REGISTRATION_QUALITY_PASS_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "The audit route registration table quality pass must remain ready after adding the v244 route.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during upstream echo verification.",
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

function collectWarnings(): UpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "This version verifies upstream echo receipts only; it does not open a managed audit sandbox connection.",
    },
  ];
}

function collectRecommendations(): UpstreamEchoVerificationMessage[] {
  return [
    {
      code: "CREATE_PRECHECK_PACKET_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "After this verification is ready, Node v245 can create a precheck packet without executing the connection.",
    },
    {
      code: "KEEP_UPSTREAM_EVIDENCE_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      message: "Do not treat Java v98 or mini-kv v107 receipts as permission to read credentials, write state, or start services.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): VerificationEvidenceFile {
  if (!existsSync(filePath)) {
    return { id, path: filePath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readFileSync(filePath);
  return {
    id,
    path: filePath,
    exists: true,
    sizeBytes: statSync(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): VerificationSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function firstExistingPath(primaryPath: string, fallbackPath: string): string {
  return existsSync(primaryPath) ? primaryPath : fallbackPath;
}

function readJsonObject(filePath: string): Record<string, unknown> {
  if (!existsSync(filePath)) {
    return {};
  }
  const parsed: unknown = JSON.parse(readFileSync(filePath, "utf8"));
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}
