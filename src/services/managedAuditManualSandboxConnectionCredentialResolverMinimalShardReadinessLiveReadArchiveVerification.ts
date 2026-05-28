import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
  MinimalShardReadinessLiveReadArchiveFileReference,
  MinimalShardReadinessLiveReadArchiveReferences,
  MinimalShardReadinessLiveReadArchiveVerificationChecks,
  MinimalShardReadinessLiveReadArchiveVerificationMessage,
  MinimalShardReadinessLiveReadArchiveVerificationRecord,
  MinimalShardReadinessLiveReadArchiveVerificationSummary,
  SourceNodeV371MinimalShardReadinessLiveReadArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationTypes.js";
import type {
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification";
const SOURCE_NODE_V371_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate";
const ACTIVE_PLAN = "docs/plans3/v371-post-minimal-shard-readiness-live-read-gate-roadmap.md";
const NEXT_PLAN = "docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/371" as const;
const V371_BASENAME = "minimal-shard-readiness-live-read-gate-v371";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/376-minimal-shard-readiness-live-read-gate-v371.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV371 = createSourceNodeV371(parsedArchive);
  const liveReads = createLiveReads(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV371, archiveReferences, false);
  const checks = createChecks(
    input.config,
    sourceNodeV371,
    liveReads,
    archiveReferences,
    parsedArchive,
    draftArchiveVerification,
  );
  checks.readyForMinimalShardReadinessLiveReadArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalShardReadinessLiveReadArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalShardReadinessLiveReadArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV371, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV371);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV371, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal shard readiness live-read archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "minimal-shard-readiness-live-read-archive-verified" : "blocked",
    archiveVerificationDecision: ready
      ? "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report"
      : "blocked",
    readyForMinimalShardReadinessLiveReadArchiveVerification: ready,
    readyForNodeV373ShardReadinessCompatibilityReport: ready,
    consumesNodeV371MinimalShardReadinessLiveReadGate: true,
    activeNodeVersion: "Node v372",
    sourceNodeVersion: "Node v371",
    archiveVerificationOnly: true,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV371,
    liveReads,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV371Json: SOURCE_NODE_V371_ROUTE,
      sourceNodeV371Markdown: `${SOURCE_NODE_V371_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v373",
    },
    nextActions: ready
      ? [
        "Use Node v373 to compare v370 static evidence, v371 live-read evidence, and shard-readiness contract fields.",
        "Do not reopen Java or mini-kv live reads from this archive verification.",
        "Keep mini-kv out of the Java transaction chain until a separate shard prototype plan authorizes more than read-only readiness.",
      ]
      : [
        "Repair the v371 archive before preparing the v373 compatibility report.",
        "Do not use this archive verification to hide missing live-read evidence.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): MinimalShardReadinessLiveReadArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V371_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V371_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V371_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V371_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V371_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V371_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V371_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): MinimalShardReadinessLiveReadArchiveFileReference {
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
  refs: MinimalShardReadinessLiveReadArchiveReferences,
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

function createSourceNodeV371(
  archive: ParsedArchiveEvidence,
): SourceNodeV371MinimalShardReadinessLiveReadArchiveReference {
  return {
    sourceVersion: "Node v371",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1",
    gateState: gateState(archive),
    gateDecision: gateDecision(archive),
    readyForMinimalShardReadinessLiveReadGate:
      valueAt(archive.json, "readyForMinimalShardReadinessLiveReadGate") === true,
    readyForNodeV372LiveReadArchiveVerification:
      valueAt(archive.json, "readyForNodeV372LiveReadArchiveVerification") === true,
    activeNodeVersion: "Node v371",
    sourceNodeVersion: "Node v370",
    sourceNodeV370Ready: valueAt(archive.json, "sourceNodeV370", "readyForNodeV371MinimalShardReadinessLiveReadGate")
      === true,
    sourceNodeV370GateDigest: stringValue(valueAt(archive.json, "sourceNodeV370", "sourceGateDigest")),
    gateDigest: stringValue(valueAt(archive.json, "gate", "gateDigest")),
    liveReadOnly: true,
    javaStatus: liveReadStatus(valueAt(archive.json, "liveReads", "java", "status")),
    miniKvStatus: liveReadStatus(valueAt(archive.json, "liveReads", "miniKv", "status")),
    attemptedReadCount: numberValue(valueAt(archive.json, "summary", "attemptedReadCount")),
    passedReadCount: numberValue(valueAt(archive.json, "summary", "passedReadCount")),
    failedReadCount: numberValue(valueAt(archive.json, "summary", "failedReadCount")),
    skippedReadCount: numberValue(valueAt(archive.json, "summary", "skippedReadCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    executionAllowed: false,
  };
}

function createLiveReads(archive: ParsedArchiveEvidence): {
  java: MinimalShardReadinessLiveReadObservation | null;
  miniKv: MinimalShardReadinessLiveReadObservation | null;
} {
  return {
    java: liveReadAt(archive, "java"),
    miniKv: liveReadAt(archive, "miniKv"),
  };
}

function liveReadAt(
  archive: ParsedArchiveEvidence,
  key: "java" | "miniKv",
): MinimalShardReadinessLiveReadObservation | null {
  const value = valueAt(archive.json, "liveReads", key);
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as MinimalShardReadinessLiveReadObservation
    : null;
}

function createArchiveVerification(
  source: SourceNodeV371MinimalShardReadinessLiveReadArchiveReference,
  refs: MinimalShardReadinessLiveReadArchiveReferences,
  ready: boolean,
): MinimalShardReadinessLiveReadArchiveVerificationRecord {
  const archiveFileDigests = [
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
  ].map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "minimal-shard-readiness-live-read-archive-verification" as const,
    sourceSpan: "Node v371 minimal shard readiness live-read gate" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report" as const
      : "blocked" as const,
    sourceGateDigest: source.gateDigest,
    sourceNodeV370GateDigest: source.sourceNodeV370GateDigest,
    archiveFileDigests,
  };

  return {
    archiveVerificationDigest: sha256StableJson(record),
    ...record,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    verifiesPlanAndArchiveIndexes: true,
    verifiesNoLiveReadRerun: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v373",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV371MinimalShardReadinessLiveReadArchiveReference,
  liveReads: { java: MinimalShardReadinessLiveReadObservation | null; miniKv: MinimalShardReadinessLiveReadObservation | null },
  refs: MinimalShardReadinessLiveReadArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: MinimalShardReadinessLiveReadArchiveVerificationRecord,
): MinimalShardReadinessLiveReadArchiveVerificationChecks {
  const refsList = Object.values(refs).filter((ref): ref is MinimalShardReadinessLiveReadArchiveFileReference =>
    typeof ref === "object" && ref !== null && "exists" in ref);
  const jsonChecks = recordOrNull(valueAt(archive.json, "checks"));

  return {
    archiveFilesPresent: refsList.every((file) => file.exists && file.byteLength > 0 && isDigest(file.digest)),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid: valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1",
    jsonGateReady:
      source.gateState === "minimal-shard-readiness-live-read-gate-ready"
      && source.gateDecision === "archive-minimal-shard-readiness-live-read"
      && source.readyForMinimalShardReadinessLiveReadGate
      && source.readyForNodeV372LiveReadArchiveVerification,
    jsonSourceNodeV370Ready: source.sourceNodeV370Ready && isDigest(source.sourceNodeV370GateDigest),
    jsonGateDigestStable: isDigest(source.gateDigest),
    jsonBothLiveReadsPassed: source.javaStatus === "passed-read" && source.miniKvStatus === "passed-read",
    jsonLiveReadCountsMatch:
      source.attemptedReadCount === 2
      && source.passedReadCount === 2
      && source.failedReadCount === 0
      && source.skippedReadCount === 0,
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount
      && objectBooleanValues(jsonChecks).every(Boolean),
    summaryMatchesJson:
      valueAt(archive.summary, "profileVersion") === valueAt(archive.json, "profileVersion")
      && valueAt(archive.summary, "gateState") === source.gateState
      && valueAt(archive.summary, "gateDecision") === source.gateDecision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "attemptedReadCount") === source.attemptedReadCount
      && valueAt(archive.summary, "passedReadCount") === source.passedReadCount,
    markdownRecordsGateAndReads:
      archive.markdown.includes("Gate state: minimal-shard-readiness-live-read-gate-ready")
      && archive.markdown.includes("Java Live Read")
      && archive.markdown.includes("mini-kv Live Read")
      && archive.markdown.includes("Ready for Node v372 archive verification: true"),
    browserSnapshotPresent: archive.browserSnapshot.includes("minimal shard readiness live-read gate")
      && archive.browserSnapshot.includes("Ready for Node v372 archive verification: true"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists
      && refs.htmlArchive.byteLength > 0,
    explanationRecordsLiveReadAndBoundary:
      archive.explanation.includes("v371")
      && archive.explanation.includes("Java")
      && archive.explanation.includes("mini-kv")
      && archive.explanation.includes("不启动")
      && archive.explanation.includes("不写入"),
    codeWalkthroughPresent:
      archive.codeWalkthrough.includes("v371")
      && archive.codeWalkthrough.includes("MinimalShardReadinessLiveRead")
      && archive.codeWalkthrough.includes("SHARDJSON"),
    sourcePlanPointsToV372:
      archive.sourcePlan.includes("Node v372")
      && archive.sourcePlan.includes("archive verification")
      && archive.sourcePlan.includes("不重新读取 Java / mini-kv"),
    planIndexReferencesV371AndV372:
      archive.plansIndex.includes("v371-post-minimal-shard-readiness-live-read-gate-roadmap.md")
      && archive.plansIndex.includes("Node v372"),
    archiveIndexReferencesV371: archive.archiveIndex.includes("371: minimal shard readiness live-read gate"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "minimalShardReadinessLiveReadGateJson") === SOURCE_NODE_V371_ROUTE,
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !config.upstreamActionsEnabled && !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForMinimalShardReadinessLiveReadArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV371MinimalShardReadinessLiveReadArchiveReference,
  refs: MinimalShardReadinessLiveReadArchiveReferences,
  checks: MinimalShardReadinessLiveReadArchiveVerificationChecks,
  productionBlockers: readonly MinimalShardReadinessLiveReadArchiveVerificationMessage[],
  warnings: readonly MinimalShardReadinessLiveReadArchiveVerificationMessage[],
  recommendations: readonly MinimalShardReadinessLiveReadArchiveVerificationMessage[],
): MinimalShardReadinessLiveReadArchiveVerificationSummary {
  const archiveFiles = Object.values(refs).filter((ref): ref is MinimalShardReadinessLiveReadArchiveFileReference =>
    typeof ref === "object" && ref !== null && "exists" in ref);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles.length,
    presentArchiveFileCount: archiveFiles.filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    attemptedReadCount: source.attemptedReadCount,
    passedReadCount: source.passedReadCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: MinimalShardReadinessLiveReadArchiveVerificationChecks,
): MinimalShardReadinessLiveReadArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, MinimalShardReadinessLiveReadArchiveVerificationMessage["source"], string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "All v371 archive files must exist and have stable digests."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v371 JSON evidence must be readable."],
    [checks.jsonGateReady, "SOURCE_GATE_NOT_READY", "node-v371", "v371 live-read gate must be ready."],
    [checks.jsonSourceNodeV370Ready, "SOURCE_NODE_V370_NOT_READY", "node-v371", "v371 must preserve a ready Node v370 source gate."],
    [checks.jsonBothLiveReadsPassed, "LIVE_READS_NOT_PASSED", "node-v371", "Archived Java and mini-kv live reads must both pass."],
    [checks.summaryMatchesJson, "SUMMARY_DRIFTED", "archive-json", "v371 summary evidence must match the JSON archive."],
    [checks.markdownRecordsGateAndReads, "MARKDOWN_INCOMPLETE", "archive-markdown", "v371 Markdown must record gate and live-read evidence."],
    [checks.explanationRecordsLiveReadAndBoundary, "EXPLANATION_INCOMPLETE", "archive-docs", "v371 explanation must record live-read boundary semantics."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs", "v371 code walkthrough must be present."],
    [checks.sourcePlanPointsToV372, "PLAN_DOES_NOT_POINT_TO_V372", "archive-docs", "v371 plan must identify v372 archive verification."],
    [checks.archiveVerificationDoesNotRerunLiveRead, "ARCHIVE_VERIFICATION_RERAN_LIVE_READ", "archive-verification", "v372 must not rerun Java or mini-kv live reads."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v372 must not start or stop sibling services."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV371MinimalShardReadinessLiveReadArchiveReference,
): MinimalShardReadinessLiveReadArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_READINESS_NOT_ACTIVE_SHARDING",
    severity: "warning",
    source: "archive-verification",
    message: `v372 verifies ${source.passedReadCount} archived read-only reads; it still does not enable active sharding.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): MinimalShardReadinessLiveReadArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_V373_COMPATIBILITY_REPORT" : "REPAIR_V371_ARCHIVE",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed to Node v373 compatibility report using v370 static evidence and v371 archived live reads."
      : "Repair v371 archive evidence before producing a compatibility report.",
  }];
}

function gateState(
  archive: ParsedArchiveEvidence,
): SourceNodeV371MinimalShardReadinessLiveReadArchiveReference["gateState"] {
  return valueAt(archive.json, "gateState") === "minimal-shard-readiness-live-read-gate-ready"
    ? "minimal-shard-readiness-live-read-gate-ready"
    : "blocked";
}

function gateDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV371MinimalShardReadinessLiveReadArchiveReference["gateDecision"] {
  return valueAt(archive.json, "gateDecision") === "archive-minimal-shard-readiness-live-read"
    ? "archive-minimal-shard-readiness-live-read"
    : "blocked";
}

function liveReadStatus(value: unknown): MinimalShardReadinessLiveReadObservation["status"] {
  if (value === "passed-read" || value === "failed-read" || value === "skipped-probes-disabled") {
    return value;
  }
  return "failed-read";
}

function valueAt(source: unknown, ...pathSegments: string[]): unknown {
  let current = source;
  for (const segment of pathSegments) {
    if (current === null || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function recordOrNull(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function objectBooleanValues(value: Record<string, unknown> | null): boolean[] {
  if (value === null) {
    return [];
  }
  return Object.values(value).filter((entry): entry is boolean => typeof entry === "boolean");
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
