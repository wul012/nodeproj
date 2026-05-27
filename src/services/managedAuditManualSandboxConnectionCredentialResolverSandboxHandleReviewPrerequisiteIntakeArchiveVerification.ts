import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile,
  SandboxHandleReviewPrerequisiteIntakeArchiveFileReference,
  SandboxHandleReviewPrerequisiteIntakeArchiveReferences,
  SandboxHandleReviewPrerequisiteIntakeArchiveVerificationChecks,
  SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage,
  SandboxHandleReviewPrerequisiteIntakeArchiveVerificationRecord,
  SandboxHandleReviewPrerequisiteIntakeArchiveVerificationSummary,
  SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification";
const SOURCE_NODE_V354_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake";
const ACTIVE_PLAN =
  "docs/plans2/v354-post-sandbox-handle-review-prerequisite-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v355-post-sandbox-handle-review-prerequisite-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/354" as const;
const V354_BASENAME = "sandbox-handle-review-prerequisite-intake-v354";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/359-sandbox-handle-review-prerequisite-intake-v354.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV354 = createSourceNodeV354(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV354, archiveReferences, false);
  const checks = createChecks(input.config, sourceNodeV354, archiveReferences, parsedArchive, draftArchiveVerification);
  checks.readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV354, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV354);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV354, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "sandbox-handle-review-prerequisite-intake-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "archive-sandbox-handle-review-prerequisite-intake" : "blocked",
    readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification: ready,
    readyForNodeV356SandboxHandleReviewContractDecision: ready,
    consumesNodeV354SandboxHandleReviewPrerequisiteIntake: true,
    activeNodeVersion: "Node v355",
    sourceNodeVersion: "Node v354",
    archiveVerificationOnly: true,
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
    sourceNodeV354,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPrerequisiteIntakeArchiveVerificationJson: ROUTE_PATH,
      sandboxHandleReviewPrerequisiteIntakeArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV354Json: SOURCE_NODE_V354_ROUTE,
      sourceNodeV354Markdown: `${SOURCE_NODE_V354_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v356",
    },
    nextActions: ready
      ? [
        "Use Node v356 only for a sandbox handle review contract or decision; do not open credential values or raw endpoints.",
        "Keep provider/client instantiation, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step requires real credential handle values, raw endpoint URLs, or executable managed audit connection code.",
      ]
      : [
        "Fix the v354 archive evidence before proceeding to Node v356.",
        "Do not rerun probes or request Java/mini-kv code changes from a broken v354 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): SandboxHandleReviewPrerequisiteIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V354_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V354_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V354_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V354_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V354_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V354_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V354_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): SandboxHandleReviewPrerequisiteIntakeArchiveFileReference {
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
  refs: SandboxHandleReviewPrerequisiteIntakeArchiveReferences,
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

function createSourceNodeV354(
  archive: ParsedArchiveEvidence,
): SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference {
  return {
    sourceVersion: "Node v354",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1",
    intakeState: intakeState(archive),
    intakeDecision: intakeDecision(archive),
    readyForIntake: valueAt(archive.json, "readyForSandboxHandleReviewPrerequisiteIntake") === true,
    readyForNodeV355ArchiveVerification:
      valueAt(archive.json, "readyForNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intakeRecord", "intakeDigest")),
    sourceDecisionDigest: stringValue(valueAt(archive.json, "intakeRecord", "sourceDecisionDigest")),
    prerequisiteInputCount: numberValue(valueAt(archive.json, "summary", "prerequisiteInputCount")),
    closedScopeCount: numberValue(valueAt(archive.json, "summary", "closedScopeCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    sourceProductionBlockerCount: numberValue(valueAt(archive.json, "summary", "sourceProductionBlockerCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    prerequisiteIntakeOnly: valueAt(archive.json, "prerequisiteIntakeOnly") === true,
    sandboxHandleReviewOnly: valueAt(archive.json, "sandboxHandleReviewOnly") === true,
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
  };
}

function intakeState(
  archive: ParsedArchiveEvidence,
): SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference["intakeState"] {
  const value = valueAt(archive.json, "intakeState");
  if (value === "sandbox-handle-review-prerequisite-intake-ready" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function intakeDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference["intakeDecision"] {
  const value = valueAt(archive.json, "intakeDecision");
  if (value === "define-non-secret-sandbox-handle-review-prerequisites" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function createArchiveVerification(
  source: SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference,
  refs: SandboxHandleReviewPrerequisiteIntakeArchiveReferences,
  ready: boolean,
): SandboxHandleReviewPrerequisiteIntakeArchiveVerificationRecord {
  const recordWithoutDigest = {
    verificationMode: "sandbox-handle-review-prerequisite-intake-archive-verification" as const,
    sourceSpan: "Node v354 sandbox handle review prerequisite intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready ? "archive-sandbox-handle-review-prerequisite-intake" as const
      : "blocked" as const,
    sourceIntakeDigest: source.intakeDigest,
    verifiesJsonMarkdownAndSummary: true as const,
    verifiesScreenshotExplanationAndWalkthrough: true as const,
    verifiesPlanAndArchiveIndexes: true as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v356" as const,
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
  source: SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference,
  refs: SandboxHandleReviewPrerequisiteIntakeArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationRecord,
): SandboxHandleReviewPrerequisiteIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1",
    jsonReadyForV355Verification:
      source.readyForIntake
      && source.readyForNodeV355ArchiveVerification
      && source.intakeState === "sandbox-handle-review-prerequisite-intake-ready"
      && isDigest(source.intakeDigest)
      && isDigest(source.sourceDecisionDigest),
    jsonIntakeDecisionValid:
      source.intakeDecision === "define-non-secret-sandbox-handle-review-prerequisites"
      && valueAt(archive.json, "intakeRecord", "intakeDecision")
      === "define-non-secret-sandbox-handle-review-prerequisites",
    prerequisiteInputsRecorded:
      source.prerequisiteInputCount === 5
      && arrayHasIds(valueAt(archive.json, "prerequisiteInputs"), [
        "sandbox-handle-reference",
        "allowlist-review-status",
        "credential-handle-binding-status",
        "operator-approval-correlation",
        "source-decision-digest",
      ])
      && prerequisiteInputsAreNonSecret(valueAt(archive.json, "prerequisiteInputs")),
    closedScopesRecorded:
      source.closedScopeCount === 9
      && closedScopesRecorded(valueAt(archive.json, "closedScopes")),
    allChecksPassedInSourceIntake:
      source.checkCount === 24
      && source.passedCheckCount === 24
      && source.productionBlockerCount === 0
      && objectBooleanValuesAllTrue(valueAt(archive.json, "checks"), 24),
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "intakeDecision") === source.intakeDecision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "productionBlockerCount") === source.productionBlockerCount
      && valueAt(archive.summary, "startsJavaService") === false
      && valueAt(archive.summary, "startsMiniKvService") === false
      && valueAt(archive.summary, "sendsManagedAuditHttpTcp") === false,
    markdownRecordsPrerequisiteIntake:
      archive.markdown.includes("Intake state: sandbox-handle-review-prerequisite-intake-ready")
      && archive.markdown.includes("Intake decision: define-non-secret-sandbox-handle-review-prerequisites")
      && archive.markdown.includes("Credential value requested: false")
      && archive.markdown.includes("Raw endpoint URL requested: false")
      && archive.markdown.includes("Sends managed audit HTTP/TCP: false"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsPrerequisiteBoundary:
      archive.explanation.includes("credential value")
      && archive.explanation.includes("raw endpoint")
      && archive.explanation.includes("不发送 managed audit HTTP/TCP")
      && archive.explanation.includes("不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE/write/admin"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v354")
      && archive.codeWalkthrough.includes("createPrerequisiteInputs")
      && archive.codeWalkthrough.includes("createClosedScopes")
      && archive.codeWalkthrough.includes("createChecks"),
    planIndexReferencesV354AndV355:
      archive.sourcePlan.includes("Node v355")
      && archive.sourcePlan.includes("archive verification")
      && archive.plansIndex.includes("Node v354")
      && archive.plansIndex.includes("v354-post-sandbox-handle-review-prerequisite-intake-roadmap.md"),
    archiveIndexReferencesV354:
      archive.archiveIndex.includes("354：credential resolver sandbox handle review prerequisite intake"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPrerequisiteIntakeJson") === SOURCE_NODE_V354_ROUTE
      && valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPrerequisiteIntakeMarkdown")
      === `${SOURCE_NODE_V354_ROUTE}?format=markdown`,
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
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification: false,
  };
}

function archiveFileReferences(
  refs: SandboxHandleReviewPrerequisiteIntakeArchiveReferences,
): SandboxHandleReviewPrerequisiteIntakeArchiveFileReference[] {
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
  checks: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationChecks,
): SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[] {
  const rules: Array<[
    boolean,
    string,
    SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage["source"],
    string,
  ]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v354 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v354 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v354 JSON evidence must use the sandbox handle review prerequisite intake profile version."],
    [checks.jsonReadyForV355Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v354 JSON must be ready and include stable intake/source decision digests."],
    [checks.jsonIntakeDecisionValid, "INTAKE_DECISION_INVALID", "node-v354",
      "v355 can archive only a non-secret sandbox handle review prerequisite intake decision."],
    [checks.prerequisiteInputsRecorded, "PREREQUISITE_INPUTS_INCOMPLETE", "archive-json",
      "v354 archive must record the five non-secret prerequisite inputs."],
    [checks.closedScopesRecorded, "CLOSED_SCOPES_INCOMPLETE", "archive-json",
      "v354 archive must record the nine closed scopes."],
    [checks.allChecksPassedInSourceIntake, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json",
      "v354 source intake must have all 24 checks passed and zero production blockers."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v354 summary must match the archived JSON profile."],
    [checks.markdownRecordsPrerequisiteIntake, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v354 Markdown must record the prerequisite intake decision and closed runtime boundaries."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v354 screenshot and HTML archive must exist."],
    [checks.explanationRecordsPrerequisiteBoundary, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v354 explanation must record credential, endpoint, managed audit, and mini-kv write/admin boundaries."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v354 code walkthrough must exist and explain prerequisite inputs, closed scopes, and checks."],
    [checks.planIndexReferencesV354AndV355, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan files must reference v354 completion and v355 continuation."],
    [checks.archiveIndexReferencesV354, "ARCHIVE_INDEX_NOT_ALIGNED", "archive-docs",
      "d/README.md must reference v354 archive."],
    [checks.routeRecordedInArchive, "ROUTE_NOT_RECORDED", "archive-json",
      "v354 JSON evidence must record the source JSON/Markdown route."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v355 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v355 and source v354 archive must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "v354/v355 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "v354/v355 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v354/v355 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and invocation must remain disallowed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification",
      "v354 archive verification must not request Java v153 + mini-kv v144."],
    [checks.archiveVerificationDigestStable, "ARCHIVE_VERIFICATION_DIGEST_UNSTABLE", "archive-verification",
      "v355 archive verification digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference,
): SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[] {
  return [{
    code: "V354_PREREQUISITE_INTAKE_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v354",
    message: `v355 verified v354 as ${source.intakeDecision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V356_CONTRACT_DECISION" : "FIX_V354_ARCHIVE_BEFORE_V356",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed only to a sandbox handle review contract/decision; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Keep the stage blocked until the v354 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference,
  refs: SandboxHandleReviewPrerequisiteIntakeArchiveReferences,
  checks: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationChecks,
  productionBlockers: readonly SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[],
  warnings: readonly SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[],
  recommendations: readonly SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[],
): SandboxHandleReviewPrerequisiteIntakeArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    prerequisiteInputCount: source.prerequisiteInputCount,
    closedScopeCount: source.closedScopeCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    sourceProductionBlockerCount: source.productionBlockerCount,
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

