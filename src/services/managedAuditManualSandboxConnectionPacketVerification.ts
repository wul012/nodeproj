import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  booleanField,
  evidenceById as fileById,
  evidenceFile,
  readEvidenceJson,
  snippet,
  snippetMatched,
  stringField,
  type ManualConnectionEvidenceFile,
  type ManualConnectionSnippetMatch,
} from "./manualConnectionSources.js";
import {
  addManualBlocker as addBlocker,
  packetAdvisories,
  type ManualConnectionMessage,
} from "./manualConnectionAdvisories.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorPacket,
  type ManagedAuditManualSandboxConnectionOperatorPacketProfile,
} from "./managedAuditManualSandboxConnectionOperatorPacket.js";
import type { SandboxDryRunGuards } from "./managedAuditSandboxGuards.js";

export {
  renderPacketVerification as renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown,
} from "./verificationReports/manualConnection.js";

export interface ManagedAuditManualSandboxConnectionPacketVerificationProfile extends SandboxDryRunGuards {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1";
  verificationState: "manual-sandbox-connection-packet-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionPacketVerification: boolean;
  readOnlyVerification: true;
  sourceNodeV228: {
    sourceVersion: "Node v228";
    profileVersion: ManagedAuditManualSandboxConnectionOperatorPacketProfile["profileVersion"];
    packetState: ManagedAuditManualSandboxConnectionOperatorPacketProfile["packetState"];
    packetDigest: string;
    sourceChecklistDigest: string;
    readyForOperatorPacket: boolean;
    readyForConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    operatorFieldCount: number;
    requiredOperatorFieldCount: number;
  };
  upstreamMarkers: {
    javaV87: JavaV87OperatorHandoffMarkerReference;
    miniKvV96: MiniKvV96ReceiptEchoMarkerReference;
  };
  evidenceFiles: PacketVerificationEvidenceFile[];
  snippetMatches: PacketVerificationSnippetMatch[];
  packetVerification: {
    verificationDigest: string;
    sourcePacketDigest: string;
    markerSpan: "Node v228 + Java v87 + mini-kv v96";
    verificationMode: "manual-sandbox-connection-packet-verification-only";
    javaMarkerAccepted: boolean;
    miniKvMarkerAccepted: boolean;
    operatorFieldsEchoed: boolean;
    connectionExecutionAllowed: false;
    credentialValueRequired: false;
    schemaMigrationExecutionAllowed: false;
    managedAuditWriteAllowed: false;
    automaticServiceStartAllowed: false;
    nodeV229BlocksRealConnection: true;
  };
  checks: ManualSandboxPacketVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxPacketVerificationMessage[];
  warnings: ManualSandboxPacketVerificationMessage[];
  recommendations: ManualSandboxPacketVerificationMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionPacketVerificationJson: string;
    manualSandboxConnectionPacketVerificationMarkdown: string;
    sourceNodeV228Json: string;
    javaV87Runbook: string;
    miniKvV96Runbook: string;
    miniKvRuntimeSmokeEvidence: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV87OperatorHandoffMarkerReference {
  sourceVersion: "Java v87";
  headTag: "v87订单平台release-approval-sandbox-connection-operator-handoff-marker";
  runbookPath: string;
  walkthroughPath: string;
  evidencePresent: boolean;
  markerFieldPresent: boolean;
  readyFieldDocumented: boolean;
  ownerArtifactEchoDocumented: boolean;
  credentialHandleEchoDocumented: boolean;
  schemaRehearsalEchoDocumented: boolean;
  rollbackTimeoutAbortEchoDocumented: boolean;
  noLedgerWriteBoundary: boolean;
  noSqlBoundary: boolean;
  noCredentialBoundary: boolean;
  readyForNodeV229PacketVerification: boolean;
}

interface MiniKvV96ReceiptEchoMarkerReference {
  sourceVersion: "mini-kv v96";
  headTag: "第九十六版沙箱连接回声收据标记";
  runbookPath: string;
  walkthroughPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  projectVersion: string;
  releaseVersion: string;
  markerDigest: string;
  consumedReceiptDigest: string;
  sourceOperatorPacketProfile: string;
  packetMode: string;
  ownerArtifactEchoed: boolean;
  credentialHandleEchoed: boolean;
  schemaRehearsalEchoed: boolean;
  rollbackPathEchoed: boolean;
  manualAbortMarkerEchoed: boolean;
  readOnly: boolean;
  connectionExecutionAllowed: boolean;
  credentialValueReadAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  managedAuditWriteAllowed: boolean;
  participatesInSandboxConnection: boolean;
  nodeAutoStartAllowed: boolean;
  restoreExecutionAllowed: boolean;
  readyForNodeV229PacketVerification: boolean;
}

type PacketVerificationEvidenceFile = ManualConnectionEvidenceFile;
type PacketVerificationSnippetMatch = ManualConnectionSnippetMatch;

type ManualSandboxPacketVerificationChecks = {
  sourceNodeV228PacketReady: boolean;
  sourceNodeV228StillConnectionBlocked: boolean;
  sourceNodeV228PacketDigestPresent: boolean;
  javaV87EvidencePresent: boolean;
  javaV87OperatorHandoffAccepted: boolean;
  javaV87NoWriteNoSqlNoCredentialBoundaryAccepted: boolean;
  miniKvV96EvidencePresent: boolean;
  miniKvV96ReceiptEchoAccepted: boolean;
  miniKvV96BoundaryAccepted: boolean;
  operatorFieldsEchoedByBothUpstreams: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionPacketVerification: boolean;
};

type ManualSandboxPacketVerificationMessage = ManualConnectionMessage;

interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  managed_audit_sandbox_connection_receipt_echo_marker?: Record<string, unknown>;
}

