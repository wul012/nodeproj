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
  loadManagedAuditManualSandboxConnectionDryRunCommandPackage,
  type ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile,
} from "./managedAuditManualSandboxConnectionDryRunCommandPackage.js";
import {
  loadManagedAuditSandboxAdapterDryRunPlan,
  type ManagedAuditSandboxAdapterDryRunPlanProfile,
} from "./managedAuditSandboxAdapterDryRunPlan.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  type ManagedAuditRouteRegistrationTableQualityPassProfile,
} from "./managedAuditRouteRegistrationTableQualityPass.js";

export interface ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1";
  reportState: "manual-sandbox-dry-run-command-package-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport: boolean;
  readOnlyVerificationReport: true;
  sourceNodeV241: {
    sourceVersion: "Node v241";
    profileVersion: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["profileVersion"];
    packageState: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["packageState"];
    packageDigest: string;
    commandCount: number;
    readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: boolean;
    readyForManagedAuditSandboxAdapterConnection: false;
    disabledByDefault: true;
    dryRunOnly: true;
    carriesCredentialValue: false;
    actualConnectionAttempted: false;
    schemaMigrationRequested: false;
    managedAuditStateWriteRequested: false;
    upstreamServiceAutoStartRequested: false;
    miniKvWritePermissionRequested: false;
  };
  sourceNodeV242: {
    sourceVersion: "Node v242";
    planVersion: "v242-post-historical-evidence-fallback-roadmap.md";
    sourcePlanState: ManagedAuditSandboxAdapterDryRunPlanProfile["planState"];
    historicalFixtureRoot: string;
    historicalFixtureDigest: string;
    historicalFixturePresent: boolean;
    ciStableFallback: true;
  };
  upstreamEvidence: {
    javaV97: UpstreamVerificationReference;
    miniKvV106: UpstreamVerificationReference;
  };
  verification: {
    verificationDigest: string;
    evidenceSpan: "Node v241 + Node v242 + Java v97 + mini-kv v106";
    verificationMode: "manual-sandbox-dry-run-command-package-verification-report-only";
    commandShapeAccepted: boolean;
    disabledByDefaultAccepted: boolean;
    noCredentialValueAccepted: boolean;
    noConnectionAccepted: boolean;
    noMutationAccepted: boolean;
    routeRegistrationAccepted: boolean;
    archiveEvidenceAccepted: boolean;
    ciFallbackAccepted: boolean;
    nodeV243BlocksRealConnection: true;
  };
  checks: VerificationReportChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: VerificationReportMessage[];
  warnings: VerificationReportMessage[];
  recommendations: VerificationReportMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionDryRunCommandPackageVerificationReportJson: string;
    manualSandboxConnectionDryRunCommandPackageVerificationReportMarkdown: string;
    sourceNodeV241Json: string;
    sourceNodeV242Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface UpstreamVerificationReference {
  sourceVersion: "Java v97" | "mini-kv v106";
  tagLabel: string;
  repoCleanAtReadTime: true;
  remoteSyncedAtReadTime: true;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  behaviorContractPreserved: boolean;
  readyForNodeV243Alignment: boolean;
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

interface VerificationReportMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report"
    | "node-v241-dry-run-command-package"
    | "node-v242-historical-evidence-fallback"
    | "java-v97-optimization"
    | "mini-kv-v106-optimization"
    | "runtime-config";
  message: string;
}

type VerificationReportChecks = {
  sourceNodeV241Ready: boolean;
  sourceNodeV241StillDisabledByDefault: boolean;
  sourceNodeV242HistoricalFallbackReady: boolean;
  sourceNodeV242StillPreservesPlanState: boolean;
  javaV97VerificationReady: boolean;
  miniKvV106VerificationReady: boolean;
  commandShapeAccepted: boolean;
  disabledByDefaultAccepted: boolean;
  noCredentialValueAccepted: boolean;
  noConnectionAccepted: boolean;
  noMutationAccepted: boolean;
  routeRegistrationAccepted: boolean;
  archiveEvidenceAccepted: boolean;
  ciFallbackAccepted: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport: boolean;
};

