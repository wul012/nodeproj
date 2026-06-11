import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutProfile,
  RuntimeExecutionPassEvidenceCloseoutArchiveReference,
  RuntimeExecutionPassEvidenceCloseoutChecks,
  RuntimeExecutionPassEvidenceCloseoutMessage,
  RuntimeExecutionPassEvidenceCloseoutRecord,
  RuntimeExecutionPassEvidenceCloseoutStageRecord,
  RuntimeExecutionPassEvidenceCloseoutSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-closeout.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-closeout";
const SOURCE_NODE_V408_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-archive-verification";
const V407_SMOKE_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke";
const ACTIVE_PLAN =
  "docs/plans3/v409-post-java-mini-kv-runtime-execution-pass-evidence-closeout-roadmap.md";

const V405_SUMMARY =
  "e/405/evidence/java-mini-kv-runtime-execution-canonical-approval-input-value-validation-v405-summary.json";
const V406_SUMMARY =
  "e/406/evidence/java-mini-kv-runtime-execution-live-read-gate-v406-summary.json";
const V407_SUMMARY =
  "e/407/evidence/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407-summary.json";
const V408_SUMMARY =
  "e/408/evidence/java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408-summary.json";
const V408_HTTP =
  "e/408/evidence/java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408-http.json";
const V408_MARKDOWN =
  "e/408/evidence/java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408-http.md";
const V408_BROWSER_SNAPSHOT =
  "e/408/evidence/java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408-browser-snapshot.md";
const V408_SCREENSHOT =
  "e/408/图片/java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408.png";
const V408_EXPLANATION =
  "e/408/解释/java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408.md";
const V408_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/413-java-mini-kv-runtime-execution-pass-evidence-archive-verification-v408.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout(
  input: { config: AppConfig },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutProfile {
  void input.config;
  const archiveReferences = createArchiveReferences();
  const summaries = {
    v405: readJsonObject(V405_SUMMARY),
    v406: readJsonObject(V406_SUMMARY),
    v407: readJsonObject(V407_SUMMARY),
    v408: readJsonObject(V408_SUMMARY),
  };
  const v408HttpArchive = readJsonObject(V408_HTTP);
  const closeout = createCloseoutRecord(summaries, v408HttpArchive, archiveReferences);
  const checks = createChecks(summaries, v408HttpArchive, archiveReferences, closeout);
  checks.readyForRuntimeExecutionPassEvidenceCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionPassEvidenceCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRuntimeExecutionPassEvidenceCloseout;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(archiveReferences, closeout, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution pass evidence closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    closeoutState: ready ? "runtime-execution-pass-evidence-closeout-ready" : "blocked",
    closeoutDecision: ready ? "close-runtime-execution-pass-evidence-chain" : "blocked",
    readyForRuntimeExecutionPassEvidenceCloseout: ready,
    readyForRuntimeExecutionChainHandoff: ready,
    activeNodeVersion: "Node v409",
    sourceNodeVersion: "Node v408",
    sourceStageVersions: ["Node v405", "Node v406", "Node v407", "Node v408"],
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
    closeoutOnly: true,
    archiveVerificationOnly: true,
    rerunsSmoke: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
    javaMiniKvRecommendedParallel: true,
    nodeIsUpstreamPreApprovalBlocker: false,
    archiveReferences,
    closeout,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      passEvidenceCloseoutJson: ROUTE_PATH,
      passEvidenceCloseoutMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV408Json: SOURCE_NODE_V408_ROUTE,
      sourceNodeV408Markdown: `${SOURCE_NODE_V408_ROUTE}?format=markdown`,
      v407SmokeJson: V407_SMOKE_ROUTE,
      activePlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v410",
    },
    nextActions: ready
      ? [
        "Treat Node v409 as the closeout ledger for the v405-v408 runtime execution pass evidence chain.",
        "Java and mini-kv may continue in parallel; Node v409 is not a fresh upstream pre-approval blocker.",
        "Only start a new runtime execution chain if a later version introduces a concrete new contract or artifact consumer.",
      ]
      : [
        "Repair the missing or inconsistent v405-v408 archive evidence before handoff.",
        "Do not rerun Java or mini-kv smoke from v409.",
      ],
  };
}

function createArchiveReferences(): RuntimeExecutionPassEvidenceCloseoutArchiveReference[] {
  return [
    archiveReference("v408-summary-json", V408_SUMMARY),
    archiveReference("v408-http-json", V408_HTTP),
    archiveReference("v408-http-markdown", V408_MARKDOWN),
    archiveReference("v408-browser-snapshot", V408_BROWSER_SNAPSHOT),
    archiveReference("v408-screenshot", V408_SCREENSHOT),
    archiveReference("v408-explanation", V408_EXPLANATION),
    archiveReference("v408-code-walkthrough", V408_WALKTHROUGH),
  ];
}