const JAVA_V87_RUNBOOK = "D:/javaproj/advanced-order-platform/c/87/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V87_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/90-version-87-release-approval-sandbox-connection-operator-handoff-marker.md";
const MINI_KV_V96_RUNBOOK = "D:/C/mini-kv/c/96/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V96_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/152-version-96-sandbox-connection-receipt-echo-marker.md";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionPacketVerificationJson: "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification",
  manualSandboxConnectionPacketVerificationMarkdown: "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification?format=markdown",
  sourceNodeV228Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet",
  javaV87Runbook: JAVA_V87_RUNBOOK,
  miniKvV96Runbook: MINI_KV_V96_RUNBOOK,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  activePlan: "docs/plans/v227-post-evidence-checklist-roadmap.md",
});

const SHA256_HEX = /^[a-f0-9]{64}$/;
const MINI_KV_V96_MARKER_DIGESTS = Object.freeze([
  "fnv1a64:c88b0bf6b974ac6b",
  "fnv1a64:0d5212cff01975af",
  "fnv1a64:a5ea80910cb99931",
  "fnv1a64:259cb68de0117847",
  "fnv1a64:beb8dd6a0b102a11",
]);
const ACCEPTED_MINI_KV_RECEIPT_ECHO_MARKER_REFERENCES = Object.freeze([
  { projectVersion: "0.98.0", releaseVersion: "v98" },
  { projectVersion: "0.99.0", releaseVersion: "v99" },
  { projectVersion: "0.100.0", releaseVersion: "v100" },
  { projectVersion: "0.101.0", releaseVersion: "v101" },
  { projectVersion: "0.102.0", releaseVersion: "v102" },
] as const);

