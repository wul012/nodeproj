import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

import { isLoopbackPortOpen, sha256File } from "./capstoneProcessSupport.js";
import { CrossProjectReadClient, type JsonHttpResponse } from "./crossProjectReadClient.js";
import type {
  CapstoneCheck,
  JavaCapstoneObservation,
} from "./crossProjectReadinessTypes.js";

const JAVA_LOG_TAIL_BYTES = 16 * 1024;

export interface JavaLaunchCommand {
  executable: string;
  args: string[];
  artifactPath: string;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
}

export interface JavaCapstoneProbeConfig {
  launch: JavaLaunchCommand;
  port: number;
  startupTimeoutMs?: number;
  requestTimeoutMs?: number;
  shutdownTimeoutMs?: number;
}

interface ChildExit {
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  error?: string;
}

export function buildJavaJarLaunchCommand(options: {
  jarPath: string;
  javaExecutable?: string;
  port: number;
  extraEnv?: NodeJS.ProcessEnv;
}): JavaLaunchCommand {
  const databaseName = `orderops-capstone-${process.pid}-${Date.now()}`;
  return {
    executable: options.javaExecutable ?? "java",
    artifactPath: options.jarPath,
    env: options.extraEnv,
    args: [
      "-jar",
      options.jarPath,
      "--spring.profiles.active=prod",
      "--server.address=127.0.0.1",
      `--server.port=${options.port}`,
      "--server.shutdown=graceful",
      `--spring.datasource.url=jdbc:h2:mem:${databaseName};MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1`,
      "--spring.h2.console.enabled=false",
      "--order.expiration.enabled=false",
      "--outbox.publisher.enabled=false",
      "--management.endpoint.shutdown.enabled=true",
      "--management.endpoints.web.exposure.include=health,info,shutdown",
    ],
  };
}

export async function runJavaCapstoneProbe(config: JavaCapstoneProbeConfig): Promise<JavaCapstoneObservation> {
  const c1Checks: CapstoneCheck[] = [];
  const c3Checks: CapstoneCheck[] = [];
  const startupTimeoutMs = config.startupTimeoutMs ?? 120_000;
  const requestTimeoutMs = config.requestTimeoutMs ?? 10_000;
  const shutdownTimeoutMs = config.shutdownTimeoutMs ?? 20_000;
  let child: ChildProcessWithoutNullStreams | undefined;
  let stdoutTail = "";
  let stderrTail = "";
  let applicationPid: number | null = null;
  let exitPromise: Promise<ChildExit> | undefined;
  let artifactSha256: string;

  try {
    artifactSha256 = await sha256File(config.launch.artifactPath);
    child = spawn(config.launch.executable, config.launch.args, {
      cwd: config.launch.cwd,
      env: config.launch.env ?? process.env,
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });
    if (child.pid === undefined) {
      throw new Error("Java process did not expose a PID");
    }
    child.stdin.end();
    child.stdout.on("data", (chunk: Buffer) => {
      stdoutTail = appendTail(stdoutTail, chunk);
      applicationPid = applicationPid ?? parseApplicationPid(stdoutTail);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderrTail = appendTail(stderrTail, chunk);
    });
    exitPromise = observeExit(child);
    c1Checks.push(passCheck("java.process", "packaged Java process started", {
      launcher_pid: child.pid,
      port: config.port,
      artifact_path: config.launch.artifactPath,
      artifact_sha256: artifactSha256,
    }));
  } catch (error) {
    c1Checks.push(failCheck("java.process", "packaged Java process could not start", error));
    c1Checks.push(skipped("java.health", "Java process was unavailable"));
    c1Checks.push(skipped("java.ops_evidence", "Java process was unavailable"));
    c1Checks.push(skipped("java.graceful_shutdown", "Java process was never started"));
    c3Checks.push(skipped("java.write_rejection", "Java process was unavailable"));
    return { c1Checks, c3Checks };
  }

  const baseUrl = `http://127.0.0.1:${config.port}`;
  const client = new CrossProjectReadClient(baseUrl, requestTimeoutMs);
  let healthReady = false;

  try {
    const health = await waitForHealth(client, child, startupTimeoutMs);
    healthReady = true;
    c1Checks.push(validateHealth(health));
  } catch (error) {
    c1Checks.push(failCheck("java.health", "Java health endpoint did not become ready", error));
  }

  if (healthReady) {
    try {
      c1Checks.push(validateOpsEvidence(await client.opsEvidence()));
    } catch (error) {
      c1Checks.push(failCheck("java.ops_evidence", "Java ops evidence request failed", error));
    }

    try {
      c3Checks.push(await probeRejectedWrite(baseUrl, requestTimeoutMs));
    } catch (error) {
      c3Checks.push(failCheck("java.write_rejection", "Java write-rejection probe failed", error));
    }
  } else {
    c1Checks.push(skipped("java.ops_evidence", "Java health check failed"));
    c3Checks.push(skipped("java.write_rejection", "Java health check failed"));
  }

  c1Checks.push(await stopJavaGracefully({
    child,
    exitPromise,
    baseUrl,
    requestTimeoutMs,
    shutdownTimeoutMs,
    stdoutTail: () => stdoutTail,
    stderrTail: () => stderrTail,
    applicationPid: () => applicationPid,
    port: config.port,
  }));
  return { c1Checks, c3Checks };
}

