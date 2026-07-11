import { delimiter } from "node:path";

import {
  runBufferedProcess,
  type BufferedProcessResult,
} from "./capstoneProcessSupport.js";
import { sha256File, sha256Text } from "./capstoneDigest.js";
import type {
  CapstoneCheck,
  MiniKvCapstoneObservation,
} from "./crossProjectReadinessTypes.js";

export const MINI_KV_CAPSTONE_COMMANDS = [
  "SMOKEJSON",
  "CHECKJSON GET capstone:probe",
  "QUIT",
] as const;

const WRITE_OR_ADMIN_COMMANDS = new Set([
  "SET",
  "SETNXEX",
  "DEL",
  "EXPIRE",
  "SAVE",
  "LOAD",
  "COMPACT",
  "RESETSTATS",
  "RESTORE",
]);

export interface MiniKvCapstoneProbeConfig {
  executable: string;
  executableArgs?: string[];
  runtimePath?: string;
  cwd?: string;
  timeoutMs?: number;
}

export interface MiniKvCommandCensus {
  commands: string[];
  read_command_count: number;
  control_command_count: number;
  write_or_admin_command_count: number;
  forbidden_commands: string[];
}

export function buildMiniKvCommandCensus(
  commands: readonly string[] = MINI_KV_CAPSTONE_COMMANDS,
): MiniKvCommandCensus {
  const forbiddenCommands = commands.filter((command) => {
    const [verb, nestedVerb] = command.trim().toUpperCase().split(/\s+/);
    return WRITE_OR_ADMIN_COMMANDS.has(verb) || (verb === "CHECKJSON" && WRITE_OR_ADMIN_COMMANDS.has(nestedVerb));
  });
  return {
    commands: [...commands],
    read_command_count: commands.filter((command) => command !== "QUIT").length,
    control_command_count: commands.filter((command) => command === "QUIT").length,
    write_or_admin_command_count: forbiddenCommands.length,
    forbidden_commands: forbiddenCommands,
  };
}

export async function runMiniKvCapstoneProbe(config: MiniKvCapstoneProbeConfig): Promise<MiniKvCapstoneObservation> {
  const c2Checks: CapstoneCheck[] = [];
  const c3Checks: CapstoneCheck[] = [];
  const census = buildMiniKvCommandCensus();
  if (census.write_or_admin_command_count !== 0) {
    c2Checks.push({
      id: "mini_kv.process",
      status: "fail",
      summary: "mini-kv command plan contains a write or admin command",
      evidence: { ...census },
    });
    c2Checks.push(skipped("mini_kv.smoke_json", "unsafe command plan was blocked before spawn"));
    c2Checks.push(skipped("mini_kv.check_json", "unsafe command plan was blocked before spawn"));
    c3Checks.push(skipped("mini_kv.no_execution", "unsafe command plan was blocked before spawn"));
    return { c2Checks, c3Checks };
  }

  let executableSha256: string;
  let processResult: BufferedProcessResult;
  try {
    executableSha256 = await sha256File(config.executable);
    const commandInput = `${MINI_KV_CAPSTONE_COMMANDS.join("\n")}\n`;
    processResult = await runBufferedProcess({
      executable: config.executable,
      args: config.executableArgs,
      cwd: config.cwd,
      env: buildEnvironment(config.runtimePath),
      input: commandInput,
      timeoutMs: config.timeoutMs ?? 30_000,
    });
  } catch (error) {
    c2Checks.push({
      id: "mini_kv.process",
      status: "fail",
      summary: "real mini-kv CLI could not start",
      evidence: { error: errorMessage(error) },
    });
    c2Checks.push(skipped("mini_kv.smoke_json", "CLI process failed"));
    c2Checks.push(skipped("mini_kv.check_json", "CLI process failed"));
    c3Checks.push(skipped("mini_kv.no_execution", "fresh CLI output was unavailable"));
    return { c2Checks, c3Checks };
  }

  const processPassed = processResult.exitCode === 0 && processResult.signal === null && !processResult.timedOut;
  c2Checks.push({
    id: "mini_kv.process",
    status: processPassed ? "pass" : "fail",
    summary: processPassed ? "real mini-kv CLI completed a fresh read-only session" : "mini-kv CLI exited abnormally",
    evidence: {
      pid: processResult.pid,
      executable_path: config.executable,
      executable_sha256: executableSha256,
      command_plan: census,
      started_at: processResult.startedAt,
      finished_at: processResult.finishedAt,
      duration_ms: processResult.durationMs,
      timed_out: processResult.timedOut,
      exit_code: processResult.exitCode,
      signal: processResult.signal,
      stdout_bytes: Buffer.byteLength(processResult.stdout, "utf8"),
      stdout_sha256: sha256Text(processResult.stdout),
      stderr_tail: processResult.stderr.slice(-4_096),
    },
  });
  if (!processPassed) {
    c2Checks.push(skipped("mini_kv.smoke_json", "CLI process did not exit cleanly"));
    c2Checks.push(skipped("mini_kv.check_json", "CLI process did not exit cleanly"));
    c3Checks.push(skipped("mini_kv.no_execution", "fresh CLI output was unavailable"));
    return { c2Checks, c3Checks };
  }

  try {
    const parsed = parseMiniKvCliOutput(processResult.stdout);
    const smokeCheck = validateSmokeJson(parsed.smoke);
    const commandCheck = validateCheckJson(parsed.check);
    c2Checks.push(smokeCheck, commandCheck);
    const noExecutionPassed = smokeCheck.status === "pass" && commandCheck.status === "pass";
    c3Checks.push({
      id: "mini_kv.no_execution",
      status: noExecutionPassed ? "pass" : "fail",
      summary: noExecutionPassed
        ? "fresh mini-kv CHECKJSON proves GET is non-writing and does not touch WAL"
        : "fresh mini-kv output did not prove the no-execution boundary",
      evidence: {
        read_only: parsed.check.read_only ?? null,
        execution_allowed: parsed.check.execution_allowed ?? null,
        command: parsed.check.command ?? null,
        write_command: parsed.check.write_command ?? null,
        wal_touched: asRecord(parsed.check.wal).touches_wal ?? null,
      },
    });
  } catch (error) {
    c2Checks.push({
      id: "mini_kv.smoke_json",
      status: "fail",
      summary: "fresh mini-kv CLI stdout could not be parsed",
      evidence: { error: errorMessage(error) },
    });
    c2Checks.push(skipped("mini_kv.check_json", "CLI parsing failed"));
    c3Checks.push(skipped("mini_kv.no_execution", "fresh CLI output was unavailable"));
  }
  return { c2Checks, c3Checks };
}

