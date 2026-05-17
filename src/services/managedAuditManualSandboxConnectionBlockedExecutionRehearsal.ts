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
  loadManagedAuditManualSandboxConnectionRehearsalPacketReview,
  type ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
} from "./managedAuditManualSandboxConnectionRehearsalPacketReview.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1";
  rehearsalState: "manual-sandbox-connection-blocked-execution-rehearsal-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: boolean;
  readOnlyReview: true;
  sourceNodeV233: {
    sourceVersion: "Node v233";
    profileVersion: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile["profileVersion"];
    reviewState: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile["reviewState"];
    reviewDigest: string;
    readyForRehearsalPacketReview: boolean;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    managedAuditWritesStillBlocked: boolean;
    upstreamOptimizationEvidenceAccepted: boolean;
    productionBlockerCount: number;
  };
  upstreamOptimizationEvidence: {
    javaV90: JavaV90ContextNormalizationReference;
    miniKvV99: MiniKvV99WalRegressionReference;
  };
  evidenceFiles: BlockedExecutionEvidenceFile[];
  snippetMatches: BlockedExecutionSnippetMatch[];
  blockedExecutionRehearsal: {
    rehearsalDigest: string;
    sourceRehearsalPacketReviewDigest: string;
    markerSpan: "Node v233 + Java v90 + mini-kv v99";
    rehearsalMode: "manual-sandbox-connection-blocked-execution-rehearsal-only";
    simulatedAttemptCount: number;
    blockedAttemptCount: number;
    actualExecutionAttemptCount: number;
    connectionExecutionAllowed: false;
    credentialValueReadAllowed: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    upstreamServiceAutoStartAllowed: false;
    miniKvWriteOrRestoreAllowed: false;
    javaLedgerOrSqlAllowed: false;
    nodeV234BlocksDangerousOperations: boolean;
  };
  simulatedBlockedAttempts: BlockedExecutionAttempt[];
  checks: ManualSandboxBlockedExecutionRehearsalChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    simulatedAttemptCount: number;
    blockedAttemptCount: number;
    actualExecutionAttemptCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxBlockedExecutionRehearsalMessage[];
  warnings: ManualSandboxBlockedExecutionRehearsalMessage[];
  recommendations: ManualSandboxBlockedExecutionRehearsalMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionBlockedExecutionRehearsalJson: string;
    manualSandboxConnectionBlockedExecutionRehearsalMarkdown: string;
    sourceNodeV233Json: string;
    nodeV233Source: string;
    javaV90Runbook: string;
    javaV90Walkthrough: string;
    javaV90ContextHeaderFieldSource: string;
    miniKvV99Runbook: string;
    miniKvV99Walkthrough: string;
    miniKvRuntimeSmokeEvidence: string;
    miniKvVerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV90ContextNormalizationReference {
  sourceVersion: "Java v90";
  headTag: "v90订单平台release-approval-context-normalization-helper";
  runbookPath: string;
  walkthroughPath: string;
  sourcePath: string;
  evidencePresent: boolean;
  normalizeValuePresent: boolean;
  normalizedFactoryPresent: boolean;
  missingWarningCentralized: boolean;
  allEchoedRetained: boolean;
  contractPreservingRefactorDocumented: boolean;
  noLombokIntroduced: boolean;
  approvalLedgerWrittenByJava: boolean;
  schemaSqlExecutedByJava: boolean;
  credentialValueReadByJava: boolean;
  managedAuditConnectionOpenedByJava: boolean;
  readyForNodeV234BlockedExecutionRehearsal: boolean;
}

interface MiniKvV99WalRegressionReference {
  sourceVersion: "mini-kv v99";
  headTag: "第九十九版execute-with-wal回归补强";
  runbookPath: string;
  walkthroughPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  writeWalHelper: string;
  writeWalHelperScope: string[];
  writeWalHelperBehaviorPreserved: boolean;
  regressionCoverageDocumented: boolean;
  usageErrorsNoWal: boolean;
  missingExpiredNoOpNoWal: boolean;
  appendBeforeMutationPreserved: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  noRuntimeWriteCommandAdded: boolean;
  runtimeWriteObserved: boolean;
  writeCommandsExecuted: boolean;
  readyForNodeV234BlockedExecutionRehearsal: boolean;
}

