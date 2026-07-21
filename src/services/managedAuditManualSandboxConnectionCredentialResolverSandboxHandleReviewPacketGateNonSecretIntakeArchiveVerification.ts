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
import { createIntakeArchiveChecks } from "./archiveVerification/intake.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile,
  SandboxHandleReviewPacketGateIntakeArchiveFileReference,
  SandboxHandleReviewPacketGateIntakeArchiveReferences,
  SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks,
  SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage,
  SandboxHandleReviewPacketGateIntakeArchiveVerificationRecord,
  SandboxHandleReviewPacketGateIntakeArchiveVerificationSummary,
  SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification";
const SOURCE_NODE_V358_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake";
const ACTIVE_PLAN =
  "docs/plans2/v358-post-sandbox-handle-review-packet-gate-non-secret-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans2/v359-post-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/358" as const;
const V358_BASENAME = "sandbox-handle-review-packet-gate-non-secret-intake-v358";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/363-sandbox-handle-review-packet-gate-non-secret-intake-v358.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV358 = createSourceNodeV358(parsedArchive);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV358, archiveReferences, false);
  const checks = createIntakeArchiveChecks({
    config: input.config,
    source: sourceNodeV358,
    refs: archiveReferences,
    archive: parsedArchive,
    verification: draftArchiveVerification,
    archiveFiles: archiveFileReferences(archiveReferences),
    sourceRoute: SOURCE_NODE_V358_ROUTE,
  });
  checks.readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV358, archiveReferences, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV358);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV358, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate non-secret intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "sandbox-handle-review-packet-gate-non-secret-intake-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-sandbox-handle-review-packet-gate-non-secret-intake"
      : "blocked",
    readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification: ready,
    readyForNodeV360SandboxHandleReviewPacketGateDecisionRecord: ready,
    consumesNodeV358SandboxHandleReviewPacketGateNonSecretIntake: true,
    activeNodeVersion: "Node v359",
    sourceNodeVersion: "Node v358",
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
    sourceNodeV358,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxHandleReviewPacketGateIntakeArchiveVerificationJson: ROUTE_PATH,
      sandboxHandleReviewPacketGateIntakeArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV358Json: SOURCE_NODE_V358_ROUTE,
      sourceNodeV358Markdown: `${SOURCE_NODE_V358_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v360",
    },
    nextActions: ready
      ? [
        "Use Node v360 only for a sandbox handle review packet/gate decision record or prerequisite closure.",
        "Keep credential value, raw endpoint URL, provider/client, runtime shell, managed audit HTTP/TCP, Java writes, and mini-kv write/admin scopes closed.",
        "Pause if the next step needs real sandbox credential values, raw endpoint URLs, or executable managed audit connection code.",
      ]
      : [
        "Fix the v358 archive evidence before proceeding to Node v360.",
        "Do not rerun probes or request Java/mini-kv code changes from a broken v358 archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): SandboxHandleReviewPacketGateIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V358_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V358_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V358_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V358_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V358_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V358_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V358_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
    archiveIndex: fileReference(projectRoot, "d", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): SandboxHandleReviewPacketGateIntakeArchiveFileReference {
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
  refs: SandboxHandleReviewPacketGateIntakeArchiveReferences,
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

function createSourceNodeV358(
  archive: ParsedArchiveEvidence,
): SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference {
  return {
    sourceVersion: "Node v358",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1",
    intakeState: intakeState(archive),
    intakeDecision: intakeDecision(archive),
    readyForPacketGateIntake: valueAt(archive.json, "readyForSandboxHandleReviewPacketGateNonSecretIntake") === true,
    readyForNodeV359ArchiveVerification:
      valueAt(archive.json, "readyForNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intakeRecord", "intakeDigest")),
    sourceArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "intakeRecord", "sourceArchiveVerificationDigest")),
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
    packetGateIntakeOnly: true,
    sandboxHandleReviewOnly: true,
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
): SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference["intakeState"] {
  const value = valueAt(archive.json, "intakeState");
  if (value === "sandbox-handle-review-packet-gate-non-secret-intake-ready" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function intakeDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference["intakeDecision"] {
  const value = valueAt(archive.json, "intakeDecision");
  if (value === "define-non-secret-sandbox-handle-review-packet-gate" || value === "blocked") {
    return value;
  }
  return "blocked";
}

function createArchiveVerification(
  source: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
  refs: SandboxHandleReviewPacketGateIntakeArchiveReferences,
  ready: boolean,
): SandboxHandleReviewPacketGateIntakeArchiveVerificationRecord {
  const recordWithoutDigest = {
    verificationMode: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verification" as const,
    sourceSpan: "Node v358 sandbox handle review packet/gate non-secret intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-sandbox-handle-review-packet-gate-non-secret-intake" as const
      : "blocked" as const,
    sourceIntakeDigest: source.intakeDigest,
    verifiesJsonMarkdownAndSummary: true as const,
    verifiesScreenshotExplanationAndWalkthrough: true as const,
    verifiesPlanAndArchiveIndexes: true as const,
    verifiesPacketInputsGateOutputsAndStopConditions: true as const,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v360" as const,
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
  refs: SandboxHandleReviewPacketGateIntakeArchiveReferences,
): SandboxHandleReviewPacketGateIntakeArchiveFileReference[] {
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
  checks: SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks,
): SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[] {
  const rules: Array<[
    boolean,
    string,
    SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage["source"],
    string,
  ]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v358 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v358 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v358 JSON evidence must use the packet/gate non-secret intake profile version."],
    [checks.jsonReadyForV359Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v358 JSON must be ready and include stable intake/source archive verification digests."],
    [checks.jsonIntakeDecisionValid, "INTAKE_DECISION_INVALID", "node-v358",
      "v359 can archive only a non-secret sandbox handle review packet/gate intake."],
    [checks.packetInputsRecorded, "PACKET_INPUTS_INCOMPLETE", "archive-json",
      "v358 archive must record the six non-secret packet inputs."],
    [checks.gateOutputsRecorded, "GATE_OUTPUTS_INCOMPLETE", "archive-json",
      "v358 archive must record the five gate outputs."],
    [checks.stopConditionsRecorded, "STOP_CONDITIONS_INCOMPLETE", "archive-json",
      "v358 archive must record the seven fail-closed stop conditions."],
    [checks.allChecksPassedInSourceIntake, "SOURCE_CHECKS_NOT_ALL_PASSED", "archive-json",
      "v358 source intake must have all 27 checks passed and zero production blockers."],
    [checks.sourceNodeV357ArchiveEvidenceRecorded, "SOURCE_NODE_V357_EVIDENCE_INCOMPLETE", "archive-json",
      "v358 source must retain v357 archive verification evidence counts."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v358 summary must match the archived JSON profile."],
    [checks.markdownRecordsPacketGateIntake, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v358 Markdown must record the intake decision and closed runtime boundaries."],
    [checks.markdownRecordsInputOutputStopConditionCounts, "ARCHIVE_MARKDOWN_COUNTS_INCOMPLETE", "archive-markdown",
      "v358 Markdown must record packet input, gate output, and stop condition counts."],
    [checks.browserSnapshotPresent, "BROWSER_SNAPSHOT_MISSING", "archive-docs",
      "v358 browser snapshot must exist and record the intake decision."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v358 screenshot and HTML archive must exist."],
    [checks.explanationRecordsNonSecretBoundary, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v358 explanation must record non-secret, credential, endpoint, and managed audit HTTP/TCP boundaries."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v358 code walkthrough must explain packet inputs, gate outputs, stop conditions, and checks."],
    [checks.sourcePlanPointsToV359, "SOURCE_PLAN_NOT_ALIGNED", "archive-docs",
      "v358 source plan must point to v359 archive verification."],
    [checks.planIndexReferencesV358AndV359, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan index must reference v358 completion and v359 continuation."],
    [checks.archiveIndexReferencesV358, "ARCHIVE_INDEX_NOT_ALIGNED", "archive-docs",
      "d/README.md must reference v358 archive."],
    [checks.routeRecordedInArchive, "ROUTE_NOT_RECORDED", "archive-json",
      "v358 JSON evidence must record the source JSON/Markdown route."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v359 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v359 and source v358 archive must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noCredentialValueRequestedOrRead, "CREDENTIAL_VALUE_OPENED", "runtime-boundary",
      "v358/v359 must not request or read credential values."],
    [checks.noRawEndpointUrlRequestedOrParsed, "RAW_ENDPOINT_OPENED", "runtime-boundary",
      "v358/v359 must not request or parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary",
      "v358/v359 must not instantiate secret provider or resolver client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary",
      "Runtime shell must remain unimplemented and invocation must remain disallowed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "archive-verification",
      "v359 archive verification must not request Java v153 + mini-kv v144."],
    [checks.archiveVerificationDigestStable, "ARCHIVE_VERIFICATION_DIGEST_UNSTABLE", "archive-verification",
      "v359 archive verification digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
): SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[] {
  return [{
    code: "V358_PACKET_GATE_INTAKE_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v358",
    message: `v359 verified v358 as ${source.intakeDecision} with ${source.passedCheckCount}/${source.checkCount} source checks passed.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V360_DECISION_RECORD" : "FIX_V358_ARCHIVE_BEFORE_V360",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed only to a packet/gate decision record or prerequisite closure; do not open credential, endpoint, provider/client, runtime, managed audit connection, or write scopes."
      : "Keep the stage blocked until the v358 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
  refs: SandboxHandleReviewPacketGateIntakeArchiveReferences,
  checks: SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks,
  productionBlockers: readonly SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[],
  warnings: readonly SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[],
  recommendations: readonly SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[],
): SandboxHandleReviewPacketGateIntakeArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
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