function archiveReference(id: string, path: string): RuntimeExecutionPassEvidenceCloseoutArchiveReference {
  const file = evidenceFile(id, path);
  return {
    id,
    file,
    present: file.exists && file.sizeBytes > 0,
  };
}

function createCloseoutRecord(
  summaries: {
    v405: Record<string, unknown>;
    v406: Record<string, unknown>;
    v407: Record<string, unknown>;
    v408: Record<string, unknown>;
  },
  v408HttpArchive: Record<string, unknown>,
  archiveReferences: RuntimeExecutionPassEvidenceCloseoutArchiveReference[],
): RuntimeExecutionPassEvidenceCloseoutRecord {
  const stageRecords = [
    stageRecord("Node v405", summaries.v405, "validationState", "validationDecision",
      "readyForRuntimeExecutionCanonicalApprovalInputValueValidation"),
    stageRecord("Node v406", summaries.v406, null, null, "readyForRuntimeExecutionLiveReadGate"),
    stageRecord("Node v407", summaries.v407, "smokeState", "smokeDecision",
      "readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke"),
    stageRecord("Node v408", summaries.v408, "verificationState", "verificationDecision",
      "readyForRuntimeExecutionPassEvidenceArchiveVerification"),
  ];
  const closeoutPayload = {
    verificationMode: "runtime-execution-pass-evidence-closeout",
    stageRecords,
    v408ArchiveDigest: stringField(v408HttpArchive, "profileVersion"),
    v408ArchiveReferenceCount: numberField(summaries.v408, "archiveReferenceCount") ?? 0,
    v408PresentArchiveReferenceCount: numberField(summaries.v408, "presentArchiveReferenceCount") ?? 0,
    v407CleanupPassed: booleanField(objectField(summaries.v407, "cleanupProof"), "cleanupPassed") ?? false,
  };
  const totalCheckCount = stageRecords.reduce((total, stage) => total + stage.checkCount, 0);
  const totalPassedCheckCount = stageRecords.reduce((total, stage) => total + stage.passedCheckCount, 0);
  const totalProductionBlockerCount = stageRecords.reduce((total, stage) => total + stage.productionBlockerCount, 0);
  const readyStageCount = stageRecords.filter((stage) => stage.ready).length;
  const closeoutDecision = readyStageCount === stageRecords.length
    && totalCheckCount === totalPassedCheckCount
    && totalProductionBlockerCount === 0
    ? "close-runtime-execution-pass-evidence-chain"
    : "blocked";

  return {
    closeoutDigest: sha256StableJson(closeoutPayload),
    verificationMode: "runtime-execution-pass-evidence-closeout",
    sourceSpan:
      "Node v405 canonical approval + Node v406 live-read gate + Node v407 smoke + Node v408 archive verification",
    stageRecords,
    sourceSummaryCount: stageRecords.length,
    readyStageCount,
    totalCheckCount,
    totalPassedCheckCount,
    totalProductionBlockerCount,
    v407CleanupPassed: booleanField(objectField(summaries.v407, "cleanupProof"), "cleanupPassed") ?? false,
    v408ArchiveReferenceCount: archiveReferences.length,
    v408PresentArchiveReferenceCount: archiveReferences.filter((reference) => reference.present).length,
    v408FullVitestFiles: numberField(objectField(summaries.v408, "verification"), "fullVitestFiles") ?? 0,
    v408FullVitestTests: numberField(objectField(summaries.v408, "verification"), "fullVitestTests") ?? 0,
    closeoutDecision,
    nextNodeVersionSuggested: "Node v410",
  };
}

function stageRecord(
  version: RuntimeExecutionPassEvidenceCloseoutStageRecord["version"],
  summary: Record<string, unknown>,
  stateField: string | null,
  decisionField: string | null,
  readyField: string,
): RuntimeExecutionPassEvidenceCloseoutStageRecord {
  return {
    version,
    route: stringField(summary, "route"),
    state: stateField === null ? null : stringField(summary, stateField),
    decision: decisionField === null ? null : stringField(summary, decisionField),
    ready: booleanField(summary, readyField) ?? false,
    checkCount: numberField(summary, "checkCount") ?? 0,
    passedCheckCount: numberField(summary, "passedCheckCount") ?? 0,
    productionBlockerCount: numberField(summary, "productionBlockerCount") ?? 0,
  };
}

