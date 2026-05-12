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

export interface MiniKvInfoJson {
  version?: string;
  server?: {
    protocol?: string[];
    uptime_seconds?: number;
    max_request_bytes?: number;
  };
  store?: {
    live_keys?: number;
  };
  wal?: {
    enabled?: boolean;
  };
  metrics?: {
    enabled?: boolean;
  };
}

export interface MiniKvInfoJsonResult extends MiniKvCommandResult {
  info: MiniKvInfoJson;
}

export interface MiniKvCommandCatalogEntry {
  name?: string;
  category?: "read" | "write" | "admin" | "meta" | string;
  mutates_store?: boolean;
  touches_wal?: boolean;
  stable?: boolean;
  description?: string;
}

export interface MiniKvCommandsJson {
  commands?: MiniKvCommandCatalogEntry[];
}

export interface MiniKvCommandsJsonResult extends MiniKvCommandResult {
  catalog: MiniKvCommandsJson;
}

export interface MiniKvKeysJson {
  prefix?: string | null;
  key_count?: number;
  keys?: string[];
  truncated?: boolean;
  limit?: number;
}

export interface MiniKvKeysJsonResult extends MiniKvCommandResult {
  inventory: MiniKvKeysJson;
}

export interface MiniKvExplainJson {
  schema_version?: number;
  command_digest?: string;
  command?: string;
  category?: "read" | "write" | "admin" | "meta" | string;
  mutates_store?: boolean;
  touches_wal?: boolean;
  key?: string | null;
  requires_value?: boolean;
  ttl_sensitive?: boolean;
  allowed_by_parser?: boolean;
  warnings?: string[];
  side_effects?: string[];
  side_effect_count?: number;
}

export interface MiniKvExplainJsonResult extends MiniKvCommandResult {
  explanation: MiniKvExplainJson;
}

export interface MiniKvCheckJson extends MiniKvExplainJson {
  read_only?: boolean;
  execution_allowed?: boolean;
  write_command?: boolean;
  checks?: {
    parser_allowed?: boolean;
    write_command?: boolean;
    wal_append_when_enabled?: boolean;
    wal_enabled?: boolean;
  };
  wal?: {
    enabled?: boolean;
    touches_wal?: boolean;
    append_when_enabled?: boolean;
    durability?: "wal_backed" | "memory_only" | "not_wal_backed" | "not_applicable" | string;
  };
}

export interface MiniKvCheckJsonResult extends MiniKvCommandResult {
  contract: MiniKvCheckJson;
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

  async infoJson(): Promise<MiniKvInfoJsonResult> {
    const result = await this.execute("INFOJSON");
    return {
      ...result,
      info: parseMiniKvInfoJson(result.response),
    };
  }

  async commandsJson(): Promise<MiniKvCommandsJsonResult> {
    const result = await this.execute("COMMANDSJSON");
    return {
      ...result,
      catalog: parseMiniKvCommandsJson(result.response),
    };
  }

  async keysJson(prefix?: string): Promise<MiniKvKeysJsonResult> {
    const normalizedPrefix = normalizeOptionalPrefix(prefix);
    const result = await this.execute(normalizedPrefix === undefined ? "KEYSJSON" : `KEYSJSON ${normalizedPrefix}`);
    return {
      ...result,
      inventory: parseMiniKvKeysJson(result.response),
    };
  }

  async explainJson(command: string): Promise<MiniKvExplainJsonResult> {
    const normalizedCommand = normalizeExplainCommand(command);
    const result = await this.execute(`EXPLAINJSON ${normalizedCommand}`);
    return {
      ...result,
      explanation: parseMiniKvExplainJson(result.response),
    };
  }

  async checkJson(command: string): Promise<MiniKvCheckJsonResult> {
    const normalizedCommand = normalizeCheckCommand(command);
    const result = await this.execute(`CHECKJSON ${normalizedCommand}`);
    return {
      ...result,
      contract: parseMiniKvCheckJson(result.response),
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
  const allowed = new Set([
    "PING",
    "SIZE",
    "GET",
    "TTL",
    "SET",
    "DEL",
    "EXPIRE",
    "HEALTH",
    "STATSJSON",
    "INFOJSON",
    "COMMANDS",
    "COMMANDSJSON",
    "KEYS",
    "KEYSJSON",
    "EXPLAINJSON",
    "CHECKJSON",
  ]);
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

export function parseMiniKvInfoJson(response: string): MiniKvInfoJson {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response);
  } catch {
    throw new AppHttpError(502, "MINIKV_INFOJSON_INVALID", "mini-kv returned invalid INFOJSON output");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AppHttpError(502, "MINIKV_INFOJSON_INVALID", "mini-kv INFOJSON output must be a JSON object");
  }

  return parsed as MiniKvInfoJson;
}

export function parseMiniKvCommandsJson(response: string): MiniKvCommandsJson {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response);
  } catch {
    throw new AppHttpError(502, "MINIKV_COMMANDSJSON_INVALID", "mini-kv returned invalid COMMANDSJSON output");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AppHttpError(502, "MINIKV_COMMANDSJSON_INVALID", "mini-kv COMMANDSJSON output must be a JSON object");
  }

  const catalog = parsed as Record<string, unknown>;
  if ("commands" in catalog && !Array.isArray(catalog.commands)) {
    throw new AppHttpError(502, "MINIKV_COMMANDSJSON_INVALID", "mini-kv COMMANDSJSON commands field must be an array");
  }

  return parsed as MiniKvCommandsJson;
}

