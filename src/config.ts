import { existsSync } from "node:fs";
import path from "node:path";

export interface AppConfig {
  host: string;
  port: number;
  logLevel: string;
  orderPlatformUrl: string;
  orderPlatformTimeoutMs: number;
  miniKvHost: string;
  miniKvPort: number;
  miniKvTimeoutMs: number;
  opsSampleIntervalMs: number;
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
  mutationRateLimitWindowMs: number;
  mutationRateLimitMax: number;
  javaExecutionContractFixturePath: string;
  javaExecutionContractBlockedFixturePath: string;
  miniKvCheckJsonFixturePath: string;
  miniKvCheckJsonReadFixturePath: string;
  javaOpsEvidenceFixturePath: string;
  miniKvStorageEvidenceFixturePath: string;
  javaReplayAuditApprovedFixturePath: string;
  javaReplayAuditBlockedFixturePath: string;
  miniKvRestartRecoveryEvidenceFixturePath: string;
  auditStoreKind: string;
  auditStorePath: string;
  auditStoreUrl: string;
}

function readString(env: NodeJS.ProcessEnv, key: string, fallback: string): string {
  const value = env[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

function readNumber(env: NodeJS.ProcessEnv, key: string, fallback: number): number {
  const raw = env[key]?.trim();
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function readBoolean(env: NodeJS.ProcessEnv, key: string, fallback: boolean): boolean {
  const raw = env[key]?.trim().toLowerCase();
  if (!raw) {
    return fallback;
  }

  if (["1", "true", "yes", "on"].includes(raw)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(raw)) {
    return false;
  }

  return fallback;
}

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function defaultJavaExecutionContractFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "javaproj",
    "advanced-order-platform",
    "src",
    "main",
    "resources",
    "static",
    "contracts",
    "failed-event-replay-execution-contract-approved.sample.json",
  );
  return preferExistingPath(upstreamProjectPath, repoFixturePath("failed-event-replay-execution-contract-approved.sample.json"));
}

function defaultJavaExecutionContractBlockedFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "javaproj",
    "advanced-order-platform",
    "src",
    "main",
    "resources",
    "static",
    "contracts",
    "failed-event-replay-execution-contract-blocked.sample.json",
  );
  return preferExistingPath(upstreamProjectPath, repoFixturePath("failed-event-replay-execution-contract-blocked.sample.json"));
}

function defaultMiniKvCheckJsonFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "C",
    "mini-kv",
    "fixtures",
    "checkjson",
    "set-orderops-write-contract.json",
  );
  return preferExistingPath(upstreamProjectPath, repoFixturePath("set-orderops-write-contract.json"));
}

function defaultMiniKvCheckJsonReadFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "C",
    "mini-kv",
    "fixtures",
    "checkjson",
    "get-orderops-read-contract.json",
  );
  return preferExistingPath(upstreamProjectPath, repoFixturePath("get-orderops-read-contract.json"));
}

function repoFixturePath(fileName: string): string {
  return path.join(process.cwd(), "fixtures", "upstream-contracts", fileName);
}

function preferExistingPath(primaryPath: string, fallbackPath: string): string {
  return existsSync(primaryPath) ? primaryPath : fallbackPath;
}

function defaultJavaOpsEvidenceFixturePath(): string {
  return repoProductionEvidenceFixturePath("java-ops-evidence.sample.json");
}

function defaultMiniKvStorageEvidenceFixturePath(): string {
  return repoProductionEvidenceFixturePath("mini-kv-storage-evidence.sample.json");
}

function repoProductionEvidenceFixturePath(fileName: string): string {
  return path.join(process.cwd(), "fixtures", "upstream-production-evidence", fileName);
}

function defaultJavaReplayAuditApprovedFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "javaproj",
    "advanced-order-platform",
    "src",
    "main",
    "resources",
    "static",
    "contracts",
    "failed-event-replay-audit-approved.sample.json",
  );
  return preferExistingPath(
    upstreamProjectPath,
    repoProductionEvidenceFixturePath("failed-event-replay-audit-approved.sample.json"),
  );
}

function defaultJavaReplayAuditBlockedFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "javaproj",
    "advanced-order-platform",
    "src",
    "main",
    "resources",
    "static",
    "contracts",
    "failed-event-replay-audit-blocked.sample.json",
  );
  return preferExistingPath(
    upstreamProjectPath,
    repoProductionEvidenceFixturePath("failed-event-replay-audit-blocked.sample.json"),
  );
}