export function loadManagedAuditManualSandboxConnectionPacketVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPacketVerificationProfile {
  const sourcePacket = loadManagedAuditManualSandboxConnectionOperatorPacket({ config: input.config });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const miniKvEvidence = readEvidenceJson<MiniKvRuntimeSmokeEvidence>(MINI_KV_RUNTIME_SMOKE);
  const javaV87 = createJavaV87Reference(evidenceFiles, snippetMatches);
  const miniKvV96 = createMiniKvV96Reference(evidenceFiles, snippetMatches, miniKvEvidence);
  const packetVerification = createPacketVerification(sourcePacket, javaV87, miniKvV96);
  const checks = createChecks(input.config, sourcePacket, javaV87, miniKvV96, packetVerification);
  checks.readyForManagedAuditManualSandboxConnectionPacketVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPacketVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionPacketVerification
    ? "manual-sandbox-connection-packet-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const { warnings, recommendations } = packetAdvisories();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection packet verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionPacketVerification: checks.readyForManagedAuditManualSandboxConnectionPacketVerification,
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
    sourceNodeV228: {
      sourceVersion: "Node v228",
      profileVersion: sourcePacket.profileVersion,
      packetState: sourcePacket.packetState,
      packetDigest: sourcePacket.operatorPacket.packetDigest,
      sourceChecklistDigest: sourcePacket.operatorPacket.sourceChecklistDigest,
      readyForOperatorPacket: sourcePacket.readyForManagedAuditManualSandboxConnectionOperatorPacket,
      readyForConnectionFromSource: sourcePacket.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourcePacket.connectsManagedAudit,
      readsManagedAuditCredential: sourcePacket.readsManagedAuditCredential,
      schemaMigrationExecuted: sourcePacket.schemaMigrationExecuted,
      operatorFieldCount: sourcePacket.summary.operatorFieldCount,
      requiredOperatorFieldCount: sourcePacket.summary.requiredOperatorFieldCount,
    },
    upstreamMarkers: {
      javaV87,
      miniKvV96,
    },
    evidenceFiles,
    snippetMatches,
    packetVerification,
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
      "Archive Node v229 as packet verification only; do not open a sandbox managed audit connection from this profile.",
      "Start a new post-v229 plan before any manual sandbox connection rehearsal attempt.",
      "Keep credential values outside Node archives; v229 verifies handle and marker echoes only.",
    ],
  };
}

function createJavaV87Reference(
  evidenceFiles: PacketVerificationEvidenceFile[],
  snippets: PacketVerificationSnippetMatch[],
): JavaV87OperatorHandoffMarkerReference {
  const reference: JavaV87OperatorHandoffMarkerReference = {
    sourceVersion: "Java v87",
    headTag: "v87订单平台release-approval-sandbox-connection-operator-handoff-marker",
    runbookPath: JAVA_V87_RUNBOOK,
    walkthroughPath: JAVA_V87_WALKTHROUGH,
    evidencePresent: fileById(evidenceFiles, "java-v87-runbook").exists
      && fileById(evidenceFiles, "java-v87-walkthrough").exists,
    markerFieldPresent: snippetMatched(snippets, "java-v87-marker-field"),
    readyFieldDocumented: snippetMatched(snippets, "java-v87-ready-field"),
    ownerArtifactEchoDocumented: snippetMatched(snippets, "java-v87-owner-artifact"),
    credentialHandleEchoDocumented: snippetMatched(snippets, "java-v87-credential-handle"),
    schemaRehearsalEchoDocumented: snippetMatched(snippets, "java-v87-schema-rehearsal"),
    rollbackTimeoutAbortEchoDocumented: snippetMatched(snippets, "java-v87-rollback-timeout-abort"),
    noLedgerWriteBoundary: snippetMatched(snippets, "java-v87-no-ledger-write"),
    noSqlBoundary: snippetMatched(snippets, "java-v87-no-sql"),
    noCredentialBoundary: snippetMatched(snippets, "java-v87-no-credential"),
    readyForNodeV229PacketVerification: false,
  };
  return {
    ...reference,
    readyForNodeV229PacketVerification: reference.evidencePresent
      && reference.markerFieldPresent
      && reference.readyFieldDocumented
      && reference.ownerArtifactEchoDocumented
      && reference.credentialHandleEchoDocumented
      && reference.schemaRehearsalEchoDocumented
      && reference.rollbackTimeoutAbortEchoDocumented
      && reference.noLedgerWriteBoundary
      && reference.noSqlBoundary
      && reference.noCredentialBoundary,
  };
}

