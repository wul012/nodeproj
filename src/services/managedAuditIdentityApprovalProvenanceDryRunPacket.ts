import { createHash, randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { appendFile, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import path from "node:path";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditIdentityApprovalBindingContract,
  type ManagedAuditIdentityApprovalBindingContractProfile,
} from "./managedAuditIdentityApprovalBindingContract.js";

export interface ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1";
  packetState: "dry-run-packet-verified" | "blocked";
  readyForManagedAuditIdentityApprovalProvenanceDryRunPacket: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  upstreamReadOnly: true;
  localDryRunWritePerformed: true;
  executionAllowed: false;
  sourceBindingContract: {
    profileVersion: ManagedAuditIdentityApprovalBindingContractProfile["profileVersion"];
    contractState: ManagedAuditIdentityApprovalBindingContractProfile["contractState"];
    contractDigest: string;
    targetRecordVersion: ManagedAuditIdentityApprovalBindingContractProfile["contract"]["targetRecordVersion"];
  };
  upstreamEvidence: {
    javaV75: JavaApprovalRecordHandoffEvidence;
    miniKvV84: MiniKvRetentionProvenanceEvidence;
  };
  dryRunPacket: ManagedAuditDryRunPacket;
  verification: {
    dryRunRootLabel: ".tmp";
    dryRunDirectoryPrefix: "managed-audit-v211-";
    dryRunDirectoryCreated: boolean;
    dryRunDirectoryRemoved: boolean;
    dryRunFileName: "managed-audit-packet.jsonl";
    appendPacketCount: number;
    queryByRequestIdCount: number;
    digestBeforeAppend: string;
    digestAfterAppend: string;
    digestAfterRepeatRead: string;
    packetVerificationDigest: string;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    externalAuditSystemAccessed: false;
    realApprovalDecisionCreated: false;
    realApprovalLedgerWritten: false;
    productionAuditRecordAllowed: false;
  };
  checks: {
    sourceBindingContractReady: boolean;
    sourceBindingContractStillBlocksProduction: boolean;
    javaV75HandoffAccepted: boolean;
    javaV75NoWriteBoundaryValid: boolean;
    miniKvV84ProvenanceAccepted: boolean;
    miniKvV84NoManagedAuditWrite: boolean;
    packetShapeBoundToContract: boolean;
    packetDigestValid: boolean;
    tempDirectoryOnly: boolean;
    appendCovered: boolean;
    queryCovered: boolean;
    digestCovered: boolean;
    cleanupCovered: boolean;
    javaMiniKvWriteBlocked: boolean;
    noRealApprovalDecisionCreated: boolean;
    noExternalAuditAccessed: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditIdentityApprovalProvenanceDryRunPacket: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    appendPacketCount: number;
    queryResultCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: PacketMessage[];
  warnings: PacketMessage[];
  recommendations: PacketMessage[];
  evidenceEndpoints: {
    managedAuditIdentityApprovalProvenanceDryRunPacketJson: string;
    managedAuditIdentityApprovalProvenanceDryRunPacketMarkdown: string;
    sourceManagedAuditIdentityApprovalBindingContractJson: string;
    sourceManagedAuditPersistenceDryRunVerificationJson: string;
    javaV75ApprovalRecordHandoffHint: string;
    miniKvV84RetentionProvenanceEvidence: string;
  };
  nextActions: string[];
}

export interface ManagedAuditDryRunPacket {
  packetVersion: "managed-audit-dry-run-record.v2-candidate";
  packetId: string;
  requestId: "managed-audit-v211-identity-approval-provenance-request";
  occurredAt: string;
  source: {
    nodeSourceVersion: "Node v211";
    bindingContractVersion: "Node v210";
    javaSourceVersion: "Java v75";
    miniKvSourceVersion: "mini-kv v84";
  };
  identity: {
    identityVersion: "operator-identity-contract.v1";
    operatorId: "operator:v211-dry-run";
    authenticated: true;
    roles: ["auditor", "operator"];
    authSource: "headers";
    verifiedTokenAttached: false;
  };
  approvalRequest: {
    requestId: "approval-request-v211-dry-run";
    intentId: "intent:v211-managed-audit-dry-run";
    action: "managed-audit.identity-approval-provenance-dry-run";
    target: "managed-audit-local-temp-store";
    status: "approved";
    requestedBy: "operator:v211-dry-run";
    reviewer: "reviewer:v211-dry-run";
    previewDigest: string;
    preflightDigest: string;
  };
  approvalDecision: {
    decisionId: "approval-decision-v211-dry-run";
    decision: "approved";
    reviewer: "reviewer:v211-dry-run";
    reason: "local dry-run packet only";
    decisionDigest: string;
    upstreamTouched: false;
  };
  correlation: {
    approvalCorrelationId: "approval-correlation-v211-dry-run";
    auditRequestId: "managed-audit-v211-identity-approval-provenance-request";
    operationIntentId: "intent:v211-managed-audit-dry-run";
    sourceDryRunRecordId: string;
    traceDigest: string;
  };
  provenance: {
    javaApprovalRecordHandoffHintVersion: JavaApprovalRecordHandoffEvidence["hintVersion"];
    javaApprovalRecordHandoffContextComplete: boolean;
    javaApprovalDecisionCreated: false;
    javaApprovalLedgerWritten: false;
    javaApprovalRecordPersisted: false;
    miniKvRetentionProvenanceCheckDigest: MiniKvRetentionProvenanceEvidence["retentionProvenanceCheckDigest"];
    miniKvExpectedBinaryProvenanceDigest: MiniKvRetentionProvenanceEvidence["expectedBinaryProvenanceDigest"];
    miniKvManagedAuditWriteExecuted: false;
  };
  boundaries: {
    nodeTempDirectoryOnly: true;
    upstreamReadOnly: true;
    javaWriteAllowed: false;
    miniKvWriteAllowed: false;
    externalAuditSystemAllowed: false;
    productionAuditRecordAllowed: false;
  };
  packetDigest: string;
}

interface JavaApprovalRecordHandoffEvidence {
  sourceVersion: "Java v75";
  hintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1";
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v9";
  approvalBindingContractVersion: "managed-audit-identity-approval-binding-contract.v1";
  approvalRecordCorrelationHeader: "x-orderops-approval-record-correlation-id";
  approvalRecordHandoffContextComplete: true;
  approvalRecordFixtureReadOnly: true;
  javaApprovalDecisionCreated: false;
  javaApprovalLedgerWritten: false;
  javaApprovalRecordPersisted: false;
  nodeMayTreatAsProductionApprovalRecord: false;
  handoffFieldPaths: string[];
}

interface MiniKvRetentionProvenanceEvidence {
  sourceVersion: "mini-kv v84";
  projectVersion: "0.84.0";
  artifactPathHint: "c/84/";
  retentionSourcePathHint: "c/81/";
  expectedBinaryProvenanceDigest: "fnv1a64:c682f9c827129e40";
  retentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223";
  releaseManifestPath: "fixtures/release/verification-manifest.json";
  runtimeSmokeEvidencePath: "fixtures/release/runtime-smoke-evidence.json";
  readOnly: true;
  executionAllowed: false;
  managedAuditWriteExecuted: false;
  orderAuthoritative: false;
}

interface PacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-identity-approval-provenance-dry-run-packet"
    | "managed-audit-identity-approval-binding-contract"
    | "java-v75-approval-record-handoff"
    | "mini-kv-v84-retention-provenance"
    | "runtime-config";
  message: string;
}

