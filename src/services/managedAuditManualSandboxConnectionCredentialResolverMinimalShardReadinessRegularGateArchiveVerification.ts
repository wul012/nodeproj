import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile,
  MinimalShardReadinessRegularGateArchiveFileReference,
  MinimalShardReadinessRegularGateArchiveReferences,
  MinimalShardReadinessRegularGateArchiveVerificationChecks,
  MinimalShardReadinessRegularGateArchiveVerificationMessage,
  MinimalShardReadinessRegularGateArchiveVerificationRecord,
  MinimalShardReadinessRegularGateArchiveVerificationSummary,
  SourceNodeV374MinimalShardReadinessRegularGateArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification";
const SOURCE_NODE_V374_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate";
const ACTIVE_PLAN = "docs/plans3/v374-post-minimal-shard-readiness-regular-gate-roadmap.md";
const NEXT_PLAN = "docs/plans3/v375-post-minimal-shard-readiness-regular-gate-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/374" as const;
const V374_BASENAME = "minimal-shard-readiness-regular-gate-v374";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/379-minimal-shard-readiness-regular-gate-v374.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV374 = createSourceNodeV374(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV374, archiveReferences, false);
  const checks = createChecks(input.config, sourceNodeV374, archiveReferences, parsedArchive, draftArchiveVerification);
  checks.readyForMinimalShardReadinessRegularGateArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalShardReadinessRegularGateArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalShardReadinessRegularGateArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV374, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV374);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV374, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal shard readiness regular gate archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "minimal-shard-readiness-regular-gate-archive-verified" : "blocked",
    archiveVerificationDecision: ready
      ? "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145"
      : "blocked",
    readyForMinimalShardReadinessRegularGateArchiveVerification: ready,
    readyForNodeV376JavaMiniKvShardEvidenceConsumption: ready,
    consumesNodeV374MinimalShardReadinessRegularGate: true,
    activeNodeVersion: "Node v375",
    sourceNodeVersion: "Node v374",
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
    sourceNodeV374,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV374Json: SOURCE_NODE_V374_ROUTE,
      sourceNodeV374Markdown: `${SOURCE_NODE_V374_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v376",
    },
    nextActions: ready
      ? [
        "Use Node v376 to consume Java v154 and mini-kv v145 shard-readiness evidence.",
        "Do not rerun Java or mini-kv live reads from this archive verification.",
        "Keep active sharding disabled until a separate prototype plan authorizes it.",
      ]
      : [
        "Repair the v374 regular gate archive before consuming Java v154 / mini-kv v145 evidence.",
        "Do not use this archive verification to hide missing archive files.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): MinimalShardReadinessRegularGateArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V374_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V374_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V374_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V374_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V374_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V374_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V374_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): MinimalShardReadinessRegularGateArchiveFileReference {
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
  refs: MinimalShardReadinessRegularGateArchiveReferences,
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

function createSourceNodeV374(archive: ParsedArchiveEvidence): SourceNodeV374MinimalShardReadinessRegularGateArchiveReference {
  return {
    sourceVersion: "Node v374",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    gateState: gateState(archive),
    gateDecision: gateDecision(archive),
    readyForMinimalShardReadinessRegularGate:
      valueAt(archive.json, "readyForMinimalShardReadinessRegularGate") === true,
    readyForNodeV375RegularGateArchiveVerification:
      valueAt(archive.json, "readyForNodeV375RegularGateArchiveVerification") === true,
    activeNodeVersion: "Node v374",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    sourceNodeV373Ready: valueAt(archive.json, "sourceNodeV373", "readyForNodeV374MinimalShardReadinessRegularGate")
      === true,
    regularGateDigest: stringValue(valueAt(archive.json, "regularGate", "gateDigest")),
    sourceCompatibilityReportDigest: stringValue(valueAt(archive.json, "sourceNodeV373", "compatibilityReportDigest")),
    sourceStaticGateDigest: stringValue(valueAt(archive.json, "sourceNodeV373", "sourceStaticGateDigest")),
    sourceLiveReadGateDigest: stringValue(valueAt(archive.json, "sourceNodeV373", "sourceLiveReadGateDigest")),
    sourceArchiveVerificationDigest: stringValue(valueAt(archive.json, "sourceNodeV373", "sourceArchiveVerificationDigest")),
    sourceProjectReportCount: numberValue(valueAt(archive.json, "summary", "sourceProjectReportCount")),
    sourceCompatibleProjectCount: numberValue(valueAt(archive.json, "summary", "sourceCompatibleProjectCount")),
    sourceFieldCheckCount: numberValue(valueAt(archive.json, "summary", "sourceFieldCheckCount")),
    sourceMatchedFieldCheckCount: numberValue(valueAt(archive.json, "summary", "sourceMatchedFieldCheckCount")),
    sourceMismatchedFieldCount: numberValue(valueAt(archive.json, "summary", "sourceMismatchedFieldCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    executionAllowed: false,
  };
}

function createArchiveVerification(
  source: SourceNodeV374MinimalShardReadinessRegularGateArchiveReference,
  refs: MinimalShardReadinessRegularGateArchiveReferences,
  ready: boolean,
): MinimalShardReadinessRegularGateArchiveVerificationRecord {
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
    verificationMode: "minimal-shard-readiness-regular-gate-archive-verification" as const,
    sourceSpan: "Node v374 minimal shard readiness regular gate" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145" as const
      : "blocked" as const,
    sourceRegularGateDigest: source.regularGateDigest,
    sourceCompatibilityReportDigest: source.sourceCompatibilityReportDigest,
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
    nextNodeVersionSuggested: "Node v376",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV374MinimalShardReadinessRegularGateArchiveReference,
  refs: MinimalShardReadinessRegularGateArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: MinimalShardReadinessRegularGateArchiveVerificationRecord,
): MinimalShardReadinessRegularGateArchiveVerificationChecks {
  const refsList = Object.values(refs).filter((ref): ref is MinimalShardReadinessRegularGateArchiveFileReference =>
    typeof ref === "object" && ref !== null && "exists" in ref);
  const jsonChecks = recordOrNull(valueAt(archive.json, "checks"));

  return {
    archiveFilesPresent: refsList.every((file) => file.exists && file.byteLength > 0 && isDigest(file.digest)),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid: source.profileVersion
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate.v1",
    jsonGateReady:
      source.gateState === "minimal-shard-readiness-regular-gate-ready"
      && source.gateDecision === "freeze-minimal-shard-readiness-regular-gate"
      && source.readyForMinimalShardReadinessRegularGate
      && source.readyForNodeV375RegularGateArchiveVerification,
    jsonSourceNodeV373Ready: source.sourceNodeVersion === "Node v373" && source.sourceNodeV373Ready
      && isDigest(source.sourceCompatibilityReportDigest),
    jsonRegularGateDigestStable: isDigest(source.regularGateDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount
      && objectBooleanValues(jsonChecks).every(Boolean),
    summaryMatchesJson:
      valueAt(archive.summary, "profileVersion") === valueAt(archive.json, "profileVersion")
      && valueAt(archive.summary, "gateState") === source.gateState
      && valueAt(archive.summary, "gateDecision") === source.gateDecision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "sourceFieldCheckCount") === source.sourceFieldCheckCount
      && valueAt(archive.summary, "sourceMatchedFieldCheckCount") === source.sourceMatchedFieldCheckCount,
    markdownRecordsRegularGate:
      archive.markdown.includes("Gate state: minimal-shard-readiness-regular-gate-ready")
      && archive.markdown.includes("Ready for Node v375 regular gate archive verification: true")
      && archive.markdown.includes("Regular Gate"),
    browserSnapshotPresent: archive.browserSnapshot.includes("minimal shard readiness regular gate")
      && archive.browserSnapshot.includes("Ready for Node v375 regular gate archive verification: true"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists
      && refs.htmlArchive.byteLength > 0,
    explanationRecordsRegularGateAndBoundary:
      archive.explanation.includes("v374")
      && archive.explanation.includes("regular gate")
      && archive.explanation.includes("不启动")
      && archive.explanation.includes("不写入"),
    codeWalkthroughPresent:
      archive.codeWalkthrough.includes("v374")
      && archive.codeWalkthrough.includes("MinimalShardReadinessRegularGate")
      && archive.codeWalkthrough.includes("v370-v373"),
    sourcePlanPointsToV375AndV376:
      archive.sourcePlan.includes("Node v375")
      && archive.sourcePlan.includes("archive verification")
      && archive.sourcePlan.includes("Node v376")
      && archive.sourcePlan.includes("Java v154")
      && archive.sourcePlan.includes("mini-kv v145"),
    planIndexReferencesV374AndV375:
      archive.plansIndex.includes("v374-post-minimal-shard-readiness-regular-gate-roadmap.md")
      && archive.plansIndex.includes("Node v375"),
    archiveIndexReferencesV374: archive.archiveIndex.includes("374: minimal shard readiness regular gate"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "regularGateJson") === SOURCE_NODE_V374_ROUTE,
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !config.upstreamActionsEnabled && !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForMinimalShardReadinessRegularGateArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV374MinimalShardReadinessRegularGateArchiveReference,
  refs: MinimalShardReadinessRegularGateArchiveReferences,
  checks: MinimalShardReadinessRegularGateArchiveVerificationChecks,
  productionBlockers: readonly MinimalShardReadinessRegularGateArchiveVerificationMessage[],
  warnings: readonly MinimalShardReadinessRegularGateArchiveVerificationMessage[],
  recommendations: readonly MinimalShardReadinessRegularGateArchiveVerificationMessage[],
): MinimalShardReadinessRegularGateArchiveVerificationSummary {
  const archiveFiles = Object.values(refs).filter((ref): ref is MinimalShardReadinessRegularGateArchiveFileReference =>
    typeof ref === "object" && ref !== null && "exists" in ref);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles.length,
    presentArchiveFileCount: archiveFiles.filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    sourceFieldCheckCount: source.sourceFieldCheckCount,
    sourceMatchedFieldCheckCount: source.sourceMatchedFieldCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: MinimalShardReadinessRegularGateArchiveVerificationChecks,
): MinimalShardReadinessRegularGateArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, MinimalShardReadinessRegularGateArchiveVerificationMessage["source"], string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "All v374 archive files must exist and have stable digests."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v374 JSON evidence must be readable."],
    [checks.jsonGateReady, "SOURCE_GATE_NOT_READY", "node-v374", "v374 regular gate must be ready."],
    [checks.jsonSourceNodeV373Ready, "SOURCE_NODE_V373_NOT_READY", "node-v374", "v374 must preserve a ready Node v373 source."],
    [checks.summaryMatchesJson, "SUMMARY_DRIFTED", "archive-json", "v374 summary evidence must match the JSON archive."],
    [checks.markdownRecordsRegularGate, "MARKDOWN_INCOMPLETE", "archive-markdown", "v374 Markdown must record regular gate evidence."],
    [checks.explanationRecordsRegularGateAndBoundary, "EXPLANATION_INCOMPLETE", "archive-docs", "v374 explanation must record boundary semantics."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs", "v374 code walkthrough must be present."],
    [checks.sourcePlanPointsToV375AndV376, "PLAN_DOES_NOT_POINT_TO_V375_V376", "archive-docs", "v374 plan must identify v375 archive verification and v376 consumption."],
    [checks.archiveVerificationDoesNotRerunLiveRead, "ARCHIVE_VERIFICATION_RERAN_LIVE_READ", "archive-verification", "v375 must not rerun Java or mini-kv live reads."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v375 must not start or stop sibling services."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV374MinimalShardReadinessRegularGateArchiveReference,
): MinimalShardReadinessRegularGateArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_REGULAR_GATE_NOT_ACTIVE_SHARDING",
    severity: "warning",
    source: "archive-verification",
    message: `v375 verifies ${source.passedCheckCount}/${source.checkCount} archived regular-gate checks; active sharding remains disabled.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): MinimalShardReadinessRegularGateArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_V376_UPSTREAM_EVIDENCE_CONSUMPTION" : "REPAIR_V374_ARCHIVE",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed to Node v376 and consume Java v154 / mini-kv v145 shard-readiness evidence."
      : "Repair v374 archive evidence before consuming new upstream evidence.",
  }];
}

function gateState(
  archive: ParsedArchiveEvidence,
): SourceNodeV374MinimalShardReadinessRegularGateArchiveReference["gateState"] {
  return valueAt(archive.json, "gateState") === "minimal-shard-readiness-regular-gate-ready"
    ? "minimal-shard-readiness-regular-gate-ready"
    : "blocked";
}

function gateDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV374MinimalShardReadinessRegularGateArchiveReference["gateDecision"] {
  return valueAt(archive.json, "gateDecision") === "freeze-minimal-shard-readiness-regular-gate"
    ? "freeze-minimal-shard-readiness-regular-gate"
    : "blocked";
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
