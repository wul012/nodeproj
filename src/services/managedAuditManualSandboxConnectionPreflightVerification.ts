import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  evidenceById as fileById,
  evidenceFile,
  readEvidenceJson,
  snippet,
  snippetMatched,
  type ManualConnectionEvidenceFile,
  type ManualConnectionSnippetMatch,
} from "./manualConnectionSources.js";
import { mapPreflightGuard } from "./manualConnectionReceiptMaps.js";
import {
  addManualBlocker as addBlocker,
  preflightAdvisories,
  type ManualConnectionMessage,
} from "./manualConnectionAdvisories.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightGate,
  type ManagedAuditManualSandboxConnectionPreflightGateProfile,
} from "./managedAuditManualSandboxConnectionPreflightGate.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export {
  renderPreflightVerification as renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown,
} from "./verificationReports/manualConnection.js";

export interface ManagedAuditManualSandboxConnectionPreflightVerificationProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1";
  verificationState: "manual-sandbox-connection-preflight-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPreflightVerification: boolean;
  readOnlyVerification: true;
  sourceNodeV230: {
    sourceVersion: "Node v230";
    profileVersion: ManagedAuditManualSandboxConnectionPreflightGateProfile["profileVersion"];
    gateState: ManagedAuditManualSandboxConnectionPreflightGateProfile["gateState"];
    gateDigest: string;
    sourceVerificationDigest: string;
    sourcePacketDigest: string;
    readyForPreflightGate: boolean;
    readyForConnectionFromSource: false;
    manualWindowFlagName: string;
    manualWindowOpenByDefault: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    preflightFieldCount: number;
    requiredPreflightFieldCount: number;
  };
  upstreamMarkers: {
    javaV88: JavaV88PreflightEchoMarkerReference;
    miniKvV97: MiniKvV97NoStartGuardReference;
  };
  evidenceFiles: PreflightVerificationEvidenceFile[];
  snippetMatches: PreflightVerificationSnippetMatch[];
  preflightVerification: {
    verificationDigest: string;
    sourcePreflightGateDigest: string;
    markerSpan: "Node v230 + Java v88 + mini-kv v97";
    verificationMode: "manual-sandbox-connection-preflight-verification-only";
    javaPreflightEchoAccepted: boolean;
    miniKvNoStartGuardAccepted: boolean;
    preflightFieldsAligned: boolean;
    manualWindowClosedByAllSources: boolean;
    connectionExecutionAllowed: false;
    credentialValueReadAllowed: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    automaticServiceStartAllowed: false;
    nodeV231BlocksRealConnection: true;
  };
  checks: ManualSandboxPreflightVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxPreflightVerificationMessage[];
  warnings: ManualSandboxPreflightVerificationMessage[];
  recommendations: ManualSandboxPreflightVerificationMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionPreflightVerificationJson: string;
    manualSandboxConnectionPreflightVerificationMarkdown: string;
    sourceNodeV230Json: string;
    javaV88Runbook: string;
    miniKvV97Runbook: string;
    miniKvRuntimeSmokeEvidence: string;
    miniKvVerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV88PreflightEchoMarkerReference {
  sourceVersion: "Java v88";
  headTag: "v88订单平台release-approval-sandbox-connection-preflight-echo-marker";
  runbookPath: string;
  walkthroughPath: string;
  evidencePresent: boolean;
  markerFieldPresent: boolean;
  readyFieldDocumented: boolean;
  readyForNodeV231PreflightVerification: boolean;
  preflightFieldsDocumented: boolean;
  manualWindowFlagDocumented: boolean;
  manualWindowClosedByDefault: boolean;
  credentialHandleNameEchoed: boolean;
  credentialValueReadByJava: boolean;
  schemaMigrationSqlExecutedByJava: boolean;
  approvalLedgerWrittenByJava: boolean;
  managedAuditConnectionOpenedByJava: boolean;
  autoStartForbidden: boolean;
  nodeV231MayConsume: boolean;
}

