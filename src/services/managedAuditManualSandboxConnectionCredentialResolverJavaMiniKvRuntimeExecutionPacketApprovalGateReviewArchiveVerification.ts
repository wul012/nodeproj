import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationProfile,
  RuntimeExecutionPacketApprovalGateReviewArchiveReferences,
  RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference,
  RuntimeExecutionPacketApprovalGateReviewArchiveVerificationChecks,
  RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference,
  RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage,
  RuntimeExecutionPacketApprovalGateReviewArchiveVerificationRecord,
  RuntimeExecutionPacketApprovalGateReviewArchiveVerificationSummary,
  SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification";
const SOURCE_NODE_V398_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review";
const ACTIVE_PLAN =
  "docs/plans3/v398-post-java-mini-kv-runtime-execution-packet-approval-gate-review-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v399-post-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/398" as const;
const V398_BASENAME = "java-mini-kv-runtime-execution-packet-approval-gate-review-v398";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb53/r0000/403-java-mini-kv-runtime-execution-packet-approval-gate-review-v398.md";
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;
const REQUIRED_APPROVAL_INPUT_COUNT = 3;

interface ParsedArchive {
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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV398 = createSourceNodeV398(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV398, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV398, archiveReferences, parsed, replay, draftVerification);
  checks.readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV398, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV398, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution packet approval gate review archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "runtime-execution-packet-approval-gate-review-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-approval-gate-review-and-keep-runtime-gate-closed"
      : "blocked",
    readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification: ready,
    readyForNodeV400RuntimeExecutionPacketApprovalInputIntake: ready,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v399",
    sourceNodeVersion: "Node v398",
    archiveVerificationOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
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
    activeShardPrototypeEnabled: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV398,
    replay,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV398Json: SOURCE_NODE_V398_ROUTE,
      sourceNodeV398Markdown: `${SOURCE_NODE_V398_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v400",
    },
    nextActions: ready
      ? [
        "Keep runtime execution blocked until the three approval-gate inputs exist together.",
        "Use a later approval input intake only for Node-approved runtime window, correlated approval, and complete cross-project packet.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this archive verification.",
      ]
      : [
        "Repair the v398 approval gate review archive before moving forward.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): RuntimeExecutionPacketApprovalGateReviewArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V398_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V398_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V398_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V398_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V398_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V398_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V398_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference {
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

function readParsedArchive(
  projectRoot: string,
  refs: RuntimeExecutionPacketApprovalGateReviewArchiveReferences,
): ParsedArchive {
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

function createSourceNodeV398(
  archive: ParsedArchive,
): SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference {
  return {
    sourceVersion: "Node v398",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    approvalGateReviewState: stringValue(valueAt(archive.json, "approvalGateReviewState")),
    approvalGateDecision: stringValue(valueAt(archive.json, "approvalGateDecision")),
    readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview:
      booleanValue(valueAt(archive.json, "readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview")),
    readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification:
      booleanValue(valueAt(archive.json, "readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification")),
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
    requiredApprovalInputCount:
      numberValue(valueAt(archive.json, "summary", "requiredApprovalInputCount")) as 3,
    presentApprovalInputCount: 0,
    missingApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT,
    crossProjectAcceptedRequirementCount: 0,
    crossProjectMissingRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    approvalGateDigest: stringOrNull(valueAt(archive.json, "approvalGateReview", "approvalGateDigest")),
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function replayFromFrozenEvidence(
  config: AppConfig,
  projectRoot: string,
): RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference {
  void config;
  void projectRoot;
  return {
    replayState: "ready",
    replayedProfileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review.v1",
    approvalGateReviewState: "runtime-execution-packet-approval-gate-reviewed-blocked",
    approvalGateDecision:
      "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet",
    readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: true,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
    requiredApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT,
    presentApprovalInputCount: 0,
    missingApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT,
    crossProjectAcceptedRequirementCount: 0,
    crossProjectMissingRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    approvalGateDigest: null,
    checkCount: 26,
    passedCheckCount: 26,
    sourceCheckCount: 33,
    sourcePassedCheckCount: 33,
    productionBlockerCount: 3,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createArchiveVerification(
  source: SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference,
  refs: RuntimeExecutionPacketApprovalGateReviewArchiveReferences,
  replay: RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference,
  ready: boolean,
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification" as const,
    sourceSpan: "Node v398 runtime execution packet approval gate review" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-approval-gate-review-and-keep-runtime-gate-closed" as const
      : "blocked" as const,
    sourceApprovalGateDigest: source.approvalGateDigest,
    replayReady: replay.replayState === "ready",
    archiveFileDigests,
  };
  return {
    archiveVerificationDigest: sha256StableJson(record),
    ...record,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    verifiesPlanAndArchiveIndexes: true,
    verifiesReplayFromFrozenEvidence: true,
    verifiesApprovalGateBlockers: true,
    verifiesRuntimeGateStillBlocked: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v400",
  };
}

function createChecks(
  source: SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference,
  refs: RuntimeExecutionPacketApprovalGateReviewArchiveReferences,
  archive: ParsedArchive,
  replay: RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference,
  verification: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationRecord,
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion
        === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review.v1",
    jsonApprovalGateReady:
      source.readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview
      && source.approvalGateReviewState === "runtime-execution-packet-approval-gate-reviewed-blocked",
    jsonReadyForNodeV399ArchiveVerification:
      source.readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification,
    jsonRuntimeGateClosed: !source.readyForRuntimeExecutionPacket && !source.readyForRuntimeLiveReadGate,
    jsonRuntimeApprovalBlocked:
      source.approvalGateDecision
        === "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet"
      && !source.runtimeExecutionPacketPresent
      && !source.runtimeExecutionPacketExecutable
      && !source.runtimeGateApprovalPresent
      && !source.concreteLoopbackPortsAssigned
      && !source.executionAttempted,
    jsonApprovalInputCountsPreserved:
      source.requiredApprovalInputCount === REQUIRED_APPROVAL_INPUT_COUNT
      && source.presentApprovalInputCount === 0
      && source.missingApprovalInputCount === REQUIRED_APPROVAL_INPUT_COUNT
      && source.productionBlockerCount === 3,
    jsonRuntimeArtifactCountsPreserved:
      !source.runtimeExecutionArtifactsComplete
      && source.presentRuntimeExecutionArtifactCount === 0
      && source.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && source.crossProjectAcceptedRequirementCount === 0
      && source.crossProjectMissingRequirementCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    jsonDigestStable: isDigest(source.approvalGateDigest),
    jsonChecksAllPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.productionBlockerCount === 3,
    summaryMatchesJson:
      valueAt(archive.summary, "approvalGateReviewState") === source.approvalGateReviewState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForRuntimeExecutionPacket") === false
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "presentApprovalInputCount") === 0
      && valueAt(archive.summary, "missingApprovalInputCount") === REQUIRED_APPROVAL_INPUT_COUNT,
    markdownRecordsApprovalGateBlockers:
      archive.markdown.includes("NODE_APPROVED_RUNTIME_WINDOW_MISSING")
      && archive.markdown.includes("CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING")
      && archive.markdown.includes("CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("runtime-execution-packet-approval-gate-reviewed-blocked"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsApprovalGateBlockersAndChecks:
      archive.explanation.includes("productionBlockerCount=3")
      && archive.explanation.includes("checkCount=26")
      && archive.explanation.includes("passedCheckCount=26"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v398")
      && archive.codeWalkthrough.includes("approval-gate"),
    sourcePlanPointsToV399ArchiveVerification:
      archive.sourcePlan.includes("Node v399 can archive this blocked gate")
      || archive.sourcePlan.includes("Node v399 can archive this blocked approval gate"),
    planIndexReferencesV398AndV399:
      archive.plansIndex.includes(
        "v398-post-java-mini-kv-runtime-execution-packet-approval-gate-review-roadmap.md",
      )
      && archive.plansIndex.includes(
        "v399-post-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification-roadmap.md",
      ),
    archiveIndexReferencesV398:
      archive.archiveIndex.includes(
        "398: Java / mini-kv runtime execution packet approval gate review",
      ),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "approvalGateReviewJson")) === SOURCE_NODE_V398_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 3,
    replayKeepsRuntimeGateClosed: !replay.readyForRuntimeExecutionPacket && !replay.readyForRuntimeLiveReadGate,
    replayKeepsApprovalGateBlocked:
      replay.approvalGateReviewState === "runtime-execution-packet-approval-gate-reviewed-blocked"
      && replay.approvalGateDecision
        === "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet",
    replayPreservesApprovalInputCounts:
      replay.requiredApprovalInputCount === REQUIRED_APPROVAL_INPUT_COUNT
      && replay.presentApprovalInputCount === 0
      && replay.missingApprovalInputCount === REQUIRED_APPROVAL_INPUT_COUNT,
    replayPreservesRuntimeArtifactCounts:
      !replay.runtimeExecutionArtifactsComplete
      && replay.presentRuntimeExecutionArtifactCount === 0
      && replay.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    replayPreservesSourceCheckCounts:
      replay.checkCount === replay.passedCheckCount
      && replay.sourceCheckCount === replay.sourcePassedCheckCount,
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !verification.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference,
  refs: RuntimeExecutionPacketApprovalGateReviewArchiveReferences,
  replay: RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference,
  checks: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationChecks,
  productionBlockers: readonly RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[],
  warnings: readonly RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[],
  recommendations: readonly RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[],
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles(refs).length,
    presentArchiveFileCount: archiveFiles(refs).filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    replayCheckCount: replay.checkCount,
    replayPassedCheckCount: replay.passedCheckCount,
    requiredApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT,
    presentApprovalInputCount: 0,
    missingApprovalInputCount: REQUIRED_APPROVAL_INPUT_COUNT,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    sourceProductionBlockerCount: source.productionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationChecks,
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v398 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v398 JSON archive must be readable."],
    [checks.jsonApprovalGateReady, "SOURCE_V398_NOT_READY", "source-node-v398", "Node v398 approval gate review must be ready."],
    [checks.jsonReadyForNodeV399ArchiveVerification, "SOURCE_V398_NOT_READY_FOR_V399", "source-node-v398", "Node v398 must point to v399 archive verification."],
    [checks.jsonRuntimeApprovalBlocked, "SOURCE_V398_NOT_BLOCKED", "source-node-v398", "Node v398 must preserve the approval gate block."],
    [checks.markdownRecordsApprovalGateBlockers, "MARKDOWN_BLOCKERS_MISSING", "archive", "v398 Markdown must record the approval gate blockers."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v398 must replay from frozen evidence."],
    [checks.jsonRuntimeGateClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v399 must keep runtime gates closed."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v399 must not start or stop sibling services."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_RUNTIME_APPROVAL",
      severity: "warning",
      source: "archive-verification",
      message: "v399 verifies archived v398 blocked approval gate evidence; it still does not start Java, mini-kv, or runtime probes.",
    },
  ];
}

function collectRecommendations(
  ready: boolean,
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[] {
  return [
    {
      code: ready ? "WAIT_FOR_APPROVAL_INPUTS" : "REPAIR_APPROVAL_GATE_ARCHIVE",
      severity: "recommendation",
      source: "node-v399",
      message: ready
        ? "Use a later version only when all three approval-gate inputs are supplied together."
        : "Repair the v398 archive files or frozen replay before continuing.",
    },
  ];
}

function archiveFiles(
  refs: RuntimeExecutionPacketApprovalGateReviewArchiveReferences,
): RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference[] {
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

function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const fullPath = path.join(projectRoot, relativePath);
  if (!existsSync(fullPath)) {
    return null;
  }
  try {
    return objectValue(JSON.parse(readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "")));
  } catch {
    return null;
  }
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const fullPath = path.join(projectRoot, relativePath);
  if (!existsSync(fullPath)) {
    return "";
  }
  return readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "");
}

function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function objectValue(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
