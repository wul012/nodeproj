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
  loadManagedAuditManualSandboxConnectionPreflightVerification,
  type ManagedAuditManualSandboxConnectionPreflightVerificationProfile,
} from "./managedAuditManualSandboxConnectionPreflightVerification.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1";
  reviewState: "manual-sandbox-connection-rehearsal-packet-review-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionRehearsalPacketReview: boolean;
  readOnlyReview: true;
  sourceNodeV231: {
    sourceVersion: "Node v231";
    profileVersion: ManagedAuditManualSandboxConnectionPreflightVerificationProfile["profileVersion"];
    verificationState: ManagedAuditManualSandboxConnectionPreflightVerificationProfile["verificationState"];
    verificationDigest: string;
    sourcePreflightGateDigest: string;
    readyForPreflightVerification: boolean;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    productionBlockerCount: number;
  };
  sourceNodeV232: NodeV232GuardAggregationReference;
  upstreamOptimizationEvidence: {
    javaV89: JavaV89ContextHeaderFieldReference;
    miniKvV98: MiniKvV98ExecuteWithWalReference;
  };
  evidenceFiles: RehearsalPacketReviewEvidenceFile[];
  snippetMatches: RehearsalPacketReviewSnippetMatch[];
  rehearsalPacketReview: {
    reviewDigest: string;
    sourcePreflightVerificationDigest: string;
    markerSpan: "Node v232 + Java v89 + mini-kv v98";
    reviewMode: "manual-sandbox-connection-rehearsal-packet-review-only";
    nodeGuardAggregationAccepted: boolean;
    javaContextHeaderFieldAccepted: boolean;
    miniKvExecuteWithWalAccepted: boolean;
    upstreamOptimizationEvidenceAccepted: boolean;
    connectionExecutionAllowed: false;
    credentialValueReadAllowed: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    automaticServiceStartAllowed: false;
    nodeV233BlocksRealConnection: true;
  };
  checks: ManualSandboxRehearsalPacketReviewChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxRehearsalPacketReviewMessage[];
  warnings: ManualSandboxRehearsalPacketReviewMessage[];
  recommendations: ManualSandboxRehearsalPacketReviewMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionRehearsalPacketReviewJson: string;
    manualSandboxConnectionRehearsalPacketReviewMarkdown: string;
    sourceNodeV231Json: string;
    nodeV232GuardTypes: string;
    javaV89Runbook: string;
    javaV89Walkthrough: string;
    javaV89ContextHeaderFieldSource: string;
    miniKvV98Runbook: string;
    miniKvV98Walkthrough: string;
    miniKvRuntimeSmokeEvidence: string;
    miniKvVerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface NodeV232GuardAggregationReference {
  sourceVersion: "Node v232";
  guardSourcePath: string;
  evidencePresent: boolean;
  readOnlyDryRunGuardsPresent: boolean;
  sandboxDryRunGuardsPresent: boolean;
  localDryRunWriteGuardPresent: boolean;
  profileContractsChecked: number;
  profileContractsUsingSandboxDryRunGuards: number;
  profileContractsStillBlocked: boolean;
  guardAggregationAccepted: boolean;
}

interface JavaV89ContextHeaderFieldReference {
  sourceVersion: "Java v89";
  headTag: "v89订单平台release-approval-context-header-field";
  runbookPath: string;
  walkthroughPath: string;
  sourcePath: string;
  evidencePresent: boolean;
  contextHeaderFieldRecordPresent: boolean;
  contextHeaderFieldFactoryPresent: boolean;
  contextHeaderFieldWarningHelperPresent: boolean;
  contextHeaderFieldAllEchoedPresent: boolean;
  contractPreservingRefactorDocumented: boolean;
  approvalLedgerWrittenByJava: boolean;
  schemaSqlExecutedByJava: boolean;
  credentialValueReadByJava: boolean;
  managedAuditConnectionOpenedByJava: boolean;
  readyForNodeV233RehearsalPacketReview: boolean;
}