interface MiniKvV97NoStartGuardReference {
  sourceVersion: "mini-kv v97";
  headTag: "第九十七版沙箱连接不自启守卫回执";
  runbookPath: string;
  walkthroughPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  projectVersion: string;
  releaseVersion: string;
  consumer: string;
  consumedReleaseVersion: string;
  consumedMarkerDigest: string;
  receiptDigest: string;
  manualWindowFlagName: string;
  manualWindowMode: string;
  timeoutBudgetMs: number;
  readOnly: boolean;
  executionAllowed: boolean;
  manualWindowOpenByDefault: boolean;
  connectionExecutionAllowed: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  credentialValueReadAllowed: boolean;
  schemaRehearsalExecutionAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  managedAuditWriteAllowed: boolean;
  participatesInSandboxConnection: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  readyForNodeV231PreflightVerification: boolean;
}

type PreflightVerificationEvidenceFile = ManualConnectionEvidenceFile;
type PreflightVerificationSnippetMatch = ManualConnectionSnippetMatch;

type ManualSandboxPreflightVerificationChecks = {
  sourceNodeV230PreflightGateReady: boolean;
  sourceNodeV230StillConnectionBlocked: boolean;
  sourceNodeV230GateDigestPresent: boolean;
  javaV88EvidencePresent: boolean;
  javaV88PreflightEchoAccepted: boolean;
  javaV88NoWriteNoSqlNoCredentialBoundaryAccepted: boolean;
  miniKvV97EvidencePresent: boolean;
  miniKvV97NoStartGuardAccepted: boolean;
  miniKvV97BoundaryAccepted: boolean;
  preflightFieldsAlignedAcrossSources: boolean;
  manualWindowClosedAcrossSources: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPreflightVerification: boolean;
};

type ManualSandboxPreflightVerificationMessage = ManualConnectionMessage;

interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  managed_audit_sandbox_connection_no_start_guard_receipt?: Record<string, unknown>;
}

const JAVA_V88_RUNBOOK = "D:/javaproj/advanced-order-platform/c/88/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V88_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/91-version-88-release-approval-sandbox-connection-preflight-echo-marker.md";
const MINI_KV_V97_RUNBOOK = "D:/C/mini-kv/c/97/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V97_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/153-version-97-sandbox-connection-no-start-guard.md";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionPreflightVerificationJson: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification",
  manualSandboxConnectionPreflightVerificationMarkdown: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification?format=markdown",
  sourceNodeV230Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate",
  javaV88Runbook: JAVA_V88_RUNBOOK,
  miniKvV97Runbook: MINI_KV_V97_RUNBOOK,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v229-post-packet-verification-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;
const FNV1A64 = /^fnv1a64:[a-f0-9]{16}$/;
const MINI_KV_CURRENT_RELEASES_WITH_V97_GUARD = Object.freeze(["v98", "v99", "v100", "v101", "v102"]);
const MINI_KV_V97_NO_START_GUARD_RECEIPT_DIGESTS = Object.freeze([
  "fnv1a64:431780d3772a52a5",
  "fnv1a64:1f09161efd809c33",
  "fnv1a64:5530a3cc527cd8eb",
  "fnv1a64:f5c9fa97c073ba43",
  "fnv1a64:69e377d01f15fd57",
]);

