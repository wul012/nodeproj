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
  loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
  type ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile,
} from "./managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  type ManagedAuditRouteRegistrationTableQualityPassProfile,
} from "./managedAuditRouteRegistrationTableQualityPass.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package.v1";
  packageState: "manual-sandbox-connection-dry-run-command-package-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: boolean;
  readOnlyCommandPackage: true;
  sourceNodeV239: {
    sourceVersion: "Node v239";
    profileVersion: ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["profileVersion"];
    verificationState: ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile["verificationState"];
    verificationDigest: string;
    readyForOperatorWindowEvidenceVerification: boolean;
    javaEchoAccepted: boolean;
    miniKvReceiptAccepted: boolean;
    boundaryFlagsAligned: boolean;
    readyForSandboxAdapterConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
  };
  sourceNodeV240: {
    sourceVersion: "Node v240";
    profileVersion: ManagedAuditRouteRegistrationTableQualityPassProfile["profileVersion"];
    qualityPassState: ManagedAuditRouteRegistrationTableQualityPassProfile["qualityPassState"];
    qualityDigest: string;
    routeRegistrationMode: "configuration-table";
    auditRoutesAfterLineCount: number;
    readyForRouteRegistrationTableQualityPass: boolean;
    connectsManagedAudit: false;
  };
  upstreamOptimizationEvidence: {
    javaV97: UpstreamOptimizationReference;
    miniKvV106: UpstreamOptimizationReference;
  };
  commandPackage: {
    packageDigest: string;
    packageId: string;
    sourceSpan: "Node v239 + Node v240 + Java v97 + mini-kv v106";
    packageMode: "manual-sandbox-connection-disabled-dry-run-command-package";
    commandCount: number;
    disabledByDefault: true;
    dryRunOnly: true;
    carriesCredentialValue: false;
    actualConnectionAttempted: false;
    schemaMigrationRequested: false;
    managedAuditStateWriteRequested: false;
    upstreamServiceAutoStartRequested: false;
    miniKvWritePermissionRequested: false;
    readyForOperatorReview: boolean;
    readyForManagedAuditSandboxAdapterConnection: false;
  };
  disabledCommands: ManualSandboxConnectionDisabledCommand[];
  checks: ManualSandboxConnectionDryRunCommandPackageChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    disabledCommandCount: number;
    upstreamOptimizationEvidenceCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxConnectionDryRunCommandPackageMessage[];
  warnings: ManualSandboxConnectionDryRunCommandPackageMessage[];
  recommendations: ManualSandboxConnectionDryRunCommandPackageMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionDryRunCommandPackageJson: string;
    manualSandboxConnectionDryRunCommandPackageMarkdown: string;
    sourceNodeV239Json: string;
    sourceNodeV240Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface UpstreamOptimizationReference {
  sourceVersion: "Java v97" | "mini-kv v106";
  tagLabel: string;
  optimizationKind: string;
  repoCleanAtReadTime: true;
  remoteSyncedAtReadTime: true;
  evidenceFiles: EvidenceFileReference[];
  expectedSnippets: SnippetMatch[];
  evidencePresent: boolean;
  optimizationDocumented: boolean;
  behaviorContractPreserved: boolean;
  readyForNodeV241Alignment: boolean;
}

interface EvidenceFileReference {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface SnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

interface ManualSandboxConnectionDisabledCommand {
  id:
    | "review-owner-approval-artifact"
    | "verify-credential-handle"
    | "review-schema-rehearsal"
    | "review-rollback-path"
    | "confirm-timeout-budget"
    | "confirm-manual-abort-marker";
  commandLabel: string;
  source: "node-v239-operator-window-evidence-verification";
  dryRunOnly: true;
  disabledByDefault: true;
  operatorReviewRequired: true;
  carriesCredentialValue: false;
  opensConnection: false;
  mutatesState: false;
}

type ManualSandboxConnectionDryRunCommandPackageChecks = {
  sourceNodeV239Ready: boolean;
  sourceNodeV239StillBlocksConnection: boolean;
  sourceNodeV240QualityPassReady: boolean;
  sourceNodeV240StillNoConnection: boolean;
  javaV97OptimizationReady: boolean;
  miniKvV106OptimizationReady: boolean;
  disabledCommandsComplete: boolean;
  disabledCommandsStillDryRunOnly: boolean;
  packageDigestPresent: boolean;
  packageDisabledByDefault: boolean;
  noCredentialValueCarried: boolean;
  noConnectionAttempted: boolean;
  noSchemaMigrationRequested: boolean;
  noManagedAuditStateWriteRequested: boolean;
  noUpstreamServiceAutoStartRequested: boolean;
  noMiniKvWritePermissionRequested: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: boolean;
};

interface ManualSandboxConnectionDryRunCommandPackageMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "manual-sandbox-connection-dry-run-command-package"
    | "node-v239-operator-window-evidence-verification"
    | "node-v240-route-registration-table-quality-pass"
    | "java-v97-optimization"
    | "mini-kv-v106-optimization"
    | "runtime-config";
  message: string;
}

