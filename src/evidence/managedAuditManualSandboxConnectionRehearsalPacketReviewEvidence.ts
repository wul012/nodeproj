import {
  historicalEvidenceExists as existsSync,
  readHistoricalEvidenceFile as readFileSync,
} from "../services/historicalEvidenceResolver.js";

export interface MiniKvV98ExecuteWithWalReference {
  sourceVersion: "mini-kv v98";
  headTag: "第九十八版execute-with-wal助手收敛";
  runbookPath: string;
  walkthroughPath: string;
  runtimeSmokePath: string;
  verificationManifestPath: string;
  evidencePresent: boolean;
  projectVersion: string;
  releaseVersion: string;
  consumerHint: string;
  writeWalHelper: string;
  writeWalHelperScope: string[];
  writeWalHelperBehaviorPreserved: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  orderAuthoritative: boolean;
  noRuntimeWriteCommandAdded: boolean;
  noOpWalRecordAppendBlocked: boolean;
  runtimeWriteObserved: boolean;
  writeCommandsExecuted: boolean;
  readyForNodeV233RehearsalPacketReview: boolean;
}

export interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  consumer_hint?: unknown;
  read_only?: unknown;
  execution_allowed?: unknown;
  restore_execution_allowed?: unknown;
  order_authoritative?: unknown;
  write_commands_executed?: unknown;
  runtime_write_observed?: unknown;
}

export interface MiniKvVerificationManifest extends Record<string, unknown> {
  project_version?: unknown;
  release_version?: unknown;
  consumer_hint?: unknown;
  read_only?: unknown;
  execution_allowed?: unknown;
  no_runtime_write_command_added?: unknown;
  version_manifest?: Record<string, unknown>;
  boundaries?: unknown;
}

export const NODE_V232_GUARD_SOURCE = "D:/nodeproj/orderops-node/src/services/managedAuditSandboxGuards.ts";

export const JAVA_V89_RUNBOOK = "D:/javaproj/advanced-order-platform/c/89/解释/说明.md";

export const JAVA_V89_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/92-version-89-release-approval-context-header-field.md";

export const JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ContextHeaderField.java";

export const MINI_KV_V98_RUNBOOK = "D:/C/mini-kv/c/98/解释/说明.md";

export const MINI_KV_V98_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/154-version-98-execute-with-wal-helper.md";

export const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";

export const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

export const SANDBOX_GUARD_PROFILE_PATHS = Object.freeze([
  "D:/nodeproj/orderops-node/src/services/managedAuditSandboxAdapterDryRunPackage.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxAdapterConnectionRunbook.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionOperatorPacket.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPacketVerification.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightGate.ts",
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionPreflightVerification.ts",
]);

export const ENDPOINTS = Object.freeze({
  manualSandboxConnectionRehearsalPacketReviewJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review",
  manualSandboxConnectionRehearsalPacketReviewMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review?format=markdown",
  sourceNodeV231Json: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification",
  nodeV232GuardTypes: NODE_V232_GUARD_SOURCE,
  javaV89Runbook: JAVA_V89_RUNBOOK,
  javaV89Walkthrough: JAVA_V89_WALKTHROUGH,
  javaV89ContextHeaderFieldSource: JAVA_V89_CONTEXT_HEADER_FIELD_SOURCE,
  miniKvV98Runbook: MINI_KV_V98_RUNBOOK,
  miniKvV98Walkthrough: MINI_KV_V98_WALKTHROUGH,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v231-post-preflight-verification-roadmap.md",
});

export const SHA256_HEX = /^[a-f0-9]{64}$/;

export const ACCEPTED_MINI_KV_EXECUTE_WITH_WAL_REFERENCES = Object.freeze([
  {
    projectVersion: "0.98.0",
    releaseVersion: "v98",
    consumerHint: "Node v233 manual sandbox connection rehearsal packet review",
  },
  {
    projectVersion: "0.99.0",
    releaseVersion: "v99",
    consumerHint: "Node v234 manual sandbox connection blocked execution rehearsal",
  },
  {
    projectVersion: "0.100.0",
    releaseVersion: "v100",
    consumerHint: "Node v235 manual sandbox connection precondition intake",
  },
  {
    projectVersion: "0.101.0",
    releaseVersion: "v101",
    consumerHint: "Node v237 manual sandbox connection readiness gate",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v239 manual sandbox connection operator window evidence verification",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v244 manual sandbox dry-run command upstream echo verification",
  },
  {
    projectVersion: "0.102.0",
    releaseVersion: "v102",
    consumerHint: "Node v246 manual sandbox connection precheck upstream receipt verification",
  },
] as const);

export function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  return readJsonFile(MINI_KV_RUNTIME_SMOKE) as MiniKvRuntimeSmokeEvidence;
}

export function readMiniKvVerificationManifest(): MiniKvVerificationManifest {
  return readJsonFile(MINI_KV_VERIFICATION_MANIFEST) as MiniKvVerificationManifest;
}

export function readJsonFile(filePath: string): Record<string, unknown> {
  if (!existsSync(filePath)) {
    return {};
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function stringField(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  return typeof value === "string" ? value : null;
}

export function booleanField(record: Record<string, unknown>, key: string): boolean | null {
  const value = record[key];
  return typeof value === "boolean" ? value : null;
}

export function recordField(record: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = record[key];
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export function stringArrayField(record: Record<string, unknown>, key: string): string[] {
  const value = record[key];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}