function createMiniKvV96Reference(
  evidenceFiles: PacketVerificationEvidenceFile[],
  snippets: PacketVerificationSnippetMatch[],
  evidence: MiniKvRuntimeSmokeEvidence,
): MiniKvV96ReceiptEchoMarkerReference {
  const marker = evidence.managed_audit_sandbox_connection_receipt_echo_marker ?? {};
  const reference: MiniKvV96ReceiptEchoMarkerReference = {
    sourceVersion: "mini-kv v96",
    headTag: "第九十六版沙箱连接回声收据标记",
    runbookPath: MINI_KV_V96_RUNBOOK,
    walkthroughPath: MINI_KV_V96_WALKTHROUGH,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v96-runbook").exists
      && fileById(evidenceFiles, "mini-kv-v96-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-verification-manifest").exists,
    projectVersion: stringField(evidence, "project_version") ?? "missing",
    releaseVersion: stringField(evidence, "release_version") ?? "missing",
    markerDigest: stringField(marker, "marker_digest") ?? "missing",
    consumedReceiptDigest: stringField(marker, "consumed_receipt_digest") ?? "missing",
    sourceOperatorPacketProfile: stringField(marker, "source_operator_packet_profile") ?? "missing",
    packetMode: stringField(marker, "packet_mode") ?? "missing",
    ownerArtifactEchoed: stringField(marker, "owner_approval_artifact_id_field") === "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
    credentialHandleEchoed: stringField(marker, "credential_handle_name_field") === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    schemaRehearsalEchoed: stringField(marker, "schema_rehearsal_id_field") === "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
    rollbackPathEchoed: stringField(marker, "rollback_path_id_field") === "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
    manualAbortMarkerEchoed: stringField(marker, "manual_abort_marker") === "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
    readOnly: booleanField(marker, "read_only") ?? false,
    connectionExecutionAllowed: booleanField(marker, "connection_execution_allowed") ?? true,
    credentialValueReadAllowed: booleanField(marker, "credential_value_read_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(marker, "schema_migration_execution_allowed") ?? true,
    managedAuditWriteAllowed: booleanField(marker, "managed_audit_write_allowed") ?? true,
    participatesInSandboxConnection: booleanField(marker, "participates_in_sandbox_connection") ?? true,
    nodeAutoStartAllowed: booleanField(marker, "node_auto_start_allowed") ?? true,
    restoreExecutionAllowed: booleanField(marker, "restore_execution_allowed") ?? true,
    readyForNodeV229PacketVerification: false,
  };
  return {
    ...reference,
    readyForNodeV229PacketVerification: reference.evidencePresent
      && acceptedMiniKvReceiptEchoMarkerReference(reference)
      && MINI_KV_V96_MARKER_DIGESTS.includes(reference.markerDigest)
      && reference.consumedReceiptDigest === "fnv1a64:ceaed265f7f9560c"
      && reference.sourceOperatorPacketProfile === "managed-audit-manual-sandbox-connection-operator-packet.v1"
      && reference.packetMode === "manual-sandbox-connection-operator-packet-only"
      && reference.ownerArtifactEchoed
      && reference.credentialHandleEchoed
      && reference.schemaRehearsalEchoed
      && reference.rollbackPathEchoed
      && reference.manualAbortMarkerEchoed
      && reference.readOnly
      && !reference.connectionExecutionAllowed
      && !reference.credentialValueReadAllowed
      && !reference.schemaMigrationExecutionAllowed
      && !reference.managedAuditWriteAllowed
      && !reference.participatesInSandboxConnection
      && !reference.nodeAutoStartAllowed
      && !reference.restoreExecutionAllowed,
  };
}

function acceptedMiniKvReceiptEchoMarkerReference(input: {
  projectVersion: string;
  releaseVersion: string;
}): boolean {
  return ACCEPTED_MINI_KV_RECEIPT_ECHO_MARKER_REFERENCES.some((reference) =>
    reference.projectVersion === input.projectVersion
    && reference.releaseVersion === input.releaseVersion);
}

function createPacketVerification(
  sourcePacket: ManagedAuditManualSandboxConnectionOperatorPacketProfile,
  javaV87: JavaV87OperatorHandoffMarkerReference,
  miniKvV96: MiniKvV96ReceiptEchoMarkerReference,
): ManagedAuditManualSandboxConnectionPacketVerificationProfile["packetVerification"] {
  const operatorFieldsEchoed = javaV87.ownerArtifactEchoDocumented
    && javaV87.credentialHandleEchoDocumented
    && javaV87.schemaRehearsalEchoDocumented
    && javaV87.rollbackTimeoutAbortEchoDocumented
    && miniKvV96.ownerArtifactEchoed
    && miniKvV96.credentialHandleEchoed
    && miniKvV96.schemaRehearsalEchoed
    && miniKvV96.rollbackPathEchoed
    && miniKvV96.manualAbortMarkerEchoed;
  return {
    verificationDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
      sourcePacketDigest: sourcePacket.operatorPacket.packetDigest,
      javaV87,
      miniKvV96,
      operatorFieldsEchoed,
    }),
    sourcePacketDigest: sourcePacket.operatorPacket.packetDigest,
    markerSpan: "Node v228 + Java v87 + mini-kv v96",
    verificationMode: "manual-sandbox-connection-packet-verification-only",
    javaMarkerAccepted: javaV87.readyForNodeV229PacketVerification,
    miniKvMarkerAccepted: miniKvV96.readyForNodeV229PacketVerification,
    operatorFieldsEchoed,
    connectionExecutionAllowed: false,
    credentialValueRequired: false,
    schemaMigrationExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    automaticServiceStartAllowed: false,
    nodeV229BlocksRealConnection: true,
  };
}

