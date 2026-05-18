import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
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
  loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
  type ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.js";
import {
  loadManagedAuditSandboxCodeHealthPass,
  type ManagedAuditSandboxCodeHealthPassProfile,
} from "./managedAuditSandboxCodeHealthPass.js";

export interface ManagedAuditManualSandboxConnectionRehearsalGuardProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-guard.v1";
  guardState: "manual-sandbox-connection-rehearsal-guard-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionRehearsalGuard: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyRehearsalGuard: true;
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
    readyForPrecheckReceiptVerification: boolean;
    javaV99Ready: boolean;
    miniKvV108Ready: boolean;
    connectionStillBlocked: true;
  };
  sourceNodeV248: {
    sourceVersion: "Node v248";
    profileVersion: ManagedAuditSandboxCodeHealthPassProfile["profileVersion"];
    qualityPassState: ManagedAuditSandboxCodeHealthPassProfile["qualityPassState"];
    qualityDigest: string;
    readyForCodeHealthPass: boolean;
    largeFileInventoryRecorded: boolean;
    splitAcceptanceChecklistCreated: boolean;
    connectionStillBlocked: true;
  };
  sourceNodeV249: SecurityMaintenanceReference;
  upstreamSecurityMaintenance: {
    javaV101: SecurityMaintenanceReference;
    miniKvV110: SecurityMaintenanceReference;
  };
  rehearsalGuard: {
    guardDigest: string;
    guardMode: "manual-sandbox-connection-rehearsal-guard-only";
    sourceSpan: "Node v247 + Node v248 + Node v249 + Java v101 + mini-kv v110";
    requiredOperatorArtifactCount: 7;
    requiredSecurityMaintenanceCount: 3;
    ownerApprovalArtifactRequired: true;
    credentialHandleReviewRequired: true;
    schemaRehearsalApprovalRequired: true;
    manualWindowOpenMarkerRequired: true;
    rollbackPathRequired: true;
    abortMarkerRequired: true;
    timeoutPolicyRequired: true;
    credentialValueMayBeRead: false;
    managedAuditConnectionMayOpen: false;
    schemaMigrationMayExecute: false;
    nodeMayStartJavaOrMiniKv: false;
    miniKvMayActAsManagedAuditStorage: false;
  };
  checks: RehearsalGuardChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    requiredOperatorArtifactCount: number;
    requiredSecurityMaintenanceCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RehearsalGuardMessage[];
  warnings: RehearsalGuardMessage[];
  recommendations: RehearsalGuardMessage[];
  evidenceEndpoints: {
    rehearsalGuardJson: string;
    rehearsalGuardMarkdown: string;
    sourceNodeV247Json: string;
    sourceNodeV248Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface SecurityMaintenanceReference {
  sourceVersion: "Node v249" | "Java v101" | "mini-kv v110";
  maintenanceScope: string;
  evidenceFiles: RehearsalEvidenceFile[];
  expectedSnippets: RehearsalSnippetMatch[];
  evidencePresent: boolean;
  configuredEcosystems: readonly string[];
  weeklySchedule: boolean;
  asiaShanghaiTimezone: boolean;
  minorPatchGrouped: boolean;
  semverMajorIgnored: boolean;
  ciWorkflowPresent: boolean;
  ciWorkflowCoversPrimaryBuild: boolean;
  dependencyVersionsChanged: false;
  runtimeBehaviorChanged: false;
  managedAuditBoundaryChanged: false;
  readyForRehearsalGuard: boolean;
}

interface RehearsalEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface RehearsalSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

interface RehearsalGuardMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-rehearsal-guard"
    | "node-v247-precheck-upstream-receipt-verification"
    | "node-v248-code-health-pass"
    | "node-v249-security-maintenance"
    | "java-v101-security-maintenance"
    | "mini-kv-v110-security-maintenance"
    | "runtime-config";
  message: string;
}

