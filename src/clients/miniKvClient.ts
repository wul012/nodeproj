import net from "node:net";
import { performance } from "node:perf_hooks";

import { AppHttpError } from "../errors.js";

export interface MiniKvCommandResult {
  command: string;
  response: string;
  latencyMs: number;
}

export interface MiniKvStatsJsonResult extends MiniKvCommandResult {
  stats: Record<string, unknown>;
}

export interface MiniKvKeyResult {
  key: string;
  value: string | null;
  ttlSeconds: number | null;
}

const safeKeyPattern = /^[A-Za-z0-9:_-]{1,160}$/;

export class MiniKvClient {
  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly timeoutMs: number,
  ) {}

  ping(message = "orderops"): Promise<MiniKvCommandResult> {
    return this.execute(`PING ${message}`);
  }

  size(): Promise<MiniKvCommandResult> {
    return this.execute("SIZE");
  }

  health(): Promise<MiniKvCommandResult> {
    return this.execute("HEALTH");
  }

  async statsJson(): Promise<MiniKvStatsJsonResult> {
    const result = await this.execute("STATSJSON");
    return {
      ...result,
      stats: parseMiniKvStatsJson(result.response),
    };
  }

  async getKey(key: string): Promise<MiniKvKeyResult> {
    validateKey(key);
    const value = await this.execute(`GET ${key}`);
    const ttl = await this.execute(`TTL ${key}`);

    return {
      key,
      value: value.response === "(nil)" ? null : value.response,
      ttlSeconds: Number.isFinite(Number(ttl.response)) ? Number(ttl.response) : null,
    };
  }

  async setKey(key: string, value: string, ttlSeconds?: number): Promise<{ set: MiniKvCommandResult; expire?: MiniKvCommandResult }> {
    validateKey(key);
    validateValue(value);

    const set = await this.execute(`SET ${key} ${value}`);
    if (ttlSeconds === undefined) {
      return { set };
    }

    validateTtl(ttlSeconds);
    const expire = await this.execute(`EXPIRE ${key} ${ttlSeconds}`);
    return { set, expire };
  }

  async deleteKey(key: string): Promise<MiniKvCommandResult> {
    validateKey(key);
    return this.execute(`DEL ${key}`);
  }

  async ttl(key: string): Promise<MiniKvCommandResult> {
    validateKey(key);
    return this.execute(`TTL ${key}`);
  }

  execute(command: string): Promise<MiniKvCommandResult> {
    validateCommandLine(command);
    const started = performance.now();
    const trimmed = command.trim();

    return new Promise((resolve, reject) => {
      let settled = false;
      let buffer = "";
      const socket = net.createConnection({ host: this.host, port: this.port });

      const finishResolve = (response: string) => {
        if (settled) {
          return;
        }
        settled = true;
        socket.end();
        resolve({
          command: trimmed,
          response,
          latencyMs: Math.round(performance.now() - started),
        });
      };

      const finishReject = (error: AppHttpError) => {
        if (settled) {
          return;
        }
        settled = true;
        socket.destroy();
        reject(error);
      };

      socket.setEncoding("utf8");
      socket.setTimeout(this.timeoutMs);

      socket.on("connect", () => {
        socket.write(`${trimmed}\n`);
      });

      socket.on("data", (chunk: string) => {
        buffer += chunk;
        const newline = buffer.indexOf("\n");
        if (newline >= 0) {
          finishResolve(buffer.slice(0, newline).replace(/\r$/, ""));
        }
      });

      socket.on("timeout", () => {
        finishReject(new AppHttpError(504, "MINIKV_TIMEOUT", `mini-kv timed out after ${this.timeoutMs}ms`));
      });

      socket.on("error", (error) => {
        finishReject(new AppHttpError(502, "MINIKV_UNAVAILABLE", `mini-kv is unavailable: ${error.message}`));
      });

      socket.on("close", () => {
        if (!settled) {
          finishReject(new AppHttpError(502, "MINIKV_CONNECTION_CLOSED", "mini-kv closed the connection before replying"));
        }
      });
    });
  }
}

export function validateRawGatewayCommand(command: string): void {
  validateCommandLine(command);
  const verb = command.trim().split(/\s+/, 1)[0]?.toUpperCase();
  const allowed = new Set(["PING", "SIZE", "GET", "TTL", "SET", "DEL", "EXPIRE", "HEALTH", "STATSJSON", "KEYS"]);
  if (!allowed.has(verb)) {
    throw new AppHttpError(400, "MINIKV_COMMAND_NOT_ALLOWED", "Command is not allowed through the gateway");
  }
}

export function parseMiniKvStatsJson(response: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response);
  } catch {
    throw new AppHttpError(502, "MINIKV_STATSJSON_INVALID", "mini-kv returned invalid STATSJSON output");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AppHttpError(502, "MINIKV_STATSJSON_INVALID", "mini-kv STATSJSON output must be a JSON object");
  }

  return parsed as Record<string, unknown>;
}

function validateKey(key: string): void {
  if (!safeKeyPattern.test(key)) {
    throw new AppHttpError(400, "INVALID_MINIKV_KEY", "Key must use 1-160 letters, digits, colon, underscore, or dash characters");
  }
}

function validateValue(value: string): void {
  if (value.length === 0 || value.length > 16 * 1024 || /[\r\n]/.test(value)) {
    throw new AppHttpError(400, "INVALID_MINIKV_VALUE", "Value must be 1-16384 characters and must not contain newlines");
  }
}

function validateTtl(ttlSeconds: number): void {
  if (!Number.isInteger(ttlSeconds) || ttlSeconds <= 0 || ttlSeconds > 604800) {
    throw new AppHttpError(400, "INVALID_MINIKV_TTL", "TTL must be an integer between 1 and 604800 seconds");
  }
}

function validateCommandLine(command: string): void {
  const trimmed = command.trim();
  if (trimmed.length === 0 || trimmed.length > 16 * 1024 || /[\r\n]/.test(command)) {
    throw new AppHttpError(400, "INVALID_MINIKV_COMMAND", "Command must be a single non-empty line up to 16384 characters");
  }
}