function createChecks(
  config: AppConfig,
  sourcePacket: ManagedAuditManualSandboxConnectionOperatorPacketProfile,
  javaV87: JavaV87OperatorHandoffMarkerReference,
  miniKvV96: MiniKvV96ReceiptEchoMarkerReference,
  packetVerification: ManagedAuditManualSandboxConnectionPacketVerificationProfile["packetVerification"],
): ManualSandboxPacketVerificationChecks {
  return {
    sourceNodeV228PacketReady: sourcePacket.readyForManagedAuditManualSandboxConnectionOperatorPacket
      && sourcePacket.packetState === "manual-sandbox-connection-operator-packet-ready",
    sourceNodeV228StillConnectionBlocked: !sourcePacket.readyForManagedAuditSandboxAdapterConnection
      && !sourcePacket.connectsManagedAudit
      && !sourcePacket.readsManagedAuditCredential
      && !sourcePacket.schemaMigrationExecuted,
    sourceNodeV228PacketDigestPresent: SHA256_HEX.test(sourcePacket.operatorPacket.packetDigest),
    javaV87EvidencePresent: javaV87.evidencePresent,
    javaV87OperatorHandoffAccepted: javaV87.markerFieldPresent
      && javaV87.readyFieldDocumented
      && javaV87.ownerArtifactEchoDocumented
      && javaV87.credentialHandleEchoDocumented
      && javaV87.schemaRehearsalEchoDocumented
      && javaV87.rollbackTimeoutAbortEchoDocumented,
    javaV87NoWriteNoSqlNoCredentialBoundaryAccepted: javaV87.noLedgerWriteBoundary
      && javaV87.noSqlBoundary
      && javaV87.noCredentialBoundary,
    miniKvV96EvidencePresent: miniKvV96.evidencePresent,
    miniKvV96ReceiptEchoAccepted: miniKvV96.readyForNodeV229PacketVerification,
    miniKvV96BoundaryAccepted: miniKvV96.readOnly
      && !miniKvV96.connectionExecutionAllowed
      && !miniKvV96.credentialValueReadAllowed
      && !miniKvV96.schemaMigrationExecutionAllowed
      && !miniKvV96.managedAuditWriteAllowed
      && !miniKvV96.participatesInSandboxConnection
      && !miniKvV96.nodeAutoStartAllowed
      && !miniKvV96.restoreExecutionAllowed,
    operatorFieldsEchoedByBothUpstreams: packetVerification.operatorFieldsEchoed,
    credentialValueStillForbidden: true,
    schemaMigrationStillBlocked: true,
    externalConnectionStillBlocked: true,
    managedAuditWritesStillBlocked: true,
    automaticServiceStartStillBlocked: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPacketVerification: false,
  };
}

