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
  loadManagedAuditManualSandboxAdapterConnectionRunbook,
  type ManagedAuditManualSandboxAdapterConnectionRunbookProfile,
} from "./managedAuditManualSandboxAdapterConnectionRunbook.js";

export interface ManagedAuditManualSandboxConnectionEvidenceChecklistProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1";
  checklistState: "manual-sandbox-connection-evidence-checklist-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionEvidenceChecklist: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyChecklist: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV226: {
    sourceVersion: "Node v226";
    profileVersion: ManagedAuditManualSandboxAdapterConnectionRunbookProfile["profileVersion"];
    runbookState: ManagedAuditManualSandboxAdapterConnectionRunbookProfile["runbookState"];
    runbookDigest: string;
    readyForRunbook: boolean;
    readyForConnectionFromSource: false;
    checklistStepCount: number;
    forbiddenOperationCount: number;
    pauseConditionCount: number;
    failureClassCount: number;
  };
  upstreamEvidence: {
    javaV86: JavaV86EvidenceReference;
    miniKvV95: MiniKvV95EvidenceReference;
  };
  evidenceFiles: ChecklistEvidenceFile[];
  snippetMatches: ChecklistSnippetMatch[];
  evidenceChecklist: ManualSandboxEvidenceChecklistItem[];
  verification: {
    checklistDigest: string;
    sourceRunbookDigest: string;
    evidenceSpan: "Node v226 + Java v86 + mini-kv v95";
    verificationMode: "manual-sandbox-evidence-checklist-only";
    javaAndMiniKvConsumed: true;
    connectionExecutionAllowed: false;
    credentialValueRequired: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    automaticServiceStartAllowed: false;
    nodeV227BlocksRealConnection: true;
  };
  checks: ManualSandboxEvidenceChecklistChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    checklistItemCount: number;
    requiredChecklistItemCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxEvidenceChecklistMessage[];
  warnings: ManualSandboxEvidenceChecklistMessage[];
  recommendations: ManualSandboxEvidenceChecklistMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionEvidenceChecklistJson: string;
    manualSandboxConnectionEvidenceChecklistMarkdown: string;
    sourceNodeV226Json: string;
    javaV86Runbook: string;
    miniKvV95Runbook: string;
    miniKvRuntimeSmokeEvidence: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV86EvidenceReference {
  sourceVersion: "Java v86";
  headTag: "v86订单平台release-approval-rehearsal-internal-boolean-flags";
  runbookPath: string;
  walkthroughPath: string;
  evidencePresent: boolean;
  contractPreservingRefactor: boolean;
  builderFlagsApplied: boolean;
  responseShapeUnchanged: boolean;
  schemaVersionUnchanged: boolean;
  noLedgerWriteBoundary: boolean;
  noSqlBoundary: boolean;
  noCredentialBoundary: boolean;
  readyForNodeV227EvidenceChecklist: boolean;
}

interface MiniKvV95EvidenceReference {
  sourceVersion: "mini-kv v95";
  headTag: "第九十五版字符串工具共享拆分";
  runbookPath: string;
  walkthroughPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  projectVersion: string;
  releaseVersion: string;
  currentArtifactPathHint: string;
  receiptDigest: string;
  preservedV95ReceiptDigest: string;
  stringUtilsSharedSplit: boolean;
  commandCppUnderOneThousandLines: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  sandboxAdapterStorageBackend: boolean;
  credentialValueReadAllowed: boolean;
  sandboxManagedAuditStateWriteAllowed: boolean;
  readyForNodeV227EvidenceChecklist: boolean;
}

interface ChecklistEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface ChecklistSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

interface ManualSandboxEvidenceChecklistItem {
  id: string;
  owner: "node" | "java" | "mini-kv" | "release-owner" | "security-reviewer";
  sourceVersion: "Node v226" | "Java v86" | "mini-kv v95" | "cross-project";
  required: true;
  evidence: string;
  verified: boolean;
  blocksConnectionWhenMissing: true;
}

type ManualSandboxEvidenceChecklistChecks = {
  sourceNodeV226RunbookReady: boolean;
  sourceNodeV226StillBlocksConnection: boolean;
  javaV86EvidencePresent: boolean;
  javaV86ContractPreservingRefactorAccepted: boolean;
  javaV86NoWriteNoSqlNoCredentialBoundaryAccepted: boolean;
  miniKvV95EvidencePresent: boolean;
  miniKvV95RuntimeFixtureAccepted: boolean;
  miniKvV95SandboxNonStorageBoundaryAccepted: boolean;
  miniKvV95QualitySplitAccepted: boolean;
  evidenceChecklistComplete: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionEvidenceChecklist: boolean;
};

interface ManualSandboxEvidenceChecklistMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-evidence-checklist"
    | "node-v226-runbook"
    | "java-v86-evidence"
    | "mini-kv-v95-evidence"
    | "runtime-config";
  message: string;
}

interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  managed_audit_sandbox_adapter_non_participation_receipt?: Record<string, unknown>;
  managed_audit_sandbox_connection_receipt_echo_marker?: Record<string, unknown>;
}

const JAVA_V86_RUNBOOK = "D:/javaproj/advanced-order-platform/c/86/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V86_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/89-version-86-release-approval-rehearsal-internal-boolean-flags.md";
const MINI_KV_V95_RUNBOOK = "D:/C/mini-kv/c/95/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V95_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/151-version-95-string-utils-and-version-sweep.md";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionEvidenceChecklistJson: "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist",
  manualSandboxConnectionEvidenceChecklistMarkdown: "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist?format=markdown",
  sourceNodeV226Json: "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook",
  javaV86Runbook: JAVA_V86_RUNBOOK,
  miniKvV95Runbook: MINI_KV_V95_RUNBOOK,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  activePlan: "docs/plans/v225-post-sandbox-package-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionEvidenceChecklist(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionEvidenceChecklistProfile {
  const sourceRunbook = loadManagedAuditManualSandboxAdapterConnectionRunbook({ config: input.config });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const miniKvEvidence = readMiniKvRuntimeSmokeEvidence();
  const javaV86 = createJavaV86Reference(evidenceFiles, snippetMatches);
  const miniKvV95 = createMiniKvV95Reference(evidenceFiles, snippetMatches, miniKvEvidence);
  const evidenceChecklist = createEvidenceChecklist(sourceRunbook, javaV86, miniKvV95);
  const checks = createChecks(input.config, sourceRunbook, javaV86, miniKvV95, evidenceChecklist);
  checks.readyForManagedAuditManualSandboxConnectionEvidenceChecklist = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionEvidenceChecklist")
    .every(([, value]) => value);
  const checklistState = checks.readyForManagedAuditManualSandboxConnectionEvidenceChecklist
    ? "manual-sandbox-connection-evidence-checklist-ready"
    : "blocked";
  const verification = createVerification(sourceRunbook, evidenceChecklist, javaV86, miniKvV95);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection evidence checklist",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1",
    checklistState,
    readyForManagedAuditManualSandboxConnectionEvidenceChecklist: checks.readyForManagedAuditManualSandboxConnectionEvidenceChecklist,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyChecklist: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV226: {
      sourceVersion: "Node v226",
      profileVersion: sourceRunbook.profileVersion,
      runbookState: sourceRunbook.runbookState,
      runbookDigest: sourceRunbook.manualRunbook.runbookDigest,
      readyForRunbook: sourceRunbook.readyForManagedAuditManualSandboxAdapterConnectionRunbook,
      readyForConnectionFromSource: sourceRunbook.readyForManagedAuditSandboxAdapterConnection,
      checklistStepCount: sourceRunbook.summary.checklistStepCount,
      forbiddenOperationCount: sourceRunbook.summary.forbiddenOperationCount,
      pauseConditionCount: sourceRunbook.summary.pauseConditionCount,
      failureClassCount: sourceRunbook.summary.failureClassCount,
    },
    upstreamEvidence: {
      javaV86,
      miniKvV95,
    },
    evidenceFiles,
    snippetMatches,
    evidenceChecklist,
    verification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: evidenceFiles.length,
      matchedSnippetCount: snippetMatches.filter((snippet) => snippet.matched).length,
      checklistItemCount: evidenceChecklist.length,
      requiredChecklistItemCount: evidenceChecklist.filter((item) => item.required).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v227 as a readiness checklist only; do not open a sandbox managed audit connection from this profile.",
      "Start a new post-v227 plan before any real sandbox adapter connection candidate is implemented.",
      "Keep credential values outside Node archives; only handles and owner artifact ids may appear.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown(
  profile: ManagedAuditManualSandboxConnectionEvidenceChecklistProfile,
): string {
  return [
    "# Managed audit manual sandbox connection evidence checklist",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Checklist state: ${profile.checklistState}`,
    `- Ready for evidence checklist: ${profile.readyForManagedAuditManualSandboxConnectionEvidenceChecklist}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v226",
    "",
    ...renderEntries(profile.sourceNodeV226),
    "",
    "## Java v86 Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.javaV86),
    "",
    "## mini-kv v95 Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.miniKvV95),
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Evidence Files",
    "",
    ...profile.evidenceFiles.flatMap(renderEvidenceFile),
    "## Snippet Matches",
    "",
    ...profile.snippetMatches.flatMap(renderSnippet),
    "## Evidence Checklist",
    "",
    ...profile.evidenceChecklist.flatMap(renderChecklistItem),
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
    ...renderMessages(profile.productionBlockers, "No manual sandbox evidence checklist blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox evidence checklist warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox evidence checklist recommendations."),
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

function createJavaV86Reference(
  evidenceFiles: ChecklistEvidenceFile[],
  snippets: ChecklistSnippetMatch[],
): JavaV86EvidenceReference {
  const reference: JavaV86EvidenceReference = {
    sourceVersion: "Java v86",
    headTag: "v86订单平台release-approval-rehearsal-internal-boolean-flags",
    runbookPath: JAVA_V86_RUNBOOK,
    walkthroughPath: JAVA_V86_WALKTHROUGH,
    evidencePresent: fileById(evidenceFiles, "java-v86-runbook").exists
      && fileById(evidenceFiles, "java-v86-walkthrough").exists,
    contractPreservingRefactor: snippetMatched(snippets, "java-v86-contract-preserving"),
    builderFlagsApplied: snippetMatched(snippets, "java-v86-builder-flags"),
    responseShapeUnchanged: snippetMatched(snippets, "java-v86-response-shape"),
    schemaVersionUnchanged: snippetMatched(snippets, "java-v86-schema-version"),
    noLedgerWriteBoundary: snippetMatched(snippets, "java-v86-no-ledger-write"),
    noSqlBoundary: snippetMatched(snippets, "java-v86-no-sql"),
    noCredentialBoundary: snippetMatched(snippets, "java-v86-no-credential"),
    readyForNodeV227EvidenceChecklist: false,
  };
  return {
    ...reference,
    readyForNodeV227EvidenceChecklist: reference.evidencePresent
      && reference.contractPreservingRefactor
      && reference.builderFlagsApplied
      && reference.responseShapeUnchanged
      && reference.schemaVersionUnchanged
      && reference.noLedgerWriteBoundary
      && reference.noSqlBoundary
      && reference.noCredentialBoundary,
  };
}

function createMiniKvV95Reference(
  evidenceFiles: ChecklistEvidenceFile[],
  snippets: ChecklistSnippetMatch[],
  evidence: MiniKvRuntimeSmokeEvidence,
): MiniKvV95EvidenceReference {
  const receipt = evidence.managed_audit_sandbox_adapter_non_participation_receipt ?? {};
  const connectionMarker = evidence.managed_audit_sandbox_connection_receipt_echo_marker ?? {};
  const reference: MiniKvV95EvidenceReference = {
    sourceVersion: "mini-kv v95",
    headTag: "第九十五版字符串工具共享拆分",
    runbookPath: MINI_KV_V95_RUNBOOK,
    walkthroughPath: MINI_KV_V95_WALKTHROUGH,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v95-runbook").exists
      && fileById(evidenceFiles, "mini-kv-v95-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-verification-manifest").exists,
    projectVersion: stringField(evidence, "project_version") ?? "missing",
    releaseVersion: stringField(evidence, "release_version") ?? "missing",
    currentArtifactPathHint: stringField(receipt, "current_artifact_path_hint") ?? "missing",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
    preservedV95ReceiptDigest: stringField(connectionMarker, "consumed_receipt_digest") ?? "missing",
    stringUtilsSharedSplit: snippetMatched(snippets, "mini-kv-v95-string-utils"),
    commandCppUnderOneThousandLines: snippetMatched(snippets, "mini-kv-v95-command-lines"),
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    sandboxAdapterStorageBackend: booleanField(receipt, "sandbox_adapter_storage_backend") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(receipt, "sandbox_managed_audit_state_write_allowed") ?? true,
    readyForNodeV227EvidenceChecklist: false,
  };
  return {
    ...reference,
    readyForNodeV227EvidenceChecklist: reference.evidencePresent
      && reference.projectVersion === "0.96.0"
      && reference.releaseVersion === "v96"
      && reference.currentArtifactPathHint === "c/96/"
      && reference.receiptDigest === "fnv1a64:e3693d38283c37e2"
      && reference.preservedV95ReceiptDigest === "fnv1a64:ceaed265f7f9560c"
      && reference.stringUtilsSharedSplit
      && reference.commandCppUnderOneThousandLines
      && reference.readOnly
      && !reference.executionAllowed
      && !reference.sandboxAdapterStorageBackend
      && !reference.credentialValueReadAllowed
      && !reference.sandboxManagedAuditStateWriteAllowed,
  };
}

function createEvidenceChecklist(
  sourceRunbook: ManagedAuditManualSandboxAdapterConnectionRunbookProfile,
  javaV86: JavaV86EvidenceReference,
  miniKvV95: MiniKvV95EvidenceReference,
): ManualSandboxEvidenceChecklistItem[] {
  return [
    item("node-v226-runbook-digest", "node", "Node v226", `Runbook digest ${sourceRunbook.manualRunbook.runbookDigest} is available and archived.`, sourceRunbook.readyForManagedAuditManualSandboxAdapterConnectionRunbook),
    item("node-v226-connection-blocked", "node", "Node v226", "Node v226 still reports readyForManagedAuditSandboxAdapterConnection=false.", sourceRunbook.readyForManagedAuditSandboxAdapterConnection === false),
    item("java-v86-evidence-present", "java", "Java v86", "Java v86 runbook and walkthrough are present.", javaV86.evidencePresent),
    item("java-v86-contract-preserving", "java", "Java v86", "Java v86 says response shape, schema, proof claims, no-ledger/no-SQL/no-credential boundaries remain unchanged.", javaV86.readyForNodeV227EvidenceChecklist),
    item("mini-kv-v95-evidence-present", "mini-kv", "mini-kv v95", "mini-kv v95 runbook, walkthrough, runtime smoke, and manifest are present.", miniKvV95.evidencePresent),
    item("mini-kv-v95-sandbox-non-storage", "mini-kv", "mini-kv v95", "mini-kv v95 runtime evidence keeps sandbox_adapter_storage_backend=false and credential_value_read_allowed=false.", miniKvV95.readyForNodeV227EvidenceChecklist),
    item("credential-handle-only", "security-reviewer", "cross-project", "Checklist still requires credential handles only, never credential values.", true),
    item("manual-window-only", "release-owner", "cross-project", "Checklist does not open a sandbox connection; it only prepares evidence for a later manual window.", true),
  ];
}

function createVerification(
  sourceRunbook: ManagedAuditManualSandboxAdapterConnectionRunbookProfile,
  evidenceChecklist: ManualSandboxEvidenceChecklistItem[],
  javaV86: JavaV86EvidenceReference,
  miniKvV95: MiniKvV95EvidenceReference,
): ManagedAuditManualSandboxConnectionEvidenceChecklistProfile["verification"] {
  return {
    checklistDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1",
      sourceRunbookDigest: sourceRunbook.manualRunbook.runbookDigest,
      javaV86,
      miniKvV95,
      evidenceChecklist,
    }),
    sourceRunbookDigest: sourceRunbook.manualRunbook.runbookDigest,
    evidenceSpan: "Node v226 + Java v86 + mini-kv v95",
    verificationMode: "manual-sandbox-evidence-checklist-only",
    javaAndMiniKvConsumed: true,
    connectionExecutionAllowed: false,
    credentialValueRequired: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    automaticServiceStartAllowed: false,
    nodeV227BlocksRealConnection: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceRunbook: ManagedAuditManualSandboxAdapterConnectionRunbookProfile,
  javaV86: JavaV86EvidenceReference,
  miniKvV95: MiniKvV95EvidenceReference,
  evidenceChecklist: ManualSandboxEvidenceChecklistItem[],
): ManualSandboxEvidenceChecklistChecks {
  return {
    sourceNodeV226RunbookReady: sourceRunbook.readyForManagedAuditManualSandboxAdapterConnectionRunbook
      && sourceRunbook.runbookState === "manual-sandbox-connection-runbook-ready",
    sourceNodeV226StillBlocksConnection: !sourceRunbook.readyForManagedAuditSandboxAdapterConnection
      && !sourceRunbook.connectsManagedAudit
      && !sourceRunbook.readsManagedAuditCredential,
    javaV86EvidencePresent: javaV86.evidencePresent,
    javaV86ContractPreservingRefactorAccepted: javaV86.contractPreservingRefactor
      && javaV86.builderFlagsApplied
      && javaV86.responseShapeUnchanged
      && javaV86.schemaVersionUnchanged,
    javaV86NoWriteNoSqlNoCredentialBoundaryAccepted: javaV86.noLedgerWriteBoundary
      && javaV86.noSqlBoundary
      && javaV86.noCredentialBoundary,
    miniKvV95EvidencePresent: miniKvV95.evidencePresent,
    miniKvV95RuntimeFixtureAccepted: miniKvV95.projectVersion === "0.96.0"
      && miniKvV95.releaseVersion === "v96"
      && miniKvV95.currentArtifactPathHint === "c/96/"
      && miniKvV95.receiptDigest === "fnv1a64:e3693d38283c37e2"
      && miniKvV95.preservedV95ReceiptDigest === "fnv1a64:ceaed265f7f9560c",
    miniKvV95SandboxNonStorageBoundaryAccepted: miniKvV95.readOnly
      && !miniKvV95.executionAllowed
      && !miniKvV95.sandboxAdapterStorageBackend
      && !miniKvV95.credentialValueReadAllowed
      && !miniKvV95.sandboxManagedAuditStateWriteAllowed,
    miniKvV95QualitySplitAccepted: miniKvV95.stringUtilsSharedSplit
      && miniKvV95.commandCppUnderOneThousandLines,
    evidenceChecklistComplete: evidenceChecklist.length >= 8
      && evidenceChecklist.every((entry) => entry.required && entry.verified),
    credentialValueStillForbidden: true,
    schemaMigrationStillBlocked: true,
    externalConnectionStillBlocked: true,
    managedAuditWritesStillBlocked: true,
    automaticServiceStartStillBlocked: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionEvidenceChecklist: false,
  };
}

function createEvidenceFiles(): ChecklistEvidenceFile[] {
  return [
    evidenceFile("java-v86-runbook", JAVA_V86_RUNBOOK),
    evidenceFile("java-v86-walkthrough", JAVA_V86_WALKTHROUGH),
    evidenceFile("mini-kv-v95-runbook", MINI_KV_V95_RUNBOOK),
    evidenceFile("mini-kv-v95-walkthrough", MINI_KV_V95_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): ChecklistSnippetMatch[] {
  return [
    snippet("java-v86-contract-preserving", JAVA_V86_WALKTHROUGH, "纯重构版本"),
    snippet("java-v86-builder-flags", JAVA_V86_WALKTHROUGH, "flags record"),
    snippet("java-v86-response-shape", JAVA_V86_WALKTHROUGH, "response shape 不变"),
    snippet("java-v86-schema-version", JAVA_V86_WALKTHROUGH, "schema version 不变"),
    snippet("java-v86-no-ledger-write", JAVA_V86_RUNBOOK, "no-ledger-write proof"),
    snippet("java-v86-no-sql", JAVA_V86_RUNBOOK, "no-SQL"),
    snippet("java-v86-no-credential", JAVA_V86_RUNBOOK, "no-credential flags"),
    snippet("mini-kv-v95-string-utils", MINI_KV_V95_WALKTHROUGH, "include/minikv/string_utils.hpp"),
    snippet("mini-kv-v95-command-lines", MINI_KV_V95_WALKTHROUGH, "`src/command.cpp` 557"),
    snippet("mini-kv-v95-runtime-version", MINI_KV_RUNTIME_SMOKE, "\"release_version\":\"v96\""),
    snippet("mini-kv-v95-receipt-digest", MINI_KV_RUNTIME_SMOKE, "\"consumed_receipt_digest\":\"fnv1a64:ceaed265f7f9560c\""),
    snippet("mini-kv-v95-no-storage", MINI_KV_RUNTIME_SMOKE, "\"sandbox_adapter_storage_backend\":false"),
    snippet("mini-kv-v95-no-credential", MINI_KV_RUNTIME_SMOKE, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v95-no-write", MINI_KV_RUNTIME_SMOKE, "\"sandbox_managed_audit_state_write_allowed\":false"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxEvidenceChecklistChecks,
): ManualSandboxEvidenceChecklistMessage[] {
  const blockers: ManualSandboxEvidenceChecklistMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV226RunbookReady, "NODE_V226_RUNBOOK_NOT_READY", "node-v226-runbook", "Node v226 runbook must be ready before v227 evidence checklist.");
  addBlocker(blockers, checks.javaV86EvidencePresent, "JAVA_V86_EVIDENCE_MISSING", "java-v86-evidence", "Java v86 runbook and walkthrough must be present.");
  addBlocker(blockers, checks.javaV86ContractPreservingRefactorAccepted, "JAVA_V86_REFACTOR_NOT_ACCEPTED", "java-v86-evidence", "Java v86 must prove contract-preserving flags refactor.");
  addBlocker(blockers, checks.miniKvV95EvidencePresent, "MINIKV_V95_EVIDENCE_MISSING", "mini-kv-v95-evidence", "mini-kv v95 evidence files must be present.");
  addBlocker(blockers, checks.miniKvV95RuntimeFixtureAccepted, "MINIKV_V95_RUNTIME_FIXTURE_NOT_ACCEPTED", "mini-kv-v95-evidence", "mini-kv current runtime smoke fixture must expose v96 evidence while preserving the v95 sandbox connection receipt digest.");
  addBlocker(blockers, checks.evidenceChecklistComplete, "EVIDENCE_CHECKLIST_INCOMPLETE", "managed-audit-manual-sandbox-connection-evidence-checklist", "All evidence checklist items must be verified.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-evidence-checklist", "v227 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): ManualSandboxEvidenceChecklistMessage[] {
  return [
    {
      code: "CHECKLIST_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-evidence-checklist",
      message: "This profile verifies evidence completeness only; it does not connect to managed audit.",
    },
    {
      code: "MINIKV_V95_IS_QUALITY_SWEEP",
      severity: "warning",
      source: "mini-kv-v95-evidence",
      message: "mini-kv v95 is a shared string utility and version sweep; v227 consumes its current runtime receipt plus the preserved sandbox non-storage boundary.",
    },
  ];
}

function collectRecommendations(): ManualSandboxEvidenceChecklistMessage[] {
  return [
    {
      code: "START_POST_V227_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-evidence-checklist",
      message: "Open a new plan before implementing any sandbox adapter connection candidate.",
    },
    {
      code: "KEEP_SANDBOX_CONNECTION_MANUAL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-evidence-checklist",
      message: "Keep sandbox connection attempts manual, credential-handle-only, and separated from production audit.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): ChecklistEvidenceFile {
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

function snippet(id: string, filePath: string, expectedText: string): ChecklistSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function item(
  id: string,
  owner: ManualSandboxEvidenceChecklistItem["owner"],
  sourceVersion: ManualSandboxEvidenceChecklistItem["sourceVersion"],
  evidence: string,
  verified: boolean,
): ManualSandboxEvidenceChecklistItem {
  return {
    id,
    owner,
    sourceVersion,
    required: true,
    evidence,
    verified,
    blocksConnectionWhenMissing: true,
  };
}

function addBlocker(
  messages: ManualSandboxEvidenceChecklistMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxEvidenceChecklistMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  if (!existsSync(MINI_KV_RUNTIME_SMOKE)) {
    return {};
  }
  return JSON.parse(readFileSync(MINI_KV_RUNTIME_SMOKE, "utf8")) as MiniKvRuntimeSmokeEvidence;
}

function fileById(files: ChecklistEvidenceFile[], id: string): ChecklistEvidenceFile {
  const file = files.find((candidate) => candidate.id === id);
  if (file === undefined) {
    throw new Error(`Missing evidence file ${id}`);
  }
  return file;
}

function snippetMatched(snippets: ChecklistSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}

function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function booleanField(record: Record<string, unknown>, key: string): boolean | undefined {
  const value = record[key];
  return typeof value === "boolean" ? value : undefined;
}

function renderEvidenceFile(file: ChecklistEvidenceFile): string[] {
  return [
    `### ${file.id}`,
    "",
    ...renderEntries(file),
    "",
  ];
}

function renderSnippet(snippetMatch: ChecklistSnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}: ${snippetMatch.matched}`,
    `  - Path: ${snippetMatch.path}`,
    `  - Expected: ${snippetMatch.expectedText}`,
  ];
}

function renderChecklistItem(item: ManualSandboxEvidenceChecklistItem): string[] {
  return [
    `### ${item.id}`,
    "",
    ...renderEntries(item),
    "",
  ];
}
