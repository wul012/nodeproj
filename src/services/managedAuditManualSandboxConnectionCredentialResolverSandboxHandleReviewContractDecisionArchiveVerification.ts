import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile,
  SandboxHandleReviewContractDecisionArchiveFileReference,
  SandboxHandleReviewContractDecisionArchiveReferences,
  SandboxHandleReviewContractDecisionArchiveVerificationChecks,
  SandboxHandleReviewContractDecisionArchiveVerificationMessage,
  SandboxHandleReviewContractDecisionArchiveVerificationRecord,
  SandboxHandleReviewContractDecisionArchiveVerificationSummary,
  SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification";
const SOURCE_NODE_V356_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision";
const ACTIVE_PLAN = "docs/plans2/v356-post-sandbox-handle-review-contract-decision-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v357-post-sandbox-handle-review-contract-decision-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/356" as const;
const V356_BASENAME = "sandbox-handle-review-contract-decision-v356";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/361-sandbox-handle-review-contract-decision-v356.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV356 = createSourceNodeV356(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV356, archiveReferences, false);
  const checks = createChecks(input.config, sourceNodeV356, archiveReferences, parsedArchive,
    draftArchiveVerification);
  checks.readyForSandboxHandleReviewContractDecisionArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewContractDecisionArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewContractDecisionArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV356, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV356);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV356, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review contract decision archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "sandbox-handle-review-contract-decision-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "archive-sandbox-handle-review-contract-decision" : "blocked",
    readyForSandboxHandleReviewContractDecisionArchiveVerification: ready,
    readyForNodeV358SandboxHandleReviewPacketOrGateIntake: ready,
    consumesNodeV356SandboxHandleReviewContractDecision: true,
    activeNodeVersion: "Node v357",
    sourceNodeVersion: "Node v356",
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
    sourceNodeV356,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewContractDecisionArchiveVerificationJson: ROUTE_PATH,
      sandboxHandleReviewContractDecisionArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV356Json: SOURCE_NODE_V356_ROUTE,
      sourceNodeV356Markdown: `${SOURCE_NODE_V356_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v358",
    },
    nextActions: ready
      ? [
        "Use Node v358 only for a non-secret sandbox handle review packet or gate intake.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step needs real sandbox credential values, raw endpoint URLs, or executable managed audit connection code.",
      ]
      : [
        "Fix the v356 archive evidence before proceeding to Node v358.",
        "Do not rerun probes or request Java/mini-kv code changes from a broken v356 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): SandboxHandleReviewContractDecisionArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V356_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V356_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V356_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V356_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V356_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V356_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V356_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): SandboxHandleReviewContractDecisionArchiveFileReference {
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
  refs: SandboxHandleReviewContractDecisionArchiveReferences,
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

function createSourceNodeV356(
  archive: ParsedArchiveEvidence,
): SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference {
  return {
    sourceVersion: "Node v356",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1",
    decisionState: decisionState(archive),
    decision: decision(archive),
    readyForContractDecision: valueAt(archive.json, "readyForSandboxHandleReviewContractDecision") === true,
    readyForNodeV357ArchiveVerification:
      valueAt(archive.json, "readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification") === true,
    decisionDigest: stringValue(valueAt(archive.json, "decisionRecord", "decisionDigest")),
    sourceArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "decisionRecord", "sourceArchiveVerificationDigest")),
    contractInputCount: numberValue(valueAt(archive.json, "summary", "contractInputCount")),
    contractSectionCount: numberValue(valueAt(archive.json, "summary", "contractSectionCount")),
    sourceArchiveFileCount: numberValue(valueAt(archive.json, "summary", "sourceArchiveFileCount")),
    sourcePresentArchiveFileCount: numberValue(valueAt(archive.json, "summary", "sourcePresentArchiveFileCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    contractDecisionOnly: valueAt(archive.json, "contractDecisionOnly") === true,
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

function decisionState(
  archive: ParsedArchiveEvidence,
): SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference["decisionState"] {
  const value = valueAt(archive.json, "decisionState");
  if (value === "sandbox-handle-review-contract-decision-ready" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function decision(
  archive: ParsedArchiveEvidence,
): SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference["decision"] {
  const value = valueAt(archive.json, "decision");
  if (value === "define-sandbox-handle-review-contract" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function createArchiveVerification(
  source: SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference,
  refs: SandboxHandleReviewContractDecisionArchiveReferences,
  ready: boolean,
): SandboxHandleReviewContractDecisionArchiveVerificationRecord {
  const recordWithoutDigest = {
    verificationMode: "sandbox-handle-review-contract-decision-archive-verification" as const,
    sourceSpan: "Node v356 sandbox handle review contract decision" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready ? "archive-sandbox-handle-review-contract-decision" as const
      : "blocked" as const,
    sourceDecisionDigest: source.decisionDigest,
    verifiesJsonMarkdownAndSummary: true as const,
    verifiesScreenshotExplanationAndWalkthrough: true as const,
    verifiesPlanAndArchiveIndexes: true as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v358" as const,
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
  source: SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference,
  refs: SandboxHandleReviewContractDecisionArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: SandboxHandleReviewContractDecisionArchiveVerificationRecord,
): SandboxHandleReviewContractDecisionArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1",
    jsonReadyForV357Verification:
      source.readyForContractDecision
      && source.readyForNodeV357ArchiveVerification
      && source.decisionState === "sandbox-handle-review-contract-decision-ready"
      && isDigest(source.decisionDigest)
      && isDigest(source.sourceArchiveVerificationDigest),
    jsonDecisionValid:
      source.decision === "define-sandbox-handle-review-contract"
      && valueAt(archive.json, "decisionRecord", "decision") === "define-sandbox-handle-review-contract",
    contractInputsRecorded:
      source.contractInputCount === 5
      && arrayHasIds(valueAt(archive.json, "contractInputs"), [
        "sandbox-handle-reference",
        "allowlist-review-status",
        "credential-handle-binding-status",
        "operator-approval-correlation",
        "source-decision-digest",
      ])
      && contractInputsAreNonSecret(valueAt(archive.json, "contractInputs")),
    contractSectionsRecorded:
      source.contractSectionCount === 6
      && arrayHasIds(valueAt(archive.json, "contractSections"), [
        "opaque-handle-reference",
        "allowlist-review-state",
        "binding-review-state",
        "operator-correlation",
        "source-evidence-digest",
        "stop-conditions",
      ])
      && contractSectionsAreClosed(valueAt(archive.json, "contractSections")),
    allChecksPassedInSourceDecision:
      source.checkCount === 25
      && source.passedCheckCount === 25
      && source.productionBlockerCount === 0
      && objectBooleanValuesAllTrue(valueAt(archive.json, "checks"), 25),
    sourceNodeV355ArchiveEvidenceRecorded:
      source.sourceArchiveFileCount === 11
      && source.sourcePresentArchiveFileCount === 11
      && source.sourceCheckCount === 29
      && source.sourcePassedCheckCount === 29,
    summaryMatchesJson:
      valueAt(archive.summary, "decisionState") === source.decisionState
      && valueAt(archive.summary, "decision") === source.decision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "contractInputCount") === source.contractInputCount
      && valueAt(archive.summary, "contractSectionCount") === source.contractSectionCount
      && valueAt(archive.summary, "sourceArchiveFileCount") === source.sourceArchiveFileCount
      && valueAt(archive.summary, "sourcePresentArchiveFileCount") === source.sourcePresentArchiveFileCount
      && valueAt(archive.summary, "startsJavaService") === false
      && valueAt(archive.summary, "startsMiniKvService") === false
      && valueAt(archive.summary, "sendsManagedAuditHttpTcp") === false,
    markdownRecordsContractDecision:
      archive.markdown.includes("Decision state: sandbox-handle-review-contract-decision-ready")
      && archive.markdown.includes("Decision: define-sandbox-handle-review-contract")
      && archive.markdown.includes("Credential value requested: false")
      && archive.markdown.includes("Raw endpoint URL requested: false")
      && archive.markdown.includes("Sends managed audit HTTP/TCP: false"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsContractBoundary:
      archive.explanation.includes("credential value")
      && archive.explanation.includes("raw endpoint")
      && archive.explanation.includes("不发送 managed audit HTTP/TCP")
      && archive.explanation.includes("不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE/write/admin"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v356")
      && archive.codeWalkthrough.includes("createContractInputs")
      && archive.codeWalkthrough.includes("createContractSections")
      && archive.codeWalkthrough.includes("createChecks"),
    planIndexReferencesV356AndV357:
      archive.sourcePlan.includes("Node v357")
      && archive.sourcePlan.includes("archive verification")
      && archive.plansIndex.includes("Node v356")
      && archive.plansIndex.includes("v356-post-sandbox-handle-review-contract-decision-roadmap.md"),
    archiveIndexReferencesV356:
      archive.archiveIndex.includes("356：credential resolver sandbox handle review contract decision"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewContractDecisionJson") === SOURCE_NODE_V356_ROUTE
      && valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewContractDecisionMarkdown")
      === `${SOURCE_NODE_V356_ROUTE}?format=markdown`,
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
    readyForSandboxHandleReviewContractDecisionArchiveVerification: false,
  };
}

function archiveFileReferences(
  refs: SandboxHandleReviewContractDecisionArchiveReferences,
): SandboxHandleReviewContractDecisionArchiveFileReference[] {
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
  checks: SandboxHandleReviewContractDecisionArchiveVerificationChecks,
): SandboxHandleReviewContractDecisionArchiveVerificationMessage[] {
  const rules: Array<[
    boolean,
    string,
    SandboxHandleReviewContractDecisionArchiveVerificationMessage["source"],
    string,
  ]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v356 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v356 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v356 JSON evidence must use the sandbox handle review contract decision profile version."],
    [checks.jsonReadyForV357Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v356 JSON must be ready and include stable decision/source archive verification digests."],
    [checks.jsonDecisionValid, "CONTRACT_DECISION_INVALID", "node-v356",
      "v357 can archive only a sandbox handle review contract decision."],
    [checks.contractInputsRecorded, "CONTRACT_INPUTS_INCOMPLETE", "archive-json",
      "v356 archive must record the five non-secret contract inputs."],
    [checks.contractSectionsRecorded, "CONTRACT_SECTIONS_INCOMPLETE", "archive-json",
      "v356 archive must record the six closed contract sections."],
    [checks.allChecksPassedInSourceDecision, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json",
      "v356 source decision must have all 25 checks passed and zero production blockers."],
    [checks.sourceNodeV355ArchiveEvidenceRecorded, "SOURCE_NODE_V355_EVIDENCE_INCOMPLETE", "archive-json",
      "v356 source must retain v355 archive evidence counts."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v356 summary must match the archived JSON profile."],
    [checks.markdownRecordsContractDecision, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v356 Markdown must record the contract decision and closed runtime boundaries."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v356 screenshot and HTML archive must exist."],
    [checks.explanationRecordsContractBoundary, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v356 explanation must record credential, endpoint, managed audit, and mini-kv write/admin boundaries."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v356 code walkthrough must explain contract inputs, contract sections, and checks."],
    [checks.planIndexReferencesV356AndV357, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan files must reference v356 completion and v357 continuation."],
    [checks.archiveIndexReferencesV356, "ARCHIVE_INDEX_NOT_ALIGNED", "archive-docs",
      "d/README.md must reference v356 archive."],
    [checks.routeRecordedInArchive, "ROUTE_NOT_RECORDED", "archive-json",
      "v356 JSON evidence must record the source JSON/Markdown route."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v357 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v357 and source v356 archive must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "v356/v357 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "v356/v357 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v356/v357 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and invocation must remain disallowed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification",
      "v356 archive verification must not request Java v153 + mini-kv v144."],
    [checks.archiveVerificationDigestStable, "ARCHIVE_VERIFICATION_DIGEST_UNSTABLE", "archive-verification",
      "v357 archive verification digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference,
): SandboxHandleReviewContractDecisionArchiveVerificationMessage[] {
  return [{
    code: "V356_CONTRACT_DECISION_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v356",
    message: `v357 verified v356 as ${source.decision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): SandboxHandleReviewContractDecisionArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V358_HANDLE_REVIEW_INTAKE" : "FIX_V356_ARCHIVE_BEFORE_V358",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed only to a non-secret sandbox handle review packet or gate intake; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Keep the stage blocked until the v356 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference,
  refs: SandboxHandleReviewContractDecisionArchiveReferences,
  checks: SandboxHandleReviewContractDecisionArchiveVerificationChecks,
  productionBlockers: readonly SandboxHandleReviewContractDecisionArchiveVerificationMessage[],
  warnings: readonly SandboxHandleReviewContractDecisionArchiveVerificationMessage[],
  recommendations: readonly SandboxHandleReviewContractDecisionArchiveVerificationMessage[],
): SandboxHandleReviewContractDecisionArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    contractInputCount: source.contractInputCount,
    contractSectionCount: source.contractSectionCount,
    sourceArchiveFileCount: source.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: source.sourcePresentArchiveFileCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
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

function contractInputsAreNonSecret(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).containsSecretValue === false
    && (entry as Record<string, unknown>).containsRawEndpointUrl === false
    && (entry as Record<string, unknown>).allowsNetworkConnection === false
    && (entry as Record<string, unknown>).allowsRuntimeInvocation === false);
}

function contractSectionsAreClosed(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).containsSecretValue === false
    && (entry as Record<string, unknown>).containsRawEndpointUrl === false
    && (entry as Record<string, unknown>).opensManagedAuditConnection === false
    && (entry as Record<string, unknown>).invokesRuntimeShell === false
    && (entry as Record<string, unknown>).mutatesUpstreamState === false);
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
