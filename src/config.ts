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
  };
}
