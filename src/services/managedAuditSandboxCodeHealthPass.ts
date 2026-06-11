import { existsSync, readFileSync } from "node:fs";

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
  loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
  type ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.js";

export interface ManagedAuditSandboxCodeHealthPassProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-sandbox-code-health-pass.v1";
  qualityPassState: "managed-audit-sandbox-code-health-pass-ready" | "blocked";
  readyForManagedAuditSandboxCodeHealthPass: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyQualityPass: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV247: {
    sourceVersion: "Node v247";
    profileVersion: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile["profileVersion"];
    verificationState: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile["verificationState"];
    verificationDigest: string;
    readyForPrecheckUpstreamReceiptVerification: boolean;
    javaReady: boolean;
    miniKvReady: boolean;
    connectionStillBlocked: true;
  };
  regressionCoverage: {
    serviceFile: CodeEvidenceFile;
    testFile: CodeEvidenceFile;
    routeTableFile: CodeEvidenceFile;
    routeGroupFile: CodeEvidenceFile;
    planFile: CodeEvidenceFile;
    fallbackRegressionTestPresent: boolean;
    blockedConfigTestPresent: boolean;
    jsonMarkdownRouteRegressionPresent: boolean;
    routeRegisteredThroughTable: boolean;
    markdownRendererRegisteredThroughTable: boolean;
    noRealConnectionClientImport: boolean;
    noCredentialValueRead: boolean;
    noSchemaMigrationExecution: boolean;
    noAutomaticUpstreamStart: boolean;
  };
  largeFileInventory: LargeFileInventoryItem[];
  splitAcceptanceChecklist: SplitAcceptanceChecklistItem[];
  checks: CodeHealthPassChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    largeFileCount: number;
    splitChecklistItemCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CodeHealthPassMessage[];
  warnings: CodeHealthPassMessage[];
  recommendations: CodeHealthPassMessage[];
  evidenceEndpoints: {
    codeHealthPassJson: string;
    codeHealthPassMarkdown: string;
    sourceNodeV247Json: string;
    activePlan: string;
  };
  qualityDigest: string;
  nextActions: string[];
}

interface CodeEvidenceFile {
  path: string;
  exists: boolean;
  lineCount: number;
}

interface LargeFileInventoryItem {
  path: string;
  lineCount: number;
  currentState:
    | "oversized-router"
    | "oversized-ui"
    | "oversized-renderer"
    | "near-limit-service";
  targetMaxLineCount: number;
  followUpAction: string;
}

interface SplitAcceptanceChecklistItem {
  id: string;
  targetFile: string;
  acceptedWhen: string;
  blockedBy: string;
  suggestedVersion: "Node v250+" | "Node v251+" | "Node v252+";
}

interface CodeHealthPassMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-sandbox-code-health-pass"
    | "node-v247-precheck-upstream-receipt-verification"
    | "runtime-config";
  message: string;
}

type CodeHealthPassChecks = {
  planAllowsQualityPass: boolean;
  sourceNodeV247Ready: boolean;
  v247ServicePresent: boolean;
  v247ServiceBelowNewServiceLimit: boolean;
  fallbackRegressionTestPresent: boolean;
  blockedConfigTestPresent: boolean;
  jsonMarkdownRouteRegressionPresent: boolean;
  routeRegisteredThroughTable: boolean;
  v247AvoidsRealConnectionClients: boolean;
  v247KeepsCredentialBoundaryClosed: boolean;
  v247KeepsSchemaMigrationBlocked: boolean;
  v247KeepsAutoStartBlocked: boolean;
  largeFileInventoryRecorded: boolean;
  splitAcceptanceChecklistCreated: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  readyForManagedAuditSandboxCodeHealthPass: boolean;
};

const V247_SERVICE =
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.ts";
const V247_SERVICE_MODULES = Object.freeze([
  V247_SERVICE,
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationConstants.ts",
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationCore.ts",
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationPolicy.ts",
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationReferences.ts",
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationRenderer.ts",
  "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationTypes.ts",
]);
const V247_TEST =
  "test/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.test.ts";