interface BlockedExecutionAttempt {
  id:
    | "managed-audit-connect"
    | "credential-value-read"
    | "schema-migration"
    | "managed-audit-state-write"
    | "upstream-service-auto-start"
    | "mini-kv-write-or-restore"
    | "java-ledger-or-sql"
    | "production-window-open";
  surface: "node" | "java" | "mini-kv" | "production-window";
  requestedOperation: string;
  simulatedOnly: true;
  actualExecutionAttempted: false;
  blocked: true;
  blockedBy: string;
  executionAllowed: false;
  evidenceSource: string;
}

interface BlockedExecutionEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface BlockedExecutionSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

type ManualSandboxBlockedExecutionRehearsalChecks = {
  sourceNodeV233ReviewReady: boolean;
  sourceNodeV233DigestPresent: boolean;
  sourceNodeV233StillConnectionBlocked: boolean;
  sourceNodeV233StillWriteBlocked: boolean;
  javaV90EvidencePresent: boolean;
  javaV90ContextNormalizationAccepted: boolean;
  javaV90BoundaryAccepted: boolean;
  miniKvV99EvidencePresent: boolean;
  miniKvV99WalRegressionAccepted: boolean;
  miniKvV99RuntimeBoundaryAccepted: boolean;
  allDangerousOperationsSimulatedOnly: boolean;
  allDangerousOperationsBlocked: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  upstreamServiceAutoStartStillBlocked: boolean;
  miniKvWriteOrRestoreStillBlocked: boolean;
  javaLedgerOrSqlStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: boolean;
};

interface ManualSandboxBlockedExecutionRehearsalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal"
    | "node-v233-rehearsal-packet-review"
    | "java-v90-context-normalization"
    | "mini-kv-v99-wal-regression"
    | "runtime-config";
  message: string;
}

interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  consumer_hint?: unknown;
  read_only?: unknown;
  execution_allowed?: unknown;
  restore_execution_allowed?: unknown;
  order_authoritative?: unknown;
  write_commands_executed?: unknown;
  runtime_write_observed?: unknown;
}

interface MiniKvVerificationManifest extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  consumer_hint?: unknown;
  read_only?: unknown;
  execution_allowed?: unknown;
  no_runtime_write_command_added?: unknown;
  version_manifest?: Record<string, unknown>;
  boundaries?: unknown;
}

