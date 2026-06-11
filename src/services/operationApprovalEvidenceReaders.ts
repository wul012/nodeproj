import type { OperationApprovalRequest } from "./operationApprovalRequest.js";

export function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

export function inferFailedEventId(request: OperationApprovalRequest): string | undefined {
  return readFailedEventId(request.preview.evidence.javaReplaySimulation.details)
    ?? readFailedEventId(request.preview.preflightReport.preflight.evidence.javaReplayReadiness.details);
}

export function readFailedEventId(details: unknown): string | undefined {
  if (!isRecord(details)) {
    return undefined;
  }

  return normalizeFailedEventId(details.failedEventId)
    ?? (isRecord(details.simulation) ? normalizeFailedEventId(details.simulation.failedEventId) : undefined)
    ?? (isRecord(details.readiness) ? normalizeFailedEventId(details.readiness.failedEventId) : undefined)
    ?? (isRecord(details.approvalStatus) ? normalizeFailedEventId(details.approvalStatus.failedEventId) : undefined);
}

export function normalizeFailedEventId(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) {
    return String(value);
  }
  if (typeof value === "string" && /^[0-9]+$/.test(value.trim())) {
    return value.trim();
  }
  return undefined;
}

export function inferMiniKvExplainCommand(request: OperationApprovalRequest): string | undefined {
  const details = request.preview.evidence.miniKvCommandExplain.details;
  if (!isRecord(details) || typeof details.command !== "string") {
    return undefined;
  }

  const command = details.command.trim();
  return command.length === 0 ? undefined : command;
}

export function readJavaApprovedForReplay(details: unknown): boolean | undefined {
  if (!isRecord(details) || !isRecord(details.approvalStatus)) {
    return undefined;
  }
  return typeof details.approvalStatus.approvedForReplay === "boolean"
    ? details.approvalStatus.approvedForReplay
    : undefined;
}

export function readJavaEvidenceVersion(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "approvalStatus", "evidenceVersion");
}

export function readJavaApprovalDigest(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "approvalStatus", "approvalDigest");
}

export function readJavaReplayEligibilityDigest(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "approvalStatus", "replayEligibilityDigest");
}

export function readJavaContractVersion(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "executionContract", "contractVersion");
}

export function readJavaContractDigest(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "executionContract", "contractDigest");
}

export function readJavaReplayPreconditionsSatisfied(details: unknown): boolean | undefined {
  if (!isRecord(details) || !isRecord(details.executionContract)) {
    return undefined;
  }
  const value = details.executionContract.replayPreconditionsSatisfied;
  return typeof value === "boolean" ? value : undefined;
}

export function readJavaDigestVerificationMode(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "executionContract", "digestVerificationMode");
}

export function readMiniKvSideEffects(details: unknown): string[] {
  if (!isRecord(details)) {
    return [];
  }
  const direct = readStringArray(details.sideEffects);
  if (direct.length > 0) {
    return direct;
  }
  if (isRecord(details.explanation)) {
    return readStringArray(details.explanation.side_effects);
  }
  return [];
}

export function readMiniKvSchemaVersion(details: unknown): number | undefined {
  return readNumberFieldFromMiniKvExplain(details, "schema_version");
}

export function readMiniKvCommandDigest(details: unknown): string | undefined {
  return readStringFieldFromMiniKvExplain(details, "command_digest");
}

export function readMiniKvSideEffectCount(details: unknown): number | undefined {
  if (!isRecord(details)) {
    return undefined;
  }
  if (typeof details.sideEffectCount === "number" && Number.isFinite(details.sideEffectCount)) {
    return details.sideEffectCount;
  }
  return readNumberFieldFromMiniKvExplain(details, "side_effect_count");
}

export function readMiniKvCheckReadOnly(details: unknown): boolean | undefined {
  return readBooleanFieldFromMiniKvContract(details, "read_only");
}

export function readMiniKvCheckExecutionAllowed(details: unknown): boolean | undefined {
  return readBooleanFieldFromMiniKvContract(details, "execution_allowed");
}

export function readMiniKvCheckDurability(details: unknown): string | undefined {
  if (!isRecord(details) || !isRecord(details.contract) || !isRecord(details.contract.wal)) {
    return undefined;
  }
  const value = details.contract.wal.durability;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function readStringFieldFromNestedRecord(details: unknown, nestedField: string, field: string): string | undefined {
  if (!isRecord(details) || !isRecord(details[nestedField])) {
    return undefined;
  }
  const value = details[nestedField][field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function readStringFieldFromMiniKvExplain(details: unknown, field: string): string | undefined {
  if (!isRecord(details) || !isRecord(details.explanation)) {
    return undefined;
  }
  const value = details.explanation[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function readNumberFieldFromMiniKvExplain(details: unknown, field: string): number | undefined {
  if (!isRecord(details) || !isRecord(details.explanation)) {
    return undefined;
  }
  const value = details.explanation[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function readStringFieldFromMiniKvContract(details: unknown, field: string): string | undefined {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return undefined;
  }
  const value = details.contract[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function readNumberFieldFromMiniKvContract(details: unknown, field: string): number | undefined {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return undefined;
  }
  const value = details.contract[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function readBooleanFieldFromMiniKvContract(details: unknown, field: string): boolean | undefined {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return undefined;
  }
  const value = details.contract[field];
  return typeof value === "boolean" ? value : undefined;
}

export function readStringArrayFromMiniKvContract(details: unknown, field: string): string[] {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return [];
  }
  return readStringArray(details.contract[field]);
}

export function isSha256Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/i.test(value);
}

export function isFnv1a64Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^fnv1a64:[a-f0-9]{16}$/i.test(value);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

export function stableJson(value: unknown): string {
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