const ROUTE_TABLE = "src/routes/auditJsonMarkdownRoutes.ts";
const PRECHECK_ROUTE_GROUP =
  "src/routes/auditManagedAuditManualSandboxConnectionPrecheckRoutes.ts";
const ACTIVE_PLAN = "docs/plans/v245-post-sandbox-precheck-roadmap.md";

const V247_ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification";
const V248_ROUTE_PATH = "/api/v1/audit/managed-audit-sandbox-code-health-pass";

const LARGE_FILE_TARGETS = Object.freeze([
  {
    path: "src/routes/statusRoutes.ts",
    currentState: "oversized-router" as const,
    targetMaxLineCount: 1200,
    followUpAction: "Split production/readiness/live-probe route groups into dedicated route modules.",
  },
  {
    path: "src/ui/dashboard.ts",
    currentState: "oversized-ui" as const,
    targetMaxLineCount: 1400,
    followUpAction: "Extract managed-audit dashboard panels and API helpers into smaller UI modules.",
  },
  {
    path: "src/services/opsPromotionArchiveRenderers.ts",
    currentState: "oversized-renderer" as const,
    targetMaxLineCount: 900,
    followUpAction: "Split archive renderers by gate/report/verification concern.",
  },
]);

const ENDPOINTS = Object.freeze({
  codeHealthPassJson: V248_ROUTE_PATH,
  codeHealthPassMarkdown: `${V248_ROUTE_PATH}?format=markdown`,
  sourceNodeV247Json: V247_ROUTE_PATH,
  activePlan: ACTIVE_PLAN,
});