const NODE_V233_SOURCE =
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts";
const JAVA_V90_RUNBOOK = "D:/javaproj/advanced-order-platform/c/90/解释/说明.md";
const JAVA_V90_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/93-version-90-release-approval-context-normalization-helper.md";
const JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ContextHeaderField.java";
const MINI_KV_V99_RUNBOOK = "D:/C/mini-kv/c/99/解释/说明.md";
const MINI_KV_V99_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/155-version-99-wal-helper-regression-evidence.md";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionBlockedExecutionRehearsalJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
  manualSandboxConnectionBlockedExecutionRehearsalMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown",
  sourceNodeV233Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review",
  nodeV233Source: NODE_V233_SOURCE,
  javaV90Runbook: JAVA_V90_RUNBOOK,
  javaV90Walkthrough: JAVA_V90_WALKTHROUGH,
  javaV90ContextHeaderFieldSource: JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE,
  miniKvV99Runbook: MINI_KV_V99_RUNBOOK,
  miniKvV99Walkthrough: MINI_KV_V99_WALKTHROUGH,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v231-post-preflight-verification-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile {
  const sourceReview = loadManagedAuditManualSandboxConnectionRehearsalPacketReview({ config: input.config });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const runtimeSmoke = readMiniKvRuntimeSmokeEvidence();
  const manifest = readMiniKvVerificationManifest();
  const javaV90 = createJavaV90Reference(evidenceFiles, snippetMatches);
  const miniKvV99 = createMiniKvV99Reference(evidenceFiles, snippetMatches, runtimeSmoke, manifest);
  const simulatedBlockedAttempts = createBlockedExecutionAttempts();
  const blockedExecutionRehearsal = createBlockedExecutionRehearsal(
    sourceReview,
    javaV90,
    miniKvV99,
    simulatedBlockedAttempts,
  );
  const checks = createChecks(
    input.config,
    sourceReview,
    javaV90,
    miniKvV99,
    blockedExecutionRehearsal,
    simulatedBlockedAttempts,
  );
  checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal")
    .every(([, value]) => value);
  const rehearsalState = checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal
    ? "manual-sandbox-connection-blocked-execution-rehearsal-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection blocked execution rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
    rehearsalState,
    readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal:
      checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
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
    sourceNodeV233: {
      sourceVersion: "Node v233",
      profileVersion: sourceReview.profileVersion,
      reviewState: sourceReview.reviewState,
      reviewDigest: sourceReview.rehearsalPacketReview.reviewDigest,
      readyForRehearsalPacketReview: sourceReview.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview,
      readyForSandboxAdapterConnectionFromSource: sourceReview.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourceReview.connectsManagedAudit,
      readsManagedAuditCredential: sourceReview.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceReview.schemaMigrationExecuted,
      managedAuditWritesStillBlocked: sourceReview.rehearsalPacketReview.managedAuditWriteAllowed === false,
      upstreamOptimizationEvidenceAccepted:
        sourceReview.rehearsalPacketReview.upstreamOptimizationEvidenceAccepted,
      productionBlockerCount: sourceReview.summary.productionBlockerCount,
    },
    upstreamOptimizationEvidence: {
      javaV90,
      miniKvV99,
    },
    evidenceFiles,
    snippetMatches,
    blockedExecutionRehearsal,
    simulatedBlockedAttempts,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: evidenceFiles.length,
      matchedSnippetCount: snippetMatches.filter((snippetMatch) => snippetMatch.matched).length,
      simulatedAttemptCount: simulatedBlockedAttempts.length,
      blockedAttemptCount: simulatedBlockedAttempts.filter((attempt) => attempt.blocked).length,
      actualExecutionAttemptCount: simulatedBlockedAttempts.filter((attempt) => attempt.actualExecutionAttempted).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v234 as blocked execution rehearsal evidence; do not open the managed audit sandbox connection.",
      "Start the next plan from post-v234 rather than appending overlapping versions into the v231 plan.",
      "Only move toward a real sandbox connection after a human-approved manual window and credential-handle review plan exist.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown(
  profile: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
): string {
  return [
    "# Managed audit manual sandbox connection blocked execution rehearsal",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Rehearsal state: ${profile.rehearsalState}`,
    `- Ready for blocked execution rehearsal: ${profile.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v233",
    "",
    ...renderEntries(profile.sourceNodeV233),
    "",
    "## Java v90 Context Normalization Evidence",
    "",
    ...renderEntries(profile.upstreamOptimizationEvidence.javaV90),
    "",
    "## mini-kv v99 WAL Regression Evidence",
    "",
    ...renderEntries(profile.upstreamOptimizationEvidence.miniKvV99),
    "",
    "## Blocked Execution Rehearsal",
    "",
    ...renderEntries(profile.blockedExecutionRehearsal),
    "",
    "## Simulated Blocked Attempts",
    "",
    ...profile.simulatedBlockedAttempts.flatMap(renderAttempt),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox blocked execution rehearsal blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox blocked execution rehearsal warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox blocked execution rehearsal recommendations."),
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

function createJavaV90Reference(
  evidenceFiles: BlockedExecutionEvidenceFile[],
  snippets: BlockedExecutionSnippetMatch[],
): JavaV90ContextNormalizationReference {
  const reference: JavaV90ContextNormalizationReference = {
    sourceVersion: "Java v90",
    headTag: "v90订单平台release-approval-context-normalization-helper",
    runbookPath: JAVA_V90_RUNBOOK,
    walkthroughPath: JAVA_V90_WALKTHROUGH,
    sourcePath: JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE,
    evidencePresent: fileById(evidenceFiles, "java-v90-runbook").exists
      && fileById(evidenceFiles, "java-v90-walkthrough").exists
      && fileById(evidenceFiles, "java-v90-context-header-field-source").exists,
    normalizeValuePresent: snippetMatched(snippets, "java-v90-normalize-value"),
    normalizedFactoryPresent: snippetMatched(snippets, "java-v90-normalized-factory"),
    missingWarningCentralized: snippetMatched(snippets, "java-v90-add-missing-warning")
      && snippetMatched(snippets, "java-v90-warning-helper-documentation"),
    allEchoedRetained: snippetMatched(snippets, "java-v90-all-echoed"),
    contractPreservingRefactorDocumented: snippetMatched(snippets, "java-v90-contract-preserving"),
    noLombokIntroduced: !snippetMatched(snippets, "java-v90-lombok-import")
      && snippetMatched(snippets, "java-v90-no-lombok-plan"),
    approvalLedgerWrittenByJava: !snippetMatched(snippets, "java-v90-no-ledger"),
    schemaSqlExecutedByJava: !snippetMatched(snippets, "java-v90-no-sql"),
    credentialValueReadByJava: !snippetMatched(snippets, "java-v90-no-credential"),
    managedAuditConnectionOpenedByJava: !snippetMatched(snippets, "java-v90-no-connection"),
    readyForNodeV234BlockedExecutionRehearsal: false,
  };

  return {
    ...reference,
    readyForNodeV234BlockedExecutionRehearsal: reference.evidencePresent
      && reference.normalizeValuePresent
      && reference.normalizedFactoryPresent
      && reference.missingWarningCentralized
      && reference.allEchoedRetained
      && reference.contractPreservingRefactorDocumented
      && reference.noLombokIntroduced
      && !reference.approvalLedgerWrittenByJava
      && !reference.schemaSqlExecutedByJava
      && !reference.credentialValueReadByJava
      && !reference.managedAuditConnectionOpenedByJava,
  };
}

function createMiniKvV99Reference(
  evidenceFiles: BlockedExecutionEvidenceFile[],
  snippets: BlockedExecutionSnippetMatch[],
  runtimeSmoke: MiniKvRuntimeSmokeEvidence,
  manifest: MiniKvVerificationManifest,
): MiniKvV99WalRegressionReference {
  const versionManifest = recordField(manifest, "version_manifest");
  const readOnlySmoke = recordField(recordField(manifest, "commands"), "read_only_smoke");
  const scope = stringArrayField(versionManifest, "write_wal_helper_scope");
  const reference: MiniKvV99WalRegressionReference = {
    sourceVersion: "mini-kv v99",
    headTag: "第九十九版execute-with-wal回归补强",
    runbookPath: MINI_KV_V99_RUNBOOK,
    walkthroughPath: MINI_KV_V99_WALKTHROUGH,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v99-runbook").exists
      && fileById(evidenceFiles, "mini-kv-v99-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-verification-manifest").exists,
    projectVersion: stringField(manifest, "project_version") ?? stringField(runtimeSmoke, "project_version") ?? "missing",
    releaseVersion: stringField(manifest, "release_version") ?? stringField(runtimeSmoke, "release_version") ?? "missing",
    consumerHint: stringField(manifest, "consumer_hint") ?? stringField(runtimeSmoke, "consumer_hint") ?? "missing",
    writeWalHelper: stringField(versionManifest, "write_wal_helper") ?? "missing",
    writeWalHelperScope: scope,
    writeWalHelperBehaviorPreserved: booleanField(versionManifest, "write_wal_helper_behavior_preserved") ?? false,
    regressionCoverageDocumented: snippetMatched(snippets, "mini-kv-v99-regression-coverage"),
    usageErrorsNoWal: snippetMatched(snippets, "mini-kv-v99-usage-error-no-wal"),
    missingExpiredNoOpNoWal: snippetMatched(snippets, "mini-kv-v99-no-op-no-wal"),
    appendBeforeMutationPreserved: snippetMatched(snippets, "mini-kv-v99-append-before-mutation"),
    readOnly: booleanField(manifest, "read_only") ?? booleanField(runtimeSmoke, "read_only") ?? false,
    executionAllowed: booleanField(manifest, "execution_allowed") ?? booleanField(runtimeSmoke, "execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(runtimeSmoke, "restore_execution_allowed") ?? true,
    orderAuthoritative: booleanField(runtimeSmoke, "order_authoritative") ?? true,
    noRuntimeWriteCommandAdded: booleanField(manifest, "no_runtime_write_command_added") ?? false,
    runtimeWriteObserved: booleanField(readOnlySmoke, "runtime_write_observed")
      ?? booleanField(runtimeSmoke, "runtime_write_observed")
      ?? true,
    writeCommandsExecuted: booleanField(readOnlySmoke, "write_commands_executed")
      ?? booleanField(runtimeSmoke, "write_commands_executed")
      ?? true,
    readyForNodeV234BlockedExecutionRehearsal: false,
  };

  return {
    ...reference,
    readyForNodeV234BlockedExecutionRehearsal: reference.evidencePresent
      && /^0\.(?:99|100)\.0$/.test(reference.projectVersion)
      && ["v99", "v100"].includes(reference.releaseVersion)
      && [
        "Node v234 manual sandbox connection blocked execution rehearsal",
        "Node v235 manual sandbox connection precondition intake",
      ].includes(reference.consumerHint)
      && reference.writeWalHelper === "CommandProcessor::execute_with_wal"
      && ["SET", "SETNXEX", "DEL", "EXPIRE"].every((command) => reference.writeWalHelperScope.includes(command))
      && reference.writeWalHelperBehaviorPreserved
      && reference.regressionCoverageDocumented
      && reference.usageErrorsNoWal
      && reference.missingExpiredNoOpNoWal
      && reference.appendBeforeMutationPreserved
      && reference.noRuntimeWriteCommandAdded
      && reference.readOnly
      && !reference.executionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.orderAuthoritative
      && !reference.runtimeWriteObserved
      && !reference.writeCommandsExecuted,
  };
}

function createBlockedExecutionAttempts(): BlockedExecutionAttempt[] {
  return [
    attempt(
      "managed-audit-connect",
      "node",
      "open managed audit sandbox adapter connection",
      "readyForManagedAuditSandboxAdapterConnection=false and connectsManagedAudit=false",
      "Node v233 rehearsal packet review",
    ),
    attempt(
      "credential-value-read",
      "node",
      "read ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE value",
      "readsManagedAuditCredential=false and credential handle remains a name only",
      "Node v233 + Java v90 boundary evidence",
    ),
    attempt(
      "schema-migration",
      "node",
      "execute managed audit schema rehearsal or migration",
      "schemaMigrationExecuted=false and schemaMigrationExecutionAllowed=false",
      "Node v233 + mini-kv v99 runtime boundary",
    ),
    attempt(
      "managed-audit-state-write",
      "node",
      "write managed audit state or local adapter records",
      "managedAuditWriteAllowed=false and storesManagedAuditCredential=false",
      "Node v233 rehearsal packet review",
    ),
    attempt(
      "upstream-service-auto-start",
      "node",
      "auto-start Java, mini-kv, or managed audit adapter service",
      "automaticUpstreamStart=false and no-start guard remains closed",
      "mini-kv v99 no-start guard receipt",
    ),
    attempt(
      "mini-kv-write-or-restore",
      "mini-kv",
      "execute SETNXEX, LOAD, COMPACT, RESTORE, or WAL-changing smoke command",
      "mini-kv v99 read_only=true, execution_allowed=false, restore_execution_allowed=false",
      "mini-kv v99 runtime smoke evidence",
    ),
    attempt(
      "java-ledger-or-sql",
      "java",
      "write Java approval ledger or execute SQL from rehearsal",
      "Java v90 says no approval ledger write and no SQL execution",
      "Java v90 ContextHeaderField normalization evidence",
    ),
    attempt(
      "production-window-open",
      "production-window",
      "open production audit or production operation window",
      "readyForProductionAudit=false and readyForProductionWindow=false",
      "Node v234 blocked execution rehearsal",
    ),
  ];
}

function createBlockedExecutionRehearsal(
  sourceReview: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
  javaV90: JavaV90ContextNormalizationReference,
  miniKvV99: MiniKvV99WalRegressionReference,
  attempts: BlockedExecutionAttempt[],
): ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["blockedExecutionRehearsal"] {
  const blockedAttemptCount = attempts.filter((attemptEntry) => attemptEntry.blocked).length;
  const actualExecutionAttemptCount = attempts.filter((attemptEntry) => attemptEntry.actualExecutionAttempted).length;

  return {
    rehearsalDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1",
      sourceRehearsalPacketReviewDigest: sourceReview.rehearsalPacketReview.reviewDigest,
      javaV90,
      miniKvV99,
      attempts,
    }),
    sourceRehearsalPacketReviewDigest: sourceReview.rehearsalPacketReview.reviewDigest,
    markerSpan: "Node v233 + Java v90 + mini-kv v99",
    rehearsalMode: "manual-sandbox-connection-blocked-execution-rehearsal-only",
    simulatedAttemptCount: attempts.length,
    blockedAttemptCount,
    actualExecutionAttemptCount,
    connectionExecutionAllowed: false,
    credentialValueReadAllowed: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    upstreamServiceAutoStartAllowed: false,
    miniKvWriteOrRestoreAllowed: false,
    javaLedgerOrSqlAllowed: false,
    nodeV234BlocksDangerousOperations: blockedAttemptCount === attempts.length && actualExecutionAttemptCount === 0,
  };
}

function createChecks(
  config: AppConfig,
  sourceReview: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
  javaV90: JavaV90ContextNormalizationReference,
  miniKvV99: MiniKvV99WalRegressionReference,
  rehearsal: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["blockedExecutionRehearsal"],
  attempts: BlockedExecutionAttempt[],
): ManualSandboxBlockedExecutionRehearsalChecks {
  return {
    sourceNodeV233ReviewReady:
      sourceReview.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview
      && sourceReview.reviewState === "manual-sandbox-connection-rehearsal-packet-review-ready",
    sourceNodeV233DigestPresent: SHA256_HEX.test(sourceReview.rehearsalPacketReview.reviewDigest),
    sourceNodeV233StillConnectionBlocked: !sourceReview.readyForManagedAuditSandboxAdapterConnection
      && !sourceReview.connectsManagedAudit
      && !sourceReview.readsManagedAuditCredential
      && !sourceReview.schemaMigrationExecuted,
    sourceNodeV233StillWriteBlocked: !sourceReview.rehearsalPacketReview.managedAuditWriteAllowed,
    javaV90EvidencePresent: javaV90.evidencePresent,
    javaV90ContextNormalizationAccepted: javaV90.readyForNodeV234BlockedExecutionRehearsal,
    javaV90BoundaryAccepted: !javaV90.approvalLedgerWrittenByJava
      && !javaV90.schemaSqlExecutedByJava
      && !javaV90.credentialValueReadByJava
      && !javaV90.managedAuditConnectionOpenedByJava,
    miniKvV99EvidencePresent: miniKvV99.evidencePresent,
    miniKvV99WalRegressionAccepted: miniKvV99.readyForNodeV234BlockedExecutionRehearsal,
    miniKvV99RuntimeBoundaryAccepted: miniKvV99.readOnly
      && !miniKvV99.executionAllowed
      && !miniKvV99.restoreExecutionAllowed
      && !miniKvV99.orderAuthoritative
      && !miniKvV99.runtimeWriteObserved
      && !miniKvV99.writeCommandsExecuted,
    allDangerousOperationsSimulatedOnly: attempts.every((attemptEntry) => attemptEntry.simulatedOnly
      && !attemptEntry.actualExecutionAttempted),
    allDangerousOperationsBlocked: attempts.every((attemptEntry) => attemptEntry.blocked
      && !attemptEntry.executionAllowed) && rehearsal.nodeV234BlocksDangerousOperations,
    credentialValueStillForbidden: !rehearsal.credentialValueReadAllowed,
    schemaMigrationStillBlocked: !rehearsal.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !rehearsal.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !rehearsal.managedAuditWriteAllowed,
    upstreamServiceAutoStartStillBlocked: !rehearsal.upstreamServiceAutoStartAllowed,
    miniKvWriteOrRestoreStillBlocked: !rehearsal.miniKvWriteOrRestoreAllowed,
    javaLedgerOrSqlStillBlocked: !rehearsal.javaLedgerOrSqlAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal: false,
  };
}

function createEvidenceFiles(): BlockedExecutionEvidenceFile[] {
  return [
    evidenceFile("node-v233-source", NODE_V233_SOURCE),
    evidenceFile("java-v90-runbook", JAVA_V90_RUNBOOK),
    evidenceFile("java-v90-walkthrough", JAVA_V90_WALKTHROUGH),
    evidenceFile("java-v90-context-header-field-source", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE),
    evidenceFile("mini-kv-v99-runbook", MINI_KV_V99_RUNBOOK),
    evidenceFile("mini-kv-v99-walkthrough", MINI_KV_V99_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): BlockedExecutionSnippetMatch[] {
  return [
    snippet("node-v233-blocked-review", NODE_V233_SOURCE, "nodeV233BlocksRealConnection: true"),
    snippet("node-v233-managed-write-false", NODE_V233_SOURCE, "managedAuditWriteAllowed: false"),
    snippet("java-v90-normalize-value", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "static String normalizeValue"),
    snippet("java-v90-normalized-factory", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "static ContextHeaderField normalized"),
    snippet("java-v90-add-missing-warning", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "void addMissingWarning"),
    snippet("java-v90-all-echoed", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "static boolean allEchoed"),
    snippet("java-v90-warning-helper-documentation", JAVA_V90_WALKTHROUGH, "缺失 warning 处理收进 `ContextHeaderField`"),
    snippet("java-v90-contract-preserving", JAVA_V90_WALKTHROUGH, "contract-preserving refactor"),
    snippet("java-v90-lombok-import", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "lombok"),
    snippet("java-v90-no-lombok-plan", JAVA_V90_WALKTHROUGH, "不引入 Lombok"),
    snippet("java-v90-no-ledger", JAVA_V90_RUNBOOK, "不写 ledger"),
    snippet("java-v90-no-sql", JAVA_V90_RUNBOOK, "不执行 SQL"),
    snippet("java-v90-no-credential", JAVA_V90_RUNBOOK, "不读取 credential value"),
    snippet("java-v90-no-connection", JAVA_V90_RUNBOOK, "不打开 managed audit connection"),
    snippet("mini-kv-v99-regression-coverage", MINI_KV_V99_WALKTHROUGH, "usage error 不写 WAL"),
    snippet("mini-kv-v99-usage-error-no-wal", MINI_KV_V99_WALKTHROUGH, "usage error 不写 WAL"),
    snippet("mini-kv-v99-no-op-no-wal", MINI_KV_V99_WALKTHROUGH, "missing / expired no-op 不写 WAL"),
    snippet("mini-kv-v99-append-before-mutation", MINI_KV_V99_WALKTHROUGH, "append-before-mutation 顺序"),
    snippet("mini-kv-v99-node-v234", MINI_KV_RUNTIME_SMOKE, "Node v234 manual sandbox connection blocked execution rehearsal"),
    snippet("mini-kv-v99-read-only", MINI_KV_V99_RUNBOOK, "`read_only=true`"),
    snippet("mini-kv-v99-no-write", MINI_KV_V99_RUNBOOK, "`write_commands_executed=false`"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxBlockedExecutionRehearsalChecks,
): ManualSandboxBlockedExecutionRehearsalMessage[] {
  const blockers: ManualSandboxBlockedExecutionRehearsalMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV233ReviewReady, "NODE_V233_REHEARSAL_PACKET_REVIEW_NOT_READY", "node-v233-rehearsal-packet-review", "Node v233 rehearsal packet review must be ready before v234 blocked execution rehearsal.");
  addBlocker(blockers, checks.sourceNodeV233StillConnectionBlocked, "SOURCE_REVIEW_UNLOCKED_CONNECTION", "node-v233-rehearsal-packet-review", "Node v233 source review must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.sourceNodeV233StillWriteBlocked, "SOURCE_REVIEW_UNLOCKED_WRITE", "node-v233-rehearsal-packet-review", "Node v233 source review must still block managed audit writes.");
  addBlocker(blockers, checks.javaV90ContextNormalizationAccepted, "JAVA_V90_CONTEXT_NORMALIZATION_NOT_ACCEPTED", "java-v90-context-normalization", "Java v90 context normalization evidence must be present and no-write.");
  addBlocker(blockers, checks.miniKvV99WalRegressionAccepted, "MINIKV_V99_WAL_REGRESSION_NOT_ACCEPTED", "mini-kv-v99-wal-regression", "mini-kv v99 WAL regression evidence must preserve read-only runtime boundaries.");
  addBlocker(blockers, checks.allDangerousOperationsSimulatedOnly, "DANGEROUS_OPERATION_ACTUALLY_ATTEMPTED", "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal", "v234 may only simulate blocked attempts; it must not execute connection, credential, schema, write, restore, or auto-start operations.");
  addBlocker(blockers, checks.allDangerousOperationsBlocked, "DANGEROUS_OPERATION_NOT_BLOCKED", "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal", "Every dangerous operation in the rehearsal matrix must remain blocked.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

function collectWarnings(): ManualSandboxBlockedExecutionRehearsalMessage[] {
  return [
    {
      code: "BLOCKED_EXECUTION_REHEARSAL_ONLY_NO_REAL_ATTEMPT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "This profile rehearses the block matrix only; it does not open a connection or intentionally trigger a live rejection.",
    },
    {
      code: "OPTIMIZATION_EVIDENCE_IS_STILL_NOT_PERMISSION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "Java v90 and mini-kv v99 prove quality improvements, not permission to write ledgers, read credentials, or start services.",
    },
  ];
}

function collectRecommendations(): ManualSandboxBlockedExecutionRehearsalMessage[] {
  return [
    {
      code: "START_POST_V234_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "Close the v231 plan after v234 and start a post-v234 plan that separates blocked rehearsal from any real sandbox connection.",
    },
    {
      code: "NEXT_STEP_REQUIRES_MANUAL_WINDOW_DESIGN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
      message: "The next stage should define a human-approved sandbox window and credential-handle review before any real connection adapter work.",
    },
  ];
}

function attempt(
  id: BlockedExecutionAttempt["id"],
  surface: BlockedExecutionAttempt["surface"],
  requestedOperation: string,
  blockedBy: string,
  evidenceSource: string,
): BlockedExecutionAttempt {
  return {
    id,
    surface,
    requestedOperation,
    simulatedOnly: true,
    actualExecutionAttempted: false,
    blocked: true,
    blockedBy,
    executionAllowed: false,
    evidenceSource,
  };
}

function evidenceFile(id: string, filePath: string): BlockedExecutionEvidenceFile {
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

function snippet(id: string, filePath: string, expectedText: string): BlockedExecutionSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function addBlocker(
  messages: ManualSandboxBlockedExecutionRehearsalMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxBlockedExecutionRehearsalMessage["source"],
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

function renderAttempt(attemptEntry: BlockedExecutionAttempt): string[] {
  return [
    `- ${attemptEntry.id}`,
    `  - surface: ${attemptEntry.surface}`,
    `  - requestedOperation: ${attemptEntry.requestedOperation}`,
    `  - simulatedOnly: ${attemptEntry.simulatedOnly}`,
    `  - actualExecutionAttempted: ${attemptEntry.actualExecutionAttempted}`,
    `  - blocked: ${attemptEntry.blocked}`,
    `  - blockedBy: ${attemptEntry.blockedBy}`,
    `  - executionAllowed: ${attemptEntry.executionAllowed}`,
    `  - evidenceSource: ${attemptEntry.evidenceSource}`,
  ];
}

function renderEvidenceFile(file: BlockedExecutionEvidenceFile): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: BlockedExecutionSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}

function fileById(files: BlockedExecutionEvidenceFile[], id: string): BlockedExecutionEvidenceFile {
  const file = files.find((entry) => entry.id === id);
  if (!file) {
    throw new Error(`Missing evidence file descriptor: ${id}`);
  }
  return file;
}

function snippetMatched(snippets: BlockedExecutionSnippetMatch[], id: string): boolean {
  return snippets.find((entry) => entry.id === id)?.matched ?? false;
}

function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  return readJsonFile(MINI_KV_RUNTIME_SMOKE) as MiniKvRuntimeSmokeEvidence;
}

function readMiniKvVerificationManifest(): MiniKvVerificationManifest {
  return readJsonFile(MINI_KV_VERIFICATION_MANIFEST) as MiniKvVerificationManifest;
}

function readJsonFile(filePath: string): unknown {
  if (!existsSync(filePath)) {
    return {};
  }
  return JSON.parse(readFileSync(filePath, "utf8")) as unknown;
}

function recordField(record: Record<string, unknown>, field: string): Record<string, unknown> {
  const value = record[field];
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringField(record: Record<string, unknown>, field: string): string | null {
  const value = record[field];
  return typeof value === "string" ? value : null;
}

function booleanField(record: Record<string, unknown>, field: string): boolean | null {
  const value = record[field];
  return typeof value === "boolean" ? value : null;
}

function stringArrayField(record: Record<string, unknown>, field: string): string[] {
  const value = record[field];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}