function createChecks(
  summaries: {
    v405: Record<string, unknown>;
    v406: Record<string, unknown>;
    v407: Record<string, unknown>;
    v408: Record<string, unknown>;
  },
  v408HttpArchive: Record<string, unknown>,
  archiveReferences: RuntimeExecutionPassEvidenceCloseoutArchiveReference[],
  closeout: RuntimeExecutionPassEvidenceCloseoutRecord,
): RuntimeExecutionPassEvidenceCloseoutChecks {
  return {
    v405SummaryPresent: evidenceFile("v405-summary-json", V405_SUMMARY).exists,
    v406SummaryPresent: evidenceFile("v406-summary-json", V406_SUMMARY).exists,
    v407SummaryPresent: evidenceFile("v407-summary-json", V407_SUMMARY).exists,
    v408SummaryPresent: archivePresent(archiveReferences, "v408-summary-json"),
    v408HttpArchivePresent: archivePresent(archiveReferences, "v408-http-json"),
    v408MarkdownArchivePresent: archivePresent(archiveReferences, "v408-http-markdown"),
    v408BrowserSnapshotPresent: archivePresent(archiveReferences, "v408-browser-snapshot"),
    v408ScreenshotPresent: archivePresent(archiveReferences, "v408-screenshot"),
    v408ExplanationPresent: archivePresent(archiveReferences, "v408-explanation"),
    v408WalkthroughPresent: archivePresent(archiveReferences, "v408-code-walkthrough"),
    chainVersionOrderValid:
      stringField(summaries.v405, "activeNodeVersion") === "Node v405"
      && stringField(summaries.v405, "sourceNodeVersion") === "Node v404"
      && stringField(summaries.v406, "activeNodeVersion") === "Node v406"
      && stringField(summaries.v406, "sourceNodeVersion") === "Node v405"
      && stringField(summaries.v407, "activeNodeVersion") === "Node v407"
      && stringField(summaries.v407, "sourceNodeVersion") === "Node v406"
      && stringField(summaries.v408, "activeNodeVersion") === "Node v408"
      && stringField(summaries.v408, "sourceNodeVersion") === "Node v407",
    v405CanonicalApprovalReady:
      stringField(summaries.v405, "validationState") ===
      "runtime-execution-canonical-approval-input-value-validation-ready"
      && booleanField(summaries.v405, "readyForRuntimeExecutionCanonicalApprovalInputValueValidation") === true,
    v405CanonicalApprovalHasConcreteInputs:
      numberField(summaries.v405, "presentTargetInputCount") === 3
      && numberField(summaries.v405, "validTargetInputCount") === 3
      && booleanField(summaries.v405, "sharedApprovalCorrelationIdValidated") === true
      && booleanField(summaries.v405, "concreteLoopbackPortsAssigned") === true,
    v405NoRuntimeExecutionOrServiceStart:
      booleanField(summaries.v405, "executionAttempted") === false
      && booleanField(summaries.v405, "startsJavaService") === false
      && booleanField(summaries.v405, "startsMiniKvService") === false
      && booleanField(summaries.v405, "executionAllowed") === false,
    v406LiveReadGateReady:
      booleanField(summaries.v406, "readyForRuntimeExecutionLiveReadGate") === true
      && booleanField(summaries.v406, "readyForApprovedLocalLoopbackReadOnlySmoke") === true,
    v406TargetsReady:
      numberField(summaries.v406, "targetCount") === 2
      && numberField(summaries.v406, "readyTargetCount") === 2,
    v406NoRuntimeExecutionOrServiceStart:
      booleanField(summaries.v406, "runtimeSmokeAttempted") === false
      && booleanField(summaries.v406, "startsJavaService") === false
      && booleanField(summaries.v406, "startsMiniKvService") === false
      && booleanField(summaries.v406, "executionAllowed") === false,
    v407ApprovedLoopbackSmokePassed:
      stringField(summaries.v407, "smokeState") === "approved-local-loopback-read-only-smoke-passed"
      && stringField(summaries.v407, "smokeDecision") === "accept-read-only-smoke-pass-evidence"
      && booleanField(summaries.v407, "readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke") === true,
    v407TargetsPassed:
      numberField(summaries.v407, "attemptedTargetCount") === 2
      && numberField(summaries.v407, "passedTargetCount") === 2
      && numberField(summaries.v407, "failedTargetCount") === 0
      && numberField(summaries.v407, "skippedTargetCount") === 0,
    v407CleanupProofPassed:
      booleanField(objectField(summaries.v407, "cleanupProof"), "cleanupPassed") === true
      && numberField(objectField(summaries.v407, "cleanupProof"), "afterListeningSocketCount") === 0,
    v407NoRouteOwnedServiceStartOrExecution:
      booleanField(summaries.v407, "startsJavaServiceFromRoute") === false
      && booleanField(summaries.v407, "startsMiniKvServiceFromRoute") === false
      && booleanField(summaries.v407, "executionAllowed") === false,
    v408ArchiveVerificationReady:
      stringField(summaries.v408, "verificationState") === "runtime-execution-pass-evidence-archive-verified"
      && booleanField(summaries.v408, "readyForRuntimeExecutionPassEvidenceArchiveVerification") === true
      && booleanField(v408HttpArchive, "readyForRuntimeExecutionPassEvidenceCloseout") === true,
    v408ArchiveReferencesComplete:
      numberField(summaries.v408, "archiveReferenceCount") === 7
      && numberField(summaries.v408, "presentArchiveReferenceCount") === 7
      && closeout.v408ArchiveReferenceCount === closeout.v408PresentArchiveReferenceCount,
    v408DoesNotRerunOrStartServices:
      booleanField(summaries.v408, "rerunsSmoke") === false
      && booleanField(summaries.v408, "startsJavaService") === false
      && booleanField(summaries.v408, "startsMiniKvService") === false,
    v408NoManagedAuditCredentialRawEndpointOrExecution:
      booleanField(v408HttpArchive, "connectsManagedAudit") === false
      && booleanField(v408HttpArchive, "credentialValueRead") === false
      && booleanField(v408HttpArchive, "rawEndpointUrlParsed") === false
      && booleanField(v408HttpArchive, "executionAllowed") === false,
    sourceChecksAllPassedAcrossChain: closeout.totalCheckCount > 0
      && closeout.totalCheckCount === closeout.totalPassedCheckCount,
    noProductionBlockersAcrossChain: closeout.totalProductionBlockerCount === 0,
    verificationResultsRecordedForV406ThroughV408:
      verificationRecorded(summaries.v406, 339, 1162)
      && verificationRecorded(summaries.v407, 340, 1164)
      && verificationRecorded(summaries.v408, 341, 1166),
    closeoutDigestStable: isDigest(closeout.closeoutDigest),
    readyForRuntimeExecutionPassEvidenceCloseout: false,
  };
}