export function parseMiniKvKeysJson(response: string): MiniKvKeysJson {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response);
  } catch {
    throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv returned invalid KEYSJSON output");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv KEYSJSON output must be a JSON object");
  }

  const inventory = parsed as Record<string, unknown>;
  if ("keys" in inventory && (!Array.isArray(inventory.keys) || !inventory.keys.every((key) => typeof key === "string"))) {
    throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv KEYSJSON keys field must be a string array");
  }
  if ("key_count" in inventory && (typeof inventory.key_count !== "number" || !Number.isFinite(inventory.key_count))) {
    throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv KEYSJSON key_count field must be a finite number");
  }
  if ("truncated" in inventory && typeof inventory.truncated !== "boolean") {
    throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv KEYSJSON truncated field must be a boolean");
  }
  if ("limit" in inventory && (typeof inventory.limit !== "number" || !Number.isFinite(inventory.limit))) {
    throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv KEYSJSON limit field must be a finite number");
  }

  return parsed as MiniKvKeysJson;
}

export function parseMiniKvExplainJson(response: string): MiniKvExplainJson {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response);
  } catch {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv returned invalid EXPLAINJSON output");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON output must be a JSON object");
  }

  const explanation = parsed as Record<string, unknown>;
  if ("schema_version" in explanation && (typeof explanation.schema_version !== "number" || !Number.isFinite(explanation.schema_version))) {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON schema_version field must be a finite number");
  }
  if ("command_digest" in explanation && typeof explanation.command_digest !== "string") {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON command_digest field must be a string");
  }
  for (const field of ["mutates_store", "touches_wal", "requires_value", "ttl_sensitive", "allowed_by_parser"]) {
    if (field in explanation && typeof explanation[field] !== "boolean") {
      throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", `mini-kv EXPLAINJSON ${field} field must be a boolean`);
    }
  }
  if ("warnings" in explanation && (!Array.isArray(explanation.warnings) || !explanation.warnings.every((warning) => typeof warning === "string"))) {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON warnings field must be a string array");
  }
  if ("side_effects" in explanation && (!Array.isArray(explanation.side_effects) || !explanation.side_effects.every((sideEffect) => typeof sideEffect === "string"))) {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON side_effects field must be a string array");
  }
  if ("side_effect_count" in explanation && (typeof explanation.side_effect_count !== "number" || !Number.isFinite(explanation.side_effect_count))) {
    throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON side_effect_count field must be a finite number");
  }

  return parsed as MiniKvExplainJson;
}

export function parseMiniKvCheckJson(response: string): MiniKvCheckJson {
  const contract = parseMiniKvExplainJson(response) as MiniKvCheckJson;
  if ("read_only" in contract && typeof contract.read_only !== "boolean") {
    throw new AppHttpError(502, "MINIKV_CHECKJSON_INVALID", "mini-kv CHECKJSON read_only field must be a boolean");
  }
  if ("execution_allowed" in contract && typeof contract.execution_allowed !== "boolean") {
    throw new AppHttpError(502, "MINIKV_CHECKJSON_INVALID", "mini-kv CHECKJSON execution_allowed field must be a boolean");
  }
  if ("write_command" in contract && typeof contract.write_command !== "boolean") {
    throw new AppHttpError(502, "MINIKV_CHECKJSON_INVALID", "mini-kv CHECKJSON write_command field must be a boolean");
  }
  if ("checks" in contract && !isRecord(contract.checks)) {
    throw new AppHttpError(502, "MINIKV_CHECKJSON_INVALID", "mini-kv CHECKJSON checks field must be an object");
  }
  if ("wal" in contract && !isRecord(contract.wal)) {
    throw new AppHttpError(502, "MINIKV_CHECKJSON_INVALID", "mini-kv CHECKJSON wal field must be an object");
  }

  return contract;
}

function validateKey(key: string): void {
  if (!safeKeyPattern.test(key)) {
    throw new AppHttpError(400, "INVALID_MINIKV_KEY", "Key must use 1-160 letters, digits, colon, underscore, or dash characters");
  }
}

function normalizeOptionalPrefix(prefix: string | undefined): string | undefined {
  const normalized = prefix?.trim();
  if (normalized === undefined || normalized.length === 0) {
    return undefined;
  }
  validateKey(normalized);
  return normalized;
}

function normalizeExplainCommand(command: string): string {
  validateRawGatewayCommand(command);
  const normalized = command.trim();
  if (/^(EXPLAINJSON|CHECKJSON)\b/i.test(normalized)) {
    throw new AppHttpError(400, "INVALID_MINIKV_EXPLAIN_COMMAND", "EXPLAINJSON expects the command to explain, not a nested meta explain command");
  }

  return normalized;
}

function normalizeCheckCommand(command: string): string {
  validateRawGatewayCommand(command);
  const normalized = command.trim();
  if (/^(EXPLAINJSON|CHECKJSON)\b/i.test(normalized)) {
    throw new AppHttpError(400, "INVALID_MINIKV_CHECK_COMMAND", "CHECKJSON expects the command to check, not a nested meta check command");
  }

  return normalized;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
