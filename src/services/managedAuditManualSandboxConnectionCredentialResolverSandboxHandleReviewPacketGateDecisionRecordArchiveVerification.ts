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
import { createDecisionArchiveChecks } from "./archiveVerification/decision.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile,
  SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference,
  SandboxHandleReviewPacketGateDecisionRecordArchiveReferences,
  SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks,
  SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage,
  SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRecord,
  SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationSummary,
  SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification";
const SOURCE_NODE_V360_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record";
const ACTIVE_PLAN =
  "docs/plans2/v360-post-sandbox-handle-review-packet-gate-decision-record-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v361-post-sandbox-handle-review-packet-gate-decision-record-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/360" as const;
const V360_BASENAME = "sandbox-handle-review-packet-gate-decision-record-v360";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/365-sandbox-handle-review-packet-gate-decision-record-v360.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV360 = createSourceNodeV360(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV360, archiveReferences, false);
  const checks = createDecisionArchiveChecks({
    config: input.config,
    source: sourceNodeV360,
    refs: archiveReferences,
    archive: parsedArchive,
    verification: draftArchiveVerification,
    archiveFiles: archiveFileReferences(archiveReferences),
    sourceRoute: SOURCE_NODE_V360_ROUTE,
  });
  checks.readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV360, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV360);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV360, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate decision record archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "sandbox-handle-review-packet-gate-decision-record-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-sandbox-handle-review-packet-gate-decision-record"
      : "blocked",
    readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification: ready,
    readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview: ready,
    consumesNodeV360SandboxHandleReviewPacketGateDecisionRecord: true,
    activeNodeVersion: "Node v361",
    sourceNodeVersion: "Node v360",
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
    sourceNodeV360,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPacketGateDecisionRecordArchiveVerificationJson: ROUTE_PATH,
      sandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV360Json: SOURCE_NODE_V360_ROUTE,
      sourceNodeV360Markdown: `${SOURCE_NODE_V360_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v362",
    },
    nextActions: ready
      ? [
        "Use Node v362 only for sandbox handle review prerequisite closure review.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step asks for real credential material, raw endpoint URL, provider/client, or executable managed audit connection code.",
      ]
      : [
        "Fix the v360 archive evidence before proceeding to Node v362.",
        "Do not rerun probes or request Java/mini-kv code changes from a broken v360 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): SandboxHandleReviewPacketGateDecisionRecordArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V360_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V360_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V360_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V360_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V360_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V360_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V360_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference {
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
  refs: SandboxHandleReviewPacketGateDecisionRecordArchiveReferences,
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

function createSourceNodeV360(
  archive: ParsedArchiveEvidence,
): SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference {
  return {
    sourceVersion: "Node v360",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1",
    decisionState: decisionState(archive),
    decision: decision(archive),
    readyForDecisionRecord: valueAt(archive.json, "readyForSandboxHandleReviewPacketGateDecisionRecord") === true,
    readyForNodeV361ArchiveVerification:
      valueAt(archive.json, "readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification") === true,
    decisionDigest: stringValue(valueAt(archive.json, "decisionRecord", "decisionDigest")),
    sourceArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "decisionRecord", "sourceArchiveVerificationDigest")),
    sourceIntakeDigest: stringValue(valueAt(archive.json, "decisionRecord", "sourceIntakeDigest")),
    inputCount: numberValue(valueAt(archive.json, "summary", "inputCount")),
    packetInputCount: numberValue(valueAt(archive.json, "summary", "packetInputCount")),
    gateOutputCount: numberValue(valueAt(archive.json, "summary", "gateOutputCount")),
    stopConditionCount: numberValue(valueAt(archive.json, "summary", "stopConditionCount")),
    sourceArchiveFileCount: numberValue(valueAt(archive.json, "summary", "sourceArchiveFileCount")),
    sourcePresentArchiveFileCount: numberValue(valueAt(archive.json, "summary", "sourcePresentArchiveFileCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    decisionRecordOnly: true,
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
): SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference["decisionState"] {
  const value = valueAt(archive.json, "decisionState");
  if (value === "sandbox-handle-review-packet-gate-decision-record-ready" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function decision(
  archive: ParsedArchiveEvidence,
): SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference["decision"] {
  const value = valueAt(archive.json, "decision");
  if (value === "advance-to-sandbox-handle-review-prerequisite-closure-review" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function createArchiveVerification(
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
  refs: SandboxHandleReviewPacketGateDecisionRecordArchiveReferences,
  ready: boolean,
): SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRecord {
  const recordWithoutDigest = {
    verificationMode: "sandbox-handle-review-packet-gate-decision-record-archive-verification" as const,
    sourceSpan: "Node v360 sandbox handle review packet/gate decision record" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-sandbox-handle-review-packet-gate-decision-record" as const
      : "blocked" as const,
    sourceDecisionDigest: source.decisionDigest,
    verifiesJsonMarkdownAndSummary: true as const,
    verifiesScreenshotExplanationAndWalkthrough: true as const,
    verifiesPlanAndArchiveIndexes: true as const,
    verifiesDecisionInputsAndBoundaryControls: true as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v362" as const,
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
  refs: SandboxHandleReviewPacketGateDecisionRecordArchiveReferences,
): SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference[] {
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
  checks: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks,
): SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[] {
  const rules: Array<[
    boolean,
    string,
    SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage["source"],
    string,
  ]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v360 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v360 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v360 JSON evidence must use the packet/gate decision record profile version."],
    [checks.jsonReadyForV361Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v360 JSON must be ready and include stable decision/source digests."],
    [checks.jsonDecisionValid, "DECISION_INVALID", "node-v360",
      "v361 can archive only a packet/gate decision that advances to prerequisite closure review."],
    [checks.decisionInputsRecorded, "DECISION_INPUTS_INCOMPLETE", "archive-json",
      "v360 archive must record all five decision inputs."],
    [checks.decisionRecordRecorded, "DECISION_RECORD_INCOMPLETE", "archive-json",
      "v360 archive must record the non-executable decision record and closed boundary fields."],
    [checks.allChecksPassedInSourceDecisionRecord, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json",
      "v360 source decision record must have all 20 checks passed and zero production blockers."],
    [checks.sourceNodeV359ArchiveEvidenceRecorded, "SOURCE_NODE_V359_EVIDENCE_INCOMPLETE", "archive-json",
      "v360 source must retain v359 archive verification evidence counts."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v360 summary must match the archived JSON profile."],
    [checks.markdownRecordsDecisionRecord, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v360 Markdown must record the decision state, decision, and v361 readiness."],
    [checks.markdownRecordsDecisionInputsAndBoundaries, "ARCHIVE_MARKDOWN_BOUNDARIES_INCOMPLETE", "archive-markdown",
      "v360 Markdown must record decision inputs and closed credential/endpoint/connection boundaries."],
    [checks.browserSnapshotPresent, "BROWSER_SNAPSHOT_MISSING", "archive-docs",
      "v360 browser snapshot must exist and record the decision."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v360 screenshot and HTML archive must exist."],
    [checks.explanationRecordsDecisionAndBoundary, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v360 explanation must record the decision and closed managed audit boundaries."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v360 code walkthrough must explain decision inputs, decision record, and checks."],
    [checks.sourcePlanPointsToV361, "SOURCE_PLAN_NOT_ALIGNED", "archive-docs",
      "v360 source plan must point to v361 archive verification."],
    [checks.planIndexReferencesV360AndV361, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan index must reference v360 completion and v361 continuation."],
    [checks.archiveIndexReferencesV360, "ARCHIVE_INDEX_NOT_ALIGNED", "archive-docs",
      "d/README.md must reference v360 archive."],
    [checks.routeRecordedInArchive, "ROUTE_NOT_RECORDED", "archive-json",
      "v360 JSON evidence must record the source JSON/Markdown route."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v361 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v360/v361 must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "v360/v361 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "v360/v361 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v360/v361 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and invocation must remain disallowed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification",
      "v361 archive verification must not request Java v153 + mini-kv v144."],
    [checks.archiveVerificationDigestStable, "ARCHIVE_VERIFICATION_DIGEST_UNSTABLE", "archive-verification",
      "v361 archive verification digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
): SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[] {
  return [{
    code: "V360_PACKET_GATE_DECISION_RECORD_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v360",
    message: `v361 verified v360 as ${source.decision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V362_PREREQUISITE_CLOSURE_REVIEW" : "FIX_V360_ARCHIVE_BEFORE_V362",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed only to sandbox handle review prerequisite closure review; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Keep the stage blocked until the v360 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
  refs: SandboxHandleReviewPacketGateDecisionRecordArchiveReferences,
  checks: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks,
  productionBlockers: readonly SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[],
  warnings: readonly SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[],
  recommendations: readonly SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[],
): SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    inputCount: source.inputCount,
    packetInputCount: source.packetInputCount,
    gateOutputCount: source.gateOutputCount,
    stopConditionCount: source.stopConditionCount,
    sourceArchiveFileCount: source.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: source.sourcePresentArchiveFileCount,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
