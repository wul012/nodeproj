import {
  evidenceFile,
  snippet,
  snippetMatched,
} from "../historicalEvidenceReportUtils.js";
import {
  JAVA_V99_BUILDER,
  JAVA_V99_RUNBOOK,
  JAVA_V99_WALKTHROUGH,
} from "./constants.js";
import type { JavaV99Echo } from "./types.js";

type SnippetSpec = readonly [id: string, path: string, text: string];
type SnippetMatcher = (id: string) => boolean;

const JAVA_SNIPPETS: readonly SnippetSpec[] = [
  ["java-v99-receipt-field", JAVA_V99_WALKTHROUGH, "managedAuditSandboxConnectionPrecheckPacketEchoReceipt"],
  ["java-v99-ready-for-node-v246", JAVA_V99_WALKTHROUGH, "readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification=true"],
  ["java-v99-schema", JAVA_V99_WALKTHROUGH, "java-release-approval-rehearsal-response-schema.v23"],
  ["java-v99-item-count", JAVA_V99_WALKTHROUGH, "precheckItemCount=7"],
  ["java-v99-timeout", JAVA_V99_WALKTHROUGH, "timeoutBudgetMs=15000"],
  ["java-v99-no-credential-echo", JAVA_V99_WALKTHROUGH, "credentialValueEchoed=false"],
  ["java-v99-no-credential-read", JAVA_V99_WALKTHROUGH, "credentialValueReadByJava=false"],
  ["java-v99-no-connection", JAVA_V99_WALKTHROUGH, "actualConnectionAttemptedByJava=false"],
  ["java-v99-no-sql", JAVA_V99_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"],
  ["java-v99-no-ledger", JAVA_V99_WALKTHROUGH, "approvalLedgerWrittenByJava=false"],
  ["java-v99-no-mini-kv-write", JAVA_V99_WALKTHROUGH, "miniKvWritePermissionRequestedByJava=false"],
  ["java-v99-builder-review-field", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE_REVIEW"],
  ["java-v99-builder-rehearsal-field", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_SCHEMA_MIGRATION_REHEARSAL_ID"],
  ["java-v99-builder-operator-window", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_OPERATOR_WINDOW"],
];

export function createJavaV99Echo(): JavaV99Echo {
  const evidenceFiles = [
    evidenceFile("java-v99-runbook", JAVA_V99_RUNBOOK, { textMode: "raw" }),
    evidenceFile("java-v99-walkthrough", JAVA_V99_WALKTHROUGH, { textMode: "raw" }),
    evidenceFile("java-v99-builder", JAVA_V99_BUILDER, { textMode: "raw" }),
  ];
  const expectedSnippets = JAVA_SNIPPETS.map(([id, path, text]) => snippet(id, path, text));
  const matched = (id: string) => snippetMatched(expectedSnippets, id);
  const reference: JavaV99Echo = {
    sourceVersion: "Java v99",
    tagLabel: "v99订单平台release-approval-sandbox-precheck-packet-echo-receipt",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    responseSchemaVersion: selectBySnippet(
      matched,
      "java-v99-schema",
      "java-release-approval-rehearsal-response-schema.v23",
      "missing",
    ),
    receiptField: selectBySnippet(
      matched,
      "java-v99-receipt-field",
      "managedAuditSandboxConnectionPrecheckPacketEchoReceipt",
      "missing",
    ),
    precheckItemCount: selectBySnippet(matched, "java-v99-item-count", 7, 0),
    timeoutBudgetMs: selectBySnippet(matched, "java-v99-timeout", 15000, 0),
    readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification:
      matched("java-v99-ready-for-node-v246"),
    fieldEchoComplete: hasFieldEcho(matched),
    javaUsesReviewSpecificFieldNames: true,
    credentialValueEchoed: false,
    credentialValueReadByJava: false,
    actualConnectionAttemptedByJava: false,
    externalManagedAuditConnectionOpenedByJava: false,
    schemaMigrationSqlExecutedByJava: false,
    approvalLedgerWrittenByJava: false,
    managedAuditStateWriteRequestedByJava: false,
    upstreamServiceAutoStartRequestedByJava: false,
    miniKvWritePermissionRequestedByJava: false,
    readyForNodeV247Alignment: false,
  };

  return { ...reference, readyForNodeV247Alignment: isAligned(reference) };
}

function selectBySnippet<T>(
  matched: SnippetMatcher,
  id: string,
  present: T,
  missing: T,
): T {
  return matched(id) ? present : missing;
}

function hasFieldEcho(matched: SnippetMatcher): boolean {
  return [
    "java-v99-builder-review-field",
    "java-v99-builder-rehearsal-field",
    "java-v99-builder-operator-window",
  ].every(matched);
}

function isAligned(reference: JavaV99Echo): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v23"
    && reference.receiptField === "managedAuditSandboxConnectionPrecheckPacketEchoReceipt"
    && reference.precheckItemCount === 7
    && reference.timeoutBudgetMs === 15000
    && reference.readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification
    && reference.fieldEchoComplete
    && !reference.credentialValueEchoed
    && !reference.credentialValueReadByJava
    && !reference.actualConnectionAttemptedByJava
    && !reference.externalManagedAuditConnectionOpenedByJava
    && !reference.schemaMigrationSqlExecutedByJava
    && !reference.approvalLedgerWrittenByJava
    && !reference.managedAuditStateWriteRequestedByJava
    && !reference.upstreamServiceAutoStartRequestedByJava
    && !reference.miniKvWritePermissionRequestedByJava;
}
