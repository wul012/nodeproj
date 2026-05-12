import crypto from "node:crypto";

import type {
  OperationApprovalExecutionGateArchiveRecord,
  OperationApprovalExecutionGateArchiveVerification,
} from "./operationApprovalExecutionGateArchive.js";

export type OperationApprovalExecutionContractDiagnosticCategory =
  | "archive"
  | "gate-preview"
  | "handoff-bundle"
  | "archive-verification"
  | "java-execution-contract"
  | "mini-kv-checkjson-contract";

export type OperationApprovalExecutionContractDiagnosticSeverity = "error" | "warning";

export interface OperationApprovalExecutionContractDiagnostic {
  code: string;
  category: OperationApprovalExecutionContractDiagnosticCategory;
  severity: OperationApprovalExecutionContractDiagnosticSeverity;
  field: string;
  source: string;
  expected?: unknown;
  actual?: unknown;
  message: string;
}

export interface OperationApprovalExecutionContractDiagnosticsDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalExecutionContractDiagnostics {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  archiveId: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalExecutionGateArchiveRecord["state"];
  valid: boolean;
  diagnosticsDigest: OperationApprovalExecutionContractDiagnosticsDigest;
  summary: {
    action: OperationApprovalExecutionGateArchiveRecord["summary"]["action"];
    target: OperationApprovalExecutionGateArchiveRecord["summary"]["target"];
    archiveVerificationValid: boolean;
    diagnosticCount: number;
    errorCount: number;
    warningCount: number;
    javaExecutionContractStatus: OperationApprovalExecutionGateArchiveRecord["summary"]["javaExecutionContractStatus"];
    javaContractDigest?: string;
    javaReplayPreconditionsSatisfied?: boolean;
    miniKvExecutionContractStatus: OperationApprovalExecutionGateArchiveRecord["summary"]["miniKvExecutionContractStatus"];
    miniKvCommandDigest?: string;
    miniKvCheckReadOnly?: boolean;
    miniKvCheckExecutionAllowed?: boolean;
  };
  diagnostics: OperationApprovalExecutionContractDiagnostic[];
  nextActions: string[];
}

const DIAGNOSTICS_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "archiveId",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "valid",
  "summary",
  "diagnostics",
  "nextActions",
]);

export function createOperationApprovalExecutionContractDiagnostics(
  archive: OperationApprovalExecutionGateArchiveRecord,
  archiveVerification: OperationApprovalExecutionGateArchiveVerification,
): OperationApprovalExecutionContractDiagnostics {
  const diagnostics = [
    ...diagnoseArchiveVerification(archive, archiveVerification),
    ...diagnoseArchivePreviewSnapshot(archive),
    ...diagnoseJavaExecutionContract(archive),
    ...diagnoseMiniKvCheckJsonContract(archive),
  ];
  const errorCount = diagnostics.filter((diagnostic) => diagnostic.severity === "error").length;
  const warningCount = diagnostics.length - errorCount;
  const valid = errorCount === 0;
  const summary = {
    action: archive.summary.action,
    target: archive.summary.target,
    archiveVerificationValid: archiveVerification.valid,
    diagnosticCount: diagnostics.length,
    errorCount,
    warningCount,
    javaExecutionContractStatus: archive.summary.javaExecutionContractStatus,
    ...(archive.summary.javaContractDigest === undefined ? {} : { javaContractDigest: archive.summary.javaContractDigest }),
    ...(archive.summary.javaReplayPreconditionsSatisfied === undefined ? {} : { javaReplayPreconditionsSatisfied: archive.summary.javaReplayPreconditionsSatisfied }),
    miniKvExecutionContractStatus: archive.summary.miniKvExecutionContractStatus,
    ...(archive.summary.miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest: archive.summary.miniKvCommandDigest }),
    ...(archive.summary.miniKvCheckReadOnly === undefined ? {} : { miniKvCheckReadOnly: archive.summary.miniKvCheckReadOnly }),
    ...(archive.summary.miniKvCheckExecutionAllowed === undefined ? {} : { miniKvCheckExecutionAllowed: archive.summary.miniKvCheckExecutionAllowed }),
  };
  const nextActions = collectNextActions(valid, diagnostics);
  const reportWithoutDigest = {
    service: "orderops-node" as const,
    title: `Execution contract mismatch diagnostics for ${archive.summary.action}`,
    generatedAt: new Date().toISOString(),
    archiveId: archive.archiveId,
    requestId: archive.requestId,
    ...(archive.decisionId === undefined ? {} : { decisionId: archive.decisionId }),
    intentId: archive.intentId,
    state: archive.state,
    valid,
    summary,
    diagnostics,
    nextActions,
  };

  return {
    ...reportWithoutDigest,
    diagnosticsDigest: digestOperationApprovalExecutionContractDiagnostics(reportWithoutDigest),
  };
}

