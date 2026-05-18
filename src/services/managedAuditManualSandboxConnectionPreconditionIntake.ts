import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  historicalEvidenceExists as existsSync,
  readHistoricalEvidenceFile as readFileSync,
  statHistoricalEvidence as statSync,
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
  loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
  type ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsal.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionPreconditionIntakeProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-precondition-intake.v1";
  intakeState: "manual-sandbox-connection-precondition-intake-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPreconditionIntake: boolean;
  readOnlyReview: true;
  sourceNodeV234: {
    sourceVersion: "Node v234";
    profileVersion: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["profileVersion"];
    rehearsalState: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile["rehearsalState"];
    rehearsalDigest: string;
    readyForBlockedExecutionRehearsal: boolean;
    simulatedAttemptCount: number;
    blockedAttemptCount: number;
    actualExecutionAttemptCount: number;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
  };
  upstreamPreconditionEvidence: {
    javaV91: JavaV91SandboxConnectionPreconditionReceiptReference;
    miniKvV100: MiniKvV100RollingRuntimeFixtureGuardReference;
  };
  preconditionIntake: {
    intakeDigest: string;
    markerSpan: "Node v234 + Java v91 + mini-kv v100";
    intakeMode: "manual-sandbox-connection-precondition-intake-only";
    requiredPreconditionCount: number;
    documentedPreconditionCount: number;
    handlesOnly: true;
    ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
    credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
    schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
    rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
    manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
    timeoutBudgetMs: 15000;
    actualConnectionAttempted: false;
    credentialValueRead: false;
    schemaMigrationExecuted: false;
    managedAuditStateWritten: false;
    upstreamServiceAutoStarted: false;
    miniKvExecutionPermissionInferred: false;
    readyForDryRunRequestEnvelope: boolean;
  };
  evidenceFiles: PreconditionIntakeEvidenceFile[];
  snippetMatches: PreconditionIntakeSnippetMatch[];
  checks: ManualSandboxPreconditionIntakeChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    requiredPreconditionCount: number;
    documentedPreconditionCount: number;
    historicalMiniKvAnchorCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxPreconditionIntakeMessage[];
  warnings: ManualSandboxPreconditionIntakeMessage[];
  recommendations: ManualSandboxPreconditionIntakeMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionPreconditionIntakeJson: string;
    manualSandboxConnectionPreconditionIntakeMarkdown: string;
    sourceNodeV234Json: string;
    javaV91Runbook: string;
    javaV91Walkthrough: string;
    javaV91BuilderSource: string;
    miniKvV100Runbook: string;
    miniKvV100Walkthrough: string;
    miniKvV100RollingGuard: string;
    miniKvRuntimeSmokeEvidence: string;
    miniKvVerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV91SandboxConnectionPreconditionReceiptReference {
  sourceVersion: "Java v91";
  headTag: "v91订单平台release-approval-sandbox-connection-precondition-receipt";
  runbookPath: string;
  walkthroughPath: string;
  builderSourcePath: string;
  evidencePresent: boolean;
  readyForNodeV235ManualSandboxConnectionPreconditionIntake: boolean;
  consumedNodeV234BlockedExecutionRehearsal: boolean;
  ownerApprovalArtifactRequired: boolean;
  credentialHandleReviewRequired: boolean;
  schemaRehearsalEvidenceRequired: boolean;
  rollbackPathRequired: boolean;
  timeoutBudgetRequired: boolean;
  manualAbortMarkerRequired: boolean;
  ownerApprovalArtifactProvidedByJava: boolean;
  credentialValueReadByJava: boolean;
  schemaMigrationSqlExecutedByJava: boolean;
  externalManagedAuditConnectionOpenedByJava: boolean;
  actualConnectionAttemptedByJava: boolean;
  approvalLedgerWrittenByJava: boolean;
  readyForNodeV235Intake: boolean;
}

