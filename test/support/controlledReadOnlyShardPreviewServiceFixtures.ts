import type { MiniKvClient } from "../../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../../src/clients/orderPlatformClient.js";
import { loadConfig } from "../../src/config.js";

export const javaEvidence = {
  project: "advanced-order-platform",
  version: "Java v289",
  readOnly: true,
  executionAllowed: false,
  shardEnabled: false,
  shardCount: 0,
  slotCount: 0,
  routingMode: "read-only-preview",
  evidencePath: "e/289/evidence/java-shard-readiness-v289.json",
  status: "passed",
};

export const miniKvEvidence = {
  contract: "shard-readiness.v1",
  evidenceType: "shard_readiness",
  project: "mini-kv",
  version: "0.262.0",
  releaseVersion: "v262",
  readOnly: true,
  executionAllowed: false,
  shardEnabled: false,
  shardCount: 1,
  slotCount: 16,
  routingMode: "single-shard-readiness-prototype",
  evidencePath: "fixtures/release/shard-readiness-v262.json",
  status: "prototype-ready-read-only",
  evidenceDigest: "fnv1a64:22d3c4815a440804",
  shardMap: [
    { shardId: "shard-0", slotStart: 0, slotEnd: 15, readOnly: true, writesAllowed: false },
  ],
  keyRoutingSamples: [
    { key: "orderops:alpha", slot: 5, shardId: "shard-0" },
    { key: "audit:receipt:001", slot: 9, shardId: "shard-0" },
  ],
  boundaries: {
    orderAuthoritative: false,
    auditAuthoritative: false,
    writeCommandsAllowed: false,
    adminCommandsAllowed: false,
    loadRestoreCompactAllowed: false,
  },
  diagnostics: {
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    loadRestoreCompactExecuted: false,
  },
};

export function fakeOrderPlatform(): OrderPlatformClient {
  return {
    shardReadiness: async () => ({
      statusCode: 200,
      latencyMs: 3,
      data: javaEvidence,
    }),
  } as OrderPlatformClient;
}

export function fakeMiniKv(): MiniKvClient {
  return {
    shardJson: async () => ({
      command: "SHARDJSON",
      response: JSON.stringify(miniKvEvidence),
      latencyMs: 4,
      readiness: miniKvEvidence,
    }),
  } as MiniKvClient;
}

export function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-581",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v581-controlled-read-only-shard-preview",
  };
}

export function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "true",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    ...overrides,
  });
}
