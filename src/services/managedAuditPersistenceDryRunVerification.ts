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
  loadManagedAuditPersistenceBoundaryCandidate,
  type ManagedAuditPersistenceBoundaryCandidateProfile,
} from "./managedAuditPersistenceBoundaryCandidate.js";

export interface ManagedAuditPersistenceDryRunVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-persistence-dry-run-verification.v1";
  verificationState: "dry-run-verified" | "blocked";
  readyForManagedAuditPersistenceDryRunVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  upstreamReadOnly: true;
  localDryRunWritePerformed: true;
  executionAllowed: false;
  sourceCandidate: {
    profileVersion: ManagedAuditPersistenceBoundaryCandidateProfile["profileVersion"];
    candidateState: ManagedAuditPersistenceBoundaryCandidateProfile["candidateState"];
    candidateDigest: string;
    javaHandoffHintVersion: string;
    miniKvProvenanceDigest: string;
  };
  dryRunRecord: DryRunAuditRecord;
  verification: {
    dryRunRootLabel: ".tmp";
    dryRunDirectoryPrefix: "managed-audit-v209-";
    dryRunDirectoryCreated: boolean;
    dryRunDirectoryRemoved: boolean;
    dryRunFileName: "audit-dry-run.jsonl";
    appendRecordCount: number;
    queryByRequestIdCount: number;
    digestBeforeAppend: string;
    digestAfterAppend: string;
    digestAfterRepeatRead: string;
    verificationDigest: string;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    externalAuditSystemAccessed: false;
    productionAuditRecordAllowed: false;
  };
  checks: {
    sourceCandidateReady: boolean;
    sourceCandidateDigestValid: boolean;
    sourceCandidateStillBlocksProduction: boolean;
    tempDirectoryOnly: boolean;
    appendCovered: boolean;
    queryCovered: boolean;
    digestCovered: boolean;
    cleanupCovered: boolean;
    javaMiniKvWriteBlocked: boolean;
    externalAuditSystemNotAccessed: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditPersistenceDryRunVerification: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    appendRecordCount: number;
    queryResultCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: DryRunMessage[];
  warnings: DryRunMessage[];
  recommendations: DryRunMessage[];
  evidenceEndpoints: {
    managedAuditPersistenceDryRunVerificationJson: string;
    managedAuditPersistenceDryRunVerificationMarkdown: string;
    sourceManagedAuditPersistenceBoundaryCandidateJson: string;
    sourceManagedAuditPersistenceBoundaryCandidateMarkdown: string;
    javaV74HandoffHint: string;
    miniKvV83RuntimeSmokeEvidence: string;
  };
  nextActions: string[];
}

export interface DryRunAuditRecord {
  recordVersion: "managed-audit-dry-run-record.v1";
  recordId: string;
  requestId: "managed-audit-dry-run-v209-request";
  operatorId: "operator:v209-dry-run";
  eventType: "MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST";
  occurredAt: string;
  source: {
    nodeSourceVersion: "Node v209";
    candidateSourceVersion: "Node v208";
    javaSourceVersion: "Java v74";
    miniKvSourceVersion: "mini-kv v83";
  };
  boundaries: {
    nodeTempDirectoryOnly: true;
    upstreamReadOnly: true;
    javaWriteAllowed: false;
    miniKvWriteAllowed: false;
    externalAuditSystemAllowed: false;
    productionAuditRecordAllowed: false;
  };
  payloadDigest: string;
}

interface DryRunMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-persistence-dry-run-verification"
    | "managed-audit-persistence-boundary-candidate"
    | "runtime-config";
  message: string;
}

interface DryRunFileResult {
  rootInsideRepository: boolean;
  directoryCreated: boolean;
  directoryRemoved: boolean;
  appendRecordCount: number;
  queryByRequestIdCount: number;
  digestBeforeAppend: string;
  digestAfterAppend: string;
  digestAfterRepeatRead: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditPersistenceDryRunVerificationJson: "/api/v1/audit/managed-persistence-dry-run-verification",
  managedAuditPersistenceDryRunVerificationMarkdown: "/api/v1/audit/managed-persistence-dry-run-verification?format=markdown",
  sourceManagedAuditPersistenceBoundaryCandidateJson: "/api/v1/audit/managed-persistence-boundary-candidate",
  sourceManagedAuditPersistenceBoundaryCandidateMarkdown: "/api/v1/audit/managed-persistence-boundary-candidate?format=markdown",
  javaV74HandoffHint: "D:/javaproj/advanced-order-platform/c/74/",
  miniKvV83RuntimeSmokeEvidence: "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
});