interface MiniKvV100RollingRuntimeFixtureGuardReference {
  sourceVersion: "mini-kv v100";
  headTag: "第一百版运行证据滚动守卫";
  runbookPath: string;
  walkthroughPath: string;
  guardPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  guardVersion: string;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  currentArtifactPathHint: string;
  currentLiveReadSessionEcho: string;
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  historicalReceiptAnchorCount: number;
  historicalReceiptAnchorsStable: boolean;
  requiredChecksMentionNodeV235: boolean;
  boundariesForbidExecution: boolean;
  readyForNodeV235Intake: boolean;
}

interface PreconditionIntakeEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface PreconditionIntakeSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

type ManualSandboxPreconditionIntakeChecks = {
  sourceNodeV234BlockedExecutionRehearsalReady: boolean;
  sourceNodeV234DigestPresent: boolean;
  sourceNodeV234StillBlocksAllDangerousOperations: boolean;
  javaV91EvidencePresent: boolean;
  javaV91PreconditionsAccepted: boolean;
  javaV91BoundaryAccepted: boolean;
  miniKvV100EvidencePresent: boolean;
  miniKvV100RollingGuardAccepted: boolean;
  miniKvV100RuntimeBoundaryAccepted: boolean;
  requiredPreconditionsDocumented: boolean;
  handlesOnlyIntake: boolean;
  noConnectionAttempted: boolean;
  noCredentialValueRead: boolean;
  noSchemaMigrationExecuted: boolean;
  noManagedAuditStateWritten: boolean;
  noUpstreamServiceAutoStarted: boolean;
  noMiniKvExecutionPermissionInferred: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPreconditionIntake: boolean;
};

interface ManualSandboxPreconditionIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-precondition-intake"
    | "node-v234-blocked-execution-rehearsal"
    | "java-v91-precondition-receipt"
    | "mini-kv-v100-rolling-runtime-guard"
    | "runtime-config";
  message: string;
}

type JsonObject = Record<string, unknown>;

const NODE_V234_ROUTE = "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal";
const JAVA_V91_RUNBOOK = "D:/javaproj/advanced-order-platform/c/91/解释/说明.md";
const JAVA_V91_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/94-version-91-release-approval-sandbox-connection-precondition-receipt.md";
const JAVA_V91_BUILDER_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionPreconditionReceiptBuilder.java";
const MINI_KV_V100_RUNBOOK = "D:/C/mini-kv/c/100/解释/说明.md";
const MINI_KV_V100_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/156-version-100-current-runtime-fixture-rolling-guard.md";
const MINI_KV_V100_ROLLING_GUARD = "D:/C/mini-kv/fixtures/release/current-runtime-fixture-rolling-guard.json";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionPreconditionIntakeJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake",
  manualSandboxConnectionPreconditionIntakeMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown",
  sourceNodeV234Json: NODE_V234_ROUTE,
  javaV91Runbook: JAVA_V91_RUNBOOK,
  javaV91Walkthrough: JAVA_V91_WALKTHROUGH,
  javaV91BuilderSource: JAVA_V91_BUILDER_SOURCE,
  miniKvV100Runbook: MINI_KV_V100_RUNBOOK,
  miniKvV100Walkthrough: MINI_KV_V100_WALKTHROUGH,
  miniKvV100RollingGuard: MINI_KV_V100_ROLLING_GUARD,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v234-post-blocked-execution-rehearsal-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;
const ACCEPTED_MINI_KV_CURRENT_RUNTIME_GUARDS = Object.freeze([
  {
    projectVersion: "0.100.0",
    releaseVersion: "v100",
    consumerHint: "Node v235 manual sandbox connection precondition intake",
  },
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
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v246 manual sandbox connection precheck upstream receipt verification",
  },
] as const);