export function loadManagedAuditManualSandboxConnectionPreflightVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPreflightVerificationProfile {
  const sourceGate = loadManagedAuditManualSandboxConnectionPreflightGate({ config: input.config });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const miniKvEvidence = readEvidenceJson<MiniKvRuntimeSmokeEvidence>(MINI_KV_RUNTIME_SMOKE);
  const javaV88 = createJavaV88Reference(evidenceFiles, snippetMatches);
  const miniKvV97 = createMiniKvV97Reference(evidenceFiles, snippetMatches, miniKvEvidence);
  const preflightVerification = createPreflightVerification(sourceGate, javaV88, miniKvV97);
  const checks = createChecks(input.config, sourceGate, javaV88, miniKvV97, preflightVerification);
  checks.readyForManagedAuditManualSandboxConnectionPreflightVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPreflightVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionPreflightVerification
    ? "manual-sandbox-connection-preflight-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const { warnings, recommendations } = preflightAdvisories();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection preflight verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionPreflightVerification: checks.readyForManagedAuditManualSandboxConnectionPreflightVerification,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyVerification: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV230: {
      sourceVersion: "Node v230",
      profileVersion: sourceGate.profileVersion,
      gateState: sourceGate.gateState,
      gateDigest: sourceGate.preflightGate.gateDigest,
      sourceVerificationDigest: sourceGate.preflightGate.sourceVerificationDigest,
      sourcePacketDigest: sourceGate.preflightGate.sourcePacketDigest,
      readyForPreflightGate: sourceGate.readyForManagedAuditManualSandboxConnectionPreflightGate,
      readyForConnectionFromSource: sourceGate.readyForManagedAuditSandboxAdapterConnection,
      manualWindowFlagName: sourceGate.preflightGate.manualWindowFlagName,
      manualWindowOpenByDefault: sourceGate.preflightGate.manualWindowOpenByDefault,
      connectsManagedAudit: sourceGate.connectsManagedAudit,
      readsManagedAuditCredential: sourceGate.readsManagedAuditCredential,
      schemaMigrationExecuted: sourceGate.schemaMigrationExecuted,
      preflightFieldCount: sourceGate.summary.preflightFieldCount,
      requiredPreflightFieldCount: sourceGate.summary.requiredPreflightFieldCount,
    },
    upstreamMarkers: {
      javaV88,
      miniKvV97,
    },
    evidenceFiles,
    snippetMatches,
    preflightVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: evidenceFiles.length,
      matchedSnippetCount: snippetMatches.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive Node v231 as preflight verification only; do not open a sandbox managed audit connection from this profile.",
      "Start a post-v231 plan before any manual sandbox connection rehearsal runbook or adapter connection attempt.",
      "Keep Java v88 and mini-kv v97 markers read-only; they are evidence inputs, not execution approval.",
    ],
  };
}

function createJavaV88Reference(
  evidenceFiles: PreflightVerificationEvidenceFile[],
  snippets: PreflightVerificationSnippetMatch[],
): JavaV88PreflightEchoMarkerReference {
  const reference: JavaV88PreflightEchoMarkerReference = {
    sourceVersion: "Java v88",
    headTag: "v88订单平台release-approval-sandbox-connection-preflight-echo-marker",
    runbookPath: JAVA_V88_RUNBOOK,
    walkthroughPath: JAVA_V88_WALKTHROUGH,
    evidencePresent: fileById(evidenceFiles, "java-v88-runbook").exists
      && fileById(evidenceFiles, "java-v88-walkthrough").exists,
    markerFieldPresent: snippetMatched(snippets, "java-v88-marker-field"),
    readyFieldDocumented: snippetMatched(snippets, "java-v88-ready-field"),
    readyForNodeV231PreflightVerification: snippetMatched(snippets, "java-v88-ready-true"),
    preflightFieldsDocumented: snippetMatched(snippets, "java-v88-preflight-fields"),
    manualWindowFlagDocumented: snippetMatched(snippets, "java-v88-manual-window-flag"),
    manualWindowClosedByDefault: snippetMatched(snippets, "java-v88-window-closed"),
    credentialHandleNameEchoed: snippetMatched(snippets, "java-v88-credential-handle"),
    credentialValueReadByJava: !snippetMatched(snippets, "java-v88-no-credential"),
    schemaMigrationSqlExecutedByJava: !snippetMatched(snippets, "java-v88-no-sql"),
    approvalLedgerWrittenByJava: !snippetMatched(snippets, "java-v88-no-ledger"),
    managedAuditConnectionOpenedByJava: !snippetMatched(snippets, "java-v88-no-connection"),
    autoStartForbidden: snippetMatched(snippets, "java-v88-no-auto-start"),
    nodeV231MayConsume: snippetMatched(snippets, "java-v88-ready-true"),
  };
  return reference;
}

