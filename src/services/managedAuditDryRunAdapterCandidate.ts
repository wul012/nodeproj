import { createHash, randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { appendFile, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditRestoreDrillArchiveVerification,
  type ManagedAuditRestoreDrillArchiveVerificationProfile,
} from "./managedAuditRestoreDrillArchiveVerification.js";

export interface ManagedAuditDryRunAdapterCandidateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-dry-run-adapter-candidate.v1";
  candidateState: "local-dry-run-adapter-verified" | "blocked";
  readyForManagedAuditDryRunAdapterCandidate: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  upstreamReadOnly: true;
  localDryRunWritePerformed: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  sourceArchiveVerification: {
    profileVersion: ManagedAuditRestoreDrillArchiveVerificationProfile["profileVersion"];
    verificationState: ManagedAuditRestoreDrillArchiveVerificationProfile["verificationState"];
    verificationDigest: string;
    sourceVersion: "Node v213";
    archiveVerificationVersion: "Node v214";
  };
  upstreamReceipts: {
    javaV77: JavaV77ManagedAuditAdapterBoundaryReceipt;
    miniKvV86: MiniKvV86ManagedAuditAdapterRestoreBoundaryReceipt;
  };
  dryRunAdapterRecord: ManagedAuditDryRunAdapterRecord;
  verification: {
    dryRunRootLabel: ".tmp";
    dryRunDirectoryPrefix: "managed-audit-v215-";
    dryRunDirectoryCreated: boolean;
    dryRunDirectoryRemoved: boolean;
    dryRunFileName: "managed-audit-adapter-candidate.jsonl";
    appendRecordCount: number;
    queryByRequestIdCount: number;
    digestBeforeAppend: string;
    digestAfterAppend: string;
    digestAfterRepeatRead: string;
    adapterVerificationDigest: string;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    externalAuditSystemAccessed: false;
    realApprovalDecisionCreated: false;
    realApprovalLedgerWritten: false;
    restoreExecuted: false;
    productionAuditRecordAllowed: false;
  };
  checks: {
    sourceArchiveVerificationReady: boolean;
    sourceArchiveStillBlocksProduction: boolean;
    javaV77ReceiptAccepted: boolean;
    javaV77NoWriteBoundaryValid: boolean;
    miniKvV86ReceiptAccepted: boolean;
    miniKvV86NoRestoreBoundaryValid: boolean;
    adapterRecordShapeValid: boolean;
    adapterDigestValid: boolean;
    tempDirectoryOnly: boolean;
    appendCovered: boolean;
    queryCovered: boolean;
    digestCovered: boolean;
    cleanupCovered: boolean;
    javaMiniKvWriteBlocked: boolean;
    noRealApprovalDecisionCreated: boolean;
    noExternalManagedAuditAccessed: boolean;
    restoreStillBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditDryRunAdapterCandidate: boolean;
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
  productionBlockers: AdapterCandidateMessage[];
  warnings: AdapterCandidateMessage[];
  recommendations: AdapterCandidateMessage[];
  evidenceEndpoints: {
    managedAuditDryRunAdapterCandidateJson: string;
    managedAuditDryRunAdapterCandidateMarkdown: string;
    sourceArchiveVerificationJson: string;
    javaV77ReceiptHint: string;
    miniKvV86ReceiptHint: string;
  };
  nextActions: string[];
}

interface JavaV77ManagedAuditAdapterBoundaryReceipt {
  sourceVersion: "Java v77";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-boundary-receipt.v1";
  consumedByNodeArchiveVerificationVersion: "Node v214";
  consumedByNodeArchiveVerificationProfile: "managed-audit-restore-drill-archive-verification.v1";
  nextNodeCandidateVersion: "Node v215";
  nextNodeCandidateProfile: "managed-audit-dry-run-adapter-candidate.v1";
  nodeV215MayConsume: true;
  nodeV215MayWriteLocalDryRunFiles: true;
  nodeV215MayConnectManagedAudit: false;
  nodeV215MayCreateApprovalDecision: false;
  nodeV215MayWriteApprovalLedger: false;
  nodeV215MayPersistApprovalRecord: false;
  nodeV215MayExecuteSql: false;
  nodeV215MayTriggerDeployment: false;
  nodeV215MayTriggerRollback: false;
  nodeV215MayExecuteRestore: false;
  javaApprovalDecisionCreated: false;
  javaApprovalLedgerWritten: false;
  readyForNodeV215DryRunAdapterCandidate: true;
  receiptWarnings: [];
}

interface MiniKvV86ManagedAuditAdapterRestoreBoundaryReceipt {
  sourceVersion: "mini-kv v86";
  projectVersion: "0.86.0";
  receiptVersion: "mini-kv-managed-audit-adapter-restore-boundary-receipt.v1";
  consumer: "Node v215 managed audit dry-run adapter candidate";
  consumedBy: "Node v213 managed audit packet restore drill plan";
  consumedReleaseVersion: "v85";
  consumedArtifactPathHint: "c/85/";
  consumedMarkerDigest: "fnv1a64:1ea4570c967cfdb1";
  currentArtifactPathHint: "c/86/";
  receiptDigest: "fnv1a64:f39d8e3ef98654ea";
  adapterWriteAllowed: false;
  restoreExecutionAllowed: false;
  loadRestoreCompactExecuted: false;
  managedAuditWriteExecuted: false;
  orderAuthoritative: false;
  readyForNodeV215DryRunAdapterCandidate: true;
}

export interface ManagedAuditDryRunAdapterRecord {
  recordVersion: "managed-audit-dry-run-adapter-record.v1-candidate";
  recordId: string;
  requestId: "managed-audit-v215-dry-run-adapter-request";
  occurredAt: string;
  adapter: {
    adapterName: "node-local-jsonl-managed-audit-dry-run-adapter";
    adapterMode: "local-jsonl-dry-run-only";
    targetStore: "node-local-temp-file";
    sourceArchiveVerificationVersion: "Node v214";
    javaReceiptVersion: "Java v77";
    miniKvReceiptVersion: "mini-kv v86";
  };
  writeEnvelope: {
    operation: "append-managed-audit-dry-run-record";
    fileName: "managed-audit-adapter-candidate.jsonl";
    localTempOnly: true;
    productionStoreTouched: false;
    externalAuditSystemTouched: false;
  };
  approvalBoundary: {
    approvalDecisionCreated: false;
    approvalLedgerWritten: false;
    approvalRecordPersisted: false;
    javaSqlExecuted: false;
    deploymentTriggered: false;
    rollbackTriggered: false;
  };
  restoreBoundary: {
    miniKvLoadExecuted: false;
    miniKvCompactExecuted: false;
    miniKvSetnxexExecuted: false;
    miniKvRestoreExecuted: false;
    restoreExecuted: false;
  };
  boundaries: {
    upstreamReadOnly: true;
    nodeTempDirectoryOnly: true;
    javaWriteAllowed: false;
    miniKvWriteAllowed: false;
    externalAuditSystemAllowed: false;
    productionAuditRecordAllowed: false;
  };
  recordDigest: string;
}

interface AdapterCandidateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-dry-run-adapter-candidate"
    | "managed-audit-restore-drill-archive-verification"
    | "java-v77-managed-audit-adapter-boundary-receipt"
    | "mini-kv-v86-managed-audit-adapter-restore-boundary-receipt"
    | "runtime-config";
  message: string;
}