export function loadManagedAuditSandboxCodeHealthPass(input: {
  config: AppConfig;
}): ManagedAuditSandboxCodeHealthPassProfile {
  const sourceV247 = loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification({
    config: input.config,
  });
  const sourceNodeV247 = createSourceNodeV247(sourceV247);
  const regressionCoverage = createRegressionCoverage();
  const largeFileInventory = createLargeFileInventory();
  const splitAcceptanceChecklist = createSplitAcceptanceChecklist();
  const checks = createChecks(
    input.config,
    sourceNodeV247,
    regressionCoverage,
    largeFileInventory,
    splitAcceptanceChecklist,
  );
  checks.readyForManagedAuditSandboxCodeHealthPass = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditSandboxCodeHealthPass")
    .every(([, value]) => value);
  const qualityPassState = checks.readyForManagedAuditSandboxCodeHealthPass
    ? "managed-audit-sandbox-code-health-pass-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(largeFileInventory);
  const recommendations = collectRecommendations();
  const qualityDigest = sha256StableJson({
    profileVersion: "managed-audit-sandbox-code-health-pass.v1",
    qualityPassState,
    sourceNodeV247Digest: sourceNodeV247.verificationDigest,
    regressionCoverage,
    largeFileInventory,
    splitAcceptanceChecklist,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit sandbox code health pass",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-sandbox-code-health-pass.v1",
    qualityPassState,
    readyForManagedAuditSandboxCodeHealthPass: checks.readyForManagedAuditSandboxCodeHealthPass,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyQualityPass: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV247,
    regressionCoverage,
    largeFileInventory,
    splitAcceptanceChecklist,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      largeFileCount: largeFileInventory.length,
      splitChecklistItemCount: splitAcceptanceChecklist.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    qualityDigest,
    nextActions: [
      "Let Java v100 and mini-kv v109 finish their parallel quality-only versions before Node v249 opens a new rehearsal guard.",
      "Keep Node v249 as a manual rehearsal guard only; do not add a real managed audit client or credential reader.",
      "Use this checklist to split statusRoutes, dashboard, and opsPromotionArchiveRenderers in later focused versions.",
    ],
  };
}

export function renderManagedAuditSandboxCodeHealthPassMarkdown(
  profile: ManagedAuditSandboxCodeHealthPassProfile,
): string {
  return [
    "# Managed audit sandbox code health pass",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality pass state: ${profile.qualityPassState}`,
    `- Ready for code health pass: ${profile.readyForManagedAuditSandboxCodeHealthPass}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v247",
    "",
    ...renderEntries(profile.sourceNodeV247),
    "",
    "## Regression Coverage",
    "",
    ...renderEntries(profile.regressionCoverage),
    "",
    "## Large File Inventory",
    "",
    ...renderList(profile.largeFileInventory.map(formatLargeFile), "No large files recorded."),
    "",
    "## Split Acceptance Checklist",
    "",
    ...renderList(profile.splitAcceptanceChecklist.map(formatChecklistItem), "No split checklist items."),
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
    ...renderMessages(profile.productionBlockers, "No code health blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No code health warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No code health recommendations."),
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

function createSourceNodeV247(
  source: ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
): ManagedAuditSandboxCodeHealthPassProfile["sourceNodeV247"] {
  return {
    sourceVersion: "Node v247",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    verificationDigest: source.receiptVerification.verificationDigest,
    readyForPrecheckUpstreamReceiptVerification:
      source.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
    javaReady: source.upstreamReceipts.javaV99.readyForNodeV247Alignment,
    miniKvReady: source.upstreamReceipts.miniKvV108.readyForNodeV247Alignment,
    connectionStillBlocked: true,
  };
}

function createRegressionCoverage(): ManagedAuditSandboxCodeHealthPassProfile["regressionCoverage"] {
  const serviceSource = readV247ServiceModuleFamilyText();
  const testSource = readText(V247_TEST);
  const precheckRouteGroupSource = readText(PRECHECK_ROUTE_GROUP);
  const registeredThroughPrecheckRouteGroup =
    precheckRouteGroupSource.includes(V247_ROUTE_PATH)
    && precheckRouteGroupSource.includes("loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification");
  const renderedThroughPrecheckRouteGroup =
    precheckRouteGroupSource.includes("renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown");

  return {
    serviceFile: codeEvidenceFile(V247_SERVICE),
    testFile: codeEvidenceFile(V247_TEST),
    routeTableFile: codeEvidenceFile(ROUTE_TABLE),
    routeGroupFile: codeEvidenceFile(PRECHECK_ROUTE_GROUP),
    planFile: codeEvidenceFile(ACTIVE_PLAN),
    fallbackRegressionTestPresent:
      testSource.includes("ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK")
      && testSource.includes("uses committed historical fixture fallback"),
    blockedConfigTestPresent:
      testSource.includes("blocks when upstream actions are enabled")
      && testSource.includes("UPSTREAM_ACTIONS_ENABLED"),
    jsonMarkdownRouteRegressionPresent:
      testSource.includes("exposes JSON and Markdown routes through the audit route table")
      && testSource.includes("?format=markdown"),
    routeRegisteredThroughTable: registeredThroughPrecheckRouteGroup,
    markdownRendererRegisteredThroughTable: renderedThroughPrecheckRouteGroup,
    noRealConnectionClientImport:
      !serviceSource.includes("../clients/")
      && !serviceSource.includes("OrderPlatformClient")
      && !serviceSource.includes("MiniKvClient")
      && !serviceSource.includes("fetch("),
    noCredentialValueRead:
      serviceSource.includes("readsManagedAuditCredential: false")
      && serviceSource.includes("credentialValueReadAllowed"),
    noSchemaMigrationExecution:
      serviceSource.includes("schemaMigrationExecuted: false")
      && serviceSource.includes("schemaMigrationExecutionAllowed"),
    noAutomaticUpstreamStart:
      serviceSource.includes("automaticUpstreamStart: false")
      && serviceSource.includes("miniKvAutoStartAllowed"),
  };
}

function readV247ServiceModuleFamilyText(): string {
  return V247_SERVICE_MODULES.map((modulePath) => readText(modulePath)).join("\n");
}

function createLargeFileInventory(): LargeFileInventoryItem[] {
  return LARGE_FILE_TARGETS.map((target) => ({
    path: target.path,
    lineCount: lineCount(target.path),
    currentState: target.currentState,
    targetMaxLineCount: target.targetMaxLineCount,
    followUpAction: target.followUpAction,
  }));
}

function createSplitAcceptanceChecklist(): SplitAcceptanceChecklistItem[] {
  return [
    {
      id: "split-status-routes-by-domain",
      targetFile: "src/routes/statusRoutes.ts",
      acceptedWhen: "statusRoutes.ts drops below 1200 lines and production/readiness/live-probe endpoints keep their existing paths.",
      blockedBy: "Any route path or response shape change not covered by tests.",
      suggestedVersion: "Node v250+",
    },
    {
      id: "split-dashboard-managed-audit-panels",
      targetFile: "src/ui/dashboard.ts",
      acceptedWhen: "dashboard.ts drops below 1400 lines and managed-audit panels keep the same DOM ids and API calls.",
      blockedBy: "Any visual or operator workflow change without screenshot evidence.",
      suggestedVersion: "Node v251+",
    },
    {
      id: "split-ops-promotion-archive-renderers",
      targetFile: "src/services/opsPromotionArchiveRenderers.ts",
      acceptedWhen: "renderers are separated by archive/report/verification concern and existing archive tests remain green.",
      blockedBy: "Any digest, markdown, or archive shape drift without explicit migration evidence.",
      suggestedVersion: "Node v252+",
    },
  ];
}

function createChecks(
  config: AppConfig,
  sourceNodeV247: ManagedAuditSandboxCodeHealthPassProfile["sourceNodeV247"],
  regressionCoverage: ManagedAuditSandboxCodeHealthPassProfile["regressionCoverage"],
  largeFileInventory: LargeFileInventoryItem[],
  splitAcceptanceChecklist: SplitAcceptanceChecklistItem[],
): CodeHealthPassChecks {
  return {
    planAllowsQualityPass: true,
    sourceNodeV247Ready: sourceNodeV247.readyForPrecheckUpstreamReceiptVerification,
    v247ServicePresent: regressionCoverage.serviceFile.exists,
    v247ServiceBelowNewServiceLimit: regressionCoverage.serviceFile.lineCount <= 1000,
    fallbackRegressionTestPresent: regressionCoverage.fallbackRegressionTestPresent,
    blockedConfigTestPresent: regressionCoverage.blockedConfigTestPresent,
    jsonMarkdownRouteRegressionPresent: regressionCoverage.jsonMarkdownRouteRegressionPresent,
    routeRegisteredThroughTable:
      regressionCoverage.routeRegisteredThroughTable && regressionCoverage.markdownRendererRegisteredThroughTable,
    v247AvoidsRealConnectionClients: regressionCoverage.noRealConnectionClientImport,
    v247KeepsCredentialBoundaryClosed: regressionCoverage.noCredentialValueRead,
    v247KeepsSchemaMigrationBlocked: regressionCoverage.noSchemaMigrationExecution,
    v247KeepsAutoStartBlocked: regressionCoverage.noAutomaticUpstreamStart,
    largeFileInventoryRecorded:
      largeFileInventory.length === LARGE_FILE_TARGETS.length
      && largeFileInventory.every((item) => item.lineCount > 0),
    splitAcceptanceChecklistCreated: splitAcceptanceChecklist.length === 3,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    readyForManagedAuditSandboxCodeHealthPass: false,
  };
}

function collectProductionBlockers(checks: CodeHealthPassChecks): CodeHealthPassMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CodeHealthPassMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV247Ready,
      code: "NODE_V247_NOT_READY",
      source: "node-v247-precheck-upstream-receipt-verification",
      message: "Node v247 must remain ready before the v248 code health pass can pass.",
    },
    {
      condition:
        checks.v247ServicePresent
        && checks.v247ServiceBelowNewServiceLimit
        && checks.v247AvoidsRealConnectionClients,
      code: "V247_SERVICE_SHAPE_NOT_ACCEPTABLE",
      source: "managed-audit-sandbox-code-health-pass",
      message: "The v247 service must exist, stay below the new-service limit, and avoid real connection clients.",
    },
    {
      condition:
        checks.fallbackRegressionTestPresent
        && checks.blockedConfigTestPresent
        && checks.jsonMarkdownRouteRegressionPresent,
      code: "V247_REGRESSION_TESTS_INCOMPLETE",
      source: "managed-audit-sandbox-code-health-pass",
      message: "The v247 test must cover fallback, blocked config, and JSON/Markdown route regression.",
    },
    {
      condition: checks.routeRegisteredThroughTable,
      code: "ROUTE_TABLE_REGISTRATION_MISSING",
      source: "managed-audit-sandbox-code-health-pass",
      message: "The v247 route must stay registered through the shared audit JSON/Markdown route table.",
    },
    {
      condition:
        checks.v247KeepsCredentialBoundaryClosed
        && checks.v247KeepsSchemaMigrationBlocked
        && checks.v247KeepsAutoStartBlocked,
      code: "V247_SAFETY_BOUNDARY_NOT_LOCKED",
      source: "managed-audit-sandbox-code-health-pass",
      message: "The v247 source must keep credential, schema migration, and auto-start boundaries locked.",
    },
    {
      condition: checks.largeFileInventoryRecorded && checks.splitAcceptanceChecklistCreated,
      code: "LARGE_FILE_SPLIT_PLAN_MISSING",
      source: "managed-audit-sandbox-code-health-pass",
      message: "The code health pass must record the large-file inventory and split acceptance checklist.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during the code health pass.",
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

function collectWarnings(largeFileInventory: LargeFileInventoryItem[]): CodeHealthPassMessage[] {
  return [
    {
      code: "QUALITY_PASS_ONLY",
      severity: "warning",
      source: "managed-audit-sandbox-code-health-pass",
      message: "This version improves code health evidence only; it does not create a managed audit connection rehearsal.",
    },
    {
      code: "LARGE_FILES_REMAIN",
      severity: "warning",
      source: "managed-audit-sandbox-code-health-pass",
      message: `Large files remain by design for later focused splits: ${largeFileInventory.map((item) => item.path).join(", ")}.`,
    },
  ];
}

function collectRecommendations(): CodeHealthPassMessage[] {
  return [
    {
      code: "WAIT_FOR_PARALLEL_QUALITY_BATCH",
      severity: "recommendation",
      source: "managed-audit-sandbox-code-health-pass",
      message: "Let Java v100 and mini-kv v109 finish their quality-only versions before Node v249 consumes the batch.",
    },
    {
      code: "KEEP_REHEARSAL_GUARD_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-sandbox-code-health-pass",
      message: "Node v249 should remain a manual rehearsal guard and must not read credential values or open a managed audit connection.",
    },
  ];
}

function codeEvidenceFile(path: string): CodeEvidenceFile {
  return {
    path,
    exists: existsSync(path),
    lineCount: lineCount(path),
  };
}

function readText(path: string): string {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function lineCount(path: string): number {
  const content = readText(path);
  return content.length === 0 ? 0 : content.split(/\r?\n/).length;
}

function formatLargeFile(item: LargeFileInventoryItem): string {
  return `${item.path}: ${item.lineCount} lines, target <= ${item.targetMaxLineCount}, ${item.currentState}, ${item.followUpAction}`;
}

function formatChecklistItem(item: SplitAcceptanceChecklistItem): string {
  return `${item.id}: ${item.targetFile}; accepted when ${item.acceptedWhen}; blocked by ${item.blockedBy}; suggested ${item.suggestedVersion}`;
}