function createMiniKvV97Reference(
  evidenceFiles: PreflightVerificationEvidenceFile[],
  snippets: PreflightVerificationSnippetMatch[],
  evidence: MiniKvRuntimeSmokeEvidence,
): MiniKvV97NoStartGuardReference {
  const guard = evidence.managed_audit_sandbox_connection_no_start_guard_receipt ?? {};
  const reference: MiniKvV97NoStartGuardReference = {
    sourceVersion: "mini-kv v97",
    headTag: "第九十七版沙箱连接不自启守卫回执",
    runbookPath: MINI_KV_V97_RUNBOOK,
    walkthroughPath: MINI_KV_V97_WALKTHROUGH,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v97-runbook").exists
      && fileById(evidenceFiles, "mini-kv-v97-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-verification-manifest").exists,
    ...mapPreflightGuard(evidence, guard),
    readyForNodeV231PreflightVerification: false,
  };
  return {
    ...reference,
    readyForNodeV231PreflightVerification: preflightGuardReady(reference, snippets),
  };
}

const PREFLIGHT_GUARD_CONSUMERS = Object.freeze([
  "Node v231 manual sandbox connection preflight verification",
  "Node v233 manual sandbox connection rehearsal packet review",
  "Node v234 manual sandbox connection blocked execution rehearsal",
  "Node v235 manual sandbox connection precondition intake",
  "Node v237 manual sandbox connection readiness gate",
]);

function preflightGuardReady(
  reference: MiniKvV97NoStartGuardReference,
  snippets: PreflightVerificationSnippetMatch[],
): boolean {
  return [
    preflightGuardIdentityAccepted(reference),
    preflightGuardBoundaryAccepted(reference),
    snippetMatched(snippets, "mini-kv-v97-no-start-guard"),
  ].every(Boolean);
}

function preflightGuardIdentityAccepted(reference: MiniKvV97NoStartGuardReference): boolean {
  return [
    reference.evidencePresent,
    /^0\.(?:98|99|100|101|102)\.0$/.test(reference.projectVersion),
    MINI_KV_CURRENT_RELEASES_WITH_V97_GUARD.includes(reference.releaseVersion),
    PREFLIGHT_GUARD_CONSUMERS.includes(reference.consumer),
    reference.consumedReleaseVersion === "v96",
    reference.consumedMarkerDigest === "fnv1a64:b9fc556875ea625b",
    MINI_KV_V97_NO_START_GUARD_RECEIPT_DIGESTS.includes(reference.receiptDigest),
    reference.manualWindowFlagName === "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED",
    reference.manualWindowMode === "manual-window-required-no-auto-start",
    reference.timeoutBudgetMs === 15000,
    FNV1A64.test(reference.receiptDigest),
  ].every(Boolean);
}

function preflightGuardBoundaryAccepted(reference: MiniKvV97NoStartGuardReference): boolean {
  return [
    reference.readOnly,
    !reference.executionAllowed,
    !reference.manualWindowOpenByDefault,
    !reference.connectionExecutionAllowed,
    !reference.nodeAutoStartAllowed,
    !reference.javaAutoStartAllowed,
    !reference.miniKvAutoStartAllowed,
    !reference.credentialValueReadAllowed,
    !reference.schemaRehearsalExecutionAllowed,
    !reference.schemaMigrationExecutionAllowed,
    !reference.managedAuditWriteAllowed,
    !reference.participatesInSandboxConnection,
    !reference.restoreExecutionAllowed,
    !reference.orderAuthoritative,
  ].every(Boolean);
}

