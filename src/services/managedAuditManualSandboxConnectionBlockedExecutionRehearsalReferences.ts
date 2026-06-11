import { createHash } from "node:crypto";

import {
  historicalEvidenceExists as existsSync,
  readHistoricalEvidenceFile as readFileSync,
  statHistoricalEvidence as statSync,
} from "./historicalEvidenceResolver.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  ACCEPTED_MINI_KV_RUNTIME_SMOKE_WAL_REGRESSION_REFERENCES,
  JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE,
  JAVA_V90_RUNBOOK,
  JAVA_V90_WALKTHROUGH,
  MINI_KV_RUNTIME_SMOKE,
  MINI_KV_VERIFICATION_MANIFEST,
  MINI_KV_V99_RUNBOOK,
  MINI_KV_V99_WALKTHROUGH,
  NODE_V233_SOURCE,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalConstants.js";
import type {
  BlockedExecutionEvidenceFile,
  BlockedExecutionSnippetMatch,
  JavaV90ContextNormalizationReference,
  MiniKvRuntimeSmokeEvidence,
  MiniKvV99WalRegressionReference,
  MiniKvVerificationManifest,
} from "./managedAuditManualSandboxConnectionBlockedExecutionRehearsalTypes.js";

export function createJavaV90Reference(
  evidenceFiles: BlockedExecutionEvidenceFile[],
  snippets: BlockedExecutionSnippetMatch[],
): JavaV90ContextNormalizationReference {
  const reference: JavaV90ContextNormalizationReference = {
    sourceVersion: "Java v90",
    headTag: "v90订单平台release-approval-context-normalization-helper",
    runbookPath: JAVA_V90_RUNBOOK,
    walkthroughPath: JAVA_V90_WALKTHROUGH,
    sourcePath: JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE,
    evidencePresent: fileById(evidenceFiles, "java-v90-runbook").exists
      && fileById(evidenceFiles, "java-v90-walkthrough").exists
      && fileById(evidenceFiles, "java-v90-context-header-field-source").exists,
    normalizeValuePresent: snippetMatched(snippets, "java-v90-normalize-value"),
    normalizedFactoryPresent: snippetMatched(snippets, "java-v90-normalized-factory"),
    missingWarningCentralized: snippetMatched(snippets, "java-v90-add-missing-warning")
      && snippetMatched(snippets, "java-v90-warning-helper-documentation"),
    allEchoedRetained: snippetMatched(snippets, "java-v90-all-echoed"),
    contractPreservingRefactorDocumented: snippetMatched(snippets, "java-v90-contract-preserving"),
    noLombokIntroduced: !snippetMatched(snippets, "java-v90-lombok-import")
      && snippetMatched(snippets, "java-v90-no-lombok-plan"),
    approvalLedgerWrittenByJava: !snippetMatched(snippets, "java-v90-no-ledger"),
    schemaSqlExecutedByJava: !snippetMatched(snippets, "java-v90-no-sql"),
    credentialValueReadByJava: !snippetMatched(snippets, "java-v90-no-credential"),
    managedAuditConnectionOpenedByJava: !snippetMatched(snippets, "java-v90-no-connection"),
    readyForNodeV234BlockedExecutionRehearsal: false,
  };

  return {
    ...reference,
    readyForNodeV234BlockedExecutionRehearsal: reference.evidencePresent
      && reference.normalizeValuePresent
      && reference.normalizedFactoryPresent
      && reference.missingWarningCentralized
      && reference.allEchoedRetained
      && reference.contractPreservingRefactorDocumented
      && reference.noLombokIntroduced
      && !reference.approvalLedgerWrittenByJava
      && !reference.schemaSqlExecutedByJava
      && !reference.credentialValueReadByJava
      && !reference.managedAuditConnectionOpenedByJava,
  };
}

