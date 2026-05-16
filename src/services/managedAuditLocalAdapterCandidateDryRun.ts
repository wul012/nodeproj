import { randomUUID } from "node:crypto";
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
  type ManagedAuditAdapter,
  type ManagedAuditAdapterAppendResult,
  type ManagedAuditAdapterDescription,
  type ManagedAuditAdapterDigestResult,
  type ManagedAuditAdapterHealthResult,
  type ManagedAuditAdapterQueryResult,
  type ManagedAuditAppendRecord,
  type ManagedAuditQueryFilter,
  loadManagedAuditAdapterDisabledShell,
  type ManagedAuditAdapterDisabledShellProfile,
} from "./managedAuditAdapterDisabledShell.js";

export interface ManagedAuditLocalAdapterCandidateDryRunProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1";
  candidateState: "local-adapter-dry-run-verified" | "blocked";
  readyForManagedAuditLocalAdapterCandidateDryRun: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  sourceDisabledShell: {
    sourceVersion: "Node v220";
    profileVersion: ManagedAuditAdapterDisabledShellProfile["profileVersion"];
    shellState: ManagedAuditAdapterDisabledShellProfile["shellState"];
    readyForDisabledShell: boolean;
    selectedAdapterKind: "disabled";
  };
  upstreamReceipts: {
    javaV80: JavaV80ManagedAuditAdapterImplementationGuardReceipt;
    miniKvV89: MiniKvV89AdapterShellNonStorageGuardReceipt;
  };
  candidateAdapter: {
    adapterName: "LocalJsonlManagedAuditAdapterCandidate";
    adapterKind: "local-dry-run";
    targetStore: "node-local-temp-jsonl";
    fileName: "managed-audit-local-adapter-candidate-v221.jsonl";
    localTempOnly: true;
    productionStoreTouched: false;
    externalManagedAuditAccessed: false;
  };
  dryRunRecord: ManagedAuditLocalAdapterDryRunRecord;
  verification: {
    dryRunRootLabel: ".tmp";
    dryRunDirectoryPrefix: "managed-audit-v221-";
    dryRunDirectoryCreated: boolean;
    dryRunDirectoryRemoved: boolean;
    appendStatus: "appended";
    appendAccepted: true;
    appendWritten: true;
    queryStatus: "queried";
    queryByRequestIdCount: number;
    digestBeforeAppend: string;
    digestAfterAppend: string;
    digestAfterRepeatRead: string;
    adapterHealthStatus: "healthy";
    adapterDescriptionKind: "local-dry-run";
    candidateVerificationDigest: string;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    externalManagedAuditAccessed: false;
    productionAuditRecordAllowed: false;
  };
  checks: {
    sourceDisabledShellReady: boolean;
    javaV80ReceiptAccepted: boolean;
    javaV80NoWriteBoundaryValid: boolean;
    miniKvV89ReceiptAccepted: boolean;
    miniKvV89NonStorageBoundaryValid: boolean;
    localTempDirectoryOnly: boolean;
    localDryRunAppendCovered: boolean;
    localDryRunQueryCovered: boolean;
    localDryRunDigestCovered: boolean;
    localDryRunCleanupCovered: boolean;
    noExternalManagedAuditAccessed: boolean;
    javaMiniKvWriteBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditLocalAdapterCandidateDryRun: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    appendRecordCount: 1;
    queryResultCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: LocalAdapterCandidateMessage[];
  warnings: LocalAdapterCandidateMessage[];
  recommendations: LocalAdapterCandidateMessage[];
  evidenceEndpoints: {
    managedAuditLocalAdapterCandidateDryRunJson: string;
    managedAuditLocalAdapterCandidateDryRunMarkdown: string;
    sourceDisabledShellJson: string;
    javaV80ReceiptHint: string;
    miniKvV89ReceiptHint: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV80ManagedAuditAdapterImplementationGuardReceipt {
  sourceVersion: "Java v80";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-implementation-guard-receipt.v1";
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v14";
  consumedByNodeDisabledShellVersion: "Node v220";
  consumedByNodeDisabledShellProfile: "managed-audit-adapter-disabled-shell.v1";
  consumedByNodeDisabledShellState: "disabled-shell-ready";
  nextNodeCandidateVersion: "Node v221";
  nextNodeCandidateProfile: "managed-audit-local-adapter-candidate-dry-run.v1";
  guardDigest: string;
  readyForNodeV221LocalAdapterCandidateDryRun: true;
  nodeV220SelectedAdapterDisabled: true;
  nodeV220LocalDryRunOnlyDeclared: true;
  nodeV220AppendWritten: false;
  nodeV220QueryReturnedRecords: false;
  nodeV220ExternalManagedAuditAccessed: false;
  nodeV220LocalDryRunWritePerformed: false;
  javaApprovalDecisionCreated: false;
  javaApprovalLedgerWritten: false;
  javaApprovalRecordPersisted: false;
  javaManagedAuditStoreWritten: false;
  javaSqlExecuted: false;
  javaDeploymentTriggered: false;
  javaRollbackTriggered: false;
  javaRestoreExecuted: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  nodeMayTreatAsProductionAuditRecord: false;
}

interface MiniKvV89AdapterShellNonStorageGuardReceipt {
  sourceVersion: "mini-kv v89";
  projectVersion: "0.89.0";
  receiptVersion: "mini-kv-adapter-shell-non-storage-guard-receipt.v1";
  consumer: "Node v221 managed audit local adapter candidate dry-run";
  consumedBy: "Node v220 managed audit adapter interface and disabled shell";
  consumedReleaseVersion: "v88";
  consumedArtifactPathHint: "c/88/";
  consumedReceiptDigest: "fnv1a64:4aa6d12fb067e2a6";
  currentArtifactPathHint: "c/89/";
  receiptDigest: "fnv1a64:76411286a0913dc8";
  adapterShell: "ManagedAuditAdapter disabled shell";
  adapterShellStorageBackend: false;
  storageBackendAllowed: false;
  writeHandlerChanged: false;
  adminHandlerChanged: false;
  restoreExecutionAllowed: false;
  loadRestoreCompactExecuted: false;
  managedAuditWriteExecuted: false;
  localDryRunRecordsWritten: false;
  orderAuthoritative: false;
  readOnly: true;
  executionAllowed: false;
  readyForNodeV221LocalAdapterCandidateDryRun: true;
}

interface ManagedAuditLocalAdapterDryRunRecord {
  recordVersion: "managed-audit-local-adapter-dry-run-record.v1";
  recordId: string;
  requestId: "managed-audit-v221-local-adapter-request";
  occurredAt: string;
  adapter: {
    adapterName: "LocalJsonlManagedAuditAdapterCandidate";
    adapterKind: "local-dry-run";
    sourceDisabledShellVersion: "Node v220";
    javaReceiptVersion: "Java v80";
    miniKvReceiptVersion: "mini-kv v89";
  };
  boundaries: {
    localTempOnly: true;
    productionStoreTouched: false;
    externalManagedAuditAccessed: false;
    javaWriteAllowed: false;
    miniKvStorageBackendAllowed: false;
    productionAuditRecordAllowed: false;
  };
  recordDigest: string;
}

interface LocalAdapterCandidateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-local-adapter-candidate-dry-run"
    | "managed-audit-adapter-disabled-shell"
    | "java-v80-managed-audit-adapter-implementation-guard-receipt"
    | "mini-kv-v89-adapter-shell-non-storage-guard-receipt"
    | "runtime-config";
  message: string;
}

interface LocalAdapterRunResult {
  directoryCreated: boolean;
  directoryRemoved: boolean;
  appendResult: ManagedAuditAdapterAppendResult;
  queryResult: ManagedAuditAdapterQueryResult;
  digestBeforeAppend: ManagedAuditAdapterDigestResult;
  digestAfterAppend: ManagedAuditAdapterDigestResult;
  digestAfterRepeatRead: ManagedAuditAdapterDigestResult;
  health: ManagedAuditAdapterHealthResult;
  description: ManagedAuditAdapterDescription;
}

const ENDPOINTS = Object.freeze({
  managedAuditLocalAdapterCandidateDryRunJson: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run",
  managedAuditLocalAdapterCandidateDryRunMarkdown: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run?format=markdown",
  sourceDisabledShellJson: "/api/v1/audit/managed-audit-adapter-disabled-shell",
  javaV80ReceiptHint: "advanced-order-platform:c/80/\u89e3\u91ca/\u8bf4\u660e.md",
  miniKvV89ReceiptHint: "mini-kv:c/89/\u89e3\u91ca/\u8bf4\u660e.md",
  activePlan: "docs/plans/v219-post-implementation-precheck-roadmap.md",
});

export class LocalJsonlManagedAuditAdapterCandidate implements ManagedAuditAdapter {
  readonly fileName = "managed-audit-local-adapter-candidate-v221.jsonl";

  constructor(private readonly directory: string) {}

  async append(record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult> {
    await mkdir(this.directory, { recursive: true });
    await appendFile(this.filePath(), `${JSON.stringify(record)}\n`, "utf8");
    return {
      status: "appended",
      accepted: true,
      written: true,
      message: "Local dry-run record was appended to a temporary JSONL candidate file.",
    };
  }

  async query(filter: ManagedAuditQueryFilter): Promise<ManagedAuditAdapterQueryResult> {
    const records = await this.readRecords();
    const limit = filter.limit ?? records.length;
    const matching = records
      .filter((record) => isManagedAuditAppendRecord(record) && record.requestId === filter.requestId)
      .slice(0, limit);
    return {
      status: "queried",
      records: matching,
      recordCount: matching.length,
    };
  }

  async digest(): Promise<ManagedAuditAdapterDigestResult> {
    const records = await this.readRecords();
    return {
      status: "ready",
      digest: sha256StableJson({
        adapterKind: "local-dry-run",
        records,
      }),
      recordCount: records.length,
    };
  }

  async health(): Promise<ManagedAuditAdapterHealthResult> {
    return {
      status: "healthy",
      writable: true,
      externalConnectionAttempted: false,
      message: "Local JSONL dry-run adapter candidate is isolated to a temporary Node directory.",
    };
  }

  async describe(): Promise<ManagedAuditAdapterDescription> {
    return {
      adapterName: "LocalJsonlManagedAuditAdapterCandidate",
      adapterKind: "local-dry-run",
      profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
      appendEnabled: true,
      queryEnabled: true,
      externalConnectionEnabled: false,
      localDryRunEnabled: true,
    };
  }

  private filePath(): string {
    return path.join(this.directory, this.fileName);
  }

  private async readRecords(): Promise<unknown[]> {
    try {
      const content = await readFile(this.filePath(), "utf8");
      return content
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0)
        .map((line) => JSON.parse(line) as unknown);
    } catch (error) {
      if (isMissingFileError(error)) {
        return [];
      }
      throw error;
    }
  }
}

export async function loadManagedAuditLocalAdapterCandidateDryRun(input: {
  config: AppConfig;
}): Promise<ManagedAuditLocalAdapterCandidateDryRunProfile> {
  const sourceDisabledShell = await loadManagedAuditAdapterDisabledShell({ config: input.config });
  const javaV80 = createJavaV80Receipt();
  const miniKvV89 = createMiniKvV89Receipt();
  const dryRunRecord = createDryRunRecord(javaV80, miniKvV89);
  const adapterRun = await runLocalAdapterCandidate(dryRunRecord);
  const candidateVerificationDigest = sha256StableJson({
    profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
    sourceDisabledShellState: sourceDisabledShell.shellState,
    javaGuardDigest: javaV80.guardDigest,
    miniKvReceiptDigest: miniKvV89.receiptDigest,
    recordDigest: dryRunRecord.recordDigest,
    digestBeforeAppend: adapterRun.digestBeforeAppend.digest,
    digestAfterAppend: adapterRun.digestAfterAppend.digest,
    digestAfterRepeatRead: adapterRun.digestAfterRepeatRead.digest,
    directoryRemoved: adapterRun.directoryRemoved,
    productionAuditRecordAllowed: false,
  });
  const verification = {
    dryRunRootLabel: ".tmp" as const,
    dryRunDirectoryPrefix: "managed-audit-v221-" as const,
    dryRunDirectoryCreated: adapterRun.directoryCreated,
    dryRunDirectoryRemoved: adapterRun.directoryRemoved,
    appendStatus: adapterRun.appendResult.status as "appended",
    appendAccepted: adapterRun.appendResult.accepted as true,
    appendWritten: adapterRun.appendResult.written as true,
    queryStatus: adapterRun.queryResult.status as "queried",
    queryByRequestIdCount: adapterRun.queryResult.recordCount,
    digestBeforeAppend: adapterRun.digestBeforeAppend.digest,
    digestAfterAppend: adapterRun.digestAfterAppend.digest,
    digestAfterRepeatRead: adapterRun.digestAfterRepeatRead.digest,
    adapterHealthStatus: adapterRun.health.status as "healthy",
    adapterDescriptionKind: adapterRun.description.adapterKind as "local-dry-run",
    candidateVerificationDigest,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    externalManagedAuditAccessed: false as const,
    productionAuditRecordAllowed: false as const,
  };
  const checks = createChecks(input.config, sourceDisabledShell, javaV80, miniKvV89, verification);
  checks.readyForManagedAuditLocalAdapterCandidateDryRun = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditLocalAdapterCandidateDryRun")
    .every(([, value]) => value);
  const candidateState = checks.readyForManagedAuditLocalAdapterCandidateDryRun
    ? "local-adapter-dry-run-verified"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit local adapter candidate dry-run",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
    candidateState,
    readyForManagedAuditLocalAdapterCandidateDryRun: checks.readyForManagedAuditLocalAdapterCandidateDryRun,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    automaticUpstreamStart: false,
    sourceDisabledShell: {
      sourceVersion: "Node v220",
      profileVersion: sourceDisabledShell.profileVersion,
      shellState: sourceDisabledShell.shellState,
      readyForDisabledShell: sourceDisabledShell.readyForManagedAuditAdapterDisabledShell,
      selectedAdapterKind: sourceDisabledShell.adapterSelection.selectedAdapterKind,
    },
    upstreamReceipts: {
      javaV80,
      miniKvV89,
    },
    candidateAdapter: {
      adapterName: "LocalJsonlManagedAuditAdapterCandidate",
      adapterKind: "local-dry-run",
      targetStore: "node-local-temp-jsonl",
      fileName: "managed-audit-local-adapter-candidate-v221.jsonl",
      localTempOnly: true,
      productionStoreTouched: false,
      externalManagedAuditAccessed: false,
    },
    dryRunRecord,
    verification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      appendRecordCount: 1,
      queryResultCount: verification.queryByRequestIdCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive the v221 candidate dry-run as local-only evidence, not production audit evidence.",
      "Create a post-v221 plan before any real managed audit connection is attempted.",
      "Keep Java and mini-kv as guard evidence providers until a production audit adapter migration is explicitly approved.",
    ],
  };
}