type RehearsalGuardChecks = {
  sourceNodeV247Ready: boolean;
  sourceNodeV248Ready: boolean;
  nodeV249SecurityMaintenanceReady: boolean;
  javaV101SecurityMaintenanceReady: boolean;
  miniKvV110SecurityMaintenanceReady: boolean;
  requiredSecurityMaintenanceComplete: boolean;
  rehearsalGuardRequiresOwnerApprovalArtifact: boolean;
  rehearsalGuardRequiresCredentialHandleReview: boolean;
  rehearsalGuardRequiresSchemaRehearsalApproval: boolean;
  rehearsalGuardRequiresManualWindowMarker: boolean;
  rehearsalGuardRequiresRollbackPath: boolean;
  rehearsalGuardRequiresAbortMarker: boolean;
  rehearsalGuardRequiresTimeoutPolicy: boolean;
  credentialBoundaryStillClosed: boolean;
  connectionBoundaryStillClosed: boolean;
  schemaMigrationStillBlocked: boolean;
  autoStartStillBlocked: boolean;
  miniKvStillNonAuthoritative: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionRehearsalGuard: boolean;
};

const ACTIVE_PLAN = "docs/plans/v245-post-sandbox-precheck-roadmap.md";
const ROUTE_PATH = "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard";
const NODE_V247_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification";
const NODE_V248_ROUTE = "/api/v1/audit/managed-audit-sandbox-code-health-pass";

const NODE_V249_DEPENDABOT = ".github/dependabot.yml";
const NODE_V249_WORKFLOW = ".github/workflows/node-evidence.yml";
const NODE_V249_TEST = "test/dependabotConfig.test.ts";
const NODE_V249_RUNBOOK = "c/249/解释/dependabot-security-maintenance-v249.md";
const NODE_V249_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段/253-dependabot-security-maintenance-v249.md";

const JAVA_V101_DEPENDABOT = "D:/javaproj/.github/dependabot.yml";
const JAVA_V101_WORKFLOW = "D:/javaproj/.github/workflows/maven-ci.yml";
const JAVA_V101_RUNBOOK = "D:/javaproj/advanced-order-platform/c/101/解释/说明.md";
const JAVA_V101_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/104-version-101-dependabot-security-maintenance.md";

const MINI_KV_V110_DEPENDABOT = "D:/C/mini-kv/.github/dependabot.yml";
const MINI_KV_V110_TEST = "D:/C/mini-kv/tests/dependabot_config_tests.cpp";
const MINI_KV_V110_RUNBOOK = "D:/C/mini-kv/c/110/解释/说明.md";
const MINI_KV_V110_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/166-version-110-dependabot-github-actions-maintenance.md";