function createEvidenceFiles(): PacketVerificationEvidenceFile[] {
  return [
    evidenceFile("java-v87-runbook", JAVA_V87_RUNBOOK),
    evidenceFile("java-v87-walkthrough", JAVA_V87_WALKTHROUGH),
    evidenceFile("mini-kv-v96-runbook", MINI_KV_V96_RUNBOOK),
    evidenceFile("mini-kv-v96-walkthrough", MINI_KV_V96_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): PacketVerificationSnippetMatch[] {
  return [
    snippet("java-v87-marker-field", JAVA_V87_WALKTHROUGH, "managedAuditSandboxConnectionOperatorHandoffMarker"),
    snippet("java-v87-ready-field", JAVA_V87_RUNBOOK, "readyForNodeV229ManualSandboxConnectionPacketVerification=true"),
    snippet("java-v87-owner-artifact", JAVA_V87_RUNBOOK, "owner approval artifact id"),
    snippet("java-v87-credential-handle", JAVA_V87_RUNBOOK, "sandbox credential handle name"),
    snippet("java-v87-schema-rehearsal", JAVA_V87_RUNBOOK, "schema rehearsal id"),
    snippet("java-v87-rollback-timeout-abort", JAVA_V87_RUNBOOK, "rollback path id、timeout budget、manual abort marker"),
    snippet("java-v87-no-ledger-write", JAVA_V87_WALKTHROUGH, "approvalLedgerWrittenByJava=false"),
    snippet("java-v87-no-sql", JAVA_V87_WALKTHROUGH, "sqlExecutedByJava=false"),
    snippet("java-v87-no-credential", JAVA_V87_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("mini-kv-v96-marker", MINI_KV_V96_WALKTHROUGH, "managed_audit_sandbox_connection_receipt_echo_marker"),
    snippet("mini-kv-v96-marker-digest", MINI_KV_V96_RUNBOOK, "fnv1a64:b9fc556875ea625b"),
    snippet("mini-kv-v96-consumed-digest", MINI_KV_V96_WALKTHROUGH, "fnv1a64:ceaed265f7f9560c"),
    snippet("mini-kv-v96-source-profile", MINI_KV_V96_WALKTHROUGH, "managed-audit-manual-sandbox-connection-operator-packet.v1"),
    snippet("mini-kv-v96-no-credential", MINI_KV_V96_WALKTHROUGH, "credential_value_read_allowed=false"),
    snippet("mini-kv-v96-no-write", MINI_KV_V96_WALKTHROUGH, "managed_audit_write_allowed=false"),
    snippet("mini-kv-v96-no-connection", MINI_KV_V96_WALKTHROUGH, "connection_execution_allowed=false"),
  ];
}

function collectProductionBlockers(
  checks: ManualSandboxPacketVerificationChecks,
): ManualSandboxPacketVerificationMessage[] {
  const blockers: ManualSandboxPacketVerificationMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV228PacketReady, "NODE_V228_PACKET_NOT_READY", "node-v228-operator-packet", "Node v228 operator packet must be ready before packet verification.");
  addBlocker(blockers, checks.javaV87EvidencePresent, "JAVA_V87_EVIDENCE_MISSING", "java-v87-marker", "Java v87 runbook and walkthrough must be present.");
  addBlocker(blockers, checks.javaV87OperatorHandoffAccepted, "JAVA_V87_HANDOFF_NOT_ACCEPTED", "java-v87-marker", "Java v87 operator handoff marker must echo all v228 fields.");
  addBlocker(blockers, checks.miniKvV96EvidencePresent, "MINIKV_V96_EVIDENCE_MISSING", "mini-kv-v96-marker", "mini-kv v96 evidence files must be present.");
  addBlocker(blockers, checks.miniKvV96ReceiptEchoAccepted, "MINIKV_V96_RECEIPT_ECHO_NOT_ACCEPTED", "mini-kv-v96-marker", "mini-kv v96 receipt echo marker must match v228 packet fields and v95 receipt digest.");
  addBlocker(blockers, checks.operatorFieldsEchoedByBothUpstreams, "OPERATOR_FIELDS_NOT_ECHOED", "managed-audit-manual-sandbox-connection-packet-verification", "Java v87 and mini-kv v96 must echo the v228 operator packet field set.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-connection-packet-verification", "v229 must not unlock production audit.");
  return blockers;
}