async function waitForHealth(
  client: CrossProjectReadClient,
  child: ChildProcessWithoutNullStreams,
  timeoutMs: number,
): Promise<JsonHttpResponse> {
  const deadline = Date.now() + timeoutMs;
  let lastError = "not attempted";
  while (Date.now() < deadline) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`Java process exited before health was ready (code=${child.exitCode}, signal=${child.signalCode})`);
    }
    try {
      const response = await client.health();
      const data = asRecord(response.data);
      if (response.statusCode === 200 && data.status === "UP") {
        return response;
      }
      lastError = `unexpected health payload: ${JSON.stringify(response.data)}`;
    } catch (error) {
      lastError = errorMessage(error);
    }
    await delay(250);
  }
  throw new Error(`health timeout after ${timeoutMs}ms; last error: ${lastError}`);
}

function validateHealth(response: JsonHttpResponse): CapstoneCheck {
  const data = asRecord(response.data);
  const passed = response.statusCode === 200 && data.status === "UP";
  return {
    id: "java.health",
    status: passed ? "pass" : "fail",
    summary: passed ? "Java actuator health is UP" : "Java actuator health schema was unexpected",
    evidence: {
      status_code: response.statusCode,
      health_status: data.status ?? null,
    },
  };
}

function validateOpsEvidence(response: JsonHttpResponse): CapstoneCheck {
  const data = asRecord(response.data);
  const service = asRecord(data.service);
  const profiles = Array.isArray(service.profiles) ? service.profiles : [];
  const passed = response.statusCode === 200
    && typeof data.evidenceVersion === "string"
    && typeof data.sampledAt === "string"
    && typeof service.name === "string"
    && profiles.includes("prod")
    && data.readOnly === true
    && data.executionAllowed === false;
  return {
    id: "java.ops_evidence",
    status: passed ? "pass" : "fail",
    summary: passed ? "Java ops evidence schema and read-only boundary are valid" : "Java ops evidence schema drifted",
    evidence: {
      status_code: response.statusCode,
      evidence_version: data.evidenceVersion ?? null,
      sampled_at: data.sampledAt ?? null,
      service_name: service.name ?? null,
      profiles,
      read_only: data.readOnly ?? null,
      execution_allowed: data.executionAllowed ?? null,
    },
  };
}