interface AdapterDryRunFileResult {
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
  managedAuditDryRunAdapterCandidateJson: "/api/v1/audit/managed-audit-dry-run-adapter-candidate",
  managedAuditDryRunAdapterCandidateMarkdown: "/api/v1/audit/managed-audit-dry-run-adapter-candidate?format=markdown",
  sourceArchiveVerificationJson: "/api/v1/audit/managed-audit-restore-drill-archive-verification",
  javaV77ReceiptHint: "D:/javaproj/advanced-order-platform/c/77/",
  miniKvV86ReceiptHint: "D:/C/mini-kv/c/86/",
});

export async function loadManagedAuditDryRunAdapterCandidate(input: {
  config: AppConfig;
}): Promise<ManagedAuditDryRunAdapterCandidateProfile> {
  const sourceArchive = loadManagedAuditRestoreDrillArchiveVerification({ config: input.config });
  const javaV77 = createJavaV77Receipt();
  const miniKvV86 = createMiniKvV86Receipt();
  const dryRunRecord = createDryRunAdapterRecord(sourceArchive, javaV77, miniKvV86);
  const adapterRun = await runLocalJsonlDryRunAdapter(dryRunRecord);
  const adapterVerificationDigest = sha256StableJson({
    profileVersion: "managed-audit-dry-run-adapter-candidate.v1",
    sourceArchiveVerificationDigest: sourceArchive.verification.verificationDigest,
    javaReceiptVersion: javaV77.receiptVersion,
    miniKvReceiptDigest: miniKvV86.receiptDigest,
    recordDigest: dryRunRecord.recordDigest,
    appendRecordCount: adapterRun.appendRecordCount,
    queryByRequestIdCount: adapterRun.queryByRequestIdCount,
    digestAfterAppend: adapterRun.digestAfterAppend,
    directoryRemoved: adapterRun.directoryRemoved,
    productionAuditRecordAllowed: false,
  });
  const verification = {
    dryRunRootLabel: ".tmp" as const,
    dryRunDirectoryPrefix: "managed-audit-v215-" as const,
    dryRunDirectoryCreated: adapterRun.directoryCreated,
    dryRunDirectoryRemoved: adapterRun.directoryRemoved,
    dryRunFileName: "managed-audit-adapter-candidate.jsonl" as const,
    appendRecordCount: adapterRun.appendRecordCount,
    queryByRequestIdCount: adapterRun.queryByRequestIdCount,
    digestBeforeAppend: adapterRun.digestBeforeAppend,
    digestAfterAppend: adapterRun.digestAfterAppend,
    digestAfterRepeatRead: adapterRun.digestAfterRepeatRead,
    adapterVerificationDigest,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    externalAuditSystemAccessed: false as const,
    realApprovalDecisionCreated: false as const,
    realApprovalLedgerWritten: false as const,
    restoreExecuted: false as const,
    productionAuditRecordAllowed: false as const,
  };
  const checks = createChecks(input.config, sourceArchive, javaV77, miniKvV86, dryRunRecord, adapterRun, verification);
  checks.readyForManagedAuditDryRunAdapterCandidate = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditDryRunAdapterCandidate")
    .every(([, value]) => value);
  const candidateState = checks.readyForManagedAuditDryRunAdapterCandidate
    ? "local-dry-run-adapter-verified"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(candidateState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit dry-run adapter candidate",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-dry-run-adapter-candidate.v1",
    candidateState,
    readyForManagedAuditDryRunAdapterCandidate: checks.readyForManagedAuditDryRunAdapterCandidate,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    upstreamReadOnly: true,
    localDryRunWritePerformed: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    automaticUpstreamStart: false,
    sourceArchiveVerification: {
      profileVersion: sourceArchive.profileVersion,
      verificationState: sourceArchive.verificationState,
      verificationDigest: sourceArchive.verification.verificationDigest,
      sourceVersion: "Node v213",
      archiveVerificationVersion: "Node v214",
    },
    upstreamReceipts: {
      javaV77,
      miniKvV86,
    },
    dryRunAdapterRecord: dryRunRecord,
    verification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      appendRecordCount: adapterRun.appendRecordCount,
      queryResultCount: adapterRun.queryByRequestIdCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Verify the v215 dry-run adapter archive before any attempt to connect a real managed audit store.",
      "Keep Java and mini-kv as read-only evidence sources while v215 only writes a Node-local temp JSONL record.",
      "Create a post-v215 plan for adapter verification and production hardening gates instead of promoting this candidate to production.",
    ],
  };
}