interface MiniKvV98ExecuteWithWalReference {
  sourceVersion: "mini-kv v98";
  headTag: "第九十八版execute-with-wal助手收敛";
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
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  noRuntimeWriteCommandAdded: boolean;
  noOpWalRecordAppendBlocked: boolean;
  runtimeWriteObserved: boolean;
  writeCommandsExecuted: boolean;
  readyForNodeV233RehearsalPacketReview: boolean;
}

interface RehearsalPacketReviewEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface RehearsalPacketReviewSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

type ManualSandboxRehearsalPacketReviewChecks = {
  sourceNodeV231PreflightVerificationReady: boolean;
  sourceNodeV231StillConnectionBlocked: boolean;
  sourceNodeV231DigestPresent: boolean;
  nodeV232GuardAggregationPresent: boolean;
  nodeV232GuardAggregationAccepted: boolean;
  nodeV232ProfileContractsStillBlocked: boolean;
  javaV89EvidencePresent: boolean;
  javaV89ContextHeaderFieldAccepted: boolean;
  javaV89BoundaryAccepted: boolean;
  miniKvV98EvidencePresent: boolean;
  miniKvV98ExecuteWithWalAccepted: boolean;
  miniKvV98RuntimeBoundaryAccepted: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionRehearsalPacketReview: boolean;
};

interface ManualSandboxRehearsalPacketReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-rehearsal-packet-review"
    | "node-v231-preflight-verification"
    | "node-v232-sandbox-guard-types"
    | "java-v89-context-header-field"
    | "mini-kv-v98-execute-with-wal"
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

const NODE_V232_GUARD_SOURCE = "D:/nodeproj/orderops-node/src/services/managedAuditSandboxGuards.ts";
const JAVA_V89_RUNBOOK = "D:/javaproj/advanced-order-platform/c/89/解释/说明.md";
const JAVA_V89_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/92-version-89-release-approval-context-header-field.md";
const JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ContextHeaderField.java";
const MINI_KV_V98_RUNBOOK = "D:/C/mini-kv/c/98/解释/说明.md";
const MINI_KV_V98_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/154-version-98-execute-with-wal-helper.md";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const SANDBOX_GUARD_PROFILE_PATHS = Object.freeze([
  "D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightVerification.ts",
]);

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionRehearsalPacketReviewJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review",
  manualSandboxConnectionRehearsalPacketReviewMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review?format=markdown",
  sourceNodeV231Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification",
  nodeV232GuardTypes: NODE_V232_GUARD_SOURCE,
  javaV89Runbook: JAVA_V89_RUNBOOK,
  javaV89Walkthrough: JAVA_V89_WALKTHROUGH,
  javaV89ContextHeaderFieldSource: JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE,
  miniKvV98Runbook: MINI_KV_V98_RUNBOOK,
  miniKvV98Walkthrough: MINI_KV_V98_WALKTHROUGH,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v231-post-preflight-verification-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;
const MINI_KV_CURRENT_RELEASES_WITH_V98_HELPER = Object.freeze(["v98", "v99"]);
const MINI_KV_V98_CONSUMERS = Object.freeze([
  "Node v233 manual sandbox connection rehearsal packet review",
  "Node v234 manual sandbox connection blocked execution rehearsal",
]);