function prerequisiteInputsAreNonSecret(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).containsSecretValue === false
    && (entry as Record<string, unknown>).containsRawEndpointUrl === false
    && (entry as Record<string, unknown>).allowsNetworkConnection === false
    && (entry as Record<string, unknown>).allowsRuntimeInvocation === false);
}

function closedScopesRecorded(value: unknown): boolean {
  const expected = [
    "credential-value",
    "raw-endpoint-url",
    "secret-provider",
    "resolver-client",
    "runtime-shell",
    "managed-audit-http-tcp",
    "java-writes",
    "mini-kv-write-admin",
    "automatic-upstream-start",
  ];
  return arrayHasIds(value, expected)
    && Array.isArray(value)
    && value.every((entry) =>
      entry !== null
      && typeof entry === "object"
      && !Array.isArray(entry)
      && (entry as Record<string, unknown>).credentialValueRead === false
      && (entry as Record<string, unknown>).rawEndpointUrlParsed === false
      && (entry as Record<string, unknown>).managedAuditHttpTcpAllowed === false
      && (entry as Record<string, unknown>).upstreamMutationAllowed === false);
}

function objectBooleanValuesAllTrue(value: unknown, expectedCount: number): boolean {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const values = Object.values(value);
  return values.length === expectedCount && values.every((entry) => entry === true);
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