export function createMiniKvV99Reference(
  evidenceFiles: BlockedExecutionEvidenceFile[],
  snippets: BlockedExecutionSnippetMatch[],
): MiniKvV99WalRegressionReference {
  const runtimeSmoke = readMiniKvRuntimeSmokeEvidence();
  const manifest = readMiniKvVerificationManifest();
  const versionManifest = recordField(manifest, "version_manifest");
  const readOnlySmoke = recordField(recordField(manifest, "commands"), "read_only_smoke");
  const scope = stringArrayField(versionManifest, "write_wal_helper_scope");
  const reference: MiniKvV99WalRegressionReference = {
    sourceVersion: "mini-kv v99",
    headTag: "第九十九版execute-with-wal回归补强",
    runbookPath: MINI_KV_V99_RUNBOOK,
    walkthroughPath: MINI_KV_V99_WALKTHROUGH,
    runtimeSmokePath: MINI_KV_RUNTIME_SMOKE,
    verificationManifestPath: MINI_KV_VERIFICATION_MANIFEST,
    evidencePresent: fileById(evidenceFiles, "mini-kv-v99-runbook").exists
      && fileById(evidenceFiles, "mini-kv-v99-walkthrough").exists
      && fileById(evidenceFiles, "mini-kv-runtime-smoke").exists
      && fileById(evidenceFiles, "mini-kv-verification-manifest").exists,
    projectVersion: stringField(manifest, "project_version") ?? stringField(runtimeSmoke, "project_version") ?? "missing",
    releaseVersion: stringField(manifest, "release_version") ?? stringField(runtimeSmoke, "release_version") ?? "missing",
    consumerHint: stringField(manifest, "consumer_hint") ?? stringField(runtimeSmoke, "consumer_hint") ?? "missing",
    writeWalHelper: stringField(versionManifest, "write_wal_helper") ?? "missing",
    writeWalHelperScope: scope,
    writeWalHelperBehaviorPreserved: booleanField(versionManifest, "write_wal_helper_behavior_preserved") ?? false,
    regressionCoverageDocumented: snippetMatched(snippets, "mini-kv-v99-regression-coverage"),
    usageErrorsNoWal: snippetMatched(snippets, "mini-kv-v99-usage-error-no-wal"),
    missingExpiredNoOpNoWal: snippetMatched(snippets, "mini-kv-v99-no-op-no-wal"),
    appendBeforeMutationPreserved: snippetMatched(snippets, "mini-kv-v99-append-before-mutation"),
    readOnly: booleanField(manifest, "read_only") ?? booleanField(runtimeSmoke, "read_only") ?? false,
    executionAllowed: booleanField(manifest, "execution_allowed") ?? booleanField(runtimeSmoke, "execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(runtimeSmoke, "restore_execution_allowed") ?? true,
    orderAuthoritative: booleanField(runtimeSmoke, "order_authoritative") ?? true,
    noRuntimeWriteCommandAdded: booleanField(manifest, "no_runtime_write_command_added") ?? false,
    runtimeWriteObserved: booleanField(readOnlySmoke, "runtime_write_observed")
      ?? booleanField(runtimeSmoke, "runtime_write_observed")
      ?? true,
    writeCommandsExecuted: booleanField(readOnlySmoke, "write_commands_executed")
      ?? booleanField(runtimeSmoke, "write_commands_executed")
      ?? true,
    readyForNodeV234BlockedExecutionRehearsal: false,
  };

  return {
    ...reference,
    readyForNodeV234BlockedExecutionRehearsal: reference.evidencePresent
      && acceptedMiniKvRuntimeSmokeWalRegressionReference(reference)
      && reference.writeWalHelper === "CommandProcessor::execute_with_wal"
      && ["SET", "SETNXEX", "DEL", "EXPIRE"].every((command) => reference.writeWalHelperScope.includes(command))
      && reference.writeWalHelperBehaviorPreserved
      && reference.regressionCoverageDocumented
      && reference.usageErrorsNoWal
      && reference.missingExpiredNoOpNoWal
      && reference.appendBeforeMutationPreserved
      && reference.noRuntimeWriteCommandAdded
      && reference.readOnly
      && !reference.executionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.orderAuthoritative
      && !reference.runtimeWriteObserved
      && !reference.writeCommandsExecuted,
  };
}

function acceptedMiniKvRuntimeSmokeWalRegressionReference(input: {
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
}): boolean {
  return ACCEPTED_MINI_KV_RUNTIME_SMOKE_WAL_REGRESSION_REFERENCES.some((reference) =>
    reference.projectVersion === input.projectVersion
    && reference.releaseVersion === input.releaseVersion
    && reference.consumerHint === input.consumerHint);
}

export function createEvidenceFiles(): BlockedExecutionEvidenceFile[] {
  return [
    evidenceFile("node-v233-source", NODE_V233_SOURCE),
    evidenceFile("java-v90-runbook", JAVA_V90_RUNBOOK),
    evidenceFile("java-v90-walkthrough", JAVA_V90_WALKTHROUGH),
    evidenceFile("java-v90-context-header-field-source", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE),
    evidenceFile("mini-kv-v99-runbook", MINI_KV_V99_RUNBOOK),
    evidenceFile("mini-kv-v99-walkthrough", MINI_KV_V99_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

export function createSnippetMatches(): BlockedExecutionSnippetMatch[] {
  return [
    snippet("node-v233-blocked-review", NODE_V233_SOURCE, "nodeV233BlocksRealConnection: true"),
    snippet("node-v233-managed-write-false", NODE_V233_SOURCE, "managedAuditWriteAllowed: false"),
    snippet("java-v90-normalize-value", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "static String normalizeValue"),
    snippet("java-v90-normalized-factory", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "static ContextHeaderField normalized"),
    snippet("java-v90-add-missing-warning", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "void addMissingWarning"),
    snippet("java-v90-all-echoed", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "static boolean allEchoed"),
    snippet("java-v90-warning-helper-documentation", JAVA_V90_WALKTHROUGH, "缺失 warning 处理收进 `ContextHeaderField`"),
    snippet("java-v90-contract-preserving", JAVA_V90_WALKTHROUGH, "contract-preserving refactor"),
    snippet("java-v90-lombok-import", JAVA_V90_CONTEXT_HEADER_FIELD_SOURCE, "lombok"),
    snippet("java-v90-no-lombok-plan", JAVA_V90_WALKTHROUGH, "不引入 Lombok"),
    snippet("java-v90-no-ledger", JAVA_V90_RUNBOOK, "不写 ledger"),
    snippet("java-v90-no-sql", JAVA_V90_RUNBOOK, "不执行 SQL"),
    snippet("java-v90-no-credential", JAVA_V90_RUNBOOK, "不读取 credential value"),
    snippet("java-v90-no-connection", JAVA_V90_RUNBOOK, "不打开 managed audit connection"),
    snippet("mini-kv-v99-regression-coverage", MINI_KV_V99_WALKTHROUGH, "usage error 不写 WAL"),
    snippet("mini-kv-v99-usage-error-no-wal", MINI_KV_V99_WALKTHROUGH, "usage error 不写 WAL"),
    snippet("mini-kv-v99-no-op-no-wal", MINI_KV_V99_WALKTHROUGH, "missing / expired no-op 不写 WAL"),
    snippet("mini-kv-v99-append-before-mutation", MINI_KV_V99_WALKTHROUGH, "append-before-mutation 顺序"),
    snippet("mini-kv-v99-node-v234", MINI_KV_RUNTIME_SMOKE, "Node v234 manual sandbox connection blocked execution rehearsal"),
    snippet("mini-kv-v99-read-only", MINI_KV_V99_RUNBOOK, "`read_only=true`"),
    snippet("mini-kv-v99-no-write", MINI_KV_V99_RUNBOOK, "`write_commands_executed=false`"),
  ];
}

function evidenceFile(id: string, filePath: string): BlockedExecutionEvidenceFile {
  if (!existsSync(filePath)) {
    return { id, path: filePath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readFileSync(filePath);
  return {
    id,
    path: filePath,
    exists: true,
    sizeBytes: statSync(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): BlockedExecutionSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function fileById(files: BlockedExecutionEvidenceFile[], id: string): BlockedExecutionEvidenceFile {
  const file = files.find((entry) => entry.id === id);
  if (!file) {
    throw new Error(`Missing evidence file descriptor: ${id}`);
  }
  return file;
}

function snippetMatched(snippets: BlockedExecutionSnippetMatch[], id: string): boolean {
  return snippets.find((entry) => entry.id === id)?.matched ?? false;
}

function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  return readJsonFile(MINI_KV_RUNTIME_SMOKE) as MiniKvRuntimeSmokeEvidence;
}

function readMiniKvVerificationManifest(): MiniKvVerificationManifest {
  return readJsonFile(MINI_KV_VERIFICATION_MANIFEST) as MiniKvVerificationManifest;
}

function readJsonFile(filePath: string): unknown {
  if (!existsSync(filePath)) {
    return {};
  }
  return JSON.parse(readFileSync(filePath, "utf8")) as unknown;
}

function recordField(record: Record<string, unknown>, field: string): Record<string, unknown> {
  const value = record[field];
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringField(record: Record<string, unknown>, field: string): string | null {
  const value = record[field];
  return typeof value === "string" ? value : null;
}

function booleanField(record: Record<string, unknown>, field: string): boolean | null {
  const value = record[field];
  return typeof value === "boolean" ? value : null;
}

function stringArrayField(record: Record<string, unknown>, field: string): string[] {
  const value = record[field];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}