export function parseMiniKvCliOutput(stdout: string): {
  smoke: Record<string, unknown>;
  check: Record<string, unknown>;
} {
  const objects = stdout
    .split(/\r?\n/)
    .map(parseJsonFromLine)
    .filter((value): value is Record<string, unknown> => value !== null);
  const smoke = objects.find((value) => value.evidence_type === "runtime_smoke");
  const check = objects.find((value) => value.command === "GET" && "checks" in value);
  if (smoke === undefined) {
    throw new Error("SMOKEJSON object was not found in fresh CLI stdout");
  }
  if (check === undefined) {
    throw new Error("CHECKJSON GET object was not found in fresh CLI stdout");
  }
  return { smoke, check };
}

function validateSmokeJson(smoke: Record<string, unknown>): CapstoneCheck {
  const realRead = asRecord(smoke.real_read);
  const passed = smoke.schema_version === 1
    && smoke.evidence_type === "runtime_smoke"
    && smoke.read_only === true
    && smoke.execution_allowed === false
    && smoke.restore_execution_allowed === false
    && realRead.write_commands_executed === false
    && realRead.admin_commands_executed === false
    && realRead.runtime_write_observed === false;
  return {
    id: "mini_kv.smoke_json",
    status: passed ? "pass" : "fail",
    summary: passed ? "fresh SMOKEJSON schema and runtime boundary are valid" : "fresh SMOKEJSON boundary fields drifted",
    evidence: {
      schema_version: smoke.schema_version ?? null,
      evidence_type: smoke.evidence_type ?? null,
      version: smoke.version ?? null,
      read_only: smoke.read_only ?? null,
      execution_allowed: smoke.execution_allowed ?? null,
      restore_execution_allowed: smoke.restore_execution_allowed ?? null,
      write_commands_executed: realRead.write_commands_executed ?? null,
      admin_commands_executed: realRead.admin_commands_executed ?? null,
      runtime_write_observed: realRead.runtime_write_observed ?? null,
    },
  };
}

function validateCheckJson(check: Record<string, unknown>): CapstoneCheck {
  const checks = asRecord(check.checks);
  const wal = asRecord(check.wal);
  const passed = check.schema_version === 1
    && check.read_only === true
    && check.execution_allowed === false
    && check.command === "GET"
    && check.write_command === false
    && check.allowed_by_parser === true
    && checks.write_command === false
    && checks.wal_append_when_enabled === false
    && wal.touches_wal === false;
  return {
    id: "mini_kv.check_json",
    status: passed ? "pass" : "fail",
    summary: passed ? "fresh CHECKJSON confirms GET has no write or WAL effect" : "fresh CHECKJSON no-write proof drifted",
    evidence: {
      schema_version: check.schema_version ?? null,
      command_digest: check.command_digest ?? null,
      command: check.command ?? null,
      read_only: check.read_only ?? null,
      execution_allowed: check.execution_allowed ?? null,
      write_command: check.write_command ?? null,
      allowed_by_parser: check.allowed_by_parser ?? null,
      touches_wal: wal.touches_wal ?? null,
    },
  };
}

function buildEnvironment(runtimePath: string | undefined): NodeJS.ProcessEnv {
  if (runtimePath === undefined || runtimePath.length === 0) {
    return process.env;
  }
  return {
    ...process.env,
    PATH: `${runtimePath}${delimiter}${process.env.PATH ?? ""}`,
  };
}

function parseJsonFromLine(line: string): Record<string, unknown> | null {
  const start = line.indexOf("{");
  if (start < 0) {
    return null;
  }
  try {
    const value = JSON.parse(line.slice(start)) as unknown;
    return asRecord(value);
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function skipped(id: string, summary: string): CapstoneCheck {
  return { id, status: "skipped", summary, evidence: {} };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
