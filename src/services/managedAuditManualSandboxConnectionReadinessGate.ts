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
  loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
  type ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile,
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

interface JavaV92DryRunEnvelopeEchoReceiptReference {
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

interface MiniKvV101RuntimeNoStartNoWriteFollowUpReference {
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

interface ReadinessGateEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface ReadinessGateSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

type ManualSandboxConnectionReadinessGateChecks = {
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

interface ManualSandboxConnectionReadinessGateMessage {
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

type JsonObject = Record<string, unknown>;

const JAVA_V92_RUNBOOK = "D:/javaproj/advanced-order-platform/c/92/解释/说明.md";
const JAVA_V92_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/95-version-92-release-approval-sandbox-connection-dry-run-envelope-echo-receipt.md";
const JAVA_V92_BUILDER_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceiptBuilder.java";
const MINI_KV_V101_RUNBOOK = "D:/C/mini-kv/c/101/解释/说明.md";
const MINI_KV_V101_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/157-version-101-runtime-no-start-no-write-follow-up.md";
const MINI_KV_V101_FOLLOW_UP = "D:/C/mini-kv/fixtures/release/runtime-no-start-no-write-follow-up.json";
const ACCEPTED_MINI_KV_RUNTIME_NO_START_NO_WRITE_FOLLOW_UPS = Object.freeze([
  {
    projectVersion: "0.101.0",
    releaseVersion: "v101",
    consumerHint: "Node v237 manual sandbox connection readiness gate",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v239 manual sandbox connection operator window evidence verification",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v244 manual sandbox dry-run command upstream echo verification",
  },
]);

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionReadinessGateJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate",
  manualSandboxConnectionReadinessGateMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown",
  sourceNodeV236Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope",
  javaV92Runbook: JAVA_V92_RUNBOOK,
  javaV92Walkthrough: JAVA_V92_WALKTHROUGH,
  javaV92BuilderSource: JAVA_V92_BUILDER_SOURCE,
  miniKvV101Runbook: MINI_KV_V101_RUNBOOK,
  miniKvV101Walkthrough: MINI_KV_V101_WALKTHROUGH,
  miniKvV101FollowUp: MINI_KV_V101_FOLLOW_UP,
  activePlan: "docs/plans/v236-post-dry-run-envelope-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionReadinessGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionReadinessGateProfile {
  const sourceEnvelopeConfig: AppConfig = {
    ...input.config,
    upstreamActionsEnabled: false,
  };
  const sourceNodeV236Profile = loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
    config: sourceEnvelopeConfig,
  });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const miniKvFollowUp = readJsonFile(MINI_KV_V101_FOLLOW_UP);
  const sourceNodeV236 = createSourceNodeV236(sourceNodeV236Profile);
  const javaV92 = createJavaV92Reference(evidenceFiles, snippetMatches);
  const miniKvV101 = createMiniKvV101Reference(evidenceFiles, miniKvFollowUp);
  const readinessGate = createReadinessGate(sourceNodeV236, javaV92, miniKvV101);
  const checks = createChecks(input.config, sourceNodeV236, javaV92, miniKvV101, readinessGate);
  checks.readyForManagedAuditManualSandboxConnectionReadinessGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionReadinessGate")
    .every(([, value]) => value);
  const gateState = checks.readyForManagedAuditManualSandboxConnectionReadinessGate
    ? "manual-sandbox-connection-readiness-gate-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection readiness gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
    gateState,
    readyForManagedAuditManualSandboxConnectionReadinessGate:
      checks.readyForManagedAuditManualSandboxConnectionReadinessGate,
    readyForOperatorWindowChecklist: checks.readyForOperatorWindowChecklist,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyReview: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV236,
    upstreamReadinessEvidence: {
      javaV92,
      miniKvV101,
    },
    readinessGate,
    evidenceFiles,
    snippetMatches,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: evidenceFiles.length,
      matchedSnippetCount: snippetMatches.filter((entry) => entry.matched).length,
      javaEchoedFieldCount: javaV92.echoedEnvelopeFieldCount,
      miniKvHistoricalAnchorCount: miniKvV101.historicalReceiptAnchorCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v237 as readiness gate only; do not open the managed audit sandbox connection.",
      "Use Node v238 to create an operator window checklist before any real sandbox connection discussion.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until an explicit human window approval exists outside this readiness gate.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionReadinessGateMarkdown(
  profile: ManagedAuditManualSandboxConnectionReadinessGateProfile,
): string {
  return [
    "# Managed audit manual sandbox connection readiness gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Ready for readiness gate: ${profile.readyForManagedAuditManualSandboxConnectionReadinessGate}`,
    `- Ready for operator window checklist: ${profile.readyForOperatorWindowChecklist}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v236",
    "",
    ...renderEntries(profile.sourceNodeV236),
    "",
    "## Java v92 Echo Receipt",
    "",
    ...renderEntries(profile.upstreamReadinessEvidence.javaV92),
    "",
    "## mini-kv v101 No-start / No-write Follow-up",
    "",
    ...renderEntries(profile.upstreamReadinessEvidence.miniKvV101),
    "",
    "## Readiness Gate",
    "",
    ...renderEntries(profile.readinessGate),
    "",
    "## Evidence Files",
    "",
    ...profile.evidenceFiles.flatMap(renderEvidenceFile),
    "## Snippet Matches",
    "",
    ...profile.snippetMatches.flatMap(renderSnippet),
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
    ...renderMessages(profile.productionBlockers, "No readiness gate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No readiness gate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No readiness gate recommendations."),
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

function createSourceNodeV236(
  source: ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile,
): ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"] {
  return {
    sourceVersion: "Node v236",
    profileVersion: source.profileVersion,
    envelopeState: source.envelopeState,
    envelopeDigest: source.dryRunRequestEnvelope.envelopeDigest,
    readyForDryRunRequestEnvelope: source.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
    readyForOperatorReview: source.dryRunRequestEnvelope.readyForOperatorReview,
    operatorReviewFieldCount: source.dryRunRequestEnvelope.operatorReviewFieldCount,
    credentialHandleOnly: source.dryRunRequestEnvelope.credentialHandleOnly,
    credentialValueIncluded: source.dryRunRequestEnvelope.credentialValueIncluded,
    actualConnectionAttempted: source.dryRunRequestEnvelope.actualConnectionAttempted,
    readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
  };
}

function createJavaV92Reference(
  files: ReadinessGateEvidenceFile[],
  snippets: ReadinessGateSnippetMatch[],
): JavaV92DryRunEnvelopeEchoReceiptReference {
  const evidencePresent = fileById(files, "java-v92-runbook").exists
    && fileById(files, "java-v92-walkthrough").exists
    && fileById(files, "java-v92-builder-source").exists;
  const echoedEnvelopeFieldCount = [
    snippetMatched(snippets, "java-v92-owner-field"),
    snippetMatched(snippets, "java-v92-credential-handle-field"),
    snippetMatched(snippets, "java-v92-schema-rehearsal-field"),
    snippetMatched(snippets, "java-v92-rollback-path-field"),
    snippetMatched(snippets, "java-v92-timeout-budget-field"),
    snippetMatched(snippets, "java-v92-manual-abort-field"),
  ].filter(Boolean).length;
  const readyForNodeV237ManualSandboxConnectionReadinessGate =
    snippetMatched(snippets, "java-v92-ready-for-node-v237-true");
  const credentialValueIncludedInEnvelope = !snippetMatched(snippets, "java-v92-credential-value-included-false");
  const credentialValueReadByJava = !snippetMatched(snippets, "java-v92-credential-value-read-false");
  const actualConnectionAttemptedByJava = !snippetMatched(snippets, "java-v92-actual-connection-false");
  const schemaMigrationSqlExecutedByJava = !snippetMatched(snippets, "java-v92-schema-migration-false");
  const approvalLedgerWrittenByJava = !snippetMatched(snippets, "java-v92-approval-ledger-false");
  const managedAuditStoreWrittenByJava = !snippetMatched(snippets, "java-v92-managed-store-false");
  const readyForManagedAuditSandboxAdapterConnection =
    !snippetMatched(snippets, "java-v92-ready-for-adapter-false");

  return {
    sourceVersion: "Java v92",
    headTag: "v92订单平台release-approval-sandbox-connection-dry-run-envelope-echo-receipt",
    runbookPath: JAVA_V92_RUNBOOK,
    walkthroughPath: JAVA_V92_WALKTHROUGH,
    builderSourcePath: JAVA_V92_BUILDER_SOURCE,
    evidencePresent,
    consumedNodeV236DryRunRequestEnvelope: snippetMatched(snippets, "java-v92-consumes-node-v236"),
    consumedProfileMatched: snippetMatched(snippets, "java-v92-consumed-profile"),
    nextNodeReadinessGateVersionMatched: snippetMatched(snippets, "java-v92-next-node-v237"),
    echoedEnvelopeFieldCount,
    allEnvelopeFieldsEchoed: echoedEnvelopeFieldCount === 6,
    credentialHandleOnly: snippetMatched(snippets, "java-v92-credential-handle-only"),
    credentialValueIncludedInEnvelope,
    credentialValueReadByJava,
    actualConnectionAttemptedByJava,
    schemaMigrationSqlExecutedByJava,
    approvalLedgerWrittenByJava,
    managedAuditStoreWrittenByJava,
    readyForNodeV237ManualSandboxConnectionReadinessGate,
    readyForManagedAuditSandboxAdapterConnection,
    readyForNodeV237Gate: evidencePresent
      && readyForNodeV237ManualSandboxConnectionReadinessGate
      && echoedEnvelopeFieldCount === 6
      && !credentialValueIncludedInEnvelope
      && !credentialValueReadByJava
      && !actualConnectionAttemptedByJava
      && !schemaMigrationSqlExecutedByJava
      && !approvalLedgerWrittenByJava
      && !managedAuditStoreWrittenByJava
      && !readyForManagedAuditSandboxAdapterConnection,
  };
}

function createMiniKvV101Reference(
  files: ReadinessGateEvidenceFile[],
  followUp: JsonObject,
): MiniKvV101RuntimeNoStartNoWriteFollowUpReference {
  const sourceEnvelope = recordField(followUp, "source_envelope");
  const runtime = recordField(followUp, "runtime_no_start_no_write_follow_up");
  const historicalAnchors = arrayField(followUp, "historical_receipt_retention")
    .filter((entry): entry is JsonObject => typeof entry === "object" && entry !== null && !Array.isArray(entry));
  const evidencePresent = fileById(files, "mini-kv-v101-runbook").exists
    && fileById(files, "mini-kv-v101-walkthrough").exists
    && fileById(files, "mini-kv-v101-follow-up").exists;
  const followUpVersion = stringField(followUp, "follow_up_version") ?? "";
  const projectVersion = stringField(followUp, "project_version") ?? "";
  const releaseVersion = stringField(followUp, "release_version") ?? "";
  const consumerHint = stringField(followUp, "consumer_hint") ?? "";
  const sourceEnvelopeProducer = stringField(sourceEnvelope, "producer") ?? "";
  const operatorReviewFieldCount = numberField(sourceEnvelope, "operator_review_field_count") ?? 0;
  const credentialHandleOnly = booleanField(sourceEnvelope, "credential_handle_only") ?? false;
  const credentialValueIncluded = booleanField(sourceEnvelope, "credential_value_included") ?? true;
  const actualConnectionAttempted = booleanField(sourceEnvelope, "actual_connection_attempted") ?? true;
  const schemaMigrationRequested = booleanField(sourceEnvelope, "schema_migration_requested") ?? true;
  const managedAuditStateWriteRequested = booleanField(sourceEnvelope, "managed_audit_state_write_requested") ?? true;
  const upstreamServiceAutoStartRequested = booleanField(sourceEnvelope, "upstream_service_auto_start_requested") ?? true;
  const miniKvPermissionRequested = booleanField(sourceEnvelope, "mini_kv_permission_requested") ?? true;
  const readyForOperatorReview = booleanField(sourceEnvelope, "ready_for_operator_review") ?? false;
  const readyForManagedAuditSandboxAdapterConnection =
    booleanField(sourceEnvelope, "ready_for_managed_audit_sandbox_adapter_connection") ?? true;
  const historicalReceiptAnchorsStable = historicalAnchors.length >= 9
    && historicalAnchors.every((entry) => booleanField(entry, "must_remain_stable") === true
      && typeof stringField(entry, "historical_digest") === "string"
      && typeof stringField(entry, "consumed_release_version") === "string");

  const reference: MiniKvV101RuntimeNoStartNoWriteFollowUpReference = {
    sourceVersion: "mini-kv v101",
    headTag: "第一百零一版不自启不写入证据跟进",
    runbookPath: MINI_KV_V101_RUNBOOK,
    walkthroughPath: MINI_KV_V101_WALKTHROUGH,
    followUpPath: MINI_KV_V101_FOLLOW_UP,
    evidencePresent,
    followUpVersion,
    projectVersion,
    releaseVersion,
    consumerHint,
    sourceEnvelopeProducer,
    operatorReviewFieldCount,
    credentialHandleOnly,
    credentialValueIncluded,
    actualConnectionAttempted,
    schemaMigrationRequested,
    managedAuditStateWriteRequested,
    upstreamServiceAutoStartRequested,
    miniKvPermissionRequested,
    readyForOperatorReview,
    readyForManagedAuditSandboxAdapterConnection,
    readOnly: booleanField(runtime, "read_only") ?? false,
    executionAllowed: booleanField(runtime, "execution_allowed") ?? true,
    nodeAutoStartAllowed: booleanField(runtime, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(runtime, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(runtime, "mini_kv_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(runtime, "connection_execution_allowed") ?? true,
    writeCommandsExecuted: booleanField(runtime, "write_commands_executed") ?? true,
    adminCommandsExecuted: booleanField(runtime, "admin_commands_executed") ?? true,
    runtimeWriteObserved: booleanField(runtime, "runtime_write_observed") ?? true,
    managedAuditStore: booleanField(runtime, "managed_audit_store") ?? true,
    storageWriteAllowed: booleanField(runtime, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(runtime, "managed_audit_write_executed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(runtime, "sandbox_managed_audit_state_write_allowed") ?? true,
    credentialValueReadAllowed: booleanField(runtime, "credential_value_read_allowed") ?? true,
    schemaRehearsalExecutionAllowed: booleanField(runtime, "schema_rehearsal_execution_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(runtime, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(runtime, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(runtime, "load_restore_compact_executed") ?? true,
    orderAuthoritative: booleanField(runtime, "order_authoritative") ?? true,
    historicalReceiptAnchorCount: historicalAnchors.length,
    historicalReceiptAnchorsStable,
    readyForNodeV237Gate: false,
  };

  reference.readyForNodeV237Gate = evidencePresent
    && reference.followUpVersion === "mini-kv-runtime-no-start-no-write-follow-up.v1"
    && acceptedMiniKvRuntimeNoStartNoWriteFollowUp(reference)
    && reference.sourceEnvelopeProducer === "Node v236 manual sandbox connection dry-run request envelope"
    && reference.operatorReviewFieldCount === 6
    && reference.credentialHandleOnly
    && !reference.credentialValueIncluded
    && !reference.actualConnectionAttempted
    && !reference.schemaMigrationRequested
    && !reference.managedAuditStateWriteRequested
    && !reference.upstreamServiceAutoStartRequested
    && !reference.miniKvPermissionRequested
    && reference.readyForOperatorReview
    && !reference.readyForManagedAuditSandboxAdapterConnection
    && reference.readOnly
    && !reference.executionAllowed
    && !reference.nodeAutoStartAllowed
    && !reference.javaAutoStartAllowed
    && !reference.miniKvAutoStartAllowed
    && !reference.connectionExecutionAllowed
    && !reference.writeCommandsExecuted
    && !reference.adminCommandsExecuted
    && !reference.runtimeWriteObserved
    && !reference.managedAuditStore
    && !reference.storageWriteAllowed
    && !reference.managedAuditWriteExecuted
    && !reference.sandboxManagedAuditStateWriteAllowed
    && !reference.credentialValueReadAllowed
    && !reference.schemaRehearsalExecutionAllowed
    && !reference.schemaMigrationExecutionAllowed
    && !reference.restoreExecutionAllowed
    && !reference.loadRestoreCompactExecuted
    && !reference.orderAuthoritative
    && reference.historicalReceiptAnchorsStable;

  return reference;
}

function acceptedMiniKvRuntimeNoStartNoWriteFollowUp(
  reference: MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
): boolean {
  return ACCEPTED_MINI_KV_RUNTIME_NO_START_NO_WRITE_FOLLOW_UPS.some((accepted) =>
    reference.projectVersion === accepted.projectVersion
    && reference.releaseVersion === accepted.releaseVersion
    && reference.consumerHint === accepted.consumerHint
  );
}

function createReadinessGate(
  sourceNodeV236: ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"],
  javaV92: JavaV92DryRunEnvelopeEchoReceiptReference,
  miniKvV101: MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
): ManagedAuditManualSandboxConnectionReadinessGateProfile["readinessGate"] {
  const base = {
    markerSpan: "Node v236 + Java v92 + mini-kv v101" as const,
    gateMode: "manual-sandbox-connection-readiness-gate-only" as const,
    sourceEnvelopeAccepted: sourceNodeV236.readyForDryRunRequestEnvelope
      && sourceNodeV236.readyForOperatorReview
      && sourceNodeV236.operatorReviewFieldCount === 6,
    javaEchoReceiptAccepted: javaV92.readyForNodeV237Gate,
    miniKvNoStartNoWriteAccepted: miniKvV101.readyForNodeV237Gate,
    readyForOperatorWindowChecklist: sourceNodeV236.readyForDryRunRequestEnvelope
      && javaV92.readyForNodeV237Gate
      && miniKvV101.readyForNodeV237Gate,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    actualConnectionAttempted: false as const,
    credentialValueRead: false as const,
    schemaMigrationRequested: false as const,
    managedAuditStateWriteRequested: false as const,
    upstreamServiceAutoStartRequested: false as const,
    miniKvExecutionPermissionInferred: false as const,
    productionWindowOpened: false as const,
  };

  return {
    ...base,
    gateDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
      sourceEnvelopeDigest: sourceNodeV236.envelopeDigest,
      javaV92,
      miniKvV101,
      gateMode: base.gateMode,
      boundary: {
        readyForManagedAuditSandboxAdapterConnection: base.readyForManagedAuditSandboxAdapterConnection,
        actualConnectionAttempted: base.actualConnectionAttempted,
        credentialValueRead: base.credentialValueRead,
        schemaMigrationRequested: base.schemaMigrationRequested,
        managedAuditStateWriteRequested: base.managedAuditStateWriteRequested,
        upstreamServiceAutoStartRequested: base.upstreamServiceAutoStartRequested,
        miniKvExecutionPermissionInferred: base.miniKvExecutionPermissionInferred,
        productionWindowOpened: base.productionWindowOpened,
      },
    }),
  };
}

function createChecks(
  config: AppConfig,
  source: ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"],
  javaV92: JavaV92DryRunEnvelopeEchoReceiptReference,
  miniKvV101: MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
  gate: ManagedAuditManualSandboxConnectionReadinessGateProfile["readinessGate"],
): ManualSandboxConnectionReadinessGateChecks {
  return {
    sourceNodeV236DryRunEnvelopeReady:
      source.readyForDryRunRequestEnvelope
      && source.envelopeState === "manual-sandbox-connection-dry-run-request-envelope-ready",
    sourceEnvelopeDigestPresent: SHA256_HEX.test(source.envelopeDigest),
    sourceStillHandleOnlyAndNonExecuting:
      source.operatorReviewFieldCount === 6
      && source.credentialHandleOnly
      && !source.credentialValueIncluded
      && !source.actualConnectionAttempted
      && !source.readyForSandboxAdapterConnectionFromSource
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.schemaMigrationExecuted,
    javaV92EvidencePresent: javaV92.evidencePresent,
    javaV92EchoReceiptAccepted: javaV92.readyForNodeV237Gate,
    javaV92BoundaryAccepted: javaV92.allEnvelopeFieldsEchoed
      && javaV92.credentialHandleOnly
      && !javaV92.credentialValueIncludedInEnvelope
      && !javaV92.credentialValueReadByJava
      && !javaV92.actualConnectionAttemptedByJava
      && !javaV92.schemaMigrationSqlExecutedByJava
      && !javaV92.approvalLedgerWrittenByJava
      && !javaV92.managedAuditStoreWrittenByJava
      && !javaV92.readyForManagedAuditSandboxAdapterConnection,
    miniKvV101EvidencePresent: miniKvV101.evidencePresent,
    miniKvV101FollowUpAccepted: miniKvV101.readyForNodeV237Gate,
    miniKvV101BoundaryAccepted: miniKvV101.readOnly
      && !miniKvV101.executionAllowed
      && !miniKvV101.nodeAutoStartAllowed
      && !miniKvV101.javaAutoStartAllowed
      && !miniKvV101.miniKvAutoStartAllowed
      && !miniKvV101.connectionExecutionAllowed
      && !miniKvV101.writeCommandsExecuted
      && !miniKvV101.adminCommandsExecuted
      && !miniKvV101.runtimeWriteObserved
      && !miniKvV101.managedAuditStore
      && !miniKvV101.storageWriteAllowed
      && !miniKvV101.managedAuditWriteExecuted
      && !miniKvV101.sandboxManagedAuditStateWriteAllowed
      && !miniKvV101.credentialValueReadAllowed
      && !miniKvV101.schemaRehearsalExecutionAllowed
      && !miniKvV101.schemaMigrationExecutionAllowed
      && !miniKvV101.restoreExecutionAllowed
      && !miniKvV101.loadRestoreCompactExecuted
      && !miniKvV101.orderAuthoritative,
    readinessGateDigestPresent: SHA256_HEX.test(gate.gateDigest),
    readyForOperatorWindowChecklist: gate.readyForOperatorWindowChecklist,
    noCredentialValueRead: !gate.credentialValueRead,
    noConnectionAttempted: !gate.actualConnectionAttempted,
    noSchemaMigrationRequested: !gate.schemaMigrationRequested,
    noManagedAuditStateWriteRequested: !gate.managedAuditStateWriteRequested,
    noUpstreamServiceAutoStartRequested: !gate.upstreamServiceAutoStartRequested,
    noMiniKvExecutionPermissionInferred: !gate.miniKvExecutionPermissionInferred,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionReadinessGate: false,
  };
}

function createEvidenceFiles(): ReadinessGateEvidenceFile[] {
  return [
    evidenceFile("java-v92-runbook", JAVA_V92_RUNBOOK),
    evidenceFile("java-v92-walkthrough", JAVA_V92_WALKTHROUGH),
    evidenceFile("java-v92-builder-source", JAVA_V92_BUILDER_SOURCE),
    evidenceFile("mini-kv-v101-runbook", MINI_KV_V101_RUNBOOK),
    evidenceFile("mini-kv-v101-walkthrough", MINI_KV_V101_WALKTHROUGH),
    evidenceFile("mini-kv-v101-follow-up", MINI_KV_V101_FOLLOW_UP),
  ];
}

function createSnippetMatches(): ReadinessGateSnippetMatch[] {
  return [
    snippet("java-v92-consumes-node-v236", JAVA_V92_WALKTHROUGH, "Node v236 dry-run request envelope"),
    snippet("java-v92-consumed-profile", JAVA_V92_BUILDER_SOURCE, "NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_PROFILE"),
    snippet("java-v92-next-node-v237", JAVA_V92_BUILDER_SOURCE, "NODE_V237_MANUAL_SANDBOX_CONNECTION_READINESS_GATE_VERSION"),
    snippet("java-v92-owner-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"),
    snippet("java-v92-credential-handle-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("java-v92-schema-rehearsal-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"),
    snippet("java-v92-rollback-path-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"),
    snippet("java-v92-timeout-budget-field", JAVA_V92_BUILDER_SOURCE, "TIMEOUT_BUDGET_FIELD = \"timeoutBudgetMs\""),
    snippet("java-v92-manual-abort-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"),
    snippet("java-v92-ready-for-node-v237-true", JAVA_V92_WALKTHROUGH, "readyForNodeV237ManualSandboxConnectionReadinessGate=true"),
    snippet("java-v92-credential-handle-only", JAVA_V92_WALKTHROUGH, "credentialHandleOnly=true"),
    snippet("java-v92-credential-value-included-false", JAVA_V92_WALKTHROUGH, "credentialValueIncludedInEnvelope=false"),
    snippet("java-v92-credential-value-read-false", JAVA_V92_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("java-v92-actual-connection-false", JAVA_V92_WALKTHROUGH, "actualConnectionAttemptedByJava=false"),
    snippet("java-v92-schema-migration-false", JAVA_V92_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v92-approval-ledger-false", JAVA_V92_WALKTHROUGH, "approvalLedgerWrittenByJava=false"),
    snippet("java-v92-managed-store-false", JAVA_V92_BUILDER_SOURCE, "managedAuditStoreWrittenByJava"),
    snippet("java-v92-ready-for-adapter-false", JAVA_V92_WALKTHROUGH, "readyForManagedAuditSandboxAdapterConnection=false"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxConnectionReadinessGateChecks,
): ManualSandboxConnectionReadinessGateMessage[] {
  const blockers: ManualSandboxConnectionReadinessGateMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV236DryRunEnvelopeReady, "NODE_V236_DRY_RUN_ENVELOPE_NOT_READY", "node-v236-dry-run-request-envelope", "Node v236 dry-run request envelope must be ready before v237 readiness gate.");
  addBlocker(blockers, checks.sourceStillHandleOnlyAndNonExecuting, "NODE_V236_ENVELOPE_BOUNDARY_DRIFTED", "node-v236-dry-run-request-envelope", "Node v236 envelope must remain handle-only and non-executing.");
  addBlocker(blockers, checks.javaV92EchoReceiptAccepted, "JAVA_V92_ECHO_RECEIPT_NOT_ACCEPTED", "java-v92-dry-run-envelope-echo-receipt", "Java v92 must echo the Node v236 envelope fields and keep no credential/connection/SQL/ledger boundaries.");
  addBlocker(blockers, checks.miniKvV101FollowUpAccepted, "MINIKV_V101_NO_START_NO_WRITE_NOT_ACCEPTED", "mini-kv-v101-runtime-no-start-no-write-follow-up", "mini-kv v101 must prove no-start/no-write/no-credential/no-restore runtime boundaries.");
  addBlocker(blockers, checks.readyForOperatorWindowChecklist, "OPERATOR_WINDOW_CHECKLIST_NOT_READY", "managed-audit-manual-sandbox-connection-readiness-gate", "v237 may only advance to an operator window checklist after Node v236, Java v92, and mini-kv v101 are aligned.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

function collectWarnings(): ManualSandboxConnectionReadinessGateMessage[] {
  return [
    {
      code: "READINESS_GATE_IS_NOT_CONNECTION_APPROVAL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-readiness-gate",
      message: "The gate is ready for an operator window checklist only; it is not approval to open a managed audit sandbox connection.",
    },
    {
      code: "REAL_CONNECTION_REMAINS_PAUSED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-readiness-gate",
      message: "Real connection, credential value reads, schema migration, audit writes, and upstream auto-start remain blocked.",
    },
  ];
}

function collectRecommendations(): ManualSandboxConnectionReadinessGateMessage[] {
  return [
    {
      code: "NEXT_NODE_V238_OPERATOR_WINDOW_CHECKLIST",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-readiness-gate",
      message: "Use Node v238 to produce a manual operator window checklist before any connection execution discussion.",
    },
    {
      code: "KEEP_UPSTREAM_ACTIONS_DISABLED",
      severity: "recommendation",
      source: "runtime-config",
      message: "Keep UPSTREAM_ACTIONS_ENABLED=false until a separate human approval window exists.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): ReadinessGateEvidenceFile {
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

function snippet(id: string, filePath: string, expectedText: string): ReadinessGateSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function addBlocker(
  messages: ManualSandboxConnectionReadinessGateMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxConnectionReadinessGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}

function renderEvidenceFile(file: ReadinessGateEvidenceFile): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: ReadinessGateSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}

function fileById(files: ReadinessGateEvidenceFile[], id: string): ReadinessGateEvidenceFile {
  const file = files.find((entry) => entry.id === id);
  if (!file) {
    throw new Error(`Missing evidence file descriptor: ${id}`);
  }
  return file;
}

function snippetMatched(snippets: ReadinessGateSnippetMatch[], id: string): boolean {
  return snippets.find((entry) => entry.id === id)?.matched ?? false;
}

function readJsonFile(filePath: string): JsonObject {
  if (!existsSync(filePath)) {
    return {};
  }
  const value = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

function recordField(record: JsonObject, field: string): JsonObject {
  const value = record[field];
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

function arrayField(record: JsonObject, field: string): unknown[] {
  const value = record[field];
  return Array.isArray(value) ? value : [];
}

function stringField(record: JsonObject, field: string): string | null {
  const value = record[field];
  return typeof value === "string" ? value : null;
}

function booleanField(record: JsonObject, field: string): boolean | null {
  const value = record[field];
  return typeof value === "boolean" ? value : null;
}

function numberField(record: JsonObject, field: string): number | null {
  const value = record[field];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
