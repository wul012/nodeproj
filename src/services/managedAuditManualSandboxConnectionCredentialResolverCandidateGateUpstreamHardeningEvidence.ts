import {
  booleanField,
  evidenceFile,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import type {
  JavaV151EvidenceExportHintReference,
  JavaV152InputHardeningDecisionEchoReference,
  MiniKvV143InputHardeningReceiptReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewTypes.js";

export function createJavaV151EvidenceExportHintReference(filePath: string): JavaV151EvidenceExportHintReference {
  const evidence = evidenceFile("java-v151-evidence-export-hint", filePath);
  const snippets = [
    snippet("java-v151-evidence-export-hint", filePath, "evidenceExportHint"),
    snippet("java-v151-stable-json-export", filePath, "release-approval-rehearsal-current.json"),
    snippet("java-v151-read-only-export", filePath, "稳定只读 JSON 响应导出证据"),
    snippet("java-v151-no-credential-value", filePath, "不读取 credential value"),
    snippet("java-v151-no-raw-endpoint-url", filePath, "不解析 raw endpoint url"),
    snippet("java-v151-no-http-tcp", filePath, "不执行 HTTP/TCP"),
    snippet("java-v151-no-ledger-schema", filePath, "不写 approval ledger"),
    snippet("java-v151-no-deployment-rollback", filePath, "不触发 deployment / rollback"),
    snippet("java-v151-no-auto-start", filePath, "不自动启动 upstream process"),
  ];
  const evidenceExportHintDocumented = snippetMatched(snippets, "java-v151-evidence-export-hint");
  const stableReadOnlyJsonExportDocumented =
    snippetMatched(snippets, "java-v151-stable-json-export")
    && snippetMatched(snippets, "java-v151-read-only-export");
  const credentialAndEndpointBoundariesDocumented =
    snippetMatched(snippets, "java-v151-no-credential-value")
    && snippetMatched(snippets, "java-v151-no-raw-endpoint-url");
  const networkWriteRollbackSchemaBoundariesDocumented =
    snippetMatched(snippets, "java-v151-no-http-tcp")
    && snippetMatched(snippets, "java-v151-no-ledger-schema")
    && snippetMatched(snippets, "java-v151-no-deployment-rollback");
  const automaticUpstreamStartDenied = snippetMatched(snippets, "java-v151-no-auto-start");

  return {
    project: "advanced-order-platform",
    sourceVersion: "Java v151",
    evidenceFile: evidence,
    expectedSnippets: snippets,
    evidencePresent: evidence.exists,
    evidenceExportHintDocumented,
    stableReadOnlyJsonExportDocumented,
    endpointEvidenceExportDocumented: stableReadOnlyJsonExportDocumented,
    credentialAndEndpointBoundariesDocumented,
    networkWriteRollbackSchemaBoundariesDocumented,
    automaticUpstreamStartDenied,
    readyForNodeConsumption:
      evidence.exists
      && evidenceExportHintDocumented
      && stableReadOnlyJsonExportDocumented
      && credentialAndEndpointBoundariesDocumented
      && networkWriteRollbackSchemaBoundariesDocumented
      && automaticUpstreamStartDenied,
  };
}

export function createJavaV152InputHardeningDecisionEchoReference(
  filePath: string,
): JavaV152InputHardeningDecisionEchoReference {
  const evidence = evidenceFile("java-v152-input-hardening-decision-echo", filePath);
  const snippets = [
    snippet("java-v152-input-hardening-echo", filePath, "inputHardeningDecisionEcho"),
    snippet("java-v152-consumes-node-v329", filePath, "Java v152 消费 Node v329"),
    snippet("java-v152-confirms-v151-export", filePath, "Java v151 已经提供稳定只读 evidence export"),
    snippet("java-v152-node-v330-waits", filePath, "Node v330 仍要等待并消费两边上游证据"),
    snippet("java-v152-no-provider-client", filePath, "不实例化 provider/client"),
    snippet("java-v152-no-http-tcp", filePath, "不发 HTTP/TCP"),
    snippet("java-v152-no-managed-audit", filePath, "不打开 managed audit connection"),
    snippet("java-v152-no-ledger-schema", filePath, "不写 approval ledger / schema"),
    snippet("java-v152-no-sql-rollback", filePath, "不执行 SQL / deployment / rollback"),
    snippet("java-v152-no-auto-start", filePath, "不自动启动 upstream process"),
  ];
  const inputHardeningDecisionEchoDocumented = snippetMatched(snippets, "java-v152-input-hardening-echo");
  const consumesNodeV329Decision = snippetMatched(snippets, "java-v152-consumes-node-v329");
  const confirmsJavaV151StableEvidenceExport = snippetMatched(snippets, "java-v152-confirms-v151-export");
  const nodeV330WaitDocumented = snippetMatched(snippets, "java-v152-node-v330-waits");
  const providerClientNetworkBoundariesDocumented =
    snippetMatched(snippets, "java-v152-no-provider-client")
    && snippetMatched(snippets, "java-v152-no-http-tcp")
    && snippetMatched(snippets, "java-v152-no-managed-audit");
  const javaWriteBoundariesDocumented =
    snippetMatched(snippets, "java-v152-no-ledger-schema")
    && snippetMatched(snippets, "java-v152-no-sql-rollback");
  const automaticUpstreamStartDenied = snippetMatched(snippets, "java-v152-no-auto-start");

  return {
    project: "advanced-order-platform",
    sourceVersion: "Java v152",
    evidenceFile: evidence,
    expectedSnippets: snippets,
    evidencePresent: evidence.exists,
    inputHardeningDecisionEchoDocumented,
    consumesNodeV329Decision,
    confirmsJavaV151StableEvidenceExport,
    nodeV330WaitDocumented,
    providerClientNetworkBoundariesDocumented,
    javaWriteBoundariesDocumented,
    automaticUpstreamStartDenied,
    readyForNodeConsumption:
      evidence.exists
      && inputHardeningDecisionEchoDocumented
      && consumesNodeV329Decision
      && confirmsJavaV151StableEvidenceExport
      && nodeV330WaitDocumented
      && providerClientNetworkBoundariesDocumented
      && javaWriteBoundariesDocumented
      && automaticUpstreamStartDenied,
  };
}

export function createMiniKvV143ReceiptReference(filePath: string): MiniKvV143InputHardeningReceiptReference {
  const evidence = evidenceFile("mini-kv-v143-input-hardening-receipt", filePath);
  const receipt = readJsonObject(filePath);
  const nested = objectField(
    receipt,
    "credential_resolver_implementation_candidate_gate_input_hardening_non_participation_receipt",
  );
  const miniKvReceipt = objectField(nested, "mini_kv_receipt");
  const stableExport = objectField(miniKvReceipt, "stable_current_receipt_export");
  const checks = objectField(nested, "checks");
  const records = [receipt, nested, miniKvReceipt, stableExport, checks];
  const releaseVersion = stringFrom(records, "release_version", "current_release_version");
  const stableCurrentReceiptExportReady = booleanFrom(records, "stable_current_receipt_export_ready");
  const stableCurrentReceiptPathRequired = booleanFrom(records, "stable_current_receipt_path_required");
  const readyForNodeV330AfterJavaV151 = booleanFrom(
    records,
    "ready_for_node_v330_candidate_gate_upstream_alignment_after_java_v151",
  );
  const readyForNodeV330BeforeJavaV151 = booleanFrom(records, "ready_for_node_v330_before_java_v151");
  const miniKvWriteCommandAllowed = booleanFrom(records, "mini_kv_write_command_allowed");
  const miniKvLoadAllowed = booleanFrom(records, "mini_kv_load_allowed");
  const miniKvCompactAllowed = booleanFrom(records, "mini_kv_compact_allowed");
  const miniKvRestoreAllowed = booleanFrom(records, "mini_kv_restore_allowed");
  const miniKvSetnxexAllowed = booleanFrom(records, "mini_kv_setnxex_allowed", "setnxex_execution_allowed");
  const readyForDisabledRuntimeShellDesignDraft = booleanFrom(
    records,
    "ready_for_disabled_runtime_shell_design_draft",
    "runtime_shell_design_draft_allowed",
  );
  const runtimeShellImplemented = booleanFrom(records, "runtime_shell_implemented");
  const runtimeShellInvocationAllowed = booleanFrom(records, "runtime_shell_invocation_allowed");
  const realResolverImplementationAllowed = booleanFrom(records, "real_resolver_implementation_allowed");
  const credentialValueRead = booleanFrom(records, "credential_value_read");
  const rawEndpointUrlParsed = booleanFrom(records, "raw_endpoint_url_parsed");
  const externalRequestSent = booleanFrom(records, "external_request_sent");
  const httpRequestSent = booleanFrom(records, "http_request_sent");
  const tcpConnectionAttempted = booleanFrom(records, "tcp_connection_attempted");
  const javaSqlExecutionAllowed = booleanFrom(records, "java_sql_execution_allowed");
  const rollbackExecutionAllowed = booleanFrom(records, "rollback_execution_allowed");
  const approvalLedgerWritten = booleanFrom(records, "approval_ledger_written");
  const schemaMigrationExecuted = booleanFrom(records, "schema_migration_executed");
  const automaticUpstreamStart = booleanFrom(records, "automatic_upstream_start");

  return {
    project: "mini-kv",
    sourceVersion: "mini-kv v143",
    evidenceFile: evidence,
    evidencePresent: evidence.exists,
    receiptVersion: stringFrom(records, "receipt_version"),
    projectVersion: stringFrom(records, "project_version", "current_project_version"),
    releaseVersion,
    consumerHint: stringFrom(records, "consumer_hint"),
    readOnly: booleanFrom(records, "read_only"),
    executionAllowed: booleanFrom(records, "execution_allowed"),
    restoreExecutionAllowed: booleanFrom(records, "restore_execution_allowed"),
    orderAuthoritative: booleanFrom(records, "order_authoritative"),
    stableCurrentReceiptExportReady,
    stableCurrentReceiptPathRequired,
    readyForNodeV330AfterJavaV151,
    readyForNodeV330BeforeJavaV151,
    readyForDisabledRuntimeShellDesignDraft,
    runtimeShellImplemented,
    runtimeShellInvocationAllowed,
    realResolverImplementationAllowed,
    credentialValueRead,
    rawEndpointUrlParsed,
    externalRequestSent,
    httpRequestSent,
    tcpConnectionAttempted,
    javaSqlExecutionAllowed,
    rollbackExecutionAllowed,
    approvalLedgerWritten,
    schemaMigrationExecuted,
    miniKvWriteCommandAllowed,
    miniKvLoadAllowed,
    miniKvCompactAllowed,
    miniKvRestoreAllowed,
    miniKvSetnxexAllowed,
    automaticUpstreamStart,
    readyForNodeConsumption:
      evidence.exists
      && releaseVersion === "v143"
      && booleanFrom(records, "read_only") === true
      && booleanFrom(records, "execution_allowed") === false
      && booleanFrom(records, "restore_execution_allowed") === false
      && booleanFrom(records, "order_authoritative") === false
      && stableCurrentReceiptExportReady === true
      && stableCurrentReceiptPathRequired === true
      && readyForNodeV330AfterJavaV151 === true
      && readyForNodeV330BeforeJavaV151 === false
      && readyForDisabledRuntimeShellDesignDraft === false
      && runtimeShellImplemented === false
      && runtimeShellInvocationAllowed === false
      && realResolverImplementationAllowed === false
      && credentialValueRead === false
      && rawEndpointUrlParsed === false
      && externalRequestSent === false
      && httpRequestSent === false
      && tcpConnectionAttempted === false
      && javaSqlExecutionAllowed === false
      && rollbackExecutionAllowed === false
      && approvalLedgerWritten === false
      && schemaMigrationExecuted === false
      && miniKvWriteCommandAllowed === false
      && miniKvLoadAllowed === false
      && miniKvCompactAllowed === false
      && miniKvRestoreAllowed === false
      && miniKvSetnxexAllowed === false
      && automaticUpstreamStart === false,
  };
}

function stringFrom(records: readonly Record<string, unknown>[], ...keys: string[]): string | null {
  for (const record of records) {
    for (const key of keys) {
      const value = stringField(record, key);
      if (value !== null) {
        return value;
      }
    }
  }
  return null;
}

function booleanFrom(records: readonly Record<string, unknown>[], ...keys: string[]): boolean | null {
  for (const record of records) {
    for (const key of keys) {
      const value = booleanField(record, key);
      if (value !== null) {
        return value;
      }
    }
  }
  return null;
}