function createSummary(
  archiveReferences: RuntimeExecutionPassEvidenceCloseoutArchiveReference[],
  closeout: RuntimeExecutionPassEvidenceCloseoutRecord,
  checks: RuntimeExecutionPassEvidenceCloseoutChecks,
  productionBlockers: RuntimeExecutionPassEvidenceCloseoutMessage[],
  warnings: RuntimeExecutionPassEvidenceCloseoutMessage[],
  recommendations: RuntimeExecutionPassEvidenceCloseoutMessage[],
): RuntimeExecutionPassEvidenceCloseoutSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceSummaryCount: closeout.sourceSummaryCount,
    archiveReferenceCount: archiveReferences.length,
    presentArchiveReferenceCount: archiveReferences.filter((reference) => reference.present).length,
    readyStageCount: closeout.readyStageCount,
    totalSourceCheckCount: closeout.totalCheckCount,
    totalSourcePassedCheckCount: closeout.totalPassedCheckCount,
    totalSourceProductionBlockerCount: closeout.totalProductionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionPassEvidenceCloseoutChecks,
): RuntimeExecutionPassEvidenceCloseoutMessage[] {
  return Object.entries(checks)
    .filter(([key, value]) => key !== "readyForRuntimeExecutionPassEvidenceCloseout" && !value)
    .map(([key]) => ({
      code: `PASS_EVIDENCE_CLOSEOUT_CHECK_FAILED_${key}`,
      severity: "blocker" as const,
      source: "node-v409",
      message: `Runtime execution pass evidence closeout check failed: ${key}.`,
    }));
}

function collectWarnings(): RuntimeExecutionPassEvidenceCloseoutMessage[] {
  return [
    {
      code: "CLOSEOUT_DOES_NOT_RERUN_SMOKE",
      severity: "warning",
      source: "node-v409",
      message: "v409 closes the v405-v408 evidence chain from archives; it does not rerun Java or mini-kv smoke.",
    },
  ];
}

function collectRecommendations(ready: boolean): RuntimeExecutionPassEvidenceCloseoutMessage[] {
  return [
    {
      code: ready ? "CHAIN_CLOSED_RECOMMEND_PARALLEL_UPSTREAM_PROGRESS" : "REPAIR_CHAIN_BEFORE_HANDOFF",
      severity: "recommendation",
      source: "node-v409",
      message: ready
        ? "Use the v409 closeout ledger for handoff while Java and mini-kv continue in parallel."
        : "Repair the v405-v408 chain evidence before handoff.",
    },
  ];
}

function archivePresent(
  references: RuntimeExecutionPassEvidenceCloseoutArchiveReference[],
  id: string,
): boolean {
  return references.some((reference) => reference.id === id && reference.present);
}

function verificationRecorded(summary: Record<string, unknown>, fullVitestFiles: number, fullVitestTests: number): boolean {
  const verification = objectField(summary, "verification");
  return booleanField(verification, "typecheckPassed") === true
    && booleanField(verification, "buildPassed") === true
    && booleanField(verification, "playwrightMcpScreenshotGenerated") === true
    && numberField(verification, "fullVitestFiles") === fullVitestFiles
    && numberField(verification, "fullVitestTests") === fullVitestTests;
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