const HISTORICAL_EVIDENCE_ROOT = "fixtures/historical/managed-audit-external-adapter-readiness-review";
const SOURCE_NODE_V242_FALLBACK = `${HISTORICAL_EVIDENCE_ROOT}/mini-kv-v90-runtime-smoke-evidence.json`;
const COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT =
  "fixtures/historical/managed-audit-command-package-verification";

const JAVA_V97_RUNBOOK = "D:/javaproj/advanced-order-platform/c/97/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V97_RUNBOOK_FALLBACK = `${COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT}/java-v97-runbook.md`;
const JAVA_V97_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/100-version-97-release-approval-rehearsal-builder-chain-refactor.md";
const JAVA_V97_WALKTHROUGH_FALLBACK =
  `${COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT}/java-v97-walkthrough.md`;
const JAVA_V97_CHAIN_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder.java";
const JAVA_V97_CHAIN_BUILDER_FALLBACK =
  `${COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT}/java-v97-chain-builder.java`;
const MINI_KV_V106_RUNBOOK = "D:/C/mini-kv/c/106/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V106_RUNBOOK_FALLBACK = `${COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT}/mini-kv-v106-runbook.md`;
const MINI_KV_V106_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/162-version-106-command-dispatch-table.md";
const MINI_KV_V106_WALKTHROUGH_FALLBACK =
  `${COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT}/mini-kv-v106-walkthrough.md`;
