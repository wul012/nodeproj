import { isAppHttpError } from "../errors.js";
import type { ThreeProjectRealReadRuntimeSmokePreflightProfile } from "../services/threeProjectRealReadRuntimeSmokePreflight.js";

export interface RuntimeSmokeExecutionRecord {
  id: string;
  project: "node" | "java" | "mini-kv";
  protocol: "http" | "tcp-inline";
  methodOrCommand: string;
  target: string;
  status: "passed-read" | "skipped-closed-window" | "failed-read";
  attempted: boolean;
  readOnly: true;
  mutatesState: false;
  latencyMs?: number;
  statusCode?: number;
  failureClass: RuntimeSmokeExecutionFailureClass;
  message: string;
  evidenceSummary?: Record<string, unknown>;
}

export type RuntimeSmokeExecutionFailureClass =
  | "none"
  | "closed-window"
  | "node-service-unavailable"
  | "java-connection-refused"
  | "mini-kv-connection-refused"
  | "timeout"
  | "invalid-json"
  | "read-command-failed"
  | "unsafe-surface"
  | "unexpected-write-signal";

export function passedRecord(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
  latencyMs: number,
  statusCode: number | undefined,
  evidenceSummary: Record<string, unknown>,
): RuntimeSmokeExecutionRecord {
  return {
    id: target.id,
    project: target.project,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "passed-read",
    attempted: true,
    readOnly: true,
    mutatesState: false,
    latencyMs,
    statusCode,
    failureClass: "none",
    message: "Read-only runtime smoke target returned evidence.",
    evidenceSummary,
  };
}

export function skippedRecord(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
): RuntimeSmokeExecutionRecord {
  return {
    id: target.id,
    project: target.project,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "skipped-closed-window",
    attempted: false,
    readOnly: true,
    mutatesState: false,
    failureClass: "closed-window",
    message: "UPSTREAM_PROBES_ENABLED=false; runtime smoke target skipped by closed-window configuration.",
  };
}

export function failedRecord(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
  failureClass: RuntimeSmokeExecutionFailureClass,
  message: string,
): RuntimeSmokeExecutionRecord {
  return {
    id: target.id,
    project: target.project,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "failed-read",
    attempted: true,
    readOnly: true,
    mutatesState: false,
    failureClass,
    message,
  };
}

export function classifyError(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
  error: unknown,
): RuntimeSmokeExecutionFailureClass {
  const code = isAppHttpError(error) ? error.code : "";
  if (code.includes("TIMEOUT")) {
    return "timeout";
  }
  if (target.project === "java") {
    return "java-connection-refused";
  }
  if (target.project === "mini-kv") {
    return "mini-kv-connection-refused";
  }
  if (target.project === "node") {
    return "node-service-unavailable";
  }
  return "read-command-failed";
}

export function summarizeError(error: unknown): string {
  if (isAppHttpError(error)) {
    return `${error.code}: ${error.message}`;
  }
  return error instanceof Error ? error.message : String(error);
}

export function renderRecord(record: RuntimeSmokeExecutionRecord): string[] {
  return [
    `- ${record.id}: ${record.status}`,
    `  - project: ${record.project}`,
    `  - protocol: ${record.protocol}`,
    `  - methodOrCommand: ${record.methodOrCommand}`,
    `  - target: ${record.target}`,
    `  - attempted: ${record.attempted}`,
    `  - readOnly: ${record.readOnly}`,
    `  - mutatesState: ${record.mutatesState}`,
    `  - failureClass: ${record.failureClass}`,
    `  - latencyMs: ${record.latencyMs ?? "unknown"}`,
    `  - statusCode: ${record.statusCode ?? "unknown"}`,
    `  - message: ${record.message}`,
    `  - evidenceSummary: ${JSON.stringify(record.evidenceSummary ?? {})}`,
  ];
}
