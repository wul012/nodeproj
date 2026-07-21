import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  isDigest,
  numberValue,
  stringValue,
  valueAt,
  type ParsedArchiveEvidence,
} from "./archiveVerification/kernel.js";
import { createIntegrationArchiveChecks } from "./archiveVerification/integration.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile,
  MinimalReadOnlyIntegrationGateExecutionArchiveFileReference,
  MinimalReadOnlyIntegrationGateExecutionArchiveReferences,
  MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks,
  MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage,
  MinimalReadOnlyIntegrationGateExecutionArchiveVerificationRecord,
  MinimalReadOnlyIntegrationGateExecutionArchiveVerificationSummary,
  MinimalReadOnlyIntegrationGateExecutionOperatorCiHandoffCheck,
  SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
  MinimalReadOnlyIntegrationSmokeTargetStatus,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification";
const SOURCE_NODE_V367_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution";
const ACTIVE_PLAN = "docs/plans2/v367-post-minimal-read-only-integration-gate-execution-roadmap.md";
const NEXT_PLAN = "docs/plans3/v368-post-minimal-read-only-integration-gate-execution-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/367" as const;
const V367_BASENAME = "minimal-read-only-integration-gate-execution-v367";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/372-minimal-read-only-integration-gate-execution-v367.md";
const EXPECTED_MINI_KV_READ_COMMANDS = ["HEALTH", "INFOJSON", "STATSJSON"] as const;
const EXPECTED_JAVA_GETS = ["GET /actuator/health", "GET /api/v1/ops/overview"] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const targetResults = createTargetResults(parsedArchive);
  const sourceNodeV367 = createSourceNodeV367(parsedArchive);
  const operatorCiHandoffCheck = createOperatorCiHandoffCheck(sourceNodeV367);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV367, archiveReferences, false);
  const checks = createIntegrationArchiveChecks({
    config: input.config,
    source: sourceNodeV367,
    refs: archiveReferences,
    archive: parsedArchive,
    targetResults,
    verification: draftArchiveVerification,
    operatorCiCheck: operatorCiHandoffCheck,
    archiveFiles: archiveFileReferences(archiveReferences),
    sourceRoute: SOURCE_NODE_V367_ROUTE,
    expectedJavaGets: EXPECTED_JAVA_GETS,
    expectedMiniKvReads: EXPECTED_MINI_KV_READ_COMMANDS,
  });
  checks.readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV367, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  checks.operatorCiCheckDigestStable = isDigest(operatorCiHandoffCheck.checkDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV367);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV367, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "minimal-read-only-integration-gate-execution-archive-verified" : "blocked",
    archiveVerificationDecision: ready
      ? "archive-minimal-read-only-gate-execution-and-operator-ci-handoff"
      : "blocked",
    readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: ready,
    readyForNodeV369OperatorCiRegularGateHandoff: ready,
    consumesNodeV367MinimalReadOnlyIntegrationGateExecution: true,
    activeNodeVersion: "Node v368",
    sourceNodeVersion: "Node v367",
    archiveVerificationOnly: true,
    operatorCiHandoffCheckIncluded: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    requiresParallelJavaMiniKvReadContractFix: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV367,
    targetResults,
    archiveVerification,
    operatorCiHandoffCheck,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      gateExecutionArchiveVerificationJson: ROUTE_PATH,
      gateExecutionArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV367Json: SOURCE_NODE_V367_ROUTE,
      sourceNodeV367Markdown: `${SOURCE_NODE_V367_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v369",
    },
    nextActions: ready
      ? [
        "Use Node v369 to turn the v367 gate execution into an operator/CI regular gate handoff.",
        "Keep future actual probe runs behind an explicit Java/mini-kv read window; Node must not auto-start upstream services.",
        "Switch the next roadmap from Node-fronted approvals to contract-consumer mode so Java and mini-kv can progress shard-readiness work in parallel.",
      ]
      : [
        "Fix the v367 gate execution archive before proceeding to Node v369.",
        "Do not use this archive verification to request Java/mini-kv changes unless the v367 target contract itself is invalid.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): MinimalReadOnlyIntegrationGateExecutionArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V367_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V367_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V367_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V367_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V367_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V367_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V367_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): MinimalReadOnlyIntegrationGateExecutionArchiveFileReference {
  const relativePath = path.join(...segments).replace(/\\/g, "/");
  const absolutePath = path.join(projectRoot, ...segments);
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, byteLength: 0, digest: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    byteLength: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function readParsedArchiveEvidence(
  projectRoot: string,
  refs: MinimalReadOnlyIntegrationGateExecutionArchiveReferences,
): ParsedArchiveEvidence {
  return {
    json: readJsonFile(projectRoot, refs.jsonEvidence.path),
    markdown: readTextFile(projectRoot, refs.markdownEvidence.path),
    summary: readJsonFile(projectRoot, refs.summaryEvidence.path),
    browserSnapshot: readTextFile(projectRoot, refs.browserSnapshot.path),
    explanation: readTextFile(projectRoot, refs.explanation.path),
    codeWalkthrough: readTextFile(projectRoot, refs.codeWalkthrough.path),
    sourcePlan: readTextFile(projectRoot, refs.sourcePlan.path),
    plansIndex: readTextFile(projectRoot, refs.plansIndex.path),
    archiveIndex: readTextFile(projectRoot, refs.archiveIndex.path),
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "") : "";
}

function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const text = readTextFile(projectRoot, relativePath);
  if (text.length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(text);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

function createSourceNodeV367(
  archive: ParsedArchiveEvidence,
): SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference {
  return {
    sourceVersion: "Node v367",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1",
    gateExecutionState: gateExecutionState(archive),
    gateExecutionResult: gateExecutionResult(archive),
    gateExecutionDecision: gateExecutionDecision(archive),
    readyForMinimalReadOnlyIntegrationGateExecution:
      valueAt(archive.json, "readyForMinimalReadOnlyIntegrationGateExecution") === true,
    consumesNodeV366ExplicitReadWindowGateExecutionDecision:
      valueAt(archive.json, "consumesNodeV366ExplicitReadWindowGateExecutionDecision") === true,
    reusesNodeV349MinimalReadOnlySmokeLane:
      valueAt(archive.json, "reusesNodeV349MinimalReadOnlySmokeLane") === true,
    sourceNodeVersion: "Node v366",
    sourceNodeV366Ready: valueAt(archive.json, "sourceNodeV366", "readyForDecision") === true,
    sourceDecisionDigest: stringValue(valueAt(archive.json, "gateExecution", "sourceDecisionDigest")),
    reusedSmokeArchiveDigest: nullableStringValue(valueAt(archive.json, "gateExecution", "reusedSmokeArchiveDigest")),
    gateExecutionDigest: stringValue(valueAt(archive.json, "gateExecution", "executionDigest")),
    externalReadWindowConfirmed: valueAt(archive.json, "externalReadWindowConfirmed") === true,
    liveProbePerformedNow: valueAt(archive.json, "liveProbePerformedNow") === true,
    attemptedTargetCount: numberValue(valueAt(archive.json, "summary", "attemptedTargetCount")),
    passedTargetCount: numberValue(valueAt(archive.json, "summary", "passedTargetCount")),
    unavailableTargetCount: numberValue(valueAt(archive.json, "summary", "unavailableTargetCount")),
    invalidContractTargetCount: numberValue(valueAt(archive.json, "summary", "invalidContractTargetCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    requiresParallelJavaMiniKvReadContractFix:
      valueAt(archive.json, "requiresParallelJavaMiniKvReadContractFix") === true,
  };
}

function createTargetResults(archive: ParsedArchiveEvidence): MinimalReadOnlyIntegrationSmokeTargetResult[] {
  const sourceTargets = valueAt(archive.json, "targetResults");
  if (!Array.isArray(sourceTargets)) {
    return [];
  }
  return sourceTargets.map((target) => {
    const record = target !== null && typeof target === "object" && !Array.isArray(target)
      ? target as Record<string, unknown>
      : {};
    return {
      project: record.project === "mini-kv" ? "mini-kv" : "java",
      targetName: stringValue(record.targetName),
      methodOrCommand: stringValue(record.methodOrCommand),
      readOnly: true,
      mutatesState: false,
      attempted: record.attempted === true,
      status: smokeTargetStatus(record.status),
      latencyMs: nullableNumberValue(record.latencyMs),
      statusCode: nullableNumberValue(record.statusCode),
      responseShape: stringValue(record.responseShape),
      errorCode: nullableStringValue(record.errorCode),
      errorMessage: nullableStringValue(record.errorMessage),
    };
  });
}

function createArchiveVerification(
  source: SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference,
  refs: MinimalReadOnlyIntegrationGateExecutionArchiveReferences,
  ready: boolean,
): MinimalReadOnlyIntegrationGateExecutionArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  return {
    archiveVerificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      ready,
      source,
      fileDigests,
    }),
    verificationMode: "minimal-read-only-integration-gate-execution-archive-verification",
    sourceSpan: "Node v367 minimal read-only integration gate execution",
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-minimal-read-only-gate-execution-and-operator-ci-handoff"
      : "blocked",
    sourceGateExecutionDigest: source.gateExecutionDigest,
    sourceDecisionDigest: source.sourceDecisionDigest,
    reusedSmokeArchiveDigest: source.reusedSmokeArchiveDigest,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    verifiesPlanAndArchiveIndexes: true,
    verifiesOperatorCiHandoffReadiness: true,
    rerunsLiveProbe: false,
    startsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    requestsJavaMiniKvEcho: false,
    nextNodeVersionSuggested: "Node v369",
    archiveFileDigests: fileDigests,
  };
}

function createOperatorCiHandoffCheck(
  source: SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference,
): MinimalReadOnlyIntegrationGateExecutionOperatorCiHandoffCheck {
  const record = {
    checkMode: "operator-ci-regular-minimal-read-only-gate-execution" as const,
    sourceRoute: SOURCE_NODE_V367_ROUTE,
    sourceMarkdownRoute: `${SOURCE_NODE_V367_ROUTE}?format=markdown`,
    archiveVerificationRoute: ROUTE_PATH,
    focusedTestCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts",
    groupedTestCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts",
    buildCommand: "npm.cmd run build",
    smokeCommand: "Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for archive verification route",
    readOnlyTargetCount: source.attemptedTargetCount,
    expectedPassedTargetCount: 5 as const,
    expectedPassedCheckCount: 20 as const,
    avoidsFullTestBatchByDefault: true as const,
    splitsVerificationIntoFocusedSteps: true as const,
    requiresExternalReadWindowForActualProbe: true as const,
    automaticUpstreamStart: false as const,
    rerunsJavaMiniKvNow: false as const,
    opensManagedAuditConnection: false as const,
    readsCredentialValue: false as const,
    parsesRawEndpointUrl: false as const,
    invokesRuntimeShell: false as const,
  };
  return {
    checkDigest: sha256StableJson(record),
    ...record,
  };
}

function archiveFileReferences(
  refs: MinimalReadOnlyIntegrationGateExecutionArchiveReferences,
): MinimalReadOnlyIntegrationGateExecutionArchiveFileReference[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.summaryEvidence,
    refs.browserSnapshot,
    refs.htmlArchive,
    refs.screenshot,
    refs.explanation,
    refs.codeWalkthrough,
    refs.sourcePlan,
    refs.plansIndex,
    refs.archiveIndex,
  ];
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks,
): MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage["source"], string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v367 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v367 JSON evidence must be readable."],
    [checks.jsonGateExecutionPassed, "SOURCE_GATE_EXECUTION_NOT_PASSED", "node-v367", "v367 must record a passed gate execution."],
    [checks.jsonReusedSmokeLaneReady, "SOURCE_SMOKE_LANE_NOT_REUSED", "archive-json", "v367 must reuse the Node v349 smoke lane."],
    [checks.jsonTargetResultsComplete, "TARGET_RESULTS_INCOMPLETE", "archive-json", "v367 must include five attempted read targets."],
    [checks.jsonTargetResultsAllPassed, "TARGET_RESULTS_NOT_ALL_PASSED", "archive-json", "v367 must record 5/5 read-passed targets."],
    [checks.jsonCountsMatchTargetResults, "TARGET_COUNTS_MISMATCH", "archive-json", "v367 summary counts must match target results."],
    [checks.jsonChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json", "v367 must have 20/20 checks passed."],
    [checks.markdownRecordsPassedExecution, "MARKDOWN_EXECUTION_DETAIL_MISSING", "archive-markdown", "v367 Markdown must record passed execution."],
    [checks.explanationRecordsExecutionAndBoundary, "EXPLANATION_INCOMPLETE", "archive-docs", "v367 explanation must record execution and closed boundaries."],
    [checks.sourcePlanPointsToV368, "SOURCE_PLAN_NOT_ALIGNED", "archive-docs", "v367 source plan must point to v368 archive verification."],
    [checks.operatorCiCheckUsesFocusedCommands, "OPERATOR_CI_COMMANDS_NOT_FOCUSED", "operator-ci-handoff", "v368 must keep focused verification commands."],
    [checks.operatorCiCheckKeepsReadWindowExplicit, "READ_WINDOW_NOT_EXPLICIT", "operator-ci-handoff", "Actual probes still require an explicit read window."],
    [checks.noAutomaticUpstreamStart, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary", "v368 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary", "v368 must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary", "v368 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary", "v368 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary", "v368 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary", "Runtime shell must remain unimplemented."],
    [checks.noJavaMiniKvFixRequired, "UNNEEDED_JAVA_MINI_KV_FIX_REQUESTED", "archive-verification", "v368 must not request Java/mini-kv fixes from a passed v367 gate."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference,
): MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[] {
  return [{
    code: "V367_GATE_EXECUTION_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v367",
    message:
      `v368 verified v367 as ${source.gateExecutionDecision} with ${source.passedTargetCount}/${source.attemptedTargetCount} read targets passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V369_OPERATOR_CI_HANDOFF" : "FIX_V367_ARCHIVE_BEFORE_V369",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed to operator/CI regular gate handoff, then let Java and mini-kv advance shard-readiness outputs in parallel."
      : "Keep the stage blocked until the v367 gate execution archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference,
  refs: MinimalReadOnlyIntegrationGateExecutionArchiveReferences,
  checks: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks,
  productionBlockers: readonly MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[],
  warnings: readonly MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[],
): MinimalReadOnlyIntegrationGateExecutionArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    attemptedTargetCount: source.attemptedTargetCount,
    passedTargetCount: source.passedTargetCount,
    readOnlyTargetCount: source.attemptedTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function gateExecutionState(
  archive: ParsedArchiveEvidence,
): SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference["gateExecutionState"] {
  return valueAt(archive.json, "gateExecutionState") === "minimal-read-only-integration-gate-executed"
    ? "minimal-read-only-integration-gate-executed"
    : "blocked";
}

function gateExecutionResult(
  archive: ParsedArchiveEvidence,
): SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference["gateExecutionResult"] {
  const result = valueAt(archive.json, "gateExecutionResult");
  return result === "all-read-passed"
    || result === "read-window-unavailable"
    || result === "invalid-read-contract"
    ? result
    : "blocked";
}

function gateExecutionDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference["gateExecutionDecision"] {
  const decision = valueAt(archive.json, "gateExecutionDecision");
  return decision === "archive-read-passed-gate-execution"
    || decision === "archive-read-window-unavailable-gate-execution"
    || decision === "request-java-mini-kv-read-contract-fix"
    ? decision
    : "blocked";
}

function nullableStringValue(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function nullableNumberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function smokeTargetStatus(value: unknown): MinimalReadOnlyIntegrationSmokeTargetStatus {
  return value === "read-passed"
    || value === "connection-refused"
    || value === "timeout"
    || value === "invalid-json"
    || value === "unexpected-status"
    ? value
    : "unexpected-status";
}
