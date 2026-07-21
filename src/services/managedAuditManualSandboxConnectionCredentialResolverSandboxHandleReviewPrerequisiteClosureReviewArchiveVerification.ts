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
import { createClosureArchiveChecks } from "./archiveVerification/closure.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationProfile,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRecord,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationSummary,
  SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification";
const SOURCE_NODE_V362_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review";
const ACTIVE_PLAN =
  "docs/plans2/v362-post-sandbox-handle-review-prerequisite-closure-review-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v363-post-sandbox-handle-review-prerequisite-closure-review-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/362" as const;
const V362_BASENAME = "sandbox-handle-review-prerequisite-closure-review-v362";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/367-sandbox-handle-review-prerequisite-closure-review-v362.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV362 = createSourceNodeV362(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV362, archiveReferences, false);
  const checks = createClosureArchiveChecks({
    config: input.config,
    source: sourceNodeV362,
    refs: archiveReferences,
    archive: parsedArchive,
    verification: draftArchiveVerification,
    archiveFiles: archiveFileReferences(archiveReferences),
    sourceRoute: SOURCE_NODE_V362_ROUTE,
  });
  checks.readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV362, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV362);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV362, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite closure review archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "sandbox-handle-review-prerequisite-closure-review-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-sandbox-handle-review-prerequisite-closure-review"
      : "blocked",
    readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification: ready,
    readyForNodeV364MinimalReadOnlyIntegrationRegularGate: ready,
    consumesNodeV362SandboxHandleReviewPrerequisiteClosureReview: true,
    activeNodeVersion: "Node v363",
    sourceNodeVersion: "Node v362",
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
    sourceNodeV362,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationJson: ROUTE_PATH,
      sandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV362Json: SOURCE_NODE_V362_ROUTE,
      sourceNodeV362Markdown: `${SOURCE_NODE_V362_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v364",
    },
    nextActions: ready
      ? [
        "Use Node v364 to turn the v349 minimal read-only integration smoke into a regular safe gate; keep it non-secret and non-executable.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step asks for real credential material, raw endpoint URL, provider/client, or executable managed audit connection code.",
      ]
      : [
        "Fix the v362 archive evidence before proceeding to Node v364.",
        "Do not request Java/mini-kv changes from a broken v362 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V362_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V362_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V362_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V362_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V362_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V362_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V362_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference {
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
  refs: SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences,
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

function createSourceNodeV362(
  archive: ParsedArchiveEvidence,
): SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference {
  return {
    sourceVersion: "Node v362",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1",
    reviewState: reviewState(archive),
    prerequisiteClosureDecision: prerequisiteClosureDecision(archive),
    readyForClosureReview: valueAt(archive.json, "readyForSandboxHandleReviewPrerequisiteClosureReview") === true,
    readyForNodeV363ArchiveVerification:
      valueAt(archive.json, "readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification") === true,
    reviewDigest: stringValue(valueAt(archive.json, "closureReview", "reviewDigest")),
    sourceArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "closureReview", "sourceArchiveVerificationDigest")),
    sourceDecisionDigest: stringValue(valueAt(archive.json, "closureReview", "sourceDecisionDigest")),
    originalClosureItemCount: numberValue(valueAt(archive.json, "summary", "originalClosureItemCount")),
    completedClosureItemCount: numberValue(valueAt(archive.json, "summary", "completedClosureItemCount")),
    remainingClosureItemCount: numberValue(valueAt(archive.json, "summary", "remainingClosureItemCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    closureReviewOnly: true,
    readOnlyClosureReview: true,
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

function reviewState(
  archive: ParsedArchiveEvidence,
): SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference["reviewState"] {
  const value = valueAt(archive.json, "reviewState");
  if (value === "sandbox-handle-review-prerequisite-closure-review-ready" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function prerequisiteClosureDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference["prerequisiteClosureDecision"] {
  const value = valueAt(archive.json, "prerequisiteClosureDecision");
  if (value === "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function createArchiveVerification(
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
  refs: SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences,
  ready: boolean,
): SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRecord {
  const recordWithoutDigest = {
    verificationMode: "sandbox-handle-review-prerequisite-closure-review-archive-verification" as const,
    sourceSpan: "Node v362 sandbox handle review prerequisite closure review" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-sandbox-handle-review-prerequisite-closure-review" as const
      : "blocked" as const,
    sourceReviewDigest: source.reviewDigest,
    verifiesJsonMarkdownAndSummary: true as const,
    verifiesScreenshotExplanationAndWalkthrough: true as const,
    verifiesPlanAndArchiveIndexes: true as const,
    verifiesClosureItemsAndBoundaryControls: true as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v364" as const,
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

function archiveFileReferences(
  refs: SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences,
): SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference[] {
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
  checks: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks,
): SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[] {
  const rules: Array<[
    boolean,
    string,
    SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage["source"],
    string,
  ]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v362 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v362 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v362 JSON evidence must use the prerequisite closure review profile version."],
    [checks.jsonReadyForV363Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v362 JSON must be ready and include stable review/source digests."],
    [checks.jsonDecisionValid, "CLOSURE_DECISION_INVALID", "node-v362",
      "v363 can archive only a closure review that closes the non-executable prerequisite chain."],
    [checks.closureReviewRecorded, "CLOSURE_REVIEW_INCOMPLETE", "archive-json",
      "v362 archive must record the closure review shape and next Node v363 archive verification."],
    [checks.closureItemsRecordedAndClosed, "CLOSURE_ITEMS_INCOMPLETE", "archive-json",
      "v362 archive must record all four closed prerequisite items with closed boundary fields."],
    [checks.allChecksPassedInSourceClosureReview, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json",
      "v362 source closure review must have all 27 checks passed and zero production blockers."],
    [checks.sourceNodeV361ArchiveEvidenceRecorded, "SOURCE_NODE_V361_EVIDENCE_INCOMPLETE", "archive-json",
      "v362 source must retain v361 archive verification evidence counts."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v362 summary must match the archived JSON profile."],
    [checks.markdownRecordsClosureReview, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v362 Markdown must record the closure state, decision, and v363 readiness."],
    [checks.markdownRecordsClosureItemsAndBoundaries, "ARCHIVE_MARKDOWN_BOUNDARIES_INCOMPLETE", "archive-markdown",
      "v362 Markdown must record closure items and closed credential/endpoint/runtime/connection boundaries."],
    [checks.browserSnapshotPresent, "BROWSER_SNAPSHOT_MISSING", "archive-docs",
      "v362 browser snapshot must exist and record the closure decision."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v362 screenshot and HTML archive must exist."],
    [checks.explanationRecordsClosureAndBoundary, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v362 explanation must record the closure decision and closed managed audit boundaries."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v362 code walkthrough must explain source loading, closure review, and checks."],
    [checks.sourcePlanPointsToV363, "SOURCE_PLAN_NOT_ALIGNED", "archive-docs",
      "v362 source plan must point to v363 archive verification."],
    [checks.planIndexReferencesV362AndV363, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan index must reference v362 completion and v363 continuation."],
    [checks.archiveIndexReferencesV362, "ARCHIVE_INDEX_NOT_ALIGNED", "archive-docs",
      "d/README.md must reference v362 archive."],
    [checks.routeRecordedInArchive, "ROUTE_NOT_RECORDED", "archive-json",
      "v362 JSON evidence must record the source JSON/Markdown route."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v363 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v362/v363 must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "v362/v363 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "v362/v363 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v362/v363 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and invocation must remain disallowed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification",
      "v363 archive verification must not request Java v153 + mini-kv v144."],
    [checks.archiveVerificationDigestStable, "ARCHIVE_VERIFICATION_DIGEST_UNSTABLE", "archive-verification",
      "v363 archive verification digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
): SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[] {
  return [{
    code: "V362_PREREQUISITE_CLOSURE_REVIEW_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v362",
    message: `v363 verified v362 as ${source.prerequisiteClosureDecision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V364_FOLLOW_UP_PLANNING" : "FIX_V362_ARCHIVE_BEFORE_V364",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed only to a non-secret, non-executable minimal read-only integration regular gate based on v349; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Keep the stage blocked until the v362 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
  refs: SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences,
  checks: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks,
  productionBlockers: readonly SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[],
  warnings: readonly SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[],
  recommendations: readonly SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[],
): SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    originalClosureItemCount: source.originalClosureItemCount,
    completedClosureItemCount: source.completedClosureItemCount,
    remainingClosureItemCount: source.remainingClosureItemCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    sourceProductionBlockerCount: source.productionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