function createPreflightVerification(
  sourceGate: ManagedAuditManualSandboxConnectionPreflightGateProfile,
  javaV88: JavaV88PreflightEchoMarkerReference,
  miniKvV97: MiniKvV97NoStartGuardReference,
): ManagedAuditManualSandboxConnectionPreflightVerificationProfile["preflightVerification"] {
  const preflightFieldsAligned = [
    javaV88.preflightFieldsDocumented,
    javaV88.manualWindowFlagDocumented,
    javaV88.credentialHandleNameEchoed,
    miniKvV97.manualWindowFlagName === sourceGate.preflightGate.manualWindowFlagName,
    miniKvV97.timeoutBudgetMs === sourceGate.preflightGate.timeoutBudgetMs,
    miniKvV97.consumedMarkerDigest === "fnv1a64:b9fc556875ea625b",
  ].every(Boolean);
  const manualWindowClosedByAllSources = [
    !sourceGate.preflightGate.manualWindowOpenByDefault,
    javaV88.manualWindowClosedByDefault,
    !miniKvV97.manualWindowOpenByDefault,
  ].every(Boolean);

  return {
    verificationDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1",
      sourcePreflightGateDigest: sourceGate.preflightGate.gateDigest,
      javaV88,
      miniKvV97,
      preflightFieldsAligned,
      manualWindowClosedByAllSources,
    }),
    sourcePreflightGateDigest: sourceGate.preflightGate.gateDigest,
    markerSpan: "Node v230 + Java v88 + mini-kv v97",
    verificationMode: "manual-sandbox-connection-preflight-verification-only",
    javaPreflightEchoAccepted: javaPreflightAccepted(javaV88),
    miniKvNoStartGuardAccepted: miniKvV97.readyForNodeV231PreflightVerification,
    preflightFieldsAligned,
    manualWindowClosedByAllSources,
    connectionExecutionAllowed: false,
    credentialValueReadAllowed: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    automaticServiceStartAllowed: false,
    nodeV231BlocksRealConnection: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceGate: ManagedAuditManualSandboxConnectionPreflightGateProfile,
  javaV88: JavaV88PreflightEchoMarkerReference,
  miniKvV97: MiniKvV97NoStartGuardReference,
  verification: ManagedAuditManualSandboxConnectionPreflightVerificationProfile["preflightVerification"],
): ManualSandboxPreflightVerificationChecks {
  return {
    sourceNodeV230PreflightGateReady: sourcePreflightReady(sourceGate),
    sourceNodeV230StillConnectionBlocked: sourcePreflightClosed(sourceGate),
    sourceNodeV230GateDigestPresent: sourcePreflightDigestsPresent(sourceGate),
    javaV88EvidencePresent: javaV88.evidencePresent,
    javaV88PreflightEchoAccepted: verification.javaPreflightEchoAccepted,
    javaV88NoWriteNoSqlNoCredentialBoundaryAccepted: javaPreflightBoundaryAccepted(javaV88),
    miniKvV97EvidencePresent: miniKvV97.evidencePresent,
    miniKvV97NoStartGuardAccepted: verification.miniKvNoStartGuardAccepted,
    miniKvV97BoundaryAccepted: preflightGuardBoundaryAccepted(miniKvV97),
    preflightFieldsAlignedAcrossSources: verification.preflightFieldsAligned,
    manualWindowClosedAcrossSources: verification.manualWindowClosedByAllSources,
    credentialValueStillForbidden: !verification.credentialValueReadAllowed,
    schemaMigrationStillBlocked: !verification.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !verification.connectionExecutionAllowed,
    managedAuditWritesStillBlocked: !verification.managedAuditWriteAllowed,
    automaticServiceStartStillBlocked: !verification.automaticServiceStartAllowed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPreflightVerification: false,
  };
}

