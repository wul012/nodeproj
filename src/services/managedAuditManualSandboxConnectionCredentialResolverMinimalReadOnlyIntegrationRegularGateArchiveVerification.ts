import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile,
  MinimalReadOnlyIntegrationRegularGateArchiveFileReference,
  MinimalReadOnlyIntegrationRegularGateArchiveReferences,
  MinimalReadOnlyIntegrationRegularGateArchiveVerificationChecks,
  MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage,
  MinimalReadOnlyIntegrationRegularGateArchiveVerificationRecord,
  MinimalReadOnlyIntegrationRegularGateArchiveVerificationSummary,
  MinimalReadOnlyIntegrationRegularGateCiOperatorFriendlyCheck,
  SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification";
const SOURCE_NODE_V364_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate";
const ACTIVE_PLAN = "docs/plans2/v364-post-minimal-read-only-integration-regular-gate-roadmap.md";
const NEXT_PLAN = "docs/plans2/v365-post-minimal-read-only-integration-regular-gate-archive-roadmap.md";
const ARCHIVE_ROOT = "d/364" as const;
const V364_BASENAME = "minimal-read-only-integration-regular-gate-v364";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/369-minimal-read-only-integration-regular-gate-v364.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  summary: Record<string, unknown> | null;
  browserSnapshot: string;
  explanation: string;
  codeWalkthrough: string;
  sourcePlan: string;
  plansIndex: string;
  archiveIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV364 = createSourceNodeV364(parsedArchive);
  const ciOperatorFriendlyCheck = createCiOperatorFriendlyCheck(sourceNodeV364);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV364, archiveReferences, false);
  const checks = createChecks(input.config, sourceNodeV364, archiveReferences, parsedArchive, draftArchiveVerification,
    ciOperatorFriendlyCheck);
  checks.readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV364, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  checks.ciOperatorCheckDigestStable = isDigest(ciOperatorFriendlyCheck.checkDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV364);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV364, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal read-only integration regular gate archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "minimal-read-only-integration-regular-gate-archive-verified" : "blocked",
    archiveVerificationDecision: ready
      ? "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check"
      : "blocked",
    readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification: ready,
    readyForNodeV366ExplicitReadWindowGateExecutionDecision: ready,
    consumesNodeV364MinimalReadOnlyIntegrationRegularGate: true,
    activeNodeVersion: "Node v365",
    sourceNodeVersion: "Node v364",
    archiveVerificationOnly: true,
    ciOperatorFriendlyCheckIncluded: true,
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
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV364,
    archiveVerification,
    ciOperatorFriendlyCheck,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      regularGateArchiveVerificationJson: ROUTE_PATH,
      regularGateArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV364Json: SOURCE_NODE_V364_ROUTE,
      sourceNodeV364Markdown: `${SOURCE_NODE_V364_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v366",
    },
    nextActions: ready
      ? [
        "Use Node v366 to decide whether an explicit read-window gate execution is available; do not add another closure chain.",
        "If Java or mini-kv is not running in an approved read window, stop at wait-for-external-read-window.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
      ]
      : [
        "Fix the v364 regular gate archive before proceeding to Node v366.",
        "Do not request Java/mini-kv changes from a broken v364 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): MinimalReadOnlyIntegrationRegularGateArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V364_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V364_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V364_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V364_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V364_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V364_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V364_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): MinimalReadOnlyIntegrationRegularGateArchiveFileReference {
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
  refs: MinimalReadOnlyIntegrationRegularGateArchiveReferences,
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

function createSourceNodeV364(
  archive: ParsedArchiveEvidence,
): SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference {
  return {
    sourceVersion: "Node v364",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1",
    gateState: gateState(archive),
    gateDecision: gateDecision(archive),
    readyForMinimalReadOnlyIntegrationRegularGate:
      valueAt(archive.json, "readyForMinimalReadOnlyIntegrationRegularGate") === true,
    readyForNodeV365RegularGateArchiveVerification:
      valueAt(archive.json, "readyForNodeV365RegularGateArchiveVerification") === true,
    gateDigest: stringValue(valueAt(archive.json, "regularGate", "gateDigest")),
    sourceTransitionDigest: stringValue(valueAt(archive.json, "regularGate", "sourceTransitionDigest")),
    sourceArchiveDigest: stringValue(valueAt(archive.json, "regularGate", "sourceArchiveDigest")),
    sourceNodeVersion: "Node v350",
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    attemptedTargetCount: numberValue(valueAt(archive.json, "summary", "attemptedTargetCount")),
    passedTargetCount: numberValue(valueAt(archive.json, "summary", "passedTargetCount")),
    readOnlyTargetCount: numberValue(valueAt(archive.json, "summary", "readOnlyTargetCount")),
    requiredEnvCount: numberValue(valueAt(archive.json, "summary", "requiredEnvCount")),
    requiredHeaderCount: numberValue(valueAt(archive.json, "summary", "requiredHeaderCount")),
    failureClassificationCount: numberValue(valueAt(archive.json, "summary", "failureClassificationCount")),
    artifactExpectationCount: numberValue(valueAt(archive.json, "summary", "artifactExpectationCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    regularGateOnly: true,
    gateDefinitionOnly: true,
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
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
  };
}

function createArchiveVerification(
  source: SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference,
  refs: MinimalReadOnlyIntegrationRegularGateArchiveReferences,
  ready: boolean,
): MinimalReadOnlyIntegrationRegularGateArchiveVerificationRecord {
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
    verificationMode: "minimal-read-only-integration-regular-gate-archive-verification",
    sourceSpan: "Node v364 minimal read-only integration regular gate",
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check"
      : "blocked",
    sourceGateDigest: source.gateDigest,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    verifiesPlanAndArchiveIndexes: true,
    verifiesCiOperatorFriendlyCheck: true,
    rerunsLiveProbe: false,
    startsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    requestsJavaMiniKvEcho: false,
    nextNodeVersionSuggested: "Node v366",
    archiveFileDigests: fileDigests,
  };
}

function createCiOperatorFriendlyCheck(
  source: SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference,
): MinimalReadOnlyIntegrationRegularGateCiOperatorFriendlyCheck {
  const record = {
    checkMode: "focused-ci-operator-friendly-regular-gate" as const,
    focusedTestCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts",
    groupedTestCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.test.ts",
    buildCommand: "npm.cmd run build",
    smokeRoute: SOURCE_NODE_V364_ROUTE,
    smokeMarkdownRoute: `${SOURCE_NODE_V364_ROUTE}?format=markdown`,
    requiredHeaderCount: source.requiredHeaderCount,
    readOnlyTargetCount: source.readOnlyTargetCount,
    failureClassificationCount: source.failureClassificationCount,
    splitsVerificationIntoFocusedSteps: true as const,
    avoidsFullTestBatchByDefault: true as const,
    requiresExplicitReadWindowForActualProbe: true as const,
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

function createChecks(
  config: AppConfig,
  source: SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference,
  refs: MinimalReadOnlyIntegrationRegularGateArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: MinimalReadOnlyIntegrationRegularGateArchiveVerificationRecord,
  ciCheck: MinimalReadOnlyIntegrationRegularGateCiOperatorFriendlyCheck,
): MinimalReadOnlyIntegrationRegularGateArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1",
    jsonGateReadyForV365:
      source.gateState === "minimal-read-only-integration-regular-gate-ready"
      && source.readyForMinimalReadOnlyIntegrationRegularGate
      && source.readyForNodeV365RegularGateArchiveVerification,
    jsonSourceV350Ready:
      valueAt(archive.json, "sourceNodeV350", "readyForPassedArchiveVerification") === true
      && valueAt(archive.json, "sourceNodeV350", "sourceNodeV349Result") === "all-read-passed",
    jsonRegularGateRecorded:
      isDigest(source.gateDigest)
      && valueAt(archive.json, "regularGate", "gateMode") === "minimal-read-only-integration-regular-gate"
      && valueAt(archive.json, "regularGate", "gateDecision") === "standardize-v349-read-only-smoke-as-regular-gate",
    jsonReadOnlyTargetsComplete:
      source.readOnlyTargetCount === 5
      && arrayLength(valueAt(archive.json, "regularGate", "readOnlyTargets")) === 5,
    jsonSafeEnvComplete:
      source.requiredEnvCount === 4
      && arrayLength(valueAt(archive.json, "regularGate", "requiredEnv")) === 4,
    jsonRequiredHeadersComplete:
      source.requiredHeaderCount === 4
      && arrayLength(valueAt(archive.json, "regularGate", "requiredHeaders")) === 4,
    jsonFailureClassificationsComplete:
      source.failureClassificationCount === 3
      && arrayLength(valueAt(archive.json, "regularGate", "failureClassifications")) === 3,
    jsonChecksAllPassed: source.checkCount === 34 && source.passedCheckCount === 34 && source.productionBlockerCount === 0,
    summaryMatchesJson:
      valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readOnlyTargetCount") === source.readOnlyTargetCount,
    markdownRecordsGateDecision:
      archive.markdown.includes("Gate decision: standardize-v349-read-only-smoke-as-regular-gate")
      && archive.markdown.includes("Ready for v365 archive verification: true"),
    markdownRecordsTargetsAndSafeEnv:
      archive.markdown.includes("UPSTREAM_PROBES_ENABLED=true")
      && archive.markdown.includes("GET /api/v1/ops/overview")
      && archive.markdown.includes("STATSJSON"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("Node v364 minimal read-only integration regular gate"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsGateAndBoundary:
      archive.explanation.includes("standardize-v349-read-only-smoke-as-regular-gate")
      && archive.explanation.includes("不读取 credential value")
      && archive.explanation.includes("不解析 raw endpoint URL"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v364")
      && archive.codeWalkthrough.includes("createRegularGate")
      && archive.codeWalkthrough.includes("createChecks"),
    sourcePlanPointsToV365:
      archive.sourcePlan.includes("Node v365")
      && archive.sourcePlan.includes("CI/operator friendly")
      && archive.sourcePlan.includes("不读取 credential value"),
    planIndexReferencesV364AndV365:
      archive.plansIndex.includes("Node v364")
      && archive.plansIndex.includes("Node v365")
      && archive.plansIndex.includes("v364-post-minimal-read-only-integration-regular-gate-roadmap.md"),
    archiveIndexReferencesV364:
      archive.archiveIndex.includes("364：credential resolver minimal read-only integration regular gate"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "minimalReadOnlyIntegrationRegularGateJson") === SOURCE_NODE_V364_ROUTE
      && valueAt(archive.json, "evidenceEndpoints", "minimalReadOnlyIntegrationRegularGateMarkdown")
      === `${SOURCE_NODE_V364_ROUTE}?format=markdown`,
    archiveVerificationDoesNotRerunProbe: !verification.rerunsLiveProbe,
    ciCheckUsesFocusedCommands:
      ciCheck.focusedTestCommand.includes("RegularGate.test.ts")
      && ciCheck.groupedTestCommand.includes("SmokeRerunArchive.test.ts")
      && ciCheck.buildCommand === "npm.cmd run build",
    ciCheckDocumentsOperatorHeaders: ciCheck.requiredHeaderCount === 4,
    ciCheckKeepsReadWindowExplicit: ciCheck.requiresExplicitReadWindowForActualProbe && !ciCheck.rerunsJavaMiniKvNow,
    ciCheckAvoidsLargeTestBatch: ciCheck.avoidsFullTestBatchByDefault && ciCheck.splitsVerificationIntoFocusedSteps,
    noAutomaticUpstreamStart:
      !verification.startsUpstreamServices && !ciCheck.automaticUpstreamStart && valueAt(archive.json, "startsJavaService") === false,
    noUpstreamMutation:
      !verification.writesUpstreamState
      && valueAt(archive.json, "mutatesJavaState") === false
      && valueAt(archive.json, "mutatesMiniKvState") === false,
    noManagedAuditConnection:
      !verification.opensManagedAuditConnection
      && !config.upstreamActionsEnabled
      && valueAt(archive.json, "connectsManagedAudit") === false,
    noCredentialValueRequestedOrRead:
      valueAt(archive.json, "credentialValueRequested") === false
      && valueAt(archive.json, "credentialValueRead") === false,
    noRawEndpointUrlRequestedOrParsed:
      valueAt(archive.json, "rawEndpointUrlRequested") === false
      && valueAt(archive.json, "rawEndpointUrlParsed") === false,
    noProviderClientInstantiated:
      valueAt(archive.json, "secretProviderInstantiated") === false
      && valueAt(archive.json, "resolverClientInstantiated") === false,
    noRuntimeShellImplementedOrInvoked:
      valueAt(archive.json, "runtimeShellImplemented") === false
      && valueAt(archive.json, "runtimeShellInvocationAllowed") === false,
    noJavaMiniKvEchoRequired:
      !verification.requestsJavaMiniKvEcho
      && valueAt(archive.json, "requiresParallelJavaV153MiniKvV144ReadOnlyEcho") === false,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    ciOperatorCheckDigestStable: isDigest(ciCheck.checkDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification: false,
  };
}

function archiveFileReferences(
  refs: MinimalReadOnlyIntegrationRegularGateArchiveReferences,
): MinimalReadOnlyIntegrationRegularGateArchiveFileReference[] {
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
  checks: MinimalReadOnlyIntegrationRegularGateArchiveVerificationChecks,
): MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage["source"], string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v364 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v364 JSON evidence must be readable."],
    [checks.jsonGateReadyForV365, "SOURCE_GATE_NOT_READY", "node-v364", "v364 must be ready for v365 archive verification."],
    [checks.jsonRegularGateRecorded, "REGULAR_GATE_NOT_RECORDED", "archive-json", "v364 must record the regular gate digest and decision."],
    [checks.jsonChecksAllPassed, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json", "v364 regular gate must have 34/34 checks passed."],
    [checks.markdownRecordsTargetsAndSafeEnv, "MARKDOWN_GATE_DETAIL_MISSING", "archive-markdown", "v364 Markdown must record safe env and read-only targets."],
    [checks.explanationRecordsGateAndBoundary, "EXPLANATION_INCOMPLETE", "archive-docs", "v364 explanation must record gate and closed boundaries."],
    [checks.sourcePlanPointsToV365, "SOURCE_PLAN_NOT_ALIGNED", "archive-docs", "v364 source plan must point to v365 archive + CI/operator check."],
    [checks.ciCheckUsesFocusedCommands, "CI_OPERATOR_COMMANDS_NOT_FOCUSED", "ci-operator-check", "v365 must split verification into focused commands."],
    [checks.ciCheckKeepsReadWindowExplicit, "READ_WINDOW_NOT_EXPLICIT", "ci-operator-check", "Actual probes still require an explicit read window."],
    [checks.noAutomaticUpstreamStart, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary", "v365 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary", "v365 must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary", "v365 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary", "v365 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary", "v365 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary", "Runtime shell must remain unimplemented."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification", "v365 must not request Java v153 + mini-kv v144."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference,
): MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[] {
  return [{
    code: "V364_REGULAR_GATE_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v364",
    message: `v365 verified v364 as ${source.gateDecision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V366_READ_WINDOW_DECISION" : "FIX_V364_ARCHIVE_BEFORE_V366",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed to an explicit read-window gate execution decision; if no Java/mini-kv read window is available, stop at wait-for-external-read-window."
      : "Keep the stage blocked until the v364 regular gate archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference,
  refs: MinimalReadOnlyIntegrationRegularGateArchiveReferences,
  checks: MinimalReadOnlyIntegrationRegularGateArchiveVerificationChecks,
  productionBlockers: readonly MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[],
  warnings: readonly MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[],
): MinimalReadOnlyIntegrationRegularGateArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    readOnlyTargetCount: source.readOnlyTargetCount,
    requiredEnvCount: source.requiredEnvCount,
    requiredHeaderCount: source.requiredHeaderCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function gateState(archive: ParsedArchiveEvidence): SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference["gateState"] {
  return valueAt(archive.json, "gateState") === "minimal-read-only-integration-regular-gate-ready"
    ? "minimal-read-only-integration-regular-gate-ready"
    : "blocked";
}

function gateDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference["gateDecision"] {
  return valueAt(archive.json, "gateDecision") === "standardize-v349-read-only-smoke-as-regular-gate"
    ? "standardize-v349-read-only-smoke-as-regular-gate"
    : "blocked";
}

function valueAt(source: Record<string, unknown> | null, ...segments: string[]): unknown {
  let current: unknown = source;
  for (const segment of segments) {
    if (current === null || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function arrayLength(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