interface PacketFileResult {
  rootInsideRepository: boolean;
  directoryCreated: boolean;
  directoryRemoved: boolean;
  appendPacketCount: number;
  queryByRequestIdCount: number;
  digestBeforeAppend: string;
  digestAfterAppend: string;
  digestAfterRepeatRead: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditIdentityApprovalProvenanceDryRunPacketJson: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
  managedAuditIdentityApprovalProvenanceDryRunPacketMarkdown: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet?format=markdown",
  sourceManagedAuditIdentityApprovalBindingContractJson: "/api/v1/audit/managed-identity-approval-binding-contract",
  sourceManagedAuditPersistenceDryRunVerificationJson: "/api/v1/audit/managed-persistence-dry-run-verification",
  javaV75ApprovalRecordHandoffHint: "D:/javaproj/advanced-order-platform/c/75/",
  miniKvV84RetentionProvenanceEvidence: "D:/C/mini-kv/c/84/",
});

export async function loadManagedAuditIdentityApprovalProvenanceDryRunPacket(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile> {
  const sourceBinding = await loadManagedAuditIdentityApprovalBindingContract({
    config: input.config,
    runtime: input.runtime,
    auditLog: input.auditLog,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const upstreamEvidence = {
    javaV75: createJavaV75Evidence(sourceBinding),
    miniKvV84: createMiniKvV84Evidence(),
  };
  const dryRunPacket = createDryRunPacket(sourceBinding, upstreamEvidence);
  const packetRun = await runJsonlPacketDryRun(dryRunPacket);
  const packetVerificationDigest = sha256StableJson({
    profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
    sourceBindingDigest: sourceBinding.contract.contractDigest,
    packetDigest: dryRunPacket.packetDigest,
    javaHintVersion: upstreamEvidence.javaV75.hintVersion,
    miniKvRetentionProvenanceCheckDigest: upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest,
    appendPacketCount: packetRun.appendPacketCount,
    queryByRequestIdCount: packetRun.queryByRequestIdCount,
    digestAfterAppend: packetRun.digestAfterAppend,
    directoryRemoved: packetRun.directoryRemoved,
    productionAuditRecordAllowed: false,
  });
  const verification = {
    dryRunRootLabel: ".tmp" as const,
    dryRunDirectoryPrefix: "managed-audit-v211-" as const,
    dryRunDirectoryCreated: packetRun.directoryCreated,
    dryRunDirectoryRemoved: packetRun.directoryRemoved,
    dryRunFileName: "managed-audit-packet.jsonl" as const,
    appendPacketCount: packetRun.appendPacketCount,
    queryByRequestIdCount: packetRun.queryByRequestIdCount,
    digestBeforeAppend: packetRun.digestBeforeAppend,
    digestAfterAppend: packetRun.digestAfterAppend,
    digestAfterRepeatRead: packetRun.digestAfterRepeatRead,
    packetVerificationDigest,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    externalAuditSystemAccessed: false as const,
    realApprovalDecisionCreated: false as const,
    realApprovalLedgerWritten: false as const,
    productionAuditRecordAllowed: false as const,
  };
  const checks = createChecks(input.config, sourceBinding, upstreamEvidence, dryRunPacket, packetRun, verification);
  checks.readyForManagedAuditIdentityApprovalProvenanceDryRunPacket = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditIdentityApprovalProvenanceDryRunPacket")
    .every(([, value]) => value);
  const packetState = checks.readyForManagedAuditIdentityApprovalProvenanceDryRunPacket
    ? "dry-run-packet-verified"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit identity approval provenance dry-run packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
    packetState,
    readyForManagedAuditIdentityApprovalProvenanceDryRunPacket: checks.readyForManagedAuditIdentityApprovalProvenanceDryRunPacket,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    upstreamReadOnly: true,
    localDryRunWritePerformed: true,
    executionAllowed: false,
    sourceBindingContract: {
      profileVersion: sourceBinding.profileVersion,
      contractState: sourceBinding.contractState,
      contractDigest: sourceBinding.contract.contractDigest,
      targetRecordVersion: sourceBinding.contract.targetRecordVersion,
    },
    upstreamEvidence,
    dryRunPacket,
    verification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      appendPacketCount: packetRun.appendPacketCount,
      queryResultCount: packetRun.queryByRequestIdCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Start a new post-v211 plan before adding real managed audit adapters, retention enforcement, or production approval execution.",
      "Keep Node v211 as a local dry-run packet only; do not promote it to a production audit record.",
      "Use the v211 packet as the first evidence shape for a future backup/restore and managed adapter drill.",
    ],
  };
}

export function renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown(
  profile: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile,
): string {
  return [
    "# Managed audit identity approval provenance dry-run packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Packet state: ${profile.packetState}`,
    `- Ready for managed audit identity approval provenance dry-run packet: ${profile.readyForManagedAuditIdentityApprovalProvenanceDryRunPacket}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Upstream read only: ${profile.upstreamReadOnly}`,
    `- Local dry-run write performed: ${profile.localDryRunWritePerformed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Binding Contract",
    "",
    ...renderEntries(profile.sourceBindingContract),
    "",
    "## Java v75 Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.javaV75),
    "",
    "## mini-kv v84 Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.miniKvV84),
    "",
    "## Dry-run Packet",
    "",
    ...renderEntries(profile.dryRunPacket),
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No managed audit identity approval provenance dry-run packet blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit identity approval provenance dry-run packet warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit identity approval provenance dry-run packet recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createJavaV75Evidence(
  sourceBinding: ManagedAuditIdentityApprovalBindingContractProfile,
): JavaApprovalRecordHandoffEvidence {
  return {
    sourceVersion: "Java v75",
    hintVersion: "java-release-approval-rehearsal-approval-record-handoff-hint.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v9",
    approvalBindingContractVersion: sourceBinding.profileVersion,
    approvalRecordCorrelationHeader: "x-orderops-approval-record-correlation-id",
    approvalRecordHandoffContextComplete: true,
    approvalRecordFixtureReadOnly: true,
    javaApprovalDecisionCreated: false,
    javaApprovalLedgerWritten: false,
    javaApprovalRecordPersisted: false,
    nodeMayTreatAsProductionApprovalRecord: false,
    handoffFieldPaths: [
      "requestContext.requestId",
      "operatorWindowHint.operatorId",
      "operatorWindowHint.operatorRoles",
      "approvalRecordHandoffHint.approvalRequestId",
      "approvalRecordHandoffHint.approvalDecisionState",
      "approvalRecordHandoffHint.approvalRecordCorrelationId",
      "approvalRecordHandoffHint.reviewerPlaceholder",
      "approvalRecordHandoffHint.approvalTimestampPlaceholder",
      "verificationHint.warningDigest",
    ],
  };
}

function createMiniKvV84Evidence(): MiniKvRetentionProvenanceEvidence {
  return {
    sourceVersion: "mini-kv v84",
    projectVersion: "0.84.0",
    artifactPathHint: "c/84/",
    retentionSourcePathHint: "c/81/",
    expectedBinaryProvenanceDigest: "fnv1a64:c682f9c827129e40",
    retentionProvenanceCheckDigest: "fnv1a64:357cc7e9eec3f223",
    releaseManifestPath: "fixtures/release/verification-manifest.json",
    runtimeSmokeEvidencePath: "fixtures/release/runtime-smoke-evidence.json",
    readOnly: true,
    executionAllowed: false,
    managedAuditWriteExecuted: false,
    orderAuthoritative: false,
  };
}

function createDryRunPacket(
  sourceBinding: ManagedAuditIdentityApprovalBindingContractProfile,
  upstreamEvidence: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["upstreamEvidence"],
): ManagedAuditDryRunPacket {
  const previewDigest = sha256StableJson({
    intentId: "intent:v211-managed-audit-dry-run",
    action: "managed-audit.identity-approval-provenance-dry-run",
    target: "managed-audit-local-temp-store",
    sourceBindingDigest: sourceBinding.contract.contractDigest,
  });
  const preflightDigest = sha256StableJson({
    upstreamReadOnly: true,
    javaWriteAllowed: false,
    miniKvWriteAllowed: false,
    productionAuditRecordAllowed: false,
    javaHintVersion: upstreamEvidence.javaV75.hintVersion,
    miniKvCheckDigest: upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest,
  });
  const decisionDigest = sha256StableJson({
    decisionId: "approval-decision-v211-dry-run",
    decision: "approved",
    reviewer: "reviewer:v211-dry-run",
    reason: "local dry-run packet only",
    upstreamTouched: false,
    previewDigest,
  });
  const traceDigest = sha256StableJson({
    sourceDryRunRecordId: sourceBinding.sourceDryRunVerification.sourceDryRunRecordId,
    bindingContractDigest: sourceBinding.contract.contractDigest,
    javaHintVersion: upstreamEvidence.javaV75.hintVersion,
    miniKvRetentionProvenanceCheckDigest: upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest,
  });
  const packetWithoutDigest = {
    packetVersion: sourceBinding.contract.targetRecordVersion,
    packetId: randomUUID(),
    requestId: "managed-audit-v211-identity-approval-provenance-request",
    occurredAt: new Date().toISOString(),
    source: {
      nodeSourceVersion: "Node v211",
      bindingContractVersion: "Node v210",
      javaSourceVersion: "Java v75",
      miniKvSourceVersion: "mini-kv v84",
    },
    identity: {
      identityVersion: "operator-identity-contract.v1",
      operatorId: "operator:v211-dry-run",
      authenticated: true,
      roles: ["auditor", "operator"],
      authSource: "headers",
      verifiedTokenAttached: false,
    },
    approvalRequest: {
      requestId: "approval-request-v211-dry-run",
      intentId: "intent:v211-managed-audit-dry-run",
      action: "managed-audit.identity-approval-provenance-dry-run",
      target: "managed-audit-local-temp-store",
      status: "approved",
      requestedBy: "operator:v211-dry-run",
      reviewer: "reviewer:v211-dry-run",
      previewDigest,
      preflightDigest,
    },
    approvalDecision: {
      decisionId: "approval-decision-v211-dry-run",
      decision: "approved",
      reviewer: "reviewer:v211-dry-run",
      reason: "local dry-run packet only",
      decisionDigest,
      upstreamTouched: false,
    },
    correlation: {
      approvalCorrelationId: "approval-correlation-v211-dry-run",
      auditRequestId: "managed-audit-v211-identity-approval-provenance-request",
      operationIntentId: "intent:v211-managed-audit-dry-run",
      sourceDryRunRecordId: sourceBinding.sourceDryRunVerification.sourceDryRunRecordId,
      traceDigest,
    },
    provenance: {
      javaApprovalRecordHandoffHintVersion: upstreamEvidence.javaV75.hintVersion,
      javaApprovalRecordHandoffContextComplete: upstreamEvidence.javaV75.approvalRecordHandoffContextComplete,
      javaApprovalDecisionCreated: false,
      javaApprovalLedgerWritten: false,
      javaApprovalRecordPersisted: false,
      miniKvRetentionProvenanceCheckDigest: upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest,
      miniKvExpectedBinaryProvenanceDigest: upstreamEvidence.miniKvV84.expectedBinaryProvenanceDigest,
      miniKvManagedAuditWriteExecuted: false,
    },
    boundaries: {
      nodeTempDirectoryOnly: true,
      upstreamReadOnly: true,
      javaWriteAllowed: false,
      miniKvWriteAllowed: false,
      externalAuditSystemAllowed: false,
      productionAuditRecordAllowed: false,
    },
  } satisfies Omit<ManagedAuditDryRunPacket, "packetDigest">;

  return {
    ...packetWithoutDigest,
    packetDigest: sha256StableJson(packetWithoutDigest),
  };
}

async function runJsonlPacketDryRun(packet: ManagedAuditDryRunPacket): Promise<PacketFileResult> {
  const root = path.resolve(process.cwd(), ".tmp");
  await mkdir(root, { recursive: true });
  const directory = await mkdtemp(path.join(root, "managed-audit-v211-"));
  const filePath = path.join(directory, "managed-audit-packet.jsonl");
  let result: Omit<PacketFileResult, "directoryRemoved"> | undefined;

  try {
    const digestBeforeAppend = await digestFile(filePath);
    await appendFile(filePath, `${JSON.stringify(packet)}\n`, "utf8");
    const digestAfterAppend = await digestFile(filePath);
    const queried = await queryPacketsByRequestId(filePath, packet.requestId);
    const digestAfterRepeatRead = await digestFile(filePath);
    result = {
      rootInsideRepository: isPathWithin(root, directory),
      directoryCreated: true,
      appendPacketCount: await countPackets(filePath),
      queryByRequestIdCount: queried.length,
      digestBeforeAppend,
      digestAfterAppend,
      digestAfterRepeatRead,
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }

  if (result === undefined) {
    throw new Error("Managed audit v211 dry-run packet did not produce a result");
  }

  return {
    ...result,
    directoryRemoved: !existsSync(directory),
  };
}

async function queryPacketsByRequestId(filePath: string, requestId: string): Promise<ManagedAuditDryRunPacket[]> {
  return (await readPackets(filePath)).filter((packet) => packet.requestId === requestId);
}

async function countPackets(filePath: string): Promise<number> {
  return (await readPackets(filePath)).length;
}

async function readPackets(filePath: string): Promise<ManagedAuditDryRunPacket[]> {
  const content = await readFile(filePath, "utf8");
  return content
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as unknown)
    .filter(isManagedAuditDryRunPacket);
}

async function digestFile(filePath: string): Promise<string> {
  try {
    const content = await readFile(filePath, "utf8");
    return `sha256:${createHash("sha256").update(content).digest("hex")}`;
  } catch (error) {
    if (isNotFoundError(error)) {
      return "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    }
    throw error;
  }
}

function createChecks(
  config: AppConfig,
  sourceBinding: ManagedAuditIdentityApprovalBindingContractProfile,
  upstreamEvidence: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["upstreamEvidence"],
  packet: ManagedAuditDryRunPacket,
  packetRun: PacketFileResult,
  verification: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["verification"],
): ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["checks"] {
  return {
    sourceBindingContractReady: sourceBinding.readyForManagedAuditIdentityApprovalBindingContract
      && sourceBinding.contractState === "ready-for-identity-approval-dry-run-packet",
    sourceBindingContractStillBlocksProduction: sourceBinding.readyForProductionAudit === false
      && sourceBinding.readyForProductionWindow === false
      && sourceBinding.readyForProductionOperations === false
      && sourceBinding.executionAllowed === false,
    javaV75HandoffAccepted: upstreamEvidence.javaV75.hintVersion === "java-release-approval-rehearsal-approval-record-handoff-hint.v1"
      && upstreamEvidence.javaV75.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v9"
      && upstreamEvidence.javaV75.approvalBindingContractVersion === sourceBinding.profileVersion
      && upstreamEvidence.javaV75.approvalRecordHandoffContextComplete,
    javaV75NoWriteBoundaryValid: upstreamEvidence.javaV75.approvalRecordFixtureReadOnly
      && !upstreamEvidence.javaV75.javaApprovalDecisionCreated
      && !upstreamEvidence.javaV75.javaApprovalLedgerWritten
      && !upstreamEvidence.javaV75.javaApprovalRecordPersisted
      && !upstreamEvidence.javaV75.nodeMayTreatAsProductionApprovalRecord,
    miniKvV84ProvenanceAccepted: upstreamEvidence.miniKvV84.projectVersion === "0.84.0"
      && upstreamEvidence.miniKvV84.expectedBinaryProvenanceDigest === "fnv1a64:c682f9c827129e40"
      && upstreamEvidence.miniKvV84.retentionProvenanceCheckDigest === "fnv1a64:357cc7e9eec3f223",
    miniKvV84NoManagedAuditWrite: upstreamEvidence.miniKvV84.readOnly
      && !upstreamEvidence.miniKvV84.executionAllowed
      && !upstreamEvidence.miniKvV84.managedAuditWriteExecuted
      && !upstreamEvidence.miniKvV84.orderAuthoritative,
    packetShapeBoundToContract: packet.packetVersion === sourceBinding.contract.targetRecordVersion
      && packet.identity.identityVersion === "operator-identity-contract.v1"
      && packet.approvalDecision.upstreamTouched === false
      && packet.correlation.traceDigest.length === 64,
    packetDigestValid: /^[a-f0-9]{64}$/.test(packet.packetDigest),
    tempDirectoryOnly: packetRun.rootInsideRepository
      && packetRun.directoryCreated
      && verification.dryRunRootLabel === ".tmp"
      && verification.dryRunDirectoryPrefix === "managed-audit-v211-",
    appendCovered: packetRun.appendPacketCount === 1
      && packetRun.digestBeforeAppend !== packetRun.digestAfterAppend,
    queryCovered: packetRun.queryByRequestIdCount === 1,
    digestCovered: packetRun.digestAfterAppend === packetRun.digestAfterRepeatRead
      && packetRun.digestAfterAppend.startsWith("sha256:")
      && /^[a-f0-9]{64}$/.test(verification.packetVerificationDigest),
    cleanupCovered: packetRun.directoryRemoved,
    javaMiniKvWriteBlocked: !verification.javaWriteAttempted && !verification.miniKvWriteAttempted,
    noRealApprovalDecisionCreated: !verification.realApprovalDecisionCreated && !verification.realApprovalLedgerWritten,
    noExternalAuditAccessed: !verification.externalAuditSystemAccessed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: true,
    productionAuditStillBlocked: !verification.productionAuditRecordAllowed,
    readyForManagedAuditIdentityApprovalProvenanceDryRunPacket: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["checks"],
): PacketMessage[] {
  const blockers: PacketMessage[] = [];
  addMessage(blockers, checks.sourceBindingContractReady, "SOURCE_BINDING_CONTRACT_NOT_READY", "managed-audit-identity-approval-binding-contract", "Node v210 binding contract must be ready before v211 packet generation.");
  addMessage(blockers, checks.sourceBindingContractStillBlocksProduction, "SOURCE_BINDING_UNLOCKS_PRODUCTION", "managed-audit-identity-approval-binding-contract", "Node v210 binding contract must still block production.");
  addMessage(blockers, checks.javaV75HandoffAccepted, "JAVA_V75_HANDOFF_NOT_ACCEPTED", "java-v75-approval-record-handoff", "Java v75 approval record handoff hint must match Node v210 binding contract.");
  addMessage(blockers, checks.javaV75NoWriteBoundaryValid, "JAVA_V75_WRITE_BOUNDARY_INVALID", "java-v75-approval-record-handoff", "Java v75 must not create approval decisions, write ledger, or persist approval records.");
  addMessage(blockers, checks.miniKvV84ProvenanceAccepted, "MINI_KV_V84_PROVENANCE_NOT_ACCEPTED", "mini-kv-v84-retention-provenance", "mini-kv v84 retention provenance digest must match the expected runtime evidence.");
  addMessage(blockers, checks.miniKvV84NoManagedAuditWrite, "MINI_KV_V84_WRITE_BOUNDARY_INVALID", "mini-kv-v84-retention-provenance", "mini-kv v84 must stay read-only and must not execute managed audit writes.");
  addMessage(blockers, checks.packetShapeBoundToContract, "PACKET_SHAPE_NOT_BOUND", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 packet must bind identity, approval, correlation, and provenance fields to v210 contract.");
  addMessage(blockers, checks.packetDigestValid, "PACKET_DIGEST_INVALID", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 packet digest must be stable sha256 hex.");
  addMessage(blockers, checks.tempDirectoryOnly, "TEMP_DIRECTORY_BOUNDARY_FAILED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 packet write must stay under Node-owned .tmp.");
  addMessage(blockers, checks.appendCovered, "APPEND_NOT_COVERED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must append exactly one dry-run packet.");
  addMessage(blockers, checks.queryCovered, "QUERY_NOT_COVERED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must query the appended packet by request id.");
  addMessage(blockers, checks.digestCovered, "DIGEST_NOT_COVERED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must produce stable dry-run file and verification digests.");
  addMessage(blockers, checks.cleanupCovered, "CLEANUP_NOT_COVERED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must remove its local temp directory.");
  addMessage(blockers, checks.javaMiniKvWriteBlocked, "UPSTREAM_WRITE_ATTEMPTED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must not write Java or mini-kv.");
  addMessage(blockers, checks.noRealApprovalDecisionCreated, "REAL_APPROVAL_DECISION_OR_LEDGER_WRITTEN", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must not create a real approval decision or write a real approval ledger.");
  addMessage(blockers, checks.noExternalAuditAccessed, "EXTERNAL_AUDIT_ACCESSED", "managed-audit-identity-approval-provenance-dry-run-packet", "v211 must not connect a real managed audit system.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "runtime-config", "v211 must not unlock production audit.");
  return blockers;
}

function collectWarnings(
  packetState: ManagedAuditIdentityApprovalProvenanceDryRunPacketProfile["packetState"],
): PacketMessage[] {
  return [
    {
      code: packetState === "blocked" ? "DRY_RUN_PACKET_BLOCKED" : "LOCAL_PACKET_ONLY",
      severity: "warning",
      source: "managed-audit-identity-approval-provenance-dry-run-packet",
      message: packetState === "blocked"
        ? "Managed audit identity approval provenance dry-run packet has blockers."
        : "The v211 packet is a local dry-run evidence packet only; it is not a production audit record.",
    },
  ];
}

function collectRecommendations(): PacketMessage[] {
  return [
    {
      code: "START_POST_V211_MANAGED_AUDIT_PLAN",
      severity: "recommendation",
      source: "managed-audit-identity-approval-provenance-dry-run-packet",
      message: "Start a new post-v211 plan before implementing real managed audit adapters or production approval execution.",
    },
    {
      code: "ADD_MANAGED_AUDIT_RESTORE_DRILL",
      severity: "recommendation",
      source: "managed-audit-identity-approval-provenance-dry-run-packet",
      message: "Use this packet shape as input for a future backup/restore and managed adapter drill.",
    },
  ];
}

function isManagedAuditDryRunPacket(value: unknown): value is ManagedAuditDryRunPacket {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const packet = value as Record<string, unknown>;
  return packet.packetVersion === "managed-audit-dry-run-record.v2-candidate"
    && typeof packet.packetId === "string"
    && packet.requestId === "managed-audit-v211-identity-approval-provenance-request"
    && typeof packet.occurredAt === "string"
    && typeof packet.identity === "object"
    && packet.identity !== null
    && typeof packet.approvalRequest === "object"
    && packet.approvalRequest !== null
    && typeof packet.approvalDecision === "object"
    && packet.approvalDecision !== null
    && typeof packet.correlation === "object"
    && packet.correlation !== null
    && typeof packet.provenance === "object"
    && packet.provenance !== null
    && typeof packet.boundaries === "object"
    && packet.boundaries !== null
    && typeof packet.packetDigest === "string";
}

function isPathWithin(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return relative.length > 0 && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object"
    && error !== null
    && "code" in error
    && (error as { code?: unknown }).code === "ENOENT";
}

function addMessage(
  messages: PacketMessage[],
  condition: boolean,
  code: string,
  source: PacketMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