export async function loadManagedAuditPersistenceDryRunVerification(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ManagedAuditPersistenceDryRunVerificationProfile> {
  const sourceCandidate = await loadManagedAuditPersistenceBoundaryCandidate({
    config: input.config,
    runtime: input.runtime,
    auditLog: input.auditLog,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const record = createDryRunRecord(sourceCandidate);
  const dryRun = await runJsonlDryRun(record);
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-persistence-dry-run-verification.v1",
    sourceCandidateDigest: sourceCandidate.candidate.candidateDigest,
    recordDigest: record.payloadDigest,
    appendRecordCount: dryRun.appendRecordCount,
    queryByRequestIdCount: dryRun.queryByRequestIdCount,
    digestAfterAppend: dryRun.digestAfterAppend,
    directoryRemoved: dryRun.directoryRemoved,
    javaWriteAttempted: false,
    miniKvWriteAttempted: false,
    externalAuditSystemAccessed: false,
    productionAuditRecordAllowed: false,
  });
  const verification = {
    dryRunRootLabel: ".tmp" as const,
    dryRunDirectoryPrefix: "managed-audit-v209-" as const,
    dryRunDirectoryCreated: dryRun.directoryCreated,
    dryRunDirectoryRemoved: dryRun.directoryRemoved,
    dryRunFileName: "audit-dry-run.jsonl" as const,
    appendRecordCount: dryRun.appendRecordCount,
    queryByRequestIdCount: dryRun.queryByRequestIdCount,
    digestBeforeAppend: dryRun.digestBeforeAppend,
    digestAfterAppend: dryRun.digestAfterAppend,
    digestAfterRepeatRead: dryRun.digestAfterRepeatRead,
    verificationDigest,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    externalAuditSystemAccessed: false as const,
    productionAuditRecordAllowed: false as const,
  };
  const checks = createChecks(input.config, sourceCandidate, dryRun, verification);
  checks.readyForManagedAuditPersistenceDryRunVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditPersistenceDryRunVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditPersistenceDryRunVerification ? "dry-run-verified" : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(verificationState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit persistence dry-run verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-persistence-dry-run-verification.v1",
    verificationState,
    readyForManagedAuditPersistenceDryRunVerification: checks.readyForManagedAuditPersistenceDryRunVerification,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    upstreamReadOnly: true,
    localDryRunWritePerformed: true,
    executionAllowed: false,
    sourceCandidate: {
      profileVersion: sourceCandidate.profileVersion,
      candidateState: sourceCandidate.candidateState,
      candidateDigest: sourceCandidate.candidate.candidateDigest,
      javaHandoffHintVersion: sourceCandidate.candidate.javaHandoffHintVersion,
      miniKvProvenanceDigest: sourceCandidate.candidate.miniKvProvenanceDigest,
    },
    dryRunRecord: record,
    verification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      appendRecordCount: dryRun.appendRecordCount,
      queryResultCount: dryRun.queryByRequestIdCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use Node v210 to bind operator identity and manual approval record fields to this dry-run audit record shape.",
      "Keep Java and mini-kv as read-only evidence sources while v209 is only a local dry-run verification.",
      "Do not connect a real managed audit adapter until identity, approval, retention, and restore drills have dedicated evidence.",
    ],
  };
}

