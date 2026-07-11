import { createConnection, createServer } from "node:net";
import { spawn } from "node:child_process";

export interface BufferedProcessSpec {
  executable: string;
  args?: string[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  input: string;
  timeoutMs: number;
  maxOutputBytes?: number;
}

export interface BufferedProcessResult {
  pid: number;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  timedOut: boolean;
}

export async function runBufferedProcess(spec: BufferedProcessSpec): Promise<BufferedProcessResult> {
  const started = Date.now();
  const startedAt = new Date(started).toISOString();
  const maxOutputBytes = spec.maxOutputBytes ?? 5 * 1024 * 1024;
  const child = spawn(spec.executable, spec.args ?? [], {
    cwd: spec.cwd,
    env: spec.env,
    windowsHide: true,
    stdio: ["pipe", "pipe", "pipe"],
  });
  if (child.pid === undefined) {
    throw new Error(`failed to start ${spec.executable}`);
  }

  let stdout = "";
  let stderr = "";
  let outputBytes = 0;
  let outputOverflow: Error | null = null;

  const append = (current: string, chunk: Buffer): string => {
    outputBytes += chunk.byteLength;
    if (outputBytes > maxOutputBytes) {
      outputOverflow = new Error(`process output exceeded ${maxOutputBytes} bytes`);
      child.kill();
      return current;
    }
    return current + chunk.toString("utf8");
  };

  child.stdout.on("data", (chunk: Buffer) => {
    stdout = append(stdout, chunk);
  });
  child.stderr.on("data", (chunk: Buffer) => {
    stderr = append(stderr, chunk);
  });

  const completion = new Promise<{ exitCode: number | null; signal: NodeJS.Signals | null }>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (exitCode, signal) => resolve({ exitCode, signal }));
  });
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    child.kill();
  }, spec.timeoutMs);

  child.stdin.end(spec.input);
  let completed: { exitCode: number | null; signal: NodeJS.Signals | null };
  try {
    completed = await completion;
  } finally {
    clearTimeout(timeout);
  }

  if (outputOverflow !== null) {
    throw outputOverflow;
  }
  const finished = Date.now();
  return {
    pid: child.pid,
    exitCode: completed.exitCode,
    signal: completed.signal,
    stdout,
    stderr,
    startedAt,
    finishedAt: new Date(finished).toISOString(),
    durationMs: finished - started,
    timedOut,
  };
}

export async function findAvailableLoopbackPort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (address === null || typeof address === "string") {
        server.close();
        reject(new Error("failed to allocate a loopback port"));
        return;
      }
      const port = address.port;
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(port);
      });
    });
  });
}

export async function isLoopbackPortOpen(port: number, timeoutMs = 500): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    let settled = false;
    const finish = (open: boolean): void => {
      if (settled) {
        return;
      }
      settled = true;
      socket.destroy();
      resolve(open);
    };
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.setTimeout(timeoutMs, () => finish(false));
  });
}