export function loadManagedAuditManualSandboxConnectionRehearsalGuard(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionRehearsalGuardProfile {
  const sourceNodeV247 = createSourceNodeV247(
    loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification({
      config: input.config,
    }),
  );
  const sourceNodeV248 = createSourceNodeV248(
    loadManagedAuditSandboxCodeHealthPass({
      config: input.config,
    }),
  );
  const sourceNodeV249 = createNodeV249SecurityMaintenance();
  const javaV101 = createJavaV101SecurityMaintenance();
  const miniKvV110 = createMiniKvV110SecurityMaintenance();
  const rehearsalGuard = createRehearsalGuard();
  const checks = createChecks(
    input.config,
    sourceNodeV247,
    sourceNodeV248,
    sourceNodeV249,
    javaV101,
    miniKvV110,
    rehearsalGuard,
  );
  checks.readyForManagedAuditManualSandboxConnectionRehearsalGuard = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionRehearsalGuard")
    .every(([, value]) => value);
  const guardState = checks.readyForManagedAuditManualSandboxConnectionRehearsalGuard
    ? "manual-sandbox-connection-rehearsal-guard-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const evidenceFileCount =
    sourceNodeV249.evidenceFiles.length
    + javaV101.evidenceFiles.length
    + miniKvV110.evidenceFiles.length;
  const matchedSnippetCount = [
    ...sourceNodeV249.expectedSnippets,
    ...javaV101.expectedSnippets,
    ...miniKvV110.expectedSnippets,
  ].filter((snippet) => snippet.matched).length;

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection rehearsal guard",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-guard.v1",
    guardState,
    readyForManagedAuditManualSandboxConnectionRehearsalGuard:
      checks.readyForManagedAuditManualSandboxConnectionRehearsalGuard,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyRehearsalGuard: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV247,
    sourceNodeV248,
    sourceNodeV249,
    upstreamSecurityMaintenance: {
      javaV101,
      miniKvV110,
    },
    rehearsalGuard,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount,
      matchedSnippetCount,
      requiredOperatorArtifactCount: rehearsalGuard.requiredOperatorArtifactCount,
      requiredSecurityMaintenanceCount: rehearsalGuard.requiredSecurityMaintenanceCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      rehearsalGuardJson: ROUTE_PATH,
      rehearsalGuardMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV247Json: NODE_V247_ROUTE,
      sourceNodeV248Json: NODE_V248_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v250 as the last manual rehearsal guard before any real sandbox connection decision.",
      "Do not open a managed audit connection until an owner-approved manual window and credential-handle review are present.",
      "If the team wants to proceed after v250, plan the next batch around a connection decision record, not a silent runtime client.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionRehearsalGuardMarkdown(
  profile: ManagedAuditManualSandboxConnectionRehearsalGuardProfile,
): string {
  return [
    "# Managed audit manual sandbox connection rehearsal guard",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Guard state: ${profile.guardState}`,
    `- Ready for rehearsal guard: ${profile.readyForManagedAuditManualSandboxConnectionRehearsalGuard}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    "",
    "## Source Node v247",
    "",
    ...renderEntries(profile.sourceNodeV247),
    "",
    "## Source Node v248",
    "",
    ...renderEntries(profile.sourceNodeV248),
    "",
    "## Node v249 Security Maintenance",
    "",
    ...renderSecurityMaintenance(profile.sourceNodeV249),
    "",
    "## Java v101 Security Maintenance",
    "",
    ...renderSecurityMaintenance(profile.upstreamSecurityMaintenance.javaV101),
    "",
    "## mini-kv v110 Security Maintenance",
    "",
    ...renderSecurityMaintenance(profile.upstreamSecurityMaintenance.miniKvV110),
    "",
    "## Rehearsal Guard",
    "",
    ...renderEntries(profile.rehearsalGuard),
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
    ...renderMessages(profile.productionBlockers, "No rehearsal guard blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No rehearsal guard warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No rehearsal guard recommendations."),
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
): ManagedAuditManualSandboxConnectionRehearsalGuardProfile["sourceNodeV247"] {
  return {
    sourceVersion: "Node v247",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    verificationDigest: source.receiptVerification.verificationDigest,
    readyForPrecheckReceiptVerification:
      source.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification,
    javaV99Ready: source.upstreamReceipts.javaV99.readyForNodeV247Alignment,
    miniKvV108Ready: source.upstreamReceipts.miniKvV108.readyForNodeV247Alignment,
    connectionStillBlocked: true,
  };
}

function createSourceNodeV248(
  source: ManagedAuditSandboxCodeHealthPassProfile,
): ManagedAuditManualSandboxConnectionRehearsalGuardProfile["sourceNodeV248"] {
  return {
    sourceVersion: "Node v248",
    profileVersion: source.profileVersion,
    qualityPassState: source.qualityPassState,
    qualityDigest: source.qualityDigest,
    readyForCodeHealthPass: source.readyForManagedAuditSandboxCodeHealthPass,
    largeFileInventoryRecorded: source.checks.largeFileInventoryRecorded,
    splitAcceptanceChecklistCreated: source.checks.splitAcceptanceChecklistCreated,
    connectionStillBlocked: true,
  };
}

function createNodeV249SecurityMaintenance(): SecurityMaintenanceReference {
  const evidenceFiles = [
    evidenceFile("node-v249-dependabot", NODE_V249_DEPENDABOT),
    evidenceFile("node-v249-workflow", NODE_V249_WORKFLOW),
    evidenceFile("node-v249-test", NODE_V249_TEST),
    evidenceFile("node-v249-runbook", NODE_V249_RUNBOOK),
    evidenceFile("node-v249-walkthrough", NODE_V249_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("node-npm-ecosystem", NODE_V249_DEPENDABOT, 'package-ecosystem: "npm"'),
    snippet("node-actions-ecosystem", NODE_V249_DEPENDABOT, 'package-ecosystem: "github-actions"'),
    snippet("node-weekly", NODE_V249_DEPENDABOT, 'interval: "weekly"'),
    snippet("node-timezone", NODE_V249_DEPENDABOT, 'timezone: "Asia/Shanghai"'),
    snippet("node-minor-patch", NODE_V249_DEPENDABOT, "node-production-dependencies"),
    snippet("node-semver-major-ignore", NODE_V249_DEPENDABOT, "version-update:semver-major"),
    snippet("node-ci-typecheck", NODE_V249_WORKFLOW, "npm run typecheck"),
    snippet("node-ci-test", NODE_V249_WORKFLOW, "npm test"),
    snippet("node-boundary", NODE_V249_RUNBOOK, "未升级任何依赖版本"),
  ];
  return securityMaintenanceReference({
    sourceVersion: "Node v249",
    maintenanceScope: "npm + GitHub Actions Dependabot maintenance",
    evidenceFiles,
    expectedSnippets,
    configuredEcosystems: ["npm", "github-actions"],
    ciWorkflowCoversPrimaryBuild: snippetMatched(expectedSnippets, "node-ci-typecheck")
      && snippetMatched(expectedSnippets, "node-ci-test"),
  });
}

function createJavaV101SecurityMaintenance(): SecurityMaintenanceReference {
  const evidenceFiles = [
    evidenceFile("java-v101-dependabot", JAVA_V101_DEPENDABOT),
    evidenceFile("java-v101-workflow", JAVA_V101_WORKFLOW),
    evidenceFile("java-v101-runbook", JAVA_V101_RUNBOOK),
    evidenceFile("java-v101-walkthrough", JAVA_V101_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-maven-ecosystem", JAVA_V101_DEPENDABOT, 'package-ecosystem: "maven"'),
    snippet("java-actions-ecosystem", JAVA_V101_DEPENDABOT, 'package-ecosystem: "github-actions"'),
    snippet("java-maven-directory", JAVA_V101_DEPENDABOT, 'directory: "/advanced-order-platform"'),
    snippet("java-weekly", JAVA_V101_DEPENDABOT, 'interval: "weekly"'),
    snippet("java-timezone", JAVA_V101_DEPENDABOT, 'timezone: "Asia/Shanghai"'),
    snippet("java-minor-patch", JAVA_V101_DEPENDABOT, "maven-minor-patch"),
    snippet("java-semver-major-ignore", JAVA_V101_DEPENDABOT, "version-update:semver-major"),
    snippet("java-ci-compile", JAVA_V101_WORKFLOW, "mvn -B -q -DskipTests compile"),
    snippet("java-ci-test", JAVA_V101_WORKFLOW, "test"),
    snippet("java-boundary", JAVA_V101_RUNBOOK, "不改 release approval 业务语义"),
  ];
  return securityMaintenanceReference({
    sourceVersion: "Java v101",
    maintenanceScope: "Maven + GitHub Actions Dependabot maintenance",
    evidenceFiles,
    expectedSnippets,
    configuredEcosystems: ["maven", "github-actions"],
    ciWorkflowCoversPrimaryBuild: snippetMatched(expectedSnippets, "java-ci-compile")
      && snippetMatched(expectedSnippets, "java-ci-test"),
  });
}

function createMiniKvV110SecurityMaintenance(): SecurityMaintenanceReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v110-dependabot", MINI_KV_V110_DEPENDABOT),
    evidenceFile("mini-kv-v110-test", MINI_KV_V110_TEST),
    evidenceFile("mini-kv-v110-runbook", MINI_KV_V110_RUNBOOK),
    evidenceFile("mini-kv-v110-walkthrough", MINI_KV_V110_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-actions-ecosystem", MINI_KV_V110_DEPENDABOT, 'package-ecosystem: "github-actions"'),
    snippet("mini-kv-weekly", MINI_KV_V110_DEPENDABOT, 'interval: "weekly"'),
    snippet("mini-kv-timezone", MINI_KV_V110_DEPENDABOT, 'timezone: "Asia/Shanghai"'),
    snippet("mini-kv-minor-patch", MINI_KV_V110_DEPENDABOT, "github-actions-minor-patch"),
    snippet("mini-kv-semver-major-ignore", MINI_KV_V110_DEPENDABOT, "version-update:semver-major"),
    snippet("mini-kv-no-npm", MINI_KV_V110_TEST, 'assert_not_contains(dependabot, "package-ecosystem: \\"npm\\"")'),
    snippet("mini-kv-no-maven", MINI_KV_V110_TEST, 'assert_not_contains(dependabot, "package-ecosystem: \\"maven\\"")'),
    snippet("mini-kv-ci-cmake", MINI_KV_V110_TEST, "cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug"),
    snippet("mini-kv-ci-ctest", MINI_KV_V110_TEST, "ctest --test-dir build -C Debug --output-on-failure"),
    snippet("mini-kv-boundary", MINI_KV_V110_RUNBOOK, "不改 WAL/snapshot/restore 核心"),
  ];
  return securityMaintenanceReference({
    sourceVersion: "mini-kv v110",
    maintenanceScope: "GitHub Actions Dependabot maintenance",
    evidenceFiles,
    expectedSnippets,
    configuredEcosystems: ["github-actions"],
    ciWorkflowCoversPrimaryBuild: snippetMatched(expectedSnippets, "mini-kv-ci-cmake")
      && snippetMatched(expectedSnippets, "mini-kv-ci-ctest"),
  });
}

function securityMaintenanceReference(input: {
  sourceVersion: SecurityMaintenanceReference["sourceVersion"];
  maintenanceScope: string;
  evidenceFiles: RehearsalEvidenceFile[];
  expectedSnippets: RehearsalSnippetMatch[];
  configuredEcosystems: readonly string[];
  ciWorkflowCoversPrimaryBuild: boolean;
}): SecurityMaintenanceReference {
  const evidencePresent = input.evidenceFiles.every((file) => file.exists);
  const weeklySchedule = input.expectedSnippets.some((snippet) => snippet.id.endsWith("weekly") && snippet.matched);
  const asiaShanghaiTimezone = input.expectedSnippets.some(
    (snippet) => snippet.id.endsWith("timezone") && snippet.matched,
  );
  const minorPatchGrouped = input.expectedSnippets.some(
    (snippet) => snippet.id.includes("minor-patch") && snippet.matched,
  );
  const semverMajorIgnored = input.expectedSnippets.some(
    (snippet) => snippet.id.includes("semver-major-ignore") && snippet.matched,
  );
  const ciWorkflowPresent = input.evidenceFiles.some((file) => file.id.includes("workflow") && file.exists)
    || input.evidenceFiles.some((file) => file.id.includes("test") && file.exists);

  return {
    sourceVersion: input.sourceVersion,
    maintenanceScope: input.maintenanceScope,
    evidenceFiles: input.evidenceFiles,
    expectedSnippets: input.expectedSnippets,
    evidencePresent,
    configuredEcosystems: input.configuredEcosystems,
    weeklySchedule,
    asiaShanghaiTimezone,
    minorPatchGrouped,
    semverMajorIgnored,
    ciWorkflowPresent,
    ciWorkflowCoversPrimaryBuild: input.ciWorkflowCoversPrimaryBuild,
    dependencyVersionsChanged: false,
    runtimeBehaviorChanged: false,
    managedAuditBoundaryChanged: false,
    readyForRehearsalGuard:
      evidencePresent
      && input.expectedSnippets.every((snippet) => snippet.matched)
      && weeklySchedule
      && asiaShanghaiTimezone
      && minorPatchGrouped
      && semverMajorIgnored
      && ciWorkflowPresent
      && input.ciWorkflowCoversPrimaryBuild,
  };
}

function createRehearsalGuard(): ManagedAuditManualSandboxConnectionRehearsalGuardProfile["rehearsalGuard"] {
  const guard = {
    guardMode: "manual-sandbox-connection-rehearsal-guard-only" as const,
    sourceSpan: "Node v247 + Node v248 + Node v249 + Java v101 + mini-kv v110" as const,
    requiredOperatorArtifactCount: 7 as const,
    requiredSecurityMaintenanceCount: 3 as const,
    ownerApprovalArtifactRequired: true as const,
    credentialHandleReviewRequired: true as const,
    schemaRehearsalApprovalRequired: true as const,
    manualWindowOpenMarkerRequired: true as const,
    rollbackPathRequired: true as const,
    abortMarkerRequired: true as const,
    timeoutPolicyRequired: true as const,
    credentialValueMayBeRead: false as const,
    managedAuditConnectionMayOpen: false as const,
    schemaMigrationMayExecute: false as const,
    nodeMayStartJavaOrMiniKv: false as const,
    miniKvMayActAsManagedAuditStorage: false as const,
  };

  return {
    guardDigest: sha256StableJson(guard),
    ...guard,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV247: ManagedAuditManualSandboxConnectionRehearsalGuardProfile["sourceNodeV247"],
  sourceNodeV248: ManagedAuditManualSandboxConnectionRehearsalGuardProfile["sourceNodeV248"],
  sourceNodeV249: SecurityMaintenanceReference,
  javaV101: SecurityMaintenanceReference,
  miniKvV110: SecurityMaintenanceReference,
  rehearsalGuard: ManagedAuditManualSandboxConnectionRehearsalGuardProfile["rehearsalGuard"],
): RehearsalGuardChecks {
  return {
    sourceNodeV247Ready: sourceNodeV247.readyForPrecheckReceiptVerification,
    sourceNodeV248Ready: sourceNodeV248.readyForCodeHealthPass,
    nodeV249SecurityMaintenanceReady: sourceNodeV249.readyForRehearsalGuard,
    javaV101SecurityMaintenanceReady: javaV101.readyForRehearsalGuard,
    miniKvV110SecurityMaintenanceReady: miniKvV110.readyForRehearsalGuard,
    requiredSecurityMaintenanceComplete:
      sourceNodeV249.readyForRehearsalGuard
      && javaV101.readyForRehearsalGuard
      && miniKvV110.readyForRehearsalGuard,
    rehearsalGuardRequiresOwnerApprovalArtifact: rehearsalGuard.ownerApprovalArtifactRequired,
    rehearsalGuardRequiresCredentialHandleReview: rehearsalGuard.credentialHandleReviewRequired,
    rehearsalGuardRequiresSchemaRehearsalApproval: rehearsalGuard.schemaRehearsalApprovalRequired,
    rehearsalGuardRequiresManualWindowMarker: rehearsalGuard.manualWindowOpenMarkerRequired,
    rehearsalGuardRequiresRollbackPath: rehearsalGuard.rollbackPathRequired,
    rehearsalGuardRequiresAbortMarker: rehearsalGuard.abortMarkerRequired,
    rehearsalGuardRequiresTimeoutPolicy: rehearsalGuard.timeoutPolicyRequired,
    credentialBoundaryStillClosed: !rehearsalGuard.credentialValueMayBeRead,
    connectionBoundaryStillClosed: !rehearsalGuard.managedAuditConnectionMayOpen,
    schemaMigrationStillBlocked: !rehearsalGuard.schemaMigrationMayExecute,
    autoStartStillBlocked: !config.upstreamActionsEnabled && !rehearsalGuard.nodeMayStartJavaOrMiniKv,
    miniKvStillNonAuthoritative: !rehearsalGuard.miniKvMayActAsManagedAuditStorage,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionRehearsalGuard: false,
  };
}

function collectProductionBlockers(checks: RehearsalGuardChecks): RehearsalGuardMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RehearsalGuardMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV247Ready,
      code: "NODE_V247_NOT_READY",
      source: "node-v247-precheck-upstream-receipt-verification",
      message: "Node v247 receipt verification must remain ready before v250 can pass.",
    },
    {
      condition: checks.sourceNodeV248Ready,
      code: "NODE_V248_NOT_READY",
      source: "node-v248-code-health-pass",
      message: "Node v248 code health pass must remain ready before v250 can pass.",
    },
    {
      condition: checks.nodeV249SecurityMaintenanceReady,
      code: "NODE_V249_SECURITY_MAINTENANCE_NOT_READY",
      source: "node-v249-security-maintenance",
      message: "Node v249 Dependabot/security maintenance evidence must be complete.",
    },
    {
      condition: checks.javaV101SecurityMaintenanceReady,
      code: "JAVA_V101_SECURITY_MAINTENANCE_NOT_READY",
      source: "java-v101-security-maintenance",
      message: "Java v101 Maven/GitHub Actions Dependabot evidence must be complete.",
    },
    {
      condition: checks.miniKvV110SecurityMaintenanceReady,
      code: "MINI_KV_V110_SECURITY_MAINTENANCE_NOT_READY",
      source: "mini-kv-v110-security-maintenance",
      message: "mini-kv v110 GitHub Actions Dependabot evidence must be complete.",
    },
    {
      condition:
        checks.rehearsalGuardRequiresOwnerApprovalArtifact
        && checks.rehearsalGuardRequiresCredentialHandleReview
        && checks.rehearsalGuardRequiresSchemaRehearsalApproval
        && checks.rehearsalGuardRequiresManualWindowMarker
        && checks.rehearsalGuardRequiresRollbackPath
        && checks.rehearsalGuardRequiresAbortMarker
        && checks.rehearsalGuardRequiresTimeoutPolicy,
      code: "REHEARSAL_GUARD_ARTIFACTS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-rehearsal-guard",
      message: "The rehearsal guard must require all seven manual operator artifacts.",
    },
    {
      condition:
        checks.credentialBoundaryStillClosed
        && checks.connectionBoundaryStillClosed
        && checks.schemaMigrationStillBlocked
        && checks.autoStartStillBlocked
        && checks.miniKvStillNonAuthoritative,
      code: "SAFETY_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-rehearsal-guard",
      message: "The rehearsal guard must not read credentials, open connections, migrate schema, auto-start upstreams, or promote mini-kv to managed audit storage.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during the rehearsal guard.",
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

function collectWarnings(): RehearsalGuardMessage[] {
  return [
    {
      code: "GUARD_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-rehearsal-guard",
      message: "v250 only builds the manual rehearsal guard; it does not open the managed audit sandbox connection.",
    },
    {
      code: "JAVA_ROOT_GITHUB_EVIDENCE",
      severity: "warning",
      source: "java-v101-security-maintenance",
      message: "Java Dependabot evidence lives at the Java git root D:/javaproj/.github, not inside the Maven module directory.",
    },
  ];
}

function collectRecommendations(): RehearsalGuardMessage[] {
  return [
    {
      code: "PLAN_CONNECTION_DECISION_RECORD",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-rehearsal-guard",
      message: "The next plan should decide whether to create a manual connection decision record before any adapter code opens a real connection.",
    },
    {
      code: "KEEP_DEPENDABOT_MINOR_PATCH_REVIEWED",
      severity: "recommendation",
      source: "node-v249-security-maintenance",
      message: "Dependabot PRs should stay reviewed through CI and should not auto-merge major upgrades.",
    },
  ];
}

function renderSecurityMaintenance(reference: SecurityMaintenanceReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      maintenanceScope: reference.maintenanceScope,
      evidencePresent: reference.evidencePresent,
      configuredEcosystems: reference.configuredEcosystems,
      weeklySchedule: reference.weeklySchedule,
      asiaShanghaiTimezone: reference.asiaShanghaiTimezone,
      minorPatchGrouped: reference.minorPatchGrouped,
      semverMajorIgnored: reference.semverMajorIgnored,
      ciWorkflowPresent: reference.ciWorkflowPresent,
      ciWorkflowCoversPrimaryBuild: reference.ciWorkflowCoversPrimaryBuild,
      readyForRehearsalGuard: reference.readyForRehearsalGuard,
    }),
    "",
    "Evidence files:",
    ...renderList(reference.evidenceFiles.map(formatEvidenceFile), "No evidence files."),
    "",
    "Expected snippets:",
    ...renderList(reference.expectedSnippets.map(formatSnippet), "No expected snippets."),
  ];
}

function evidenceFile(id: string, filePath: string): RehearsalEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  try {
    const stat = statHistoricalEvidence(filePath);
    return {
      id,
      path: filePath,
      resolvedPath,
      exists: true,
      sizeBytes: stat.size,
      digest: sha256File(filePath),
    };
  } catch {
    return {
      id,
      path: filePath,
      resolvedPath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
}

function snippet(id: string, filePath: string, expectedText: string): RehearsalSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  let matched = false;
  try {
    matched = readHistoricalEvidenceFile(filePath, "utf8").includes(expectedText);
  } catch {
    matched = false;
  }

  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched,
  };
}

function snippetMatched(snippets: RehearsalSnippetMatch[], id: string): boolean {
  return snippets.some((snippet) => snippet.id === id && snippet.matched);
}

function sha256File(filePath: string): string {
  return createHash("sha256")
    .update(readHistoricalEvidenceFile(filePath))
    .digest("hex");
}

function formatEvidenceFile(file: RehearsalEvidenceFile): string {
  return `${file.id}: ${file.path} -> ${file.resolvedPath}; exists=${file.exists}; size=${file.sizeBytes}; digest=${file.digest ?? "missing"}`;
}

function formatSnippet(snippet: RehearsalSnippetMatch): string {
  return `${snippet.id}: ${snippet.path}; matched=${snippet.matched}; expected=${snippet.expectedText}`;
}