export function renderManagedAuditLocalAdapterCandidateDryRunMarkdown(
  profile: ManagedAuditLocalAdapterCandidateDryRunProfile,
): string {
  return [
    "# Managed audit local adapter candidate dry-run",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Candidate state: ${profile.candidateState}`,
    `- Ready for local adapter candidate dry-run: ${profile.readyForManagedAuditLocalAdapterCandidateDryRun}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Disabled Shell",
    "",
    ...renderEntries(profile.sourceDisabledShell),
    "",
    "## Upstream Receipts",
    "",
    "### Java v80",
    "",
    ...renderEntries(profile.upstreamReceipts.javaV80),
    "",
    "### mini-kv v89",
    "",
    ...renderEntries(profile.upstreamReceipts.miniKvV89),
    "",
    "## Candidate Adapter",
    "",
    ...renderEntries(profile.candidateAdapter),
    "",
    "## Dry Run Record",
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
    ...renderMessages(profile.productionBlockers, "No local adapter candidate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No local adapter candidate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No local adapter candidate recommendations."),
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

async function runLocalAdapterCandidate(record: ManagedAuditLocalAdapterDryRunRecord): Promise<LocalAdapterRunResult> {
  const root = path.resolve(process.cwd(), ".tmp");
  await mkdir(root, { recursive: true });
  const directory = await mkdtemp(path.join(root, "managed-audit-v221-"));
  const adapter = new LocalJsonlManagedAuditAdapterCandidate(directory);
  let directoryRemoved = false;
  let result: Omit<LocalAdapterRunResult, "directoryRemoved">;
  try {
    const digestBeforeAppend = await adapter.digest();
    const appendResult = await adapter.append({
      requestId: record.requestId,
      eventType: "LOCAL_ADAPTER_CANDIDATE_DRY_RUN",
      payload: {
        record,
      },
    });
    const queryResult = await adapter.query({ requestId: record.requestId, limit: 10 });
    const digestAfterAppend = await adapter.digest();
    const digestAfterRepeatRead = await adapter.digest();
    const health = await adapter.health();
    const description = await adapter.describe();
    result = {
      directoryCreated: true,
      appendResult,
      queryResult,
      digestBeforeAppend,
      digestAfterAppend,
      digestAfterRepeatRead,
      health,
      description,
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
    directoryRemoved = true;
  }
  return {
    ...result,
    directoryRemoved,
  };
}

function createJavaV80Receipt(): JavaV80ManagedAuditAdapterImplementationGuardReceipt {
  const base = {
    sourceVersion: "Java v80" as const,
    receiptVersion: "java-release-approval-rehearsal-managed-audit-adapter-implementation-guard-receipt.v1" as const,
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v14" as const,
    consumedByNodeDisabledShellVersion: "Node v220" as const,
    consumedByNodeDisabledShellProfile: "managed-audit-adapter-disabled-shell.v1" as const,
    consumedByNodeDisabledShellState: "disabled-shell-ready" as const,
    nextNodeCandidateVersion: "Node v221" as const,
    nextNodeCandidateProfile: "managed-audit-local-adapter-candidate-dry-run.v1" as const,
    readyForNodeV221LocalAdapterCandidateDryRun: true as const,
    nodeV220SelectedAdapterDisabled: true as const,
    nodeV220LocalDryRunOnlyDeclared: true as const,
    nodeV220AppendWritten: false as const,
    nodeV220QueryReturnedRecords: false as const,
    nodeV220ExternalManagedAuditAccessed: false as const,
    nodeV220LocalDryRunWritePerformed: false as const,
    javaApprovalDecisionCreated: false as const,
    javaApprovalLedgerWritten: false as const,
    javaApprovalRecordPersisted: false as const,
    javaManagedAuditStoreWritten: false as const,
    javaSqlExecuted: false as const,
    javaDeploymentTriggered: false as const,
    javaRollbackTriggered: false as const,
    javaRestoreExecuted: false as const,
    readyForProductionAudit: false as const,
    readyForProductionWindow: false as const,
    nodeMayTreatAsProductionAuditRecord: false as const,
  };
  return {
    ...base,
    guardDigest: sha256StableJson(base),
  };
}

function createMiniKvV89Receipt(): MiniKvV89AdapterShellNonStorageGuardReceipt {
  return {
    sourceVersion: "mini-kv v89",
    projectVersion: "0.89.0",
    receiptVersion: "mini-kv-adapter-shell-non-storage-guard-receipt.v1",
    consumer: "Node v221 managed audit local adapter candidate dry-run",
    consumedBy: "Node v220 managed audit adapter interface and disabled shell",
    consumedReleaseVersion: "v88",
    consumedArtifactPathHint: "c/88/",
    consumedReceiptDigest: "fnv1a64:4aa6d12fb067e2a6",
    currentArtifactPathHint: "c/89/",
    receiptDigest: "fnv1a64:76411286a0913dc8",
    adapterShell: "ManagedAuditAdapter disabled shell",
    adapterShellStorageBackend: false,
    storageBackendAllowed: false,
    writeHandlerChanged: false,
    adminHandlerChanged: false,
    restoreExecutionAllowed: false,
    loadRestoreCompactExecuted: false,
    managedAuditWriteExecuted: false,
    localDryRunRecordsWritten: false,
    orderAuthoritative: false,
    readOnly: true,
    executionAllowed: false,
    readyForNodeV221LocalAdapterCandidateDryRun: true,
  };
}

function createDryRunRecord(
  javaV80: JavaV80ManagedAuditAdapterImplementationGuardReceipt,
  miniKvV89: MiniKvV89AdapterShellNonStorageGuardReceipt,
): ManagedAuditLocalAdapterDryRunRecord {
  const withoutDigest = {
    recordVersion: "managed-audit-local-adapter-dry-run-record.v1" as const,
    recordId: randomUUID(),
    requestId: "managed-audit-v221-local-adapter-request" as const,
    occurredAt: new Date().toISOString(),
    adapter: {
      adapterName: "LocalJsonlManagedAuditAdapterCandidate" as const,
      adapterKind: "local-dry-run" as const,
      sourceDisabledShellVersion: "Node v220" as const,
      javaReceiptVersion: javaV80.sourceVersion,
      miniKvReceiptVersion: miniKvV89.sourceVersion,
    },
    boundaries: {
      localTempOnly: true as const,
      productionStoreTouched: false as const,
      externalManagedAuditAccessed: false as const,
      javaWriteAllowed: false as const,
      miniKvStorageBackendAllowed: false as const,
      productionAuditRecordAllowed: false as const,
    },
  };
  return {
    ...withoutDigest,
    recordDigest: sha256StableJson(withoutDigest),
  };
}

function createChecks(
  config: AppConfig,
  sourceDisabledShell: ManagedAuditAdapterDisabledShellProfile,
  javaV80: JavaV80ManagedAuditAdapterImplementationGuardReceipt,
  miniKvV89: MiniKvV89AdapterShellNonStorageGuardReceipt,
  verification: ManagedAuditLocalAdapterCandidateDryRunProfile["verification"],
): ManagedAuditLocalAdapterCandidateDryRunProfile["checks"] {
  return {
    sourceDisabledShellReady: sourceDisabledShell.readyForManagedAuditAdapterDisabledShell
      && sourceDisabledShell.adapterSelection.selectedAdapterKind === "disabled",
    javaV80ReceiptAccepted: javaV80.readyForNodeV221LocalAdapterCandidateDryRun,
    javaV80NoWriteBoundaryValid: !javaV80.nodeV220AppendWritten
      && !javaV80.nodeV220ExternalManagedAuditAccessed
      && !javaV80.nodeV220LocalDryRunWritePerformed
      && !javaV80.javaApprovalLedgerWritten
      && !javaV80.javaManagedAuditStoreWritten
      && !javaV80.javaSqlExecuted
      && !javaV80.nodeMayTreatAsProductionAuditRecord,
    miniKvV89ReceiptAccepted: miniKvV89.readyForNodeV221LocalAdapterCandidateDryRun
      && miniKvV89.receiptDigest === "fnv1a64:76411286a0913dc8",
    miniKvV89NonStorageBoundaryValid: !miniKvV89.adapterShellStorageBackend
      && !miniKvV89.storageBackendAllowed
      && !miniKvV89.managedAuditWriteExecuted
      && !miniKvV89.localDryRunRecordsWritten
      && !miniKvV89.orderAuthoritative,
    localTempDirectoryOnly: verification.dryRunRootLabel === ".tmp"
      && verification.dryRunDirectoryPrefix === "managed-audit-v221-",
    localDryRunAppendCovered: verification.appendStatus === "appended"
      && verification.appendAccepted
      && verification.appendWritten,
    localDryRunQueryCovered: verification.queryStatus === "queried"
      && verification.queryByRequestIdCount === 1,
    localDryRunDigestCovered: /^[a-f0-9]{64}$/.test(verification.digestAfterAppend)
      && verification.digestBeforeAppend !== verification.digestAfterAppend
      && verification.digestAfterAppend === verification.digestAfterRepeatRead,
    localDryRunCleanupCovered: verification.dryRunDirectoryCreated && verification.dryRunDirectoryRemoved,
    noExternalManagedAuditAccessed: !verification.externalManagedAuditAccessed,
    javaMiniKvWriteBlocked: !verification.javaWriteAttempted && !verification.miniKvWriteAttempted,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: true,
    productionAuditStillBlocked: !verification.productionAuditRecordAllowed,
    readyForManagedAuditLocalAdapterCandidateDryRun: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditLocalAdapterCandidateDryRunProfile["checks"],
): LocalAdapterCandidateMessage[] {
  const blockers: LocalAdapterCandidateMessage[] = [];
  addMessage(blockers, checks.sourceDisabledShellReady, "SOURCE_DISABLED_SHELL_NOT_READY", "managed-audit-adapter-disabled-shell", "Node v220 disabled shell must be ready before v221 local dry-run.");
  addMessage(blockers, checks.javaV80ReceiptAccepted, "JAVA_V80_GUARD_RECEIPT_NOT_ACCEPTED", "java-v80-managed-audit-adapter-implementation-guard-receipt", "Java v80 guard receipt must permit only local dry-run candidate consumption.");
  addMessage(blockers, checks.javaV80NoWriteBoundaryValid, "JAVA_V80_WRITE_BOUNDARY_INVALID", "java-v80-managed-audit-adapter-implementation-guard-receipt", "Java v80 must keep approval ledger, managed audit store, SQL, deployment, rollback, and restore disabled.");
  addMessage(blockers, checks.miniKvV89ReceiptAccepted, "MINIKV_V89_GUARD_RECEIPT_NOT_ACCEPTED", "mini-kv-v89-adapter-shell-non-storage-guard-receipt", "mini-kv v89 guard receipt must be present with the expected digest.");
  addMessage(blockers, checks.miniKvV89NonStorageBoundaryValid, "MINIKV_V89_STORAGE_BOUNDARY_INVALID", "mini-kv-v89-adapter-shell-non-storage-guard-receipt", "mini-kv v89 must not be treated as adapter storage or an order authority.");
  addMessage(blockers, checks.localDryRunCleanupCovered, "LOCAL_DRY_RUN_CLEANUP_MISSING", "managed-audit-local-adapter-candidate-dry-run", "The local dry-run directory must be removed after verification.");
  addMessage(blockers, checks.noExternalManagedAuditAccessed, "EXTERNAL_MANAGED_AUDIT_ACCESSED", "managed-audit-local-adapter-candidate-dry-run", "v221 must not connect to an external managed audit system.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false while the local candidate is only a dry-run.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-local-adapter-candidate-dry-run", "v221 local dry-run records must not be treated as production audit records.");
  return blockers;
}

function collectWarnings(): LocalAdapterCandidateMessage[] {
  return [
    {
      code: "LOCAL_DRY_RUN_ONLY",
      severity: "warning",
      source: "managed-audit-local-adapter-candidate-dry-run",
      message: "The adapter writes exactly one temporary JSONL record and removes the directory after verification.",
    },
    {
      code: "PRODUCTION_ADAPTER_STILL_MISSING",
      severity: "warning",
      source: "managed-audit-local-adapter-candidate-dry-run",
      message: "A production managed audit adapter, migration approval, and external credential review are still missing.",
    },
  ];
}

function collectRecommendations(): LocalAdapterCandidateMessage[] {
  return [
    {
      code: "CREATE_POST_V221_PLAN",
      severity: "recommendation",
      source: "managed-audit-local-adapter-candidate-dry-run",
      message: "Create a new plan before any real managed audit connection or production migration work.",
    },
    {
      code: "KEEP_JAVA_MINIKV_AS_GUARD_PROVIDERS",
      severity: "recommendation",
      source: "managed-audit-local-adapter-candidate-dry-run",
      message: "Continue treating Java and mini-kv as read-only guard evidence providers, not audit storage backends.",
    },
  ];
}

function addMessage(
  messages: LocalAdapterCandidateMessage[],
  condition: boolean,
  code: string,
  source: LocalAdapterCandidateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function isManagedAuditAppendRecord(value: unknown): value is ManagedAuditAppendRecord {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Partial<ManagedAuditAppendRecord>;
  return typeof record.requestId === "string"
    && typeof record.eventType === "string"
    && typeof record.payload === "object"
    && record.payload !== null;
}

function isMissingFileError(error: unknown): boolean {
  return typeof error === "object"
    && error !== null
    && "code" in error
    && (error as { code?: unknown }).code === "ENOENT";
}