function javaPreflightAccepted(reference: JavaV88PreflightEchoMarkerReference): boolean {
  return [
    reference.evidencePresent,
    reference.markerFieldPresent,
    reference.readyFieldDocumented,
    reference.readyForNodeV231PreflightVerification,
    reference.nodeV231MayConsume,
    javaPreflightBoundaryAccepted(reference),
  ].every(Boolean);
}

function javaPreflightBoundaryAccepted(reference: JavaV88PreflightEchoMarkerReference): boolean {
  return [
    !reference.credentialValueReadByJava,
    !reference.schemaMigrationSqlExecutedByJava,
    !reference.approvalLedgerWrittenByJava,
    !reference.managedAuditConnectionOpenedByJava,
    reference.autoStartForbidden,
  ].every(Boolean);
}

function sourcePreflightReady(source: ManagedAuditManualSandboxConnectionPreflightGateProfile): boolean {
  return [
    source.readyForManagedAuditManualSandboxConnectionPreflightGate,
    source.gateState === "manual-sandbox-connection-preflight-gate-ready",
  ].every(Boolean);
}

function sourcePreflightClosed(source: ManagedAuditManualSandboxConnectionPreflightGateProfile): boolean {
  return [
    !source.readyForManagedAuditSandboxAdapterConnection,
    !source.connectsManagedAudit,
    !source.readsManagedAuditCredential,
    !source.schemaMigrationExecuted,
  ].every(Boolean);
}

function sourcePreflightDigestsPresent(
  source: ManagedAuditManualSandboxConnectionPreflightGateProfile,
): boolean {
  return [
    SHA256_HEX.test(source.preflightGate.gateDigest),
    SHA256_HEX.test(source.preflightGate.sourceVerificationDigest),
    SHA256_HEX.test(source.preflightGate.sourcePacketDigest),
  ].every(Boolean);
}

