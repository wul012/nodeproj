import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.js";
import type {
  JavaV150AbortRollbackSemanticsEvidenceReference,
  ManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerProfile,
  MiniKvV142AbortRollbackSemanticsReceiptReference,
  ReadOnlyCrossProjectReadinessChecks,
  ReadOnlyCrossProjectReadinessMessage,
  ReadOnlyCrossProjectReadinessSummary,
  ReadOnlyCrossProjectSideEffectSafetyMatrix,
  SourceNodeV326AbortRollbackSemanticsContractReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner";
const SOURCE_NODE_V326_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake";
const ACTIVE_PLAN = "docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md";
const JAVA_V150_EVIDENCE_PATH = "D:/javaproj/advanced-order-platform/d/150/解释/说明.md";
const MINI_KV_V142_RECEIPT_PATH =
  "D:/C/mini-kv/fixtures/release/credential-resolver-abort-rollback-semantics-contract-non-participation-receipt.json";

export function loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner(input: {
  config: AppConfig;
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
  };
}): ManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerProfile {
  const sourceNodeV326 = createSourceNodeV326(input.config);
  const javaV150Evidence = createJavaV150EvidenceReference(
    input.evidencePaths?.javaV150EvidencePath ?? JAVA_V150_EVIDENCE_PATH,
  );
  const miniKvV142Receipt = createMiniKvV142ReceiptReference(
    input.evidencePaths?.miniKvV142ReceiptPath ?? MINI_KV_V142_RECEIPT_PATH,
  );
  const sideEffectSafetyMatrix = createSideEffectSafetyMatrix();
  const checks = createChecks(
    input.config,
    sourceNodeV326,
    javaV150Evidence,
    miniKvV142Receipt,
    sideEffectSafetyMatrix,
  );
  checks.readyForReadOnlyCrossProjectReadinessReport = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyCrossProjectReadinessReport")
    .every(([, value]) => value);
  const runnerState = checks.readyForReadOnlyCrossProjectReadinessReport
    ? "read-only-cross-project-readiness-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    javaV150Evidence,
    miniKvV142Receipt,
    sideEffectSafetyMatrix,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );
  const readinessDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    sourceNodeV326,
    javaEvidenceDigest: javaV150Evidence.evidenceFile.digest,
    miniKvReceiptDigest: miniKvV142Receipt.evidenceFile.digest,
    checks,
    sideEffectSafetyMatrix,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver read-only cross-project readiness runner",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    runnerState,
    activeNodeVersion: "Node v327",
    sourceNodeContractVersion: "Node v326",
    sourceJavaVersion: "Java v150",
    sourceMiniKvVersion: "mini-kv v142",
    targetPrerequisiteId: "abort-rollback-semantics",
    consumesNodeV326AbortRollbackSemanticsContractIntake: true,
    consumesJavaV150LocalEvidence: true,
    consumesMiniKvV142LocalReceipt: true,
    readsSiblingWorkspaceEvidence: true,
    usesHistoricalFixtureFallback: true,
    readOnlyCrossProjectReadinessRunner: true,
    readyForReadOnlyCrossProjectReadinessReport: checks.readyForReadOnlyCrossProjectReadinessReport,
    readyForFinalPrerequisiteClosureReview: checks.readyForReadOnlyCrossProjectReadinessReport,
    readyForRuntimeShellImplementation: false,
    readyForRuntimeShellInvocation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    networkSocketOpened: false,
    javaServiceStarted: false,
    miniKvServiceStarted: false,
    javaSqlExecutionAllowed: false,
    approvalLedgerWritten: false,
    schemaMigrationExecuted: false,
    rollbackExecutionAllowed: false,
    deploymentActionAllowed: false,
    miniKvWriteCommandAllowed: false,
    miniKvLoadAllowed: false,
    miniKvCompactAllowed: false,
    miniKvRestoreAllowed: false,
    miniKvSetnxexAllowed: false,
    automaticUpstreamStart: false,
    sourceNodeV326,
    javaV150Evidence,
    miniKvV142Receipt,
    sideEffectSafetyMatrix,
    readinessDigest,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      readOnlyCrossProjectReadinessJson: ROUTE_PATH,
      readOnlyCrossProjectReadinessMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV326Json: SOURCE_NODE_V326_ROUTE,
      sourceNodeV326Markdown: `${SOURCE_NODE_V326_ROUTE}?format=markdown`,
      javaV150EvidencePath: JAVA_V150_EVIDENCE_PATH,
      miniKvV142ReceiptPath: MINI_KV_V142_RECEIPT_PATH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v327 as the first read-only cross-project readiness runner.",
      "Keep Node v328 scoped to final prerequisite closure review and make it consume this v327 report.",
      "Do not start Java or mini-kv; read only the sibling evidence files or their committed historical fixture fallback.",
      "Stop if the report requires credential values, raw endpoint URLs, HTTP/TCP, Java SQL, rollback, ledger/schema writes, mini-kv writes, LOAD, COMPACT, RESTORE, SETNXEX, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV326(config: AppConfig): SourceNodeV326AbortRollbackSemanticsContractReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake({
    config,
  });
  return {
    sourceVersion: "Node v326",
    profileVersion: source.profileVersion,
    contractState: source.contractState,
    readyForContractIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake,
    targetPrerequisiteId: source.targetPrerequisiteId,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    requiredFieldCount: source.abortRollbackSemanticsContract.requiredFieldCount,
    prohibitedFieldCount: source.abortRollbackSemanticsContract.prohibitedFieldCount,
    noGoBoundaryCount: source.abortRollbackSemanticsContract.noGoBoundaryCount,
    implementationStillBlocked: source.abortRollbackSemanticsContract.implementationStillBlocked,
    abortRollbackExecutionAllowed: source.abortRollbackSemanticsContract.abortRollbackExecutionAllowed,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    javaSqlExecutionAllowed: source.javaSqlExecutionAllowed,
    miniKvWriteCommandAllowed: source.miniKvWriteCommandAllowed,
    approvalLedgerWritten: source.approvalLedgerWritten,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV150EvidenceReference(filePath: string): JavaV150AbortRollbackSemanticsEvidenceReference {
  const evidence = evidenceFile("java-v150-abort-rollback-semantics-evidence", filePath);
  const snippets = [
    snippet("java-v150-consumes-node-v326", filePath, "Java v150 接入 Node v326"),
    snippet("java-v150-read-only-echo", filePath, "新增只读 echo receipt"),
    snippet("java-v150-denies-sql-rollback-network", filePath, "不执行 SQL、部署、回滚、HTTP/TCP"),
    snippet("java-v150-denies-runtime-provider-client", filePath, "runtime shell、provider/client"),
    snippet("java-v150-denies-auto-start", filePath, "自动启动上游进程"),
  ];
  const readOnlyEchoDocumented = snippetMatched(snippets, "java-v150-read-only-echo");
  const sqlRollbackLedgerNetworkDenied = snippetMatched(snippets, "java-v150-denies-sql-rollback-network");
  const noRuntimeProviderClientDocumented = snippetMatched(snippets, "java-v150-denies-runtime-provider-client");
  const noAutomaticUpstreamStartDocumented = snippetMatched(snippets, "java-v150-denies-auto-start");

  return {
    project: "advanced-order-platform",
    sourceVersion: "Java v150",
    tagLabel: "v150-order-platform-abort-rollback-semantics-contract-echo",
    evidenceFile: evidence,
    expectedSnippets: snippets,
    evidencePresent: evidence.exists,
    readOnlyEchoDocumented,
    sqlRollbackLedgerNetworkDenied,
    noRuntimeProviderClientDocumented,
    noAutomaticUpstreamStartDocumented,
    readyForNodeConsumption:
      evidence.exists
      && readOnlyEchoDocumented
      && sqlRollbackLedgerNetworkDenied
      && noRuntimeProviderClientDocumented
      && noAutomaticUpstreamStartDocumented,
  };
}

function createMiniKvV142ReceiptReference(filePath: string): MiniKvV142AbortRollbackSemanticsReceiptReference {
  const evidence = evidenceFile("mini-kv-v142-abort-rollback-semantics-receipt", filePath);
  const receipt = readJsonObject(filePath);
  const nested = objectField(receipt, "credential_resolver_abort_rollback_semantics_contract_non_participation_receipt");

  const releaseVersion = stringAny(receipt, nested, "release_version", "current_release_version");
  const readOnly = booleanAny(receipt, nested, "read_only");
  const executionAllowed = booleanAny(receipt, nested, "execution_allowed");
  const restoreExecutionAllowed = booleanAny(receipt, nested, "restore_execution_allowed");
  const orderAuthoritative = booleanAny(receipt, nested, "order_authoritative");
  const rollbackExecutionAllowed = booleanAny(receipt, nested, "rollback_execution_allowed");
  const deploymentActionAllowed = booleanAny(receipt, nested, "deployment_action_allowed");
  const javaSqlExecutionAllowed = booleanAny(receipt, nested, "java_sql_execution_allowed");
  const miniKvWriteCommandAllowed = booleanAny(receipt, nested, "mini_kv_write_command_allowed");
  const loadRestoreCompactExecuted = booleanAny(receipt, nested, "load_restore_compact_executed");
  const setnxexExecutionAllowed = booleanAny(receipt, nested, "setnxex_execution_allowed");
  const abortRollbackAuthority = booleanAny(receipt, nested, "abort_rollback_authority");
  const consumesNodeV326 = booleanAny(
    receipt,
    nested,
    "consumes_node_v326_abort_rollback_semantics_contract_intake",
  );
  const readyForNodeV327 = booleanAny(
    receipt,
    nested,
    "ready_for_node_v327_abort_rollback_semantics_upstream_echo_verification",
  );

  return {
    project: "mini-kv",
    sourceVersion: "mini-kv v142",
    tagLabel: "第一百四十二版中止回滚语义合同非参与回执",
    evidenceFile: evidence,
    evidencePresent: evidence.exists,
    receiptVersion: stringAny(receipt, nested, "receipt_version"),
    projectVersion: stringAny(receipt, nested, "project_version", "current_project_version"),
    releaseVersion,
    consumerHint: stringAny(receipt, nested, "consumer_hint"),
    readOnly,
    executionAllowed,
    restoreExecutionAllowed,
    orderAuthoritative,
    consumesNodeV326,
    readyForNodeV327,
    rollbackExecutionAllowed,
    deploymentActionAllowed,
    javaSqlExecutionAllowed,
    miniKvWriteCommandAllowed,
    loadRestoreCompactExecuted,
    setnxexExecutionAllowed,
    credentialValueRead: booleanAny(receipt, nested, "credential_value_read"),
    rawEndpointUrlParsed: booleanAny(receipt, nested, "raw_endpoint_url_parsed"),
    externalRequestSent: booleanAny(receipt, nested, "external_request_sent"),
    httpRequestSent: booleanAny(receipt, nested, "http_request_sent"),
    tcpConnectionAttempted: booleanAny(receipt, nested, "tcp_connection_attempted"),
    automaticUpstreamStart: booleanAny(receipt, nested, "automatic_upstream_start"),
    abortRollbackAuthority,
    readyForNodeConsumption:
      evidence.exists
      && releaseVersion === "v142"
      && readOnly === true
      && executionAllowed === false
      && restoreExecutionAllowed === false
      && orderAuthoritative === false
      && rollbackExecutionAllowed === false
      && deploymentActionAllowed === false
      && javaSqlExecutionAllowed === false
      && miniKvWriteCommandAllowed === false
      && loadRestoreCompactExecuted === false
      && setnxexExecutionAllowed === false
      && abortRollbackAuthority === false
      && consumesNodeV326 === true
      && readyForNodeV327 === true,
  };
}

function createSideEffectSafetyMatrix(): ReadOnlyCrossProjectSideEffectSafetyMatrix {
  return {
    nodeStartsJavaService: false,
    nodeStartsMiniKvService: false,
    nodeReadsCredentialValue: false,
    nodeParsesRawEndpointUrl: false,
    nodeSendsHttpRequest: false,
    nodeOpensTcpConnection: false,
    nodeWritesJavaLedger: false,
    nodeExecutesJavaSql: false,
    nodeCallsRollback: false,
    nodeRunsSchemaMigration: false,
    nodeRunsDeployment: false,
    nodeRunsMiniKvLoad: false,
    nodeRunsMiniKvCompact: false,
    nodeRunsMiniKvRestore: false,
    nodeRunsMiniKvSetnxex: false,
    nodeRunsMiniKvWriteCommand: false,
    allSideEffectsClosed: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV326: SourceNodeV326AbortRollbackSemanticsContractReference,
  javaV150Evidence: JavaV150AbortRollbackSemanticsEvidenceReference,
  miniKvV142Receipt: MiniKvV142AbortRollbackSemanticsReceiptReference,
  sideEffectSafetyMatrix: ReadOnlyCrossProjectSideEffectSafetyMatrix,
): ReadOnlyCrossProjectReadinessChecks {
  return {
    nodeV326ContractReady:
      sourceNodeV326.contractState === "abort-rollback-semantics-contract-intake-ready"
      && sourceNodeV326.readyForContractIntake,
    nodeV326TargetsAbortRollbackSemantics: sourceNodeV326.targetPrerequisiteId === "abort-rollback-semantics",
    nodeV326KeepsRuntimeBlocked:
      sourceNodeV326.implementationStillBlocked
      && !sourceNodeV326.runtimeShellImplemented
      && !sourceNodeV326.runtimeShellInvocationAllowed,
    nodeV326KeepsSideEffectsClosed:
      !sourceNodeV326.executionAllowed
      && !sourceNodeV326.connectsManagedAudit
      && !sourceNodeV326.credentialValueRead
      && !sourceNodeV326.rawEndpointUrlParsed
      && !sourceNodeV326.externalRequestSent
      && !sourceNodeV326.javaSqlExecutionAllowed
      && !sourceNodeV326.miniKvWriteCommandAllowed
      && !sourceNodeV326.approvalLedgerWritten
      && !sourceNodeV326.schemaMigrationExecuted
      && !sourceNodeV326.automaticUpstreamStart,
    javaV150EvidencePresent: javaV150Evidence.evidencePresent,
    javaV150ReadOnlyEchoDocumented: javaV150Evidence.readOnlyEchoDocumented,
    javaV150SqlRollbackLedgerNetworkDenied: javaV150Evidence.sqlRollbackLedgerNetworkDenied,
    javaV150NoRuntimeProviderClientDocumented: javaV150Evidence.noRuntimeProviderClientDocumented,
    javaV150NoAutomaticUpstreamStartDocumented: javaV150Evidence.noAutomaticUpstreamStartDocumented,
    miniKvV142ReceiptPresent: miniKvV142Receipt.evidencePresent,
    miniKvV142ReleaseVersionMatches: miniKvV142Receipt.releaseVersion === "v142",
    miniKvV142ReadOnlyReceipt: miniKvV142Receipt.readOnly === true,
    miniKvV142ExecutionDenied: miniKvV142Receipt.executionAllowed === false,
    miniKvV142RestoreDenied: miniKvV142Receipt.restoreExecutionAllowed === false,
    miniKvV142WriteCommandsDenied:
      miniKvV142Receipt.miniKvWriteCommandAllowed === false
      && miniKvV142Receipt.loadRestoreCompactExecuted === false
      && miniKvV142Receipt.setnxexExecutionAllowed === false,
    miniKvV142DoesNotBecomeAuthority:
      miniKvV142Receipt.orderAuthoritative === false
      && miniKvV142Receipt.abortRollbackAuthority === false,
    miniKvV142ConsumesNodeV326: miniKvV142Receipt.consumesNodeV326 === true,
    miniKvV142ReadyForNodeV327: miniKvV142Receipt.readyForNodeV327 === true,
    sideEffectSafetyMatrixClosed: sideEffectSafetyMatrix.allSideEffectsClosed,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    readyForReadOnlyCrossProjectReadinessReport: false,
  };
}

function collectProductionBlockers(
  checks: ReadOnlyCrossProjectReadinessChecks,
): ReadOnlyCrossProjectReadinessMessage[] {
  const blockers: ReadOnlyCrossProjectReadinessMessage[] = [];
  addBlocker(blockers, checks.nodeV326ContractReady, "NODE_V326_CONTRACT_NOT_READY", "node-v326",
    "Node v326 abort/rollback semantics contract intake is not ready.");
  addBlocker(blockers, checks.javaV150EvidencePresent, "JAVA_V150_EVIDENCE_MISSING", "java-v150",
    "Java v150 local evidence was not found; v327 must fail closed.");
  addBlocker(blockers, checks.javaV150ReadOnlyEchoDocumented, "JAVA_V150_READ_ONLY_ECHO_NOT_DOCUMENTED", "java-v150",
    "Java v150 evidence does not document the read-only echo receipt.");
  addBlocker(
    blockers,
    checks.javaV150SqlRollbackLedgerNetworkDenied,
    "JAVA_V150_SIDE_EFFECT_DENIAL_MISSING",
    "java-v150",
    "Java v150 evidence does not prove SQL, rollback, deployment, ledger, and network side effects stay denied.",
  );
  addBlocker(blockers, checks.miniKvV142ReceiptPresent, "MINI_KV_V142_RECEIPT_MISSING", "mini-kv-v142",
    "mini-kv v142 non-participation receipt was not found; v327 must fail closed.");
  addBlocker(blockers, checks.miniKvV142ReleaseVersionMatches, "MINI_KV_V142_RELEASE_MISMATCH", "mini-kv-v142",
    "mini-kv receipt releaseVersion is not v142.");
  addBlocker(blockers, checks.miniKvV142ReadOnlyReceipt, "MINI_KV_V142_NOT_READ_ONLY", "mini-kv-v142",
    "mini-kv receipt does not assert read_only=true.");
  addBlocker(blockers, checks.miniKvV142ExecutionDenied, "MINI_KV_V142_EXECUTION_ALLOWED", "mini-kv-v142",
    "mini-kv receipt does not keep execution_allowed=false.");
  addBlocker(blockers, checks.miniKvV142WriteCommandsDenied, "MINI_KV_V142_WRITE_OR_ADMIN_COMMAND_ALLOWED", "mini-kv-v142",
    "mini-kv receipt does not keep write/admin command execution denied.");
  addBlocker(blockers, checks.sideEffectSafetyMatrixClosed, "SIDE_EFFECT_MATRIX_OPEN", "side-effect-safety",
    "Node v327 side-effect safety matrix is not fully closed.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this local evidence runner.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this local evidence runner.");
  return blockers;
}

function collectWarnings(): ReadOnlyCrossProjectReadinessMessage[] {
  return [
    {
      code: "READINESS_RUNNER_DOES_NOT_OPEN_RUNTIME",
      severity: "warning",
      source: "next-step",
      message: "v327 proves read-only cross-project consumption only; it is not approval for runtime shell work.",
    },
    {
      code: "JAVA_EVIDENCE_IS_MARKDOWN_UNTIL_STABLE_EXPORT_EXISTS",
      severity: "warning",
      source: "java-v150",
      message: "Java v150 is currently consumed from local archive Markdown; future Java work may stabilize JSON export.",
    },
  ];
}

function collectRecommendations(): ReadOnlyCrossProjectReadinessMessage[] {
  return [
    {
      code: "LET_NODE_V328_CONSUME_THIS_REPORT",
      severity: "recommendation",
      source: "next-step",
      message: "Node v328 should consume this v327 report for final prerequisite closure review.",
    },
    {
      code: "HARDEN_INPUT_EXPORTS_AFTER_CLOSURE",
      severity: "recommendation",
      source: "next-step",
      message: "After v328, harden stable input exports and historical fallback before discussing implementation gates.",
    },
  ];
}

function createSummary(
  javaV150Evidence: JavaV150AbortRollbackSemanticsEvidenceReference,
  miniKvV142Receipt: MiniKvV142AbortRollbackSemanticsReceiptReference,
  sideEffectSafetyMatrix: ReadOnlyCrossProjectSideEffectSafetyMatrix,
  checks: ReadOnlyCrossProjectReadinessChecks,
  productionBlockers: readonly ReadOnlyCrossProjectReadinessMessage[],
  warnings: readonly ReadOnlyCrossProjectReadinessMessage[],
  recommendations: readonly ReadOnlyCrossProjectReadinessMessage[],
): ReadOnlyCrossProjectReadinessSummary {
  const sideEffectValues = Object.entries(sideEffectSafetyMatrix)
    .filter(([key]) => key !== "allSideEffectsClosed")
    .map(([, value]) => value);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    javaEvidenceFileCount: javaV150Evidence.evidencePresent ? 1 : 0,
    javaSnippetCount: javaV150Evidence.expectedSnippets.length,
    javaMatchedSnippetCount: javaV150Evidence.expectedSnippets.filter((match) => match.matched).length,
    miniKvReceiptFileCount: miniKvV142Receipt.evidencePresent ? 1 : 0,
    sideEffectClosedCount: sideEffectValues.filter((value) => value === false).length,
    sideEffectTotalCount: sideEffectValues.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: ReadOnlyCrossProjectReadinessMessage[],
  condition: boolean,
  code: string,
  source: ReadOnlyCrossProjectReadinessMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function stringAny(primary: Record<string, unknown>, secondary: Record<string, unknown>, ...keys: string[]): string | null {
  for (const key of keys) {
    const value = stringField(primary, key) ?? stringField(secondary, key);
    if (value !== null) {
      return value;
    }
  }
  return null;
}

function booleanAny(
  primary: Record<string, unknown>,
  secondary: Record<string, unknown>,
  ...keys: string[]
): boolean | null {
  for (const key of keys) {
    const value = booleanField(primary, key) ?? booleanField(secondary, key);
    if (value !== null) {
      return value;
    }
  }
  return null;
}