export function renderOperationApprovalExecutionContractDiagnosticsMarkdown(
  report: OperationApprovalExecutionContractDiagnostics,
): string {
  return [
    "# Operation approval execution contract mismatch diagnostics",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- Archive id: ${report.archiveId}`,
    `- Request id: ${report.requestId}`,
    `- Decision id: ${report.decisionId ?? "missing"}`,
    `- Intent id: ${report.intentId}`,
    `- State: ${report.state}`,
    `- Valid: ${report.valid}`,
    `- Diagnostics digest: ${report.diagnosticsDigest.algorithm}:${report.diagnosticsDigest.value}`,
    "",
    "## Summary",
    "",
    `- Action: ${report.summary.action}`,
    `- Target: ${report.summary.target}`,
    `- Archive verification valid: ${report.summary.archiveVerificationValid}`,
    `- Diagnostic count: ${report.summary.diagnosticCount}`,
    `- Error count: ${report.summary.errorCount}`,
    `- Warning count: ${report.summary.warningCount}`,
    `- Java execution contract: ${report.summary.javaExecutionContractStatus}`,
    `- Java contract digest: ${report.summary.javaContractDigest ?? "unknown"}`,
    `- Java replay preconditions satisfied: ${report.summary.javaReplayPreconditionsSatisfied === undefined ? "unknown" : report.summary.javaReplayPreconditionsSatisfied}`,
    `- mini-kv CHECKJSON contract: ${report.summary.miniKvExecutionContractStatus}`,
    `- mini-kv command digest: ${report.summary.miniKvCommandDigest ?? "unknown"}`,
    `- mini-kv CHECKJSON read_only: ${report.summary.miniKvCheckReadOnly === undefined ? "unknown" : report.summary.miniKvCheckReadOnly}`,
    `- mini-kv CHECKJSON execution_allowed: ${report.summary.miniKvCheckExecutionAllowed === undefined ? "unknown" : report.summary.miniKvCheckExecutionAllowed}`,
    "",
    "## Diagnostics",
    "",
    ...renderDiagnostics(report.diagnostics),
    "",
    "## Next Actions",
    "",
    ...renderList(report.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function diagnoseArchiveVerification(
  archive: OperationApprovalExecutionGateArchiveRecord,
  verification: OperationApprovalExecutionGateArchiveVerification,
): OperationApprovalExecutionContractDiagnostic[] {
  const diagnostics: OperationApprovalExecutionContractDiagnostic[] = [];
  addIf(diagnostics, !verification.checks.archiveDigestValid, {
    code: "ARCHIVE_DIGEST_MISMATCH",
    category: "archive",
    field: "archiveDigest",
    source: "archive-verification",
    expected: renderDigest(verification.recomputedArchiveDigest),
    actual: renderDigest(verification.storedArchiveDigest),
    message: "Stored archive digest does not match the recomputed archive digest.",
  });
  addIf(diagnostics, !verification.checks.gateDigestMatchesPreview, {
    code: "GATE_DIGEST_PREVIEW_MISMATCH",
    category: "gate-preview",
    field: "gateDigest",
    source: "archive.preview",
    expected: renderDigest(verification.archivedPreviewGateDigest),
    actual: renderDigest(verification.storedGateDigest),
    message: "Stored gate digest differs from the archived preview gate digest.",
  });
  addIf(diagnostics, !verification.checks.bundleDigestMatchesPreview, {
    code: "HANDOFF_BUNDLE_DIGEST_PREVIEW_MISMATCH",
    category: "handoff-bundle",
    field: "bundleDigest",
    source: "archive.preview",
    expected: renderDigest(verification.archivedPreviewBundleDigest),
    actual: renderDigest(verification.storedBundleDigest),
    message: "Stored handoff bundle digest differs from the archived preview bundle digest.",
  });
  addIf(diagnostics, !verification.checks.requestLedgerMatches, {
    code: "REQUEST_LEDGER_MISMATCH",
    category: "archive-verification",
    field: "requestId",
    source: "request-ledger",
    expected: archive.requestId,
    actual: verification.summary.requestId,
    message: "Archive request reference no longer matches the request ledger verification.",
  });
  addIf(diagnostics, !verification.checks.decisionLedgerMatches, {
    code: "DECISION_LEDGER_MISMATCH",
    category: "archive-verification",
    field: "decisionId",
    source: "decision-ledger",
    expected: archive.decisionId ?? "missing",
    actual: verification.summary.decisionId ?? "missing",
    message: "Archive decision reference no longer matches the decision ledger verification.",
  });
  addIf(diagnostics, !verification.checks.executionAllowedStillFalse, {
    code: "EXECUTION_ALLOWED_CHANGED",
    category: "archive-verification",
    field: "executionAllowed",
    source: "archive.preview",
    expected: false,
    actual: archive.preview.executionAllowed,
    message: "Execution gate archive no longer proves executionAllowed=false.",
  });
  addIf(diagnostics, !verification.checks.previewOnlyStillTrue, {
    code: "PREVIEW_ONLY_CHANGED",
    category: "archive-verification",
    field: "previewOnly",
    source: "archive.preview",
    expected: true,
    actual: archive.preview.previewOnly,
    message: "Execution gate archive no longer proves previewOnly=true.",
  });
  return diagnostics;
}

function diagnoseArchivePreviewSnapshot(
  archive: OperationApprovalExecutionGateArchiveRecord,
): OperationApprovalExecutionContractDiagnostic[] {
  const diagnostics: OperationApprovalExecutionContractDiagnostic[] = [];
  addSnapshotMismatch(diagnostics, archive, "javaContractDigest", "java-execution-contract");
  addSnapshotMismatch(diagnostics, archive, "javaReplayPreconditionsSatisfied", "java-execution-contract");
  addSnapshotMismatch(diagnostics, archive, "javaDigestVerificationMode", "java-execution-contract");
  addSnapshotMismatch(diagnostics, archive, "miniKvCommandDigest", "mini-kv-checkjson-contract");
  addSnapshotMismatch(diagnostics, archive, "miniKvCheckReadOnly", "mini-kv-checkjson-contract");
  addSnapshotMismatch(diagnostics, archive, "miniKvCheckExecutionAllowed", "mini-kv-checkjson-contract");
  addSnapshotMismatch(diagnostics, archive, "miniKvCheckDurability", "mini-kv-checkjson-contract");
  return diagnostics;
}

function diagnoseJavaExecutionContract(
  archive: OperationApprovalExecutionGateArchiveRecord,
): OperationApprovalExecutionContractDiagnostic[] {
  if (!javaContractApplies(archive)) {
    return [];
  }

  const diagnostics: OperationApprovalExecutionContractDiagnostic[] = [];
  addIf(diagnostics, archive.summary.javaExecutionContractStatus !== "available", {
    code: "JAVA_EXECUTION_CONTRACT_MISSING",
    category: "java-execution-contract",
    field: "javaExecutionContractStatus",
    source: "archive.summary",
    expected: "available",
    actual: archive.summary.javaExecutionContractStatus,
    message: "Java replay execution contract is required for this archive but is not available.",
  });
  addIf(diagnostics, !isSha256Digest(archive.summary.javaContractDigest), {
    code: "JAVA_CONTRACT_DIGEST_INVALID",
    category: "java-execution-contract",
    field: "javaContractDigest",
    source: "archive.summary",
    expected: "sha256:<64 hex chars>",
    actual: archive.summary.javaContractDigest ?? "missing",
    message: "Java execution contract digest is missing or malformed.",
  });
  addIf(diagnostics, archive.gateChecks.javaExecutionContractEvidenceValid !== true, {
    code: "JAVA_EXECUTION_CONTRACT_GATE_CHECK_FAILED",
    category: "java-execution-contract",
    field: "gateChecks.javaExecutionContractEvidenceValid",
    source: "archive.gateChecks",
    expected: true,
    actual: archive.gateChecks.javaExecutionContractEvidenceValid,
    message: "Gate preview did not accept the Java execution contract evidence.",
  });
  addIf(diagnostics, archive.summary.javaReplayPreconditionsSatisfied !== true, {
    code: "JAVA_REPLAY_PRECONDITIONS_NOT_SATISFIED",
    category: "java-execution-contract",
    field: "javaReplayPreconditionsSatisfied",
    source: "archive.summary",
    expected: true,
    actual: archive.summary.javaReplayPreconditionsSatisfied ?? "missing",
    message: "Java replay preconditions are not satisfied in the archived contract summary.",
  });
  addIf(diagnostics, archive.summary.javaDigestVerificationMode !== "CLIENT_PRECHECK_ONLY", {
    code: "JAVA_DIGEST_VERIFICATION_MODE_MISMATCH",
    category: "java-execution-contract",
    field: "javaDigestVerificationMode",
    source: "archive.summary",
    expected: "CLIENT_PRECHECK_ONLY",
    actual: archive.summary.javaDigestVerificationMode ?? "missing",
    message: "Java digest verification mode differs from the expected client precheck contract.",
  });
  return diagnostics;
}

function diagnoseMiniKvCheckJsonContract(
  archive: OperationApprovalExecutionGateArchiveRecord,
): OperationApprovalExecutionContractDiagnostic[] {
  if (archive.summary.target !== "mini-kv") {
    return [];
  }

  const diagnostics: OperationApprovalExecutionContractDiagnostic[] = [];
  addIf(diagnostics, archive.summary.miniKvExecutionContractStatus !== "available", {
    code: "MINIKV_CHECKJSON_CONTRACT_MISSING",
    category: "mini-kv-checkjson-contract",
    field: "miniKvExecutionContractStatus",
    source: "archive.summary",
    expected: "available",
    actual: archive.summary.miniKvExecutionContractStatus,
    message: "mini-kv CHECKJSON contract is required for this archive but is not available.",
  });
  addIf(diagnostics, !isFnv1a64Digest(archive.summary.miniKvCommandDigest), {
    code: "MINIKV_COMMAND_DIGEST_INVALID",
    category: "mini-kv-checkjson-contract",
    field: "miniKvCommandDigest",
    source: "archive.summary",
    expected: "fnv1a64:<16 hex chars>",
    actual: archive.summary.miniKvCommandDigest ?? "missing",
    message: "mini-kv CHECKJSON command digest is missing or malformed.",
  });
  addIf(diagnostics, archive.gateChecks.miniKvExecutionContractEvidenceValid !== true, {
    code: "MINIKV_CHECKJSON_GATE_CHECK_FAILED",
    category: "mini-kv-checkjson-contract",
    field: "gateChecks.miniKvExecutionContractEvidenceValid",
    source: "archive.gateChecks",
    expected: true,
    actual: archive.gateChecks.miniKvExecutionContractEvidenceValid,
    message: "Gate preview did not accept the mini-kv CHECKJSON execution contract evidence.",
  });
  addIf(diagnostics, archive.summary.miniKvCheckReadOnly !== true, {
    code: "MINIKV_CHECKJSON_NOT_READ_ONLY",
    category: "mini-kv-checkjson-contract",
    field: "miniKvCheckReadOnly",
    source: "archive.summary",
    expected: true,
    actual: archive.summary.miniKvCheckReadOnly ?? "missing",
    message: "mini-kv CHECKJSON summary no longer proves read_only=true.",
  });
  addIf(diagnostics, archive.summary.miniKvCheckExecutionAllowed !== false, {
    code: "MINIKV_CHECKJSON_EXECUTION_ALLOWED",
    category: "mini-kv-checkjson-contract",
    field: "miniKvCheckExecutionAllowed",
    source: "archive.summary",
    expected: false,
    actual: archive.summary.miniKvCheckExecutionAllowed ?? "missing",
    message: "mini-kv CHECKJSON summary no longer proves execution_allowed=false.",
  });
  return diagnostics;
}

function addSnapshotMismatch(
  diagnostics: OperationApprovalExecutionContractDiagnostic[],
  archive: OperationApprovalExecutionGateArchiveRecord,
  field: keyof OperationApprovalExecutionGateArchiveRecord["summary"],
  category: Extract<OperationApprovalExecutionContractDiagnosticCategory, "java-execution-contract" | "mini-kv-checkjson-contract">,
): void {
  const expected = archive.preview.summary[field];
  const actual = archive.summary[field];
  if (stableJson(expected ?? null) === stableJson(actual ?? null)) {
    return;
  }
  diagnostics.push({
    code: `${String(field).replace(/[A-Z]/g, (char) => `_${char}`).toUpperCase()}_ARCHIVE_PREVIEW_MISMATCH`,
    category,
    severity: "error",
    field: String(field),
    source: "archive.summary",
    expected: expected ?? "missing",
    actual: actual ?? "missing",
    message: `Archive summary field ${String(field)} differs from the archived gate preview snapshot.`,
  });
}

function addIf(
  diagnostics: OperationApprovalExecutionContractDiagnostic[],
  condition: boolean,
  input: Omit<OperationApprovalExecutionContractDiagnostic, "severity"> & {
    severity?: OperationApprovalExecutionContractDiagnosticSeverity;
  },
): void {
  if (!condition) {
    return;
  }
  diagnostics.push({
    severity: input.severity ?? "error",
    ...input,
  });
}

function collectNextActions(
  valid: boolean,
  diagnostics: OperationApprovalExecutionContractDiagnostic[],
): string[] {
  if (valid) {
    return [
      "Execution contract diagnostics are clean; keep this report with the archive bundle.",
      "Do not treat diagnostics as execution approval; real upstream execution remains outside this flow.",
    ];
  }

  const codes = diagnostics.map((diagnostic) => diagnostic.code).join(", ");
  return [
    `Resolve or regenerate mismatched evidence before moving toward execution review: ${codes}`,
    "Do not auto-fix mismatch diagnostics and do not bypass the reviewer decision.",
  ];
}

function digestOperationApprovalExecutionContractDiagnostics(
  report: Omit<OperationApprovalExecutionContractDiagnostics, "diagnosticsDigest">,
): OperationApprovalExecutionContractDiagnosticsDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: report.service,
        archiveId: report.archiveId,
        requestId: report.requestId,
        decisionId: report.decisionId ?? null,
        intentId: report.intentId,
        state: report.state,
        valid: report.valid,
        summary: report.summary,
        diagnostics: report.diagnostics,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...DIAGNOSTICS_DIGEST_COVERED_FIELDS],
  };
}

function renderDiagnostics(diagnostics: OperationApprovalExecutionContractDiagnostic[]): string[] {
  if (diagnostics.length === 0) {
    return ["- No execution contract mismatch diagnostics."];
  }

  return diagnostics.flatMap((diagnostic) => [
    `### ${diagnostic.code}`,
    "",
    `- Category: ${diagnostic.category}`,
    `- Severity: ${diagnostic.severity}`,
    `- Field: ${diagnostic.field}`,
    `- Source: ${diagnostic.source}`,
    `- Expected: ${formatValue(diagnostic.expected)}`,
    `- Actual: ${formatValue(diagnostic.actual)}`,
    `- Message: ${diagnostic.message}`,
    "",
  ]);
}

function javaContractApplies(archive: OperationApprovalExecutionGateArchiveRecord): boolean {
  return archive.summary.target === "order-platform"
    && archive.summary.action === "failed-event-replay-simulation";
}

function isSha256Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/i.test(value);
}

function isFnv1a64Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^fnv1a64:[a-f0-9]{16}$/i.test(value);
}

function renderDigest(digest: { algorithm: "sha256"; value: string }): string {
  return `${digest.algorithm}:${digest.value}`;
}

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === undefined) {
    return "missing";
  }
  return JSON.stringify(value);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
