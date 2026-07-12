import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const FIXED_TIME = "2026-07-12T00:00:00.000Z";
const FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

const SURFACES = [
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification",
    suffix: "",
    bytes: 15_313,
    sha256: "37aaf8e0ec5cc754a783259d270ba095f1d4dfe5b5763ed8b8a62c7787c10c69",
  },
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification",
    suffix: "?format=markdown",
    bytes: 13_438,
    sha256: "e504ef0613644677a99ff176b1ffe74bef3b19931c6679ddbf93c65c268e6d9f",
  },
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification",
    suffix: "",
    bytes: 14_866,
    sha256: "20e8330020dcc06f6da9be9a79619c594148575e27b6efb674e61f27df6afe18",
  },
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification",
    suffix: "?format=markdown",
    bytes: 13_030,
    sha256: "5fe69afb9d9a27ed623b379d33dc153f6de8b86a97581b0a174d2433147fb021",
  },
] as const;

describe("elegance hotspot response parity", () => {
  it("keeps the two renamed archive-proof surfaces byte-identical", async () => {
    const realDate = Date;
    const previousFallback = process.env[FALLBACK_ENV];
    globalThis.Date = createFixedDate(realDate, FIXED_TIME);
    process.env[FALLBACK_ENV] = "true";
    const app = await buildApp(createTestConfig());

    try {
      const actual = [];
      for (const surface of SURFACES) {
        const response = await app.inject({
          method: "GET",
          url: `${surface.route}${surface.suffix}`,
          headers: completeHeaders(),
        });
        actual.push({
          status: response.statusCode,
          bytes: Buffer.byteLength(response.body),
          sha256: createHash("sha256").update(response.body).digest("hex"),
        });
      }

      expect(actual).toEqual(SURFACES.map((surface) => ({
        status: 200,
        bytes: surface.bytes,
        sha256: surface.sha256,
      })));
    } finally {
      await app.close();
      globalThis.Date = realDate;
      restoreEnv(previousFallback);
    }
  }, 180_000);
});

function createFixedDate(realDate: DateConstructor, iso: string): DateConstructor {
  const fixedMillis = realDate.parse(iso);
  return new Proxy(realDate, {
    apply(target, thisArg, args) {
      if (args.length === 0) return new realDate(fixedMillis).toString();
      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args) {
      return Reflect.construct(target, args.length === 0 ? [fixedMillis] : args);
    },
    get(target, property, receiver) {
      if (property === "now") return () => fixedMillis;
      return Reflect.get(target, property, receiver);
    },
  }) as DateConstructor;
}

function completeHeaders() {
  return {
    "x-orderops-operator-id": "elegance-audit",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-elegance-audit",
  };
}

function createTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
  });
}

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) delete process.env[FALLBACK_ENV];
  else process.env[FALLBACK_ENV] = previous;
}