function defaultMiniKvRestartRecoveryEvidenceFixturePath(): string {
  const upstreamProjectPath = path.join(
    path.parse(process.cwd()).root,
    "C",
    "mini-kv",
    "fixtures",
    "recovery",
    "restart-recovery-evidence.json",
  );
  return preferExistingPath(
    upstreamProjectPath,
    repoProductionEvidenceFixturePath("mini-kv-restart-recovery-evidence.json"),
  );
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    host: readString(env, "HOST", "127.0.0.1"),
    port: readNumber(env, "PORT", 4100),
    logLevel: readString(env, "LOG_LEVEL", "info"),
    orderPlatformUrl: stripTrailingSlash(readString(env, "ORDER_PLATFORM_URL", "http://localhost:8080")),
    orderPlatformTimeoutMs: readNumber(env, "ORDER_PLATFORM_TIMEOUT_MS", 1200),
    miniKvHost: readString(env, "MINIKV_HOST", "127.0.0.1"),
    miniKvPort: readNumber(env, "MINIKV_PORT", 6379),
    miniKvTimeoutMs: readNumber(env, "MINIKV_TIMEOUT_MS", 800),
    opsSampleIntervalMs: readNumber(env, "OPS_SAMPLE_INTERVAL_MS", 2000),
    upstreamProbesEnabled: readBoolean(env, "UPSTREAM_PROBES_ENABLED", false),
    upstreamActionsEnabled: readBoolean(env, "UPSTREAM_ACTIONS_ENABLED", false),
    mutationRateLimitWindowMs: readNumber(env, "MUTATION_RATE_LIMIT_WINDOW_MS", 60000),
    mutationRateLimitMax: readNumber(env, "MUTATION_RATE_LIMIT_MAX", 30),
    javaExecutionContractFixturePath: readString(
      env,
      "JAVA_EXECUTION_CONTRACT_FIXTURE_PATH",
      defaultJavaExecutionContractFixturePath(),
    ),
    javaExecutionContractBlockedFixturePath: readString(
      env,
      "JAVA_EXECUTION_CONTRACT_BLOCKED_FIXTURE_PATH",
      defaultJavaExecutionContractBlockedFixturePath(),
    ),
    miniKvCheckJsonFixturePath: readString(
      env,
      "MINIKV_CHECKJSON_FIXTURE_PATH",
      defaultMiniKvCheckJsonFixturePath(),
    ),
    miniKvCheckJsonReadFixturePath: readString(
      env,
      "MINIKV_CHECKJSON_READ_FIXTURE_PATH",
      defaultMiniKvCheckJsonReadFixturePath(),
    ),
    javaOpsEvidenceFixturePath: readString(
      env,
      "JAVA_OPS_EVIDENCE_FIXTURE_PATH",
      defaultJavaOpsEvidenceFixturePath(),
    ),
    miniKvStorageEvidenceFixturePath: readString(
      env,
      "MINIKV_STORAGE_EVIDENCE_FIXTURE_PATH",
      defaultMiniKvStorageEvidenceFixturePath(),
    ),
    javaReplayAuditApprovedFixturePath: readString(
      env,
      "JAVA_REPLAY_AUDIT_APPROVED_FIXTURE_PATH",
      defaultJavaReplayAuditApprovedFixturePath(),
    ),
    javaReplayAuditBlockedFixturePath: readString(
      env,
      "JAVA_REPLAY_AUDIT_BLOCKED_FIXTURE_PATH",
      defaultJavaReplayAuditBlockedFixturePath(),
    ),
    miniKvRestartRecoveryEvidenceFixturePath: readString(
      env,
      "MINIKV_RESTART_RECOVERY_EVIDENCE_FIXTURE_PATH",
      defaultMiniKvRestartRecoveryEvidenceFixturePath(),
    ),
    auditStoreKind: readString(env, "AUDIT_STORE_KIND", "memory").toLowerCase(),
    auditStorePath: readString(env, "AUDIT_STORE_PATH", ""),
    auditStoreUrl: readString(env, "AUDIT_STORE_URL", ""),
  };
}