export function loadManagedAuditManualSandboxConnectionRehearsalPacketReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile {
  const sourceVerification = loadManagedAuditManualSandboxConnectionPreflightVerification({ config: input.config });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const runtimeSmoke = readMiniKvRuntimeSmokeEvidence();
  const manifest = readMiniKvVerificationManifest();
  const sourceNodeV232 = createNodeV232Reference(evidenceFiles, snippetMatches);
  const javaV89 = createJavaV89Reference(evidenceFiles, snippetMatches);
  const miniKvV98 = createMiniKvV98Reference(evidenceFiles, snippetMatches, runtimeSmoke, manifest);
  const rehearsalPacketReview = createRehearsalPacketReview(sourceVerification, sourceNodeV232, javaV89, miniKvV98);
  const checks = createChecks(
    input.config,
    sourceVerification,
    sourceNodeV232,
    javaV89,
    miniKvV98,
    rehearsalPacketReview,
  );
  checks.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionRehearsalPacketReview")
    .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview
    ? "manual-sandbox-connection-rehearsal-packet-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection rehearsal packet review",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1",
    reviewState,
    readyForManagedAuditManualSandboxConnectionRehearsalPacketReview:
      checks.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview,
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
    sourceNodeV231: {
      sourceVersion: "Node v231",
      profileVersion: sourceVerification.profileVersion,
      verificationState: sourceVerification.verificationState,
      verificationDigest: sourceVerification.preflightVerification.verificationDigest,
      sourcePreflightGateDigest: sourceVerification.preflightVerification.sourcePreflightGateDigest,
      readyForPreflightVerification: sourceVerification.readyForManagedAuditManualSandboxConnectionPreflightVerification,
      readyForSandboxAdapterConnectionFromSource: sourceVerification.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourceVerification.connectsManagedAudit,
      readsManagedAuditCredential: sourceVerification.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceVerification.schemaMigrationExecuted,
      productionBlockerCount: sourceVerification.summary.productionBlockerCount,
    },
    sourceNodeV232,
    upstreamOptimizationEvidence: {
      javaV89,
      miniKvV98,
    },
    evidenceFiles,
    snippetMatches,
    rehearsalPacketReview,
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
      "Archive Node v233 as review-only evidence; do not open the managed audit sandbox connection from this profile.",
      "Proceed to Node v234 only as blocked execution rehearsal that proves dangerous actions are still rejected.",
      "Keep Java v89 and mini-kv v98 as optimization evidence inputs, not as permission to connect or write.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown(
  profile: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile,
): string {
  return [
    "# Managed audit manual sandbox connection rehearsal packet review",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Review state: ${profile.reviewState}`,
    `- Ready for rehearsal packet review: ${profile.readyForManagedAuditManualSandboxConnectionRehearsalPacketReview}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v231",
    "",
    ...renderEntries(profile.sourceNodeV231),
    "",
    "## Source Node v232 Guard Aggregation",
    "",
    ...renderEntries(profile.sourceNodeV232),
    "",
    "## Java v89 ContextHeaderField Evidence",
    "",
    ...renderEntries(profile.upstreamOptimizationEvidence.javaV89),
    "",
    "## mini-kv v98 execute_with_wal Evidence",
    "",
    ...renderEntries(profile.upstreamOptimizationEvidence.miniKvV98),
    "",
    "## Rehearsal Packet Review",
    "",
    ...renderEntries(profile.rehearsalPacketReview),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox rehearsal packet review blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox rehearsal packet review warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox rehearsal packet review recommendations."),
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

function createNodeV232Reference(
  evidenceFiles: RehearsalPacketReviewEvidenceFile[],
  snippets: RehearsalPacketReviewSnippetMatch[],
): NodeV232GuardAggregationReference {
  const profileContractsUsingSandboxDryRunGuards = SANDBOX_GUARD_PROFILE_PATHS.filter((filePath) => {
    const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
    return content.includes("extends SandboxDryRunGuards");
  }).length;

  const reference: NodeV232GuardAggregationReference = {
    sourceVersion: "Node v232",
    guardSourcePath: NODE_V232_GUARD_SOURCE,
    evidencePresent: fileById(evidenceFiles, "node-v232-sandbox-guards").exists,
    readOnlyDryRunGuardsPresent: snippetMatched(snippets, "node-v232-read-only-guards"),
    sandboxDryRunGuardsPresent: snippetMatched(snippets, "node-v232-sandbox-guards"),
    localDryRunWriteGuardPresent: snippetMatched(snippets, "node-v232-local-write-guard"),
    profileContractsChecked: SANDBOX_GUARD_PROFILE_PATHS.length,
    profileContractsUsingSandboxDryRunGuards,
    profileContractsStillBlocked: snippetMatched(snippets, "node-v232-sandbox-connection-false")
      && snippetMatched(snippets, "node-v232-execution-false")
      && snippetMatched(snippets, "node-v232-credential-false")
      && snippetMatched(snippets, "node-v232-auto-start-false"),
    guardAggregationAccepted: false,
  };

  return {
    ...reference,
    guardAggregationAccepted: reference.evidencePresent
      && reference.readOnlyDryRunGuardsPresent
      && reference.sandboxDryRunGuardsPresent
      && reference.localDryRunWriteGuardPresent
      && reference.profileContractsUsingSandboxDryRunGuards === reference.profileContractsChecked
      && reference.profileContractsStillBlocked,
  };
}

function createJavaV89Reference(
  evidenceFiles: RehearsalPacketReviewEvidenceFile[],
  snippets: RehearsalPacketReviewSnippetMatch[],
): JavaV89ContextHeaderFieldReference {
  const reference: JavaV89ContextHeaderFieldReference = {
    sourceVersion: "Java v89",
    headTag: "v89订单平台release-approval-context-header-field",
    runbookPath: JAVA_V89_RUNBOOK,
    walkthroughPath: JAVA_V89_WALKTHROUGH,
    sourcePath: JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE,
    evidencePresent: fileById(evidenceFiles, "java-v89-runbook").exists
      && fileById(evidenceFiles, "java-v89-walkthrough").exists
      && fileById(evidenceFiles, "java-v89-context-header-field-source").exists,
    contextHeaderFieldRecordPresent: snippetMatched(snippets, "java-v89-record"),
    contextHeaderFieldFactoryPresent: snippetMatched(snippets, "java-v89-from"),
    contextHeaderFieldWarningHelperPresent: snippetMatched(snippets, "java-v89-add-warning"),
    contextHeaderFieldAllEchoedPresent: snippetMatched(snippets, "java-v89-all-echoed"),
    contractPreservingRefactorDocumented: snippetMatched(snippets, "java-v89-contract-preserving"),
    approvalLedgerWrittenByJava: !snippetMatched(snippets, "java-v89-no-ledger"),
    schemaSqlExecutedByJava: !snippetMatched(snippets, "java-v89-no-sql"),
    credentialValueReadByJava: !snippetMatched(snippets, "java-v89-no-credential"),
    managedAuditConnectionOpenedByJava: !snippetMatched(snippets, "java-v89-no-connection"),
    readyForNodeV233RehearsalPacketReview: false,
  };

  return {
    ...reference,
    readyForNodeV233RehearsalPacketReview: reference.evidencePresent
      && reference.contextHeaderFieldRecordPresent
      && reference.contextHeaderFieldFactoryPresent
      && reference.contextHeaderFieldWarningHelperPresent
      && reference.contextHeaderFieldAllEchoedPresent
      && reference.contractPreservingRefactorDocumented
      && !reference.approvalLedgerWrittenByJava
      && !reference.schemaSqlExecutedByJava
      && !reference.credentialValueReadByJava
      && !reference.managedAuditConnectionOpenedByJava,
  };
}

function createMiniKvV98Reference(
  evidenceFiles: RehearsalPacketReviewEvidenceFile[],
  snippets: RehearsalPacketReviewSnippetMatch[],
  runtimeSmoke: MiniKvRuntimeSmokeEvidence,
  manifest: MiniKvVerificationManifest,
): MiniKvV98ExecuteWithWalReference {
  const versionManifest = recordField(manifest, "version_manifest");
  const readOnlySmoke = recordField(recordField(manifest, "commands"), "read_only_smoke");
  const scope = stringArrayField(versionManifest, "write_wal_helper_scope");
  const boundaries = stringArrayField(manifest, "boundaries");
  const reference: MiniKvV98ExecuteWithWalReference = {
    sourceVersion: "mini-kv v98",
    headTag: "第九十八版execute-with-wal助手收敛",
    runbookPath: MINI_KV_V98_RUNBOOK,
    walkthroughPath: MINI_KV_V98_WALKTHROUGH,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v98-runbook").exists
      && fileById(evidenceFiles, "mini-kv-v98-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-verification-manifest").exists,
    projectVersion: stringField(manifest, "project_version") ?? stringField(runtimeSmoke, "project_version") ?? "missing",
    releaseVersion: stringField(manifest, "release_version") ?? stringField(runtimeSmoke, "release_version") ?? "missing",
    consumerHint: stringField(manifest, "consumer_hint") ?? stringField(runtimeSmoke, "consumer_hint") ?? "missing",
    writeWalHelper: stringField(versionManifest, "write_wal_helper") ?? "missing",
    writeWalHelperScope: scope,
    writeWalHelperBehaviorPreserved: booleanField(versionManifest, "write_wal_helper_behavior_preserved") ?? false,
    readOnly: booleanField(manifest, "read_only") ?? booleanField(runtimeSmoke, "read_only") ?? false,
    executionAllowed: booleanField(manifest, "execution_allowed") ?? booleanField(runtimeSmoke, "execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(runtimeSmoke, "restore_execution_allowed") ?? true,
    orderAuthoritative: booleanField(runtimeSmoke, "order_authoritative") ?? true,
    noRuntimeWriteCommandAdded: booleanField(manifest, "no_runtime_write_command_added") ?? false,
    noOpWalRecordAppendBlocked: boundaries.includes("no no-op WAL record append for SETNXEX/DEL/EXPIRE misses")
      && snippetMatched(snippets, "mini-kv-v98-no-op-wal"),
    runtimeWriteObserved: booleanField(readOnlySmoke, "runtime_write_observed")
      ?? booleanField(runtimeSmoke, "runtime_write_observed")
      ?? true,
    writeCommandsExecuted: booleanField(readOnlySmoke, "write_commands_executed")
      ?? booleanField(runtimeSmoke, "write_commands_executed")
      ?? true,
    readyForNodeV233RehearsalPacketReview: false,
  };

  return {
    ...reference,
    readyForNodeV233RehearsalPacketReview: reference.evidencePresent
      && /^0\.(?:98|99)\.0$/.test(reference.projectVersion)
      && MINI_KV_CURRENT_RELEASES_WITH_V98_HELPER.includes(reference.releaseVersion)
      && MINI_KV_V98_CONSUMERS.includes(reference.consumerHint)
      && reference.writeWalHelper === "CommandProcessor::execute_with_wal"
      && ["SET", "SETNXEX", "DEL", "EXPIRE"].every((command) => reference.writeWalHelperScope.includes(command))
      && reference.writeWalHelperBehaviorPreserved
      && reference.noRuntimeWriteCommandAdded
      && reference.noOpWalRecordAppendBlocked
      && reference.readOnly
      && !reference.executionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.orderAuthoritative
      && !reference.runtimeWriteObserved
      && !reference.writeCommandsExecuted,
  };
}

function createRehearsalPacketReview(
  sourceVerification: ManagedAuditManualSandboxConnectionPreflightVerificationProfile,
  nodeV232: NodeV232GuardAggregationReference,
  javaV89: JavaV89ContextHeaderFieldReference,
  miniKvV98: MiniKvV98ExecuteWithWalReference,
): ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile["rehearsalPacketReview"] {
  const upstreamOptimizationEvidenceAccepted = javaV89.readyForNodeV233RehearsalPacketReview
    && miniKvV98.readyForNodeV233RehearsalPacketReview;

  return {
    reviewDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-packet-review.v1",
      sourcePreflightVerificationDigest: sourceVerification.preflightVerification.verificationDigest,
      nodeV232,
      javaV89,
      miniKvV98,
      upstreamOptimizationEvidenceAccepted,
    }),
    sourcePreflightVerificationDigest: sourceVerification.preflightVerification.verificationDigest,
    markerSpan: "Node v232 + Java v89 + mini-kv v98",
    reviewMode: "manual-sandbox-connection-rehearsal-packet-review-only",
    nodeGuardAggregationAccepted: nodeV232.guardAggregationAccepted,
    javaContextHeaderFieldAccepted: javaV89.readyForNodeV233RehearsalPacketReview,
    miniKvExecuteWithWalAccepted: miniKvV98.readyForNodeV233RehearsalPacketReview,
    upstreamOptimizationEvidenceAccepted,
    connectionExecutionAllowed: false,
    credentialValueReadAllowed: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    automaticServiceStartAllowed: false,
    nodeV233BlocksRealConnection: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceVerification: ManagedAuditManualSandboxConnectionPreflightVerificationProfile,
  nodeV232: NodeV232GuardAggregationReference,
  javaV89: JavaV89ContextHeaderFieldReference,
  miniKvV98: MiniKvV98ExecuteWithWalReference,
  review: ManagedAuditManualSandboxConnectionRehearsalPacketReviewProfile["rehearsalPacketReview"],
): ManualSandboxRehearsalPacketReviewChecks {
  return {
    sourceNodeV231PreflightVerificationReady:
      sourceVerification.readyForManagedAuditManualSandboxConnectionPreflightVerification
      && sourceVerification.verificationState === "manual-sandbox-connection-preflight-verification-ready",
    sourceNodeV231StillConnectionBlocked: !sourceVerification.readyForManagedAuditSandboxAdapterConnection
      && !sourceVerification.connectsManagedAudit
      && !sourceVerification.readsManagedAuditCredential
      && !sourceVerification.schemaMigrationExecuted,
    sourceNodeV231DigestPresent: SHA256_HEX.test(sourceVerification.preflightVerification.verificationDigest)
      && SHA256_HEX.test(sourceVerification.preflightVerification.sourcePreflightGateDigest),
    nodeV232GuardAggregationPresent: nodeV232.evidencePresent,
    nodeV232GuardAggregationAccepted: review.nodeGuardAggregationAccepted,
    nodeV232ProfileContractsStillBlocked: nodeV232.profileContractsStillBlocked,
    javaV89EvidencePresent: javaV89.evidencePresent,
    javaV89ContextHeaderFieldAccepted: review.javaContextHeaderFieldAccepted,
    javaV89BoundaryAccepted: !javaV89.approvalLedgerWrittenByJava
      && !javaV89.schemaSqlExecutedByJava
      && !javaV89.credentialValueReadByJava
      && !javaV89.managedAuditConnectionOpenedByJava,
    miniKvV98EvidencePresent: miniKvV98.evidencePresent,
    miniKvV98ExecuteWithWalAccepted: review.miniKvExecuteWithWalAccepted,
    miniKvV98RuntimeBoundaryAccepted: miniKvV98.readOnly
      && !miniKvV98.executionAllowed
      && !miniKvV98.restoreExecutionAllowed
      && !miniKvV98.orderAuthoritative
      && !miniKvV98.runtimeWriteObserved
      && !miniKvV98.writeCommandsExecuted,
    credentialValueStillForbidden: !review.credentialValueReadAllowed,
    schemaMigrationStillBlocked: !review.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !review.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !review.managedAuditWriteAllowed,
    automaticServiceStartStillBlocked: !review.automaticServiceStartAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionRehearsalPacketReview: false,
  };
}

function createEvidenceFiles(): RehearsalPacketReviewEvidenceFile[] {
  return [
    evidenceFile("node-v232-sandbox-guards", NODE_V232_GUARD_SOURCE),
    evidenceFile("java-v89-runbook", JAVA_V89_RUNBOOK),
    evidenceFile("java-v89-walkthrough", JAVA_V89_WALKTHROUGH),
    evidenceFile("java-v89-context-header-field-source", JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE),
    evidenceFile("mini-kv-v98-runbook", MINI_KV_V98_RUNBOOK),
    evidenceFile("mini-kv-v98-walkthrough", MINI_KV_V98_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): RehearsalPacketReviewSnippetMatch[] {
  return [
    snippet("node-v232-read-only-guards", NODE_V232_GUARD_SOURCE, "export interface ReadOnlyDryRunGuards"),
    snippet("node-v232-sandbox-guards", NODE_V232_GUARD_SOURCE, "export interface SandboxDryRunGuards extends ReadOnlyDryRunGuards"),
    snippet("node-v232-local-write-guard", NODE_V232_GUARD_SOURCE, "export interface LocalDryRunWriteGuard"),
    snippet("node-v232-sandbox-connection-false", NODE_V232_GUARD_SOURCE, "readyForManagedAuditSandboxAdapterConnection: false"),
    snippet("node-v232-execution-false", NODE_V232_GUARD_SOURCE, "executionAllowed: false"),
    snippet("node-v232-credential-false", NODE_V232_GUARD_SOURCE, "readsManagedAuditCredential: false"),
    snippet("node-v232-auto-start-false", NODE_V232_GUARD_SOURCE, "automaticUpstreamStart: false"),
    snippet("java-v89-record", JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE, "record ContextHeaderField(String value, String source, boolean echoed)"),
    snippet("java-v89-from", JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE, "static ContextHeaderField from"),
    snippet("java-v89-add-warning", JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE, "void addMissingWarning"),
    snippet("java-v89-all-echoed", JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE, "static boolean allEchoed"),
    snippet("java-v89-contract-preserving", JAVA_V89_WALKTHROUGH, "contract-preserving refactor"),
    snippet("java-v89-no-ledger", JAVA_V89_WALKTHROUGH, "不写 approval ledger"),
    snippet("java-v89-no-sql", JAVA_V89_WALKTHROUGH, "不执行 SQL"),
    snippet("java-v89-no-credential", JAVA_V89_RUNBOOK, "不读取 credential value"),
    snippet("java-v89-no-connection", JAVA_V89_WALKTHROUGH, "不打开 managed audit connection"),
    snippet("mini-kv-v98-helper", MINI_KV_V98_WALKTHROUGH, "CommandProcessor::execute_with_wal"),
    snippet("mini-kv-v98-scope", MINI_KV_V98_RUNBOOK, "`SET`、`SETNXEX`、`DEL`、`EXPIRE`"),
    snippet("mini-kv-v98-no-op-wal", MINI_KV_V98_RUNBOOK, "no-op miss 不写 WAL"),
    snippet("mini-kv-v98-node-v233", MINI_KV_RUNTIME_SMOKE, "Node v234 manual sandbox connection blocked execution rehearsal"),
    snippet("mini-kv-v98-read-only", MINI_KV_V98_RUNBOOK, "read_only=true"),
    snippet("mini-kv-v98-no-write", MINI_KV_V98_RUNBOOK, "write_commands_executed=false"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxRehearsalPacketReviewChecks,
): ManualSandboxRehearsalPacketReviewMessage[] {
  const blockers: ManualSandboxRehearsalPacketReviewMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV231PreflightVerificationReady, "NODE_V231_PREFLIGHT_VERIFICATION_NOT_READY", "node-v231-preflight-verification", "Node v231 preflight verification must be ready before v233 review.");
  addBlocker(blockers, checks.sourceNodeV231StillConnectionBlocked, "SOURCE_PREFLIGHT_VERIFICATION_UNLOCKED_CONNECTION", "node-v231-preflight-verification", "Node v231 source verification must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.nodeV232GuardAggregationAccepted, "NODE_V232_GUARD_AGGREGATION_NOT_ACCEPTED", "node-v232-sandbox-guard-types", "Node v232 sandbox guard type aggregation must be present and used by existing sandbox profiles.");
  addBlocker(blockers, checks.javaV89ContextHeaderFieldAccepted, "JAVA_V89_CONTEXT_HEADER_FIELD_NOT_ACCEPTED", "java-v89-context-header-field", "Java v89 ContextHeaderField refactor evidence must preserve contract and no-write boundaries.");
  addBlocker(blockers, checks.miniKvV98ExecuteWithWalAccepted, "MINIKV_V98_EXECUTE_WITH_WAL_NOT_ACCEPTED", "mini-kv-v98-execute-with-wal", "mini-kv v98 execute_with_wal evidence must preserve write behavior and runtime read-only boundaries.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-rehearsal-packet-review", "v233 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): ManualSandboxRehearsalPacketReviewMessage[] {
  return [
    {
      code: "REHEARSAL_PACKET_REVIEW_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-rehearsal-packet-review",
      message: "This profile reviews the rehearsal packet only; it does not open a managed audit sandbox connection.",
    },
    {
      code: "OPTIMIZATION_EVIDENCE_IS_NOT_EXECUTION_APPROVAL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-rehearsal-packet-review",
      message: "Java v89 and mini-kv v98 are consumed as optimization evidence, not as permission to connect, read credentials, or write audit state.",
    },
  ];
}

function collectRecommendations(): ManualSandboxRehearsalPacketReviewMessage[] {
  return [
    {
      code: "NEXT_NODE_V234_BLOCKED_REHEARSAL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-rehearsal-packet-review",
      message: "Use Node v234 for a blocked execution rehearsal that proves connection, credential, migration, and write attempts remain rejected.",
    },
    {
      code: "KEEP_REVIEW_AND_CONNECTION_SEPARATE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-rehearsal-packet-review",
      message: "Keep packet review separate from any later real sandbox connection or production audit window.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): RehearsalPacketReviewEvidenceFile {
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

function snippet(id: string, filePath: string, expectedText: string): RehearsalPacketReviewSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function addBlocker(
  messages: ManualSandboxRehearsalPacketReviewMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxRehearsalPacketReviewMessage["source"],
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

function renderEvidenceFile(file: RehearsalPacketReviewEvidenceFile): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: RehearsalPacketReviewSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}

function fileById(
  files: RehearsalPacketReviewEvidenceFile[],
  id: string,
): RehearsalPacketReviewEvidenceFile {
  const file = files.find((entry) => entry.id === id);
  if (!file) {
    throw new Error(`Missing evidence file descriptor: ${id}`);
  }
  return file;
}

function snippetMatched(snippets: RehearsalPacketReviewSnippetMatch[], id: string): boolean {
  return snippets.find((entry) => entry.id === id)?.matched ?? false;
}

function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  return readJsonFile(MINI_KV_RUNTIME_SMOKE) as MiniKvRuntimeSmokeEvidence;
}

function readMiniKvVerificationManifest(): MiniKvVerificationManifest {
  return readJsonFile(MINI_KV_VERIFICATION_MANIFEST) as MiniKvVerificationManifest;
}

function readJsonFile(filePath: string): Record<string, unknown> {
  if (!existsSync(filePath)) {
    return {};
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function stringField(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  return typeof value === "string" ? value : null;
}

function booleanField(record: Record<string, unknown>, key: string): boolean | null {
  const value = record[key];
  return typeof value === "boolean" ? value : null;
}

function recordField(record: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = record[key];
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function stringArrayField(record: Record<string, unknown>, key: string): string[] {
  const value = record[key];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}