const JAVA_V97_RUNBOOK = "D:/javaproj/advanced-order-platform/c/97/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V97_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/100-version-97-release-approval-rehearsal-builder-chain-refactor.md";
const JAVA_V97_CHAIN_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder.java";
const MINI_KV_V106_RUNBOOK = "D:/C/mini-kv/c/106/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V106_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/162-version-106-command-dispatch-table.md";
const MINI_KV_COMMAND_CPP = "D:/C/mini-kv/src/command.cpp";

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionDryRunCommandPackageJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package",
  manualSandboxConnectionDryRunCommandPackageMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package?format=markdown",
  sourceNodeV239Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
  sourceNodeV240Json: "/api/v1/audit/managed-audit-route-registration-table-quality-pass",
  activePlan: "docs/plans/v237-post-readiness-gate-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;

export function loadManagedAuditManualSandboxConnectionDryRunCommandPackage(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile {
  const sourceV239Profile = loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification({
    config: input.config,
  });
  const sourceV240Profile = loadManagedAuditRouteRegistrationTableQualityPass({
    config: input.config,
  });
  const sourceNodeV239 = createSourceNodeV239(sourceV239Profile);
  const sourceNodeV240 = createSourceNodeV240(sourceV240Profile);
  const javaV97 = createJavaV97Reference();
  const miniKvV106 = createMiniKvV106Reference();
  const disabledCommands = createDisabledCommands();
  const commandPackage = createCommandPackage(sourceNodeV239, sourceNodeV240, javaV97, miniKvV106, disabledCommands);
  const checks = createChecks(input.config, sourceNodeV239, sourceNodeV240, javaV97, miniKvV106, commandPackage, disabledCommands);
  checks.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDryRunCommandPackage")
    .every(([, value]) => value);
  const packageState = checks.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage
    ? "manual-sandbox-connection-dry-run-command-package-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection dry-run command package",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package.v1",
    packageState,
    readyForManagedAuditManualSandboxConnectionDryRunCommandPackage:
      checks.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyCommandPackage: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV239,
    sourceNodeV240,
    upstreamOptimizationEvidence: {
      javaV97,
      miniKvV106,
    },
    commandPackage,
    disabledCommands,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      disabledCommandCount: disabledCommands.length,
      upstreamOptimizationEvidenceCount: [javaV97, miniKvV106].filter((reference) => reference.readyForNodeV241Alignment)
        .length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v241 as a disabled dry-run command package; do not open a managed audit sandbox connection.",
      "Use the package as the next operator review artifact after Java v97 and mini-kv v106 optimization alignment.",
      "Keep the next real connection step paused until a separate sandbox adapter connection gate explicitly authorizes it.",
    ],
  };
}