async function probeRejectedWrite(baseUrl: string, timeoutMs: number): Promise<CapstoneCheck> {
  const path = "/api/v1/failed-events/0/replay";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    const rejected = [400, 401, 403].includes(response.status);
    return {
      id: "java.write_rejection",
      status: rejected ? "pass" : "fail",
      summary: rejected
        ? "unauthenticated Java write route was rejected before an authorized operation"
        : "unauthenticated Java write route was not rejected",
      evidence: {
        method: "POST",
        path,
        status_code: response.status,
        identity_headers_sent: false,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function stopJavaGracefully(options: {
  child: ChildProcessWithoutNullStreams;
  exitPromise: Promise<ChildExit>;
  baseUrl: string;
  requestTimeoutMs: number;
  shutdownTimeoutMs: number;
  stdoutTail: () => string;
  stderrTail: () => string;
  applicationPid: () => number | null;
  port: number;
}): Promise<CapstoneCheck> {
  let shutdownStatus: number | null = null;
  let fallbackKillUsed = false;
  let shutdownError: string | null = null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.requestTimeoutMs);
    try {
      const response = await fetch(`${options.baseUrl}/actuator/shutdown`, {
        method: "POST",
        headers: { accept: "application/json" },
        signal: controller.signal,
      });
      shutdownStatus = response.status;
      if (!response.ok) {
        throw new Error(`actuator shutdown returned HTTP ${response.status}`);
      }
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    shutdownError = errorMessage(error);
  }

  let exit = await waitForExit(options.exitPromise, options.shutdownTimeoutMs);
  if (exit === null) {
    fallbackKillUsed = true;
    options.child.kill();
    exit = await waitForExit(options.exitPromise, 5_000);
  }
  const applicationPid = options.applicationPid();
  const applicationAlive = applicationPid === null ? null : isProcessRunning(applicationPid);
  const portOpen = await isLoopbackPortOpen(options.port);
  const passed = shutdownError === null
    && shutdownStatus === 200
    && exit !== null
    && !fallbackKillUsed
    && applicationAlive === false
    && !portOpen;
  return {
    id: "java.graceful_shutdown",
    status: passed ? "pass" : "fail",
    summary: passed ? "Java Spring context stopped through loopback actuator shutdown" : "Java required forced or incomplete cleanup",
    evidence: {
      launcher_pid: options.child.pid ?? null,
      application_pid: applicationPid,
      shutdown_status_code: shutdownStatus,
      shutdown_error: shutdownError,
      fallback_kill_used: fallbackKillUsed,
      exit_code: exit?.exitCode ?? null,
      signal: exit?.signal ?? null,
      process_error: exit?.error ?? null,
      application_alive_after_shutdown: applicationAlive,
      port: options.port,
      port_open_after_shutdown: portOpen,
      stdout_tail: options.stdoutTail(),
      stderr_tail: options.stderrTail(),
    },
  };
}

function parseApplicationPid(output: string): number | null {
  const match = output.match(/\bwith PID (\d+)\b/);
  return match === null ? null : Number(match[1]);
}

function isProcessRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function observeExit(child: ChildProcessWithoutNullStreams): Promise<ChildExit> {
  return new Promise((resolve) => {
    child.once("error", (error) => resolve({ exitCode: null, signal: null, error: error.message }));
    child.once("close", (exitCode, signal) => resolve({ exitCode, signal }));
  });
}

async function waitForExit(exitPromise: Promise<ChildExit>, timeoutMs: number): Promise<ChildExit | null> {
  return Promise.race([
    exitPromise,
    delay(timeoutMs).then(() => null),
  ]);
}

function appendTail(current: string, chunk: Buffer): string {
  const combined = current + chunk.toString("utf8");
  return Buffer.byteLength(combined, "utf8") <= JAVA_LOG_TAIL_BYTES
    ? combined
    : combined.slice(-JAVA_LOG_TAIL_BYTES);
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function passCheck(id: string, summary: string, evidence: Record<string, unknown>): CapstoneCheck {
  return { id, status: "pass", summary, evidence };
}

function failCheck(id: string, summary: string, error: unknown): CapstoneCheck {
  return {
    id,
    status: "fail",
    summary,
    evidence: { error: errorMessage(error) },
  };
}

function skipped(id: string, summary: string): CapstoneCheck {
  return { id, status: "skipped", summary, evidence: {} };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