export function renderManagedAuditPersistenceDryRunVerificationMarkdown(
  profile: ManagedAuditPersistenceDryRunVerificationProfile,
): string {
  return [
    "# Managed audit persistence dry-run verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for managed audit persistence dry-run verification: ${profile.readyForManagedAuditPersistenceDryRunVerification}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Upstream read only: ${profile.upstreamReadOnly}`,
    `- Local dry-run write performed: ${profile.localDryRunWritePerformed}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Candidate",
    "",
    ...renderEntries(profile.sourceCandidate),
    "",
    "## Dry-run Record",
    "",
    ...renderEntries(profile.dryRunRecord),
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
    ...renderMessages(profile.productionBlockers, "No managed audit persistence dry-run verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit persistence dry-run verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit persistence dry-run verification recommendations."),
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

function createDryRunRecord(sourceCandidate: ManagedAuditPersistenceBoundaryCandidateProfile): DryRunAuditRecord {
  const payloadDigest = sha256StableJson({
    sourceProfileVersion: sourceCandidate.profileVersion,
    sourceCandidateDigest: sourceCandidate.candidate.candidateDigest,
    javaHandoffHintVersion: sourceCandidate.candidate.javaHandoffHintVersion,
    miniKvProvenanceDigest: sourceCandidate.candidate.miniKvProvenanceDigest,
    requestId: "managed-audit-dry-run-v209-request",
    operatorId: "operator:v209-dry-run",
    eventType: "MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST",
  });

  return {
    recordVersion: "managed-audit-dry-run-record.v1",
    recordId: randomUUID(),
    requestId: "managed-audit-dry-run-v209-request",
    operatorId: "operator:v209-dry-run",
    eventType: "MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST",
    occurredAt: new Date().toISOString(),
    source: {
      nodeSourceVersion: "Node v209",
      candidateSourceVersion: "Node v208",
      javaSourceVersion: "Java v74",
      miniKvSourceVersion: "mini-kv v83",
    },
    boundaries: {
      nodeTempDirectoryOnly: true,
      upstreamReadOnly: true,
      javaWriteAllowed: false,
      miniKvWriteAllowed: false,
      externalAuditSystemAllowed: false,
      productionAuditRecordAllowed: false,
    },
    payloadDigest,
  };
}

async function runJsonlDryRun(record: DryRunAuditRecord): Promise<DryRunFileResult> {
  const root = path.resolve(process.cwd(), ".tmp");
  await mkdir(root, { recursive: true });
  const directory = await mkdtemp(path.join(root, "managed-audit-v209-"));
  const filePath = path.join(directory, "audit-dry-run.jsonl");
  let result: Omit<DryRunFileResult, "directoryRemoved"> | undefined;

  try {
    const digestBeforeAppend = await digestFile(filePath);
    await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
    const digestAfterAppend = await digestFile(filePath);
    const queried = await queryRecordsByRequestId(filePath, record.requestId);
    const digestAfterRepeatRead = await digestFile(filePath);
    result = {
      rootInsideRepository: isPathWithin(root, directory),
      directoryCreated: true,
      appendRecordCount: await countRecords(filePath),
      queryByRequestIdCount: queried.length,
      digestBeforeAppend,
      digestAfterAppend,
      digestAfterRepeatRead,
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }

  if (result === undefined) {
    throw new Error("Managed audit dry-run did not produce a result");
  }

  return {
    ...result,
    directoryRemoved: !existsSync(directory),
  };
}

async function queryRecordsByRequestId(filePath: string, requestId: string): Promise<DryRunAuditRecord[]> {
  return (await readRecords(filePath)).filter((record) => record.requestId === requestId);
}

async function countRecords(filePath: string): Promise<number> {
  return (await readRecords(filePath)).length;
}

async function readRecords(filePath: string): Promise<DryRunAuditRecord[]> {
  const content = await readFile(filePath, "utf8");
  return content
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as unknown)
    .filter(isDryRunAuditRecord);
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
  sourceCandidate: ManagedAuditPersistenceBoundaryCandidateProfile,
  dryRun: DryRunFileResult,
  verification: ManagedAuditPersistenceDryRunVerificationProfile["verification"],
): ManagedAuditPersistenceDryRunVerificationProfile["checks"] {
  return {
    sourceCandidateReady: sourceCandidate.readyForManagedAuditPersistenceBoundaryCandidate
      && sourceCandidate.candidateState === "ready-for-managed-audit-dry-run",
    sourceCandidateDigestValid: /^[a-f0-9]{64}$/.test(sourceCandidate.candidate.candidateDigest),
    sourceCandidateStillBlocksProduction: sourceCandidate.readyForProductionAudit === false
      && sourceCandidate.readyForProductionWindow === false
      && sourceCandidate.readyForProductionOperations === false
      && sourceCandidate.executionAllowed === false,
    tempDirectoryOnly: dryRun.rootInsideRepository
      && dryRun.directoryCreated
      && verification.dryRunRootLabel === ".tmp"
      && verification.dryRunDirectoryPrefix === "managed-audit-v209-",
    appendCovered: dryRun.appendRecordCount === 1
      && dryRun.digestBeforeAppend !== dryRun.digestAfterAppend,
    queryCovered: dryRun.queryByRequestIdCount === 1,
    digestCovered: dryRun.digestAfterAppend === dryRun.digestAfterRepeatRead
      && dryRun.digestAfterAppend.startsWith("sha256:")
      && /^[a-f0-9]{64}$/.test(verification.verificationDigest),
    cleanupCovered: dryRun.directoryRemoved,
    javaMiniKvWriteBlocked: !verification.javaWriteAttempted && !verification.miniKvWriteAttempted,
    externalAuditSystemNotAccessed: !verification.externalAuditSystemAccessed,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: true,
    productionAuditStillBlocked: !verification.productionAuditRecordAllowed,
    readyForManagedAuditPersistenceDryRunVerification: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditPersistenceDryRunVerificationProfile["checks"],
): DryRunMessage[] {
  const blockers: DryRunMessage[] = [];
  addMessage(blockers, checks.sourceCandidateReady, "SOURCE_CANDIDATE_NOT_READY", "managed-audit-persistence-boundary-candidate", "Node v208 boundary candidate must be ready before v209 dry-run verification.");
  addMessage(blockers, checks.sourceCandidateDigestValid, "SOURCE_CANDIDATE_DIGEST_INVALID", "managed-audit-persistence-boundary-candidate", "Node v208 candidate digest must be a stable sha256 hex digest.");
  addMessage(blockers, checks.sourceCandidateStillBlocksProduction, "SOURCE_CANDIDATE_UNLOCKS_PRODUCTION", "managed-audit-persistence-boundary-candidate", "Node v208 candidate must still block production audit and production operations.");
  addMessage(blockers, checks.tempDirectoryOnly, "TEMP_DIRECTORY_BOUNDARY_FAILED", "managed-audit-persistence-dry-run-verification", "v209 dry-run writes must stay under the Node-owned .tmp directory.");
  addMessage(blockers, checks.appendCovered, "APPEND_NOT_COVERED", "managed-audit-persistence-dry-run-verification", "v209 must append exactly one dry-run audit record and change the JSONL digest.");
  addMessage(blockers, checks.queryCovered, "QUERY_NOT_COVERED", "managed-audit-persistence-dry-run-verification", "v209 must query the appended record by request id.");
  addMessage(blockers, checks.digestCovered, "DIGEST_NOT_COVERED", "managed-audit-persistence-dry-run-verification", "v209 must produce stable dry-run file and verification digests.");
  addMessage(blockers, checks.cleanupCovered, "CLEANUP_NOT_COVERED", "managed-audit-persistence-dry-run-verification", "v209 must remove its dry-run temp directory.");
  addMessage(blockers, checks.javaMiniKvWriteBlocked, "UPSTREAM_WRITE_ATTEMPTED", "managed-audit-persistence-dry-run-verification", "v209 must not write Java or mini-kv.");
  addMessage(blockers, checks.externalAuditSystemNotAccessed, "EXTERNAL_AUDIT_ACCESSED", "managed-audit-persistence-dry-run-verification", "v209 must not connect a real managed audit system.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "runtime-config", "v209 must not unlock production audit.");
  return blockers;
}

function collectWarnings(
  verificationState: ManagedAuditPersistenceDryRunVerificationProfile["verificationState"],
): DryRunMessage[] {
  return [
    {
      code: verificationState === "blocked" ? "DRY_RUN_VERIFICATION_BLOCKED" : "LOCAL_DRY_RUN_ONLY",
      severity: "warning",
      source: "managed-audit-persistence-dry-run-verification",
      message: verificationState === "blocked"
        ? "Managed audit persistence dry-run verification has blockers."
        : "append-query-digest-cleanup is verified only in a Node local temporary directory; production managed audit remains blocked.",
    },
  ];
}

function collectRecommendations(): DryRunMessage[] {
  return [
    {
      code: "START_NODE_V210_IDENTITY_APPROVAL_BINDING",
      severity: "recommendation",
      source: "managed-audit-persistence-dry-run-verification",
      message: "Use Node v210 to bind operator identity and manual approval fields to the dry-run audit record shape.",
    },
    {
      code: "KEEP_REAL_MANAGED_AUDIT_DISCONNECTED",
      severity: "recommendation",
      source: "managed-audit-persistence-dry-run-verification",
      message: "Keep real managed audit storage disconnected until identity, approval, restore, and retention evidence exist.",
    },
  ];
}

function isDryRunAuditRecord(value: unknown): value is DryRunAuditRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.recordVersion === "managed-audit-dry-run-record.v1"
    && typeof record.recordId === "string"
    && record.requestId === "managed-audit-dry-run-v209-request"
    && record.operatorId === "operator:v209-dry-run"
    && record.eventType === "MANAGED_AUDIT_DRY_RUN_APPEND_QUERY_DIGEST"
    && typeof record.occurredAt === "string"
    && typeof record.source === "object"
    && record.source !== null
    && typeof record.boundaries === "object"
    && record.boundaries !== null
    && typeof record.payloadDigest === "string";
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
  messages: DryRunMessage[],
  condition: boolean,
  code: string,
  source: DryRunMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
