import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../../../config.js";
import {
  isSha256,
  numberValue,
  readProjectJson,
  stringValue,
  valueAt,
} from "../../../evidence/projectJson.js";
import { stripJsonBom } from "../../jsonEvidenceUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "../../liveProbeReportUtils.js";
import { completeChecks } from "../checkAssembly.js";
import { createDeclaredArchiveChecks } from "./archiveChecks.js";
import {
  loadDeclaredIntake,
} from "./intake.js";
import type {
  DeclaredArchiveFile,
  DeclaredArchiveRefs,
  DeclaredArchiveChecks,
  DeclaredArchiveMessage,
  DeclaredArchiveRecord,
  DeclaredArchiveSummary,
  DeclaredReplay,
  DeclaredArchiveProfile,
  ParsedDeclaredArchive,
  SourceV388DeclaredIntake,
} from "./archiveTypes.js";

export {
  renderDeclaredArchiveMarkdown,
} from "./archiveRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification";
const SOURCE_NODE_V388_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake";
const ACTIVE_PLAN =
  "docs/plans3/v388-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v389-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/388" as const;
const V388_BASENAME = "java-mini-kv-declared-operator-lifecycle-evidence-intake-v388";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/393-java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.md";

export function loadDeclaredArchive(
  input: { config: AppConfig; archiveRoot?: string },
): DeclaredArchiveProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV388 = createSourceNodeV388(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV388, archiveReferences, replay, false);
  const completed = completeChecks(createDeclaredArchiveChecks({
    source: sourceNodeV388,
    files: archiveFiles(archiveReferences),
    archive: parsed,
    replay,
    verification: draftVerification,
    sourceRoute: SOURCE_NODE_V388_ROUTE,
  }), "readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification");
  const { checks, ready } = completed;
  const archiveVerification = createArchiveVerification(sourceNodeV388, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isSha256(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV388, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified" : "blocked",
    archiveVerificationDecision: ready
      ? "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan"
      : "blocked",
    readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: ready,
    readyForNodeV390RuntimeGatePlan: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v389",
    sourceNodeVersion: "Node v388",
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
    activeShardPrototypeEnabled: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV388,
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
      sourceNodeV388Json: SOURCE_NODE_V388_ROUTE,
      sourceNodeV388Markdown: `${SOURCE_NODE_V388_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v390",
    },
    nextActions: ready
      ? [
        "Write a separate Node v390 runtime live-read gate plan before any runtime probe is considered.",
        "Keep Java and mini-kv in recommended parallel mode; Node v389 only verifies the v388 archive.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this archive verification.",
      ]
      : [
        "Repair the v388 archive before moving beyond v389.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): DeclaredArchiveRefs {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V388_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V388_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V388_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V388_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V388_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V388_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V388_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): DeclaredArchiveFile {
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
  refs: DeclaredArchiveRefs,
): ParsedDeclaredArchive {
  return {
    json: readProjectJson(projectRoot, refs.jsonEvidence.path),
    markdown: readTextFile(projectRoot, refs.markdownEvidence.path),
    summary: readProjectJson(projectRoot, refs.summaryEvidence.path),
    browserSnapshot: readTextFile(projectRoot, refs.browserSnapshot.path),
    explanation: readTextFile(projectRoot, refs.explanation.path),
    codeWalkthrough: readTextFile(projectRoot, refs.codeWalkthrough.path),
    sourcePlan: readTextFile(projectRoot, refs.sourcePlan.path),
    plansIndex: readTextFile(projectRoot, refs.plansIndex.path),
    archiveIndex: readTextFile(projectRoot, refs.archiveIndex.path),
  };
}

function createSourceNodeV388(archive: ParsedDeclaredArchive): SourceV388DeclaredIntake {
  return {
    sourceVersion: "Node v388",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakeState: stringValue(valueAt(archive.json, "intakeState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForDeclaredOperatorLifecycleEvidenceIntake:
      valueAt(archive.json, "readyForDeclaredOperatorLifecycleEvidenceIntake") === true,
    readyForNodeV389ArchiveVerification: valueAt(archive.json, "readyForNodeV389ArchiveVerification") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v388",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    evidenceIntakeOnly: valueAt(archive.json, "evidenceIntakeOnly") === true,
    declaredOperatorLifecycleEvidencePresent:
      valueAt(archive.json, "declaredOperatorLifecycleEvidencePresent") === true,
    runtimeGateRequiresSeparateApproval: valueAt(archive.json, "runtimeGateRequiresSeparateApproval") === true,
    javaDeclaredOperatorLifecycleVersion:
      stringValue(valueAt(archive.json, "javaDeclaredOperatorLifecycle", "version")),
    miniKvDeclaredOperatorLifecycleReleaseVersion:
      stringValue(valueAt(archive.json, "miniKvDeclaredOperatorLifecycle", "releaseVersion")),
    miniKvFrozenOperatorTemplateReleaseVersion:
      stringValue(valueAt(archive.json, "miniKvFrozenOperatorTemplate", "releaseVersion")),
    declaredOperatorEvidenceSourceCount:
      numberValue(valueAt(archive.json, "summary", "declaredOperatorEvidenceSourceCount")),
    readyEvidenceSourceCount: numberValue(valueAt(archive.json, "summary", "readyEvidenceSourceCount")),
    miniKvRequiredBeforeRuntimeGateCount:
      numberValue(valueAt(archive.json, "summary", "miniKvRequiredBeforeRuntimeGateCount")),
    liveReadGateAllowed: valueAt(archive.json, "liveReadGateAllowed") === true,
    runtimeProbeAllowed: valueAt(archive.json, "runtimeProbeAllowed") === true,
    activeShardPrototypeEnabled: valueAt(archive.json, "activeShardPrototypeEnabled") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intake", "intakeDigest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    javaDeclaredOperatorLifecycleUsesHistoricalFallback:
      valueAt(archive.json, "javaDeclaredOperatorLifecycleFile", "usedHistoricalFallback") === true,
    miniKvDeclaredOperatorLifecycleUsesHistoricalFallback:
      valueAt(archive.json, "miniKvDeclaredOperatorLifecycleFile", "usedHistoricalFallback") === true,
    miniKvFrozenOperatorTemplateUsesHistoricalFallback:
      valueAt(archive.json, "miniKvFrozenOperatorTemplateFile", "usedHistoricalFallback") === true,
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

function replayFromFrozenEvidence(
  config: AppConfig,
  projectRoot: string,
): DeclaredReplay {
  const profile = loadDeclaredIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForDeclaredOperatorLifecycleEvidenceIntake
    && profile.readyForNodeV389ArchiveVerification
    && profile.javaDeclaredOperatorLifecycleFile.usedHistoricalFallback
    && profile.miniKvDeclaredOperatorLifecycleFile.usedHistoricalFallback
    && profile.miniKvFrozenOperatorTemplateFile.usedHistoricalFallback
    && profile.javaDeclaredOperatorLifecycle.version === "Java v161"
    && profile.miniKvDeclaredOperatorLifecycle.releaseVersion === "v152"
    && profile.miniKvFrozenOperatorTemplate.releaseVersion === "v151"
    && profile.declaredOperatorLifecycleEvidencePresent
    && profile.runtimeGateRequiresSeparateApproval
    && profile.summary.declaredOperatorEvidenceSourceCount === 2
    && profile.summary.readyEvidenceSourceCount === 3
    && profile.summary.miniKvRequiredBeforeRuntimeGateCount === 4
    && !profile.readyForRuntimeLiveReadGate
    && !profile.liveReadGateAllowed
    && !profile.runtimeProbeAllowed
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForDeclaredOperatorLifecycleEvidenceIntake: profile.readyForDeclaredOperatorLifecycleEvidenceIntake,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    declaredOperatorLifecycleEvidencePresent: profile.declaredOperatorLifecycleEvidencePresent,
    runtimeGateRequiresSeparateApproval: profile.runtimeGateRequiresSeparateApproval,
    javaDeclaredOperatorLifecycleUsedHistoricalFallback:
      profile.javaDeclaredOperatorLifecycleFile.usedHistoricalFallback,
    miniKvDeclaredOperatorLifecycleUsedHistoricalFallback:
      profile.miniKvDeclaredOperatorLifecycleFile.usedHistoricalFallback,
    miniKvFrozenOperatorTemplateUsedHistoricalFallback:
      profile.miniKvFrozenOperatorTemplateFile.usedHistoricalFallback,
    javaDeclaredOperatorLifecycleVersion: profile.javaDeclaredOperatorLifecycle.version,
    miniKvDeclaredOperatorLifecycleReleaseVersion: profile.miniKvDeclaredOperatorLifecycle.releaseVersion,
    miniKvFrozenOperatorTemplateReleaseVersion: profile.miniKvFrozenOperatorTemplate.releaseVersion,
    declaredOperatorEvidenceSourceCount: profile.summary.declaredOperatorEvidenceSourceCount,
    readyEvidenceSourceCount: profile.summary.readyEvidenceSourceCount,
    miniKvRequiredBeforeRuntimeGateCount: profile.summary.miniKvRequiredBeforeRuntimeGateCount,
    liveReadGateAllowed: profile.liveReadGateAllowed,
    runtimeProbeAllowed: profile.runtimeProbeAllowed,
    activeShardPrototypeEnabled: profile.activeShardPrototypeEnabled,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
  };
}

function createArchiveVerification(
  source: SourceV388DeclaredIntake,
  refs: DeclaredArchiveRefs,
  replay: DeclaredReplay,
  ready: boolean,
): DeclaredArchiveRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification" as const,
    sourceSpan: "Node v388 declared operator lifecycle evidence intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan" as const
      : "blocked" as const,
    sourceIntakeDigest: source.intakeDigest,
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
    verifiesRuntimeGateStillBlocked: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v390",
  };
}

function createSummary(
  source: SourceV388DeclaredIntake,
  refs: DeclaredArchiveRefs,
  replay: DeclaredReplay,
  checks: DeclaredArchiveChecks,
  productionBlockers: readonly DeclaredArchiveMessage[],
  warnings: readonly DeclaredArchiveMessage[],
  recommendations: readonly DeclaredArchiveMessage[],
): DeclaredArchiveSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles(refs).length,
    presentArchiveFileCount: archiveFiles(refs).filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    replayCheckCount: replay.checkCount,
    replayPassedCheckCount: replay.passedCheckCount,
    declaredOperatorEvidenceSourceCount: source.declaredOperatorEvidenceSourceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DeclaredArchiveChecks,
): DeclaredArchiveMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v388 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v388 JSON archive must be readable."],
    [checks.jsonIntakeReady, "SOURCE_V388_NOT_READY", "source-node-v388", "Node v388 intake must be ready for archive verification."],
    [checks.jsonUsesFrozenHistoricalSnapshots, "SOURCE_V388_NOT_FROZEN", "source-node-v388", "v388 must use frozen historical snapshots."],
    [checks.jsonRuntimeGateClosed, "RUNTIME_GATE_OPENED", "source-node-v388", "v388 must keep runtime live-read gate closed."],
    [checks.jsonRuntimeGateRequiresSeparateApproval, "SEPARATE_RUNTIME_APPROVAL_MISSING", "source-node-v388", "v388 must record separate runtime approval as required."],
    [checks.jsonDeclaredOperatorEvidencePresent, "DECLARED_OPERATOR_EVIDENCE_MISSING", "source-node-v388", "v388 must record Java and mini-kv declared operator lifecycle evidence."],
    [checks.jsonActiveShardPrototypeDisabled, "ACTIVE_SHARD_PROTOTYPE_ENABLED", "source-node-v388", "v388 must keep active shard prototype disabled."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v388 must replay from frozen evidence."],
    [checks.replayUsesFrozenJavaV161MiniKvV152AndV151, "V388_REPLAY_NOT_FROZEN", "frozen-evidence-replay", "Replay must use Java v161, mini-kv v152, and mini-kv v151 frozen snapshots."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime live-read gate disabled."],
    [checks.replayKeepsDeclaredOperatorEvidence, "REPLAY_DECLARED_EVIDENCE_CHANGED", "frozen-evidence-replay", "Replay must preserve declared operator lifecycle evidence counts."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v389 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v389 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): DeclaredArchiveMessage[] {
  return [{
    code: "ARCHIVE_VERIFICATION_IS_NOT_RUNTIME_GATE",
    severity: "warning",
    source: "archive-verification",
    message: "v389 verifies archived v388 declared lifecycle intake; it still does not run Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): DeclaredArchiveMessage[] {
  return [{
    code: ready ? "WRITE_SEPARATE_RUNTIME_GATE_PLAN" : "REPAIR_V388_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v389",
    message: ready
      ? "Write a separate Node v390 runtime live-read gate plan before any runtime probe or service lifecycle action."
      : "Repair the v388 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: DeclaredArchiveRefs,
): DeclaredArchiveFile[] {
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

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return stripJsonBom(readFileSync(absolutePath, "utf8"));
}
