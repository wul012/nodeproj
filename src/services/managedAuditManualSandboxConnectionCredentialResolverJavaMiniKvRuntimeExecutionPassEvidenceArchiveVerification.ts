import type { AppConfig } from "../config.js";
import {
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationProfile,
  RuntimeExecutionPassEvidenceArchiveReference,
  RuntimeExecutionPassEvidenceArchiveVerificationChecks,
  RuntimeExecutionPassEvidenceArchiveVerificationMessage,
  RuntimeExecutionPassEvidenceArchiveVerificationRecord,
  RuntimeExecutionPassEvidenceArchiveVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-archive-verification";
const SOURCE_NODE_V407_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke";
const ACTIVE_PLAN =
  "docs/plans3/v408-post-java-mini-kv-runtime-execution-pass-evidence-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v409-post-java-mini-kv-runtime-execution-pass-evidence-closeout-roadmap.md";

const HTTP_ARCHIVE =
  "e/407/evidence/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407-http.json";
const SUMMARY_ARCHIVE =
  "e/407/evidence/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407-summary.json";
const CLEANUP_PROOF =
  "e/407/evidence/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407-cleanup-proof.json";
const BROWSER_SNAPSHOT =
  "e/407/evidence/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407-browser-snapshot.md";
const SCREENSHOT =
  "e/407/图片/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407.png";
const EXPLANATION =
  "e/407/解释/java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407.md";
const WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/412-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-v407.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationProfile {
  void input.config;
  void input.archiveRoot;
  const archiveReferences = createArchiveReferences();
  const httpArchive = readJsonObject(HTTP_ARCHIVE);
  const summaryArchive = readJsonObject(SUMMARY_ARCHIVE);
  const cleanupProof = readJsonObject(CLEANUP_PROOF);
  const archiveVerification = createArchiveVerification(httpArchive, summaryArchive, cleanupProof);
  const checks = createChecks(archiveReferences, httpArchive, summaryArchive, cleanupProof, archiveVerification);
  checks.readyForRuntimeExecutionPassEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionPassEvidenceArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRuntimeExecutionPassEvidenceArchiveVerification;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(archiveReferences, archiveVerification, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution pass evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState: ready ? "runtime-execution-pass-evidence-archive-verified" : "blocked",
    verificationDecision: ready ? "accept-v407-pass-evidence-and-cleanup-proof-archive" : "blocked",
    readyForRuntimeExecutionPassEvidenceArchiveVerification: ready,
    readyForRuntimeExecutionPassEvidenceCloseout: ready,
    activeNodeVersion: "Node v408",
    sourceNodeVersion: "Node v407",
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
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
    archiveReferences,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      passEvidenceArchiveVerificationJson: ROUTE_PATH,
      passEvidenceArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV407Json: SOURCE_NODE_V407_ROUTE,
      sourceNodeV407Markdown: `${SOURCE_NODE_V407_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v409",
    },
    nextActions: ready
      ? [
        "Use Node v408 as the archive verification for v407 pass evidence and cleanup proof.",
        "Proceed to Node v409 closeout without rerunning Java or mini-kv smoke unless a concrete archive mismatch appears.",
        "Keep managed audit, credentials, writes, raw endpoint parsing, and active shard routing closed.",
      ]
      : [
        "Repair the v407 pass evidence archive or cleanup proof before closeout.",
        "Do not rerun Java or mini-kv smoke from v408.",
      ],
  };
}

function createArchiveReferences(): RuntimeExecutionPassEvidenceArchiveReference[] {
  return [
    archiveReference("v407-http-json", HTTP_ARCHIVE),
    archiveReference("v407-summary-json", SUMMARY_ARCHIVE),
    archiveReference("v407-cleanup-proof-json", CLEANUP_PROOF),
    archiveReference("v407-browser-snapshot", BROWSER_SNAPSHOT),
    archiveReference("v407-screenshot", SCREENSHOT),
    archiveReference("v407-explanation", EXPLANATION),
    archiveReference("v407-code-walkthrough", WALKTHROUGH),
  ];
}

function archiveReference(id: string, path: string): RuntimeExecutionPassEvidenceArchiveReference {
  const file = evidenceFile(id, path);
  return {
    id,
    file,
    present: file.exists && file.sizeBytes > 0,
  };
}

function createArchiveVerification(
  httpArchive: Record<string, unknown>,
  summaryArchive: Record<string, unknown>,
  cleanupProof: Record<string, unknown>,
): RuntimeExecutionPassEvidenceArchiveVerificationRecord {
  const source = {
    verificationMode: "runtime-execution-pass-evidence-archive-verification" as const,
    sourceSpan: "Node v407 HTTP pass evidence + cleanup proof archive" as const,
    archiveProfileVersion: stringField(httpArchive, "profileVersion"),
    activeNodeVersion: stringField(httpArchive, "activeNodeVersion"),
    sourceNodeVersion: stringField(httpArchive, "sourceNodeVersion"),
    smokeState: stringField(httpArchive, "smokeState"),
    smokeDecision: stringField(httpArchive, "smokeDecision"),
    readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke:
      booleanValue(httpArchive.readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke),
    checkCount: nestedNumber(httpArchive, "summary", "checkCount"),
    passedCheckCount: nestedNumber(httpArchive, "summary", "passedCheckCount"),
    productionBlockerCount: nestedNumber(httpArchive, "summary", "productionBlockerCount"),
    attemptedTargetCount: nestedNumber(httpArchive, "summary", "attemptedTargetCount"),
    passedTargetCount: nestedNumber(httpArchive, "summary", "passedTargetCount"),
    failedTargetCount: nestedNumber(httpArchive, "summary", "failedTargetCount"),
    skippedTargetCount: nestedNumber(httpArchive, "summary", "skippedTargetCount"),
    cleanupPassed: booleanValue(cleanupProof.cleanupPassed),
    afterListeningSocketCount: objectArrayField(cleanupProof, "afterListeningPorts").length,
    fullVitestFiles: nestedNumber(summaryArchive, "verification", "fullVitestFiles"),
    fullVitestTests: nestedNumber(summaryArchive, "verification", "fullVitestTests"),
    nextNodeVersionSuggested: "Node v409" as const,
  };
  return {
    verificationDigest: sha256StableJson(source),
    ...source,
  };
}

function createChecks(
  archiveReferences: RuntimeExecutionPassEvidenceArchiveReference[],
  httpArchive: Record<string, unknown>,
  summaryArchive: Record<string, unknown>,
  cleanupProof: Record<string, unknown>,
  archiveVerification: RuntimeExecutionPassEvidenceArchiveVerificationRecord,
): RuntimeExecutionPassEvidenceArchiveVerificationChecks {
  const sourceNodeV406 = objectField(httpArchive, "sourceNodeV406");
  const records = objectArrayField(httpArchive, "records");
  return {
    httpArchivePresent: archivePresent(archiveReferences, "v407-http-json"),
    summaryArchivePresent: archivePresent(archiveReferences, "v407-summary-json"),
    cleanupProofPresent: archivePresent(archiveReferences, "v407-cleanup-proof-json"),
    browserSnapshotPresent: archivePresent(archiveReferences, "v407-browser-snapshot"),
    screenshotPresent: archivePresent(archiveReferences, "v407-screenshot"),
    explanationPresent: archivePresent(archiveReferences, "v407-explanation"),
    walkthroughPresent: archivePresent(archiveReferences, "v407-code-walkthrough"),
    v407ProfileVersionValid:
      archiveVerification.archiveProfileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke.v1",
    v407ActiveVersionValid: archiveVerification.activeNodeVersion === "Node v407",
    v407SourceVersionValid: archiveVerification.sourceNodeVersion === "Node v406",
    v407SmokePassed:
      archiveVerification.smokeState === "approved-local-loopback-read-only-smoke-passed"
      && archiveVerification.smokeDecision === "accept-read-only-smoke-pass-evidence",
    v407ReadyForPassArchive: archiveVerification.readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke,
    v407ChecksAllPassed:
      archiveVerification.checkCount > 0
      && archiveVerification.checkCount === archiveVerification.passedCheckCount,
    v407ProductionBlockersClear: archiveVerification.productionBlockerCount === 0,
    v407TargetsAllPassed:
      archiveVerification.attemptedTargetCount === 2
      && archiveVerification.passedTargetCount === 2,
    v407NoSkippedOrFailedTargets:
      archiveVerification.failedTargetCount === 0
      && archiveVerification.skippedTargetCount === 0,
    v407RouteDidNotStartServices:
      booleanValue(httpArchive.startsJavaServiceFromRoute) === false
      && booleanValue(httpArchive.startsMiniKvServiceFromRoute) === false
      && booleanValue(httpArchive.stopsJavaServiceFromRoute) === false
      && booleanValue(httpArchive.stopsMiniKvServiceFromRoute) === false,
    v407NoManagedAuditCredentialRawEndpointOrWrites:
      booleanValue(httpArchive.connectsManagedAudit) === false
      && booleanValue(httpArchive.credentialValueRead) === false
      && booleanValue(httpArchive.rawEndpointUrlParsed) === false
      && booleanValue(httpArchive.executionAllowed) === false,
    sourceNodeV406ReadyInArchive:
      booleanValue(sourceNodeV406.readyForRuntimeExecutionLiveReadGate)
      && booleanValue(sourceNodeV406.readyForApprovedLocalLoopbackReadOnlySmoke)
      && numberField(sourceNodeV406, "checkCount") === numberField(sourceNodeV406, "passedCheckCount"),
    summaryMatchesHttpArchive:
      numberField(summaryArchive, "checkCount") === archiveVerification.checkCount
      && numberField(summaryArchive, "passedCheckCount") === archiveVerification.passedCheckCount
      && numberField(summaryArchive, "productionBlockerCount") === archiveVerification.productionBlockerCount,
    cleanupProofPassed: archiveVerification.cleanupPassed,
    cleanupProofNoListeningSockets: archiveVerification.afterListeningSocketCount === 0,
    cleanupProofPortsCovered: includesAllNumbers(numberArrayField(cleanupProof, "checkedPorts"), [8080, 6424, 4407, 8407]),
    verificationResultsRecorded:
      objectField(summaryArchive, "verification").typecheckPassed === true
      && objectField(summaryArchive, "verification").buildPassed === true,
    fullVitestRecorded:
      archiveVerification.fullVitestFiles === 340
      && archiveVerification.fullVitestTests === 1164,
    typecheckAndBuildRecorded:
      objectField(summaryArchive, "verification").typecheckPassed === true
      && objectField(summaryArchive, "verification").buildPassed === true,
    verificationDigestStable: isDigest(archiveVerification.verificationDigest),
    readyForRuntimeExecutionPassEvidenceArchiveVerification: false,
  };
}

function createSummary(
  archiveReferences: RuntimeExecutionPassEvidenceArchiveReference[],
  archiveVerification: RuntimeExecutionPassEvidenceArchiveVerificationRecord,
  checks: RuntimeExecutionPassEvidenceArchiveVerificationChecks,
  productionBlockers: RuntimeExecutionPassEvidenceArchiveVerificationMessage[],
  warnings: RuntimeExecutionPassEvidenceArchiveVerificationMessage[],
  recommendations: RuntimeExecutionPassEvidenceArchiveVerificationMessage[],
): RuntimeExecutionPassEvidenceArchiveVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveReferenceCount: archiveReferences.length,
    presentArchiveReferenceCount: archiveReferences.filter((reference) => reference.present).length,
    sourceCheckCount: archiveVerification.checkCount,
    sourcePassedCheckCount: archiveVerification.passedCheckCount,
    sourceProductionBlockerCount: archiveVerification.productionBlockerCount,
    cleanupPassed: archiveVerification.cleanupPassed,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionPassEvidenceArchiveVerificationChecks,
): RuntimeExecutionPassEvidenceArchiveVerificationMessage[] {
  return Object.entries(checks)
    .filter(([key, value]) => key !== "readyForRuntimeExecutionPassEvidenceArchiveVerification" && !value)
    .map(([key]) => ({
      code: `PASS_EVIDENCE_ARCHIVE_CHECK_FAILED_${key}`,
      severity: "blocker" as const,
      source: "node-v408",
      message: `v407 pass evidence archive verification check failed: ${key}.`,
    }));
}

function collectWarnings(): RuntimeExecutionPassEvidenceArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_DOES_NOT_RERUN_SMOKE",
      severity: "warning",
      source: "node-v408",
      message: "v408 verifies archived v407 pass evidence and cleanup proof; it does not rerun Java or mini-kv smoke.",
    },
  ];
}

function collectRecommendations(ready: boolean): RuntimeExecutionPassEvidenceArchiveVerificationMessage[] {
  return [
    {
      code: ready ? "PROCEED_TO_PASS_EVIDENCE_CLOSEOUT" : "REPAIR_V407_ARCHIVE_BEFORE_CLOSEOUT",
      severity: "recommendation",
      source: "node-v408",
      message: ready
        ? "Proceed to Node v409 closeout without broadening runtime probes."
        : "Repair the v407 archive or cleanup proof before closeout.",
    },
  ];
}

function archivePresent(
  references: RuntimeExecutionPassEvidenceArchiveReference[],
  id: string,
): boolean {
  return references.some((reference) => reference.id === id && reference.present);
}

function nestedNumber(input: Record<string, unknown>, objectKey: string, fieldKey: string): number {
  return numberField(objectField(input, objectKey), fieldKey) ?? 0;
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function numberArrayField(input: Record<string, unknown>, key: string): number[] {
  const value = input[key];
  return Array.isArray(value) ? value.filter((item): item is number => typeof item === "number") : [];
}

function includesAllNumbers(values: readonly number[], expected: readonly number[]): boolean {
  return expected.every((value) => values.includes(value));
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
