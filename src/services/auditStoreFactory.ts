import type { AppConfig } from "../config.js";
import {
  AuditLog,
  FileBackedAuditStore,
  InMemoryAuditStore,
  type AuditStore,
} from "./auditLog.js";

export type AuditStoreRuntimeKind = "memory" | "file";

export interface AuditStoreRuntimeDescription {
  requestedStoreKind: string;
  normalizedStoreKind: "memory" | "file" | "database" | "unknown";
  runtimeStoreKind: AuditStoreRuntimeKind;
  storeImplementation: string;
  durableAtRuntime: boolean;
  configuredByEnvironment: boolean;
  auditStorePath?: string;
  capacity: number;
}

export interface AuditStoreRuntime {
  auditLog: AuditLog;
  store: AuditStore;
  description: AuditStoreRuntimeDescription;
}

const DEFAULT_AUDIT_CAPACITY = 200;

export function createAuditStoreRuntime(
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">,
): AuditStoreRuntime {
  const description = describeAuditStoreRuntime(config);
  const store = createStore(description);

  return {
    auditLog: new AuditLog({ capacity: description.capacity, store }),
    store,
    description,
  };
}

export function describeAuditStoreRuntime(
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">,
): AuditStoreRuntimeDescription {
  const normalizedStoreKind = normalizeStoreKind(config.auditStoreKind);

  if (normalizedStoreKind === "file") {
    if (config.auditStorePath.length === 0) {
      throw new Error("AUDIT_STORE_PATH is required when AUDIT_STORE_KIND=file");
    }

    return {
      requestedStoreKind: config.auditStoreKind,
      normalizedStoreKind,
      runtimeStoreKind: "file",
      storeImplementation: FileBackedAuditStore.name,
      durableAtRuntime: true,
      configuredByEnvironment: true,
      auditStorePath: config.auditStorePath,
      capacity: DEFAULT_AUDIT_CAPACITY,
    };
  }

  if (normalizedStoreKind === "database") {
    throw new Error("AUDIT_STORE_KIND=database is not implemented in this version");
  }

  if (normalizedStoreKind === "unknown") {
    throw new Error("AUDIT_STORE_KIND must be memory, file, or database");
  }

  return {
    requestedStoreKind: config.auditStoreKind,
    normalizedStoreKind,
    runtimeStoreKind: "memory",
    storeImplementation: InMemoryAuditStore.name,
    durableAtRuntime: false,
    configuredByEnvironment: false,
    capacity: DEFAULT_AUDIT_CAPACITY,
  };
}

function createStore(description: AuditStoreRuntimeDescription): AuditStore {
  if (description.runtimeStoreKind === "file") {
    return new FileBackedAuditStore(requiredPath(description), description.capacity);
  }

  return new InMemoryAuditStore(description.capacity);
}

function normalizeStoreKind(value: string): AuditStoreRuntimeDescription["normalizedStoreKind"] {
  if (value === "memory" || value === "in-memory") {
    return "memory";
  }
  if (value === "file" || value === "jsonl") {
    return "file";
  }
  if (value === "database" || value === "postgres" || value === "postgresql") {
    return "database";
  }
  return "unknown";
}

function requiredPath(description: AuditStoreRuntimeDescription): string {
  if (description.auditStorePath === undefined || description.auditStorePath.length === 0) {
    throw new Error("Audit store path is required for file runtime");
  }
  return description.auditStorePath;
}