export function renderManagedAuditDryRunAdapterCandidateMarkdown(
  profile: ManagedAuditDryRunAdapterCandidateProfile,
): string {
  return [
    "# Managed audit dry-run adapter candidate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Candidate state: ${profile.candidateState}`,
    `- Ready for managed audit dry-run adapter candidate: ${profile.readyForManagedAuditDryRunAdapterCandidate}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Local dry-run write performed: ${profile.localDryRunWritePerformed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Restore execution allowed: ${profile.restoreExecutionAllowed}`,
    "",
    "## Source Archive Verification",
    "",
    ...renderEntries(profile.sourceArchiveVerification),
    "",
    "## Upstream Receipts",
    "",
    ...renderEntries(profile.upstreamReceipts.javaV77),
    "",
    ...renderEntries(profile.upstreamReceipts.miniKvV86),
    "",
    "## Dry-run Adapter Record",
    "",
    ...renderEntries(profile.dryRunAdapterRecord),
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
    ...renderMessages(profile.productionBlockers, "No managed audit dry-run adapter candidate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit dry-run adapter candidate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit dry-run adapter candidate recommendations."),
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

function createJavaV77Receipt(): JavaV77ManagedAuditAdapterBoundaryReceipt {
  return {
    sourceVersion: "Java v77",
    receiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-boundary-receipt.v1",
    consumedByNodeArchiveVerificationVersion: "Node v214",
    consumedByNodeArchiveVerificationProfile: "managed-audit-restore-drill-archive-verification.v1",
    nextNodeCandidateVersion: "Node v215",
    nextNodeCandidateProfile: "managed-audit-dry-run-adapter-candidate.v1",
    nodeV215MayConsume: true,
    nodeV215MayWriteLocalDryRunFiles: true,
    nodeV215MayConnectManagedAudit: false,
    nodeV215MayCreateApprovalDecision: false,
    nodeV215MayWriteApprovalLedger: false,
    nodeV215MayPersistApprovalRecord: false,
    nodeV215MayExecuteSql: false,
    nodeV215MayTriggerDeployment: false,
    nodeV215MayTriggerRollback: false,
    nodeV215MayExecuteRestore: false,
    javaApprovalDecisionCreated: false,
    javaApprovalLedgerWritten: false,
    readyForNodeV215DryRunAdapterCandidate: true,
    receiptWarnings: [],
  };
}

function createMiniKvV86Receipt(): MiniKvV86ManagedAuditAdapterRestoreBoundaryReceipt {
  return {
    sourceVersion: "mini-kv v86",
    projectVersion: "0.86.0",
    receiptVersion: "mini-kv-managed-audit-adapter-restore-boundary-receipt.v1",
    consumer: "Node v215 managed audit dry-run adapter candidate",
    consumedBy: "Node v213 managed audit packet restore drill plan",
    consumedReleaseVersion: "v85",
    consumedArtifactPathHint: "c/85/",
    consumedMarkerDigest: "fnv1a64:1ea4570c967cfdb1",
    currentArtifactPathHint: "c/86/",
    receiptDigest: "fnv1a64:f39d8e3ef98654ea",
    adapterWriteAllowed: false,
    restoreExecutionAllowed: false,
    loadRestoreCompactExecuted: false,
    managedAuditWriteExecuted: false,
    orderAuthoritative: false,
    readyForNodeV215DryRunAdapterCandidate: true,
  };
}

function createDryRunAdapterRecord(
  sourceArchive: ManagedAuditRestoreDrillArchiveVerificationProfile,
  javaV77: JavaV77ManagedAuditAdapterBoundaryReceipt,
  miniKvV86: MiniKvV86ManagedAuditAdapterRestoreBoundaryReceipt,
): ManagedAuditDryRunAdapterRecord {
  const recordWithoutDigest = {
    recordVersion: "managed-audit-dry-run-adapter-record.v1-candidate",
    requestId: "managed-audit-v215-dry-run-adapter-request",
    sourceArchiveVerificationDigest: sourceArchive.verification.verificationDigest,
    javaReceiptVersion: javaV77.receiptVersion,
    miniKvReceiptDigest: miniKvV86.receiptDigest,
    adapterMode: "local-jsonl-dry-run-only",
    productionStoreTouched: false,
    externalAuditSystemTouched: false,
    javaWriteAllowed: false,
    miniKvWriteAllowed: false,
    restoreExecuted: false,
  };
  return {
    recordVersion: "managed-audit-dry-run-adapter-record.v1-candidate",
    recordId: randomUUID(),
    requestId: "managed-audit-v215-dry-run-adapter-request",
    occurredAt: new Date().toISOString(),
    adapter: {
      adapterName: "node-local-jsonl-managed-audit-dry-run-adapter",
      adapterMode: "local-jsonl-dry-run-only",
      targetStore: "node-local-temp-file",
      sourceArchiveVerificationVersion: "Node v214",
      javaReceiptVersion: "Java v77",
      miniKvReceiptVersion: "mini-kv v86",
    },
    writeEnvelope: {
      operation: "append-managed-audit-dry-run-record",
      fileName: "managed-audit-adapter-candidate.jsonl",
      localTempOnly: true,
      productionStoreTouched: false,
      externalAuditSystemTouched: false,
    },
    approvalBoundary: {
      approvalDecisionCreated: false,
      approvalLedgerWritten: false,
      approvalRecordPersisted: false,
      javaSqlExecuted: false,
      deploymentTriggered: false,
      rollbackTriggered: false,
    },
    restoreBoundary: {
      miniKvLoadExecuted: false,
      miniKvCompactExecuted: false,
      miniKvSetnxexExecuted: false,
      miniKvRestoreExecuted: false,
      restoreExecuted: false,
    },
    boundaries: {
      upstreamReadOnly: true,
      nodeTempDirectoryOnly: true,
      javaWriteAllowed: false,
      miniKvWriteAllowed: false,
      externalAuditSystemAllowed: false,
      productionAuditRecordAllowed: false,
    },
    recordDigest: sha256StableJson(recordWithoutDigest),
  };
}

async function runLocalJsonlDryRunAdapter(record: ManagedAuditDryRunAdapterRecord): Promise<AdapterDryRunFileResult> {
  const root = path.resolve(process.cwd(), ".tmp");
  await mkdir(root, { recursive: true });
  const dryRunDirectory = await mkdtemp(path.join(root, "managed-audit-v215-"));
  const dryRunFile = path.join(dryRunDirectory, "managed-audit-adapter-candidate.jsonl");
  const rootInsideRepository = path.relative(process.cwd(), dryRunDirectory).startsWith(".tmp");
  const digestBeforeAppend = existsSync(dryRunFile) ? await digestFile(dryRunFile) : digestText("");
  let result: Omit<AdapterDryRunFileResult, "directoryRemoved">;

  try {
    await appendFile(dryRunFile, `${JSON.stringify(record)}\n`, "utf8");
    const appended = await readFile(dryRunFile, "utf8");
    const lines = appended.trim().length === 0 ? [] : appended.trim().split(/\r?\n/);
    const parsed = lines.map((line) => JSON.parse(line) as ManagedAuditDryRunAdapterRecord);
    result = {
      rootInsideRepository,
      directoryCreated: true,
      appendRecordCount: lines.length,
      queryByRequestIdCount: parsed.filter((item) => item.requestId === record.requestId).length,
      digestBeforeAppend,
      digestAfterAppend: digestText(appended),
      digestAfterRepeatRead: digestText(await readFile(dryRunFile, "utf8")),
    };
  } finally {
    await rm(dryRunDirectory, { recursive: true, force: true });
  }

  return {
    ...result,
    directoryRemoved: !existsSync(dryRunDirectory),
  };
}

function digestText(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function digestFile(file: string): Promise<string> {
  return digestText(await readFile(file, "utf8"));
}

function createChecks(
  config: AppConfig,
  sourceArchive: ManagedAuditRestoreDrillArchiveVerificationProfile,
  javaV77: JavaV77ManagedAuditAdapterBoundaryReceipt,
  miniKvV86: MiniKvV86ManagedAuditAdapterRestoreBoundaryReceipt,
  record: ManagedAuditDryRunAdapterRecord,
  adapterRun: AdapterDryRunFileResult,
  verification: ManagedAuditDryRunAdapterCandidateProfile["verification"],
): ManagedAuditDryRunAdapterCandidateProfile["checks"] {
  return {
    sourceArchiveVerificationReady: sourceArchive.readyForManagedAuditRestoreDrillArchiveVerification
      && sourceArchive.verificationState === "verified-restore-drill-archive",
    sourceArchiveStillBlocksProduction: !sourceArchive.readyForProductionAudit
      && !sourceArchive.restoreExecutionAllowed
      && !sourceArchive.connectsManagedAudit,
    javaV77ReceiptAccepted: javaV77.readyForNodeV215DryRunAdapterCandidate
      && javaV77.nodeV215MayConsume
      && javaV77.nodeV215MayWriteLocalDryRunFiles,
    javaV77NoWriteBoundaryValid: !javaV77.nodeV215MayConnectManagedAudit
      && !javaV77.nodeV215MayCreateApprovalDecision
      && !javaV77.nodeV215MayWriteApprovalLedger
      && !javaV77.nodeV215MayPersistApprovalRecord
      && !javaV77.nodeV215MayExecuteSql
      && !javaV77.nodeV215MayTriggerDeployment
      && !javaV77.nodeV215MayTriggerRollback
      && !javaV77.nodeV215MayExecuteRestore
      && !javaV77.javaApprovalDecisionCreated
      && !javaV77.javaApprovalLedgerWritten,
    miniKvV86ReceiptAccepted: miniKvV86.readyForNodeV215DryRunAdapterCandidate
      && miniKvV86.consumedMarkerDigest === "fnv1a64:1ea4570c967cfdb1"
      && miniKvV86.receiptDigest === "fnv1a64:f39d8e3ef98654ea",
    miniKvV86NoRestoreBoundaryValid: !miniKvV86.adapterWriteAllowed
      && !miniKvV86.restoreExecutionAllowed
      && !miniKvV86.loadRestoreCompactExecuted
      && !miniKvV86.managedAuditWriteExecuted
      && !miniKvV86.orderAuthoritative,
    adapterRecordShapeValid: record.recordVersion === "managed-audit-dry-run-adapter-record.v1-candidate"
      && record.adapter.adapterMode === "local-jsonl-dry-run-only"
      && record.writeEnvelope.localTempOnly
      && !record.writeEnvelope.productionStoreTouched
      && !record.writeEnvelope.externalAuditSystemTouched,
    adapterDigestValid: /^[a-f0-9]{64}$/.test(record.recordDigest)
      && /^[a-f0-9]{64}$/.test(verification.adapterVerificationDigest),
    tempDirectoryOnly: adapterRun.rootInsideRepository,
    appendCovered: adapterRun.appendRecordCount === 1,
    queryCovered: adapterRun.queryByRequestIdCount === 1,
    digestCovered: adapterRun.digestBeforeAppend !== adapterRun.digestAfterAppend
      && adapterRun.digestAfterAppend === adapterRun.digestAfterRepeatRead,
    cleanupCovered: verification.dryRunDirectoryCreated && verification.dryRunDirectoryRemoved,
    javaMiniKvWriteBlocked: !verification.javaWriteAttempted && !verification.miniKvWriteAttempted,
    noRealApprovalDecisionCreated: !verification.realApprovalDecisionCreated && !verification.realApprovalLedgerWritten,
    noExternalManagedAuditAccessed: !verification.externalAuditSystemAccessed && !record.boundaries.externalAuditSystemAllowed,
    restoreStillBlocked: !verification.restoreExecuted
      && !record.restoreBoundary.restoreExecuted
      && !record.restoreBoundary.miniKvLoadExecuted
      && !record.restoreBoundary.miniKvCompactExecuted
      && !record.restoreBoundary.miniKvSetnxexExecuted
      && !record.restoreBoundary.miniKvRestoreExecuted,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    executionStillBlocked: !record.boundaries.productionAuditRecordAllowed,
    productionAuditStillBlocked: !verification.productionAuditRecordAllowed,
    readyForManagedAuditDryRunAdapterCandidate: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditDryRunAdapterCandidateProfile["checks"],
): AdapterCandidateMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: AdapterCandidateMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceArchiveVerificationReady,
      code: "SOURCE_ARCHIVE_VERIFICATION_NOT_READY",
      source: "managed-audit-restore-drill-archive-verification",
      message: "Node v214 archive verification is not ready.",
    },
    {
      condition: checks.javaV77ReceiptAccepted,
      code: "JAVA_V77_RECEIPT_NOT_ACCEPTED",
      source: "java-v77-managed-audit-adapter-boundary-receipt",
      message: "Java v77 does not allow Node v215 local dry-run adapter candidate consumption.",
    },
    {
      condition: checks.javaV77NoWriteBoundaryValid,
      code: "JAVA_V77_WRITE_BOUNDARY_INVALID",
      source: "java-v77-managed-audit-adapter-boundary-receipt",
      message: "Java v77 receipt must keep managed audit, approval, SQL, deployment, rollback, and restore writes blocked.",
    },
    {
      condition: checks.miniKvV86ReceiptAccepted,
      code: "MINI_KV_V86_RECEIPT_NOT_ACCEPTED",
      source: "mini-kv-v86-managed-audit-adapter-restore-boundary-receipt",
      message: "mini-kv v86 receipt digest or consumed marker digest is not accepted.",
    },
    {
      condition: checks.miniKvV86NoRestoreBoundaryValid,
      code: "MINI_KV_V86_RESTORE_BOUNDARY_INVALID",
      source: "mini-kv-v86-managed-audit-adapter-restore-boundary-receipt",
      message: "mini-kv v86 must keep adapter writes and restore execution blocked.",
    },
    {
      condition: checks.cleanupCovered,
      code: "LOCAL_DRY_RUN_CLEANUP_MISSING",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "The local dry-run adapter temp directory must be removed after verification.",
    },
    {
      condition: checks.adapterRecordShapeValid,
      code: "ADAPTER_RECORD_SHAPE_INVALID",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "The dry-run adapter record must remain local-jsonl and production-store untouched.",
    },
    {
      condition: checks.adapterDigestValid,
      code: "ADAPTER_DIGEST_INVALID",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "The dry-run adapter record and verification digests must be stable sha256 values.",
    },
    {
      condition: checks.tempDirectoryOnly,
      code: "TEMP_DIRECTORY_BOUNDARY_INVALID",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "The dry-run adapter candidate may write only inside the Node .tmp directory.",
    },
    {
      condition: checks.appendCovered && checks.queryCovered && checks.digestCovered,
      code: "LOCAL_JSONL_DRY_RUN_NOT_COVERED",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "The local JSONL adapter dry-run must cover append, query, digest, and repeat-read checks.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v215.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(candidateState: ManagedAuditDryRunAdapterCandidateProfile["candidateState"]): AdapterCandidateMessage[] {
  return [
    {
      code: "LOCAL_DRY_RUN_ONLY",
      severity: "warning",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "v215 writes one Node-local temp JSONL record only; this is not a production managed audit adapter.",
    },
    ...(candidateState === "blocked"
      ? [{
          code: "CANDIDATE_BLOCKED",
          severity: "warning" as const,
          source: "managed-audit-dry-run-adapter-candidate" as const,
          message: "The dry-run adapter candidate is blocked and must not be used as evidence for production.",
        }]
      : []),
  ];
}

function collectRecommendations(): AdapterCandidateMessage[] {
  return [
    {
      code: "VERIFY_V215_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "Archive and verify v215 before moving toward any managed audit adapter hardening.",
    },
    {
      code: "KEEP_REAL_ADAPTER_SEPARATE",
      severity: "recommendation",
      source: "managed-audit-dry-run-adapter-candidate",
      message: "A real adapter needs a separate plan for storage config, identity, retention, recovery, and failure handling.",
    },
  ];
}