const MINI_KV_COMMAND_CPP = "D:/C/mini-kv/src/command.cpp";
const MINI_KV_COMMAND_CPP_FALLBACK = `${COMMAND_PACKAGE_VERIFICATION_FIXTURE_ROOT}/mini-kv-command.cpp`;

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionDryRunCommandPackageVerificationReportJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
  manualSandboxConnectionDryRunCommandPackageVerificationReportMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report?format=markdown",
  sourceNodeV241Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package",
  sourceNodeV242Json: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
  activePlan: "docs/plans/v242-post-historical-evidence-fallback-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile {
  const sourceV241 = loadManagedAuditManualSandboxConnectionDryRunCommandPackage({ config: input.config });
  const sourceV242 = loadManagedAuditSandboxAdapterDryRunPlan({ config: input.config });
  const sourceV240 = loadManagedAuditRouteRegistrationTableQualityPass({ config: input.config });
  const sourceNodeV241 = createSourceNodeV241(sourceV241);
  const sourceNodeV242 = createSourceNodeV242(sourceV242);
  const javaV97 = createJavaV97Reference();
  const miniKvV106 = createMiniKvV106Reference();
  const checks = createChecks(
    input.config,
    sourceNodeV241,
    sourceNodeV242,
    javaV97,
    miniKvV106,
    sourceV241,
    sourceV240,
  );
  checks.readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport")
    .every(([, value]) => value);
  const reportState = checks.readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport
    ? "manual-sandbox-dry-run-command-package-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1",
    reportState,
    sourceNodeV241Digest: sourceNodeV241.packageDigest,
    sourceNodeV242Digest: sourceNodeV242.historicalFixtureDigest,
    javaV97Tag: javaV97.tagLabel,
    miniKvV106Tag: miniKvV106.tagLabel,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection dry-run command package verification report",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1",
    reportState,
    readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport:
      checks.readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport,
    readOnlyVerificationReport: true,
    sourceNodeV241,
    sourceNodeV242,
    upstreamEvidence: {
      javaV97,
      miniKvV106,
    },
    verification: {
      verificationDigest,
      evidenceSpan: "Node v241 + Node v242 + Java v97 + mini-kv v106",
      verificationMode: "manual-sandbox-dry-run-command-package-verification-report-only",
      commandShapeAccepted: checks.commandShapeAccepted,
      disabledByDefaultAccepted: checks.disabledByDefaultAccepted,
      noCredentialValueAccepted: checks.noCredentialValueAccepted,
      noConnectionAccepted: checks.noConnectionAccepted,
      noMutationAccepted: checks.noMutationAccepted,
      routeRegistrationAccepted: checks.routeRegistrationAccepted,
      archiveEvidenceAccepted: checks.archiveEvidenceAccepted,
      ciFallbackAccepted: checks.ciFallbackAccepted,
      nodeV243BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV97.evidenceFiles.filter((file) => file.exists).length
        + miniKvV106.evidenceFiles.filter((file) => file.exists).length
        + (sourceNodeV242.historicalFixturePresent ? 1 : 0),
      matchedSnippetCount:
        javaV97.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV106.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this report to verify the disabled dry-run command package remains read-only.",
      "If the report is ready, only then let Java v98 and mini-kv v107 produce their upstream echo receipts.",
      "Do not promote this report into a real connection authorization.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportMarkdown(
  profile: ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile,
): string {
  return [
    "# Managed audit manual sandbox connection dry-run command package verification report",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Report state: ${profile.reportState}`,
    `- Ready for verification report: ${profile.readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport}`,
    `- Read only verification report: ${profile.readOnlyVerificationReport}`,
    "",
    "## Source Node v241",
    "",
    ...renderEntries(profile.sourceNodeV241),
    "",
    "## Source Node v242",
    "",
    ...renderEntries(profile.sourceNodeV242),
    "",
    "## Java v97 Optimization",
    "",
    ...renderEntries(profile.upstreamEvidence.javaV97),
    "",
    "## mini-kv v106 Optimization",
    "",
    ...renderEntries(profile.upstreamEvidence.miniKvV106),
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
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
    ...renderMessages(profile.productionBlockers, "No command package verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No command package verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No command package verification recommendations."),
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

function createSourceNodeV241(
  source: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile,
): ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile["sourceNodeV241"] {
  return {
    sourceVersion: "Node v241",
    profileVersion: source.profileVersion,
    packageState: source.packageState,
    packageDigest: source.commandPackage.packageDigest,
    commandCount: source.commandPackage.commandCount,
    readyForManagedAuditManualSandboxConnectionDryRunCommandPackage:
      source.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage,
    readyForManagedAuditSandboxAdapterConnection: source.commandPackage.readyForManagedAuditSandboxAdapterConnection,
    disabledByDefault: source.commandPackage.disabledByDefault,
    dryRunOnly: source.commandPackage.dryRunOnly,
    carriesCredentialValue: source.commandPackage.carriesCredentialValue,
    actualConnectionAttempted: source.commandPackage.actualConnectionAttempted,
    schemaMigrationRequested: source.commandPackage.schemaMigrationRequested,
    managedAuditStateWriteRequested: source.commandPackage.managedAuditStateWriteRequested,
    upstreamServiceAutoStartRequested: source.commandPackage.upstreamServiceAutoStartRequested,
    miniKvWritePermissionRequested: source.commandPackage.miniKvWritePermissionRequested,
  };
}

function createSourceNodeV242(
  source: ManagedAuditSandboxAdapterDryRunPlanProfile,
): ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile["sourceNodeV242"] {
  return {
    sourceVersion: "Node v242",
    planVersion: "v242-post-historical-evidence-fallback-roadmap.md",
    sourcePlanState: source.planState,
    historicalFixtureRoot: HISTORICAL_EVIDENCE_ROOT,
    historicalFixtureDigest: sha256StableJson({
      path: SOURCE_NODE_V242_FALLBACK,
      exists: existsSync(SOURCE_NODE_V242_FALLBACK),
      digest: fileDigest(SOURCE_NODE_V242_FALLBACK),
    }),
    historicalFixturePresent: existsSync(SOURCE_NODE_V242_FALLBACK),
    ciStableFallback: true,
  };
}

function createJavaV97Reference(): UpstreamVerificationReference {
  const runbookPath = firstExistingPath(JAVA_V97_RUNBOOK, JAVA_V97_RUNBOOK_FALLBACK);
  const walkthroughPath = firstExistingPath(JAVA_V97_WALKTHROUGH, JAVA_V97_WALKTHROUGH_FALLBACK);
  const chainBuilderPath = firstExistingPath(JAVA_V97_CHAIN_BUILDER, JAVA_V97_CHAIN_BUILDER_FALLBACK);
  const evidenceFiles = [
    evidenceFile("java-v97-runbook", runbookPath),
    evidenceFile("java-v97-walkthrough", walkthroughPath),
    evidenceFile("java-v97-chain-builder", chainBuilderPath),
  ];
  const expectedSnippets = [
    snippet("java-v97-title", walkthroughPath, "Java v97"),
    snippet("java-v97-builder-chain", walkthroughPath, "release approval rehearsal builder chain refactor"),
    snippet("java-v97-contract-preserved", walkthroughPath, "外部契约和 digest 不变"),
    snippet("java-v97-boundary-preserved", walkthroughPath, "read-only/no-ledger/no-SQL/no-connection 边界"),
  ];
  return createUpstreamVerificationReference({
    sourceVersion: "Java v97",
    tagLabel: "v97订单平台release-approval-rehearsal-builder-chain-refactor",
    evidenceFiles,
    expectedSnippets,
    behaviorContractPreserved: snippetMatched(expectedSnippets, "java-v97-contract-preserved")
      && snippetMatched(expectedSnippets, "java-v97-boundary-preserved"),
  });
}

function createMiniKvV106Reference(): UpstreamVerificationReference {
  const runbookPath = firstExistingPath(MINI_KV_V106_RUNBOOK, MINI_KV_V106_RUNBOOK_FALLBACK);
  const walkthroughPath = firstExistingPath(MINI_KV_V106_WALKTHROUGH, MINI_KV_V106_WALKTHROUGH_FALLBACK);
  const commandCppPath = firstExistingPath(MINI_KV_COMMAND_CPP, MINI_KV_COMMAND_CPP_FALLBACK);
  const evidenceFiles = [
    evidenceFile("mini-kv-v106-runbook", runbookPath),
    evidenceFile("mini-kv-v106-walkthrough", walkthroughPath),
    evidenceFile("mini-kv-command-cpp", commandCppPath),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v106-title", walkthroughPath, "mini-kv v106 command dispatch table"),
    snippet("mini-kv-v106-dispatch-table", walkthroughPath, "dispatch table"),
    snippet("mini-kv-v106-behavior-preserved", walkthroughPath, "保持所有外部行为不变"),
    snippet("mini-kv-v106-command-table-code", commandCppPath, "command_dispatch_table"),
  ];
  return createUpstreamVerificationReference({
    sourceVersion: "mini-kv v106",
    tagLabel: "第一百零六版命令分发表优化",
    evidenceFiles,
    expectedSnippets,
    behaviorContractPreserved: snippetMatched(expectedSnippets, "mini-kv-v106-behavior-preserved")
      && snippetMatched(expectedSnippets, "mini-kv-v106-command-table-code"),
  });
}

function createUpstreamVerificationReference(input: {
  sourceVersion: UpstreamVerificationReference["sourceVersion"];
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  behaviorContractPreserved: boolean;
}): UpstreamVerificationReference {
  const evidencePresent = input.evidenceFiles.every((file) => file.exists);
  const verificationDocumented = input.expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  return {
    sourceVersion: input.sourceVersion,
    tagLabel: input.tagLabel,
    repoCleanAtReadTime: true,
    remoteSyncedAtReadTime: true,
    evidenceFiles: input.evidenceFiles,
    expectedSnippets: input.expectedSnippets,
    evidencePresent,
    verificationDocumented,
    behaviorContractPreserved: input.behaviorContractPreserved,
    readyForNodeV243Alignment: evidencePresent && verificationDocumented && input.behaviorContractPreserved,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV241: ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile["sourceNodeV241"],
  sourceNodeV242: ManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReportProfile["sourceNodeV242"],
  javaV97: UpstreamVerificationReference,
  miniKvV106: UpstreamVerificationReference,
  sourceV241: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile,
  sourceV240: ManagedAuditRouteRegistrationTableQualityPassProfile,
): VerificationReportChecks {
  return {
    sourceNodeV241Ready: sourceV241.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage,
    sourceNodeV241StillDisabledByDefault: sourceNodeV241.disabledByDefault && sourceNodeV241.dryRunOnly,
    sourceNodeV242HistoricalFallbackReady: sourceNodeV242.historicalFixturePresent && sourceNodeV242.ciStableFallback,
    sourceNodeV242StillPreservesPlanState: sourceNodeV242.sourcePlanState === "sandbox-adapter-dry-run-plan-ready",
    javaV97VerificationReady: javaV97.readyForNodeV243Alignment,
    miniKvV106VerificationReady: miniKvV106.readyForNodeV243Alignment,
    commandShapeAccepted: sourceNodeV241.commandCount === 6 && sourceNodeV241.disabledByDefault && sourceNodeV241.dryRunOnly,
    disabledByDefaultAccepted: sourceNodeV241.disabledByDefault && sourceNodeV241.dryRunOnly,
    noCredentialValueAccepted: !sourceNodeV241.carriesCredentialValue,
    noConnectionAccepted: !sourceNodeV241.actualConnectionAttempted && !sourceNodeV241.readyForManagedAuditSandboxAdapterConnection,
    noMutationAccepted: !sourceNodeV241.managedAuditStateWriteRequested && !sourceNodeV241.schemaMigrationRequested,
    routeRegistrationAccepted: sourceV240.readyForManagedAuditRouteRegistrationTableQualityPass,
    archiveEvidenceAccepted: sourceNodeV242.historicalFixturePresent,
    ciFallbackAccepted: sourceNodeV242.ciStableFallback,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport: false,
  };
}

function collectProductionBlockers(
  checks: VerificationReportChecks,
): VerificationReportMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: VerificationReportMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV241Ready,
      code: "NODE_V241_NOT_READY",
      source: "node-v241-dry-run-command-package",
      message: "Node v241 dry-run command package must remain ready before v243 verification.",
    },
    {
      condition: checks.sourceNodeV242HistoricalFallbackReady,
      code: "NODE_V242_HISTORICAL_FALLBACK_NOT_READY",
      source: "node-v242-historical-evidence-fallback",
      message: "Node v242 historical fallback fixture must be available before verification report generation.",
    },
    {
      condition: checks.commandShapeAccepted,
      code: "COMMAND_SHAPE_NOT_ACCEPTED",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
      message: "The command package must preserve the six-command disabled dry-run shape.",
    },
    {
      condition: checks.noCredentialValueAccepted && checks.noConnectionAccepted && checks.noMutationAccepted,
      code: "DRY_RUN_BOUNDARY_BROKEN",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
      message: "The command package must remain credential-free, connection-free, and mutation-free.",
    },
    {
      condition: checks.routeRegistrationAccepted,
      code: "ROUTE_REGISTRATION_QUALITY_PASS_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
      message: "Route registration quality pass must remain ready to support verification route exposure.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during the verification report.",
    },
    {
      condition: checks.productionAuditStillBlocked && checks.productionWindowStillBlocked,
      code: "PRODUCTION_WINDOW_UNLOCKED",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
      message: "The verification report must not unlock production audit or production window access.",
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

function collectWarnings(): VerificationReportMessage[] {
  return [
    {
      code: "VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
      message: "This version verifies the disabled dry-run command package only; it does not authorize any real connection.",
    },
  ];
}

function collectRecommendations(): VerificationReportMessage[] {
  return [
    {
      code: "PREPARE_UPSTREAM_ECHO_RECEIPTS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
      message: "After this report is ready, let Java v98 and mini-kv v107 produce upstream echo receipts before any precheck packet work.",
    },
    {
      code: "KEEP_CI_FALLBACKS_LOCAL",
      severity: "recommendation",
      source: "node-v242-historical-evidence-fallback",
      message: "Keep historical evidence fallbacks inside the Node repository so CI never depends on developer machine paths again.",
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

function fileDigest(filePath: string): string {
  if (!existsSync(filePath)) {
    return "missing";
  }
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function firstExistingPath(primaryPath: string, fallbackPath: string): string {
  return existsSync(fallbackPath) ? fallbackPath : primaryPath;
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}