export function loadManagedAuditManualSandboxConnectionPreconditionIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPreconditionIntakeProfile {
  const sourceNodeV234Profile = loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({
    config: input.config,
  });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const miniKvGuard = readJsonFile(MINI_KV_V100_ROLLING_GUARD);
  const javaV91 = createJavaV91Reference(evidenceFiles, snippetMatches);
  const miniKvV100 = createMiniKvV100Reference(evidenceFiles, snippetMatches, miniKvGuard);
  const preconditionIntake = createPreconditionIntake(sourceNodeV234Profile, javaV91, miniKvV100);
  const checks = createChecks(input.config, sourceNodeV234Profile, javaV91, miniKvV100, preconditionIntake);
  checks.readyForManagedAuditManualSandboxConnectionPreconditionIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPreconditionIntake")
    .every(([, value]) => value);
  const intakeState = checks.readyForManagedAuditManualSandboxConnectionPreconditionIntake
    ? "manual-sandbox-connection-precondition-intake-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection precondition intake",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-precondition-intake.v1",
    intakeState,
    readyForManagedAuditManualSandboxConnectionPreconditionIntake:
      checks.readyForManagedAuditManualSandboxConnectionPreconditionIntake,
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
    sourceNodeV234: {
      sourceVersion: "Node v234",
      profileVersion: sourceNodeV234Profile.profileVersion,
      rehearsalState: sourceNodeV234Profile.rehearsalState,
      rehearsalDigest: sourceNodeV234Profile.blockedExecutionRehearsal.rehearsalDigest,
      readyForBlockedExecutionRehearsal:
        sourceNodeV234Profile.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
      simulatedAttemptCount: sourceNodeV234Profile.summary.simulatedAttemptCount,
      blockedAttemptCount: sourceNodeV234Profile.summary.blockedAttemptCount,
      actualExecutionAttemptCount: sourceNodeV234Profile.summary.actualExecutionAttemptCount,
      readyForSandboxAdapterConnectionFromSource:
        sourceNodeV234Profile.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourceNodeV234Profile.connectsManagedAudit,
      readsManagedAuditCredential: sourceNodeV234Profile.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceNodeV234Profile.schemaMigrationExecuted,
    },
    upstreamPreconditionEvidence: {
      javaV91,
      miniKvV100,
    },
    preconditionIntake,
    evidenceFiles,
    snippetMatches,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: evidenceFiles.length,
      matchedSnippetCount: snippetMatches.filter((entry) => entry.matched).length,
      requiredPreconditionCount: preconditionIntake.requiredPreconditionCount,
      documentedPreconditionCount: preconditionIntake.documentedPreconditionCount,
      historicalMiniKvAnchorCount: miniKvV100.historicalReceiptAnchorCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v235 as precondition intake only; do not open the managed audit sandbox connection.",
      "Use Node v236 to create a dry-run request envelope that carries handles and marker ids only.",
      "Pause before any real sandbox connection until owner approval, credential handle review, schema rehearsal evidence, rollback path, timeout budget, and abort marker are all operator-reviewed.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionPreconditionIntakeMarkdown(
  profile: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile,
): string {
  return [
    "# Managed audit manual sandbox connection precondition intake",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Intake state: ${profile.intakeState}`,
    `- Ready for precondition intake: ${profile.readyForManagedAuditManualSandboxConnectionPreconditionIntake}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v234",
    "",
    ...renderEntries(profile.sourceNodeV234),
    "",
    "## Java v91 Precondition Receipt",
    "",
    ...renderEntries(profile.upstreamPreconditionEvidence.javaV91),
    "",
    "## mini-kv v100 Rolling Runtime Guard",
    "",
    ...renderEntries(profile.upstreamPreconditionEvidence.miniKvV100),
    "",
    "## Precondition Intake",
    "",
    ...renderEntries(profile.preconditionIntake),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox connection precondition intake blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox connection precondition intake warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox connection precondition intake recommendations."),
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

function createJavaV91Reference(
  files: PreconditionIntakeEvidenceFile[],
  snippets: PreconditionIntakeSnippetMatch[],
): JavaV91SandboxConnectionPreconditionReceiptReference {
  const evidencePresent = fileById(files, "java-v91-runbook").exists
    && fileById(files, "java-v91-walkthrough").exists
    && fileById(files, "java-v91-builder-source").exists;
  const readyForNodeV235ManualSandboxConnectionPreconditionIntake =
    snippetMatched(snippets, "java-v91-ready-for-node-v235");
  const ownerApprovalArtifactRequired = snippetMatched(snippets, "java-v91-owner-artifact-field");
  const credentialHandleReviewRequired = snippetMatched(snippets, "java-v91-credential-handle-field");
  const schemaRehearsalEvidenceRequired = snippetMatched(snippets, "java-v91-schema-rehearsal-field");
  const rollbackPathRequired = snippetMatched(snippets, "java-v91-rollback-path-field");
  const timeoutBudgetRequired = snippetMatched(snippets, "java-v91-timeout-budget");
  const manualAbortMarkerRequired = snippetMatched(snippets, "java-v91-manual-abort-field");
  const boundaryAccepted = snippetMatched(snippets, "java-v91-no-connection")
    && snippetMatched(snippets, "java-v91-no-credential")
    && snippetMatched(snippets, "java-v91-no-sql")
    && snippetMatched(snippets, "java-v91-no-ledger");

  return {
    sourceVersion: "Java v91",
    headTag: "v91订单平台release-approval-sandbox-connection-precondition-receipt",
    runbookPath: JAVA_V91_RUNBOOK,
    walkthroughPath: JAVA_V91_WALKTHROUGH,
    builderSourcePath: JAVA_V91_BUILDER_SOURCE,
    evidencePresent,
    readyForNodeV235ManualSandboxConnectionPreconditionIntake,
    consumedNodeV234BlockedExecutionRehearsal: snippetMatched(snippets, "java-v91-consumes-node-v234"),
    ownerApprovalArtifactRequired,
    credentialHandleReviewRequired,
    schemaRehearsalEvidenceRequired,
    rollbackPathRequired,
    timeoutBudgetRequired,
    manualAbortMarkerRequired,
    ownerApprovalArtifactProvidedByJava: false,
    credentialValueReadByJava: false,
    schemaMigrationSqlExecutedByJava: false,
    externalManagedAuditConnectionOpenedByJava: false,
    actualConnectionAttemptedByJava: false,
    approvalLedgerWrittenByJava: false,
    readyForNodeV235Intake: evidencePresent
      && readyForNodeV235ManualSandboxConnectionPreconditionIntake
      && ownerApprovalArtifactRequired
      && credentialHandleReviewRequired
      && schemaRehearsalEvidenceRequired
      && rollbackPathRequired
      && timeoutBudgetRequired
      && manualAbortMarkerRequired
      && boundaryAccepted,
  };
}

function createMiniKvV100Reference(
  files: PreconditionIntakeEvidenceFile[],
  snippets: PreconditionIntakeSnippetMatch[],
  guard: JsonObject,
): MiniKvV100RollingRuntimeFixtureGuardReference {
  const currentRuntime = recordField(guard, "current_runtime_fixture");
  const historicalAnchors = arrayField(guard, "historical_receipt_retention")
    .filter((entry): entry is JsonObject => typeof entry === "object" && entry !== null && !Array.isArray(entry));
  const requiredChecks = stringArrayField(guard, "required_checks");
  const boundaries = stringArrayField(guard, "boundaries");
  const evidencePresent = fileById(files, "mini-kv-v100-runbook").exists
    && fileById(files, "mini-kv-v100-walkthrough").exists
    && fileById(files, "mini-kv-v100-rolling-guard").exists
    && fileById(files, "mini-kv-runtime-smoke").exists
    && fileById(files, "mini-kv-verification-manifest").exists;
  const guardVersion = stringField(guard, "guard_version") ?? "";
  const projectVersion = stringField(guard, "project_version") ?? "";
  const releaseVersion = stringField(guard, "release_version") ?? "";
  const consumerHint = stringField(guard, "consumer_hint") ?? "";
  const readOnly = booleanField(guard, "read_only") ?? false;
  const executionAllowed = booleanField(guard, "execution_allowed") ?? true;
  const restoreExecutionAllowed = booleanField(guard, "restore_execution_allowed") ?? true;
  const orderAuthoritative = booleanField(guard, "order_authoritative") ?? true;
  const historicalReceiptAnchorsStable = historicalAnchors.length >= 9
    && historicalAnchors.every((entry) => booleanField(entry, "must_remain_stable") === true
      && typeof stringField(entry, "historical_digest") === "string"
      && typeof stringField(entry, "consumed_release_version") === "string");
  const requiredChecksMentionNodeV235 = requiredChecks.some((check) =>
    check.includes("Node v235") || check.includes("Node v237") || check.includes("Node v239"));
  const guardStillCompatibleWithManualSandboxIntake = acceptedMiniKvCurrentRuntimeGuard({
    projectVersion,
    releaseVersion,
    consumerHint,
  });
  const boundariesForbidExecution = boundaries.includes("no LOAD/COMPACT/RESTORE/SETNXEX execution")
    && boundaries.includes("no managed audit storage backend")
    && boundaries.includes("no credential value read")
    && boundaries.includes("no schema rehearsal execution")
    && boundaries.includes("no Node, Java, or mini-kv auto-start permission")
    && boundaries.includes("not Java order authority");

  return {
    sourceVersion: "mini-kv v100",
    headTag: "第一百版运行证据滚动守卫",
    runbookPath: MINI_KV_V100_RUNBOOK,
    walkthroughPath: MINI_KV_V100_WALKTHROUGH,
    guardPath: MINI_KV_V100_ROLLING_GUARD,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent,
    guardVersion,
    projectVersion,
    releaseVersion,
    consumerHint,
    currentArtifactPathHint: stringField(currentRuntime, "current_artifact_path_hint") ?? "",
    currentLiveReadSessionEcho: stringField(currentRuntime, "current_live_read_session_echo") ?? "",
    readOnly,
    executionAllowed,
    restoreExecutionAllowed,
    orderAuthoritative,
    historicalReceiptAnchorCount: historicalAnchors.length,
    historicalReceiptAnchorsStable,
    requiredChecksMentionNodeV235,
    boundariesForbidExecution,
    readyForNodeV235Intake: evidencePresent
      && guardVersion === "mini-kv-current-runtime-fixture-rolling-guard.v1"
      && guardStillCompatibleWithManualSandboxIntake
      && readOnly
      && !executionAllowed
      && !restoreExecutionAllowed
      && !orderAuthoritative
      && historicalReceiptAnchorsStable
      && requiredChecksMentionNodeV235
      && boundariesForbidExecution
      && snippetMatched(snippets, "mini-kv-v100-not-permission"),
  };
}

function acceptedMiniKvCurrentRuntimeGuard(input: {
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
}): boolean {
  return ACCEPTED_MINI_KV_CURRENT_RUNTIME_GUARDS.some((guard) =>
    guard.projectVersion === input.projectVersion
    && guard.releaseVersion === input.releaseVersion
    && guard.consumerHint === input.consumerHint);
}

function createPreconditionIntake(
  sourceNodeV234: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
  javaV91: JavaV91SandboxConnectionPreconditionReceiptReference,
  miniKvV100: MiniKvV100RollingRuntimeFixtureGuardReference,
): ManagedAuditManualSandboxConnectionPreconditionIntakeProfile["preconditionIntake"] {
  const requiredPreconditionCount = 6;
  const documentedPreconditionCount = [
    javaV91.ownerApprovalArtifactRequired,
    javaV91.credentialHandleReviewRequired,
    javaV91.schemaRehearsalEvidenceRequired,
    javaV91.rollbackPathRequired,
    javaV91.timeoutBudgetRequired,
    javaV91.manualAbortMarkerRequired,
  ].filter(Boolean).length;
  const base = {
    markerSpan: "Node v234 + Java v91 + mini-kv v100" as const,
    intakeMode: "manual-sandbox-connection-precondition-intake-only" as const,
    requiredPreconditionCount,
    documentedPreconditionCount,
    handlesOnly: true as const,
    ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID" as const,
    credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE" as const,
    schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID" as const,
    rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID" as const,
    manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT" as const,
    timeoutBudgetMs: 15000 as const,
    actualConnectionAttempted: false as const,
    credentialValueRead: false as const,
    schemaMigrationExecuted: false as const,
    managedAuditStateWritten: false as const,
    upstreamServiceAutoStarted: false as const,
    miniKvExecutionPermissionInferred: false as const,
    readyForDryRunRequestEnvelope: sourceNodeV234.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal
      && javaV91.readyForNodeV235Intake
      && miniKvV100.readyForNodeV235Intake
      && documentedPreconditionCount === requiredPreconditionCount,
  };

  return {
    ...base,
    intakeDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-precondition-intake.v1",
      sourceNodeV234Digest: sourceNodeV234.blockedExecutionRehearsal.rehearsalDigest,
      javaV91,
      miniKvV100,
      preconditionFields: {
        ownerApprovalArtifactIdField: base.ownerApprovalArtifactIdField,
        credentialHandleNameField: base.credentialHandleNameField,
        schemaRehearsalIdField: base.schemaRehearsalIdField,
        rollbackPathIdField: base.rollbackPathIdField,
        timeoutBudgetMs: base.timeoutBudgetMs,
        manualAbortMarkerField: base.manualAbortMarkerField,
      },
    }),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV234: ManagedAuditManualSandboxConnectionBlockedExecutionRehearsalProfile,
  javaV91: JavaV91SandboxConnectionPreconditionReceiptReference,
  miniKvV100: MiniKvV100RollingRuntimeFixtureGuardReference,
  intake: ManagedAuditManualSandboxConnectionPreconditionIntakeProfile["preconditionIntake"],
): ManualSandboxPreconditionIntakeChecks {
  return {
    sourceNodeV234BlockedExecutionRehearsalReady:
      sourceNodeV234.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal
      && sourceNodeV234.rehearsalState === "manual-sandbox-connection-blocked-execution-rehearsal-ready",
    sourceNodeV234DigestPresent: SHA256_HEX.test(sourceNodeV234.blockedExecutionRehearsal.rehearsalDigest),
    sourceNodeV234StillBlocksAllDangerousOperations:
      sourceNodeV234.summary.simulatedAttemptCount === 8
      && sourceNodeV234.summary.blockedAttemptCount === 8
      && sourceNodeV234.summary.actualExecutionAttemptCount === 0
      && !sourceNodeV234.readyForManagedAuditSandboxAdapterConnection
      && !sourceNodeV234.connectsManagedAudit
      && !sourceNodeV234.readsManagedAuditCredential,
    javaV91EvidencePresent: javaV91.evidencePresent,
    javaV91PreconditionsAccepted: javaV91.readyForNodeV235Intake,
    javaV91BoundaryAccepted: !javaV91.ownerApprovalArtifactProvidedByJava
      && !javaV91.credentialValueReadByJava
      && !javaV91.schemaMigrationSqlExecutedByJava
      && !javaV91.externalManagedAuditConnectionOpenedByJava
      && !javaV91.actualConnectionAttemptedByJava
      && !javaV91.approvalLedgerWrittenByJava,
    miniKvV100EvidencePresent: miniKvV100.evidencePresent,
    miniKvV100RollingGuardAccepted: miniKvV100.readyForNodeV235Intake,
    miniKvV100RuntimeBoundaryAccepted: miniKvV100.readOnly
      && !miniKvV100.executionAllowed
      && !miniKvV100.restoreExecutionAllowed
      && !miniKvV100.orderAuthoritative
      && miniKvV100.historicalReceiptAnchorsStable
      && miniKvV100.boundariesForbidExecution,
    requiredPreconditionsDocumented: intake.documentedPreconditionCount === intake.requiredPreconditionCount,
    handlesOnlyIntake: intake.handlesOnly,
    noConnectionAttempted: !intake.actualConnectionAttempted,
    noCredentialValueRead: !intake.credentialValueRead,
    noSchemaMigrationExecuted: !intake.schemaMigrationExecuted,
    noManagedAuditStateWritten: !intake.managedAuditStateWritten,
    noUpstreamServiceAutoStarted: !intake.upstreamServiceAutoStarted,
    noMiniKvExecutionPermissionInferred: !intake.miniKvExecutionPermissionInferred,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPreconditionIntake: false,
  };
}

function createEvidenceFiles(): PreconditionIntakeEvidenceFile[] {
  return [
    evidenceFile("java-v91-runbook", JAVA_V91_RUNBOOK),
    evidenceFile("java-v91-walkthrough", JAVA_V91_WALKTHROUGH),
    evidenceFile("java-v91-builder-source", JAVA_V91_BUILDER_SOURCE),
    evidenceFile("mini-kv-v100-runbook", MINI_KV_V100_RUNBOOK),
    evidenceFile("mini-kv-v100-walkthrough", MINI_KV_V100_WALKTHROUGH),
    evidenceFile("mini-kv-v100-rolling-guard", MINI_KV_V100_ROLLING_GUARD),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): PreconditionIntakeSnippetMatch[] {
  return [
    snippet("java-v91-ready-for-node-v235", JAVA_V91_BUILDER_SOURCE, "readyForNodeV235ManualSandboxConnectionPreconditionIntake"),
    snippet("java-v91-consumes-node-v234", JAVA_V91_BUILDER_SOURCE, "consumedByNodeBlockedExecutionRehearsalProfile"),
    snippet("java-v91-owner-artifact-field", JAVA_V91_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"),
    snippet("java-v91-credential-handle-field", JAVA_V91_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("java-v91-schema-rehearsal-field", JAVA_V91_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"),
    snippet("java-v91-rollback-path-field", JAVA_V91_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"),
    snippet("java-v91-manual-abort-field", JAVA_V91_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"),
    snippet("java-v91-timeout-budget", JAVA_V91_BUILDER_SOURCE, "TIMEOUT_BUDGET_MS = 15000"),
    snippet("java-v91-no-connection", JAVA_V91_BUILDER_SOURCE, "Open a managed audit sandbox connection during Java v91 precondition receipt"),
    snippet("java-v91-no-credential", JAVA_V91_BUILDER_SOURCE, "Read or print a managed audit credential value during Java v91 precondition receipt"),
    snippet("java-v91-no-sql", JAVA_V91_BUILDER_SOURCE, "Execute schema migration SQL during Java v91 precondition receipt"),
    snippet("java-v91-no-ledger", JAVA_V91_BUILDER_SOURCE, "Write approval ledger or managed audit state during Java v91 precondition receipt"),
    snippet("java-v91-walkthrough-intake", JAVA_V91_WALKTHROUGH, "Node v235 的 precondition intake"),
    snippet("mini-kv-v100-node-v235", MINI_KV_V100_ROLLING_GUARD, "Node v235 manual sandbox connection precondition intake"),
    snippet("mini-kv-v100-not-permission", MINI_KV_V100_WALKTHROUGH, "not a new execution entry point"),
    snippet("mini-kv-v100-current-roll", MINI_KV_V100_ROLLING_GUARD, "current runtime fixture may roll by release"),
    snippet("mini-kv-v100-historical-stable", MINI_KV_V100_ROLLING_GUARD, "historical consumed receipt digests must remain stable"),
    snippet("mini-kv-v100-no-autostart", MINI_KV_V100_ROLLING_GUARD, "no Node, Java, or mini-kv auto-start permission"),
  ];
}

function collectProductionBlockers(checks: ManualSandboxPreconditionIntakeChecks): ManualSandboxPreconditionIntakeMessage[] {
  const blockers: ManualSandboxPreconditionIntakeMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV234BlockedExecutionRehearsalReady, "NODE_V234_BLOCKED_EXECUTION_REHEARSAL_NOT_READY", "node-v234-blocked-execution-rehearsal", "Node v234 blocked execution rehearsal must be ready before v235 precondition intake.");
  addBlocker(blockers, checks.sourceNodeV234StillBlocksAllDangerousOperations, "NODE_V234_DANGEROUS_OPERATION_BOUNDARY_DRIFTED", "node-v234-blocked-execution-rehearsal", "Node v234 must still block all dangerous operations and keep actual execution count at zero.");
  addBlocker(blockers, checks.javaV91PreconditionsAccepted, "JAVA_V91_PRECONDITION_RECEIPT_NOT_ACCEPTED", "java-v91-precondition-receipt", "Java v91 precondition receipt must list required handles and keep no-connection/no-credential/no-SQL boundaries.");
  addBlocker(blockers, checks.miniKvV100RollingGuardAccepted, "MINIKV_V100_ROLLING_GUARD_NOT_ACCEPTED", "mini-kv-v100-rolling-runtime-guard", "mini-kv v100 rolling guard must allow current evidence to roll while preserving historical anchors and no-execution boundaries.");
  addBlocker(blockers, checks.requiredPreconditionsDocumented, "REQUIRED_PRECONDITIONS_MISSING", "managed-audit-manual-sandbox-connection-precondition-intake", "All six manual sandbox connection preconditions must be documented as handles or marker ids.");
  addBlocker(blockers, checks.handlesOnlyIntake, "PRECONDITION_INTAKE_NOT_HANDLES_ONLY", "managed-audit-manual-sandbox-connection-precondition-intake", "v235 may ingest handle names and marker ids only.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

function collectWarnings(): ManualSandboxPreconditionIntakeMessage[] {
  return [
    {
      code: "PRECONDITION_INTAKE_IS_NOT_CONNECTION_APPROVAL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-precondition-intake",
      message: "The profile documents required handles and markers only; it is not approval to open a managed audit sandbox connection.",
    },
    {
      code: "CREDENTIAL_HANDLE_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-precondition-intake",
      message: "Credential evidence remains a handle/review field; credential values must not be read, logged, or stored.",
    },
  ];
}

function collectRecommendations(): ManualSandboxPreconditionIntakeMessage[] {
  return [
    {
      code: "NEXT_NODE_V236_DRY_RUN_REQUEST_ENVELOPE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precondition-intake",
      message: "Use the next Node version to build a dry-run request envelope from owner artifact id, credential handle, schema rehearsal id, rollback path, timeout budget, and abort marker.",
    },
    {
      code: "KEEP_REAL_CONNECTION_PAUSED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precondition-intake",
      message: "Do not attempt a real sandbox connection until the dry-run envelope has an operator-reviewed manual window.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): PreconditionIntakeEvidenceFile {
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

function snippet(id: string, filePath: string, expectedText: string): PreconditionIntakeSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function addBlocker(
  messages: ManualSandboxPreconditionIntakeMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxPreconditionIntakeMessage["source"],
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

function renderEvidenceFile(file: PreconditionIntakeEvidenceFile): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: PreconditionIntakeSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}

function fileById(files: PreconditionIntakeEvidenceFile[], id: string): PreconditionIntakeEvidenceFile {
  const file = files.find((entry) => entry.id === id);
  if (!file) {
    throw new Error(`Missing evidence file descriptor: ${id}`);
  }
  return file;
}

function snippetMatched(snippets: PreconditionIntakeSnippetMatch[], id: string): boolean {
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

function stringArrayField(record: JsonObject, field: string): string[] {
  const value = record[field];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}