function createEvidenceFiles(): PreflightVerificationEvidenceFile[] {
  return [
    evidenceFile("java-v88-runbook", JAVA_V88_RUNBOOK),
    evidenceFile("java-v88-walkthrough", JAVA_V88_WALKTHROUGH),
    evidenceFile("mini-kv-v97-runbook", MINI_KV_V97_RUNBOOK),
    evidenceFile("mini-kv-v97-walkthrough", MINI_KV_V97_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): PreflightVerificationSnippetMatch[] {
  return [
    snippet("java-v88-marker-field", JAVA_V88_WALKTHROUGH, "managedAuditSandboxConnectionPreflightEchoMarker"),
    snippet("java-v88-ready-field", JAVA_V88_RUNBOOK, "readyForNodeV231ManualSandboxConnectionPreflightVerification"),
    snippet("java-v88-ready-true", JAVA_V88_RUNBOOK, "readyForNodeV231ManualSandboxConnectionPreflightVerification=true"),
    snippet("java-v88-node-v231-consume", JAVA_V88_WALKTHROUGH, "nodeV231MayConsume"),
    snippet("java-v88-preflight-fields", JAVA_V88_RUNBOOK, "Node v230 的 7 个预检字段"),
    snippet("java-v88-manual-window-flag", JAVA_V88_RUNBOOK, "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED"),
    snippet("java-v88-window-closed", JAVA_V88_RUNBOOK, "manual window 默认不开启"),
    snippet("java-v88-credential-handle", JAVA_V88_RUNBOOK, "sandbox credential handle name"),
    snippet("java-v88-no-credential", JAVA_V88_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("java-v88-no-sql", JAVA_V88_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v88-no-ledger", JAVA_V88_RUNBOOK, "不写 approval ledger"),
    snippet("java-v88-no-connection", JAVA_V88_RUNBOOK, "不打开 managed audit sandbox connection"),
    snippet("java-v88-no-auto-start", JAVA_V88_RUNBOOK, "不自动启动 Java、mini-kv 或外部 audit 服务"),
    snippet("mini-kv-v97-no-start-guard", MINI_KV_V97_WALKTHROUGH, "managed_audit_sandbox_connection_no_start_guard_receipt"),
    snippet("mini-kv-v97-consumed-v96", MINI_KV_V97_WALKTHROUGH, "consumed_release_version=\"v96\""),
    snippet("mini-kv-v97-consumed-digest", MINI_KV_V97_WALKTHROUGH, "fnv1a64:b9fc556875ea625b"),
    snippet("mini-kv-v97-receipt-digest", MINI_KV_RUNTIME_SMOKE, "\"receipt_digest\":\"fnv1a64:69e377d01f15fd57\""),
    snippet("mini-kv-v97-window-closed", MINI_KV_V97_WALKTHROUGH, "manual_window_open_by_default=false"),
    snippet("mini-kv-v97-node-autostart-blocked", MINI_KV_V97_WALKTHROUGH, "node_auto_start_allowed=false"),
    snippet("mini-kv-v97-java-autostart-blocked", MINI_KV_V97_WALKTHROUGH, "java_auto_start_allowed=false"),
    snippet("mini-kv-v97-minikv-autostart-blocked", MINI_KV_V97_WALKTHROUGH, "mini_kv_auto_start_allowed=false"),
    snippet("mini-kv-v97-no-credential", MINI_KV_V97_WALKTHROUGH, "credential_value_read_allowed=false"),
    snippet("mini-kv-v97-no-write", MINI_KV_V97_WALKTHROUGH, "managed_audit_write_allowed=false"),
    snippet("mini-kv-v97-no-connection", MINI_KV_V97_WALKTHROUGH, "connection_execution_allowed=false"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxPreflightVerificationChecks,
): ManualSandboxPreflightVerificationMessage[] {
  const blockers: ManualSandboxPreflightVerificationMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV230PreflightGateReady, "NODE_V230_PREFLIGHT_GATE_NOT_READY", "node-v230-preflight-gate", "Node v230 preflight gate must be ready before v231 verification.");
  addBlocker(blockers, checks.sourceNodeV230StillConnectionBlocked, "SOURCE_PREFLIGHT_GATE_UNLOCKED_CONNECTION", "node-v230-preflight-gate", "Node v230 source gate must still block connection, credential reads, and schema migration.");
  addBlocker(blockers, checks.javaV88EvidencePresent, "JAVA_V88_EVIDENCE_MISSING", "java-v88-preflight-echo-marker", "Java v88 runbook and walkthrough must be present.");
  addBlocker(blockers, checks.javaV88PreflightEchoAccepted, "JAVA_V88_PREFLIGHT_ECHO_NOT_ACCEPTED", "java-v88-preflight-echo-marker", "Java v88 preflight echo marker must document all v230 fields and Node v231 readiness.");
  addBlocker(blockers, checks.miniKvV97EvidencePresent, "MINIKV_V97_EVIDENCE_MISSING", "mini-kv-v97-no-start-guard", "mini-kv v97 evidence files must be present.");
  addBlocker(blockers, checks.miniKvV97NoStartGuardAccepted, "MINIKV_V97_NO_START_GUARD_NOT_ACCEPTED", "mini-kv-v97-no-start-guard", "mini-kv v97 no-start guard must match v230 preflight and v96 digest.");
  addBlocker(blockers, checks.preflightFieldsAlignedAcrossSources, "PREFLIGHT_FIELDS_NOT_ALIGNED", "managed-audit-manual-sandbox-connection-preflight-verification", "Node v230, Java v88, and mini-kv v97 must agree on manual window flag and preflight field semantics.");
  addBlocker(blockers, checks.manualWindowClosedAcrossSources, "MANUAL_WINDOW_OPENED_BY_SOURCE", "managed-audit-manual-sandbox-connection-preflight-verification", "All sources must keep the manual sandbox window closed by default.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-preflight-verification", "v231 must not unlock production audit.");
  return blockers;
}
