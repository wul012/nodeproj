import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference,
  ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences,
  ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationChecks,
  ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage,
  ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRecord,
  ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile,
  SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification";
const SOURCE_NODE_V351_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake";
const ACTIVE_PLAN = "docs/plans2/v351-post-managed-audit-disabled-read-only-integration-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v352-post-managed-audit-disabled-read-only-integration-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/351" as const;
const V351_BASENAME = "managed-audit-disabled-read-only-integration-intake-v351";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/356-managed-audit-disabled-read-only-integration-intake-v351.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  summary: Record<string, unknown> | null;
  browserSnapshot: string;
  explanation: string;
  codeWalkthrough: string;
  sourcePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV351 = createSourceNodeV351(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV351, archiveReferences, false);
  const checks = createChecks(input.config, sourceNodeV351, archiveReferences, parsedArchive, draftArchiveVerification);
  checks.readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV351, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV351);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV351, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "managed-audit-disabled-read-only-integration-intake-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-managed-audit-disabled-read-only-integration-intake"
      : "blocked",
    readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: ready,
    readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: ready,
    consumesNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: true,
    activeNodeVersion: "Node v352",
    sourceNodeVersion: "Node v351",
    archiveVerificationOnly: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    readsManagedAuditCredential: false,
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
    sourceNodeV351,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      managedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationJson: ROUTE_PATH,
      managedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV351Json: SOURCE_NODE_V351_ROUTE,
      sourceNodeV351Markdown: `${SOURCE_NODE_V351_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v353",
    },
    nextActions: ready
      ? [
        "Use Node v353 only to decide whether another disabled-stage decision record is needed.",
        "Do not open credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, or write scopes.",
        "Keep Java and mini-kv startup owned by their own project windows for any later true live integration.",
      ]
      : [
        "Fix the v351 archive evidence before proceeding to Node v353.",
        "Do not rerun probes or request Java/mini-kv code changes from a broken v351 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V351_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V351_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V351_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V351_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V351_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V351_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V351_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference {
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
  refs: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences,
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
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
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

function createSourceNodeV351(
  archive: ParsedArchiveEvidence,
): SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference {
  return {
    sourceVersion: "Node v351",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1",
    intakeState: intakeState(archive),
    intakeDecision: intakeDecision(archive),
    readyForIntake: valueAt(archive.json, "readyForManagedAuditDisabledReadOnlyIntegrationIntake") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intakeRecord", "intakeDigest")),
    sourceTransitionDigest: stringValue(valueAt(archive.json, "intakeRecord", "sourceTransitionDigest")),
    inputCount: numberValue(valueAt(archive.json, "summary", "inputCount")),
    closedScopeCount: numberValue(valueAt(archive.json, "summary", "closedScopeCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    attemptedTargetCount: numberValue(valueAt(archive.json, "summary", "attemptedTargetCount")),
    passedTargetCount: numberValue(valueAt(archive.json, "summary", "passedTargetCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    managedAuditDisabled: valueAt(archive.json, "managedAuditDisabled") === true,
    readOnlyIntegrationOnly: valueAt(archive.json, "readOnlyIntegrationOnly") === true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
  };
}

function intakeState(
  archive: ParsedArchiveEvidence,
): SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference["intakeState"] {
  const value = valueAt(archive.json, "intakeState");
  if (value === "managed-audit-disabled-read-only-integration-intake-ready" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function intakeDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference["intakeDecision"] {
  const value = valueAt(archive.json, "intakeDecision");
  if (value === "define-managed-audit-disabled-read-only-integration-stage" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function createArchiveVerification(
  source: SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference,
  refs: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences,
  ready: boolean,
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRecord {
  const recordWithoutDigest = {
    verificationMode: "managed-audit-disabled-read-only-integration-intake-archive-verification" as const,
    sourceSpan: "Node v351 managed-audit-disabled read-only integration intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-managed-audit-disabled-read-only-integration-intake" as const
      : "blocked" as const,
    sourceIntakeDigest: source.intakeDigest,
    verifiesJsonMarkdownAndSummary: true as const,
    verifiesScreenshotExplanationAndWalkthrough: true as const,
    verifiesPlanIndex: true as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v353" as const,
    archiveFileDigests: archiveFileReferences(refs).map((file) => ({
      path: file.path,
      digest: file.digest,
      byteLength: file.byteLength,
    })),
  };

  return {
    archiveVerificationDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference,
  refs: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRecord,
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1",
    jsonReadyForV352Verification:
      source.readyForIntake
      && source.intakeState === "managed-audit-disabled-read-only-integration-intake-ready"
      && isDigest(source.intakeDigest)
      && isDigest(source.sourceTransitionDigest),
    jsonIntakeDecisionValid:
      source.intakeDecision === "define-managed-audit-disabled-read-only-integration-stage"
      && valueAt(archive.json, "intakeRecord", "intakeDecision")
      === "define-managed-audit-disabled-read-only-integration-stage",
    intakeInputsRecorded:
      source.inputCount === 3
      && arrayHasIds(valueAt(archive.json, "intakeInputs"), [
        "node-v350-transition",
        "operator-owned-java-mini-kv-window",
        "managed-audit-disabled-stage",
      ]),
    closedScopesRecorded:
      source.closedScopeCount === 7
      && closedScopesRecorded(valueAt(archive.json, "closedScopes")),
    allChecksPassedInSourceIntake:
      source.checkCount === 20
      && source.passedCheckCount === 20
      && source.productionBlockerCount === 0
      && objectBooleanValuesAllTrue(valueAt(archive.json, "checks")),
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "intakeDecision") === source.intakeDecision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "productionBlockerCount") === source.productionBlockerCount
      && valueAt(archive.summary, "startsJavaService") === false
      && valueAt(archive.summary, "startsMiniKvService") === false
      && valueAt(archive.summary, "sendsManagedAuditHttpTcp") === false,
    markdownRecordsDisabledIntake:
      archive.markdown.includes("Intake state: managed-audit-disabled-read-only-integration-intake-ready")
      && archive.markdown.includes("Intake decision: define-managed-audit-disabled-read-only-integration-stage")
      && archive.markdown.includes("Starts Java service: false")
      && archive.markdown.includes("Starts mini-kv service: false")
      && archive.markdown.includes("Sends managed audit HTTP/TCP: false"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsDisabledBoundary:
      archive.explanation.includes("credential value")
      && archive.explanation.includes("raw endpoint")
      && archive.explanation.includes("不发送 managed audit HTTP/TCP")
      && archive.explanation.includes("不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE/write/admin"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v351")
      && archive.codeWalkthrough.includes("createClosedScopes")
      && archive.codeWalkthrough.includes("createChecks"),
    planIndexReferencesV351AndV352:
      archive.sourcePlan.includes("Node v352")
      && archive.sourcePlan.includes("intake archive verification")
      && archive.plansIndex.includes("Node v351")
      && archive.plansIndex.includes("v351-post-managed-audit-disabled-read-only-integration-intake-roadmap.md"),
    verificationDoesNotRerunProbe: !verification.rerunsLiveProbe,
    noUpstreamServiceStartedByNode:
      !verification.startsUpstreamServices
      && valueAt(archive.json, "startsJavaService") === false
      && valueAt(archive.json, "startsMiniKvService") === false,
    noUpstreamMutation:
      !verification.writesUpstreamState
      && valueAt(archive.json, "mutatesJavaState") === false
      && valueAt(archive.json, "mutatesMiniKvState") === false,
    noManagedAuditConnection:
      !verification.opensManagedAuditConnection
      && !config.upstreamActionsEnabled
      && valueAt(archive.json, "connectsManagedAudit") === false
      && valueAt(archive.json, "sendsManagedAuditHttpTcp") === false,
    noCredentialValueRead: valueAt(archive.json, "readsManagedAuditCredential") === false,
    noRawEndpointUrlParsed: valueAt(archive.json, "rawEndpointUrlParsed") === false,
    noProviderClientInstantiated:
      valueAt(archive.json, "secretProviderInstantiated") === false
      && valueAt(archive.json, "resolverClientInstantiated") === false,
    noRuntimeShellImplemented:
      valueAt(archive.json, "runtimeShellImplemented") === false
      && valueAt(archive.json, "runtimeShellInvocationAllowed") === false,
    noJavaMiniKvEchoRequired:
      !verification.requestsJavaMiniKvEcho
      && valueAt(archive.json, "requiresParallelJavaV153MiniKvV144ReadOnlyEcho") === false,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: false,
  };
}

function archiveFileReferences(
  refs: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences,
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference[] {
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
  ];
}

function collectProductionBlockers(
  checks: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationChecks,
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[] {
  const rules: Array<[
    boolean,
    string,
    ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage["source"],
    string,
  ]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v351 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v351 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v351 JSON evidence must use the managed-audit-disabled read-only intake profile version."],
    [checks.jsonReadyForV352Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v351 JSON must be ready and include stable intake/source transition digests."],
    [checks.jsonIntakeDecisionValid, "INTAKE_DECISION_INVALID", "node-v351",
      "v352 can archive only a managed-audit-disabled read-only integration intake decision."],
    [checks.intakeInputsRecorded, "INTAKE_INPUTS_INCOMPLETE", "archive-json",
      "v351 archive must record the three required intake inputs."],
    [checks.closedScopesRecorded, "CLOSED_SCOPES_INCOMPLETE", "archive-json",
      "v351 archive must record the seven closed scopes."],
    [checks.allChecksPassedInSourceIntake, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json",
      "v351 source intake must have all 20 checks passed and zero production blockers."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v351 summary must match the archived JSON profile."],
    [checks.markdownRecordsDisabledIntake, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v351 Markdown must record the disabled intake decision and closed auto-start boundaries."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v351 screenshot and HTML archive must exist."],
    [checks.explanationRecordsDisabledBoundary, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v351 explanation must record credential, endpoint, managed audit, and mini-kv write/admin boundaries."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v351 code walkthrough must exist and explain closed scopes and checks."],
    [checks.planIndexReferencesV351AndV352, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan files must reference v351 completion and v352 continuation."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v352 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v352 and source v351 archive must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v351/v352 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplemented, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and invocation must remain disallowed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification",
      "v351 archive verification must not request Java v153 + mini-kv v144."],
    [checks.archiveVerificationDigestStable, "ARCHIVE_VERIFICATION_DIGEST_UNSTABLE", "archive-verification",
      "v352 archive verification digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference,
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[] {
  return [{
    code: "V351_DISABLED_INTAKE_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v351",
    message: `v352 verified v351 as ${source.intakeDecision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V353_DECISION_RECORD" : "FIX_V351_ARCHIVE_BEFORE_V353",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed only to a decision record; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Keep the stage blocked until the v351 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference,
  refs: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences,
  checks: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationChecks,
  productionBlockers: readonly ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[],
  warnings: readonly ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[],
  recommendations: readonly ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[],
): ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    inputCount: source.inputCount,
    closedScopeCount: source.closedScopeCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    attemptedTargetCount: source.attemptedTargetCount,
    passedTargetCount: source.passedTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function arrayHasIds(value: unknown, ids: readonly string[]): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  const actualIds = new Set(value
    .filter((entry): entry is Record<string, unknown> =>
      entry !== null && typeof entry === "object" && !Array.isArray(entry))
    .map((entry) => String(entry.id)));
  return ids.every((id) => actualIds.has(id));
}

function closedScopesRecorded(value: unknown): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  const expected = [
    "credential-value",
    "raw-endpoint-url",
    "secret-provider",
    "runtime-shell",
    "java-writes",
    "mini-kv-write-admin",
    "managed-audit-http-tcp",
  ];
  return arrayHasIds(value, expected)
    && value.every((entry) =>
      entry !== null
      && typeof entry === "object"
      && !Array.isArray(entry)
      && (entry as Record<string, unknown>).status === "closed");
}

function objectBooleanValuesAllTrue(value: unknown): boolean {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const values = Object.values(value);
  return values.length === 20 && values.every((entry) => entry === true);
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

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