export function renderManagedAuditManualSandboxConnectionDryRunCommandPackageMarkdown(
  profile: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile,
): string {
  return [
    "# Managed audit manual sandbox connection dry-run command package",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Package state: ${profile.packageState}`,
    `- Ready for dry-run command package: ${profile.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v239",
    "",
    ...renderEntries(profile.sourceNodeV239),
    "",
    "## Source Node v240",
    "",
    ...renderEntries(profile.sourceNodeV240),
    "",
    "## Java v97 Optimization",
    "",
    ...renderOptimizationReference(profile.upstreamOptimizationEvidence.javaV97),
    "",
    "## mini-kv v106 Optimization",
    "",
    ...renderOptimizationReference(profile.upstreamOptimizationEvidence.miniKvV106),
    "",
    "## Command Package",
    "",
    ...renderEntries(profile.commandPackage),
    "",
    "## Disabled Commands",
    "",
    ...profile.disabledCommands.flatMap(renderDisabledCommand),
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
    ...renderMessages(profile.productionBlockers, "No dry-run command package blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No dry-run command package warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No dry-run command package recommendations."),
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

function createSourceNodeV239(
  source: ManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationProfile,
): ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["sourceNodeV239"] {
  return {
    sourceVersion: "Node v239",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    verificationDigest: source.operatorWindowEvidenceVerification.verificationDigest,
    readyForOperatorWindowEvidenceVerification:
      source.readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
    javaEchoAccepted: source.operatorWindowEvidenceVerification.javaEchoAccepted,
    miniKvReceiptAccepted: source.operatorWindowEvidenceVerification.miniKvReceiptAccepted,
    boundaryFlagsAligned: source.operatorWindowEvidenceVerification.boundaryFlagsAligned,
    readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
  };
}

function createSourceNodeV240(
  source: ManagedAuditRouteRegistrationTableQualityPassProfile,
): ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["sourceNodeV240"] {
  return {
    sourceVersion: "Node v240",
    profileVersion: source.profileVersion,
    qualityPassState: source.qualityPassState,
    qualityDigest: source.qualityDigest,
    routeRegistrationMode: source.refactorScope.routeRegistrationMode,
    auditRoutesAfterLineCount: source.codeShape.auditRoutesAfterLineCount,
    readyForRouteRegistrationTableQualityPass: source.readyForManagedAuditRouteRegistrationTableQualityPass,
    connectsManagedAudit: source.connectsManagedAudit,
  };
}

function createJavaV97Reference(): UpstreamOptimizationReference {
  const evidenceFiles = [
    evidenceFile("java-v97-runbook", JAVA_V97_RUNBOOK),
    evidenceFile("java-v97-walkthrough", JAVA_V97_WALKTHROUGH),
    evidenceFile("java-v97-chain-builder", JAVA_V97_CHAIN_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v97-title", JAVA_V97_WALKTHROUGH, "Java v97"),
    snippet("java-v97-builder-chain", JAVA_V97_WALKTHROUGH, "release approval rehearsal builder chain refactor"),
    snippet("java-v97-contract-preserved", JAVA_V97_WALKTHROUGH, "外部契约和 digest 不变"),
    snippet("java-v97-boundary-preserved", JAVA_V97_WALKTHROUGH, "read-only/no-ledger/no-SQL/no-connection 边界"),
    snippet("java-v97-ops-service-lines", JAVA_V97_WALKTHROUGH, "OpsEvidenceService.java: 606"),
  ];
  return createOptimizationReference({
    sourceVersion: "Java v97",
    tagLabel: "v97订单平台release-approval-rehearsal-builder-chain-refactor",
    optimizationKind: "release approval rehearsal builder chain refactor",
    evidenceFiles,
    expectedSnippets,
    behaviorContractPreserved: snippetMatched(expectedSnippets, "java-v97-contract-preserved")
      && snippetMatched(expectedSnippets, "java-v97-boundary-preserved"),
  });
}

function createMiniKvV106Reference(): UpstreamOptimizationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v106-runbook", MINI_KV_V106_RUNBOOK),
    evidenceFile("mini-kv-v106-walkthrough", MINI_KV_V106_WALKTHROUGH),
    evidenceFile("mini-kv-command-cpp", MINI_KV_COMMAND_CPP),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v106-title", MINI_KV_V106_WALKTHROUGH, "mini-kv v106 command dispatch table"),
    snippet("mini-kv-v106-dispatch-table", MINI_KV_V106_WALKTHROUGH, "dispatch table"),
    snippet("mini-kv-v106-behavior-preserved", MINI_KV_V106_WALKTHROUGH, "保持所有外部行为不变"),
    snippet("mini-kv-v106-command-table-code", MINI_KV_COMMAND_CPP, "command_dispatch_table"),
  ];
  return createOptimizationReference({
    sourceVersion: "mini-kv v106",
    tagLabel: "第一百零六版命令分发表优化",
    optimizationKind: "table-driven command dispatch refactor",
    evidenceFiles,
    expectedSnippets,
    behaviorContractPreserved: snippetMatched(expectedSnippets, "mini-kv-v106-behavior-preserved")
      && snippetMatched(expectedSnippets, "mini-kv-v106-command-table-code"),
  });
}

function createOptimizationReference(input: {
  sourceVersion: UpstreamOptimizationReference["sourceVersion"];
  tagLabel: string;
  optimizationKind: string;
  evidenceFiles: EvidenceFileReference[];
  expectedSnippets: SnippetMatch[];
  behaviorContractPreserved: boolean;
}): UpstreamOptimizationReference {
  const evidencePresent = input.evidenceFiles.every((file) => file.exists);
  const optimizationDocumented = input.expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  return {
    sourceVersion: input.sourceVersion,
    tagLabel: input.tagLabel,
    optimizationKind: input.optimizationKind,
    repoCleanAtReadTime: true,
    remoteSyncedAtReadTime: true,
    evidenceFiles: input.evidenceFiles,
    expectedSnippets: input.expectedSnippets,
    evidencePresent,
    optimizationDocumented,
    behaviorContractPreserved: input.behaviorContractPreserved,
    readyForNodeV241Alignment: evidencePresent && optimizationDocumented && input.behaviorContractPreserved,
  };
}

function createDisabledCommands(): ManualSandboxConnectionDisabledCommand[] {
  return [
    disabledCommand("review-owner-approval-artifact", "Review owner approval artifact id"),
    disabledCommand("verify-credential-handle", "Verify credential handle name only"),
    disabledCommand("review-schema-rehearsal", "Review schema rehearsal evidence id"),
    disabledCommand("review-rollback-path", "Review rollback path id"),
    disabledCommand("confirm-timeout-budget", "Confirm timeout budget"),
    disabledCommand("confirm-manual-abort-marker", "Confirm manual abort marker"),
  ];
}

function disabledCommand(
  id: ManualSandboxConnectionDisabledCommand["id"],
  commandLabel: string,
): ManualSandboxConnectionDisabledCommand {
  return {
    id,
    commandLabel,
    source: "node-v239-operator-window-evidence-verification",
    dryRunOnly: true,
    disabledByDefault: true,
    operatorReviewRequired: true,
    carriesCredentialValue: false,
    opensConnection: false,
    mutatesState: false,
  };
}

function createCommandPackage(
  sourceNodeV239: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["sourceNodeV239"],
  sourceNodeV240: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["sourceNodeV240"],
  javaV97: UpstreamOptimizationReference,
  miniKvV106: UpstreamOptimizationReference,
  disabledCommands: ManualSandboxConnectionDisabledCommand[],
): ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["commandPackage"] {
  const digestInput = {
    profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package.v1",
    sourceNodeV239Digest: sourceNodeV239.verificationDigest,
    sourceNodeV240Digest: sourceNodeV240.qualityDigest,
    javaV97: {
      tagLabel: javaV97.tagLabel,
      readyForNodeV241Alignment: javaV97.readyForNodeV241Alignment,
    },
    miniKvV106: {
      tagLabel: miniKvV106.tagLabel,
      readyForNodeV241Alignment: miniKvV106.readyForNodeV241Alignment,
    },
    disabledCommands: disabledCommands.map((command) => ({
      id: command.id,
      disabledByDefault: command.disabledByDefault,
      dryRunOnly: command.dryRunOnly,
      carriesCredentialValue: command.carriesCredentialValue,
      opensConnection: command.opensConnection,
      mutatesState: command.mutatesState,
    })),
    boundary: {
      actualConnectionAttempted: false,
      schemaMigrationRequested: false,
      managedAuditStateWriteRequested: false,
      upstreamServiceAutoStartRequested: false,
      miniKvWritePermissionRequested: false,
    },
  };
  const packageDigest = sha256StableJson(digestInput);
  return {
    packageDigest,
    packageId: `manual-sandbox-command-package-${packageDigest.slice(0, 16)}`,
    sourceSpan: "Node v239 + Node v240 + Java v97 + mini-kv v106",
    packageMode: "manual-sandbox-connection-disabled-dry-run-command-package",
    commandCount: disabledCommands.length,
    disabledByDefault: true,
    dryRunOnly: true,
    carriesCredentialValue: false,
    actualConnectionAttempted: false,
    schemaMigrationRequested: false,
    managedAuditStateWriteRequested: false,
    upstreamServiceAutoStartRequested: false,
    miniKvWritePermissionRequested: false,
    readyForOperatorReview: sourceNodeV239.readyForOperatorWindowEvidenceVerification
      && sourceNodeV240.readyForRouteRegistrationTableQualityPass
      && javaV97.readyForNodeV241Alignment
      && miniKvV106.readyForNodeV241Alignment
      && disabledCommands.length === 6
      && disabledCommands.every((command) => command.disabledByDefault && command.dryRunOnly),
    readyForManagedAuditSandboxAdapterConnection: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV239: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["sourceNodeV239"],
  sourceNodeV240: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["sourceNodeV240"],
  javaV97: UpstreamOptimizationReference,
  miniKvV106: UpstreamOptimizationReference,
  commandPackage: ManagedAuditManualSandboxConnectionDryRunCommandPackageProfile["commandPackage"],
  disabledCommands: ManualSandboxConnectionDisabledCommand[],
): ManualSandboxConnectionDryRunCommandPackageChecks {
  return {
    sourceNodeV239Ready: sourceNodeV239.readyForOperatorWindowEvidenceVerification
      && sourceNodeV239.verificationState === "manual-sandbox-connection-operator-window-evidence-verification-ready"
      && sourceNodeV239.javaEchoAccepted
      && sourceNodeV239.miniKvReceiptAccepted
      && sourceNodeV239.boundaryFlagsAligned,
    sourceNodeV239StillBlocksConnection: !sourceNodeV239.readyForSandboxAdapterConnectionFromSource
      && !sourceNodeV239.connectsManagedAudit
      && !sourceNodeV239.readsManagedAuditCredential
      && !sourceNodeV239.schemaMigrationExecuted,
    sourceNodeV240QualityPassReady: sourceNodeV240.readyForRouteRegistrationTableQualityPass
      && sourceNodeV240.qualityPassState === "verified-quality-pass"
      && sourceNodeV240.routeRegistrationMode === "configuration-table",
    sourceNodeV240StillNoConnection: !sourceNodeV240.connectsManagedAudit,
    javaV97OptimizationReady: javaV97.readyForNodeV241Alignment,
    miniKvV106OptimizationReady: miniKvV106.readyForNodeV241Alignment,
    disabledCommandsComplete: disabledCommands.length === 6,
    disabledCommandsStillDryRunOnly: disabledCommands.every((command) => (
      command.disabledByDefault
      && command.dryRunOnly
      && command.operatorReviewRequired
      && !command.carriesCredentialValue
      && !command.opensConnection
      && !command.mutatesState
    )),
    packageDigestPresent: SHA256_HEX.test(commandPackage.packageDigest)
      && commandPackage.packageId === `manual-sandbox-command-package-${commandPackage.packageDigest.slice(0, 16)}`,
    packageDisabledByDefault: commandPackage.disabledByDefault && commandPackage.dryRunOnly,
    noCredentialValueCarried: !commandPackage.carriesCredentialValue,
    noConnectionAttempted: !commandPackage.actualConnectionAttempted,
    noSchemaMigrationRequested: !commandPackage.schemaMigrationRequested,
    noManagedAuditStateWriteRequested: !commandPackage.managedAuditStateWriteRequested,
    noUpstreamServiceAutoStartRequested: !commandPackage.upstreamServiceAutoStartRequested,
    noMiniKvWritePermissionRequested: !commandPackage.miniKvWritePermissionRequested,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: false,
  };
}

function collectProductionBlockers(
  checks: ManualSandboxConnectionDryRunCommandPackageChecks,
): ManualSandboxConnectionDryRunCommandPackageMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ManualSandboxConnectionDryRunCommandPackageMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV239Ready,
      code: "NODE_V239_EVIDENCE_NOT_READY",
      source: "node-v239-operator-window-evidence-verification",
      message: "Node v239 operator window evidence verification must be ready before packaging commands.",
    },
    {
      condition: checks.sourceNodeV240QualityPassReady,
      code: "NODE_V240_QUALITY_PASS_NOT_READY",
      source: "node-v240-route-registration-table-quality-pass",
      message: "Node v240 route registration table quality pass must remain ready before adding another audit route.",
    },
    {
      condition: checks.javaV97OptimizationReady,
      code: "JAVA_V97_OPTIMIZATION_NOT_READY",
      source: "java-v97-optimization",
      message: "Java v97 optimization evidence must be present before Node v241 alignment.",
    },
    {
      condition: checks.miniKvV106OptimizationReady,
      code: "MINI_KV_V106_OPTIMIZATION_NOT_READY",
      source: "mini-kv-v106-optimization",
      message: "mini-kv v106 optimization evidence must be present before Node v241 alignment.",
    },
    {
      condition: checks.disabledCommandsStillDryRunOnly,
      code: "COMMAND_PACKAGE_NOT_DRY_RUN_ONLY",
      source: "manual-sandbox-connection-dry-run-command-package",
      message: "Every command package entry must remain disabled, dry-run only, non-mutating, and connection-free.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for the v241 package.",
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

function collectWarnings(): ManualSandboxConnectionDryRunCommandPackageMessage[] {
  return [
    {
      code: "DRY_RUN_COMMAND_PACKAGE_IS_NOT_CONNECTION_APPROVAL",
      severity: "warning",
      source: "manual-sandbox-connection-dry-run-command-package",
      message: "The package is ready for operator review only; it does not authorize a real sandbox connection.",
    },
  ];
}

function collectRecommendations(): ManualSandboxConnectionDryRunCommandPackageMessage[] {
  return [
    {
      code: "NEXT_GATE_SHOULD_RECHECK_SANDBOX_CONNECTION_AUTHORIZATION",
      severity: "recommendation",
      source: "manual-sandbox-connection-dry-run-command-package",
      message: "The next Node gate should re-check explicit authorization before any adapter tries to connect.",
    },
    {
      code: "KEEP_JAVA_MINIKV_OPTIMIZATION_EVIDENCE_AS_CONTEXT",
      severity: "recommendation",
      source: "manual-sandbox-connection-dry-run-command-package",
      message: "Java v97 and mini-kv v106 are quality context, not write or connection permission.",
    },
  ];
}

function evidenceFile(id: string, path: string): EvidenceFileReference {
  if (!existsSync(path)) {
    return {
      id,
      path,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
  const content = readFileSync(path);
  return {
    id,
    path,
    exists: true,
    sizeBytes: statSync(path).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, path: string, expectedText: string): SnippetMatch {
  if (!existsSync(path)) {
    return {
      id,
      path,
      expectedText,
      matched: false,
    };
  }
  return {
    id,
    path,
    expectedText,
    matched: readFileSync(path, "utf8").includes(expectedText),
  };
}

function snippetMatched(snippets: SnippetMatch[], id: string): boolean {
  return snippets.find((snippetMatch) => snippetMatch.id === id)?.matched ?? false;
}

function renderOptimizationReference(reference: UpstreamOptimizationReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      tagLabel: reference.tagLabel,
      optimizationKind: reference.optimizationKind,
      repoCleanAtReadTime: reference.repoCleanAtReadTime,
      remoteSyncedAtReadTime: reference.remoteSyncedAtReadTime,
      evidencePresent: reference.evidencePresent,
      optimizationDocumented: reference.optimizationDocumented,
      behaviorContractPreserved: reference.behaviorContractPreserved,
      readyForNodeV241Alignment: reference.readyForNodeV241Alignment,
    }),
    "",
    "### Evidence Files",
    "",
    ...reference.evidenceFiles.flatMap(renderEvidenceFile),
    "### Snippet Matches",
    "",
    ...reference.expectedSnippets.flatMap(renderSnippet),
  ];
}

function renderEvidenceFile(file: EvidenceFileReference): string[] {
  return [
    `- ${file.id}`,
    `  - path: ${file.path}`,
    `  - exists: ${file.exists}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippetMatch: SnippetMatch): string[] {
  return [
    `- ${snippetMatch.id}`,
    `  - path: ${snippetMatch.path}`,
    `  - expectedText: ${snippetMatch.expectedText}`,
    `  - matched: ${snippetMatch.matched}`,
  ];
}

function renderDisabledCommand(command: ManualSandboxConnectionDisabledCommand): string[] {
  return [
    `- ${command.id}`,
    `  - commandLabel: ${command.commandLabel}`,
    `  - source: ${command.source}`,
    `  - dryRunOnly: ${command.dryRunOnly}`,
    `  - disabledByDefault: ${command.disabledByDefault}`,
    `  - operatorReviewRequired: ${command.operatorReviewRequired}`,
    `  - carriesCredentialValue: ${command.carriesCredentialValue}`,
    `  - opensConnection: ${command.opensConnection}`,
    `  - mutatesState: ${command.mutatesState}`,
  ];
}
